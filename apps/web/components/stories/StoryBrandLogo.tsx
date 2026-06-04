import Image from "next/image";
import { cn } from "@/lib/cn";

export function StoryBrandLogo({
  brandName,
  brandLogo,
  className,
}: {
  brandName: string;
  brandLogo?: string;
  className?: string;
}) {
  if (brandLogo) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden bg-background-soft",
          className
        )}
      >
        <Image
          src={brandLogo}
          alt={`${brandName} logo`}
          fill
          className="object-contain p-6"
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-background-soft text-xs uppercase text-text-muted",
        className
      )}
    >
      {brandName}
    </div>
  );
}
