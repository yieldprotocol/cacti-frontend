import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

/**
 * Simple Text response element
 *
 * Includes:
 * Text
 */
export const TextResponse = (props: any) => {
  return (
    <div className="rounded-[8px] border-[0.5px] border-white border-opacity-10 ">
      {props.title && !props.collapsible && (
        <div
          className="
        flex justify-between 
        py-[8px] px-[24px]
        text-sm text-white text-opacity-70"
        >
          <div>{props.title}</div>
        </div>
      )}

      {props.title && !props.collapsible && (
        <div className=" py-[8px] px-[24px] text-sm text-white text-opacity-70">{props.text}</div>
      )}

      {!props.title && (
        <div className=" py-[8px] px-[24px] text-sm text-white text-opacity-70">{props.text}</div>
      )}

      {props.title && props.collapsible && (
        <Disclosure as="div" defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
                className="flex justify-between py-[8px] px-[24px] text-sm text-white text-opacity-70"
              >
                <div>{props.title}</div>
                <div className="w-[16px]">{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
              </Disclosure.Button>
              <Disclosure.Panel as="div" className=" py-[8px] px-[24px] text-sm text-white text-opacity-70">
                {props.text}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}
    </div>
  );
};
