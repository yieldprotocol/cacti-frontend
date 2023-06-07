import { ConnectButton } from '@rainbow-me/rainbowkit';
import Avatar from '../Avatar';
import { PowerIcon } from '@heroicons/react/24/outline';

export const CustomConnectButton = () => {
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
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            className=" rounded-lg  bg-white bg-opacity-5 p-2 text-sm"
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
                  <button onClick={openConnectModal} type="button">
                    <div className="animate-pulse text-sm text-white/70">Connect Wallet </div>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    <div className="animate-pulse text-sm text-red-500">Wrong network </div>
                  </button>
                );
              }

              return (
                <div className="flex gap-4 items-center" onClick={openAccountModal}>
                  <Avatar actor="user" size={32} />

                  <div>
                    <div className="text-sm font-semibold text-white/70"> {account.displayName} </div>
                    <div className="font-mono text-xs text-white/70 font-thin">
                      {account.displayBalance ? `${account.displayBalance}` : ''}
                    </div>
                  </div>
                  {/* <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button> */}

                  <div className='w-4 h-4 text-white/30 hover:text-white/80'>
                     <PowerIcon/>
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
