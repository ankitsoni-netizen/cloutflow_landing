export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getScrollTarget(sectionId: string): HTMLElement | null {
  const section = document.getElementById(sectionId);
  if (!section) return null;
  return (
    section.querySelector<HTMLElement>("[data-scroll-target]") ??
    section.querySelector<HTMLElement>("[data-lifecycle-scroll-target]") ??
    section
  );
}

export type ScrollAlign = "center" | "start";

/** Compute scroll position for a target element. */
export function getSectionScrollTop(
  target: HTMLElement,
  options?: { align?: ScrollAlign; offset?: number }
): number {
  const rect = target.getBoundingClientRect();
  const sectionTop = window.scrollY + rect.top;
  const sectionHeight = rect.height;
  const viewport = window.innerHeight;
  const offset = options?.offset ?? 0;

  let scrollTop: number;
  if (options?.align === "start") {
    scrollTop = sectionTop - offset;
  } else {
    scrollTop = sectionTop + sectionHeight / 2 - viewport / 2;
  }

  const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewport);
  return Math.min(maxScroll, Math.max(0, scrollTop));
}

let scrollAnimationFrame: number | null = null;

export function cancelScrollAnimation(): void {
  if (scrollAnimationFrame != null) {
    cancelAnimationFrame(scrollAnimationFrame);
    scrollAnimationFrame = null;
  }
}

export function animateScrollTo(targetY: number, durationMs: number): void {
  cancelScrollAnimation();

  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const startTime = performance.now();

  function frame(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    window.scrollTo(0, startY + distance * progress);
    if (progress < 1) {
      scrollAnimationFrame = requestAnimationFrame(frame);
    } else {
      scrollAnimationFrame = null;
    }
  }

  scrollAnimationFrame = requestAnimationFrame(frame);
}

const NAVBAR_OFFSET = 88;

export function scrollToSection(
  sectionId: string,
  options?: {
    updateHash?: boolean;
    align?: ScrollAlign;
    offset?: number;
    durationMs?: number;
  }
): void {
  const target = getScrollTarget(sectionId);
  if (!target) return;

  const scrollTop = getSectionScrollTop(target, {
    align: options?.align ?? "start",
    offset: options?.offset ?? NAVBAR_OFFSET,
  });

  if (options?.updateHash !== false) {
    const url = `${window.location.pathname}${window.location.search}#${sectionId}`;
    window.history.pushState(null, "", url);
  }

  if (prefersReducedMotion()) {
    window.scrollTo(0, scrollTop);
    return;
  }

  animateScrollTo(scrollTop, options?.durationMs ?? 720);
}
