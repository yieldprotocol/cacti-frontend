import { Address } from 'wagmi';

export interface ISeriesEntities {
  id: string; // series entity id
  fyTokenAddress: Address;
  baseAddress: Address;
  poolAddress: Address;
  maturity: number;
}

// 2309
enum SeriesEntities {
  WETH_2309 = '0x0030ff00028e',
  DAI_2309 = '0x0031ff00028e',
  USDC_2309 = '0x0032ff00028e',
  FRAX_2309 = '0x0138ff00028e',
  USDT_2309 = '0x00a0ff00028e',
}

enum BaseAddresses {
  WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  DAI = '0x6b175474e89094c44da98b954eedeac495271d0f',
  USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  FRAX = '0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0',
  USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7',
}

export const SERIES_ENTITIES = new Map<number, Map<string, ISeriesEntities>>();

SERIES_ENTITIES.set(
  1,
  new Map([
    /**
     * 2309
     * */
    [
      SeriesEntities.WETH_2309,
      {
        id: SeriesEntities.WETH_2309,
        fyTokenAddress: '0xD842A9f77e142f420BcdBCd6cFAC3548a68906dB',
        baseAddress: BaseAddresses.WETH,
        poolAddress: '0xE56c9c47b271A58e5856004952c5F4D34a78B99B',
        maturity: 1695999600,
      },
    ],
    [
      SeriesEntities.DAI_2309,
      {
        id: SeriesEntities.DAI_2309,
        fyTokenAddress: '0xB917a6CD3f811A84c1c5B972E2c715a6d93f40aa',
        baseAddress: BaseAddresses.DAI,
        poolAddress: '0x9ce9c9f9fF417Ffc215A4e5c6b4e44BB76Cf8C79',
        maturity: 1695999600,
      },
    ],

    [
      SeriesEntities.USDC_2309,
      {
        id: SeriesEntities.USDC_2309,
        fyTokenAddress: '0x74c4cEa80c1afEAda2907B55FDD9C958Da4a53F2',
        baseAddress: BaseAddresses.USDC,
        poolAddress: '0xFCd1C61139F8Af13c5090CfBb2dD674a2Ff4fe35',
        maturity: 1695999600,
      },
    ],
    [
      SeriesEntities.FRAX_2309,
      {
        id: SeriesEntities.FRAX_2309,
        fyTokenAddress: '0xB38Ba395D15392796B51057490bBc790871dd6a0',
        baseAddress: BaseAddresses.FRAX,
        poolAddress: '0xe2F6f40192F3E4568a62577E0541AC823b6f0D9e',
        maturity: 1695999600,
      },
    ],
    [
      SeriesEntities.USDT_2309,
      {
        id: SeriesEntities.USDT_2309,
        fyTokenAddress: '0x299c9e28D2c5efa09aa147abB4f1CB4a8dc7AbE0',
        baseAddress: BaseAddresses.USDT,
        poolAddress: '0x0ECc79FE01b02548853c87466cCd57710bf9d11A',
        maturity: 1695999600,
      },
    ],
  ])
);
