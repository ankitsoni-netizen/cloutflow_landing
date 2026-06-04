"use client";

import { CreatorsPixelNetworkBackground } from "@/components/creators/CreatorsPixelNetworkBackground";

export function CreatorsHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background-dark" aria-hidden>
      <CreatorsPixelNetworkBackground />

      <div className="absolute inset-0 z-[1] pointer-events-none bg-background-dark/55" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-background-dark via-background-dark/85 to-background-dark/35" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-background-dark via-transparent to-background-dark/50" />
      <div className="absolute inset-y-0 left-0 z-[1] w-full max-w-xl pointer-events-none bg-gradient-to-r from-background-dark/80 via-background-dark/40 to-transparent" />
    </div>
  );
}
