import { submitApplication, type ApplicationPayload } from "@/lib/airtable";

export async function POST(request: Request) {
  let body: ApplicationPayload;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, language, course, message } = body;

  // Server-side validation
  if (!name?.trim()) {
    return Response.json({ ok: false, error: "Name is required" }, { status: 400 });
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }
  if (!language?.trim()) {
    return Response.json({ ok: false, error: "Language is required" }, { status: 400 });
  }
  if (!course?.trim()) {
    return Response.json({ ok: false, error: "Course is required" }, { status: 400 });
  }

  const result = await submitApplication({ name: name.trim(), email: email.trim(), language, course, message });

  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 500 });
  }

  return Response.json({ ok: true });
}
