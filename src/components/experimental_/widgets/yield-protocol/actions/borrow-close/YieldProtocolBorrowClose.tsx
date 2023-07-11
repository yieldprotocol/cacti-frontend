import { useCallback, useEffect, useMemo, useState } from 'react';
import { UnsignedTransaction, ethers } from 'ethers';
import request from 'graphql-request';
import useSWR from 'swr';
import { Address, useContractRead } from 'wagmi';
import { ActionResponse, HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import { ResponseGrid, ResponseTitle } from '@/components/cactiComponents/helpers/layout';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
// CUSTOM IMPORTS
import useChainId from '@/hooks/useChainId';
import useToken from '@/hooks/useToken';
import { cleanValue, toTitleCase } from '@/utils';
import Ladle from '../../contracts/abis/Ladle';
import contractAddresses, { ContractNames } from '../../contracts/config';
import useYieldProtocol from '../../hooks/useYieldProtocol';
import { nameFromMaturity } from '../../utils';
import {
  YieldGraphRes,
  YieldGraphResSeriesEntity,
  YieldSeriesEntity,
} from '../lend/YieldProtocolLend';

interface YieldSeriesEntityBorrowClose extends YieldSeriesEntity {
  approvalParams: ApprovalBasicParams | undefined;
}

interface YieldVault {
  id: string;
  seriesEntity: YieldSeriesEntityBorrowClose;
}

// should be generalized and only needed as reference once for all components
interface InputProps {
  borrowTokenSymbol: string;
  action: string;
  projectName: string;
}

const getQuery = (address: string) =>
  `
  {
    seriesEntities(
      where: {baseAsset_contains_nocase: "${address}"
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

const YieldProtocolBorrow = ({ borrowTokenSymbol, action, projectName }: InputProps) => {
  /* generic hook usage (not to be touched when creating from example) */
  const chainId = useChainId();
  const { data: borrowToken, isETH: borrowTokenIsEth } = useToken(borrowTokenSymbol);
  const { data: borrowTokenToUse } = useToken(borrowTokenIsEth ? 'WETH' : borrowTokenSymbol);
  // get the collateral token symbol from the vault
  const { data: collateralToken, isETH: collateralTokenIsEth } = useToken(collateralTokenSymbol);
  const { data: collateralTokenToUse } = useToken(
    collateralTokenIsEth ? 'WETH' : collateralTokenSymbol
  );
  const label = `
        ${toTitleCase(action)} ${borrowTokenSymbol} borrow position on ${toTitleCase(projectName)}`;

  /***************INPUTS******************************************/

  const [data, setData] = useState<{
    vaults: YieldVault[] | undefined;
  }>();

  const { borrowClose } = useYieldProtocol();
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

  const approvalParams = useMemo<ApprovalBasicParams | undefined>(() => {}, []);

  const getSendParams = useCallback(
    async (vault: YieldVault) => {
      return await borrowClose({
        vaultId: vault.id,
      });
    },
    [borrowClose, borrowTokenIsEth, collateralTokenIsEth]
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
