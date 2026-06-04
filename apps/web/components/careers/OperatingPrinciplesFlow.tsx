import {
  operatingPrinciples,
  type PrincipleIcon,
} from "@/data/operating-principles";
import { cn } from "@/lib/cn";

function PrincipleIconSvg({
  icon,
  className,
}: {
  icon: PrincipleIcon;
  className?: string;
}) {
  const shared = cn("h-6 w-6", className);
  switch (icon) {
    case "businessProblem":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    case "culture":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <path
            d="M4 14c2-3 4-5 8-5s6 2 8 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M8 10l2-3 2 3 2-3 2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "partners":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <path
            d="M8 11a3 3 0 116 0 3 3 0 01-6 0zM4 19v-1a4 4 0 014-4h8a4 4 0 014 4v1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "delivery":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <path
            d="M5 12h12M13 8l5 4-5 4M5 6v12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ownership":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <path
            d="M6 19V9l6-4 6 4v10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M10 19v-4h4v4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "speed":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <path
            d="M12 4v8l4 2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "data":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <path
            d="M4 14c2-4 6-6 8-10 2 4 6 6 8 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M6 18h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "quality":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <path
            d="M9 12l2 2 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 4l2 4h4l-3 3 1 5-4-2-4 2 1-5-3-3h4l2-4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "systems":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="9" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 10v2h2M17 10v2h-2M12 14v-2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "simplicity":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "trust":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <path
            d="M12 5c-2 3-5 4-5 7a5 5 0 0010 0c0-3-3-4-5-7z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "learn":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <path
            d="M6 16l4-8 4 4 4-10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "taste":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <path
            d="M12 4l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7L12 4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "proactive":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <path
            d="M5 12h11M13 8l5 4-5 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "future":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={shared} aria-hidden>
          <path
            d="M4 17c3-4 6-6 8-6s5 2 8 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
}

function PrincipleNode({
  label,
  description,
  icon,
}: {
  label: string;
  description: string;
  icon: PrincipleIcon;
}) {
  return (
    <div
      className={cn(
        "flex w-[min(68vw,168px)] shrink-0 snap-center flex-col items-center text-center sm:w-[168px]"
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-md border border-border-light bg-background-soft text-primary">
        <PrincipleIconSvg icon={icon} />
      </div>
      <h3 className="mt-4 text-sm font-medium uppercase tracking-nav text-text-primary">
        {label}
      </h3>
      <p className="mt-2 text-xs text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}

function Connector() {
  return (
    <div
      className="flex shrink-0 items-start self-start pt-7 text-border-light"
      aria-hidden
    >
      <svg viewBox="0 0 24 12" className="h-3 w-6" fill="none">
        <path
          d="M0 6h16M12 2l6 4-6 4"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function OperatingPrinciplesFlow() {
  return (
    <section className="section-y bg-background-page overflow-hidden">
      <div className="container-page">
        <h2 className="text-2xl font-medium tracking-tightest mb-10">
          Operating principles
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:thin]">
          {operatingPrinciples.map((principle, index) => (
            <div key={principle.id} className="flex shrink-0 items-start">
              <PrincipleNode
                label={principle.label}
                description={principle.description}
                icon={principle.icon}
              />
              {index < operatingPrinciples.length - 1 && <Connector />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
