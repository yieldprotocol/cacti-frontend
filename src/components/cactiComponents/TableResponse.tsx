import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { ContractMethodDoesNotExistError } from 'wagmi';
import { ResponseTitle, ResponseWrap } from './helpers/layout';
import { Widget } from '../experimental_/MessageTranslator_';

interface TableHeader {
  fieldName: string;
  displayName: string;
}
/**
 * Table response element
 */
export const TableResponse = ({ headers, rows }: { headers: TableHeader[]; rows: any[] }) => {
  const HeaderItem = ({ fieldName, displayName }: TableHeader) => {
    console.log(displayName);
    return (
      <th scope="col" className="px-6 py-3 text-left text-sm font-light text-white/30">
        {displayName}
      </th>
    );
  };

  const Row = ({params, name}: {name:string, params: any}) => {
    // TODO we still need to handle the case where a widget is passed as FULL ROW element 
    const values = headers.map((header: TableHeader) => params[header.fieldName]);
    return (
      <tr>
        {values.map((value: string | Widget) => {
          /* Handle if a Widget description is passed as a cell elemnet*/
          if (typeof value === 'object' && value.name && value.params ) {
            return <Widget widget={value}  />
          }
          /* else assume a standard string value */
          return (
            <td className="whitespace-nowrap px-6 py-3 text-sm font-medium text-white/70">
              {value as string}
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <ResponseWrap>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="inline-block min-w-full p-1.5 align-middle">
              <table className="min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    {headers.map((header: any) => (
                      <HeaderItem {...header} />
                    ))}
                  </tr>
                </thead>

                <tbody className="">
                  {rows.map((row: any) => (
                    <Row {...row} />
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </ResponseWrap>
  );
};

const x = {
  headers: [
    { fieldName: 'project', displayName: 'Project' },
    { fieldName: 'tvlUsd', displayName: 'TVL' },
    { fieldName: 'apy', displayName: 'APY' },
    { fieldName: 'apyAvg30d', displayName: '30dayAvg.APY' },
  ],
  rows: [
    {
      name: 'display-yield-container',
      params: {
        token: 'USDC',
        network: 'Ethereum',
        project: 'aave-v2',
        apy: 1.77184,
        apyAvg30d: 1.78358,
        tvlUsd: 268107776,
      },
    },
    {
      name: 'display-yield-container',
      params: {
        token: 'USDC',
        network: 'Ethereum',
        project: 'compound',
        apy: 3.4375,
        apyAvg30d: 2.62986,
        tvlUsd: 131934173,
      },
    },
    {
      name: 'display-yield-container',
      params: {
        token: 'USDC',
        network: 'Ethereum',
        project: 'morpho-aave',
        apy: 1.88141,
        apyAvg30d: 2.00731,
        tvlUsd: 80209358,
      },
    },
    {
      name: 'display-yield-container',
      params: {
        token: 'USDC',
        network: 'Ethereum',
        project: 'goldfinch',
        apy: 20.80112,
        apyAvg30d: 19.96207,
        tvlUsd: 79861731,
      },
    },
    {
      name: 'display-yield-container',
      params: {
        token: 'USDC',
        network: 'Ethereum',
        project: 'compound-v3',
        apy: 1.95197,
        apyAvg30d: 1.93728,
        tvlUsd: 70750123,
      },
    },
  ],
};
