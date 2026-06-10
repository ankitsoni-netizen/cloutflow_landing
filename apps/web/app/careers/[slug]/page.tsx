import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobBySlug, getJobs } from "@/lib/content";
import { BlocksRenderer } from "@/components/content/BlocksRenderer";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: "Careers" };
  return { title: job.title, description: job.shortDescription };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job || !job.isOpen) notFound();

  const listSection = (title: string, items: string[]) =>
    items.length > 0 && (
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-3">{title}</h2>
        <ul className="space-y-2 text-sm text-text-secondary">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-primary">·</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    );

  return (
    <article data-nav-surface="page" className="section-y bg-background-page">
      <div className="container-page max-w-3xl">
        <p className="text-xs uppercase tracking-nav text-text-muted mb-2">
          {job.department} · {job.location} · {job.experience} · {job.workType}
        </p>
        <h1 className="text-3xl font-medium tracking-tightest mb-6">{job.title}</h1>

        <section className="mb-8">
          <h2 className="text-lg font-medium mb-3">About Cloutflow</h2>
          <p className="text-text-secondary text-sm">
            Cloutflow is the enterprise influencer marketing operating system, combining
            strategy, creators, technology, and execution at scale for modern brands.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-medium mb-3">About the role</h2>
          <BlocksRenderer blocks={job.aboutRole} />
        </section>

        {listSection("Responsibilities", job.responsibilities)}
        {listSection("Requirements", job.requirements)}
        {listSection("Good-to-have skills", job.goodToHave)}
        {listSection("What you'll learn", job.whatYouLearn)}

        <Button href={`/careers/${job.slug}/apply`} variant="primary">
          Apply Now
        </Button>
        <p className="mt-4">
          <Link href="/careers" className="text-sm text-text-muted hover:text-primary">
            ← All roles
          </Link>
        </p>
      </div>
    </article>
  );
}
