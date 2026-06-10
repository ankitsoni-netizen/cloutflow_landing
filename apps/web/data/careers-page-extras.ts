import { brandLogos } from "@/lib/local-assets";

export const careersPartnerBrands = [
  { name: "Himalaya", logo: brandLogos.himalaya },
  { name: "Samsung", logo: brandLogos.samsung },
  { name: "Supermoney", logo: brandLogos.supermoney },
  { name: "Aqualogica", logo: brandLogos.aqualogica },
] as const;

export const careersHiringHighlights = [
  {
    title: "Culture & creators",
    description: "Work where influence, data, and brand outcomes meet daily.",
    icon: "culture" as const,
  },
  {
    title: "Builder mindset",
    description: "Roles for operators who improve systems, not just tasks.",
    icon: "build" as const,
  },
  {
    title: "Enterprise scale",
    description: "Serious brands, measurable campaigns, long-term trust.",
    icon: "scale" as const,
  },
  {
    title: "Fast + deep",
    description: "Speed with clarity. Thinking that holds up under scale.",
    icon: "pace" as const,
  },
] as const;

export const careersHeroSignals = [
  {
    label: "Creator economy",
    detail: "Culture, data, and brand outcomes in one place",
    icon: "culture" as const,
  },
  {
    label: "Enterprise brands",
    detail: "Serious campaigns with measurable impact",
    icon: "scale" as const,
  },
  {
    label: "Builder mindset",
    detail: "Systems thinkers who close loops fast",
    icon: "build" as const,
  },
] as const;

export const careersLifeHighlights = [
  {
    label: "Annual offsites",
    detail: "Team trips, celebrations, and resets",
    icon: "offsite" as const,
  },
  {
    label: "Cross-functional pods",
    detail: "Revenue, ops, product, and creator teams",
    icon: "pods" as const,
  },
  {
    label: "Learning culture",
    detail: "Workshops, reviews, and shared wins",
    icon: "learning" as const,
  },
  {
    label: "India-first",
    detail: "Built for creators and brands here",
    icon: "globe" as const,
  },
] as const;

export const careersValueIcons = [
  "target",
  "bolt",
  "compass",
  "spark",
  "chart",
  "team",
] as const;
