import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { StoriesGrid } from "@/components/stories/StoriesGrid";
import { getStories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Stories",
  description: "Case studies of influence built for business impact.",
};

export default async function StoriesPage() {
  const stories = await getStories();
  return (
    <>
      <PageHero
        title="Stories of influence, built for business impact."
        subtitle="Explore how Cloutflow partners with brands to solve real marketing challenges through creators, culture, content, technology, and scale."
      />
      <section className="section-y bg-background-page">
        <div className="container-page">
          <StoriesGrid stories={stories} />
        </div>
      </section>
    </>
  );
}
