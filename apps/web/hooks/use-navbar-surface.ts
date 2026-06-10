"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getNavbarTheme, type NavbarTheme } from "@/lib/navbar-theme";
import {
  getNavSurfaceConfig,
  NAV_SURFACE_ATTR,
  parseNavSurfaceId,
  type NavSurfaceId,
} from "@/lib/nav-surface";

const NAVBAR_HEIGHT = 80;
const SCROLL_TOP_THRESHOLD = 6;
const PROBE_Y = NAVBAR_HEIGHT - 1;

function themeToDefaultSurface(theme: NavbarTheme): NavSurfaceId {
  return theme === "dark" ? "dark" : "page";
}

function resolveSurfaceFromDom(
  root: HTMLElement,
  fallback: NavSurfaceId
): NavSurfaceId {
  const marked = root.querySelectorAll<HTMLElement>(`[${NAV_SURFACE_ATTR}]`);
  if (marked.length === 0) return fallback;

  for (let i = marked.length - 1; i >= 0; i--) {
    const el = marked[i];
    const { top, bottom } = el.getBoundingClientRect();
    if (top <= PROBE_Y && bottom > PROBE_Y) {
      return parseNavSurfaceId(el.getAttribute(NAV_SURFACE_ATTR)) ?? fallback;
    }
  }

  let active: HTMLElement = marked[0];
  for (const el of marked) {
    if (el.getBoundingClientRect().top <= PROBE_Y) active = el;
  }

  return parseNavSurfaceId(active.getAttribute(NAV_SURFACE_ATTR)) ?? fallback;
}

export function useNavbarSurface() {
  const pathname = usePathname();
  const fallback = themeToDefaultSurface(getNavbarTheme(pathname));

  const [surfaceId, setSurfaceId] = useState<NavSurfaceId>(fallback);
  const [atTop, setAtTop] = useState(true);

  const measure = useCallback(() => {
    const root = document.getElementById("main-content");
    if (!root) {
      setSurfaceId(fallback);
      setAtTop(window.scrollY < SCROLL_TOP_THRESHOLD);
      return;
    }

    setAtTop(window.scrollY < SCROLL_TOP_THRESHOLD);
    setSurfaceId(resolveSurfaceFromDom(root, fallback));
  }, [fallback]);

  useEffect(() => {
    setSurfaceId(fallback);
    setAtTop(true);
    measure();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const root = document.getElementById("main-content");
    const observer = root
      ? new MutationObserver(() => {
          onScroll();
        })
      : null;

    if (root && observer) {
      observer.observe(root, { childList: true, subtree: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer?.disconnect();
    };
  }, [pathname, fallback, measure]);

  const surface = getNavSurfaceConfig(surfaceId);

  return { surface, surfaceId, atTop, theme: surface.theme };
}
