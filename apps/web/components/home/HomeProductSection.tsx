import { ExploreCloutflowOsCta } from "@/components/brand/ExploreCloutflowOsCta";
import { ProductMockup } from "@/components/home/ProductMockup";
import { homeSection } from "@/components/home/home-section";

const modules: { name: string; desc: string }[] = [
  {
    name: "AI Agents",
    desc: "Automated briefs, QC, and campaign assistance.",
  },
  {
    name: "Creator Discovery",
    desc: "Filter-led search with fit and authenticity signals.",
  },
  {
    name: "Pricing Intelligence",
    desc: "Benchmarks and rate cards across creator tiers.",
  },
  {
    name: "Analytics",
    desc: "Live performance, CPV, and creator-level views.",
  },
  {
    name: "Campaign Tracker",
    desc: "Timelines, approvals, and dispatch in one flow.",
  },
  {
    name: "Reporting",
    desc: "Brand-ready dashboards and exportable reports.",
  },
  {
    name: "Script QC",
    desc: "Content checks before publish and handoff.",
  },
  {
    name: "Brand Safety",
    desc: "Risk flags and compliance guardrails at scale.",
  },
];

export function HomeProductSection() {
  return (
    <section
      data-nav-surface="blue"
      className={`${homeSection} bg-background-blue text-text-light`}
    >
      <div className="container-page grid lg:grid-cols-2 gap-12 items-center w-full">
        <div>
          <h2 className="text-3xl font-medium tracking-tightest mb-4">
            Meet the infrastructure behind modern influencer marketing.
          </h2>
          <p className="text-text-light/80 mb-6">
            Our Tech brings discovery, pricing, campaign planning, creator
            management, content quality checks, reporting, and intelligence into
            one connected system.
          </p>
          <ExploreCloutflowOsCta tone="dark" inkEffect={false} />
          <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-5 list-none p-0 m-0">
            {modules.map((m) => (
              <li key={m.name} className="pt-4">
                <p className="text-sm font-medium text-text-light">{m.name}</p>
                <p className="text-xs text-text-light/65 mt-1 leading-relaxed">
                  {m.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <ProductMockup />
      </div>
    </section>
  );
}
