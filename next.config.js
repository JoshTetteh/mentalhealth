/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: 'img.clerk.com' }] },
  assetPrefix: process.env.USE_PROXY ? "/zoom6" : "",

};

module.exports = nextConfig;
