import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  data: text("data").notNull(),
  createdAt: text("created_at").notNull(),
});

export const jobApplications = sqliteTable("job_applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  jobSlug: text("job_slug").notNull(),
  data: text("data").notNull(),
  resumePath: text("resume_path"),
  createdAt: text("created_at").notNull(),
});

export const creatorApplications = sqliteTable("creator_applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  data: text("data").notNull(),
  createdAt: text("created_at").notNull(),
});

export const helpTickets = sqliteTable("help_tickets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ticketType: text("ticket_type").notNull(),
  data: text("data").notNull(),
  createdAt: text("created_at").notNull(),
});
