import type { Metadata } from "next";
import { ProductLifecycleHero } from "@/components/product/ProductLifecycleHero";
import { ProductLifecycleNav } from "@/components/product/ProductLifecycleNav";
import { ProductLifecycleSection } from "@/components/product/ProductLifecycleSection";
import { ProductProofSection } from "@/components/product/ProductProofSection";
import {
  productLifecycleHero,
  productLifecycleNavItems,
  productLifecycleSteps,
  productProof,
} from "@/data/product-lifecycle";

export const metadata: Metadata = {
  title: "Cloutflow OS",
  description:
    "The operating system for influencer marketing, discovery to ROI. Atlas Discovery, CloutIQ, Pricing Desk, Campaign OS, Guardian QC, and analytics in one connected lifecycle.",
};

export default function ProductPage() {
  return (
    <>
      <ProductLifecycleHero hero={productLifecycleHero} />
      <ProductLifecycleNav items={productLifecycleNavItems} />
      {productLifecycleSteps.map((step, index) => (
        <ProductLifecycleSection key={step.id} step={step} index={index} />
      ))}
      <ProductProofSection proof={productProof} />
    </>
  );
}
