import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export const ConnectFirst = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { isConnected } = useAccount();
  if (!isConnected) return <ConnectButton />;
  return <>{children}</>;
};
