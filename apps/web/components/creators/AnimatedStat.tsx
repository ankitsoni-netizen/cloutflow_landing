"use client";

import { useEffect, useRef, useState } from "react";

function parseStat(value: string): { num: number; suffix: string } {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

export function AnimatedStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);
  const { num, suffix } = parseStat(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let started = false;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      started = true;
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = num * eased;
        const formatted =
          num >= 100
            ? Math.round(current).toString()
            : current.toFixed(num % 1 ? 1 : 0);
        setDisplay(`${formatted}${suffix}`);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const duration = 1400;
          const start = performance.now();

          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = num * eased;
            const formatted =
              num >= 100
                ? Math.round(current).toString()
                : current.toFixed(num % 1 ? 1 : 0);
            setDisplay(`${formatted}${suffix}`);
            if (t < 1) frame = requestAnimationFrame(tick);
          };

          frame = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [num, suffix, value]);

  return (
    <div ref={ref}>
      <dt className="font-label-sm tracking-nav text-text-light/40">
        {label}
      </dt>
      <dd className="mt-1 text-xl md:text-2xl font-medium tracking-tight tabular-nums">
        {display}
      </dd>
    </div>
  );
}
