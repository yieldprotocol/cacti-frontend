interface YieldRowContainerProps {
  headers: { displayName: string; fieldName: string }[];
  rowParams: RowParams;
}

interface RowParams {
  token: string;
  chain: string;
  project: string;
  apy: number;
  apyAvg30d: number;
  tvlUsd: number;
}

export const YieldRowContainer = ({ headers, rowParams }: YieldRowContainerProps) => {
  return (
    <tr className="border-b border-gray-400">
      {headers.map((header, i) => {
        // TODO fix type
        let value = (rowParams as any)[header.fieldName];
        if (header.fieldName === 'tvlUsd') {
          value =
            '$' +
            Intl.NumberFormat('en-US', {
              notation: 'compact',
            }).format(value);
        }

        if (header.fieldName === 'apy' || header.fieldName === 'apyAvg30d') {
          value = value.toFixed(2) + '%';
        }
        return (
          <td className="px-2 py-1" key={`i${i}`}>
            {value}
          </td>
        );
      })}
    </tr>
  );
};
