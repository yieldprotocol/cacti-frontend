import { useMemo, useState } from 'react';
import { findTokenBySymbol } from '@/utils';
import SkeletonWrap from '../shared/SkeletonWrap';
import { InlineChip } from './InlineChip';
import { ResponseWrap } from './helpers/layout';

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
    <ResponseWrap>
      <div>
        {token && (
          <div className="px-2">
            {/* Main values */}
            <div className="flex items-center justify-between">
              <div>
                <InlineChip label={token?.symbol} image={token?.logoURI} />
              </div>
              <div className="text-xl text-white/70 ">
                {amount ? amount : <SkeletonWrap width={50} />}
              </div>
            </div>

            {/* Calculated values/ exncahnge rates */}
            <div className="flex items-center justify-between text-sm text-white/70">
              <div className="px-1 py-2">
                $ {tokenValueInUsd ? tokenValueInUsd : <SkeletonWrap width={50} />}
              </div>

              <div className="px-1 py-2">
                $ {amountValueInUsd ? amountValueInUsd : <SkeletonWrap width={50} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </ResponseWrap>
  );
};
