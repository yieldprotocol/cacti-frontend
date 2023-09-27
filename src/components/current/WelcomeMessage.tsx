import { ReactNode } from 'react';
import Image from 'next/image';
import { useChatContext } from '@/contexts/ChatContext';
import Cactus1 from './CactiImages/Cactus1';
import Cactus2 from './CactiImages/Cactus2';
import Cactus3 from './CactiImages/Cactus3';
import cactiImage from './CactiImages/cacti.png';

const WelcomeColumn = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col items-center gap-y-8 ">{children}</div>;
};

const WelcomeBox = ({ onClick, children }: { onClick?: () => void; children: ReactNode }) => {
  const onClickClasses = onClick ? 'cursor-pointer hover:bg-teal-100/10' : '';
  return (
    <div
      className={`
      max-w-[250px] rounded-lg border-[1px] border-green-primary/25 p-4 text-center text-sm
      text-white text-opacity-70 md:p-2 ${onClickClasses} center w-full`}
      onClick={onClick}
    >
      <p className="m-0 flex min-h-[48px] items-center justify-center text-base font-light ">
        &rdquo;{children}&rdquo;
      </p>
    </div>
  );
};

const WelcomeBoxSubtitle = ({ children }: { children: ReactNode }) => {
  return <h3 className="pb-4 text-center text-xl font-bold text-white">{children}</h3>;
};

const WelcomeMessage = () => {
  const { sendMessage } = useChatContext();
  return (
    <div className="h-full place-items-center ">
      <div className="mx-auto w-full max-w-4xl space-y-20">
        <div className="flex w-full justify-center">
          <div className="w-[50%]">
            <Image src={cactiImage} alt="CactiChat" className="mx-auto" priority />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-20 p-4 sm:grid-cols-3">
          <WelcomeColumn>
            <div className="w-[20%] sm:w-[40%] ">
              <Cactus1 className="h-16" />
            </div>
            <WelcomeBoxSubtitle> Explore NFTs </WelcomeBoxSubtitle>
            <WelcomeBox onClick={() => sendMessage('Browse some cheetah nft collections')}>
              Browse some [cheetah] NFT collections
            </WelcomeBox>
            <WelcomeBox onClick={() => sendMessage('Load Pudgy Penguins nft collection')}>
              Show specific NFT collections [Pudgy Penguins]
            </WelcomeBox>
            <WelcomeBox onClick={() => sendMessage('What NFTs do I own?')}>
              What NFTs do I own?
            </WelcomeBox>
          </WelcomeColumn>

          <WelcomeColumn>
            <div className="w-[20%] sm:w-[40%] ">
              <Cactus2 className="h-16" />
            </div>
            <WelcomeBoxSubtitle>Interact with protocols</WelcomeBoxSubtitle>
            <WelcomeBox onClick={() => sendMessage('Swap 0.1 ETH for DAI on Uniswap')}>
              Swap 0.1 ETH for DAI on Uniswap
            </WelcomeBox>
            <WelcomeBox
              onClick={() => sendMessage('Borrow 1000 USDC on yield Protocol with ETH collateral')}
            >
              Borrow 1000 USDC on yield Protocol with ETH collateral
            </WelcomeBox>
            <WelcomeBox onClick={() => sendMessage('Register the name [domain-name].eth on ENS')}>
              Register the name [domain-name].eth on ENS
            </WelcomeBox>
          </WelcomeColumn>

          <WelcomeColumn>
            <div className="w-[20%] sm:w-[40%] ">
              <Cactus3 className="h-16" />
            </div>
            {/* <ExclamationTriangleIcon className="mt-3 h-12 text-gray-300" /> */}
            <WelcomeBoxSubtitle>Query the Network</WelcomeBoxSubtitle>
            <WelcomeBox onClick={() => sendMessage('What is the price of ETH in terms of USD')}>
              What is the price of ETH in terms of USDC?
            </WelcomeBox>
            <WelcomeBox onClick={() => sendMessage('What is my DAI balance?')}>
              What is my DAI balance?
            </WelcomeBox>
            <WelcomeBox onClick={() => sendMessage('What are the top yields on Ethereum')}>
              What are the top yields on Ethereum?
            </WelcomeBox>
          </WelcomeColumn>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
