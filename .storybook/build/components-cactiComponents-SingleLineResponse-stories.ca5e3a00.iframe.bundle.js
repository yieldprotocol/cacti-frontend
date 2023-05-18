"use strict";(self.webpackChunkchatweb3_frontend=self.webpackChunkchatweb3_frontend||[]).push([[7023],{"./src/components/cactiComponents/SingleLineResponse.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>SingleLineResponse_stories});var _Primary$parameters,_Primary$parameters2,_Primary$parameters2$,defineProperty=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/react/index.js"),SkeletonWrap=__webpack_require__("./src/components/SkeletonWrap.tsx"),utils=__webpack_require__("./src/utils/index.tsx"),InlineChip=__webpack_require__("./src/components/cactiComponents/InlineChip.tsx"),cactiLayout=__webpack_require__("./src/components/cactiComponents/helpers/cactiLayout.tsx"),__jsx=react.createElement,SingleLineResponse=function SingleLineResponse(props){var _useState=(0,react.useState)(),token=_useState[0],setToken=_useState[1],_useState2=(0,react.useState)(props.value),amount=_useState2[0],setAmount=_useState2[1];return(0,react.useMemo)((function(){if(props.tokenSymbol)try{var _token=(0,utils.y5)(props.tokenSymbol,1);setToken(_token)}catch(e){setToken(void 0)}setAmount(props.value)}),[props]),__jsx(cactiLayout.Uw,null,__jsx("div",null,token&&__jsx("div",{className:"flex items-center justify-between gap-[8px]"},__jsx(InlineChip.p,{label:null==token?void 0:token.symbol,image:null==token?void 0:token.logoURI}),__jsx("div",{className:"text-lg"},"<pending>"!==amount?amount:__jsx(SkeletonWrap.Z,{width:50})))))};SingleLineResponse.displayName="SingleLineResponse",SingleLineResponse.__docgenInfo={description:"Header Response Elements are indicating with what app, service, or contract a user is about to interact. User have the option to leave the service and open in a new window a direct link to the app or service if they want to interact through their UI rather through our interface.\nIncludes: Text, ProjectId, Image, Button (Go to Service)",methods:[],displayName:"SingleLineResponse"};try{SingleLineResponse.displayName="SingleLineResponse",SingleLineResponse.__docgenInfo={description:"Header Response Elements are indicating with what app, service, or contract a user is about to interact. User have the option to leave the service and open in a new window a direct link to the app or service if they want to interact through their UI rather through our interface.\nIncludes: Text, ProjectId, Image, Button (Go to Service)",displayName:"SingleLineResponse",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/cactiComponents/SingleLineResponse.tsx#SingleLineResponse"]={docgenInfo:SingleLineResponse.__docgenInfo,name:"SingleLineResponse",path:"src/components/cactiComponents/SingleLineResponse.tsx#SingleLineResponse"})}catch(__react_docgen_typescript_loader_error){}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const SingleLineResponse_stories={title:"cacti/SingleLineResponse",component:SingleLineResponse,tags:["autodocs"],argTypes:{tokenSymbol:{description:"Token associated with this component.",default:"ETH",control:"text"},value:{description:"Numeric Value to display.",default:void 0,control:"number"},altImageUrl:{description:"Custom Image to display instead of the one associated with the project name.",default:void 0,control:"file"}}};var Primary={args:{tokenSymbol:"DAI",value:100.67},parameters:{design:{type:"figma",url:"https://www.figma.com/file/UraHvlIzwoXoOYjcIir9f7/Web3-GPT-UI-(Shared)?type=design&node-id=1-1286&t=kXokOLIsHPcqr2xK-4"}}};Primary.parameters=_objectSpread(_objectSpread({},Primary.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Primary$parameters=Primary.parameters)||void 0===_Primary$parameters?void 0:_Primary$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    tokenSymbol: 'DAI',\n    value: 100.67\n  }\n}"},null===(_Primary$parameters2=Primary.parameters)||void 0===_Primary$parameters2||null===(_Primary$parameters2$=_Primary$parameters2.docs)||void 0===_Primary$parameters2$?void 0:_Primary$parameters2$.source)})})}}]);