import { mkdirSync, existsSync, writeFileSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_EXT = [".pdf", ".doc", ".docx"];

export function validateResume(file: File): string | null {
  if (file.size > MAX_SIZE) return "Resume must be 10MB or smaller.";
  const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
  if (!ALLOWED_EXT.includes(ext) && !ALLOWED.includes(file.type)) {
    return "Resume must be PDF, DOC, or DOCX.";
  }
  return null;
}

export async function storeResume(file: File): Promise<string> {
  const base =
    process.env.FILE_STORAGE_PATH || join(process.cwd(), "uploads");
  if (!existsSync(base)) mkdirSync(base, { recursive: true });

  const ext = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf("."))
    : ".pdf";
  const filename = `${randomUUID()}${ext}`;
  const filepath = join(base, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(filepath, buffer);
  return filepath;
}
