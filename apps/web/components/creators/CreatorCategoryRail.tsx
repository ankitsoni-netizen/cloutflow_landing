"use client";

import { creatorCategories } from "@/data/featured-creators";

export function CreatorCategoryRail() {
  const items = [...creatorCategories, ...creatorCategories];

  return (
    <div
      data-nav-surface="dark"
      className="border-y border-white/10 bg-background-dark py-5 overflow-hidden"
    >
      <div className="flex w-max animate-creator-marquee-reverse gap-8 px-4">
        {items.map((cat, i) => (
          <span
            key={`${cat}-${i}`}
            className="shrink-0 text-sm font-medium uppercase tracking-nav text-text-light/50 whitespace-nowrap hover:text-primary transition-colors"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
