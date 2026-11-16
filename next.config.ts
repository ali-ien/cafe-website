import type { NextConfig } from "next";

const staticExport = process.env.ALARAK_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: staticExport ? "export" : undefined,
  trailingSlash: staticExport,
  env: { NEXT_PUBLIC_STATIC_EXPORT: staticExport ? "true" : "false" },
  images: {
    unoptimized: staticExport,
    remotePatterns: [{
      protocol: "https",
      hostname: "cdn.sanity.io",
      pathname: "/images/z12n5wz6/production/**",
    }],
    qualities: [75, 90],
  },
};

export default nextConfig;
