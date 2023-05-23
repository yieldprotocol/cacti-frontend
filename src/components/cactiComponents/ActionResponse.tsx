import { Reducer, useCallback, useEffect, useReducer, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BigNumber, CallOverrides, Overrides, PayableOverrides } from 'ethers';
import tw from 'tailwind-styled-components';
import { useAccount, usePrepareContractWrite } from 'wagmi';
import useApproval, { ApprovalBasicParams } from './hooks/useApproval';
import useBalance from './hooks/useBalance';
import useSubmitTx, { TxBasicParams } from './hooks/useSubmitTx';
import { toast } from 'react-toastify';

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
  py-[8px] px-[24px]
  rounded-[8px]
  border-[1px] border-white border-opacity-10
  bg-[#2E8C87]
  text-sm text-white/90
  active:bg-[#2E8C8700]
`;

const stylingByState = {
  [ActionResponseState.WAITING_FOR_USER]: 'cursor-not-allowed', // waiting for user action:  likely a confirmation
  [ActionResponseState.LOADING]: 'cursor-not-allowed', // system working in background : async calls/checks
  [ActionResponseState.DISABLED]: 'bg-opacity-20 text-white/20 cursor-not-allowed', // user interaction not allowed (eg. not enough balance, or error with building tx)
  [ActionResponseState.READY]: '', // tx ready to go, but not submitted.
  [ActionResponseState.TRANSACTING]: 'cursor-not-allowed', // tx submitting and is transacting.
  [ActionResponseState.SUCCESS]: 'bg-green-800', // tx completed successfully.
  [ActionResponseState.ERROR]: 'text-white/30 bg-red-600/50', // tx completed, but failed.
};

/**
 * Action Response
 * Includes: Label, action, state, preparedContractWrite
 **/
export const ActionResponse = ({
  txParams,
  approvalParams,
  label: label_,
  disabled,
}: // assertCallParams
// altAction,
{
  txParams?: TxBasicParams;
  approvalParams?: ApprovalBasicParams;
  label?: string;
  disabled?: boolean;
  // assertCallParams?: AssertCallBasicParams;
  // altAction?: () => Promise<any>;
}) => {
  const defaultLabel = label_ || 'Submit';
  const { address } = useAccount();

  const [label, setLabel] = useState<string | undefined>();
  const [state, setState] = useState(ActionResponseState.LOADING);

  const [txToPrepare, setTxToPrepare] = useState<TxBasicParams>();

  const [action, setAction] = useState<
    ((overrideConfig?: undefined) => void | Promise<void>) | undefined
  >();

  /** Check for the approval. If no approvalParams, hasAllowance === true and approve == undefined  */
  const { approveTx, hasAllowance, approvalWaitingOnUser, approvalTransacting } =
    useApproval(approvalParams);

  /** Check if the acount has enough balance from the transaction */
  const valueFromOverrides = (txParams?.overrides as PayableOverrides)?.value! as
    | BigNumber
    | undefined; // TODO find a workaround for this
  const { data: balance, isGTEcompared: hasBalance } = useBalance(
    approvalParams?.address,
    approvalParams?.amount || valueFromOverrides
  );

  /**
   * Set the txParams to 'undefined' until hasBalance and hasAllowance are both true.
   **/
  useEffect(() => {
    hasBalance && hasAllowance ? setTxToPrepare(txParams) : setTxToPrepare(undefined);
  }, [hasBalance, hasAllowance]);

  const { submitTx, isWaitingOnUser, isTransacting } = useSubmitTx(txToPrepare);

  /**
   * BUTTON FLOW:
   * Update all the local states on tx/approval status changes.
   **/
  useEffect(() => {
    // case:not enough balance */
    if (!hasBalance) {
      console.log('NOT READY: Balance not sufficient for transaction.');
      setLabel('Insufficient Balance');
      setState(ActionResponseState.DISABLED);
    }

    /* -------- APPROVAL FLOW --------- */
    if (!hasAllowance && hasBalance) {
      // case: enough balance, but allowance not sufficient */
      if (true) {
        setAction(() => approveTx);
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
    if (hasAllowance && hasBalance) {
      /* case tx/approval success, waiting for tx-building */
      if (!submitTx) {
        console.log('Building TX: Has balance and allowance.');
        setLabel('Validating the transaction...');
        setState(ActionResponseState.LOADING);
      }

      /* case tx/approval success, waiting for tx-building */
      if (submitTx) {
        console.log('READY FOR TX: Has balance and allowance.');
        setLabel(defaultLabel);
        setState(ActionResponseState.READY);
        setAction(() => toast.info('Mock submiting transaction.') as any);
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
    }
  }, [
    hasBalance,
    hasAllowance,
    isWaitingOnUser,
    isTransacting,
    approvalWaitingOnUser,
    approvalTransacting,
    submitTx,
    // approveTx
  ]);

  /* Set the styling based on the state (Note: always diasbled if 'disabled' from props) */
  const extraStyle = stylingByState[disabled ? ActionResponseState.DISABLED : state];

  return (
    <div className="flex w-full justify-center">
      {address ? (
        <StyledButton className={`bg-teal-900 ${extraStyle}`} onClick={(e) => action?.()}>
          {label || <Skeleton width={100} />}
        </StyledButton>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};
