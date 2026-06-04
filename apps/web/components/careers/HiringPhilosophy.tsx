import { CareersSection } from "@/components/careers/CareersSection";
import { hiringPhilosophy } from "@/data/hiring-philosophy";

export function HiringPhilosophy() {
  return (
    <CareersSection variant="philosophy">
      <div className="container-page max-w-3xl">
        <p className="text-xs uppercase tracking-nav text-text-muted mb-4">
          {hiringPhilosophy.eyebrow}
        </p>
        <blockquote className="careers-reactive-prose text-2xl md:text-3xl font-medium tracking-tightest text-text-primary leading-snug mb-6">
          {hiringPhilosophy.lead}
        </blockquote>
        <div className="space-y-5 text-text-secondary text-md leading-relaxed">
          {hiringPhilosophy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </CareersSection>
  );
}
