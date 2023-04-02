/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  assetPrefix: global.process.env.BASE_PATH,
};

module.exports = nextConfig;
