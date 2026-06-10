import Image from "next/image";
import Link from "next/link";
import { CLOUTFLOW_LOGO_URL, CLOUTFLOW_LOGO_WHITE_URL } from "@/lib/brand";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  height = 75,
  href = "/",
  variant = "default",
}: {
  className?: string;
  height?: number;
  href?: string;
  /** White wordmark + color icon for dark backgrounds (e.g. navbar). */
  variant?: "default" | "onDark";
}) {
  const width = Math.round(height * 4.2);
  const src = variant === "onDark" ? CLOUTFLOW_LOGO_WHITE_URL : CLOUTFLOW_LOGO_URL;

  const img = (
    <Image
      src={src}
      alt="Cloutflow"
      width={width}
      height={height}
      className={cn("h-auto w-auto object-contain", className)}
      style={{ height, width: "auto", maxWidth: width }}
      priority
    />
  );

  if (!href) return img;

  return (
    <Link href={href} className="inline-flex items-center shrink-0" aria-label="Cloutflow home">
      {img}
    </Link>
  );
}
