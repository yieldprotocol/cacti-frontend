import { PowerIcon } from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatEther } from 'ethers/lib/utils.js';
import useBalance from '@/hooks/useBalance';
import { cleanValue } from '@/utils';
import Avatar from '../Avatar';
import { buttonStyle } from './layout/sidebar/NewChatButton';

const CustomConnectButton = () => {
  const { data: balance } = useBalance();
  const balance_ = balance ? formatEther(balance) : '';
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          !!account &&
          !!chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            className={`
            min-w-[200px]
            cursor-pointer 
            hover:opacity-80
            `}
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {

              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className='w-full' >
                    <div className={`flex items-center justify-center text-xs text-white/70 ${buttonStyle}`}>
                      Connect Wallet
                      </div>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    <div className="text-xs text-red-500">Wrong network</div>
                  </button>
                );
              }

              return (
                <div
                  className="
                    flex h-full w-full 
                    cursor-pointer 
                    items-center 
                    justify-between 
                    p-1
                    px-3
                    bg-gray-600/20
                    rounded-lg
                    border-gray-800
                  "
                  onClick={openAccountModal}
                >
                  <div className="flex items-center gap-3">
                    <Avatar actor="user" />
                    <div>
                      <div className="text-sm font-semibold text-white/70">
                        {account.displayName}
                      </div>
                      <div className="flex justify-start font-mono text-xs font-thin text-white/70">
                        {cleanValue(balance_, 2)} ETH
                      </div>
                    </div>
                  </div>
                  <div className="ml-8 h-4 w-4 text-white/30 hover:text-white/80">
                    <PowerIcon />
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
