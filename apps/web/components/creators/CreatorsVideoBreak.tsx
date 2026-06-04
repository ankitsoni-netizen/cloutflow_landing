import { CreatorApplyLink } from "@/components/creators/CreatorApplyLink";
import { SocialLogoBackdrop } from "@/components/creators/SocialLogoBackdrop";

export function CreatorsVideoBreak() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-secondary via-background-blue to-primary">
      <SocialLogoBackdrop />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background-dark/50 via-background-blue/30 to-primary/20"
        aria-hidden
      />

      <div className="container-page relative z-10 py-24 text-text-light">
        <p className="font-label tracking-nav text-text-light/60 mb-4">
          Culture-first partnerships
        </p>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tightest leading-tight mb-6">
          We elevate voices that shape culture, building influence, impact, and
          lasting brand legacy.
        </h2>
        <p className="text-text-light/75 mb-8">
          From brief to go-live, Cloutflow gives creators the infrastructure,
          brand access, and creative support to grow beyond the algorithm.
        </p>
        <CreatorApplyLink>Apply to the network</CreatorApplyLink>
      </div>
    </section>
  );
}
