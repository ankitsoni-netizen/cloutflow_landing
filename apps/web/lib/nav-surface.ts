import type { NavbarTheme } from "@/lib/navbar-theme";

export type NavSurfaceId =
  | "page"
  | "soft"
  | "blue"
  | "dark"
  | "secondary"
  | "principles";

export const NAV_SURFACE_ATTR = "data-nav-surface";

export type NavSurfaceConfig = {
  bg: string;
  theme: NavbarTheme;
  border: string;
};

/** Solid fills aligned with Tailwind theme tokens in globals.css */
export const NAV_SURFACES: Record<NavSurfaceId, NavSurfaceConfig> = {
  page: {
    bg: "#ffffff",
    theme: "light",
    border: "#e8e8e9",
  },
  soft: {
    bg: "#f6f7f9",
    theme: "light",
    border: "#e8e8e9",
  },
  principles: {
    bg: "#f8f9fc",
    theme: "light",
    border: "#e8e8e9",
  },
  blue: {
    bg: "#11286d",
    theme: "dark",
    border: "rgba(255,255,255,0.1)",
  },
  secondary: {
    bg: "#11286d",
    theme: "dark",
    border: "rgba(255,255,255,0.1)",
  },
  dark: {
    bg: "#171717",
    theme: "dark",
    border: "rgba(255,255,255,0.1)",
  },
};

export function parseNavSurfaceId(value: string | null | undefined): NavSurfaceId | null {
  if (!value) return null;
  return value in NAV_SURFACES ? (value as NavSurfaceId) : null;
}

export function getNavSurfaceConfig(id: NavSurfaceId): NavSurfaceConfig {
  return NAV_SURFACES[id];
}
