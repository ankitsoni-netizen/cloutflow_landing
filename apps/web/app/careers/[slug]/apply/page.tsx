import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobBySlug } from "@/lib/content";
import { JobApplyForm } from "@/components/forms/JobApplyForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  return { title: job ? `Apply, ${job.title}` : "Apply" };
}

export default async function JobApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  return (
    <section className="section-y bg-background-page">
      <div className="container-page max-w-xl">
        <Link href={`/careers/${slug}`} className="text-sm text-text-muted hover:text-primary mb-6 inline-block">
          ← Back to role
        </Link>
        <h1 className="text-2xl font-medium tracking-tightest mb-8">
          Apply for {job.title}
        </h1>
        <JobApplyForm jobSlug={job.slug} jobTitle={job.title} />
      </div>
    </section>
  );
}
