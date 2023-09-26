//@ts-nocheck
import { useCallback, useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import request from 'graphql-request';
import useSWR from 'swr';
import { TransactionBase } from 'viem';
import { useAccount, usePublicClient } from 'wagmi';
import { ActionResponse, HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import { ResponseGrid } from '@/components/cactiComponents/helpers/layout';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
// CUSTOM IMPORTS
import useChainId from '@/hooks/useChainId';
import useForkTools from '@/hooks/useForkTools';
import useToken from '@/hooks/useToken';
import { cleanValue, toTitleCase } from '@/utils';
import Cauldron from '../../contracts/abis/Cauldron';
import contractAddresses, { ContractNames } from '../../contracts/config';
import useVault from '../../hooks/useVault';
import useYieldProtocol from '../../hooks/useYieldProtocol';

// should be generalized and only needed as reference once for all components
interface InputProps {
  borrowTokenSymbol: string;
  action: string;
  projectName: string;
}

export const getQuery = (address: string) =>
  `
  {
    seriesEntities(
      where: {baseAsset_contains_nocase: "${address}"}
    ) {
      id
    }
  } 
  `;

const YieldProtocolBorrowClose = ({ borrowTokenSymbol, action, projectName }: InputProps) => {
  /* generic hook usage (not to be touched when creating from example) */
  const chainId = useChainId();
  const publicClient = usePublicClient();

  const { address: account } = useAccount();
  const { isETH: borrowTokenIsEth } = useToken(borrowTokenSymbol);
  const { data: borrowTokenToUse } = useToken(borrowTokenIsEth ? 'WETH' : borrowTokenSymbol);
  const label = `
        ${toTitleCase(action)} ${borrowTokenSymbol} borrow position on ${toTitleCase(projectName)}`;
  const { forkStartBlock } = useForkTools();

  /***************INPUTS******************************************/

  const [data, setData] = useState<{
    vaults:
      | {
          id: `0x${string}` | undefined;
        }[]
      | undefined;
  }>();

  const { borrowClose } = useYieldProtocol();

  // get relevant series based on borrow token address
  const query = useMemo(() => getQuery(borrowTokenToUse?.address!), [borrowTokenToUse?.address]);
  const { data: seriesEntityIdsRes } = useSWR<{ seriesEntities: { id: `0x${string}` }[] }>(
    borrowTokenToUse?.address ? query : null,
    () => request(`https://api.thegraph.com/subgraphs/name/yieldprotocol/v2-mainnet`, query),
    { revalidateOnFocus: false }
  );

  const cauldronAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.CAULDRON);

  const getVaults = useCallback(async () => {
    if (!seriesEntityIdsRes) {
      console.error('No series entity ids');
      return;
    }

    if (!account) {
      console.error('No account');
      return;
    }

    // get relevant vaults based on series ids
    const filter = await publicClient.createContractEventFilter({
      address: cauldronAddress,
      abi: Cauldron,
      eventName: 'VaultBuilt',
      args: {
        vaultId: null,
        owner: account,
        seriesId: null,
      },
      fromBlock: BigInt(forkStartBlock?.toString() || 0),
    });

    const vaultLogs = await publicClient.getFilterLogs({ filter });

    // filter for relevant series ids
    const filtered = vaultLogs.filter(({ args }) =>
      seriesEntityIdsRes.seriesEntities.map((s) => s.id).includes(args.seriesId!)
    );

    // only need the vault id
    return filtered.map(({ args }) => ({ id: args.vaultId, seriesId: args.seriesId }));
  }, [account, cauldronAddress, forkStartBlock, publicClient, seriesEntityIdsRes]);

  useEffect(() => {
    (async () => {
      // get the vaults
      (async () => {
        const vaults = await getVaults();

        if (!vaults) {
          console.error('No vault prelim vault data');
          return;
        }

        setData({ vaults });
      })();
    })();
  }, [getVaults]);

  /***************INPUTS******************************************/
  return (
    <>
      <HeaderResponse text={label} projectName={projectName} />
      <ResponseGrid className="grid gap-1">
        {data?.vaults?.length &&
          data.vaults.map((v) => {
            return v.id ? <SingleVault key={v.id} vaultId={v.id} /> : null;
          })}
      </ResponseGrid>
    </>
  );
};

const SingleVault = ({ vaultId }: { vaultId: `0x${string}` }) => {
  const chainId = useChainId();
  const { borrowClose } = useYieldProtocol();
  const { data: vault, isLoading } = useVault({ vaultId });
  const [sendParams, setSendParams] = useState<TransactionBase>();
  const label = `Close Borrow ${vault?.seriesEntity.maturity_}`;

  const ladleAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);

  const approvalParams = useMemo((): ApprovalBasicParams | undefined => {
    if (!vault) {
      console.error('No vault yet in vault item');
      return;
    }

    if (!ladleAddress) {
      console.error('No ladle address');
      return;
    }

    if (!vault.accruedArt) {
      return;
    }

    return {
      spender: ladleAddress,
      approvalAmount: (BigInt(vault?.accruedArt.toString()) * BigInt(110)) / BigInt(100), // 10% buffer: TODO make more kosher
      tokenAddress: vault.borrowToken?.address!,
    };
  }, [ladleAddress, vault]);

  // TODO impr
  const activeVault = useMemo(
    () =>
      BigInt(vault.art?.toString() || '0') > BigInt(0) ||
      BigInt(vault.ink?.toString() || '0') > BigInt(0),
    [vault]
  );

  return isLoading ? (
    <Skeleton />
  ) : activeVault ? (
    <SingleLineResponse tokenSymbol={vault.borrowToken?.symbol} className="flex justify-between">
      <div className="">
        <div>
          {cleanValue(vault.accruedArt_, 3)} {vault.borrowToken?.symbol} Debt
        </div>
        <div>
          {cleanValue(vault.ink_, 2)} {vault.collateralToken?.symbol} Collateral
        </div>
      </div>
      <div className="mx-2 flex">
        <ActionResponse
          label={label}
          approvalParams={approvalParams}
          sendParams={borrowClose({ vault })}
          txParams={undefined}
          skipBalanceCheck={vault.borrowToken?.symbol === 'WETH'}
        />
      </div>
    </SingleLineResponse>
  ) : null;
};
export default YieldProtocolBorrowClose;
