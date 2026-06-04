import { getDb } from "@/lib/db";
import { contactSubmissions } from "@/lib/schema";
import { sendNotificationEmail, formatFieldsHtml } from "@/lib/email";
import {
  checkRateLimit,
  getClientIp,
  checkHoneypot,
  jsonError,
  jsonSuccess,
} from "@/lib/forms";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) return jsonError("Too many requests.", 429);

  const body = await request.json();
  if (!checkHoneypot(body)) return jsonError("Invalid submission.", 400);

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((i) => {
      if (i.path[0]) errors[String(i.path[0])] = i.message;
    });
    return Response.json(
      { success: false, message: "Validation failed.", errors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const createdAt = new Date().toISOString();
  getDb().insert(contactSubmissions).values({
    data: JSON.stringify(data),
    createdAt,
  });

  await sendNotificationEmail(
    `[Cloutflow] Contact Sales: ${data.companyName}`,
    `<h2>New contact submission</h2>${formatFieldsHtml(data as Record<string, string>)}`
  );

  return jsonSuccess(
    "Thank you for reaching out. Our team will review your requirements and connect with you shortly."
  );
}
