import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowTopRightOnSquareIcon, ArrowUpOnSquareIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Skeleton from '@/components/SkeletonWrap';
import { findTokenBySymbol } from '@/utils';
import { InlineChip } from './InlineChip';
import { ResponseTitle, ResponseWrap } from './helpers/cactiLayout';
import { mockText } from './helpers/mocks';

/**
 * Image response element
 * @param props
 * @returns
 */
export const ImageResponse = (props: any) => {
  const [token, setToken] = useState<any>();
  const [amount, setAmount] = useState<any>(props.value);

  return (
    <ResponseWrap classNameExtra='w-max-2 '>
      <ResponseTitle>
        {props.title}
        <ArrowTopRightOnSquareIcon className="w-[16px] stroke-2 hover:text-white " />
      </ResponseTitle>

      <div className="max-w-sm overflow-hidden rounded p-[8px]">
        <img className="w-full" src={props.image} alt={props.title} />
        
        <div className="px-6 py-4">
          <p className="text-base text-gray-700"> {props.description} </p>
        </div>

        <div className="px-6 pt-4 pb-2">
          <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
            #photography
          </span>
          <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
            #travel
          </span>
          <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
            #winter
          </span>
        </div>
      </div>
    </ResponseWrap>
  );
};
