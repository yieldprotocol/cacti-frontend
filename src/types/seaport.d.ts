enum OrderType {
  // 0: no partial fills, anyone can execute
  FULL_OPEN,

  // 1: partial fills supported, anyone can execute
  PARTIAL_OPEN,

  // 2: no partial fills, only offerer or zone can execute
  FULL_RESTRICTED,

  // 3: partial fills supported, only offerer or zone can execute
  PARTIAL_RESTRICTED,

  // 4: contract order type
  CONTRACT,
}

enum ItemType {
  // 0: ETH on mainnet, MATIC on polygon, etc.
  NATIVE,

  // 1: ERC20 items (ERC777 and ERC20 analogues could also technically work)
  ERC20,

  // 2: ERC721 items
  ERC721,

  // 3: ERC1155 items
  ERC1155,

  // 4: ERC721 items where a number of tokenIds are supported
  ERC721_WITH_CRITERIA,

  // 5: ERC1155 items where a number of ids are supported
  ERC1155_WITH_CRITERIA,
}

export interface OfferItem {
  itemType: ItemType;
  token: string;
  identifierOrCriteria: BigNumberish;
  startAmount: BigNumberish;
  endAmount: BigNumberish;
  recipient: string;
}

export interface ConsiderationItem {
  itemType: ItemType;
  token: string;
  identifierOrCriteria: BigNumberish;
  startAmount: BigNumberish;
  endAmount: BigNumberish;
  recipient: string;
}

export interface OrderParameters {
  offerer: string;
  zone: string;
  offer: OfferItem[];
  consideration: ConsiderationItem[];
  orderType: OrderType;
  startTime: BigNumberish;
  endTime: BigNumberish;
  zoneHash: string;
  salt: BigNumberish;
  conduitKey: string;
  totalOriginalConsiderationItems: BigNumberish;
}

export interface Order {
  parameters: OrderParameters;
  signature: string;
}
