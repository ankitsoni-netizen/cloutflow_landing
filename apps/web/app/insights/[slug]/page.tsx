import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getInsightBySlug, getInsights } from "@/lib/content";
import { BlocksRenderer } from "@/components/content/BlocksRenderer";
import { mockInsights } from "@/data/insights";

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) return { title: "Insight" };
  return { title: insight.title, description: insight.excerpt };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) notFound();

  const related = mockInsights
    .filter((i) => i.slug !== slug && i.category === insight.category)
    .slice(0, 3);

  return (
    <article className="section-y bg-background-page">
      <div className="container-page max-w-3xl">
        <p className="text-xs uppercase tracking-nav text-primary mb-2">
          {insight.category}
        </p>
        <h1 className="text-3xl font-medium tracking-tightest mb-4">{insight.title}</h1>
        <p className="text-sm text-text-muted mb-8">
          {insight.author} · {insight.readTime} ·{" "}
          {new Date(insight.publishedAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {insight.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={insight.coverImage} alt="" className="w-full mb-8 rounded-md" />
        )}
        <BlocksRenderer blocks={insight.body} />
        {insight.sourceUrl && (
          <a
            href={insight.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-sm uppercase tracking-nav text-primary border border-primary px-6 py-3 rounded-md hover:bg-primary hover:text-text-light transition-probe"
          >
            Read on {insight.sourceName || "source"} →
          </a>
        )}
        {insight.pdfDownload && (
          <a
            href={insight.pdfDownload}
            className="inline-block mt-8 text-sm uppercase tracking-nav text-primary border border-primary px-6 py-3 rounded-md"
          >
            Download PDF
          </a>
        )}
        {related.length > 0 && (
          <section className="mt-16 pt-8 border-t border-border-light">
            <h2 className="text-xl font-medium mb-4">Related insights</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/insights/${r.slug}`} className="text-primary">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
