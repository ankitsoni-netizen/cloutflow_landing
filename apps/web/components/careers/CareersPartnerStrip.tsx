import Image from "next/image";
import { careersPartnerBrands } from "@/data/careers-page-extras";

export function CareersPartnerStrip() {
  return (
    <div className="mt-14 pt-12 border-t border-border-light/70">
      <p className="text-xs uppercase tracking-nav text-text-muted mb-6">
        Brands our team builds for
      </p>
      <ul className="m-0 grid list-none grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {careersPartnerBrands.map((brand) => (
          <li
            key={brand.name}
            className="careers-reactive-cell flex h-[4.5rem] items-center justify-center rounded-lg border border-border-light/80 bg-white/55 px-5 py-4 backdrop-blur-sm"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={140}
              height={48}
              className="h-9 w-auto max-w-[110px] object-contain opacity-75 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
