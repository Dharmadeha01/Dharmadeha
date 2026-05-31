import {
  submitApplication,
  type ApplicationPayload,
  type ApplicationType,
} from "@/lib/airtable";

function isApplicationType(value: unknown): value is ApplicationType {
  return value === "participant" || value === "mentor";
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export async function POST(request: Request) {
  let body: ApplicationPayload & { applicationType?: unknown };

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { applicationType } = body;

  if (!isApplicationType(applicationType)) {
    return Response.json(
      { ok: false, error: "Invalid application type" },
      { status: 400 }
    );
  }

  if (!isNonEmptyString(body.name)) {
    return Response.json({ ok: false, error: "Name is required" }, { status: 400 });
  }
  if (!isNonEmptyString(body.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return Response.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }

  let payload: ApplicationPayload;

  if (applicationType === "mentor") {
    const {
      phone,
      cityCountry,
      age,
      languages,
      languageOther,
      hasInitiation,
      acaryaName,
      hearAbout,
      expectations,
    } = body;

    if (!isNonEmptyString(phone)) {
      return Response.json({ ok: false, error: "Phone is required" }, { status: 400 });
    }
    if (!isNonEmptyString(cityCountry)) {
      return Response.json({ ok: false, error: "City / Country is required" }, { status: 400 });
    }
    if (!isNonEmptyString(age)) {
      return Response.json({ ok: false, error: "Age is required" }, { status: 400 });
    }
    if (!isStringArray(languages) || languages.length === 0) {
      return Response.json({ ok: false, error: "At least one language is required" }, { status: 400 });
    }
    if (languages.includes("Other") && !isNonEmptyString(languageOther)) {
      return Response.json({ ok: false, error: "Please specify your other language" }, { status: 400 });
    }
    if (typeof hasInitiation !== "boolean") {
      return Response.json({ ok: false, error: "Initiation status is required" }, { status: 400 });
    }
    if (hasInitiation && !isNonEmptyString(acaryaName)) {
      return Response.json({ ok: false, error: "Acarya name is required" }, { status: 400 });
    }
    if (!isNonEmptyString(hearAbout)) {
      return Response.json({ ok: false, error: "How you heard about us is required" }, { status: 400 });
    }
    if (!isNonEmptyString(expectations)) {
      return Response.json({ ok: false, error: "Motivation is required" }, { status: 400 });
    }

    payload = {
      applicationType: "mentor",
      name: body.name.trim(),
      email: body.email.trim(),
      phone: phone.trim(),
      cityCountry: cityCountry.trim(),
      age: age.trim(),
      languages,
      languageOther: languageOther?.trim(),
      hasInitiation,
      acaryaName: acaryaName?.trim(),
      hearAbout: hearAbout.trim(),
      expectations: expectations.trim(),
    };
  } else {
    const {
      phone,
      cityCountry,
      age,
      languages,
      languageOther,
      preferredMentor,
      hasInitiation,
      acaryaName,
      courses,
      futureTopics,
      hearAbout,
      expectations,
      interestedInMentor,
    } = body;

    if (!isNonEmptyString(phone)) {
      return Response.json({ ok: false, error: "Phone is required" }, { status: 400 });
    }
    if (!isNonEmptyString(cityCountry)) {
      return Response.json({ ok: false, error: "City / Country is required" }, { status: 400 });
    }
    if (!isNonEmptyString(age)) {
      return Response.json({ ok: false, error: "Age is required" }, { status: 400 });
    }
    if (!isStringArray(languages) || languages.length === 0) {
      return Response.json({ ok: false, error: "At least one language is required" }, { status: 400 });
    }
    if (languages.includes("Other") && !isNonEmptyString(languageOther)) {
      return Response.json({ ok: false, error: "Please specify your other language" }, { status: 400 });
    }
    if (typeof hasInitiation !== "boolean") {
      return Response.json({ ok: false, error: "Initiation status is required" }, { status: 400 });
    }
    if (hasInitiation && !isNonEmptyString(acaryaName)) {
      return Response.json({ ok: false, error: "Acarya name is required" }, { status: 400 });
    }
    if (!isStringArray(courses) || courses.length === 0) {
      return Response.json({ ok: false, error: "At least one course is required" }, { status: 400 });
    }
    if (!isNonEmptyString(futureTopics)) {
      return Response.json({ ok: false, error: "Future topics are required" }, { status: 400 });
    }
    if (!isNonEmptyString(hearAbout)) {
      return Response.json({ ok: false, error: "How you heard about us is required" }, { status: 400 });
    }
    if (!isNonEmptyString(expectations)) {
      return Response.json({ ok: false, error: "Expectations are required" }, { status: 400 });
    }
    if (typeof interestedInMentor !== "boolean") {
      return Response.json({ ok: false, error: "Mentor interest is required" }, { status: 400 });
    }

    payload = {
      applicationType: "participant",
      name: body.name.trim(),
      email: body.email.trim(),
      phone: phone.trim(),
      cityCountry: cityCountry.trim(),
      age: age.trim(),
      languages,
      languageOther: languageOther?.trim(),
      preferredMentor: preferredMentor?.trim(),
      hasInitiation,
      acaryaName: acaryaName?.trim(),
      courses,
      futureTopics: futureTopics.trim(),
      hearAbout: hearAbout.trim(),
      expectations: expectations.trim(),
      interestedInMentor,
    };
  }

  const result = await submitApplication(payload);

  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 500 });
  }

  return Response.json({ ok: true });
}
