import Image from "next/image";
import { ProductMediaFrame } from "@/components/product/ProductMediaFrame";
import { cn } from "@/lib/cn";

export function ProductScreenshotFrame({
  src,
  alt,
  specLabel,
  variant = "flat",
  className,
}: {
  src?: string;
  alt: string;
  specLabel?: string;
  variant?: "flat" | "tilt";
  className?: string;
}) {
  const imageInsetClass =
    variant === "tilt" ? "inset-2 md:inset-2.5" : "inset-2 md:inset-3";
  const imageFitClass =
    variant === "tilt" ? "object-contain object-center" : "object-contain object-top";

  return (
    <ProductMediaFrame variant={variant} className={className} ariaLabel={alt}>
      {src ? (
        <div className={cn("absolute overflow-hidden rounded-lg", imageInsetClass)}>
          <Image
            src={src}
            alt={alt}
            fill
            className={cn(imageFitClass, "rounded-lg")}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className="absolute inset-2 md:inset-3 flex flex-col items-center justify-center gap-4 rounded-lg p-8 text-center bg-background-dark">
          <span className="text-xs uppercase tracking-nav text-primary font-medium">
            Screenshot placeholder
          </span>
          <p className="text-sm text-text-light/70 max-w-md leading-relaxed">
            {specLabel ?? alt}
          </p>
        </div>
      )}
    </ProductMediaFrame>
  );
}
