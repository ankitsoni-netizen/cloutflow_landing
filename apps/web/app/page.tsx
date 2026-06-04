import { HomeHero } from "@/components/home/HomeHero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { HomeProductSection } from "@/components/home/HomeProductSection";
import { HomeStoryCard } from "@/components/home/HomeStoryCard";
import { HomeInsightCard } from "@/components/home/HomeInsightCard";
import { HomeCareersTeaser } from "@/components/home/HomeCareersTeaser";
import { homeSection } from "@/components/home/home-section";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/sections/FinalCta";
import { mockStories } from "@/data/stories";
import { mockInsights } from "@/data/insights";
import { getStories, getInsights } from "@/lib/content";

const HOME_STORY_SLUGS = [
  "himalaya-skincare",
  "flipkart-super-money",
  "aqualogica",
  "samsung-galaxy",
] as const;

const HOME_INSIGHT_SLUGS = [
  "india-influencer-market-10000-crore",
  "wpp-influencing-with-integrity-2025",
  "india-influencer-marketing-rebooted",
  "micro-vs-macro-influencer-roi",
] as const;

export default async function HomePage() {
  const allStories = await getStories();
  const stories = HOME_STORY_SLUGS.map(
    (slug) =>
      allStories.find((s) => s.slug === slug) ??
      mockStories.find((s) => s.slug === slug)
  ).filter((s): s is NonNullable<typeof s> => Boolean(s));

  const allInsights = await getInsights();
  const insights = HOME_INSIGHT_SLUGS.map(
    (slug) =>
      allInsights.find((i) => i.slug === slug) ??
      mockInsights.find((i) => i.slug === slug)
  ).filter((i): i is NonNullable<typeof i> => Boolean(i));

  return (
    <div className="snap-y snap-mandatory">
      <HomeHero />
      <WhatWeDo />
      <HomeProductSection />

      <section className={`${homeSection} bg-background-page`}>
        <div className="container-page w-full">
          <h2 className="text-3xl font-medium tracking-tightest mb-8">
            Stories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stories.map((s) => (
              <HomeStoryCard key={s.slug} story={s} />
            ))}
          </div>
          <div className="mt-8">
            <Button href="/stories" variant="tertiary">
              View All Stories
            </Button>
          </div>
        </div>
      </section>

      <section className={`${homeSection} bg-secondary text-text-light`}>
        <div className="container-page w-full max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tightest mb-4">
            For creators who want better briefs, better brands, and better
            growth.
          </h2>
          <p className="text-text-light/80 mb-8 text-md">
            Cloutflow works with creators as creative partners, not media
            inventory. From brief clarity and scripting support to quality
            checks, payment assistance, and long-term brand opportunities, we
            make creator collaborations smoother, sharper, and more rewarding.
          </p>
          <Button href="/creators" variant="primary">
            Join the Creator Network
          </Button>
        </div>
      </section>

      <section className={`${homeSection} bg-background-page`}>
        <div className="container-page w-full">
          <h2 className="text-3xl font-medium tracking-tightest mb-8">
            Insights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insights.map((i) => (
              <HomeInsightCard key={i.slug} insight={i} />
            ))}
          </div>
          <div className="mt-8">
            <Button href="/insights" variant="tertiary">
              Read Insights
            </Button>
          </div>
        </div>
      </section>

      <HomeCareersTeaser />

      <FinalCta actions="contactSales" />
    </div>
  );
}
