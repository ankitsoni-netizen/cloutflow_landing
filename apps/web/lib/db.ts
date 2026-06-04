import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import * as schema from "./schema";

const defaultPath = join(process.cwd(), "data", "cloutflow.db");
const dbPath = process.env.DATABASE_URL?.replace("file:", "") || defaultPath;

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!_db) {
    const dir = dirname(dbPath);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const sqlite = new Database(dbPath);
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS job_applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        job_slug TEXT NOT NULL,
        data TEXT NOT NULL,
        resume_path TEXT,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS creator_applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS help_tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_type TEXT NOT NULL,
        data TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `);
    _db = drizzle(sqlite, { schema });
  }
  return _db;
}
