import type { Metadata } from "next";
import { CareersCoreValues } from "@/components/careers/CareersCoreValues";
import { CareersHeroActions } from "@/components/careers/CareersHeroActions";
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
          "careers-band careers-band--hero group/section min-h-0 bg-transparent py-12 md:py-16"
        )}
        decoration={
          <div className="careers-ambient careers-ambient--hero" aria-hidden />
        }
        title="Build the company shaping the future of influence."
        subtitle="At Cloutflow we build at the intersection of culture, creators, technology, and brand growth. We move fast, think deeply, execute sharply, and solve real marketing problems every day."
      >
        <CareersHeroActions />
      </PageHero>

      <HiringPhilosophy />

      <CareersCoreValues />

      <OperatingPrinciplesFlow />

      <LifeAtCloutflow />

      <CareersSection variant="roles" id="roles">
        <div className="container-page">
          <div data-scroll-target>
            <h2 className="text-2xl font-medium tracking-tightest mb-6">Open roles</h2>
          </div>
          <OpenRolesList jobs={jobs} />
        </div>
      </CareersSection>
    </>
  );
}
