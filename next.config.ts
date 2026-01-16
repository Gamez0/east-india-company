import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    devIndicators: false,
    experimental: {
        globalNotFound: true,
    },
};

export default nextConfig;
