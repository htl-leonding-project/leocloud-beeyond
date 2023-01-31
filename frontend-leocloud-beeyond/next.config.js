/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: "https://student.cloud.htl-leonding.ac.at/n.hirsch/api",
    BASE_PATH: "/n.hirsch/app",
  },
  output: "standalone",
  assetPrefix: "/n.hirsch/app",
};

module.exports = nextConfig;
