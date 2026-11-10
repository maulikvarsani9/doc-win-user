import type { NextConfig } from "next";
import { site } from "./src/content/site";

const origin = new URL(site.url);

const nextConfig: NextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    remotePatterns: [{ protocol: origin.protocol === "http:" ? "http" : "https", hostname: origin.hostname, pathname: "/api/files/**" }],
  },
  async headers() {
    return [{ source: "/downloads/:file*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] }];
  },
};

export default nextConfig;
