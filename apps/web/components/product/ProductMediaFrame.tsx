import { cn } from "@/lib/cn";

export function ProductMediaFrame({
  children,
  variant = "flat",
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  variant?: "flat" | "tilt";
  className?: string;
  ariaLabel?: string;
}) {
  const isTilt = variant === "tilt";

  const frame = (
    <div
      className={cn("relative w-full aspect-[16/10] overflow-visible", className)}
      aria-label={ariaLabel}
    >
      {/* Soft Cloutflow blue splash — organic blobs, not a boxed gradient */}
      <div
        className="pointer-events-none absolute inset-0 overflow-visible"
        aria-hidden
      >
        <div
          className={cn(
            "absolute -left-[12%] top-[8%] h-[72%] w-[58%] rounded-full",
            "bg-[radial-gradient(circle,rgba(7,62,253,0.28)_0%,rgba(7,62,253,0)_70%)]",
            "blur-3xl"
          )}
        />
        <div
          className={cn(
            "absolute -right-[8%] bottom-[5%] h-[55%] w-[48%] rounded-full",
            "bg-[radial-gradient(circle,rgba(17,40,109,0.22)_0%,rgba(17,40,109,0)_68%)]",
            "blur-3xl"
          )}
        />
        <div
          className={cn(
            "absolute left-[35%] top-[42%] h-[38%] w-[32%] rounded-full",
            "bg-[radial-gradient(circle,rgba(7,62,253,0.14)_0%,rgba(7,62,253,0)_65%)]",
            "blur-2xl"
          )}
        />
      </div>

      <div
        className={cn(
          "relative z-10 h-full w-full overflow-hidden border bg-white shadow-soft",
          isTilt
            ? "rounded-xl border-white/20 shadow-lg shadow-primary/8"
            : "rounded-xl border-border-light/90"
        )}
      >
        {children}
      </div>
    </div>
  );

  if (isTilt) {
    return (
      <div className="w-full">
        <div className="transition-transform duration-700 ease-out will-change-transform hover:scale-[1.01]">
          {frame}
        </div>
      </div>
    );
  }

  return frame;
}
