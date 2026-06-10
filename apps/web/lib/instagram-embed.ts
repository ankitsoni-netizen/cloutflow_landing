export function instagramShortcode(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:reels?|p)\/([A-Za-z0-9_-]+)/);
  return match?.[1] ?? null;
}

export function instagramEmbedPageUrl(url: string): string | null {
  const shortcode = instagramShortcode(url);
  if (!shortcode) return null;

  const isReel = /instagram\.com\/reels?\//.test(url);
  const path = isReel ? `reel/${shortcode}` : `p/${shortcode}`;

  return `https://www.instagram.com/${path}/embed/`;
}

function decodeInstagramEscapedString(value: string): string {
  return value.replace(/\\+\//g, "/").replace(/\\u0026/g, "&");
}

function extractEscapedJsonString(html: string, key: string): string | null {
  const marker = `${key}\\":\\"`;
  const start = html.indexOf(marker);
  if (start === -1) return null;

  let i = start + marker.length;
  let raw = "";
  while (i < html.length) {
    if (html[i] === "\\" && html[i + 1] === '"') break;
    raw += html[i];
    i += 1;
  }

  return raw ? decodeInstagramEscapedString(raw) : null;
}

function parseHtmlEmbedFallback(html: string): {
  thumbnailUrl: string | null;
  username: string | null;
} {
  const thumbnailUrl =
    html.match(/class="EmbeddedMediaImage"[^>]*\ssrc="([^"]+)"/)?.[1] ??
    html.match(/property="og:image"\s+content="([^"]+)"/)?.[1] ??
    null;

  const usernameRaw =
    html.match(/class="UsernameText">([^<]+)</)?.[1] ??
    html.match(/instagram\.com\/([a-zA-Z0-9._]+)\/[^"]*"[^>]*class="Username"/)?.[1] ??
    null;

  const username = usernameRaw
    ? `@${usernameRaw.trim().replace(/^@/, "")}`
    : null;

  return { thumbnailUrl, username };
}

export function parseInstagramEmbedHtml(html: string): {
  videoUrl: string | null;
  thumbnailUrl: string | null;
  username: string | null;
} {
  const videoUrl = extractEscapedJsonString(html, "video_url");
  const htmlFallback = parseHtmlEmbedFallback(html);

  const thumbnailUrl =
    extractEscapedJsonString(html, "thumbnail_src") ??
    extractEscapedJsonString(html, "display_url") ??
    htmlFallback.thumbnailUrl;

  const usernameRaw = extractEscapedJsonString(html, "username");
  const username = usernameRaw
    ? `@${usernameRaw}`
    : htmlFallback.username;

  return {
    videoUrl: videoUrl?.startsWith("http") ? videoUrl : null,
    thumbnailUrl: thumbnailUrl?.startsWith("http") ? thumbnailUrl : null,
    username,
  };
}

// Instagram serves the legacy JSON embed (with video_url) only to simple crawlers.
export const INSTAGRAM_FETCH_HEADERS = {
  Accept: "text/html",
  "User-Agent": "Mozilla/5.0 (compatible; Cloutflow/1.0)",
} as const;

export async function fetchInstagramEmbedMeta(url: string) {
  const embedUrl = instagramEmbedPageUrl(url);
  if (!embedUrl) {
    return { videoUrl: null, thumbnailUrl: null, username: null };
  }

  const res = await fetch(embedUrl, {
    headers: INSTAGRAM_FETCH_HEADERS,
    cache: "no-store",
  });

  if (!res.ok) {
    return { videoUrl: null, thumbnailUrl: null, username: null };
  }

  return parseInstagramEmbedHtml(await res.text());
}
