import { ReactNode, useContext } from 'react';
import Image from 'next/image';
import { BoltIcon, ExclamationTriangleIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { useChatContext } from '@/contexts/ChatContext';
import SettingsContext from '@/contexts/SettingsContext';
import Cactus1 from './CactiImages/Cactus1';
import Cactus2 from './CactiImages/Cactus2';
import Cactus3 from './CactiImages/Cactus3';
import cactiImage from './CactiImages/cacti_4.png';

const WelcomeColumn = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col">{children}</div>;
};

const WelcomeBox = ({ onClick, children }: { onClick?: () => void; children: ReactNode }) => {
  const onClickClasses = onClick
    ? 'cursor-pointer hover:bg-white/20 hover:border-red-500 hover:border-opacity-90'
    : '';
  return (
    <div
      className={`
      my-4 max-w-[250px]  rounded-lg border-[1px] border-white
      border-opacity-10 p-4 text-center text-sm text-white
      text-opacity-70 md:p-2 ${onClickClasses}`}
      onClick={onClick}
    >
      <p className="flex min-h-[48px] items-center justify-center">{children}</p>
    </div>
  );
};

const WelcomeBoxSubtitle = ({ children }: { children: ReactNode }) => {
  return <h3 className="py-5 text-center text-xl font-bold text-white">{children}</h3>;
};

const WelcomeMessage = () => {
  const { sendMessage } = useChatContext();
  return (
    <div className="w-[90%]">
      <div className="mb-12">
        <Image src={cactiImage} alt="CactiChat" className="scale-75" />
      </div>

      <div className=" flex h-full  justify-center gap-x-8 ">
        <WelcomeColumn>
          <Cactus1 className="h-16" />
          <WelcomeBoxSubtitle>Examples</WelcomeBoxSubtitle>
          <WelcomeBox onClick={() => sendMessage('Find some dog nfts')}>
            &rdquo;Browse some dog nfts&rdquo;
          </WelcomeBox>
          <WelcomeBox onClick={() => sendMessage('Swap 0.1 ETH for DAI on Uniswap')}>
            &rdquo;Swap 0.1 ETH for DAI on Uniswap&rdquo;
          </WelcomeBox>
          <WelcomeBox onClick={() => sendMessage('Get the price of ETH in terms of USD')}>
            &rdquo;Get the price of ETH in terms of USD&rdquo;
          </WelcomeBox>
        </WelcomeColumn>

        <WelcomeColumn>
          <Cactus2 className="h-16" />
          <WelcomeBoxSubtitle>Capabilities</WelcomeBoxSubtitle>
          <WelcomeBox>Generate transactions to send tokens or Swap on Uniswap</WelcomeBox>
          <WelcomeBox>Query NFT collections</WelcomeBox>
          <WelcomeBox>Check on chain data</WelcomeBox>
        </WelcomeColumn>
        <WelcomeColumn>
          <Cactus3 className="h-16" />
          {/* <ExclamationTriangleIcon className="mt-3 h-12 text-gray-300" /> */}
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
