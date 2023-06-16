## Getting Started

First, run the development server:

```sh
npm install && npm run dev
# or
yarn && yarn dev
# or
pnpm install && pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Minting on Tenderly fork

```sh
yarn mint 0x...123
```

## To test zkSync L2
- Setup Goerli Testnet in your wallet
- Get Goerli ETH from one of [the faucets](https://github.com/bxpana/Goerli-Faucets)
- Get zkSync Testnet tokens (ETH, DAI, USDC) from their [bridge portal](https://goerli.portal.zksync.io/bridge) which has a built-in faucet
- To get DAI / USDC on Goerli, you have to use the ones from zkSync so initiate a withdrawal from their bridge portal (can take a few hours to process)
