"use client";

import { creatorsSection } from "@/components/creators/creators-section";
import { ScrollReveal } from "@/components/creators/ScrollReveal";
import { cn } from "@/lib/cn";

const steps = [
  {
    num: "01",
    title: "Choose your lane",
    desc: "Comedy, beauty, finance, lifestyle, gaming, and more. We match creators to brands that fit your voice.",
  },
  {
    num: "02",
    title: "Get a real brief",
    desc: "Clear objectives, deliverables, timelines, and brand context. No vague one-liners or last-minute chaos.",
  },
  {
    num: "03",
    title: "Create & compound",
    desc: "Go live with support on QC, reporting, and payments. Strong work unlocks repeat campaigns and bigger brands.",
  },
];

export function CreatorProcessSteps() {
  return (
    <section
      id="journey"
      data-nav-surface="dark"
      className={cn(
        creatorsSection,
        "bg-background-dark text-text-light overflow-hidden relative"
      )}
    >
      <div className="creators-grain absolute inset-0 opacity-[0.08]" aria-hidden />
      <div className="container-page relative z-10">
        <ScrollReveal>
          <p className="font-label tracking-nav text-primary mb-2">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tightest max-w-xl">
            From application to iconic brand collaborations
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid md:grid-cols-3 gap-px bg-white/10">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 120}>
              <div className="h-full bg-background-dark p-8 md:p-10 group hover:bg-white/[0.03] transition-colors duration-500">
                <span className="font-display text-4xl md:text-5xl font-medium text-white/15 group-hover:text-primary/40 transition-colors">
                  {step.num}
                </span>
                <h3 className="mt-6 text-xl font-medium tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm text-text-light/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
