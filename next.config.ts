import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        // protocol: "https",
        // hostname: "i.ibb.co.com/**",
        protocol: "https",
        // hostname: "i.ibb.co.com",
        hostname: "img.magnific.com**",// permit all
      },
    ],
  },
};

export default nextConfig;
