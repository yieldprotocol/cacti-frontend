(self.webpackChunkchatweb3_frontend = self.webpackChunkchatweb3_frontend || []).push([
  [125],
  {
    './node_modules/@walletconnect/environment/dist/cjs/crypto.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      function getBrowerCrypto() {
        return (
          (null === __webpack_require__.g || void 0 === __webpack_require__.g
            ? void 0
            : __webpack_require__.g.crypto) ||
          (null === __webpack_require__.g || void 0 === __webpack_require__.g
            ? void 0
            : __webpack_require__.g.msCrypto) ||
          {}
        );
      }
      function getSubtleCrypto() {
        const browserCrypto = getBrowerCrypto();
        return browserCrypto.subtle || browserCrypto.webkitSubtle;
      }
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.isBrowserCryptoAvailable =
          exports.getSubtleCrypto =
          exports.getBrowerCrypto =
            void 0),
        (exports.getBrowerCrypto = getBrowerCrypto),
        (exports.getSubtleCrypto = getSubtleCrypto),
        (exports.isBrowserCryptoAvailable = function isBrowserCryptoAvailable() {
          return !!getBrowerCrypto() && !!getSubtleCrypto();
        });
    },
    './node_modules/@walletconnect/environment/dist/cjs/env.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      var process = __webpack_require__('./node_modules/process/browser.js');
      function isReactNative() {
        return (
          'undefined' == typeof document &&
          'undefined' != typeof navigator &&
          'ReactNative' === navigator.product
        );
      }
      function isNode() {
        return (
          void 0 !== process && void 0 !== process.versions && void 0 !== process.versions.node
        );
      }
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.isBrowser = exports.isNode = exports.isReactNative = void 0),
        (exports.isReactNative = isReactNative),
        (exports.isNode = isNode),
        (exports.isBrowser = function isBrowser() {
          return !isReactNative() && !isNode();
        });
    },
    './node_modules/@walletconnect/environment/dist/cjs/index.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      const tslib_1 = __webpack_require__('./node_modules/tslib/tslib.es6.js');
      tslib_1.__exportStar(
        __webpack_require__('./node_modules/@walletconnect/environment/dist/cjs/crypto.js'),
        exports
      ),
        tslib_1.__exportStar(
          __webpack_require__('./node_modules/@walletconnect/environment/dist/cjs/env.js'),
          exports
        );
    },
    './node_modules/@walletconnect/jsonrpc-http-connection/dist/esm/index.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__.d(__webpack_exports__, {
        k: () => HttpConnection,
        Z: () => jsonrpc_http_connection_dist_esm,
      });
      var events = __webpack_require__('./node_modules/events/events.js'),
        browser_ponyfill = __webpack_require__(
          './node_modules/cross-fetch/dist/browser-ponyfill.js'
        ),
        browser_ponyfill_default = __webpack_require__.n(browser_ponyfill),
        esm = __webpack_require__('./node_modules/@walletconnect/safe-json/dist/esm/index.js'),
        dist_esm = __webpack_require__(
          './node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js'
        );
      const DEFAULT_FETCH_OPTS = {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        method: 'POST',
      };
      class HttpConnection {
        constructor(url) {
          if (
            ((this.url = url),
            (this.events = new events.EventEmitter()),
            (this.isAvailable = !1),
            (this.registering = !1),
            !(0, dist_esm.isHttpUrl)(url))
          )
            throw new Error(`Provided URL is not compatible with HTTP connection: ${url}`);
          this.url = url;
        }
        get connected() {
          return this.isAvailable;
        }
        get connecting() {
          return this.registering;
        }
        on(event, listener) {
          this.events.on(event, listener);
        }
        once(event, listener) {
          this.events.once(event, listener);
        }
        off(event, listener) {
          this.events.off(event, listener);
        }
        removeListener(event, listener) {
          this.events.removeListener(event, listener);
        }
        async open(url = this.url) {
          await this.register(url);
        }
        async close() {
          if (!this.isAvailable) throw new Error('Connection already closed');
          this.onClose();
        }
        async send(payload, context) {
          this.isAvailable || (await this.register());
          try {
            const body = (0, esm.u)(payload),
              res = await browser_ponyfill_default()(
                this.url,
                Object.assign(Object.assign({}, DEFAULT_FETCH_OPTS), { body })
              ),
              data = await res.json();
            this.onPayload({ data });
          } catch (e) {
            this.onError(payload.id, e);
          }
        }
        async register(url = this.url) {
          if (!(0, dist_esm.isHttpUrl)(url))
            throw new Error(`Provided URL is not compatible with HTTP connection: ${url}`);
          if (this.registering) {
            const currentMaxListeners = this.events.getMaxListeners();
            return (
              (this.events.listenerCount('register_error') >= currentMaxListeners ||
                this.events.listenerCount('open') >= currentMaxListeners) &&
                this.events.setMaxListeners(currentMaxListeners + 1),
              new Promise((resolve, reject) => {
                this.events.once('register_error', (error) => {
                  this.resetMaxListeners(), reject(error);
                }),
                  this.events.once('open', () => {
                    if ((this.resetMaxListeners(), void 0 === this.isAvailable))
                      return reject(new Error('HTTP connection is missing or invalid'));
                    resolve();
                  });
              })
            );
          }
          (this.url = url), (this.registering = !0);
          try {
            const body = (0, esm.u)({ id: 1, jsonrpc: '2.0', method: 'test', params: [] });
            await browser_ponyfill_default()(
              url,
              Object.assign(Object.assign({}, DEFAULT_FETCH_OPTS), { body })
            ),
              this.onOpen();
          } catch (e) {
            const error = this.parseError(e);
            throw (this.events.emit('register_error', error), this.onClose(), error);
          }
        }
        onOpen() {
          (this.isAvailable = !0), (this.registering = !1), this.events.emit('open');
        }
        onClose() {
          (this.isAvailable = !1), (this.registering = !1), this.events.emit('close');
        }
        onPayload(e) {
          if (void 0 === e.data) return;
          const payload = 'string' == typeof e.data ? (0, esm.D)(e.data) : e.data;
          this.events.emit('payload', payload);
        }
        onError(id, e) {
          const error = this.parseError(e),
            message = error.message || error.toString(),
            payload = (0, dist_esm.formatJsonRpcError)(id, message);
          this.events.emit('payload', payload);
        }
        parseError(e, url = this.url) {
          return (0, dist_esm.parseConnectionError)(e, url, 'HTTP');
        }
        resetMaxListeners() {
          this.events.getMaxListeners() > 10 && this.events.setMaxListeners(10);
        }
      }
      const jsonrpc_http_connection_dist_esm = HttpConnection;
    },
    './node_modules/@walletconnect/jsonrpc-provider/dist/esm/index.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__.d(__webpack_exports__, { r: () => JsonRpcProvider });
      var events = __webpack_require__('./node_modules/events/events.js'),
        esm = __webpack_require__('./node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js');
      class JsonRpcProvider extends esm.IJsonRpcProvider {
        constructor(connection) {
          super(connection),
            (this.events = new events.EventEmitter()),
            (this.hasRegisteredEventListeners = !1),
            (this.connection = this.setConnection(connection)),
            this.connection.connected && this.registerEventListeners();
        }
        async connect(connection = this.connection) {
          await this.open(connection);
        }
        async disconnect() {
          await this.close();
        }
        on(event, listener) {
          this.events.on(event, listener);
        }
        once(event, listener) {
          this.events.once(event, listener);
        }
        off(event, listener) {
          this.events.off(event, listener);
        }
        removeListener(event, listener) {
          this.events.removeListener(event, listener);
        }
        async request(request, context) {
          return this.requestStrict(
            (0, esm.formatJsonRpcRequest)(request.method, request.params || []),
            context
          );
        }
        async requestStrict(request, context) {
          return new Promise(async (resolve, reject) => {
            if (!this.connection.connected)
              try {
                await this.open();
              } catch (e) {
                reject(e);
              }
            this.events.on(`${request.id}`, (response) => {
              (0, esm.isJsonRpcError)(response) ? reject(response.error) : resolve(response.result);
            });
            try {
              await this.connection.send(request, context);
            } catch (e) {
              reject(e);
            }
          });
        }
        setConnection(connection = this.connection) {
          return connection;
        }
        onPayload(payload) {
          this.events.emit('payload', payload),
            (0, esm.isJsonRpcResponse)(payload)
              ? this.events.emit(`${payload.id}`, payload)
              : this.events.emit('message', { type: payload.method, data: payload.params });
        }
        async open(connection = this.connection) {
          (this.connection === connection && this.connection.connected) ||
            (this.connection.connected && this.close(),
            'string' == typeof connection &&
              (await this.connection.open(connection), (connection = this.connection)),
            (this.connection = this.setConnection(connection)),
            await this.connection.open(),
            this.registerEventListeners(),
            this.events.emit('connect'));
        }
        async close() {
          await this.connection.close();
        }
        registerEventListeners() {
          this.hasRegisteredEventListeners ||
            (this.connection.on('payload', (payload) => this.onPayload(payload)),
            this.connection.on('close', () => this.events.emit('disconnect')),
            this.connection.on('error', (error) => this.events.emit('error', error)),
            (this.hasRegisteredEventListeners = !0));
        }
      }
    },
    './node_modules/@walletconnect/jsonrpc-types/dist/esm/index.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__.d(__webpack_exports__, {
        IJsonRpcProvider: () => _provider__WEBPACK_IMPORTED_MODULE_1__.x0,
      });
      var _jsonrpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/@walletconnect/jsonrpc-types/dist/esm/jsonrpc.js'
      );
      __webpack_require__.o(_jsonrpc__WEBPACK_IMPORTED_MODULE_0__, 'IJsonRpcProvider') &&
        __webpack_require__.d(__webpack_exports__, {
          IJsonRpcProvider: function () {
            return _jsonrpc__WEBPACK_IMPORTED_MODULE_0__.IJsonRpcProvider;
          },
        }),
        __webpack_require__.o(_jsonrpc__WEBPACK_IMPORTED_MODULE_0__, 'isHttpUrl') &&
          __webpack_require__.d(__webpack_exports__, {
            isHttpUrl: function () {
              return _jsonrpc__WEBPACK_IMPORTED_MODULE_0__.isHttpUrl;
            },
          }),
        __webpack_require__.o(_jsonrpc__WEBPACK_IMPORTED_MODULE_0__, 'isJsonRpcError') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcError: function () {
              return _jsonrpc__WEBPACK_IMPORTED_MODULE_0__.isJsonRpcError;
            },
          }),
        __webpack_require__.o(_jsonrpc__WEBPACK_IMPORTED_MODULE_0__, 'isJsonRpcRequest') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcRequest: function () {
              return _jsonrpc__WEBPACK_IMPORTED_MODULE_0__.isJsonRpcRequest;
            },
          }),
        __webpack_require__.o(_jsonrpc__WEBPACK_IMPORTED_MODULE_0__, 'isJsonRpcResponse') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcResponse: function () {
              return _jsonrpc__WEBPACK_IMPORTED_MODULE_0__.isJsonRpcResponse;
            },
          }),
        __webpack_require__.o(_jsonrpc__WEBPACK_IMPORTED_MODULE_0__, 'isJsonRpcResult') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcResult: function () {
              return _jsonrpc__WEBPACK_IMPORTED_MODULE_0__.isJsonRpcResult;
            },
          }),
        __webpack_require__.o(_jsonrpc__WEBPACK_IMPORTED_MODULE_0__, 'isLocalhostUrl') &&
          __webpack_require__.d(__webpack_exports__, {
            isLocalhostUrl: function () {
              return _jsonrpc__WEBPACK_IMPORTED_MODULE_0__.isLocalhostUrl;
            },
          }),
        __webpack_require__.o(_jsonrpc__WEBPACK_IMPORTED_MODULE_0__, 'isReactNative') &&
          __webpack_require__.d(__webpack_exports__, {
            isReactNative: function () {
              return _jsonrpc__WEBPACK_IMPORTED_MODULE_0__.isReactNative;
            },
          }),
        __webpack_require__.o(_jsonrpc__WEBPACK_IMPORTED_MODULE_0__, 'isWsUrl') &&
          __webpack_require__.d(__webpack_exports__, {
            isWsUrl: function () {
              return _jsonrpc__WEBPACK_IMPORTED_MODULE_0__.isWsUrl;
            },
          });
      var _provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@walletconnect/jsonrpc-types/dist/esm/provider.js'
        ),
        _validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@walletconnect/jsonrpc-types/dist/esm/validator.js'
        );
      __webpack_require__.o(_validator__WEBPACK_IMPORTED_MODULE_2__, 'isHttpUrl') &&
        __webpack_require__.d(__webpack_exports__, {
          isHttpUrl: function () {
            return _validator__WEBPACK_IMPORTED_MODULE_2__.isHttpUrl;
          },
        }),
        __webpack_require__.o(_validator__WEBPACK_IMPORTED_MODULE_2__, 'isJsonRpcError') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcError: function () {
              return _validator__WEBPACK_IMPORTED_MODULE_2__.isJsonRpcError;
            },
          }),
        __webpack_require__.o(_validator__WEBPACK_IMPORTED_MODULE_2__, 'isJsonRpcRequest') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcRequest: function () {
              return _validator__WEBPACK_IMPORTED_MODULE_2__.isJsonRpcRequest;
            },
          }),
        __webpack_require__.o(_validator__WEBPACK_IMPORTED_MODULE_2__, 'isJsonRpcResponse') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcResponse: function () {
              return _validator__WEBPACK_IMPORTED_MODULE_2__.isJsonRpcResponse;
            },
          }),
        __webpack_require__.o(_validator__WEBPACK_IMPORTED_MODULE_2__, 'isJsonRpcResult') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcResult: function () {
              return _validator__WEBPACK_IMPORTED_MODULE_2__.isJsonRpcResult;
            },
          }),
        __webpack_require__.o(_validator__WEBPACK_IMPORTED_MODULE_2__, 'isLocalhostUrl') &&
          __webpack_require__.d(__webpack_exports__, {
            isLocalhostUrl: function () {
              return _validator__WEBPACK_IMPORTED_MODULE_2__.isLocalhostUrl;
            },
          }),
        __webpack_require__.o(_validator__WEBPACK_IMPORTED_MODULE_2__, 'isReactNative') &&
          __webpack_require__.d(__webpack_exports__, {
            isReactNative: function () {
              return _validator__WEBPACK_IMPORTED_MODULE_2__.isReactNative;
            },
          }),
        __webpack_require__.o(_validator__WEBPACK_IMPORTED_MODULE_2__, 'isWsUrl') &&
          __webpack_require__.d(__webpack_exports__, {
            isWsUrl: function () {
              return _validator__WEBPACK_IMPORTED_MODULE_2__.isWsUrl;
            },
          });
    },
    './node_modules/@walletconnect/jsonrpc-types/dist/esm/jsonrpc.js': () => {},
    './node_modules/@walletconnect/jsonrpc-types/dist/esm/provider.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__.d(__webpack_exports__, {
        XR: () => IJsonRpcConnection,
        x0: () => IJsonRpcProvider,
      });
      class IEvents {}
      class IJsonRpcConnection extends IEvents {
        constructor(opts) {
          super();
        }
      }
      class IBaseJsonRpcProvider extends IEvents {
        constructor() {
          super();
        }
      }
      class IJsonRpcProvider extends IBaseJsonRpcProvider {
        constructor(connection) {
          super();
        }
      }
    },
    './node_modules/@walletconnect/jsonrpc-types/dist/esm/validator.js': () => {},
    './node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__.d(__webpack_exports__, {
        CA: () => SERVER_ERROR,
        JV: () => DEFAULT_ERROR,
        O4: () => INTERNAL_ERROR,
        dQ: () => RESERVED_ERROR_CODES,
        xK: () => STANDARD_ERROR_MAP,
      });
      const INTERNAL_ERROR = 'INTERNAL_ERROR',
        SERVER_ERROR = 'SERVER_ERROR',
        RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603],
        STANDARD_ERROR_MAP = {
          PARSE_ERROR: { code: -32700, message: 'Parse error' },
          INVALID_REQUEST: { code: -32600, message: 'Invalid Request' },
          METHOD_NOT_FOUND: { code: -32601, message: 'Method not found' },
          INVALID_PARAMS: { code: -32602, message: 'Invalid params' },
          [INTERNAL_ERROR]: { code: -32603, message: 'Internal error' },
          [SERVER_ERROR]: { code: -32e3, message: 'Server error' },
        },
        DEFAULT_ERROR = SERVER_ERROR;
    },
    './node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      var _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/@walletconnect/environment/dist/cjs/index.js'
      );
      __webpack_require__.o(
        _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__,
        'IJsonRpcProvider'
      ) &&
        __webpack_require__.d(__webpack_exports__, {
          IJsonRpcProvider: function () {
            return _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__.IJsonRpcProvider;
          },
        }),
        __webpack_require__.o(
          _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__,
          'formatJsonRpcError'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            formatJsonRpcError: function () {
              return _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__.formatJsonRpcError;
            },
          }),
        __webpack_require__.o(
          _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__,
          'formatJsonRpcRequest'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            formatJsonRpcRequest: function () {
              return _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__.formatJsonRpcRequest;
            },
          }),
        __webpack_require__.o(
          _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__,
          'formatJsonRpcResult'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            formatJsonRpcResult: function () {
              return _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__.formatJsonRpcResult;
            },
          }),
        __webpack_require__.o(
          _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__,
          'isHttpUrl'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isHttpUrl: function () {
              return _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__.isHttpUrl;
            },
          }),
        __webpack_require__.o(
          _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__,
          'isJsonRpcError'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcError: function () {
              return _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__.isJsonRpcError;
            },
          }),
        __webpack_require__.o(
          _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__,
          'isJsonRpcRequest'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcRequest: function () {
              return _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__.isJsonRpcRequest;
            },
          }),
        __webpack_require__.o(
          _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__,
          'isJsonRpcResponse'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcResponse: function () {
              return _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__.isJsonRpcResponse;
            },
          }),
        __webpack_require__.o(
          _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__,
          'isJsonRpcResult'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcResult: function () {
              return _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__.isJsonRpcResult;
            },
          }),
        __webpack_require__.o(
          _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__,
          'isLocalhostUrl'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isLocalhostUrl: function () {
              return _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__.isLocalhostUrl;
            },
          }),
        __webpack_require__.o(
          _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__,
          'isReactNative'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isReactNative: function () {
              return _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__.isReactNative;
            },
          }),
        __webpack_require__.o(_walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__, 'isWsUrl') &&
          __webpack_require__.d(__webpack_exports__, {
            isWsUrl: function () {
              return _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__.isWsUrl;
            },
          }),
        __webpack_require__.o(
          _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__,
          'payloadId'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            payloadId: function () {
              return _walletconnect_environment__WEBPACK_IMPORTED_MODULE_0__.payloadId;
            },
          });
    },
    './node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__.d(__webpack_exports__, {
        CX: () => parseConnectionError,
        L2: () => getErrorByCode,
        by: () => getError,
        i5: () => isReservedErrorCode,
      });
      var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js'
      );
      function isReservedErrorCode(code) {
        return _constants__WEBPACK_IMPORTED_MODULE_0__.dQ.includes(code);
      }
      function getError(type) {
        return Object.keys(_constants__WEBPACK_IMPORTED_MODULE_0__.xK).includes(type)
          ? _constants__WEBPACK_IMPORTED_MODULE_0__.xK[type]
          : _constants__WEBPACK_IMPORTED_MODULE_0__.xK[_constants__WEBPACK_IMPORTED_MODULE_0__.JV];
      }
      function getErrorByCode(code) {
        const match = Object.values(_constants__WEBPACK_IMPORTED_MODULE_0__.xK).find(
          (e) => e.code === code
        );
        return (
          match ||
          _constants__WEBPACK_IMPORTED_MODULE_0__.xK[_constants__WEBPACK_IMPORTED_MODULE_0__.JV]
        );
      }
      function parseConnectionError(e, url, type) {
        return e.message.includes('getaddrinfo ENOTFOUND') ||
          e.message.includes('connect ECONNREFUSED')
          ? new Error(`Unavailable ${type} RPC url at ${url}`)
          : e;
      }
    },
    './node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__.d(__webpack_exports__, {
        RI: () => formatJsonRpcError,
        o0: () => payloadId,
        sT: () => formatJsonRpcRequest,
        tm: () => formatJsonRpcResult,
      });
      var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js'
        ),
        _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js'
        );
      function payloadId() {
        return Date.now() * Math.pow(10, 3) + Math.floor(Math.random() * Math.pow(10, 3));
      }
      function formatJsonRpcRequest(method, params, id) {
        return { id: id || payloadId(), jsonrpc: '2.0', method, params };
      }
      function formatJsonRpcResult(id, result) {
        return { id, jsonrpc: '2.0', result };
      }
      function formatJsonRpcError(id, error, data) {
        return { id, jsonrpc: '2.0', error: formatErrorMessage(error, data) };
      }
      function formatErrorMessage(error, data) {
        return void 0 === error
          ? (0, _error__WEBPACK_IMPORTED_MODULE_0__.by)(_constants__WEBPACK_IMPORTED_MODULE_1__.O4)
          : ('string' == typeof error &&
              (error = Object.assign(
                Object.assign(
                  {},
                  (0, _error__WEBPACK_IMPORTED_MODULE_0__.by)(
                    _constants__WEBPACK_IMPORTED_MODULE_1__.CA
                  )
                ),
                { message: error }
              )),
            void 0 !== data && (error.data = data),
            (0, _error__WEBPACK_IMPORTED_MODULE_0__.i5)(error.code) &&
              (error = (0, _error__WEBPACK_IMPORTED_MODULE_0__.L2)(error.code)),
            error);
      }
    },
    './node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__.d(__webpack_exports__, {
        formatJsonRpcError: () => _format__WEBPACK_IMPORTED_MODULE_3__.RI,
        formatJsonRpcRequest: () => _format__WEBPACK_IMPORTED_MODULE_3__.sT,
        formatJsonRpcResult: () => _format__WEBPACK_IMPORTED_MODULE_3__.tm,
        isHttpUrl: () => _url__WEBPACK_IMPORTED_MODULE_5__.jK,
        isJsonRpcError: () => _validators__WEBPACK_IMPORTED_MODULE_6__.jg,
        isJsonRpcRequest: () => _validators__WEBPACK_IMPORTED_MODULE_6__.DW,
        isJsonRpcResponse: () => _validators__WEBPACK_IMPORTED_MODULE_6__.u,
        isJsonRpcResult: () => _validators__WEBPACK_IMPORTED_MODULE_6__.k4,
        isLocalhostUrl: () => _url__WEBPACK_IMPORTED_MODULE_5__.JF,
        isWsUrl: () => _url__WEBPACK_IMPORTED_MODULE_5__.UZ,
        parseConnectionError: () => _error__WEBPACK_IMPORTED_MODULE_1__.CX,
        payloadId: () => _format__WEBPACK_IMPORTED_MODULE_3__.o0,
      });
      __webpack_require__('./node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js');
      var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js'
        ),
        _env__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js'
        );
      __webpack_require__.o(_env__WEBPACK_IMPORTED_MODULE_2__, 'IJsonRpcProvider') &&
        __webpack_require__.d(__webpack_exports__, {
          IJsonRpcProvider: function () {
            return _env__WEBPACK_IMPORTED_MODULE_2__.IJsonRpcProvider;
          },
        }),
        __webpack_require__.o(_env__WEBPACK_IMPORTED_MODULE_2__, 'formatJsonRpcError') &&
          __webpack_require__.d(__webpack_exports__, {
            formatJsonRpcError: function () {
              return _env__WEBPACK_IMPORTED_MODULE_2__.formatJsonRpcError;
            },
          }),
        __webpack_require__.o(_env__WEBPACK_IMPORTED_MODULE_2__, 'formatJsonRpcRequest') &&
          __webpack_require__.d(__webpack_exports__, {
            formatJsonRpcRequest: function () {
              return _env__WEBPACK_IMPORTED_MODULE_2__.formatJsonRpcRequest;
            },
          }),
        __webpack_require__.o(_env__WEBPACK_IMPORTED_MODULE_2__, 'formatJsonRpcResult') &&
          __webpack_require__.d(__webpack_exports__, {
            formatJsonRpcResult: function () {
              return _env__WEBPACK_IMPORTED_MODULE_2__.formatJsonRpcResult;
            },
          }),
        __webpack_require__.o(_env__WEBPACK_IMPORTED_MODULE_2__, 'isHttpUrl') &&
          __webpack_require__.d(__webpack_exports__, {
            isHttpUrl: function () {
              return _env__WEBPACK_IMPORTED_MODULE_2__.isHttpUrl;
            },
          }),
        __webpack_require__.o(_env__WEBPACK_IMPORTED_MODULE_2__, 'isJsonRpcError') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcError: function () {
              return _env__WEBPACK_IMPORTED_MODULE_2__.isJsonRpcError;
            },
          }),
        __webpack_require__.o(_env__WEBPACK_IMPORTED_MODULE_2__, 'isJsonRpcRequest') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcRequest: function () {
              return _env__WEBPACK_IMPORTED_MODULE_2__.isJsonRpcRequest;
            },
          }),
        __webpack_require__.o(_env__WEBPACK_IMPORTED_MODULE_2__, 'isJsonRpcResponse') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcResponse: function () {
              return _env__WEBPACK_IMPORTED_MODULE_2__.isJsonRpcResponse;
            },
          }),
        __webpack_require__.o(_env__WEBPACK_IMPORTED_MODULE_2__, 'isJsonRpcResult') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcResult: function () {
              return _env__WEBPACK_IMPORTED_MODULE_2__.isJsonRpcResult;
            },
          }),
        __webpack_require__.o(_env__WEBPACK_IMPORTED_MODULE_2__, 'isLocalhostUrl') &&
          __webpack_require__.d(__webpack_exports__, {
            isLocalhostUrl: function () {
              return _env__WEBPACK_IMPORTED_MODULE_2__.isLocalhostUrl;
            },
          }),
        __webpack_require__.o(_env__WEBPACK_IMPORTED_MODULE_2__, 'isReactNative') &&
          __webpack_require__.d(__webpack_exports__, {
            isReactNative: function () {
              return _env__WEBPACK_IMPORTED_MODULE_2__.isReactNative;
            },
          }),
        __webpack_require__.o(_env__WEBPACK_IMPORTED_MODULE_2__, 'isWsUrl') &&
          __webpack_require__.d(__webpack_exports__, {
            isWsUrl: function () {
              return _env__WEBPACK_IMPORTED_MODULE_2__.isWsUrl;
            },
          }),
        __webpack_require__.o(_env__WEBPACK_IMPORTED_MODULE_2__, 'payloadId') &&
          __webpack_require__.d(__webpack_exports__, {
            payloadId: function () {
              return _env__WEBPACK_IMPORTED_MODULE_2__.payloadId;
            },
          });
      var _format__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js'
        ),
        _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/@walletconnect/jsonrpc-utils/dist/esm/types.js'
        );
      __webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_4__, 'IJsonRpcProvider') &&
        __webpack_require__.d(__webpack_exports__, {
          IJsonRpcProvider: function () {
            return _types__WEBPACK_IMPORTED_MODULE_4__.IJsonRpcProvider;
          },
        }),
        __webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_4__, 'isHttpUrl') &&
          __webpack_require__.d(__webpack_exports__, {
            isHttpUrl: function () {
              return _types__WEBPACK_IMPORTED_MODULE_4__.isHttpUrl;
            },
          }),
        __webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_4__, 'isJsonRpcError') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcError: function () {
              return _types__WEBPACK_IMPORTED_MODULE_4__.isJsonRpcError;
            },
          }),
        __webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_4__, 'isJsonRpcRequest') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcRequest: function () {
              return _types__WEBPACK_IMPORTED_MODULE_4__.isJsonRpcRequest;
            },
          }),
        __webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_4__, 'isJsonRpcResponse') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcResponse: function () {
              return _types__WEBPACK_IMPORTED_MODULE_4__.isJsonRpcResponse;
            },
          }),
        __webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_4__, 'isJsonRpcResult') &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcResult: function () {
              return _types__WEBPACK_IMPORTED_MODULE_4__.isJsonRpcResult;
            },
          }),
        __webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_4__, 'isLocalhostUrl') &&
          __webpack_require__.d(__webpack_exports__, {
            isLocalhostUrl: function () {
              return _types__WEBPACK_IMPORTED_MODULE_4__.isLocalhostUrl;
            },
          }),
        __webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_4__, 'isReactNative') &&
          __webpack_require__.d(__webpack_exports__, {
            isReactNative: function () {
              return _types__WEBPACK_IMPORTED_MODULE_4__.isReactNative;
            },
          }),
        __webpack_require__.o(_types__WEBPACK_IMPORTED_MODULE_4__, 'isWsUrl') &&
          __webpack_require__.d(__webpack_exports__, {
            isWsUrl: function () {
              return _types__WEBPACK_IMPORTED_MODULE_4__.isWsUrl;
            },
          });
      var _url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js'
        ),
        _validators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          './node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js'
        );
    },
    './node_modules/@walletconnect/jsonrpc-utils/dist/esm/types.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__.d(__webpack_exports__, {
        IJsonRpcProvider: () =>
          _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__.IJsonRpcProvider,
      });
      var _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/@walletconnect/jsonrpc-types/dist/esm/index.js'
      );
      __webpack_require__.o(
        _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__,
        'isHttpUrl'
      ) &&
        __webpack_require__.d(__webpack_exports__, {
          isHttpUrl: function () {
            return _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__.isHttpUrl;
          },
        }),
        __webpack_require__.o(
          _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__,
          'isJsonRpcError'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcError: function () {
              return _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__.isJsonRpcError;
            },
          }),
        __webpack_require__.o(
          _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__,
          'isJsonRpcRequest'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcRequest: function () {
              return _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__.isJsonRpcRequest;
            },
          }),
        __webpack_require__.o(
          _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__,
          'isJsonRpcResponse'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcResponse: function () {
              return _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__.isJsonRpcResponse;
            },
          }),
        __webpack_require__.o(
          _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__,
          'isJsonRpcResult'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isJsonRpcResult: function () {
              return _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__.isJsonRpcResult;
            },
          }),
        __webpack_require__.o(
          _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__,
          'isLocalhostUrl'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isLocalhostUrl: function () {
              return _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__.isLocalhostUrl;
            },
          }),
        __webpack_require__.o(
          _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__,
          'isReactNative'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isReactNative: function () {
              return _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__.isReactNative;
            },
          }),
        __webpack_require__.o(
          _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__,
          'isWsUrl'
        ) &&
          __webpack_require__.d(__webpack_exports__, {
            isWsUrl: function () {
              return _walletconnect_jsonrpc_types__WEBPACK_IMPORTED_MODULE_0__.isWsUrl;
            },
          });
    },
    './node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__.d(__webpack_exports__, {
        JF: () => isLocalhostUrl,
        UZ: () => isWsUrl,
        jK: () => isHttpUrl,
      });
      const HTTP_REGEX = '^https?:',
        WS_REGEX = '^wss?:';
      function matchRegexProtocol(url, regex) {
        const protocol = (function getUrlProtocol(url) {
          const matches = url.match(new RegExp(/^\w+:/, 'gi'));
          if (matches && matches.length) return matches[0];
        })(url);
        return void 0 !== protocol && new RegExp(regex).test(protocol);
      }
      function isHttpUrl(url) {
        return matchRegexProtocol(url, HTTP_REGEX);
      }
      function isWsUrl(url) {
        return matchRegexProtocol(url, WS_REGEX);
      }
      function isLocalhostUrl(url) {
        return new RegExp('wss?://localhost(:d{2,5})?').test(url);
      }
    },
    './node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      function isJsonRpcPayload(payload) {
        return (
          'object' == typeof payload &&
          'id' in payload &&
          'jsonrpc' in payload &&
          '2.0' === payload.jsonrpc
        );
      }
      function isJsonRpcRequest(payload) {
        return isJsonRpcPayload(payload) && 'method' in payload;
      }
      function isJsonRpcResponse(payload) {
        return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
      }
      function isJsonRpcResult(payload) {
        return 'result' in payload;
      }
      function isJsonRpcError(payload) {
        return 'error' in payload;
      }
      __webpack_require__.d(__webpack_exports__, {
        DW: () => isJsonRpcRequest,
        jg: () => isJsonRpcError,
        k4: () => isJsonRpcResult,
        u: () => isJsonRpcResponse,
      });
    },
    './node_modules/@walletconnect/safe-json/dist/esm/index.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      function safeJsonParse(value) {
        if ('string' != typeof value)
          throw new Error('Cannot safe json parse value of type ' + typeof value);
        try {
          return JSON.parse(value);
        } catch (_a) {
          return value;
        }
      }
      function safeJsonStringify(value) {
        return 'string' == typeof value ? value : JSON.stringify(value);
      }
      __webpack_require__.d(__webpack_exports__, {
        D: () => safeJsonParse,
        u: () => safeJsonStringify,
      });
    },
    './node_modules/@walletconnect/window-getters/dist/cjs/index.js': (
      __unused_webpack_module,
      exports
    ) => {
      'use strict';
      function getFromWindow(name) {
        let res;
        return 'undefined' != typeof window && void 0 !== window[name] && (res = window[name]), res;
      }
      function getFromWindowOrThrow(name) {
        const res = getFromWindow(name);
        if (!res) throw new Error(`${name} is not defined in Window`);
        return res;
      }
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.getLocalStorage =
          exports.getLocalStorageOrThrow =
          exports.getCrypto =
          exports.getCryptoOrThrow =
          exports.getLocation =
          exports.getLocationOrThrow =
          exports.getNavigator =
          exports.getNavigatorOrThrow =
          exports.getDocument =
          exports.getDocumentOrThrow =
          exports.getFromWindowOrThrow =
          exports.getFromWindow =
            void 0),
        (exports.getFromWindow = getFromWindow),
        (exports.getFromWindowOrThrow = getFromWindowOrThrow),
        (exports.getDocumentOrThrow = function getDocumentOrThrow() {
          return getFromWindowOrThrow('document');
        }),
        (exports.getDocument = function getDocument() {
          return getFromWindow('document');
        }),
        (exports.getNavigatorOrThrow = function getNavigatorOrThrow() {
          return getFromWindowOrThrow('navigator');
        }),
        (exports.getNavigator = function getNavigator() {
          return getFromWindow('navigator');
        }),
        (exports.getLocationOrThrow = function getLocationOrThrow() {
          return getFromWindowOrThrow('location');
        }),
        (exports.getLocation = function getLocation() {
          return getFromWindow('location');
        }),
        (exports.getCryptoOrThrow = function getCryptoOrThrow() {
          return getFromWindowOrThrow('crypto');
        }),
        (exports.getCrypto = function getCrypto() {
          return getFromWindow('crypto');
        }),
        (exports.getLocalStorageOrThrow = function getLocalStorageOrThrow() {
          return getFromWindowOrThrow('localStorage');
        }),
        (exports.getLocalStorage = function getLocalStorage() {
          return getFromWindow('localStorage');
        });
    },
    './node_modules/cross-fetch/dist/browser-ponyfill.js': function (module, exports) {
      var global = 'undefined' != typeof self ? self : this,
        __self__ = (function () {
          function F() {
            (this.fetch = !1), (this.DOMException = global.DOMException);
          }
          return (F.prototype = global), new F();
        })();
      !(function (self) {
        !(function (exports) {
          var support_searchParams = 'URLSearchParams' in self,
            support_iterable = 'Symbol' in self && 'iterator' in Symbol,
            support_blob =
              'FileReader' in self &&
              'Blob' in self &&
              (function () {
                try {
                  return new Blob(), !0;
                } catch (e) {
                  return !1;
                }
              })(),
            support_formData = 'FormData' in self,
            support_arrayBuffer = 'ArrayBuffer' in self;
          if (support_arrayBuffer)
            var viewClasses = [
                '[object Int8Array]',
                '[object Uint8Array]',
                '[object Uint8ClampedArray]',
                '[object Int16Array]',
                '[object Uint16Array]',
                '[object Int32Array]',
                '[object Uint32Array]',
                '[object Float32Array]',
                '[object Float64Array]',
              ],
              isArrayBufferView =
                ArrayBuffer.isView ||
                function (obj) {
                  return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
                };
          function normalizeName(name) {
            if (
              ('string' != typeof name && (name = String(name)),
              /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name))
            )
              throw new TypeError('Invalid character in header field name');
            return name.toLowerCase();
          }
          function normalizeValue(value) {
            return 'string' != typeof value && (value = String(value)), value;
          }
          function iteratorFor(items) {
            var iterator = {
              next: function () {
                var value = items.shift();
                return { done: void 0 === value, value };
              },
            };
            return (
              support_iterable &&
                (iterator[Symbol.iterator] = function () {
                  return iterator;
                }),
              iterator
            );
          }
          function Headers(headers) {
            (this.map = {}),
              headers instanceof Headers
                ? headers.forEach(function (value, name) {
                    this.append(name, value);
                  }, this)
                : Array.isArray(headers)
                ? headers.forEach(function (header) {
                    this.append(header[0], header[1]);
                  }, this)
                : headers &&
                  Object.getOwnPropertyNames(headers).forEach(function (name) {
                    this.append(name, headers[name]);
                  }, this);
          }
          function consumed(body) {
            if (body.bodyUsed) return Promise.reject(new TypeError('Already read'));
            body.bodyUsed = !0;
          }
          function fileReaderReady(reader) {
            return new Promise(function (resolve, reject) {
              (reader.onload = function () {
                resolve(reader.result);
              }),
                (reader.onerror = function () {
                  reject(reader.error);
                });
            });
          }
          function readBlobAsArrayBuffer(blob) {
            var reader = new FileReader(),
              promise = fileReaderReady(reader);
            return reader.readAsArrayBuffer(blob), promise;
          }
          function bufferClone(buf) {
            if (buf.slice) return buf.slice(0);
            var view = new Uint8Array(buf.byteLength);
            return view.set(new Uint8Array(buf)), view.buffer;
          }
          function Body() {
            return (
              (this.bodyUsed = !1),
              (this._initBody = function (body) {
                (this._bodyInit = body),
                  body
                    ? 'string' == typeof body
                      ? (this._bodyText = body)
                      : support_blob && Blob.prototype.isPrototypeOf(body)
                      ? (this._bodyBlob = body)
                      : support_formData && FormData.prototype.isPrototypeOf(body)
                      ? (this._bodyFormData = body)
                      : support_searchParams && URLSearchParams.prototype.isPrototypeOf(body)
                      ? (this._bodyText = body.toString())
                      : support_arrayBuffer &&
                        support_blob &&
                        (function isDataView(obj) {
                          return obj && DataView.prototype.isPrototypeOf(obj);
                        })(body)
                      ? ((this._bodyArrayBuffer = bufferClone(body.buffer)),
                        (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                      : support_arrayBuffer &&
                        (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))
                      ? (this._bodyArrayBuffer = bufferClone(body))
                      : (this._bodyText = body = Object.prototype.toString.call(body))
                    : (this._bodyText = ''),
                  this.headers.get('content-type') ||
                    ('string' == typeof body
                      ? this.headers.set('content-type', 'text/plain;charset=UTF-8')
                      : this._bodyBlob && this._bodyBlob.type
                      ? this.headers.set('content-type', this._bodyBlob.type)
                      : support_searchParams &&
                        URLSearchParams.prototype.isPrototypeOf(body) &&
                        this.headers.set(
                          'content-type',
                          'application/x-www-form-urlencoded;charset=UTF-8'
                        ));
              }),
              support_blob &&
                ((this.blob = function () {
                  var rejected = consumed(this);
                  if (rejected) return rejected;
                  if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                  if (this._bodyArrayBuffer)
                    return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                  if (this._bodyFormData) throw new Error('could not read FormData body as blob');
                  return Promise.resolve(new Blob([this._bodyText]));
                }),
                (this.arrayBuffer = function () {
                  return this._bodyArrayBuffer
                    ? consumed(this) || Promise.resolve(this._bodyArrayBuffer)
                    : this.blob().then(readBlobAsArrayBuffer);
                })),
              (this.text = function () {
                var rejected = consumed(this);
                if (rejected) return rejected;
                if (this._bodyBlob)
                  return (function readBlobAsText(blob) {
                    var reader = new FileReader(),
                      promise = fileReaderReady(reader);
                    return reader.readAsText(blob), promise;
                  })(this._bodyBlob);
                if (this._bodyArrayBuffer)
                  return Promise.resolve(
                    (function readArrayBufferAsText(buf) {
                      for (
                        var view = new Uint8Array(buf), chars = new Array(view.length), i = 0;
                        i < view.length;
                        i++
                      )
                        chars[i] = String.fromCharCode(view[i]);
                      return chars.join('');
                    })(this._bodyArrayBuffer)
                  );
                if (this._bodyFormData) throw new Error('could not read FormData body as text');
                return Promise.resolve(this._bodyText);
              }),
              support_formData &&
                (this.formData = function () {
                  return this.text().then(decode);
                }),
              (this.json = function () {
                return this.text().then(JSON.parse);
              }),
              this
            );
          }
          (Headers.prototype.append = function (name, value) {
            (name = normalizeName(name)), (value = normalizeValue(value));
            var oldValue = this.map[name];
            this.map[name] = oldValue ? oldValue + ', ' + value : value;
          }),
            (Headers.prototype.delete = function (name) {
              delete this.map[normalizeName(name)];
            }),
            (Headers.prototype.get = function (name) {
              return (name = normalizeName(name)), this.has(name) ? this.map[name] : null;
            }),
            (Headers.prototype.has = function (name) {
              return this.map.hasOwnProperty(normalizeName(name));
            }),
            (Headers.prototype.set = function (name, value) {
              this.map[normalizeName(name)] = normalizeValue(value);
            }),
            (Headers.prototype.forEach = function (callback, thisArg) {
              for (var name in this.map)
                this.map.hasOwnProperty(name) && callback.call(thisArg, this.map[name], name, this);
            }),
            (Headers.prototype.keys = function () {
              var items = [];
              return (
                this.forEach(function (value, name) {
                  items.push(name);
                }),
                iteratorFor(items)
              );
            }),
            (Headers.prototype.values = function () {
              var items = [];
              return (
                this.forEach(function (value) {
                  items.push(value);
                }),
                iteratorFor(items)
              );
            }),
            (Headers.prototype.entries = function () {
              var items = [];
              return (
                this.forEach(function (value, name) {
                  items.push([name, value]);
                }),
                iteratorFor(items)
              );
            }),
            support_iterable && (Headers.prototype[Symbol.iterator] = Headers.prototype.entries);
          var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
          function Request(input, options) {
            var body = (options = options || {}).body;
            if (input instanceof Request) {
              if (input.bodyUsed) throw new TypeError('Already read');
              (this.url = input.url),
                (this.credentials = input.credentials),
                options.headers || (this.headers = new Headers(input.headers)),
                (this.method = input.method),
                (this.mode = input.mode),
                (this.signal = input.signal),
                body ||
                  null == input._bodyInit ||
                  ((body = input._bodyInit), (input.bodyUsed = !0));
            } else this.url = String(input);
            if (
              ((this.credentials = options.credentials || this.credentials || 'same-origin'),
              (!options.headers && this.headers) || (this.headers = new Headers(options.headers)),
              (this.method = (function normalizeMethod(method) {
                var upcased = method.toUpperCase();
                return methods.indexOf(upcased) > -1 ? upcased : method;
              })(options.method || this.method || 'GET')),
              (this.mode = options.mode || this.mode || null),
              (this.signal = options.signal || this.signal),
              (this.referrer = null),
              ('GET' === this.method || 'HEAD' === this.method) && body)
            )
              throw new TypeError('Body not allowed for GET or HEAD requests');
            this._initBody(body);
          }
          function decode(body) {
            var form = new FormData();
            return (
              body
                .trim()
                .split('&')
                .forEach(function (bytes) {
                  if (bytes) {
                    var split = bytes.split('='),
                      name = split.shift().replace(/\+/g, ' '),
                      value = split.join('=').replace(/\+/g, ' ');
                    form.append(decodeURIComponent(name), decodeURIComponent(value));
                  }
                }),
              form
            );
          }
          function Response(bodyInit, options) {
            options || (options = {}),
              (this.type = 'default'),
              (this.status = void 0 === options.status ? 200 : options.status),
              (this.ok = this.status >= 200 && this.status < 300),
              (this.statusText = 'statusText' in options ? options.statusText : 'OK'),
              (this.headers = new Headers(options.headers)),
              (this.url = options.url || ''),
              this._initBody(bodyInit);
          }
          (Request.prototype.clone = function () {
            return new Request(this, { body: this._bodyInit });
          }),
            Body.call(Request.prototype),
            Body.call(Response.prototype),
            (Response.prototype.clone = function () {
              return new Response(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new Headers(this.headers),
                url: this.url,
              });
            }),
            (Response.error = function () {
              var response = new Response(null, { status: 0, statusText: '' });
              return (response.type = 'error'), response;
            });
          var redirectStatuses = [301, 302, 303, 307, 308];
          (Response.redirect = function (url, status) {
            if (-1 === redirectStatuses.indexOf(status))
              throw new RangeError('Invalid status code');
            return new Response(null, { status, headers: { location: url } });
          }),
            (exports.DOMException = self.DOMException);
          try {
            new exports.DOMException();
          } catch (err) {
            (exports.DOMException = function (message, name) {
              (this.message = message), (this.name = name);
              var error = Error(message);
              this.stack = error.stack;
            }),
              (exports.DOMException.prototype = Object.create(Error.prototype)),
              (exports.DOMException.prototype.constructor = exports.DOMException);
          }
          function fetch(input, init) {
            return new Promise(function (resolve, reject) {
              var request = new Request(input, init);
              if (request.signal && request.signal.aborted)
                return reject(new exports.DOMException('Aborted', 'AbortError'));
              var xhr = new XMLHttpRequest();
              function abortXhr() {
                xhr.abort();
              }
              (xhr.onload = function () {
                var rawHeaders,
                  headers,
                  options = {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers:
                      ((rawHeaders = xhr.getAllResponseHeaders() || ''),
                      (headers = new Headers()),
                      rawHeaders
                        .replace(/\r?\n[\t ]+/g, ' ')
                        .split(/\r?\n/)
                        .forEach(function (line) {
                          var parts = line.split(':'),
                            key = parts.shift().trim();
                          if (key) {
                            var value = parts.join(':').trim();
                            headers.append(key, value);
                          }
                        }),
                      headers),
                  };
                options.url =
                  'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
                var body = 'response' in xhr ? xhr.response : xhr.responseText;
                resolve(new Response(body, options));
              }),
                (xhr.onerror = function () {
                  reject(new TypeError('Network request failed'));
                }),
                (xhr.ontimeout = function () {
                  reject(new TypeError('Network request failed'));
                }),
                (xhr.onabort = function () {
                  reject(new exports.DOMException('Aborted', 'AbortError'));
                }),
                xhr.open(request.method, request.url, !0),
                'include' === request.credentials
                  ? (xhr.withCredentials = !0)
                  : 'omit' === request.credentials && (xhr.withCredentials = !1),
                'responseType' in xhr && support_blob && (xhr.responseType = 'blob'),
                request.headers.forEach(function (value, name) {
                  xhr.setRequestHeader(name, value);
                }),
                request.signal &&
                  (request.signal.addEventListener('abort', abortXhr),
                  (xhr.onreadystatechange = function () {
                    4 === xhr.readyState && request.signal.removeEventListener('abort', abortXhr);
                  })),
                xhr.send(void 0 === request._bodyInit ? null : request._bodyInit);
            });
          }
          (fetch.polyfill = !0),
            self.fetch ||
              ((self.fetch = fetch),
              (self.Headers = Headers),
              (self.Request = Request),
              (self.Response = Response)),
            (exports.Headers = Headers),
            (exports.Request = Request),
            (exports.Response = Response),
            (exports.fetch = fetch),
            Object.defineProperty(exports, '__esModule', { value: !0 });
        })({});
      })(__self__),
        (__self__.fetch.ponyfill = !0),
        delete __self__.fetch.polyfill;
      var ctx = __self__;
      ((exports = ctx.fetch).default = ctx.fetch),
        (exports.fetch = ctx.fetch),
        (exports.Headers = ctx.Headers),
        (exports.Request = ctx.Request),
        (exports.Response = ctx.Response),
        (module.exports = exports);
    },
    './node_modules/decode-uri-component/index.js': (module) => {
      'use strict';
      var singleMatcher = new RegExp('(%[a-f0-9]{2})|([^%]+?)', 'gi'),
        multiMatcher = new RegExp('(%[a-f0-9]{2})+', 'gi');
      function decodeComponents(components, split) {
        try {
          return [decodeURIComponent(components.join(''))];
        } catch (err) {}
        if (1 === components.length) return components;
        split = split || 1;
        var left = components.slice(0, split),
          right = components.slice(split);
        return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
      }
      function decode(input) {
        try {
          return decodeURIComponent(input);
        } catch (err) {
          for (var tokens = input.match(singleMatcher) || [], i = 1; i < tokens.length; i++)
            tokens = (input = decodeComponents(tokens, i).join('')).match(singleMatcher) || [];
          return input;
        }
      }
      module.exports = function (encodedURI) {
        if ('string' != typeof encodedURI)
          throw new TypeError(
            'Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`'
          );
        try {
          return (encodedURI = encodedURI.replace(/\+/g, ' ')), decodeURIComponent(encodedURI);
        } catch (err) {
          return (function customDecodeURIComponent(input) {
            for (
              var replaceMap = { '%FE%FF': '��', '%FF%FE': '��' }, match = multiMatcher.exec(input);
              match;

            ) {
              try {
                replaceMap[match[0]] = decodeURIComponent(match[0]);
              } catch (err) {
                var result = decode(match[0]);
                result !== match[0] && (replaceMap[match[0]] = result);
              }
              match = multiMatcher.exec(input);
            }
            replaceMap['%C2'] = '�';
            for (var entries = Object.keys(replaceMap), i = 0; i < entries.length; i++) {
              var key = entries[i];
              input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
            }
            return input;
          })(encodedURI);
        }
      };
    },
    './node_modules/split-on-first/index.js': (module) => {
      'use strict';
      module.exports = (string, separator) => {
        if ('string' != typeof string || 'string' != typeof separator)
          throw new TypeError('Expected the arguments to be of type `string`');
        if ('' === separator) return [string];
        const separatorIndex = string.indexOf(separator);
        return -1 === separatorIndex
          ? [string]
          : [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)];
      };
    },
    './node_modules/strict-uri-encode/index.js': (module) => {
      'use strict';
      module.exports = (str) =>
        encodeURIComponent(str).replace(
          /[!'()*]/g,
          (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`
        );
    },
  },
]);