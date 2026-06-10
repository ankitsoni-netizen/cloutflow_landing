export type NavbarTheme = "light" | "dark";

/**
 * Navbar surface matches the hero / top-of-page on each route.
 * Dark: product index (blue hero), creators (dark hero).
 * Light: everything else (home, stories, careers, help, product modules, etc.).
 */
export function getNavbarTheme(pathname: string): NavbarTheme {
  if (pathname === "/product") return "dark";
  if (pathname === "/creators") return "dark";
  if (pathname.startsWith("/creators/") && !pathname.startsWith("/creators/apply")) {
    return "dark";
  }
  return "light";
}
