import { ethers } from 'ethers';
import { Address } from 'wagmi';
import { getWrapEthCallData } from '../../helpers';
import { LadleActions, ModuleActions } from '../../operations';

export const BLANK_VAULT = '0x000000000000000000000000';

const borrow = async (
  account: Address,
  input: string | undefined,
  collInput: string | undefined
) => {
  const vaultId = BLANK_VAULT;
  const ladleAddress = contracts.get(ContractNames.LADLE)?.address;

  /* Set the series and ilk based on the vault that has been selected or if it's a new vault, get from the globally selected SeriesId */
  const series: ISeries = vault ? seriesMap?.get(vault.seriesId)! : selectedSeries!;
  const base: IAsset = assetMap?.get(series.baseId)!;

  const ilkToUse: IAsset = vault
    ? assetMap?.get(vault.ilkId)!
    : assetMap?.get(selectedIlk?.proxyId!)!; // note: we use the wrapped version if required

  /* is ETH  used as collateral */
  const isEthCollateral = ETH_BASED_ASSETS.includes(selectedIlk?.proxyId!);
  /* is ETH being Borrowed   */
  const isEthBase = ETH_BASED_ASSETS.includes(series.baseId);

  /* is convex-type collateral */
  const isConvexCollateral = CONVEX_BASED_ASSETS.includes(selectedIlk?.proxyId!);
  const ConvexLadleModuleContract = contracts.get(
    ContractNames.CONVEX_LADLE_MODULE
  ) as ConvexLadleModule;

  /* parse inputs  (clean down to base/ilk decimals so that there is never an underlow)  */
  const cleanInput = cleanValue(input, base.decimals);
  const _input = input ? ethers.utils.parseUnits(cleanInput, base.decimals) : ethers.constants.Zero;
  const cleanCollInput = cleanValue(collInput, ilkToUse.decimals);
  const _collInput = collInput
    ? ethers.utils.parseUnits(cleanCollInput, ilkToUse.decimals)
    : ethers.constants.Zero;

  const _expectedFyToken = buyBase(
    series.sharesReserves,
    series.fyTokenReserves,
    series.getShares(_input), // convert input in base to shares
    getTimeTillMaturity(series.maturity),
    series.ts,
    series.g2,
    series.decimals,
    series.c,
    series.mu
  );
  const _expectedFyTokenWithSlippage = calculateSlippage(
    _expectedFyToken,
    slippageTolerance.toString()
  );

  /* if approveMAx, check if signature is required : note: getAllowance may return FALSE if ERC1155 */
  const _allowance = await ilkToUse.getAllowance(account!, ilkToUse.joinAddress);

  const alreadyApproved = ethers.BigNumber.isBigNumber(_allowance)
    ? _allowance.gte(_collInput)
    : _allowance;
  console.log('Already approved', alreadyApproved);

  /* handle ETH deposit as Collateral, if required (only if collateral used is ETH-based ), else send ZERO_BN */
  const addEthCallData = getWrapEthCallData(,isEthBase ? _collInput : ethers.constants.Zero);

  /* handle remove/unwrap WETH > if ETH is what is being borrowed */
  const removeEthCallData: ICallData[] = removeEth(isEthBase ? ONE_BN : ZERO_BN); // (exit_ether sweeps all the eth out the ladle, so exact amount is not importnat -> just greater than zero)

  /* if ETH is being borrowed, send the borrowed tokens (WETH) to ladle for unwrapping */
  const serveToAddress = () => {
    if (isEthBase) return ladleAddress;
    // if ( wrapping  ) return wrapHandler
    return account;
  };

  /**
   *
   * Collate all the calls required for the process (including depositing ETH, signing permits, and building vault if needed)
   *
   * */
  const calls: ICallData[] = [
    /* add in the ETH deposit if required */
    ...addEthCallData,

    /* If vault is null, build a new vault, else ignore */
    {
      operation: LadleActions.Fn.BUILD,
      args: [selectedSeries?.id, ilkToUse.id, '0'] as LadleActions.Args.BUILD,
      ignoreIf: false,
    },

    /* If convex-type collateral, add vault using convex ladle module */
    {
      operation: LadleActions.Fn.MODULE,
      fnName: ModuleActions.Fn.ADD_VAULT,
      args: [ilkToUse.joinAddress, vaultId] as ModuleActions.Args.ADD_VAULT,
      targetContract: ConvexLadleModuleContract,
      ignoreIf: false,
    },

    {
      operation: LadleActions.Fn.SERVE,
      args: [
        vaultId,
        serveToAddress(),
        _collInput,
        _input,
        _expectedFyTokenWithSlippage,
      ] as LadleActions.Args.SERVE,
      ignoreIf: false,
    },
    ...removeEthCallData,
  ];

  /* finally, handle the transaction */
  await transact(calls, txCode);

  /* When complete, update vaults.
      If a vault was provided, update it only,
      else update ALL vaults (by passing an empty array)
    */
  if (selectedSeries?.baseId !== WETH) refetchBaseBal();
  if (selectedIlk?.proxyId !== WETH) refetchIlkBal();
  updateVaults();
  updateAssets([base, ilkToUse, selectedIlk!]);
  updateSeries([series]);
};
