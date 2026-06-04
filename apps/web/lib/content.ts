import type { Story, Insight, Job } from "./types";
import { mockStories } from "@/data/stories";
import { mockInsights } from "@/data/insights";
import { mockJobs } from "@/data/jobs";

export async function getStories(): Promise<Story[]> {
  return mockStories;
}

export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  return mockStories.find((s) => s.slug === slug);
}

export async function getInsights(): Promise<Insight[]> {
  return mockInsights;
}

export async function getInsightBySlug(
  slug: string
): Promise<Insight | undefined> {
  return mockInsights.find((i) => i.slug === slug);
}

export async function getJobs(): Promise<Job[]> {
  return mockJobs.filter((j) => j.isOpen);
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  return mockJobs.find((j) => j.slug === slug);
}
