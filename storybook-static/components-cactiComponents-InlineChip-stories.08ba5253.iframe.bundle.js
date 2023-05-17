(self.webpackChunkchatweb3_frontend=self.webpackChunkchatweb3_frontend||[]).push([[480],{"./node_modules/@heroicons/react/24/outline/DocumentDuplicateIcon.js":(module,__unused_webpack_exports,__webpack_require__)=>{const React=__webpack_require__("./node_modules/react/index.js");const ForwardRef=React.forwardRef((function DocumentDuplicateIcon({title,titleId,...props},svgRef){return React.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:svgRef,"aria-labelledby":titleId},props),title?React.createElement("title",{id:titleId},title):null,React.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"}))}));module.exports=ForwardRef},"./src/components/cactiComponents/InlineChip.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CopyButton:()=>CopyButton,NonAddressText:()=>NonAddressText,Primary:()=>Primary,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Primary$parameters,_Primary$parameters2,_Primary$parameters2$,_CopyButton$parameter,_CopyButton$parameter2,_CopyButton$parameter3,_NonAddressText$param,_NonAddressText$param2,_NonAddressText$param3,_Users_brucedonovan_dev_yield_chatweb3_frontend_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_Users_brucedonovan_dev_yield_chatweb3_frontend_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const __WEBPACK_DEFAULT_EXPORT__={title:"cacti/InlineChip",component:__webpack_require__("./src/components/cactiComponents/InlineChip.tsx").p,tags:["autodocs"],argTypes:{label:{description:'Text to display. Will be shortened if an address("0x"prefix).',default:"0x1Bd3Abb6ef058408734EA01cA81D325039cd7bcA",control:"text"},showCopyButton:{default:!1,description:"Show copy button",controls:"boolean"},image:{control:{type:"file",accept:[".jpg",".svg",".png"]}}}};var Primary={args:{label:"0x1Bd3Abb6ef058408734EA01cA81D325039cd7bcA",showCopyButton:!1},parameters:{design:{type:"figma",url:"https://www.figma.com/file/LwiLzvSwxYijBrYxjgdHHy/OG_DarkMode?type=design&node-id=137-65144&t=UkXHkyBt9a9nIFsL-4"}}},CopyButton={args:{label:"0x1Bd3Abb6ef058408734EA01cA81D325039cd7bcA",showCopyButton:!0}},NonAddressText={args:{label:"Ethereum"}};Primary.parameters=_objectSpread(_objectSpread({},Primary.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Primary$parameters=Primary.parameters)||void 0===_Primary$parameters?void 0:_Primary$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    // primary: true,\n    label: '0x1Bd3Abb6ef058408734EA01cA81D325039cd7bcA',\n    showCopyButton: false\n  }\n}"},null===(_Primary$parameters2=Primary.parameters)||void 0===_Primary$parameters2||null===(_Primary$parameters2$=_Primary$parameters2.docs)||void 0===_Primary$parameters2$?void 0:_Primary$parameters2$.source)})}),CopyButton.parameters=_objectSpread(_objectSpread({},CopyButton.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_CopyButton$parameter=CopyButton.parameters)||void 0===_CopyButton$parameter?void 0:_CopyButton$parameter.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    label: '0x1Bd3Abb6ef058408734EA01cA81D325039cd7bcA',\n    showCopyButton: true\n  }\n}"},null===(_CopyButton$parameter2=CopyButton.parameters)||void 0===_CopyButton$parameter2||null===(_CopyButton$parameter3=_CopyButton$parameter2.docs)||void 0===_CopyButton$parameter3?void 0:_CopyButton$parameter3.source)})}),NonAddressText.parameters=_objectSpread(_objectSpread({},NonAddressText.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_NonAddressText$param=NonAddressText.parameters)||void 0===_NonAddressText$param?void 0:_NonAddressText$param.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    label: 'Ethereum'\n  }\n}"},null===(_NonAddressText$param2=NonAddressText.parameters)||void 0===_NonAddressText$param2||null===(_NonAddressText$param3=_NonAddressText$param2.docs)||void 0===_NonAddressText$param3?void 0:_NonAddressText$param3.source)})})},"./src/components/cactiComponents/InlineChip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{p:()=>InlineChip});var react=__webpack_require__("./node_modules/react/index.js"),next_image=__webpack_require__("./node_modules/next/image.js"),image_default=__webpack_require__.n(next_image),DocumentDuplicateIcon=__webpack_require__("./node_modules/@heroicons/react/24/outline/DocumentDuplicateIcon.js");const punk2042={src:"static/media/punk2042.d8387159.png",height:24,width:24,blurDataURL:"static/media/punk2042.d8387159.png"};var utils=__webpack_require__("./src/utils/index.tsx"),__jsx=react.createElement,InlineChip=function InlineChip(props){return __jsx("div",{className:"\n      height-[32px] \n      inline-block \n      rounded-[8px] \n      bg-white bg-opacity-5 \n      px-[8px] py-[2px]\n      text-sm text-white text-opacity-70\n      hover:shadow-lg focus:shadow-lg focus:outline-none\n     "},__jsx("div",{className:"flex gap-[8px] p-1"},__jsx("div",{className:"flex items-center gap-[8px]"},props.image?__jsx("img",{src:props.image,className:"h-[16px] w-[16px] rounded-full",alt:"Avatar"}):__jsx(image_default(),{src:punk2042,className:"h-[16px] w-[16px] rounded-full bg-slate-600 ".concat(!props.image&&"p-1"),alt:"Avatar"}),__jsx("div",null,"0x"!==props.label.slice(0,2)?props.label:(0,utils.Xn)(props.label))),__jsx("div",null,props.showCopyButton&&__jsx("div",{className:"w-[16px]"},__jsx(DocumentDuplicateIcon,null)))))};InlineChip.displayName="InlineChip",InlineChip.__docgenInfo={description:"Inline Chips are Elements that represent an Icon that repre sents a service, app, contract, address or token a user interacts with.\n\nIncludes:\nImage\nLabel(will be shortened if address)\nshowCopyButton",methods:[],displayName:"InlineChip"};try{InlineChip.displayName="InlineChip",InlineChip.__docgenInfo={description:"Inline Chips are Elements that represent an Icon that repre sents a service, app, contract, address or token a user interacts with.\n\nIncludes:\nImage\nLabel(will be shortened if address)\nshowCopyButton",displayName:"InlineChip",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/cactiComponents/InlineChip.tsx#InlineChip"]={docgenInfo:InlineChip.__docgenInfo,name:"InlineChip",path:"src/components/cactiComponents/InlineChip.tsx#InlineChip"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Xn:()=>shortenAddress,xi:()=>findProjectByName,y5:()=>findTokenBySymbol});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_utils_ProjectList_json__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/utils/ProjectList.json"),_utils_TokenList_json__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/utils/TokenList.json"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement,shortenAddress=function shortenAddress(address){return address.slice(0,6)+"..."+address.slice(-4)},findTokenBySymbol=function findTokenBySymbol(symbol,chainId){return _utils_TokenList_json__WEBPACK_IMPORTED_MODULE_2__.TV.find((function(token){return token.symbol.toUpperCase()===symbol.toUpperCase()&&token.chainId===chainId}))},formatToEther=function formatToEther(amount){return utils.formatEther(amount)},formatToWei=function formatToWei(amount){return utils.parseEther(amount).toString()},findProjectByName=function findProjectByName(name){var found=_utils_ProjectList_json__WEBPACK_IMPORTED_MODULE_1__.find((function(project){var _project$slug,_project$id;return project.name.toLowerCase()==name.toLowerCase()||(null===(_project$slug=project.slug)||void 0===_project$slug?void 0:_project$slug.toLowerCase())==name.toLowerCase()||(null===(_project$id=project.id)||void 0===_project$id?void 0:_project$id.toLowerCase())==name.toLowerCase()}));if(!found)throw new Error("No project found for name ".concat(name));return{id:found.slug,name:found.name,url:found.url,logo:found.logo,description:found.description,slug:found.slug,category:found.category,twitter:found.twitter,parentProtocol:found.parentProtocol}},Spinner=function Spinner(_ref){var className=_ref.className;return __jsx("svg",{className:"-ml-1 mr-3 h-5 w-5 animate-spin text-black ".concat(className),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},__jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),__jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}))};Spinner.displayName="Spinner";Spinner.__docgenInfo={description:"",methods:[],displayName:"Spinner",props:{className:{required:!1,tsType:{name:"string"},description:""}}};try{shortenAddress.displayName="shortenAddress",shortenAddress.__docgenInfo={description:"",displayName:"shortenAddress",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/index.tsx#shortenAddress"]={docgenInfo:shortenAddress.__docgenInfo,name:"shortenAddress",path:"src/utils/index.tsx#shortenAddress"})}catch(__react_docgen_typescript_loader_error){}try{formatToEther.displayName="formatToEther",formatToEther.__docgenInfo={description:"",displayName:"formatToEther",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/index.tsx#formatToEther"]={docgenInfo:formatToEther.__docgenInfo,name:"formatToEther",path:"src/utils/index.tsx#formatToEther"})}catch(__react_docgen_typescript_loader_error){}try{formatToWei.displayName="formatToWei",formatToWei.__docgenInfo={description:"",displayName:"formatToWei",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/index.tsx#formatToWei"]={docgenInfo:formatToWei.__docgenInfo,name:"formatToWei",path:"src/utils/index.tsx#formatToWei"})}catch(__react_docgen_typescript_loader_error){}try{findProjectByName.displayName="findProjectByName",findProjectByName.__docgenInfo={description:"",displayName:"findProjectByName",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/index.tsx#findProjectByName"]={docgenInfo:findProjectByName.__docgenInfo,name:"findProjectByName",path:"src/utils/index.tsx#findProjectByName"})}catch(__react_docgen_typescript_loader_error){}try{Spinner.displayName="Spinner",Spinner.__docgenInfo={description:"",displayName:"Spinner",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/utils/index.tsx#Spinner"]={docgenInfo:Spinner.__docgenInfo,name:"Spinner",path:"src/utils/index.tsx#Spinner"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/ProjectList.json":module=>{"use strict";module.exports=JSON.parse('[{"id":"114","name":"Compound","address":"0xc00e94cb662c3520282e6f5717214004a7f26888","symbol":"COMP","url":"https://app.compound.finance","description":"Compound is an algorithmic, autonomous interest rate protocol built for developers, to unlock a universe of open financial applications.","chain":"Ethereum","logo":"https://icons.llama.fi/compound.png","audits":"2","audit_note":null,"gecko_id":null,"cmcId":null,"category":"Lending","chains":["Ethereum"],"module":"compound-onchain/index.js","twitter":"compoundfinance","audit_links":["https://compound.finance/docs/security"],"oracles":["Chainlink"],"parentProtocol":"Compound Finance","treasury":"compound.js","slug":"compound"},{"id":"111","name":"AAVE V2","address":"0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9","symbol":"AAVE","url":"https://aave.com","description":"Aave is an Open Source and Non-Custodial protocol to earn interest on deposits and borrow assets","chain":"Multi-Chain","logo":"https://icons.llama.fi/aave-v2.png","audits":"2","audit_note":null,"gecko_id":"aave","cmcId":"7278","category":"Lending","chains":["Ethereum","Polygon","Avalanche"],"module":"aave/index.js","twitter":"AaveAave","treasury":"aave.js","audit_links":["https://aave.com/security"],"oracles":["Chainlink"],"parentProtocol":"AAVE","slug":"aave-v2"},{"name":"Uniswap","symbol":"UNI","url":"https://app.uniswap.org/#/swap","description":"Uniswap is a protocol for automated token exchange on Ethereum","chain":"Ethereum","logo":"https://icons.llama.fi/uniswap.png","parentProtocol":"Uniswap","slug":"uniswap"}]')}}]);