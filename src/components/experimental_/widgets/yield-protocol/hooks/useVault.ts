import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import request from 'graphql-request';
import useSWR from 'swr';
import { Address, erc20ABI, useContract } from 'wagmi';
import { multicall } from 'wagmi/actions';
import useChainId from '@/hooks/useChainId';
import useSigner from '@/hooks/useSigner';
import useToken from '@/hooks/useToken';
import { Token } from '@/types';
import Cauldron from '../contracts/abis/Cauldron';
import Ladle from '../contracts/abis/Ladle';
import Pool from '../contracts/abis/Pool';
import contractAddresses, { ContractNames } from '../contracts/config';
import { nameFromMaturity } from '../utils';

export interface YieldVault {
  id: `0x${string}`;
  owner: Address;
  ink: BigNumber;
  art: BigNumber;
  ink_: string;
  art_: string;
  accruedArt: BigNumber;
  accruedArt_: string;
  seriesId: `0x${string}`;
  ilkId: `0x${string}`;
  baseId: `0x${string}`;
  baseAddress: Address;
  decimals: number;
  seriesEntity: {
    id: `0x${string}`;
    fyTokenAddress: `0x${string}`;
    maturity: number;
    maturity_: string; // formatted

    isMature: boolean;
    maxBaseIn: BigNumber;
  };
  borrowToken?: Token;
  collateralToken?: Token;
  associatedJoinAddress: Address;
}

const useVault = ({ vaultId }: { vaultId: `0x${string}` }) => {
  const signer = useSigner();
  const chainId = useChainId();
  const cauldronAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.CAULDRON);
  const ladleAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);
  const cauldron = useContract({
    address: cauldronAddress,
    abi: Cauldron,
    signerOrProvider: signer,
  });

  const { getToken } = useToken();

  // using multicall cuz no types on `useContractReads` hook from wagmi in this wagmi version
  const getVault = async (): Promise<YieldVault> => {
    const [{ art, ink }, { owner, ilkId, seriesId }] = await multicall({
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

    const [{ fyToken: fyTokenAddress, baseId, maturity }, poolAddress] = await multicall({
      contracts: [
        { address: cauldronAddress!, abi: Cauldron, functionName: 'series', args: [seriesId] },
        { address: ladleAddress!, abi: Ladle, functionName: 'pools', args: [seriesId] },
      ],
    });

    const [baseAddress, associatedJoinAddress, maxBaseIn, decimals] = await multicall({
      contracts: [
        {
          address: cauldronAddress!,
          abi: Cauldron,
          functionName: 'assets',
          args: [baseId],
        },
        {
          address: ladleAddress!,
          abi: Ladle,
          functionName: 'joins',
          args: [baseId],
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
      ],
    });

    const accruedArt = (await cauldron?.callStatic.debtFromBase(
      seriesId,
      art
    )) as unknown as BigNumber; // TODO make more kosher

    // get ilk address
    const query = `{
        assets(where: {assetId: "${ilkId}"}) {
          id
          decimals
        }
      }`;

    const { data } = await request<{ data: { assets: { id: Address; decimals: number }[] } }>(
      'https://api.thegraph.com/subgraphs/name/yieldprotocol/v2-mainnet',
      query
    );

    const isMature = maturity <= Math.floor(Date.now() / 1000);
    const ilk = getToken(undefined, data.assets[0].id);
    const borrowToken = getToken(undefined, baseAddress);

    const vault: YieldVault = {
      id: vaultId,
      owner,
      ink,
      art,
      art_: formatUnits(art, decimals),
      accruedArt,
      accruedArt_: formatUnits(accruedArt, decimals),
      ink_: formatUnits(ink, ilk?.decimals),
      ilkId,
      baseId,
      baseAddress,
      borrowToken,
      collateralToken: ilk,
      associatedJoinAddress,
      decimals,
      seriesId,
      seriesEntity: {
        id: seriesId,
        fyTokenAddress,
        maturity,
        maturity_: nameFromMaturity(maturity),
        isMature,
        maxBaseIn,
      },
    };

    return vault;
  };

  // useing swr because no types on `useContractRead` hook from wagmi in this wagmi version
  const { data, isLoading, isValidating } = useSWR(['vault', chainId, vaultId], getVault, {
    revalidateIfStale: false,
  });

  // TODO error handling
  return { data, isLoading: isLoading || isValidating };
};

export default useVault;
