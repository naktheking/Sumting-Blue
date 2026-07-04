import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Content admins can paste image URLs from any https host.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
