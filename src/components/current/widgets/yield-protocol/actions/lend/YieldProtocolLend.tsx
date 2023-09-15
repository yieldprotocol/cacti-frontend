import { useCallback, useEffect, useMemo, useState } from 'react';
import { UnsignedTransaction } from 'ethers';
import request from 'graphql-request';
import useSWR from 'swr';
import { TransactionRequestBase } from 'viem';
import { Address } from 'wagmi';
import {
  ActionResponse,
  HeaderResponse,
  SingleLineResponse,
  TextResponse,
} from '@/components/cactiComponents';
import { ResponseGrid, ResponseTitle } from '@/components/cactiComponents/helpers/layout';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
// CUSTOM IMPORTS
import useChainId from '@/hooks/useChainId';
import useInput from '@/hooks/useInput';
import useToken from '@/hooks/useToken';
import { cleanValue, toTitleCase } from '@/utils';
import contractAddresses, { ContractNames } from '../../contracts/config';
import useYieldProtocol from '../../hooks/useYieldProtocol';
import { nameFromMaturity } from '../../utils';

export interface YieldGraphResSeriesEntity {
  maturity: number;
  baseAsset: {
    id: string;
    symbol: string;
    assetId: string;
    decimals: number;
  };
  id: string;
  fyToken: {
    id: string;
    decimals: number;
    pools: {
      id: string; // pool address
      lendAPR: string;
      borrowAPR: string;
    }[];
  };
}

export interface YieldSeriesEntity extends YieldGraphResSeriesEntity {
  maturity_: string;
  sendParams: TransactionRequestBase | undefined;
}

export interface YieldGraphRes {
  seriesEntities: YieldGraphResSeriesEntity[];
}

// should be generalized and only needed as reference once for all components
interface InputProps {
  tokenInSymbol: string;
  tokenOutSymbol?: string;
  inputAmount: string;
  action: string;
  projectName: string;
}

export const NOW = Math.round(new Date().getTime() / 1000);
export const getQuery = (address: string) =>
  `
  {
    seriesEntities(
      where: {baseAsset_contains_nocase: "${address}",
      maturity_gt: ${NOW}}
    ) {
      id
      maturity
      baseAsset {
        id
        symbol
        assetId
      }
      fyToken {
        id
        pools {
          id
          lendAPR
          borrowAPR
        }
      }
    }
  } 
  `;

const YieldProtocolLend = ({
  tokenInSymbol,
  tokenOutSymbol,
  inputAmount,
  action,
  projectName,
}: InputProps) => {
  /* generic hook usage (not to be touched when creating from example) */
  const chainId = useChainId();
  const { lend } = useYieldProtocol();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { data: tokenInToUse } = useToken(tokenInIsETH ? 'WETH' : tokenInSymbol);
  const label = `
        ${toTitleCase(action)} ${inputAmount} ${tokenInSymbol} on ${toTitleCase(projectName)}`;
  const amount = useInput(inputAmount, tokenInSymbol);

  /***************INPUTS******************************************/
  // Yield Protocol specific spender handling
  const ladle = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);
  const query = getQuery(tokenInToUse?.address!);

  // get series entities from the graph
  const { data: graphResSeriesEntities } = useSWR(
    ['/yield-protocol/seriesEntities', query],
    () =>
      request<YieldGraphRes>(
        // only mainnet for now
        `https://api.thegraph.com/subgraphs/name/yieldprotocol/v2-mainnet`,
        query
      ),
    {
      revalidateOnFocus: false,
    }
  );

  const [data, setData] = useState<{ seriesEntities: YieldSeriesEntity[] | undefined }>();

  // all series entities use the same approval params
  const approvalParams = useMemo<ApprovalBasicParams | undefined>(() => {
    if (!tokenInToUse) {
      console.error(`No token address found for ${tokenInSymbol}`);
      return undefined;
    }
    if (!ladle) {
      console.error(`No ladle address found for ${tokenInSymbol}`);
      return undefined;
    }

    if (!amount?.value) {
      console.error(`No amount found for ${tokenInSymbol}`);
      return undefined;
    }

    return {
      tokenAddress: tokenInToUse.address,
      spender: ladle,
      approvalAmount: amount.value,
      skipApproval: tokenInIsETH,
    };
  }, [amount, ladle, tokenInIsETH, tokenInSymbol, tokenInToUse]);

  const getSendParams = useCallback(
    async (seriesEntity: YieldGraphResSeriesEntity) => {
      const poolAddress = seriesEntity.fyToken?.pools[0].id;
      if (!poolAddress) {
        console.error(`No pool found for series entity ${seriesEntity.id}`);
        return undefined;
      }

      if (!tokenInToUse?.address) {
        console.error(`No token address found for ${tokenInSymbol}`);
        return undefined;
      }

      if (!amount?.value) {
        console.error(`No amount found for ${tokenInSymbol}`);
        return undefined;
      }

      return await lend({
        tokenInAddress: tokenInToUse.address,
        amount: amount.value,
        poolAddress: poolAddress as Address,
        isEthBase: tokenInIsETH,
      });
    },
    [amount?.value, tokenInIsETH, tokenInSymbol, tokenInToUse?.address] // intentionally omitting lend cuz of infinite render issue; TODO make more kosher
  );

  useEffect(() => {
    // get the series entities using the graph
    (async () => {
      const _seriesEntities = graphResSeriesEntities?.seriesEntities;
      if (!_seriesEntities) return console.error('No series entities found');

      const seriesEntities = await Promise.all(
        _seriesEntities.map(async (s): Promise<YieldSeriesEntity> => {
          const maturity_ = nameFromMaturity(s.maturity);
          const sendParams = await getSendParams(s);
          return {
            ...s,
            maturity_,
            sendParams,
          };
        })
      );

      setData({ seriesEntities });
    })();
  }, [getSendParams, graphResSeriesEntities?.seriesEntities]);
  /***************INPUTS******************************************/

  // generic weird input handling; can be abstracted out
  if (inputAmount === '*' || inputAmount === '{amount}')
    return (
      <TextResponse
        text={`Please edit your query with an amount you wish to trade on ${toTitleCase(
          projectName
        )}.`}
      />
    );

  return (
    <>
      <HeaderResponse text={label} projectName={projectName} />
      <ResponseGrid className="grid gap-1">
        {data?.seriesEntities &&
          data.seriesEntities.map((s) => {
            return (
              <SingleItem
                key={s.id}
                item={s}
                label={`Lend ${s.maturity_}`}
                approvalParams={approvalParams}
                sendParams={s.sendParams}
              />
            );
          })}
      </ResponseGrid>
    </>
  );
};

const SingleItem = ({
  item,
  label,
  approvalParams,
  sendParams,
}: {
  item: YieldSeriesEntity;
  label: string;
  approvalParams: ApprovalBasicParams | undefined;
  sendParams: UnsignedTransaction | undefined;
}) => {
  const lendAPR = item.fyToken.pools[0].lendAPR;
  return +lendAPR > 0 ? ( // only show if there is an APR; this implicitly checks liquidity in the pool (it would be more accurate to check maxBaseOut of the pool against the user input, but wanted to minimize requests)
    <SingleLineResponse tokenSymbol={item.baseAsset.symbol} className="flex justify-between">
      <div className="">
        <ResponseTitle>{item.maturity_}</ResponseTitle>
        <ResponseTitle>{cleanValue(item.fyToken.pools[0].lendAPR, 1)}% APY</ResponseTitle>
      </div>
      <div className="mx-2 my-auto">
        <ActionResponse
          label={label}
          approvalParams={approvalParams}
          sendParams={sendParams}
          txParams={undefined}
        />
      </div>
    </SingleLineResponse>
  ) : null;
};

export default YieldProtocolLend;
