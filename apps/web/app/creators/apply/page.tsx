import type { Metadata } from "next";
import { CreatorApplyForm } from "@/components/forms/CreatorApplyForm";

export const metadata: Metadata = {
  title: "Join the Creator Network",
  description:
    "Apply to join the Cloutflow creator network — better briefs, brands, and growth.",
};

export default function CreatorsApplyPage() {
  return (
    <section data-nav-surface="soft" className="section-y bg-background-soft">
      <div className="container-page">
        <div className="mx-auto max-w-lg">
          <p className="font-label text-xs uppercase tracking-nav text-primary mb-2">
            Apply
          </p>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tightest mb-3">
            Join the network
          </h1>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Tell us about your content, audience, and categories. We review every
            profile and match creators to brands that fit your voice and ambition.
          </p>
          <div className="rounded-md border border-border-light bg-background-page p-6 md:p-8 shadow-soft">
            <CreatorApplyForm />
          </div>
        </div>
      </div>
    </section>
  );
}
