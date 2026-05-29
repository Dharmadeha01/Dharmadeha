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

async function update() {
  const stats = [
    { _id: 'stat-people', metric: 'people', value: 72 },
    { _id: 'stat-dharmaDehas', metric: 'dharmaDehas', value: 12 },
    { _id: 'stat-mentors', metric: 'mentors', value: 16 },
    { _id: 'stat-countries', metric: 'countries', value: 14 },
  ]
  for (const stat of stats) {
    await client.createOrReplace({ _type: 'stats', ...stat })
    console.log('Updated:', stat.metric, '=', stat.value)
  }
  console.log('Done.')
}
update().catch(console.error)
