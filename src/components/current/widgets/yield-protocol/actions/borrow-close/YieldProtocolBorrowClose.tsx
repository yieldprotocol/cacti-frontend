//@ts-nocheck
import { useCallback, useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { UnsignedTransaction, ethers } from 'ethers';
import request from 'graphql-request';
import useSWR from 'swr';
import { useAccount, useContract, useProvider } from 'wagmi';
import { ActionResponse, HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import { ResponseGrid } from '@/components/cactiComponents/helpers/layout';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
import SettingsContext from '@/contexts/SettingsContext';
// CUSTOM IMPORTS
import useChainId from '@/hooks/useChainId';
import useForkTools from '@/hooks/useForkTools';
import useToken from '@/hooks/useToken';
import { cleanValue, toTitleCase } from '@/utils';
import Cauldron from '../../contracts/abis/Cauldron';
import contractAddresses, { ContractNames } from '../../contracts/config';
import useVault, { YieldVault } from '../../hooks/useVault';
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
  const { address: account } = useAccount();
  const { data: borrowToken, isETH: borrowTokenIsEth } = useToken(borrowTokenSymbol);
  const { data: borrowTokenToUse } = useToken(borrowTokenIsEth ? 'WETH' : borrowTokenSymbol);
  const provider = useProvider();
  const label = `
        ${toTitleCase(action)} ${borrowTokenSymbol} borrow position on ${toTitleCase(projectName)}`;
  const { forkStartBlock } = useForkTools();

  /***************INPUTS******************************************/

  const [data, setData] = useState<{
    vaults:
      | {
          id: `0x${string}`;
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
  // cauldron ethers contract
  const cauldron = useContract({
    address: cauldronAddress!,
    abi: Cauldron,
    signerOrProvider: provider,
  });

  const getVaults = useCallback(async () => {
    if (!seriesEntityIdsRes) {
      console.error('No series entity ids');
      return;
    }

    if (!account) {
      console.error('No account');
      return;
    }

    // get cauldron
    if (!cauldron) {
      console.error('No cauldron');
      return;
    }

    // get relevant vaults based on series ids
    const filter = cauldron.filters.VaultBuilt(null, account, null, null);
    let vaults = undefined;

    try {
      vaults = (await cauldron.queryFilter(filter, forkStartBlock)) as unknown as {
        args: { seriesId: `0x${string}`; vaultId: `0x${string}` };
      }[];
    } catch (e) {
      console.log('🦄 ~ file: YieldProtocolBorrowClose.tsx:104 ~ getVaults ~ e:', e);
      return;
    }

    // filter for relevant series ids
    const filtered = vaults.filter(({ args }) =>
      seriesEntityIdsRes.seriesEntities.map((s) => s.id).includes(args.seriesId)
    );

    // only need the vault id
    return filtered.map(({ args }) => ({ id: args.vaultId, seriesId: args.seriesId }));
  }, [account, cauldron, forkStartBlock, seriesEntityIdsRes]);

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
            return <SingleVault key={v.id} vaultId={v.id} />;
          })}
      </ResponseGrid>
    </>
  );
};

const SingleVault = ({ vaultId }: { vaultId: `0x${string}` }) => {
  const chainId = useChainId();
  const { borrowClose } = useYieldProtocol();
  const { data: vault, isLoading } = useVault({ vaultId });
  const [sendParams, setSendParams] = useState<UnsignedTransaction>();
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
      approvalAmount: vault?.accruedArt.mul(110).div(100), // 10% buffer: TODO make more kosher
      tokenAddress: vault.borrowToken?.address!,
    };
  }, [ladleAddress, vault]);

  const activeVault = useMemo(
    () => vault.art?.gt(ethers.constants.Zero) || vault.ink?.gt(ethers.constants.Zero),
    [vault]
  );

  useEffect(() => {
    (async () => {
      if (!activeVault) return;
      const sendParams = await borrowClose({ vault });
      setSendParams(sendParams);
    })();
  }, [activeVault, vault]); // intentionally not including borrowClose cuz of infinite render issue; TODO make more kosher

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
          sendParams={sendParams}
          txParams={undefined}
          skipBalanceCheck={vault.borrowToken?.symbol === 'WETH'}
        />
      </div>
    </SingleLineResponse>
  ) : null;
};
export default YieldProtocolBorrowClose;
