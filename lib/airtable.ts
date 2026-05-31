import type { ApplicationType } from "@/lib/application";

export type { ApplicationType } from "@/lib/application";

export interface Stats {
  people: number;
  dharmaDehas: number;
  mentors: number;
  countries: number;
}

const FALLBACK_STATS: Stats = {
  people: 72,
  dharmaDehas: 12,
  mentors: 16,
  countries: 14,
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

export interface MentorApplicationPayload {
  applicationType: "mentor";
  name: string;
  email: string;
  phone: string;
  cityCountry: string;
  age: string;
  languages: string[];
  languageOther?: string;
  hasInitiation: boolean;
  acaryaName?: string;
  hearAbout: string;
  expectations: string;
}

export interface ParticipantApplicationPayload {
  applicationType: "participant";
  name: string;
  email: string;
  phone: string;
  cityCountry: string;
  age: string;
  languages: string[];
  languageOther?: string;
  preferredMentor?: string;
  hasInitiation: boolean;
  acaryaName?: string;
  courses: string[];
  futureTopics: string;
  hearAbout: string;
  expectations: string;
  interestedInMentor: boolean;
}

export type ApplicationPayload =
  | MentorApplicationPayload
  | ParticipantApplicationPayload;

function roleForType(type: ApplicationType): string {
  return type === "mentor" ? "Mentor" : "Participant";
}

/**
 * Submit an application to Airtable.
 * Mentor: Name, Email, Phone/Telegram, City/Country, Age, Language,
 *   Has Initiation, Acarya, How did you hear, Expectations, Status, Role
 * Participant: Name, Email, Phone/Telegram, City/Country, Age, Languages,
 *   Preferred Mentor, Has Initiation, Acarya, Course, Future Topics,
 *   How did you hear, Expectations, Interested in Mentor, Status, Role
 */
export async function submitApplication(data: ApplicationPayload): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    return { ok: false, error: "Airtable not configured" };
  }

  const fields: Record<string, string | number> = {
    Name: data.name,
    Email: data.email,
    Status: "New",
    Role: roleForType(data.applicationType),
  };

  if (data.applicationType === "mentor") {
    const languages = [...data.languages];
    if (data.languageOther?.trim()) {
      const otherIdx = languages.indexOf("Other");
      if (otherIdx >= 0) languages[otherIdx] = `Other (${data.languageOther.trim()})`;
    }
    fields["Phone/Telegram"] = data.phone;
    fields["City/Country"] = data.cityCountry;
    fields.Age = Number(data.age);
    fields.Language = languages.join(", ");
    fields["Has Initiation"] = data.hasInitiation ? "Yes" : "No";
    if (data.hasInitiation && data.acaryaName?.trim()) {
      fields.Acarya = data.acaryaName.trim();
    }
    fields["How did you hear"] = data.hearAbout;
    fields.Expectations = data.expectations;
  } else {
    const languages = [...data.languages];
    if (data.languageOther?.trim()) {
      const otherIdx = languages.indexOf("Other");
      if (otherIdx >= 0) languages[otherIdx] = `Other (${data.languageOther.trim()})`;
    }
    fields["Phone/Telegram"] = data.phone;
    fields["City/Country"] = data.cityCountry;
    fields.Age = Number(data.age);
    fields.Languages = languages.join(", ");
    if (data.preferredMentor?.trim()) {
      fields["Preferred Mentor"] = data.preferredMentor.trim();
    }
    fields["Has Initiation"] = data.hasInitiation ? "Yes" : "No";
    if (data.hasInitiation && data.acaryaName?.trim()) {
      fields.Acarya = data.acaryaName.trim();
    }
    fields.Course = data.courses.join(", ");
    fields["Future Topics"] = data.futureTopics;
    fields["How did you hear"] = data.hearAbout;
    fields.Expectations = data.expectations;
    fields["Interested in Mentor"] = data.interestedInMentor ? "Yes" : "No";
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
        body: JSON.stringify({ fields }),
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
