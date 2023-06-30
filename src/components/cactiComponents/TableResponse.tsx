import { Widget } from '../experimental_/MessageTranslator_';
import { ResponseWrap } from './helpers/layout';

interface TableHeader {
  fieldName: string;
  displayName: string;
}

// interface TableRow {
// }

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

  const Row = ({ params, name }: { name: string; params: any }) => {
    // TODO we still need to handle the case where a widget is passed as FULL ROW element ie. a Widget type
    const values = headers.map((header: TableHeader) => params[header.fieldName]);
    return (
      <tr>
        {values.map((value: string | Widget, idx: number) => {
          /* Handle if a Widget description is passed as a cell elemnet*/
          if (typeof value === 'object' && value.name && value.params) {
            return <Widget key={idx} widget={value} />;
          }
          /* else assume a standard string value */
          return (
            <td
              key={'xx'}
              className="whitespace-nowrap px-6 py-3 text-sm font-medium text-white/70"
            >
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
                  {headers.map((header: any, idx: number) => (
                    <HeaderItem key={idx} {...header} />
                  ))}
                </tr>
              </thead>

              <tbody className="">
                {rows.map((row: any, idx: number) => (
                  <Row key={idx} {...row} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ResponseWrap>
  );
};

const exampleData = {
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
        project: 'aave-v2',
        apy: 1.95197,
        apyAvg30d: 1.93728,
        tvlUsd: 70750123,
      },
    },
  ],
};
