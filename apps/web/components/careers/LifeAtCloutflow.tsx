import { LinkedInPostEmbed } from "@/components/careers/LinkedInPostEmbed";
import { lifeAtCloutflowIntro } from "@/data/life-at-cloutflow";
import { lifeAtCloutflowPosts } from "@/data/life-at-cloutflow-posts";

export function LifeAtCloutflow() {
  return (
    <section
      id="life-at-cloutflow"
      className="section-y bg-background-blue text-text-light overflow-hidden relative"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-text-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-light) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="container-page relative z-10">
        <div className="max-w-2xl mb-10" data-scroll-target>
          <p className="text-xs uppercase tracking-nav text-text-light mb-3">
            {lifeAtCloutflowIntro.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tightest leading-tight mb-3">
            {lifeAtCloutflowIntro.title}
          </h2>
          <p className="text-text-light/75 text-md leading-relaxed">
            {lifeAtCloutflowIntro.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {lifeAtCloutflowPosts.map((post) => (
            <LinkedInPostEmbed key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
