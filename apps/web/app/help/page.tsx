import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/Card";
import { FaqAccordion } from "@/components/help/FaqAccordion";
import { WhatsAppButton } from "@/components/help/WhatsAppButton";
import { HelpTicketForm } from "@/components/forms/HelpTicketForm";
import { faqs } from "@/data/faqs";
import { HELP_TICKET_TYPES } from "@/lib/help-ticket-types";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Find answers, track campaigns, and get support.",
};

export default function HelpPage() {
  const brandFaqs = faqs.filter((f) => f.audience === "brands");
  const creatorFaqs = faqs.filter((f) => f.audience === "creators");

  return (
    <>
      <PageHero
        title="How can we help you?"
        subtitle="Find answers, track campaign progress, explore the Cloutflow product, get creator support, or connect with the right team."
      />
      <section className="section-y bg-background-page">
        <div className="container-page">
          <input
            type="search"
            placeholder="Search campaign tracking, creator payments, product demo, reporting, briefs..."
            className="w-full max-w-2xl h-12 px-4 border border-border-light rounded-md mb-12"
            aria-label="Search help center"
            readOnly
            title="Use FAQ sections and the form below"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {HELP_TICKET_TYPES.map((c) => (
              <Card key={c.value} variant="light">
                <h2 className="font-medium mb-2">{c.label}</h2>
                <p className="text-sm text-text-secondary">{c.description}</p>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <FaqAccordion items={brandFaqs} label="For Brands" />
            <FaqAccordion items={creatorFaqs} label="For Creators" />
          </div>
        </div>
      </section>

      <section
        id="contact-support"
        className="section-y w-full bg-background-dark text-text-light"
      >
        <div className="container-page w-full max-w-none">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-24 items-start">
            <div className="lg:col-span-4 xl:col-span-3">
              <p className="text-xs uppercase tracking-nav text-text-light/60 mb-3">
                Contact support
              </p>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tightest mb-4">
                Tell us what you need
              </h2>
              <p className="text-sm text-text-light/70 mb-8 max-w-md">
                Select your issue type below. The form will update with the fields
                we need to help you faster.
              </p>
              <div className="border border-white/15 p-6 rounded-md">
                <p className="text-sm font-medium mb-2">Live chat / WhatsApp</p>
                <p className="text-sm text-text-light/70">
                  Connect with our team on WhatsApp for urgent campaign queries.
                </p>
                <WhatsAppButton />
              </div>
            </div>

            <div className="lg:col-span-8 xl:col-span-9 [&_label]:text-text-light/75 [&_p.text-sm]:text-text-light/60">
              <HelpTicketForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
