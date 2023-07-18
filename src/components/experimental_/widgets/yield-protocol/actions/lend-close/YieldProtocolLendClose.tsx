import { useCallback, useEffect, useMemo, useState } from 'react';
import { UnsignedTransaction, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
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
import useBalance from '@/hooks/useBalance';
// CUSTOM IMPORTS
import useChainId from '@/hooks/useChainId';
import useInput from '@/hooks/useInput';
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
  const amountParsed = useInput(amount || '0', item.baseAsset.symbol);
  const chainId = useChainId();
  const ladleAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);
  const fyTokenAddress = item.fyToken.id as Address;
  const poolAddress = item.fyToken.pools[0].id as Address;
  const { data: fyTokenBalance } = useBalance(item.fyToken.id);

  // if no amount specified, use all of the available fyToken balance
  const amountToUse =
    !amount && fyTokenBalance ? fyTokenBalance : amountParsed.value || ethers.constants.Zero;
  const amountToUse_ = amountToUse ? formatUnits(amountToUse, item.fyToken.decimals) : '0';

  const { data } = useContractReads({
    contracts: [
      // estimate buying base with fyToken balance if before maturity (formatted)
      {
        address: poolAddress,
        abi: poolAbi,
        functionName: 'buyBasePreview',
        args: [fyTokenBalance!],
      },
      {
        // estimate the fyToken value of the inputted amount
        address: poolAddress!,
        abi: poolAbi,
        functionName: 'buyFYTokenPreview',
        args: [amountToUse],
      },
    ],
  });

  const maturity_ = nameFromMaturity(item.maturity);
  const baseValueOfBalance = data ? data[0] : undefined;
  const baseValueOfBalance_ = baseValueOfBalance
    ? formatUnits(baseValueOfBalance, item.baseAsset.decimals)
    : '0';
  const fyTokenValueOfBase = data ? data[1] : undefined;

  const [sendParams, setSendParams] = useState<UnsignedTransaction>();

  // need to approve the associated series entity's fyToken
  const approvalParams = useMemo<ApprovalBasicParams>(
    () => ({
      tokenAddress: fyTokenAddress,
      spender: ladleAddress!,
      approvalAmount: fyTokenValueOfBase
        ? fyTokenValueOfBase.mul(101).div(100)
        : ethers.constants.Zero, // 1% buffer for moving interest: TODO figure out better way
    }),
    [fyTokenAddress, fyTokenValueOfBase, ladleAddress]
  );

  const getSendParams = useCallback(async () => {
    if (!fyTokenValueOfBase) {
      console.error('No fyToken value of base');
      return undefined;
    }

    return await lendClose({
      fyTokenAmount: fyTokenValueOfBase ?? ethers.constants.Zero,
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
      const sendParams = await getSendParams();
      setSendParams(sendParams);
    })();
  }, [getSendParams]);

  return amountToUse.gt(ethers.constants.Zero) && baseValueOfBalance ? (
    <SingleLineResponse tokenSymbol={item.baseAsset.symbol} className="flex justify-between">
      <div className="">
        <ResponseTitle>{maturity_}</ResponseTitle>
        <ResponseTitle>
          Current Balance: {cleanValue(baseValueOfBalance_, 2)} {item.baseAsset.symbol}
        </ResponseTitle>
      </div>
      <div className="mx-2 my-auto">
        <ActionResponse
          label={`Close ${cleanValue(amountToUse_, 2)} ${item.baseAsset.symbol}`}
          approvalParams={approvalParams}
          sendParams={sendParams}
          txParams={undefined}
        />
      </div>
    </SingleLineResponse>
  ) : null;
};

export default YieldProtocolLendClose;
