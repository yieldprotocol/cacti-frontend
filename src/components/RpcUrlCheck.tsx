import { ethers } from 'ethers';
import { useProvider } from 'wagmi';

const RpcUrlCheck = ({ children }) => {
  const provider = useProvider<ethers.providers.StaticJsonRpcProvider>();
  console.log('provider', provider);
  console.log('provider', provider?.connection?.url);
  if (provider?.connection) {
    // if not tenderly fork raise error
    console.log('provider', provider?.connection?.url);
  }
  return <>{children}</>;
};

export default RpcUrlCheck;
