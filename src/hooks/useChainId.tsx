// use the appropriate chain id depending on the network and if using a fork
import { useMemo } from 'react';
import { useNetwork } from 'wagmi';

const DEFAULT_CHAIN_ID = 1;

const useChainId = () => {
  const { chain } = useNetwork();
  return useMemo(() => (chain ? chain.id : DEFAULT_CHAIN_ID), [chain]);
};

export default useChainId;
