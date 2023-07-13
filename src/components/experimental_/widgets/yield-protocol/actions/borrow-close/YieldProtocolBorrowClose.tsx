import { useCallback, useEffect, useMemo, useState } from 'react';
import { Contract, UnsignedTransaction } from 'ethers';
import request from 'graphql-request';
import useSWR from 'swr';
import { Address, useAccount, useContract, useProvider } from 'wagmi';
import { getContract, readContract } from 'wagmi/actions';
import { ActionResponse, HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import { ResponseGrid, ResponseTitle } from '@/components/cactiComponents/helpers/layout';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
// CUSTOM IMPORTS
import useChainId from '@/hooks/useChainId';
import useForkTools from '@/hooks/useForkTools';
import useToken from '@/hooks/useToken';
import { toTitleCase } from '@/utils';
import Cauldron from '../../contracts/abis/Cauldron';
import contractAddresses, { ContractNames } from '../../contracts/config';
import useYieldProtocol from '../../hooks/useYieldProtocol';
import { nameFromMaturity } from '../../utils';

interface YieldVault {
  sendParams: UnsignedTransaction | undefined;
  approvalParams: ApprovalBasicParams | undefined;
  id: `0x${string}`; // hex string
  borrowToken: string;
  collateralToken: string;
  maturity_: string;
}

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
    vaults: YieldVault[] | undefined;
  }>();

  const { borrowClose } = useYieldProtocol();

  const getApprovalParams = useCallback(() => {
    return undefined;
  }, []);

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
    const vaults = (await cauldron.queryFilter(filter, forkStartBlock)) as unknown as {
      args: {
        seriesId: `0x${string}`;
        vaultId: `0x${string}`;
      };
    }[];

    // filter for relevant series ids
    const filtered = vaults.filter(({ args }) =>
      seriesEntityIdsRes.seriesEntities.map((s) => s.id).includes(args.seriesId)
    );

    // only need the vault id
    return filtered.map(({ args }) => ({ id: args.vaultId, seriesId: args.seriesId }));
  }, [account, cauldron, forkStartBlock, seriesEntityIdsRes]);

  const getSendParams = useCallback(
    async (vaultId: `0x${string}`) => {
      return await borrowClose({
        vaultId,
      });
    },
    [borrowClose]
  );

  useEffect(() => {
    (async () => {
      // get the vaults
      (async () => {
        const _vaults = await getVaults();

        if (!_vaults) {
          console.error('No vault prelim vault data');
          return;
        }

        if (!cauldronAddress) {
          console.error('No cauldron address');
          return;
        }

        const vaults = await Promise.all(
          _vaults.map(async ({ id, seriesId }) => {
            const { maturity } = await readContract({
              address: cauldronAddress,
              abi: Cauldron,
              functionName: 'series',
              args: [seriesId],
            });

            const approvalParams = getApprovalParams();
            const sendParams = await getSendParams(id);
            console.log(
              '🦄 ~ file: YieldProtocolBorrowClose.tsx:158 ~ _vaults.map ~ sendParams:',
              sendParams
            );
            return {
              id,
              approvalParams,
              sendParams,
              borrowToken: borrowTokenSymbol,
              collateralToken: '',
              maturity_: nameFromMaturity(maturity),
            };
          })
        );
        console.log('🦄 ~ file: YieldProtocolBorrowClose.tsx:166 ~ vaults:', vaults);

        setData({ vaults });
      })();
    })();
  }, [borrowTokenSymbol, cauldronAddress, getApprovalParams, getSendParams, getVaults]);

  /***************INPUTS******************************************/

  return (
    <>
      <HeaderResponse text={label} projectName={projectName} />
      <ResponseGrid className="grid gap-1">
        {data?.vaults &&
          data.vaults.map((v) => {
            return (
              <SingleItem
                key={v.id}
                item={v}
                label={`Close Borrow ${v.maturity_}`}
                approvalParams={v.approvalParams}
                sendParams={v.sendParams}
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
  item: YieldVault;
  label: string;
  approvalParams: ApprovalBasicParams | undefined;
  sendParams: UnsignedTransaction | undefined;
}) => {
  return (
    <SingleLineResponse tokenSymbol={item.id} className="flex justify-between">
      <div className="mx-2 flex">
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
export default YieldProtocolBorrowClose;
