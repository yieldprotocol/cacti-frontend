<div align="center">
  <h1 align="center">🌵🌵🌵 Cacti 🌵🌵🌵 </h1>
  <h2 align="center"> <b>Cacti Frontend</b> - <a href="https://github.com/yieldprotocol/cacti-backend">Cacti Backend</a></h2>
  <p align="center">
    Natural language interactions with web3.
    <br />
    <br />
    <a href="https://twitter.com/yield">Twitter</a>
    ·
    <a href="https://discord.gg/JAFfDj5">Discord</a>
    ·
    <a href="https://github.com/yieldprotocol/cacti-backend/issues">Report a Bug</a>
  </p>
</div>

<br />

![A screenshot of Cacti.](/screenshot.jpg)

## About

Cacti is a natural language interface for interacting with web3. It uses OpenAI function calling capability and a small but growing library of web3 interactions (called "widget commands") to enable chat based interactions.  

Cacti includes a frontend and backend repo. This is the frontend. The backend is [here](https://github.com/yieldprotocol/cacti-backend).

The Cacti frontend is a web-based interface where users can seamlessly interact with integrated web3 protocols.

## Getting Started

First, run the development server:

```sh
npm install && npm run dev
# or
yarn && yarn dev
# or
pnpm install && pnpm dev
```

Or, if using a local backend:

```sh
npm install && npm localBackend
# same for other package manager
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
- NOTE:
  - Observered time delay for tokens to be available on L2 from L1 is around 10 minutes
  - Observered time delay for tokens to be available on L1 from L2 is around 1 hour

## Contributing

See the [open issues](https://github.com/yieldprotocol/cacti-backend/issues) for a list of proposed features (and known issues).
