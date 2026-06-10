import Image from "next/image";
import { CareersSection } from "@/components/careers/CareersSection";
import { careersPartnerBrands } from "@/data/careers-page-extras";

export function CareersPartnerLogos() {
  return (
    <CareersSection variant="philosophy" reveal={false} className="py-8 md:py-10">
      <div className="container-page w-full">
        <p className="text-xs uppercase tracking-nav text-text-muted mb-6 text-center md:text-left">
          Brands our team builds for
        </p>
        <ul className="m-0 grid list-none grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {careersPartnerBrands.map((brand) => (
            <li
              key={brand.name}
              className="careers-reactive-cell flex h-20 items-center justify-center rounded-lg border border-border-light/80 bg-white/50 px-6 py-4 backdrop-blur-sm"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={140}
                height={48}
                className="h-10 w-auto max-w-[120px] object-contain opacity-80 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </CareersSection>
  );
}
