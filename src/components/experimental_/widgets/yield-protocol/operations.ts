import { BigNumberish } from 'ethers';

export namespace LadleActions {
  export enum Fn {
    BATCH = 'batch',
    BUILD = 'build',
    TWEAK = 'tweak',
    GIVE = 'give',
    DESTROY = 'destroy',
    STIR = 'stir',
    POUR = 'pour',
    SERVE = 'serve',
    ROLL = 'roll',
    CLOSE = 'close',
    REPAY = 'repay',
    REPAY_VAULT = 'repayVault',
    REPAY_LADLE = 'repayLadle',

    REPAY_FROM_LADLE = 'repayFromLadle',
    CLOSE_FROM_LADLE = 'closeFromLadle',

    RETRIEVE = 'retrieve',
    FORWARD_PERMIT = 'forwardPermit',
    FORWARD_DAI_PERMIT = 'forwardDaiPermit',
    JOIN_ETHER = 'joinEther',
    EXIT_ETHER = 'exitEther',
    TRANSFER = 'transfer',
    ROUTE = 'route',
    REDEEM = 'redeem',
    MODULE = 'moduleCall',
  }

  export namespace Args {
    export type BUILD = [seriesId_bytes6: string, ilkId_bytes6: string, salt_bytes8: string];
    export type ROLL = [
      vaultId: string,
      newSeriesId: string,
      loan: BigNumberish,
      max: BigNumberish
    ];
    export type TWEAK = [vaultId: string, seriesId: string, ilkId: string];
    export type GIVE = [vaultId: string, to: string];
    export type DESTROY = [vaultId: string];
    export type STIR = [from: string, to: string, ink: BigNumberish, art: BigNumberish];
    export type POUR = [vaultId: string, to: string, ink: BigNumberish, art: BigNumberish];
    export type SERVE = [
      vaultId: string,
      to: string,
      ink: BigNumberish,
      base: BigNumberish,
      max: BigNumberish
    ];
    export type CLOSE = [vaultId: string, to: string, ink: BigNumberish, art: BigNumberish];
    export type REPAY = [vaultId: string, to: string, ink: BigNumberish, min: BigNumberish];
    export type REPAY_VAULT = [vaultId: string, to: string, ink: BigNumberish, max: BigNumberish];
    export type REPAY_LADLE = [vaultId: string];
    export type RETRIEVE = [assetAddress: string, to: string];

    export type REPAY_FROM_LADLE = [vaultId: string, to: string];
    export type CLOSE_FROM_LADLE = [vaultId: string, to: string];

    export type JOIN_ETHER = [etherId: string, overrides?: any];
    export type EXIT_ETHER = [to: string];
    export type TRANSFER = [token: string, receiver: string, wad: BigNumberish];

    export type REDEEM = [seriesId: string, to: string, wad: BigNumberish];

    export type FORWARD_PERMIT = [
      token: string,
      spender: string,
      amount: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: Buffer,
      s: Buffer
    ];
    export type FORWARD_DAI_PERMIT = [
      token: string,
      spender: string,
      nonce: BigNumberish,
      deadline: BigNumberish,
      approved: boolean,
      v: BigNumberish,
      r: Buffer,
      s: Buffer
    ];

    export type ROUTE = [targetAddress: string, encodedCall: string];
    export type MODULE = [targetAddress: string, encodedCall: string];
  }
}

export namespace RoutedActions {
  export enum Fn {
    SELL_BASE = 'sellBase',
    SELL_FYTOKEN = 'sellFYToken',

    MINT_POOL_TOKENS = 'mint',
    BURN_POOL_TOKENS = 'burn',
    MINT_WITH_BASE = 'mintWithBase',
    BURN_FOR_BASE = 'burnForBase',

    MINT_STRATEGY_TOKENS = 'mint',
    BURN_STRATEGY_TOKENS = 'burn',

    WRAP = 'wrap',
    UNWRAP = 'unwrap',

    CHECKPOINT = 'checkpoint', // convex
  }

  export namespace Args {
    export type SELL_BASE = [receiver: string, min: BigNumberish];
    export type SELL_FYTOKEN = [receiver: string, min: BigNumberish];

    export type MINT_POOL_TOKENS = [
      to: string,
      remainderTo: string,
      minRatio: BigNumberish,
      maxRatio: BigNumberish
    ];
    export type BURN_POOL_TOKENS = [
      baseTo: string,
      fyTokenTo: string,
      minRatio: BigNumberish,
      maxRatio: BigNumberish
    ];

    export type MINT_WITH_BASE = [
      to: string,
      remainderTo: string,
      fyTokenToBuy: BigNumberish,
      minRatio: BigNumberish,
      maxRatio: BigNumberish
    ];
    export type BURN_FOR_BASE = [receiver: string, minRatio: BigNumberish, maxRatio: BigNumberish];
    export type MINT_STRATEGY_TOKENS = [receiver: string];
    export type BURN_STRATEGY_TOKENS = [receiver: string];

    export type WRAP = [receiver: string];
    export type UNWRAP = [receiver: string];

    export type CHECKPOINT = [vaultOwner: string];
  }
}

export namespace ModuleActions {
  export enum Fn {
    WRAP_ETHER_MODULE = 'wrap',
    ADD_VAULT = 'addVault',
  }
  export namespace Args {
    export type WRAP_ETHER_MODULE = [receiver: string, amount: BigNumberish];
    export type ADD_VAULT = [convexJoin: string, vaultId: string]; // when using convex-type collateral
  }
}
