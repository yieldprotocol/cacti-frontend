import { Address } from 'wagmi';

export interface ISeriesEntities {
  id: string; // series entity id
  fyTokenAddress: Address;
  baseAddress: Address;
  poolAddress: Address;
  maturity: number;
}

// 2306 - New Naming Structure
const WETH_2306 = '0x0030ff00028b';
const DAI_2306 = '0x0031ff00028b';
const USDC_2306 = '0x0032ff00028b';
const FRAX_2306 = '0x0138ff00028b';
const USDT_2306 = '0x00a0ff00028b';

// 2306_R - RECOVERY series
const WETH_2306_R = '0x0030ff00028c';
const DAI_2306_R = '0x0031ff00028c';
const USDC_2306_R = '0x0032ff00028c';
const USDT_2306_R = '0x00A0ff00028c';

// 2309
const WETH_2309 = '0x0030ff00028e';
const DAI_2309 = '0x0031ff00028e';
const USDC_2309 = '0x0032ff00028e';
const FRAX_2309 = '0x0138ff00028e';
const USDT_2309 = '0x00a0ff00028e';

export const SERIES_ENTITIES = new Map<number, Map<string, ISeriesEntities>>();

SERIES_ENTITIES.set(
  1,
  new Map([
    /**
     * 2306
     * */
    [
      WETH_2306,
      {
        id: WETH_2306,
        fyTokenAddress: '0x124c9F7E97235Fe3E35820f95D10aFfCe4bE9168',
        baseAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        poolAddress: '0xD129B0351416C75C9f0623fB43Bb93BB4107b2A4',
        maturity: 1688137200,
      },
    ],
    [
      DAI_2306,
      {
        id: DAI_2306,
        fyTokenAddress: '0x9ca4D6fbE0Ba91d553e74805d2E2545b04AbEfEA',
        baseAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
        poolAddress: '0xC2a463278387e649eEaA5aE5076e283260B0B1bE',
        maturity: 1688137200,
      },
    ],
    [
      USDC_2306,
      {
        id: USDC_2306,
        fyTokenAddress: '0x667f185407C4CAb52aeb681f0006e4642d8091DF',
        baseAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        poolAddress: '0x06aaF385809c7BC00698f1E266eD4C78d6b8ba75',
        maturity: 1688137200,
      },
    ],
    [
      USDT_2306,
      {
        id: USDT_2306,
        fyTokenAddress: '0xa0e4b17042f20d9badbda9961c2d0987c90f6439',
        baseAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        poolAddress: '0xb4dbec738ffe47981d337c02cb5746e456ecd505',
        maturity: 1688137200,
      },
    ],

    [
      WETH_2306_R,
      {
        id: WETH_2306_R,
        fyTokenAddress: '0xc8110b03629211b946c2783637ABC9402b50EcDf',
        baseAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        poolAddress: '0x60995D90B45169eB04F1ea9463443a62B83ab1c1',
        maturity: 1688137200,
      },
    ],
    [
      DAI_2306_R,
      {
        id: DAI_2306_R,
        fyTokenAddress: '0xc7f12Ea237bE7BE6028285052CF3727EaF0e597B',
        baseAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
        poolAddress: '0x0bdF152f6d899F4B63b9554ED98D9b9d22FFdee4',
        maturity: 1688137200,
      },
    ],
    [
      USDC_2306_R,
      {
        id: USDC_2306_R,
        fyTokenAddress: '0x9912ED921832A8F6fc4a07E0892E5974A252043C',
        baseAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        poolAddress: '0xaCd0523Aca72CC58EC2f3d4C14F5473FC11c5C2D',
        maturity: 1688137200,
      },
    ],
    [
      FRAX_2306,
      {
        id: FRAX_2306,
        fyTokenAddress: '0xFA71e5f0072401dA161b1FC25a9636927AF690D0',
        baseAddress: '0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0',
        poolAddress: '0x2E8F62e3620497DbA8A2D7A18EA8212215805F22',
        maturity: 1688137200,
      },
    ],
    [
      USDT_2306_R,
      {
        id: USDT_2306_R,
        fyTokenAddress: '0xD28380De0e7093AC62bCb88610b9f4f4Fb58Be74',
        baseAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        poolAddress: '0x6E38B8d9dedd967961508708183678b4EC1B1E33',
        maturity: 1688137200,
      },
    ],

    /**
     * 2309
     * */
    [
      WETH_2309,
      {
        id: WETH_2309,
        fyTokenAddress: '0xD842A9f77e142f420BcdBCd6cFAC3548a68906dB',
        baseAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        poolAddress: '0xE56c9c47b271A58e5856004952c5F4D34a78B99B',
        maturity: 1695999600,
      },
    ],
    [
      DAI_2309,
      {
        id: DAI_2309,
        fyTokenAddress: '0xB917a6CD3f811A84c1c5B972E2c715a6d93f40aa',
        baseAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
        poolAddress: '0x9ce9c9f9fF417Ffc215A4e5c6b4e44BB76Cf8C79',
        maturity: 1695999600,
      },
    ],

    [
      USDC_2309,
      {
        id: USDC_2309,
        fyTokenAddress: '0x74c4cEa80c1afEAda2907B55FDD9C958Da4a53F2',
        baseAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        poolAddress: '0xFCd1C61139F8Af13c5090CfBb2dD674a2Ff4fe35',
        maturity: 1695999600,
      },
    ],
    [
      FRAX_2309,
      {
        id: FRAX_2309,
        fyTokenAddress: '0xB38Ba395D15392796B51057490bBc790871dd6a0',
        baseAddress: '0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0',
        poolAddress: '0xe2F6f40192F3E4568a62577E0541AC823b6f0D9e',
        maturity: 1695999600,
      },
    ],
    [
      USDT_2309,
      {
        id: USDT_2309,
        fyTokenAddress: '0x299c9e28D2c5efa09aa147abB4f1CB4a8dc7AbE0',
        baseAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        poolAddress: '0x0ECc79FE01b02548853c87466cCd57710bf9d11A',
        maturity: 1695999600,
      },
    ],
  ])
);
