import Image from "next/image";
import Link from "next/link";
import { CLOUTFLOW_LOGO_URL } from "@/lib/brand";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  height = 50,
  href = "/",
}: {
  className?: string;
  height?: number;
  href?: string;
}) {
  const width = Math.round(height * 4.2);

  const img = (
    <Image
      src={CLOUTFLOW_LOGO_URL}
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
