"use client";

import Image from "next/image";
import { featuredCreators } from "@/data/featured-creators";
import { cn } from "@/lib/cn";

export function CreatorFaceCollage({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "hero";
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="pointer-events-none absolute -inset-6 bg-primary/25 blur-3xl"
        aria-hidden
      />
      <div
        className={cn(
          "relative grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-3",
          variant === "hero"
            ? "auto-rows-[76px] sm:auto-rows-[84px] md:auto-rows-[96px]"
            : "auto-rows-[72px] sm:auto-rows-[80px] md:auto-rows-[88px]"
        )}
      >
        {featuredCreators.map((creator, index) => (
          <article
            key={creator.id}
            className={cn(
              "group relative overflow-hidden rounded-md border border-white/15 bg-background-dark creators-collage-tile",
              creator.gridClass,
              variant === "hero" && "shadow-card"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Image
              src={creator.image}
              alt={creator.name}
              fill
              sizes="(max-width: 768px) 33vw, 200px"
              className="object-cover transition-all duration-700 ease-out grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-label-sm text-[10px] uppercase tracking-nav text-primary">
                {creator.reach}
              </p>
              <p className="text-xs font-medium text-white sm:text-sm">
                {creator.name}
              </p>
            </div>
            <span className="absolute top-2 right-2 font-label-sm text-[10px] text-white/35 group-hover:text-primary transition-colors">
              [{String(index + 1).padStart(2, "0")}]
            </span>
          </article>
        ))}
      </div>
      {variant === "default" && (
        <p className="mt-4 font-label-sm text-[10px] uppercase tracking-nav text-text-muted">
          Featured creators · India
        </p>
      )}
    </div>
  );
}
