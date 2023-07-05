export default [
  {
    inputs: [
      {
        internalType: 'contract ICauldron',
        name: 'cauldron',
        type: 'address',
      },
      { internalType: 'contract IWETH9', name: 'weth', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
    ],
    name: 'FeeSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'integration',
        type: 'address',
      },
      { indexed: true, internalType: 'bool', name: 'set', type: 'bool' },
    ],
    name: 'IntegrationAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes6',
        name: 'assetId',
        type: 'bytes6',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'join',
        type: 'address',
      },
    ],
    name: 'JoinAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'module',
        type: 'address',
      },
      { indexed: true, internalType: 'bool', name: 'set', type: 'bool' },
    ],
    name: 'ModuleAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes6',
        name: 'seriesId',
        type: 'bytes6',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'pool',
        type: 'address',
      },
    ],
    name: 'PoolAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      { indexed: true, internalType: 'bool', name: 'set', type: 'bool' },
    ],
    name: 'TokenAdded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'borrowingFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cauldron',
    outputs: [{ internalType: 'contract ICauldron', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'integrations',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes6', name: '', type: 'bytes6' }],
    name: 'joins',
    outputs: [{ internalType: 'contract IJoin', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'modules',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes6', name: '', type: 'bytes6' }],
    name: 'pools',
    outputs: [{ internalType: 'contract IPool', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'router',
    outputs: [{ internalType: 'contract Router', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'tokens',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'weth',
    outputs: [{ internalType: 'contract IWETH9', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' },
    ],
    name: 'wrap',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;