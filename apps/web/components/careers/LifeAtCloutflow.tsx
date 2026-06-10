import { CareersInlineIcon } from "@/components/careers/CareersInlineIcon";
import { CareersSection } from "@/components/careers/CareersSection";
import { LifeAtLinkedInMarquee } from "@/components/careers/LifeAtLinkedInMarquee";
import { careersLifeHighlights } from "@/data/careers-page-extras";
import { lifeAtCloutflowIntro } from "@/data/life-at-cloutflow";
import { lifeAtCloutflowPosts } from "@/data/life-at-cloutflow-posts";

export function LifeAtCloutflow() {
  return (
    <CareersSection variant="life" id="life-at-cloutflow">
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-text-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-light) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full">
        <div className="container-page mb-12 md:mb-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <div className="lg:col-span-7" data-scroll-target>
              <p className="text-xs uppercase tracking-nav text-text-light/70 mb-4">
                {lifeAtCloutflowIntro.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tightest leading-tight mb-4">
                {lifeAtCloutflowIntro.title}
              </h2>
              <p className="text-text-light/75 text-md leading-relaxed max-w-xl">
                {lifeAtCloutflowIntro.description}
              </p>
            </div>

            <ul className="m-0 grid list-none gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {careersLifeHighlights.map((item) => (
                <li
                  key={item.label}
                  className="careers-highlight-card careers-reactive-cell flex gap-3.5 rounded-xl px-4 py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-text-light">
                    <CareersInlineIcon name={item.icon} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-light">{item.label}</p>
                    <p className="mt-1 text-xs text-text-light/65 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <LifeAtLinkedInMarquee posts={lifeAtCloutflowPosts} />
      </div>
    </CareersSection>
  );
}
