"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { getProductStickyScrollOffset } from "@/lib/product-scroll-offset";
import {
  isLifecycleScrollLocked,
  scrollToLifecycleSection,
} from "@/lib/scroll-to-lifecycle-section";

function resolveActiveSectionId(
  sectionIds: string[],
  stickyOffset: number
): string | null {
  if (sectionIds.length === 0) return null;

  let active = sectionIds[0];
  for (const id of sectionIds) {
    const section = document.getElementById(id);
    if (!section) continue;
    if (section.getBoundingClientRect().top <= stickyOffset + 2) {
      active = id;
    }
  }
  return active;
}

export function ProductLifecycleNav({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [activeId, setActiveId] = useState<string | null>(
    () => items[0]?.id ?? null
  );
  const scrollRowRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const scrollPillIntoView = useCallback((id: string) => {
    const pill = pillRefs.current[id];
    const row = scrollRowRef.current;
    if (!pill || !row) return;
    const rowRect = row.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();
    const nextLeft =
      row.scrollLeft +
      (pillRect.left - rowRect.left) -
      rowRect.width / 2 +
      pillRect.width / 2;
    row.scrollTo({ left: nextLeft, behavior: "smooth" });
  }, []);

  const onNavClick = useCallback(
    (id: string) => {
      setActiveId(id);
      scrollToLifecycleSection(id);
      scrollPillIntoView(id);
    },
    [scrollPillIntoView]
  );

  useEffect(() => {
    const sectionIds = items.map((item) => item.id);
    let ticking = false;

    const syncActiveFromScroll = () => {
      if (isLifecycleScrollLocked()) return;
      const nextId = resolveActiveSectionId(
        sectionIds,
        getProductStickyScrollOffset()
      );
      if (!nextId) return;
      setActiveId((prev) => (prev === nextId ? prev : nextId));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        syncActiveFromScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    syncActiveFromScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash || !items.some((item) => item.id === hash)) return;

    const timer = window.setTimeout(() => {
      setActiveId(hash);
      scrollToLifecycleSection(hash, { updateHash: false });
      scrollPillIntoView(hash);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [items, scrollPillIntoView]);

  useEffect(() => {
    if (!activeId) return;
    scrollPillIntoView(activeId);
  }, [activeId, scrollPillIntoView]);

  return (
    <nav
      data-product-lifecycle-nav
      data-nav-surface="page"
      aria-label="Campaign lifecycle steps"
      className="sticky top-[80px] z-30 border-b border-border-light bg-background-page/95 backdrop-blur-sm"
    >
      <div className="container-page py-3">
        <div
          ref={scrollRowRef}
          className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                ref={(el) => {
                  pillRefs.current[item.id] = el;
                }}
                onClick={() => onNavClick(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-xs uppercase tracking-nav transition-probe",
                  "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isActive
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border-light text-text-secondary hover:border-primary hover:text-primary"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
