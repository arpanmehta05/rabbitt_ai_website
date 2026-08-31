import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow any HTTPS image source — CMS images come from various CDNs (S3, ibb.co, etc.)
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
