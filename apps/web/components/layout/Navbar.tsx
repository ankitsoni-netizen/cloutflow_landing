"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { ExploreCloutflowOsCta } from "@/components/brand/ExploreCloutflowOsCta";
import { Logo } from "@/components/brand/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/creators", label: "Creators" },
  { href: "/stories", label: "Stories" },
  { href: "/insights", label: "Insights" },
  { href: "/careers", label: "Careers" },
  { href: "/help", label: "Help Center" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-background-navbar border-b border-border-light">
      <div className="container-page h-full flex items-center justify-between">
        <Logo height={50} />

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm uppercase font-medium tracking-nav transition-probe",
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`))
                  ? "text-primary"
                  : "text-text-primary hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ExploreCloutflowOsCta size="compact" />
        </div>

        <button
          type="button"
          className="lg:hidden text-sm uppercase tracking-nav font-medium"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-0 top-[72px] bg-background-page z-40 flex flex-col p-8 gap-6"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl uppercase font-medium tracking-nav"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <ExploreCloutflowOsCta className="mt-4 w-full justify-center" />
        </div>
      )}
    </header>
  );
}
