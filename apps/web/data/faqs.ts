export type FaqAudience = "brands" | "creators" | "agencies";

export interface FaqItem {
  question: string;
  answer: string;
  audience: FaqAudience;
}

export const faqs: FaqItem[] = [
  {
    audience: "brands",
    question: "How do I track my campaign status?",
    answer:
      "Use campaign tracking in the Cloutflow product or connect with your assigned Cloutflow campaign manager for live updates.",
  },
  {
    audience: "brands",
    question: "Can I test the Cloutflow product before onboarding?",
    answer:
      "Yes, brand teams can request a guided demo through the Help Center or our contact page.",
  },
  {
    audience: "brands",
    question: "How does Cloutflow measure campaign success?",
    answer:
      "We combine engagement, CPV, sentiment, creator-level reporting, and Share of Search impact, tailored to your campaign objectives.",
  },
  {
    audience: "creators",
    question: "How does Cloutflow select creators?",
    answer:
      "A mix of audience fit, content quality, authenticity, past performance, pricing benchmarks, and campaign relevance.",
  },
  {
    audience: "creators",
    question: "How do I know if I'm selected for a campaign?",
    answer:
      "The Cloutflow team contacts you directly with brief, commercials, deliverables, and timelines.",
  },
  {
    audience: "creators",
    question: "Where can I check payment status?",
    answer:
      "Raise a payment query through Creator Support in the Help Center.",
  },
  {
    audience: "creators",
    question: "What support do creators get on content?",
    answer:
      "Brief clarity, scripting support, hooks and formats, and approval guidance, without killing your creative voice.",
  },
  {
    audience: "brands",
    question: "Do you support regional campaigns?",
    answer:
      "Yes. We run regional creator pods with localized briefs and central compliance guardrails.",
  },
  {
    audience: "agencies",
    question: "How do agencies partner with Cloutflow?",
    answer:
      "Agencies can run client campaigns on Cloutflow OS with shared workspaces, reporting exports, and dedicated pod support for planning and execution.",
  },
  {
    audience: "agencies",
    question: "Can we manage multiple brand accounts?",
    answer:
      "Yes. Agency teams get multi-client access with role-based permissions, separate campaign views, and consolidated reporting per brand.",
  },
  {
    audience: "agencies",
    question: "How does billing work for agency-led campaigns?",
    answer:
      "Commercials and invoicing can be structured per client or consolidated for the agency. Raise a payments query with client and campaign references.",
  },
  {
    audience: "agencies",
    question: "Do you support white-label or co-branded reporting?",
    answer:
      "Campaign dashboards and exports can be tailored for client presentations. Contact agency support with your reporting format needs.",
  },
];
