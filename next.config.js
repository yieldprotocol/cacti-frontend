/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ENV_TAG: process.env.NEXT_PUBLIC_ENV_TAG
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '/i.pravatar.cc',
        port: '',
        pathname: '/150/**',
      },
    ],
  },
};

module.exports = nextConfig;
