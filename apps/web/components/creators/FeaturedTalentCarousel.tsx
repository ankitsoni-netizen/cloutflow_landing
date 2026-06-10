"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { creatorsSection } from "@/components/creators/creators-section";
import type { FeaturedCreatorReel } from "@/lib/creator-featured-reels";
import { usernameFromOEmbedAuthor } from "@/lib/creator-featured-reels";
import { cn } from "@/lib/cn";

type InstagramOEmbed = {
  thumbnail_url?: string;
  author_name?: string;
  author_url?: string;
};

type ReelMeta = {
  thumbnailUrl: string | null;
  videoUrl: string | null;
  username: string | null;
};

async function fetchReelMeta(url: string): Promise<ReelMeta> {
  try {
    const apiRes = await fetch(
      `/api/creators/instagram-meta?url=${encodeURIComponent(url)}`
    );
    if (apiRes.ok) {
      const data = (await apiRes.json()) as {
        thumbnailUrl?: string | null;
        videoUrl?: string | null;
        username?: string | null;
      };
      if (data.videoUrl || data.thumbnailUrl || data.username) {
        return {
          thumbnailUrl: data.thumbnailUrl ?? null,
          videoUrl: data.videoUrl ?? null,
          username: data.username ?? null,
        };
      }
    }
  } catch {
    // fall through to direct oEmbed for thumbnail / username only
  }

  try {
    const directRes = await fetch(
      `https://api.instagram.com/oembed?url=${encodeURIComponent(url)}&omitscript=true&maxwidth=640`
    );
    if (directRes.ok) {
      const data = (await directRes.json()) as InstagramOEmbed;
      return {
        thumbnailUrl: data.thumbnail_url ?? null,
        videoUrl: null,
        username: usernameFromOEmbedAuthor(data.author_url, data.author_name),
      };
    }
  } catch {
    // no metadata available
  }

  return { thumbnailUrl: null, videoUrl: null, username: null };
}

function PremiumReelCard({
  reel,
  meta,
}: {
  reel: FeaturedCreatorReel;
  meta: ReelMeta | undefined;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailUrl = meta?.thumbnailUrl ?? null;
  const videoUrl = meta?.videoUrl ?? null;
  const username = meta?.username ?? null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    const play = () => {
      void video.play().catch(() => {
        // Autoplay can be blocked until the element is visible.
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    play();

    return () => observer.disconnect();
  }, [videoUrl]);

  return (
    <article className="creators-reel-card shrink-0 w-[280px]">
      <Link
        href={reel.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
        aria-label={
          username
            ? `Watch ${username} on Instagram`
            : "Watch featured creator content on Instagram"
        }
      >
        <div className="creators-reel-viewport relative aspect-[9/16] overflow-hidden rounded-2xl bg-black">
          {thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnailUrl}
              alt=""
              className="absolute inset-0 z-0 h-full w-full object-cover object-center"
              aria-hidden
            />
          ) : (
            <div
              className="absolute inset-0 z-0 bg-gradient-to-br from-background-blue/80 via-background-dark to-primary/30"
              aria-hidden
            />
          )}

          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              poster={thumbnailUrl ?? undefined}
              className="creators-reel-video absolute inset-0 z-[1] h-full w-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              tabIndex={-1}
            />
          ) : null}

          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/75 via-transparent to-black/25"
            aria-hidden
          />

          {username ? (
            <div className="pointer-events-none absolute bottom-4 left-4 z-[2]">
              <span className="creators-reel-handle inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3.5 py-2 text-sm font-medium tracking-tight text-white backdrop-blur-md">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_10px_rgba(7,62,253,0.85)]" />
                {username}
              </span>
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

export function FeaturedTalentCarousel({ reels }: { reels: FeaturedCreatorReel[] }) {
  const track = [...reels, ...reels];
  const [metaByUrl, setMetaByUrl] = useState<Record<string, ReelMeta>>({});

  useEffect(() => {
    let cancelled = false;

    void Promise.all(
      reels.map(async (reel) => {
        const meta = await fetchReelMeta(reel.url);
        return [reel.url, meta] as const;
      })
    ).then((entries) => {
      if (cancelled) return;
      setMetaByUrl(Object.fromEntries(entries));
    });

    return () => {
      cancelled = true;
    };
  }, [reels]);

  return (
    <section
      id="featured"
      data-nav-surface="page"
      className={cn(creatorsSection, "bg-background-page overflow-hidden")}
    >
      <div className="container-page mb-10 max-w-3xl">
        <p className="font-label tracking-nav text-text-muted mb-2">Featured</p>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tightest">
          Featured Content
        </h2>
      </div>

      <div className="creators-reel-marquee overflow-hidden w-full">
        <div className="creators-reel-marquee-track flex w-max gap-6 py-2">
          {track.map((reel, index) => (
            <PremiumReelCard
              key={`${reel.url}-${index}`}
              reel={reel}
              meta={metaByUrl[reel.url]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
