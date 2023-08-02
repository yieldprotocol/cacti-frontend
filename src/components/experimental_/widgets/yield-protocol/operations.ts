import { BigNumberish } from 'ethers';

export namespace LadleActions {
  export enum Fn {
    BATCH = 'batch',
    BUILD = 'build',
    CLOSE = 'close',
    EXIT_ETHER = 'exitEther',
    JOIN_ETHER = 'joinEther',
    REDEEM = 'redeem',
    REPAY = 'repay',
    REPAY_VAULT = 'repayVault',
    SERVE = 'serve',
    TRANSFER = 'transfer',
    ROUTE = 'route',
    MODULE = 'moduleCall',
  }

  export namespace Args {
    export type BUILD = [seriesId_bytes6: string, ilkId_bytes6: string, salt_bytes8: string];
    export type CLOSE = [vaultId: string, to: string, ink: BigNumberish, art: BigNumberish];
    export type EXIT_ETHER = [to: string];
    export type JOIN_ETHER = [etherId: string];
    export type MODULE = [targetAddress: string, encodedCall: string];
    export type REDEEM = [seriesId: string, to: string, wad: BigNumberish];
    export type REPAY = [vaultId: string, to: string, ink: BigNumberish, min: BigNumberish];
    export type REPAY_VAULT = [vaultId: string, to: string, ink: BigNumberish, max: BigNumberish];
    export type ROUTE = [targetAddress: string, encodedCall: string];
    export type SERVE = [
      vaultId: string,
      to: string,
      ink: BigNumberish,
      base: BigNumberish,
      max: BigNumberish
    ];
    export type TRANSFER = [token: string, receiver: string, wad: BigNumberish];
  }
}

export namespace RoutedActions {
  export enum Fn {
    SELL_BASE = 'sellBase',
    SELL_FYTOKEN = 'sellFYToken',
    WRAP = 'wrap',
    UNWRAP = 'unwrap',
  }

  export namespace Args {
    export type SELL_BASE = [receiver: string, min: BigNumberish];
    export type SELL_FYTOKEN = [receiver: string, min: BigNumberish];
    export type WRAP = [receiver: string];
    export type UNWRAP = [receiver: string];
  }
}

export namespace ModuleActions {
  export enum Fn {
    WRAP_ETHER_MODULE = 'wrap',
  }
  export namespace Args {
    export type WRAP_ETHER_MODULE = [receiver: string, amount: BigNumberish];
  }
}
