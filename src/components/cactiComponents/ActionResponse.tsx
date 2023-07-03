import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { AddressZero } from '@ethersproject/constants';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BigNumber, UnsignedTransaction } from 'ethers';
import tw from 'tailwind-styled-components';
import { useAccount } from 'wagmi';
import { ActionStepper } from './ActionStepper';
import useApproval, { ApprovalBasicParams } from './hooks/useApproval';
import useBalance from './hooks/useBalance';
import useSubmitTx, { SEND_ETH_FNNAME, TxBasicParams } from './hooks/useSubmitTx';

export enum ActionResponseState {
  LOADING, // background async checks
  DISABLED, // button is disabled (eg. not enough balance, or error with building tx)

  WAITING_FOR_USER, // waiting for user action on wallet,  likely confirmation

  READY, // tx ready to go - not submitted.  (either approval or tx)
  TRANSACTING, // transaction taking place. (either approval or tx)

  SUCCESS, // transaction successful
  ERROR, // transaction failed
}

const StyledButton = tw.button`
  inline-flex items-center justify-center
  height-[40px]
  p-2 rounded-lg
  border-[1px] border-white/10
  bg-[#2E8C87]
  text-white/70 w-full duration-200
`;
const disabledStyle = 'cursor-not-allowed bg-teal-800/10 text-white/30';
const stylingByState = {
  [ActionResponseState.WAITING_FOR_USER]: disabledStyle, // waiting for user action:  likely a confirmation
  [ActionResponseState.LOADING]: disabledStyle, // system working in background : async calls/checks
  [ActionResponseState.DISABLED]: disabledStyle, // user interaction not allowed (eg. not enough balance, or error with building tx)
  [ActionResponseState.READY]: 'bg-transparent hover:bg-teal-900', // tx ready to go, but not submitted.
  [ActionResponseState.TRANSACTING]: disabledStyle, // tx submitting and is transacting.
  [ActionResponseState.SUCCESS]: 'bg-teal-900/70', // tx completed successfully.
  [ActionResponseState.ERROR]: 'cursor-not-allowed text-white/30 bg-red-600/50', // tx completed, but failed.
};

type Action = {
  name: string;
  fn: (overrideConfig?: undefined) => any;
};

/**
 * Action Response
 * Includes: Label, action, state, preparedContractWrite
 **/
export const ActionResponse = ({
  txParams,
  approvalParams,
  sendParams,
  // onSuccess,
  label: label_,
  disabled,
  stepper,
}: // assertCallParams
// altAction,
{
  txParams: TxBasicParams | undefined;
  approvalParams: ApprovalBasicParams | undefined;
  sendParams?: UnsignedTransaction | undefined;
  label?: string;
  disabled?: boolean;
  stepper?: boolean;

  onSuccess?: () => JSX.Element | string;
  // assertCallParams?: AssertCallBasicParams;
  // altAction?: () => Promise<any>;
}) => {
  const defaultLabel = label_ || 'Submit';
  const { address } = useAccount();

  const { submitTx, isWaitingOnUser, isTransacting, error, isSuccess, receipt } = useSubmitTx(
    txParams,
    sendParams
  );

  // const { data: nativeBalance } = useBalance();
  const { data: balance } = useBalance(approvalParams?.tokenAddress);

  const [hasEnoughBalance, setHasEnoughBalance] = useState<boolean>(false);

  // button state
  const [label, setLabel] = useState<string | undefined>();
  const [state, setState] = useState(ActionResponseState.LOADING);
  const [action, setAction] = useState<Action>();

  /** Check for the approval. If no approvalParams, hasAllowance === true and approveTx == undefined  */
  const { approveTx, hasAllowance, approvalWaitingOnUser, approvalTransacting } = useApproval(
    approvalParams || {
      tokenAddress: AddressZero,
      spender: AddressZero,
      approvalAmount: BigNumber.from(0),
      skipApproval: true, // NOTE: apporval is skipped if no approval params are passed in
    }
  );

  /**
   *
   * Check if the acount has enough balance from the transaction: NOTE this is only
   *
   *  */
  useEffect(() => {
    // // Lastl, try get value from overrides
    // (txParams.overrides as PayableOverrides)?.value &&
    // setHasEnoughBalance(balance.gte((txParams.overrides! as any).value));

    if (balance && approvalParams?.tokenAddress && approvalParams?.approvalAmount) {
      setHasEnoughBalance(balance.gte(approvalParams.approvalAmount));
    } else if (balance && txParams?.functionName === SEND_ETH_FNNAME) {
      setHasEnoughBalance(balance.gte(txParams?.args?.[1] || 0));
    }

    // default case, set enough balance to true
    else {
      setHasEnoughBalance(true);
    }
  }, [txParams, approvalParams, balance]);

  /**
   * BUTTON FLOW:
   * Update all the local states on tx/approval status changes.
   **/
  useEffect(() => {
    // case:not enough balance */
    if (!hasEnoughBalance) {
      console.log('NOT READY: Balance not sufficient for transaction.');
      setLabel('Insufficient Balance');
      setState(ActionResponseState.DISABLED);
    }

    /* -------- APPROVAL FLOW --------- */
    if (!hasAllowance && hasEnoughBalance) {
      // case: enough balance, but allowance not sufficient */
      if (approveTx) {
        setAction({ name: 'approve', fn: approveTx });
        console.log('READY FOR APPROVAL: Has balance.');
        setLabel(`A token approval is required`);
        setState(ActionResponseState.READY);
      }

      // ACTION: user clicks approve token button

      // case: waiting for wallet interaction*/
      if (approvalWaitingOnUser) {
        console.log('Waiting for approval confirmation...');
        setLabel(`Please check your wallet...`);
        setState(ActionResponseState.WAITING_FOR_USER);
      }

      // ACTION: user confirms approval in wallet  ( or signs permit )

      // case: waiting for the approval transaction */
      if (approvalTransacting) {
        console.log('Waiting for approval transaction...');
        setLabel(`Token approval pending...`);
        setState(ActionResponseState.TRANSACTING);
      }
    }

    /* -------- TRANSACTION FLOW --------- */
    if (hasAllowance && hasEnoughBalance) {
      /* case tx/approval success, waiting for tx-building */
      if (!submitTx && !error) {
        console.log('Building TX: Has balance and allowance.');
        setLabel('Validating the transaction...');
        setState(ActionResponseState.LOADING);
      }

      /* case approval success, but trnasaction error with tx-building */
      if (!submitTx && error) {
        console.log('Error Building/Validating tx');
        setLabel(`Error validating the transaction.`);
        setState(ActionResponseState.ERROR);
      }

      /* case tx/approval success, waiting for tx-building */
      if (!!submitTx) {
        console.log('READY FOR TX: Has balance and allowance.');
        setLabel(defaultLabel);
        setState(ActionResponseState.READY);
        setAction({ name: 'submit', fn: submitTx });
      }

      // ACTION: user clicks submit button

      // case: waiting for wallet interaction*/
      if (isWaitingOnUser) {
        console.log('Waiting for TX confirmation...');
        setLabel(`Please check your wallet...`);
        setState(ActionResponseState.WAITING_FOR_USER);
      }

      // ACTION: user confirms approval in wallet  ( or signs permit )

      /* case tx/approval success */
      if (isTransacting) {
        console.log('TX IN PROGRESS... ');
        setLabel(defaultLabel);
        setState(ActionResponseState.TRANSACTING);
      }

      if (isSuccess) {
        console.log('TX SUCCESS');
        setLabel('Transaction Complete');
        setState(ActionResponseState.SUCCESS);
      }
    }
  }, [
    hasEnoughBalance,
    hasAllowance,
    isWaitingOnUser,
    isTransacting,
    error,
    approvalWaitingOnUser,
    approvalTransacting,
    submitTx,
    defaultLabel,
    isSuccess,

    // approveTx
  ]);

  /* Set the styling based on the state (Note: always diasbled if 'disabled' from props) */
  const extraStyle = stylingByState[disabled ? ActionResponseState.DISABLED : state];

  return (
    <div className="flex w-full justify-center">
      {address && stepper && <ActionStepper />}
      {address && !stepper && (
        <div className=" flex w-full items-center gap-4">
          <StyledButton
            className={`bg-teal-900 ${extraStyle}`}
            onClick={(e) => action && action.fn?.()}
          >
            {label || <Skeleton width={100} />}
          </StyledButton>

          {error && (
            <div className="group relative flex ">
              <div className="h-6 w-6 text-white/20">
                <ExclamationTriangleIcon />
              </div>
              <div
                className="absolute left-8 hidden rounded-md border  border-gray-700 bg-gray-900
                p-2 text-sm 
                text-white/70 group-hover:block
                "
              >
                {error}
              </div>
            </div>
          )}

          {isSuccess && (
            <div className="group relative flex">
              <div className="h-6 w-6 text-white/20">
                <CheckCircleIcon />
              </div>
              <div
                className="absolute left-8 hidden rounded-md border  border-gray-700 bg-gray-900
                p-2 text-sm 
                text-white/70 group-hover:block
                "
              >
                {receipt?.transactionHash}
              </div>
            </div>
          )}
        </div>
      )}
      {!address && <ConnectButton />}
    </div>
  );
};
