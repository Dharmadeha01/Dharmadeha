/**
 * Locale-aware field picker for Sanity documents.
 *
 * Fields are stored as suffix variants:
 *   title → titleRu (Russian) / titleUa (Ukrainian)
 *
 * Falls back to the English field when the locale-specific field is absent.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loc(doc: any, field: string, locale: string): string {
  if (!doc) return ''
  if (locale === 'ru') return doc[field + 'Ru'] || doc[field] || ''
  if (locale === 'uk') return doc[field + 'Ua'] || doc[field] || ''
  return doc[field] || ''
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function locArray(doc: any, field: string, locale: string): any[] {
  if (!doc) return []
  if (locale === 'ru') {
    const v = doc[field + 'Ru']
    if (Array.isArray(v) && v.length > 0) return v
  }
  if (locale === 'uk') {
    const v = doc[field + 'Ua']
    if (Array.isArray(v) && v.length > 0) return v
  }
  const v = doc[field]
  return Array.isArray(v) ? v : []
}
