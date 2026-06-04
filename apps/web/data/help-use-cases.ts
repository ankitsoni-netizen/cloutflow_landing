import type { HelpTicketType } from "@/lib/help-ticket-types";

export interface HelpUseCase {
  id: string;
  ticketType: HelpTicketType;
  label: string;
  description: string;
  solution: string;
  audience: "brands" | "creators";
}

export const helpUseCases: HelpUseCase[] = [
  {
    id: "track-campaign",
    ticketType: "track-campaign",
    label: "Track your campaign",
    description: "Live status, timelines, and deliverables.",
    audience: "brands",
    solution:
      "Open your campaign workspace in Cloutflow for milestone tracking, creator dispatch status, and QC checkpoints. Your campaign manager shares the same view for live updates. For urgent escalations, raise a track-campaign ticket with your campaign name or ID.",
  },
  {
    id: "product-demo",
    ticketType: "product-demo",
    label: "Test the Cloutflow product",
    description: "Guided walkthrough of modules and workflows.",
    audience: "brands",
    solution:
      "Brand teams can request a guided demo of Atlas Discovery, Campaign OS, reporting, and commercial workflows. Submit a product-demo request with your objectives and team size; we schedule a session tailored to your use case.",
  },
  {
    id: "brand-support",
    ticketType: "brand-support",
    label: "Brand support",
    description: "Accounts, access, and campaign operations.",
    audience: "brands",
    solution:
      "For account access, campaign setup, approvals, or day-to-day brand-side operations, use brand support. Include your company name, campaign context, and what you need resolved so the right pod can respond quickly.",
  },
  {
    id: "creator-support",
    ticketType: "creator-support",
    label: "Creator support",
    description: "Briefs, approvals, posting, and deliverables.",
    audience: "creators",
    solution:
      "Creators receive briefs, commercials, and timelines directly from the Cloutflow team. For brief clarity, approval status, posting windows, or deliverable questions, open a creator-support ticket with your handle and campaign name.",
  },
  {
    id: "reporting-analytics",
    ticketType: "reporting-analytics",
    label: "Reporting & analytics",
    description: "Dashboards, CPV, exports, and benchmarks.",
    audience: "brands",
    solution:
      "Campaign reporting covers engagement, CPV, sentiment, creator-level performance, and Share of Search where applicable. Request exports or benchmark context via reporting & analytics; specify the campaign and metrics you need.",
  },
  {
    id: "payments-commercials",
    ticketType: "payments-commercials",
    label: "Payments & commercials",
    description: "Rates, invoices, and payout status.",
    audience: "creators",
    solution:
      "Commercial terms are confirmed before go-live. Creators can check payment status and raise disputes through payments & commercials with campaign and invoice references. Brands can query billing and rate-card workflows on the same track.",
  },
  {
    id: "product-documentation",
    ticketType: "product-documentation",
    label: "Product documentation",
    description: "How-to guides for every Cloutflow module.",
    audience: "brands",
    solution:
      "Documentation covers discovery, planning, launch, QC, measurement, and loop workflows. Select product documentation and name the module (e.g. Atlas Discovery, Guardian QC) for setup guides, permissions, and best practices.",
  },
  {
    id: "briefs-approvals",
    ticketType: "creator-support",
    label: "Campaign briefs & approvals",
    description: "Scope, scripts, and sign-off flows.",
    audience: "creators",
    solution:
      "Every campaign ships with clear objectives, deliverables, and approval steps. For missing brief fields, revision rounds, or approval delays, contact creator support with your campaign ID. Brands can route brief changes through brand support.",
  },
  {
    id: "discovery-shortlist",
    ticketType: "product-demo",
    label: "Creator discovery & shortlisting",
    description: "Find and vet creators for your category.",
    audience: "brands",
    solution:
      "Atlas Discovery helps you search by category, geo, tier, and engagement with audience-fit signals. Book a demo or use brand support to shortlist creators aligned to your campaign goals and compliance needs.",
  },
  {
    id: "qc-brand-safety",
    ticketType: "brand-support",
    label: "QC & brand safety",
    description: "Content review before and after go-live.",
    audience: "brands",
    solution:
      "Guardian QC balances brand safety with creator voice. For pre-post review, caption checks, or escalation on flagged content, use brand support and reference the asset or creator post in your message.",
  },
  {
    id: "pricing-rate-cards",
    ticketType: "payments-commercials",
    label: "Pricing & rate cards",
    description: "Commercials, negotiations, and benchmarks.",
    audience: "brands",
    solution:
      "Pricing Desk and Ask Commercial consolidate rate collection and recommended pricing before plans are built. For rate-card status, multi-POC quotes, or benchmark questions, choose payments & commercials with the project name.",
  },
  {
    id: "creator-onboarding",
    ticketType: "creator-support",
    label: "Join the creator network",
    description: "Apply, profile review, and first campaign.",
    audience: "creators",
    solution:
      "Apply via the Creators page; our team reviews fit by category, audience, and content quality. Once onboarded, you receive briefs for campaigns matched to your profile. Track selection status through creator support.",
  },
  {
    id: "regional-campaigns",
    ticketType: "brand-support",
    label: "Regional & language campaigns",
    description: "Geo-specific pods and localized briefs.",
    audience: "brands",
    solution:
      "We run regional creator pods with localized briefs and central compliance guardrails. For multi-market launches or language-specific content, contact brand support with target geos and brand guidelines.",
  },
  {
    id: "search-impact",
    ticketType: "reporting-analytics",
    label: "Share of Search & impact",
    description: "Search lift and long-term brand metrics.",
    audience: "brands",
    solution:
      "Beyond engagement, we measure search and brand impact where campaigns warrant it. Request Share of Search or custom impact views through reporting & analytics with your campaign timeframe and KPIs.",
  },
];

/** First row scrolls left; second row scrolls right. */
export const helpUseCasesRowOne = helpUseCases.slice(0, 7);
export const helpUseCasesRowTwo = helpUseCases.slice(7);
