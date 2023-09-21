// use the appropriate chain id depending on the network and if using a fork
import { useContext, useMemo } from 'react';
import { useNetwork } from 'wagmi';
import SettingsContext from '@/contexts/SettingsContext';

const DEFAULT_CHAIN_ID = 1;

const useChainId = (returnForkId?: boolean) => {
  const { chain } = useNetwork();
  const {
    settings: { isForkedEnv },
  } = useContext(SettingsContext);

  return useMemo(() => {
    /* if required, we use the *base* chain id for the forked env 
     because most contracts will require the chain id to match 
     eg. chainID 1 etc even though we are using a forked env with custom id 
    */
    if (isForkedEnv && !returnForkId) {
      return chain ? +chain.id.toString().slice(6) : DEFAULT_CHAIN_ID;
    }
    return chain ? chain.id : DEFAULT_CHAIN_ID;
  }, [chain]);
};

export default useChainId;
