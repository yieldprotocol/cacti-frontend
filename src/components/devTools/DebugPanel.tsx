import { Fragment, useState } from 'react';
import { Button } from '@/components/Button';
import { useChatContext } from '@/contexts/ChatContext';
import { shortenAddress } from '@/utils';

const CUSTOM_PROMPT = 'Custom Prompt';

export const DebugPanel = ({ handleClose }: { handleClose: () => void }) => {
  const { spoofBotMessage } = useChatContext();
  const [customMessage, setCustomMessage] = useState<string>('');

  const debugMessage = (spoofLabel: string, spoofText: string) => {
    const regex = new RegExp(/<\|([\w\-]*)\(([^\n]*)\)\|>/g);
    const widgetString = spoofText.match(regex);
    return (
      <Fragment key={spoofLabel}>
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            handleClose();
            spoofBotMessage(spoofText);
          }}
        >
          <span className="max-h-[64px] overflow-y-scroll text-xs">{spoofLabel}</span>
        </Button>
        <div className="flex flex-col justify-center break-words font-mono text-xs">
          {spoofLabel === CUSTOM_PROMPT ? (
            <input
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="customPrompt"
              type="text"
              placeholder="Prompt"
            ></input>
          ) : (
            <div className="h-[66px] overflow-y-auto">{widgetString}</div>
          )}
        </div>
      </Fragment>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {debugMessage(CUSTOM_PROMPT, customMessage)}
      <div />
      <div />
      {spoofPrompts
        .map((spoof) => {
          return debugMessage(spoof[0], spoof[1]);
        })
        .reverse()}
    </div>
  );
};

const assetsCollection =
  '{"collection":{"name":"display-nft-collection-container","params":{"network":"polygon-mainnet","address":"0x04509754d1E7CB093b76Ef70104ac64C8f40b167","name":"WildDogs","numAssets":50,"previewImageUrl":"https://cdn.center.app/137/0x04509754d1E7CB093b76Ef70104ac64C8f40b167/4/673fb869539d4094d8dfd9b5e5f063a43fa6bbe6a7d0d9d73214d5015c23529b.png"}},"assets":[{"name":"display-nft-asset-container","params":{"network":"polygon-mainnet","address":"0x04509754d1E7CB093b76Ef70104ac64C8f40b167","tokenId":"1","collectionName":"WildDogs","name":"WildDogs#1","previewImageUrl":"https://cdn.center.app/137/0x04509754d1E7CB093b76Ef70104ac64C8f40b167/1/6757c8551b78918ee114c0f1102e39781edf8dba4f9306ca836d4a068297c2e8.png"}},{"name":"display-nft-asset-container","params":{"network":"polygon-mainnet","address":"0x04509754d1E7CB093b76Ef70104ac64C8f40b167","tokenId":"2","collectionName":"WildDogs","name":"WildDogs#2","previewImageUrl":"https://cdn.center.app/137/0x04509754d1E7CB093b76Ef70104ac64C8f40b167/2/e4ebf66d3a6cdca52811349b923f476982dcf7ed288704e0c0595f7f4f42cfe5.png"}},{"name":"display-nft-asset-container","params":{"network":"polygon-mainnet","address":"0x04509754d1E7CB093b76Ef70104ac64C8f40b167","tokenId":"3","collectionName":"WildDogs","name":"WildDogs#3","previewImageUrl":"https://cdn.center.app/137/0x04509754d1E7CB093b76Ef70104ac64C8f40b167/3/2685eaeb2354774078062752dca6c2c44c9319085f354792e0f11476a4b23fb4.png"}},{"name":"display-nft-asset-container","params":{"network":"polygon-mainnet","address":"0x04509754d1E7CB093b76Ef70104ac64C8f40b167","tokenId":"4","collectionName":"WildDogs","name":"WildDogs#4","previewImageUrl":"https://cdn.center.app/137/0x04509754d1E7CB093b76Ef70104ac64C8f40b167/4/39692e1546bf7dd407c141a5b83380a399b2cb9824fd98e97a6f1d900a8a8405.png"}},{"name":"display-nft-asset-container","params":{"network":"polygon-mainnet","address":"0x04509754d1E7CB093b76Ef70104ac64C8f40b167","tokenId":"5","collectionName":"WildDogs","name":"WildDogs#5","previewImageUrl":"https://cdn.center.app/137/0x04509754d1E7CB093b76Ef70104ac64C8f40b167/5/e1669b564cab114559d2f8fb0a3814dc71233d5f800802f695b281b66cad3410.png"}},{"name":"display-nft-asset-container","params":{"network":"polygon-mainnet","address":"0x04509754d1E7CB093b76Ef70104ac64C8f40b167","tokenId":"6","collectionName":"WildDogs","name":"WildDogs#6","previewImageUrl":"https://cdn.center.app/137/0x04509754d1E7CB093b76Ef70104ac64C8f40b167/6/e87b64bf0483af24ca81eb7ed094f7b1c690189c45b3df30778be35b1ee61ca8.png"}},{"name":"display-nft-asset-container","params":{"network":"polygon-mainnet","address":"0x04509754d1E7CB093b76Ef70104ac64C8f40b167","tokenId":"7","collectionName":"WildDogs","name":"WildDogs#7","previewImageUrl":"https://cdn.center.app/137/0x04509754d1E7CB093b76Ef70104ac64C8f40b167/7/4e2bd4755ec5d90a186f22effefdb829c05d77ecbde62f90c3f7c43696fbbb38.png"}},{"name":"display-nft-asset-container","params":{"network":"polygon-mainnet","address":"0x04509754d1E7CB093b76Ef70104ac64C8f40b167","tokenId":"8","collectionName":"WildDogs","name":"WildDogs#8","previewImageUrl":"https://cdn.center.app/137/0x04509754d1E7CB093b76Ef70104ac64C8f40b167/8/968b0581c500d74293a9f2b1c2007c5a98ac5684e1a76dc85559d7e407d1fc9d.png"}},{"name":"display-nft-asset-container","params":{"network":"polygon-mainnet","address":"0x04509754d1E7CB093b76Ef70104ac64C8f40b167","tokenId":"9","collectionName":"WildDogs","name":"WildDogs#9","previewImageUrl":"https://cdn.center.app/137/0x04509754d1E7CB093b76Ef70104ac64C8f40b167/9/cbacba38adbfa8d7e6334b0c4a14a347d3795c01d16f043b196d3ba32f985257.png"}},{"name":"display-nft-asset-container","params":{"network":"polygon-mainnet","address":"0x04509754d1E7CB093b76Ef70104ac64C8f40b167","tokenId":"10","collectionName":"WildDogs","name":"WildDogs#10","previewImageUrl":"https://cdn.center.app/137/0x04509754d1E7CB093b76Ef70104ac64C8f40b167/10/73853839ce976b24ae7cfa30caa958a21e0aea1fbc4746806905ec867d057475.png"}}]}';

const spoofPrompts: [string, string][] = [
  [
    'Suggest an ETH transfer',
    `Sure, let me transfer that ETH. <|transfer("ETH", 0.01, "0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080")|> Click the above button to make the transfer.`,
  ],
  [
    'Suggest a DAI transfer',
    'Sure, let me transfer that DAI. <|transfer("DAI", 0.01, "0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080")|> Click the above button to make the transfer.',
  ],
  [
    'Suggest a DAI to UNI token swap on Uniswap',
    `Sure, let me swap that DAI into UNI. <|uniswap("DAI", "UNI", "SELLAMOUNT", 0.01)|> Click the above button to make the swap.`,
  ],
  [
    'Suggest a ETH to DAI token swap on Uniswap',
    'Sure, let me swap that ETH into DAI. <|uniswap("ETH", "DAI", "SELLAMOUNT", 0.01)|> Click the above button to make the swap.',
  ],
  ['Browse some dog NFTs', '<|nft-search("dogs")|>'],
  ['Get price of ETH in USDC', '<|price("ETH", "USDC")|>'],
  [
    `Get traits for NFT ${shortenAddress('0x23581767a106ae21c074b2276d25e5c3e136a68b')}:8566`,
    '<|nft-traits("0x23581767a106ae21c074b2276d25e5c3e136a68b", "8566")|>',
  ],
  [
    `Get traits for NFT collection ${shortenAddress(
      '0x23581767a106ae21c074b2276d25e5c3e136a68b'
    )}:5869`,
    '<|nft-collection-traits("0x23581767a106ae21c074b2276d25e5c3e136a68b")|>',
  ],
  [
    `Get NFTs by traits ${shortenAddress('0x23581767a106ae21c074b2276d25e5c3e136a68b')}`,
    '<|nfts-by-traits("0x23581767a106ae21c074b2276d25e5c3e136a68b", "Headwear", "Moon Hat")|>',
  ],
  [
    `Buy NFT ${shortenAddress('0x23581767a106ae21c074b2276d25e5c3e136a68b')}:3705`,
    '<|buy-nft("0x23581767a106ae21c074b2276d25e5c3e136a68b", "3705")|>',
  ],
  [`Deposit USDC into yield farm `, '<|yield-farm("compound", "ethereum", "USDC", "1")|>'], // Only works for this use case if your wallet has USDC
  [
    `Show NFT collection in a container `,
    '<|nft-collection-container("ethereum-mainnet", "0x23581767a106ae21c074b2276d25e5c3e136a68b", "Moonbirds", 10000, "https://cdn.center.app/1/0x23581767a106ae21c074b2276D25e5C3e136a68b/33/d186177c7c72a2bb41245cd9ce6280650394be19eaa85824ccaaf3e23d2bc20b.png")|>',
  ], // Only works for this use case if your wallet has USDC
  [
    `Show NFT asset in a container `,
    '<|nft-asset-container("ethereum-mainnet", "0x23581767a106ae21c074b2276d25e5c3e136a68b", "5869", "Moonbirds", "Moonbird #5869", "https://cdn.center.app/v2/1/72e3f71c5ae9875a5481aef5fdf3508ac49060b41d38b2e945269972d0655b81/7ddeb4472a74ab91c2566b0693005b6034b2278d1183df5b9772bec299fc0dc5.png", "123.4 ETH")|>',
  ],
  [
    `Show NFT asset trait container `,
    `<|nft-asset-traits-container({\"asset\":{\"name\":\"display-nft-asset-container\",\"params\":{\"network\":\"polygon-mainnet\",\"address\":\"0x04509754d1E7CB093b76Ef70104ac64C8f40b167\",\"tokenId\":\"9\",\"collectionName\":\"WildDogs\",\"name\":\"WildDogs#9\",\"previewImageUrl\":\"https://cdn.center.app/137/0x04509754d1E7CB093b76Ef70104ac64C8f40b167/9/cbacba38adbfa8d7e6334b0c4a14a347d3795c01d16f043b196d3ba32f985257.png\"}},\"values\":[{\"name\":\"display-nft-asset-trait-value-container\",\"params\":{\"trait\":\"background\",\"value\":\"purple\"}},{\"name\":\"display-nft-asset-trait-value-container\",\"params\":{\"trait\":\"skin\",\"value\":\"skin6\"}},{\"name\":\"display-nft-asset-trait-value-container\",\"params\":{\"trait\":\"suit\",\"value\":\"suit8\"}},{\"name\":\"display-nft-asset-trait-value-container\",\"params\":{\"trait\":\"eye\",\"value\":\"redeye\"}},{\"name\":\"display-nft-asset-trait-value-container\",\"params\":{\"trait\":\"scar\",\"value\":\"none\"}},{\"name\":\"display-nft-asset-trait-value-container\",\"params\":{\"trait\":\"accessory\",\"value\":\"woodenbat\"}},{\"name\":\"display-nft-asset-trait-value-container\",\"params\":{\"trait\":\"smoke\",\"value\":\"smoke\"}}]})|>`,
  ],
  [
    `Show NFT asset trait value container `,
    `<|nft-asset-trait-value-container({\"trait\":\"background\",\"value\":\"purple\"})|>`,
  ],
  [
    `Show NFT collection assets in a container `,
    `<|nft-collection-assets-container(${assetsCollection})|>`,
  ],
  [
    `Show NFT collection traits in a container`,
    `<|nft-collection-traits-container({\"network\":\"polygon-mainnet\",\"address\":\"0xbdb2127B89225875cD7a579911a0d4D6F70F89AE\",\"name\":\"DragonLordNFT\",\"traits\":[\"Ascertive\",\"Blessed\",\"Caring\",\"Fortunate\",\"GenesisDefense\",\"Health\",\"Lucky\",\"Nurturing\",\"PassiveAggressive\",\"PerfectVision\"]})|>`,
  ],
  [
    `Show NFT collection trait values in a container`,
    `<|nft-collection-trait-values-container({\"network\":\"polygon-mainnet\",\"address\":\"0xbdb2127B89225875cD7a579911a0d4D6F70F89AE\",\"name\":\"DragonLordNFT\",\"trait\":\"GenesisDefense\",\"values\":[\"10\"]})|>`,
  ],
  [
    `Show yield container row`,
    `<|yield-container({\"headers\":[{\"fieldName\":\"project\",\"displayName\":\"Project\"},{\"fieldName\":\"tvlUsd\",\"displayName\":\"TVL\"},{\"fieldName\":\"apy\",\"displayName\":\"APY\"},{\"fieldName\":\"apyAvg30d\",\"displayName\":\"30dayAvg.APY\"}],\"rowParams\":{\"token\":\"USDC\",\"network\":\"Ethereum\",\"project\":\"compound\",\"apy\":3.4375,\"apyAvg30d\":2.62986,\"tvlUsd\":131934173}})|>`,
  ],
  [
    'Show table container',
    `<|table-container({\"headers\":[{\"fieldName\":\"project\",\"displayName\":\"Project\"},{\"fieldName\":\"tvlUsd\",\"displayName\":\"TVL\"},{\"fieldName\":\"apy\",\"displayName\":\"APY\"},{\"fieldName\":\"apyAvg30d\",\"displayName\":\"30dayAvg.APY\"}],\"rows\":[{\"name\":\"display-yield-container\",\"params\":{\"token\":\"USDC\",\"network\":\"Ethereum\",\"project\":\"aave-v2\",\"apy\":1.77184,\"apyAvg30d\":1.78358,\"tvlUsd\":268107776}},{\"name\":\"display-yield-container\",\"params\":{\"token\":\"USDC\",\"network\":\"Ethereum\",\"project\":\"compound\",\"apy\":3.4375,\"apyAvg30d\":2.62986,\"tvlUsd\":131934173}},{\"name\":\"display-yield-container\",\"params\":{\"token\":\"USDC\",\"network\":\"Ethereum\",\"project\":\"morpho-aave\",\"apy\":1.88141,\"apyAvg30d\":2.00731,\"tvlUsd\":80209358}},{\"name\":\"display-yield-container\",\"params\":{\"token\":\"USDC\",\"network\":\"Ethereum\",\"project\":\"goldfinch\",\"apy\":20.80112,\"apyAvg30d\":19.96207,\"tvlUsd\":79861731}},{\"name\":\"display-yield-container\",\"params\":{\"token\":\"USDC\",\"network\":\"Ethereum\",\"project\":\"compound-v3\",\"apy\":1.95197,\"apyAvg30d\":1.93728,\"tvlUsd\":70750123}}]})|>`,
  ],
  [
    'Show list container',
    `<|list-container({\"items\":[{\"name\":\"display-nft-asset-container\",\"params\":{\"network\":\"polygon-mainnet\",\"address\":\"0xbdb2127B89225875cD7a579911a0d4D6F70F89AE\",\"tokenId\":\"1\",\"collectionName\":\"DragonLordNFT\",\"name\":\"HotGenesisPurebred\",\"previewImageUrl\":\"https://cdn.center.app/v2/137/0cb0398d1f0e062078f9d1d63bafb51b07a8b688a0ac43a04d4a1680efc5a141/da1be520eec736215de587d117e48998cb3c72480eca5b45bd5aeb847c87602d.png\"}},{\"name\":\"display-nft-asset-container\",\"params\":{\"network\":\"polygon-mainnet\",\"address\":\"0xbdb2127B89225875cD7a579911a0d4D6F70F89AE\",\"tokenId\":\"2\",\"collectionName\":\"DragonLordNFT\",\"name\":\"2\",\"previewImageUrl\":\"https://cdn.center.app/v2/137/92bafa9c0b575141ee0e09bfa7d145364601b2bf9998301d39ee3955685f3e68/dca4fbefee3fe9af6fd8b1769055798a7559fe3039558e3495c21d18b065a9f5.png\"}},{\"name\":\"display-nft-asset-container\",\"params\":{\"network\":\"polygon-mainnet\",\"address\":\"0xbdb2127B89225875cD7a579911a0d4D6F70F89AE\",\"tokenId\":\"3\",\"collectionName\":\"DragonLordNFT\",\"name\":\"HotGenesisPurebred\",\"previewImageUrl\":\"https://cdn.center.app/v2/137/1824eb79633090062682ef095074137c643db7b1dfde66bff1aaa9244ea1ed1d/40cc8a3786b2200986909fb12f9ce67e7dd970e9369882c2406f49e9ece79ec2.png\"}},{\"name\":\"display-nft-asset-container\",\"params\":{\"network\":\"polygon-mainnet\",\"address\":\"0xbdb2127B89225875cD7a579911a0d4D6F70F89AE\",\"tokenId\":\"4\",\"collectionName\":\"DragonLordNFT\",\"name\":\"4\",\"previewImageUrl\":\"https://cdn.center.app/v2/137/07357923a1424621bf80f5df64b7cc331777b74c440ae9c9fc0b6cc56cd4f0d5/be175d46e8fb4d0dc4b11ef8ae4d423a6066d864368908bc3b78a64ea545ece7.png\"}},{\"name\":\"display-nft-asset-container\",\"params\":{\"network\":\"polygon-mainnet\",\"address\":\"0xbdb2127B89225875cD7a579911a0d4D6F70F89AE\",\"tokenId\":\"5\",\"collectionName\":\"DragonLordNFT\",\"name\":\"HotGenesisPurebred\",\"previewImageUrl\":\"https://cdn.center.app/v2/137/920fdb7aa84bd7211f232e24bb3ad1f0aa32c03a5a3b6b8707338b5b55ab65ff/c1b2729a48d21073054a4eba588f7d3558f58264739669f635c5632b24497b7a.png\"}},{\"name\":\"display-nft-asset-container\",\"params\":{\"network\":\"polygon-mainnet\",\"address\":\"0xbdb2127B89225875cD7a579911a0d4D6F70F89AE\",\"tokenId\":\"6\",\"collectionName\":\"DragonLordNFT\",\"name\":\"6\",\"previewImageUrl\":\"https://cdn.center.app/v2/137/e0be463a70deb9cb806f14251d23df6fef2f309ba22ae14831d3b34af9a51461/c79eed5bd45efb94a7199a61dffb78097b7af45049e9aa070e86a2696262c789.png\"}},{\"name\":\"display-nft-asset-container\",\"params\":{\"network\":\"polygon-mainnet\",\"address\":\"0xbdb2127B89225875cD7a579911a0d4D6F70F89AE\",\"tokenId\":\"7\",\"collectionName\":\"DragonLordNFT\",\"name\":\"7\",\"previewImageUrl\":null}},{\"name\":\"display-nft-asset-container\",\"params\":{\"network\":\"polygon-mainnet\",\"address\":\"0xbdb2127B89225875cD7a579911a0d4D6F70F89AE\",\"tokenId\":\"8\",\"collectionName\":\"DragonLordNFT\",\"name\":\"HotGenesisPurebred\",\"previewImageUrl\":\"https://cdn.center.app/v2/137/255284eb895e6c45c3d8ac803e926d1194078a1b4b15ce566cb849762ab7301a/a6cae872257450a46ba132a30775d31fb07245620512849f90d386cda33bfd87.png\"}},{\"name\":\"display-nft-asset-container\",\"params\":{\"network\":\"polygon-mainnet\",\"address\":\"0xbdb2127B89225875cD7a579911a0d4D6F70F89AE\",\"tokenId\":\"9\",\"collectionName\":\"DragonLordNFT\",\"name\":\"9\",\"previewImageUrl\":null}},{\"name\":\"display-nft-asset-container\",\"params\":{\"network\":\"polygon-mainnet\",\"address\":\"0xbdb2127B89225875cD7a579911a0d4D6F70F89AE\",\"tokenId\":\"10\",\"collectionName\":\"DragonLordNFT\",\"name\":\"10\",\"previewImageUrl\":null}}]})|>`,
  ],
];
