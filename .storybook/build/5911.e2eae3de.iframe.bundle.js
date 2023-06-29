/*! For license information please see 5911.e2eae3de.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkchatweb3_frontend=self.webpackChunkchatweb3_frontend||[]).push([[5911],{"./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{Z:()=>_defineProperty})},"./node_modules/react-hotkeys-hook/dist/react-hotkeys-hook.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y1:()=>useHotkeys});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");__webpack_require__("./node_modules/react/jsx-runtime.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var reservedModifierKeywords=["shift","alt","meta","mod","ctrl"],mappedKeys={esc:"escape",return:"enter",".":"period",",":"comma","-":"slash"," ":"space","`":"backquote","#":"backslash","+":"bracketright",ShiftLeft:"shift",ShiftRight:"shift",AltLeft:"alt",AltRight:"alt",MetaLeft:"meta",MetaRight:"meta",OSLeft:"meta",OSRight:"meta",ControlLeft:"ctrl",ControlRight:"ctrl"};function mapKey(key){return(mappedKeys[key]||key).trim().toLowerCase().replace(/key|digit|numpad|arrow/,"")}function parseKeysHookInput(keys,splitKey){return void 0===splitKey&&(splitKey=","),keys.split(splitKey)}function parseHotkey(hotkey,combinationKey,description){void 0===combinationKey&&(combinationKey="+");var keys=hotkey.toLocaleLowerCase().split(combinationKey).map((function(k){return mapKey(k)}));return _extends({},{alt:keys.includes("alt"),ctrl:keys.includes("ctrl")||keys.includes("control"),shift:keys.includes("shift"),meta:keys.includes("meta"),mod:keys.includes("mod")},{keys:keys.filter((function(k){return!reservedModifierKeywords.includes(k)})),description})}"undefined"!=typeof document&&(document.addEventListener("keydown",(function(e){void 0!==e.key&&pushToCurrentlyPressedKeys([mapKey(e.key),mapKey(e.code)])})),document.addEventListener("keyup",(function(e){void 0!==e.key&&removeFromCurrentlyPressedKeys([mapKey(e.key),mapKey(e.code)])}))),"undefined"!=typeof window&&window.addEventListener("blur",(function(){currentlyPressedKeys.clear()}));var currentlyPressedKeys=new Set;function pushToCurrentlyPressedKeys(key){var hotkeyArray=Array.isArray(key)?key:[key];currentlyPressedKeys.has("meta")&&currentlyPressedKeys.forEach((function(key){return!function isHotkeyModifier(key){return reservedModifierKeywords.includes(key)}(key)&&currentlyPressedKeys.delete(key.toLowerCase())})),hotkeyArray.forEach((function(hotkey){return currentlyPressedKeys.add(hotkey.toLowerCase())}))}function removeFromCurrentlyPressedKeys(key){var hotkeyArray=Array.isArray(key)?key:[key];"meta"===key?currentlyPressedKeys.clear():hotkeyArray.forEach((function(hotkey){return currentlyPressedKeys.delete(hotkey.toLowerCase())}))}function isHotkeyEnabledOnTag(_ref,enabledOnTags){var target=_ref.target;void 0===enabledOnTags&&(enabledOnTags=!1);var targetTagName=target&&target.tagName;return enabledOnTags instanceof Array?Boolean(targetTagName&&enabledOnTags&&enabledOnTags.some((function(tag){return tag.toLowerCase()===targetTagName.toLowerCase()}))):Boolean(targetTagName&&enabledOnTags&&!0===enabledOnTags)}var isHotkeyMatchingKeyboardEvent=function isHotkeyMatchingKeyboardEvent(e,hotkey,ignoreModifiers){void 0===ignoreModifiers&&(ignoreModifiers=!1);var alt=hotkey.alt,meta=hotkey.meta,mod=hotkey.mod,shift=hotkey.shift,ctrl=hotkey.ctrl,keys=hotkey.keys,pressedKeyUppercase=e.key,code=e.code,ctrlKey=e.ctrlKey,metaKey=e.metaKey,shiftKey=e.shiftKey,altKey=e.altKey,keyCode=mapKey(code),pressedKey=pressedKeyUppercase.toLowerCase();if(!ignoreModifiers){if(alt===!altKey&&"alt"!==pressedKey)return!1;if(shift===!shiftKey&&"shift"!==pressedKey)return!1;if(mod){if(!metaKey&&!ctrlKey)return!1}else{if(meta===!metaKey&&"meta"!==pressedKey&&"os"!==pressedKey)return!1;if(ctrl===!ctrlKey&&"ctrl"!==pressedKey&&"control"!==pressedKey)return!1}}return!(!keys||1!==keys.length||!keys.includes(pressedKey)&&!keys.includes(keyCode))||(keys?function isHotkeyPressed(key,splitKey){return void 0===splitKey&&(splitKey=","),(Array.isArray(key)?key:key.split(splitKey)).every((function(hotkey){return currentlyPressedKeys.has(hotkey.trim().toLowerCase())}))}(keys):!keys)},BoundHotkeysProxyProvider=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(void 0),useBoundHotkeysProxy=function useBoundHotkeysProxy(){return(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(BoundHotkeysProxyProvider)};function deepEqual(x,y){return x&&y&&"object"==typeof x&&"object"==typeof y?Object.keys(x).length===Object.keys(y).length&&Object.keys(x).reduce((function(isEqual,key){return isEqual&&deepEqual(x[key],y[key])}),!0):x===y}var HotkeysContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({hotkeys:[],enabledScopes:[],toggleScope:function toggleScope(){},enableScope:function enableScope(){},disableScope:function disableScope(){}}),useHotkeysContext=function useHotkeysContext(){return(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(HotkeysContext)};var stopPropagation=function stopPropagation(e){e.stopPropagation(),e.preventDefault(),e.stopImmediatePropagation()},useSafeLayoutEffect="undefined"!=typeof window?react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect:react__WEBPACK_IMPORTED_MODULE_0__.useEffect;function useHotkeys(keys,callback,options,dependencies){var ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),hasTriggeredRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),_options=options instanceof Array?dependencies instanceof Array?void 0:dependencies:options,_keys=keys instanceof Array?keys.join(null==_options?void 0:_options.splitKey):keys,_deps=options instanceof Array?options:dependencies instanceof Array?dependencies:void 0,memoisedCB=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(callback,null!=_deps?_deps:[]),cbRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(memoisedCB);cbRef.current=_deps?memoisedCB:callback;var memoisedOptions=function useDeepEqualMemo(value){var ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(void 0);return deepEqual(ref.current,value)||(ref.current=value),ref.current}(_options),enabledScopes=useHotkeysContext().enabledScopes,proxy=useBoundHotkeysProxy();return useSafeLayoutEffect((function(){if(!1!==(null==memoisedOptions?void 0:memoisedOptions.enabled)&&function isScopeActive(activeScopes,scopes){return 0===activeScopes.length&&scopes?(console.warn('A hotkey has the "scopes" option set, however no active scopes were found. If you want to use the global scopes feature, you need to wrap your app in a <HotkeysProvider>'),!0):!scopes||activeScopes.some((function(scope){return scopes.includes(scope)}))||activeScopes.includes("*")}(enabledScopes,null==memoisedOptions?void 0:memoisedOptions.scopes)){var listener=function listener(e,isKeyUp){var _e$target;void 0===isKeyUp&&(isKeyUp=!1),function isKeyboardEventTriggeredByInput(ev){return isHotkeyEnabledOnTag(ev,["input","textarea","select"])}(e)&&!isHotkeyEnabledOnTag(e,null==memoisedOptions?void 0:memoisedOptions.enableOnFormTags)||null!=memoisedOptions&&null!=memoisedOptions.ignoreEventWhen&&memoisedOptions.ignoreEventWhen(e)||(null===ref.current||document.activeElement===ref.current||ref.current.contains(document.activeElement)?(null==(_e$target=e.target)||!_e$target.isContentEditable||null!=memoisedOptions&&memoisedOptions.enableOnContentEditable)&&parseKeysHookInput(_keys,null==memoisedOptions?void 0:memoisedOptions.splitKey).forEach((function(key){var _hotkey$keys,hotkey=parseHotkey(key,null==memoisedOptions?void 0:memoisedOptions.combinationKey);if(isHotkeyMatchingKeyboardEvent(e,hotkey,null==memoisedOptions?void 0:memoisedOptions.ignoreModifiers)||null!=(_hotkey$keys=hotkey.keys)&&_hotkey$keys.includes("*")){if(isKeyUp&&hasTriggeredRef.current)return;if(function maybePreventDefault(e,hotkey,preventDefault){("function"==typeof preventDefault&&preventDefault(e,hotkey)||!0===preventDefault)&&e.preventDefault()}(e,hotkey,null==memoisedOptions?void 0:memoisedOptions.preventDefault),!function isHotkeyEnabled(e,hotkey,enabled){return"function"==typeof enabled?enabled(e,hotkey):!0===enabled||void 0===enabled}(e,hotkey,null==memoisedOptions?void 0:memoisedOptions.enabled))return void stopPropagation(e);cbRef.current(e,hotkey),isKeyUp||(hasTriggeredRef.current=!0)}})):stopPropagation(e))},handleKeyDown=function handleKeyDown(event){void 0!==event.key&&(pushToCurrentlyPressedKeys(mapKey(event.code)),(void 0===(null==memoisedOptions?void 0:memoisedOptions.keydown)&&!0!==(null==memoisedOptions?void 0:memoisedOptions.keyup)||null!=memoisedOptions&&memoisedOptions.keydown)&&listener(event))},handleKeyUp=function handleKeyUp(event){void 0!==event.key&&(removeFromCurrentlyPressedKeys(mapKey(event.code)),hasTriggeredRef.current=!1,null!=memoisedOptions&&memoisedOptions.keyup&&listener(event,!0))},domNode=ref.current||(null==_options?void 0:_options.document)||document;return domNode.addEventListener("keyup",handleKeyUp),domNode.addEventListener("keydown",handleKeyDown),proxy&&parseKeysHookInput(_keys,null==memoisedOptions?void 0:memoisedOptions.splitKey).forEach((function(key){return proxy.addHotkey(parseHotkey(key,null==memoisedOptions?void 0:memoisedOptions.combinationKey,null==memoisedOptions?void 0:memoisedOptions.description))})),function(){domNode.removeEventListener("keyup",handleKeyUp),domNode.removeEventListener("keydown",handleKeyDown),proxy&&parseKeysHookInput(_keys,null==memoisedOptions?void 0:memoisedOptions.splitKey).forEach((function(key){return proxy.removeHotkey(parseHotkey(key,null==memoisedOptions?void 0:memoisedOptions.combinationKey,null==memoisedOptions?void 0:memoisedOptions.description))}))}}}),[_keys,memoisedOptions,enabledScopes]),ref}},"./node_modules/react-loading-skeleton/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Skeleton});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const SkeletonThemeContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({}),defaultEnableAnimation=!0;function styleOptionsToCssProperties({baseColor,highlightColor,width,height,borderRadius,circle,direction,duration,enableAnimation=defaultEnableAnimation}){const style={};return"rtl"===direction&&(style["--animation-direction"]="reverse"),"number"==typeof duration&&(style["--animation-duration"]=`${duration}s`),enableAnimation||(style["--pseudo-element-display"]="none"),"string"!=typeof width&&"number"!=typeof width||(style.width=width),"string"!=typeof height&&"number"!=typeof height||(style.height=height),"string"!=typeof borderRadius&&"number"!=typeof borderRadius||(style.borderRadius=borderRadius),circle&&(style.borderRadius="50%"),void 0!==baseColor&&(style["--base-color"]=baseColor),void 0!==highlightColor&&(style["--highlight-color"]=highlightColor),style}function Skeleton({count=1,wrapper:Wrapper,className:customClassName,containerClassName,containerTestId,circle=!1,style:styleProp,...originalPropsStyleOptions}){var _a,_b,_c;const contextStyleOptions=react__WEBPACK_IMPORTED_MODULE_0__.useContext(SkeletonThemeContext),propsStyleOptions={...originalPropsStyleOptions};for(const[key,value]of Object.entries(originalPropsStyleOptions))void 0===value&&delete propsStyleOptions[key];const styleOptions={...contextStyleOptions,...propsStyleOptions,circle},style={...styleProp,...styleOptionsToCssProperties(styleOptions)};let className="react-loading-skeleton";customClassName&&(className+=` ${customClassName}`);const inline=null!==(_a=styleOptions.inline)&&void 0!==_a&&_a,elements=[],countCeil=Math.ceil(count);for(let i=0;i<countCeil;i++){let thisStyle=style;if(countCeil>count&&i===countCeil-1){const width=null!==(_b=thisStyle.width)&&void 0!==_b?_b:"100%",fractionalPart=count%1,fractionalWidth="number"==typeof width?width*fractionalPart:`calc(${width} * ${fractionalPart})`;thisStyle={...thisStyle,width:fractionalWidth}}const skeletonSpan=react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className,style:thisStyle,key:i},"‌");inline?elements.push(skeletonSpan):elements.push(react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{key:i},skeletonSpan,react__WEBPACK_IMPORTED_MODULE_0__.createElement("br",null)))}return react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:containerClassName,"data-testid":containerTestId,"aria-live":"polite","aria-busy":null!==(_c=styleOptions.enableAnimation)&&void 0!==_c?_c:defaultEnableAnimation},Wrapper?elements.map(((el,i)=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(Wrapper,{key:i},el))):elements)}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);