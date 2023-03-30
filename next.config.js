/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ENV_TAG: process.env.NEXT_PUBLIC_ENV_TAG,
    NEXT_PUBLIC_TENDERLY_FORK_ID: process.env.NEXT_PUBLIC_TENDERLY_FORK_ID,
    NEXT_PUBLIC_TENDERLY_ACCESS_KEY: process.env.NEXT_PUBLIC_TENDERLY_ACCESS_KEY,
    NEXT_PUBLIC_TENDERLY_PROJECT: process.env.NEXT_PUBLIC_TENDERLY_PROJECT,
    NEXT_PUBLIC_TENDERLY_USER: process.env.NEXT_PUBLIC_TENDERLY_USER,
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
