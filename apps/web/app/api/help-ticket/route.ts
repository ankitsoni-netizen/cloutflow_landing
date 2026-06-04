import { getDb } from "@/lib/db";
import { helpTickets } from "@/lib/schema";
import { sendNotificationEmail, formatFieldsHtml } from "@/lib/email";
import {
  checkRateLimit,
  getClientIp,
  checkHoneypot,
  jsonError,
  jsonSuccess,
} from "@/lib/forms";
import { helpTicketSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) return jsonError("Too many requests.", 429);

  const body = await request.json();
  if (!checkHoneypot(body)) return jsonError("Invalid submission.", 400);

  const parsed = helpTicketSchema.safeParse(body);
  if (!parsed.success) return jsonError("Please check your inputs.");

  const data = parsed.data;
  const createdAt = new Date().toISOString();
  getDb().insert(helpTickets).values({
    ticketType: data.ticketType,
    data: JSON.stringify(data),
    createdAt,
  });

  await sendNotificationEmail(
    `[Cloutflow] Help Ticket: ${data.ticketType}`,
    `<h2>Help center ticket</h2>${formatFieldsHtml(data as Record<string, string>)}`
  );

  return jsonSuccess("Ticket submitted.");
}
