'use strict';
(self.webpackChunkchatweb3_frontend = self.webpackChunkchatweb3_frontend || []).push([
  [2464],
  {
    './node_modules/@web3modal/core/dist/index.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Id: () => I,
        ConfigCtrl: () => E,
        zv: () => dist_c,
        ExplorerCtrl: () => A,
        jb: () => k,
        OptionsCtrl: () => dist_a,
        AV: () => m,
        ToastCtrl: () => P,
      });
      Symbol();
      const t = Symbol();
      const s = Object.getPrototypeOf,
        c = new WeakMap(),
        l = (e) =>
          e && (c.has(e) ? c.get(e) : s(e) === Object.prototype || s(e) === Array.prototype),
        h =
          (new WeakMap(),
          (e, t = !0) => {
            c.set(e, t);
          }),
        isObject = (x) => 'object' == typeof x && null !== x,
        proxyStateMap = new WeakMap(),
        refSet = new WeakSet(),
        buildProxyFunction = (
          objectIs = Object.is,
          newProxy = (target, handler) => new Proxy(target, handler),
          canProxy = (x) =>
            isObject(x) &&
            !refSet.has(x) &&
            (Array.isArray(x) || !(Symbol.iterator in x)) &&
            !(x instanceof WeakMap) &&
            !(x instanceof WeakSet) &&
            !(x instanceof Error) &&
            !(x instanceof Number) &&
            !(x instanceof Date) &&
            !(x instanceof String) &&
            !(x instanceof RegExp) &&
            !(x instanceof ArrayBuffer),
          defaultHandlePromise = (promise) => {
            switch (promise.status) {
              case 'fulfilled':
                return promise.value;
              case 'rejected':
                throw promise.reason;
              default:
                throw promise;
            }
          },
          snapCache = new WeakMap(),
          createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
            const cache = snapCache.get(target);
            if ((null == cache ? void 0 : cache[0]) === version) return cache[1];
            const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
            return (
              h(snap, !0),
              snapCache.set(target, [version, snap]),
              Reflect.ownKeys(target).forEach((key) => {
                const value = Reflect.get(target, key);
                refSet.has(value)
                  ? (h(value, !1), (snap[key] = value))
                  : value instanceof Promise
                  ? Object.defineProperty(snap, key, { get: () => handlePromise(value) })
                  : proxyStateMap.has(value)
                  ? (snap[key] = (function snapshot(proxyObject, handlePromise) {
                      const proxyState = proxyStateMap.get(proxyObject);
                      proxyState || console.warn('Please use proxy object');
                      const [target, ensureVersion, createSnapshot] = proxyState;
                      return createSnapshot(target, ensureVersion(), handlePromise);
                    })(value, handlePromise))
                  : (snap[key] = value);
              }),
              Object.freeze(snap)
            );
          },
          proxyCache = new WeakMap(),
          versionHolder = [1, 1],
          proxyFunction2 = (initialObject) => {
            if (!isObject(initialObject)) throw new Error('object required');
            const found = proxyCache.get(initialObject);
            if (found) return found;
            let version = versionHolder[0];
            const listeners = new Set(),
              notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
                version !== nextVersion &&
                  ((version = nextVersion),
                  listeners.forEach((listener) => listener(op, nextVersion)));
              };
            let checkVersion = versionHolder[1];
            const createPropListener = (prop) => (op, nextVersion) => {
                const newOp = [...op];
                (newOp[1] = [prop, ...newOp[1]]), notifyUpdate(newOp, nextVersion);
              },
              propProxyStates = new Map(),
              removePropListener = (prop) => {
                var _a;
                const entry = propProxyStates.get(prop);
                entry && (propProxyStates.delete(prop), null == (_a = entry[1]) || _a.call(entry));
              },
              baseObject = Array.isArray(initialObject)
                ? []
                : Object.create(Object.getPrototypeOf(initialObject)),
              handler = {
                deleteProperty(target, prop) {
                  const prevValue = Reflect.get(target, prop);
                  removePropListener(prop);
                  const deleted = Reflect.deleteProperty(target, prop);
                  return deleted && notifyUpdate(['delete', [prop], prevValue]), deleted;
                },
                set(target, prop, value, receiver) {
                  var _a;
                  const hasPrevValue = Reflect.has(target, prop),
                    prevValue = Reflect.get(target, prop, receiver);
                  if (hasPrevValue && objectIs(prevValue, value)) return !0;
                  removePropListener(prop),
                    isObject(value) && (value = ((e) => (l(e) && e[t]) || null)(value) || value);
                  let nextValue = value;
                  if (
                    null == (_a = Object.getOwnPropertyDescriptor(target, prop)) ? void 0 : _a.set
                  );
                  else if (value instanceof Promise)
                    value
                      .then((v) => {
                        (value.status = 'fulfilled'),
                          (value.value = v),
                          notifyUpdate(['resolve', [prop], v]);
                      })
                      .catch((e) => {
                        (value.status = 'rejected'),
                          (value.reason = e),
                          notifyUpdate(['reject', [prop], e]);
                      });
                  else {
                    !proxyStateMap.has(value) && canProxy(value) && (nextValue = proxy(value));
                    const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
                    childProxyState &&
                      ((prop, propProxyState) => {
                        if (propProxyStates.has(prop))
                          throw new Error('prop listener already exists');
                        if (listeners.size) {
                          const remove = propProxyState[3](createPropListener(prop));
                          propProxyStates.set(prop, [propProxyState, remove]);
                        } else propProxyStates.set(prop, [propProxyState]);
                      })(prop, childProxyState);
                  }
                  return (
                    Reflect.set(target, prop, nextValue, receiver),
                    notifyUpdate(['set', [prop], value, prevValue]),
                    !0
                  );
                },
              },
              proxyObject = newProxy(baseObject, handler);
            proxyCache.set(initialObject, proxyObject);
            const proxyState = [
              baseObject,
              (nextCheckVersion = ++versionHolder[1]) => (
                checkVersion === nextCheckVersion ||
                  listeners.size ||
                  ((checkVersion = nextCheckVersion),
                  propProxyStates.forEach(([propProxyState]) => {
                    const propVersion = propProxyState[1](nextCheckVersion);
                    propVersion > version && (version = propVersion);
                  })),
                version
              ),
              createSnapshot,
              (listener) => {
                listeners.add(listener),
                  1 === listeners.size &&
                    propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
                      if (prevRemove) throw new Error('remove already exists');
                      const remove = propProxyState[3](createPropListener(prop));
                      propProxyStates.set(prop, [propProxyState, remove]);
                    });
                return () => {
                  listeners.delete(listener),
                    0 === listeners.size &&
                      propProxyStates.forEach(([propProxyState, remove], prop) => {
                        remove && (remove(), propProxyStates.set(prop, [propProxyState]));
                      });
                };
              },
            ];
            return (
              proxyStateMap.set(proxyObject, proxyState),
              Reflect.ownKeys(initialObject).forEach((key) => {
                const desc = Object.getOwnPropertyDescriptor(initialObject, key);
                desc.get || desc.set
                  ? Object.defineProperty(baseObject, key, desc)
                  : (proxyObject[key] = initialObject[key]);
              }),
              proxyObject
            );
          }
        ) => [
          proxyFunction2,
          proxyStateMap,
          refSet,
          objectIs,
          newProxy,
          canProxy,
          defaultHandlePromise,
          snapCache,
          createSnapshot,
          proxyCache,
          versionHolder,
        ],
        [proxyFunction] = buildProxyFunction();
      function proxy(initialObject = {}) {
        return proxyFunction(initialObject);
      }
      function subscribe(proxyObject, callback, notifyInSync) {
        const proxyState = proxyStateMap.get(proxyObject);
        let promise;
        proxyState || console.warn('Please use proxy object');
        const ops = [],
          addListener = proxyState[3];
        let isListenerActive = !1;
        const removeListener = addListener((op) => {
          ops.push(op),
            notifyInSync
              ? callback(ops.splice(0))
              : promise ||
                (promise = Promise.resolve().then(() => {
                  (promise = void 0), isListenerActive && callback(ops.splice(0));
                }));
        });
        return (
          (isListenerActive = !0),
          () => {
            (isListenerActive = !1), removeListener();
          }
        );
      }
      var buffer = __webpack_require__('./node_modules/buffer/index.js');
      const dist_n = proxy({
          selectedChain: void 0,
          chains: void 0,
          standaloneChains: void 0,
          standaloneUri: void 0,
          address: void 0,
          profileName: void 0,
          profileAvatar: void 0,
          profileLoading: !1,
          balanceLoading: !1,
          balance: void 0,
          isConnected: !1,
          isStandalone: !1,
          isCustomDesktop: !1,
          isCustomMobile: !1,
          isExplorer: !1,
          isDataLoaded: !1,
          isUiLoaded: !1,
        }),
        dist_a = {
          state: dist_n,
          subscribe: (e) => subscribe(dist_n, () => e(dist_n)),
          setChains(e) {
            dist_n.chains = e;
          },
          setStandaloneChains(e) {
            dist_n.standaloneChains = e;
          },
          setStandaloneUri(e) {
            dist_n.standaloneUri = e;
          },
          getSelectedChain() {
            const e = I.client().getNetwork().chain;
            return e && (dist_n.selectedChain = e), dist_n.selectedChain;
          },
          setSelectedChain(e) {
            dist_n.selectedChain = e;
          },
          setIsStandalone(e) {
            dist_n.isStandalone = e;
          },
          setIsCustomDesktop(e) {
            dist_n.isCustomDesktop = e;
          },
          setIsCustomMobile(e) {
            dist_n.isCustomMobile = e;
          },
          setIsExplorer(e) {
            dist_n.isExplorer = e;
          },
          getAccount() {
            const e = I.client().getAccount();
            (dist_n.address = e.address), (dist_n.isConnected = e.isConnected);
          },
          setAddress(e) {
            dist_n.address = e;
          },
          setIsConnected(e) {
            dist_n.isConnected = e;
          },
          setProfileName(e) {
            dist_n.profileName = e;
          },
          setProfileAvatar(e) {
            dist_n.profileAvatar = e;
          },
          setProfileLoading(e) {
            dist_n.profileLoading = e;
          },
          setBalanceLoading(e) {
            dist_n.balanceLoading = e;
          },
          setBalance(e) {
            dist_n.balance = e;
          },
          setIsDataLoaded(e) {
            dist_n.isDataLoaded = e;
          },
          setIsUiLoaded(e) {
            dist_n.isUiLoaded = e;
          },
          resetEnsProfile() {
            (dist_n.profileName = void 0), (dist_n.profileAvatar = void 0);
          },
          resetBalance() {
            dist_n.balance = void 0;
          },
          resetAccount() {
            (dist_n.address = void 0), dist_a.resetEnsProfile(), dist_a.resetBalance();
          },
        },
        dist_h = proxy({ initialized: !1, ethereumClient: void 0 }),
        I = {
          setEthereumClient(e) {
            !dist_h.initialized &&
              e &&
              ((dist_h.ethereumClient = e), dist_a.setChains(e.chains), (dist_h.initialized = !0));
          },
          client() {
            if (dist_h.ethereumClient) return dist_h.ethereumClient;
            throw new Error('ClientCtrl has no client set');
          },
        },
        dist_c = {
          WALLETCONNECT_DEEPLINK_CHOICE: 'WALLETCONNECT_DEEPLINK_CHOICE',
          isMobile: () =>
            typeof window < 'u' &&
            Boolean(
              window.matchMedia('(pointer:coarse)').matches ||
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)
            ),
          isAndroid: () =>
            dist_c.isMobile() && navigator.userAgent.toLowerCase().includes('android'),
          isEmptyObject: (e) =>
            Object.getPrototypeOf(e) === Object.prototype &&
            0 === Object.getOwnPropertyNames(e).length &&
            0 === Object.getOwnPropertySymbols(e).length,
          isHttpUrl: (e) => e.startsWith('http://') || e.startsWith('https://'),
          formatNativeUrl(e, t, s) {
            if (dist_c.isHttpUrl(e)) return this.formatUniversalUrl(e, t, s);
            let o = e;
            o.includes('://') || ((o = e.replaceAll('/', '').replaceAll(':', '')), (o = `${o}://`)),
              this.setWalletConnectDeepLink(o, s);
            return `${o}wc?uri=${encodeURIComponent(t)}`;
          },
          formatUniversalUrl(e, t, s) {
            if (!dist_c.isHttpUrl(e)) return this.formatNativeUrl(e, t, s);
            let o = e;
            e.endsWith('/') && (o = e.slice(0, -1)), this.setWalletConnectDeepLink(o, s);
            return `${o}/wc?uri=${encodeURIComponent(t)}`;
          },
          wait: async (e) =>
            new Promise((t) => {
              setTimeout(t, e);
            }),
          openHref(e, t = '_self') {
            window.open(e, t, 'noreferrer noopener');
          },
          setWalletConnectDeepLink(e, t) {
            localStorage.setItem(
              dist_c.WALLETCONNECT_DEEPLINK_CHOICE,
              JSON.stringify({ href: e, name: t })
            );
          },
          setWalletConnectAndroidDeepLink(e) {
            const [t] = e.split('?');
            localStorage.setItem(
              dist_c.WALLETCONNECT_DEEPLINK_CHOICE,
              JSON.stringify({ href: t, name: 'Android' })
            );
          },
          removeWalletConnectDeepLink() {
            localStorage.removeItem(dist_c.WALLETCONNECT_DEEPLINK_CHOICE);
          },
          isNull: (e) => null === e,
          getWalletConnectVersion() {
            const { isStandalone: e } = dist_a.state;
            let t = 1;
            return e || (t = I.client().walletConnectVersion), t;
          },
        };
      const dist_g = proxy({
          projectId: void 0,
          themeMode: (function S() {
            return typeof matchMedia < 'u' && matchMedia('(prefers-color-scheme: dark)').matches;
          })()
            ? 'dark'
            : 'light',
          themeColor: 'default',
          themeBackground: dist_c.isMobile() ? 'themeColor' : 'gradient',
          themeZIndex: 89,
          mobileWallets: void 0,
          desktopWallets: void 0,
          walletImages: void 0,
          chainImages: void 0,
          tokenImages: void 0,
          standaloneChains: void 0,
          enableStandaloneMode: !1,
          enableNetworkView: !1,
          defaultChain: void 0,
          explorerAllowList: void 0,
          explorerDenyList: void 0,
          termsOfServiceUrl: void 0,
          privacyPolicyUrl: void 0,
        }),
        E = {
          state: dist_g,
          subscribe: (e) => subscribe(dist_g, () => e(dist_g)),
          setConfig(e) {
            var t, s, o, l;
            if (
              (dist_a.setStandaloneChains(e.standaloneChains),
              dist_a.setIsStandalone(
                Boolean(null == (t = e.standaloneChains) ? void 0 : t.length) ||
                  Boolean(e.enableStandaloneMode)
              ),
              dist_a.setIsCustomMobile(Boolean(null == (s = e.mobileWallets) ? void 0 : s.length)),
              dist_a.setIsCustomDesktop(
                Boolean(null == (o = e.desktopWallets) ? void 0 : o.length)
              ),
              dist_a.setIsExplorer(Boolean(null == (l = e.projectId) ? void 0 : l.length)),
              e.defaultChain)
            )
              dist_a.setSelectedChain(e.defaultChain);
            else if (!dist_a.state.isStandalone) {
              const u = I.client().getDefaultChain();
              dist_a.setSelectedChain(u);
            }
            Object.assign(dist_g, e);
          },
          setThemeConfig(e) {
            Object.assign(dist_g, e);
          },
        },
        L = 'https://explorer-api.walletconnect.com';
      const dist_w = {
          async fetchWallets(e, t) {
            const s = (function dist_y(e) {
                const t = Object.fromEntries(
                  Object.entries(e)
                    .filter(([s, o]) => typeof o < 'u' && null !== o && '' !== o)
                    .map(([s, o]) => [s, o.toString()])
                );
                return new URLSearchParams(t).toString();
              })(t),
              o = `${L}/v3/wallets?projectId=${e}&${s}`;
            return (await fetch(o)).json();
          },
          formatImageUrl: (e, t) => `${L}/v3/logo/lg/${t}?projectId=${e}`,
        },
        dist_r = proxy({
          wallets: { listings: [], total: 0, page: 1 },
          search: { listings: [], total: 0, page: 1 },
          previewWallets: [],
          recomendedWallets: [],
        });
      function b() {
        const { projectId: e } = E.state;
        if (!e) throw new Error('projectId is required to work with explorer api');
        return e;
      }
      const A = {
          state: dist_r,
          async getPreviewWallets(e) {
            const { listings: t } = await dist_w.fetchWallets(b(), e);
            return (dist_r.previewWallets = Object.values(t)), dist_r.previewWallets;
          },
          async getRecomendedWallets() {
            const { listings: e } = await dist_w.fetchWallets(b(), { page: 1, entries: 6 });
            dist_r.recomendedWallets = Object.values(e);
          },
          async getPaginatedWallets(e) {
            const { page: t, search: s } = e,
              { listings: o, total: l } = await dist_w.fetchWallets(b(), e),
              u = Object.values(o),
              v = s ? 'search' : 'wallets';
            return (
              (dist_r[v] = { listings: [...dist_r[v].listings, ...u], total: l, page: t ?? 1 }),
              { listings: u, total: l }
            );
          },
          getImageUrl: (e) => dist_w.formatImageUrl(b(), e),
          resetSearch() {
            dist_r.search = { listings: [], total: 0, page: 1 };
          },
        },
        dist_i = proxy({ history: ['ConnectWallet'], view: 'ConnectWallet', data: void 0 }),
        m = {
          state: dist_i,
          subscribe: (e) => subscribe(dist_i, () => e(dist_i)),
          push(e, t) {
            e !== dist_i.view &&
              ((dist_i.view = e), t && (dist_i.data = t), dist_i.history.push(e));
          },
          replace(e) {
            (dist_i.view = e), (dist_i.history = [e]);
          },
          goBack() {
            if (dist_i.history.length > 1) {
              dist_i.history.pop();
              const [e] = dist_i.history.slice(-1);
              dist_i.view = e;
            }
          },
        },
        C = proxy({ open: !1 }),
        k = {
          state: C,
          subscribe: (e) => subscribe(C, () => e(C)),
          open: async (e) =>
            new Promise((t) => {
              const {
                  isConnected: s,
                  isStandalone: o,
                  isUiLoaded: l,
                  isDataLoaded: u,
                } = dist_a.state,
                { enableNetworkView: v } = E.state;
              if (
                (o
                  ? (dist_a.setStandaloneUri(e?.uri),
                    dist_a.setStandaloneChains(e?.standaloneChains),
                    m.replace('ConnectWallet'))
                  : null != e && e.route
                  ? m.replace(e.route)
                  : s
                  ? m.replace('Account')
                  : v
                  ? m.replace('SelectNetwork')
                  : m.replace('ConnectWallet'),
                l && u)
              )
                (C.open = !0), t();
              else {
                const W = setInterval(() => {
                  dist_a.state.isUiLoaded &&
                    dist_a.state.isDataLoaded &&
                    (clearInterval(W), (C.open = !0), t());
                }, 200);
              }
            }),
          close() {
            C.open = !1;
          },
        },
        d = proxy({ open: !1, message: '', variant: 'success' }),
        P = {
          state: d,
          subscribe: (e) => subscribe(d, () => e(d)),
          openToast(e, t) {
            (d.open = !0), (d.message = e), (d.variant = t);
          },
          closeToast() {
            d.open = !1;
          },
        };
      typeof window < 'u' &&
        (window.Buffer || (window.Buffer = buffer.Buffer),
        window.global || (window.global = window),
        window.process || (window.process = { env: {} }));
    },
    './node_modules/@web3modal/standalone/dist/index.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Web3Modal: () => f });
      var _web3modal_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/@web3modal/core/dist/index.js'
        ),
        s = Object.defineProperty,
        a = Object.getOwnPropertySymbols,
        c = Object.prototype.hasOwnProperty,
        d = Object.prototype.propertyIsEnumerable,
        i = (o, e, t) =>
          e in o
            ? s(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
            : (o[e] = t);
      class f {
        constructor(e) {
          (this.openModal = _web3modal_core__WEBPACK_IMPORTED_MODULE_0__.jb.open),
            (this.closeModal = _web3modal_core__WEBPACK_IMPORTED_MODULE_0__.jb.close),
            (this.subscribeModal = _web3modal_core__WEBPACK_IMPORTED_MODULE_0__.jb.subscribe),
            (this.setTheme =
              _web3modal_core__WEBPACK_IMPORTED_MODULE_0__.ConfigCtrl.setThemeConfig),
            _web3modal_core__WEBPACK_IMPORTED_MODULE_0__.ConfigCtrl.setConfig(
              ((o, e) => {
                for (var t in e || (e = {})) c.call(e, t) && i(o, t, e[t]);
                if (a) for (var t of a(e)) d.call(e, t) && i(o, t, e[t]);
                return o;
              })({ enableStandaloneMode: !0 }, e)
            ),
            this.initUi();
        }
        async initUi() {
          if (typeof window < 'u') {
            await __webpack_require__
              .e(5062)
              .then(
                __webpack_require__.bind(
                  __webpack_require__,
                  './node_modules/@web3modal/ui/dist/index.js'
                )
              );
            const e = document.createElement('w3m-modal');
            document.body.insertAdjacentElement('beforeend', e),
              _web3modal_core__WEBPACK_IMPORTED_MODULE_0__.OptionsCtrl.setIsUiLoaded(!0);
          }
        }
      }
    },
  },
]);
