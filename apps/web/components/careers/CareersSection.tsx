"use client";

import { careersSection } from "@/components/careers/careers-section";
import { ScrollReveal } from "@/components/creators/ScrollReveal";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type CareersSectionVariant =
  | "hero"
  | "philosophy"
  | "values"
  | "principles"
  | "life"
  | "roles";

const variantText: Record<CareersSectionVariant, string> = {
  hero: "text-text-primary",
  philosophy: "text-text-primary",
  values: "text-text-primary",
  principles: "text-text-primary",
  life: "text-text-light",
  roles: "text-text-light",
};

const navSurface: Record<CareersSectionVariant, string> = {
  hero: "page",
  philosophy: "soft",
  values: "page",
  principles: "principles",
  life: "blue",
  roles: "dark",
};

const ambientClass: Record<CareersSectionVariant, string> = {
  hero: "careers-ambient--hero",
  philosophy: "careers-ambient--philosophy",
  values: "careers-ambient--values",
  principles: "careers-ambient--principles",
  life: "careers-ambient--life",
  roles: "careers-ambient--roles",
};

export function CareersSection({
  variant,
  id,
  className,
  children,
  reveal = true,
}: {
  variant: CareersSectionVariant;
  id?: string;
  className?: string;
  children: ReactNode;
  reveal?: boolean;
}) {
  const body = reveal ? <ScrollReveal>{children}</ScrollReveal> : children;

  return (
    <section
      id={id}
      data-nav-surface={navSurface[variant]}
      className={cn(
        careersSection,
        "careers-band group/section relative overflow-hidden",
        `careers-band--${variant}`,
        variantText[variant],
        className
      )}
    >
      <div
        className={cn("careers-ambient", ambientClass[variant])}
        aria-hidden
      />
      <div
        className={cn(
          "relative z-10 w-full flex-1 flex flex-col",
          variant === "life" ? "justify-start" : "justify-center"
        )}
      >
        {body}
      </div>
    </section>
  );
}
