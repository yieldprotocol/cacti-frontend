import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { ResponseTitle, ResponseWrap } from './helpers/layout';

const ListRow = ({ dataRow }: { dataRow: string[] }) => {
  return (
    <div className="flex justify-between py-[4px] text-sm font-thin text-white/70">
      <div>{dataRow[0]}</div>
      <div>{dataRow[1]}</div>
    </div>
  );
};

const ListTitle = ({ title }: { title: string }) => {
  return (
    <div className="text-sm text-white text-opacity-70 ">
      <div>{title}</div>
    </div>
  );
};

const listStyle = 'py-[8px] px-[24px] text-sm text-white text-opacity-70';

/**
 * List response element
 *
 * Includes:
 * Text
 */
export const ListResponse = (props: any) => {
  const rows = props.data.map((dataRow: any, i: number) => (
    <ListRow dataRow={dataRow} key={i + dataRow[0]} />
  ));

  return (
    <ResponseWrap>
      {props.title && props.collapsible && (
        <Disclosure as="div" defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button as="div">
                <div className="rounded-[8px] hover:bg-white hover:bg-opacity-5">
                  <ResponseTitle>
                    {props.title}
                    <div className="w-[16px] stroke-2">
                      {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </div>
                  </ResponseTitle>
                </div>
              </Disclosure.Button>

              <Disclosure.Panel as="div" className="p-2">
                {rows}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}

      {props.title && !props.collapsible && (
        <>
          <ResponseTitle>{props.title}</ResponseTitle>
          <div className="p-2 text-sm text-white text-opacity-70">{rows}</div>
        </>
      )}

      {!props.title && (
        <div className="p-2 text-sm text-white text-opacity-70">{rows}</div>
      )}
    </ResponseWrap>
  );
};
