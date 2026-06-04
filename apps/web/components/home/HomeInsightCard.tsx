import Image from "next/image";
import Link from "next/link";
import type { Insight, InsightCategory } from "@/lib/types";

const categoryGradients: Record<InsightCategory, string> = {
  Report: "linear-gradient(135deg, #073efd 0%, #11286d 55%, #2e5bff 100%)",
  Blog: "linear-gradient(135deg, #7b1fa2 0%, #4a148c 50%, #b388ff 100%)",
  "Trend Note":
    "linear-gradient(135deg, #00796b 0%, #004d40 50%, #4db6ac 100%)",
  "Platform Insight":
    "linear-gradient(135deg, #1565c0 0%, #0d47a1 50%, #64b5f6 100%)",
  "Campaign Learning":
    "linear-gradient(135deg, #e65100 0%, #bf360c 50%, #ff9800 100%)",
  "Research Paper":
    "linear-gradient(135deg, #37474f 0%, #263238 50%, #78909c 100%)",
  Playbook:
    "linear-gradient(135deg, #5d4037 0%, #3e2723 50%, #a1887f 100%)",
};

/** Home-only teaser covers (does not affect /insights page). */
const homeInsightCovers: Partial<Record<string, string>> = {
  "india-influencer-market-10000-crore": "/brand/himalaya-logo.avif",
  "india-influencer-marketing-rebooted": "/brand/aqualogica-logo.jpg",
  "micro-vs-macro-influencer-roi": "/brand/samsung-logo.jpg",
  "wpp-influencing-with-integrity-2025": "/brand/supermoney-logo.jpg",
};

export function HomeInsightCard({ insight }: { insight: Insight }) {
  const cover = insight.coverImage ?? homeInsightCovers[insight.slug];
  const gradient =
    categoryGradients[insight.category] ?? categoryGradients.Report;

  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-border-light bg-background-page">
      <div className="relative h-44 w-full shrink-0">
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 280px"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{ background: gradient }}
            aria-hidden
          />
        )}
        <span className="absolute left-3 top-3 rounded-sm bg-background-page/90 px-2 py-0.5 text-[10px] uppercase tracking-nav text-primary">
          {insight.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-medium mb-2 leading-snug">{insight.title}</h3>
        <p className="text-sm text-text-secondary flex-1 mb-3">
          {insight.excerpt}
        </p>
        <p className="text-xs text-text-muted mb-4">
          {insight.readTime} · {insight.sourceName || insight.author}
        </p>
        <Link
          href={`/insights/${insight.slug}`}
          className="text-sm uppercase tracking-nav text-primary font-medium w-fit"
        >
          Read →
        </Link>
      </div>
    </article>
  );
}
