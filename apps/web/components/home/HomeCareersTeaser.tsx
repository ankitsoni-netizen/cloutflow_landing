import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { homeSection } from "@/components/home/home-section";
import { getJobs } from "@/lib/content";

export async function HomeCareersTeaser() {
  const jobs = await getJobs();
  const openCount = jobs.length;

  return (
    <section
      data-nav-surface="dark"
      className={`${homeSection} bg-background-dark text-text-light`}
    >
      <div className="container-page w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tightest mb-4">
            Build the future of influence with us.
          </h2>
          <p className="text-text-light/70 text-md max-w-xl">
            We work at the intersection of culture, creativity, technology, and
            growth, building systems that change how brands and creators work
            together.
          </p>
          <div className="mt-8">
            <Button href="/careers" variant="primary">
              View Open Roles
            </Button>
          </div>
        </div>

        <div className="rounded-md border border-white/15 bg-white/5 p-8 md:p-10">
          <p className="text-xs uppercase tracking-nav text-text-light/50 mb-2">
            Careers at Cloutflow
          </p>
          <p className="text-4xl font-medium tracking-tightest tabular-nums mb-2">
            {openCount}+
          </p>
          <p className="text-sm text-text-light/70 mb-6">open roles across strategy, ops, product, and creator partnerships.</p>
          <ul className="space-y-3 text-sm text-text-light/80 border-t border-white/10 pt-6">
            <li>Strategy, content, and influencer marketing</li>
            <li>Product, design, and data</li>
            <li>Creator ecosystem and partnerships</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link
              href="/careers#roles"
              className="text-sm uppercase tracking-nav text-text-light/90 hover:text-text-light transition-probe"
            >
              Browse roles →
            </Link>
            <Link
              href="/careers"
              className="text-sm uppercase tracking-nav text-text-light/90 hover:text-text-light transition-probe"
            >
              Hiring philosophy →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
