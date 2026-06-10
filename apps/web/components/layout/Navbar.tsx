"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useNavbarSurface } from "@/hooks/use-navbar-surface";
import type { NavbarTheme } from "@/lib/navbar-theme";
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

function isNavActive(pathname: string, href: string): boolean {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

function navLinkClass(
  active: boolean,
  size: "desktop" | "mobile",
  theme: NavbarTheme
) {
  const isDark = theme === "dark";
  return cn(
    "uppercase font-medium tracking-nav transition-[color,text-decoration-color] duration-normal",
    size === "desktop" ? "text-sm" : "text-2xl",
    active
      ? cn(
          "underline underline-offset-[6px] decoration-2",
          isDark
            ? "text-text-light decoration-white"
            : "text-text-primary decoration-text-primary"
        )
      : isDark
        ? size === "desktop"
          ? "text-text-light/75 hover:text-text-light"
          : "text-text-light/80 hover:text-text-light"
        : "text-text-secondary hover:text-text-primary"
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { surface, atTop, theme } = useNavbarSurface();
  const [open, setOpen] = useState(false);

  const headerStyle = {
    backgroundColor: atTop ? surface.bg : `${surface.bg}f5`,
    borderBottomColor: atTop ? "transparent" : surface.border,
  };

  const mobileStyle = {
    backgroundColor: surface.bg,
    borderTopColor: surface.border,
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[80px] border-b transition-[background-color,border-color,backdrop-filter] duration-normal",
        !atTop && "backdrop-blur-sm",
        theme === "dark" ? "text-text-light" : "text-text-primary"
      )}
      style={headerStyle}
    >
      <div className="container-page h-full flex items-center justify-between">
        <Logo variant={theme === "dark" ? "onDark" : "default"} />

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isNavActive(pathname, link.href) ? "page" : undefined}
              className={navLinkClass(isNavActive(pathname, link.href), "desktop", theme)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ExploreCloutflowOsCta size="compact" tone={theme} inkEffect={false} />
        </div>

        <button
          type="button"
          className={cn(
            "lg:hidden text-sm uppercase tracking-nav font-medium",
            theme === "dark" ? "text-text-light" : "text-text-primary"
          )}
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
          className={cn(
            "lg:hidden fixed inset-0 top-[80px] z-40 flex flex-col p-8 gap-6 border-t transition-colors duration-normal",
            theme === "dark" ? "text-text-light" : "text-text-primary"
          )}
          style={mobileStyle}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isNavActive(pathname, link.href) ? "page" : undefined}
              className={navLinkClass(isNavActive(pathname, link.href), "mobile", theme)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <ExploreCloutflowOsCta
            tone={theme}
            inkEffect={false}
            className="mt-4 w-full justify-center"
          />
        </div>
      )}
    </header>
  );
}
