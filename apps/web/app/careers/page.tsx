import type { Metadata } from "next";
import { CareersCoreValues } from "@/components/careers/CareersCoreValues";
import { CareersHeroActions } from "@/components/careers/CareersHeroActions";
import { CareersHeroSignals } from "@/components/careers/CareersHeroSignals";
import { HiringPhilosophy } from "@/components/careers/HiringPhilosophy";
import { LifeAtCloutflow } from "@/components/careers/LifeAtCloutflow";
import { OpenRolesList } from "@/components/careers/OpenRolesList";
import { OperatingPrinciplesFlow } from "@/components/careers/OperatingPrinciplesFlow";
import { PageHero } from "@/components/sections/PageHero";
import { CareersSection } from "@/components/careers/CareersSection";
import { careersSection } from "@/components/careers/careers-section";
import { getJobs } from "@/lib/content";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build the company shaping the future of influence.",
};

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <>
      <PageHero
        className={cn(
          careersSection,
          "careers-band careers-band--hero group/section bg-transparent"
        )}
        decoration={
          <div className="careers-ambient careers-ambient--hero" aria-hidden />
        }
        title="Build the company shaping the future of influence."
        subtitle="At Cloutflow we build at the intersection of culture, creators, technology, and brand growth. We move fast, think deeply, execute sharply, and solve real marketing problems every day."
      >
        <div className="w-full space-y-8">
          <CareersHeroSignals />
          <CareersHeroActions />
        </div>
      </PageHero>

      <HiringPhilosophy />

      <CareersCoreValues />

      <OperatingPrinciplesFlow />

      <LifeAtCloutflow />

      <CareersSection variant="roles" id="roles">
        <div className="container-page max-w-4xl">
          <div className="mb-10 md:mb-12" data-scroll-target>
            <p className="text-xs uppercase tracking-nav text-text-light/60 mb-3">
              Join the team
            </p>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tightest mb-3">
              Open roles
            </h2>
            <p className="text-sm text-text-light/70 leading-relaxed max-w-xl">
              We hire builders across product, revenue, operations, and creator
              partnerships. If you do not see a fit, reach out — we are always
              meeting sharp people.
            </p>
          </div>
          <OpenRolesList jobs={jobs} />
        </div>
      </CareersSection>
    </>
  );
}
