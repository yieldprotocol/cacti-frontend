import { useContext, useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { useAccount, useProvider } from 'wagmi';
import { Button } from '../shared/Button';
import useBalance from '../cactiComponents/hooks/useBalance';
import SettingsContext from '@/contexts/SettingsContext';

export const MintButton = () => {
  const { address } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const { refetch } = useBalance();
  const provider = useProvider() as JsonRpcProvider;
  const {
    settings: { isForkedEnv },
  } = useContext(SettingsContext);

  const mint = async () => {
    const params = [
      [address],
      ethers.utils.parseEther('10').toHexString(), // hex encoded wei amount
    ];
    setLoading(true);
    await provider.send('tenderly_addBalance', params);
    await refetch();
    setLoading(false);
  };
  return (
    isForkedEnv ? 
    <Button
      onClick={mint}
      disabled={isLoading}
      className="flex w-full text-xs disabled:bg-gray-400"
    >
      Mint 10 ETH
    </Button> : <></>
  );
};
