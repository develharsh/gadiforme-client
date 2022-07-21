// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// };

// module.exports = nextConfig;
module.exports = {
  env: {
    baseUrl: "http://localhost:3001",
    // baseUrl: "https://morefined.com",
  },
  images: {
    domains: ["media-harsh.fra1.digitaloceanspaces.com"],
  },
};
