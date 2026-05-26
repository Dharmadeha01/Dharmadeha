export interface Stats {
  people: number;
  dharmaDehas: number;
  mentors: number;
  countries: number;
}

const FALLBACK_STATS: Stats = {
  people: 64,
  dharmaDehas: 10,
  mentors: 17,
  countries: 13,
};

/**
 * Fetch live stats from Airtable.
 * Expects a "Stats" table with a single record containing fields:
 *   People (Number), DharmaDehas (Number), Mentors (Number), Countries (Number)
 *
 * Returns FALLBACK_STATS if env vars are missing or the request fails.
 */
export async function fetchStats(opts?: RequestInit): Promise<Stats> {
  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    console.warn("[airtable] Missing AIRTABLE_API_TOKEN or AIRTABLE_BASE_ID — using fallback stats.");
    return FALLBACK_STATS;
  }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/Stats?maxRecords=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
        ...opts,
      }
    );

    if (!res.ok) {
      console.error(`[airtable] Stats fetch failed: ${res.status}`);
      return FALLBACK_STATS;
    }

    const json = await res.json();
    const fields = json.records?.[0]?.fields ?? {};

    return {
      people: Number(fields.People ?? fields.people ?? FALLBACK_STATS.people),
      dharmaDehas: Number(fields.DharmaDehas ?? fields.dharmaDehas ?? fields.DharmaDehas ?? FALLBACK_STATS.dharmaDehas),
      mentors: Number(fields.Mentors ?? fields.mentors ?? FALLBACK_STATS.mentors),
      countries: Number(fields.Countries ?? fields.countries ?? FALLBACK_STATS.countries),
    };
  } catch (err) {
    console.error("[airtable] fetchStats error:", err);
    return FALLBACK_STATS;
  }
}

export interface ApplicationPayload {
  name: string;
  email: string;
  language: string;
  course: string;
  message?: string;
}

/**
 * Submit an application to Airtable.
 * Expects an "Applications" table with fields:
 *   Name, Email, Language, Course, Message (all Single line text or Long text)
 */
export async function submitApplication(data: ApplicationPayload): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    return { ok: false, error: "Airtable not configured" };
  }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/Applications`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: data.name,
            Email: data.email,
            Language: data.language,
            Course: data.course,
            Message: data.message ?? "",
          },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("[airtable] submitApplication failed:", err);
      return { ok: false, error: err };
    }

    return { ok: true };
  } catch (err) {
    console.error("[airtable] submitApplication error:", err);
    return { ok: false, error: String(err) };
  }
}
