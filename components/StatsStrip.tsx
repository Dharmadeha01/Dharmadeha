import { fetchStats } from "@/lib/airtable";
import CountUpStrip from "./CountUpStrip";

// Server component — fetches live stats with 1-hour ISR revalidation
export default async function StatsStrip() {
  const stats = await fetchStats({ next: { revalidate: 3600 } } as RequestInit);
  return <CountUpStrip stats={stats} />;
}
