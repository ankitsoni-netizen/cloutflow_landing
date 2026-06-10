import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { HelpFaqCenter } from "@/components/help/HelpFaqCenter";
import { WhatsAppButton } from "@/components/help/WhatsAppButton";
import { HelpTicketForm } from "@/components/forms/HelpTicketForm";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Find answers, track campaigns, and get support.",
};

export default function HelpPage() {
  const brandFaqs = faqs.filter((f) => f.audience === "brands");
  const creatorFaqs = faqs.filter((f) => f.audience === "creators");
  const agencyFaqs = faqs.filter((f) => f.audience === "agencies");

  return (
    <>
      <PageHero
        title="How can we help you?"
        subtitle="Find answers, track campaign progress, explore the Cloutflow product, get creator support, or connect with the right team."
      />
      <section data-nav-surface="page" className="section-y bg-background-page overflow-x-hidden">
        <div className="container-page mb-12">
          <input
            type="search"
            placeholder="Search campaign tracking, creator payments, product demo, reporting, briefs..."
            className="w-full max-w-2xl h-12 px-4 border border-border-light rounded-md"
            aria-label="Search help center"
            readOnly
            title="Use FAQ sections and the form below"
          />
        </div>

        <div className="container-page">
          <HelpFaqCenter
            brandFaqs={brandFaqs}
            creatorFaqs={creatorFaqs}
            agencyFaqs={agencyFaqs}
          />
        </div>
      </section>

      <section
        id="contact-support"
        data-nav-surface="dark"
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
