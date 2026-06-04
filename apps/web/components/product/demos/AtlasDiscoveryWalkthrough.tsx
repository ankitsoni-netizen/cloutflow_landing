"use client";

import { discoveryCreatorAvatars } from "@/lib/local-assets";
import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Phase =
  | "idle"
  | "moveToFilter"
  | "clickFilter"
  | "filtersOpen"
  | "moveToPlatform"
  | "platformHighlight"
  | "results";

const CREATORS = [
  {
    name: "Priya Sharma",
    handle: "@priya_style",
    followers: "2.1M",
    views: "1.1M",
    er: "4.9%",
    avatar: discoveryCreatorAvatars.priyaSharma,
  },
  {
    name: "Arjun Mehta",
    handle: "@arjunmehta",
    followers: "890K",
    views: "318K",
    er: "5.2%",
    avatar: discoveryCreatorAvatars.arjunMehta,
  },
  {
    name: "Ananya Reddy",
    handle: "@ananya.reddy",
    followers: "1.4M",
    views: "542K",
    er: "3.9%",
    avatar: discoveryCreatorAvatars.ananyaReddy,
  },
  {
    name: "Rahul Kapoor",
    handle: "@rahulkapoor",
    followers: "640K",
    views: "205K",
    er: "6.1%",
    avatar: discoveryCreatorAvatars.rahulKapoor,
  },
];

const PHASE_MS: Record<Phase, number> = {
  idle: 1200,
  moveToFilter: 700,
  clickFilter: 400,
  filtersOpen: 1400,
  moveToPlatform: 700,
  platformHighlight: 1200,
  results: 1800,
};

const PHASE_ORDER: Phase[] = [
  "idle",
  "moveToFilter",
  "clickFilter",
  "filtersOpen",
  "moveToPlatform",
  "platformHighlight",
  "results",
];

const CURSOR: Record<Phase, { x: number; y: number; clicking?: boolean }> = {
  idle: { x: 78, y: 18 },
  moveToFilter: { x: 72, y: 38 },
  clickFilter: { x: 72, y: 38, clicking: true },
  filtersOpen: { x: 72, y: 38 },
  moveToPlatform: { x: 12, y: 32 },
  platformHighlight: { x: 12, y: 32, clicking: true },
  results: { x: 50, y: 68 },
};

const FILTER_CHIPS = [
  "Audience location",
  "Audience age",
  "Audience gender",
  "Creator location: 1 selected",
  "Contact options",
] as const;

function IconSearch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m21 21-4.34-4.34" />
      <circle cx="11" cy="11" r="8" />
    </svg>
  );
}

function IconSliders({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 5H3" />
      <path d="M12 19H3" />
      <path d="M14 3v4" />
      <path d="M16 17v4" />
      <path d="M21 12h-9" />
      <path d="M21 19h-5" />
      <path d="M21 5h-7" />
      <path d="M8 10v4" />
      <path d="M8 12H3" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconExternalLink({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function IconEye({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function PlatformIcon({
  label,
  active,
}: {
  label: "instagram" | "youtube" | "TT" | "X" | "linkedin";
  active?: boolean;
}) {
  const gradientId = useId();

  const icons: Record<string, ReactNode> = {
    instagram: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
        />
        <circle cx="17.5" cy="6.5" r="1" fill={`url(#${gradientId})`} />
        <defs>
          <linearGradient id={gradientId} x1="0" y1="24" x2="24" y2="0">
            <stop stopColor="#f58529" />
            <stop offset="0.5" stopColor="#dd2a7b" />
            <stop offset="1" stopColor="#8134af" />
          </linearGradient>
        </defs>
      </svg>
    ),
    youtube: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF0000" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .6 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8zM9.8 15.5V8.5L15.8 12l-6 3.5z" />
      </svg>
    ),
    TT: (
      <span className="text-[11px] font-bold text-[#010101]">TT</span>
    ),
    X: <span className="text-[13px] font-bold text-[#010101]">X</span>,
    linkedin: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden>
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h3v1.3a3.11 3.11 0 012.7-1.4c1.55 0 2.3 1 2.3 2.9z" />
      </svg>
    ),
  };

  return (
    <span
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all",
        active
          ? "border-[#635bff] bg-[#eef2ff] ring-2 ring-[#635bff]/30"
          : "border-[#e3e8ee] bg-white hover:border-[#c7d2fe] hover:bg-[#f8fafc]"
      )}
      title={label}
    >
      {icons[label]}
    </span>
  );
}

export function AtlasDiscoveryWalkthrough({
  autoplay = true,
  className,
}: {
  autoplay?: boolean;
  className?: string;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!autoplay || reducedMotion) {
      setPhase("results");
      return;
    }

    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const next = PHASE_ORDER[index];
      setPhase(next);
      index = (index + 1) % PHASE_ORDER.length;
      timeout = setTimeout(tick, PHASE_MS[next]);
    };

    setPhase("idle");
    timeout = setTimeout(tick, PHASE_MS.idle);

    return () => clearTimeout(timeout);
  }, [autoplay, reducedMotion]);

  const filtersExpanded = useMemo(
    () =>
      reducedMotion ||
      ["filtersOpen", "moveToPlatform", "platformHighlight", "results"].includes(
        phase
      ),
    [phase, reducedMotion]
  );

  const platformHighlight =
    phase === "platformHighlight" || phase === "results";
  const filterBtnActive =
    phase === "clickFilter" || filtersExpanded;
  const cursor = reducedMotion ? null : CURSOR[phase];
  const creatorCount = phase === "results" ? "34" : "36";

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-white text-[#1a1f36]",
        className
      )}
      aria-label="Atlas Discovery walkthrough: Influencer Network Smart Search"
    >
      <div className="flex h-full flex-col overflow-hidden p-2.5 md:p-3">
        <header className="mb-2 shrink-0">
          <h1 className="text-[13px] font-bold leading-tight text-[#1a1f36] md:text-[15px]">
            Influencer Network
          </h1>
          <p className="mt-0.5 max-w-2xl text-[9px] leading-snug text-[#697386] md:text-[10px]">
            Discover new talent, manage your relationships, and organize your
            creator network all in one place.
          </p>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <span className="flex items-center gap-1 rounded-lg border border-[#e3e8ee] bg-white px-2 py-1 text-[9px] font-medium text-[#1a1f36] shadow-sm">
              Select a Campaign
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#e3e8ee] bg-white text-[#697386]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </span>
          </div>
        </header>

        <div className="mb-1.5 shrink-0 overflow-hidden rounded-xl border border-[#e3e8ee] bg-white shadow-sm">
          <div className="flex items-center justify-between gap-2 rounded-t-xl border-b border-[#e3e8ee] bg-gradient-to-r from-[#1a1f36] to-[#2d3748] px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white">
                <IconSearch className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-[11px] font-bold text-white md:text-[12px]">
                  Smart Search
                </h2>
                <p className="text-[9px] text-white/70 md:text-[10px]">
                  Find the perfect creators for your campaigns.
                </p>
              </div>
            </div>
          </div>

          <div className="flex border-b border-[#e3e8ee] px-2 pt-1">
            <button
              type="button"
              className="rounded-t-lg border-b-2 border-[#635bff] bg-white px-2.5 py-1 text-[9px] font-semibold text-[#635bff] md:text-[10px]"
            >
              Smart Search
            </button>
            <button
              type="button"
              className="rounded-t-lg border-b-2 border-transparent px-2.5 py-1 text-[9px] font-semibold text-[#697386] md:text-[10px]"
            >
              By username
            </button>
          </div>

          <div className="space-y-1.5 p-2">
            <div
              className="flex flex-wrap items-center gap-1"
              data-demo-target="platform"
            >
              {(
                ["instagram", "youtube", "TT", "X", "linkedin"] as const
              ).map((p) => (
                <PlatformIcon
                  key={p}
                  label={p}
                  active={p === "instagram" && platformHighlight}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                className="flex shrink-0 items-center gap-1 rounded-lg border border-[#e3e8ee] bg-white px-2 py-1 text-[9px] font-semibold text-[#1a1f36]"
              >
                Followers
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div className="flex min-w-[80px] flex-1 items-center rounded-lg border border-[#e3e8ee] bg-white px-2 py-1">
                <input
                  readOnly
                  placeholder="Search creators, categories or username"
                  className="min-w-0 flex-1 bg-transparent text-[9px] outline-none placeholder:text-[#a3acb9] md:text-[10px]"
                />
              </div>
              <div className="flex min-w-[48px] items-center rounded-lg border border-[#e3e8ee] bg-white px-2 py-1">
                <input
                  readOnly
                  placeholder="Topics"
                  className="min-w-0 flex-1 bg-transparent text-[9px] outline-none placeholder:text-[#a3acb9] md:text-[10px]"
                />
              </div>
              <button
                type="button"
                className="flex shrink-0 items-center gap-1 rounded-lg border border-[#bae6fd] bg-[#f0f9ff] px-2 py-1 text-[9px] font-medium text-[#0369a1] shadow-sm md:text-[10px]"
              >
                Sort by: Followers
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                data-demo-target="search-by-filter"
                className={cn(
                  "flex shrink-0 items-center gap-1 rounded-lg border px-2 py-1 text-[9px] font-semibold transition-colors md:text-[10px]",
                  filterBtnActive
                    ? "border-[#c7d2fe] bg-[#eef2ff] text-[#635bff]"
                    : "border-[#e3e8ee] bg-white text-[#1a1f36]"
                )}
              >
                <IconSliders />
                <span>Search by filter</span>
              </button>
              <button
                type="button"
                className="shrink-0 rounded-lg bg-[#635bff] px-3 py-1 text-[9px] font-bold text-white shadow-sm md:text-[10px]"
              >
                Get Results
              </button>
            </div>

            <div
              className={cn(
                "grid transition-all duration-500 ease-out",
                filtersExpanded
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="flex flex-wrap gap-1 border-t border-[#f1f5f9] pt-1.5">
                  {FILTER_CHIPS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      className="flex items-center justify-between gap-1 rounded-lg border border-[#e3e8ee] bg-white px-2 py-1 text-[9px] font-medium text-[#1a1f36] shadow-sm md:text-[10px]"
                    >
                      {f}
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  ))}
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-lg border border-dashed border-[#635bff] bg-[#fafbff] px-2 py-1 text-[9px] font-bold text-[#635bff] md:text-[10px]"
                  >
                    <span className="text-[11px] leading-none">+</span>
                    More filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#e3e8ee] bg-white shadow-sm">
          <div className="flex shrink-0 items-center gap-1.5 border-b border-[#e3e8ee] px-2 py-1.5">
            <IconUsers className="text-[#697386]" />
            <span className="text-[9px] font-semibold text-[#1a1f36] md:text-[10px]">
              {creatorCount} creators
            </span>
          </div>

          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e3e8ee] bg-[#f8fafc] text-[8px] font-semibold uppercase tracking-wide text-[#697386] md:text-[9px]">
                  <th className="w-6 px-1.5 py-1">
                    <span className="inline-block h-3 w-3 rounded border border-[#c7d2fe]" />
                  </th>
                  <th className="px-1.5 py-1">Creator</th>
                  <th className="px-1.5 py-1">
                    <span className="inline-flex items-center gap-0.5">
                      Followers
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                      >
                        <path d="m7 15 5 5 5-5" />
                        <path d="m7 9 5-5 5 5" />
                      </svg>
                    </span>
                  </th>
                  <th className="px-1.5 py-1">Avg reel views</th>
                  <th className="px-1.5 py-1">ER%</th>
                  <th className="hidden px-1.5 py-1 sm:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {CREATORS.map((c) => (
                  <tr
                    key={c.handle}
                    className={cn(
                      "border-b border-[#f1f5f9] transition-colors hover:bg-[#f8fafc]",
                      phase === "results" && "bg-[#fafbff]"
                    )}
                  >
                    <td className="px-1.5 py-1">
                      <span className="inline-block h-3 w-3 rounded border border-[#c7d2fe]" />
                    </td>
                    <td className="px-1.5 py-1">
                      <div className="flex min-w-0 items-center gap-1.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.avatar}
                          alt=""
                          className="h-6 w-6 shrink-0 rounded-full border border-[#e3e8ee] object-cover md:h-7 md:w-7"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-0.5">
                            <IconInstagram className="shrink-0 text-[#E1306C]" />
                            <span className="truncate text-[9px] font-semibold text-[#635bff] md:text-[10px]">
                              {c.name}
                            </span>
                            <IconExternalLink className="shrink-0 text-[#a3acb9]" />
                          </div>
                          <p className="truncate text-[8px] text-[#697386] md:text-[9px]">
                            {c.handle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-1.5 py-1 text-[9px] text-[#4f566b] md:text-[10px]">
                      {c.followers}
                    </td>
                    <td className="whitespace-nowrap px-1.5 py-1 text-[9px] text-[#4f566b] md:text-[10px]">
                      {c.views}
                    </td>
                    <td className="whitespace-nowrap px-1.5 py-1 text-[9px] text-[#4f566b] md:text-[10px]">
                      {c.er}
                    </td>
                    <td className="hidden px-1.5 py-1 sm:table-cell">
                      <span className="inline-flex items-center gap-0.5 rounded-md border border-[#c7d2fe] bg-white px-1.5 py-0.5 text-[8px] font-semibold text-[#635bff] md:text-[9px]">
                        <IconEye />
                        Open profile
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-1 border-t border-[#e3e8ee] px-2 py-1">
            <button
              type="button"
              disabled
              className="rounded-md border border-[#e3e8ee] px-2 py-0.5 text-[8px] text-[#a3acb9] md:text-[9px]"
            >
              Prev
            </button>
            <button
              type="button"
              disabled
              className="rounded-md border border-[#e3e8ee] px-2 py-0.5 text-[8px] text-[#a3acb9] md:text-[9px]"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {cursor && (
        <div
          className="pointer-events-none absolute z-20 transition-all duration-700 ease-out"
          style={{
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
            transform: "translate(-4px, -4px)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-md"
            aria-hidden
          >
            <path
              d="M5.5 3.5L18 11.5L11.5 13.5L9.5 20.5L5.5 3.5Z"
              fill="#111"
              stroke="#fff"
              strokeWidth="1.2"
            />
          </svg>
          {cursor.clicking && (
            <span className="absolute left-2 top-2 h-6 w-6 animate-ping rounded-full bg-[#635bff]/30" />
          )}
        </div>
      )}
    </div>
  );
}
