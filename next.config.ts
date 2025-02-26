import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/sr",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
