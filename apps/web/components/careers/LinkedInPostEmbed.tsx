"use client";

import { useState } from "react";
import type { LifeAtCloutflowPost } from "@/data/life-at-cloutflow-posts";
import { cn } from "@/lib/cn";

export function LinkedInPostEmbed({
  post,
  className,
  compact = false,
}: {
  post: LifeAtCloutflowPost;
  className?: string;
  compact?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-lg border border-white/15 bg-background-dark/50 p-6 text-center",
          compact ? "min-h-[300px]" : "min-h-[320px]",
          className
        )}
      >
        <p className="text-sm text-text-light/70">{post.title}</p>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          View on LinkedIn
        </a>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-white/10 bg-white",
        compact && "careers-linkedin-embed-viewport",
        className
      )}
    >
      <iframe
        src={post.embedSrc}
        title={post.title}
        className={cn(
          "w-full border-0",
          compact
            ? "careers-linkedin-embed-iframe"
            : "h-[min(560px,80vh)]"
        )}
        loading="lazy"
        allowFullScreen
        onError={() => setFailed(true)}
      />
      <noscript>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 text-center text-sm text-primary"
        >
          View {post.title} on LinkedIn
        </a>
      </noscript>
    </div>
  );
}
