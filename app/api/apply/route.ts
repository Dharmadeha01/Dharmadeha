import {
  submitApplication,
  type ApplicationPayload,
  type ApplicationType,
} from "@/lib/airtable";

function isApplicationType(value: unknown): value is ApplicationType {
  return value === "participant" || value === "mentor";
}

export async function POST(request: Request) {
  let body: ApplicationPayload & { applicationType?: unknown };

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, language, course, message, applicationType } = body;

  if (!isApplicationType(applicationType)) {
    return Response.json(
      { ok: false, error: "Invalid application type" },
      { status: 400 }
    );
  }

  if (!name?.trim()) {
    return Response.json({ ok: false, error: "Name is required" }, { status: 400 });
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }
  if (!language?.trim()) {
    return Response.json({ ok: false, error: "Language is required" }, { status: 400 });
  }
  if (applicationType === "participant" && !course?.trim()) {
    return Response.json({ ok: false, error: "Course is required" }, { status: 400 });
  }

  const result = await submitApplication({
    applicationType,
    name: name.trim(),
    email: email.trim(),
    language,
    course: course?.trim(),
    message,
  });

  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 500 });
  }

  return Response.json({ ok: true });
}
