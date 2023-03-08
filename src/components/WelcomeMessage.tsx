import { BoltIcon } from '@heroicons/react/24/outline';

const WelcomeColumn = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

const WelcomeBox = ({ children }) => {
  return (
    <div className="my-4 max-w-[250px]  rounded-lg bg-gray-600 p-4 text-center text-white">
      <p className="flex min-h-[48px] items-center justify-center">{children}</p>
    </div>
  );
};

const WelcomeBoxSubtitle = ({ children }) => {
  return <h3 className="py-5 text-center text-2xl font-bold text-white">{children}</h3>;
};

const WelcomeMessage = () => {
  return (
    <div className="md:px-6">
      <h1 className="mb-4 py-5 text-center text-4xl font-bold text-white">ChatWeb3</h1>
      <div className="flex h-full w-full justify-center gap-x-8">
        <WelcomeColumn>
          <BoltIcon className="my-3 h-12 text-gray-300" />
          <WelcomeBoxSubtitle>Examples</WelcomeBoxSubtitle>
          <WelcomeBox>&rdquo;Browse some dog nfts&rdquo;</WelcomeBox>
          <WelcomeBox>&rdquo;Swap 0.1 ETH for DAI on Uniswap&rdquo;</WelcomeBox>
          <WelcomeBox>&rdquo;Get the price of ETH in terms of USDC&rdquo;</WelcomeBox>
        </WelcomeColumn>
        <WelcomeColumn>
          <BoltIcon className="my-3 h-12 text-gray-300" />
          <WelcomeBoxSubtitle>Capabilities</WelcomeBoxSubtitle>
          <WelcomeBox>Generate transactions to send tokens or Swap on Uniswap</WelcomeBox>
          <WelcomeBox>Query NFT collections</WelcomeBox>
          <WelcomeBox>Check on chain data</WelcomeBox>
        </WelcomeColumn>
        <WelcomeColumn>
          <BoltIcon className="my-3 h-12 text-gray-300" />
          <WelcomeBoxSubtitle>Limitations</WelcomeBoxSubtitle>
          <WelcomeBox>Can only interact with Ethereum main chain</WelcomeBox>
          <WelcomeBox>Does not support all tokens for all commands</WelcomeBox>
          <WelcomeBox>More limitations</WelcomeBox>
        </WelcomeColumn>
      </div>
    </div>
  );
};

export default WelcomeMessage;
