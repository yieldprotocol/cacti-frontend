import { BigNumberish } from 'ethers';

export namespace LadleActions {
  export enum Fn {
    BATCH = 'batch',
    TRANSFER = 'transfer',
    ROUTE = 'route',
    MODULE = 'moduleCall',
  }

  export namespace Args {
    export type TRANSFER = [token: string, receiver: string, wad: BigNumberish];
    export type ROUTE = [targetAddress: string, encodedCall: string];
    export type MODULE = [targetAddress: string, encodedCall: string];
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
    WRAP_ETHER_MODULE = 'wrap',
  }
  export namespace Args {
    export type WRAP_ETHER_MODULE = [receiver: string, amount: BigNumberish];
  }
}
