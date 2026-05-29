#!/usr/bin/env tsx
/**
 * scripts/translate-all.ts
 *
 * Fetches all Sanity documents that have translatable text fields and
 * generates Russian + Ukrainian translations using the Claude API, then
 * patches each document back via the Sanity write API.
 *
 * Prerequisites:
 *   • ANTHROPIC_API_KEY in .env.local
 *   • SANITY_API_TOKEN in .env.local   (write token)
 *   • NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 *
 * Usage:
 *   npx tsx scripts/translate-all.ts
 *
 * Only translates fields that are still empty (won't overwrite existing translations).
 * Pass --force to overwrite everything.
 */

import 'dotenv/config'

const FORCE = process.argv.includes('--force')

// ── Sanity client (direct, not via next-sanity) ──────────────────────────────

async function sanityFetch(query: string): Promise<unknown[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const token = process.env.SANITY_API_TOKEN
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  const data = await res.json() as { result: unknown[] }
  return data.result || []
}

async function sanityPatch(id: string, set: Record<string, string>) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const token = process.env.SANITY_API_TOKEN
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`
  const body = JSON.stringify({
    mutations: [{ patch: { id, set } }],
  })
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Sanity patch failed for ${id}: ${err}`)
  }
}

// ── Anthropic translation ────────────────────────────────────────────────────

type Lang = 'ru' | 'uk'

async function translate(text: string, lang: Lang): Promise<string> {
  // Dynamic import so missing sdk doesn't crash the file on import
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Anthropic = require('@anthropic-ai/sdk').default
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const langName = lang === 'ru' ? 'Russian' : 'Ukrainian'

  const msg = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Translate the following text to ${langName} (Ananda Marga spiritual/meditation context). Return only the translation, no explanation:\n\n${text}`,
      },
    ],
  })

  const block = msg.content[0]
  return block.type === 'text' ? block.text.trim() : text
}

// ── Per-document translation ─────────────────────────────────────────────────

async function translateDoc(
  doc: Record<string, unknown>,
  textFields: string[],
  label: string
) {
  const patch: Record<string, string> = {}

  for (const field of textFields) {
    const val = doc[field]
    if (typeof val !== 'string' || !val) continue

    for (const lang of ['ru', 'uk'] as Lang[]) {
      const suffix = lang === 'ru' ? 'Ru' : 'Ua'
      const key = `${field}${suffix}`

      // Skip if already translated (unless --force)
      if (!FORCE && doc[key] && typeof doc[key] === 'string') {
        console.log(`  ⏭  ${label}[${doc._id}].${key} already set, skipping`)
        continue
      }

      console.log(`  🔄 Translating ${label}[${doc._id as string}].${field} → ${lang.toUpperCase()}…`)
      patch[key] = await translate(val, lang)
    }
  }

  if (Object.keys(patch).length > 0) {
    await sanityPatch(doc._id as string, patch)
    console.log(`  ✅ Patched ${label}[${doc._id as string}]`)
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY is not set in .env.local')
    process.exit(1)
  }
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN is not set in .env.local')
    process.exit(1)
  }

  console.log(`🌐 translate-all.ts  (force=${FORCE})\n`)

  console.log('📋 Principles…')
  const principles = await sanityFetch('*[_type == "principle"]') as Record<string, unknown>[]
  for (const doc of principles) {
    await translateDoc(doc, ['title', 'body'], 'principle')
  }

  console.log('\n❓ FAQ…')
  const faqs = await sanityFetch('*[_type == "faq"]') as Record<string, unknown>[]
  for (const doc of faqs) {
    await translateDoc(doc, ['question', 'answer'], 'faq')
  }

  console.log('\n🦸 Hero…')
  const heroes = await sanityFetch('*[_type == "hero"]') as Record<string, unknown>[]
  for (const doc of heroes) {
    await translateDoc(doc, ['headlineLine1', 'headlineLine2', 'bodyText'], 'hero')
  }

  console.log('\n📚 Courses…')
  const courses = await sanityFetch('*[_type == "course"]') as Record<string, unknown>[]
  for (const doc of courses) {
    await translateDoc(doc, ['title', 'tagline', 'description'], 'course')
  }

  console.log('\n✨ Done!')
}

main().catch((err) => {
  console.error('❌ Fatal error:', err)
  process.exit(1)
})
