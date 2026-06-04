import { z } from "zod";
import { creatorSocialPlatforms } from "@/lib/creator-social-platforms";

export const contactSchema = z.object({
  fullName: z.string().min(2),
  workEmail: z.string().email(),
  phone: z.string().min(8),
  companyName: z.string().min(1),
  designation: z.string().min(1),
  brandCategory: z.string().min(1),
  monthlyBudget: z.string().min(1),
  lookingFor: z.string().min(1),
  campaignObjective: z.string().optional(),
  expectedTimeline: z.string().optional(),
  message: z.string().optional(),
  website: z.string().optional(),
});

export const creatorApplySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  socialPlatform: z.enum(creatorSocialPlatforms),
  socialUsername: z.string().min(1),
  portfolioLink: z.union([z.string().url(), z.literal("")]).optional(),
  website: z.string().optional(),
});

export const helpTicketSchema = z.object({
  ticketType: z.enum([
    "track-campaign",
    "product-demo",
    "brand-support",
    "creator-support",
    "reporting-analytics",
    "payments-commercials",
    "product-documentation",
  ]),
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  company: z.string().optional(),
  campaignName: z.string().optional(),
  phone: z.string().optional(),
  socialHandle: z.string().optional(),
  topic: z.string().optional(),
  audience: z.enum(["brand", "creator"]).optional(),
  website: z.string().optional(),
});

export const jobApplySchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  city: z.string().min(1),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  currentCompany: z.string().optional(),
  yearsExperience: z.string().min(1),
  currentCtc: z.string().optional(),
  expectedCtc: z.string().optional(),
  noticePeriod: z.string().optional(),
  whyCloutflow: z.string().min(20),
  jobSlug: z.string().min(1),
  website: z.string().optional(),
});
