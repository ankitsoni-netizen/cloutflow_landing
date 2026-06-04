"use client";

import { useCallback, useState } from "react";
import { FaqAccordion } from "@/components/help/FaqAccordion";
import { HelpUseCaseMarquees } from "@/components/help/HelpUseCaseMarquees";
import type { FaqItem } from "@/data/faqs";
import { helpUseCases } from "@/data/help-use-cases";

export function HelpFaqCenter({
  brandFaqs,
  creatorFaqs,
}: {
  brandFaqs: FaqItem[];
  creatorFaqs: FaqItem[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = helpUseCases.find((u) => u.id === selectedId);

  const onSelect = useCallback((id: string) => {
    setSelectedId((prev) => {
      const next = prev === id ? null : id;
      if (next) {
        requestAnimationFrame(() => {
          document
            .getElementById("faq-center")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
      return next;
    });
  }, []);

  return (
    <>
      <div className="help-marquee-viewport relative left-1/2 mb-14 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden">
        <HelpUseCaseMarquees selectedId={selectedId} onSelect={onSelect} />
      </div>

      <div id="faq-center" className="scroll-mt-24">
        <h2 className="text-2xl font-medium tracking-tightest mb-2">FAQ Center</h2>
        <p className="text-sm text-text-secondary mb-8 max-w-2xl">
          Select a topic above to see how we solve it. General answers for brands
          and creators are below.
        </p>

        {selected ? (
          <article
            className="relative mb-10 rounded-md border border-primary/30 bg-primary/[0.04] p-6 md:p-8"
            aria-live="polite"
          >
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-md border border-border-light bg-background-page text-text-secondary transition-probe hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Close solution"
            >
              <span aria-hidden className="text-lg leading-none">
                ×
              </span>
            </button>
            <p className="text-xs uppercase tracking-nav text-primary mb-2 pr-10">
              Solution
            </p>
            <h3 className="text-lg font-medium tracking-tight mb-3 pr-8">
              {selected.label}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {selected.solution}
            </p>
          </article>
        ) : (
          <p className="mb-10 text-sm text-text-muted">
            Click any moving card to view the solution for that query here.
          </p>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          <FaqAccordion items={brandFaqs} label="For Brands" />
          <FaqAccordion items={creatorFaqs} label="For Creators" />
        </div>
      </div>
    </>
  );
}
