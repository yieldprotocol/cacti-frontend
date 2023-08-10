import { useQuery } from 'react-query';
import request from 'graphql-request';
import { useAccount } from 'wagmi';
import { HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import useChainId from '@/hooks/useChainId';

const URLS: { [chainId: number]: string } = {
  1: 'https://api.thegraph.com/subgraphs/name/yieldprotocol/v2-mainnet',
  42161: 'https://api.thegraph.com/subgraphs/name/yieldprotocol/v2-arbitrum',
};

interface YieldGraphRes {
  account: {
    balances: {
      id: string;
      balance: string;
      asset: {
        assetId: string;
        decimals: number;
        id: string;
        name: string;
        symbol: string;
      };
    }[];
    vaults: {
      id: string;
      collateralAmount: string;
      debtAmount: string;
      collateral: {
        asset: {
          assetId: string;
          decimals: number;
          id: string;
          name: string;
          symbol: string;
        };
      };
      series: {
        maturity: string;
        baseAsset: {
          assetId: string;
          decimals: number;
          id: string;
          name: string;
          symbol: string;
        };
      };
    }[];
  };
}

const getQuery = (account: string) => `
{
    account(id: "${account}}") {
      balances {
        id
        balance
        asset {
          assetId
          decimals
          id
          name
          symbol
        }
      }
      vaults {
        id
        collateralAmount
        debtAmount
        collateral {
          asset {
            assetId
            decimals
            id
            name
            symbol
          }
          series {
            maturity
            baseAsset {
              assetId
              decimals
              id
              name
              symbol
            }
          }
        }
      }
    }
  }
`;

const YieldProtocolPositions = () => {
  const chainId = useChainId();
  const url = URLS[chainId];
  const { address: account } = useAccount();

  const queryFn = async () =>
    account && (await request<YieldGraphRes>(url, getQuery(account.toLowerCase())));

  const { data, ...rest } = useQuery({
    queryKey: ['yield-protocol-positions', account, chainId],
    queryFn,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {data &&
        data.account.balances.map(({ id, asset, balance }) => (
          <div key={id}>
            <SingleLineResponse tokenSymbol={asset.symbol} value={balance} />
          </div>
        ))}
      <div>
        <HeaderResponse>Borrow Positions</HeaderResponse>
        {data &&
          data.account.vaults.map(({ id, collateral, series, collateralAmount, debtAmount }) => (
            <div key={id}>
              <SingleLineResponse tokenSymbol={series.baseAsset.symbol}>
                <div>Debt Amount: {debtAmount}</div>
                <div>Collateral Asset: {collateral.asset.symbol}</div>
                <div>Collateral Amount: {collateralAmount}</div>
              </SingleLineResponse>
            </div>
          ))}
      </div>
    </div>
  );
};

export default YieldProtocolPositions;
