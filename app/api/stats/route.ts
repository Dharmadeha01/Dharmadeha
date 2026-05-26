import { fetchStats } from "@/lib/airtable";

export const revalidate = 3600; // ISR: re-fetch at most once per hour

export async function GET() {
  const stats = await fetchStats();
  return Response.json(stats);
}
