import { BigNumberish } from 'ethers';

export namespace LadleActions {
  export enum Fn {
    BATCH = 'batch',
    BUILD = 'build',
    EXIT_ETHER = 'exitEther',
    MODULE = 'moduleCall',
    ROUTE = 'route',
    SERVE = 'serve',
    TRANSFER = 'transfer',
  }

  export namespace Args {
    export type BUILD = [seriesId_bytes6: string, ilkId_bytes6: string, salt_bytes8: string];
    export type EXIT_ETHER = [to: string];
    export type MODULE = [targetAddress: string, encodedCall: string];
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
    WRAP = 'wrap',
    UNWRAP = 'unwrap',
  }

  export namespace Args {
    export type SELL_BASE = [receiver: string, min: BigNumberish];
    export type WRAP = [receiver: string];
    export type UNWRAP = [receiver: string];
  }
}

export namespace ModuleActions {
  export enum Fn {
    ADD_VAULT = 'addVault',
    WRAP_ETHER_MODULE = 'wrap',
  }
  export namespace Args {
    export type ADD_VAULT = [convexJoin: string, vaultId: string]; // when using convex-type collateral
    export type WRAP_ETHER_MODULE = [receiver: string, amount: BigNumberish];
  }
}
