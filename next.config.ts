import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/global-sovereign-wealth-map",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
