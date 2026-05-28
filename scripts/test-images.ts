import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function test() {
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')
  console.log('')

  const courses = await client.fetch(`
    *[_type == "course"] | order(order asc) {
      _id,
      title,
      order,
      "coverUrl": cover.asset->url,
      "coverRef": cover.asset._ref
    }
  `)

  console.log('Course images:')
  console.log('─'.repeat(60))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  courses.forEach((c: any) => {
    console.log(`[${c._id}] ${c.title}`)
    console.log(`  coverUrl: ${c.coverUrl || 'NO IMAGE URL'}`)
    console.log(`  coverRef: ${c.coverRef || 'NO ASSET REF'}`)
    console.log('')
  })

  const withImages = courses.filter((c: any) => c.coverUrl).length
  console.log(`Summary: ${withImages}/${courses.length} courses have images in Sanity`)
}

test().catch(console.error)
