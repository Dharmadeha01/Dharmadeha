import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export const revalidate = 0

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '(not set)'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '(not set)'
  const hasToken = !!process.env.SANITY_API_TOKEN
  const hasRevalidateSecret = !!process.env.SANITY_REVALIDATE_SECRET

  let courses: unknown[] = []
  let testimonials: unknown[] = []
  let principles: unknown[] = []
  let faq: unknown[] = []
  let fetchError: string | null = null

  try {
    ;[courses, testimonials, principles, faq] = await Promise.all([
      client.fetch('*[_type == "course"] | order(order asc) {_id, title, status, order}'),
      client.fetch('*[_type == "testimonial"] | order(order asc) {_id, name, quote}'),
      client.fetch('*[_type == "principle"] | order(order asc) {_id, title}'),
      client.fetch('*[_type == "faq"] | order(order asc) {_id, question}'),
    ])
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
    counts: {
      courses: courses.length,
      testimonials: testimonials.length,
      principles: principles.length,
      faq: faq.length,
    },
    data: { courses, testimonials, principles, faq },
  })
}
