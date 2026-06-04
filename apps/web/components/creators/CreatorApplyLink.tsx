import Link from "next/link";
import { cn } from "@/lib/cn";

export function CreatorApplyLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/creators/apply"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-12 cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-6 text-sm font-medium uppercase tracking-tight text-text-light transition-probe hover:opacity-90",
        className
      )}
    >
      {children}
    </Link>
  );
}
