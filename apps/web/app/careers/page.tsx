import type { Metadata } from "next";
import { CareersHeroActions } from "@/components/careers/CareersHeroActions";
import { HiringPhilosophy } from "@/components/careers/HiringPhilosophy";
import { LifeAtCloutflow } from "@/components/careers/LifeAtCloutflow";
import { OpenRolesList } from "@/components/careers/OpenRolesList";
import { OperatingPrinciplesFlow } from "@/components/careers/OperatingPrinciplesFlow";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/Card";
import { getJobs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build the company shaping the future of influence.",
};

const values = [
  { title: "Business Problem First", desc: "We start from what the brand needs to move, not what is trendy." },
  { title: "Culture Moves Fast, So Do We", desc: "Speed with clarity beats perfection in a vacuum." },
  { title: "Ownership Over Instructions", desc: "We hire people who close loops without being chased." },
  { title: "Creativity With Discipline", desc: "Bold ideas need sharp execution and clean ops." },
  { title: "Data Makes Creativity Sharper", desc: "Measurement informs, it does not replace, instinct." },
  { title: "People Build the System", desc: "Products and processes are built by teams who care." },
];

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <>
      <PageHero
        title="Build the company shaping the future of influence."
        subtitle="At Cloutflow we build at the intersection of culture, creators, technology, and brand growth. We move fast, think deeply, execute sharply, and solve real marketing problems every day."
      >
        <CareersHeroActions />
      </PageHero>

      <HiringPhilosophy />

      <section className="section-y bg-background-soft">
        <div className="container-page">
          <h2 className="text-2xl font-medium tracking-tightest mb-8">Core values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v) => (
              <Card key={v.title} variant="light">
                <h3 className="font-medium mb-2">{v.title}</h3>
                <p className="text-sm text-text-secondary">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <OperatingPrinciplesFlow />

      <LifeAtCloutflow />

      <section id="roles" className="section-y bg-background-dark text-text-light">
        <div className="container-page">
          <div data-scroll-target>
            <h2 className="text-2xl font-medium tracking-tightest mb-8">Open roles</h2>
          </div>
          <OpenRolesList jobs={jobs} />
        </div>
      </section>
    </>
  );
}
