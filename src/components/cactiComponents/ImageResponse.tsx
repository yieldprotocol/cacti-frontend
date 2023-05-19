import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  ArrowTopRightOnSquareIcon,
  ArrowUpOnSquareIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline';
import Skeleton from '@/components/SkeletonWrap';
import { findTokenBySymbol } from '@/utils';
import { InlineChip } from './InlineChip';
import { ResponseTitle, ResponseWrap } from './helpers/layout';
import { mockText } from './helpers/mocks';

const TagItem = (props: { tag: string }) => {
  return (
    <span className="boder-white/10 inline-block rounded-full border-[1px] px-3 py-1 text-[0.5em] uppercase">
      {props.tag}
    </span>
  );
};

/**
 * Image response element
 * @param props
 * @returns
 */
export const ImageResponse = (props: any) => {
  const tagList = props.imageTags;

  return (
    <ResponseWrap classNameExtra="w-[400px]">
      <ResponseTitle>
        {props.title}
        <ArrowTopRightOnSquareIcon className="w-[16px] stroke-2 hover:text-white " />
      </ResponseTitle>

      <div className="max-w-sm gap-2 space-y-2 overflow-hidden rounded p-2">
        <img className="w-full" src={props.image} alt={props.title} />
        {tagList.length && (
          <div className="space-y-1 space-x-2 py-2 ">
            {tagList.map((tag: string) => (
              <TagItem tag={tag} key={tag} />
            ))}
          </div>
        )}

        <div> {props.description} </div>

        <div className="flex justify-between">
          cost
          </div>
      </div>
    </ResponseWrap>
  );
};
