import type { Metadata } from "next";
import { notFound } from "next/navigation";

const LEGAL_PAGES: Record<string, { title: string }> = {
  "privacy-policy": { title: "Privacy Policy" },
  "terms-of-use": { title: "Terms of Use" },
  "creator-terms": { title: "Creator Terms" },
  "data-policy": { title: "Data Policy" },
};

export async function generateStaticParams() {
  return Object.keys(LEGAL_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = LEGAL_PAGES[slug];
  if (!page) return { title: "Legal" };
  return { title: page.title };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = LEGAL_PAGES[slug];
  if (!page) notFound();

  return (
    <section data-nav-surface="page" className="section-y bg-background-page min-h-[50vh]">
      <div className="container-page max-w-3xl">
        <h1 className="text-3xl font-medium tracking-tightest">{page.title}</h1>
      </div>
    </section>
  );
}
