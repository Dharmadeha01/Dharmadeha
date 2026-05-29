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
  // No projection — returns all fields including RU/UA variants
  hero: `*[_type == "hero"][0]`,
  courses: `*[_type == "course"] | order(order asc) {
    _id,
    title, titleRu, titleUa,
    tagline, taglineRu, taglineUa,
    status,
    lessons,
    duration,
    description, descriptionRu, descriptionUa,
    "coverUrl": cover.asset->url,
    authorName,
    authorRole,
    whoFor[]{ text },
    whoForRu[]{ text },
    whoForUa[]{ text },
    curriculum[]{ number, title, topic },
    curriculumRu[]{ number, title, topic },
    curriculumUa[]{ number, title, topic },
    order
  }`,
  authors: `*[_type == "author"] | order(order asc)`,
  // No projection — returns all fields including RU/UA variants
  faq: `*[_type == "faq"] | order(order asc)`,
  testimonials: `*[_type == "testimonial"] | order(order asc)`,
  principles: `*[_type == "principle"] | order(order asc) { _id, title, titleRu, titleUa, body, bodyRu, bodyUa, order }`,
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
  headlineLine1Ru?: string
  headlineLine2Ru?: string
  bodyTextRu?: string
  headlineLine1Ua?: string
  headlineLine2Ua?: string
  bodyTextUa?: string
  primaryButtonTextRu?: string
  primaryButtonTextUa?: string
}

export interface SanityCourse {
  _id: string
  title: string
  titleRu?: string
  titleUa?: string
  tagline?: string
  taglineRu?: string
  taglineUa?: string
  status?: 'active' | 'coming-soon'
  lessons?: number
  duration?: string
  description?: string
  descriptionRu?: string
  descriptionUa?: string
  cover?: SanityImageSource
  coverUrl?: string
  authorName?: string
  authorRole?: string
  whoFor?: Array<string | { _key: string; text: string }>
  whoForRu?: Array<{ text: string }>
  whoForUa?: Array<{ text: string }>
  curriculum?: Array<{ number: number; title: string; topic?: string }>
  curriculumRu?: Array<{ number: number; title: string; topic?: string }>
  curriculumUa?: Array<{ number: number; title: string; topic?: string }>
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
  questionRu?: string
  answerRu?: string
  questionUa?: string
  answerUa?: string
  order?: number
}

export interface SanityTestimonial {
  _id: string
  quote: string
  name: string
  role?: string
  quoteRu?: string
  quoteUa?: string
  roleRu?: string
  roleUa?: string
  order?: number
}

export interface SanityPrinciple {
  _id: string
  title: string
  titleRu?: string
  titleUa?: string
  body: string
  bodyRu?: string
  bodyUa?: string
  order?: number
}

export interface SanitySiteSettings {
  siteName?: string
  footerTagline?: string
  footerTaglineRu?: string
  footerTaglineUa?: string
  joinButtonText?: string
  joinButtonTextRu?: string
  joinButtonTextUa?: string
  mentorButtonText?: string
  mentorButtonTextRu?: string
  mentorButtonTextUa?: string
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
  headlineRu?: string
  headlineItalicRu?: string
  bodyRu?: string
  headlineUa?: string
  headlineItalicUa?: string
  bodyUa?: string
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
