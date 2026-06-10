"use client";

import { CreatorApplyLink } from "@/components/creators/CreatorApplyLink";
import { CreatorFaceCollage } from "@/components/creators/CreatorFaceCollage";
import { CreatorsHeroBackground } from "@/components/creators/CreatorsHeroBackground";
import { AnimatedStat } from "@/components/creators/AnimatedStat";

const stats = [
  { label: "Creators", value: "250+" },
  { label: "Brands", value: "80+" },
  { label: "Campaigns", value: "1.2K" },
];

export function CreatorsHero() {
  return (
    <section
      data-nav-surface="dark"
      className="relative min-h-screen overflow-hidden bg-background-dark text-text-light"
    >
      <CreatorsHeroBackground />

      <div className="container-page relative z-10 grid min-h-screen items-center gap-12 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:py-28">
        <div className="max-w-xl creators-hero-enter">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-label text-xs uppercase tracking-nav text-text-light backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Creator Network
            </span>
            <span className="font-label text-xs text-text-light/40">[250+]</span>
          </div>

          <h1 className="text-4xl font-medium tracking-tightest leading-[0.95] sm:text-5xl md:text-hero">
            <span className="block creators-hero-line" style={{ animationDelay: "80ms" }}>
              For creators,
            </span>
          </h1>
          <p
            className="mt-5 text-lg md:text-xl text-text-light/80 max-w-lg creators-hero-line"
            style={{ animationDelay: "160ms" }}
          >
            Who want better briefs, better brands, and better growth.
          </p>
          <p
            className="mt-6 text-[18px] text-text-light/55 max-w-md leading-relaxed creators-hero-line"
            style={{ animationDelay: "240ms" }}
          >
            Cloutflow partners with India&apos;s most influential voices, turning
            creativity into long-term brand equity, not one-off posts.
          </p>

          <div
            className="mt-10 flex flex-wrap gap-4 creators-hero-line"
            style={{ animationDelay: "320ms" }}
          >
            <CreatorApplyLink className="shadow-blue">
              Join the Creator Network
            </CreatorApplyLink>
          </div>

          <dl
            className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 creators-hero-line"
            style={{ animationDelay: "400ms" }}
          >
            {stats.map((s) => (
              <AnimatedStat key={s.label} label={s.label} value={s.value} />
            ))}
          </dl>
        </div>

        <div className="creators-hero-collage-enter w-full lg:max-w-none">
          <CreatorFaceCollage variant="hero" />
        </div>
      </div>

      <a
        href="#featured"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-label="Scroll to featured creators"
      >
        <span className="font-label text-[10px] uppercase tracking-nav text-text-light/40">
          Scroll
        </span>
        <span className="block h-10 w-px bg-gradient-to-b from-primary to-transparent animate-pulse" />
      </a>
    </section>
  );
}
