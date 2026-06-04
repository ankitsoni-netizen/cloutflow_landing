import { ExploreCloutflowOsCta } from "@/components/brand/ExploreCloutflowOsCta";
import { Button } from "@/components/ui/Button";

type FinalCtaActions = "contactSales" | "talkOnly" | "exploreAndTalk";

export function FinalCta({
  headline = "Ready to build influence that actually moves business?",
  actions = "exploreAndTalk",
  showContactSales,
}: {
  headline?: string;
  actions?: FinalCtaActions;
  /** @deprecated Use `actions="contactSales"` */
  showContactSales?: boolean;
}) {
  const resolvedActions: FinalCtaActions = showContactSales
    ? "contactSales"
    : actions;

  return (
    <section className="section-y bg-secondary text-text-light relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-primary/30 translate-x-1/4" />
      <div className="container-page relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tightest mb-8">
          {headline}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {resolvedActions === "contactSales" && (
            <Button href="/contact" variant="primary">
              Contact Sales
            </Button>
          )}
          {resolvedActions === "talkOnly" && (
            <Button
              href="/contact"
              variant="tertiary"
              className="border-white/25 text-text-light hover:border-white hover:bg-white/10"
            >
              Talk to our team
            </Button>
          )}
          {resolvedActions === "exploreAndTalk" && (
            <>
              <ExploreCloutflowOsCta tone="dark" />
              <Button
                href="/contact"
                variant="tertiary"
                className="border-white/25 text-text-light hover:border-white hover:bg-white/10"
              >
                Talk to our team
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
