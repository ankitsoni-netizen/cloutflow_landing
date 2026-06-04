export type PrincipleIcon =
  | "businessProblem"
  | "culture"
  | "partners"
  | "delivery"
  | "ownership"
  | "speed"
  | "data"
  | "quality"
  | "systems"
  | "simplicity"
  | "trust"
  | "learn"
  | "taste"
  | "proactive"
  | "future";

export interface OperatingPrinciple {
  id: string;
  label: string;
  description: string;
  icon: PrincipleIcon;
}

export const operatingPrinciples: OperatingPrinciple[] = [
  {
    id: "business-problem",
    label: "Problem first",
    description:
      "Start with the business problem, not the creator list.",
    icon: "businessProblem",
  },
  {
    id: "culture-first",
    label: "Culture first",
    description: "Culture first, trend second.",
    icon: "culture",
  },
  {
    id: "partners",
    label: "Partners",
    description: "Creators are partners, not inventory.",
    icon: "partners",
  },
  {
    id: "deck-to-delivery",
    label: "Deck to delivery",
    description: "Ideas must travel from deck to delivery.",
    icon: "delivery",
  },
  {
    id: "ownership",
    label: "Ownership",
    description: "Ownership means owning the outcome.",
    icon: "ownership",
  },
  {
    id: "speed",
    label: "Speed",
    description: "Speed with sharpness.",
    icon: "speed",
  },
  {
    id: "data",
    label: "Data",
    description: "Data should sharpen creativity, not kill it.",
    icon: "data",
  },
  {
    id: "quality",
    label: "Quality",
    description: "Quality is everyone's responsibility.",
    icon: "quality",
  },
  {
    id: "systems",
    label: "Systems",
    description: "Think in systems, not one-offs.",
    icon: "systems",
  },
  {
    id: "simplicity",
    label: "Simplicity",
    description: "Make complexity simple.",
    icon: "simplicity",
  },
  {
    id: "trust",
    label: "Trust",
    description: "Protect trust like a business asset.",
    icon: "trust",
  },
  {
    id: "learn",
    label: "Learn",
    description: "Every campaign should teach us something.",
    icon: "learn",
  },
  {
    id: "taste",
    label: "Taste",
    description:
      "Raise the taste bar. Average content is invisible.",
    icon: "taste",
  },
  {
    id: "proactive",
    label: "Proactive",
    description: "Be proactive, not reactive.",
    icon: "proactive",
  },
  {
    id: "future",
    label: "Future",
    description: "Build for the future of influence.",
    icon: "future",
  },
];
