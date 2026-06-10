import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { getInsights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description: "Intelligence for the influence-first brand era.",
};

export default async function InsightsPage() {
  const insights = await getInsights();
  return (
    <>
      <PageHero
        title="Intelligence for the influence-first brand era."
        subtitle="Reports, research, trends, platform insights, and strategic thinking from the team building the future of influencer marketing."
      />
      <section data-nav-surface="page" className="section-y bg-background-page">
        <div className="container-page">
          <InsightsGrid insights={insights} />
        </div>
      </section>
    </>
  );
}
