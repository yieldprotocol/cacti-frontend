import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

/**
 * Simple Text response.
 *
 * Includes:
 * Text
 */

export const TextResponse = (props: any) => {
  return (
    <div className="rounded-[8px] border-[0.5px] border-white border-opacity-50 ">
      {props.title && !props.collapsible && (
        <div
          className="
        flex justify-between 
        p-[8px] text-[12px] text-white
        text-opacity-70"
        >
          <div>{props.title}</div>
        </div>
      )}

      {props.title && !props.collapsible && (
        <div className="p-[8px] text-[12px] text-white text-opacity-70">{props.text}</div>
      )}

      {!props.title && (
        <div className="p-[8px] text-[12px] text-white text-opacity-70">{props.text}</div>
      )}

      {props.title && props.collapsible && (
        <Disclosure as="div" defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
                className="flex justify-between p-[8px] text-[12px] text-white text-opacity-70"
              >
                <div>{props.title}</div>
                <div className="w-[16px]">{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
              </Disclosure.Button>
              <Disclosure.Panel as="div" className="p-[8px] text-[12px] text-white text-opacity-70">
                {props.text}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}
    </div>
  );
};
