export const creatorSocialPlatforms = [
  "Instagram",
  "YouTube",
  "TikTok",
  "X (Twitter)",
  "LinkedIn",
  "Facebook",
  "Snapchat",
  "Other",
] as const;

export type CreatorSocialPlatform = (typeof creatorSocialPlatforms)[number];
