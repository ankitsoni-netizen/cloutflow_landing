import { brandLogos } from "@/lib/local-assets";
import type { ProductLifecycleStep, ProductProofData } from "@/lib/types";

export const productLifecycleHero: ProductLifecycleStep = {
  id: "hero",
  moduleName: "Cloutflow OS",
  headline: "Cloutflow OS, influence engineered.",
  body: "The operating system for influencer marketing, from creator discovery and competitive intelligence to pricing, planning, launch, QC, measurement, and the next campaign.",
  screenshotAlt: "Cloutflow product UI overview",
  screenshotSpec: "Full Cloutflow workspace with Influencer Network and Smart Search.",
  screenshotUrl: "/product/hero.png",
};

export const productLifecycleSteps: ProductLifecycleStep[] = [
  {
    id: "discover",
    stepLabel: "Discover",
    moduleName: "Atlas Discovery",
    headline:
      "Find the 12 creators who actually move your category, not the 12,000 who don't.",
    body: "Search by category, geo, tier, and engagement floor. Atlas surfaces creator cards with audience-fit scores so you shortlist with confidence, not guesswork.",
    screenshotAlt:
      "Influencer Network with Smart Search, filters, and creator results table",
    screenshotSpec:
      "Influencer Network: Smart Search, platform filters, creator table.",
    screenshotUrl: "/product/discover.png",
    slug: "discovery",
  },
  {
    id: "decode",
    stepLabel: "Decode",
    moduleName: "CloutIQ",
    headline:
      "See exactly how your competitor is spending its influencer budget, then out-plan it.",
    body: "CloutIQ maps a brand's IM footprint, creator mix, category spend, and posting cadence side-by-side with benchmarks so strategy starts from intelligence, not intuition.",
    screenshotAlt: "CloutIQ competitor tracking and category spend breakdown",
    screenshotSpec:
      "CloutIQ: competitor KPIs, spend mix, and tracked posts.",
    screenshotUrl: "/product/decode.png",
    slug: "analytics",
  },
  {
    id: "price",
    stepLabel: "Price",
    moduleName: "Pricing Desk + Ask Commercial",
    headline:
      "Stop chasing rates over WhatsApp. Collect, compare, and lock pricing in one place.",
    body: "Ask Commercial pulls rate cards in via WhatsApp (Wati.io), resolves multi-POC quotes, and lands on a single recommended price before the plan is built.",
    screenshotAlt: "My Pricing workspace with rate cards and negotiation status",
    screenshotSpec: "My Pricing: projects, rate collection, and negotiation pipeline.",
    screenshotUrl: "/product/price.png",
    slug: "pricing",
  },
  {
    id: "launch",
    stepLabel: "Plan & Launch",
    moduleName: "Campaign OS",
    headline:
      "Model the plan, then brief, approve, and track every creator from one board.",
    body: "Slot creators into flights with live CPV projections, then move them through briefed → content submitted → approved → live on a single kanban. No scattered threads, no lost deliverables.",
    screenshotAlt: "Campaigns kanban board across briefed, submitted, approved, and live",
    screenshotSpec:
      "Campaigns: burst overview and kanban across workflow stages.",
    screenshotUrl: "/product/campaigns.png",
    slug: "campaigns",
  },
  {
    id: "verify",
    stepLabel: "Verify",
    moduleName: "AI Controls",
    headline:
      "Set global guardrails for matching and QC before content goes live.",
    body: "Configure authenticity thresholds, brief-compliance rules, and AI-assisted review so off-brief or low-quality deliverables are caught early, not after publish.",
    screenshotAlt: "AI Controls settings for authenticity and content quality",
    screenshotSpec:
      "AI Controls: global guardrails for creator matching and content QA.",
    screenshotUrl: "/product/verify.png",
    slug: "compliance",
  },
  {
    id: "measure",
    stepLabel: "Measure",
    moduleName: "Analytics + Reporting",
    headline: "Prove ROAS in the language your brand speaks.",
    body: "Live results dashboards tie CPV, ROAS, share of voice, reach vs. plan, and top-performing creators to the business case, not just vanity metrics.",
    screenshotAlt: "Reports dashboard with campaign KPIs and content performance",
    screenshotSpec:
      "Reports: KPI tiles, reach chart, and content performance table.",
    screenshotUrl: "/product/measure.png",
    slug: "analytics",
  },
  {
    id: "loop",
    stepLabel: "Loop",
    moduleName: "Loop",
    headline: "Every campaign makes the next one smarter.",
    body: "Campaign learnings feed back into IM DNA, recommending creators, formats, and spend patterns for the next burst or always-on program.",
    screenshotAlt: "Loop recommendations carrying forward top performers and lookalikes",
    screenshotSpec:
      "Loop: campaign learnings and recommended creators for the next flight.",
    screenshotUrl: "/product/loop.png",
    slug: "ai-agents",
  },
];

export const productLifecycleNavItems = productLifecycleSteps.map((step) => ({
  id: step.id,
  label: step.stepLabel ?? step.moduleName,
}));

export const productProof: ProductProofData = {
  headline: "Trusted by brands that treat influence as infrastructure.",
  body: "Enterprise teams run discovery-to-ROI on Cloutflow, with measurable outcomes, not slide decks.",
  statLabel: "Campaign CPV achieved",
  statValue: "₹0.42",
  brands: [
    {
      name: "Himalaya",
      logoUrl: brandLogos.himalaya,
    },
    { name: "Mountain Dew" },
    { name: "Move" },
    {
      name: "Flipkart Super.money",
      logoUrl: brandLogos.supermoney,
    },
    {
      name: "Samsung",
      logoUrl: brandLogos.samsung,
    },
  ],
};
