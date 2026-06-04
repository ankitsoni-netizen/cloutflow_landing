"use client";

import { featuredCreators } from "@/data/featured-creators";

export function CreatorMarquee() {
  const labels = featuredCreators.map(
    (c) => `${c.name} · ${c.reach} · ${c.category}`
  );

  const track = [...labels, ...labels];

  return (
    <div className="border-y border-border-light bg-background-page overflow-hidden py-5">
      <div className="flex w-max animate-creator-marquee gap-16">
        {track.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="shrink-0 font-label text-xs uppercase tracking-nav text-text-muted whitespace-nowrap flex items-center gap-16"
          >
            <span>{label}</span>
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
