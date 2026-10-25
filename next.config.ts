import type { NextConfig } from "next";

const site = new URL(process.env.NEXT_PUBLIC_SITE_URL!);

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
    remotePatterns: [{ protocol: site.protocol === "http:" ? "http" : "https", hostname: site.hostname, pathname: "/api/files/**" }],
  },
  async headers() {
    return [{ source: "/downloads/:file*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] }];
  },
};

export default nextConfig;
