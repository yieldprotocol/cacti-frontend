import { useCallback, useEffect, useMemo, useState } from 'react';
import { UnsignedTransaction, ethers } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils.js';
import request from 'graphql-request';
import useSWR from 'swr';
import { Address, useContractReads } from 'wagmi';
import {
  ActionResponse,
  HeaderResponse,
  SingleLineResponse,
  TextResponse,
} from '@/components/cactiComponents';
import { ResponseGrid, ResponseTitle } from '@/components/cactiComponents/helpers/layout';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
import useBalance from '@/components/cactiComponents/hooks/useBalance';
import SkeletonWrap from '@/components/shared/SkeletonWrap';
// CUSTOM IMPORTS
import useChainId from '@/hooks/useChainId';
import useToken from '@/hooks/useToken';
import { Spinner, cleanValue, toTitleCase } from '@/utils';
import poolAbi from '../../contracts/abis/Pool';
import contractAddresses, { ContractNames } from '../../contracts/config';
import useYieldProtocol from '../../hooks/useYieldProtocol';
import { nameFromMaturity } from '../../utils';
import { NOW, YieldGraphRes, YieldGraphResSeriesEntity } from '../lend/YieldProtocolLend';

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
        decimals
      }
      fyToken {
        id
        decimals
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
  const { isETH: tokenInIsETH } = useToken(baseTokenSymbol);
  const { data: tokenInToUse } = useToken(tokenInIsETH ? 'WETH' : baseTokenSymbol);
  const label = `
        ${toTitleCase(action)} ${
    inputAmount ?? 'all available'
  } ${baseTokenSymbol.toUpperCase()} on ${toTitleCase(projectName)}`;

  /***************INPUTS******************************************/
  // Yield Protocol specific spender handling
  const query = getQuery(tokenInToUse?.address!);

  // get series entities from the graph
  const { data, isLoading } = useSWR(
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
      <ResponseGrid className="grid w-full gap-1">
        {isLoading && <Spinner className="justify-self-center text-gray-300" />}
        {!isLoading &&
          data?.seriesEntities?.length &&
          data.seriesEntities.map((s) => {
            return <SingleItem amount={inputAmount} key={s.id} item={s} />;
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

const SingleItem = ({
  amount,
  item,
}: {
  amount: string | undefined;
  item: YieldGraphResSeriesEntity;
}) => {
  const { lendClose } = useYieldProtocol();
  const amountParsed = amount
    ? parseUnits(cleanValue(amount, item.baseAsset.decimals)!, item.baseAsset.decimals)
    : ethers.constants.Zero;
  const chainId = useChainId();
  const ladleAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);
  const fyTokenAddress = item.fyToken.id as Address;
  const poolAddress = item.fyToken.pools[0].id as Address;
  const { data: fyTokenBalance } = useBalance(fyTokenAddress);

  const { data } = useContractReads({
    contracts: [
      // estimate the base value of the fyToken balance
      {
        address: poolAddress,
        abi: poolAbi,
        functionName: 'sellFYTokenPreview',
        args: [fyTokenBalance || ethers.constants.Zero],
      },
      {
        // estimate the fyToken value of the inputted amount; if zero, we use all of the fyToken balance later
        address: poolAddress,
        abi: poolAbi,
        functionName: 'buyBasePreview',
        args: [amountParsed],
      },
      {
        // estimate the max base allowed into the pool, to assess trade limits/low liquidity environments
        address: poolAddress,
        abi: poolAbi,
        functionName: 'maxBaseOut',
      },
    ],
    enabled: !!fyTokenBalance && fyTokenBalance.gt(ethers.constants.Zero),
  });

  const maturity_ = nameFromMaturity(item.maturity);
  const baseValueOfBalance = data ? data[0] : undefined;
  const baseValueOfBalance_ = baseValueOfBalance
    ? formatUnits(baseValueOfBalance, item.baseAsset.decimals)
    : '0';

  // if no amount is specified, use all the fyToken balance
  const fyTokenValueOfBase = !amount ? fyTokenBalance : data ? data[1] : undefined;
  const maxBaseOut = data ? data[2] : undefined;

  const [sendParams, setSendParams] = useState<UnsignedTransaction>();

  // need to approve the associated series entity's fyToken
  const approvalParams = useMemo<ApprovalBasicParams | undefined>(() => {
    if (!fyTokenValueOfBase) {
      console.error('No fyToken value of base for approval');
      return;
    }
    return {
      tokenAddress: fyTokenAddress,
      spender: ladleAddress!,
      approvalAmount: fyTokenValueOfBase,
    };
  }, [fyTokenAddress, fyTokenValueOfBase, ladleAddress]);

  // use all base value of fyToken balance if no amount is specified
  const baseAmountToUse = amount ? amountParsed : baseValueOfBalance;
  // formatted
  const baseAmountToUse_ = baseAmountToUse
    ? formatUnits(baseAmountToUse, item.baseAsset.decimals)
    : '0';

  const getSendParams = useCallback(async () => {
    if (!fyTokenValueOfBase) {
      console.error('No fyToken value of base');
      return;
    }

    return await lendClose({
      fyTokenAmount: fyTokenValueOfBase,
      fyTokenAddress,
      poolAddress,
      seriesEntityId: item.id,
      seriesEntityIsMature: item.maturity < NOW,
      isEthBase: item.baseAsset.symbol === 'WETH',
    });
  }, [
    fyTokenAddress,
    fyTokenValueOfBase,
    item.baseAsset.symbol,
    item.id,
    item.maturity,
    poolAddress,
  ]);

  useEffect(() => {
    (async () => {
      if (fyTokenBalance?.gt(ethers.constants.Zero)) {
        const sendParams = await getSendParams();
        setSendParams(sendParams);
      }
    })();
  }, [fyTokenBalance, getSendParams]);

  return fyTokenBalance?.gt(ethers.constants.Zero) ? (
    <SingleLineResponse tokenSymbol={item.baseAsset.symbol} className="flex justify-between">
      <div className="">
        <ResponseTitle>{maturity_}</ResponseTitle>
        <ResponseTitle>
          Current Balance:{' '}
          {!baseValueOfBalance ? <SkeletonWrap width={10} /> : cleanValue(baseValueOfBalance_, 2)}{' '}
          {item.baseAsset.symbol}
        </ResponseTitle>
      </div>
      <div className="mx-2 my-auto">
        <ActionResponse
          label={
            maxBaseOut && baseAmountToUse?.gt(maxBaseOut)
              ? `Potentially not enough liquidity to close your position`
              : `Close ${cleanValue(baseAmountToUse_, 2)} ${item.baseAsset.symbol}`
          }
          approvalParams={approvalParams}
          sendParams={sendParams}
          txParams={undefined}
        />
      </div>
    </SingleLineResponse>
  ) : null;
};

export default YieldProtocolLendClose;
