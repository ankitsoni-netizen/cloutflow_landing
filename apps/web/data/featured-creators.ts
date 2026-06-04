import { creatorPortraits } from "@/lib/local-assets";

export interface FeaturedCreator {
  id: string;
  name: string;
  handle: string;
  category: string;
  reach: string;
  platforms?: { name: string; followers: string }[];
  image: string;
  gridClass: string;
}

export const featuredCreators: FeaturedCreator[] = [
  {
    id: "bhuvan",
    name: "Bhuvan Bam",
    handle: "@bhuvan.bam",
    category: "Comedy",
    reach: "78M+",
    platforms: [
      { name: "YouTube", followers: "26M" },
      { name: "Instagram", followers: "18M" },
    ],
    image: creatorPortraits.bhuvan,
    gridClass: "col-span-2 row-span-2",
  },
  {
    id: "prajakta",
    name: "Prajakta Koli",
    handle: "@mostlysane",
    category: "Lifestyle",
    reach: "14M+",
    platforms: [
      { name: "YouTube", followers: "7M" },
      { name: "Instagram", followers: "5M" },
    ],
    image: creatorPortraits.prajakta,
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: "ranveer",
    name: "Ranveer Allahbadia",
    handle: "@beerbiceps",
    category: "Podcast",
    reach: "12M+",
    platforms: [
      { name: "YouTube", followers: "8M" },
      { name: "Instagram", followers: "3M" },
    ],
    image: creatorPortraits.ranveer,
    gridClass: "col-span-1 row-span-2",
  },
  {
    id: "kusha",
    name: "Kusha Kapila",
    handle: "@kushakapila",
    category: "Fashion",
    reach: "8M+",
    platforms: [
      { name: "Instagram", followers: "5M" },
      { name: "YouTube", followers: "1M" },
    ],
    image: creatorPortraits.kusha,
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: "ashish",
    name: "Ashish Chanchlani",
    handle: "@ashishchanchlani",
    category: "Comedy",
    reach: "30M+",
    platforms: [
      { name: "YouTube", followers: "22M" },
      { name: "Instagram", followers: "5M" },
    ],
    image: creatorPortraits.ashish,
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: "komal",
    name: "Komal Pandey",
    handle: "@komalpandeyofficial",
    category: "Fashion",
    reach: "2M+",
    platforms: [
      { name: "Instagram", followers: "1.8M" },
      { name: "YouTube", followers: "400K" },
    ],
    image: creatorPortraits.komal,
    gridClass: "col-span-1 row-span-2",
  },
  {
    id: "masoom",
    name: "Masoom Minawala",
    handle: "@masoomminawala",
    category: "Beauty",
    reach: "1.5M+",
    platforms: [
      { name: "Instagram", followers: "1.2M" },
      { name: "YouTube", followers: "200K" },
    ],
    image: creatorPortraits.masoom,
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: "nikhil",
    name: "Nikhil Sharma",
    handle: "@nikhilsharma",
    category: "Auto",
    reach: "5M+",
    platforms: [
      { name: "YouTube", followers: "4M" },
      { name: "Instagram", followers: "800K" },
    ],
    image: creatorPortraits.nikhil,
    gridClass: "col-span-2 row-span-1",
  },
];

export const creatorCategories = [
  "Comedy",
  "Beauty",
  "Fashion",
  "Lifestyle",
  "Finance",
  "Auto",
  "Podcast",
  "Gaming",
] as const;
