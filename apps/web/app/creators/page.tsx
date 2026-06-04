import type { Metadata } from "next";
import { CreatorsHero } from "@/components/creators/CreatorsHero";
import { CreatorMarquee } from "@/components/creators/CreatorMarquee";
import { CreatorCategoryRail } from "@/components/creators/CreatorCategoryRail";
import { FeaturedTalentCarousel } from "@/components/creators/FeaturedTalentCarousel";
import { CreatorsVideoBreak } from "@/components/creators/CreatorsVideoBreak";
import { CreatorProcessSteps } from "@/components/creators/CreatorProcessSteps";
import { CreatorsPartnershipSection } from "@/components/creators/CreatorsPartnershipSection";
import { creatorsSection } from "@/components/creators/creators-section";
import { ScrollReveal } from "@/components/creators/ScrollReveal";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Creators",
  description:
    "Join the Cloutflow creator network, better briefs, brands, and growth.",
};

const benefits = [
  {
    title: "Better Briefs",
    desc: "Clear objectives, deliverables, and brand context, no vague one-liners.",
  },
  {
    title: "Creative Support",
    desc: "Hooks, scripts, formats, and storytelling support when you need it.",
  },
  {
    title: "Smooth Execution",
    desc: "Onboarding → approvals → posting → reporting → payment, without chaos.",
  },
  {
    title: "Quality Checks Without Killing Creativity",
    desc: "Compliance and brand safety that respect your voice.",
  },
  {
    title: "Long-Term Brand Opportunities",
    desc: "Strong performers get mapped to future campaigns with serious brands.",
  },
  {
    title: "Beyond Campaigns",
    desc: "Understand what worked and build relationships that compound.",
  },
];

const earnings = [
  { label: "Avg. campaign value", value: "₹2.4L" },
  { label: "Top creator earnings", value: "₹45L+" },
  { label: "Repeat brand rate", value: "72%" },
];

export default function CreatorsPage() {
  return (
    <>
      <CreatorsHero />
      <CreatorCategoryRail />
      <CreatorMarquee />
      <FeaturedTalentCarousel />

      <section
        className={cn(
          creatorsSection,
          "bg-background-page relative overflow-hidden"
        )}
      >
        <div
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
          aria-hidden
        />
        <div className="container-page relative z-10">
          <ScrollReveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="font-label text-xs uppercase tracking-nav text-text-muted mb-2">
                  Why Cloutflow
                </p>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tightest">
                  The infrastructure behind lucrative creator partnerships
                </h2>
              </div>
              <span className="font-label text-xs text-text-muted">[06]</span>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-4 mb-12">
            {earnings.map((e, i) => (
              <ScrollReveal key={e.label} delay={i * 80}>
                <div className="rounded-md border border-border-light bg-background-soft p-8 hover:border-primary/40 transition-colors">
                  <p className="font-label text-[10px] uppercase tracking-nav text-text-muted">
                    {e.label}
                  </p>
                  <p className="mt-2 text-3xl font-medium tracking-tight text-primary">
                    {e.value}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 60}>
                <div className="group h-full rounded-md border border-border-light bg-background-page p-6 hover:border-primary hover:shadow-soft transition-all duration-500">
                  <span className="font-label text-xs text-primary">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <h3 className="font-medium mt-4 mb-2 text-lg group-hover:text-primary transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CreatorsVideoBreak />
      <CreatorProcessSteps />
      <CreatorsPartnershipSection />
    </>
  );
}
