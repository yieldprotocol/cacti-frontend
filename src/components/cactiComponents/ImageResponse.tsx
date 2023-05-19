import { useMemo, useState } from 'react';
import Skeleton from '@/components/SkeletonWrap';
import { findTokenBySymbol } from '@/utils';
import { InlineChip } from './InlineChip';
import { ResponseTitle, ResponseWrap } from './helpers/cactiLayout';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

/**
 * Image response element
 * @param props
 * @returns
 */
export const ImageResponse = (props: any) => {
  const [token, setToken] = useState<any>();
  const [amount, setAmount] = useState<any>(props.value);

  return (
    <ResponseWrap>
      
      <ResponseTitle>
        {props.title}
        <ArrowUpOnSquareIcon className="w-[16px] stroke-2 hover:text-white " />
      </ResponseTitle>


    </ResponseWrap>
  );
};
