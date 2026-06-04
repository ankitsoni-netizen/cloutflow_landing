import { cn } from "@/lib/cn";

type Variant = "light" | "dark" | "blue";

const variants: Record<Variant, string> = {
  light: "bg-background-page border border-border-light text-text-primary",
  dark: "bg-background-dark text-text-light border border-background-dark",
  blue: "bg-background-blue text-text-light border border-background-blue",
};

export function Card({
  variant = "light",
  className,
  children,
}: {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-md p-6", variants[variant], className)}>
      {children}
    </div>
  );
}
