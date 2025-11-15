import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  // skipWaiting: true,

  // buildExcludes: [/locales\/.*\.json$/, /\/api\//], // don't include locale JSONs or API
  // add runtimeCaching here if needed
});
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

export default withPWA(withNextIntl(nextConfig));
