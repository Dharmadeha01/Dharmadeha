import { client } from '@/lib/sanity'

export const revalidate = 0

export default async function DebugPage() {
  let courses: unknown[] = []
  let testimonials: unknown[] = []
  let principles: unknown[] = []
  let faq: unknown[] = []
  let error: string | null = null
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '(not set)'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '(not set)'
  const hasToken = !!process.env.SANITY_API_TOKEN
  const hasRevalidateSecret = !!process.env.SANITY_REVALIDATE_SECRET

  try {
    ;[courses, testimonials, principles, faq] = await Promise.all([
      client.fetch('*[_type == "course"] | order(order asc) {_id, title, status, order}'),
      client.fetch('*[_type == "testimonial"] | order(order asc) {_id, name, quote}'),
      client.fetch('*[_type == "principle"] | order(order asc) {_id, title}'),
      client.fetch('*[_type == "faq"] | order(order asc) {_id, question}'),
    ])
  } catch (e: unknown) {
    error = e instanceof Error ? e.message : String(e)
  }

  return (
    <div style={{ padding: 40, fontFamily: 'monospace', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Sanity Debug</h1>

      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Environment</h2>
      <table style={{ borderCollapse: 'collapse', marginBottom: 32, width: '100%' }}>
        <tbody>
          {[
            ['NEXT_PUBLIC_SANITY_PROJECT_ID', projectId],
            ['NEXT_PUBLIC_SANITY_DATASET', dataset],
            ['SANITY_API_TOKEN', hasToken ? '✅ set' : '❌ missing'],
            ['SANITY_REVALIDATE_SECRET', hasRevalidateSecret ? '✅ set' : '❌ missing'],
          ].map(([k, v]) => (
            <tr key={k} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '6px 16px 6px 0', fontWeight: 'bold' }}>{k}</td>
              <td style={{ padding: '6px 0' }}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && (
        <div style={{ background: '#fff0f0', border: '1px solid #f00', padding: 16, marginBottom: 24, borderRadius: 4 }}>
          <strong>Fetch error:</strong> {error}
        </div>
      )}

      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Courses ({courses.length})</h2>
      <pre style={{ background: '#f4f4f4', padding: 16, borderRadius: 4, overflow: 'auto', marginBottom: 24 }}>
        {JSON.stringify(courses, null, 2)}
      </pre>

      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Testimonials ({testimonials.length})</h2>
      <pre style={{ background: '#f4f4f4', padding: 16, borderRadius: 4, overflow: 'auto', marginBottom: 24 }}>
        {JSON.stringify(testimonials, null, 2)}
      </pre>

      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Principles ({principles.length})</h2>
      <pre style={{ background: '#f4f4f4', padding: 16, borderRadius: 4, overflow: 'auto', marginBottom: 24 }}>
        {JSON.stringify(principles, null, 2)}
      </pre>

      <h2 style={{ fontSize: 18, marginBottom: 8 }}>FAQ ({faq.length})</h2>
      <pre style={{ background: '#f4f4f4', padding: 16, borderRadius: 4, overflow: 'auto', marginBottom: 24 }}>
        {JSON.stringify(faq, null, 2)}
      </pre>

      <p style={{ color: '#999', fontSize: 12 }}>
        Rendered at: {new Date().toISOString()} · revalidate=0 (always fresh)
      </p>
    </div>
  )
}
