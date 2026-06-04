const DEFAULT_NAVBAR_HEIGHT = 72;
const DEFAULT_LIFECYCLE_NAV_HEIGHT = 52;
const SCROLL_PADDING = 16;

/** Total top inset: site header + product lifecycle nav + breathing room. */
export function getProductStickyScrollOffset(): number {
  if (typeof window === "undefined") {
    return DEFAULT_NAVBAR_HEIGHT + DEFAULT_LIFECYCLE_NAV_HEIGHT + SCROLL_PADDING;
  }

  const header = document.querySelector("header");
  const lifecycleNav = document.querySelector("[data-product-lifecycle-nav]");
  const headerHeight = header?.getBoundingClientRect().height ?? DEFAULT_NAVBAR_HEIGHT;
  const navHeight =
    lifecycleNav?.getBoundingClientRect().height ?? DEFAULT_LIFECYCLE_NAV_HEIGHT;

  return headerHeight + navHeight + SCROLL_PADDING;
}
