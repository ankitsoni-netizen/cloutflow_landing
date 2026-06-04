import Image from "next/image";

export const metadata = {
  title: "Mockup: Atlas Discovery",
  robots: { index: false, follow: false },
};

export default function AtlasDiscoveryMockupPage() {
  return (
    <div className="fixed inset-0 z-[200] bg-white">
      <Image
        src="/product/discover.png"
        alt="Influencer Network: Atlas Discovery"
        fill
        className="object-contain object-top"
        priority
      />
    </div>
  );
}
