"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { creatorsSection } from "@/components/creators/creators-section";
import { featuredCreators } from "@/data/featured-creators";
import { cn } from "@/lib/cn";

export function FeaturedTalentCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section
      id="featured"
      className={cn(creatorsSection, "bg-background-page overflow-hidden")}
    >
      <div className="container-page mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-label tracking-nav text-text-muted mb-2">
            Featured
          </p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tightest">
            Profiles in the network
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="h-11 w-11 rounded-md border border-border-light hover:border-primary hover:text-primary transition-probe"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="h-11 w-11 rounded-md border border-border-light hover:border-primary hover:text-primary transition-probe"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth px-[max(1.25rem,calc((100vw-1280px)/2+2.5rem))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {featuredCreators.map((creator) => (
          <article
            key={creator.id}
            className="group relative shrink-0 w-[min(85vw,320px)] snap-start overflow-hidden rounded-md border border-border-light bg-background-soft creators-talent-card"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={creator.image}
                alt={creator.name}
                fill
                sizes="320px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="font-label-sm tracking-nav text-white/70 bg-black/40 px-2 py-1 backdrop-blur-sm">
                  {creator.category}
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5">
                <p className="font-label-sm text-primary mb-1">
                  Social reach {creator.reach}
                </p>
                <h3 className="text-xl font-medium text-white tracking-tight">
                  {creator.name}
                </h3>
                <p className="text-sm text-white/60 mt-0.5">{creator.handle}</p>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between gap-3 border-t border-border-light bg-background-page">
              <div className="flex flex-wrap gap-2">
                {creator.platforms?.map((p) => (
                  <span
                    key={p.name}
                    className="font-label-sm text-text-muted"
                  >
                    {p.name} {p.followers}
                  </span>
                ))}
              </div>
              <Link
                href="/creators/apply"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-xs uppercase tracking-nav text-primary font-medium opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
              >
                Add to network →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
