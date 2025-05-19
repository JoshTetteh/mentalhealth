/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  async rewrites() {
    return [
      {
        source: "/zoom6/:path*",
        destination: process.env.zoom6_URL ? `${process.env.zoom6_URL}/:path*` : "http://localhost:3001/:path*",
      },
    ];
  },
};

module.exports = nextConfig;