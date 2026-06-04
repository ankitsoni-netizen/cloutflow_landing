import { Resend } from "resend";

const to = process.env.EMAIL_TO || "ankit.soni@cloutflow.com";
const from = process.env.EMAIL_FROM || "hello@cloutflow.com";

export async function sendNotificationEmail(
  subject: string,
  html: string,
  attachments?: { filename: string; content: Buffer }[]
) {
  const provider = process.env.EMAIL_PROVIDER || "resend";
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || provider === "stub") {
    console.log("[email stub]", { to, subject, html: html.slice(0, 200) });
    return { id: "stub" };
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    subject,
    html,
    attachments: attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
    })),
  });

  if (result.error) throw new Error(result.error.message);
  return result.data;
}

export function formatFieldsHtml(fields: Record<string, string | undefined>) {
  return Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v!)}</p>`)
    .join("");
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
