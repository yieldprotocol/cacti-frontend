import { useCallback, useEffect, useState } from 'react';
import { BigNumber, UnsignedTransaction, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import request from 'graphql-request';
import useSWR from 'swr';
import { Address, erc20ABI, useAccount } from 'wagmi';
import { readContract } from 'wagmi/actions';
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
import { toTitleCase } from '@/utils';
import poolAbi from '../../contracts/abis/Pool';
import contractAddresses, { ContractNames } from '../../contracts/config';
import useYieldProtocol from '../../hooks/useYieldProtocol';
import { nameFromMaturity } from '../../utils';
import {
  NOW,
  YieldGraphRes,
  YieldGraphResSeriesEntity,
  YieldSeriesEntity,
} from '../lend/YieldProtocolLend';

interface YieldSeriesEntityLendClose extends YieldSeriesEntity {
  fyTokenBalance: string; // fyToken balance (formatted)
  baseValueOfBalance: string; // estimated base value of fyToken balance (formatted)
}

interface InputProps {
  baseTokenSymbol: string;
  inputAmount: string;
  action: string;
  projectName: string;
}

// gets all series entities
const getQuery = (address: string) =>
  `
  {
    seriesEntities(
      where: {baseAsset_contains_nocase: "${address}"}
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

const YieldProtocolLendClose = ({
  baseTokenSymbol,
  inputAmount,
  action,
  projectName,
}: InputProps) => {
  /* generic hook usage (not to be touched when creating from example) */
  const chainId = useChainId();
  const { address: account } = useAccount();
  const { lendClose } = useYieldProtocol();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(baseTokenSymbol);
  const { data: tokenInToUse } = useToken(tokenInIsETH ? 'WETH' : baseTokenSymbol);
  const label = `
        ${toTitleCase(action)} ${inputAmount} ${baseTokenSymbol} on ${toTitleCase(projectName)}`;
  const { value: amount } = useInput(inputAmount, baseTokenSymbol);

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

  const [data, setData] = useState<{ seriesEntities: YieldSeriesEntityLendClose[] | undefined }>();

  // need to approve the associated series entity's fyToken
  const getApprovalParams = useCallback(
    (fyTokenAddress: Address): ApprovalBasicParams => ({
      tokenAddress: fyTokenAddress,
      spender: ladle!,
      approvalAmount: amount!,
    }),
    [amount, ladle]
  );

  const getSendParams = useCallback(
    async (seriesEntity: YieldGraphResSeriesEntity) => {
      const fyTokenAddress = seriesEntity.fyToken?.id;
      if (!fyTokenAddress) {
        console.error(`No fyToken found for series entity ${seriesEntity.id}`);
        return undefined;
      }
      const poolAddress = seriesEntity.fyToken?.pools[0].id;
      if (!poolAddress) {
        console.error(`No pool found for series entity ${seriesEntity.id}`);
        return undefined;
      }

      return await lendClose({
        amount: amount!,
        fyTokenAddress: fyTokenAddress as Address,
        poolAddress: poolAddress as Address,
        seriesEntityId: seriesEntity.id,
        seriesEntityIsMature: seriesEntity.maturity < NOW,
        isEthBase: tokenInIsETH,
      });
    },
    [amount, lendClose, tokenInIsETH]
  );

  useEffect(() => {
    // get the series entities using the graph
    (async () => {
      const _seriesEntities = graphResSeriesEntities?.seriesEntities;
      if (!_seriesEntities) return console.error('No series entities found');

      const seriesEntities = await Promise.all(
        _seriesEntities.map(async (s): Promise<YieldSeriesEntityLendClose> => {
          const maturity_ = nameFromMaturity(s.maturity);
          const fyTokenAddress = s.fyToken?.id;
          const poolAddress = s.fyToken?.pools[0].id;

          const fyTokenBalanceRes = await readContract({
            address: fyTokenAddress as Address,
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [account as Address],
          });
          const fyTokenBalance = formatUnits(fyTokenBalanceRes, tokenInToUse?.decimals);

          // estimate buying base with fyToken balance if before maturity (formatted)
          // if error estimating, there is likely not enough liquidity to close the position
          let baseValueOfBalance: string;
          if (s.maturity < NOW) {
            baseValueOfBalance = fyTokenBalance;
          } else {
            try {
              const res = await readContract({
                address: poolAddress as Address,
                abi: poolAbi,
                functionName: 'buyBasePreview',
                args: [fyTokenBalanceRes],
              });
              baseValueOfBalance = formatUnits(res, tokenInToUse?.decimals);
            } catch (e) {
              console.error(`Error estimating base value of fyToken balance: ${e}`);
              baseValueOfBalance = '0';
            }
          }

          const sendParams = await getSendParams(s);

          return {
            ...s,
            maturity_,
            sendParams,
            fyTokenBalance,
            baseValueOfBalance,
          };
        })
      );

      setData({ seriesEntities });
    })();
  }, [account, getSendParams, graphResSeriesEntities?.seriesEntities, tokenInToUse?.decimals]);
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
      {data?.seriesEntities?.length ? (
        <ResponseGrid className="grid gap-1">
          {data?.seriesEntities &&
            data.seriesEntities.map((s) => {
              return (
                <SingleItem
                  key={s.id}
                  item={s}
                  label={`Close Lend ${s.maturity_}`}
                  approvalParams={getApprovalParams(s.fyToken.id as Address)}
                  sendParams={s.sendParams}
                />
              );
            })}
        </ResponseGrid>
      ) : (
        <ResponseTitle>
          No closeable positions (likely due to liquidity constraints in Yield Protocol)
        </ResponseTitle>
      )}
    </>
  );
};

const SingleItem = ({
  item,
  label,
  approvalParams,
  sendParams,
}: {
  item: YieldSeriesEntityLendClose;
  label: string;
  approvalParams: ApprovalBasicParams | undefined;
  sendParams: UnsignedTransaction | undefined;
}) => {
  return +item.baseValueOfBalance > 0 && +item.fyTokenBalance > 0 ? (
    <SingleLineResponse tokenSymbol={item.baseAsset.symbol} className="flex justify-between">
      <div className="">
        <ResponseTitle>{item.maturity_}</ResponseTitle>
        <ResponseTitle>Current Balance: {item.baseValueOfBalance}</ResponseTitle>
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

export default YieldProtocolLendClose;
