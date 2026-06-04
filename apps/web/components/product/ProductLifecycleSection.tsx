import Link from "next/link";
import { ProductLifecycleMedia } from "@/components/product/ProductLifecycleMedia";
import type { ProductLifecycleStep } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ProductLifecycleSection({
  step,
  index,
}: {
  step: ProductLifecycleStep;
  index: number;
}) {
  const reversed = index % 2 === 1;
  const bg = index % 2 === 0 ? "bg-background-page" : "bg-background-soft";

  return (
    <section
      id={step.id}
      className={cn("section-y scroll-mt-[132px]", bg)}
    >
      <div className="container-page" data-lifecycle-scroll-target>
        <div
          className={cn(
            "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
            reversed && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
          )}
        >
          <div>
            {step.stepLabel && (
              <p className="text-xs uppercase tracking-nav text-primary mb-2">
                {step.stepLabel}
              </p>
            )}
            <p className="text-xs uppercase tracking-nav text-text-muted mb-4">
              {step.moduleName}
            </p>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tightest leading-tight mb-4">
              {step.headline}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">{step.body}</p>
            {step.slug && (
              <Link
                href={`/product/${step.slug}`}
                className="text-sm uppercase tracking-nav text-primary font-medium"
              >
                Explore module →
              </Link>
            )}
          </div>

          <div className="overflow-visible">
            <ProductLifecycleMedia step={step} variant="flat" />
          </div>
        </div>
      </div>
    </section>
  );
}
