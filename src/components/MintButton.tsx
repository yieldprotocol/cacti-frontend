import { useEffect, useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { useAccount, useBalance, useNetwork, useProvider } from 'wagmi';
import { Button } from './Button';

export const MintButton = () => {
  const { address } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const { chain } = useNetwork();
  const { refetch } = useBalance({ address });
  const provider = useProvider() as JsonRpcProvider;

  useEffect(() => {
    if (!address || chain?.id != 36963) setVisible(false);
    setVisible(true);
  }, [address, chain?.id]);

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
  return !isVisible ? (
    <></>
  ) : (
    <Button onClick={mint} disabled={isLoading} className="disabled:bg-gray-400">
      Mint 10 ETH
    </Button>
  );
};
