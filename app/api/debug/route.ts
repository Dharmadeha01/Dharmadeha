import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export const revalidate = 0

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '(not set)'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '(not set)'
  const hasToken = !!process.env.SANITY_API_TOKEN
  const hasRevalidateSecret = !!process.env.SANITY_REVALIDATE_SECRET

  let courses: unknown[] = []
  let fetchError: string | null = null

  try {
    courses = await client.fetch(`
      *[_type == "course"] | order(order asc) {
        _id,
        title,
        status,
        order,
        "coverUrl": cover.asset->url,
        "coverRef": cover.asset._ref,
        cover
      }
    `)
  } catch (e: unknown) {
    fetchError = e instanceof Error ? e.message : String(e)
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    env: {
      NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
      NEXT_PUBLIC_SANITY_DATASET: dataset,
      SANITY_API_TOKEN: hasToken ? '✅ set' : '❌ missing',
      SANITY_REVALIDATE_SECRET: hasRevalidateSecret ? '✅ set' : '❌ missing',
    },
    fetchError,
    courses,
  })
}
