"use strict";(self.webpackChunkchatweb3_frontend=self.webpackChunkchatweb3_frontend||[]).push([[144],{"./src/components/cactiComponents/ActionResponse.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_:()=>ActionResponse});var defineProperty=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),taggedTemplateLiteral=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js"),react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-loading-skeleton/dist/index.mjs"),chunk_GEBDUYT7=__webpack_require__("./node_modules/@rainbow-me/rainbowkit/dist/chunk-GEBDUYT7.js"),tailwind_styled_components_esm=__webpack_require__("./node_modules/tailwind-styled-components/dist/tailwind-styled-components.esm.js"),wagmi_dist=__webpack_require__("./node_modules/wagmi/dist/index.js"),asyncToGenerator=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),regenerator=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),addresses=__webpack_require__("./node_modules/@ethersproject/constants/lib.esm/addresses.js"),bignumber=__webpack_require__("./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js"),chunk_BTYZYIHC=__webpack_require__("./node_modules/@wagmi/core/dist/chunk-BTYZYIHC.js"),SettingsContext=__webpack_require__("./src/contexts/SettingsContext.tsx"),axios=__webpack_require__("./node_modules/axios/lib/axios.js"),json_rpc_provider=__webpack_require__("./node_modules/@ethersproject/providers/lib.esm/json-rpc-provider.js"),lib_esm=__webpack_require__("./node_modules/@ethersproject/bytes/lib.esm/index.js"),immutable_dist=__webpack_require__("./node_modules/swr/immutable/dist/index.mjs");const hooks_useForkTools=function useForkTools(id){var settings=(0,react.useContext)(SettingsContext.ZP).settings,isForkedEnv=settings.isForkedEnv,forkId=settings.forkId,forkUrl="https://rpc.tenderly.co/fork/".concat(id||forkId),account=(0,wagmi_dist.mA)().address,refetch=(0,wagmi_dist.KQ)({address:account}).refetch,provider=(0,wagmi_dist.yL)(),forkProvider=(0,react.useMemo)((function(){return forkUrl?new json_rpc_provider.r(forkUrl):void 0}),[forkUrl]),forkSigner=isForkedEnv&&forkUrl?null==forkProvider?void 0:forkProvider.getSigner(account):void 0,createNewFork=(0,react.useCallback)((0,asyncToGenerator.Z)(regenerator_default().mark((function _callee(){var forkAPI,currentBlockNumber,resp;return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return forkAPI="http://api.tenderly.co/api/v1/account/".concat("Yield","/project/").concat("chatweb3","/fork"),_context.next=3,provider.getBlockNumber();case 3:return currentBlockNumber=_context.sent,_context.next=6,axios.Z.post(forkAPI,{network_id:1,block_number:currentBlockNumber},{headers:{"X-Access-Key":"tKosvsANtW4pI7YUzIACLNSfGr01I2Nr"}});case 6:return resp=_context.sent,_context.abrupt("return","https://rpc.tenderly.co/fork/".concat(resp.data.simulation_fork.id));case 8:case"end":return _context.stop()}}),_callee)}))),[provider]),getForkTimestamp=(0,react.useCallback)((0,asyncToGenerator.Z)(regenerator_default().mark((function _callee2(){var _yield$provider$getBl,timestamp;return regenerator_default().wrap((function _callee2$(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:if(isForkedEnv&&provider){_context2.next=2;break}return _context2.abrupt("return");case 2:return _context2.prev=2,_context2.next=5,provider.getBlock("latest");case 5:return _yield$provider$getBl=_context2.sent,timestamp=_yield$provider$getBl.timestamp,console.log("Updated Forked Blockchain time: ",new Date(1e3*timestamp)),_context2.abrupt("return",timestamp);case 11:return _context2.prev=11,_context2.t0=_context2.catch(2),console.log("Error getting latest timestamp",_context2.t0),_context2.abrupt("return",void 0);case 15:case"end":return _context2.stop()}}),_callee2,null,[[2,11]])}))),[provider,isForkedEnv]),getForkStartBlock=(0,react.useCallback)((0,asyncToGenerator.Z)(regenerator_default().mark((function _callee3(){var num,sBlock;return regenerator_default().wrap((function _callee3$(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:if(isForkedEnv&&provider){_context3.next=2;break}return _context3.abrupt("return","earliest");case 2:return _context3.prev=2,_context3.next=5,null==forkProvider?void 0:forkProvider.send("tenderly_getForkBlockNumber",[]);case 5:return num=_context3.sent,sBlock=+num.toString(),console.log("Fork start block: ",sBlock),_context3.abrupt("return",sBlock);case 11:return _context3.prev=11,_context3.t0=_context3.catch(2),console.log("Could not get tenderly start block: ",_context3.t0),_context3.abrupt("return","earliest");case 15:case"end":return _context3.stop()}}),_callee3,null,[[2,11]])}))),[isForkedEnv,provider,forkProvider]),fillEther=(0,react.useCallback)((0,asyncToGenerator.Z)(regenerator_default().mark((function _callee4(){var transactionParameters;return regenerator_default().wrap((function _callee4$(_context4){for(;;)switch(_context4.prev=_context4.next){case 0:if(provider&&isForkedEnv){_context4.next=2;break}return _context4.abrupt("return");case 2:return _context4.prev=2,transactionParameters=[[account],lib_esm.hexValue(BigInt("100000000000000000000"))],_context4.next=6,null==forkProvider?void 0:forkProvider.send("tenderly_addBalance",transactionParameters);case 6:refetch(),console.log("Filled eth on fork"),_context4.next=13;break;case 10:_context4.prev=10,_context4.t0=_context4.catch(2),console.log("Could not fill eth on Tenderly fork");case 13:case"end":return _context4.stop()}}),_callee4,null,[[2,10]])}))),[provider,isForkedEnv,account,forkProvider,refetch]);return{forkTimestamp:(0,immutable_dist.Z)(isForkedEnv?["forkTimestamp",forkUrl]:null,getForkTimestamp).data,forkStartBlock:(0,immutable_dist.Z)(isForkedEnv?["forkStartBlock",forkUrl]:null,getForkStartBlock).data,createNewFork,fillEther,provider:forkProvider,signer:forkSigner}};const hooks_useSigner=function useSigner(){var isForkedEnv=(0,react.useContext)(SettingsContext.ZP).settings.isForkedEnv,wagmiSigner=(0,wagmi_dist.mx)().data,forkSigner=hooks_useForkTools().signer;return isForkedEnv?forkSigner:wagmiSigner};var constants_lib_esm=__webpack_require__("./node_modules/@ethersproject/constants/lib.esm/index.js"),utils=__webpack_require__("./src/utils/index.tsx");const hooks_useToken=function useToken(tokenSymbol,tokenAddress){var chainId=(0,wagmi_dist.xx)(),getTokenIsETH=function getTokenIsETH(tokenSymbol,tokenAddress){return"ETH"===tokenSymbol||tokenAddress===constants_lib_esm.dE},getToken=function getToken(tokenSymbol,tokenAddress){return getTokenIsETH(tokenSymbol,tokenAddress)?{address:constants_lib_esm.dE,symbol:"ETH",decimals:18,logoURI:"https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png"}:tokenSymbol?(0,utils.y5)(tokenSymbol,chainId):tokenAddress?(0,utils.Td)(tokenAddress,chainId):void 0};return{data:getToken(tokenSymbol,tokenAddress),isETH:getTokenIsETH(tokenSymbol,tokenAddress),getToken,getTokenIsETH}};var useApproval=function useApproval(params){if(void 0===params||params.address===addresses.d)return{approve:void 0,hasAllowance:!0};var amount=params.amount,address=params.address,spender=params.spender,token=hooks_useToken(void 0,address).data,amountToUse=bignumber.O$.from((0,utils.A7)(amount.toString(),null==token?void 0:token.decimals)),_useState=(0,react.useState)(),hash=_useState[0],setHash=_useState[1],_useState2=(0,react.useState)(!1),txPending=_useState2[0],setTxPending=_useState2[1],signer=hooks_useSigner(),account=(0,wagmi_dist.mA)().address,_useContractRead=(0,wagmi_dist.do)({address:spender?address:void 0,abi:chunk_BTYZYIHC.em,functionName:"allowance",args:[account,spender],scopeKey:"allowance_".concat(address),cacheTime:2e4,enabled:!0}),allowanceAmount=_useContractRead.data,refetchAllowance=_useContractRead.refetch,isForkedEnv=(0,react.useContext)(SettingsContext.ZP).settings.isForkedEnv,contract=(0,wagmi_dist.cq)({address,abi:chunk_BTYZYIHC.em,signerOrProvider:signer}),tokenConfig=(0,wagmi_dist.PJ)({address:spender?address:void 0,abi:chunk_BTYZYIHC.em,functionName:"approve",args:[spender,amountToUse]}).config,_useContractWrite=(0,wagmi_dist.GG)(tokenConfig),approvalWriteAsync=(_useContractWrite.write,_useContractWrite.writeAsync),approveTx=function(){var _ref=(0,asyncToGenerator.Z)(regenerator_default().mark((function _callee(){var tx,_tx;return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:if(setTxPending(!0),_context.prev=1,!isForkedEnv){_context.next=9;break}return _context.next=5,null==contract?void 0:contract.approve(spender,amountToUse);case 5:tx=_context.sent,setHash(null==tx?void 0:tx.hash),_context.next=13;break;case 9:return _context.next=11,null==approvalWriteAsync?void 0:approvalWriteAsync();case 11:_tx=_context.sent,setHash(null==_tx?void 0:_tx.hash);case 13:_context.next=19;break;case 15:_context.prev=15,_context.t0=_context.catch(1),console.log("user rejected approval"),setTxPending(!1);case 19:setTxPending(!1);case 20:case"end":return _context.stop()}}),_callee,null,[[1,15]])})));return function approveTx(){return _ref.apply(this,arguments)}}(),_useWaitForTransactio=(0,wagmi_dist.BX)({hash,onSuccess:function onSuccess(){return refetchAllowance()}}),data=_useWaitForTransactio.data,isError=_useWaitForTransactio.isError,isLoading=_useWaitForTransactio.isLoading,isSuccess=_useWaitForTransactio.isSuccess;return{approveTx,refetchAllowance,approvalReceipt:data,approvalHash:hash,approvalTransacting:isLoading,approvalWaitingOnUser:txPending,approvalError:isError,approvalSuccess:isSuccess,hasAllowance:null==allowanceAmount?void 0:allowanceAmount.gte(amountToUse)}};const hooks_useApproval=useApproval;try{useApproval.displayName="useApproval",useApproval.__docgenInfo={description:"",displayName:"useApproval",props:{amount:{defaultValue:null,description:"",name:"amount",required:!0,type:{name:"BigNumber"}},address:{defaultValue:null,description:"",name:"address",required:!0,type:{name:"`0x${string}`"}},spender:{defaultValue:null,description:"",name:"spender",required:!0,type:{name:"`0x${string}`"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/cactiComponents/hooks/useApproval.tsx#useApproval"]={docgenInfo:useApproval.__docgenInfo,name:"useApproval",path:"src/components/cactiComponents/hooks/useApproval.tsx#useApproval"})}catch(__react_docgen_typescript_loader_error){}const erc1155ABI_namespaceObject=JSON.parse('[{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]');const hooks_useBalance=function useBalance(address,compareAmount,erc1155TokenId){var account=(0,wagmi_dist.mA)().address,isETH=!address||constants_lib_esm.dE,_useBalanceWagmi=(0,wagmi_dist.KQ)({address:account,token:isETH?void 0:address,enabled:!erc1155TokenId}),data=_useBalanceWagmi.data,isLoading=_useBalanceWagmi.isLoading,_useContractRead=(0,wagmi_dist.do)({address,abi:erc1155ABI_namespaceObject,functionName:"balanceOf",args:[account,erc1155TokenId],enabled:!!erc1155TokenId}),erc1155_data=_useContractRead.data,erc1155_Loading=_useContractRead.isLoading,_useState=(0,react.useState)(),comparisons=_useState[0],setComparisons=_useState[1];return(0,react.useEffect)((function(){var data_bn=erc1155TokenId?erc1155_data:null==data?void 0:data.value;compareAmount&&data_bn&&setComparisons({isZero:data_bn.isZero(),isGTEcompared:data_bn.gt(compareAmount),isEQcompared:data_bn.eq(compareAmount),isLTcompared:data_bn.lt(compareAmount)})}),[data,erc1155_data]),{data:erc1155TokenId?erc1155_data:null==data?void 0:data.value,isLoading:erc1155TokenId?erc1155_Loading:isLoading,isZero:null==comparisons?void 0:comparisons.isZero,isGTEcompared:null==comparisons?void 0:comparisons.isGTEcompared,isEQcompared:null==comparisons?void 0:comparisons.isEQcompared,isLTcompared:null==comparisons?void 0:comparisons.isLTcompared}};var react_toastify_esm=__webpack_require__("./node_modules/react-toastify/dist/react-toastify.esm.mjs");const hooks_useSubmitTx=function useSubmitTx(params,onSuccess,onError){var config=(0,wagmi_dist.PJ)(params).config,_useContractWrite=(0,wagmi_dist.GG)(config),writeData=_useContractWrite.data,isWaitingOnUser=_useContractWrite.isLoading,write=_useContractWrite.write,isError=_useContractWrite.isError,_useWaitForTransactio=(0,wagmi_dist.BX)({hash:null==writeData?void 0:writeData.hash,onSuccess,onError}),receipt=_useWaitForTransactio.data,error=_useWaitForTransactio.error,isTransacting=_useWaitForTransactio.isLoading,isSuccess=_useWaitForTransactio.isSuccess,status=_useWaitForTransactio.status;return(0,react.useEffect)((function(){0===(null==receipt?void 0:receipt.status)&&react_toastify_esm.Am.error("Transaction Error: ".concat(null==error?void 0:error.message)),1===(null==receipt?void 0:receipt.status)&&react_toastify_esm.Am.success("Transaction Complete: ".concat(receipt.transactionHash))}),[receipt,status]),{submitTx:write,receipt,hash:null==writeData?void 0:writeData.hash,isTransacting,isWaitingOnUser,isSuccess,isError,error}};var _templateObject,_stylingByState,ActionStepper=__webpack_require__("./src/components/cactiComponents/ActionStepper.tsx"),__jsx=react.createElement,ActionResponseState=function(ActionResponseState){return ActionResponseState[ActionResponseState.LOADING=0]="LOADING",ActionResponseState[ActionResponseState.DISABLED=1]="DISABLED",ActionResponseState[ActionResponseState.WAITING_FOR_USER=2]="WAITING_FOR_USER",ActionResponseState[ActionResponseState.READY=3]="READY",ActionResponseState[ActionResponseState.TRANSACTING=4]="TRANSACTING",ActionResponseState[ActionResponseState.SUCCESS=5]="SUCCESS",ActionResponseState[ActionResponseState.ERROR=6]="ERROR",ActionResponseState}({}),StyledButton=tailwind_styled_components_esm.Z.button(_templateObject||(_templateObject=(0,taggedTemplateLiteral.Z)(["\n  inline-flex items-center justify-center\n  height-[40px]\n  py-[8px] px-[24px]\n  rounded-[8px]\n  border-[1px] border-white border-opacity-10\n  bg-[#2E8C87]\n  text-sm text-white/90\n  active:bg-transparent\n"]))),stylingByState=(_stylingByState={},(0,defineProperty.Z)(_stylingByState,ActionResponseState.WAITING_FOR_USER,"cursor-not-allowed"),(0,defineProperty.Z)(_stylingByState,ActionResponseState.LOADING,"cursor-not-allowed"),(0,defineProperty.Z)(_stylingByState,ActionResponseState.DISABLED,"bg-opacity-20 text-white/20 cursor-not-allowed"),(0,defineProperty.Z)(_stylingByState,ActionResponseState.READY,""),(0,defineProperty.Z)(_stylingByState,ActionResponseState.TRANSACTING,"cursor-not-allowed"),(0,defineProperty.Z)(_stylingByState,ActionResponseState.SUCCESS,"bg-green-800"),(0,defineProperty.Z)(_stylingByState,ActionResponseState.ERROR,"text-white/30 bg-red-600/50"),_stylingByState),ActionResponse=function ActionResponse(_ref){var _txParams$overrides,txParams=_ref.txParams,approvalParams=_ref.approvalParams,label_=_ref.label,disabled=_ref.disabled,stepper=_ref.stepper,defaultLabel=label_||"Submit",address=(0,wagmi_dist.mA)().address,_useState=(0,react.useState)(),label=_useState[0],setLabel=_useState[1],_useState2=(0,react.useState)(ActionResponseState.LOADING),state=_useState2[0],setState=_useState2[1],_useState3=(0,react.useState)(),txToPrepare=_useState3[0],setTxToPrepare=_useState3[1],_useState4=(0,react.useState)(),action=_useState4[0],setAction=_useState4[1],_useApproval=hooks_useApproval(approvalParams),approveTx=_useApproval.approveTx,hasAllowance=_useApproval.hasAllowance,approvalWaitingOnUser=_useApproval.approvalWaitingOnUser,approvalTransacting=_useApproval.approvalTransacting,valueFromOverrides=null==txParams||null===(_txParams$overrides=txParams.overrides)||void 0===_txParams$overrides?void 0:_txParams$overrides.value,_useBalance=hooks_useBalance(null==approvalParams?void 0:approvalParams.address,(null==approvalParams?void 0:approvalParams.amount)||valueFromOverrides),hasBalance=(_useBalance.data,_useBalance.isGTEcompared);(0,react.useEffect)((function(){setTxToPrepare(hasBalance&&hasAllowance?txParams:void 0)}),[hasBalance,hasAllowance]);var _useSubmitTx=hooks_useSubmitTx(txToPrepare),submitTx=_useSubmitTx.submitTx,isWaitingOnUser=_useSubmitTx.isWaitingOnUser,isTransacting=_useSubmitTx.isTransacting;_useSubmitTx.error;(0,react.useEffect)((function(){hasBalance||(console.log("NOT READY: Balance not sufficient for transaction."),setLabel("Insufficient Balance"),setState(ActionResponseState.DISABLED)),!hasAllowance&&hasBalance&&(setAction({name:"approve",fn:approveTx}),console.log("READY FOR APPROVAL: Has balance."),setLabel("A token approval is required"),setState(ActionResponseState.READY),approvalWaitingOnUser&&(console.log("Waiting for approval confirmation..."),setLabel("Please check your wallet..."),setState(ActionResponseState.WAITING_FOR_USER)),approvalTransacting&&(console.log("Waiting for approval transaction..."),setLabel("Token approval pending..."),setState(ActionResponseState.TRANSACTING))),hasAllowance&&hasBalance&&(submitTx||(console.log("Building TX: Has balance and allowance."),setLabel("Validating the transaction..."),setState(ActionResponseState.LOADING)),submitTx&&(console.log("READY FOR TX: Has balance and allowance."),setLabel(defaultLabel),setState(ActionResponseState.READY),setAction({name:"submit",fn:submitTx})),isWaitingOnUser&&(console.log("Waiting for TX confirmation..."),setLabel("Please check your wallet..."),setState(ActionResponseState.WAITING_FOR_USER)),isTransacting&&(console.log("TX IN PROGRESS... "),setLabel(defaultLabel),setState(ActionResponseState.TRANSACTING)))}),[hasBalance,hasAllowance,isWaitingOnUser,isTransacting,approvalWaitingOnUser,approvalTransacting,submitTx]);var extraStyle=stylingByState[disabled?ActionResponseState.DISABLED:state];return __jsx("div",{className:"flex w-full justify-center"},function returnComponent(){return address&&stepper?__jsx(ActionStepper.h,null):address&&!stepper?__jsx(StyledButton,{className:"bg-teal-900 ".concat(extraStyle),onClick:function onClick(e){var _action$fn;return action&&(null===(_action$fn=action.fn)||void 0===_action$fn?void 0:_action$fn.call(action))}},label||__jsx(dist.Z,{width:100})):__jsx(chunk_GEBDUYT7.NL,null)}())};ActionResponse.displayName="ActionResponse",ActionResponse.__docgenInfo={description:"Action Response\nIncludes: Label, action, state, preparedContractWrite",methods:[],displayName:"ActionResponse",props:{txParams:{required:!1,tsType:{name:"TxBasicParams"},description:""},approvalParams:{required:!1,tsType:{name:"ApprovalBasicParams"},description:""},label:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},stepper:{required:!1,tsType:{name:"boolean"},description:""}}};try{ActionResponse.displayName="ActionResponse",ActionResponse.__docgenInfo={description:"Action Response\nIncludes: Label, action, state, preparedContractWrite",displayName:"ActionResponse",props:{txParams:{defaultValue:null,description:"",name:"txParams",required:!1,type:{name:"TxBasicParams"}},approvalParams:{defaultValue:null,description:"",name:"approvalParams",required:!1,type:{name:"ApprovalBasicParams"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},stepper:{defaultValue:null,description:"",name:"stepper",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/cactiComponents/ActionResponse.tsx#ActionResponse"]={docgenInfo:ActionResponse.__docgenInfo,name:"ActionResponse",path:"src/components/cactiComponents/ActionResponse.tsx#ActionResponse"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/cactiComponents/ActionStepper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h:()=>ActionStepper});var __jsx=__webpack_require__("./node_modules/react/index.js").createElement,StepperItem=function StepperItem(_ref){var step=_ref.step,title=_ref.title,description=_ref.description,active=_ref.active;return __jsx("li",{className:"flex items-center space-x-2.5 ".concat(active?"text-teal-600 dark:text-teal-500 ":"text-white/70")},__jsx("div",{className:"flex h-8 w-8 ".concat(active?"text-teal-600 dark:text-teal-500 border-teal-500 ":""," shrink-0 items-center justify-center rounded-full border ")},step),__jsx("span",null,__jsx("div",{className:"text-sm font-medium leading-tight "},title),__jsx("div",{className:"text-xs font-thin"},description)))};StepperItem.displayName="StepperItem";var ActionStepper=function ActionStepper(){return __jsx("div",{className:"flex w-full"},__jsx("ol",{className:"w-full items-center justify-evenly space-y-4 rounded-lg border-[1px] border-white/20 p-2 sm:flex sm:space-x-8 sm:space-y-0 "},__jsx(StepperItem,{step:1,title:"Token Approval",description:"Step details here",active:!0}),__jsx(StepperItem,{step:2,title:"Submit Transaction",description:"Step details here",active:!1}),__jsx(StepperItem,{step:3,title:"Transaction complete",description:"Step details here",active:!1})))};ActionStepper.displayName="ActionStepper",ActionStepper.__docgenInfo={description:"",methods:[],displayName:"ActionStepper"}},"./src/contexts/SettingsContext.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ZP:()=>__WEBPACK_DEFAULT_EXPORT__});var _Users_brucedonovan_dev_yield_chatweb3_frontend_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_hotkeys_hook__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-hotkeys-hook/dist/react-hotkeys-hook.esm.js"),react_toastify__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react-toastify/dist/react-toastify.esm.mjs"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_Users_brucedonovan_dev_yield_chatweb3_frontend_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var Setting=function(Setting){return Setting.APPROVAL_METHOD="approvalMethod",Setting.APPROVAL_MAX="approveMax",Setting.SLIPPAGE_TOLERANCE="slippageTolerance",Setting.DIAGNOSTICS="diagnostics",Setting.DARK_MODE="darkMode",Setting.DISCLAIMER_CHECKED="disclaimerChecked",Setting.FORCE_TRANSACTIONS="forceTransactions",Setting.FORKED_ENV="isForkedEnv",Setting.FORK_ENV_URL="forkEnvUrl",Setting.EXPERIMENTAL_UI="experimentalUi",Setting}({}),initState={approvalMethod:function(ApprovalType){return ApprovalType.TX="TX",ApprovalType.SIG="SIG",ApprovalType.DAI_SIG="DAI_SIG",ApprovalType}({}).SIG,approveMax:!1,slippageTolerance:.001,darkMode:!1,disclaimerChecked:!1,experimentalUi:!0,forceTransactions:!1,diagnostics:!1,isForkedEnv:!1,forkId:"902db63e-9c5e-415b-b883-5701c77b3aa7",forkEnvUrl:"https://rpc.tenderly.co/fork/".concat("902db63e-9c5e-415b-b883-5701c77b3aa7")},SettingsContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({settings:initState,changeSetting:function initChangeSetting(){return null}});function settingsReducer(state,action){return _objectSpread(_objectSpread({},state),{},(0,_Users_brucedonovan_dev_yield_chatweb3_frontend_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__.Z)({},action.type,function cacheAndUpdate(_action){return state[action.type]===_action.payload?state[action.type]:(localStorage.setItem(_action.type,JSON.stringify(_action.payload)),_action.payload)}(action)))}var SettingsProvider=function SettingsProvider(_ref){var children=_ref.children,_useReducer=(0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(settingsReducer,initState),settings=_useReducer[0],updateState=_useReducer[1];(0,react_hotkeys_hook__WEBPACK_IMPORTED_MODULE_2__.y1)("alt+f",(function(){var currentSetting=settings.isForkedEnv;changeSetting(Setting.FORKED_ENV,!currentSetting),(0,react_toastify__WEBPACK_IMPORTED_MODULE_3__.Am)("".concat(currentSetting?"Fork disconnected. Working on mainnet.":"Switched to using a forked Environment."))})),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){"undefined"!=typeof window&&Object.values(Setting).forEach((function(setting){null!==JSON.parse(localStorage.getItem(setting))&&updateState({type:setting,payload:JSON.parse(localStorage.getItem(setting))})}))}),[]);var changeSetting=function changeSetting(setting,value){return updateState({type:setting,payload:value})};return __jsx(SettingsContext.Provider,{value:{settings,changeSetting}},children)};SettingsProvider.displayName="SettingsProvider";const __WEBPACK_DEFAULT_EXPORT__=SettingsContext;SettingsProvider.__docgenInfo={description:"",methods:[],displayName:"SettingsProvider",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""}}};try{SettingsProvider.displayName="SettingsProvider",SettingsProvider.__docgenInfo={description:"",displayName:"SettingsProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/contexts/SettingsContext.tsx#SettingsProvider"]={docgenInfo:SettingsProvider.__docgenInfo,name:"SettingsProvider",path:"src/contexts/SettingsContext.tsx#SettingsProvider"})}catch(__react_docgen_typescript_loader_error){}}}]);