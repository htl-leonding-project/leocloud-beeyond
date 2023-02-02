/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL,
    BASE_PATH: process.env.BASE_PATH,
  },
  output: "standalone",
  assetPrefix: process.env.BASE_PATH,
};

module.exports = nextConfig;
