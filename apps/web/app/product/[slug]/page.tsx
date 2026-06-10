import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductScreenshotFrame } from "@/components/product/ProductScreenshotFrame";
import { ProductLifecycleMedia } from "@/components/product/ProductLifecycleMedia";
import { PageHero } from "@/components/sections/PageHero";
import { getProductModule, productModules } from "@/lib/product-modules";
import { productLifecycleSteps } from "@/data/product-lifecycle";

const moduleDeepDives: Record<
  string,
  {
    summary: string;
    workflow: { title: string; detail: string }[];
    capabilityDetails: string[];
    inputs: string[];
    outputs: string[];
    notes?: string[];
  }
> = {
  "ai-agents": {
    summary:
      "Agent layer that sits across briefs, creator selection, QC, risk checks, and reporting—turning campaign artifacts into structured tasks with traceable decisions.",
    workflow: [
      {
        title: "Ingest campaign context",
        detail:
          "Parse brief, brand guidelines, product claims, deliverables, timelines, and platform constraints into a structured campaign spec.",
      },
      {
        title: "Run task-specific agents",
        detail:
          "Shortlisting, script QC, compliance checks, risk flags, and performance analysis run as independent tasks with consistent inputs/outputs.",
      },
      {
        title: "Human-in-the-loop review",
        detail:
          "Every recommendation includes evidence snippets, rule hits, and rationale so teams can approve, edit, or override quickly.",
      },
      {
        title: "Write-back to workflow",
        detail:
          "Decisions (approved creators, QC status, risk level, edits requested) are pushed back into the campaign tracker for execution.",
      },
    ],
    inputs: [
      "Brief + deliverables",
      "Brand guidelines & prohibited/mandatory talking points",
      "Creator profiles + historical performance",
      "Platform policies (ASCI, disclosure, category restrictions)",
      "Content scripts / drafts / captions",
    ],
    outputs: [
      "Ranked creator shortlist with fit signals + reasons",
      "QC report with violations, suggested edits, and severity",
      "Brand-safety / compliance flags with rule trace",
      "Performance insights (CPV, retention proxies, benchmarks)",
    ],
    capabilityDetails: [
      "Structures objectives, deliverables, and timelines into a campaign plan teams can review and approve.",
      "Ranks creators against brief fit, audience overlap, and past performance with explainable scores.",
      "Flags off-brief language, weak hooks, and missing mandatory points before submission.",
      "Surfaces risk categories, competitor mentions, and sensitive topics against brand rules.",
      "Summarizes CPV, engagement quality, and benchmark deltas per creator and format.",
      "Highlights rising topics, formats, and creator clusters relevant to the category.",
    ],
    notes: [
      "Designed for auditability: recommendations are explainable, not opaque.",
    ],
  },
  discovery: {
    summary:
      "Search + scoring system for creator fit: audience, authenticity, engagement quality, niche alignment, and historical outcomes—optimized for enterprise shortlisting.",
    workflow: [
      {
        title: "Filter + candidate generation",
        detail:
          "Start with constraints (platform, language, region, category, budget) to generate a candidate set.",
      },
      {
        title: "Quality scoring",
        detail:
          "Compute engagement quality and authenticity signals; down-rank suspicious growth patterns and low-quality audiences.",
      },
      {
        title: "Fit evaluation",
        detail:
          "Match creator niche + content style to brand requirements, using historical performance and category similarity.",
      },
      {
        title: "Shortlist + export",
        detail:
          "Create lists for internal review, campaign mapping, and pricing—ready for planning and negotiation.",
      },
    ],
    inputs: [
      "Creator profiles (platform, niche, region, language)",
      "Audience demographics + interest clusters",
      "Engagement time series + growth patterns",
      "Past campaign outcomes (where available)",
    ],
    outputs: [
      "Ranked search results with fit rationale",
      "Audience quality + authenticity indicators",
      "Comparable creators and benchmarks",
      "Exportable shortlist for campaign planning",
    ],
    capabilityDetails: [
      "Unified profiles across platforms with niche, region, language, and tier metadata.",
      "Demographics, interests, and overlap signals to validate who actually watches the content.",
      "Authenticity scoring to filter inflated or bot-heavy follower bases.",
      "Weights comments, saves, and watch behavior over raw like counts.",
      "Tags creators to content categories and sub-niches for precise brand fit.",
      "Geo and language filters for India-first and regional campaign planning.",
      "Past campaign outcomes and content performance where data is available.",
    ],
  },
  analytics: {
    summary:
      "Unified measurement layer across creators, formats, and campaigns—built to answer what moved outcomes (not just reach) with benchmarked efficiency metrics.",
    workflow: [
      {
        title: "Normalize campaign data",
        detail:
          "Standardize creator deliverables, posting windows, and platform metrics into a consistent schema for analysis.",
      },
      {
        title: "Efficiency + lift analysis",
        detail:
          "Compute CPV/CPM, content-format performance, creator-level contribution, and comparative benchmarks.",
      },
      {
        title: "Insights + reporting outputs",
        detail:
          "Turn results into shareable views: dashboards, exportable summaries, and learnings for the next brief.",
      },
    ],
    inputs: [
      "Post metadata + timestamps",
      "Platform metrics (views, watch time proxies, engagement)",
      "Spend / pricing inputs for efficiency metrics",
      "Campaign structure (deliverables, formats, creators)",
    ],
    outputs: [
      "Creator-level performance breakdowns",
      "Format and hook-level comparisons (where available)",
      "CPV/CPM and benchmark deltas",
      "Export-ready dashboards for stakeholders",
    ],
    capabilityDetails: [
      "Normalized reach and interaction metrics across creators and posts.",
      "Efficiency calculations tied to spend and pricing inputs.",
      "Compares Reels, shorts, static posts, and long-form by outcome.",
      "Comment and mention tone to gauge brand perception shifts.",
      "Connects creator activity to branded search lift where measurable.",
      "Compares results to category and historical program baselines.",
    ],
  },
  pricing: {
    summary:
      "Pricing intelligence system combining historical costs, creator benchmarks, and efficiency targets to guide negotiation and budget allocation.",
    workflow: [
      {
        title: "Benchmark rates",
        detail:
          "Compare creator pricing against peer sets by category, region, platform, and follower tiers.",
      },
      {
        title: "Model efficiency targets",
        detail:
          "Translate goals into CPV-informed ranges and scenario plans (mix, volume, formats).",
      },
      {
        title: "Negotiate with evidence",
        detail:
          "Use comparable deals and performance history to justify counters and optimize allocations.",
      },
    ],
    inputs: [
      "Quoted rates / historical rate cards",
      "Peer comparables by creator cohort",
      "Target CPV/CPM bands",
      "Past performance (views, engagement, completion proxies)",
    ],
    outputs: [
      "Suggested rate ranges + confidence",
      "Comparable creators + justification",
      "Budget scenarios by cohort and format",
      "Negotiation notes and recommended counters",
    ],
    capabilityDetails: [
      "Peer rates by tier, platform, category, and region.",
      "Models target efficiency bands into recommended offer ranges.",
      "Surfaces past deals and rate cards for the same creator cohorts.",
      "Comparable deals and counters backed by performance history.",
      "Scenarios for creator mix, volume, and format allocation.",
      "Vertical-specific pricing norms for fair negotiation.",
    ],
  },
  reporting: {
    summary:
      "Reporting layer that converts live performance into stakeholder-ready narratives—dashboards, exports, and learning summaries without manual screenshot decks.",
    workflow: [
      {
        title: "Build live views",
        detail:
          "Auto-generate dashboards per campaign and creator with consistent metrics and filters.",
      },
      {
        title: "Package for stakeholders",
        detail:
          "Export summaries, tables, and executive takeaways; keep provenance for every number.",
      },
      {
        title: "Post-campaign learning loop",
        detail:
          "Capture what worked (formats, creators, hooks) and feed it into next brief + discovery.",
      },
    ],
    inputs: [
      "Normalized performance metrics",
      "Campaign metadata and objectives",
      "Creator roster + deliverables",
    ],
    outputs: [
      "Stakeholder dashboards",
      "Exportable report packs",
      "Learnings + recommendations for iteration",
    ],
    capabilityDetails: [
      "Auto-updating campaign and creator views without manual exports.",
      "Per-creator deliverable status, metrics, and efficiency in one table.",
      "Rolling comment tone and theme summaries for stakeholder updates.",
      "Side-by-side vs plan and vs category norms.",
      "Executive summaries and export packs with metric provenance.",
    ],
  },
  campaigns: {
    summary:
      "Campaign execution workflow: brief → creator mapping → approvals → dispatch → live status → payment tracking, with every deliverable and dependency visible.",
    workflow: [
      {
        title: "Brief authoring + versioning",
        detail:
          "Lock objectives, deliverables, and constraints; track updates with timestamps and owners.",
      },
      {
        title: "Creator assignment",
        detail:
          "Map creators to deliverables, formats, and timelines; generate task queues for each stakeholder.",
      },
      {
        title: "Approvals + dispatch",
        detail:
          "Run review gates (script, claims, compliance), then dispatch and track posting windows.",
      },
      {
        title: "Status + payments",
        detail:
          "Single source of truth for completion, rework, and payout readiness.",
      },
    ],
    inputs: [
      "Brief + deliverable templates",
      "Creator rosters from discovery",
      "Approval rules (QC/compliance) and timelines",
    ],
    outputs: [
      "Campaign timeline + task states",
      "Approval audit trail",
      "Dispatch and completion status",
      "Payment readiness tracking",
    ],
    capabilityDetails: [
      "Versioned briefs with objectives, mandatories, and deliverable specs.",
      "Milestones, posting windows, and dependency tracking across creators.",
      "Per-creator stage from briefed through live and complete.",
      "Assets, revisions, and approval states per deliverable.",
      "Configurable gates for script, compliance, and brand sign-off.",
      "Posting confirmation and payout readiness in one ledger.",
    ],
  },
  compliance: {
    summary:
      "QC + compliance engine that checks scripts and content against brand rules, mandatory claims, ASCI guidance, and platform constraints—reducing risk without killing creative.",
    workflow: [
      {
        title: "Rule compilation",
        detail:
          "Convert brand guidelines + mandatory/disallowed phrases into machine-checkable rules with severity levels.",
      },
      {
        title: "Script/content evaluation",
        detail:
          "Detect missing disclosures, wrong claims, and guideline mismatches; produce edit suggestions.",
      },
      {
        title: "Approval history",
        detail:
          "Track every revision, reviewer, and decision so compliance is provable post-campaign.",
      },
    ],
    inputs: [
      "Brand guidelines and claims library",
      "Script drafts / captions / story boards",
      "Disclosure requirements (ASCI, category rules)",
    ],
    outputs: [
      "Violation list with severity + rationale",
      "Suggested edits and compliance-ready versions",
      "Approval and revision history",
    ],
    capabilityDetails: [
      "Pre-publish review against brief and brand voice requirements.",
      "Verifies required claims and disclosures are present.",
      "Category-specific disclosure and claim rules applied automatically.",
      "Blocks or flags sensitive topics, competitors, and off-limits language.",
      "Catches unsubstantiated or non-approved product statements.",
      "Scores content alignment to the latest brand guideline version.",
      "Full revision trail with reviewer, timestamp, and decision per asset.",
    ],
  },
};

export function generateStaticParams() {
  return productModules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = getProductModule(slug);
  if (!mod) return { title: "Product" };
  return {
    title: mod.title,
    description: mod.description,
  };
}

export default async function ProductModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getProductModule(slug);
  if (!mod) notFound();
  const deepDive = moduleDeepDives[slug];

  const lifecycleMatches = productLifecycleSteps.filter((s) => s.slug === slug);
  const stepForModule =
    lifecycleMatches[lifecycleMatches.length - 1] ??
    (slug === "reporting"
      ? productLifecycleSteps.find((s) =>
          s.moduleName.toLowerCase().includes("analytics + reporting")
        )
      : undefined);

  const workflow = deepDive?.workflow ?? [];
  const capabilityDetails = deepDive?.capabilityDetails ?? [];
  const inputs = deepDive?.inputs ?? [];
  const outputs = deepDive?.outputs ?? [];

  return (
    <>
      <PageHero
        eyebrow="Cloutflow OS · Module"
        title={mod.title}
        subtitle={mod.tagline}
        className="min-h-0 py-12 md:py-14 bg-background-soft"
      />

      <section
        data-nav-surface="soft"
        className="border-b border-border-light bg-background-soft py-10 md:py-12"
      >
        <div className="container-page max-w-4xl">
          <p className="text-md text-text-secondary leading-relaxed">
            {mod.description}
          </p>
          {deepDive?.summary ? (
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              {deepDive.summary}
            </p>
          ) : null}
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div className="flex gap-2">
              <dt className="text-text-muted">Capabilities</dt>
              <dd className="font-medium text-text-primary">
                {mod.features.length} core functions
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-text-muted">Workflow</dt>
              <dd className="font-medium text-text-primary">
                {workflow.length} stages
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-text-muted">Inputs</dt>
              <dd className="font-medium text-text-primary">
                {inputs.length} data sources
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-text-muted">Outputs</dt>
              <dd className="font-medium text-text-primary">
                {outputs.length} artifacts
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section data-nav-surface="page" className="py-12 md:py-16 bg-background-page">
        <div className="container-page">
          <div className="mb-8 md:mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-nav text-primary mb-2">
              Execution workflow
            </p>
            <h2 className="text-2xl font-medium tracking-tightest">
              How {mod.title} runs inside the OS
            </h2>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              Stage-by-stage flow from ingestion through review, with explicit
              inputs and outputs at each handoff.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <ol className="lg:col-span-5 border-l border-border-light pl-6 space-y-8">
              {workflow.map((step, i) => (
                <li key={step.title} className="relative">
                  <span
                    className="absolute -left-6 top-0.5 font-mono text-xs text-primary"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-medium text-text-primary">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>

            <div className="lg:col-span-7 lg:sticky lg:top-[96px]">
              <div className="overflow-visible">
                {stepForModule ? (
                  <ProductLifecycleMedia step={stepForModule} variant="flat" />
                ) : (
                  <ProductScreenshotFrame
                    alt={`${mod.title} operational surface`}
                    specLabel={`${mod.title} module UI`}
                    variant="flat"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-nav-surface="soft"
        className="border-y border-border-light bg-background-soft py-12 md:py-14"
      >
        <div className="container-page">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs uppercase tracking-nav text-text-muted mb-2">
              Core capabilities
            </p>
            <h2 className="text-xl font-medium tracking-tightest">
              What teams use inside {mod.title}
            </h2>
          </div>
          <ul className="divide-y divide-border-light border-t border-border-light">
            {mod.features.map((feature, i) => (
              <li
                key={feature}
                className="grid sm:grid-cols-[minmax(0,11rem)_1fr] gap-3 sm:gap-8 py-6 first:pt-0"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-text-muted shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-medium text-text-primary leading-snug">
                    {feature}
                  </p>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed sm:pl-0 pl-8">
                  {capabilityDetails[i] ??
                    "Operational capability within this module workflow."}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-nav-surface="page" className="py-12 md:py-16 bg-background-page">
        <div className="container-page">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs uppercase tracking-nav text-text-muted mb-2">
              System contract
            </p>
            <h2 className="text-xl font-medium tracking-tightest">
              Inputs, outputs, and integration points
            </h2>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              Data the module consumes from upstream workflows and artifacts it
              produces for downstream planning, execution, and reporting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h3 className="text-sm uppercase tracking-nav text-text-muted mb-4 pb-3 border-b border-border-light">
                Inputs
              </h3>
              <ul className="space-y-3 list-none p-0 m-0">
                {inputs.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-text-secondary leading-relaxed pl-4 border-l-2 border-border-light"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-nav text-text-muted mb-4 pb-3 border-b border-border-light">
                Outputs
              </h3>
              <ul className="space-y-3 list-none p-0 m-0">
                {outputs.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-text-secondary leading-relaxed pl-4 border-l-2 border-primary/30"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {deepDive?.notes?.length ? (
            <div className="mt-10 pt-8 border-t border-border-light">
              <h3 className="text-sm uppercase tracking-nav text-text-muted mb-3">
                Implementation notes
              </h3>
              <ul className="space-y-2 list-none p-0 m-0 max-w-3xl">
                {deepDive.notes.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-text-secondary leading-relaxed pl-4 border-l-2 border-primary/25"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
