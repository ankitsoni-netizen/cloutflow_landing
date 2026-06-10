"use client";

import { useState } from "react";
import { FaqAccordion } from "@/components/help/FaqAccordion";
import type { FaqAudience, FaqItem } from "@/data/faqs";
import { cn } from "@/lib/cn";

const quickAccess: { id: FaqAudience; label: string }[] = [
  { id: "brands", label: "For Brands" },
  { id: "creators", label: "For Creators" },
  { id: "agencies", label: "For Agencies" },
];

export function HelpFaqCenter({
  brandFaqs,
  creatorFaqs,
  agencyFaqs,
}: {
  brandFaqs: FaqItem[];
  creatorFaqs: FaqItem[];
  agencyFaqs: FaqItem[];
}) {
  const [audience, setAudience] = useState<FaqAudience>("brands");

  const faqsByAudience: Record<FaqAudience, FaqItem[]> = {
    brands: brandFaqs,
    creators: creatorFaqs,
    agencies: agencyFaqs,
  };

  const activeLabel =
    quickAccess.find((item) => item.id === audience)?.label ?? "FAQs";

  return (
    <div id="faq-center" className="scroll-mt-24">
      <h2 className="text-2xl font-medium tracking-tightest mb-2">FAQ Center</h2>
      <p className="text-sm text-text-secondary mb-6 max-w-2xl">
        Quick access to answers by who you are. Select a category below.
      </p>

      <div
        className="flex flex-wrap gap-3 mb-10"
        role="tablist"
        aria-label="FAQ categories"
      >
        {quickAccess.map((item) => {
          const isActive = audience === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="faq-panel"
              onClick={() => setAudience(item.id)}
              className={cn(
                "rounded-md border px-5 py-2.5 text-sm font-medium tracking-tight transition-probe focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActive
                  ? "border-primary bg-primary text-text-light shadow-blue"
                  : "border-border-light bg-background-page text-text-primary hover:border-primary/40 hover:text-primary"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div id="faq-panel" role="tabpanel" aria-label={activeLabel}>
        <FaqAccordion items={faqsByAudience[audience]} label={activeLabel} />
      </div>
    </div>
  );
}
