import { Fragment } from 'react';

interface YieldContainerProps {
  token: string;
  chain: string;
  project: string;
  apy: number;
  apyAvg30d: number;
  tvlUsd: number;
}

export const YieldContainer = ({
  token,
  chain,
  project,
  apy,
  apyAvg30d,
  tvlUsd,
}: YieldContainerProps) => {
  return (
    <tr>
      <td>{project}</td>
      <td>{tvlUsd}</td>
      <td>{apy}</td>
      <td>{apyAvg30d}</td>
    </tr>
  );
};
