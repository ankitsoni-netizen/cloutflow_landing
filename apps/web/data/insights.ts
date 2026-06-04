import type { Insight } from "@/lib/types";

const body = (paragraphs: string[]) =>
  paragraphs.map((text) => ({ type: "paragraph" as const, text }));

export const mockInsights: Insight[] = [
  {
    id: "1",
    title: "How India's Influencer Marketing Is Being Rebooted from the Ground Up",
    slug: "india-influencer-marketing-rebooted",
    category: "Trend Note",
    excerpt:
      "Industry leaders say the shift is from vanity metrics to trust, micro creators, and measurable conversions.",
    author: "Exchange4media",
    readTime: "6 min",
    sourceName: "Exchange4media",
    sourceUrl: "https://www.exchange4media.com/tags/influencer-marketing.html",
    body: body([
      "India's influencer marketing landscape is moving beyond reach and follower counts. Brands are prioritising authenticity, performance, and creator relevance over one-off viral moments.",
      "Executives note a structural reset: micro creators, regional voices, and conversion-led briefs are replacing spray-and-pray celebrity posts. The playbook is shifting from campaign bursts to ecosystems that compound trust over time.",
      "For enterprise brands, this means sharper briefs, better creator matching, and measurement that ties creator content to discovery, consideration, and action, not just impressions.",
    ]),
    publishedAt: "2026-03-15",
  },
  {
    id: "2",
    title: "India's Influencer Marketing Industry Crosses ₹10,000-Crore Mark",
    slug: "india-influencer-market-10000-crore",
    category: "Report",
    excerpt:
      "KlugKlug analysis estimates the market size, with only one-quarter of spend moving through visible, organised channels.",
    author: "Exchange4media",
    readTime: "5 min",
    sourceName: "Exchange4media",
    sourceUrl: "https://www.exchange4media.com/tags/influencer-marketing.html",
    body: body([
      "India's influencer marketing industry has crossed the ₹10,000-crore threshold, signalling that creator-led media is no longer experimental. It is core media infrastructure.",
      "Industry analysis suggests a large share of spend still flows outside visible, organised channels, which creates opacity in pricing, reporting, and ROI benchmarking.",
      "Brands scaling influence programs need unified operating systems for discovery, contracting, QC, and measurement to capture the full value of this spend.",
    ]),
    publishedAt: "2026-02-28",
  },
  {
    id: "3",
    title: "Are Micro Influencers Delivering Better ROI Than Macro Stars?",
    slug: "micro-vs-macro-influencer-roi",
    category: "Blog",
    excerpt:
      "A mix of incentives, risk aversion, and audience trust shapes when brands choose micro over macro creators.",
    author: "Exchange4media",
    readTime: "7 min",
    sourceName: "Exchange4media",
    sourceUrl: "https://www.exchange4media.com/tags/influencer-marketing.html",
    body: body([
      "The macro versus micro debate is not about follower count alone. It is about fit, category, and campaign objective.",
      "Micro creators often win on relatability, niche trust, and cost efficiency, while macros still anchor launch moments and mass awareness.",
      "Smart brands deploy tiered creator architectures: macros for reach spikes, mid-tier for education, and micros for conversion and regional relevance.",
    ]),
    publishedAt: "2026-02-10",
  },
  {
    id: "4",
    title: "2025: The Year Regulation Caught Up with Influencer Marketing",
    slug: "regulation-influencer-marketing-2025",
    category: "Platform Insight",
    excerpt:
      "From ASCI enforcement to SEBI action on finfluencers, compliance reshaped how brands and creators collaborate.",
    author: "Exchange4media",
    readTime: "8 min",
    sourceName: "Exchange4media",
    sourceUrl: "https://www.exchange4media.com/tags/influencer-marketing.html",
    body: body([
      "2025 marked a turning point for influencer marketing governance in India. Regulators tightened scrutiny on undisclosed partnerships, misleading claims, and unregulated financial advice.",
      "ASCI's actions on betting and personal care ads highlighted categories under highest watch. Brands now route more campaigns through legal and compliance review before go-live.",
      "The takeaway for marketers: creativity must sit inside clear disclosure, claim substantiation, and category-specific guardrails, not outside them.",
    ]),
    publishedAt: "2025-12-20",
  },
  {
    id: "5",
    title: "5 Trends Shaping Influencer Marketing in 2026",
    slug: "five-trends-influencer-marketing-2026",
    category: "Trend Note",
    excerpt:
      "Creator ecosystems, AI-assisted workflows, and performance accountability define the year ahead.",
    author: "Influencer Marketing Hub",
    readTime: "10 min",
    sourceName: "Influencer Marketing Hub",
    sourceUrl: "https://influencermarketinghub.com/influencer-marketing/",
    body: body([
      "Influencer marketing in 2026 is defined by systems, not stunts. Brands are building always-on creator programs with renewal logic, tiered engagement, and unified reporting.",
      "AI is accelerating discovery, brief drafting, and QC, but strategic judgment on culture, tone, and brand fit remains human-led.",
      "Short-form video continues to dominate discovery, while long-term partnerships and partnership ads blend organic trust with paid distribution.",
    ]),
    publishedAt: "2026-01-18",
  },
  {
    id: "6",
    title: "How to Measure Influencer Marketing Success",
    slug: "measure-influencer-marketing-success",
    category: "Playbook",
    excerpt:
      "A practical framework beyond CPV: engagement quality, search lift, sentiment, and commercial outcomes.",
    author: "Influencer Marketing Hub",
    readTime: "12 min",
    sourceName: "Influencer Marketing Hub",
    sourceUrl: "https://influencermarketinghub.com/influencer-marketing/",
    body: body([
      "CPV alone optimises for cheap reach, not business outcomes. Mature programs combine reach metrics with engagement quality, audience fit, and downstream signals.",
      "Brands should track branded search lift, share of voice, add-to-cart rates, and cohort retention where commerce integrations exist.",
      "Unified dashboards beat screenshot decks, especially when influence is positioned as a board-level growth lever, not a social media line item.",
    ]),
    publishedAt: "2025-11-30",
  },
  {
    id: "7",
    title: "Influencing with Integrity: India Influencer Marketing Report 2025",
    slug: "wpp-influencing-with-integrity-2025",
    category: "Report",
    excerpt:
      "WPP Media and Kantar estimate ₹3,600 crore in 2024 with 25% growth forecast, prioritising quality, long-term partnerships, and trust.",
    author: "WPP Media",
    readTime: "15 min",
    sourceName: "WPP Media",
    sourceUrl: "https://www.wppmedia.com/news/influencing-with-integrity",
    body: body([
      "The India Influencer Marketing Report 2025, from The Goat Agency and Kantar, maps how brands embed creators into core strategy, not peripheral experiments.",
      "The industry is estimated at ₹3,600 crore in 2024, with 25% growth forecast for 2025. Nearly all surveyed brands treat influencer marketing as strategic or top priority.",
      "Key shifts: 72% prefer long-term partnerships; 85% of manufacturing brands prioritise content quality over follower count; 83% struggle with creator discovery.",
      "Consumers use creators across the funnel: 63% for discovery, 69% for information, 60% for action. Trust and credibility remain the top reasons brands invest, especially in BFSI and FMCG.",
    ]),
    publishedAt: "2025-06-10",
  },
  {
    id: "8",
    title: "Decoding Influence 2026: India's Creator Economy Report",
    slug: "kofluence-decoding-influence-2026",
    category: "Report",
    excerpt:
      "Kofluence's annual report covers ₹3,500Cr spend, AI adoption, long-term partnerships, and regional creator growth.",
    author: "Kofluence",
    readTime: "18 min",
    sourceName: "Kofluence",
    sourceUrl: "https://www.kofluence.com/influencer-marketing-research-report/",
    body: body([
      "Decoding Influence 2026 draws on 750K+ creators, 1,000+ surveys, and 50+ expert interviews to chart India's creator economy.",
      "India's annual influencer marketing spend is projected at ₹3,500 crore in 2026, allocated with the same rigour as traditional media. The CFO is in the room.",
      "76.6% of brands have run partnership ads with influencers; 62.1% favour long-term creator relationships over one-offs. 59% of creators use AI for ideation and captioning.",
      "37.7% of surveyed creators are based in North India, but Tier-2 and Tier-3 voices are gaining on engagement, trust, and conversion, especially in vernacular content.",
    ]),
    publishedAt: "2026-02-01",
  },
  {
    id: "9",
    title: "Top 7 Factors Influencing eCommerce Purchase Decisions",
    slug: "ecommerce-purchase-decision-factors",
    category: "Research Paper",
    excerpt:
      "Reviews, free shipping, product quality, returns, navigation, checkout, and newness shape how Indians buy online.",
    author: "Shiprocket",
    readTime: "6 min",
    sourceName: "Shiprocket",
    sourceUrl:
      "https://www.shiprocket.in/blog/factors-influencing-consumers-purchase-decision/",
    body: body([
      "Roughly 90% of shoppers read online reviews before buying. Social proof remains the strongest pre-purchase signal.",
      "Free shipping influences nearly half of purchase decisions; product quality and clear information close the gap when price parity exists.",
      "Easy returns, intuitive navigation, and frictionless checkout reduce drop-off, especially important when creator content drives traffic but the site must convert.",
      "New product launches sustain discovery; pairing creator campaigns with fresh catalog drops keeps audiences returning.",
    ]),
    publishedAt: "2019-06-03",
  },
  {
    id: "10",
    title: "Evaluating Consumer Satisfaction in Indian Online Shopping",
    slug: "consumer-satisfaction-online-shopping-india",
    category: "Research Paper",
    excerpt:
      "Website design, security, information quality, pricing, and product variety drive satisfaction for Indian e-commerce shoppers.",
    author: "Journal of International Business Research",
    readTime: "14 min",
    sourceName: "ABAC Academies",
    sourceUrl:
      "https://www.abacademies.org/articles/evaluating-factors-influencing-consumers-satisfaction-towards-online-shopping-in-india-16106.html",
    body: body([
      "Research on Indian online shoppers identifies six determinants of satisfaction: website design, information quality, security, product variety, product quality, and pricing.",
      "Effective website design, including navigation, visual appeal, and accessible information, directly shapes trust and repeat purchase intent.",
      "Security perceptions around payments and personal data remain critical; accurate product information and competitive pricing complete the satisfaction equation.",
      "For influencer-led commerce, these factors explain why creator trust must meet operational excellence on the brand's owned channels.",
    ]),
    publishedAt: "2023-01-01",
  },
  {
    id: "11",
    title: "EY State of Influencer Marketing in India",
    slug: "ey-state-influencer-marketing-india",
    category: "Report",
    excerpt:
      "EY's view on how India's influencer ecosystem is maturing across platforms, categories, and measurement.",
    author: "EY",
    readTime: "20 min",
    sourceName: "EY",
    sourceUrl:
      "https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf",
    pdfDownload:
      "https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf",
    body: body([
      "EY's State of Influencer Marketing in India examines how brands, platforms, and creators are professionalising influence as a measurable media channel.",
      "The report covers category adoption, platform dynamics, governance considerations, and the operating models required to scale creator programs responsibly.",
      "Download the full PDF for detailed benchmarks, case perspectives, and strategic recommendations for enterprise marketers.",
    ]),
    publishedAt: "2024-04-03",
  },
  {
    id: "12",
    title: "How India Shops Online 2025",
    slug: "bain-how-india-shops-online-2025",
    category: "Report",
    excerpt:
      "Bain's analysis of India's digital commerce behaviour, relevant context for creator-led discovery and conversion.",
    author: "Bain & Company",
    readTime: "22 min",
    sourceName: "Bain & Company",
    sourceUrl:
      "https://www.bain.com/globalassets/noindex/2025/bain_report_how_india_shops_online_2025.pdf",
    pdfDownload:
      "https://www.bain.com/globalassets/noindex/2025/bain_report_how_india_shops_online_2025.pdf",
    body: body([
      "Bain's How India Shops Online 2025 maps evolving purchase journeys across tiers, categories, and channels. Context every influencer strategist should understand.",
      "As discovery fragments across short video, search, and social commerce, creators sit at the intersection of inspiration and transaction.",
      "Use this report alongside creator performance data to align influence programs with how Indian consumers actually research, compare, and buy.",
    ]),
    publishedAt: "2025-01-15",
  },
  {
    id: "13",
    title: "Push for Original Content Signals Bigger Reset in Creator Economy",
    slug: "original-content-creator-economy-reset",
    category: "Trend Note",
    excerpt:
      "Platforms reward uniqueness over volume; recycled formats lose distribution advantage.",
    author: "Exchange4media",
    readTime: "7 min",
    sourceName: "Exchange4media",
    sourceUrl:
      "https://www.exchange4media.com/influence-zone-news/push-for-original-content-signals-bigger-reset-in-creator-economy-154828.html",
    body: body([
      "Meta and other platforms increasingly favour original creator signals, limiting reach for accounts that repeatedly repost similar content.",
      "The creator economy is shifting toward AI workflows, algorithmic optimisation, and repeatable systems, while still demanding authenticity audiences can trust.",
      "Brands should brief for native storytelling and fresh formats, not templated trend-chasing that algorithms now deprioritise.",
    ]),
    publishedAt: "2026-03-01",
  },
  {
    id: "14",
    title: "What Is Influencer Marketing? The Ultimate Guide for 2026",
    slug: "influencer-marketing-ultimate-guide-2026",
    category: "Playbook",
    excerpt:
      "Strategy, costs, measurement, and channel playbooks for brands building creator programs at scale.",
    author: "Influencer Marketing Hub",
    readTime: "25 min",
    sourceName: "Influencer Marketing Hub",
    sourceUrl: "https://influencermarketinghub.com/influencer-marketing/",
    body: body([
      "Influencer marketing has moved from experimental channel to core growth lever, with 85% of marketers now considering it effective for achieving their goals.",
      "Modern programs span short-form video, creator-led ads, affiliate partnerships, and social commerce, with platforms like TikTok and Instagram acting as search engines.",
      "This guide covers strategy build, influencer tiers, content types, pricing benchmarks, and ROI measurement for teams scaling in 2026.",
    ]),
    publishedAt: "2026-01-05",
  },
];
