/**
 * POST /api/translate
 *
 * Translates a set of string fields into Russian and/or Ukrainian using
 * the Claude API and returns the translated values.
 *
 * Protected by the SANITY_REVALIDATE_SECRET header (x-revalidate-secret).
 *
 * Request body:
 *   {
 *     fields: Record<string, string>   // { fieldName: "English text", ... }
 *     langs?: Array<'ru' | 'uk'>       // default: ['ru', 'uk']
 *   }
 *
 * Response body:
 *   {
 *     translations: Record<string, string>   // { fieldNameRu: "...", fieldNameUa: "...", ... }
 *   }
 */

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const revalidate = 0

type Lang = 'ru' | 'uk'

async function translateText(text: string, lang: Lang): Promise<string> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const langName = lang === 'ru' ? 'Russian' : 'Ukrainian'
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Translate the following text to ${langName} (Ananda Marga spiritual/meditation context). Return only the translation, no explanation or extra quotes:\n\n${text}`,
      },
    ],
  })

  const block = msg.content[0]
  return block.type === 'text' ? block.text.trim() : text
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY is not configured' }, { status: 500 })
  }

  let body: { fields?: Record<string, string>; langs?: Lang[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { fields, langs = ['ru', 'uk'] } = body

  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    return NextResponse.json({ error: '"fields" must be a plain object of { fieldName: string }' }, { status: 400 })
  }

  const translations: Record<string, string> = {}

  for (const lang of langs) {
    for (const [key, value] of Object.entries(fields)) {
      if (!value || typeof value !== 'string') continue
      const suffix = lang === 'ru' ? 'Ru' : 'Ua'
      translations[`${key}${suffix}`] = await translateText(value, lang)
    }
  }

  return NextResponse.json({ translations })
}
