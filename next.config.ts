import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/formulaire/:token*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
