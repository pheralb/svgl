const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  nextConfig,
});
