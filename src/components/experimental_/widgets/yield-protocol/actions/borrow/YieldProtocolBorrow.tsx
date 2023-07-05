import { useCallback, useEffect, useMemo, useState } from 'react';
import { BigNumber, UnsignedTransaction, ethers } from 'ethers';
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
  const query = getQuery(borrowTokenToUse?.address!); // TODO handle no or incompatible borrow token
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

  // TODO handle no or incompatible asset symbol
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

  const approvalParams = useMemo<ApprovalBasicParams | undefined>(() => {
    if (!collateralTokenToUse?.address) {
      console.error('No collateral token address');
      return undefined;
    }
    if (!joinAddress) {
      console.error('No join address');
      return undefined;
    }
    if (!_collateralAmount) {
      console.error('No collateral amount');
      return undefined;
    }

    return {
      tokenAddress: collateralTokenToUse?.address,
      spender: joinAddress,
      approvalAmount: _collateralAmount,
      skipApproval: collateralTokenIsEth,
    };
  }, [_collateralAmount, collateralTokenIsEth, collateralTokenToUse?.address, joinAddress]);

  const getMaxBorrowAmount = useCallback(async (poolAddress: Address, borrowAmount: BigNumber) => {
    try {
      const fyTokenOut = await readContract({
        address: poolAddress,
        abi: Pool,
        functionName: 'buyBasePreview',
        args: [borrowAmount],
      });

      return fyTokenOut.mul(101).div(100); // 1% slippage
    } catch (e) {
      console.log('🦄 ~ file: YieldProtocolBorrow.tsx:139 ~ e:', 'could not read buyBasePreview');
      return ethers.constants.Zero; // TODO not kosher;
    }
  }, []);

  const getSendParams = useCallback(
    async (seriesEntity: YieldGraphResSeriesEntity) => {
      if (!_borrowAmount) {
        console.error('No borrow amount');
        return undefined;
      }

      if (!_collateralAmount) {
        console.error('No collateral amount');
        return undefined;
      }

      if (!ilkId) {
        console.error(`No ilkId for ${collateralTokenSymbol}}`);
        return undefined;
      }

      const maxAmountToBorrow = await getMaxBorrowAmount(
        seriesEntity.fyToken?.pools[0]?.id as Address,
        _borrowAmount
      );

      return await borrow({
        borrowAmount: _borrowAmount,
        collateralAmount: _collateralAmount,
        seriesEntityId: seriesEntity.id,
        ilkId,
        borrowTokenIsEth,
        collateralTokenIsEth,
        maxAmountToBorrow,
      });
    },
    [
      _borrowAmount,
      _collateralAmount,
      borrow,
      borrowTokenIsEth,
      collateralTokenIsEth,
      collateralTokenSymbol,
      getMaxBorrowAmount,
      ilkId,
    ]
  );

  useEffect(() => {
    (async () => {
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
  }, [approvalParams, getSendParams, graphResSeriesEntities?.seriesEntities]);

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
                label={`Borrow ${s.maturity_}`}
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
