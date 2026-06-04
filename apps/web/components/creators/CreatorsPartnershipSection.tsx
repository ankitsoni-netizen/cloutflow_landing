import { ScrollReveal } from "@/components/creators/ScrollReveal";

export function CreatorsPartnershipSection() {
  return (
    <section className="section-y relative overflow-hidden bg-background-blue text-text-light">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background-dark/30 via-transparent to-primary/25"
        aria-hidden
      />
      <div className="container-page relative z-10 text-center max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="text-2xl md:text-3xl font-medium tracking-tightest leading-snug text-text-light">
            You bring the story. Cloutflow brings the brief, the brand, and the runway to make it repeat.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
