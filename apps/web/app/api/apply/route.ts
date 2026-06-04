import { readFileSync } from "fs";
import { getDb } from "@/lib/db";
import { jobApplications } from "@/lib/schema";
import { sendNotificationEmail, formatFieldsHtml } from "@/lib/email";
import { validateResume, storeResume } from "@/lib/storage";
import {
  checkRateLimit,
  getClientIp,
  checkHoneypot,
  jsonError,
  jsonSuccess,
} from "@/lib/forms";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) return jsonError("Too many requests.", 429);

  const formData = await request.formData();
  const body: Record<string, string> = {};
  formData.forEach((v, k) => {
    if (typeof v === "string") body[k] = v;
  });
  if (!checkHoneypot(body)) return jsonError("Invalid submission.", 400);

  const resume = formData.get("resume");
  if (!(resume instanceof File)) return jsonError("Resume is required.");

  const fileError = validateResume(resume);
  if (fileError) return jsonError(fileError);

  if (!body.fullName || !body.email || !body.whyCloutflow || !body.jobSlug) {
    return jsonError("Please fill all required fields.");
  }

  const resumePath = await storeResume(resume);
  const createdAt = new Date().toISOString();
  const rest = { ...body };
  delete rest.website;

  getDb().insert(jobApplications).values({
    jobSlug: body.jobSlug,
    data: JSON.stringify(rest),
    resumePath,
    createdAt,
  });

  const buffer = readFileSync(resumePath);
  await sendNotificationEmail(
    `[Cloutflow] Job Application: ${body.jobSlug}`,
    `<h2>New job application</h2>${formatFieldsHtml(rest)}`,
    [{ filename: resume.name, content: buffer }]
  );

  return jsonSuccess(
    "Thank you for applying. Our team will review your application and reach out if there is a fit."
  );
}
