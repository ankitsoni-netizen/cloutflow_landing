export type StoryCategory =
  | "Beauty & Skincare"
  | "FMCG"
  | "Tech"
  | "Auto"
  | "Finance";

export type StoryPlatform = "Instagram" | "YouTube" | "Regional";

export type InsightCategory =
  | "Report"
  | "Blog"
  | "Trend Note"
  | "Platform Insight"
  | "Campaign Learning"
  | "Research Paper"
  | "Playbook";

export type WorkType = "Full-time" | "Part-time" | "Contract" | "Internship";

export interface Metric {
  label: string;
  value: string;
}

export interface RichBlock {
  type: "heading" | "paragraph" | "quote" | "list" | "image";
  level?: number;
  text?: string;
  items?: string[];
  src?: string;
  alt?: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  brandName: string;
  brandLogo?: string;
  thumbnail?: string;
  category: StoryCategory;
  objective: string;
  platform: StoryPlatform;
  creatorType: string;
  region: string;
  format: string;
  shortResult: string;
  brandOverview: RichBlock[];
  challenge: RichBlock[];
  insight: RichBlock[];
  strategy: RichBlock[];
  creatorApproach: RichBlock[];
  contentFormats: RichBlock[];
  executionModel: RichBlock[];
  results: Metric[];
  learnings: RichBlock[];
  relatedSlugs?: string[];
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Insight {
  id: string;
  title: string;
  slug: string;
  category: InsightCategory;
  excerpt: string;
  coverImage?: string;
  author: string;
  readTime: string;
  body: RichBlock[];
  pdfDownload?: string;
  sourceUrl?: string;
  sourceName?: string;
  relatedSlugs?: string[];
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  experience: string;
  /** Canonical band for careers filters; falls back to `experience` when omitted. */
  experienceLevel?: string;
  areaOfInterest?: string;
  workType: WorkType;
  shortDescription: string;
  aboutRole: RichBlock[];
  responsibilities: string[];
  requirements: string[];
  goodToHave: string[];
  whatYouLearn: string[];
  isOpen: boolean;
  publishedAt: string;
}

export interface ProductModule {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  chips?: string[];
}

export type ProductLifecycleMediaType = "image" | "demo";

export type ProductLifecycleDemoId = "atlas-discovery";

export interface ProductLifecycleStep {
  id: string;
  stepLabel?: string;
  moduleName: string;
  headline: string;
  body: string;
  screenshotAlt?: string;
  screenshotSpec?: string;
  screenshotUrl?: string;
  mediaType?: ProductLifecycleMediaType;
  demoId?: ProductLifecycleDemoId;
  slug?: string;
}

export interface ProductProofBrand {
  name: string;
  logoUrl?: string;
}

export interface ProductProofData {
  headline: string;
  body: string;
  statLabel: string;
  statValue: string;
  brands: ProductProofBrand[];
}
