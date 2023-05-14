import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const ListRow = ({ dataRow }: { dataRow: string[] }) => {
  return (
    <div className="flex justify-between py-[4px] text-sm text-white/70 font-thin">
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

const listStyle = 'py-[8px] px-[24px] text-sm text-white text-opacity-70'

/**
 * List response element
 *
 * Includes:
 * Text
 */
export const ListResponse = (props : any ) => {

  const rows = props.data.map((dataRow:any,i:number) => (
    <ListRow dataRow={dataRow} key={i+dataRow[0]} />
  ))

  return (
    <div className="rounded-[8px] border-[1px] border-white border-opacity-10">
      {props.title && props.collapsible && (
        <Disclosure as="div" defaultOpen >
          {({ open }) => (
            <>
              <Disclosure.Button as="div" className="flex justify-between py-[8px] px-[24px] text-white text-opacity-70">
                <ListTitle title={props.title} />
                <div className="w-[16px] stroke-2">{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
              </Disclosure.Button>

              <Disclosure.Panel as="div" className="py-[8px] px-[24px]" >
                {rows}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}

      {props.title && !props.collapsible && (
        <div className="py-[8px] px-[24px] text-sm text-white text-opacity-70">
          <div className='py-[8px]'>
          <ListTitle title={props.title} />
          </div>
          {rows}
        </div>
      )}

      {!props.title && (
        <div className="py-[8px] px-[24px] text-sm text-white text-opacity-70">
          {rows}
        </div>
      )}
    </div>
  );
};
