import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getStoryBySlug, getStories } from "@/lib/content";
import { BlocksRenderer } from "@/components/content/BlocksRenderer";
import { StoryBrandLogo } from "@/components/stories/StoryBrandLogo";
import { mockStories } from "@/data/stories";

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Story" };
  return {
    title: story.title,
    description: story.shortResult,
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  const related = (story.relatedSlugs || [])
    .map((s) => mockStories.find((m) => m.slug === s))
    .filter(Boolean);

  const sections = [
    { title: "Brand overview", blocks: story.brandOverview },
    { title: "Challenge", blocks: story.challenge },
    { title: "Insight", blocks: story.insight },
    { title: "Strategy", blocks: story.strategy },
    { title: "Creator approach", blocks: story.creatorApproach },
    { title: "Content formats", blocks: story.contentFormats },
    { title: "Execution model", blocks: story.executionModel },
    { title: "Learnings", blocks: story.learnings },
  ];

  return (
    <article data-nav-surface="page" className="section-y bg-background-page">
      <div className="container-page max-w-3xl">
        <StoryBrandLogo
          brandName={story.brandName}
          brandLogo={story.brandLogo}
          className="mb-6 h-24"
        />
        <p className="text-xs uppercase tracking-nav text-text-muted mb-2">
          {story.category} · {story.platform} · {story.objective}
        </p>
        <h1 className="text-3xl font-medium tracking-tightest mb-4">{story.title}</h1>
        <p className="text-lg text-text-secondary mb-8">{story.shortResult}</p>

        {sections.map(
          (sec) =>
            sec.blocks?.length > 0 && (
              <section key={sec.title} className="mb-12">
                <h2 className="text-xl font-medium tracking-tight mb-4">{sec.title}</h2>
                <BlocksRenderer blocks={sec.blocks} />
              </section>
            )
        )}

        {story.results.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-medium tracking-tight mb-6">Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {story.results.map((m) => (
                <div
                  key={m.label}
                  className="border border-border-light p-6 rounded-md bg-background-soft"
                >
                  <p className="text-2xl font-medium tracking-tight text-primary">{m.value}</p>
                  <p className="text-sm text-text-muted mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-medium mb-4">Related stories</h2>
            <ul className="space-y-2">
              {related.map((r) =>
                r ? (
                  <li key={r.slug}>
                    <Link href={`/stories/${r.slug}`} className="text-primary hover:underline">
                      {r.title}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
