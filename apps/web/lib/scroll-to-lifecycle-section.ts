import { getProductStickyScrollOffset } from "@/lib/product-scroll-offset";
import {
  animateScrollTo,
  cancelScrollAnimation,
  getSectionScrollTop,
  prefersReducedMotion,
} from "@/lib/scroll-to-section";

export { prefersReducedMotion } from "@/lib/scroll-to-section";

let lifecycleScrollLockUntil = 0;

export function isLifecycleScrollLocked(): boolean {
  return performance.now() < lifecycleScrollLockUntil;
}

export function scrollToLifecycleSection(
  sectionId: string,
  options?: { updateHash?: boolean; durationMs?: number }
): void {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const durationMs = options?.durationMs ?? 720;
  lifecycleScrollLockUntil = performance.now() + durationMs + 80;

  const scrollTop = getSectionScrollTop(section, {
    align: "start",
    offset: getProductStickyScrollOffset(),
  });

  if (options?.updateHash !== false) {
    const url = `${window.location.pathname}${window.location.search}#${sectionId}`;
    window.history.pushState(null, "", url);
  }

  cancelScrollAnimation();

  if (prefersReducedMotion()) {
    window.scrollTo(0, scrollTop);
    return;
  }

  animateScrollTo(scrollTop, durationMs);
}
