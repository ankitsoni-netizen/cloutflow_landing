import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's build your influence engine.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's build your influence engine."
        subtitle="Whether you're launching a product, scaling creator campaigns, entering new markets, improving content performance, or building a long-term influencer marketing system, Cloutflow can help."
      />
      <section data-nav-surface="page" className="section-y bg-background-page">
        <div className="container-page max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
