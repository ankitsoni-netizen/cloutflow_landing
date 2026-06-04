import { ProductMediaFrame } from "@/components/product/ProductMediaFrame";
import { ProductScreenshotFrame } from "@/components/product/ProductScreenshotFrame";
import type { ProductLifecycleStep } from "@/lib/types";

export function ProductLifecycleMedia({
  step,
  variant = "flat",
}: {
  step: ProductLifecycleStep;
  variant?: "flat" | "tilt";
}) {
  const alt = step.screenshotAlt ?? step.headline;

  return (
    <ProductScreenshotFrame
      src={step.screenshotUrl}
      alt={alt}
      specLabel={step.screenshotSpec}
      variant={variant}
    />
  );
}
