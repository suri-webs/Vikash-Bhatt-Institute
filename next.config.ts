import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',        // ← adds this for static build
  images: {
    unoptimized: true      // ← already correct, required for static
  }
};

export default nextConfig;