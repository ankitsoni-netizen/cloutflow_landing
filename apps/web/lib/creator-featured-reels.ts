export const CREATOR_FEATURED_INSTAGRAM_URLS = [
  "https://www.instagram.com/p/DZKiE4Qv5VG/",
  "https://www.instagram.com/reel/DZC0WfOAkX4/?igsh=MTgzZjh0MzJhOHh0aA==",
  "https://www.instagram.com/reel/DVOR5_cjKRq/?igsh=MTN1bG92MjBqODVmZw==",
  "https://www.instagram.com/reels/DYzmkKyoP-Q/",
  "https://www.instagram.com/p/DNnpoM0JDcl",
  "https://www.instagram.com/p/DPyC_MHCDSL",
  "https://www.instagram.com/p/DP3t2JWiNla",
  "https://www.instagram.com/p/DPYcd-7jPvd",
  "https://www.instagram.com/p/DO3Q79XCD1V",
  "https://www.instagram.com/p/DLmzgaeTND2",
  "https://www.instagram.com/reels/DP365Mjk38r/",
  "https://www.instagram.com/reels/DPlXb-wE0OL/",
  "https://www.instagram.com/p/DWMEVKgFsrL/?hl=en",
  "https://www.instagram.com/reels/DW_d6LZDB2F/",
] as const;

export type FeaturedCreatorReel = {
  url: string;
};

export function getFeaturedCreatorReels(): FeaturedCreatorReel[] {
  return CREATOR_FEATURED_INSTAGRAM_URLS.map((url) => ({ url }));
}

export function usernameFromOEmbedAuthor(authorUrl?: string, authorName?: string): string | null {
  if (authorUrl) {
    const handle = authorUrl.match(/instagram\.com\/([^/?]+)/)?.[1];
    if (handle && !["p", "reel", "reels", "explore"].includes(handle)) {
      return `@${handle}`;
    }
  }
  if (authorName) {
    const normalized = authorName.trim().replace(/^@/, "").replace(/\s+/g, "").toLowerCase();
    if (normalized) return `@${normalized}`;
  }
  return null;
}
