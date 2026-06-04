"use client";

import Link from "next/link";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

const SUPADEMO_EMBED_URL =
  "https://app.supademo.com/embed/cmmgecbq45e34nr99oz4amzqr?embed_v=2&utm_source=link";

export function ProductMockup() {
  const { ref, progress } = useScrollReveal<HTMLAnchorElement>();
  const translatePct = 40 * (1 - progress);
  const style: React.CSSProperties = {
    transform: `translate3d(${translatePct}%, 0, 0)`,
    opacity: progress,
    transition: "transform 60ms linear, opacity 60ms linear",
    willChange: "transform, opacity",
  };

  return (
    <Link
      ref={ref}
      href="/product"
      style={style}
      aria-label="Open the Cloutflow product"
      className="group relative block w-full aspect-[16/10] bg-background-dark border border-white/10 rounded-md overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <iframe
        src={SUPADEMO_EMBED_URL}
        title="Cloutflow product dashboard demo"
        loading="lazy"
        allow="clipboard-write; fullscreen"
        allowFullScreen
        className="absolute inset-0 h-full w-full pointer-events-none select-none"
      />
      <span
        className="absolute inset-0 bg-transparent group-hover:bg-white/[0.04] transition-probe"
        aria-hidden
      />
      <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-primary text-text-light text-xs uppercase tracking-nav font-medium px-3 py-2 rounded-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-probe pointer-events-none">
        Open product
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
