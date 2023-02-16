import { useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { useAccount, useBalance, useNetwork, useProvider } from 'wagmi';
import { Button } from './Button';

export const MintButton = () => {
  const { address } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const { chain } = useNetwork();
  const { refetch } = useBalance({ address });
  const provider = useProvider() as JsonRpcProvider;
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
  if (!address || chain.id != 36963) return <></>;
  return (
    <Button onClick={mint} disabled={isLoading} className="disabled:bg-gray-400">
      Mint 10 ETH
    </Button>
  );
};
