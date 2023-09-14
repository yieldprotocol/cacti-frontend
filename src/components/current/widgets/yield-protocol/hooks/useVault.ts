import { useMemo } from 'react';
import useSWR from 'swr';
import { formatUnits } from 'viem';
import { Address, erc20ABI, useContractReads, usePublicClient } from 'wagmi';
import useChainId from '@/hooks/useChainId';
import useToken from '@/hooks/useToken';
import { Token } from '@/types';
import Cauldron from '../contracts/abis/Cauldron';
import Ladle from '../contracts/abis/Ladle';
import Pool from '../contracts/abis/Pool';
import contractAddresses, { ContractNames } from '../contracts/config';
import { nameFromMaturity } from '../utils';

export interface YieldVault {
  id: `0x${string}`;
  owner: Address | undefined;
  ink: bigint | undefined;
  art: bigint | undefined;
  ink_: string | undefined;
  art_: string | undefined;
  accruedArt: bigint | undefined;
  accruedArt_: string | undefined;
  seriesId: `0x${string}` | undefined;
  ilkId: `0x${string}` | undefined;
  baseId: `0x${string}` | undefined;
  baseAddress: Address | undefined;
  decimals: number | undefined;
  poolAddress: Address | undefined;
  seriesEntity: {
    id: `0x${string}` | undefined;
    fyTokenAddress: `0x${string}` | undefined;
    maturity: number | undefined;
    maturity_: string | undefined; // formatted

    isMature: boolean | undefined;
    maxBaseIn: bigint | undefined;
  };
  borrowToken: Token | undefined;
  collateralToken: Token | undefined;
  associatedJoinAddress: Address | undefined;
}

const useVault = ({ vaultId }: { vaultId: `0x${string}` }) => {
  const publicClient = usePublicClient();
  const chainId = useChainId();
  const cauldronAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.CAULDRON);
  const ladleAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);

  const { data: vault, isLoading: vaultIsLoading } = useContractReads({
    contracts: [
      {
        address: cauldronAddress!,
        abi: Cauldron,
        functionName: 'balances',
        args: [vaultId],
      },
      {
        address: cauldronAddress!,
        abi: Cauldron,
        functionName: 'vaults',
        args: [vaultId],
      },
    ],
  });

  const [art, ink] = vault![0].result ?? [];
  const _vaults = vault![1].result;
  const [owner, seriesId, ilkId] = _vaults ?? [];

  const { data: seriesData, isLoading: seriesDataIsLoading } = useContractReads({
    contracts: [
      { address: cauldronAddress!, abi: Cauldron, functionName: 'series', args: [seriesId!] },
      { address: ladleAddress!, abi: Ladle, functionName: 'pools', args: [seriesId!] },
    ],
  });

  const [fyTokenAddress, baseId, maturity] = seriesData![0].result ?? [];
  const poolAddress = seriesData![1].result;

  const { data: extra, isLoading: extrasIsLoading } = useContractReads({
    contracts: [
      {
        address: cauldronAddress,
        abi: Cauldron,
        functionName: 'assets',
        args: [baseId!],
      },
      {
        address: ladleAddress,
        abi: Ladle,
        functionName: 'joins',
        args: [baseId!],
      },
      {
        address: poolAddress,
        abi: Pool,
        functionName: 'maxBaseIn',
      },
      {
        address: fyTokenAddress,
        abi: erc20ABI,
        functionName: 'decimals',
      },
      {
        address: cauldronAddress,
        abi: Cauldron,
        functionName: 'assets',
        args: [ilkId!],
      },
    ],
  });

  // TODO: is there a better way? and handle types not returning from contract
  const baseAddress = extra![0].result as Address | undefined;
  const associatedJoinAddress = extra![1].result as Address | undefined;
  const maxBaseIn = extra![2].result as bigint | undefined;
  const decimals = extra![3].result as number | undefined;
  const ilkAddress = extra![4].result as Address | undefined;

  const { data: borrowToken } = useToken(undefined, baseAddress);
  const { data: collateralToken } = useToken(undefined, ilkAddress);

  // get accrued art using swr
  const { data: accruedArt } = useSWR(['accruedArt', chainId, vaultId], async () => {
    const { result } = await publicClient.simulateContract({
      address: cauldronAddress!,
      abi: Cauldron,
      functionName: 'debtToBase',
      args: [seriesId!, art!],
    });
    return result;
  });

  const data = useMemo<YieldVault>(
    () => ({
      id: vaultId,
      owner,
      ink,
      art,
      art_: art ? formatUnits(art, decimals!) : undefined,
      accruedArt,
      accruedArt_: accruedArt ? formatUnits(accruedArt, decimals!) : undefined,
      ink_: ink ? formatUnits(ink, collateralToken?.decimals!) : undefined,
      ilkId,
      baseId,
      baseAddress,
      borrowToken,
      collateralToken,
      associatedJoinAddress,
      decimals,
      seriesId,
      poolAddress,
      seriesEntity: {
        id: seriesId,
        fyTokenAddress,
        maturity,
        maturity_: maturity ? nameFromMaturity(maturity) : undefined,
        isMature: maturity ? maturity <= Math.floor(Date.now() / 1000) : undefined,
        maxBaseIn,
      },
    }),
    [
      accruedArt,
      art,
      associatedJoinAddress,
      baseAddress,
      baseId,
      borrowToken,
      collateralToken,
      decimals,
      fyTokenAddress,
      ilkId,
      ink,
      maturity,
      maxBaseIn,
      owner,
      poolAddress,
      seriesId,
      vaultId,
    ]
  );

  // TODO error handling
  return {
    data,
    isLoading: vaultIsLoading || seriesDataIsLoading || extrasIsLoading,
  };
};

export default useVault;
