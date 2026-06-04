export const HELP_TICKET_TYPES = [
  {
    value: "track-campaign",
    label: "Track your campaign",
    description: "Status, timelines, and deliverables.",
  },
  {
    value: "product-demo",
    label: "Test the Cloutflow product",
    description: "Request a guided product demo.",
  },
  {
    value: "brand-support",
    label: "Brand support",
    description: "Account and campaign support for brands.",
  },
  {
    value: "creator-support",
    label: "Creator support",
    description: "Briefs, approvals, and campaign queries.",
  },
  {
    value: "reporting-analytics",
    label: "Reporting & analytics",
    description: "Dashboards, benchmarks, and exports.",
  },
  {
    value: "payments-commercials",
    label: "Payments & commercials",
    description: "Invoices, rates, and payment status.",
  },
  {
    value: "product-documentation",
    label: "Product documentation",
    description: "Guides for using Cloutflow modules.",
  },
] as const;

export type HelpTicketType = (typeof HELP_TICKET_TYPES)[number]["value"];

export function getTicketTypeLabel(value: string): string {
  return HELP_TICKET_TYPES.find((t) => t.value === value)?.label ?? value;
}
