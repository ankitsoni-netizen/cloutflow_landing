"use client";

import { LinkedInPostEmbed } from "@/components/careers/LinkedInPostEmbed";
import type { LifeAtCloutflowPost } from "@/data/life-at-cloutflow-posts";
import { cn } from "@/lib/cn";

function splitIntoTwoRows<T>(items: T[]): [T[], T[]] {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}

function MarqueeRow({
  posts,
  direction,
}: {
  posts: LifeAtCloutflowPost[];
  direction: "ltr" | "rtl";
}) {
  const track = [...posts, ...posts];

  return (
    <div className="careers-linkedin-marquee overflow-hidden w-full">
      <div
        className={cn(
          "careers-linkedin-marquee-track flex w-max gap-4 py-1",
          direction === "ltr"
            ? "careers-linkedin-marquee-track--ltr"
            : "careers-linkedin-marquee-track--rtl"
        )}
      >
        {track.map((post, index) => (
          <article
            key={`${post.id}-${index}`}
            className="careers-linkedin-card careers-reactive-card shrink-0 w-[272px] sm:w-[300px] rounded-xl border border-white/10 bg-white/5 p-1.5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm"
          >
            <LinkedInPostEmbed post={post} compact />
          </article>
        ))}
      </div>
    </div>
  );
}

export function LifeAtLinkedInMarquee({
  posts,
}: {
  posts: LifeAtCloutflowPost[];
}) {
  const [topRow, bottomRow] = splitIntoTwoRows(posts);

  return (
    <div className="flex flex-col gap-5 w-full">
      <MarqueeRow posts={topRow} direction="ltr" />
      <MarqueeRow posts={bottomRow} direction="ltr" />
    </div>
  );
}
