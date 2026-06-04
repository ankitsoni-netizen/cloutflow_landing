import type { Job } from "./types";

export const JOB_DEPARTMENTS = [
  "Revenue",
  "Media Planning",
  "Media Strategy",
  "Copy Writing",
  "Content",
  "Social Media",
  "Production",
  "Video Production",
  "Creator Procurement",
  "Talent Manager",
  "Operations",
  "HR",
  "Legal",
  "Finance",
  "Founder Office",
  "Front Desk",
  "SDE 1",
  "SDE 2",
  "SDE 3",
  "Product Manager",
  "Engineering",
  "Design",
] as const;

export const JOB_EXPERIENCE_LEVELS = [
  "0–2 years",
  "2–4 years",
  "2–5 years",
  "3–5 years",
  "4–6 years",
  "4–7 years",
  "5–8 years",
  "6+ years",
] as const;

export const JOB_LOCATIONS = [
  "Mumbai",
  "Bangalore",
  "Remote",
  "Hybrid",
] as const;

export const JOB_AREAS_OF_INTEREST = [
  "Brand Strategy & Growth",
  "Campaign Operations",
  "Content & Storytelling",
  "Social Media & Community",
  "Production & Studio",
  "Creator Ecosystem",
  "Influencer Marketing",
  "Data & Analytics",
  "Product & Technology",
  "Sales & Partnerships",
  "People & Culture",
  "Legal & Compliance",
  "Finance & Operations",
] as const;

export type JobDepartment = (typeof JOB_DEPARTMENTS)[number];
export type JobExperienceLevel = (typeof JOB_EXPERIENCE_LEVELS)[number];
export type JobLocationFilter = (typeof JOB_LOCATIONS)[number];
export type JobAreaOfInterest = (typeof JOB_AREAS_OF_INTEREST)[number];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function getJobExperienceLevel(job: Job): string {
  return job.experienceLevel ?? job.experience;
}

export function matchesDepartment(jobDepartment: string, filter: string): boolean {
  return normalize(jobDepartment) === normalize(filter);
}

export function matchesExperience(job: Job, filter: string): boolean {
  return normalize(getJobExperienceLevel(job)) === normalize(filter);
}

export function matchesAreaOfInterest(job: Job, filter: string): boolean {
  if (!job.areaOfInterest) return false;
  return normalize(job.areaOfInterest) === normalize(filter);
}

export function matchesLocation(jobLocation: string, filter: string): boolean {
  const loc = normalize(jobLocation);
  const f = normalize(filter);

  if (f === "hybrid") {
    return loc.includes("mumbai") && loc.includes("bangalore");
  }
  if (f === "remote") {
    return loc.includes("remote");
  }
  if (f === "mumbai") {
    return loc.includes("mumbai");
  }
  if (f === "bangalore") {
    return loc.includes("bangalore");
  }
  return loc.includes(f);
}
