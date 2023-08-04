import { PowerIcon } from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatEther } from 'ethers/lib/utils.js';
import { useAccount, useEnsAvatar } from 'wagmi';
import useBalance from '@/hooks/useBalance';
import { cleanValue } from '@/utils';
import Avatar from '../Avatar';
import SkeletonWrap from '../SkeletonWrap';
import useEnsName from '../cactiComponents/hooks/useEnsName';

const CustomConnectButton = () => {
  const { data: balance } = useBalance();
  const balance_ = balance ? formatEther(balance) : '';
  const { address } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address, scopeKey: `ensAvatar-${address}` });
  const { data: ensName, isRefetching } = useEnsName();

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
            className={`h-12 w-full cursor-pointer rounded-lg border-[1px] ${
              !connected ? 'border-green-primary/10 bg-green-primary' : 'border-gray-800'
            } bg-gray-700/50 text-center text-sm font-bold text-white hover:opacity-80`}
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
                  <button onClick={openConnectModal} type="button" className="h-full w-full p-3">
                    <div className="text-sm text-white/70">Connect Wallet</div>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className="h-full w-full p-3">
                    <div className="text-sm text-red-500">Wrong network</div>
                  </button>
                );
              }

              return (
                <div
                  className="flex h-full w-full cursor-pointer items-center justify-between p-3"
                  onClick={openAccountModal}
                >
                  <div className="flex items-center gap-3">
                    <Avatar actor="user" />
                    <div>
                      <div className="text-sm font-semibold text-white/70">
                        {isRefetching ? (
                          <SkeletonWrap width={100} height={10} />
                        ) : (
                          ensName || account.displayName
                        )}
                      </div>
                      <div className="flex justify-start font-mono text-xs font-thin text-white/70">
                        {cleanValue(balance_, 2)}
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
