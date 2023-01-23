/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "/i.pravatar.cc",
        port: "",
        pathname: "/150/**",
      },
    ],
  },
};
