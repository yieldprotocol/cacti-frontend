import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Markdown } from '../experimental_/Markdown';
import { ResponseTitle, ResponseWrap } from './helpers/layout';

const textStyle = 'flex text-base text-white text-opacity-70 gap-1 ';
/**
 * Simple Text response element
 *
 * Includes:
 * Text
 */
export const TextResponse = (props: any) => {
  return (
    <ResponseWrap classNameExtra="border-none">
      {props.title && !props.collapsible && (
        <>
          <ResponseTitle>{props.title}</ResponseTitle>
          <div className={`${textStyle}`}>
            {props.text}
            {props.isThinking && <div className={`animate-pulse`}>...</div>}
          </div>
        </>
      )}

      {!props.title && (
        <div className={`${textStyle} `}>
          <Markdown>{props.text}</Markdown>
          {props.isThinking && <div className={`animate-pulse`}>...</div>}
        </div>
      )}

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

              <Disclosure.Panel as="div" className={`${textStyle}`}>
                {props.text}
                {props.isThinking && <div className={`animate-pulse`}>...</div>}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}
    </ResponseWrap>
  );
};
