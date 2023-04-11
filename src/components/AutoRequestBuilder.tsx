import { Fragment, useEffect, useRef, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useChatContext } from '@/contexts/ChatContext';
import requestList from '@/utils/RequestList.json';

type Request = {
  id: number;
  group: string;
  description: string;
  request: string;
};

const requests: Request[] = requestList;

const AutoRequestBuilder = (props: any) => {
  const { isBotThinking } = useChatContext();

  const filteredRequests =
    props.input === ''
      ? requests
      : requests
          // .filter((r: Request) => r.request !== props.input) // filter out any exact matches so they don't show up in the list;
          .filter(
            (req) =>
              req.request // search the request
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(props.input.toLowerCase().replace(/\s+/g, '')) ||
              req.group // search by group
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(props.input.toLowerCase().replace(/\s+/g, '')) ||
              req.description // search by description too
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(props.input.toLowerCase().replace(/\s+/g, ''))
          );
          // .sort(() => Math.random() - 0.5); // shuffle the array so the results are random;

  return (
    <div
      className={`h-48 no-scrollbar overflow-hidden transition-all duration-400 hover:overflow-auto`}
    >
      <div
        className={`text-center ${
          filteredRequests.length > 5 ? 'hover:pause animate-marquee-infinite' : null
        }
        ${isBotThinking && 'pause'}
        `}
      >
        {filteredRequests.map((r: Request) => {
          return (
            <div
              key={r.id}
              className={`text-center mt-3
              flex justify-center gap-4 p-1
              font-mono
              font-extralight 
              text-slate-500
              hover:text-slate-200
              `}
              onClick={(e) => {
                props.setInput(r.request)
                // props.handleSendMessage();
              }}
            >
              <div className="col-span-1 rounded-full border p-1 px-2 text-[0.5em]"> {r.group} </div>
              <div className="col-span-4 text-sm"> {r.request} </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AutoRequestBuilder;
