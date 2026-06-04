import { Button } from "@/components/ui/Button";
import type { ProductProofData } from "@/lib/types";

export function ProductProofSection({ proof }: { proof: ProductProofData }) {
  return (
    <section id="proof" className="section-y bg-background-dark text-text-light">
      <div className="container-page text-center max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-nav text-text-light/60 mb-3">
          Proof
        </p>
        <h2 className="text-2xl md:text-3xl font-medium tracking-tightest mb-4">
          {proof.headline}
        </h2>
        <p className="text-sm text-text-light/70 mb-10 max-w-2xl mx-auto">
          {proof.body}
        </p>
        <Button href="/contact" variant="primary">
          Book a Demo
        </Button>
      </div>
    </section>
  );
}
