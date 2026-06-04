"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  blobGradient,
  createInitialSimulation,
  inkCursorShadowGradient,
  inkCursorShadowOpacity,
  stepSimulation,
  type CtaTone,
  type InkSimulation,
} from "@/lib/explore-os-ink";

const toneStyles: Record<CtaTone, string> = {
  light: "bg-transparent text-text-primary border-border-light",
  dark: "bg-transparent text-text-light border-white/25",
};

const osToneStyles: Record<CtaTone, string> = {
  light: "border-border-light text-text-primary",
  dark: "border-white/30 text-text-light",
};

function CtaArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={cn("h-4 w-4 shrink-0", className)}
      aria-hidden
    >
      <path
        d="M4 10h11M11 6l5 4-5 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function resolveTone(
  tone: CtaTone,
  variant?: "primary" | "secondary" | "onDark"
): CtaTone {
  if (variant === "onDark") return "dark";
  return tone;
}

function CtaLabel({
  compact,
  resolvedTone,
}: {
  compact: boolean;
  resolvedTone: CtaTone;
}) {
  return (
    <span className="relative flex items-center gap-2">
      <span
        className={cn(
          "font-medium uppercase tracking-tight leading-none",
          compact ? "text-[11px]" : "text-sm"
        )}
      >
        Explore the Cloutflow
      </span>
      <span
        className={cn(
          "font-geist-mono inline-flex items-center justify-center rounded-sm border leading-none",
          osToneStyles[resolvedTone],
          compact
            ? "px-1.5 py-0.5 text-[10px] tracking-[0.08em]"
            : "px-2 py-0.5 text-[11px] tracking-[0.06em]"
        )}
      >
        OS
      </span>
      <CtaArrow className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
    </span>
  );
}

function ExploreCloutflowOsCtaStatic({
  href = "/product",
  tone = "light",
  variant,
  size = "default",
  className,
}: {
  href?: string;
  tone?: CtaTone;
  variant?: "primary" | "secondary" | "onDark";
  size?: "default" | "compact";
  className?: string;
}) {
  const compact = size === "compact";
  const resolvedTone = resolveTone(tone, variant);

  return (
    <Link
      href={href}
      className={cn(
        "explore-os-cta group relative inline-flex items-center border rounded-md transition-probe",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        compact ? "h-11 px-4" : "h-12 px-5",
        toneStyles[resolvedTone],
        className
      )}
    >
      <CtaLabel compact={compact} resolvedTone={resolvedTone} />
    </Link>
  );
}

function ExploreCloutflowOsCtaInk({
  href = "/product",
  tone = "light",
  variant,
  size = "default",
  className,
}: {
  href?: string;
  tone?: CtaTone;
  variant?: "primary" | "secondary" | "onDark";
  size?: "default" | "compact";
  className?: string;
}) {
  const compact = size === "compact";
  const resolvedTone = resolveTone(tone, variant);

  const linkRef = useRef<HTMLAnchorElement>(null);
  const simRef = useRef<InkSimulation>(createInitialSimulation());
  const activeRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const rafRef = useRef<number>(0);

  const [sim, setSim] = useState<InkSimulation>(() => createInitialSimulation());
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = mq.matches;
      setReducedMotion(mq.matches);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const tick = useCallback((time: number) => {
    const next = stepSimulation(simRef.current, time, activeRef.current);
    simRef.current = next;
    setSim(next);
    if (activeRef.current || next.intensity > 0.015) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const startLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const setTargetFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      const el = linkRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const next = {
        ...simRef.current,
        targetX: Math.min(0.92, Math.max(0.08, (clientX - r.left) / r.width)),
        targetY: Math.min(0.92, Math.max(0.08, (clientY - r.top) / r.height)),
      };
      simRef.current = next;
      setSim((prev) => ({ ...prev, targetX: next.targetX, targetY: next.targetY }));
    },
    []
  );

  const onPointerEnter = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      activeRef.current = true;
      setTargetFromEvent(e.clientX, e.clientY);
      if (!reducedMotionRef.current) startLoop();
    },
    [setTargetFromEvent, startLoop]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      setTargetFromEvent(e.clientX, e.clientY);
    },
    [setTargetFromEvent]
  );

  const onPointerLeave = useCallback(() => {
    activeRef.current = false;
    if (!reducedMotionRef.current) startLoop();
  }, [startLoop]);

  const onFocus = useCallback(() => {
    activeRef.current = true;
    const next = { ...simRef.current, targetX: 0.5, targetY: 0.5 };
    simRef.current = next;
    setSim((prev) => ({ ...prev, targetX: 0.5, targetY: 0.5 }));
    if (!reducedMotionRef.current) startLoop();
  }, [startLoop]);

  const onBlur = useCallback(() => {
    activeRef.current = false;
    if (!reducedMotionRef.current) startLoop();
  }, [startLoop]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const inkOpacity = sim.intensity;
  const showInk = !reducedMotion && sim.intensity > 0.02;
  const bleedPad = compact ? 12 : 16;

  return (
    <span className={cn("relative inline-flex overflow-visible", className)}>
      {showInk && (
        <span
          className="pointer-events-none absolute z-0 overflow-visible"
          style={{
            top: -bleedPad,
            right: -bleedPad,
            bottom: -bleedPad,
            left: -bleedPad,
          }}
          aria-hidden
        >
          <span
            className="absolute overflow-visible"
            style={{
              top: bleedPad,
              right: bleedPad,
              bottom: bleedPad,
              left: bleedPad,
            }}
          >
            <span
              className="absolute rounded-full will-change-[left,top,opacity]"
              style={{
                left: `${sim.targetX * 100}%`,
                top: `${sim.targetY * 100}%`,
                width: compact ? "100%" : "120%",
                height: compact ? "100%" : "120%",
                transform: "translate(calc(-50% + 2px), calc(-50% + 4px))",
                background: inkCursorShadowGradient(),
                filter: "blur(28px)",
                boxShadow:
                  "0 14px 44px rgba(7, 62, 253, 0.42), 0 4px 16px rgba(46, 91, 255, 0.28)",
                opacity: inkCursorShadowOpacity(inkOpacity),
              }}
            />
            {sim.blobs.map((blob, i) => (
              <span
                key={i}
                className="absolute rounded-full will-change-[left,top,opacity]"
                style={{
                  left: `${blob.x * 100}%`,
                  top: `${blob.y * 100}%`,
                  width: `${blob.radius * 135}%`,
                  height: `${blob.radius * 135}%`,
                  transform: "translate(-50%, -50%)",
                  background: blobGradient(blob.colorIndex),
                  filter: "blur(26px)",
                  opacity: blob.opacity * inkOpacity * 0.9,
                }}
              />
            ))}
          </span>
        </span>
      )}

      <Link
        ref={linkRef}
        href={href}
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(
          "explore-os-cta group relative z-10 inline-flex w-full items-center overflow-visible border rounded-md transition-probe",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          compact ? "h-11 px-4" : "h-12 px-5",
          toneStyles[resolvedTone]
        )}
      >
        <CtaLabel compact={compact} resolvedTone={resolvedTone} />
      </Link>
    </span>
  );
}

export function ExploreCloutflowOsCta({
  inkEffect = true,
  ...props
}: {
  href?: string;
  tone?: CtaTone;
  variant?: "primary" | "secondary" | "onDark";
  size?: "default" | "compact";
  className?: string;
  inkEffect?: boolean;
}) {
  if (!inkEffect) {
    return <ExploreCloutflowOsCtaStatic {...props} />;
  }
  return <ExploreCloutflowOsCtaInk {...props} />;
}
