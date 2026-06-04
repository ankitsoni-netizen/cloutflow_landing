"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { StoryBrandLogo } from "@/components/stories/StoryBrandLogo";
import type { Story, StoryCategory, StoryPlatform } from "@/lib/types";

const categories: StoryCategory[] = [
  "Beauty & Skincare",
  "FMCG",
  "Tech",
  "Auto",
  "Finance",
];
const platforms: StoryPlatform[] = ["Instagram", "YouTube", "Regional"];
const objectives = ["Launch", "Always-On"];

export function StoriesGrid({ stories }: { stories: Story[] }) {
  const [category, setCategory] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [objective, setObjective] = useState<string>("");

  const filtered = useMemo(() => {
    return stories.filter((s) => {
      if (category && s.category !== category) return false;
      if (platform && s.platform !== platform) return false;
      if (objective && s.objective !== objective) return false;
      return true;
    });
  }, [stories, category, platform, objective]);

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-8" role="group" aria-label="Filters">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 px-3 border border-border-light rounded-md text-sm bg-background-page"
          aria-label="Filter by industry"
        >
          <option value="">All industries</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="h-10 px-3 border border-border-light rounded-md text-sm bg-background-page"
          aria-label="Filter by platform"
        >
          <option value="">All platforms</option>
          {platforms.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          className="h-10 px-3 border border-border-light rounded-md text-sm bg-background-page"
          aria-label="Filter by objective"
        >
          <option value="">All objectives</option>
          {objectives.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <Card key={s.slug} variant="light">
            <StoryBrandLogo
              brandName={s.brandName}
              brandLogo={s.brandLogo}
              className="mb-4 h-40"
            />
            <p className="text-xs uppercase text-text-muted mb-1">{s.category} · {s.platform}</p>
            <h2 className="font-medium mb-2">{s.title}</h2>
            <p className="text-sm text-text-secondary mb-4">{s.shortResult}</p>
            <Link href={`/stories/${s.slug}`} className="text-sm uppercase tracking-nav text-primary">
              Read Case Study →
            </Link>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-text-muted">No stories match your filters.</p>
      )}
    </>
  );
}
