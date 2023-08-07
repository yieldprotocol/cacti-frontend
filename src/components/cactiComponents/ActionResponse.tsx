import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { AddressZero } from '@ethersproject/constants';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BigNumber, UnsignedTransaction, ethers } from 'ethers';
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

export type ActionResponseProps = {
  txParams: TxBasicParams | undefined;
  approvalParams: ApprovalBasicParams | undefined;
  sendParams?: UnsignedTransaction | undefined;
  label?: string;
  disabled?: boolean;
  skipBalanceCheck?: boolean;
  stepper?: boolean;
  onSuccess?: (txReceipt?: TransactionReceipt) => any;
  onError?: (txHash?: string) => any;
  // assertCallParams?: AssertCallBasicParams;
  // altAction?: () => Promise<any>;
};

/**
 * Action Response
 * Includes: Label, action, state, preparedContractWrite
 **/
export const ActionResponse = ({
  txParams,
  approvalParams,
  sendParams,
  label: label_,
  disabled,
  stepper,
  skipBalanceCheck,
  onSuccess,
  onError,
}: ActionResponseProps) => {
  const defaultLabel = label_ || 'Submit';
  const { address } = useAccount();

  /** Check for the approval. If no approvalParams, hasAllowance === true and approveTx == undefined  */
  const { approveTx, hasAllowance, approvalWaitingOnUser, approvalTransacting } = useApproval(
    approvalParams || {
      tokenAddress: AddressZero,
      spender: AddressZero,
      approvalAmount: BigNumber.from(0),
      skipApproval: true, // NOTE: apporval is skipped if no approval params are passed in
    }
  );

  const { submitTx, isWaitingOnUser, isTransacting, error, isSuccess, receipt, hash } = useSubmitTx(
    hasAllowance ? txParams : undefined,
    hasAllowance ? sendParams : undefined,
    () => null,
    () => null,
    label_
  );

  const { data: ethBal } = useBalance();

  const { data: balance } = useBalance(
    approvalParams?.tokenAddress,
    undefined,
    undefined,
    approvalParams?.skipApproval
  ); // TODO figure out better way to infer if eth

  // button state
  const [label, setLabel] = useState<string>();
  const [state, setState] = useState(ActionResponseState.LOADING);
  const [action, setAction] = useState<Action>();

  /**
   *
   * Check if the acount has enough balance for the transaction
   *
   *  */
  const [hasEnoughBalance, setHasEnoughBalance] = useState(false);

  useEffect(() => {
    if (approvalParams?.skipApproval || skipBalanceCheck) return setHasEnoughBalance(true);

    // check value balance if skipping approval cuz we assume user is using eth
    // ( explicitly showing approvalParams === undefined for clarity - as oppposed to !approvalParams)
    if (approvalParams === undefined || sendParams?.value! <= ethBal!)
      return setHasEnoughBalance(true);

    // check approval token balance
    if (balance && approvalParams?.approvalAmount)
      setHasEnoughBalance(balance.gte(approvalParams?.approvalAmount!));
  }, [
    approvalParams?.approvalAmount,
    approvalParams?.skipApproval,
    balance,
    ethBal,
    sendParams?.value,
  ]);

  /**
   * BUTTON FLOW:
   * Update all the local states on tx/approval status changes.
   **/
  useEffect(() => {
    // case:not enough balance */
    if (!hasEnoughBalance) {
      setLabel('Insufficient Balance');
      setState(ActionResponseState.DISABLED);
    }

    /* -------- APPROVAL FLOW --------- */
    if (!hasAllowance && hasEnoughBalance) {
      // case: enough balance, but allowance not sufficient */
      if (approveTx) {
        console.log('🦄 ~ file: ActionResponse.tsx:156 ~ useEffect ~ approveTx:', approveTx);
        setAction({ name: 'approve', fn: approveTx });
        console.log('READY FOR APPROVAL: Has balance.');
        setLabel(`A token approval is required`);
        setState(ActionResponseState.READY);
      } else {
        console.log('no approval func');
        setLabel(`Could not build the approve tx`);
        setState(ActionResponseState.ERROR);
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
        // if the button is disabled, the label is controlled by the parent widget
        !disabled ? setLabel('Validating the transaction...') : setLabel(defaultLabel);
        setState(ActionResponseState.LOADING);
      }

      /* case approval success, but trnasaction error with tx-building */
      if (!submitTx && error) {
        console.log('Error Building/Validating tx');
        setLabel(`Error validating the transaction.`);
        setState(ActionResponseState.ERROR);
        onError?.(hash);
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
        onSuccess?.(receipt);
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
    disabled,
  ]);

  /* Set the styling based on the state (Note: always diasbled if 'disabled' from props) */
  const extraStyle = stylingByState[disabled ? ActionResponseState.DISABLED : state];

  const handleAction = async () => (action ? await action?.fn() : undefined);

  return (
    <div className="flex w-full justify-center">
      {address && stepper && <ActionStepper />}
      {address && !stepper && (
        <div className=" flex w-full items-center gap-4">
          <StyledButton
            className={`bg-teal-900 ${extraStyle}`}
            onClick={handleAction}
            disabled={isSuccess || disabled || state === ActionResponseState.DISABLED}
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
