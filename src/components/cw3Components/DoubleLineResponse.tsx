import { useMemo, useState } from 'react';
import Skeleton from '@/components/SkeletonWrap';
import { findTokenBySymbol } from '@/utils';
import { InlineChip } from './InlineChip';

/**
* Dual Line Response Elements are generally used for swap, trading etc. interfaces where user wants to get addtional information about a market, or token.  
Includes:
Chip
Price of Token in $
User Amount
User Amount in $

 **/
export const DoubleLineResponse = (props: any) => {
  const [token, setToken] = useState<any>();

  const [tokenValueInUsd, setTokenValueInUsd] = useState<number>(props.tokenUsd);
  const [amount, setAmount] = useState<number>(props.amount);
  const [amountValueInUsd, setAmountValueInUsd] = useState<number>(props.amountUsd);

  useMemo(() => {
    if (props.tokenSymbol) {
      try {
        const token = findTokenBySymbol(props.tokenSymbol, 1);
        setToken(token);
      } catch (e) {
        // console.error(e);
        setToken(undefined);
      }
    }
    setAmount(props.amount);
    setAmountValueInUsd(props.amountValueInUsd);
    setTokenValueInUsd(props.tokenValueInUsd);
  }, [props]);

  return (
    <div
      className={`
       flex-grow 
        rounded-[8px]
        border-[1px] border-white border-opacity-10 
        px-[24px] py-[16px]
        text-sm text-white text-opacity-50
   `}
    >
      <div>
        {token && (
          <div className="flex items-center justify-between gap-[8px]">
            <div className="text-start">
              <div>
                <InlineChip label={token?.symbol} image={token?.logoURI} />
              </div>
              <div className="p-1">
                $ {tokenValueInUsd ? tokenValueInUsd : <Skeleton width={50} />}
              </div>
            </div>

            <div className="text-end">
              <div className="text-xl ">{amount ? amount : <Skeleton width={50} />}</div>
              <div className="p-1">
                $ {amountValueInUsd ? amountValueInUsd : <Skeleton width={50} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
