import { CareersInlineIcon } from "@/components/careers/CareersInlineIcon";
import { CareersPartnerStrip } from "@/components/careers/CareersPartnerStrip";
import { CareersSection } from "@/components/careers/CareersSection";
import { careersHiringHighlights } from "@/data/careers-page-extras";
import { hiringPhilosophy } from "@/data/hiring-philosophy";

export function HiringPhilosophy() {
  return (
    <CareersSection variant="philosophy">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-nav text-text-muted mb-5">
              {hiringPhilosophy.eyebrow}
            </p>
            <blockquote className="careers-reactive-prose text-2xl md:text-3xl font-medium tracking-tightest text-text-primary leading-snug mb-8">
              {hiringPhilosophy.lead}
            </blockquote>
            <div className="space-y-6 text-text-secondary text-md leading-relaxed max-w-2xl">
              {hiringPhilosophy.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-nav text-text-muted mb-5">
              What we look for
            </p>
            <ul className="m-0 grid list-none gap-4">
              {careersHiringHighlights.map((item) => (
                <li
                  key={item.title}
                  className="careers-highlight-card careers-reactive-cell flex gap-4 rounded-xl p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 text-primary">
                    <CareersInlineIcon name={item.icon} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium tracking-tight">{item.title}</h3>
                    <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CareersPartnerStrip />
      </div>
    </CareersSection>
  );
}
