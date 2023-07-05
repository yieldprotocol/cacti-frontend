import { useCallback, useEffect, useMemo, useState } from 'react';
import { UnsignedTransaction, ethers } from 'ethers';
import request from 'graphql-request';
import useSWR from 'swr';
import { Address, useContractRead } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { ActionResponse, HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import { ResponseGrid, ResponseTitle } from '@/components/cactiComponents/helpers/layout';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
// CUSTOM IMPORTS
import useChainId from '@/hooks/useChainId';
import useInput from '@/hooks/useInput';
import useToken from '@/hooks/useToken';
import { cleanValue, toTitleCase } from '@/utils';
import Ladle from '../../contracts/abis/Ladle';
import Pool from '../../contracts/abis/Pool';
import contractAddresses, { ContractNames } from '../../contracts/config';
import useYieldProtocol from '../../hooks/useYieldProtocol';
import { nameFromMaturity } from '../../utils';
import {
  YieldGraphRes,
  YieldGraphResSeriesEntity,
  YieldSeriesEntity,
  getQuery,
} from '../lend/YieldProtocolLend';

interface YieldSeriesEntityBorrow extends YieldSeriesEntity {
  approvalParams: ApprovalBasicParams | undefined;
}

// should be generalized and only needed as reference once for all components
interface InputProps {
  borrowTokenSymbol: string;
  collateralTokenSymbol: string;
  borrowAmount: string;
  collateralAmount: string;
  action: string;
  projectName: string;
}

const YieldProtocolBorrow = ({
  borrowTokenSymbol,
  collateralTokenSymbol,
  borrowAmount,
  collateralAmount,
  action,
  projectName,
}: InputProps) => {
  /* generic hook usage (not to be touched when creating from example) */
  const chainId = useChainId();
  const { data: borrowToken, isETH: borrowTokenIsEth } = useToken(borrowTokenSymbol);
  const { data: borrowTokenToUse } = useToken(borrowTokenIsEth ? 'WETH' : borrowTokenSymbol);
  const { data: collateralToken, isETH: collateralTokenIsEth } = useToken(collateralTokenSymbol);
  const { data: collateralTokenToUse } = useToken(
    collateralTokenIsEth ? 'WETH' : collateralTokenSymbol
  );
  const label = `
        ${toTitleCase(
          action
        )} ${borrowAmount} ${borrowTokenSymbol} using ${collateralAmount} ${collateralTokenSymbol} on ${toTitleCase(
    projectName
  )}`;
  const { value: _borrowAmount } = useInput(borrowAmount, borrowToken?.symbol!);
  const { value: _collateralAmount } = useInput(collateralAmount, collateralToken?.symbol!);

  /***************INPUTS******************************************/

  // get cauldron address from contract addresses
  const [data, setData] = useState<{ seriesEntities: YieldSeriesEntityBorrow[] | undefined }>();

  const { borrow } = useYieldProtocol();
  const ladle = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);

  // get series entities from the graph
  const query = getQuery(borrowTokenToUse?.address!);
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

  const getAssetQuery = (symbol: string) => `
  {
    assets(where: {symbol: "${symbol}"}) {
      assetId
    }
  }
  `;

  const ilkQuery = getAssetQuery(collateralTokenToUse?.symbol!);
  const { data: graphResIlk } = useSWR(
    ['/yield-protocol/seriesEntities/ilk', ilkQuery],
    () =>
      request<{ assets: { assetId: string }[] }>(
        // only mainnet for now
        `https://api.thegraph.com/subgraphs/name/yieldprotocol/v2-mainnet`,
        ilkQuery
      ),
    {
      revalidateOnFocus: false,
    }
  );
  const ilkId = graphResIlk?.assets[0]?.assetId;
  const { data: joinAddress } = useContractRead({
    address: ladle!,
    abi: Ladle,
    functionName: 'joins',
    args: [ilkId as Address],
    enabled: !!ilkId,
  });

  const approvalParams = useMemo<ApprovalBasicParams>(
    () => ({
      tokenAddress: collateralToken?.address!,
      spender: joinAddress!,
      approvalAmount: _collateralAmount!,
      skipApproval: collateralTokenIsEth,
    }),
    [_collateralAmount, collateralToken?.address, collateralTokenIsEth, joinAddress]
  );

  const getMaxBorrowAmount = useCallback(
    async (poolAddress: Address) => {
      try {
        return await readContract({
          address: poolAddress,
          abi: Pool,
          functionName: 'buyBasePreview',
          args: [_borrowAmount!],
        });
      } catch (e) {
        console.log('🦄 ~ file: YieldProtocolBorrow.tsx:139 ~ e:', e);
        return ethers.constants.MaxInt256;
      }
    },
    [_borrowAmount]
  );

  const getSendParams = useCallback(
    async (seriesEntity: YieldGraphResSeriesEntity) => {
      const max = await getMaxBorrowAmount(seriesEntity.fyToken?.pools[0]?.id as Address);
      return await borrow({
        borrowAmount: _borrowAmount!,
        collateralAmount: _collateralAmount!,
        seriesEntityId: seriesEntity.id,
        ilkId: ilkId!,
        borrowTokenIsEth: borrowTokenIsEth,
        collateralTokenIsEth: collateralTokenIsEth,
        maxAmountToBorrow: max,
      });
    },
    [
      _borrowAmount,
      _collateralAmount,
      borrow,
      borrowTokenIsEth,
      collateralTokenIsEth,
      getMaxBorrowAmount,
      ilkId,
    ]
  );

  useEffect(() => {
    (async () => {
      if (!_borrowAmount) return console.error('borrow amount is undefined');
      if (!_collateralAmount) return console.error('collateral amount is undefined');
      if (!borrowToken) return console.error('borrow token is undefined');
      if (!collateralToken) return console.error('collateral token is undefined');
      if (!ilkId) {
        console.error(`No ilk found for collateral token ${collateralToken?.symbol}`);
        return undefined;
      }

      // get the series entities using the graph
      (async () => {
        const _seriesEntities = graphResSeriesEntities?.seriesEntities;
        if (!_seriesEntities) return console.error('No series entities found');

        const seriesEntities = await Promise.all(
          _seriesEntities.map(async (s): Promise<YieldSeriesEntityBorrow> => {
            const maturity_ = nameFromMaturity(s.maturity);
            const sendParams = await getSendParams(s);
            return {
              ...s,
              maturity_,
              sendParams,
              approvalParams,
            };
          })
        );

        setData({ seriesEntities });
      })();
    })();
  }, [
    _borrowAmount,
    _collateralAmount,
    approvalParams,
    borrowToken,
    collateralToken,
    getSendParams,
    graphResSeriesEntities?.seriesEntities,
    ilkId,
  ]);

  /***************INPUTS******************************************/

  // TODO handle generic weird inputs

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
                approvalParams={s.approvalParams}
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
  return (
    <SingleLineResponse tokenSymbol={item.baseAsset.symbol} className="flex justify-between">
      <div className="mx-2 flex">
        <ResponseTitle>{cleanValue(item.fyToken.pools[0].borrowAPR, 1)}% APR</ResponseTitle>
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
export default YieldProtocolBorrow;
