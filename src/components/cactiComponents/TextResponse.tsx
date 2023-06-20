import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { ResponseTitle, ResponseWrap } from './helpers/layout';

/**
 * Simple Text response element
 *
 * Includes:
 * Text
 */
export const TextResponse = (props: any) => {
  return (
    <ResponseWrap classNameExtra='border-none'>
      {props.title && !props.collapsible && (
        <>
          <ResponseTitle>{props.title}</ResponseTitle>
          <div className=" text-white text-opacity-70">{props.text}</div>
        </>
      )}

      {!props.title && <div className=" text-base text-white text-opacity-70">{props.text}</div>}

      {props.title && props.collapsible && (
        <Disclosure as="div" defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button as="div">
                <ResponseTitle>
                  <div>{props.title}</div>
                  <div className="w-[16px]">{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
                </ResponseTitle>
              </Disclosure.Button>

              <Disclosure.Panel as="div" className=" text-white text-opacity-70">
                {props.text}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}
    </ResponseWrap>
  );
};
