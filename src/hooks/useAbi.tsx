import { useQuery } from 'react-query';
import axios from 'axios';
import { Address } from 'wagmi';

const useAbi = (contractAddress: Address) => {
  const fetchAbi = async () => {
    const { data } = await axios.get(
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
    );
    return JSON.parse(data.result);
  };

  const { data, ...rest } = useQuery(['abi', contractAddress], fetchAbi, {
    refetchOnWindowFocus: false,
  });

  return { data, ...rest };
};

export default useAbi;
