import { ReactNode, useContext } from 'react';
import Image from 'next/image';
import { BoltIcon, ExclamationTriangleIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { useChatContext } from '@/contexts/ChatContext';
import SettingsContext from '@/contexts/SettingsContext';
import Cactus1 from './CactiImages/Cactus1';
import Cactus2 from './CactiImages/Cactus2';
import Cactus3 from './CactiImages/Cactus3';
import cactiImage from './CactiImages/cacti.png';

const WelcomeColumn = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-y-5">{children}</div>;
};

const WelcomeBox = ({ onClick, children }: { onClick?: () => void; children: ReactNode }) => {
  const onClickClasses = onClick
    ? 'cursor-pointer hover:bg-white/20 hover:border-red-500 hover:border-opacity-90'
    : '';
  return (
    <div
      className={`
      max-w-[250px] rounded-lg border-[1px] border-white
      border-opacity-10 p-4 text-center text-sm text-white
      text-opacity-70 md:p-2 ${onClickClasses}`}
      onClick={onClick}
    >
      <p className="flex min-h-[48px] items-center justify-center">{children}</p>
    </div>
  );
};

const WelcomeBoxSubtitle = ({ children }: { children: ReactNode }) => {
  return <h3 className="pb-4 text-center text-xl font-bold text-white">{children}</h3>;
};

const WelcomeMessage = () => {
  const { sendMessage } = useChatContext();
  return (
    <div className="grid h-full place-items-center">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 pb-4">
        <Image src={cactiImage} alt="CactiChat" className="mx-auto" width={400} height={300} />
        <div className="flex justify-center gap-x-5">
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
    </div>
  );
};

export default WelcomeMessage;
