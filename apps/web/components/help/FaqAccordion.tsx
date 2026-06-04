"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/faqs";

export function FaqAccordion({
  items,
  label,
}: {
  items: FaqItem[];
  label: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div role="region" aria-label={label} className="space-y-2">
      <h3 className="text-sm uppercase tracking-nav font-medium mb-4">{label}</h3>
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `faq-${label}-${i}`;
        return (
          <div key={item.question} className="border border-border-light rounded-md">
            <button
              type="button"
              id={`${id}-button`}
              aria-expanded={isOpen}
              aria-controls={`${id}-panel`}
              className="w-full text-left px-4 py-4 flex justify-between items-center font-medium text-sm"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {item.question}
              <span aria-hidden>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div
                id={`${id}-panel`}
                role="region"
                aria-labelledby={`${id}-button`}
                className="px-4 pb-4 text-sm text-text-secondary"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
