import { ReactNode } from 'react';
import { BoltIcon, ExclamationTriangleIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { useChatContext } from '@/contexts/ChatContext';

const WelcomeColumn = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

const WelcomeBox = ({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) => {
  const onClickClasses = onClick ? 'cursor-pointer hover:bg-gray-500' : '';
  return (
    <div
      className={`my-4 max-w-[250px]  rounded-lg bg-gray-600 p-4 text-center text-white md:p-2 ${onClickClasses}`}
      onClick={onClick}
    >
      <p className="flex min-h-[48px] items-center justify-center">{children}</p>
    </div>
  );
};

const WelcomeBoxSubtitle = ({ children }) => {
  return <h3 className="py-5 text-center text-2xl font-bold text-white">{children}</h3>;
};

const WelcomeMessage = () => {
  const { sendMessage } = useChatContext();
  return (
    <div className="mt-4 md:mt-2 md:px-6">
      <h1 className="md:pd-0 mb-8 py-5 text-center text-4xl font-bold text-white md:mb-2 md:pt-0 md:pb-2">
        ChatWeb3
      </h1>
      <div className="flex h-full w-full justify-center gap-x-8">
        <WelcomeColumn>
          <BoltIcon className="mt-3 h-12 text-gray-300" />
          <WelcomeBoxSubtitle>Examples</WelcomeBoxSubtitle>
          <WelcomeBox onClick={() => sendMessage('Find some dog nfts')}>
            &rdquo;Browse some dog nfts&rdquo;
          </WelcomeBox>
          <WelcomeBox onClick={() => sendMessage('Swap 0.1 ETH for DAI on Uniswap')}>
            &rdquo;Swap 0.1 ETH for DAI on Uniswap&rdquo;
          </WelcomeBox>
          <WelcomeBox onClick={() => sendMessage('Get the price of ETH in terms of USDC')}>
            &rdquo;Get the price of ETH in terms of USDC&rdquo;
          </WelcomeBox>
        </WelcomeColumn>
        <WelcomeColumn>
          <RocketLaunchIcon className="mt-3 h-12 text-gray-300" />
          <WelcomeBoxSubtitle>Capabilities</WelcomeBoxSubtitle>
          <WelcomeBox>Generate transactions to send tokens or Swap on Uniswap</WelcomeBox>
          <WelcomeBox>Query NFT collections</WelcomeBox>
          <WelcomeBox>Check on chain data</WelcomeBox>
        </WelcomeColumn>
        <WelcomeColumn>
          <ExclamationTriangleIcon className="mt-3 h-12 text-gray-300" />
          <WelcomeBoxSubtitle>Limitations</WelcomeBoxSubtitle>
          <WelcomeBox>Can only interact with Ethereum mainnet</WelcomeBox>
          <WelcomeBox>Does not support all tokens for all commands</WelcomeBox>
          <WelcomeBox>More limitations</WelcomeBox>
        </WelcomeColumn>
      </div>
    </div>
  );
};

export default WelcomeMessage;
