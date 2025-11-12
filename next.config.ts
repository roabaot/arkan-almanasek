import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Allow optimized loading of remote ActiveStorage blob redirects
    remotePatterns: [
      {
        protocol: "http", // Staging currently serves over HTTP; prefer HTTPS if available
        hostname: "staging.macs.com.sa",
        port: "",
        pathname: "/rails/active_storage/blobs/redirect/**",
      },
      {
        protocol: "https", // Production (adjust if different)
        hostname: "macs.com.sa",
        port: "",
        pathname: "/rails/active_storage/blobs/redirect/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
