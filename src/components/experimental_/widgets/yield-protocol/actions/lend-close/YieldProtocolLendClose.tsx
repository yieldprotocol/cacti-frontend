import { useCallback, useEffect, useState } from 'react';
import { fy } from 'date-fns/locale';
import { BigNumber, UnsignedTransaction, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import request from 'graphql-request';
import useSWR from 'swr';
import { Address, erc20ABI, readContracts, useAccount } from 'wagmi';
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
import { Spinner, cleanValue, toTitleCase } from '@/utils';
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
  approvalParams: ApprovalBasicParams;
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
  const { data: graphResSeriesEntities, isLoading } = useSWR(
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
    ({
      fyTokenAddress,
      approvalAmount,
    }: {
      fyTokenAddress: Address;
      approvalAmount: BigNumber;
    }): ApprovalBasicParams => ({
      tokenAddress: fyTokenAddress,
      spender: ladle!,
      approvalAmount,
    }),
    [ladle]
  );

  const getSendParams = useCallback(
    async ({
      seriesEntity,
      fyTokenAmount,
    }: {
      seriesEntity: YieldGraphResSeriesEntity;
      fyTokenAmount: BigNumber;
    }) => {
      const fyTokenAddress = seriesEntity.fyToken?.id as Address | undefined;
      if (!fyTokenAddress) {
        console.error(`No fyToken found for series entity ${seriesEntity.id}`);
        return undefined;
      }
      const poolAddress = seriesEntity.fyToken?.pools[0].id as Address | undefined;
      if (!poolAddress) {
        console.error(`No pool found for series entity ${seriesEntity.id}`);
        return undefined;
      }

      if (!amount) {
        console.error(`No amount found for series entity ${seriesEntity.id}`);
        return undefined;
      }

      return await lendClose({
        fyTokenAmount,
        fyTokenAddress,
        poolAddress,
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
          const fyTokenAddress = s.fyToken?.id as Address | undefined;
          const poolAddress = s.fyToken?.pools[0].id as Address | undefined;

          const fyTokenBalanceRes = await readContract({
            address: fyTokenAddress!,
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [account as Address],
          });
          const fyTokenBalance = formatUnits(fyTokenBalanceRes, tokenInToUse?.decimals);

          // estimate buying base with fyToken balance if before maturity (formatted)
          // if error estimating, there is likely not enough liquidity to close the position
          let baseValueOfBalance: string;
          // estimate the fyToken value of the inputted amount
          let fyTokenAmount: BigNumber;
          if (s.maturity < NOW) {
            baseValueOfBalance = fyTokenBalance;
            fyTokenAmount = amount!;
          } else {
            try {
              const [baseValueOfBalanceRes, fyTokenAmountRes] = await readContracts({
                contracts: [
                  {
                    address: poolAddress!,
                    abi: poolAbi,
                    functionName: 'buyBasePreview',
                    args: [fyTokenBalanceRes],
                  },
                  {
                    address: poolAddress!,
                    abi: poolAbi,
                    functionName: 'buyFYTokenPreview',
                    args: [amount!],
                  },
                ],
              });
              baseValueOfBalance = formatUnits(baseValueOfBalanceRes, tokenInToUse?.decimals);
              fyTokenAmount = fyTokenAmountRes;
            } catch (e) {
              console.error(`Error estimating base value of fyToken balance: ${e}`);
              baseValueOfBalance = '0';
              fyTokenAmount = ethers.constants.Zero;
            }
          }

          const sendParams = await getSendParams({ seriesEntity: s, fyTokenAmount });
          const approvalParams = getApprovalParams({
            fyTokenAddress: fyTokenAddress!,
            approvalAmount: fyTokenAmount.mul(110).div(100), // 10% buffer for moving interest: TODO figure out better way
          });

          return {
            ...s,
            maturity_,
            approvalParams,
            sendParams,
            fyTokenBalance,
            baseValueOfBalance,
          };
        })
      );

      setData({ seriesEntities });
    })();
  }, [
    account,
    amount,
    getApprovalParams,
    getSendParams,
    graphResSeriesEntities?.seriesEntities,
    tokenInToUse?.decimals,
  ]);
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
        {isLoading && <Spinner />}
        {!isLoading &&
          data?.seriesEntities?.length &&
          data.seriesEntities.map((s) => {
            return <SingleItem key={s.id} item={s} label={`Close Lend ${s.maturity_}`} />;
          })}

        {!isLoading && !data?.seriesEntities?.length && (
          <ResponseTitle>
            No closeable positions (likely due to liquidity constraints in Yield Protocol)
          </ResponseTitle>
        )}
      </ResponseGrid>
    </>
  );
};

const SingleItem = ({ item, label }: { item: YieldSeriesEntityLendClose; label: string }) => {
  return +item.baseValueOfBalance > 0 && +item.fyTokenBalance > 0 ? (
    <SingleLineResponse tokenSymbol={item.baseAsset.symbol} className="flex justify-between">
      <div className="">
        <ResponseTitle>{item.maturity_}</ResponseTitle>
        <ResponseTitle>Current Balance: {cleanValue(item.baseValueOfBalance, 2)}</ResponseTitle>
      </div>
      <div className="mx-2 my-auto">
        <ActionResponse
          label={label}
          approvalParams={item.approvalParams}
          sendParams={item.sendParams}
          txParams={undefined}
        />
      </div>
    </SingleLineResponse>
  ) : null;
};

export default YieldProtocolLendClose;
