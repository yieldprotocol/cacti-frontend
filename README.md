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

### Features

**Widget Commands**: Central to Cacti's extensible design are the Widget Commands. These commands act as functions that an LLM can call to display an interaction dialogue box, allowing users to engage in web3 actions or access data seamlessly. The Widget Commands can be expanded upon, allowing for a broad array of functions catered to the user's needs.

**Eval**: Cacti employs a flexible evaluation framework that is crucial for developers wishing to assess the performance of added widgets. This includes features like hard-coded testing, automatic evaluations, and evaluations via manually annotated test samples that can be input via a CSV file. 

**Chat Context**: All dialog boxes can add information to the chat context, enabling the LLM use context added by previous widget commands to execute a later command effectively, enhancing the overall user experience.

**Configurable Chat Modules**: Chat modules can be configured to permit the use of alternative LLMs, fine-tuned LLMs, alternate prompts to LLMs, etc. Different chat modules can be used just by using a modified URL. This allows for easy testing of potential improvements to the chat modes and new features. 

**Streaming Support**: Cacti supports streaming from LLM models, providing users with real-time updates. The system can sensibly handle widget commands included in the LLM stream, ensuring smooth and intuitive interactions.

**Support for Structured/Rich Media Output**: Cacti offers the ability to handle widget commands that need to display structured or rich media output as part of the interface. This includes tables, NFTs, and other forms of rich media, allowing users to engage with a dynamic and visually engaging interface.

**Cacti ReactJS Component Framework**: For easy UI integration, Cacti has built a ReactJS component framework that requires only basic ReactJS, HTML, and CSS skills. The components are composable, making it possible to mix and match the components to fit the information display requirements of the widget. Widget commands can be built on the frontend, or invoked from the backend using string responses. Developers can create more sophisticated functions by creating separate React components if needed.

**Wallet-based Authentication**: Cacti uses wallet-based authentication specifically for web3 wallets like MetaMask. This provides a secure means of identification and ensures the secure execution of web3 transactions.

**Transaction Handling**: Cacti is designed to handle web3 transactions on Ethereum or Layer 2 solutions (L2s). It abstracts away the complexity of transaction handling from the integrator. All the integrator needs to do is pass the transaction details, and Cacti takes care of the rest, ensuring a user-friendly experience for those engaging with web3 protocols.


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
