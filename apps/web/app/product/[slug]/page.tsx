import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { ExploreCloutflowOsCta } from "@/components/brand/ExploreCloutflowOsCta";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/sections/FinalCta";
import { getProductModule, productModules } from "@/lib/product-modules";

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

  return (
    <>
      <PageHero title={mod.title} subtitle={mod.tagline}>
        <div className="flex flex-wrap gap-4">
          <ExploreCloutflowOsCta />
          <Button href="/contact" variant="tertiary">
            Talk to our team
          </Button>
        </div>
      </PageHero>

      <section className="section-y bg-background-page">
        <div className="container-page grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-text-secondary mb-8">{mod.description}</p>
            <ul className="space-y-3">
              {mod.features.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 text-sm text-text-primary border-b border-border-soft pb-3"
                >
                  <span className="text-primary">·</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-background-soft border border-border-light h-96 flex items-center justify-center rounded-md">
            <p className="text-sm text-text-muted font-mono">
              {mod.title} UI mockup
            </p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
