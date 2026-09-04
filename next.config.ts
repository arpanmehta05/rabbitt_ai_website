import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/blogimages/:path*",
        destination: "https://rabbitt.ai/blogimages/:path*",
      },
    ];
  },
};

export default nextConfig;
