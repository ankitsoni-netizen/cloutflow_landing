"use client";

import { useState } from "react";
import type { LifeAtCloutflowPost } from "@/data/life-at-cloutflow-posts";
import { cn } from "@/lib/cn";

export function LinkedInPostEmbed({
  post,
  className,
}: {
  post: LifeAtCloutflowPost;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-md border border-white/15 bg-background-dark/50 p-8 text-center",
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
    <div className={cn("overflow-hidden rounded-md border border-white/10 bg-white", className)}>
      <iframe
        src={post.embedSrc}
        title={post.title}
        className="h-[min(560px,80vh)] w-full border-0"
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
