// import { type PublicClient, getPublicClient } from '@wagmi/core'
// import { FallbackProvider, JsonRpcProvider } from 'ethers'
// import { type HttpTransport } from 'viem'
 
// export function publicClientToProvider(publicClient: PublicClient) {
//   const { chain, transport } = publicClient
//   const network = {
//     chainId: chain.id,
//     name: chain.name,
//     ensAddress: chain.contracts?.ensRegistry?.address,
//   }
//   if (transport.type === 'fallback') {
//     const providers = (transport.transports as ReturnType<HttpTransport>[]).map(
//       ({ value }) => new JsonRpcProvider(value?.url, network),
//     )
//     if (providers.length === 1) return providers[0]
//     return new FallbackProvider(providers)
//   }
//   return new JsonRpcProvider(transport.url, network)
// }
 
// /** Action to convert a viem Public Client to an ethers.js Provider. */
// export function getEthersProvider({ chainId }: { chainId?: number } = {}) {
//   const publicClient = getPublicClient({ chainId })
//   return publicClientToProvider(publicClient)
// }