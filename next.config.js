/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ENV_TAG: process.env.NEXT_PUBLIC_ENV_TAG,
    NEXT_PUBLIC_TENDERLY_FORK_ID: process.env.NEXT_PUBLIC_TENDERLY_FORK_ID,
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
