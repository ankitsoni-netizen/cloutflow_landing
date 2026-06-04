"use client";

import {
  useCallback,
  useEffect,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { scrollToSection } from "@/lib/scroll-to-section";

const primaryClasses =
  "bg-primary text-text-light border border-primary hover:opacity-90";
const tertiaryClasses =
  "bg-transparent text-text-primary border border-border-light hover:border-text-primary";

function CareersHeroLink({
  href,
  sectionId,
  className,
  children,
}: {
  href: string;
  sectionId: string;
  className?: string;
  children: ReactNode;
}) {
  const onClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      scrollToSection(sectionId, { updateHash: true, align: "start" });
    },
    [sectionId]
  );

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "relative z-10 inline-flex h-12 cursor-pointer items-center justify-center rounded-md px-6 text-sm font-medium uppercase tracking-tight transition-probe",
        className
      )}
    >
      {children}
    </a>
  );
}

export function CareersHeroActions() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "roles" || hash === "life-at-cloutflow") {
      requestAnimationFrame(() => {
        scrollToSection(hash, { updateHash: false, align: "start" });
      });
    }
  }, []);

  return (
    <div className="relative z-10 flex flex-wrap gap-4">
      <CareersHeroLink href="#roles" sectionId="roles" className={primaryClasses}>
        View Open Roles
      </CareersHeroLink>
      <CareersHeroLink
        href="#life-at-cloutflow"
        sectionId="life-at-cloutflow"
        className={tertiaryClasses}
      >
        Life at Cloutflow
      </CareersHeroLink>
    </div>
  );
}
