import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This folder lives inside a larger git checkout; pin the workspace root here.
  turbopack: { root: __dirname },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
