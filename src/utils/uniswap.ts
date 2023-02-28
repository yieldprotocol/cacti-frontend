import { gql, request } from 'graphql-request';
import { UNISWAP_V3_GRAPH_ENDPOINT } from '@/utils/constants';

type PoolData = {
  id: string;
  feeTier: string;
};

export const fetchPools = async ({
  token0Address,
  token1Address,
}: {
  token0Address: string;
  token1Address: string;
}) => {
  const query = gql`
  {
		query getMovie($token0Address: String!, $token1Address: String!) {
		  pools(where: {token0: $token0Address, token1: $token1Address}) {
		  	id
		  	feeTier
		  }
	  }
  }
`;
  const data = await request<PoolData[]>(UNISWAP_V3_GRAPH_ENDPOINT, query);
  console.log(data);
  return data;
};
