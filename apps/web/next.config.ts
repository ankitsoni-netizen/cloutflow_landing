import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Monorepo root — avoids Next picking a parent lockfile and breaking dev chunks
  outputFileTracingRoot: path.join(__dirname, "../.."),
  serverExternalPackages: ["better-sqlite3"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
