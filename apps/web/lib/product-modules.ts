import type { ProductModule } from "./types";

export const productModules: ProductModule[] = [
  {
    slug: "ai-agents",
    title: "AI Agents",
    tagline: "Intelligence that accelerates every campaign decision.",
    description:
      "Campaign planning assistance, creator shortlisting, script and content QC, brand safety checks, performance insights, and trend identification, powered by agents built for influencer marketing.",
    features: [
      "Campaign planning assistance",
      "Creator shortlisting",
      "Script and content QC",
      "Brand safety checks",
      "Performance insights",
      "Trend identification",
    ],
  },
  {
    slug: "discovery",
    title: "Creator Discovery",
    tagline: "Find creators who fit the brand, not just the feed.",
    description:
      "Search a rich creator database with audience analysis, authenticity checks, engagement quality scoring, niche mapping, regional discovery, and performance history.",
    features: [
      "Creator database",
      "Audience analysis",
      "Real-follower checks",
      "Engagement quality",
      "Niche mapping",
      "Regional discovery",
      "Performance history",
    ],
  },
  {
    slug: "analytics",
    title: "Analytics",
    tagline: "Measure what influence actually moves.",
    description:
      "Views, engagement, CPV, CPM, content-format analysis, sentiment, Share of Search impact, and campaign benchmarks in one analytics layer.",
    features: [
      "Views and engagement",
      "CPV and CPM",
      "Content-format analysis",
      "Sentiment tracking",
      "Share of Search impact",
      "Campaign benchmarks",
    ],
  },
  {
    slug: "pricing",
    title: "Pricing Intelligence",
    tagline: "Price with confidence, negotiate with data.",
    description:
      "Rate benchmarking, CPV-based pricing logic, historical cost data, negotiation intelligence, budget optimization, and category-wise comparison.",
    features: [
      "Rate benchmarking",
      "CPV-based pricing logic",
      "Historical cost data",
      "Negotiation intelligence",
      "Budget optimization",
      "Category-wise comparison",
    ],
  },
  {
    slug: "reporting",
    title: "Reporting",
    tagline: "Live dashboards, not screenshot decks.",
    description:
      "Live dashboards, creator-wise performance, sentiment tracking, campaign benchmarks, and final report generation that moves beyond Excel.",
    features: [
      "Live dashboards",
      "Creator-wise performance",
      "Sentiment tracking",
      "Campaign benchmarks",
      "Final report generation",
    ],
  },
  {
    slug: "campaigns",
    title: "Briefs & Campaigns",
    tagline: "From brief to dispatch, one connected workflow.",
    description:
      "Brief sharing, campaign timelines, creator status tracking, deliverable management, approval flows, live status, and dispatch and payment tracking.",
    features: [
      "Brief sharing",
      "Campaign timeline",
      "Creator status tracker",
      "Deliverable management",
      "Approval flows",
      "Dispatch and payment tracking",
    ],
  },
  {
    slug: "compliance",
    title: "Content Quality & Compliance",
    tagline: "Creative freedom with guardrails that protect the brand.",
    description:
      "Script QC, mandatory talking-point checks, ASCI and compliance checks, brand-safety filters, wrong-claim detection, guideline matching, and approval history.",
    features: [
      "Script QC",
      "Mandatory talking-point checks",
      "ASCI and compliance checks",
      "Brand-safety filters",
      "Wrong-claim detection",
      "Guideline matching",
      "Approval history",
    ],
  },
];

export function getProductModule(slug: string) {
  return productModules.find((m) => m.slug === slug);
}
