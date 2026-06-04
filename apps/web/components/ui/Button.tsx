import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-text-light hover:opacity-90 border border-primary",
  secondary:
    "bg-secondary text-text-light hover:opacity-90 border border-secondary",
  tertiary:
    "bg-transparent text-text-primary border border-border-light hover:border-text-primary",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  href,
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex cursor-pointer items-center justify-center h-12 px-6 text-sm font-medium uppercase tracking-tight rounded-md transition-probe",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
