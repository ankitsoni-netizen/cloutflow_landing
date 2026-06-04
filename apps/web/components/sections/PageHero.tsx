import { cn } from "@/lib/cn";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  dark = false,
  className,
  decoration,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  dark?: boolean;
  className?: string;
  decoration?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "section-y-lg min-h-[480px] flex items-center relative overflow-hidden",
        dark ? "bg-background-blue text-text-light" : "bg-background-page",
        className
      )}
    >
      {decoration}
      <div className="container-page max-w-3xl relative z-10">
        {eyebrow && (
          <p className="text-xs uppercase tracking-nav text-text-muted mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl md:text-hero font-medium tracking-tightest leading-none mb-6">
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "text-md md:text-lg max-w-2xl",
              dark ? "text-text-light/80" : "text-text-secondary"
            )}
          >
            {subtitle}
          </p>
        )}
        {children && (
          <div className="relative z-10 mt-8 flex flex-wrap gap-4">{children}</div>
        )}
      </div>
    </section>
  );
}
