import type { ProductLifecycleStep } from "@/lib/types";

export function ProductLifecycleHero({ hero }: { hero: ProductLifecycleStep }) {
  return (
    <section
      data-nav-surface="blue"
      className="section-y-lg bg-background-blue text-text-light overflow-hidden"
    >
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-nav text-text-light/60 mb-4">
            {hero.moduleName}
          </p>
          <h1 className="text-3xl md:text-hero font-medium tracking-tightest leading-none mb-6 md:whitespace-nowrap">
            {hero.headline}
          </h1>
          <p className="text-md md:text-lg text-text-light/80">{hero.body}</p>
        </div>
      </div>
    </section>
  );
}
