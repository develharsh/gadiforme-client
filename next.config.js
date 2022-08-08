// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// };

// module.exports = nextConfig;
module.exports = {
  env: {
    MONGODB_URL:
      "mongodb+srv://hvs:thakur@cluster0.dqdk6.mongodb.net/production",
    FAST2SMS_API_KEY:
      "Ea2Dxt14qdujiGXCpeTQOb06hWyMZgcP7F5VnLfBrlH9zoSINJafUyLsrA0HNeEDToKhPxvOFj285InQ",
    // baseUrl: "http://localhost:3000",
    baseUrl: "https://gadifor.me",
  },
  images: {
    domains: ["media-harsh.fra1.digitaloceanspaces.com"],
  },
};
