/**
 * Utility helpers for locale-aware Sanity field selection.
 *
 * Sanity documents store localized fields as suffixed variants:
 *   e.g.  title → titleRu (Russian) / titleUa (Ukrainian)
 *
 * These helpers pick the right variant for the current locale and fall
 * back to the English field (or an explicit fallback string) when the
 * locale-specific field is absent.
 */

/**
 * Pick the localized string value from a Sanity document.
 * Priority: locale-specific field → English field → fallback
 *
 * @param locale   Active locale: 'ru' | 'uk' | 'en'
 * @param doc      Sanity document (or any plain object)
 * @param field    Base field name, e.g. 'title'
 * @param fallback Value returned when every field is empty
 */
export function localizedField(
  locale: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doc: Record<string, any>,
  field: string,
  fallback = ''
): string {
  if (locale === 'ru') {
    const v = doc[`${field}Ru`]
    if (v && typeof v === 'string') return v
  }
  if (locale === 'uk') {
    const v = doc[`${field}Ua`]
    if (v && typeof v === 'string') return v
  }
  const v = doc[field]
  return typeof v === 'string' && v ? v : fallback
}

/**
 * Pick a localized string array from a Sanity document.
 * Priority: locale-specific array field → English field → fallback
 *
 * @param locale   Active locale: 'ru' | 'uk' | 'en'
 * @param doc      Sanity document (or any plain object)
 * @param field    Base field name, e.g. 'items'
 * @param fallback Array returned when every field is empty
 */
export function localizedArray(
  locale: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doc: Record<string, any>,
  field: string,
  fallback: string[] = []
): string[] {
  if (locale === 'ru') {
    const v = doc[`${field}Ru`]
    if (Array.isArray(v) && v.length > 0) return v as string[]
  }
  if (locale === 'uk') {
    const v = doc[`${field}Ua`]
    if (Array.isArray(v) && v.length > 0) return v as string[]
  }
  const v = doc[field]
  return Array.isArray(v) ? (v as string[]) : fallback
}
