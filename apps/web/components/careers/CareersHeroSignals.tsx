import { CareersInlineIcon } from "@/components/careers/CareersInlineIcon";
import { careersHeroSignals } from "@/data/careers-page-extras";

export function CareersHeroSignals() {
  return (
    <ul className="m-0 grid list-none gap-3 sm:grid-cols-3 sm:gap-4">
      {careersHeroSignals.map((signal) => (
        <li
          key={signal.label}
          className="careers-hero-signal flex gap-3 rounded-lg border border-border-light/80 bg-white/60 px-4 py-3.5 backdrop-blur-sm"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/15 bg-primary/5 text-primary">
            <CareersInlineIcon name={signal.icon} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium tracking-tight text-text-primary">
              {signal.label}
            </p>
            <p className="mt-0.5 text-xs text-text-secondary leading-snug">
              {signal.detail}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
