import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

// Use any for image source type — avoids deep type import issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

// Only accept project IDs that match Sanity's format: a-z, 0-9, dashes
const RAW_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const VALID_PROJECT_ID = /^[a-z0-9-]+$/.test(RAW_PROJECT_ID) ? RAW_PROJECT_ID : ''

export const client = createClient({
  projectId: VALID_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // disabled for debug — ensures fresh data from Sanity API
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export const queries = {
  hero: `*[_type == "hero"][0]`,
  courses: `*[_type == "course"] | order(order asc) {
    _id,
    title,
    tagline,
    status,
    lessons,
    duration,
    description,
    "coverUrl": cover.asset->url,
    authorName,
    authorRole,
    whoFor,
    curriculum,
    order
  }`,
  authors: `*[_type == "author"] | order(order asc)`,
  faq: `*[_type == "faq"] | order(order asc)`,
  testimonials: `*[_type == "testimonial"] | order(order asc)`,
  principles: `*[_type == "principle"] | order(order asc)`,
  siteSettings: `*[_type == "siteSettings"][0]`,
  videoSection: `*[_type == "videoSection"][0]`,
}

// ── Type definitions ──────────────────────────────────────────────────────────

export interface SanityHero {
  headlineLine1?: string
  headlineLine2?: string
  bodyText?: string
  primaryButtonText?: string
  secondaryButtonText?: string
}

export interface SanityCourse {
  _id: string
  title: string
  tagline?: string
  status?: 'active' | 'coming-soon'
  lessons?: number
  duration?: string
  description?: string
  cover?: SanityImageSource
  coverUrl?: string
  authorName?: string
  authorRole?: string
  whoFor?: Array<string | { _key: string; text: string }>
  curriculum?: Array<{ number: number; title: string; topic?: string }>
  order?: number
}

export interface SanityAuthor {
  _id: string
  name: string
  role?: string
  bio?: string
  photo?: SanityImageSource
  initials?: string
  order?: number
}

export interface SanityFaq {
  _id: string
  question: string
  answer: string
  order?: number
}

export interface SanityTestimonial {
  _id: string
  quote: string
  name: string
  role?: string
  order?: number
}

export interface SanityPrinciple {
  _id: string
  title: string
  body: string
  order?: number
}

export interface SanitySiteSettings {
  siteName?: string
  footerTagline?: string
  joinButtonText?: string
  mentorButtonText?: string
  contactEmail?: string
  instagramUrl?: string
  youtubeUrl?: string
  telegramUrl?: string
}

export interface SanityVideoSection {
  headline?: string
  headlineItalic?: string
  body?: string
  youtubeId?: string
}

// ── Safe fetch ────────────────────────────────────────────────────────────────
// Returns null if credentials are missing/invalid or on any error

export async function sanityFetch<T>(
  query: string,
  options?: { revalidate?: number }
): Promise<T | null> {
  if (!VALID_PROJECT_ID) return null
  try {
    return await client.fetch<T>(query, {}, {
      next: { revalidate: options?.revalidate ?? 0 }, // 0 = no cache, always fresh
    })
  } catch {
    return null
  }
}
