import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't fail production builds on lint warnings.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
