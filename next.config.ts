import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ytimg.com"], // כאן הוסף את ה-host של התמונות
  },
  /* config options here */
};

export default nextConfig;
