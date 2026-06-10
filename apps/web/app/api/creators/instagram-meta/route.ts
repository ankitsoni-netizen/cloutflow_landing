import { NextResponse } from "next/server";
import { usernameFromOEmbedAuthor } from "@/lib/creator-featured-reels";
import { fetchInstagramEmbedMeta } from "@/lib/instagram-embed";

type InstagramOEmbed = {
  thumbnail_url?: string;
  author_name?: string;
  author_url?: string;
};

export const dynamic = "force-dynamic";

const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

async function fetchOEmbed(url: string): Promise<InstagramOEmbed | null> {
  try {
    const res = await fetch(
      `https://api.instagram.com/oembed?url=${encodeURIComponent(url)}&omitscript=true&maxwidth=640`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": BROWSER_UA,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) return null;
    return (await res.json()) as InstagramOEmbed;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get("url");
  if (!url || !url.includes("instagram.com")) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const [oEmbed, embed] = await Promise.all([
    fetchOEmbed(url),
    fetchInstagramEmbedMeta(url),
  ]);

  const username =
    usernameFromOEmbedAuthor(oEmbed?.author_url, oEmbed?.author_name) ??
    embed.username;

  const proxiedVideoUrl = embed.videoUrl
    ? `/api/creators/instagram-video?url=${encodeURIComponent(url)}`
    : null;

  return NextResponse.json({
    thumbnailUrl: oEmbed?.thumbnail_url ?? embed.thumbnailUrl ?? null,
    videoUrl: proxiedVideoUrl,
    username,
  });
}
