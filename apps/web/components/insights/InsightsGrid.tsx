"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Insight, InsightCategory } from "@/lib/types";

const categories: InsightCategory[] = [
  "Report",
  "Blog",
  "Trend Note",
  "Platform Insight",
  "Campaign Learning",
  "Research Paper",
  "Playbook",
];

export function InsightsGrid({ insights }: { insights: Insight[] }) {
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return insights.filter((i) => {
      if (category && i.category !== category) return false;
      if (search && !i.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [insights, category, search]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="search"
          placeholder="Search insights..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 px-4 border border-border-light rounded-md flex-1 max-w-md"
          aria-label="Search insights"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 px-3 border border-border-light rounded-md text-sm"
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((i) => (
          <Card key={i.slug} variant="light">
            <span className="text-xs uppercase tracking-nav text-primary">{i.category}</span>
            <h2 className="font-medium mt-2 mb-2">{i.title}</h2>
            <p className="text-sm text-text-secondary mb-4">{i.excerpt}</p>
            <p className="text-xs text-text-muted mb-4">
              {i.readTime} · {i.sourceName || i.author}
            </p>
            <Link href={`/insights/${i.slug}`} className="text-sm uppercase tracking-nav text-primary">
              Read →
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}
