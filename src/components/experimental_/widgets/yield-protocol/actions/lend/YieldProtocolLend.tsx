import { useCallback, useEffect, useMemo, useState } from 'react';
import { UnsignedTransaction } from 'ethers';
import request from 'graphql-request';
import useSWR from 'swr';
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

interface YieldGraphResSeriesEntity {
  maturity: number;
  id: string;
  fyToken: {
    pools: {
      id: string; // pool address
      lendAPR: string;
    }[];
  };
}

interface YieldSeriesEntity extends YieldGraphResSeriesEntity {
  maturity_: string;
  sendParams: UnsignedTransaction | undefined;
}

interface YieldGraphRes {
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
  const { value: amount } = useInput(inputAmount, tokenInSymbol);

  /***************INPUTS******************************************/
  // Yield Protocol specific spender handling
  const ladle = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);
  const query = useMemo(() => {
    return `
  {
    seriesEntities(
      where: {baseAsset_contains_nocase: "${tokenInToUse?.address}",
      matured: false}
    ) {
      id
      maturity
      fyToken {
        pools {
          id
          lendAPR
        }
      }
    }
  } 
  `;
  }, [tokenInToUse?.address]);

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
  const approvalParams = useMemo<ApprovalBasicParams>(
    () => ({
      tokenAddress: tokenInToUse?.address!,
      spender: ladle!,
      approvalAmount: amount!,
    }),
    [amount, ladle, tokenInToUse?.address]
  );

  const getSendParams = useCallback(
    async (seriesEntity: YieldGraphResSeriesEntity) => {
      const poolAddress = seriesEntity.fyToken?.pools[0].id;
      if (!poolAddress) {
        console.error(`No pool found for series entity ${seriesEntity.id}`);
        return undefined;
      }

      return await lend({
        tokenInAddress: tokenInToUse?.address!,
        amount: amount!,
        poolAddress: poolAddress as Address,
        isEthBase: tokenInIsETH,
      });
    },
    [amount, lend, tokenInIsETH, tokenInToUse]
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
          data.seriesEntities.map((seriesEntity) => {
            return (
              <SingleItem
                key={seriesEntity.id}
                item={seriesEntity}
                tokenInSymbol={tokenInSymbol}
                label={`Lend ${seriesEntity.maturity_}`}
                approvalParams={approvalParams}
                sendParams={seriesEntity.sendParams}
              />
            );
          })}
      </ResponseGrid>
    </>
  );
};

const SingleItem = ({
  item,
  tokenInSymbol,
  label,
  approvalParams,
  sendParams,
}: {
  item: YieldSeriesEntity;
  tokenInSymbol: string;
  label: string;
  approvalParams: ApprovalBasicParams | undefined;
  sendParams: UnsignedTransaction | undefined;
}) => {
  return (
    <SingleLineResponse tokenSymbol={tokenInSymbol} className="flex justify-between">
      <div className="mx-2 flex">
        <ResponseTitle>{cleanValue(item.fyToken.pools[0].lendAPR, 1)}% APY</ResponseTitle>
        <ActionResponse
          label={label}
          approvalParams={approvalParams}
          sendParams={sendParams}
          txParams={undefined}
        />
      </div>
    </SingleLineResponse>
  );
};

export default YieldProtocolLend;
