import { homeSection } from "@/components/home/home-section";

const cards = [
  {
    title: "Influencer Strategy",
    desc: "Campaign architecture built around real brand outcomes.",
  },
  {
    title: "Creator Intelligence",
    desc: "Data-backed discovery, creator fit, authenticity checks, performance benchmarks.",
  },
  {
    title: "Content & Story Engines",
    desc: "Scripts, formats, hooks, creator-led storytelling built for attention.",
  },
  {
    title: "Execution at Scale",
    desc: "End-to-end operations, timelines, approvals, dispatches, reporting.",
  },
  {
    title: "Measurement & Intelligence",
    desc: "Live dashboards, CPV, search impact, sentiment, creator-level reporting.",
  },
];

export function WhatWeDo() {
  return (
    <section data-nav-surface="soft" className={`${homeSection} bg-background-soft`}>
      <div className="container-page w-full">
        <h2 className="text-3xl font-medium tracking-tightest mb-4 max-w-2xl">
          We solve brand problems through influence.
        </h2>
        <p className="text-text-secondary max-w-3xl mb-12">
          From launching products and entering new markets to increasing search,
          driving trials, building relevance, and scaling creator-led content,
          Cloutflow brings the strategy, systems, creators, and execution needed
          to make influence work as a serious business lever.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
          {cards.map((c) => (
            <div
              key={c.title}
              className="py-8 md:pr-6"
            >
              <h3 className="text-lg font-medium tracking-tight mb-2 pl-3 border-l-2 border-primary/40">
                {c.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed pl-3">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
