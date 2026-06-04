import { ExploreCloutflowOsCta } from "@/components/brand/ExploreCloutflowOsCta";
import { PixelNetworkBackground } from "@/components/home/PixelNetworkBackground";

export function HomeHero() {
  return (
    <section className="relative min-h-screen snap-start flex items-end overflow-hidden bg-background-page">
      <PixelNetworkBackground />
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-white/15 via-transparent to-background-page"
        aria-hidden
      />
      <div className="container-page relative z-10 pb-8 section-y-lg w-full">
        <p className="text-xs uppercase tracking-nav text-text-muted mb-4">
          The operating system for modern influencer marketing
        </p>
        <h1 className="text-3xl md:text-hero font-medium tracking-tightest text-text-primary max-w-4xl leading-none mb-6">
          Influence, engineered for brand growth.
        </h1>
        <p className="text-md md:text-lg text-text-secondary max-w-2xl mb-8">
          Cloutflow helps enterprise brands go beyond campaign bursts and
          creator lists. We build influence-led growth systems across strategy,
          creator intelligence, content, execution, reporting, and scale.
        </p>
        <ExploreCloutflowOsCta inkEffect={false} />
      </div>
    </section>
  );
}
