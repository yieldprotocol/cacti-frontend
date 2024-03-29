/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ENV_TAG: process.env.NEXT_PUBLIC_ENV_TAG,
    ARBITRUM_FORK_URL: process.env.ARBITRUM_FORK_URL,
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
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        port: '',
        pathname: '/coins/images/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/zapper-fi-assets/tokens/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: 'trustwallet/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'dashboard.mypinata.cloud',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
};

module.exports = nextConfig;
