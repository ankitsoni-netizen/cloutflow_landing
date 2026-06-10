import type { MetadataRoute } from "next";
import { mockStories } from "@/data/stories";
import { mockInsights } from "@/data/insights";
import { mockJobs } from "@/data/jobs";
import { productModules } from "@/lib/product-modules";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/product",
    "/creators",
    "/creators/apply",
    "/creators/apply",
    "/stories",
    "/insights",
    "/careers",
    "/help",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = productModules.map((m) => ({
    url: `${base}/product/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const storyRoutes = mockStories.map((s) => ({
    url: `${base}/stories/${s.slug}`,
    lastModified: new Date(s.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const insightRoutes = mockInsights.map((i) => ({
    url: `${base}/insights/${i.slug}`,
    lastModified: new Date(i.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const careerRoutes = mockJobs.flatMap((j) => [
    {
      url: `${base}/careers/${j.slug}`,
      lastModified: new Date(j.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    {
      url: `${base}/careers/${j.slug}/apply`,
      lastModified: new Date(j.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.4,
    },
  ]);

  return [
    ...staticRoutes,
    ...productRoutes,
    ...storyRoutes,
    ...insightRoutes,
    ...careerRoutes,
  ];
}
