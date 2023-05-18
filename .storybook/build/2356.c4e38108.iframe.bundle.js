(self.webpackChunkchatweb3_frontend = self.webpackChunkchatweb3_frontend || []).push([
  [2356],
  {
    './node_modules/@stablelib/binary/lib/binary.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      var int_1 = __webpack_require__('./node_modules/@stablelib/int/lib/int.js');
      function writeUint16BE(value, out, offset) {
        return (
          void 0 === out && (out = new Uint8Array(2)),
          void 0 === offset && (offset = 0),
          (out[offset + 0] = value >>> 8),
          (out[offset + 1] = value >>> 0),
          out
        );
      }
      function writeUint16LE(value, out, offset) {
        return (
          void 0 === out && (out = new Uint8Array(2)),
          void 0 === offset && (offset = 0),
          (out[offset + 0] = value >>> 0),
          (out[offset + 1] = value >>> 8),
          out
        );
      }
      function readInt32BE(array, offset) {
        return (
          void 0 === offset && (offset = 0),
          (array[offset] << 24) |
            (array[offset + 1] << 16) |
            (array[offset + 2] << 8) |
            array[offset + 3]
        );
      }
      function readUint32BE(array, offset) {
        return (
          void 0 === offset && (offset = 0),
          ((array[offset] << 24) |
            (array[offset + 1] << 16) |
            (array[offset + 2] << 8) |
            array[offset + 3]) >>>
            0
        );
      }
      function readInt32LE(array, offset) {
        return (
          void 0 === offset && (offset = 0),
          (array[offset + 3] << 24) |
            (array[offset + 2] << 16) |
            (array[offset + 1] << 8) |
            array[offset]
        );
      }
      function readUint32LE(array, offset) {
        return (
          void 0 === offset && (offset = 0),
          ((array[offset + 3] << 24) |
            (array[offset + 2] << 16) |
            (array[offset + 1] << 8) |
            array[offset]) >>>
            0
        );
      }
      function writeUint32BE(value, out, offset) {
        return (
          void 0 === out && (out = new Uint8Array(4)),
          void 0 === offset && (offset = 0),
          (out[offset + 0] = value >>> 24),
          (out[offset + 1] = value >>> 16),
          (out[offset + 2] = value >>> 8),
          (out[offset + 3] = value >>> 0),
          out
        );
      }
      function writeUint32LE(value, out, offset) {
        return (
          void 0 === out && (out = new Uint8Array(4)),
          void 0 === offset && (offset = 0),
          (out[offset + 0] = value >>> 0),
          (out[offset + 1] = value >>> 8),
          (out[offset + 2] = value >>> 16),
          (out[offset + 3] = value >>> 24),
          out
        );
      }
      function writeUint64BE(value, out, offset) {
        return (
          void 0 === out && (out = new Uint8Array(8)),
          void 0 === offset && (offset = 0),
          writeUint32BE((value / 4294967296) >>> 0, out, offset),
          writeUint32BE(value >>> 0, out, offset + 4),
          out
        );
      }
      function writeUint64LE(value, out, offset) {
        return (
          void 0 === out && (out = new Uint8Array(8)),
          void 0 === offset && (offset = 0),
          writeUint32LE(value >>> 0, out, offset),
          writeUint32LE((value / 4294967296) >>> 0, out, offset + 4),
          out
        );
      }
      (exports.readInt16BE = function readInt16BE(array, offset) {
        return (
          void 0 === offset && (offset = 0),
          (((array[offset + 0] << 8) | array[offset + 1]) << 16) >> 16
        );
      }),
        (exports.readUint16BE = function readUint16BE(array, offset) {
          return (
            void 0 === offset && (offset = 0), ((array[offset + 0] << 8) | array[offset + 1]) >>> 0
          );
        }),
        (exports.readInt16LE = function readInt16LE(array, offset) {
          return (
            void 0 === offset && (offset = 0),
            (((array[offset + 1] << 8) | array[offset]) << 16) >> 16
          );
        }),
        (exports.readUint16LE = function readUint16LE(array, offset) {
          return (
            void 0 === offset && (offset = 0), ((array[offset + 1] << 8) | array[offset]) >>> 0
          );
        }),
        (exports.writeUint16BE = writeUint16BE),
        (exports.writeInt16BE = writeUint16BE),
        (exports.writeUint16LE = writeUint16LE),
        (exports.writeInt16LE = writeUint16LE),
        (exports.readInt32BE = readInt32BE),
        (exports.readUint32BE = readUint32BE),
        (exports.readInt32LE = readInt32LE),
        (exports.readUint32LE = readUint32LE),
        (exports.writeUint32BE = writeUint32BE),
        (exports.writeInt32BE = writeUint32BE),
        (exports.writeUint32LE = writeUint32LE),
        (exports.writeInt32LE = writeUint32LE),
        (exports.readInt64BE = function readInt64BE(array, offset) {
          void 0 === offset && (offset = 0);
          var hi = readInt32BE(array, offset),
            lo = readInt32BE(array, offset + 4);
          return 4294967296 * hi + lo - 4294967296 * (lo >> 31);
        }),
        (exports.readUint64BE = function readUint64BE(array, offset) {
          return (
            void 0 === offset && (offset = 0),
            4294967296 * readUint32BE(array, offset) + readUint32BE(array, offset + 4)
          );
        }),
        (exports.readInt64LE = function readInt64LE(array, offset) {
          void 0 === offset && (offset = 0);
          var lo = readInt32LE(array, offset);
          return 4294967296 * readInt32LE(array, offset + 4) + lo - 4294967296 * (lo >> 31);
        }),
        (exports.readUint64LE = function readUint64LE(array, offset) {
          void 0 === offset && (offset = 0);
          var lo = readUint32LE(array, offset);
          return 4294967296 * readUint32LE(array, offset + 4) + lo;
        }),
        (exports.writeUint64BE = writeUint64BE),
        (exports.writeInt64BE = writeUint64BE),
        (exports.writeUint64LE = writeUint64LE),
        (exports.writeInt64LE = writeUint64LE),
        (exports.readUintBE = function readUintBE(bitLength, array, offset) {
          if ((void 0 === offset && (offset = 0), bitLength % 8 != 0))
            throw new Error('readUintBE supports only bitLengths divisible by 8');
          if (bitLength / 8 > array.length - offset)
            throw new Error('readUintBE: array is too short for the given bitLength');
          for (var result = 0, mul = 1, i = bitLength / 8 + offset - 1; i >= offset; i--)
            (result += array[i] * mul), (mul *= 256);
          return result;
        }),
        (exports.readUintLE = function readUintLE(bitLength, array, offset) {
          if ((void 0 === offset && (offset = 0), bitLength % 8 != 0))
            throw new Error('readUintLE supports only bitLengths divisible by 8');
          if (bitLength / 8 > array.length - offset)
            throw new Error('readUintLE: array is too short for the given bitLength');
          for (var result = 0, mul = 1, i = offset; i < offset + bitLength / 8; i++)
            (result += array[i] * mul), (mul *= 256);
          return result;
        }),
        (exports.writeUintBE = function writeUintBE(bitLength, value, out, offset) {
          if (
            (void 0 === out && (out = new Uint8Array(bitLength / 8)),
            void 0 === offset && (offset = 0),
            bitLength % 8 != 0)
          )
            throw new Error('writeUintBE supports only bitLengths divisible by 8');
          if (!int_1.isSafeInteger(value)) throw new Error('writeUintBE value must be an integer');
          for (var div = 1, i = bitLength / 8 + offset - 1; i >= offset; i--)
            (out[i] = (value / div) & 255), (div *= 256);
          return out;
        }),
        (exports.writeUintLE = function writeUintLE(bitLength, value, out, offset) {
          if (
            (void 0 === out && (out = new Uint8Array(bitLength / 8)),
            void 0 === offset && (offset = 0),
            bitLength % 8 != 0)
          )
            throw new Error('writeUintLE supports only bitLengths divisible by 8');
          if (!int_1.isSafeInteger(value)) throw new Error('writeUintLE value must be an integer');
          for (var div = 1, i = offset; i < offset + bitLength / 8; i++)
            (out[i] = (value / div) & 255), (div *= 256);
          return out;
        }),
        (exports.readFloat32BE = function readFloat32BE(array, offset) {
          return (
            void 0 === offset && (offset = 0),
            new DataView(array.buffer, array.byteOffset, array.byteLength).getFloat32(offset)
          );
        }),
        (exports.readFloat32LE = function readFloat32LE(array, offset) {
          return (
            void 0 === offset && (offset = 0),
            new DataView(array.buffer, array.byteOffset, array.byteLength).getFloat32(offset, !0)
          );
        }),
        (exports.readFloat64BE = function readFloat64BE(array, offset) {
          return (
            void 0 === offset && (offset = 0),
            new DataView(array.buffer, array.byteOffset, array.byteLength).getFloat64(offset)
          );
        }),
        (exports.readFloat64LE = function readFloat64LE(array, offset) {
          return (
            void 0 === offset && (offset = 0),
            new DataView(array.buffer, array.byteOffset, array.byteLength).getFloat64(offset, !0)
          );
        }),
        (exports.writeFloat32BE = function writeFloat32BE(value, out, offset) {
          return (
            void 0 === out && (out = new Uint8Array(4)),
            void 0 === offset && (offset = 0),
            new DataView(out.buffer, out.byteOffset, out.byteLength).setFloat32(offset, value),
            out
          );
        }),
        (exports.writeFloat32LE = function writeFloat32LE(value, out, offset) {
          return (
            void 0 === out && (out = new Uint8Array(4)),
            void 0 === offset && (offset = 0),
            new DataView(out.buffer, out.byteOffset, out.byteLength).setFloat32(offset, value, !0),
            out
          );
        }),
        (exports.writeFloat64BE = function writeFloat64BE(value, out, offset) {
          return (
            void 0 === out && (out = new Uint8Array(8)),
            void 0 === offset && (offset = 0),
            new DataView(out.buffer, out.byteOffset, out.byteLength).setFloat64(offset, value),
            out
          );
        }),
        (exports.writeFloat64LE = function writeFloat64LE(value, out, offset) {
          return (
            void 0 === out && (out = new Uint8Array(8)),
            void 0 === offset && (offset = 0),
            new DataView(out.buffer, out.byteOffset, out.byteLength).setFloat64(offset, value, !0),
            out
          );
        });
    },
    './node_modules/@stablelib/chacha/lib/chacha.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      var binary_1 = __webpack_require__('./node_modules/@stablelib/binary/lib/binary.js'),
        wipe_1 = __webpack_require__('./node_modules/@stablelib/wipe/lib/wipe.js'),
        ROUNDS = 20;
      function core(out, input, key) {
        for (
          var j0 = 1634760805,
            j1 = 857760878,
            j2 = 2036477234,
            j3 = 1797285236,
            j4 = (key[3] << 24) | (key[2] << 16) | (key[1] << 8) | key[0],
            j5 = (key[7] << 24) | (key[6] << 16) | (key[5] << 8) | key[4],
            j6 = (key[11] << 24) | (key[10] << 16) | (key[9] << 8) | key[8],
            j7 = (key[15] << 24) | (key[14] << 16) | (key[13] << 8) | key[12],
            j8 = (key[19] << 24) | (key[18] << 16) | (key[17] << 8) | key[16],
            j9 = (key[23] << 24) | (key[22] << 16) | (key[21] << 8) | key[20],
            j10 = (key[27] << 24) | (key[26] << 16) | (key[25] << 8) | key[24],
            j11 = (key[31] << 24) | (key[30] << 16) | (key[29] << 8) | key[28],
            j12 = (input[3] << 24) | (input[2] << 16) | (input[1] << 8) | input[0],
            j13 = (input[7] << 24) | (input[6] << 16) | (input[5] << 8) | input[4],
            j14 = (input[11] << 24) | (input[10] << 16) | (input[9] << 8) | input[8],
            j15 = (input[15] << 24) | (input[14] << 16) | (input[13] << 8) | input[12],
            x0 = j0,
            x1 = j1,
            x2 = j2,
            x3 = j3,
            x4 = j4,
            x5 = j5,
            x6 = j6,
            x7 = j7,
            x8 = j8,
            x9 = j9,
            x10 = j10,
            x11 = j11,
            x12 = j12,
            x13 = j13,
            x14 = j14,
            x15 = j15,
            i = 0;
          i < ROUNDS;
          i += 2
        )
          (x4 =
            ((x4 ^= x8 = (x8 + (x12 = ((x12 ^= x0 = (x0 + x4) | 0) >>> 16) | (x12 << 16))) | 0) >>>
              20) |
            (x4 << 12)),
            (x5 =
              ((x5 ^= x9 =
                (x9 + (x13 = ((x13 ^= x1 = (x1 + x5) | 0) >>> 16) | (x13 << 16))) | 0) >>>
                20) |
              (x5 << 12)),
            (x6 =
              ((x6 ^= x10 =
                (x10 + (x14 = ((x14 ^= x2 = (x2 + x6) | 0) >>> 16) | (x14 << 16))) | 0) >>>
                20) |
              (x6 << 12)),
            (x7 =
              ((x7 ^= x11 =
                (x11 + (x15 = ((x15 ^= x3 = (x3 + x7) | 0) >>> 16) | (x15 << 16))) | 0) >>>
                20) |
              (x7 << 12)),
            (x6 =
              ((x6 ^= x10 =
                (x10 + (x14 = ((x14 ^= x2 = (x2 + x6) | 0) >>> 24) | (x14 << 8))) | 0) >>>
                25) |
              (x6 << 7)),
            (x7 =
              ((x7 ^= x11 =
                (x11 + (x15 = ((x15 ^= x3 = (x3 + x7) | 0) >>> 24) | (x15 << 8))) | 0) >>>
                25) |
              (x7 << 7)),
            (x5 =
              ((x5 ^= x9 = (x9 + (x13 = ((x13 ^= x1 = (x1 + x5) | 0) >>> 24) | (x13 << 8))) | 0) >>>
                25) |
              (x5 << 7)),
            (x4 =
              ((x4 ^= x8 = (x8 + (x12 = ((x12 ^= x0 = (x0 + x4) | 0) >>> 24) | (x12 << 8))) | 0) >>>
                25) |
              (x4 << 7)),
            (x5 =
              ((x5 ^= x10 =
                (x10 + (x15 = ((x15 ^= x0 = (x0 + x5) | 0) >>> 16) | (x15 << 16))) | 0) >>>
                20) |
              (x5 << 12)),
            (x6 =
              ((x6 ^= x11 =
                (x11 + (x12 = ((x12 ^= x1 = (x1 + x6) | 0) >>> 16) | (x12 << 16))) | 0) >>>
                20) |
              (x6 << 12)),
            (x7 =
              ((x7 ^= x8 =
                (x8 + (x13 = ((x13 ^= x2 = (x2 + x7) | 0) >>> 16) | (x13 << 16))) | 0) >>>
                20) |
              (x7 << 12)),
            (x4 =
              ((x4 ^= x9 =
                (x9 + (x14 = ((x14 ^= x3 = (x3 + x4) | 0) >>> 16) | (x14 << 16))) | 0) >>>
                20) |
              (x4 << 12)),
            (x7 =
              ((x7 ^= x8 = (x8 + (x13 = ((x13 ^= x2 = (x2 + x7) | 0) >>> 24) | (x13 << 8))) | 0) >>>
                25) |
              (x7 << 7)),
            (x4 =
              ((x4 ^= x9 = (x9 + (x14 = ((x14 ^= x3 = (x3 + x4) | 0) >>> 24) | (x14 << 8))) | 0) >>>
                25) |
              (x4 << 7)),
            (x6 =
              ((x6 ^= x11 =
                (x11 + (x12 = ((x12 ^= x1 = (x1 + x6) | 0) >>> 24) | (x12 << 8))) | 0) >>>
                25) |
              (x6 << 7)),
            (x5 =
              ((x5 ^= x10 =
                (x10 + (x15 = ((x15 ^= x0 = (x0 + x5) | 0) >>> 24) | (x15 << 8))) | 0) >>>
                25) |
              (x5 << 7));
        binary_1.writeUint32LE((x0 + j0) | 0, out, 0),
          binary_1.writeUint32LE((x1 + j1) | 0, out, 4),
          binary_1.writeUint32LE((x2 + j2) | 0, out, 8),
          binary_1.writeUint32LE((x3 + j3) | 0, out, 12),
          binary_1.writeUint32LE((x4 + j4) | 0, out, 16),
          binary_1.writeUint32LE((x5 + j5) | 0, out, 20),
          binary_1.writeUint32LE((x6 + j6) | 0, out, 24),
          binary_1.writeUint32LE((x7 + j7) | 0, out, 28),
          binary_1.writeUint32LE((x8 + j8) | 0, out, 32),
          binary_1.writeUint32LE((x9 + j9) | 0, out, 36),
          binary_1.writeUint32LE((x10 + j10) | 0, out, 40),
          binary_1.writeUint32LE((x11 + j11) | 0, out, 44),
          binary_1.writeUint32LE((x12 + j12) | 0, out, 48),
          binary_1.writeUint32LE((x13 + j13) | 0, out, 52),
          binary_1.writeUint32LE((x14 + j14) | 0, out, 56),
          binary_1.writeUint32LE((x15 + j15) | 0, out, 60);
      }
      function streamXOR(key, nonce, src, dst, nonceInplaceCounterLength) {
        if (
          (void 0 === nonceInplaceCounterLength && (nonceInplaceCounterLength = 0),
          32 !== key.length)
        )
          throw new Error('ChaCha: key size must be 32 bytes');
        if (dst.length < src.length) throw new Error('ChaCha: destination is shorter than source');
        var nc, counterLength;
        if (0 === nonceInplaceCounterLength) {
          if (8 !== nonce.length && 12 !== nonce.length)
            throw new Error('ChaCha nonce must be 8 or 12 bytes');
          (counterLength = (nc = new Uint8Array(16)).length - nonce.length),
            nc.set(nonce, counterLength);
        } else {
          if (16 !== nonce.length) throw new Error('ChaCha nonce with counter must be 16 bytes');
          (nc = nonce), (counterLength = nonceInplaceCounterLength);
        }
        for (var block = new Uint8Array(64), i = 0; i < src.length; i += 64) {
          core(block, nc, key);
          for (var j = i; j < i + 64 && j < src.length; j++) dst[j] = src[j] ^ block[j - i];
          incrementCounter(nc, 0, counterLength);
        }
        return wipe_1.wipe(block), 0 === nonceInplaceCounterLength && wipe_1.wipe(nc), dst;
      }
      function incrementCounter(counter, pos, len) {
        for (var carry = 1; len--; )
          (carry = (carry + (255 & counter[pos])) | 0),
            (counter[pos] = 255 & carry),
            (carry >>>= 8),
            pos++;
        if (carry > 0) throw new Error('ChaCha: counter overflow');
      }
      (exports.streamXOR = streamXOR),
        (exports.stream = function stream(key, nonce, dst, nonceInplaceCounterLength) {
          return (
            void 0 === nonceInplaceCounterLength && (nonceInplaceCounterLength = 0),
            wipe_1.wipe(dst),
            streamXOR(key, nonce, dst, dst, nonceInplaceCounterLength)
          );
        });
    },
    './node_modules/@stablelib/chacha20poly1305/lib/chacha20poly1305.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      var chacha_1 = __webpack_require__('./node_modules/@stablelib/chacha/lib/chacha.js'),
        poly1305_1 = __webpack_require__('./node_modules/@stablelib/poly1305/lib/poly1305.js'),
        wipe_1 = __webpack_require__('./node_modules/@stablelib/wipe/lib/wipe.js'),
        binary_1 = __webpack_require__('./node_modules/@stablelib/binary/lib/binary.js'),
        constant_time_1 = __webpack_require__(
          './node_modules/@stablelib/constant-time/lib/constant-time.js'
        );
      (exports.Cv = 32), (exports.WH = 12), (exports.pg = 16);
      var ZEROS = new Uint8Array(16),
        ChaCha20Poly1305 = (function () {
          function ChaCha20Poly1305(key) {
            if (
              ((this.nonceLength = exports.WH),
              (this.tagLength = exports.pg),
              key.length !== exports.Cv)
            )
              throw new Error('ChaCha20Poly1305 needs 32-byte key');
            this._key = new Uint8Array(key);
          }
          return (
            (ChaCha20Poly1305.prototype.seal = function (nonce, plaintext, associatedData, dst) {
              if (nonce.length > 16) throw new Error('ChaCha20Poly1305: incorrect nonce length');
              var counter = new Uint8Array(16);
              counter.set(nonce, counter.length - nonce.length);
              var authKey = new Uint8Array(32);
              chacha_1.stream(this._key, counter, authKey, 4);
              var result,
                resultLength = plaintext.length + this.tagLength;
              if (dst) {
                if (dst.length !== resultLength)
                  throw new Error('ChaCha20Poly1305: incorrect destination length');
                result = dst;
              } else result = new Uint8Array(resultLength);
              return (
                chacha_1.streamXOR(this._key, counter, plaintext, result, 4),
                this._authenticate(
                  result.subarray(result.length - this.tagLength, result.length),
                  authKey,
                  result.subarray(0, result.length - this.tagLength),
                  associatedData
                ),
                wipe_1.wipe(counter),
                result
              );
            }),
            (ChaCha20Poly1305.prototype.open = function (nonce, sealed, associatedData, dst) {
              if (nonce.length > 16) throw new Error('ChaCha20Poly1305: incorrect nonce length');
              if (sealed.length < this.tagLength) return null;
              var counter = new Uint8Array(16);
              counter.set(nonce, counter.length - nonce.length);
              var authKey = new Uint8Array(32);
              chacha_1.stream(this._key, counter, authKey, 4);
              var calculatedTag = new Uint8Array(this.tagLength);
              if (
                (this._authenticate(
                  calculatedTag,
                  authKey,
                  sealed.subarray(0, sealed.length - this.tagLength),
                  associatedData
                ),
                !constant_time_1.equal(
                  calculatedTag,
                  sealed.subarray(sealed.length - this.tagLength, sealed.length)
                ))
              )
                return null;
              var result,
                resultLength = sealed.length - this.tagLength;
              if (dst) {
                if (dst.length !== resultLength)
                  throw new Error('ChaCha20Poly1305: incorrect destination length');
                result = dst;
              } else result = new Uint8Array(resultLength);
              return (
                chacha_1.streamXOR(
                  this._key,
                  counter,
                  sealed.subarray(0, sealed.length - this.tagLength),
                  result,
                  4
                ),
                wipe_1.wipe(counter),
                result
              );
            }),
            (ChaCha20Poly1305.prototype.clean = function () {
              return wipe_1.wipe(this._key), this;
            }),
            (ChaCha20Poly1305.prototype._authenticate = function (
              tagOut,
              authKey,
              ciphertext,
              associatedData
            ) {
              var h = new poly1305_1.Poly1305(authKey);
              associatedData &&
                (h.update(associatedData),
                associatedData.length % 16 > 0 &&
                  h.update(ZEROS.subarray(associatedData.length % 16))),
                h.update(ciphertext),
                ciphertext.length % 16 > 0 && h.update(ZEROS.subarray(ciphertext.length % 16));
              var length = new Uint8Array(8);
              associatedData && binary_1.writeUint64LE(associatedData.length, length),
                h.update(length),
                binary_1.writeUint64LE(ciphertext.length, length),
                h.update(length);
              for (var tag = h.digest(), i = 0; i < tag.length; i++) tagOut[i] = tag[i];
              h.clean(), wipe_1.wipe(tag), wipe_1.wipe(length);
            }),
            ChaCha20Poly1305
          );
        })();
      exports.OK = ChaCha20Poly1305;
    },
    './node_modules/@stablelib/constant-time/lib/constant-time.js': (
      __unused_webpack_module,
      exports
    ) => {
      'use strict';
      function compare(a, b) {
        if (a.length !== b.length) return 0;
        for (var result = 0, i = 0; i < a.length; i++) result |= a[i] ^ b[i];
        return 1 & ((result - 1) >>> 8);
      }
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.select = function select(subject, resultIfOne, resultIfZero) {
          return (~(subject - 1) & resultIfOne) | ((subject - 1) & resultIfZero);
        }),
        (exports.lessOrEqual = function lessOrEqual(a, b) {
          return (((0 | a) - (0 | b) - 1) >>> 31) & 1;
        }),
        (exports.compare = compare),
        (exports.equal = function equal(a, b) {
          return 0 !== a.length && 0 !== b.length && 0 !== compare(a, b);
        });
    },
    './node_modules/@stablelib/ed25519/lib/ed25519.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      exports.Xx = exports._w = exports.aP = exports.KS = exports.jQ = void 0;
      const random_1 = __webpack_require__('./node_modules/@stablelib/random/lib/random.js'),
        sha512_1 = __webpack_require__('./node_modules/@stablelib/sha512/lib/sha512.js'),
        wipe_1 = __webpack_require__('./node_modules/@stablelib/wipe/lib/wipe.js');
      function gf(init) {
        const r = new Float64Array(16);
        if (init) for (let i = 0; i < init.length; i++) r[i] = init[i];
        return r;
      }
      (exports.jQ = 64), (exports.KS = 64), (exports.aP = 32);
      new Uint8Array(32)[0] = 9;
      const gf0 = gf(),
        gf1 = gf([1]),
        D = gf([
          30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139,
          11119, 27886, 20995,
        ]),
        D2 = gf([
          61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743,
          22239, 55772, 9222,
        ]),
        X = gf([
          54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502,
          52590, 14035, 8553,
        ]),
        Y = gf([
          26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214,
          26214, 26214, 26214,
        ]),
        I = gf([
          41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099,
          20417, 9344, 11139,
        ]);
      function set25519(r, a) {
        for (let i = 0; i < 16; i++) r[i] = 0 | a[i];
      }
      function car25519(o) {
        let c = 1;
        for (let i = 0; i < 16; i++) {
          let v = o[i] + c + 65535;
          (c = Math.floor(v / 65536)), (o[i] = v - 65536 * c);
        }
        o[0] += c - 1 + 37 * (c - 1);
      }
      function sel25519(p, q, b) {
        const c = ~(b - 1);
        for (let i = 0; i < 16; i++) {
          const t = c & (p[i] ^ q[i]);
          (p[i] ^= t), (q[i] ^= t);
        }
      }
      function pack25519(o, n) {
        const m = gf(),
          t = gf();
        for (let i = 0; i < 16; i++) t[i] = n[i];
        car25519(t), car25519(t), car25519(t);
        for (let j = 0; j < 2; j++) {
          m[0] = t[0] - 65517;
          for (let i = 1; i < 15; i++)
            (m[i] = t[i] - 65535 - ((m[i - 1] >> 16) & 1)), (m[i - 1] &= 65535);
          m[15] = t[15] - 32767 - ((m[14] >> 16) & 1);
          const b = (m[15] >> 16) & 1;
          (m[14] &= 65535), sel25519(t, m, 1 - b);
        }
        for (let i = 0; i < 16; i++) (o[2 * i] = 255 & t[i]), (o[2 * i + 1] = t[i] >> 8);
      }
      function verify32(x, y) {
        let d = 0;
        for (let i = 0; i < 32; i++) d |= x[i] ^ y[i];
        return (1 & ((d - 1) >>> 8)) - 1;
      }
      function neq25519(a, b) {
        const c = new Uint8Array(32),
          d = new Uint8Array(32);
        return pack25519(c, a), pack25519(d, b), verify32(c, d);
      }
      function par25519(a) {
        const d = new Uint8Array(32);
        return pack25519(d, a), 1 & d[0];
      }
      function add(o, a, b) {
        for (let i = 0; i < 16; i++) o[i] = a[i] + b[i];
      }
      function sub(o, a, b) {
        for (let i = 0; i < 16; i++) o[i] = a[i] - b[i];
      }
      function mul(o, a, b) {
        let v,
          c,
          t0 = 0,
          t1 = 0,
          t2 = 0,
          t3 = 0,
          t4 = 0,
          t5 = 0,
          t6 = 0,
          t7 = 0,
          t8 = 0,
          t9 = 0,
          t10 = 0,
          t11 = 0,
          t12 = 0,
          t13 = 0,
          t14 = 0,
          t15 = 0,
          t16 = 0,
          t17 = 0,
          t18 = 0,
          t19 = 0,
          t20 = 0,
          t21 = 0,
          t22 = 0,
          t23 = 0,
          t24 = 0,
          t25 = 0,
          t26 = 0,
          t27 = 0,
          t28 = 0,
          t29 = 0,
          t30 = 0,
          b0 = b[0],
          b1 = b[1],
          b2 = b[2],
          b3 = b[3],
          b4 = b[4],
          b5 = b[5],
          b6 = b[6],
          b7 = b[7],
          b8 = b[8],
          b9 = b[9],
          b10 = b[10],
          b11 = b[11],
          b12 = b[12],
          b13 = b[13],
          b14 = b[14],
          b15 = b[15];
        (v = a[0]),
          (t0 += v * b0),
          (t1 += v * b1),
          (t2 += v * b2),
          (t3 += v * b3),
          (t4 += v * b4),
          (t5 += v * b5),
          (t6 += v * b6),
          (t7 += v * b7),
          (t8 += v * b8),
          (t9 += v * b9),
          (t10 += v * b10),
          (t11 += v * b11),
          (t12 += v * b12),
          (t13 += v * b13),
          (t14 += v * b14),
          (t15 += v * b15),
          (v = a[1]),
          (t1 += v * b0),
          (t2 += v * b1),
          (t3 += v * b2),
          (t4 += v * b3),
          (t5 += v * b4),
          (t6 += v * b5),
          (t7 += v * b6),
          (t8 += v * b7),
          (t9 += v * b8),
          (t10 += v * b9),
          (t11 += v * b10),
          (t12 += v * b11),
          (t13 += v * b12),
          (t14 += v * b13),
          (t15 += v * b14),
          (t16 += v * b15),
          (v = a[2]),
          (t2 += v * b0),
          (t3 += v * b1),
          (t4 += v * b2),
          (t5 += v * b3),
          (t6 += v * b4),
          (t7 += v * b5),
          (t8 += v * b6),
          (t9 += v * b7),
          (t10 += v * b8),
          (t11 += v * b9),
          (t12 += v * b10),
          (t13 += v * b11),
          (t14 += v * b12),
          (t15 += v * b13),
          (t16 += v * b14),
          (t17 += v * b15),
          (v = a[3]),
          (t3 += v * b0),
          (t4 += v * b1),
          (t5 += v * b2),
          (t6 += v * b3),
          (t7 += v * b4),
          (t8 += v * b5),
          (t9 += v * b6),
          (t10 += v * b7),
          (t11 += v * b8),
          (t12 += v * b9),
          (t13 += v * b10),
          (t14 += v * b11),
          (t15 += v * b12),
          (t16 += v * b13),
          (t17 += v * b14),
          (t18 += v * b15),
          (v = a[4]),
          (t4 += v * b0),
          (t5 += v * b1),
          (t6 += v * b2),
          (t7 += v * b3),
          (t8 += v * b4),
          (t9 += v * b5),
          (t10 += v * b6),
          (t11 += v * b7),
          (t12 += v * b8),
          (t13 += v * b9),
          (t14 += v * b10),
          (t15 += v * b11),
          (t16 += v * b12),
          (t17 += v * b13),
          (t18 += v * b14),
          (t19 += v * b15),
          (v = a[5]),
          (t5 += v * b0),
          (t6 += v * b1),
          (t7 += v * b2),
          (t8 += v * b3),
          (t9 += v * b4),
          (t10 += v * b5),
          (t11 += v * b6),
          (t12 += v * b7),
          (t13 += v * b8),
          (t14 += v * b9),
          (t15 += v * b10),
          (t16 += v * b11),
          (t17 += v * b12),
          (t18 += v * b13),
          (t19 += v * b14),
          (t20 += v * b15),
          (v = a[6]),
          (t6 += v * b0),
          (t7 += v * b1),
          (t8 += v * b2),
          (t9 += v * b3),
          (t10 += v * b4),
          (t11 += v * b5),
          (t12 += v * b6),
          (t13 += v * b7),
          (t14 += v * b8),
          (t15 += v * b9),
          (t16 += v * b10),
          (t17 += v * b11),
          (t18 += v * b12),
          (t19 += v * b13),
          (t20 += v * b14),
          (t21 += v * b15),
          (v = a[7]),
          (t7 += v * b0),
          (t8 += v * b1),
          (t9 += v * b2),
          (t10 += v * b3),
          (t11 += v * b4),
          (t12 += v * b5),
          (t13 += v * b6),
          (t14 += v * b7),
          (t15 += v * b8),
          (t16 += v * b9),
          (t17 += v * b10),
          (t18 += v * b11),
          (t19 += v * b12),
          (t20 += v * b13),
          (t21 += v * b14),
          (t22 += v * b15),
          (v = a[8]),
          (t8 += v * b0),
          (t9 += v * b1),
          (t10 += v * b2),
          (t11 += v * b3),
          (t12 += v * b4),
          (t13 += v * b5),
          (t14 += v * b6),
          (t15 += v * b7),
          (t16 += v * b8),
          (t17 += v * b9),
          (t18 += v * b10),
          (t19 += v * b11),
          (t20 += v * b12),
          (t21 += v * b13),
          (t22 += v * b14),
          (t23 += v * b15),
          (v = a[9]),
          (t9 += v * b0),
          (t10 += v * b1),
          (t11 += v * b2),
          (t12 += v * b3),
          (t13 += v * b4),
          (t14 += v * b5),
          (t15 += v * b6),
          (t16 += v * b7),
          (t17 += v * b8),
          (t18 += v * b9),
          (t19 += v * b10),
          (t20 += v * b11),
          (t21 += v * b12),
          (t22 += v * b13),
          (t23 += v * b14),
          (t24 += v * b15),
          (v = a[10]),
          (t10 += v * b0),
          (t11 += v * b1),
          (t12 += v * b2),
          (t13 += v * b3),
          (t14 += v * b4),
          (t15 += v * b5),
          (t16 += v * b6),
          (t17 += v * b7),
          (t18 += v * b8),
          (t19 += v * b9),
          (t20 += v * b10),
          (t21 += v * b11),
          (t22 += v * b12),
          (t23 += v * b13),
          (t24 += v * b14),
          (t25 += v * b15),
          (v = a[11]),
          (t11 += v * b0),
          (t12 += v * b1),
          (t13 += v * b2),
          (t14 += v * b3),
          (t15 += v * b4),
          (t16 += v * b5),
          (t17 += v * b6),
          (t18 += v * b7),
          (t19 += v * b8),
          (t20 += v * b9),
          (t21 += v * b10),
          (t22 += v * b11),
          (t23 += v * b12),
          (t24 += v * b13),
          (t25 += v * b14),
          (t26 += v * b15),
          (v = a[12]),
          (t12 += v * b0),
          (t13 += v * b1),
          (t14 += v * b2),
          (t15 += v * b3),
          (t16 += v * b4),
          (t17 += v * b5),
          (t18 += v * b6),
          (t19 += v * b7),
          (t20 += v * b8),
          (t21 += v * b9),
          (t22 += v * b10),
          (t23 += v * b11),
          (t24 += v * b12),
          (t25 += v * b13),
          (t26 += v * b14),
          (t27 += v * b15),
          (v = a[13]),
          (t13 += v * b0),
          (t14 += v * b1),
          (t15 += v * b2),
          (t16 += v * b3),
          (t17 += v * b4),
          (t18 += v * b5),
          (t19 += v * b6),
          (t20 += v * b7),
          (t21 += v * b8),
          (t22 += v * b9),
          (t23 += v * b10),
          (t24 += v * b11),
          (t25 += v * b12),
          (t26 += v * b13),
          (t27 += v * b14),
          (t28 += v * b15),
          (v = a[14]),
          (t14 += v * b0),
          (t15 += v * b1),
          (t16 += v * b2),
          (t17 += v * b3),
          (t18 += v * b4),
          (t19 += v * b5),
          (t20 += v * b6),
          (t21 += v * b7),
          (t22 += v * b8),
          (t23 += v * b9),
          (t24 += v * b10),
          (t25 += v * b11),
          (t26 += v * b12),
          (t27 += v * b13),
          (t28 += v * b14),
          (t29 += v * b15),
          (v = a[15]),
          (t15 += v * b0),
          (t16 += v * b1),
          (t17 += v * b2),
          (t18 += v * b3),
          (t19 += v * b4),
          (t20 += v * b5),
          (t21 += v * b6),
          (t22 += v * b7),
          (t23 += v * b8),
          (t24 += v * b9),
          (t25 += v * b10),
          (t26 += v * b11),
          (t27 += v * b12),
          (t28 += v * b13),
          (t29 += v * b14),
          (t30 += v * b15),
          (t0 += 38 * t16),
          (t1 += 38 * t17),
          (t2 += 38 * t18),
          (t3 += 38 * t19),
          (t4 += 38 * t20),
          (t5 += 38 * t21),
          (t6 += 38 * t22),
          (t7 += 38 * t23),
          (t8 += 38 * t24),
          (t9 += 38 * t25),
          (t10 += 38 * t26),
          (t11 += 38 * t27),
          (t12 += 38 * t28),
          (t13 += 38 * t29),
          (t14 += 38 * t30),
          (c = 1),
          (v = t0 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t0 = v - 65536 * c),
          (v = t1 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t1 = v - 65536 * c),
          (v = t2 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t2 = v - 65536 * c),
          (v = t3 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t3 = v - 65536 * c),
          (v = t4 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t4 = v - 65536 * c),
          (v = t5 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t5 = v - 65536 * c),
          (v = t6 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t6 = v - 65536 * c),
          (v = t7 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t7 = v - 65536 * c),
          (v = t8 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t8 = v - 65536 * c),
          (v = t9 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t9 = v - 65536 * c),
          (v = t10 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t10 = v - 65536 * c),
          (v = t11 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t11 = v - 65536 * c),
          (v = t12 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t12 = v - 65536 * c),
          (v = t13 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t13 = v - 65536 * c),
          (v = t14 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t14 = v - 65536 * c),
          (v = t15 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t15 = v - 65536 * c),
          (t0 += c - 1 + 37 * (c - 1)),
          (c = 1),
          (v = t0 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t0 = v - 65536 * c),
          (v = t1 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t1 = v - 65536 * c),
          (v = t2 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t2 = v - 65536 * c),
          (v = t3 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t3 = v - 65536 * c),
          (v = t4 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t4 = v - 65536 * c),
          (v = t5 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t5 = v - 65536 * c),
          (v = t6 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t6 = v - 65536 * c),
          (v = t7 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t7 = v - 65536 * c),
          (v = t8 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t8 = v - 65536 * c),
          (v = t9 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t9 = v - 65536 * c),
          (v = t10 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t10 = v - 65536 * c),
          (v = t11 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t11 = v - 65536 * c),
          (v = t12 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t12 = v - 65536 * c),
          (v = t13 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t13 = v - 65536 * c),
          (v = t14 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t14 = v - 65536 * c),
          (v = t15 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t15 = v - 65536 * c),
          (t0 += c - 1 + 37 * (c - 1)),
          (o[0] = t0),
          (o[1] = t1),
          (o[2] = t2),
          (o[3] = t3),
          (o[4] = t4),
          (o[5] = t5),
          (o[6] = t6),
          (o[7] = t7),
          (o[8] = t8),
          (o[9] = t9),
          (o[10] = t10),
          (o[11] = t11),
          (o[12] = t12),
          (o[13] = t13),
          (o[14] = t14),
          (o[15] = t15);
      }
      function square(o, a) {
        mul(o, a, a);
      }
      function inv25519(o, i) {
        const c = gf();
        let a;
        for (a = 0; a < 16; a++) c[a] = i[a];
        for (a = 253; a >= 0; a--) square(c, c), 2 !== a && 4 !== a && mul(c, c, i);
        for (a = 0; a < 16; a++) o[a] = c[a];
      }
      function edadd(p, q) {
        const a = gf(),
          b = gf(),
          c = gf(),
          d = gf(),
          e = gf(),
          f = gf(),
          g = gf(),
          h = gf(),
          t = gf();
        sub(a, p[1], p[0]),
          sub(t, q[1], q[0]),
          mul(a, a, t),
          add(b, p[0], p[1]),
          add(t, q[0], q[1]),
          mul(b, b, t),
          mul(c, p[3], q[3]),
          mul(c, c, D2),
          mul(d, p[2], q[2]),
          add(d, d, d),
          sub(e, b, a),
          sub(f, d, c),
          add(g, d, c),
          add(h, b, a),
          mul(p[0], e, f),
          mul(p[1], h, g),
          mul(p[2], g, f),
          mul(p[3], e, h);
      }
      function cswap(p, q, b) {
        for (let i = 0; i < 4; i++) sel25519(p[i], q[i], b);
      }
      function pack(r, p) {
        const tx = gf(),
          ty = gf(),
          zi = gf();
        inv25519(zi, p[2]),
          mul(tx, p[0], zi),
          mul(ty, p[1], zi),
          pack25519(r, ty),
          (r[31] ^= par25519(tx) << 7);
      }
      function scalarmult(p, q, s) {
        set25519(p[0], gf0), set25519(p[1], gf1), set25519(p[2], gf1), set25519(p[3], gf0);
        for (let i = 255; i >= 0; --i) {
          const b = (s[(i / 8) | 0] >> (7 & i)) & 1;
          cswap(p, q, b), edadd(q, p), edadd(p, p), cswap(p, q, b);
        }
      }
      function scalarbase(p, s) {
        const q = [gf(), gf(), gf(), gf()];
        set25519(q[0], X),
          set25519(q[1], Y),
          set25519(q[2], gf1),
          mul(q[3], X, Y),
          scalarmult(p, q, s);
      }
      function generateKeyPairFromSeed(seed) {
        if (seed.length !== exports.aP)
          throw new Error(`ed25519: seed must be ${exports.aP} bytes`);
        const d = (0, sha512_1.hash)(seed);
        (d[0] &= 248), (d[31] &= 127), (d[31] |= 64);
        const publicKey = new Uint8Array(32),
          p = [gf(), gf(), gf(), gf()];
        scalarbase(p, d), pack(publicKey, p);
        const secretKey = new Uint8Array(64);
        return secretKey.set(seed), secretKey.set(publicKey, 32), { publicKey, secretKey };
      }
      exports._w = generateKeyPairFromSeed;
      const L = new Float64Array([
        237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 16,
      ]);
      function modL(r, x) {
        let carry, i, j, k;
        for (i = 63; i >= 32; --i) {
          for (carry = 0, j = i - 32, k = i - 12; j < k; ++j)
            (x[j] += carry - 16 * x[i] * L[j - (i - 32)]),
              (carry = Math.floor((x[j] + 128) / 256)),
              (x[j] -= 256 * carry);
          (x[j] += carry), (x[i] = 0);
        }
        for (carry = 0, j = 0; j < 32; j++)
          (x[j] += carry - (x[31] >> 4) * L[j]), (carry = x[j] >> 8), (x[j] &= 255);
        for (j = 0; j < 32; j++) x[j] -= carry * L[j];
        for (i = 0; i < 32; i++) (x[i + 1] += x[i] >> 8), (r[i] = 255 & x[i]);
      }
      function reduce(r) {
        const x = new Float64Array(64);
        for (let i = 0; i < 64; i++) x[i] = r[i];
        for (let i = 0; i < 64; i++) r[i] = 0;
        modL(r, x);
      }
      function unpackneg(r, p) {
        const t = gf(),
          chk = gf(),
          num = gf(),
          den = gf(),
          den2 = gf(),
          den4 = gf(),
          den6 = gf();
        return (
          set25519(r[2], gf1),
          (function unpack25519(o, n) {
            for (let i = 0; i < 16; i++) o[i] = n[2 * i] + (n[2 * i + 1] << 8);
            o[15] &= 32767;
          })(r[1], p),
          square(num, r[1]),
          mul(den, num, D),
          sub(num, num, r[2]),
          add(den, r[2], den),
          square(den2, den),
          square(den4, den2),
          mul(den6, den4, den2),
          mul(t, den6, num),
          mul(t, t, den),
          (function pow2523(o, i) {
            const c = gf();
            let a;
            for (a = 0; a < 16; a++) c[a] = i[a];
            for (a = 250; a >= 0; a--) square(c, c), 1 !== a && mul(c, c, i);
            for (a = 0; a < 16; a++) o[a] = c[a];
          })(t, t),
          mul(t, t, num),
          mul(t, t, den),
          mul(t, t, den),
          mul(r[0], t, den),
          square(chk, r[0]),
          mul(chk, chk, den),
          neq25519(chk, num) && mul(r[0], r[0], I),
          square(chk, r[0]),
          mul(chk, chk, den),
          neq25519(chk, num)
            ? -1
            : (par25519(r[0]) === p[31] >> 7 && sub(r[0], gf0, r[0]), mul(r[3], r[0], r[1]), 0)
        );
      }
      exports.Xx = function sign(secretKey, message) {
        const x = new Float64Array(64),
          p = [gf(), gf(), gf(), gf()],
          d = (0, sha512_1.hash)(secretKey.subarray(0, 32));
        (d[0] &= 248), (d[31] &= 127), (d[31] |= 64);
        const signature = new Uint8Array(64);
        signature.set(d.subarray(32), 32);
        const hs = new sha512_1.SHA512();
        hs.update(signature.subarray(32)), hs.update(message);
        const r = hs.digest();
        hs.clean(),
          reduce(r),
          scalarbase(p, r),
          pack(signature, p),
          hs.reset(),
          hs.update(signature.subarray(0, 32)),
          hs.update(secretKey.subarray(32)),
          hs.update(message);
        const h = hs.digest();
        reduce(h);
        for (let i = 0; i < 32; i++) x[i] = r[i];
        for (let i = 0; i < 32; i++) for (let j = 0; j < 32; j++) x[i + j] += h[i] * d[j];
        return modL(signature.subarray(32), x), signature;
      };
    },
    './node_modules/@stablelib/hash/lib/hash.js': (__unused_webpack_module, exports) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.isSerializableHash = function isSerializableHash(h) {
          return (
            void 0 !== h.saveState && void 0 !== h.restoreState && void 0 !== h.cleanSavedState
          );
        });
    },
    './node_modules/@stablelib/hkdf/lib/hkdf.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      var hmac_1 = __webpack_require__('./node_modules/@stablelib/hmac/lib/hmac.js'),
        wipe_1 = __webpack_require__('./node_modules/@stablelib/wipe/lib/wipe.js'),
        HKDF = (function () {
          function HKDF(hash, key, salt, info) {
            void 0 === salt && (salt = new Uint8Array(0)),
              (this._counter = new Uint8Array(1)),
              (this._hash = hash),
              (this._info = info);
            var okm = hmac_1.hmac(this._hash, salt, key);
            (this._hmac = new hmac_1.HMAC(hash, okm)),
              (this._buffer = new Uint8Array(this._hmac.digestLength)),
              (this._bufpos = this._buffer.length);
          }
          return (
            (HKDF.prototype._fillBuffer = function () {
              this._counter[0]++;
              var ctr = this._counter[0];
              if (0 === ctr) throw new Error('hkdf: cannot expand more');
              this._hmac.reset(),
                ctr > 1 && this._hmac.update(this._buffer),
                this._info && this._hmac.update(this._info),
                this._hmac.update(this._counter),
                this._hmac.finish(this._buffer),
                (this._bufpos = 0);
            }),
            (HKDF.prototype.expand = function (length) {
              for (var out = new Uint8Array(length), i = 0; i < out.length; i++)
                this._bufpos === this._buffer.length && this._fillBuffer(),
                  (out[i] = this._buffer[this._bufpos++]);
              return out;
            }),
            (HKDF.prototype.clean = function () {
              this._hmac.clean(),
                wipe_1.wipe(this._buffer),
                wipe_1.wipe(this._counter),
                (this._bufpos = 0);
            }),
            HKDF
          );
        })();
      exports.t = HKDF;
    },
    './node_modules/@stablelib/hmac/lib/hmac.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      var hash_1 = __webpack_require__('./node_modules/@stablelib/hash/lib/hash.js'),
        constant_time_1 = __webpack_require__(
          './node_modules/@stablelib/constant-time/lib/constant-time.js'
        ),
        wipe_1 = __webpack_require__('./node_modules/@stablelib/wipe/lib/wipe.js'),
        HMAC = (function () {
          function HMAC(hash, key) {
            (this._finished = !1),
              (this._inner = new hash()),
              (this._outer = new hash()),
              (this.blockSize = this._outer.blockSize),
              (this.digestLength = this._outer.digestLength);
            var pad = new Uint8Array(this.blockSize);
            key.length > this.blockSize
              ? this._inner.update(key).finish(pad).clean()
              : pad.set(key);
            for (var i = 0; i < pad.length; i++) pad[i] ^= 54;
            this._inner.update(pad);
            for (i = 0; i < pad.length; i++) pad[i] ^= 106;
            this._outer.update(pad),
              hash_1.isSerializableHash(this._inner) &&
                hash_1.isSerializableHash(this._outer) &&
                ((this._innerKeyedState = this._inner.saveState()),
                (this._outerKeyedState = this._outer.saveState())),
              wipe_1.wipe(pad);
          }
          return (
            (HMAC.prototype.reset = function () {
              if (
                !hash_1.isSerializableHash(this._inner) ||
                !hash_1.isSerializableHash(this._outer)
              )
                throw new Error(
                  "hmac: can't reset() because hash doesn't implement restoreState()"
                );
              return (
                this._inner.restoreState(this._innerKeyedState),
                this._outer.restoreState(this._outerKeyedState),
                (this._finished = !1),
                this
              );
            }),
            (HMAC.prototype.clean = function () {
              hash_1.isSerializableHash(this._inner) &&
                this._inner.cleanSavedState(this._innerKeyedState),
                hash_1.isSerializableHash(this._outer) &&
                  this._outer.cleanSavedState(this._outerKeyedState),
                this._inner.clean(),
                this._outer.clean();
            }),
            (HMAC.prototype.update = function (data) {
              return this._inner.update(data), this;
            }),
            (HMAC.prototype.finish = function (out) {
              return this._finished
                ? (this._outer.finish(out), this)
                : (this._inner.finish(out),
                  this._outer.update(out.subarray(0, this.digestLength)).finish(out),
                  (this._finished = !0),
                  this);
            }),
            (HMAC.prototype.digest = function () {
              var out = new Uint8Array(this.digestLength);
              return this.finish(out), out;
            }),
            (HMAC.prototype.saveState = function () {
              if (!hash_1.isSerializableHash(this._inner))
                throw new Error("hmac: can't saveState() because hash doesn't implement it");
              return this._inner.saveState();
            }),
            (HMAC.prototype.restoreState = function (savedState) {
              if (
                !hash_1.isSerializableHash(this._inner) ||
                !hash_1.isSerializableHash(this._outer)
              )
                throw new Error("hmac: can't restoreState() because hash doesn't implement it");
              return (
                this._inner.restoreState(savedState),
                this._outer.restoreState(this._outerKeyedState),
                (this._finished = !1),
                this
              );
            }),
            (HMAC.prototype.cleanSavedState = function (savedState) {
              if (!hash_1.isSerializableHash(this._inner))
                throw new Error("hmac: can't cleanSavedState() because hash doesn't implement it");
              this._inner.cleanSavedState(savedState);
            }),
            HMAC
          );
        })();
      (exports.HMAC = HMAC),
        (exports.hmac = function hmac(hash, key, data) {
          var h = new HMAC(hash, key);
          h.update(data);
          var digest = h.digest();
          return h.clean(), digest;
        }),
        (exports.equal = constant_time_1.equal);
    },
    './node_modules/@stablelib/int/lib/int.js': (__unused_webpack_module, exports) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.mul =
          Math.imul ||
          function imulShim(a, b) {
            var al = 65535 & a,
              bl = 65535 & b;
            return (
              (al * bl + (((((a >>> 16) & 65535) * bl + al * ((b >>> 16) & 65535)) << 16) >>> 0)) |
              0
            );
          }),
        (exports.add = function add(a, b) {
          return (a + b) | 0;
        }),
        (exports.sub = function sub(a, b) {
          return (a - b) | 0;
        }),
        (exports.rotl = function rotl(x, n) {
          return (x << n) | (x >>> (32 - n));
        }),
        (exports.rotr = function rotr(x, n) {
          return (x << (32 - n)) | (x >>> n);
        }),
        (exports.isInteger =
          Number.isInteger ||
          function isIntegerShim(n) {
            return 'number' == typeof n && isFinite(n) && Math.floor(n) === n;
          }),
        (exports.MAX_SAFE_INTEGER = 9007199254740991),
        (exports.isSafeInteger = function (n) {
          return (
            exports.isInteger(n) && n >= -exports.MAX_SAFE_INTEGER && n <= exports.MAX_SAFE_INTEGER
          );
        });
    },
    './node_modules/@stablelib/poly1305/lib/poly1305.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      var constant_time_1 = __webpack_require__(
          './node_modules/@stablelib/constant-time/lib/constant-time.js'
        ),
        wipe_1 = __webpack_require__('./node_modules/@stablelib/wipe/lib/wipe.js');
      exports.DIGEST_LENGTH = 16;
      var Poly1305 = (function () {
        function Poly1305(key) {
          (this.digestLength = exports.DIGEST_LENGTH),
            (this._buffer = new Uint8Array(16)),
            (this._r = new Uint16Array(10)),
            (this._h = new Uint16Array(10)),
            (this._pad = new Uint16Array(8)),
            (this._leftover = 0),
            (this._fin = 0),
            (this._finished = !1);
          var t0 = key[0] | (key[1] << 8);
          this._r[0] = 8191 & t0;
          var t1 = key[2] | (key[3] << 8);
          this._r[1] = 8191 & ((t0 >>> 13) | (t1 << 3));
          var t2 = key[4] | (key[5] << 8);
          this._r[2] = 7939 & ((t1 >>> 10) | (t2 << 6));
          var t3 = key[6] | (key[7] << 8);
          this._r[3] = 8191 & ((t2 >>> 7) | (t3 << 9));
          var t4 = key[8] | (key[9] << 8);
          (this._r[4] = 255 & ((t3 >>> 4) | (t4 << 12))), (this._r[5] = (t4 >>> 1) & 8190);
          var t5 = key[10] | (key[11] << 8);
          this._r[6] = 8191 & ((t4 >>> 14) | (t5 << 2));
          var t6 = key[12] | (key[13] << 8);
          this._r[7] = 8065 & ((t5 >>> 11) | (t6 << 5));
          var t7 = key[14] | (key[15] << 8);
          (this._r[8] = 8191 & ((t6 >>> 8) | (t7 << 8))),
            (this._r[9] = (t7 >>> 5) & 127),
            (this._pad[0] = key[16] | (key[17] << 8)),
            (this._pad[1] = key[18] | (key[19] << 8)),
            (this._pad[2] = key[20] | (key[21] << 8)),
            (this._pad[3] = key[22] | (key[23] << 8)),
            (this._pad[4] = key[24] | (key[25] << 8)),
            (this._pad[5] = key[26] | (key[27] << 8)),
            (this._pad[6] = key[28] | (key[29] << 8)),
            (this._pad[7] = key[30] | (key[31] << 8));
        }
        return (
          (Poly1305.prototype._blocks = function (m, mpos, bytes) {
            for (
              var hibit = this._fin ? 0 : 2048,
                h0 = this._h[0],
                h1 = this._h[1],
                h2 = this._h[2],
                h3 = this._h[3],
                h4 = this._h[4],
                h5 = this._h[5],
                h6 = this._h[6],
                h7 = this._h[7],
                h8 = this._h[8],
                h9 = this._h[9],
                r0 = this._r[0],
                r1 = this._r[1],
                r2 = this._r[2],
                r3 = this._r[3],
                r4 = this._r[4],
                r5 = this._r[5],
                r6 = this._r[6],
                r7 = this._r[7],
                r8 = this._r[8],
                r9 = this._r[9];
              bytes >= 16;

            ) {
              var t0 = m[mpos + 0] | (m[mpos + 1] << 8);
              h0 += 8191 & t0;
              var t1 = m[mpos + 2] | (m[mpos + 3] << 8);
              h1 += 8191 & ((t0 >>> 13) | (t1 << 3));
              var t2 = m[mpos + 4] | (m[mpos + 5] << 8);
              h2 += 8191 & ((t1 >>> 10) | (t2 << 6));
              var t3 = m[mpos + 6] | (m[mpos + 7] << 8);
              h3 += 8191 & ((t2 >>> 7) | (t3 << 9));
              var t4 = m[mpos + 8] | (m[mpos + 9] << 8);
              (h4 += 8191 & ((t3 >>> 4) | (t4 << 12))), (h5 += (t4 >>> 1) & 8191);
              var t5 = m[mpos + 10] | (m[mpos + 11] << 8);
              h6 += 8191 & ((t4 >>> 14) | (t5 << 2));
              var t6 = m[mpos + 12] | (m[mpos + 13] << 8);
              h7 += 8191 & ((t5 >>> 11) | (t6 << 5));
              var t7 = m[mpos + 14] | (m[mpos + 15] << 8),
                c = 0,
                d0 = c;
              (d0 += h0 * r0),
                (d0 += h1 * (5 * r9)),
                (d0 += h2 * (5 * r8)),
                (d0 += h3 * (5 * r7)),
                (c = (d0 += h4 * (5 * r6)) >>> 13),
                (d0 &= 8191),
                (d0 += h5 * (5 * r5)),
                (d0 += h6 * (5 * r4)),
                (d0 += h7 * (5 * r3)),
                (d0 += (h8 += 8191 & ((t6 >>> 8) | (t7 << 8))) * (5 * r2));
              var d1 = (c += (d0 += (h9 += (t7 >>> 5) | hibit) * (5 * r1)) >>> 13);
              (d1 += h0 * r1),
                (d1 += h1 * r0),
                (d1 += h2 * (5 * r9)),
                (d1 += h3 * (5 * r8)),
                (c = (d1 += h4 * (5 * r7)) >>> 13),
                (d1 &= 8191),
                (d1 += h5 * (5 * r6)),
                (d1 += h6 * (5 * r5)),
                (d1 += h7 * (5 * r4)),
                (d1 += h8 * (5 * r3)),
                (c += (d1 += h9 * (5 * r2)) >>> 13),
                (d1 &= 8191);
              var d2 = c;
              (d2 += h0 * r2),
                (d2 += h1 * r1),
                (d2 += h2 * r0),
                (d2 += h3 * (5 * r9)),
                (c = (d2 += h4 * (5 * r8)) >>> 13),
                (d2 &= 8191),
                (d2 += h5 * (5 * r7)),
                (d2 += h6 * (5 * r6)),
                (d2 += h7 * (5 * r5)),
                (d2 += h8 * (5 * r4));
              var d3 = (c += (d2 += h9 * (5 * r3)) >>> 13);
              (d3 += h0 * r3),
                (d3 += h1 * r2),
                (d3 += h2 * r1),
                (d3 += h3 * r0),
                (c = (d3 += h4 * (5 * r9)) >>> 13),
                (d3 &= 8191),
                (d3 += h5 * (5 * r8)),
                (d3 += h6 * (5 * r7)),
                (d3 += h7 * (5 * r6)),
                (d3 += h8 * (5 * r5));
              var d4 = (c += (d3 += h9 * (5 * r4)) >>> 13);
              (d4 += h0 * r4),
                (d4 += h1 * r3),
                (d4 += h2 * r2),
                (d4 += h3 * r1),
                (c = (d4 += h4 * r0) >>> 13),
                (d4 &= 8191),
                (d4 += h5 * (5 * r9)),
                (d4 += h6 * (5 * r8)),
                (d4 += h7 * (5 * r7)),
                (d4 += h8 * (5 * r6));
              var d5 = (c += (d4 += h9 * (5 * r5)) >>> 13);
              (d5 += h0 * r5),
                (d5 += h1 * r4),
                (d5 += h2 * r3),
                (d5 += h3 * r2),
                (c = (d5 += h4 * r1) >>> 13),
                (d5 &= 8191),
                (d5 += h5 * r0),
                (d5 += h6 * (5 * r9)),
                (d5 += h7 * (5 * r8)),
                (d5 += h8 * (5 * r7));
              var d6 = (c += (d5 += h9 * (5 * r6)) >>> 13);
              (d6 += h0 * r6),
                (d6 += h1 * r5),
                (d6 += h2 * r4),
                (d6 += h3 * r3),
                (c = (d6 += h4 * r2) >>> 13),
                (d6 &= 8191),
                (d6 += h5 * r1),
                (d6 += h6 * r0),
                (d6 += h7 * (5 * r9)),
                (d6 += h8 * (5 * r8));
              var d7 = (c += (d6 += h9 * (5 * r7)) >>> 13);
              (d7 += h0 * r7),
                (d7 += h1 * r6),
                (d7 += h2 * r5),
                (d7 += h3 * r4),
                (c = (d7 += h4 * r3) >>> 13),
                (d7 &= 8191),
                (d7 += h5 * r2),
                (d7 += h6 * r1),
                (d7 += h7 * r0),
                (d7 += h8 * (5 * r9));
              var d8 = (c += (d7 += h9 * (5 * r8)) >>> 13);
              (d8 += h0 * r8),
                (d8 += h1 * r7),
                (d8 += h2 * r6),
                (d8 += h3 * r5),
                (c = (d8 += h4 * r4) >>> 13),
                (d8 &= 8191),
                (d8 += h5 * r3),
                (d8 += h6 * r2),
                (d8 += h7 * r1),
                (d8 += h8 * r0);
              var d9 = (c += (d8 += h9 * (5 * r9)) >>> 13);
              (d9 += h0 * r9),
                (d9 += h1 * r8),
                (d9 += h2 * r7),
                (d9 += h3 * r6),
                (c = (d9 += h4 * r5) >>> 13),
                (d9 &= 8191),
                (d9 += h5 * r4),
                (d9 += h6 * r3),
                (d9 += h7 * r2),
                (d9 += h8 * r1),
                (h0 = d0 =
                  8191 &
                  (c = ((c = (((c += (d9 += h9 * r0) >>> 13) << 2) + c) | 0) + (d0 &= 8191)) | 0)),
                (h1 = d1 += c >>>= 13),
                (h2 = d2 &= 8191),
                (h3 = d3 &= 8191),
                (h4 = d4 &= 8191),
                (h5 = d5 &= 8191),
                (h6 = d6 &= 8191),
                (h7 = d7 &= 8191),
                (h8 = d8 &= 8191),
                (h9 = d9 &= 8191),
                (mpos += 16),
                (bytes -= 16);
            }
            (this._h[0] = h0),
              (this._h[1] = h1),
              (this._h[2] = h2),
              (this._h[3] = h3),
              (this._h[4] = h4),
              (this._h[5] = h5),
              (this._h[6] = h6),
              (this._h[7] = h7),
              (this._h[8] = h8),
              (this._h[9] = h9);
          }),
          (Poly1305.prototype.finish = function (mac, macpos) {
            void 0 === macpos && (macpos = 0);
            var c,
              mask,
              f,
              i,
              g = new Uint16Array(10);
            if (this._leftover) {
              for (i = this._leftover, this._buffer[i++] = 1; i < 16; i++) this._buffer[i] = 0;
              (this._fin = 1), this._blocks(this._buffer, 0, 16);
            }
            for (c = this._h[1] >>> 13, this._h[1] &= 8191, i = 2; i < 10; i++)
              (this._h[i] += c), (c = this._h[i] >>> 13), (this._h[i] &= 8191);
            for (
              this._h[0] += 5 * c,
                c = this._h[0] >>> 13,
                this._h[0] &= 8191,
                this._h[1] += c,
                c = this._h[1] >>> 13,
                this._h[1] &= 8191,
                this._h[2] += c,
                g[0] = this._h[0] + 5,
                c = g[0] >>> 13,
                g[0] &= 8191,
                i = 1;
              i < 10;
              i++
            )
              (g[i] = this._h[i] + c), (c = g[i] >>> 13), (g[i] &= 8191);
            for (g[9] -= 8192, mask = (1 ^ c) - 1, i = 0; i < 10; i++) g[i] &= mask;
            for (mask = ~mask, i = 0; i < 10; i++) this._h[i] = (this._h[i] & mask) | g[i];
            for (
              this._h[0] = 65535 & (this._h[0] | (this._h[1] << 13)),
                this._h[1] = 65535 & ((this._h[1] >>> 3) | (this._h[2] << 10)),
                this._h[2] = 65535 & ((this._h[2] >>> 6) | (this._h[3] << 7)),
                this._h[3] = 65535 & ((this._h[3] >>> 9) | (this._h[4] << 4)),
                this._h[4] = 65535 & ((this._h[4] >>> 12) | (this._h[5] << 1) | (this._h[6] << 14)),
                this._h[5] = 65535 & ((this._h[6] >>> 2) | (this._h[7] << 11)),
                this._h[6] = 65535 & ((this._h[7] >>> 5) | (this._h[8] << 8)),
                this._h[7] = 65535 & ((this._h[8] >>> 8) | (this._h[9] << 5)),
                f = this._h[0] + this._pad[0],
                this._h[0] = 65535 & f,
                i = 1;
              i < 8;
              i++
            )
              (f = (((this._h[i] + this._pad[i]) | 0) + (f >>> 16)) | 0), (this._h[i] = 65535 & f);
            return (
              (mac[macpos + 0] = this._h[0] >>> 0),
              (mac[macpos + 1] = this._h[0] >>> 8),
              (mac[macpos + 2] = this._h[1] >>> 0),
              (mac[macpos + 3] = this._h[1] >>> 8),
              (mac[macpos + 4] = this._h[2] >>> 0),
              (mac[macpos + 5] = this._h[2] >>> 8),
              (mac[macpos + 6] = this._h[3] >>> 0),
              (mac[macpos + 7] = this._h[3] >>> 8),
              (mac[macpos + 8] = this._h[4] >>> 0),
              (mac[macpos + 9] = this._h[4] >>> 8),
              (mac[macpos + 10] = this._h[5] >>> 0),
              (mac[macpos + 11] = this._h[5] >>> 8),
              (mac[macpos + 12] = this._h[6] >>> 0),
              (mac[macpos + 13] = this._h[6] >>> 8),
              (mac[macpos + 14] = this._h[7] >>> 0),
              (mac[macpos + 15] = this._h[7] >>> 8),
              (this._finished = !0),
              this
            );
          }),
          (Poly1305.prototype.update = function (m) {
            var want,
              mpos = 0,
              bytes = m.length;
            if (this._leftover) {
              (want = 16 - this._leftover) > bytes && (want = bytes);
              for (var i = 0; i < want; i++) this._buffer[this._leftover + i] = m[mpos + i];
              if (((bytes -= want), (mpos += want), (this._leftover += want), this._leftover < 16))
                return this;
              this._blocks(this._buffer, 0, 16), (this._leftover = 0);
            }
            if (
              (bytes >= 16 &&
                ((want = bytes - (bytes % 16)),
                this._blocks(m, mpos, want),
                (mpos += want),
                (bytes -= want)),
              bytes)
            ) {
              for (i = 0; i < bytes; i++) this._buffer[this._leftover + i] = m[mpos + i];
              this._leftover += bytes;
            }
            return this;
          }),
          (Poly1305.prototype.digest = function () {
            if (this._finished) throw new Error('Poly1305 was finished');
            var mac = new Uint8Array(16);
            return this.finish(mac), mac;
          }),
          (Poly1305.prototype.clean = function () {
            return (
              wipe_1.wipe(this._buffer),
              wipe_1.wipe(this._r),
              wipe_1.wipe(this._h),
              wipe_1.wipe(this._pad),
              (this._leftover = 0),
              (this._fin = 0),
              (this._finished = !0),
              this
            );
          }),
          Poly1305
        );
      })();
      (exports.Poly1305 = Poly1305),
        (exports.oneTimeAuth = function oneTimeAuth(key, data) {
          var h = new Poly1305(key);
          h.update(data);
          var digest = h.digest();
          return h.clean(), digest;
        }),
        (exports.equal = function equal(a, b) {
          return (
            a.length === exports.DIGEST_LENGTH &&
            b.length === exports.DIGEST_LENGTH &&
            constant_time_1.equal(a, b)
          );
        });
    },
    './node_modules/@stablelib/random/lib/random.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.randomStringForEntropy =
          exports.randomString =
          exports.randomUint32 =
          exports.randomBytes =
          exports.defaultRandomSource =
            void 0);
      const system_1 = __webpack_require__('./node_modules/@stablelib/random/lib/source/system.js'),
        binary_1 = __webpack_require__('./node_modules/@stablelib/binary/lib/binary.js'),
        wipe_1 = __webpack_require__('./node_modules/@stablelib/wipe/lib/wipe.js');
      function randomBytes(length, prng = exports.defaultRandomSource) {
        return prng.randomBytes(length);
      }
      (exports.defaultRandomSource = new system_1.SystemRandomSource()),
        (exports.randomBytes = randomBytes),
        (exports.randomUint32 = function randomUint32(prng = exports.defaultRandomSource) {
          const buf = randomBytes(4, prng),
            result = (0, binary_1.readUint32LE)(buf);
          return (0, wipe_1.wipe)(buf), result;
        });
      const ALPHANUMERIC = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      function randomString(length, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
        if (charset.length < 2) throw new Error('randomString charset is too short');
        if (charset.length > 256) throw new Error('randomString charset is too long');
        let out = '';
        const charsLen = charset.length,
          maxByte = 256 - (256 % charsLen);
        for (; length > 0; ) {
          const buf = randomBytes(Math.ceil((256 * length) / maxByte), prng);
          for (let i = 0; i < buf.length && length > 0; i++) {
            const randomByte = buf[i];
            randomByte < maxByte && ((out += charset.charAt(randomByte % charsLen)), length--);
          }
          (0, wipe_1.wipe)(buf);
        }
        return out;
      }
      (exports.randomString = randomString),
        (exports.randomStringForEntropy = function randomStringForEntropy(
          bits,
          charset = ALPHANUMERIC,
          prng = exports.defaultRandomSource
        ) {
          return randomString(
            Math.ceil(bits / (Math.log(charset.length) / Math.LN2)),
            charset,
            prng
          );
        });
    },
    './node_modules/@stablelib/random/lib/source/browser.js': (
      __unused_webpack_module,
      exports
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.BrowserRandomSource = void 0);
      exports.BrowserRandomSource = class BrowserRandomSource {
        constructor() {
          (this.isAvailable = !1), (this.isInstantiated = !1);
          const browserCrypto = 'undefined' != typeof self ? self.crypto || self.msCrypto : null;
          browserCrypto &&
            void 0 !== browserCrypto.getRandomValues &&
            ((this._crypto = browserCrypto), (this.isAvailable = !0), (this.isInstantiated = !0));
        }
        randomBytes(length) {
          if (!this.isAvailable || !this._crypto)
            throw new Error('Browser random byte generator is not available.');
          const out = new Uint8Array(length);
          for (let i = 0; i < out.length; i += 65536)
            this._crypto.getRandomValues(out.subarray(i, i + Math.min(out.length - i, 65536)));
          return out;
        }
      };
    },
    './node_modules/@stablelib/random/lib/source/node.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.NodeRandomSource = void 0);
      const wipe_1 = __webpack_require__('./node_modules/@stablelib/wipe/lib/wipe.js');
      exports.NodeRandomSource = class NodeRandomSource {
        constructor() {
          (this.isAvailable = !1), (this.isInstantiated = !1);
          {
            const nodeCrypto = __webpack_require__('?25ed');
            nodeCrypto &&
              nodeCrypto.randomBytes &&
              ((this._crypto = nodeCrypto), (this.isAvailable = !0), (this.isInstantiated = !0));
          }
        }
        randomBytes(length) {
          if (!this.isAvailable || !this._crypto)
            throw new Error('Node.js random byte generator is not available.');
          let buffer = this._crypto.randomBytes(length);
          if (buffer.length !== length)
            throw new Error('NodeRandomSource: got fewer bytes than requested');
          const out = new Uint8Array(length);
          for (let i = 0; i < out.length; i++) out[i] = buffer[i];
          return (0, wipe_1.wipe)(buffer), out;
        }
      };
    },
    './node_modules/@stablelib/random/lib/source/system.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.SystemRandomSource = void 0);
      const browser_1 = __webpack_require__(
          './node_modules/@stablelib/random/lib/source/browser.js'
        ),
        node_1 = __webpack_require__('./node_modules/@stablelib/random/lib/source/node.js');
      exports.SystemRandomSource = class SystemRandomSource {
        constructor() {
          return (
            (this.isAvailable = !1),
            (this.name = ''),
            (this._source = new browser_1.BrowserRandomSource()),
            this._source.isAvailable
              ? ((this.isAvailable = !0), void (this.name = 'Browser'))
              : ((this._source = new node_1.NodeRandomSource()),
                this._source.isAvailable
                  ? ((this.isAvailable = !0), void (this.name = 'Node'))
                  : void 0)
          );
        }
        randomBytes(length) {
          if (!this.isAvailable) throw new Error('System random byte generator is not available.');
          return this._source.randomBytes(length);
        }
      };
    },
    './node_modules/@stablelib/sha256/lib/sha256.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      var binary_1 = __webpack_require__('./node_modules/@stablelib/binary/lib/binary.js'),
        wipe_1 = __webpack_require__('./node_modules/@stablelib/wipe/lib/wipe.js');
      (exports.k = 32), (exports.cn = 64);
      var SHA256 = (function () {
        function SHA256() {
          (this.digestLength = exports.k),
            (this.blockSize = exports.cn),
            (this._state = new Int32Array(8)),
            (this._temp = new Int32Array(64)),
            (this._buffer = new Uint8Array(128)),
            (this._bufferLength = 0),
            (this._bytesHashed = 0),
            (this._finished = !1),
            this.reset();
        }
        return (
          (SHA256.prototype._initState = function () {
            (this._state[0] = 1779033703),
              (this._state[1] = 3144134277),
              (this._state[2] = 1013904242),
              (this._state[3] = 2773480762),
              (this._state[4] = 1359893119),
              (this._state[5] = 2600822924),
              (this._state[6] = 528734635),
              (this._state[7] = 1541459225);
          }),
          (SHA256.prototype.reset = function () {
            return (
              this._initState(),
              (this._bufferLength = 0),
              (this._bytesHashed = 0),
              (this._finished = !1),
              this
            );
          }),
          (SHA256.prototype.clean = function () {
            wipe_1.wipe(this._buffer), wipe_1.wipe(this._temp), this.reset();
          }),
          (SHA256.prototype.update = function (data, dataLength) {
            if ((void 0 === dataLength && (dataLength = data.length), this._finished))
              throw new Error("SHA256: can't update because hash was finished.");
            var dataPos = 0;
            if (((this._bytesHashed += dataLength), this._bufferLength > 0)) {
              for (; this._bufferLength < this.blockSize && dataLength > 0; )
                (this._buffer[this._bufferLength++] = data[dataPos++]), dataLength--;
              this._bufferLength === this.blockSize &&
                (hashBlocks(this._temp, this._state, this._buffer, 0, this.blockSize),
                (this._bufferLength = 0));
            }
            for (
              dataLength >= this.blockSize &&
              ((dataPos = hashBlocks(this._temp, this._state, data, dataPos, dataLength)),
              (dataLength %= this.blockSize));
              dataLength > 0;

            )
              (this._buffer[this._bufferLength++] = data[dataPos++]), dataLength--;
            return this;
          }),
          (SHA256.prototype.finish = function (out) {
            if (!this._finished) {
              var bytesHashed = this._bytesHashed,
                left = this._bufferLength,
                bitLenHi = (bytesHashed / 536870912) | 0,
                bitLenLo = bytesHashed << 3,
                padLength = bytesHashed % 64 < 56 ? 64 : 128;
              this._buffer[left] = 128;
              for (var i = left + 1; i < padLength - 8; i++) this._buffer[i] = 0;
              binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8),
                binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4),
                hashBlocks(this._temp, this._state, this._buffer, 0, padLength),
                (this._finished = !0);
            }
            for (i = 0; i < this.digestLength / 4; i++)
              binary_1.writeUint32BE(this._state[i], out, 4 * i);
            return this;
          }),
          (SHA256.prototype.digest = function () {
            var out = new Uint8Array(this.digestLength);
            return this.finish(out), out;
          }),
          (SHA256.prototype.saveState = function () {
            if (this._finished) throw new Error('SHA256: cannot save finished state');
            return {
              state: new Int32Array(this._state),
              buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
              bufferLength: this._bufferLength,
              bytesHashed: this._bytesHashed,
            };
          }),
          (SHA256.prototype.restoreState = function (savedState) {
            return (
              this._state.set(savedState.state),
              (this._bufferLength = savedState.bufferLength),
              savedState.buffer && this._buffer.set(savedState.buffer),
              (this._bytesHashed = savedState.bytesHashed),
              (this._finished = !1),
              this
            );
          }),
          (SHA256.prototype.cleanSavedState = function (savedState) {
            wipe_1.wipe(savedState.state),
              savedState.buffer && wipe_1.wipe(savedState.buffer),
              (savedState.bufferLength = 0),
              (savedState.bytesHashed = 0);
          }),
          SHA256
        );
      })();
      exports.mE = SHA256;
      var K = new Int32Array([
        1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748,
        2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206,
        2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122,
        1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891,
        3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700,
        1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
        3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877,
        958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452,
        2361852424, 2428436474, 2756734187, 3204031479, 3329325298,
      ]);
      function hashBlocks(w, v, p, pos, len) {
        for (; len >= 64; ) {
          for (
            var a = v[0],
              b = v[1],
              c = v[2],
              d = v[3],
              e = v[4],
              f = v[5],
              g = v[6],
              h = v[7],
              i = 0;
            i < 16;
            i++
          ) {
            var j = pos + 4 * i;
            w[i] = binary_1.readUint32BE(p, j);
          }
          for (i = 16; i < 64; i++) {
            var u = w[i - 2],
              t1 = ((u >>> 17) | (u << 15)) ^ ((u >>> 19) | (u << 13)) ^ (u >>> 10),
              t2 = (((u = w[i - 15]) >>> 7) | (u << 25)) ^ ((u >>> 18) | (u << 14)) ^ (u >>> 3);
            w[i] = ((t1 + w[i - 7]) | 0) + ((t2 + w[i - 16]) | 0);
          }
          for (i = 0; i < 64; i++) {
            (t1 =
              ((((((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7))) +
                ((e & f) ^ (~e & g))) |
                0) +
                ((h + ((K[i] + w[i]) | 0)) | 0)) |
              0),
              (t2 =
                ((((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10))) +
                  ((a & b) ^ (a & c) ^ (b & c))) |
                0);
            (h = g),
              (g = f),
              (f = e),
              (e = (d + t1) | 0),
              (d = c),
              (c = b),
              (b = a),
              (a = (t1 + t2) | 0);
          }
          (v[0] += a),
            (v[1] += b),
            (v[2] += c),
            (v[3] += d),
            (v[4] += e),
            (v[5] += f),
            (v[6] += g),
            (v[7] += h),
            (pos += 64),
            (len -= 64);
        }
        return pos;
      }
      exports.vp = function hash(data) {
        var h = new SHA256();
        h.update(data);
        var digest = h.digest();
        return h.clean(), digest;
      };
    },
    './node_modules/@stablelib/sha512/lib/sha512.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      var binary_1 = __webpack_require__('./node_modules/@stablelib/binary/lib/binary.js'),
        wipe_1 = __webpack_require__('./node_modules/@stablelib/wipe/lib/wipe.js');
      (exports.DIGEST_LENGTH = 64), (exports.BLOCK_SIZE = 128);
      var SHA512 = (function () {
        function SHA512() {
          (this.digestLength = exports.DIGEST_LENGTH),
            (this.blockSize = exports.BLOCK_SIZE),
            (this._stateHi = new Int32Array(8)),
            (this._stateLo = new Int32Array(8)),
            (this._tempHi = new Int32Array(16)),
            (this._tempLo = new Int32Array(16)),
            (this._buffer = new Uint8Array(256)),
            (this._bufferLength = 0),
            (this._bytesHashed = 0),
            (this._finished = !1),
            this.reset();
        }
        return (
          (SHA512.prototype._initState = function () {
            (this._stateHi[0] = 1779033703),
              (this._stateHi[1] = 3144134277),
              (this._stateHi[2] = 1013904242),
              (this._stateHi[3] = 2773480762),
              (this._stateHi[4] = 1359893119),
              (this._stateHi[5] = 2600822924),
              (this._stateHi[6] = 528734635),
              (this._stateHi[7] = 1541459225),
              (this._stateLo[0] = 4089235720),
              (this._stateLo[1] = 2227873595),
              (this._stateLo[2] = 4271175723),
              (this._stateLo[3] = 1595750129),
              (this._stateLo[4] = 2917565137),
              (this._stateLo[5] = 725511199),
              (this._stateLo[6] = 4215389547),
              (this._stateLo[7] = 327033209);
          }),
          (SHA512.prototype.reset = function () {
            return (
              this._initState(),
              (this._bufferLength = 0),
              (this._bytesHashed = 0),
              (this._finished = !1),
              this
            );
          }),
          (SHA512.prototype.clean = function () {
            wipe_1.wipe(this._buffer),
              wipe_1.wipe(this._tempHi),
              wipe_1.wipe(this._tempLo),
              this.reset();
          }),
          (SHA512.prototype.update = function (data, dataLength) {
            if ((void 0 === dataLength && (dataLength = data.length), this._finished))
              throw new Error("SHA512: can't update because hash was finished.");
            var dataPos = 0;
            if (((this._bytesHashed += dataLength), this._bufferLength > 0)) {
              for (; this._bufferLength < exports.BLOCK_SIZE && dataLength > 0; )
                (this._buffer[this._bufferLength++] = data[dataPos++]), dataLength--;
              this._bufferLength === this.blockSize &&
                (hashBlocks(
                  this._tempHi,
                  this._tempLo,
                  this._stateHi,
                  this._stateLo,
                  this._buffer,
                  0,
                  this.blockSize
                ),
                (this._bufferLength = 0));
            }
            for (
              dataLength >= this.blockSize &&
              ((dataPos = hashBlocks(
                this._tempHi,
                this._tempLo,
                this._stateHi,
                this._stateLo,
                data,
                dataPos,
                dataLength
              )),
              (dataLength %= this.blockSize));
              dataLength > 0;

            )
              (this._buffer[this._bufferLength++] = data[dataPos++]), dataLength--;
            return this;
          }),
          (SHA512.prototype.finish = function (out) {
            if (!this._finished) {
              var bytesHashed = this._bytesHashed,
                left = this._bufferLength,
                bitLenHi = (bytesHashed / 536870912) | 0,
                bitLenLo = bytesHashed << 3,
                padLength = bytesHashed % 128 < 112 ? 128 : 256;
              this._buffer[left] = 128;
              for (var i = left + 1; i < padLength - 8; i++) this._buffer[i] = 0;
              binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8),
                binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4),
                hashBlocks(
                  this._tempHi,
                  this._tempLo,
                  this._stateHi,
                  this._stateLo,
                  this._buffer,
                  0,
                  padLength
                ),
                (this._finished = !0);
            }
            for (i = 0; i < this.digestLength / 8; i++)
              binary_1.writeUint32BE(this._stateHi[i], out, 8 * i),
                binary_1.writeUint32BE(this._stateLo[i], out, 8 * i + 4);
            return this;
          }),
          (SHA512.prototype.digest = function () {
            var out = new Uint8Array(this.digestLength);
            return this.finish(out), out;
          }),
          (SHA512.prototype.saveState = function () {
            if (this._finished) throw new Error('SHA256: cannot save finished state');
            return {
              stateHi: new Int32Array(this._stateHi),
              stateLo: new Int32Array(this._stateLo),
              buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
              bufferLength: this._bufferLength,
              bytesHashed: this._bytesHashed,
            };
          }),
          (SHA512.prototype.restoreState = function (savedState) {
            return (
              this._stateHi.set(savedState.stateHi),
              this._stateLo.set(savedState.stateLo),
              (this._bufferLength = savedState.bufferLength),
              savedState.buffer && this._buffer.set(savedState.buffer),
              (this._bytesHashed = savedState.bytesHashed),
              (this._finished = !1),
              this
            );
          }),
          (SHA512.prototype.cleanSavedState = function (savedState) {
            wipe_1.wipe(savedState.stateHi),
              wipe_1.wipe(savedState.stateLo),
              savedState.buffer && wipe_1.wipe(savedState.buffer),
              (savedState.bufferLength = 0),
              (savedState.bytesHashed = 0);
          }),
          SHA512
        );
      })();
      exports.SHA512 = SHA512;
      var K = new Int32Array([
        1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573,
        2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579,
        2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278,
        1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113,
        2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774,
        944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122,
        1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339,
        2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891,
        1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205,
        1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
        1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037,
        344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657,
        3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909,
        1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556,
        3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
        1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815,
        1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344,
        2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614,
        3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992,
        116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
        685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676,
        1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316,
        1246189591,
      ]);
      function hashBlocks(wh, wl, hh, hl, m, pos, len) {
        for (
          var h,
            l,
            th,
            tl,
            a,
            b,
            c,
            d,
            ah0 = hh[0],
            ah1 = hh[1],
            ah2 = hh[2],
            ah3 = hh[3],
            ah4 = hh[4],
            ah5 = hh[5],
            ah6 = hh[6],
            ah7 = hh[7],
            al0 = hl[0],
            al1 = hl[1],
            al2 = hl[2],
            al3 = hl[3],
            al4 = hl[4],
            al5 = hl[5],
            al6 = hl[6],
            al7 = hl[7];
          len >= 128;

        ) {
          for (var i = 0; i < 16; i++) {
            var j = 8 * i + pos;
            (wh[i] = binary_1.readUint32BE(m, j)), (wl[i] = binary_1.readUint32BE(m, j + 4));
          }
          for (i = 0; i < 80; i++) {
            var bh7,
              bl7,
              bh0 = ah0,
              bh1 = ah1,
              bh2 = ah2,
              bh3 = ah3,
              bh4 = ah4,
              bh5 = ah5,
              bh6 = ah6,
              bl0 = al0,
              bl1 = al1,
              bl2 = al2,
              bl3 = al3,
              bl4 = al4,
              bl5 = al5,
              bl6 = al6;
            if (
              ((a = 65535 & (l = al7)),
              (b = l >>> 16),
              (c = 65535 & (h = ah7)),
              (d = h >>> 16),
              (a +=
                65535 &
                (l =
                  ((al4 >>> 14) | (ah4 << 18)) ^
                  ((al4 >>> 18) | (ah4 << 14)) ^
                  ((ah4 >>> 9) | (al4 << 23)))),
              (b += l >>> 16),
              (c +=
                65535 &
                (h =
                  ((ah4 >>> 14) | (al4 << 18)) ^
                  ((ah4 >>> 18) | (al4 << 14)) ^
                  ((al4 >>> 9) | (ah4 << 23)))),
              (d += h >>> 16),
              (a += 65535 & (l = (al4 & al5) ^ (~al4 & al6))),
              (b += l >>> 16),
              (c += 65535 & (h = (ah4 & ah5) ^ (~ah4 & ah6))),
              (d += h >>> 16),
              (h = K[2 * i]),
              (a += 65535 & (l = K[2 * i + 1])),
              (b += l >>> 16),
              (c += 65535 & h),
              (d += h >>> 16),
              (h = wh[i % 16]),
              (b += (l = wl[i % 16]) >>> 16),
              (c += 65535 & h),
              (d += h >>> 16),
              (c += (b += (a += 65535 & l) >>> 16) >>> 16),
              (a = 65535 & (l = tl = (65535 & a) | (b << 16))),
              (b = l >>> 16),
              (c = 65535 & (h = th = (65535 & c) | ((d += c >>> 16) << 16))),
              (d = h >>> 16),
              (a +=
                65535 &
                (l =
                  ((al0 >>> 28) | (ah0 << 4)) ^
                  ((ah0 >>> 2) | (al0 << 30)) ^
                  ((ah0 >>> 7) | (al0 << 25)))),
              (b += l >>> 16),
              (c +=
                65535 &
                (h =
                  ((ah0 >>> 28) | (al0 << 4)) ^
                  ((al0 >>> 2) | (ah0 << 30)) ^
                  ((al0 >>> 7) | (ah0 << 25)))),
              (d += h >>> 16),
              (b += (l = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2)) >>> 16),
              (c += 65535 & (h = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2))),
              (d += h >>> 16),
              (bh7 =
                (65535 & (c += (b += (a += 65535 & l) >>> 16) >>> 16)) | ((d += c >>> 16) << 16)),
              (bl7 = (65535 & a) | (b << 16)),
              (a = 65535 & (l = bl3)),
              (b = l >>> 16),
              (c = 65535 & (h = bh3)),
              (d = h >>> 16),
              (b += (l = tl) >>> 16),
              (c += 65535 & (h = th)),
              (d += h >>> 16),
              (ah1 = bh0),
              (ah2 = bh1),
              (ah3 = bh2),
              (ah4 = bh3 =
                (65535 & (c += (b += (a += 65535 & l) >>> 16) >>> 16)) | ((d += c >>> 16) << 16)),
              (ah5 = bh4),
              (ah6 = bh5),
              (ah7 = bh6),
              (ah0 = bh7),
              (al1 = bl0),
              (al2 = bl1),
              (al3 = bl2),
              (al4 = bl3 = (65535 & a) | (b << 16)),
              (al5 = bl4),
              (al6 = bl5),
              (al7 = bl6),
              (al0 = bl7),
              i % 16 == 15)
            )
              for (j = 0; j < 16; j++)
                (h = wh[j]),
                  (a = 65535 & (l = wl[j])),
                  (b = l >>> 16),
                  (c = 65535 & h),
                  (d = h >>> 16),
                  (h = wh[(j + 9) % 16]),
                  (a += 65535 & (l = wl[(j + 9) % 16])),
                  (b += l >>> 16),
                  (c += 65535 & h),
                  (d += h >>> 16),
                  (th = wh[(j + 1) % 16]),
                  (a +=
                    65535 &
                    (l =
                      (((tl = wl[(j + 1) % 16]) >>> 1) | (th << 31)) ^
                      ((tl >>> 8) | (th << 24)) ^
                      ((tl >>> 7) | (th << 25)))),
                  (b += l >>> 16),
                  (c +=
                    65535 &
                    (h = ((th >>> 1) | (tl << 31)) ^ ((th >>> 8) | (tl << 24)) ^ (th >>> 7))),
                  (d += h >>> 16),
                  (th = wh[(j + 14) % 16]),
                  (b +=
                    (l =
                      (((tl = wl[(j + 14) % 16]) >>> 19) | (th << 13)) ^
                      ((th >>> 29) | (tl << 3)) ^
                      ((tl >>> 6) | (th << 26))) >>> 16),
                  (c +=
                    65535 &
                    (h = ((th >>> 19) | (tl << 13)) ^ ((tl >>> 29) | (th << 3)) ^ (th >>> 6))),
                  (d += h >>> 16),
                  (d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16),
                  (wh[j] = (65535 & c) | (d << 16)),
                  (wl[j] = (65535 & a) | (b << 16));
          }
          (a = 65535 & (l = al0)),
            (b = l >>> 16),
            (c = 65535 & (h = ah0)),
            (d = h >>> 16),
            (h = hh[0]),
            (b += (l = hl[0]) >>> 16),
            (c += 65535 & h),
            (d += h >>> 16),
            (d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16),
            (hh[0] = ah0 = (65535 & c) | (d << 16)),
            (hl[0] = al0 = (65535 & a) | (b << 16)),
            (a = 65535 & (l = al1)),
            (b = l >>> 16),
            (c = 65535 & (h = ah1)),
            (d = h >>> 16),
            (h = hh[1]),
            (b += (l = hl[1]) >>> 16),
            (c += 65535 & h),
            (d += h >>> 16),
            (d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16),
            (hh[1] = ah1 = (65535 & c) | (d << 16)),
            (hl[1] = al1 = (65535 & a) | (b << 16)),
            (a = 65535 & (l = al2)),
            (b = l >>> 16),
            (c = 65535 & (h = ah2)),
            (d = h >>> 16),
            (h = hh[2]),
            (b += (l = hl[2]) >>> 16),
            (c += 65535 & h),
            (d += h >>> 16),
            (d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16),
            (hh[2] = ah2 = (65535 & c) | (d << 16)),
            (hl[2] = al2 = (65535 & a) | (b << 16)),
            (a = 65535 & (l = al3)),
            (b = l >>> 16),
            (c = 65535 & (h = ah3)),
            (d = h >>> 16),
            (h = hh[3]),
            (b += (l = hl[3]) >>> 16),
            (c += 65535 & h),
            (d += h >>> 16),
            (d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16),
            (hh[3] = ah3 = (65535 & c) | (d << 16)),
            (hl[3] = al3 = (65535 & a) | (b << 16)),
            (a = 65535 & (l = al4)),
            (b = l >>> 16),
            (c = 65535 & (h = ah4)),
            (d = h >>> 16),
            (h = hh[4]),
            (b += (l = hl[4]) >>> 16),
            (c += 65535 & h),
            (d += h >>> 16),
            (d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16),
            (hh[4] = ah4 = (65535 & c) | (d << 16)),
            (hl[4] = al4 = (65535 & a) | (b << 16)),
            (a = 65535 & (l = al5)),
            (b = l >>> 16),
            (c = 65535 & (h = ah5)),
            (d = h >>> 16),
            (h = hh[5]),
            (b += (l = hl[5]) >>> 16),
            (c += 65535 & h),
            (d += h >>> 16),
            (d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16),
            (hh[5] = ah5 = (65535 & c) | (d << 16)),
            (hl[5] = al5 = (65535 & a) | (b << 16)),
            (a = 65535 & (l = al6)),
            (b = l >>> 16),
            (c = 65535 & (h = ah6)),
            (d = h >>> 16),
            (h = hh[6]),
            (b += (l = hl[6]) >>> 16),
            (c += 65535 & h),
            (d += h >>> 16),
            (d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16),
            (hh[6] = ah6 = (65535 & c) | (d << 16)),
            (hl[6] = al6 = (65535 & a) | (b << 16)),
            (a = 65535 & (l = al7)),
            (b = l >>> 16),
            (c = 65535 & (h = ah7)),
            (d = h >>> 16),
            (h = hh[7]),
            (b += (l = hl[7]) >>> 16),
            (c += 65535 & h),
            (d += h >>> 16),
            (d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16),
            (hh[7] = ah7 = (65535 & c) | (d << 16)),
            (hl[7] = al7 = (65535 & a) | (b << 16)),
            (pos += 128),
            (len -= 128);
        }
        return pos;
      }
      exports.hash = function hash(data) {
        var h = new SHA512();
        h.update(data);
        var digest = h.digest();
        return h.clean(), digest;
      };
    },
    './node_modules/@stablelib/wipe/lib/wipe.js': (__unused_webpack_module, exports) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.wipe = function wipe(array) {
          for (var i = 0; i < array.length; i++) array[i] = 0;
          return array;
        });
    },
    './node_modules/@stablelib/x25519/lib/x25519.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      exports.gi = exports.Au = exports.KS = exports.kz = void 0;
      const random_1 = __webpack_require__('./node_modules/@stablelib/random/lib/random.js'),
        wipe_1 = __webpack_require__('./node_modules/@stablelib/wipe/lib/wipe.js');
      function gf(init) {
        const r = new Float64Array(16);
        if (init) for (let i = 0; i < init.length; i++) r[i] = init[i];
        return r;
      }
      (exports.kz = 32), (exports.KS = 32);
      const _9 = new Uint8Array(32);
      _9[0] = 9;
      const _121665 = gf([56129, 1]);
      function car25519(o) {
        let c = 1;
        for (let i = 0; i < 16; i++) {
          let v = o[i] + c + 65535;
          (c = Math.floor(v / 65536)), (o[i] = v - 65536 * c);
        }
        o[0] += c - 1 + 37 * (c - 1);
      }
      function sel25519(p, q, b) {
        const c = ~(b - 1);
        for (let i = 0; i < 16; i++) {
          const t = c & (p[i] ^ q[i]);
          (p[i] ^= t), (q[i] ^= t);
        }
      }
      function add(o, a, b) {
        for (let i = 0; i < 16; i++) o[i] = a[i] + b[i];
      }
      function sub(o, a, b) {
        for (let i = 0; i < 16; i++) o[i] = a[i] - b[i];
      }
      function mul(o, a, b) {
        let v,
          c,
          t0 = 0,
          t1 = 0,
          t2 = 0,
          t3 = 0,
          t4 = 0,
          t5 = 0,
          t6 = 0,
          t7 = 0,
          t8 = 0,
          t9 = 0,
          t10 = 0,
          t11 = 0,
          t12 = 0,
          t13 = 0,
          t14 = 0,
          t15 = 0,
          t16 = 0,
          t17 = 0,
          t18 = 0,
          t19 = 0,
          t20 = 0,
          t21 = 0,
          t22 = 0,
          t23 = 0,
          t24 = 0,
          t25 = 0,
          t26 = 0,
          t27 = 0,
          t28 = 0,
          t29 = 0,
          t30 = 0,
          b0 = b[0],
          b1 = b[1],
          b2 = b[2],
          b3 = b[3],
          b4 = b[4],
          b5 = b[5],
          b6 = b[6],
          b7 = b[7],
          b8 = b[8],
          b9 = b[9],
          b10 = b[10],
          b11 = b[11],
          b12 = b[12],
          b13 = b[13],
          b14 = b[14],
          b15 = b[15];
        (v = a[0]),
          (t0 += v * b0),
          (t1 += v * b1),
          (t2 += v * b2),
          (t3 += v * b3),
          (t4 += v * b4),
          (t5 += v * b5),
          (t6 += v * b6),
          (t7 += v * b7),
          (t8 += v * b8),
          (t9 += v * b9),
          (t10 += v * b10),
          (t11 += v * b11),
          (t12 += v * b12),
          (t13 += v * b13),
          (t14 += v * b14),
          (t15 += v * b15),
          (v = a[1]),
          (t1 += v * b0),
          (t2 += v * b1),
          (t3 += v * b2),
          (t4 += v * b3),
          (t5 += v * b4),
          (t6 += v * b5),
          (t7 += v * b6),
          (t8 += v * b7),
          (t9 += v * b8),
          (t10 += v * b9),
          (t11 += v * b10),
          (t12 += v * b11),
          (t13 += v * b12),
          (t14 += v * b13),
          (t15 += v * b14),
          (t16 += v * b15),
          (v = a[2]),
          (t2 += v * b0),
          (t3 += v * b1),
          (t4 += v * b2),
          (t5 += v * b3),
          (t6 += v * b4),
          (t7 += v * b5),
          (t8 += v * b6),
          (t9 += v * b7),
          (t10 += v * b8),
          (t11 += v * b9),
          (t12 += v * b10),
          (t13 += v * b11),
          (t14 += v * b12),
          (t15 += v * b13),
          (t16 += v * b14),
          (t17 += v * b15),
          (v = a[3]),
          (t3 += v * b0),
          (t4 += v * b1),
          (t5 += v * b2),
          (t6 += v * b3),
          (t7 += v * b4),
          (t8 += v * b5),
          (t9 += v * b6),
          (t10 += v * b7),
          (t11 += v * b8),
          (t12 += v * b9),
          (t13 += v * b10),
          (t14 += v * b11),
          (t15 += v * b12),
          (t16 += v * b13),
          (t17 += v * b14),
          (t18 += v * b15),
          (v = a[4]),
          (t4 += v * b0),
          (t5 += v * b1),
          (t6 += v * b2),
          (t7 += v * b3),
          (t8 += v * b4),
          (t9 += v * b5),
          (t10 += v * b6),
          (t11 += v * b7),
          (t12 += v * b8),
          (t13 += v * b9),
          (t14 += v * b10),
          (t15 += v * b11),
          (t16 += v * b12),
          (t17 += v * b13),
          (t18 += v * b14),
          (t19 += v * b15),
          (v = a[5]),
          (t5 += v * b0),
          (t6 += v * b1),
          (t7 += v * b2),
          (t8 += v * b3),
          (t9 += v * b4),
          (t10 += v * b5),
          (t11 += v * b6),
          (t12 += v * b7),
          (t13 += v * b8),
          (t14 += v * b9),
          (t15 += v * b10),
          (t16 += v * b11),
          (t17 += v * b12),
          (t18 += v * b13),
          (t19 += v * b14),
          (t20 += v * b15),
          (v = a[6]),
          (t6 += v * b0),
          (t7 += v * b1),
          (t8 += v * b2),
          (t9 += v * b3),
          (t10 += v * b4),
          (t11 += v * b5),
          (t12 += v * b6),
          (t13 += v * b7),
          (t14 += v * b8),
          (t15 += v * b9),
          (t16 += v * b10),
          (t17 += v * b11),
          (t18 += v * b12),
          (t19 += v * b13),
          (t20 += v * b14),
          (t21 += v * b15),
          (v = a[7]),
          (t7 += v * b0),
          (t8 += v * b1),
          (t9 += v * b2),
          (t10 += v * b3),
          (t11 += v * b4),
          (t12 += v * b5),
          (t13 += v * b6),
          (t14 += v * b7),
          (t15 += v * b8),
          (t16 += v * b9),
          (t17 += v * b10),
          (t18 += v * b11),
          (t19 += v * b12),
          (t20 += v * b13),
          (t21 += v * b14),
          (t22 += v * b15),
          (v = a[8]),
          (t8 += v * b0),
          (t9 += v * b1),
          (t10 += v * b2),
          (t11 += v * b3),
          (t12 += v * b4),
          (t13 += v * b5),
          (t14 += v * b6),
          (t15 += v * b7),
          (t16 += v * b8),
          (t17 += v * b9),
          (t18 += v * b10),
          (t19 += v * b11),
          (t20 += v * b12),
          (t21 += v * b13),
          (t22 += v * b14),
          (t23 += v * b15),
          (v = a[9]),
          (t9 += v * b0),
          (t10 += v * b1),
          (t11 += v * b2),
          (t12 += v * b3),
          (t13 += v * b4),
          (t14 += v * b5),
          (t15 += v * b6),
          (t16 += v * b7),
          (t17 += v * b8),
          (t18 += v * b9),
          (t19 += v * b10),
          (t20 += v * b11),
          (t21 += v * b12),
          (t22 += v * b13),
          (t23 += v * b14),
          (t24 += v * b15),
          (v = a[10]),
          (t10 += v * b0),
          (t11 += v * b1),
          (t12 += v * b2),
          (t13 += v * b3),
          (t14 += v * b4),
          (t15 += v * b5),
          (t16 += v * b6),
          (t17 += v * b7),
          (t18 += v * b8),
          (t19 += v * b9),
          (t20 += v * b10),
          (t21 += v * b11),
          (t22 += v * b12),
          (t23 += v * b13),
          (t24 += v * b14),
          (t25 += v * b15),
          (v = a[11]),
          (t11 += v * b0),
          (t12 += v * b1),
          (t13 += v * b2),
          (t14 += v * b3),
          (t15 += v * b4),
          (t16 += v * b5),
          (t17 += v * b6),
          (t18 += v * b7),
          (t19 += v * b8),
          (t20 += v * b9),
          (t21 += v * b10),
          (t22 += v * b11),
          (t23 += v * b12),
          (t24 += v * b13),
          (t25 += v * b14),
          (t26 += v * b15),
          (v = a[12]),
          (t12 += v * b0),
          (t13 += v * b1),
          (t14 += v * b2),
          (t15 += v * b3),
          (t16 += v * b4),
          (t17 += v * b5),
          (t18 += v * b6),
          (t19 += v * b7),
          (t20 += v * b8),
          (t21 += v * b9),
          (t22 += v * b10),
          (t23 += v * b11),
          (t24 += v * b12),
          (t25 += v * b13),
          (t26 += v * b14),
          (t27 += v * b15),
          (v = a[13]),
          (t13 += v * b0),
          (t14 += v * b1),
          (t15 += v * b2),
          (t16 += v * b3),
          (t17 += v * b4),
          (t18 += v * b5),
          (t19 += v * b6),
          (t20 += v * b7),
          (t21 += v * b8),
          (t22 += v * b9),
          (t23 += v * b10),
          (t24 += v * b11),
          (t25 += v * b12),
          (t26 += v * b13),
          (t27 += v * b14),
          (t28 += v * b15),
          (v = a[14]),
          (t14 += v * b0),
          (t15 += v * b1),
          (t16 += v * b2),
          (t17 += v * b3),
          (t18 += v * b4),
          (t19 += v * b5),
          (t20 += v * b6),
          (t21 += v * b7),
          (t22 += v * b8),
          (t23 += v * b9),
          (t24 += v * b10),
          (t25 += v * b11),
          (t26 += v * b12),
          (t27 += v * b13),
          (t28 += v * b14),
          (t29 += v * b15),
          (v = a[15]),
          (t15 += v * b0),
          (t16 += v * b1),
          (t17 += v * b2),
          (t18 += v * b3),
          (t19 += v * b4),
          (t20 += v * b5),
          (t21 += v * b6),
          (t22 += v * b7),
          (t23 += v * b8),
          (t24 += v * b9),
          (t25 += v * b10),
          (t26 += v * b11),
          (t27 += v * b12),
          (t28 += v * b13),
          (t29 += v * b14),
          (t30 += v * b15),
          (t0 += 38 * t16),
          (t1 += 38 * t17),
          (t2 += 38 * t18),
          (t3 += 38 * t19),
          (t4 += 38 * t20),
          (t5 += 38 * t21),
          (t6 += 38 * t22),
          (t7 += 38 * t23),
          (t8 += 38 * t24),
          (t9 += 38 * t25),
          (t10 += 38 * t26),
          (t11 += 38 * t27),
          (t12 += 38 * t28),
          (t13 += 38 * t29),
          (t14 += 38 * t30),
          (c = 1),
          (v = t0 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t0 = v - 65536 * c),
          (v = t1 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t1 = v - 65536 * c),
          (v = t2 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t2 = v - 65536 * c),
          (v = t3 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t3 = v - 65536 * c),
          (v = t4 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t4 = v - 65536 * c),
          (v = t5 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t5 = v - 65536 * c),
          (v = t6 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t6 = v - 65536 * c),
          (v = t7 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t7 = v - 65536 * c),
          (v = t8 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t8 = v - 65536 * c),
          (v = t9 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t9 = v - 65536 * c),
          (v = t10 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t10 = v - 65536 * c),
          (v = t11 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t11 = v - 65536 * c),
          (v = t12 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t12 = v - 65536 * c),
          (v = t13 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t13 = v - 65536 * c),
          (v = t14 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t14 = v - 65536 * c),
          (v = t15 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t15 = v - 65536 * c),
          (t0 += c - 1 + 37 * (c - 1)),
          (c = 1),
          (v = t0 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t0 = v - 65536 * c),
          (v = t1 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t1 = v - 65536 * c),
          (v = t2 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t2 = v - 65536 * c),
          (v = t3 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t3 = v - 65536 * c),
          (v = t4 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t4 = v - 65536 * c),
          (v = t5 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t5 = v - 65536 * c),
          (v = t6 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t6 = v - 65536 * c),
          (v = t7 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t7 = v - 65536 * c),
          (v = t8 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t8 = v - 65536 * c),
          (v = t9 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t9 = v - 65536 * c),
          (v = t10 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t10 = v - 65536 * c),
          (v = t11 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t11 = v - 65536 * c),
          (v = t12 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t12 = v - 65536 * c),
          (v = t13 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t13 = v - 65536 * c),
          (v = t14 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t14 = v - 65536 * c),
          (v = t15 + c + 65535),
          (c = Math.floor(v / 65536)),
          (t15 = v - 65536 * c),
          (t0 += c - 1 + 37 * (c - 1)),
          (o[0] = t0),
          (o[1] = t1),
          (o[2] = t2),
          (o[3] = t3),
          (o[4] = t4),
          (o[5] = t5),
          (o[6] = t6),
          (o[7] = t7),
          (o[8] = t8),
          (o[9] = t9),
          (o[10] = t10),
          (o[11] = t11),
          (o[12] = t12),
          (o[13] = t13),
          (o[14] = t14),
          (o[15] = t15);
      }
      function square(o, a) {
        mul(o, a, a);
      }
      function scalarMult(n, p) {
        const z = new Uint8Array(32),
          x = new Float64Array(80),
          a = gf(),
          b = gf(),
          c = gf(),
          d = gf(),
          e = gf(),
          f = gf();
        for (let i = 0; i < 31; i++) z[i] = n[i];
        (z[31] = (127 & n[31]) | 64),
          (z[0] &= 248),
          (function unpack25519(o, n) {
            for (let i = 0; i < 16; i++) o[i] = n[2 * i] + (n[2 * i + 1] << 8);
            o[15] &= 32767;
          })(x, p);
        for (let i = 0; i < 16; i++) b[i] = x[i];
        a[0] = d[0] = 1;
        for (let i = 254; i >= 0; --i) {
          const r = (z[i >>> 3] >>> (7 & i)) & 1;
          sel25519(a, b, r),
            sel25519(c, d, r),
            add(e, a, c),
            sub(a, a, c),
            add(c, b, d),
            sub(b, b, d),
            square(d, e),
            square(f, a),
            mul(a, c, a),
            mul(c, b, e),
            add(e, a, c),
            sub(a, a, c),
            square(b, a),
            sub(c, d, f),
            mul(a, c, _121665),
            add(a, a, d),
            mul(c, c, a),
            mul(a, d, f),
            mul(d, b, x),
            square(b, e),
            sel25519(a, b, r),
            sel25519(c, d, r);
        }
        for (let i = 0; i < 16; i++)
          (x[i + 16] = a[i]), (x[i + 32] = c[i]), (x[i + 48] = b[i]), (x[i + 64] = d[i]);
        const x32 = x.subarray(32),
          x16 = x.subarray(16);
        !(function inv25519(o, inp) {
          const c = gf();
          for (let i = 0; i < 16; i++) c[i] = inp[i];
          for (let i = 253; i >= 0; i--) square(c, c), 2 !== i && 4 !== i && mul(c, c, inp);
          for (let i = 0; i < 16; i++) o[i] = c[i];
        })(x32, x32),
          mul(x16, x16, x32);
        const q = new Uint8Array(32);
        return (
          (function pack25519(o, n) {
            const m = gf(),
              t = gf();
            for (let i = 0; i < 16; i++) t[i] = n[i];
            car25519(t), car25519(t), car25519(t);
            for (let j = 0; j < 2; j++) {
              m[0] = t[0] - 65517;
              for (let i = 1; i < 15; i++)
                (m[i] = t[i] - 65535 - ((m[i - 1] >> 16) & 1)), (m[i - 1] &= 65535);
              m[15] = t[15] - 32767 - ((m[14] >> 16) & 1);
              const b = (m[15] >> 16) & 1;
              (m[14] &= 65535), sel25519(t, m, 1 - b);
            }
            for (let i = 0; i < 16; i++) (o[2 * i] = 255 & t[i]), (o[2 * i + 1] = t[i] >> 8);
          })(q, x16),
          q
        );
      }
      function scalarMultBase(n) {
        return scalarMult(n, _9);
      }
      function generateKeyPairFromSeed(seed) {
        if (seed.length !== exports.KS) throw new Error(`x25519: seed must be ${exports.KS} bytes`);
        const secretKey = new Uint8Array(seed);
        return { publicKey: scalarMultBase(secretKey), secretKey };
      }
      (exports.Au = function generateKeyPair(prng) {
        const seed = (0, random_1.randomBytes)(32, prng),
          result = generateKeyPairFromSeed(seed);
        return (0, wipe_1.wipe)(seed), result;
      }),
        (exports.gi = function sharedKey(mySecretKey, theirPublicKey, rejectZero = !1) {
          if (mySecretKey.length !== exports.kz)
            throw new Error('X25519: incorrect secret key length');
          if (theirPublicKey.length !== exports.kz)
            throw new Error('X25519: incorrect public key length');
          const result = scalarMult(mySecretKey, theirPublicKey);
          if (rejectZero) {
            let zeros = 0;
            for (let i = 0; i < result.length; i++) zeros |= result[i];
            if (0 === zeros) throw new Error('X25519: invalid shared key');
          }
          return result;
        });
    },
    './node_modules/@walletconnect/events/dist/esm/events.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__.d(__webpack_exports__, { q: () => IEvents });
      class IEvents {}
    },
    './node_modules/@walletconnect/events/dist/esm/index.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          IEvents: () => _events__WEBPACK_IMPORTED_MODULE_0__.q,
        });
      var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/@walletconnect/events/dist/esm/events.js'
      );
    },
    './node_modules/@walletconnect/heartbeat/dist/cjs/constants/heartbeat.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.HEARTBEAT_EVENTS = exports.HEARTBEAT_INTERVAL = void 0);
      const time_1 = __webpack_require__('./node_modules/@walletconnect/time/dist/cjs/index.js');
      (exports.HEARTBEAT_INTERVAL = time_1.FIVE_SECONDS),
        (exports.HEARTBEAT_EVENTS = { pulse: 'heartbeat_pulse' });
    },
    './node_modules/@walletconnect/heartbeat/dist/cjs/constants/index.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      __webpack_require__('./node_modules/tslib/tslib.es6.js').__exportStar(
        __webpack_require__(
          './node_modules/@walletconnect/heartbeat/dist/cjs/constants/heartbeat.js'
        ),
        exports
      );
    },
    './node_modules/@walletconnect/heartbeat/dist/cjs/heartbeat.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.HeartBeat = void 0);
      const tslib_1 = __webpack_require__('./node_modules/tslib/tslib.es6.js'),
        events_1 = __webpack_require__('./node_modules/events/events.js'),
        time_1 = __webpack_require__('./node_modules/@walletconnect/time/dist/cjs/index.js'),
        types_1 = __webpack_require__(
          './node_modules/@walletconnect/heartbeat/dist/cjs/types/index.js'
        ),
        constants_1 = __webpack_require__(
          './node_modules/@walletconnect/heartbeat/dist/cjs/constants/index.js'
        );
      class HeartBeat extends types_1.IHeartBeat {
        constructor(opts) {
          super(opts),
            (this.events = new events_1.EventEmitter()),
            (this.interval = constants_1.HEARTBEAT_INTERVAL),
            (this.interval =
              (null == opts ? void 0 : opts.interval) || constants_1.HEARTBEAT_INTERVAL);
        }
        static init(opts) {
          return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const heartbeat = new HeartBeat(opts);
            return yield heartbeat.init(), heartbeat;
          });
        }
        init() {
          return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
          });
        }
        stop() {
          clearInterval(this.intervalRef);
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
        initialize() {
          return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.intervalRef = setInterval(() => this.pulse(), time_1.toMiliseconds(this.interval));
          });
        }
        pulse() {
          this.events.emit(constants_1.HEARTBEAT_EVENTS.pulse);
        }
      }
      exports.HeartBeat = HeartBeat;
    },
    './node_modules/@walletconnect/heartbeat/dist/cjs/index.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      const tslib_1 = __webpack_require__('./node_modules/tslib/tslib.es6.js');
      tslib_1.__exportStar(
        __webpack_require__('./node_modules/@walletconnect/heartbeat/dist/cjs/heartbeat.js'),
        exports
      ),
        tslib_1.__exportStar(
          __webpack_require__('./node_modules/@walletconnect/heartbeat/dist/cjs/types/index.js'),
          exports
        ),
        tslib_1.__exportStar(
          __webpack_require__(
            './node_modules/@walletconnect/heartbeat/dist/cjs/constants/index.js'
          ),
          exports
        );
    },
    './node_modules/@walletconnect/heartbeat/dist/cjs/types/heartbeat.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.IHeartBeat = void 0);
      const events_1 = __webpack_require__(
        './node_modules/@walletconnect/events/dist/esm/index.js'
      );
      class IHeartBeat extends events_1.IEvents {
        constructor(opts) {
          super();
        }
      }
      exports.IHeartBeat = IHeartBeat;
    },
    './node_modules/@walletconnect/heartbeat/dist/cjs/types/index.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      __webpack_require__('./node_modules/tslib/tslib.es6.js').__exportStar(
        __webpack_require__('./node_modules/@walletconnect/heartbeat/dist/cjs/types/heartbeat.js'),
        exports
      );
    },
    './node_modules/@walletconnect/keyvaluestorage/dist/cjs/browser/index.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      const tslib_1 = __webpack_require__('./node_modules/tslib/tslib.es6.js'),
        safe_json_utils_1 = __webpack_require__('./node_modules/safe-json-utils/dist/cjs/index.js'),
        localStorage_1 = tslib_1.__importDefault(
          __webpack_require__(
            './node_modules/@walletconnect/keyvaluestorage/dist/cjs/browser/lib/localStorage.js'
          )
        ),
        shared_1 = __webpack_require__(
          './node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/index.js'
        );
      class KeyValueStorage {
        constructor() {
          this.localStorage = localStorage_1.default;
        }
        getKeys() {
          return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Object.keys(this.localStorage);
          });
        }
        getEntries() {
          return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Object.entries(this.localStorage).map(shared_1.parseEntry);
          });
        }
        getItem(key) {
          return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const item = this.localStorage.getItem(key);
            if (null !== item) return safe_json_utils_1.safeJsonParse(item);
          });
        }
        setItem(key, value) {
          return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.localStorage.setItem(key, safe_json_utils_1.safeJsonStringify(value));
          });
        }
        removeItem(key) {
          return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.localStorage.removeItem(key);
          });
        }
      }
      exports.ZP = KeyValueStorage;
    },
    './node_modules/@walletconnect/keyvaluestorage/dist/cjs/browser/lib/localStorage.js': (
      module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      'use strict';
      !(function () {
        let db;
        function LocalStorage() {}
        (db = LocalStorage),
          (db.prototype.getItem = function (key) {
            return this.hasOwnProperty(key) ? String(this[key]) : null;
          }),
          (db.prototype.setItem = function (key, val) {
            this[key] = String(val);
          }),
          (db.prototype.removeItem = function (key) {
            delete this[key];
          }),
          (db.prototype.clear = function () {
            const self = this;
            Object.keys(self).forEach(function (key) {
              (self[key] = void 0), delete self[key];
            });
          }),
          (db.prototype.key = function (i) {
            return (i = i || 0), Object.keys(this)[i];
          }),
          db.prototype.__defineGetter__('length', function () {
            return Object.keys(this).length;
          }),
          void 0 !== __webpack_require__.g && __webpack_require__.g.localStorage
            ? (module.exports = __webpack_require__.g.localStorage)
            : 'undefined' != typeof window && window.localStorage
            ? (module.exports = window.localStorage)
            : (module.exports = new LocalStorage());
      })();
    },
    './node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/index.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      const tslib_1 = __webpack_require__('./node_modules/tslib/tslib.es6.js');
      tslib_1.__exportStar(
        __webpack_require__(
          './node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/types.js'
        ),
        exports
      ),
        tslib_1.__exportStar(
          __webpack_require__(
            './node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/utils.js'
          ),
          exports
        );
    },
    './node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/types.js': (
      __unused_webpack_module,
      exports
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.IKeyValueStorage = void 0);
      exports.IKeyValueStorage = class IKeyValueStorage {};
    },
    './node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/utils.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.parseEntry = void 0);
      const safe_json_utils_1 = __webpack_require__(
        './node_modules/safe-json-utils/dist/cjs/index.js'
      );
      exports.parseEntry = function parseEntry(entry) {
        var _a;
        return [
          entry[0],
          safe_json_utils_1.safeJsonParse(null !== (_a = entry[1]) && void 0 !== _a ? _a : ''),
        ];
      };
    },
    './node_modules/@walletconnect/logger/dist/cjs/constants.js': (
      __unused_webpack_module,
      exports
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.PINO_CUSTOM_CONTEXT_KEY = exports.PINO_LOGGER_DEFAULTS = void 0),
        (exports.PINO_LOGGER_DEFAULTS = { level: 'info' }),
        (exports.PINO_CUSTOM_CONTEXT_KEY = 'custom_context');
    },
    './node_modules/@walletconnect/logger/dist/cjs/index.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.pino = void 0);
      const tslib_1 = __webpack_require__('./node_modules/tslib/tslib.es6.js'),
        pino_1 = tslib_1.__importDefault(__webpack_require__('./node_modules/pino/browser.js'));
      Object.defineProperty(exports, 'pino', {
        enumerable: !0,
        get: function () {
          return pino_1.default;
        },
      }),
        tslib_1.__exportStar(
          __webpack_require__('./node_modules/@walletconnect/logger/dist/cjs/constants.js'),
          exports
        ),
        tslib_1.__exportStar(
          __webpack_require__('./node_modules/@walletconnect/logger/dist/cjs/utils.js'),
          exports
        );
    },
    './node_modules/@walletconnect/logger/dist/cjs/utils.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.generateChildLogger =
          exports.formatChildLoggerContext =
          exports.getLoggerContext =
          exports.setBrowserLoggerContext =
          exports.getBrowserLoggerContext =
          exports.getDefaultLoggerOptions =
            void 0);
      const constants_1 = __webpack_require__(
        './node_modules/@walletconnect/logger/dist/cjs/constants.js'
      );
      function getBrowserLoggerContext(
        logger,
        customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY
      ) {
        return logger[customContextKey] || '';
      }
      function setBrowserLoggerContext(
        logger,
        context,
        customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY
      ) {
        return (logger[customContextKey] = context), logger;
      }
      function getLoggerContext(logger, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
        let context = '';
        return (
          (context =
            void 0 === logger.bindings
              ? getBrowserLoggerContext(logger, customContextKey)
              : logger.bindings().context || ''),
          context
        );
      }
      function formatChildLoggerContext(
        logger,
        childContext,
        customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY
      ) {
        const parentContext = getLoggerContext(logger, customContextKey);
        return parentContext.trim() ? `${parentContext}/${childContext}` : childContext;
      }
      (exports.getDefaultLoggerOptions = function getDefaultLoggerOptions(opts) {
        return Object.assign(Object.assign({}, opts), {
          level: (null == opts ? void 0 : opts.level) || constants_1.PINO_LOGGER_DEFAULTS.level,
        });
      }),
        (exports.getBrowserLoggerContext = getBrowserLoggerContext),
        (exports.setBrowserLoggerContext = setBrowserLoggerContext),
        (exports.getLoggerContext = getLoggerContext),
        (exports.formatChildLoggerContext = formatChildLoggerContext),
        (exports.generateChildLogger = function generateChildLogger(
          logger,
          childContext,
          customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY
        ) {
          const context = formatChildLoggerContext(logger, childContext, customContextKey);
          return setBrowserLoggerContext(logger.child({ context }), context, customContextKey);
        });
    },
    './node_modules/@walletconnect/relay-api/dist/esm/types.js': () => {},
    './node_modules/@walletconnect/relay-auth/dist/esm/types.js': () => {},
    './node_modules/@walletconnect/sign-client/node_modules/@walletconnect/window-metadata/dist/cjs/index.js':
      (__unused_webpack_module, exports, __webpack_require__) => {
        'use strict';
        exports.D = void 0;
        const window_getters_1 = __webpack_require__(
          './node_modules/@walletconnect/window-getters/dist/cjs/index.js'
        );
        exports.D = function getWindowMetadata() {
          let doc, loc;
          try {
            (doc = window_getters_1.getDocumentOrThrow()),
              (loc = window_getters_1.getLocationOrThrow());
          } catch (e) {
            return null;
          }
          function getWindowMetadataOfAny(...args) {
            const metaTags = doc.getElementsByTagName('meta');
            for (let i = 0; i < metaTags.length; i++) {
              const tag = metaTags[i],
                attributes = ['itemprop', 'property', 'name']
                  .map((target) => tag.getAttribute(target))
                  .filter((attr) => !!attr && args.includes(attr));
              if (attributes.length && attributes) {
                const content = tag.getAttribute('content');
                if (content) return content;
              }
            }
            return '';
          }
          const name = (function getName() {
            let name = getWindowMetadataOfAny('name', 'og:site_name', 'og:title', 'twitter:title');
            return name || (name = doc.title), name;
          })();
          return {
            description: (function getDescription() {
              return getWindowMetadataOfAny(
                'description',
                'og:description',
                'twitter:description',
                'keywords'
              );
            })(),
            url: loc.origin,
            icons: (function getIcons() {
              const links = doc.getElementsByTagName('link'),
                icons = [];
              for (let i = 0; i < links.length; i++) {
                const link = links[i],
                  rel = link.getAttribute('rel');
                if (rel && rel.toLowerCase().indexOf('icon') > -1) {
                  const href = link.getAttribute('href');
                  if (href)
                    if (
                      -1 === href.toLowerCase().indexOf('https:') &&
                      -1 === href.toLowerCase().indexOf('http:') &&
                      0 !== href.indexOf('//')
                    ) {
                      let absoluteHref = loc.protocol + '//' + loc.host;
                      if (0 === href.indexOf('/')) absoluteHref += href;
                      else {
                        const path = loc.pathname.split('/');
                        path.pop();
                        absoluteHref += path.join('/') + '/' + href;
                      }
                      icons.push(absoluteHref);
                    } else if (0 === href.indexOf('//')) {
                      const absoluteUrl = loc.protocol + href;
                      icons.push(absoluteUrl);
                    } else icons.push(href);
                }
              }
              return icons;
            })(),
            name,
          };
        };
      },
    './node_modules/@walletconnect/sign-client/node_modules/query-string/index.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      const strictUriEncode = __webpack_require__('./node_modules/strict-uri-encode/index.js'),
        decodeComponent = __webpack_require__('./node_modules/decode-uri-component/index.js'),
        splitOnFirst = __webpack_require__('./node_modules/split-on-first/index.js'),
        filterObject = __webpack_require__('./node_modules/filter-obj/index.js'),
        encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');
      function validateArrayFormatSeparator(value) {
        if ('string' != typeof value || 1 !== value.length)
          throw new TypeError('arrayFormatSeparator must be single character string');
      }
      function encode(value, options) {
        return options.encode
          ? options.strict
            ? strictUriEncode(value)
            : encodeURIComponent(value)
          : value;
      }
      function decode(value, options) {
        return options.decode ? decodeComponent(value) : value;
      }
      function keysSorter(input) {
        return Array.isArray(input)
          ? input.sort()
          : 'object' == typeof input
          ? keysSorter(Object.keys(input))
              .sort((a, b) => Number(a) - Number(b))
              .map((key) => input[key])
          : input;
      }
      function removeHash(input) {
        const hashStart = input.indexOf('#');
        return -1 !== hashStart && (input = input.slice(0, hashStart)), input;
      }
      function extract(input) {
        const queryStart = (input = removeHash(input)).indexOf('?');
        return -1 === queryStart ? '' : input.slice(queryStart + 1);
      }
      function parseValue(value, options) {
        return (
          options.parseNumbers &&
          !Number.isNaN(Number(value)) &&
          'string' == typeof value &&
          '' !== value.trim()
            ? (value = Number(value))
            : !options.parseBooleans ||
              null === value ||
              ('true' !== value.toLowerCase() && 'false' !== value.toLowerCase()) ||
              (value = 'true' === value.toLowerCase()),
          value
        );
      }
      function parse(query, options) {
        validateArrayFormatSeparator(
          (options = Object.assign(
            {
              decode: !0,
              sort: !0,
              arrayFormat: 'none',
              arrayFormatSeparator: ',',
              parseNumbers: !1,
              parseBooleans: !1,
            },
            options
          )).arrayFormatSeparator
        );
        const formatter = (function parserForArrayFormat(options) {
            let result;
            switch (options.arrayFormat) {
              case 'index':
                return (key, value, accumulator) => {
                  (result = /\[(\d*)\]$/.exec(key)),
                    (key = key.replace(/\[\d*\]$/, '')),
                    result
                      ? (void 0 === accumulator[key] && (accumulator[key] = {}),
                        (accumulator[key][result[1]] = value))
                      : (accumulator[key] = value);
                };
              case 'bracket':
                return (key, value, accumulator) => {
                  (result = /(\[\])$/.exec(key)),
                    (key = key.replace(/\[\]$/, '')),
                    result
                      ? void 0 !== accumulator[key]
                        ? (accumulator[key] = [].concat(accumulator[key], value))
                        : (accumulator[key] = [value])
                      : (accumulator[key] = value);
                };
              case 'colon-list-separator':
                return (key, value, accumulator) => {
                  (result = /(:list)$/.exec(key)),
                    (key = key.replace(/:list$/, '')),
                    result
                      ? void 0 !== accumulator[key]
                        ? (accumulator[key] = [].concat(accumulator[key], value))
                        : (accumulator[key] = [value])
                      : (accumulator[key] = value);
                };
              case 'comma':
              case 'separator':
                return (key, value, accumulator) => {
                  const isArray =
                      'string' == typeof value && value.includes(options.arrayFormatSeparator),
                    isEncodedArray =
                      'string' == typeof value &&
                      !isArray &&
                      decode(value, options).includes(options.arrayFormatSeparator);
                  value = isEncodedArray ? decode(value, options) : value;
                  const newValue =
                    isArray || isEncodedArray
                      ? value
                          .split(options.arrayFormatSeparator)
                          .map((item) => decode(item, options))
                      : null === value
                      ? value
                      : decode(value, options);
                  accumulator[key] = newValue;
                };
              case 'bracket-separator':
                return (key, value, accumulator) => {
                  const isArray = /(\[\])$/.test(key);
                  if (((key = key.replace(/\[\]$/, '')), !isArray))
                    return void (accumulator[key] = value ? decode(value, options) : value);
                  const arrayValue =
                    null === value
                      ? []
                      : value
                          .split(options.arrayFormatSeparator)
                          .map((item) => decode(item, options));
                  void 0 !== accumulator[key]
                    ? (accumulator[key] = [].concat(accumulator[key], arrayValue))
                    : (accumulator[key] = arrayValue);
                };
              default:
                return (key, value, accumulator) => {
                  void 0 !== accumulator[key]
                    ? (accumulator[key] = [].concat(accumulator[key], value))
                    : (accumulator[key] = value);
                };
            }
          })(options),
          ret = Object.create(null);
        if ('string' != typeof query) return ret;
        if (!(query = query.trim().replace(/^[?#&]/, ''))) return ret;
        for (const param of query.split('&')) {
          if ('' === param) continue;
          let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');
          (value =
            void 0 === value
              ? null
              : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat)
              ? value
              : decode(value, options)),
            formatter(decode(key, options), value, ret);
        }
        for (const key of Object.keys(ret)) {
          const value = ret[key];
          if ('object' == typeof value && null !== value)
            for (const k of Object.keys(value)) value[k] = parseValue(value[k], options);
          else ret[key] = parseValue(value, options);
        }
        return !1 === options.sort
          ? ret
          : (!0 === options.sort
              ? Object.keys(ret).sort()
              : Object.keys(ret).sort(options.sort)
            ).reduce((result, key) => {
              const value = ret[key];
              return (
                Boolean(value) && 'object' == typeof value && !Array.isArray(value)
                  ? (result[key] = keysSorter(value))
                  : (result[key] = value),
                result
              );
            }, Object.create(null));
      }
      (exports.extract = extract),
        (exports.parse = parse),
        (exports.stringify = (object, options) => {
          if (!object) return '';
          validateArrayFormatSeparator(
            (options = Object.assign(
              { encode: !0, strict: !0, arrayFormat: 'none', arrayFormatSeparator: ',' },
              options
            )).arrayFormatSeparator
          );
          const shouldFilter = (key) =>
              (options.skipNull && null == object[key]) ||
              (options.skipEmptyString && '' === object[key]),
            formatter = (function encoderForArrayFormat(options) {
              switch (options.arrayFormat) {
                case 'index':
                  return (key) => (result, value) => {
                    const index = result.length;
                    return void 0 === value ||
                      (options.skipNull && null === value) ||
                      (options.skipEmptyString && '' === value)
                      ? result
                      : null === value
                      ? [...result, [encode(key, options), '[', index, ']'].join('')]
                      : [
                          ...result,
                          [
                            encode(key, options),
                            '[',
                            encode(index, options),
                            ']=',
                            encode(value, options),
                          ].join(''),
                        ];
                  };
                case 'bracket':
                  return (key) => (result, value) =>
                    void 0 === value ||
                    (options.skipNull && null === value) ||
                    (options.skipEmptyString && '' === value)
                      ? result
                      : null === value
                      ? [...result, [encode(key, options), '[]'].join('')]
                      : [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
                case 'colon-list-separator':
                  return (key) => (result, value) =>
                    void 0 === value ||
                    (options.skipNull && null === value) ||
                    (options.skipEmptyString && '' === value)
                      ? result
                      : null === value
                      ? [...result, [encode(key, options), ':list='].join('')]
                      : [
                          ...result,
                          [encode(key, options), ':list=', encode(value, options)].join(''),
                        ];
                case 'comma':
                case 'separator':
                case 'bracket-separator': {
                  const keyValueSep = 'bracket-separator' === options.arrayFormat ? '[]=' : '=';
                  return (key) => (result, value) =>
                    void 0 === value ||
                    (options.skipNull && null === value) ||
                    (options.skipEmptyString && '' === value)
                      ? result
                      : ((value = null === value ? '' : value),
                        0 === result.length
                          ? [[encode(key, options), keyValueSep, encode(value, options)].join('')]
                          : [[result, encode(value, options)].join(options.arrayFormatSeparator)]);
                }
                default:
                  return (key) => (result, value) =>
                    void 0 === value ||
                    (options.skipNull && null === value) ||
                    (options.skipEmptyString && '' === value)
                      ? result
                      : null === value
                      ? [...result, encode(key, options)]
                      : [...result, [encode(key, options), '=', encode(value, options)].join('')];
              }
            })(options),
            objectCopy = {};
          for (const key of Object.keys(object))
            shouldFilter(key) || (objectCopy[key] = object[key]);
          const keys = Object.keys(objectCopy);
          return (
            !1 !== options.sort && keys.sort(options.sort),
            keys
              .map((key) => {
                const value = object[key];
                return void 0 === value
                  ? ''
                  : null === value
                  ? encode(key, options)
                  : Array.isArray(value)
                  ? 0 === value.length && 'bracket-separator' === options.arrayFormat
                    ? encode(key, options) + '[]'
                    : value.reduce(formatter(key), []).join('&')
                  : encode(key, options) + '=' + encode(value, options);
              })
              .filter((x) => x.length > 0)
              .join('&')
          );
        }),
        (exports.parseUrl = (url, options) => {
          options = Object.assign({ decode: !0 }, options);
          const [url_, hash] = splitOnFirst(url, '#');
          return Object.assign(
            { url: url_.split('?')[0] || '', query: parse(extract(url), options) },
            options && options.parseFragmentIdentifier && hash
              ? { fragmentIdentifier: decode(hash, options) }
              : {}
          );
        }),
        (exports.stringifyUrl = (object, options) => {
          options = Object.assign(
            { encode: !0, strict: !0, [encodeFragmentIdentifier]: !0 },
            options
          );
          const url = removeHash(object.url).split('?')[0] || '',
            queryFromUrl = exports.extract(object.url),
            parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: !1 }),
            query = Object.assign(parsedQueryFromUrl, object.query);
          let queryString = exports.stringify(query, options);
          queryString && (queryString = `?${queryString}`);
          let hash = (function getHash(url) {
            let hash = '';
            const hashStart = url.indexOf('#');
            return -1 !== hashStart && (hash = url.slice(hashStart)), hash;
          })(object.url);
          return (
            object.fragmentIdentifier &&
              (hash = `#${
                options[encodeFragmentIdentifier]
                  ? encode(object.fragmentIdentifier, options)
                  : object.fragmentIdentifier
              }`),
            `${url}${queryString}${hash}`
          );
        }),
        (exports.pick = (input, filter, options) => {
          options = Object.assign(
            { parseFragmentIdentifier: !0, [encodeFragmentIdentifier]: !1 },
            options
          );
          const { url, query, fragmentIdentifier } = exports.parseUrl(input, options);
          return exports.stringifyUrl(
            { url, query: filterObject(query, filter), fragmentIdentifier },
            options
          );
        }),
        (exports.exclude = (input, filter, options) => {
          const exclusionFilter = Array.isArray(filter)
            ? (key) => !filter.includes(key)
            : (key, value) => !filter(key, value);
          return exports.pick(input, exclusionFilter, options);
        });
    },
    './node_modules/@walletconnect/time/dist/cjs/constants/index.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      const tslib_1 = __webpack_require__('./node_modules/tslib/tslib.es6.js');
      tslib_1.__exportStar(
        __webpack_require__('./node_modules/@walletconnect/time/dist/cjs/constants/misc.js'),
        exports
      ),
        tslib_1.__exportStar(
          __webpack_require__('./node_modules/@walletconnect/time/dist/cjs/constants/time.js'),
          exports
        );
    },
    './node_modules/@walletconnect/time/dist/cjs/constants/misc.js': (
      __unused_webpack_module,
      exports
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0),
        (exports.ONE_HUNDRED = 100),
        (exports.ONE_THOUSAND = 1e3);
    },
    './node_modules/@walletconnect/time/dist/cjs/constants/time.js': (
      __unused_webpack_module,
      exports
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.ONE_YEAR =
          exports.FOUR_WEEKS =
          exports.THREE_WEEKS =
          exports.TWO_WEEKS =
          exports.ONE_WEEK =
          exports.THIRTY_DAYS =
          exports.SEVEN_DAYS =
          exports.FIVE_DAYS =
          exports.THREE_DAYS =
          exports.ONE_DAY =
          exports.TWENTY_FOUR_HOURS =
          exports.TWELVE_HOURS =
          exports.SIX_HOURS =
          exports.THREE_HOURS =
          exports.ONE_HOUR =
          exports.SIXTY_MINUTES =
          exports.THIRTY_MINUTES =
          exports.TEN_MINUTES =
          exports.FIVE_MINUTES =
          exports.ONE_MINUTE =
          exports.SIXTY_SECONDS =
          exports.THIRTY_SECONDS =
          exports.TEN_SECONDS =
          exports.FIVE_SECONDS =
          exports.ONE_SECOND =
            void 0),
        (exports.ONE_SECOND = 1),
        (exports.FIVE_SECONDS = 5),
        (exports.TEN_SECONDS = 10),
        (exports.THIRTY_SECONDS = 30),
        (exports.SIXTY_SECONDS = 60),
        (exports.ONE_MINUTE = exports.SIXTY_SECONDS),
        (exports.FIVE_MINUTES = 5 * exports.ONE_MINUTE),
        (exports.TEN_MINUTES = 10 * exports.ONE_MINUTE),
        (exports.THIRTY_MINUTES = 30 * exports.ONE_MINUTE),
        (exports.SIXTY_MINUTES = 60 * exports.ONE_MINUTE),
        (exports.ONE_HOUR = exports.SIXTY_MINUTES),
        (exports.THREE_HOURS = 3 * exports.ONE_HOUR),
        (exports.SIX_HOURS = 6 * exports.ONE_HOUR),
        (exports.TWELVE_HOURS = 12 * exports.ONE_HOUR),
        (exports.TWENTY_FOUR_HOURS = 24 * exports.ONE_HOUR),
        (exports.ONE_DAY = exports.TWENTY_FOUR_HOURS),
        (exports.THREE_DAYS = 3 * exports.ONE_DAY),
        (exports.FIVE_DAYS = 5 * exports.ONE_DAY),
        (exports.SEVEN_DAYS = 7 * exports.ONE_DAY),
        (exports.THIRTY_DAYS = 30 * exports.ONE_DAY),
        (exports.ONE_WEEK = exports.SEVEN_DAYS),
        (exports.TWO_WEEKS = 2 * exports.ONE_WEEK),
        (exports.THREE_WEEKS = 3 * exports.ONE_WEEK),
        (exports.FOUR_WEEKS = 4 * exports.ONE_WEEK),
        (exports.ONE_YEAR = 365 * exports.ONE_DAY);
    },
    './node_modules/@walletconnect/time/dist/cjs/index.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      const tslib_1 = __webpack_require__('./node_modules/tslib/tslib.es6.js');
      tslib_1.__exportStar(
        __webpack_require__('./node_modules/@walletconnect/time/dist/cjs/utils/index.js'),
        exports
      ),
        tslib_1.__exportStar(
          __webpack_require__('./node_modules/@walletconnect/time/dist/cjs/watch.js'),
          exports
        ),
        tslib_1.__exportStar(
          __webpack_require__('./node_modules/@walletconnect/time/dist/cjs/types/index.js'),
          exports
        ),
        tslib_1.__exportStar(
          __webpack_require__('./node_modules/@walletconnect/time/dist/cjs/constants/index.js'),
          exports
        );
    },
    './node_modules/@walletconnect/time/dist/cjs/types/index.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      __webpack_require__('./node_modules/tslib/tslib.es6.js').__exportStar(
        __webpack_require__('./node_modules/@walletconnect/time/dist/cjs/types/watch.js'),
        exports
      );
    },
    './node_modules/@walletconnect/time/dist/cjs/types/watch.js': (
      __unused_webpack_module,
      exports
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.IWatch = void 0);
      exports.IWatch = class IWatch {};
    },
    './node_modules/@walletconnect/time/dist/cjs/utils/convert.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.fromMiliseconds = exports.toMiliseconds = void 0);
      const constants_1 = __webpack_require__(
        './node_modules/@walletconnect/time/dist/cjs/constants/index.js'
      );
      (exports.toMiliseconds = function toMiliseconds(seconds) {
        return seconds * constants_1.ONE_THOUSAND;
      }),
        (exports.fromMiliseconds = function fromMiliseconds(miliseconds) {
          return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
        });
    },
    './node_modules/@walletconnect/time/dist/cjs/utils/delay.js': (
      __unused_webpack_module,
      exports
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.delay = void 0),
        (exports.delay = function delay(timeout) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(!0);
            }, timeout);
          });
        });
    },
    './node_modules/@walletconnect/time/dist/cjs/utils/index.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 });
      const tslib_1 = __webpack_require__('./node_modules/tslib/tslib.es6.js');
      tslib_1.__exportStar(
        __webpack_require__('./node_modules/@walletconnect/time/dist/cjs/utils/delay.js'),
        exports
      ),
        tslib_1.__exportStar(
          __webpack_require__('./node_modules/@walletconnect/time/dist/cjs/utils/convert.js'),
          exports
        );
    },
    './node_modules/@walletconnect/time/dist/cjs/watch.js': (__unused_webpack_module, exports) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.Watch = void 0);
      class Watch {
        constructor() {
          this.timestamps = new Map();
        }
        start(label) {
          if (this.timestamps.has(label))
            throw new Error(`Watch already started for label: ${label}`);
          this.timestamps.set(label, { started: Date.now() });
        }
        stop(label) {
          const timestamp = this.get(label);
          if (void 0 !== timestamp.elapsed)
            throw new Error(`Watch already stopped for label: ${label}`);
          const elapsed = Date.now() - timestamp.started;
          this.timestamps.set(label, { started: timestamp.started, elapsed });
        }
        get(label) {
          const timestamp = this.timestamps.get(label);
          if (void 0 === timestamp) throw new Error(`No timestamp found for label: ${label}`);
          return timestamp;
        }
        elapsed(label) {
          const timestamp = this.get(label);
          return timestamp.elapsed || Date.now() - timestamp.started;
        }
      }
      (exports.Watch = Watch), (exports.default = Watch);
    },
    './node_modules/@walletconnect/universal-provider/dist/index.es.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          UniversalProvider: () => dist_index_es_R,
          default: () => universal_provider_dist_index_es_a,
        });
      var identity_namespaceObject = {};
      __webpack_require__.r(identity_namespaceObject),
        __webpack_require__.d(identity_namespaceObject, { identity: () => identity });
      var base2_namespaceObject = {};
      __webpack_require__.r(base2_namespaceObject),
        __webpack_require__.d(base2_namespaceObject, { base2: () => base2 });
      var base8_namespaceObject = {};
      __webpack_require__.r(base8_namespaceObject),
        __webpack_require__.d(base8_namespaceObject, { base8: () => base8 });
      var base10_namespaceObject = {};
      __webpack_require__.r(base10_namespaceObject),
        __webpack_require__.d(base10_namespaceObject, { base10: () => base10 });
      var base16_namespaceObject = {};
      __webpack_require__.r(base16_namespaceObject),
        __webpack_require__.d(base16_namespaceObject, {
          base16: () => base16,
          base16upper: () => base16upper,
        });
      var base32_namespaceObject = {};
      __webpack_require__.r(base32_namespaceObject),
        __webpack_require__.d(base32_namespaceObject, {
          base32: () => base32_base32,
          base32hex: () => base32hex,
          base32hexpad: () => base32hexpad,
          base32hexpadupper: () => base32hexpadupper,
          base32hexupper: () => base32hexupper,
          base32pad: () => base32pad,
          base32padupper: () => base32padupper,
          base32upper: () => base32upper,
          base32z: () => base32z,
        });
      var base36_namespaceObject = {};
      __webpack_require__.r(base36_namespaceObject),
        __webpack_require__.d(base36_namespaceObject, {
          base36: () => base36,
          base36upper: () => base36upper,
        });
      var base58_namespaceObject = {};
      __webpack_require__.r(base58_namespaceObject),
        __webpack_require__.d(base58_namespaceObject, {
          base58btc: () => base58_base58btc,
          base58flickr: () => base58flickr,
        });
      var base64_namespaceObject = {};
      __webpack_require__.r(base64_namespaceObject),
        __webpack_require__.d(base64_namespaceObject, {
          base64: () => base64,
          base64pad: () => base64pad,
          base64url: () => base64url,
          base64urlpad: () => base64urlpad,
        });
      var base256emoji_namespaceObject = {};
      __webpack_require__.r(base256emoji_namespaceObject),
        __webpack_require__.d(base256emoji_namespaceObject, { base256emoji: () => base256emoji });
      var sha2_browser_namespaceObject = {};
      __webpack_require__.r(sha2_browser_namespaceObject),
        __webpack_require__.d(sha2_browser_namespaceObject, {
          sha256: () => sha256,
          sha512: () => sha512,
        });
      var hashes_identity_namespaceObject = {};
      __webpack_require__.r(hashes_identity_namespaceObject),
        __webpack_require__.d(hashes_identity_namespaceObject, {
          identity: () => identity_identity,
        });
      var raw_namespaceObject = {};
      __webpack_require__.r(raw_namespaceObject),
        __webpack_require__.d(raw_namespaceObject, {
          code: () => raw_code,
          decode: () => raw_decode,
          encode: () => raw_encode,
          name: () => raw_name,
        });
      var json_namespaceObject = {};
      __webpack_require__.r(json_namespaceObject),
        __webpack_require__.d(json_namespaceObject, {
          code: () => json_code,
          decode: () => json_decode,
          encode: () => json_encode,
          name: () => json_name,
        });
      var browser = __webpack_require__('./node_modules/pino/browser.js'),
        browser_default = __webpack_require__.n(browser),
        events = __webpack_require__('./node_modules/events/events.js'),
        events_default = __webpack_require__.n(events),
        cjs_browser = __webpack_require__(
          './node_modules/@walletconnect/keyvaluestorage/dist/cjs/browser/index.js'
        ),
        cjs = __webpack_require__('./node_modules/@walletconnect/heartbeat/dist/cjs/index.js'),
        dist_cjs = __webpack_require__('./node_modules/@walletconnect/logger/dist/cjs/index.js'),
        esm_events = __webpack_require__('./node_modules/@walletconnect/events/dist/esm/events.js');
      class n extends esm_events.q {
        constructor(s) {
          super(), (this.opts = s), (this.protocol = 'wc'), (this.version = 2);
        }
      }
      class h extends esm_events.q {
        constructor(s, t) {
          super(), (this.core = s), (this.logger = t), (this.records = new Map());
        }
      }
      class a {
        constructor(s, t) {
          (this.logger = s), (this.core = t);
        }
      }
      class u extends esm_events.q {
        constructor(s, t) {
          super(), (this.relayer = s), (this.logger = t);
        }
      }
      class g extends esm_events.q {
        constructor(s) {
          super();
        }
      }
      class index_es_p {
        constructor(s, t, o, S) {
          (this.core = s), (this.logger = t), (this.name = o);
        }
      }
      class x extends esm_events.q {
        constructor(s, t) {
          super(), (this.relayer = s), (this.logger = t);
        }
      }
      class E extends esm_events.q {
        constructor(s, t) {
          super(), (this.core = s), (this.logger = t);
        }
      }
      class y {
        constructor(s) {
          (this.opts = s), (this.protocol = 'wc'), (this.version = 2);
        }
      }
      class C {
        constructor(s) {
          this.client = s;
        }
      }
      var esm = __webpack_require__('./node_modules/@walletconnect/safe-json/dist/esm/index.js'),
        lib_ed25519 = __webpack_require__('./node_modules/@stablelib/ed25519/lib/ed25519.js'),
        random = __webpack_require__('./node_modules/@stablelib/random/lib/random.js'),
        time_dist_cjs = __webpack_require__('./node_modules/@walletconnect/time/dist/cjs/index.js');
      const constants_JWT_DELIMITER = '.',
        constants_JWT_ENCODING = 'base64url',
        constants_JSON_ENCODING = 'utf8',
        constants_DATA_ENCODING = 'utf8',
        constants_DID_DELIMITER = ':',
        constants_DID_PREFIX = 'did',
        constants_DID_METHOD = 'key',
        constants_MULTICODEC_ED25519_ENCODING = 'base58btc',
        constants_MULTICODEC_ED25519_BASE = 'z',
        constants_MULTICODEC_ED25519_HEADER = 'K36';
      function as_uint8array_asUint8Array(buf) {
        return null != globalThis.Buffer
          ? new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength)
          : buf;
      }
      function allocUnsafe(size = 0) {
        return null != globalThis.Buffer && null != globalThis.Buffer.allocUnsafe
          ? as_uint8array_asUint8Array(globalThis.Buffer.allocUnsafe(size))
          : new Uint8Array(size);
      }
      var src = function base(ALPHABET, name) {
        if (ALPHABET.length >= 255) throw new TypeError('Alphabet too long');
        for (var BASE_MAP = new Uint8Array(256), j = 0; j < BASE_MAP.length; j++) BASE_MAP[j] = 255;
        for (var i = 0; i < ALPHABET.length; i++) {
          var x = ALPHABET.charAt(i),
            xc = x.charCodeAt(0);
          if (255 !== BASE_MAP[xc]) throw new TypeError(x + ' is ambiguous');
          BASE_MAP[xc] = i;
        }
        var BASE = ALPHABET.length,
          LEADER = ALPHABET.charAt(0),
          FACTOR = Math.log(BASE) / Math.log(256),
          iFACTOR = Math.log(256) / Math.log(BASE);
        function decodeUnsafe(source) {
          if ('string' != typeof source) throw new TypeError('Expected String');
          if (0 === source.length) return new Uint8Array();
          var psz = 0;
          if (' ' !== source[psz]) {
            for (var zeroes = 0, length = 0; source[psz] === LEADER; ) zeroes++, psz++;
            for (
              var size = ((source.length - psz) * FACTOR + 1) >>> 0, b256 = new Uint8Array(size);
              source[psz];

            ) {
              var carry = BASE_MAP[source.charCodeAt(psz)];
              if (255 === carry) return;
              for (var i = 0, it3 = size - 1; (0 !== carry || i < length) && -1 !== it3; it3--, i++)
                (carry += (BASE * b256[it3]) >>> 0),
                  (b256[it3] = carry % 256 >>> 0),
                  (carry = (carry / 256) >>> 0);
              if (0 !== carry) throw new Error('Non-zero carry');
              (length = i), psz++;
            }
            if (' ' !== source[psz]) {
              for (var it4 = size - length; it4 !== size && 0 === b256[it4]; ) it4++;
              for (var vch = new Uint8Array(zeroes + (size - it4)), j = zeroes; it4 !== size; )
                vch[j++] = b256[it4++];
              return vch;
            }
          }
        }
        return {
          encode: function encode(source) {
            if (
              (source instanceof Uint8Array ||
                (ArrayBuffer.isView(source)
                  ? (source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength))
                  : Array.isArray(source) && (source = Uint8Array.from(source))),
              !(source instanceof Uint8Array))
            )
              throw new TypeError('Expected Uint8Array');
            if (0 === source.length) return '';
            for (
              var zeroes = 0, length = 0, pbegin = 0, pend = source.length;
              pbegin !== pend && 0 === source[pbegin];

            )
              pbegin++, zeroes++;
            for (
              var size = ((pend - pbegin) * iFACTOR + 1) >>> 0, b58 = new Uint8Array(size);
              pbegin !== pend;

            ) {
              for (
                var carry = source[pbegin], i = 0, it1 = size - 1;
                (0 !== carry || i < length) && -1 !== it1;
                it1--, i++
              )
                (carry += (256 * b58[it1]) >>> 0),
                  (b58[it1] = carry % BASE >>> 0),
                  (carry = (carry / BASE) >>> 0);
              if (0 !== carry) throw new Error('Non-zero carry');
              (length = i), pbegin++;
            }
            for (var it2 = size - length; it2 !== size && 0 === b58[it2]; ) it2++;
            for (var str = LEADER.repeat(zeroes); it2 < size; ++it2)
              str += ALPHABET.charAt(b58[it2]);
            return str;
          },
          decodeUnsafe,
          decode: function decode(string) {
            var buffer = decodeUnsafe(string);
            if (buffer) return buffer;
            throw new Error(`Non-${name} character`);
          },
        };
      };
      const base_x = src,
        bytes_coerce =
          (new Uint8Array(0),
          (o) => {
            if (o instanceof Uint8Array && 'Uint8Array' === o.constructor.name) return o;
            if (o instanceof ArrayBuffer) return new Uint8Array(o);
            if (ArrayBuffer.isView(o)) return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
            throw new Error('Unknown type, must be binary type');
          });
      class Encoder {
        constructor(name, prefix, baseEncode) {
          (this.name = name), (this.prefix = prefix), (this.baseEncode = baseEncode);
        }
        encode(bytes) {
          if (bytes instanceof Uint8Array) return `${this.prefix}${this.baseEncode(bytes)}`;
          throw Error('Unknown type, must be binary type');
        }
      }
      class Decoder {
        constructor(name, prefix, baseDecode) {
          if (((this.name = name), (this.prefix = prefix), void 0 === prefix.codePointAt(0)))
            throw new Error('Invalid prefix character');
          (this.prefixCodePoint = prefix.codePointAt(0)), (this.baseDecode = baseDecode);
        }
        decode(text) {
          if ('string' == typeof text) {
            if (text.codePointAt(0) !== this.prefixCodePoint)
              throw Error(
                `Unable to decode multibase string ${JSON.stringify(text)}, ${
                  this.name
                } decoder only supports inputs prefixed with ${this.prefix}`
              );
            return this.baseDecode(text.slice(this.prefix.length));
          }
          throw Error('Can only multibase decode strings');
        }
        or(decoder) {
          return or(this, decoder);
        }
      }
      class ComposedDecoder {
        constructor(decoders) {
          this.decoders = decoders;
        }
        or(decoder) {
          return or(this, decoder);
        }
        decode(input) {
          const prefix = input[0],
            decoder = this.decoders[prefix];
          if (decoder) return decoder.decode(input);
          throw RangeError(
            `Unable to decode multibase string ${JSON.stringify(
              input
            )}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`
          );
        }
      }
      const or = (left, right) =>
        new ComposedDecoder({
          ...(left.decoders || { [left.prefix]: left }),
          ...(right.decoders || { [right.prefix]: right }),
        });
      class Codec {
        constructor(name, prefix, baseEncode, baseDecode) {
          (this.name = name),
            (this.prefix = prefix),
            (this.baseEncode = baseEncode),
            (this.baseDecode = baseDecode),
            (this.encoder = new Encoder(name, prefix, baseEncode)),
            (this.decoder = new Decoder(name, prefix, baseDecode));
        }
        encode(input) {
          return this.encoder.encode(input);
        }
        decode(input) {
          return this.decoder.decode(input);
        }
      }
      const from = ({ name, prefix, encode, decode }) => new Codec(name, prefix, encode, decode),
        baseX = ({ prefix, name, alphabet }) => {
          const { encode, decode } = base_x(alphabet, name);
          return from({ prefix, name, encode, decode: (text) => bytes_coerce(decode(text)) });
        },
        rfc4648 = ({ name, prefix, bitsPerChar, alphabet }) =>
          from({
            prefix,
            name,
            encode: (input) =>
              ((data, alphabet, bitsPerChar) => {
                const pad = '=' === alphabet[alphabet.length - 1],
                  mask = (1 << bitsPerChar) - 1;
                let out = '',
                  bits = 0,
                  buffer = 0;
                for (let i = 0; i < data.length; ++i)
                  for (buffer = (buffer << 8) | data[i], bits += 8; bits > bitsPerChar; )
                    (bits -= bitsPerChar), (out += alphabet[mask & (buffer >> bits)]);
                if ((bits && (out += alphabet[mask & (buffer << (bitsPerChar - bits))]), pad))
                  for (; (out.length * bitsPerChar) & 7; ) out += '=';
                return out;
              })(input, alphabet, bitsPerChar),
            decode: (input) =>
              ((string, alphabet, bitsPerChar, name) => {
                const codes = {};
                for (let i = 0; i < alphabet.length; ++i) codes[alphabet[i]] = i;
                let end = string.length;
                for (; '=' === string[end - 1]; ) --end;
                const out = new Uint8Array(((end * bitsPerChar) / 8) | 0);
                let bits = 0,
                  buffer = 0,
                  written = 0;
                for (let i = 0; i < end; ++i) {
                  const value = codes[string[i]];
                  if (void 0 === value) throw new SyntaxError(`Non-${name} character`);
                  (buffer = (buffer << bitsPerChar) | value),
                    (bits += bitsPerChar),
                    bits >= 8 && ((bits -= 8), (out[written++] = 255 & (buffer >> bits)));
                }
                if (bits >= bitsPerChar || 255 & (buffer << (8 - bits)))
                  throw new SyntaxError('Unexpected end of data');
                return out;
              })(input, alphabet, bitsPerChar, name),
          }),
        identity = from({
          prefix: '\0',
          name: 'identity',
          encode: (buf) => ((b) => new TextDecoder().decode(b))(buf),
          decode: (str) => ((str) => new TextEncoder().encode(str))(str),
        }),
        base2 = rfc4648({ prefix: '0', name: 'base2', alphabet: '01', bitsPerChar: 1 }),
        base8 = rfc4648({ prefix: '7', name: 'base8', alphabet: '01234567', bitsPerChar: 3 }),
        base10 = baseX({ prefix: '9', name: 'base10', alphabet: '0123456789' }),
        base16 = rfc4648({
          prefix: 'f',
          name: 'base16',
          alphabet: '0123456789abcdef',
          bitsPerChar: 4,
        }),
        base16upper = rfc4648({
          prefix: 'F',
          name: 'base16upper',
          alphabet: '0123456789ABCDEF',
          bitsPerChar: 4,
        }),
        base32_base32 = rfc4648({
          prefix: 'b',
          name: 'base32',
          alphabet: 'abcdefghijklmnopqrstuvwxyz234567',
          bitsPerChar: 5,
        }),
        base32upper = rfc4648({
          prefix: 'B',
          name: 'base32upper',
          alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
          bitsPerChar: 5,
        }),
        base32pad = rfc4648({
          prefix: 'c',
          name: 'base32pad',
          alphabet: 'abcdefghijklmnopqrstuvwxyz234567=',
          bitsPerChar: 5,
        }),
        base32padupper = rfc4648({
          prefix: 'C',
          name: 'base32padupper',
          alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=',
          bitsPerChar: 5,
        }),
        base32hex = rfc4648({
          prefix: 'v',
          name: 'base32hex',
          alphabet: '0123456789abcdefghijklmnopqrstuv',
          bitsPerChar: 5,
        }),
        base32hexupper = rfc4648({
          prefix: 'V',
          name: 'base32hexupper',
          alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
          bitsPerChar: 5,
        }),
        base32hexpad = rfc4648({
          prefix: 't',
          name: 'base32hexpad',
          alphabet: '0123456789abcdefghijklmnopqrstuv=',
          bitsPerChar: 5,
        }),
        base32hexpadupper = rfc4648({
          prefix: 'T',
          name: 'base32hexpadupper',
          alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV=',
          bitsPerChar: 5,
        }),
        base32z = rfc4648({
          prefix: 'h',
          name: 'base32z',
          alphabet: 'ybndrfg8ejkmcpqxot1uwisza345h769',
          bitsPerChar: 5,
        }),
        base36 = baseX({
          prefix: 'k',
          name: 'base36',
          alphabet: '0123456789abcdefghijklmnopqrstuvwxyz',
        }),
        base36upper = baseX({
          prefix: 'K',
          name: 'base36upper',
          alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        }),
        base58_base58btc = baseX({
          name: 'base58btc',
          prefix: 'z',
          alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
        }),
        base58flickr = baseX({
          name: 'base58flickr',
          prefix: 'Z',
          alphabet: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
        }),
        base64 = rfc4648({
          prefix: 'm',
          name: 'base64',
          alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          bitsPerChar: 6,
        }),
        base64pad = rfc4648({
          prefix: 'M',
          name: 'base64pad',
          alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
          bitsPerChar: 6,
        }),
        base64url = rfc4648({
          prefix: 'u',
          name: 'base64url',
          alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
          bitsPerChar: 6,
        }),
        base64urlpad = rfc4648({
          prefix: 'U',
          name: 'base64urlpad',
          alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',
          bitsPerChar: 6,
        }),
        alphabet = Array.from(
          '🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂'
        ),
        alphabetBytesToChars = alphabet.reduce((p, c, i) => ((p[i] = c), p), []),
        alphabetCharsToBytes = alphabet.reduce((p, c, i) => ((p[c.codePointAt(0)] = i), p), []);
      const base256emoji = from({
        prefix: '🚀',
        name: 'base256emoji',
        encode: function base256emoji_encode(data) {
          return data.reduce((p, c) => (p += alphabetBytesToChars[c]), '');
        },
        decode: function base256emoji_decode(str) {
          const byts = [];
          for (const char of str) {
            const byt = alphabetCharsToBytes[char.codePointAt(0)];
            if (void 0 === byt) throw new Error(`Non-base256emoji character: ${char}`);
            byts.push(byt);
          }
          return new Uint8Array(byts);
        },
      });
      var encode_1 = function varint_encode(num, out, offset) {
          out = out || [];
          var oldOffset = (offset = offset || 0);
          for (; num >= INT; ) (out[offset++] = (255 & num) | MSB), (num /= 128);
          for (; num & MSBALL; ) (out[offset++] = (255 & num) | MSB), (num >>>= 7);
          return (out[offset] = 0 | num), (varint_encode.bytes = offset - oldOffset + 1), out;
        },
        MSB = 128,
        MSBALL = -128,
        INT = Math.pow(2, 31);
      var varint_decode = function read(buf, offset) {
          var b,
            res = 0,
            shift = 0,
            counter = (offset = offset || 0),
            l = buf.length;
          do {
            if (counter >= l) throw ((read.bytes = 0), new RangeError('Could not decode varint'));
            (b = buf[counter++]),
              (res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift)),
              (shift += 7);
          } while (b >= MSB$1);
          return (read.bytes = counter - offset), res;
        },
        MSB$1 = 128,
        REST$1 = 127;
      var N1 = Math.pow(2, 7),
        N2 = Math.pow(2, 14),
        N3 = Math.pow(2, 21),
        N4 = Math.pow(2, 28),
        N5 = Math.pow(2, 35),
        N6 = Math.pow(2, 42),
        N7 = Math.pow(2, 49),
        N8 = Math.pow(2, 56),
        N9 = Math.pow(2, 63);
      const vendor_varint = {
          encode: encode_1,
          decode: varint_decode,
          encodingLength: function (value) {
            return value < N1
              ? 1
              : value < N2
              ? 2
              : value < N3
              ? 3
              : value < N4
              ? 4
              : value < N5
              ? 5
              : value < N6
              ? 6
              : value < N7
              ? 7
              : value < N8
              ? 8
              : value < N9
              ? 9
              : 10;
          },
        },
        encodeTo = (int, target, offset = 0) => (vendor_varint.encode(int, target, offset), target),
        encodingLength = (int) => vendor_varint.encodingLength(int),
        create = (code, digest) => {
          const size = digest.byteLength,
            sizeOffset = encodingLength(code),
            digestOffset = sizeOffset + encodingLength(size),
            bytes = new Uint8Array(digestOffset + size);
          return (
            encodeTo(code, bytes, 0),
            encodeTo(size, bytes, sizeOffset),
            bytes.set(digest, digestOffset),
            new digest_Digest(code, size, digest, bytes)
          );
        };
      class digest_Digest {
        constructor(code, size, digest, bytes) {
          (this.code = code), (this.size = size), (this.digest = digest), (this.bytes = bytes);
        }
      }
      const hasher_from = ({ name, code, encode }) => new Hasher(name, code, encode);
      class Hasher {
        constructor(name, code, encode) {
          (this.name = name), (this.code = code), (this.encode = encode);
        }
        digest(input) {
          if (input instanceof Uint8Array) {
            const result = this.encode(input);
            return result instanceof Uint8Array
              ? create(this.code, result)
              : result.then((digest) => create(this.code, digest));
          }
          throw Error('Unknown type, must be binary type');
        }
      }
      const sha = (name) => async (data) => new Uint8Array(await crypto.subtle.digest(name, data)),
        sha256 = hasher_from({ name: 'sha2-256', code: 18, encode: sha('SHA-256') }),
        sha512 = hasher_from({ name: 'sha2-512', code: 19, encode: sha('SHA-512') }),
        identity_encode = bytes_coerce,
        identity_identity = {
          code: 0,
          name: 'identity',
          encode: identity_encode,
          digest: (input) => create(0, identity_encode(input)),
        },
        raw_name = 'raw',
        raw_code = 85,
        raw_encode = (node) => bytes_coerce(node),
        raw_decode = (data) => bytes_coerce(data),
        textEncoder = new TextEncoder(),
        textDecoder = new TextDecoder(),
        json_name = 'json',
        json_code = 512,
        json_encode = (node) => textEncoder.encode(JSON.stringify(node)),
        json_decode = (data) => JSON.parse(textDecoder.decode(data));
      class CID {
        constructor(version, code, multihash, bytes) {
          (this.code = code),
            (this.version = version),
            (this.multihash = multihash),
            (this.bytes = bytes),
            (this.byteOffset = bytes.byteOffset),
            (this.byteLength = bytes.byteLength),
            (this.asCID = this),
            (this._baseCache = new Map()),
            Object.defineProperties(this, {
              byteOffset: cid_hidden,
              byteLength: cid_hidden,
              code: readonly,
              version: readonly,
              multihash: readonly,
              bytes: readonly,
              _baseCache: cid_hidden,
              asCID: cid_hidden,
            });
        }
        toV0() {
          if (0 === this.version) return this;
          {
            const { code, multihash } = this;
            if (code !== DAG_PB_CODE) throw new Error('Cannot convert a non dag-pb CID to CIDv0');
            if (multihash.code !== SHA_256_CODE)
              throw new Error('Cannot convert non sha2-256 multihash CID to CIDv0');
            return CID.createV0(multihash);
          }
        }
        toV1() {
          switch (this.version) {
            case 0: {
              const { code, digest } = this.multihash,
                multihash = Digest.create(code, digest);
              return CID.createV1(this.code, multihash);
            }
            case 1:
              return this;
            default:
              throw Error(
                `Can not convert CID version ${this.version} to version 0. This is a bug please report`
              );
          }
        }
        equals(other) {
          return (
            other &&
            this.code === other.code &&
            this.version === other.version &&
            Digest.equals(this.multihash, other.multihash)
          );
        }
        toString(base) {
          const { bytes, version, _baseCache } = this;
          return 0 === version
            ? toStringV0(bytes, _baseCache, base || base58btc.encoder)
            : toStringV1(bytes, _baseCache, base || base32.encoder);
        }
        toJSON() {
          return { code: this.code, version: this.version, hash: this.multihash.bytes };
        }
        get [Symbol.toStringTag]() {
          return 'CID';
        }
        [Symbol.for('nodejs.util.inspect.custom')]() {
          return 'CID(' + this.toString() + ')';
        }
        static isCID(value) {
          return (
            deprecate(/^0\.0/, IS_CID_DEPRECATION),
            !(!value || (!value[cidSymbol] && value.asCID !== value))
          );
        }
        get toBaseEncodedString() {
          throw new Error('Deprecated, use .toString()');
        }
        get codec() {
          throw new Error('"codec" property is deprecated, use integer "code" property instead');
        }
        get buffer() {
          throw new Error('Deprecated .buffer property, use .bytes to get Uint8Array instead');
        }
        get multibaseName() {
          throw new Error('"multibaseName" property is deprecated');
        }
        get prefix() {
          throw new Error('"prefix" property is deprecated');
        }
        static asCID(value) {
          if (value instanceof CID) return value;
          if (null != value && value.asCID === value) {
            const { version, code, multihash, bytes } = value;
            return new CID(
              version,
              code,
              multihash,
              bytes || encodeCID(version, code, multihash.bytes)
            );
          }
          if (null != value && !0 === value[cidSymbol]) {
            const { version, multihash, code } = value,
              digest = Digest.decode(multihash);
            return CID.create(version, code, digest);
          }
          return null;
        }
        static create(version, code, digest) {
          if ('number' != typeof code) throw new Error('String codecs are no longer supported');
          switch (version) {
            case 0:
              if (code !== DAG_PB_CODE)
                throw new Error(
                  `Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`
                );
              return new CID(version, code, digest, digest.bytes);
            case 1: {
              const bytes = encodeCID(version, code, digest.bytes);
              return new CID(version, code, digest, bytes);
            }
            default:
              throw new Error('Invalid version');
          }
        }
        static createV0(digest) {
          return CID.create(0, DAG_PB_CODE, digest);
        }
        static createV1(code, digest) {
          return CID.create(1, code, digest);
        }
        static decode(bytes) {
          const [cid, remainder] = CID.decodeFirst(bytes);
          if (remainder.length) throw new Error('Incorrect length');
          return cid;
        }
        static decodeFirst(bytes) {
          const specs = CID.inspectBytes(bytes),
            prefixSize = specs.size - specs.multihashSize,
            multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
          if (multihashBytes.byteLength !== specs.multihashSize)
            throw new Error('Incorrect length');
          const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize),
            digest = new Digest.Digest(
              specs.multihashCode,
              specs.digestSize,
              digestBytes,
              multihashBytes
            );
          return [
            0 === specs.version ? CID.createV0(digest) : CID.createV1(specs.codec, digest),
            bytes.subarray(specs.size),
          ];
        }
        static inspectBytes(initialBytes) {
          let offset = 0;
          const next = () => {
            const [i, length] = varint.decode(initialBytes.subarray(offset));
            return length, i;
          };
          let version = next(),
            codec = DAG_PB_CODE;
          if ((18 === version ? (0, 0) : 1 === version && next(), 0 !== version && 1 !== version))
            throw new RangeError(`Invalid CID version ${version}`);
          const prefixSize = offset,
            multihashCode = next(),
            digestSize = next(),
            size = offset + digestSize;
          return {
            version,
            codec,
            multihashCode,
            digestSize,
            multihashSize: size - prefixSize,
            size,
          };
        }
        static parse(source, base) {
          const [prefix, bytes] = parseCIDtoBytes(source, base),
            cid = CID.decode(bytes);
          return cid._baseCache.set(prefix, source), cid;
        }
      }
      Symbol.for('@ipld/js-cid/CID');
      const bases = {
        ...identity_namespaceObject,
        ...base2_namespaceObject,
        ...base8_namespaceObject,
        ...base10_namespaceObject,
        ...base16_namespaceObject,
        ...base32_namespaceObject,
        ...base36_namespaceObject,
        ...base58_namespaceObject,
        ...base64_namespaceObject,
        ...base256emoji_namespaceObject,
      };
      function createCodec(name, prefix, encode, decode) {
        return { name, prefix, encoder: { name, prefix, encode }, decoder: { decode } };
      }
      const string = createCodec(
          'utf8',
          'u',
          (buf) => 'u' + new TextDecoder('utf8').decode(buf),
          (str) => new TextEncoder().encode(str.substring(1))
        ),
        ascii = createCodec(
          'ascii',
          'a',
          (buf) => {
            let string = 'a';
            for (let i = 0; i < buf.length; i++) string += String.fromCharCode(buf[i]);
            return string;
          },
          (str) => {
            const buf = allocUnsafe((str = str.substring(1)).length);
            for (let i = 0; i < str.length; i++) buf[i] = str.charCodeAt(i);
            return buf;
          }
        ),
        util_bases = {
          utf8: string,
          'utf-8': string,
          hex: bases.base16,
          latin1: ascii,
          ascii,
          binary: ascii,
          ...bases,
        };
      function to_string_toString(array, encoding = 'utf8') {
        const base = util_bases[encoding];
        if (!base) throw new Error(`Unsupported encoding "${encoding}"`);
        return ('utf8' !== encoding && 'utf-8' !== encoding) ||
          null == globalThis.Buffer ||
          null == globalThis.Buffer.from
          ? base.encoder.encode(array).substring(1)
          : globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString(
              'utf8'
            );
      }
      function from_string_fromString(string, encoding = 'utf8') {
        const base = util_bases[encoding];
        if (!base) throw new Error(`Unsupported encoding "${encoding}"`);
        return ('utf8' !== encoding && 'utf-8' !== encoding) ||
          null == globalThis.Buffer ||
          null == globalThis.Buffer.from
          ? base.decoder.decode(`${base.prefix}${string}`)
          : as_uint8array_asUint8Array(globalThis.Buffer.from(string, 'utf-8'));
      }
      function encodeJSON(val) {
        return to_string_toString(
          from_string_fromString((0, esm.u)(val), constants_JSON_ENCODING),
          constants_JWT_ENCODING
        );
      }
      function encodeIss(publicKey) {
        const header = from_string_fromString(
            constants_MULTICODEC_ED25519_HEADER,
            constants_MULTICODEC_ED25519_ENCODING
          ),
          multicodec =
            constants_MULTICODEC_ED25519_BASE +
            to_string_toString(
              (function concat(arrays, length) {
                length || (length = arrays.reduce((acc, curr) => acc + curr.length, 0));
                const output = allocUnsafe(length);
                let offset = 0;
                for (const arr of arrays) output.set(arr, offset), (offset += arr.length);
                return as_uint8array_asUint8Array(output);
              })([header, publicKey]),
              constants_MULTICODEC_ED25519_ENCODING
            );
        return [constants_DID_PREFIX, constants_DID_METHOD, multicodec].join(
          constants_DID_DELIMITER
        );
      }
      function generateKeyPair(seed = (0, random.randomBytes)(32)) {
        return lib_ed25519._w(seed);
      }
      async function signJWT(
        sub,
        aud,
        ttl,
        keyPair,
        iat = (0, time_dist_cjs.fromMiliseconds)(Date.now())
      ) {
        const header = { alg: 'EdDSA', typ: 'JWT' },
          payload = { iss: encodeIss(keyPair.publicKey), sub, aud, iat, exp: iat + ttl },
          data = (function encodeData(params) {
            return from_string_fromString(
              [encodeJSON(params.header), encodeJSON(params.payload)].join(constants_JWT_DELIMITER),
              constants_DATA_ENCODING
            );
          })({ header, payload });
        return (function encodeJWT(params) {
          return [
            encodeJSON(params.header),
            encodeJSON(params.payload),
            ((bytes = params.signature), to_string_toString(bytes, constants_JWT_ENCODING)),
          ].join(constants_JWT_DELIMITER);
          var bytes;
        })({ header, payload, signature: lib_ed25519.Xx(keyPair.secretKey, data) });
      }
      __webpack_require__('./node_modules/@walletconnect/relay-auth/dist/esm/types.js');
      var chacha20poly1305 = __webpack_require__(
          './node_modules/@stablelib/chacha20poly1305/lib/chacha20poly1305.js'
        ),
        hkdf = __webpack_require__('./node_modules/@stablelib/hkdf/lib/hkdf.js'),
        lib_sha256 = __webpack_require__('./node_modules/@stablelib/sha256/lib/sha256.js'),
        x25519 = __webpack_require__('./node_modules/@stablelib/x25519/lib/x25519.js');
      function alloc_allocUnsafe(size = 0) {
        return null != globalThis.Buffer && null != globalThis.Buffer.allocUnsafe
          ? globalThis.Buffer.allocUnsafe(size)
          : new Uint8Array(size);
      }
      function concat_concat(arrays, length) {
        length || (length = arrays.reduce((acc, curr) => acc + curr.length, 0));
        const output = alloc_allocUnsafe(length);
        let offset = 0;
        for (const arr of arrays) output.set(arr, offset), (offset += arr.length);
        return output;
      }
      function bases_createCodec(name, prefix, encode, decode) {
        return { name, prefix, encoder: { name, prefix, encode }, decoder: { decode } };
      }
      const bases_string = bases_createCodec(
          'utf8',
          'u',
          (buf) => 'u' + new TextDecoder('utf8').decode(buf),
          (str) => new TextEncoder().encode(str.substring(1))
        ),
        bases_ascii = bases_createCodec(
          'ascii',
          'a',
          (buf) => {
            let string = 'a';
            for (let i = 0; i < buf.length; i++) string += String.fromCharCode(buf[i]);
            return string;
          },
          (str) => {
            const buf = alloc_allocUnsafe((str = str.substring(1)).length);
            for (let i = 0; i < str.length; i++) buf[i] = str.charCodeAt(i);
            return buf;
          }
        ),
        src_util_bases = {
          utf8: bases_string,
          'utf-8': bases_string,
          hex: bases.base16,
          latin1: bases_ascii,
          ascii: bases_ascii,
          binary: bases_ascii,
          ...bases,
        };
      function src_from_string_fromString(string, encoding = 'utf8') {
        const base = src_util_bases[encoding];
        if (!base) throw new Error(`Unsupported encoding "${encoding}"`);
        return ('utf8' !== encoding && 'utf-8' !== encoding) ||
          null == globalThis.Buffer ||
          null == globalThis.Buffer.from
          ? base.decoder.decode(`${base.prefix}${string}`)
          : globalThis.Buffer.from(string, 'utf8');
      }
      function src_to_string_toString(array, encoding = 'utf8') {
        const base = src_util_bases[encoding];
        if (!base) throw new Error(`Unsupported encoding "${encoding}"`);
        return ('utf8' !== encoding && 'utf-8' !== encoding) ||
          null == globalThis.Buffer ||
          null == globalThis.Buffer.from
          ? base.encoder.encode(array).substring(1)
          : globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString(
              'utf8'
            );
      }
      var process = __webpack_require__('./node_modules/process/browser.js'),
        __spreadArray = function (to, from, pack) {
          if (pack || 2 === arguments.length)
            for (var ar, i = 0, l = from.length; i < l; i++)
              (!ar && i in from) ||
                (ar || (ar = Array.prototype.slice.call(from, 0, i)), (ar[i] = from[i]));
          return to.concat(ar || Array.prototype.slice.call(from));
        },
        BrowserInfo = function BrowserInfo(name, version, os) {
          (this.name = name), (this.version = version), (this.os = os), (this.type = 'browser');
        },
        NodeInfo = function NodeInfo(version) {
          (this.version = version),
            (this.type = 'node'),
            (this.name = 'node'),
            (this.os = process.platform);
        },
        SearchBotDeviceInfo = function SearchBotDeviceInfo(name, version, os, bot) {
          (this.name = name),
            (this.version = version),
            (this.os = os),
            (this.bot = bot),
            (this.type = 'bot-device');
        },
        BotInfo = function BotInfo() {
          (this.type = 'bot'),
            (this.bot = !0),
            (this.name = 'bot'),
            (this.version = null),
            (this.os = null);
        },
        ReactNativeInfo = function ReactNativeInfo() {
          (this.type = 'react-native'),
            (this.name = 'react-native'),
            (this.version = null),
            (this.os = null);
        },
        SEARCHBOT_OS_REGEX =
          /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,
        REQUIRED_VERSION_PARTS = 3,
        userAgentRules = [
          ['aol', /AOLShield\/([0-9\._]+)/],
          ['edge', /Edge\/([0-9\._]+)/],
          ['edge-ios', /EdgiOS\/([0-9\._]+)/],
          ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
          ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
          ['samsung', /SamsungBrowser\/([0-9\.]+)/],
          ['silk', /\bSilk\/([0-9._-]+)\b/],
          ['miui', /MiuiBrowser\/([0-9\.]+)$/],
          ['beaker', /BeakerBrowser\/([0-9\.]+)/],
          ['edge-chromium', /EdgA?\/([0-9\.]+)/],
          ['chromium-webview', /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
          ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
          ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
          ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
          ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
          ['fxios', /FxiOS\/([0-9\.]+)/],
          ['opera-mini', /Opera Mini.*Version\/([0-9\.]+)/],
          ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
          ['opera', /OPR\/([0-9\.]+)(:?\s|$)/],
          ['pie', /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
          [
            'pie',
            /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/,
          ],
          ['netfront', /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
          ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
          ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
          ['ie', /MSIE\s(7\.0)/],
          ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
          ['android', /Android\s([0-9\.]+)/],
          ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
          ['safari', /Version\/([0-9\._]+).*Safari/],
          ['facebook', /FB[AS]V\/([0-9\.]+)/],
          ['instagram', /Instagram\s([0-9\.]+)/],
          ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/],
          ['ios-webview', /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
          ['curl', /^curl\/([0-9\.]+)$/],
          [
            'searchbot',
            /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,
          ],
        ],
        operatingSystemRules = [
          ['iOS', /iP(hone|od|ad)/],
          ['Android OS', /Android/],
          ['BlackBerry OS', /BlackBerry|BB10/],
          ['Windows Mobile', /IEMobile/],
          ['Amazon OS', /Kindle/],
          ['Windows 3.11', /Win16/],
          ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
          ['Windows 98', /(Windows 98)|(Win98)/],
          ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
          ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
          ['Windows Server 2003', /(Windows NT 5.2)/],
          ['Windows Vista', /(Windows NT 6.0)/],
          ['Windows 7', /(Windows NT 6.1)/],
          ['Windows 8', /(Windows NT 6.2)/],
          ['Windows 8.1', /(Windows NT 6.3)/],
          ['Windows 10', /(Windows NT 10.0)/],
          ['Windows ME', /Windows ME/],
          ['Windows CE', /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
          ['Open BSD', /OpenBSD/],
          ['Sun OS', /SunOS/],
          ['Chrome OS', /CrOS/],
          ['Linux', /(Linux)|(X11)/],
          ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
          ['QNX', /QNX/],
          ['BeOS', /BeOS/],
          ['OS/2', /OS\/2/],
        ];
      function detect(userAgent) {
        return userAgent
          ? parseUserAgent(userAgent)
          : 'undefined' == typeof document &&
            'undefined' != typeof navigator &&
            'ReactNative' === navigator.product
          ? new ReactNativeInfo()
          : 'undefined' != typeof navigator
          ? parseUserAgent(navigator.userAgent)
          : (function getNodeVersion() {
              return void 0 !== process && process.version
                ? new NodeInfo(process.version.slice(1))
                : null;
            })();
      }
      function matchUserAgent(ua) {
        return (
          '' !== ua &&
          userAgentRules.reduce(function (matched, _a) {
            var browser = _a[0],
              regex = _a[1];
            if (matched) return matched;
            var uaMatch = regex.exec(ua);
            return !!uaMatch && [browser, uaMatch];
          }, !1)
        );
      }
      function parseUserAgent(ua) {
        var matchedRule = matchUserAgent(ua);
        if (!matchedRule) return null;
        var name = matchedRule[0],
          match = matchedRule[1];
        if ('searchbot' === name) return new BotInfo();
        var versionParts = match[1] && match[1].split('.').join('_').split('_').slice(0, 3);
        versionParts
          ? versionParts.length < REQUIRED_VERSION_PARTS &&
            (versionParts = __spreadArray(
              __spreadArray([], versionParts, !0),
              (function createVersionParts(count) {
                for (var output = [], ii = 0; ii < count; ii++) output.push('0');
                return output;
              })(REQUIRED_VERSION_PARTS - versionParts.length),
              !0
            ))
          : (versionParts = []);
        var version = versionParts.join('.'),
          os = (function detectOS(ua) {
            for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
              var _a = operatingSystemRules[ii],
                os = _a[0];
              if (_a[1].exec(ua)) return os;
            }
            return null;
          })(ua),
          searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
        return searchBotMatch && searchBotMatch[1]
          ? new SearchBotDeviceInfo(name, version, os, searchBotMatch[1])
          : new BrowserInfo(name, version, os);
      }
      var window_getters_dist_cjs = __webpack_require__(
          './node_modules/@walletconnect/window-getters/dist/cjs/index.js'
        ),
        window_metadata_dist_cjs = __webpack_require__(
          './node_modules/@walletconnect/sign-client/node_modules/@walletconnect/window-metadata/dist/cjs/index.js'
        ),
        query_string = __webpack_require__(
          './node_modules/@walletconnect/sign-client/node_modules/query-string/index.js'
        );
      __webpack_require__('./node_modules/@walletconnect/relay-api/dist/esm/types.js');
      const RELAY_JSONRPC = {
        waku: {
          publish: 'waku_publish',
          subscribe: 'waku_subscribe',
          subscription: 'waku_subscription',
          unsubscribe: 'waku_unsubscribe',
        },
        irn: {
          publish: 'irn_publish',
          subscribe: 'irn_subscribe',
          subscription: 'irn_subscription',
          unsubscribe: 'irn_unsubscribe',
        },
        iridium: {
          publish: 'iridium_publish',
          subscribe: 'iridium_subscribe',
          subscription: 'iridium_subscription',
          unsubscribe: 'iridium_unsubscribe',
        },
      };
      var index_es_process = __webpack_require__('./node_modules/process/browser.js');
      const L = 'base10',
        A = 'base64pad',
        F = 0,
        index_es_b = 1,
        dn = 0,
        ye = 1,
        H = 12,
        q = 32;
      function fn() {
        return src_to_string_toString((0, random.randomBytes)(q), 'base16');
      }
      function En(e) {
        return src_to_string_toString(
          (0, lib_sha256.vp)(src_from_string_fromString(e, 'utf8')),
          'base16'
        );
      }
      function T(e) {
        return Number(src_to_string_toString(e, L));
      }
      function yn(e) {
        const n = (function he(e) {
          return src_from_string_fromString(`${e}`, L);
        })(typeof e.type < 'u' ? e.type : F);
        if (T(n) === index_es_b && typeof e.senderPublicKey > 'u')
          throw new Error('Missing sender public key for type 1 envelope');
        const t =
            typeof e.senderPublicKey < 'u'
              ? src_from_string_fromString(e.senderPublicKey, 'base16')
              : void 0,
          r =
            typeof e.iv < 'u'
              ? src_from_string_fromString(e.iv, 'base16')
              : (0, random.randomBytes)(H);
        return (function Ne(e) {
          if (T(e.type) === index_es_b) {
            if (typeof e.senderPublicKey > 'u')
              throw new Error('Missing sender public key for type 1 envelope');
            return src_to_string_toString(
              concat_concat([e.type, e.senderPublicKey, e.iv, e.sealed]),
              A
            );
          }
          return src_to_string_toString(concat_concat([e.type, e.iv, e.sealed]), A);
        })({
          type: n,
          sealed: new chacha20poly1305.OK(src_from_string_fromString(e.symKey, 'base16')).seal(
            r,
            src_from_string_fromString(e.message, 'utf8')
          ),
          iv: r,
          senderPublicKey: t,
        });
      }
      function G(e) {
        const n = src_from_string_fromString(e, A),
          t = n.slice(dn, ye),
          r = ye;
        if (T(t) === index_es_b) {
          const c = r + q,
            l = c + H,
            h = n.slice(r, c),
            g = n.slice(c, l);
          return { type: t, sealed: n.slice(l), iv: g, senderPublicKey: h };
        }
        const o = r + H,
          i = n.slice(r, o);
        return { type: t, sealed: n.slice(o), iv: i };
      }
      function ge(e) {
        const n = e?.type || F;
        if (n === index_es_b) {
          if (typeof e?.senderPublicKey > 'u') throw new Error('missing sender public key');
          if (typeof e?.receiverPublicKey > 'u') throw new Error('missing receiver public key');
        }
        return {
          type: n,
          senderPublicKey: e?.senderPublicKey,
          receiverPublicKey: e?.receiverPublicKey,
        };
      }
      function gn(e) {
        return (
          e.type === index_es_b &&
          'string' == typeof e.senderPublicKey &&
          'string' == typeof e.receiverPublicKey
        );
      }
      var vn = Object.defineProperty,
        ve = Object.getOwnPropertySymbols,
        On = Object.prototype.hasOwnProperty,
        bn = Object.prototype.propertyIsEnumerable,
        Oe = (e, n, t) =>
          n in e
            ? vn(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t })
            : (e[n] = t),
        be = (e, n) => {
          for (var t in n || (n = {})) On.call(n, t) && Oe(e, t, n[t]);
          if (ve) for (var t of ve(n)) bn.call(n, t) && Oe(e, t, n[t]);
          return e;
        };
      const Se = 'ReactNative',
        S = { reactNative: 'react-native', node: 'node', browser: 'browser', unknown: 'unknown' },
        Pe = 'js';
      function index_es_z() {
        return (
          typeof index_es_process < 'u' &&
          typeof index_es_process.versions < 'u' &&
          typeof index_es_process.versions.node < 'u'
        );
      }
      function Y() {
        return (function Te() {
          return (
            !(0, window_getters_dist_cjs.getDocument)() &&
            !!(0, window_getters_dist_cjs.getNavigator)() &&
            navigator.product === Se
          );
        })()
          ? S.reactNative
          : index_es_z()
          ? S.node
          : (function _e() {
              return !index_es_z() && !!(0, window_getters_dist_cjs.getNavigator)();
            })()
          ? S.browser
          : S.unknown;
      }
      function Ce(e, n, t) {
        const r = (function Re() {
            const e = detect();
            if (null === e) return 'unknown';
            const n = e.os ? e.os.replace(' ', '').toLowerCase() : 'unknown';
            return 'browser' === e.type
              ? [n, e.name, e.version].join('-')
              : [n, e.version].join('-');
          })(),
          o = (function Ae() {
            var e;
            const n = Y();
            return n === S.browser
              ? [
                  n,
                  (null == (e = (0, window_getters_dist_cjs.getLocation)()) ? void 0 : e.host) ||
                    'unknown',
                ].join(':')
              : n;
          })();
        return [[e, n].join('-'), [Pe, t].join('-'), r, o].join('/');
      }
      function _n({ protocol: e, version: n, relayUrl: t, sdkVersion: r, auth: o, projectId: i }) {
        const s = t.split('?'),
          l = { auth: o, ua: Ce(e, n, r), projectId: i },
          h = (function Ue(e, n) {
            let t = query_string.parse(e);
            return (t = be(be({}, t), n)), query_string.stringify(t);
          })(s[1] || '', l);
        return s[0] + '?' + h;
      }
      function index_es_u(e, n) {
        return e.filter((t) => n.includes(t)).length === e.length;
      }
      function Cn(e) {
        return Object.fromEntries(e.entries());
      }
      function wn(e) {
        return new Map(Object.entries(e));
      }
      function jn(e, n) {
        return (0, time_dist_cjs.fromMiliseconds)(
          (n || Date.now()) + (0, time_dist_cjs.toMiliseconds)(e)
        );
      }
      function Vn(e) {
        return (
          (0, time_dist_cjs.fromMiliseconds)(Date.now()) >= (0, time_dist_cjs.toMiliseconds)(e)
        );
      }
      function Mn(e) {
        const n = (0, time_dist_cjs.toMiliseconds)(e || time_dist_cjs.FIVE_MINUTES);
        let t, r, o;
        return {
          resolve: (i) => {
            o && t && (clearTimeout(o), t(i));
          },
          reject: (i) => {
            o && r && (clearTimeout(o), r(i));
          },
          done: () =>
            new Promise((i, s) => {
              (o = setTimeout(s, n)), (t = i), (r = s);
            }),
        };
      }
      function Kn(e, n) {
        return new Promise(async (t, r) => {
          const o = setTimeout(() => r(), n),
            i = await e;
          clearTimeout(o), t(i);
        });
      }
      function W(e, n) {
        if ('string' == typeof n && n.startsWith(`${e}:`)) return n;
        if ('topic' === e.toLowerCase()) {
          if ('string' != typeof n)
            throw new Error('Value must be "string" for expirer target type: topic');
          return `topic:${n}`;
        }
        if ('id' === e.toLowerCase()) {
          if ('number' != typeof n)
            throw new Error('Value must be "number" for expirer target type: id');
          return `id:${n}`;
        }
        throw new Error(`Unknown expirer target type: ${e}`);
      }
      function Fn(e) {
        const [n, t] = e.split(':'),
          r = { id: void 0, topic: void 0 };
        if ('topic' === n && 'string' == typeof t) r.topic = t;
        else {
          if ('id' !== n || !Number.isInteger(Number(t)))
            throw new Error(`Invalid target, expected id:number or topic:string, got ${n}:${t}`);
          r.id = Number(t);
        }
        return r;
      }
      function Hn(e, n) {
        return `${e}${n ? `:${n}` : ''}`;
      }
      function qn(e) {
        return e?.relay || { protocol: 'irn' };
      }
      function Gn(e) {
        const n = RELAY_JSONRPC[e];
        if (typeof n > 'u') throw new Error(`Relay Protocol not supported: ${e}`);
        return n;
      }
      var Bn = Object.defineProperty,
        je = Object.getOwnPropertySymbols,
        zn = Object.prototype.hasOwnProperty,
        Yn = Object.prototype.propertyIsEnumerable,
        Ve = (e, n, t) =>
          n in e
            ? Bn(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t })
            : (e[n] = t);
      function Me(e, n = '-') {
        const t = {},
          r = 'relay' + n;
        return (
          Object.keys(e).forEach((o) => {
            if (o.startsWith(r)) {
              const i = o.replace(r, ''),
                s = e[o];
              t[i] = s;
            }
          }),
          t
        );
      }
      function Qn(e) {
        return (
          `${e.protocol}:${e.topic}@${e.version}?` +
          query_string.stringify(
            ((e, n) => {
              for (var t in n || (n = {})) zn.call(n, t) && Ve(e, t, n[t]);
              if (je) for (var t of je(n)) Yn.call(n, t) && Ve(e, t, n[t]);
              return e;
            })(
              { symKey: e.symKey },
              (function Ke(e, n = '-') {
                const r = {};
                return (
                  Object.keys(e).forEach((o) => {
                    const i = 'relay' + n + o;
                    e[o] && (r[i] = e[o]);
                  }),
                  r
                );
              })(e.relay)
            )
          )
        );
      }
      function index_es_m(e) {
        const n = [];
        return (
          e.forEach((t) => {
            const [r, o] = t.split(':');
            n.push(`${r}:${o}`);
          }),
          n
        );
      }
      const Xn = {
          INVALID_METHOD: { message: 'Invalid method.', code: 1001 },
          INVALID_EVENT: { message: 'Invalid event.', code: 1002 },
          INVALID_UPDATE_REQUEST: { message: 'Invalid update request.', code: 1003 },
          INVALID_EXTEND_REQUEST: { message: 'Invalid extend request.', code: 1004 },
          INVALID_SESSION_SETTLE_REQUEST: {
            message: 'Invalid session settle request.',
            code: 1005,
          },
          UNAUTHORIZED_METHOD: { message: 'Unauthorized method.', code: 3001 },
          UNAUTHORIZED_EVENT: { message: 'Unauthorized event.', code: 3002 },
          UNAUTHORIZED_UPDATE_REQUEST: { message: 'Unauthorized update request.', code: 3003 },
          UNAUTHORIZED_EXTEND_REQUEST: { message: 'Unauthorized extend request.', code: 3004 },
          USER_REJECTED: { message: 'User rejected.', code: 5e3 },
          USER_REJECTED_CHAINS: { message: 'User rejected chains.', code: 5001 },
          USER_REJECTED_METHODS: { message: 'User rejected methods.', code: 5002 },
          USER_REJECTED_EVENTS: { message: 'User rejected events.', code: 5003 },
          UNSUPPORTED_CHAINS: { message: 'Unsupported chains.', code: 5100 },
          UNSUPPORTED_METHODS: { message: 'Unsupported methods.', code: 5101 },
          UNSUPPORTED_EVENTS: { message: 'Unsupported events.', code: 5102 },
          UNSUPPORTED_ACCOUNTS: { message: 'Unsupported accounts.', code: 5103 },
          UNSUPPORTED_NAMESPACE_KEY: { message: 'Unsupported namespace key.', code: 5104 },
          USER_DISCONNECTED: { message: 'User disconnected.', code: 6e3 },
          SESSION_SETTLEMENT_FAILED: { message: 'Session settlement failed.', code: 7e3 },
          WC_METHOD_UNSUPPORTED: { message: 'Unsupported wc_ method.', code: 10001 },
        },
        et = {
          NOT_INITIALIZED: { message: 'Not initialized.', code: 1 },
          NO_MATCHING_KEY: { message: 'No matching key.', code: 2 },
          RESTORE_WILL_OVERRIDE: { message: 'Restore will override.', code: 3 },
          RESUBSCRIBED: { message: 'Resubscribed.', code: 4 },
          MISSING_OR_INVALID: { message: 'Missing or invalid.', code: 5 },
          EXPIRED: { message: 'Expired.', code: 6 },
          UNKNOWN_TYPE: { message: 'Unknown type.', code: 7 },
          MISMATCHED_TOPIC: { message: 'Mismatched topic.', code: 8 },
          NON_CONFORMING_NAMESPACES: { message: 'Non conforming namespaces.', code: 9 },
        };
      function index_es_E(e, n) {
        const { message: t, code: r } = et[e];
        return { message: n ? `${t} ${n}` : t, code: r };
      }
      function N(e, n) {
        const { message: t, code: r } = Xn[e];
        return { message: n ? `${t} ${n}` : t, code: r };
      }
      function index_es_I(e, n) {
        return !!Array.isArray(e) && (!(typeof n < 'u' && e.length) || e.every(n));
      }
      function J(e) {
        return Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length;
      }
      function index_es_y(e) {
        return typeof e > 'u';
      }
      function index_es_d(e, n) {
        return !(!n || !index_es_y(e)) || ('string' == typeof e && Boolean(e.trim().length));
      }
      function D(e, n) {
        return !(!n || !index_es_y(e)) || ('number' == typeof e && !isNaN(e));
      }
      function $(e) {
        return !(!index_es_d(e, !1) || !e.includes(':')) && 2 === e.split(':').length;
      }
      function index_es_x(e, n) {
        let t = null;
        return (
          index_es_y(e?.extension) ||
            ((!index_es_I(e.extension) || !e.extension.length) &&
              (t = index_es_E(
                'MISSING_OR_INVALID',
                `${n} extension should be an array of namespaces, or omitted`
              ))),
          t
        );
      }
      function Q(e) {
        let n = !0;
        return index_es_I(e) ? e.length && (n = e.every((t) => index_es_d(t, !1))) : (n = !1), n;
      }
      function Z(e, n, t) {
        let r = null;
        return (
          index_es_I(n)
            ? n.forEach((o) => {
                r ||
                  ((!$(o) || !o.includes(e)) &&
                    (r = N(
                      'UNSUPPORTED_CHAINS',
                      `${t}, chain ${o} should be a string and conform to "namespace:chainId" format`
                    )));
              })
            : (r = N(
                'UNSUPPORTED_CHAINS',
                `${t}, chains ${n} should be an array of strings conforming to "namespace:chainId" format`
              )),
          r
        );
      }
      function X(e, n) {
        let t = null;
        return (
          index_es_I(e)
            ? e.forEach((r) => {
                t ||
                  (function He(e) {
                    if (index_es_d(e, !1) && e.includes(':')) {
                      const n = e.split(':');
                      if (3 === n.length) {
                        const t = n[0] + ':' + n[1];
                        return !!n[2] && $(t);
                      }
                    }
                    return !1;
                  })(r) ||
                  (t = N(
                    'UNSUPPORTED_ACCOUNTS',
                    `${n}, account ${r} should be a string and conform to "namespace:chainId:address" format`
                  ));
              })
            : (t = N(
                'UNSUPPORTED_ACCOUNTS',
                `${n}, accounts should be an array of strings conforming to "namespace:chainId:address" format`
              )),
          t
        );
      }
      function ee(e, n) {
        let t = null;
        return (
          Q(e?.methods)
            ? Q(e?.events) ||
              (t = N(
                'UNSUPPORTED_EVENTS',
                `${n}, events should be an array of strings or empty array for no events`
              ))
            : (t = N(
                'UNSUPPORTED_METHODS',
                `${n}, methods should be an array of strings or empty array for no methods`
              )),
          t
        );
      }
      function ne(e, n) {
        let t = null;
        return (
          Object.values(e).forEach((r) => {
            if (t) return;
            const o = ee(r, `${n}, namespace`),
              i = index_es_x(r, n);
            o
              ? (t = o)
              : i
              ? (t = i)
              : r.extension &&
                r.extension.forEach((s) => {
                  if (t) return;
                  const c = ee(s, `${n}, extension`);
                  c && (t = c);
                });
          }),
          t
        );
      }
      function it(e, n) {
        let t = null;
        if (e && J(e)) {
          const r = ne(e, n);
          r && (t = r);
          const o = (function qe(e, n) {
            let t = null;
            return (
              Object.entries(e).forEach(([r, o]) => {
                if (t) return;
                const i = Z(r, o?.chains, `${n} requiredNamespace`),
                  s = index_es_x(o, n);
                i
                  ? (t = i)
                  : s
                  ? (t = s)
                  : o.extension &&
                    o.extension.forEach((c) => {
                      if (t) return;
                      const l = Z(r, c.chains, `${n} extension`);
                      l && (t = l);
                    });
              }),
              t
            );
          })(e, n);
          o && (t = o);
        } else
          t = index_es_E(
            'MISSING_OR_INVALID',
            `${n}, requiredNamespaces should be an object with data`
          );
        return t;
      }
      function Be(e, n) {
        let t = null;
        if (e && J(e)) {
          const r = ne(e, n);
          r && (t = r);
          const o = (function Ge(e, n) {
            let t = null;
            return (
              Object.values(e).forEach((r) => {
                if (t) return;
                const o = X(r?.accounts, `${n} namespace`),
                  i = index_es_x(r, n);
                o
                  ? (t = o)
                  : i
                  ? (t = i)
                  : r.extension &&
                    r.extension.forEach((s) => {
                      if (t) return;
                      const c = X(s.accounts, `${n} extension`);
                      c && (t = c);
                    });
              }),
              t
            );
          })(e, n);
          o && (t = o);
        } else
          t = index_es_E('MISSING_OR_INVALID', `${n}, namespaces should be an object with data`);
        return t;
      }
      function ze(e) {
        return index_es_d(e.protocol, !0);
      }
      function ut(e) {
        return typeof e < 'u' && null !== typeof e;
      }
      function mt(e, n) {
        return !(
          !$(n) ||
          !(function ke(e) {
            const n = [];
            return (
              Object.values(e).forEach((t) => {
                n.push(...index_es_m(t.accounts)),
                  t.extension &&
                    t.extension.forEach((r) => {
                      n.push(...index_es_m(r.accounts));
                    });
              }),
              n
            );
          })(e).includes(n)
        );
      }
      function Et(e, n, t) {
        return (
          !!index_es_d(t, !1) &&
          (function Le(e, n) {
            const t = [];
            return (
              Object.values(e).forEach((r) => {
                index_es_m(r.accounts).includes(n) && t.push(...r.methods),
                  r.extension &&
                    r.extension.forEach((o) => {
                      index_es_m(o.accounts).includes(n) && t.push(...o.methods);
                    });
              }),
              t
            );
          })(e, n).includes(t)
        );
      }
      function yt(e, n, t) {
        return (
          !!index_es_d(t, !1) &&
          (function Fe(e, n) {
            const t = [];
            return (
              Object.values(e).forEach((r) => {
                index_es_m(r.accounts).includes(n) && t.push(...r.events),
                  r.extension &&
                    r.extension.forEach((o) => {
                      index_es_m(o.accounts).includes(n) && t.push(...o.events);
                    });
              }),
              t
            );
          })(e, n).includes(t)
        );
      }
      function ht(e, n, t) {
        let r = null;
        const o = Object.keys(e);
        return (
          index_es_u(o, Object.keys(n))
            ? o.forEach((s) => {
                var c;
                if (r) return;
                index_es_u(e[s].chains, index_es_m(n[s].accounts))
                  ? index_es_u(e[s].methods, n[s].methods)
                    ? index_es_u(e[s].events, n[s].events)
                      ? e[s].extension && !n[s].extension
                        ? (r = index_es_E(
                            'NON_CONFORMING_NAMESPACES',
                            `${t} namespaces extension doesn't satisfy requiredNamespaces extension for ${s}`
                          ))
                        : e[s].extension &&
                          n[s].extension &&
                          (null == (c = e[s].extension) ||
                            c.forEach(({ methods: g, events: P, chains: v }) => {
                              var _;
                              r ||
                                (null != (_ = n[s].extension) &&
                                  _.find((O) => {
                                    const j = index_es_m(O.accounts);
                                    return (
                                      index_es_u(v, j) &&
                                      index_es_u(P, O.events) &&
                                      index_es_u(g, O.methods)
                                    );
                                  })) ||
                                (r = index_es_E(
                                  'NON_CONFORMING_NAMESPACES',
                                  `${t} namespaces extension doesn't satisfy requiredNamespaces extension for ${s}`
                                ));
                            }))
                      : (r = index_es_E(
                          'NON_CONFORMING_NAMESPACES',
                          `${t} namespaces events don't satisfy requiredNamespaces events for ${s}`
                        ))
                    : (r = index_es_E(
                        'NON_CONFORMING_NAMESPACES',
                        `${t} namespaces methods don't satisfy requiredNamespaces methods for ${s}`
                      ))
                  : (r = index_es_E(
                      'NON_CONFORMING_NAMESPACES',
                      `${t} namespaces accounts don't satisfy requiredNamespaces chains for ${s}`
                    ));
              })
            : (r = index_es_E(
                'NON_CONFORMING_NAMESPACES',
                `${t} namespaces keys don't satisfy requiredNamespaces`
              )),
          r
        );
      }
      var dist_esm = __webpack_require__(
          './node_modules/@walletconnect/jsonrpc-provider/dist/esm/index.js'
        ),
        jsonrpc_utils_dist_esm = __webpack_require__(
          './node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js'
        );
      const WS =
        void 0 !== __webpack_require__.g && void 0 !== __webpack_require__.g.WebSocket
          ? __webpack_require__.g.WebSocket
          : 'undefined' != typeof window && void 0 !== window.WebSocket
          ? window.WebSocket
          : __webpack_require__('./node_modules/ws/browser.js');
      const jsonrpc_ws_connection_dist_esm = class WsConnection {
        constructor(url) {
          if (
            ((this.url = url),
            (this.events = new events.EventEmitter()),
            (this.registering = !1),
            !(0, jsonrpc_utils_dist_esm.isWsUrl)(url))
          )
            throw new Error(`Provided URL is not compatible with WebSocket connection: ${url}`);
          this.url = url;
        }
        get connected() {
          return void 0 !== this.socket;
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
          if (void 0 === this.socket) throw new Error('Connection already closed');
          this.socket.close(), this.onClose();
        }
        async send(payload, context) {
          void 0 === this.socket && (this.socket = await this.register());
          try {
            this.socket.send((0, esm.u)(payload));
          } catch (e) {
            this.onError(payload.id, e);
          }
        }
        register(url = this.url) {
          if (!(0, jsonrpc_utils_dist_esm.isWsUrl)(url))
            throw new Error(`Provided URL is not compatible with WebSocket connection: ${url}`);
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
                    if ((this.resetMaxListeners(), void 0 === this.socket))
                      return reject(new Error('WebSocket connection is missing or invalid'));
                    resolve(this.socket);
                  });
              })
            );
          }
          return (
            (this.url = url),
            (this.registering = !0),
            new Promise((resolve, reject) => {
              const opts = (0, jsonrpc_utils_dist_esm.isReactNative)()
                  ? void 0
                  : { rejectUnauthorized: !(0, jsonrpc_utils_dist_esm.isLocalhostUrl)(url) },
                socket = new WS(url, [], opts);
              'undefined' != typeof window
                ? (socket.onerror = (event) => {
                    const errorEvent = event;
                    reject(this.emitError(errorEvent.error));
                  })
                : socket.on('error', (errorEvent) => {
                    reject(this.emitError(errorEvent));
                  }),
                (socket.onopen = () => {
                  this.onOpen(socket), resolve(socket);
                });
            })
          );
        }
        onOpen(socket) {
          (socket.onmessage = (event) => this.onPayload(event)),
            (socket.onclose = () => this.onClose()),
            (this.socket = socket),
            (this.registering = !1),
            this.events.emit('open');
        }
        onClose() {
          (this.socket = void 0), (this.registering = !1), this.events.emit('close');
        }
        onPayload(e) {
          if (void 0 === e.data) return;
          const payload = 'string' == typeof e.data ? (0, esm.D)(e.data) : e.data;
          this.events.emit('payload', payload);
        }
        onError(id, e) {
          const error = this.parseError(e),
            message = error.message || error.toString(),
            payload = (0, jsonrpc_utils_dist_esm.formatJsonRpcError)(id, message);
          this.events.emit('payload', payload);
        }
        parseError(e, url = this.url) {
          return (0, jsonrpc_utils_dist_esm.parseConnectionError)(e, url, 'WS');
        }
        resetMaxListeners() {
          this.events.getMaxListeners() > 10 && this.events.setMaxListeners(10);
        }
        emitError(errorEvent) {
          const error = this.parseError(
            new Error(
              (null == errorEvent ? void 0 : errorEvent.message) ||
                `WebSocket connection failed for URL: ${this.url}`
            )
          );
          return this.events.emit('register_error', error), error;
        }
      };
      var lodash_isequal = __webpack_require__('./node_modules/lodash.isequal/index.js'),
        lodash_isequal_default = __webpack_require__.n(lodash_isequal);
      var vi = function wi(r, e) {
          if (r.length >= 255) throw new TypeError('Alphabet too long');
          for (var t = new Uint8Array(256), i = 0; i < t.length; i++) t[i] = 255;
          for (var s = 0; s < r.length; s++) {
            var n = r.charAt(s),
              a = n.charCodeAt(0);
            if (255 !== t[a]) throw new TypeError(n + ' is ambiguous');
            t[a] = s;
          }
          var o = r.length,
            h = r.charAt(0),
            d = Math.log(o) / Math.log(256),
            l = Math.log(256) / Math.log(o);
          function U(u) {
            if ('string' != typeof u) throw new TypeError('Expected String');
            if (0 === u.length) return new Uint8Array();
            var y = 0;
            if (' ' !== u[y]) {
              for (var O = 0, E = 0; u[y] === h; ) O++, y++;
              for (var _ = ((u.length - y) * d + 1) >>> 0, R = new Uint8Array(_); u[y]; ) {
                var b = t[u.charCodeAt(y)];
                if (255 === b) return;
                for (var S = 0, x = _ - 1; (0 !== b || S < E) && -1 !== x; x--, S++)
                  (b += (o * R[x]) >>> 0), (R[x] = b % 256 >>> 0), (b = (b / 256) >>> 0);
                if (0 !== b) throw new Error('Non-zero carry');
                (E = S), y++;
              }
              if (' ' !== u[y]) {
                for (var f = _ - E; f !== _ && 0 === R[f]; ) f++;
                for (var T = new Uint8Array(O + (_ - f)), K = O; f !== _; ) T[K++] = R[f++];
                return T;
              }
            }
          }
          return {
            encode: function g(u) {
              if (
                (u instanceof Uint8Array ||
                  (ArrayBuffer.isView(u)
                    ? (u = new Uint8Array(u.buffer, u.byteOffset, u.byteLength))
                    : Array.isArray(u) && (u = Uint8Array.from(u))),
                !(u instanceof Uint8Array))
              )
                throw new TypeError('Expected Uint8Array');
              if (0 === u.length) return '';
              for (var y = 0, O = 0, E = 0, _ = u.length; E !== _ && 0 === u[E]; ) E++, y++;
              for (var R = ((_ - E) * l + 1) >>> 0, b = new Uint8Array(R); E !== _; ) {
                for (var S = u[E], x = 0, f = R - 1; (0 !== S || x < O) && -1 !== f; f--, x++)
                  (S += (256 * b[f]) >>> 0), (b[f] = S % o >>> 0), (S = (S / o) >>> 0);
                if (0 !== S) throw new Error('Non-zero carry');
                (O = x), E++;
              }
              for (var T = R - O; T !== R && 0 === b[T]; ) T++;
              for (var K = h.repeat(y); T < R; ++T) K += r.charAt(b[T]);
              return K;
            },
            decodeUnsafe: U,
            decode: function q(u) {
              var y = U(u);
              if (y) return y;
              throw new Error(`Non-${e} character`);
            },
          };
        },
        Ii = vi;
      const index_es_Ie = (r) => {
        if (r instanceof Uint8Array && 'Uint8Array' === r.constructor.name) return r;
        if (r instanceof ArrayBuffer) return new Uint8Array(r);
        if (ArrayBuffer.isView(r)) return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
        throw new Error('Unknown type, must be binary type');
      };
      class Ri {
        constructor(e, t, i) {
          (this.name = e), (this.prefix = t), (this.baseEncode = i);
        }
        encode(e) {
          if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
          throw Error('Unknown type, must be binary type');
        }
      }
      class Si {
        constructor(e, t, i) {
          if (((this.name = e), (this.prefix = t), void 0 === t.codePointAt(0)))
            throw new Error('Invalid prefix character');
          (this.prefixCodePoint = t.codePointAt(0)), (this.baseDecode = i);
        }
        decode(e) {
          if ('string' == typeof e) {
            if (e.codePointAt(0) !== this.prefixCodePoint)
              throw Error(
                `Unable to decode multibase string ${JSON.stringify(e)}, ${
                  this.name
                } decoder only supports inputs prefixed with ${this.prefix}`
              );
            return this.baseDecode(e.slice(this.prefix.length));
          }
          throw Error('Can only multibase decode strings');
        }
        or(e) {
          return index_es_Ce(this, e);
        }
      }
      class Ti {
        constructor(e) {
          this.decoders = e;
        }
        or(e) {
          return index_es_Ce(this, e);
        }
        decode(e) {
          const t = e[0],
            i = this.decoders[t];
          if (i) return i.decode(e);
          throw RangeError(
            `Unable to decode multibase string ${JSON.stringify(
              e
            )}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`
          );
        }
      }
      const index_es_Ce = (r, e) =>
        new Ti({ ...(r.decoders || { [r.prefix]: r }), ...(e.decoders || { [e.prefix]: e }) });
      class Pi {
        constructor(e, t, i, s) {
          (this.name = e),
            (this.prefix = t),
            (this.baseEncode = i),
            (this.baseDecode = s),
            (this.encoder = new Ri(e, t, i)),
            (this.decoder = new Si(e, t, s));
        }
        encode(e) {
          return this.encoder.encode(e);
        }
        decode(e) {
          return this.decoder.decode(e);
        }
      }
      const index_es_k = ({ name: r, prefix: e, encode: t, decode: i }) => new Pi(r, e, t, i),
        index_es_F = ({ prefix: r, name: e, alphabet: t }) => {
          const { encode: i, decode: s } = Ii(t, e);
          return index_es_k({ prefix: r, name: e, encode: i, decode: (n) => index_es_Ie(s(n)) });
        },
        dist_index_es_p = ({ name: r, prefix: e, bitsPerChar: t, alphabet: i }) =>
          index_es_k({
            prefix: e,
            name: r,
            encode: (s) =>
              ((r, e, t) => {
                const i = '=' === e[e.length - 1],
                  s = (1 << t) - 1;
                let n = '',
                  a = 0,
                  o = 0;
                for (let h = 0; h < r.length; ++h)
                  for (o = (o << 8) | r[h], a += 8; a > t; ) (a -= t), (n += e[s & (o >> a)]);
                if ((a && (n += e[s & (o << (t - a))]), i)) for (; (n.length * t) & 7; ) n += '=';
                return n;
              })(s, i, t),
            decode: (s) =>
              ((r, e, t, i) => {
                const s = {};
                for (let l = 0; l < e.length; ++l) s[e[l]] = l;
                let n = r.length;
                for (; '=' === r[n - 1]; ) --n;
                const a = new Uint8Array(((n * t) / 8) | 0);
                let o = 0,
                  h = 0,
                  d = 0;
                for (let l = 0; l < n; ++l) {
                  const g = s[r[l]];
                  if (void 0 === g) throw new SyntaxError(`Non-${i} character`);
                  (h = (h << t) | g), (o += t), o >= 8 && ((o -= 8), (a[d++] = 255 & (h >> o)));
                }
                if (o >= t || 255 & (h << (8 - o))) throw new SyntaxError('Unexpected end of data');
                return a;
              })(s, i, t, r),
          }),
        Ai = index_es_k({
          prefix: '\0',
          name: 'identity',
          encode: (r) => ((r) => new TextDecoder().decode(r))(r),
          decode: (r) => ((r) => new TextEncoder().encode(r))(r),
        });
      var zi = Object.freeze({ __proto__: null, identity: Ai });
      const Ni = dist_index_es_p({ prefix: '0', name: 'base2', alphabet: '01', bitsPerChar: 1 });
      var Ui = Object.freeze({ __proto__: null, base2: Ni });
      const Li = dist_index_es_p({
        prefix: '7',
        name: 'base8',
        alphabet: '01234567',
        bitsPerChar: 3,
      });
      var Fi = Object.freeze({ __proto__: null, base8: Li });
      const Mi = index_es_F({ prefix: '9', name: 'base10', alphabet: '0123456789' });
      var Ki = Object.freeze({ __proto__: null, base10: Mi });
      const $i = dist_index_es_p({
          prefix: 'f',
          name: 'base16',
          alphabet: '0123456789abcdef',
          bitsPerChar: 4,
        }),
        ki = dist_index_es_p({
          prefix: 'F',
          name: 'base16upper',
          alphabet: '0123456789ABCDEF',
          bitsPerChar: 4,
        });
      var Bi = Object.freeze({ __proto__: null, base16: $i, base16upper: ki });
      const ji = dist_index_es_p({
          prefix: 'b',
          name: 'base32',
          alphabet: 'abcdefghijklmnopqrstuvwxyz234567',
          bitsPerChar: 5,
        }),
        Vi = dist_index_es_p({
          prefix: 'B',
          name: 'base32upper',
          alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
          bitsPerChar: 5,
        }),
        qi = dist_index_es_p({
          prefix: 'c',
          name: 'base32pad',
          alphabet: 'abcdefghijklmnopqrstuvwxyz234567=',
          bitsPerChar: 5,
        }),
        Gi = dist_index_es_p({
          prefix: 'C',
          name: 'base32padupper',
          alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=',
          bitsPerChar: 5,
        }),
        Yi = dist_index_es_p({
          prefix: 'v',
          name: 'base32hex',
          alphabet: '0123456789abcdefghijklmnopqrstuv',
          bitsPerChar: 5,
        }),
        Ji = dist_index_es_p({
          prefix: 'V',
          name: 'base32hexupper',
          alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
          bitsPerChar: 5,
        }),
        Hi = dist_index_es_p({
          prefix: 't',
          name: 'base32hexpad',
          alphabet: '0123456789abcdefghijklmnopqrstuv=',
          bitsPerChar: 5,
        }),
        Xi = dist_index_es_p({
          prefix: 'T',
          name: 'base32hexpadupper',
          alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV=',
          bitsPerChar: 5,
        }),
        Wi = dist_index_es_p({
          prefix: 'h',
          name: 'base32z',
          alphabet: 'ybndrfg8ejkmcpqxot1uwisza345h769',
          bitsPerChar: 5,
        });
      var Zi = Object.freeze({
        __proto__: null,
        base32: ji,
        base32upper: Vi,
        base32pad: qi,
        base32padupper: Gi,
        base32hex: Yi,
        base32hexupper: Ji,
        base32hexpad: Hi,
        base32hexpadupper: Xi,
        base32z: Wi,
      });
      const Qi = index_es_F({
          prefix: 'k',
          name: 'base36',
          alphabet: '0123456789abcdefghijklmnopqrstuvwxyz',
        }),
        es = index_es_F({
          prefix: 'K',
          name: 'base36upper',
          alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        });
      var ts = Object.freeze({ __proto__: null, base36: Qi, base36upper: es });
      const is = index_es_F({
          name: 'base58btc',
          prefix: 'z',
          alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
        }),
        ss = index_es_F({
          name: 'base58flickr',
          prefix: 'Z',
          alphabet: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
        });
      var rs = Object.freeze({ __proto__: null, base58btc: is, base58flickr: ss });
      const ns = dist_index_es_p({
          prefix: 'm',
          name: 'base64',
          alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          bitsPerChar: 6,
        }),
        as = dist_index_es_p({
          prefix: 'M',
          name: 'base64pad',
          alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
          bitsPerChar: 6,
        }),
        os = dist_index_es_p({
          prefix: 'u',
          name: 'base64url',
          alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
          bitsPerChar: 6,
        }),
        hs = dist_index_es_p({
          prefix: 'U',
          name: 'base64urlpad',
          alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',
          bitsPerChar: 6,
        });
      var cs = Object.freeze({
        __proto__: null,
        base64: ns,
        base64pad: as,
        base64url: os,
        base64urlpad: hs,
      });
      const index_es_e = Array.from(
          '🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂'
        ),
        us = index_es_e.reduce((r, e, t) => ((r[t] = e), r), []),
        ls = index_es_e.reduce((r, e, t) => ((r[e.codePointAt(0)] = t), r), []);
      const ps = index_es_k({
        prefix: '🚀',
        name: 'base256emoji',
        encode: function ds(r) {
          return r.reduce((e, t) => (e += us[t]), '');
        },
        decode: function gs(r) {
          const e = [];
          for (const t of r) {
            const i = ls[t.codePointAt(0)];
            if (void 0 === i) throw new Error(`Non-base256emoji character: ${t}`);
            e.push(i);
          }
          return new Uint8Array(e);
        },
      });
      var Ds = Object.freeze({ __proto__: null, base256emoji: ps }),
        ys = function index_es_Se(r, e, t) {
          e = e || [];
          for (var i = (t = t || 0); r >= Es; ) (e[t++] = (255 & r) | index_es_Re), (r /= 128);
          for (; r & ms; ) (e[t++] = (255 & r) | index_es_Re), (r >>>= 7);
          return (e[t] = 0 | r), (index_es_Se.bytes = t - i + 1), e;
        },
        index_es_Re = 128,
        ms = -128,
        Es = Math.pow(2, 31);
      var fs = function index_es_ie(r, i) {
          var a,
            t = 0,
            s = 0,
            n = (i = i || 0),
            o = r.length;
          do {
            if (n >= o) throw ((index_es_ie.bytes = 0), new RangeError('Could not decode varint'));
            (a = r[n++]),
              (t += s < 28 ? (a & index_es_Te) << s : (a & index_es_Te) * Math.pow(2, s)),
              (s += 7);
          } while (a >= index_es_ws);
          return (index_es_ie.bytes = n - i), t;
        },
        index_es_ws = 128,
        index_es_Te = 127;
      var vs = Math.pow(2, 7),
        Is = Math.pow(2, 14),
        Cs = Math.pow(2, 21),
        _s = Math.pow(2, 28),
        Rs = Math.pow(2, 35),
        Ss = Math.pow(2, 42),
        Ts = Math.pow(2, 49),
        Ps = Math.pow(2, 56),
        xs = Math.pow(2, 63),
        As = {
          encode: ys,
          decode: fs,
          encodingLength: function (r) {
            return r < vs
              ? 1
              : r < Is
              ? 2
              : r < Cs
              ? 3
              : r < _s
              ? 4
              : r < Rs
              ? 5
              : r < Ss
              ? 6
              : r < Ts
              ? 7
              : r < Ps
              ? 8
              : r < xs
              ? 9
              : 10;
          },
        },
        index_es_Pe = As;
      const index_es_xe = (r, e, t = 0) => (index_es_Pe.encode(r, e, t), e),
        index_es_Oe = (r) => index_es_Pe.encodingLength(r),
        index_es_se = (r, e) => {
          const t = e.byteLength,
            i = index_es_Oe(r),
            s = i + index_es_Oe(t),
            n = new Uint8Array(s + t);
          return index_es_xe(r, n, 0), index_es_xe(t, n, i), n.set(e, s), new zs(r, t, e, n);
        };
      class zs {
        constructor(e, t, i, s) {
          (this.code = e), (this.size = t), (this.digest = i), (this.bytes = s);
        }
      }
      const index_es_Ae = ({ name: r, code: e, encode: t }) => new Ns(r, e, t);
      class Ns {
        constructor(e, t, i) {
          (this.name = e), (this.code = t), (this.encode = i);
        }
        digest(e) {
          if (e instanceof Uint8Array) {
            const t = this.encode(e);
            return t instanceof Uint8Array
              ? index_es_se(this.code, t)
              : t.then((i) => index_es_se(this.code, i));
          }
          throw Error('Unknown type, must be binary type');
        }
      }
      const index_es_ze = (r) => async (e) => new Uint8Array(await crypto.subtle.digest(r, e)),
        Us = index_es_Ae({ name: 'sha2-256', code: 18, encode: index_es_ze('SHA-256') }),
        Ls = index_es_Ae({ name: 'sha2-512', code: 19, encode: index_es_ze('SHA-512') });
      Object.freeze({ __proto__: null, sha256: Us, sha512: Ls });
      const index_es_Ue = index_es_Ie,
        $s = {
          code: 0,
          name: 'identity',
          encode: index_es_Ue,
          digest: (r) => index_es_se(0, index_es_Ue(r)),
        };
      Object.freeze({ __proto__: null, identity: $s });
      new TextEncoder(), new TextDecoder();
      const index_es_Le = { ...zi, ...Ui, ...Fi, ...Ki, ...Bi, ...Zi, ...ts, ...rs, ...cs, ...Ds };
      function index_es_Fe(r, e, t, i) {
        return {
          name: r,
          prefix: e,
          encoder: { name: r, prefix: e, encode: t },
          decoder: { decode: i },
        };
      }
      const index_es_Me = index_es_Fe(
          'utf8',
          'u',
          (r) => 'u' + new TextDecoder('utf8').decode(r),
          (r) => new TextEncoder().encode(r.substring(1))
        ),
        index_es_re = index_es_Fe(
          'ascii',
          'a',
          (r) => {
            let e = 'a';
            for (let t = 0; t < r.length; t++) e += String.fromCharCode(r[t]);
            return e;
          },
          (r) => {
            const e = (function Bs(r = 0) {
              return null != globalThis.Buffer && null != globalThis.Buffer.allocUnsafe
                ? globalThis.Buffer.allocUnsafe(r)
                : new Uint8Array(r);
            })((r = r.substring(1)).length);
            for (let t = 0; t < r.length; t++) e[t] = r.charCodeAt(t);
            return e;
          }
        ),
        js = {
          utf8: index_es_Me,
          'utf-8': index_es_Me,
          hex: index_es_Le.base16,
          latin1: index_es_re,
          ascii: index_es_re,
          binary: index_es_re,
          ...index_es_Le,
        };
      const P = 'wc@2:core:',
        index_es_$e_logger = 'error',
        index_es_ke = { database: ':memory:' },
        index_es_je = time_dist_cjs.ONE_DAY,
        Je = time_dist_cjs.SIX_HOURS,
        index_es_D_message = 'relayer_message',
        index_es_D_connect = 'relayer_connect',
        index_es_D_disconnect = 'relayer_disconnect',
        index_es_D_error = 'relayer_error',
        index_es_D_connection_stalled = 'relayer_connection_stalled',
        index_es_D_transport_closed = 'relayer_transport_closed',
        index_es_D_publish = 'relayer_publish',
        index_es_M_payload = 'payload',
        index_es_M_connect = 'connect',
        index_es_M_disconnect = 'disconnect',
        index_es_M_error = 'error',
        index_es_oe = time_dist_cjs.ONE_SECOND,
        dist_index_es_I_created = 'subscription_created',
        dist_index_es_I_deleted = 'subscription_deleted',
        dist_index_es_I_sync = 'subscription_sync',
        dist_index_es_I_resubscribed = 'subscription_resubscribed',
        index_es_nt = 1e3 * time_dist_cjs.FIVE_SECONDS,
        index_es_N = {
          wc_pairingDelete: {
            req: { ttl: time_dist_cjs.ONE_DAY, prompt: !1, tag: 1e3 },
            res: { ttl: time_dist_cjs.ONE_DAY, prompt: !1, tag: 1001 },
          },
          wc_pairingPing: {
            req: { ttl: time_dist_cjs.THIRTY_SECONDS, prompt: !1, tag: 1002 },
            res: { ttl: time_dist_cjs.THIRTY_SECONDS, prompt: !1, tag: 1003 },
          },
          unregistered_method: {
            req: { ttl: time_dist_cjs.ONE_DAY, prompt: !1, tag: 0 },
            res: { ttl: time_dist_cjs.ONE_DAY, prompt: !1, tag: 0 },
          },
        },
        dist_index_es_C_created = 'history_created',
        dist_index_es_C_updated = 'history_updated',
        dist_index_es_C_deleted = 'history_deleted',
        dist_index_es_C_sync = 'history_sync',
        dist_index_es_m_created = 'expirer_created',
        dist_index_es_m_deleted = 'expirer_deleted',
        dist_index_es_m_expired = 'expirer_expired',
        dist_index_es_m_sync = 'expirer_sync';
      class index_es_dt {
        constructor(e, t) {
          (this.core = e),
            (this.logger = t),
            (this.keychain = new Map()),
            (this.name = 'keychain'),
            (this.version = '0.3'),
            (this.initialized = !1),
            (this.storagePrefix = P),
            (this.init = async () => {
              if (!this.initialized) {
                const i = await this.getKeyChain();
                typeof i < 'u' && (this.keychain = i), (this.initialized = !0);
              }
            }),
            (this.has = (i) => (this.isInitialized(), this.keychain.has(i))),
            (this.set = async (i, s) => {
              this.isInitialized(), this.keychain.set(i, s), await this.persist();
            }),
            (this.get = (i) => {
              this.isInitialized();
              const s = this.keychain.get(i);
              if (typeof s > 'u') {
                const { message: n } = index_es_E('NO_MATCHING_KEY', `${this.name}: ${i}`);
                throw new Error(n);
              }
              return s;
            }),
            (this.del = async (i) => {
              this.isInitialized(), this.keychain.delete(i), await this.persist();
            }),
            (this.core = e),
            (this.logger = (0, dist_cjs.generateChildLogger)(t, this.name));
        }
        get context() {
          return (0, dist_cjs.getLoggerContext)(this.logger);
        }
        get storageKey() {
          return this.storagePrefix + this.version + '//' + this.name;
        }
        async setKeyChain(e) {
          await this.core.storage.setItem(this.storageKey, Cn(e));
        }
        async getKeyChain() {
          const e = await this.core.storage.getItem(this.storageKey);
          return typeof e < 'u' ? wn(e) : void 0;
        }
        async persist() {
          await this.setKeyChain(this.keychain);
        }
        isInitialized() {
          if (!this.initialized) {
            const { message: e } = index_es_E('NOT_INITIALIZED', this.name);
            throw new Error(e);
          }
        }
      }
      class gt {
        constructor(e, t, i) {
          (this.core = e),
            (this.logger = t),
            (this.name = 'crypto'),
            (this.initialized = !1),
            (this.init = async () => {
              this.initialized || (await this.keychain.init(), (this.initialized = !0));
            }),
            (this.hasKeys = (s) => (this.isInitialized(), this.keychain.has(s))),
            (this.getClientId = async () => {
              this.isInitialized();
              return encodeIss(generateKeyPair(await this.getClientSeed()).publicKey);
            }),
            (this.generateKeyPair = () => {
              this.isInitialized();
              const s = (function ln() {
                const e = x25519.Au();
                return {
                  privateKey: src_to_string_toString(e.secretKey, 'base16'),
                  publicKey: src_to_string_toString(e.publicKey, 'base16'),
                };
              })();
              return this.setPrivateKey(s.publicKey, s.privateKey);
            }),
            (this.signJWT = async (s) => {
              this.isInitialized();
              const a = generateKeyPair(await this.getClientSeed()),
                o = fn(),
                h = index_es_je;
              return await signJWT(o, s, h, a);
            }),
            (this.generateSharedKey = (s, n, a) => {
              this.isInitialized();
              const h = (function pn(e, n) {
                const t = x25519.gi(
                  src_from_string_fromString(e, 'base16'),
                  src_from_string_fromString(n, 'base16')
                );
                return src_to_string_toString(new hkdf.t(lib_sha256.mE, t).expand(q), 'base16');
              })(this.getPrivateKey(s), n);
              return this.setSymKey(h, a);
            }),
            (this.setSymKey = async (s, n) => {
              this.isInitialized();
              const a =
                n ||
                (function mn(e) {
                  return src_to_string_toString(
                    (0, lib_sha256.vp)(src_from_string_fromString(e, 'base16')),
                    'base16'
                  );
                })(s);
              return await this.keychain.set(a, s), a;
            }),
            (this.deleteKeyPair = async (s) => {
              this.isInitialized(), await this.keychain.del(s);
            }),
            (this.deleteSymKey = async (s) => {
              this.isInitialized(), await this.keychain.del(s);
            }),
            (this.encode = async (s, n, a) => {
              this.isInitialized();
              const o = ge(a),
                h = (0, esm.u)(n);
              if (gn(o)) {
                const U = o.senderPublicKey,
                  q = o.receiverPublicKey;
                s = await this.generateSharedKey(U, q);
              }
              const d = this.getSymKey(s),
                { type: l, senderPublicKey: g } = o;
              return yn({ type: l, symKey: d, message: h, senderPublicKey: g });
            }),
            (this.decode = async (s, n, a) => {
              this.isInitialized();
              const o = (function Nn(e, n) {
                const t = G(e);
                return ge({
                  type: T(t.type),
                  senderPublicKey:
                    typeof t.senderPublicKey < 'u'
                      ? src_to_string_toString(t.senderPublicKey, 'base16')
                      : void 0,
                  receiverPublicKey: n?.receiverPublicKey,
                });
              })(n, a);
              if (gn(o)) {
                const l = o.receiverPublicKey,
                  g = o.senderPublicKey;
                s = await this.generateSharedKey(l, g);
              }
              const d = (function hn(e) {
                const n = new chacha20poly1305.OK(src_from_string_fromString(e.symKey, 'base16')),
                  { sealed: t, iv: r } = G(e.encoded),
                  o = n.open(r, t);
                if (null === o) throw new Error('Failed to decrypt');
                return src_to_string_toString(o, 'utf8');
              })({ symKey: this.getSymKey(s), encoded: n });
              return (0, esm.D)(d);
            }),
            (this.core = e),
            (this.logger = (0, dist_cjs.generateChildLogger)(t, this.name)),
            (this.keychain = i || new index_es_dt(this.core, this.logger));
        }
        get context() {
          return (0, dist_cjs.getLoggerContext)(this.logger);
        }
        getPayloadType(e) {
          return T(G(e).type);
        }
        async setPrivateKey(e, t) {
          return await this.keychain.set(e, t), e;
        }
        getPrivateKey(e) {
          return this.keychain.get(e);
        }
        async getClientSeed() {
          let e = '';
          try {
            e = this.keychain.get('client_ed25519_seed');
          } catch {
            (e = fn()), await this.keychain.set('client_ed25519_seed', e);
          }
          return (function Vs(r, e = 'utf8') {
            const t = js[e];
            if (!t) throw new Error(`Unsupported encoding "${e}"`);
            return ('utf8' !== e && 'utf-8' !== e) ||
              null == globalThis.Buffer ||
              null == globalThis.Buffer.from
              ? t.decoder.decode(`${t.prefix}${r}`)
              : globalThis.Buffer.from(r, 'utf8');
          })(e, 'base16');
        }
        getSymKey(e) {
          return this.keychain.get(e);
        }
        isInitialized() {
          if (!this.initialized) {
            const { message: e } = index_es_E('NOT_INITIALIZED', this.name);
            throw new Error(e);
          }
        }
      }
      class index_es_pt extends a {
        constructor(e, t) {
          super(e, t),
            (this.logger = e),
            (this.core = t),
            (this.messages = new Map()),
            (this.name = 'messages'),
            (this.version = '0.3'),
            (this.initialized = !1),
            (this.storagePrefix = P),
            (this.init = async () => {
              if (!this.initialized) {
                this.logger.trace('Initialized');
                try {
                  const i = await this.getRelayerMessages();
                  typeof i < 'u' && (this.messages = i),
                    this.logger.debug(`Successfully Restored records for ${this.name}`),
                    this.logger.trace({
                      type: 'method',
                      method: 'restore',
                      size: this.messages.size,
                    });
                } catch (i) {
                  this.logger.debug(`Failed to Restore records for ${this.name}`),
                    this.logger.error(i);
                } finally {
                  this.initialized = !0;
                }
              }
            }),
            (this.set = async (i, s) => {
              this.isInitialized();
              const n = En(s);
              let a = this.messages.get(i);
              return (
                typeof a > 'u' && (a = {}),
                typeof a[n] < 'u' || ((a[n] = s), this.messages.set(i, a), await this.persist()),
                n
              );
            }),
            (this.get = (i) => {
              this.isInitialized();
              let s = this.messages.get(i);
              return typeof s > 'u' && (s = {}), s;
            }),
            (this.has = (i, s) => {
              this.isInitialized();
              return typeof this.get(i)[En(s)] < 'u';
            }),
            (this.del = async (i) => {
              this.isInitialized(), this.messages.delete(i), await this.persist();
            }),
            (this.logger = (0, dist_cjs.generateChildLogger)(e, this.name)),
            (this.core = t);
        }
        get context() {
          return (0, dist_cjs.getLoggerContext)(this.logger);
        }
        get storageKey() {
          return this.storagePrefix + this.version + '//' + this.name;
        }
        async setRelayerMessages(e) {
          await this.core.storage.setItem(this.storageKey, Cn(e));
        }
        async getRelayerMessages() {
          const e = await this.core.storage.getItem(this.storageKey);
          return typeof e < 'u' ? wn(e) : void 0;
        }
        async persist() {
          await this.setRelayerMessages(this.messages);
        }
        isInitialized() {
          if (!this.initialized) {
            const { message: e } = index_es_E('NOT_INITIALIZED', this.name);
            throw new Error(e);
          }
        }
      }
      class Hs extends u {
        constructor(e, t) {
          super(e, t),
            (this.relayer = e),
            (this.logger = t),
            (this.events = new events.EventEmitter()),
            (this.name = 'publisher'),
            (this.queue = new Map()),
            (this.publishTimeout = 1e4),
            (this.publish = async (i, s, n) => {
              this.logger.debug('Publishing Payload'),
                this.logger.trace({
                  type: 'method',
                  method: 'publish',
                  params: { topic: i, message: s, opts: n },
                });
              try {
                const a = n?.ttl || Je,
                  o = qn(n),
                  h = n?.prompt || !1,
                  d = n?.tag || 0,
                  l = { topic: i, message: s, opts: { ttl: a, relay: o, prompt: h, tag: d } },
                  g = En(s);
                this.queue.set(g, l);
                try {
                  await await Kn(this.rpcPublish(i, s, a, o, h, d), this.publishTimeout),
                    this.relayer.events.emit(index_es_D_publish, l);
                } catch {
                  return (
                    this.logger.debug('Publishing Payload stalled'),
                    void this.relayer.events.emit(index_es_D_connection_stalled)
                  );
                }
                this.onPublish(g, l),
                  this.logger.debug('Successfully Published Payload'),
                  this.logger.trace({
                    type: 'method',
                    method: 'publish',
                    params: { topic: i, message: s, opts: n },
                  });
              } catch (a) {
                throw (this.logger.debug('Failed to Publish Payload'), this.logger.error(a), a);
              }
            }),
            (this.on = (i, s) => {
              this.events.on(i, s);
            }),
            (this.once = (i, s) => {
              this.events.once(i, s);
            }),
            (this.off = (i, s) => {
              this.events.off(i, s);
            }),
            (this.removeListener = (i, s) => {
              this.events.removeListener(i, s);
            }),
            (this.relayer = e),
            (this.logger = (0, dist_cjs.generateChildLogger)(t, this.name)),
            this.registerEventListeners();
        }
        get context() {
          return (0, dist_cjs.getLoggerContext)(this.logger);
        }
        rpcPublish(e, t, i, s, n, a) {
          var o, h, d, l;
          const g = {
            method: Gn(s.protocol).publish,
            params: { topic: e, message: t, ttl: i, prompt: n, tag: a },
          };
          return (
            index_es_y(null == (o = g.params) ? void 0 : o.prompt) &&
              (null == (h = g.params) || delete h.prompt),
            index_es_y(null == (d = g.params) ? void 0 : d.tag) &&
              (null == (l = g.params) || delete l.tag),
            this.logger.debug('Outgoing Relay Payload'),
            this.logger.trace({ type: 'message', direction: 'outgoing', request: g }),
            this.relayer.provider.request(g)
          );
        }
        onPublish(e, t) {
          this.queue.delete(e);
        }
        checkQueue() {
          this.queue.forEach(async (e) => {
            const { topic: t, message: i, opts: s } = e;
            await this.publish(t, i, s);
          });
        }
        registerEventListeners() {
          this.relayer.core.heartbeat.on(cjs.HEARTBEAT_EVENTS.pulse, () => {
            this.checkQueue();
          });
        }
      }
      class Xs {
        constructor() {
          (this.map = new Map()),
            (this.set = (e, t) => {
              const i = this.get(e);
              this.exists(e, t) || this.map.set(e, [...i, t]);
            }),
            (this.get = (e) => this.map.get(e) || []),
            (this.exists = (e, t) => this.get(e).includes(t)),
            (this.delete = (e, t) => {
              if (typeof t > 'u') return void this.map.delete(e);
              if (!this.map.has(e)) return;
              const i = this.get(e);
              if (!this.exists(e, t)) return;
              const s = i.filter((n) => n !== t);
              s.length ? this.map.set(e, s) : this.map.delete(e);
            }),
            (this.clear = () => {
              this.map.clear();
            });
        }
        get topics() {
          return Array.from(this.map.keys());
        }
      }
      var Ws = Object.defineProperty,
        Zs = Object.defineProperties,
        Qs = Object.getOwnPropertyDescriptors,
        Dt = Object.getOwnPropertySymbols,
        er = Object.prototype.hasOwnProperty,
        tr = Object.prototype.propertyIsEnumerable,
        index_es_yt = (r, e, t) =>
          e in r
            ? Ws(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
            : (r[e] = t),
        j = (r, e) => {
          for (var t in e || (e = {})) er.call(e, t) && index_es_yt(r, t, e[t]);
          if (Dt) for (var t of Dt(e)) tr.call(e, t) && index_es_yt(r, t, e[t]);
          return r;
        },
        index_es_he = (r, e) => Zs(r, Qs(e));
      class bt extends x {
        constructor(e, t) {
          super(e, t),
            (this.relayer = e),
            (this.logger = t),
            (this.subscriptions = new Map()),
            (this.topicMap = new Xs()),
            (this.events = new events.EventEmitter()),
            (this.name = 'subscription'),
            (this.version = '0.3'),
            (this.pending = new Map()),
            (this.cached = []),
            (this.initialized = !1),
            (this.pendingSubscriptionWatchLabel = 'pending_sub_watch_label'),
            (this.pendingSubInterval = 20),
            (this.storagePrefix = P),
            (this.subscribeTimeout = 1e4),
            (this.init = async () => {
              this.initialized ||
                (this.logger.trace('Initialized'),
                await this.restart(),
                this.registerEventListeners(),
                this.onEnable());
            }),
            (this.subscribe = async (i, s) => {
              this.isInitialized(),
                this.logger.debug('Subscribing Topic'),
                this.logger.trace({
                  type: 'method',
                  method: 'subscribe',
                  params: { topic: i, opts: s },
                });
              try {
                const n = qn(s),
                  a = { topic: i, relay: n };
                this.pending.set(i, a);
                const o = await this.rpcSubscribe(i, n);
                return (
                  this.onSubscribe(o, a),
                  this.logger.debug('Successfully Subscribed Topic'),
                  this.logger.trace({
                    type: 'method',
                    method: 'subscribe',
                    params: { topic: i, opts: s },
                  }),
                  o
                );
              } catch (n) {
                throw (this.logger.debug('Failed to Subscribe Topic'), this.logger.error(n), n);
              }
            }),
            (this.unsubscribe = async (i, s) => {
              this.isInitialized(),
                typeof s?.id < 'u'
                  ? await this.unsubscribeById(i, s.id, s)
                  : await this.unsubscribeByTopic(i, s);
            }),
            (this.isSubscribed = async (i) =>
              !!this.topics.includes(i) ||
              (await new Promise((s, n) => {
                const a = new time_dist_cjs.Watch();
                a.start(this.pendingSubscriptionWatchLabel);
                const o = setInterval(() => {
                  !this.pending.has(i) &&
                    this.topics.includes(i) &&
                    (clearInterval(o), a.stop(this.pendingSubscriptionWatchLabel), s(!0)),
                    a.elapsed(this.pendingSubscriptionWatchLabel) >= index_es_nt &&
                      (clearInterval(o), a.stop(this.pendingSubscriptionWatchLabel), n(!1));
                }, this.pendingSubInterval);
              }))),
            (this.on = (i, s) => {
              this.events.on(i, s);
            }),
            (this.once = (i, s) => {
              this.events.once(i, s);
            }),
            (this.off = (i, s) => {
              this.events.off(i, s);
            }),
            (this.removeListener = (i, s) => {
              this.events.removeListener(i, s);
            }),
            (this.restart = async () => {
              await this.restore(), await this.reset();
            }),
            (this.relayer = e),
            (this.logger = (0, dist_cjs.generateChildLogger)(t, this.name));
        }
        get context() {
          return (0, dist_cjs.getLoggerContext)(this.logger);
        }
        get storageKey() {
          return this.storagePrefix + this.version + '//' + this.name;
        }
        get length() {
          return this.subscriptions.size;
        }
        get ids() {
          return Array.from(this.subscriptions.keys());
        }
        get values() {
          return Array.from(this.subscriptions.values());
        }
        get topics() {
          return this.topicMap.topics;
        }
        hasSubscription(e, t) {
          let i = !1;
          try {
            i = this.getSubscription(e).topic === t;
          } catch {}
          return i;
        }
        onEnable() {
          (this.cached = []), (this.initialized = !0);
        }
        onDisable() {
          (this.cached = this.values),
            this.subscriptions.clear(),
            this.topicMap.clear(),
            (this.initialized = !1);
        }
        async unsubscribeByTopic(e, t) {
          const i = this.topicMap.get(e);
          await Promise.all(i.map(async (s) => await this.unsubscribeById(e, s, t)));
        }
        async unsubscribeById(e, t, i) {
          this.logger.debug('Unsubscribing Topic'),
            this.logger.trace({
              type: 'method',
              method: 'unsubscribe',
              params: { topic: e, id: t, opts: i },
            });
          try {
            const s = qn(i);
            await this.rpcUnsubscribe(e, t, s);
            const n = N('USER_DISCONNECTED', `${this.name}, ${e}`);
            await this.onUnsubscribe(e, t, n),
              this.logger.debug('Successfully Unsubscribed Topic'),
              this.logger.trace({
                type: 'method',
                method: 'unsubscribe',
                params: { topic: e, id: t, opts: i },
              });
          } catch (s) {
            throw (this.logger.debug('Failed to Unsubscribe Topic'), this.logger.error(s), s);
          }
        }
        async rpcSubscribe(e, t) {
          const i = { method: Gn(t.protocol).subscribe, params: { topic: e } };
          let s;
          this.logger.debug('Outgoing Relay Payload'),
            this.logger.trace({ type: 'payload', direction: 'outgoing', request: i });
          try {
            s = await await Kn(this.relayer.provider.request(i), this.subscribeTimeout);
          } catch {
            this.logger.debug('Outgoing Relay Payload stalled'),
              this.relayer.events.emit(index_es_D_connection_stalled);
          }
          return s;
        }
        rpcUnsubscribe(e, t, i) {
          const s = { method: Gn(i.protocol).unsubscribe, params: { topic: e, id: t } };
          return (
            this.logger.debug('Outgoing Relay Payload'),
            this.logger.trace({ type: 'payload', direction: 'outgoing', request: s }),
            this.relayer.provider.request(s)
          );
        }
        onSubscribe(e, t) {
          this.setSubscription(e, index_es_he(j({}, t), { id: e })), this.pending.delete(t.topic);
        }
        onResubscribe(e, t) {
          this.addSubscription(e, index_es_he(j({}, t), { id: e })), this.pending.delete(t.topic);
        }
        async onUnsubscribe(e, t, i) {
          this.events.removeAllListeners(t),
            this.hasSubscription(t, e) && this.deleteSubscription(t, i),
            await this.relayer.messages.del(e);
        }
        async setRelayerSubscriptions(e) {
          await this.relayer.core.storage.setItem(this.storageKey, e);
        }
        async getRelayerSubscriptions() {
          return await this.relayer.core.storage.getItem(this.storageKey);
        }
        setSubscription(e, t) {
          this.subscriptions.has(e) ||
            (this.logger.debug('Setting subscription'),
            this.logger.trace({
              type: 'method',
              method: 'setSubscription',
              id: e,
              subscription: t,
            }),
            this.addSubscription(e, t));
        }
        addSubscription(e, t) {
          this.subscriptions.set(e, j({}, t)),
            this.topicMap.set(t.topic, e),
            this.events.emit(dist_index_es_I_created, t);
        }
        getSubscription(e) {
          this.logger.debug('Getting subscription'),
            this.logger.trace({ type: 'method', method: 'getSubscription', id: e });
          const t = this.subscriptions.get(e);
          if (!t) {
            const { message: i } = index_es_E('NO_MATCHING_KEY', `${this.name}: ${e}`);
            throw new Error(i);
          }
          return t;
        }
        deleteSubscription(e, t) {
          this.logger.debug('Deleting subscription'),
            this.logger.trace({ type: 'method', method: 'deleteSubscription', id: e, reason: t });
          const i = this.getSubscription(e);
          this.subscriptions.delete(e),
            this.topicMap.delete(i.topic, e),
            this.events.emit(dist_index_es_I_deleted, index_es_he(j({}, i), { reason: t }));
        }
        async persist() {
          await this.setRelayerSubscriptions(this.values), this.events.emit(dist_index_es_I_sync);
        }
        async reset() {
          this.cached.length &&
            (await Promise.all(this.cached.map(async (e) => await this.resubscribe(e)))),
            this.events.emit(dist_index_es_I_resubscribed);
        }
        async restore() {
          try {
            const e = await this.getRelayerSubscriptions();
            if (typeof e > 'u' || !e.length) return;
            if (this.subscriptions.size) {
              const { message: t } = index_es_E('RESTORE_WILL_OVERRIDE', this.name);
              throw (this.logger.error(t), new Error(t));
            }
            (this.cached = e),
              this.logger.debug(`Successfully Restored subscriptions for ${this.name}`),
              this.logger.trace({ type: 'method', method: 'restore', subscriptions: this.values });
          } catch (e) {
            this.logger.debug(`Failed to Restore subscriptions for ${this.name}`),
              this.logger.error(e);
          }
        }
        async resubscribe(e) {
          if (!this.ids.includes(e.id)) {
            const { topic: t, relay: i } = e,
              s = { topic: t, relay: i };
            this.pending.set(s.topic, s);
            const n = await this.rpcSubscribe(s.topic, s.relay);
            this.onResubscribe(n, s);
          }
        }
        async onConnect() {
          await this.restart(), this.onEnable();
        }
        onDisconnect() {
          this.onDisable();
        }
        checkPending() {
          this.relayer.transportExplicitlyClosed ||
            this.pending.forEach(async (e) => {
              const t = await this.rpcSubscribe(e.topic, e.relay);
              this.onSubscribe(t, e);
            });
        }
        registerEventListeners() {
          this.relayer.core.heartbeat.on(cjs.HEARTBEAT_EVENTS.pulse, () => {
            this.checkPending();
          }),
            this.relayer.on(index_es_D_connect, async () => {
              await this.onConnect();
            }),
            this.relayer.on(index_es_D_disconnect, () => {
              this.onDisconnect();
            }),
            this.events.on(dist_index_es_I_created, async (e) => {
              const t = dist_index_es_I_created;
              this.logger.info(`Emitting ${t}`),
                this.logger.debug({ type: 'event', event: t, data: e }),
                await this.persist();
            }),
            this.events.on(dist_index_es_I_deleted, async (e) => {
              const t = dist_index_es_I_deleted;
              this.logger.info(`Emitting ${t}`),
                this.logger.debug({ type: 'event', event: t, data: e }),
                await this.persist();
            });
        }
        isInitialized() {
          if (!this.initialized) {
            const { message: e } = index_es_E('NOT_INITIALIZED', this.name);
            throw new Error(e);
          }
        }
      }
      var ir = Object.defineProperty,
        index_es_mt = Object.getOwnPropertySymbols,
        sr = Object.prototype.hasOwnProperty,
        rr = Object.prototype.propertyIsEnumerable,
        index_es_Et = (r, e, t) =>
          e in r
            ? ir(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
            : (r[e] = t);
      class index_es_ft extends g {
        constructor(e) {
          super(e),
            (this.protocol = 'wc'),
            (this.version = 2),
            (this.events = new events.EventEmitter()),
            (this.name = 'relayer'),
            (this.transportExplicitlyClosed = !1),
            (this.initialized = !1),
            (this.core = e.core),
            (this.logger =
              typeof e.logger < 'u' && 'string' != typeof e.logger
                ? (0, dist_cjs.generateChildLogger)(e.logger, this.name)
                : browser_default()(
                    (0, dist_cjs.getDefaultLoggerOptions)({ level: e.logger || 'error' })
                  )),
            (this.messages = new index_es_pt(this.logger, e.core)),
            (this.subscriber = new bt(this, this.logger)),
            (this.publisher = new Hs(this, this.logger)),
            (this.relayUrl = e?.relayUrl || 'wss://relay.walletconnect.com'),
            (this.projectId = e.projectId),
            (this.provider = {});
        }
        async init() {
          this.logger.trace('Initialized'),
            (this.provider = await this.createProvider()),
            await Promise.all([this.messages.init(), this.transportOpen(), this.subscriber.init()]),
            this.registerEventListeners(),
            (this.initialized = !0);
        }
        get context() {
          return (0, dist_cjs.getLoggerContext)(this.logger);
        }
        get connected() {
          return this.provider.connection.connected;
        }
        get connecting() {
          return this.provider.connection.connecting;
        }
        async publish(e, t, i) {
          this.isInitialized(),
            await this.publisher.publish(e, t, i),
            await this.recordMessageEvent({ topic: e, message: t });
        }
        async subscribe(e, t) {
          this.isInitialized();
          let i = '';
          return (
            await Promise.all([
              new Promise((s) => {
                this.subscriber.once(dist_index_es_I_created, (n) => {
                  n.topic === e && s();
                });
              }),
              new Promise(async (s) => {
                (i = await this.subscriber.subscribe(e, t)), s();
              }),
            ]),
            i
          );
        }
        async unsubscribe(e, t) {
          this.isInitialized(), await this.subscriber.unsubscribe(e, t);
        }
        on(e, t) {
          this.events.on(e, t);
        }
        once(e, t) {
          this.events.once(e, t);
        }
        off(e, t) {
          this.events.off(e, t);
        }
        removeListener(e, t) {
          this.events.removeListener(e, t);
        }
        async transportClose() {
          (this.transportExplicitlyClosed = !0),
            this.connected && (await this.provider.disconnect()),
            this.events.emit(index_es_D_transport_closed);
        }
        async transportOpen(e) {
          (this.relayUrl = e || this.relayUrl), (this.transportExplicitlyClosed = !1);
          try {
            await Promise.all([
              new Promise((t) => {
                this.initialized || t(),
                  this.subscriber.once(dist_index_es_I_resubscribed, () => {
                    t();
                  });
              }),
              await Promise.race([
                this.provider.connect(),
                new Promise((t, i) =>
                  this.once(index_es_D_transport_closed, () => {
                    i();
                  })
                ),
              ]),
            ]);
          } catch (t) {
            const i = t;
            if (!/socket hang up/i.test(i.message)) throw new Error(i.message);
            this.logger.error(i), this.events.emit(index_es_D_transport_closed);
          }
        }
        async restartTransport(e) {
          await this.transportClose(),
            await new Promise((t) => setTimeout(t, index_es_oe)),
            await this.transportOpen(e);
        }
        async createProvider() {
          const e = await this.core.crypto.signJWT(this.relayUrl);
          return new dist_esm.r(
            new jsonrpc_ws_connection_dist_esm(
              _n({
                sdkVersion: '2.2.1',
                protocol: this.protocol,
                version: this.version,
                relayUrl: this.relayUrl,
                projectId: this.projectId,
                auth: e,
              })
            )
          );
        }
        async recordMessageEvent(e) {
          const { topic: t, message: i } = e;
          await this.messages.set(t, i);
        }
        async shouldIgnoreMessageEvent(e) {
          const { topic: t, message: i } = e;
          return !(await this.subscriber.isSubscribed(t)) || this.messages.has(t, i);
        }
        async onProviderPayload(e) {
          if (
            (this.logger.debug('Incoming Relay Payload'),
            this.logger.trace({ type: 'payload', direction: 'incoming', payload: e }),
            (0, jsonrpc_utils_dist_esm.isJsonRpcRequest)(e))
          ) {
            if (!e.method.endsWith('_subscription')) return;
            const t = e.params,
              { topic: i, message: s } = t.data,
              n = { topic: i, message: s };
            this.logger.debug('Emitting Relayer Payload'),
              this.logger.trace(
                ((r, e) => {
                  for (var t in e || (e = {})) sr.call(e, t) && index_es_Et(r, t, e[t]);
                  if (index_es_mt)
                    for (var t of index_es_mt(e)) rr.call(e, t) && index_es_Et(r, t, e[t]);
                  return r;
                })({ type: 'event', event: t.id }, n)
              ),
              this.events.emit(t.id, n),
              await this.acknowledgePayload(e),
              await this.onMessageEvent(n);
          }
        }
        async onMessageEvent(e) {
          (await this.shouldIgnoreMessageEvent(e)) ||
            (this.events.emit(index_es_D_message, e), await this.recordMessageEvent(e));
        }
        async acknowledgePayload(e) {
          const t = (0, jsonrpc_utils_dist_esm.formatJsonRpcResult)(e.id, !0);
          await this.provider.connection.send(t);
        }
        registerEventListeners() {
          this.provider.on(index_es_M_payload, (e) => this.onProviderPayload(e)),
            this.provider.on(index_es_M_connect, () => {
              this.events.emit(index_es_D_connect);
            }),
            this.provider.on(index_es_M_disconnect, () => {
              this.events.emit(index_es_D_disconnect), this.attemptToReconnect();
            }),
            this.provider.on(index_es_M_error, (e) => this.events.emit(index_es_D_error, e)),
            this.events.on(index_es_D_connection_stalled, async () => {
              await this.restartTransport();
            });
        }
        attemptToReconnect() {
          this.transportExplicitlyClosed ||
            setTimeout(async () => {
              await this.transportOpen();
            }, (0, time_dist_cjs.toMiliseconds)(index_es_oe));
        }
        isInitialized() {
          if (!this.initialized) {
            const { message: e } = index_es_E('NOT_INITIALIZED', this.name);
            throw new Error(e);
          }
        }
      }
      var ar = Object.defineProperty,
        wt = Object.getOwnPropertySymbols,
        index_es_or = Object.prototype.hasOwnProperty,
        hr = Object.prototype.propertyIsEnumerable,
        vt = (r, e, t) =>
          e in r
            ? ar(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
            : (r[e] = t),
        It = (r, e) => {
          for (var t in e || (e = {})) index_es_or.call(e, t) && vt(r, t, e[t]);
          if (wt) for (var t of wt(e)) hr.call(e, t) && vt(r, t, e[t]);
          return r;
        };
      class Ct extends index_es_p {
        constructor(e, t, i, s = P, n = void 0) {
          super(e, t, i, s),
            (this.core = e),
            (this.logger = t),
            (this.name = i),
            (this.map = new Map()),
            (this.version = '0.3'),
            (this.cached = []),
            (this.initialized = !1),
            (this.storagePrefix = P),
            (this.init = async () => {
              this.initialized ||
                (this.logger.trace('Initialized'),
                await this.restore(),
                this.cached.forEach((a) => {
                  !(function rt(e) {
                    var n;
                    return null == (n = e?.proposer) ? void 0 : n.publicKey;
                  })(a)
                    ? (function ot(e) {
                        return e?.topic;
                      })(a)
                      ? this.map.set(a.topic, a)
                      : this.getKey &&
                        null !== a &&
                        !index_es_y(a) &&
                        this.map.set(this.getKey(a), a)
                    : this.map.set(a.id, a);
                }),
                (this.cached = []),
                (this.initialized = !0));
            }),
            (this.set = async (a, o) => {
              this.isInitialized(),
                this.map.has(a)
                  ? await this.update(a, o)
                  : (this.logger.debug('Setting value'),
                    this.logger.trace({ type: 'method', method: 'set', key: a, value: o }),
                    this.map.set(a, o),
                    await this.persist());
            }),
            (this.get = (a) => (
              this.isInitialized(),
              this.logger.debug('Getting value'),
              this.logger.trace({ type: 'method', method: 'get', key: a }),
              this.getData(a)
            )),
            (this.getAll = (a) => (
              this.isInitialized(),
              a
                ? this.values.filter((o) =>
                    Object.keys(a).every((h) => lodash_isequal_default()(o[h], a[h]))
                  )
                : this.values
            )),
            (this.update = async (a, o) => {
              this.isInitialized(),
                this.logger.debug('Updating value'),
                this.logger.trace({ type: 'method', method: 'update', key: a, update: o });
              const h = It(It({}, this.getData(a)), o);
              this.map.set(a, h), await this.persist();
            }),
            (this.delete = async (a, o) => {
              this.isInitialized(),
                this.map.has(a) &&
                  (this.logger.debug('Deleting value'),
                  this.logger.trace({ type: 'method', method: 'delete', key: a, reason: o }),
                  this.map.delete(a),
                  await this.persist());
            }),
            (this.logger = (0, dist_cjs.generateChildLogger)(t, this.name)),
            (this.storagePrefix = s),
            (this.getKey = n);
        }
        get context() {
          return (0, dist_cjs.getLoggerContext)(this.logger);
        }
        get storageKey() {
          return this.storagePrefix + this.version + '//' + this.name;
        }
        get length() {
          return this.map.size;
        }
        get keys() {
          return Array.from(this.map.keys());
        }
        get values() {
          return Array.from(this.map.values());
        }
        async setDataStore(e) {
          await this.core.storage.setItem(this.storageKey, e);
        }
        async getDataStore() {
          return await this.core.storage.getItem(this.storageKey);
        }
        getData(e) {
          const t = this.map.get(e);
          if (!t) {
            const { message: i } = index_es_E('NO_MATCHING_KEY', `${this.name}: ${e}`);
            throw (this.logger.error(i), new Error(i));
          }
          return t;
        }
        async persist() {
          await this.setDataStore(this.values);
        }
        async restore() {
          try {
            const e = await this.getDataStore();
            if (typeof e > 'u' || !e.length) return;
            if (this.map.size) {
              const { message: t } = index_es_E('RESTORE_WILL_OVERRIDE', this.name);
              throw (this.logger.error(t), new Error(t));
            }
            (this.cached = e),
              this.logger.debug(`Successfully Restored value for ${this.name}`),
              this.logger.trace({ type: 'method', method: 'restore', value: this.values });
          } catch (e) {
            this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
          }
        }
        isInitialized() {
          if (!this.initialized) {
            const { message: e } = index_es_E('NOT_INITIALIZED', this.name);
            throw new Error(e);
          }
        }
      }
      class _t {
        constructor(e, t) {
          (this.core = e),
            (this.logger = t),
            (this.name = 'pairing'),
            (this.version = '0.3'),
            (this.events = new (events_default())()),
            (this.initialized = !1),
            (this.storagePrefix = P),
            (this.ignoredPayloadTypes = [index_es_b]),
            (this.registeredMethods = []),
            (this.init = async () => {
              this.initialized ||
                (await this.pairings.init(),
                await this.cleanup(),
                this.registerRelayerEvents(),
                this.registerExpirerEvents(),
                (this.initialized = !0),
                this.logger.trace('Initialized'));
            }),
            (this.register = ({ methods: i }) => {
              this.isInitialized(),
                (this.registeredMethods = [...new Set([...this.registeredMethods, ...i])]);
            }),
            (this.create = async () => {
              this.isInitialized();
              const i = fn(),
                s = await this.core.crypto.setSymKey(i),
                n = jn(time_dist_cjs.FIVE_MINUTES),
                a = { protocol: 'irn' },
                o = { topic: s, expiry: n, relay: a, active: !1 },
                h = Qn({
                  protocol: this.core.protocol,
                  version: this.core.version,
                  topic: s,
                  symKey: i,
                  relay: a,
                });
              return (
                await this.pairings.set(s, o),
                await this.core.relayer.subscribe(s),
                this.core.expirer.set(s, n),
                { topic: s, uri: h }
              );
            }),
            (this.pair = async (i) => {
              this.isInitialized(), this.isValidPair(i);
              const {
                  topic: s,
                  symKey: n,
                  relay: a,
                } = (function Jn(e) {
                  const n = e.indexOf(':'),
                    t = -1 !== e.indexOf('?') ? e.indexOf('?') : void 0,
                    r = e.substring(0, n),
                    o = e.substring(n + 1, t).split('@'),
                    i = typeof t < 'u' ? e.substring(t) : '',
                    s = query_string.parse(i);
                  return {
                    protocol: r,
                    topic: o[0],
                    version: parseInt(o[1], 10),
                    symKey: s.symKey,
                    relay: Me(s),
                  };
                })(i.uri),
                o = jn(time_dist_cjs.FIVE_MINUTES),
                h = { topic: s, relay: a, expiry: o, active: !1 };
              return (
                await this.pairings.set(s, h),
                await this.core.crypto.setSymKey(n, s),
                await this.core.relayer.subscribe(s, { relay: a }),
                this.core.expirer.set(s, o),
                i.activatePairing && (await this.activate({ topic: s })),
                h
              );
            }),
            (this.activate = async ({ topic: i }) => {
              this.isInitialized();
              const s = jn(time_dist_cjs.THIRTY_DAYS);
              await this.pairings.update(i, { active: !0, expiry: s }), this.core.expirer.set(i, s);
            }),
            (this.ping = async (i) => {
              this.isInitialized(), await this.isValidPing(i);
              const { topic: s } = i;
              if (this.pairings.keys.includes(s)) {
                const n = await this.sendRequest(s, 'wc_pairingPing', {}),
                  { done: a, resolve: o, reject: h } = Mn();
                this.events.once(Hn('pairing_ping', n), ({ error: d }) => {
                  d ? h(d) : o();
                }),
                  await a();
              }
            }),
            (this.updateExpiry = async ({ topic: i, expiry: s }) => {
              this.isInitialized(), await this.pairings.update(i, { expiry: s });
            }),
            (this.updateMetadata = async ({ topic: i, metadata: s }) => {
              this.isInitialized(), await this.pairings.update(i, { peerMetadata: s });
            }),
            (this.getPairings = () => (this.isInitialized(), this.pairings.values)),
            (this.disconnect = async (i) => {
              this.isInitialized(), await this.isValidDisconnect(i);
              const { topic: s } = i;
              this.pairings.keys.includes(s) &&
                (await this.sendRequest(s, 'wc_pairingDelete', N('USER_DISCONNECTED')),
                await this.deletePairing(s));
            }),
            (this.sendRequest = async (i, s, n) => {
              const a = (0, jsonrpc_utils_dist_esm.formatJsonRpcRequest)(s, n),
                o = await this.core.crypto.encode(i, a),
                h = index_es_N[s].req;
              return this.core.history.set(i, a), await this.core.relayer.publish(i, o, h), a.id;
            }),
            (this.sendResult = async (i, s, n) => {
              const a = (0, jsonrpc_utils_dist_esm.formatJsonRpcResult)(i, n),
                o = await this.core.crypto.encode(s, a),
                h = await this.core.history.get(s, i),
                d = index_es_N[h.request.method].res;
              await this.core.relayer.publish(s, o, d), await this.core.history.resolve(a);
            }),
            (this.sendError = async (i, s, n) => {
              const a = (0, jsonrpc_utils_dist_esm.formatJsonRpcError)(i, n),
                o = await this.core.crypto.encode(s, a),
                h = await this.core.history.get(s, i),
                d = index_es_N[h.request.method]
                  ? index_es_N[h.request.method].res
                  : index_es_N.unregistered_method.res;
              await this.core.relayer.publish(s, o, d), await this.core.history.resolve(a);
            }),
            (this.deletePairing = async (i, s) => {
              await this.core.relayer.unsubscribe(i),
                await Promise.all([
                  this.pairings.delete(i, N('USER_DISCONNECTED')),
                  this.core.crypto.deleteSymKey(i),
                  s ? Promise.resolve() : this.core.expirer.del(i),
                ]);
            }),
            (this.cleanup = async () => {
              const i = this.pairings.getAll().filter((s) => Vn(s.expiry));
              await Promise.all(i.map((s) => this.deletePairing(s.topic)));
            }),
            (this.onRelayEventRequest = (i) => {
              const { topic: s, payload: n } = i,
                a = n.method;
              if (this.pairings.keys.includes(s))
                switch (a) {
                  case 'wc_pairingPing':
                    return this.onPairingPingRequest(s, n);
                  case 'wc_pairingDelete':
                    return this.onPairingDeleteRequest(s, n);
                  default:
                    return this.onUnknownRpcMethodRequest(s, n);
                }
            }),
            (this.onRelayEventResponse = async (i) => {
              const { topic: s, payload: n } = i,
                a = (await this.core.history.get(s, n.id)).request.method;
              if (this.pairings.keys.includes(s)) {
                if ('wc_pairingPing' === a) return this.onPairingPingResponse(s, n);
                return this.onUnknownRpcMethodResponse(a);
              }
            }),
            (this.onPairingPingRequest = async (i, s) => {
              const { id: n } = s;
              try {
                this.isValidPing({ topic: i }),
                  await this.sendResult(n, i, !0),
                  this.events.emit('pairing_ping', { id: n, topic: i });
              } catch (a) {
                await this.sendError(n, i, a), this.logger.error(a);
              }
            }),
            (this.onPairingPingResponse = (i, s) => {
              const { id: n } = s;
              setTimeout(() => {
                (0, jsonrpc_utils_dist_esm.isJsonRpcResult)(s)
                  ? this.events.emit(Hn('pairing_ping', n), {})
                  : (0, jsonrpc_utils_dist_esm.isJsonRpcError)(s) &&
                    this.events.emit(Hn('pairing_ping', n), { error: s.error });
              }, 500);
            }),
            (this.onPairingDeleteRequest = async (i, s) => {
              const { id: n } = s;
              try {
                this.isValidDisconnect({ topic: i }),
                  await this.sendResult(n, i, !0),
                  await this.deletePairing(i),
                  this.events.emit('pairing_delete', { id: n, topic: i });
              } catch (a) {
                await this.sendError(n, i, a), this.logger.error(a);
              }
            }),
            (this.onUnknownRpcMethodRequest = async (i, s) => {
              const { id: n, method: a } = s;
              try {
                if (this.registeredMethods.includes(a)) return;
                const o = N('WC_METHOD_UNSUPPORTED', a);
                await this.sendError(n, i, o), this.logger.error(o);
              } catch (o) {
                await this.sendError(n, i, o), this.logger.error(o);
              }
            }),
            (this.onUnknownRpcMethodResponse = (i) => {
              this.registeredMethods.includes(i) ||
                this.logger.error(N('WC_METHOD_UNSUPPORTED', i));
            }),
            (this.isValidPair = (i) => {
              if (!ut(i)) {
                const { message: s } = index_es_E('MISSING_OR_INVALID', `pair() params: ${i}`);
                throw new Error(s);
              }
              if (
                !(function tt(e) {
                  if (index_es_d(e, !1))
                    try {
                      return typeof new URL(e) < 'u';
                    } catch {
                      return !1;
                    }
                  return !1;
                })(i.uri)
              ) {
                const { message: s } = index_es_E('MISSING_OR_INVALID', `pair() uri: ${i.uri}`);
                throw new Error(s);
              }
            }),
            (this.isValidPing = async (i) => {
              if (!ut(i)) {
                const { message: n } = index_es_E('MISSING_OR_INVALID', `ping() params: ${i}`);
                throw new Error(n);
              }
              const { topic: s } = i;
              await this.isValidPairingTopic(s);
            }),
            (this.isValidDisconnect = async (i) => {
              if (!ut(i)) {
                const { message: n } = index_es_E(
                  'MISSING_OR_INVALID',
                  `disconnect() params: ${i}`
                );
                throw new Error(n);
              }
              const { topic: s } = i;
              await this.isValidPairingTopic(s);
            }),
            (this.isValidPairingTopic = async (i) => {
              if (!index_es_d(i, !1)) {
                const { message: s } = index_es_E(
                  'MISSING_OR_INVALID',
                  `pairing topic should be a string: ${i}`
                );
                throw new Error(s);
              }
              if (!this.pairings.keys.includes(i)) {
                const { message: s } = index_es_E(
                  'NO_MATCHING_KEY',
                  `pairing topic doesn't exist: ${i}`
                );
                throw new Error(s);
              }
              if (Vn(this.pairings.get(i).expiry)) {
                await this.deletePairing(i);
                const { message: s } = index_es_E('EXPIRED', `pairing topic: ${i}`);
                throw new Error(s);
              }
            }),
            (this.core = e),
            (this.logger = (0, dist_cjs.generateChildLogger)(t, this.name)),
            (this.pairings = new Ct(this.core, this.logger, this.name, this.storagePrefix));
        }
        get context() {
          return (0, dist_cjs.getLoggerContext)(this.logger);
        }
        isInitialized() {
          if (!this.initialized) {
            const { message: e } = index_es_E('NOT_INITIALIZED', this.name);
            throw new Error(e);
          }
        }
        registerRelayerEvents() {
          this.core.relayer.on(index_es_D_message, async (e) => {
            const { topic: t, message: i } = e;
            if (this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i))) return;
            const s = await this.core.crypto.decode(t, i);
            (0, jsonrpc_utils_dist_esm.isJsonRpcRequest)(s)
              ? (this.core.history.set(t, s), this.onRelayEventRequest({ topic: t, payload: s }))
              : (0, jsonrpc_utils_dist_esm.isJsonRpcResponse)(s) &&
                (await this.core.history.resolve(s),
                this.onRelayEventResponse({ topic: t, payload: s }));
          });
        }
        registerExpirerEvents() {
          this.core.expirer.on(dist_index_es_m_expired, async (e) => {
            const { topic: t } = Fn(e.target);
            t &&
              this.pairings.keys.includes(t) &&
              (await this.deletePairing(t, !0), this.events.emit('pairing_expire', { topic: t }));
          });
        }
      }
      class Rt extends h {
        constructor(e, t) {
          super(e, t),
            (this.core = e),
            (this.logger = t),
            (this.records = new Map()),
            (this.events = new events.EventEmitter()),
            (this.name = 'history'),
            (this.version = '0.3'),
            (this.cached = []),
            (this.initialized = !1),
            (this.storagePrefix = P),
            (this.init = async () => {
              this.initialized ||
                (this.logger.trace('Initialized'),
                await this.restore(),
                this.cached.forEach((i) => this.records.set(i.id, i)),
                (this.cached = []),
                this.registerEventListeners(),
                (this.initialized = !0));
            }),
            (this.set = (i, s, n) => {
              if (
                (this.isInitialized(),
                this.logger.debug('Setting JSON-RPC request history record'),
                this.logger.trace({
                  type: 'method',
                  method: 'set',
                  topic: i,
                  request: s,
                  chainId: n,
                }),
                this.records.has(s.id))
              )
                return;
              const a = {
                id: s.id,
                topic: i,
                request: { method: s.method, params: s.params || null },
                chainId: n,
              };
              this.records.set(a.id, a), this.events.emit(dist_index_es_C_created, a);
            }),
            (this.resolve = async (i) => {
              if (
                (this.isInitialized(),
                this.logger.debug('Updating JSON-RPC response history record'),
                this.logger.trace({ type: 'method', method: 'update', response: i }),
                !this.records.has(i.id))
              )
                return;
              const s = await this.getRecord(i.id);
              typeof s.response > 'u' &&
                ((s.response = (0, jsonrpc_utils_dist_esm.isJsonRpcError)(i)
                  ? { error: i.error }
                  : { result: i.result }),
                this.records.set(s.id, s),
                this.events.emit(dist_index_es_C_updated, s));
            }),
            (this.get = async (i, s) => (
              this.isInitialized(),
              this.logger.debug('Getting record'),
              this.logger.trace({ type: 'method', method: 'get', topic: i, id: s }),
              await this.getRecord(s)
            )),
            (this.delete = (i, s) => {
              this.isInitialized(),
                this.logger.debug('Deleting record'),
                this.logger.trace({ type: 'method', method: 'delete', id: s }),
                this.values.forEach((n) => {
                  if (n.topic === i) {
                    if (typeof s < 'u' && n.id !== s) return;
                    this.records.delete(n.id), this.events.emit(dist_index_es_C_deleted, n);
                  }
                });
            }),
            (this.exists = async (i, s) => (
              this.isInitialized(), !!this.records.has(s) && (await this.getRecord(s)).topic === i
            )),
            (this.on = (i, s) => {
              this.events.on(i, s);
            }),
            (this.once = (i, s) => {
              this.events.once(i, s);
            }),
            (this.off = (i, s) => {
              this.events.off(i, s);
            }),
            (this.removeListener = (i, s) => {
              this.events.removeListener(i, s);
            }),
            (this.logger = (0, dist_cjs.generateChildLogger)(t, this.name));
        }
        get context() {
          return (0, dist_cjs.getLoggerContext)(this.logger);
        }
        get storageKey() {
          return this.storagePrefix + this.version + '//' + this.name;
        }
        get size() {
          return this.records.size;
        }
        get keys() {
          return Array.from(this.records.keys());
        }
        get values() {
          return Array.from(this.records.values());
        }
        get pending() {
          const e = [];
          return (
            this.values.forEach((t) => {
              if (typeof t.response < 'u') return;
              const i = {
                topic: t.topic,
                request: (0, jsonrpc_utils_dist_esm.formatJsonRpcRequest)(
                  t.request.method,
                  t.request.params,
                  t.id
                ),
                chainId: t.chainId,
              };
              return e.push(i);
            }),
            e
          );
        }
        async setJsonRpcRecords(e) {
          await this.core.storage.setItem(this.storageKey, e);
        }
        async getJsonRpcRecords() {
          return await this.core.storage.getItem(this.storageKey);
        }
        getRecord(e) {
          this.isInitialized();
          const t = this.records.get(e);
          if (!t) {
            const { message: i } = index_es_E('NO_MATCHING_KEY', `${this.name}: ${e}`);
            throw new Error(i);
          }
          return t;
        }
        async persist() {
          await this.setJsonRpcRecords(this.values), this.events.emit(dist_index_es_C_sync);
        }
        async restore() {
          try {
            const e = await this.getJsonRpcRecords();
            if (typeof e > 'u' || !e.length) return;
            if (this.records.size) {
              const { message: t } = index_es_E('RESTORE_WILL_OVERRIDE', this.name);
              throw (this.logger.error(t), new Error(t));
            }
            (this.cached = e),
              this.logger.debug(`Successfully Restored records for ${this.name}`),
              this.logger.trace({ type: 'method', method: 'restore', records: this.values });
          } catch (e) {
            this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
          }
        }
        registerEventListeners() {
          this.events.on(dist_index_es_C_created, (e) => {
            const t = dist_index_es_C_created;
            this.logger.info(`Emitting ${t}`),
              this.logger.debug({ type: 'event', event: t, record: e }),
              this.persist();
          }),
            this.events.on(dist_index_es_C_updated, (e) => {
              const t = dist_index_es_C_updated;
              this.logger.info(`Emitting ${t}`),
                this.logger.debug({ type: 'event', event: t, record: e }),
                this.persist();
            }),
            this.events.on(dist_index_es_C_deleted, (e) => {
              const t = dist_index_es_C_deleted;
              this.logger.info(`Emitting ${t}`),
                this.logger.debug({ type: 'event', event: t, record: e }),
                this.persist();
            });
        }
        isInitialized() {
          if (!this.initialized) {
            const { message: e } = index_es_E('NOT_INITIALIZED', this.name);
            throw new Error(e);
          }
        }
      }
      class St extends E {
        constructor(e, t) {
          super(e, t),
            (this.core = e),
            (this.logger = t),
            (this.expirations = new Map()),
            (this.events = new events.EventEmitter()),
            (this.name = 'expirer'),
            (this.version = '0.3'),
            (this.cached = []),
            (this.initialized = !1),
            (this.storagePrefix = P),
            (this.init = async () => {
              this.initialized ||
                (this.logger.trace('Initialized'),
                await this.restore(),
                this.cached.forEach((i) => this.expirations.set(i.target, i)),
                (this.cached = []),
                this.registerEventListeners(),
                (this.initialized = !0));
            }),
            (this.has = (i) => {
              try {
                const s = this.formatTarget(i);
                return typeof this.getExpiration(s) < 'u';
              } catch {
                return !1;
              }
            }),
            (this.set = (i, s) => {
              this.isInitialized();
              const n = this.formatTarget(i),
                a = { target: n, expiry: s };
              this.expirations.set(n, a),
                this.checkExpiry(n, a),
                this.events.emit(dist_index_es_m_created, { target: n, expiration: a });
            }),
            (this.get = (i) => {
              this.isInitialized();
              const s = this.formatTarget(i);
              return this.getExpiration(s);
            }),
            (this.del = (i) => {
              if ((this.isInitialized(), this.has(i))) {
                const s = this.formatTarget(i),
                  n = this.getExpiration(s);
                this.expirations.delete(s),
                  this.events.emit(dist_index_es_m_deleted, { target: s, expiration: n });
              }
            }),
            (this.on = (i, s) => {
              this.events.on(i, s);
            }),
            (this.once = (i, s) => {
              this.events.once(i, s);
            }),
            (this.off = (i, s) => {
              this.events.off(i, s);
            }),
            (this.removeListener = (i, s) => {
              this.events.removeListener(i, s);
            }),
            (this.logger = (0, dist_cjs.generateChildLogger)(t, this.name));
        }
        get context() {
          return (0, dist_cjs.getLoggerContext)(this.logger);
        }
        get storageKey() {
          return this.storagePrefix + this.version + '//' + this.name;
        }
        get length() {
          return this.expirations.size;
        }
        get keys() {
          return Array.from(this.expirations.keys());
        }
        get values() {
          return Array.from(this.expirations.values());
        }
        formatTarget(e) {
          if ('string' == typeof e)
            return (function kn(e) {
              return W('topic', e);
            })(e);
          if ('number' == typeof e)
            return (function Ln(e) {
              return W('id', e);
            })(e);
          const { message: t } = index_es_E('UNKNOWN_TYPE', 'Target type: ' + typeof e);
          throw new Error(t);
        }
        async setExpirations(e) {
          await this.core.storage.setItem(this.storageKey, e);
        }
        async getExpirations() {
          return await this.core.storage.getItem(this.storageKey);
        }
        async persist() {
          await this.setExpirations(this.values), this.events.emit(dist_index_es_m_sync);
        }
        async restore() {
          try {
            const e = await this.getExpirations();
            if (typeof e > 'u' || !e.length) return;
            if (this.expirations.size) {
              const { message: t } = index_es_E('RESTORE_WILL_OVERRIDE', this.name);
              throw (this.logger.error(t), new Error(t));
            }
            (this.cached = e),
              this.logger.debug(`Successfully Restored expirations for ${this.name}`),
              this.logger.trace({ type: 'method', method: 'restore', expirations: this.values });
          } catch (e) {
            this.logger.debug(`Failed to Restore expirations for ${this.name}`),
              this.logger.error(e);
          }
        }
        getExpiration(e) {
          const t = this.expirations.get(e);
          if (!t) {
            const { message: i } = index_es_E('NO_MATCHING_KEY', `${this.name}: ${e}`);
            throw (this.logger.error(i), new Error(i));
          }
          return t;
        }
        checkExpiry(e, t) {
          const { expiry: i } = t;
          (0, time_dist_cjs.toMiliseconds)(i) - Date.now() <= 0 && this.expire(e, t);
        }
        expire(e, t) {
          this.expirations.delete(e),
            this.events.emit(dist_index_es_m_expired, { target: e, expiration: t });
        }
        checkExpirations() {
          this.expirations.forEach((e, t) => this.checkExpiry(t, e));
        }
        registerEventListeners() {
          this.core.heartbeat.on(cjs.HEARTBEAT_EVENTS.pulse, () => this.checkExpirations()),
            this.events.on(dist_index_es_m_created, (e) => {
              const t = dist_index_es_m_created;
              this.logger.info(`Emitting ${t}`),
                this.logger.debug({ type: 'event', event: t, data: e }),
                this.persist();
            }),
            this.events.on(dist_index_es_m_expired, (e) => {
              const t = dist_index_es_m_expired;
              this.logger.info(`Emitting ${t}`),
                this.logger.debug({ type: 'event', event: t, data: e }),
                this.persist();
            }),
            this.events.on(dist_index_es_m_deleted, (e) => {
              const t = dist_index_es_m_deleted;
              this.logger.info(`Emitting ${t}`),
                this.logger.debug({ type: 'event', event: t, data: e }),
                this.persist();
            });
        }
        isInitialized() {
          if (!this.initialized) {
            const { message: e } = index_es_E('NOT_INITIALIZED', this.name);
            throw new Error(e);
          }
        }
      }
      var cr = Object.defineProperty,
        Tt = Object.getOwnPropertySymbols,
        ur = Object.prototype.hasOwnProperty,
        lr = Object.prototype.propertyIsEnumerable,
        Pt = (r, e, t) =>
          e in r
            ? cr(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
            : (r[e] = t),
        xt = (r, e) => {
          for (var t in e || (e = {})) ur.call(e, t) && Pt(r, t, e[t]);
          if (Tt) for (var t of Tt(e)) lr.call(e, t) && Pt(r, t, e[t]);
          return r;
        };
      class V extends n {
        constructor(e) {
          super(e),
            (this.protocol = 'wc'),
            (this.version = 2),
            (this.name = 'core'),
            (this.events = new events.EventEmitter()),
            (this.initialized = !1),
            (this.on = (i, s) => this.events.on(i, s)),
            (this.once = (i, s) => this.events.once(i, s)),
            (this.off = (i, s) => this.events.off(i, s)),
            (this.removeListener = (i, s) => this.events.removeListener(i, s)),
            (this.projectId = e?.projectId);
          const t =
            typeof e?.logger < 'u' && 'string' != typeof e?.logger
              ? e.logger
              : browser_default()(
                  (0, dist_cjs.getDefaultLoggerOptions)({ level: e?.logger || index_es_$e_logger })
                );
          (this.logger = (0, dist_cjs.generateChildLogger)(t, this.name)),
            (this.heartbeat = new cjs.HeartBeat()),
            (this.crypto = new gt(this, this.logger, e?.keychain)),
            (this.history = new Rt(this, this.logger)),
            (this.expirer = new St(this, this.logger)),
            (this.storage =
              null != e && e.storage
                ? e.storage
                : new cjs_browser.ZP(xt(xt({}, index_es_ke), e?.storageOptions))),
            (this.relayer = new index_es_ft({
              core: this,
              logger: this.logger,
              relayUrl: e?.relayUrl,
              projectId: this.projectId,
            })),
            (this.pairing = new _t(this, this.logger));
        }
        static async init(e) {
          const t = new V(e);
          return await t.initialize(), t;
        }
        get context() {
          return (0, dist_cjs.getLoggerContext)(this.logger);
        }
        async start() {
          this.initialized || (await this.initialize());
        }
        async initialize() {
          this.logger.trace('Initialized');
          try {
            await this.crypto.init(),
              await this.history.init(),
              await this.expirer.init(),
              await this.relayer.init(),
              await this.heartbeat.init(),
              await this.pairing.init(),
              (this.initialized = !0),
              this.logger.info('Core Initialization Success');
          } catch (e) {
            throw (
              (this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e),
              this.logger.error(e.message),
              e)
            );
          }
        }
      }
      const dr = V,
        sign_client_dist_index_es_C_name = 'client',
        sign_client_dist_index_es_C_logger = 'error',
        index_es_T = time_dist_cjs.SEVEN_DAYS,
        index_es_P = {
          wc_sessionPropose: {
            req: { ttl: time_dist_cjs.FIVE_MINUTES, prompt: !0, tag: 1100 },
            res: { ttl: time_dist_cjs.FIVE_MINUTES, prompt: !1, tag: 1101 },
          },
          wc_sessionSettle: {
            req: { ttl: time_dist_cjs.FIVE_MINUTES, prompt: !1, tag: 1102 },
            res: { ttl: time_dist_cjs.FIVE_MINUTES, prompt: !1, tag: 1103 },
          },
          wc_sessionUpdate: {
            req: { ttl: time_dist_cjs.ONE_DAY, prompt: !1, tag: 1104 },
            res: { ttl: time_dist_cjs.ONE_DAY, prompt: !1, tag: 1105 },
          },
          wc_sessionExtend: {
            req: { ttl: time_dist_cjs.ONE_DAY, prompt: !1, tag: 1106 },
            res: { ttl: time_dist_cjs.ONE_DAY, prompt: !1, tag: 1107 },
          },
          wc_sessionRequest: {
            req: { ttl: time_dist_cjs.FIVE_MINUTES, prompt: !0, tag: 1108 },
            res: { ttl: time_dist_cjs.FIVE_MINUTES, prompt: !1, tag: 1109 },
          },
          wc_sessionEvent: {
            req: { ttl: time_dist_cjs.FIVE_MINUTES, prompt: !0, tag: 1110 },
            res: { ttl: time_dist_cjs.FIVE_MINUTES, prompt: !1, tag: 1111 },
          },
          wc_sessionDelete: {
            req: { ttl: time_dist_cjs.ONE_DAY, prompt: !1, tag: 1112 },
            res: { ttl: time_dist_cjs.ONE_DAY, prompt: !1, tag: 1113 },
          },
          wc_sessionPing: {
            req: { ttl: time_dist_cjs.THIRTY_SECONDS, prompt: !1, tag: 1114 },
            res: { ttl: time_dist_cjs.THIRTY_SECONDS, prompt: !1, tag: 1115 },
          },
        },
        index_es_L = { min: time_dist_cjs.FIVE_MINUTES, max: time_dist_cjs.SEVEN_DAYS };
      var index_es_Ye = Object.defineProperty,
        dist_index_es_ke = Object.defineProperties,
        dist_index_es_Xe = Object.getOwnPropertyDescriptors,
        dist_index_es_se = Object.getOwnPropertySymbols,
        index_es_Je = Object.prototype.hasOwnProperty,
        dist_index_es_He = Object.prototype.propertyIsEnumerable,
        index_es_te = (h, n, e) =>
          n in h
            ? index_es_Ye(h, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
            : (h[n] = e),
        dist_index_es_y = (h, n) => {
          for (var e in n || (n = {})) index_es_Je.call(n, e) && index_es_te(h, e, n[e]);
          if (dist_index_es_se)
            for (var e of dist_index_es_se(n))
              dist_index_es_He.call(n, e) && index_es_te(h, e, n[e]);
          return h;
        },
        index_es_j = (h, n) => dist_index_es_ke(h, dist_index_es_Xe(n));
      class dist_index_es_Fe extends C {
        constructor(n) {
          super(n),
            (this.name = 'engine'),
            (this.events = new (events_default())()),
            (this.initialized = !1),
            (this.ignoredPayloadTypes = [index_es_b]),
            (this.init = async () => {
              this.initialized ||
                (await this.cleanup(),
                this.registerRelayerEvents(),
                this.registerExpirerEvents(),
                this.client.core.pairing.register({ methods: Object.keys(index_es_P) }),
                (this.initialized = !0));
            }),
            (this.connect = async (e) => {
              this.isInitialized(), await this.isValidConnect(e);
              const { pairingTopic: s, requiredNamespaces: t, relays: i } = e;
              let o,
                r = s,
                a = !1;
              if ((r && (a = this.client.core.pairing.pairings.get(r).active), !r || !a)) {
                const { topic: E, uri: g } = await this.client.core.pairing.create();
                (r = E), (o = g);
              }
              const l = await this.client.core.crypto.generateKeyPair(),
                d = {
                  requiredNamespaces: t,
                  relays: i ?? [{ protocol: 'irn' }],
                  proposer: { publicKey: l, metadata: this.client.metadata },
                },
                { reject: S, resolve: w, done: V } = Mn();
              if (
                (this.events.once(Hn('session_connect'), async ({ error: E, session: g }) => {
                  if (E) S(E);
                  else if (g) {
                    g.self.publicKey = l;
                    const O = index_es_j(dist_index_es_y({}, g), {
                      requiredNamespaces: g.requiredNamespaces,
                    });
                    await this.client.session.set(g.topic, O),
                      await this.setExpiry(g.topic, g.expiry),
                      r &&
                        (await this.client.core.pairing.updateMetadata({
                          topic: r,
                          metadata: g.peer.metadata,
                        })),
                      w(O);
                  }
                }),
                !r)
              ) {
                const { message: E } = index_es_E(
                  'NO_MATCHING_KEY',
                  `connect() pairing topic: ${r}`
                );
                throw new Error(E);
              }
              const x = await this.sendRequest(r, 'wc_sessionPropose', d),
                G = jn(time_dist_cjs.FIVE_MINUTES);
              return (
                await this.setProposal(x, dist_index_es_y({ id: x, expiry: G }, d)),
                { uri: o, approval: V }
              );
            }),
            (this.pair = async (e) => (
              this.isInitialized(), await this.client.core.pairing.pair(e)
            )),
            (this.approve = async (e) => {
              this.isInitialized(), await this.isValidApprove(e);
              const { id: s, relayProtocol: t, namespaces: i } = e,
                r = this.client.proposal.get(s);
              let { pairingTopic: o, proposer: a, requiredNamespaces: l } = r;
              J(l) ||
                ((l = (function Zn(e, n) {
                  const t = Be(e, n);
                  if (t) throw new Error(t.message);
                  const r = {};
                  for (const [o, i] of Object.entries(e))
                    r[o] = {
                      methods: i.methods,
                      events: i.events,
                      chains: i.accounts.map((s) => `${s.split(':')[0]}:${s.split(':')[1]}`),
                    };
                  return r;
                })(i, 'approve()')),
                this.client.proposal.set(
                  s,
                  index_es_j(dist_index_es_y({}, r), { requiredNamespaces: l })
                ));
              const d = await this.client.core.crypto.generateKeyPair(),
                S = a.publicKey,
                w = await this.client.core.crypto.generateSharedKey(d, S),
                V = {
                  relay: { protocol: t ?? 'irn' },
                  namespaces: i,
                  requiredNamespaces: l,
                  controller: { publicKey: d, metadata: this.client.metadata },
                  expiry: jn(index_es_T),
                };
              await this.client.core.relayer.subscribe(w);
              const x = await this.sendRequest(w, 'wc_sessionSettle', V),
                { done: G, resolve: E, reject: g } = Mn();
              this.events.once(Hn('session_approve', x), ({ error: Y }) => {
                Y ? g(Y) : E(this.client.session.get(w));
              });
              const O = index_es_j(dist_index_es_y({}, V), {
                topic: w,
                acknowledged: !1,
                self: V.controller,
                peer: { publicKey: a.publicKey, metadata: a.metadata },
                controller: d,
              });
              return (
                await this.client.session.set(w, O),
                await this.setExpiry(w, jn(index_es_T)),
                o &&
                  (await this.client.core.pairing.updateMetadata({
                    topic: o,
                    metadata: O.peer.metadata,
                  })),
                o &&
                  s &&
                  (await this.sendResult(s, o, {
                    relay: { protocol: t ?? 'irn' },
                    responderPublicKey: d,
                  }),
                  await this.client.proposal.delete(s, N('USER_DISCONNECTED')),
                  await this.client.core.pairing.activate({ topic: o })),
                { topic: w, acknowledged: G }
              );
            }),
            (this.reject = async (e) => {
              this.isInitialized(), await this.isValidReject(e);
              const { id: s, reason: t } = e,
                { pairingTopic: i } = this.client.proposal.get(s);
              i &&
                (await this.sendError(s, i, t),
                await this.client.proposal.delete(s, N('USER_DISCONNECTED')));
            }),
            (this.update = async (e) => {
              this.isInitialized(), await this.isValidUpdate(e);
              const { topic: s, namespaces: t } = e,
                i = await this.sendRequest(s, 'wc_sessionUpdate', { namespaces: t }),
                { done: r, resolve: o, reject: a } = Mn();
              return (
                this.events.once(Hn('session_update', i), ({ error: l }) => {
                  l ? a(l) : o();
                }),
                await this.client.session.update(s, { namespaces: t }),
                { acknowledged: r }
              );
            }),
            (this.extend = async (e) => {
              this.isInitialized(), await this.isValidExtend(e);
              const { topic: s } = e,
                t = await this.sendRequest(s, 'wc_sessionExtend', {}),
                { done: i, resolve: r, reject: o } = Mn();
              return (
                this.events.once(Hn('session_extend', t), ({ error: a }) => {
                  a ? o(a) : r();
                }),
                await this.setExpiry(s, jn(index_es_T)),
                { acknowledged: i }
              );
            }),
            (this.request = async (e) => {
              this.isInitialized(), await this.isValidRequest(e);
              const { chainId: s, request: t, topic: i, expiry: r } = e,
                o = await this.sendRequest(i, 'wc_sessionRequest', { request: t, chainId: s }, r),
                { done: a, resolve: l, reject: d } = Mn(r);
              return (
                this.events.once(Hn('session_request', o), ({ error: S, result: w }) => {
                  S ? d(S) : l(w);
                }),
                await a()
              );
            }),
            (this.respond = async (e) => {
              this.isInitialized(), await this.isValidRespond(e);
              const { topic: s, response: t } = e,
                { id: i } = t;
              (0, jsonrpc_utils_dist_esm.isJsonRpcResult)(t)
                ? await this.sendResult(i, s, t.result)
                : (0, jsonrpc_utils_dist_esm.isJsonRpcError)(t) &&
                  (await this.sendError(i, s, t.error)),
                this.deletePendingSessionRequest(e.response.id, { message: 'fulfilled', code: 0 });
            }),
            (this.ping = async (e) => {
              this.isInitialized(), await this.isValidPing(e);
              const { topic: s } = e;
              if (this.client.session.keys.includes(s)) {
                const t = await this.sendRequest(s, 'wc_sessionPing', {}),
                  { done: i, resolve: r, reject: o } = Mn();
                this.events.once(Hn('session_ping', t), ({ error: a }) => {
                  a ? o(a) : r();
                }),
                  await i();
              } else
                this.client.core.pairing.pairings.keys.includes(s) &&
                  (await this.client.core.pairing.ping({ topic: s }));
            }),
            (this.emit = async (e) => {
              this.isInitialized(), await this.isValidEmit(e);
              const { topic: s, event: t, chainId: i } = e;
              await this.sendRequest(s, 'wc_sessionEvent', { event: t, chainId: i });
            }),
            (this.disconnect = async (e) => {
              this.isInitialized(), await this.isValidDisconnect(e);
              const { topic: s } = e;
              this.client.session.keys.includes(s)
                ? (await this.sendRequest(s, 'wc_sessionDelete', N('USER_DISCONNECTED')),
                  await this.deleteSession(s))
                : await this.client.core.pairing.disconnect({ topic: s });
            }),
            (this.find = (e) => (
              this.isInitialized(),
              this.client.session.getAll().filter((s) =>
                (function nt(e, n) {
                  const { requiredNamespaces: t } = n,
                    r = Object.keys(e.namespaces),
                    o = Object.keys(t);
                  let i = !0;
                  return (
                    !!index_es_u(o, r) &&
                    (r.forEach((s) => {
                      const { accounts: c, methods: l, events: h, extension: g } = e.namespaces[s],
                        P = index_es_m(c),
                        v = t[s];
                      (index_es_u(v.chains, P) &&
                        index_es_u(v.methods, l) &&
                        index_es_u(v.events, h)) ||
                        (i = !1),
                        i &&
                          g &&
                          g.forEach((_) => {
                            var O;
                            const { accounts: j, methods: Ye, events: We } = _,
                              Je = index_es_m(j);
                            (null != (O = v.extension) &&
                              O.find(
                                (V) =>
                                  index_es_u(V.chains, Je) &&
                                  index_es_u(V.methods, Ye) &&
                                  index_es_u(V.events, We)
                              )) ||
                              (i = !1);
                          });
                    }),
                    i)
                  );
                })(s, e)
              )
            )),
            (this.getPendingSessionRequests = () => (
              this.isInitialized(), this.client.pendingRequest.getAll()
            )),
            (this.deleteSession = async (e, s) => {
              const { self: t } = this.client.session.get(e);
              await this.client.core.relayer.unsubscribe(e),
                await Promise.all([
                  this.client.session.delete(e, N('USER_DISCONNECTED')),
                  this.client.core.crypto.deleteKeyPair(t.publicKey),
                  this.client.core.crypto.deleteSymKey(e),
                  s ? Promise.resolve() : this.client.core.expirer.del(e),
                ]);
            }),
            (this.deleteProposal = async (e, s) => {
              await Promise.all([
                this.client.proposal.delete(e, N('USER_DISCONNECTED')),
                s ? Promise.resolve() : this.client.core.expirer.del(e),
              ]);
            }),
            (this.deletePendingSessionRequest = async (e, s, t = !1) => {
              await Promise.all([
                this.client.pendingRequest.delete(e, s),
                t ? Promise.resolve() : this.client.core.expirer.del(e),
              ]);
            }),
            (this.setExpiry = async (e, s) => {
              this.client.session.keys.includes(e) &&
                (await this.client.session.update(e, { expiry: s })),
                this.client.core.expirer.set(e, s);
            }),
            (this.setProposal = async (e, s) => {
              await this.client.proposal.set(e, s), this.client.core.expirer.set(e, s.expiry);
            }),
            (this.setPendingSessionRequest = async (e) => {
              const s = index_es_P.wc_sessionRequest.req.ttl,
                { id: t, topic: i, params: r } = e;
              await this.client.pendingRequest.set(t, { id: t, topic: i, params: r }),
                s && this.client.core.expirer.set(t, jn(s));
            }),
            (this.sendRequest = async (e, s, t, i) => {
              const r = (0, jsonrpc_utils_dist_esm.formatJsonRpcRequest)(s, t),
                o = await this.client.core.crypto.encode(e, r),
                a = index_es_P[s].req;
              return (
                i && (a.ttl = i),
                this.client.core.history.set(e, r),
                this.client.core.relayer.publish(e, o, a),
                r.id
              );
            }),
            (this.sendResult = async (e, s, t) => {
              const i = (0, jsonrpc_utils_dist_esm.formatJsonRpcResult)(e, t),
                r = await this.client.core.crypto.encode(s, i),
                o = await this.client.core.history.get(s, e),
                a = index_es_P[o.request.method].res;
              this.client.core.relayer.publish(s, r, a), await this.client.core.history.resolve(i);
            }),
            (this.sendError = async (e, s, t) => {
              const i = (0, jsonrpc_utils_dist_esm.formatJsonRpcError)(e, t),
                r = await this.client.core.crypto.encode(s, i),
                o = await this.client.core.history.get(s, e),
                a = index_es_P[o.request.method].res;
              this.client.core.relayer.publish(s, r, a), await this.client.core.history.resolve(i);
            }),
            (this.cleanup = async () => {
              const e = [],
                s = [];
              this.client.session.getAll().forEach((t) => {
                Vn(t.expiry) && e.push(t.topic);
              }),
                this.client.proposal.getAll().forEach((t) => {
                  Vn(t.expiry) && s.push(t.id);
                }),
                await Promise.all([
                  ...e.map((t) => this.deleteSession(t)),
                  ...s.map((t) => this.deleteProposal(t)),
                ]);
            }),
            (this.onRelayEventRequest = (e) => {
              const { topic: s, payload: t } = e,
                i = t.method;
              switch (i) {
                case 'wc_sessionPropose':
                  return this.onSessionProposeRequest(s, t);
                case 'wc_sessionSettle':
                  return this.onSessionSettleRequest(s, t);
                case 'wc_sessionUpdate':
                  return this.onSessionUpdateRequest(s, t);
                case 'wc_sessionExtend':
                  return this.onSessionExtendRequest(s, t);
                case 'wc_sessionPing':
                  return this.onSessionPingRequest(s, t);
                case 'wc_sessionDelete':
                  return this.onSessionDeleteRequest(s, t);
                case 'wc_sessionRequest':
                  return this.onSessionRequest(s, t);
                case 'wc_sessionEvent':
                  return this.onSessionEventRequest(s, t);
                default:
                  return this.client.logger.info(`Unsupported request method ${i}`);
              }
            }),
            (this.onRelayEventResponse = async (e) => {
              const { topic: s, payload: t } = e,
                i = (await this.client.core.history.get(s, t.id)).request.method;
              switch (i) {
                case 'wc_sessionPropose':
                  return this.onSessionProposeResponse(s, t);
                case 'wc_sessionSettle':
                  return this.onSessionSettleResponse(s, t);
                case 'wc_sessionUpdate':
                  return this.onSessionUpdateResponse(s, t);
                case 'wc_sessionExtend':
                  return this.onSessionExtendResponse(s, t);
                case 'wc_sessionPing':
                  return this.onSessionPingResponse(s, t);
                case 'wc_sessionRequest':
                  return this.onSessionRequestResponse(s, t);
                default:
                  return this.client.logger.info(`Unsupported response method ${i}`);
              }
            }),
            (this.onSessionProposeRequest = async (e, s) => {
              const { params: t, id: i } = s;
              try {
                this.isValidConnect(dist_index_es_y({}, s.params));
                const r = jn(time_dist_cjs.FIVE_MINUTES),
                  o = dist_index_es_y({ id: i, pairingTopic: e, expiry: r }, t);
                await this.setProposal(i, o),
                  this.client.events.emit('session_proposal', { id: i, params: o });
              } catch (r) {
                await this.sendError(i, e, r), this.client.logger.error(r);
              }
            }),
            (this.onSessionProposeResponse = async (e, s) => {
              const { id: t } = s;
              if ((0, jsonrpc_utils_dist_esm.isJsonRpcResult)(s)) {
                const { result: i } = s;
                this.client.logger.trace({
                  type: 'method',
                  method: 'onSessionProposeResponse',
                  result: i,
                });
                const r = this.client.proposal.get(t);
                this.client.logger.trace({
                  type: 'method',
                  method: 'onSessionProposeResponse',
                  proposal: r,
                });
                const o = r.proposer.publicKey;
                this.client.logger.trace({
                  type: 'method',
                  method: 'onSessionProposeResponse',
                  selfPublicKey: o,
                });
                const a = i.responderPublicKey;
                this.client.logger.trace({
                  type: 'method',
                  method: 'onSessionProposeResponse',
                  peerPublicKey: a,
                });
                const l = await this.client.core.crypto.generateSharedKey(o, a);
                this.client.logger.trace({
                  type: 'method',
                  method: 'onSessionProposeResponse',
                  sessionTopic: l,
                });
                const d = await this.client.core.relayer.subscribe(l);
                this.client.logger.trace({
                  type: 'method',
                  method: 'onSessionProposeResponse',
                  subscriptionId: d,
                }),
                  await this.client.core.pairing.activate({ topic: e });
              } else
                (0, jsonrpc_utils_dist_esm.isJsonRpcError)(s) &&
                  (await this.client.proposal.delete(t, N('USER_DISCONNECTED')),
                  this.events.emit(Hn('session_connect'), { error: s.error }));
            }),
            (this.onSessionSettleRequest = async (e, s) => {
              const { id: t, params: i } = s;
              try {
                this.isValidSessionSettleRequest(i);
                const {
                    relay: r,
                    controller: o,
                    expiry: a,
                    namespaces: l,
                    requiredNamespaces: d,
                  } = s.params,
                  S = {
                    topic: e,
                    relay: r,
                    expiry: a,
                    namespaces: l,
                    acknowledged: !0,
                    requiredNamespaces: d,
                    controller: o.publicKey,
                    self: { publicKey: '', metadata: this.client.metadata },
                    peer: { publicKey: o.publicKey, metadata: o.metadata },
                  };
                await this.sendResult(s.id, e, !0),
                  this.events.emit(Hn('session_connect'), { session: S });
              } catch (r) {
                await this.sendError(t, e, r), this.client.logger.error(r);
              }
            }),
            (this.onSessionSettleResponse = async (e, s) => {
              const { id: t } = s;
              (0, jsonrpc_utils_dist_esm.isJsonRpcResult)(s)
                ? (await this.client.session.update(e, { acknowledged: !0 }),
                  this.events.emit(Hn('session_approve', t), {}))
                : (0, jsonrpc_utils_dist_esm.isJsonRpcError)(s) &&
                  (await this.client.session.delete(e, N('USER_DISCONNECTED')),
                  this.events.emit(Hn('session_approve', t), { error: s.error }));
            }),
            (this.onSessionUpdateRequest = async (e, s) => {
              const { params: t, id: i } = s;
              try {
                this.isValidUpdate(dist_index_es_y({ topic: e }, t)),
                  await this.client.session.update(e, { namespaces: t.namespaces }),
                  await this.sendResult(i, e, !0),
                  this.client.events.emit('session_update', { id: i, topic: e, params: t });
              } catch (r) {
                await this.sendError(i, e, r), this.client.logger.error(r);
              }
            }),
            (this.onSessionUpdateResponse = (e, s) => {
              const { id: t } = s;
              (0, jsonrpc_utils_dist_esm.isJsonRpcResult)(s)
                ? this.events.emit(Hn('session_update', t), {})
                : (0, jsonrpc_utils_dist_esm.isJsonRpcError)(s) &&
                  this.events.emit(Hn('session_update', t), { error: s.error });
            }),
            (this.onSessionExtendRequest = async (e, s) => {
              const { id: t } = s;
              try {
                this.isValidExtend({ topic: e }),
                  await this.setExpiry(e, jn(index_es_T)),
                  await this.sendResult(t, e, !0),
                  this.client.events.emit('session_extend', { id: t, topic: e });
              } catch (i) {
                await this.sendError(t, e, i), this.client.logger.error(i);
              }
            }),
            (this.onSessionExtendResponse = (e, s) => {
              const { id: t } = s;
              (0, jsonrpc_utils_dist_esm.isJsonRpcResult)(s)
                ? this.events.emit(Hn('session_extend', t), {})
                : (0, jsonrpc_utils_dist_esm.isJsonRpcError)(s) &&
                  this.events.emit(Hn('session_extend', t), { error: s.error });
            }),
            (this.onSessionPingRequest = async (e, s) => {
              const { id: t } = s;
              try {
                this.isValidPing({ topic: e }),
                  await this.sendResult(t, e, !0),
                  this.client.events.emit('session_ping', { id: t, topic: e });
              } catch (i) {
                await this.sendError(t, e, i), this.client.logger.error(i);
              }
            }),
            (this.onSessionPingResponse = (e, s) => {
              const { id: t } = s;
              setTimeout(() => {
                (0, jsonrpc_utils_dist_esm.isJsonRpcResult)(s)
                  ? this.events.emit(Hn('session_ping', t), {})
                  : (0, jsonrpc_utils_dist_esm.isJsonRpcError)(s) &&
                    this.events.emit(Hn('session_ping', t), { error: s.error });
              }, 500);
            }),
            (this.onSessionDeleteRequest = async (e, s) => {
              const { id: t } = s;
              try {
                this.isValidDisconnect({ topic: e, reason: s.params }),
                  await this.sendResult(t, e, !0),
                  await this.deleteSession(e),
                  this.client.events.emit('session_delete', { id: t, topic: e });
              } catch (i) {
                await this.sendError(t, e, i), this.client.logger.error(i);
              }
            }),
            (this.onSessionRequest = async (e, s) => {
              const { id: t, params: i } = s;
              try {
                this.isValidRequest(dist_index_es_y({ topic: e }, i)),
                  await this.setPendingSessionRequest({ id: t, topic: e, params: i }),
                  this.client.events.emit('session_request', { id: t, topic: e, params: i });
              } catch (r) {
                await this.sendError(t, e, r), this.client.logger.error(r);
              }
            }),
            (this.onSessionRequestResponse = (e, s) => {
              const { id: t } = s;
              (0, jsonrpc_utils_dist_esm.isJsonRpcResult)(s)
                ? this.events.emit(Hn('session_request', t), { result: s.result })
                : (0, jsonrpc_utils_dist_esm.isJsonRpcError)(s) &&
                  this.events.emit(Hn('session_request', t), { error: s.error });
            }),
            (this.onSessionEventRequest = async (e, s) => {
              const { id: t, params: i } = s;
              try {
                this.isValidEmit(dist_index_es_y({ topic: e }, i)),
                  this.client.events.emit('session_event', { id: t, topic: e, params: i });
              } catch (r) {
                await this.sendError(t, e, r), this.client.logger.error(r);
              }
            }),
            (this.isValidConnect = async (e) => {
              if (!ut(e)) {
                const { message: o } = index_es_E(
                  'MISSING_OR_INVALID',
                  `connect() params: ${JSON.stringify(e)}`
                );
                throw new Error(o);
              }
              const { pairingTopic: s, requiredNamespaces: t, relays: i } = e;
              if (
                (index_es_y(s) || (await this.isValidPairingTopic(s)), !index_es_y(t) && 0 === J(t))
              )
                return;
              const r = it(t, 'connect()');
              if (r) throw new Error(r.message);
              if (
                !(function ct(e, n) {
                  let t = !1;
                  return (
                    n && !e
                      ? (t = !0)
                      : e &&
                        index_es_I(e) &&
                        e.length &&
                        e.forEach((r) => {
                          t = ze(r);
                        }),
                    t
                  );
                })(i, !0)
              ) {
                const { message: o } = index_es_E('MISSING_OR_INVALID', `connect() relays: ${i}`);
                throw new Error(o);
              }
            }),
            (this.isValidApprove = async (e) => {
              if (!ut(e))
                throw new Error(index_es_E('MISSING_OR_INVALID', `approve() params: ${e}`).message);
              const { id: s, namespaces: t, relayProtocol: i } = e;
              await this.isValidProposalId(s);
              const r = this.client.proposal.get(s),
                o = Be(t, 'approve()');
              if (o) throw new Error(o.message);
              const a = ht(r.requiredNamespaces, t, 'update()');
              if (a) throw new Error(a.message);
              if (!index_es_d(i, !0)) {
                const { message: l } = index_es_E(
                  'MISSING_OR_INVALID',
                  `approve() relayProtocol: ${i}`
                );
                throw new Error(l);
              }
            }),
            (this.isValidReject = async (e) => {
              if (!ut(e)) {
                const { message: i } = index_es_E('MISSING_OR_INVALID', `reject() params: ${e}`);
                throw new Error(i);
              }
              const { id: s, reason: t } = e;
              if (
                (await this.isValidProposalId(s),
                !(function dt(e) {
                  return !!(
                    e &&
                    'object' == typeof e &&
                    e.code &&
                    D(e.code, !1) &&
                    e.message &&
                    index_es_d(e.message, !1)
                  );
                })(t))
              ) {
                const { message: i } = index_es_E(
                  'MISSING_OR_INVALID',
                  `reject() reason: ${JSON.stringify(t)}`
                );
                throw new Error(i);
              }
            }),
            (this.isValidSessionSettleRequest = (e) => {
              if (!ut(e)) {
                const { message: l } = index_es_E(
                  'MISSING_OR_INVALID',
                  `onSessionSettleRequest() params: ${e}`
                );
                throw new Error(l);
              }
              const { relay: s, controller: t, namespaces: i, expiry: r } = e;
              if (!ze(s)) {
                const { message: l } = index_es_E(
                  'MISSING_OR_INVALID',
                  'onSessionSettleRequest() relay protocol should be a string'
                );
                throw new Error(l);
              }
              const o = (function st(e, n) {
                let t = null;
                return (
                  index_es_d(e?.publicKey, !1) ||
                    (t = index_es_E(
                      'MISSING_OR_INVALID',
                      `${n} controller public key should be a string`
                    )),
                  t
                );
              })(t, 'onSessionSettleRequest()');
              if (o) throw new Error(o.message);
              const a = Be(i, 'onSessionSettleRequest()');
              if (a) throw new Error(a.message);
              if (Vn(r)) {
                const { message: l } = index_es_E('EXPIRED', 'onSessionSettleRequest()');
                throw new Error(l);
              }
            }),
            (this.isValidUpdate = async (e) => {
              if (!ut(e)) {
                const { message: a } = index_es_E('MISSING_OR_INVALID', `update() params: ${e}`);
                throw new Error(a);
              }
              const { topic: s, namespaces: t } = e;
              await this.isValidSessionTopic(s);
              const i = this.client.session.get(s),
                r = Be(t, 'update()');
              if (r) throw new Error(r.message);
              const o = ht(i.requiredNamespaces, t, 'update()');
              if (o) throw new Error(o.message);
            }),
            (this.isValidExtend = async (e) => {
              if (!ut(e)) {
                const { message: t } = index_es_E('MISSING_OR_INVALID', `extend() params: ${e}`);
                throw new Error(t);
              }
              const { topic: s } = e;
              await this.isValidSessionTopic(s);
            }),
            (this.isValidRequest = async (e) => {
              if (!ut(e)) {
                const { message: a } = index_es_E('MISSING_OR_INVALID', `request() params: ${e}`);
                throw new Error(a);
              }
              const { topic: s, request: t, chainId: i, expiry: r } = e;
              await this.isValidSessionTopic(s);
              const { namespaces: o } = this.client.session.get(s);
              if (!mt(o, i)) {
                const { message: a } = index_es_E('MISSING_OR_INVALID', `request() chainId: ${i}`);
                throw new Error(a);
              }
              if (
                !(function lt(e) {
                  return !(index_es_y(e) || !index_es_d(e.method, !1));
                })(t)
              ) {
                const { message: a } = index_es_E(
                  'MISSING_OR_INVALID',
                  `request() ${JSON.stringify(t)}`
                );
                throw new Error(a);
              }
              if (!Et(o, i, t.method)) {
                const { message: a } = index_es_E(
                  'MISSING_OR_INVALID',
                  `request() method: ${t.method}`
                );
                throw new Error(a);
              }
              if (
                r &&
                !(function Nt(e, n) {
                  return D(e, !1) && e <= n.max && e >= n.min;
                })(r, index_es_L)
              ) {
                const { message: a } = index_es_E(
                  'MISSING_OR_INVALID',
                  `request() expiry: ${r}. Expiry must be a number (in seconds) between ${index_es_L.min} and ${index_es_L.max}`
                );
                throw new Error(a);
              }
            }),
            (this.isValidRespond = async (e) => {
              if (!ut(e)) {
                const { message: i } = index_es_E('MISSING_OR_INVALID', `respond() params: ${e}`);
                throw new Error(i);
              }
              const { topic: s, response: t } = e;
              if (
                (await this.isValidSessionTopic(s),
                !(function ft(e) {
                  return !(
                    index_es_y(e) ||
                    (index_es_y(e.result) && index_es_y(e.error)) ||
                    !D(e.id, !1) ||
                    !index_es_d(e.jsonrpc, !1)
                  );
                })(t))
              ) {
                const { message: i } = index_es_E(
                  'MISSING_OR_INVALID',
                  `respond() response: ${JSON.stringify(t)}`
                );
                throw new Error(i);
              }
            }),
            (this.isValidPing = async (e) => {
              if (!ut(e)) {
                const { message: t } = index_es_E('MISSING_OR_INVALID', `ping() params: ${e}`);
                throw new Error(t);
              }
              const { topic: s } = e;
              await this.isValidSessionOrPairingTopic(s);
            }),
            (this.isValidEmit = async (e) => {
              if (!ut(e)) {
                const { message: o } = index_es_E('MISSING_OR_INVALID', `emit() params: ${e}`);
                throw new Error(o);
              }
              const { topic: s, event: t, chainId: i } = e;
              await this.isValidSessionTopic(s);
              const { namespaces: r } = this.client.session.get(s);
              if (!mt(r, i)) {
                const { message: o } = index_es_E('MISSING_OR_INVALID', `emit() chainId: ${i}`);
                throw new Error(o);
              }
              if (
                !(function pt(e) {
                  return !(index_es_y(e) || !index_es_d(e.name, !1));
                })(t)
              ) {
                const { message: o } = index_es_E(
                  'MISSING_OR_INVALID',
                  `emit() event: ${JSON.stringify(t)}`
                );
                throw new Error(o);
              }
              if (!yt(r, i, t.name)) {
                const { message: o } = index_es_E(
                  'MISSING_OR_INVALID',
                  `emit() event: ${JSON.stringify(t)}`
                );
                throw new Error(o);
              }
            }),
            (this.isValidDisconnect = async (e) => {
              if (!ut(e)) {
                const { message: t } = index_es_E(
                  'MISSING_OR_INVALID',
                  `disconnect() params: ${e}`
                );
                throw new Error(t);
              }
              const { topic: s } = e;
              await this.isValidSessionOrPairingTopic(s);
            });
        }
        isInitialized() {
          if (!this.initialized) {
            const { message: n } = index_es_E('NOT_INITIALIZED', this.name);
            throw new Error(n);
          }
        }
        registerRelayerEvents() {
          this.client.core.relayer.on(index_es_D_message, async (n) => {
            const { topic: e, message: s } = n;
            if (this.ignoredPayloadTypes.includes(this.client.core.crypto.getPayloadType(s)))
              return;
            const t = await this.client.core.crypto.decode(e, s);
            (0, jsonrpc_utils_dist_esm.isJsonRpcRequest)(t)
              ? (this.client.core.history.set(e, t),
                this.onRelayEventRequest({ topic: e, payload: t }))
              : (0, jsonrpc_utils_dist_esm.isJsonRpcResponse)(t) &&
                (await this.client.core.history.resolve(t),
                this.onRelayEventResponse({ topic: e, payload: t }));
          });
        }
        registerExpirerEvents() {
          this.client.core.expirer.on(dist_index_es_m_expired, async (n) => {
            const { topic: e, id: s } = Fn(n.target);
            if (s && this.client.pendingRequest.keys.includes(s))
              return await this.deletePendingSessionRequest(s, index_es_E('EXPIRED'), !0);
            e
              ? this.client.session.keys.includes(e) &&
                (await this.deleteSession(e, !0),
                this.client.events.emit('session_expire', { topic: e }))
              : s && (await this.deleteProposal(s, !0));
          });
        }
        isValidPairingTopic(n) {
          if (!index_es_d(n, !1)) {
            const { message: e } = index_es_E(
              'MISSING_OR_INVALID',
              `pairing topic should be a string: ${n}`
            );
            throw new Error(e);
          }
          if (!this.client.core.pairing.pairings.keys.includes(n)) {
            const { message: e } = index_es_E(
              'NO_MATCHING_KEY',
              `pairing topic doesn't exist: ${n}`
            );
            throw new Error(e);
          }
          if (Vn(this.client.core.pairing.pairings.get(n).expiry)) {
            const { message: e } = index_es_E('EXPIRED', `pairing topic: ${n}`);
            throw new Error(e);
          }
        }
        async isValidSessionTopic(n) {
          if (!index_es_d(n, !1)) {
            const { message: e } = index_es_E(
              'MISSING_OR_INVALID',
              `session topic should be a string: ${n}`
            );
            throw new Error(e);
          }
          if (!this.client.session.keys.includes(n)) {
            const { message: e } = index_es_E(
              'NO_MATCHING_KEY',
              `session topic doesn't exist: ${n}`
            );
            throw new Error(e);
          }
          if (Vn(this.client.session.get(n).expiry)) {
            await this.deleteSession(n);
            const { message: e } = index_es_E('EXPIRED', `session topic: ${n}`);
            throw new Error(e);
          }
        }
        async isValidSessionOrPairingTopic(n) {
          if (this.client.session.keys.includes(n)) await this.isValidSessionTopic(n);
          else {
            if (!this.client.core.pairing.pairings.keys.includes(n)) {
              if (index_es_d(n, !1)) {
                const { message: e } = index_es_E(
                  'NO_MATCHING_KEY',
                  `session or pairing topic doesn't exist: ${n}`
                );
                throw new Error(e);
              }
              {
                const { message: e } = index_es_E(
                  'MISSING_OR_INVALID',
                  `session or pairing topic should be a string: ${n}`
                );
                throw new Error(e);
              }
            }
            this.isValidPairingTopic(n);
          }
        }
        async isValidProposalId(n) {
          if (
            !(function at(e) {
              return 'number' == typeof e;
            })(n)
          ) {
            const { message: e } = index_es_E(
              'MISSING_OR_INVALID',
              `proposal id should be a number: ${n}`
            );
            throw new Error(e);
          }
          if (!this.client.proposal.keys.includes(n)) {
            const { message: e } = index_es_E('NO_MATCHING_KEY', `proposal id doesn't exist: ${n}`);
            throw new Error(e);
          }
          if (Vn(this.client.proposal.get(n).expiry)) {
            await this.deleteProposal(n);
            const { message: e } = index_es_E('EXPIRED', `proposal id: ${n}`);
            throw new Error(e);
          }
        }
      }
      class dist_index_es_Qe extends Ct {
        constructor(n, e) {
          super(n, e, 'proposal', 'wc@2:client:'), (this.core = n), (this.logger = e);
        }
      }
      class dist_index_es_Be extends Ct {
        constructor(n, e) {
          super(n, e, 'session', 'wc@2:client:'), (this.core = n), (this.logger = e);
        }
      }
      class dist_index_es_Ze extends Ct {
        constructor(n, e) {
          super(n, e, 'request', 'wc@2:client:'), (this.core = n), (this.logger = e);
        }
      }
      class dist_index_es_b extends y {
        constructor(n) {
          super(n),
            (this.protocol = 'wc'),
            (this.version = 2),
            (this.name = sign_client_dist_index_es_C_name),
            (this.events = new events.EventEmitter()),
            (this.on = (s, t) => this.events.on(s, t)),
            (this.once = (s, t) => this.events.once(s, t)),
            (this.off = (s, t) => this.events.off(s, t)),
            (this.removeListener = (s, t) => this.events.removeListener(s, t)),
            (this.removeAllListeners = (s) => this.events.removeAllListeners(s)),
            (this.connect = async (s) => {
              try {
                return await this.engine.connect(s);
              } catch (t) {
                throw (this.logger.error(t.message), t);
              }
            }),
            (this.pair = async (s) => {
              try {
                return await this.engine.pair(s);
              } catch (t) {
                throw (this.logger.error(t.message), t);
              }
            }),
            (this.approve = async (s) => {
              try {
                return await this.engine.approve(s);
              } catch (t) {
                throw (this.logger.error(t.message), t);
              }
            }),
            (this.reject = async (s) => {
              try {
                return await this.engine.reject(s);
              } catch (t) {
                throw (this.logger.error(t.message), t);
              }
            }),
            (this.update = async (s) => {
              try {
                return await this.engine.update(s);
              } catch (t) {
                throw (this.logger.error(t.message), t);
              }
            }),
            (this.extend = async (s) => {
              try {
                return await this.engine.extend(s);
              } catch (t) {
                throw (this.logger.error(t.message), t);
              }
            }),
            (this.request = async (s) => {
              try {
                return await this.engine.request(s);
              } catch (t) {
                throw (this.logger.error(t.message), t);
              }
            }),
            (this.respond = async (s) => {
              try {
                return await this.engine.respond(s);
              } catch (t) {
                throw (this.logger.error(t.message), t);
              }
            }),
            (this.ping = async (s) => {
              try {
                return await this.engine.ping(s);
              } catch (t) {
                throw (this.logger.error(t.message), t);
              }
            }),
            (this.emit = async (s) => {
              try {
                return await this.engine.emit(s);
              } catch (t) {
                throw (this.logger.error(t.message), t);
              }
            }),
            (this.disconnect = async (s) => {
              try {
                return await this.engine.disconnect(s);
              } catch (t) {
                throw (this.logger.error(t.message), t);
              }
            }),
            (this.find = (s) => {
              try {
                return this.engine.find(s);
              } catch (t) {
                throw (this.logger.error(t.message), t);
              }
            }),
            (this.getPendingSessionRequests = () => {
              try {
                return this.engine.getPendingSessionRequests();
              } catch (s) {
                throw (this.logger.error(s.message), s);
              }
            }),
            (this.name = n?.name || sign_client_dist_index_es_C_name),
            (this.metadata =
              n?.metadata ||
              (function Pn() {
                return (
                  (0, window_metadata_dist_cjs.D)() || {
                    name: '',
                    description: '',
                    url: '',
                    icons: [''],
                  }
                );
              })());
          const e =
            typeof n?.logger < 'u' && 'string' != typeof n?.logger
              ? n.logger
              : browser_default()(
                  (0, dist_cjs.getDefaultLoggerOptions)({
                    level: n?.logger || sign_client_dist_index_es_C_logger,
                  })
                );
          (this.core = n?.core || new dr(n)),
            (this.logger = (0, dist_cjs.generateChildLogger)(e, this.name)),
            (this.session = new dist_index_es_Be(this.core, this.logger)),
            (this.proposal = new dist_index_es_Qe(this.core, this.logger)),
            (this.pendingRequest = new dist_index_es_Ze(this.core, this.logger)),
            (this.engine = new dist_index_es_Fe(this));
        }
        static async init(n) {
          const e = new dist_index_es_b(n);
          return await e.initialize(), e;
        }
        get context() {
          return (0, dist_cjs.getLoggerContext)(this.logger);
        }
        get pairing() {
          return this.core.pairing.pairings;
        }
        async initialize() {
          this.logger.trace('Initialized');
          try {
            await this.core.start(),
              await this.session.init(),
              await this.proposal.init(),
              await this.pendingRequest.init(),
              await this.engine.init(),
              this.logger.info('SignClient Initialization Success');
          } catch (n) {
            throw (
              (this.logger.info('SignClient Initialization Failure'),
              this.logger.error(n.message),
              n)
            );
          }
        }
      }
      __webpack_require__(
        './node_modules/@walletconnect/universal-provider/node_modules/@walletconnect/window-metadata/dist/cjs/index.js'
      ),
        __webpack_require__(
          './node_modules/@walletconnect/universal-provider/node_modules/query-string/index.js'
        ),
        __webpack_require__('./node_modules/process/browser.js');
      Object.defineProperty,
        Object.getOwnPropertySymbols,
        Object.prototype.hasOwnProperty,
        Object.prototype.propertyIsEnumerable;
      Object.defineProperty,
        Object.getOwnPropertySymbols,
        Object.prototype.hasOwnProperty,
        Object.prototype.propertyIsEnumerable;
      const index_es_Xn = {
        INVALID_METHOD: { message: 'Invalid method.', code: 1001 },
        INVALID_EVENT: { message: 'Invalid event.', code: 1002 },
        INVALID_UPDATE_REQUEST: { message: 'Invalid update request.', code: 1003 },
        INVALID_EXTEND_REQUEST: { message: 'Invalid extend request.', code: 1004 },
        INVALID_SESSION_SETTLE_REQUEST: { message: 'Invalid session settle request.', code: 1005 },
        UNAUTHORIZED_METHOD: { message: 'Unauthorized method.', code: 3001 },
        UNAUTHORIZED_EVENT: { message: 'Unauthorized event.', code: 3002 },
        UNAUTHORIZED_UPDATE_REQUEST: { message: 'Unauthorized update request.', code: 3003 },
        UNAUTHORIZED_EXTEND_REQUEST: { message: 'Unauthorized extend request.', code: 3004 },
        USER_REJECTED: { message: 'User rejected.', code: 5e3 },
        USER_REJECTED_CHAINS: { message: 'User rejected chains.', code: 5001 },
        USER_REJECTED_METHODS: { message: 'User rejected methods.', code: 5002 },
        USER_REJECTED_EVENTS: { message: 'User rejected events.', code: 5003 },
        UNSUPPORTED_CHAINS: { message: 'Unsupported chains.', code: 5100 },
        UNSUPPORTED_METHODS: { message: 'Unsupported methods.', code: 5101 },
        UNSUPPORTED_EVENTS: { message: 'Unsupported events.', code: 5102 },
        UNSUPPORTED_ACCOUNTS: { message: 'Unsupported accounts.', code: 5103 },
        UNSUPPORTED_NAMESPACE_KEY: { message: 'Unsupported namespace key.', code: 5104 },
        USER_DISCONNECTED: { message: 'User disconnected.', code: 6e3 },
        SESSION_SETTLEMENT_FAILED: { message: 'Session settlement failed.', code: 7e3 },
        WC_METHOD_UNSUPPORTED: { message: 'Unsupported wc_ method.', code: 10001 },
      };
      function dist_index_es_N(e, n) {
        const { message: t, code: r } = index_es_Xn[e];
        return { message: n ? `${t} ${n}` : t, code: r };
      }
      function utils_dist_index_es_I(e, n) {
        return !!Array.isArray(e) && (!(typeof n < 'u' && e.length) || e.every(n));
      }
      var jsonrpc_http_connection_dist_esm = __webpack_require__(
        './node_modules/@walletconnect/jsonrpc-http-connection/dist/esm/index.js'
      );
      function r(s, t) {
        let e;
        return (
          t.rpcMap &&
            (e =
              t.rpcMap[
                (function O(s) {
                  return Number(s[0].split(':')[1]);
                })([s])
              ]),
          e
        );
      }
      class universal_provider_dist_index_es_E {
        constructor(t) {
          (this.name = 'eip155'),
            (this.namespace = t.namespace),
            (this.client = t.client),
            (this.events = t.events),
            (this.httpProviders = this.createHttpProviders()),
            (this.chainId = this.getDefaultChainId());
        }
        async request(t) {
          var e;
          switch (t.request.method) {
            case 'eth_requestAccounts':
            case 'eth_accounts':
              return this.getAccounts();
            case 'wallet_switchEthereumChain': {
              const i = t.request.params
                ? null == (e = t.request.params[0])
                  ? void 0
                  : e.chainId
                : '0x0';
              return this.setDefaultChain(parseInt(i, 16).toString()), null;
            }
            case 'eth_chainId':
              return this.getDefaultChainId();
          }
          return this.namespace.methods.includes(t.request.method)
            ? await this.client.request(t)
            : this.getHttpProvider().request(t.request);
        }
        updateNamespace(t) {
          this.namespace = Object.assign(this.namespace, t);
        }
        setDefaultChain(t, e) {
          if (((this.chainId = parseInt(t)), !this.httpProviders[t])) {
            const i = e || r(`${this.name}:${t}`, this.namespace);
            if (!i) throw new Error(`No RPC url provided for chainId: ${t}`);
            this.setHttpProvider(t, i);
          }
          this.events.emit('chainChanged', this.chainId);
        }
        createHttpProvider(t, e) {
          const i = e || r(t, this.namespace);
          return typeof i > 'u'
            ? void 0
            : new dist_esm.r(new jsonrpc_http_connection_dist_esm.k(i));
        }
        setHttpProvider(t, e) {
          const i = this.createHttpProvider(t, e);
          i && (this.httpProviders[t] = i);
        }
        createHttpProviders() {
          const t = {};
          return (
            this.namespace.chains.forEach((e) => {
              t[e] = this.createHttpProvider(e);
            }),
            t
          );
        }
        getAccounts() {
          const t = this.namespace.accounts;
          return (
            (t &&
              t
                .filter((e) => e.split(':')[1] === this.chainId.toString())
                .map((e) => e.split(':')[2])) ||
            []
          );
        }
        getDefaultChainId() {
          if (this.chainId) return this.chainId;
          const t = this.namespace.chains[0];
          if (!t) throw new Error('ChainId not found');
          return parseInt(t.split(':')[1]);
        }
        getHttpProvider() {
          const t = `${this.name}:${this.chainId}`,
            e = this.httpProviders[t];
          if (typeof e > 'u') throw new Error(`JSON-RPC provider for ${t} not found`);
          return e;
        }
      }
      class universal_provider_dist_index_es_b {
        constructor(t) {
          (this.name = 'solana'),
            (this.namespace = t.namespace),
            (this.events = t.events),
            (this.client = t.client),
            (this.chainId = this.getDefaultChainId()),
            (this.httpProviders = this.createHttpProviders());
        }
        updateNamespace(t) {
          this.namespace = Object.assign(this.namespace, t);
        }
        createHttpProviders() {
          const t = {};
          return (
            this.namespace.chains.forEach((e) => {
              t[e] = this.createHttpProvider(e);
            }),
            t
          );
        }
        getDefaultChainId() {
          if (this.chainId) return this.chainId;
          const t = this.namespace.chains[0];
          if (!t) throw new Error('ChainId not found');
          return t.split(':')[1];
        }
        request(t) {
          return this.namespace.methods.includes(t.request.method)
            ? this.client.request(t)
            : this.getHttpProvider().request(t.request);
        }
        getHttpProvider() {
          const t = `${this.name}:${this.chainId}`,
            e = this.httpProviders[t];
          if (typeof e > 'u') throw new Error(`JSON-RPC provider for ${t} not found`);
          return e;
        }
        setDefaultChain(t, e) {
          if (((this.chainId = t), !this.httpProviders[t])) {
            const i = e || r(`${this.name}:${t}`, this.namespace);
            if (!i) throw new Error(`No RPC url provided for chainId: ${t}`);
            this.setHttpProvider(t, i);
          }
          this.events.emit('chainChanged', this.chainId);
        }
        setHttpProvider(t, e) {
          const i = this.createHttpProvider(t, e);
          i && (this.httpProviders[t] = i);
        }
        createHttpProvider(t, e) {
          const i = e || r(t, this.namespace);
          return typeof i > 'u'
            ? void 0
            : new dist_esm.r(new jsonrpc_http_connection_dist_esm.Z(i));
        }
      }
      var dist_index_es_H = Object.defineProperty,
        universal_provider_dist_index_es_N = Object.defineProperties,
        _ = Object.getOwnPropertyDescriptors,
        universal_provider_dist_index_es_d = Object.getOwnPropertySymbols,
        universal_provider_dist_index_es_D = Object.prototype.hasOwnProperty,
        dist_index_es_j = Object.prototype.propertyIsEnumerable,
        universal_provider_dist_index_es_u = (s, t, e) =>
          t in s
            ? dist_index_es_H(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
            : (s[t] = e),
        index_es_v = (s, t) => {
          for (var e in t || (t = {}))
            universal_provider_dist_index_es_D.call(t, e) &&
              universal_provider_dist_index_es_u(s, e, t[e]);
          if (universal_provider_dist_index_es_d)
            for (var e of universal_provider_dist_index_es_d(t))
              dist_index_es_j.call(t, e) && universal_provider_dist_index_es_u(s, e, t[e]);
          return s;
        };
      class universal_provider_dist_index_es_a {
        constructor(t) {
          (this.events = new (events_default())()),
            (this.rpcProviders = {}),
            (this.providerOpts = t),
            (this.logger =
              typeof t?.logger < 'u' && 'string' != typeof t?.logger
                ? t.logger
                : browser_default()(
                    (0, dist_cjs.getDefaultLoggerOptions)({ level: t?.logger || 'error' })
                  ));
        }
        static async init(t) {
          const e = new universal_provider_dist_index_es_a(t);
          return await e.initialize(), e;
        }
        async request(t, e) {
          var i;
          const [n, o] = this.validateChain(e);
          return await this.getProvider(n).request({
            request: index_es_v({}, t),
            chainId: `${n}:${o}`,
            topic: null == (i = this.session) ? void 0 : i.topic,
          });
        }
        sendAsync(t, e, i) {
          this.request(t, i)
            .then((n) => e(null, n))
            .catch((n) => e(n, void 0));
        }
        async enable() {
          if (!this.client) throw new Error('Sign Client not initialized');
          return await this.request({ method: 'eth_requestAccounts', params: [] });
        }
        async disconnect() {
          if (!this.client) throw new Error('Sign Client not initialized');
          await this.client.disconnect({
            topic: this.session.topic,
            reason: dist_index_es_N('USER_DISCONNECTED'),
          });
        }
        async connect(t) {
          if (!this.client) throw new Error('Sign Client not initialized');
          return (
            this.setNamespaces(t.namespaces),
            this.createProviders(),
            await this.cleanupPendingPairings(),
            !0 === t.skipPairing ? void 0 : await this.pair(t.pairingTopic)
          );
        }
        on(t, e) {
          this.events.on(t, e);
        }
        once(t, e) {
          this.events.once(t, e);
        }
        removeListener(t, e) {
          this.events.removeListener(t, e);
        }
        off(t, e) {
          this.events.off(t, e);
        }
        get isWalletConnect() {
          return !0;
        }
        async pair(t) {
          const { uri: e, approval: i } = await this.client.connect({
            pairingTopic: t,
            requiredNamespaces: this.namespaces,
          });
          return (
            e && ((this.uri = e), this.events.emit('display_uri', e)),
            (this.session = await i()),
            this.onSessionUpdate(),
            this.session
          );
        }
        setDefaultChain(t, e) {
          try {
            const [i, n] = this.validateChain(t);
            this.getProvider(i).setDefaultChain(n, e);
          } catch (i) {
            if (!/Please call connect/.test(i.message)) throw i;
          }
        }
        async cleanupPendingPairings() {
          this.logger.info('Cleaning up inactive pairings...');
          const t = this.client.pairing.getAll({ active: !1 });
          !utils_dist_index_es_I(t) ||
            (await Promise.all([
              t.map((e) =>
                this.client.pairing.delete(e.topic, dist_index_es_N('USER_DISCONNECTED'))
              ),
              t.map((e) => this.client.core.relayer.unsubscribe(e.topic)),
              t.map((e) => this.client.core.expirer.del(e.topic)),
            ]),
            this.logger.info(`Inactive pairings cleared: ${t.length}`));
        }
        async checkStorage() {
          if (
            ((this.namespaces =
              (await this.client.core.storage.getItem('wc@2:universal_provider:/namespaces')) ||
              {}),
            this.namespaces && this.createProviders(),
            this.client.session.length)
          ) {
            const t = this.client.session.keys.length - 1;
            (this.session = this.client.session.get(this.client.session.keys[t])),
              this.onSessionUpdate();
          }
        }
        async initialize() {
          this.logger.trace('Initialized'),
            await this.createClient(),
            this.checkStorage(),
            this.registerEventListeners();
        }
        async createClient() {
          (this.client =
            this.providerOpts.client ||
            (await dist_index_es_b.init({
              logger: this.providerOpts.logger || 'error',
              relayUrl: this.providerOpts.relayUrl || 'wss://relay.walletconnect.com',
              projectId: this.providerOpts.projectId,
              metadata: this.providerOpts.metadata,
              storageOptions: this.providerOpts.storageOptions,
              name: this.providerOpts.name,
            }))),
            this.logger.trace('SignClient Initialized');
        }
        createProviders() {
          if (!this.client) throw new Error('Sign Client not initialized');
          Object.keys(this.namespaces).forEach((t) => {
            switch (t) {
              case 'eip155':
                this.rpcProviders[t] = new universal_provider_dist_index_es_E({
                  client: this.client,
                  namespace: this.namespaces[t],
                  events: this.events,
                });
                break;
              case 'solana':
                this.rpcProviders[t] = new universal_provider_dist_index_es_b({
                  client: this.client,
                  namespace: this.namespaces[t],
                  events: this.events,
                });
            }
          });
        }
        registerEventListeners() {
          if (typeof this.client > 'u') throw new Error('Sign Client is not initialized');
          this.client.on('session_ping', (t) => {
            this.events.emit('session_ping', t);
          }),
            this.client.on('session_event', (t) => {
              this.events.emit('session_event', t);
            }),
            this.client.on('session_update', ({ topic: t, params: e }) => {
              var i;
              const { namespaces: n } = e,
                o = null == (i = this.client) ? void 0 : i.session.get(t);
              (this.session = ((s, t) => universal_provider_dist_index_es_N(s, _(t)))(
                index_es_v({}, o),
                { namespaces: n }
              )),
                this.onSessionUpdate(),
                this.events.emit('session_update', { topic: t, params: e });
            }),
            this.client.on('session_delete', () => {
              this.events.emit('session_delete');
            });
        }
        getProvider(t) {
          if (!this.rpcProviders[t]) throw new Error(`Provider not found: ${t}`);
          return this.rpcProviders[t];
        }
        onSessionUpdate() {
          Object.keys(this.rpcProviders).forEach((t) =>
            this.getProvider(t).updateNamespace(this.session.namespaces[t])
          );
        }
        setNamespaces(t) {
          if (!t || !Object.keys(t).length) throw new Error('Namespaces must be not empty');
          this.client.core.storage.setItem('wc@2:universal_provider:/namespaces', t),
            (this.namespaces = t);
        }
        validateChain(t) {
          const [e, i] = t?.split(':') || ['', ''];
          if (e && !Object.keys(this.namespaces).includes(e))
            throw new Error(
              `Namespace '${e}' is not configured. Please call connect() first with namespace config.`
            );
          return e && i
            ? [e, i]
            : (function universal_provider_dist_index_es_I(s) {
                var t;
                const e = null == (t = s[Object.keys(s)[0]]) ? void 0 : t.chains[0];
                return [e.split(':')[0], e.split(':')[1]];
              })(this.namespaces);
        }
      }
      const dist_index_es_R = universal_provider_dist_index_es_a;
    },
    './node_modules/@walletconnect/universal-provider/node_modules/@walletconnect/window-metadata/dist/cjs/index.js':
      (__unused_webpack_module, exports, __webpack_require__) => {
        'use strict';
        const window_getters_1 = __webpack_require__(
          './node_modules/@walletconnect/window-getters/dist/cjs/index.js'
        );
      },
    './node_modules/@walletconnect/universal-provider/node_modules/query-string/index.js': (
      __unused_webpack_module,
      exports,
      __webpack_require__
    ) => {
      'use strict';
      const strictUriEncode = __webpack_require__('./node_modules/strict-uri-encode/index.js'),
        decodeComponent = __webpack_require__('./node_modules/decode-uri-component/index.js'),
        splitOnFirst = __webpack_require__('./node_modules/split-on-first/index.js'),
        filterObject = __webpack_require__('./node_modules/filter-obj/index.js'),
        encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');
      function validateArrayFormatSeparator(value) {
        if ('string' != typeof value || 1 !== value.length)
          throw new TypeError('arrayFormatSeparator must be single character string');
      }
      function encode(value, options) {
        return options.encode
          ? options.strict
            ? strictUriEncode(value)
            : encodeURIComponent(value)
          : value;
      }
      function decode(value, options) {
        return options.decode ? decodeComponent(value) : value;
      }
      function keysSorter(input) {
        return Array.isArray(input)
          ? input.sort()
          : 'object' == typeof input
          ? keysSorter(Object.keys(input))
              .sort((a, b) => Number(a) - Number(b))
              .map((key) => input[key])
          : input;
      }
      function removeHash(input) {
        const hashStart = input.indexOf('#');
        return -1 !== hashStart && (input = input.slice(0, hashStart)), input;
      }
      function extract(input) {
        const queryStart = (input = removeHash(input)).indexOf('?');
        return -1 === queryStart ? '' : input.slice(queryStart + 1);
      }
      function parseValue(value, options) {
        return (
          options.parseNumbers &&
          !Number.isNaN(Number(value)) &&
          'string' == typeof value &&
          '' !== value.trim()
            ? (value = Number(value))
            : !options.parseBooleans ||
              null === value ||
              ('true' !== value.toLowerCase() && 'false' !== value.toLowerCase()) ||
              (value = 'true' === value.toLowerCase()),
          value
        );
      }
      function parse(query, options) {
        validateArrayFormatSeparator(
          (options = Object.assign(
            {
              decode: !0,
              sort: !0,
              arrayFormat: 'none',
              arrayFormatSeparator: ',',
              parseNumbers: !1,
              parseBooleans: !1,
            },
            options
          )).arrayFormatSeparator
        );
        const formatter = (function parserForArrayFormat(options) {
            let result;
            switch (options.arrayFormat) {
              case 'index':
                return (key, value, accumulator) => {
                  (result = /\[(\d*)\]$/.exec(key)),
                    (key = key.replace(/\[\d*\]$/, '')),
                    result
                      ? (void 0 === accumulator[key] && (accumulator[key] = {}),
                        (accumulator[key][result[1]] = value))
                      : (accumulator[key] = value);
                };
              case 'bracket':
                return (key, value, accumulator) => {
                  (result = /(\[\])$/.exec(key)),
                    (key = key.replace(/\[\]$/, '')),
                    result
                      ? void 0 !== accumulator[key]
                        ? (accumulator[key] = [].concat(accumulator[key], value))
                        : (accumulator[key] = [value])
                      : (accumulator[key] = value);
                };
              case 'colon-list-separator':
                return (key, value, accumulator) => {
                  (result = /(:list)$/.exec(key)),
                    (key = key.replace(/:list$/, '')),
                    result
                      ? void 0 !== accumulator[key]
                        ? (accumulator[key] = [].concat(accumulator[key], value))
                        : (accumulator[key] = [value])
                      : (accumulator[key] = value);
                };
              case 'comma':
              case 'separator':
                return (key, value, accumulator) => {
                  const isArray =
                      'string' == typeof value && value.includes(options.arrayFormatSeparator),
                    isEncodedArray =
                      'string' == typeof value &&
                      !isArray &&
                      decode(value, options).includes(options.arrayFormatSeparator);
                  value = isEncodedArray ? decode(value, options) : value;
                  const newValue =
                    isArray || isEncodedArray
                      ? value
                          .split(options.arrayFormatSeparator)
                          .map((item) => decode(item, options))
                      : null === value
                      ? value
                      : decode(value, options);
                  accumulator[key] = newValue;
                };
              case 'bracket-separator':
                return (key, value, accumulator) => {
                  const isArray = /(\[\])$/.test(key);
                  if (((key = key.replace(/\[\]$/, '')), !isArray))
                    return void (accumulator[key] = value ? decode(value, options) : value);
                  const arrayValue =
                    null === value
                      ? []
                      : value
                          .split(options.arrayFormatSeparator)
                          .map((item) => decode(item, options));
                  void 0 !== accumulator[key]
                    ? (accumulator[key] = [].concat(accumulator[key], arrayValue))
                    : (accumulator[key] = arrayValue);
                };
              default:
                return (key, value, accumulator) => {
                  void 0 !== accumulator[key]
                    ? (accumulator[key] = [].concat(accumulator[key], value))
                    : (accumulator[key] = value);
                };
            }
          })(options),
          ret = Object.create(null);
        if ('string' != typeof query) return ret;
        if (!(query = query.trim().replace(/^[?#&]/, ''))) return ret;
        for (const param of query.split('&')) {
          if ('' === param) continue;
          let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');
          (value =
            void 0 === value
              ? null
              : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat)
              ? value
              : decode(value, options)),
            formatter(decode(key, options), value, ret);
        }
        for (const key of Object.keys(ret)) {
          const value = ret[key];
          if ('object' == typeof value && null !== value)
            for (const k of Object.keys(value)) value[k] = parseValue(value[k], options);
          else ret[key] = parseValue(value, options);
        }
        return !1 === options.sort
          ? ret
          : (!0 === options.sort
              ? Object.keys(ret).sort()
              : Object.keys(ret).sort(options.sort)
            ).reduce((result, key) => {
              const value = ret[key];
              return (
                Boolean(value) && 'object' == typeof value && !Array.isArray(value)
                  ? (result[key] = keysSorter(value))
                  : (result[key] = value),
                result
              );
            }, Object.create(null));
      }
      (exports.extract = extract),
        (exports.parse = parse),
        (exports.stringify = (object, options) => {
          if (!object) return '';
          validateArrayFormatSeparator(
            (options = Object.assign(
              { encode: !0, strict: !0, arrayFormat: 'none', arrayFormatSeparator: ',' },
              options
            )).arrayFormatSeparator
          );
          const shouldFilter = (key) =>
              (options.skipNull && null == object[key]) ||
              (options.skipEmptyString && '' === object[key]),
            formatter = (function encoderForArrayFormat(options) {
              switch (options.arrayFormat) {
                case 'index':
                  return (key) => (result, value) => {
                    const index = result.length;
                    return void 0 === value ||
                      (options.skipNull && null === value) ||
                      (options.skipEmptyString && '' === value)
                      ? result
                      : null === value
                      ? [...result, [encode(key, options), '[', index, ']'].join('')]
                      : [
                          ...result,
                          [
                            encode(key, options),
                            '[',
                            encode(index, options),
                            ']=',
                            encode(value, options),
                          ].join(''),
                        ];
                  };
                case 'bracket':
                  return (key) => (result, value) =>
                    void 0 === value ||
                    (options.skipNull && null === value) ||
                    (options.skipEmptyString && '' === value)
                      ? result
                      : null === value
                      ? [...result, [encode(key, options), '[]'].join('')]
                      : [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
                case 'colon-list-separator':
                  return (key) => (result, value) =>
                    void 0 === value ||
                    (options.skipNull && null === value) ||
                    (options.skipEmptyString && '' === value)
                      ? result
                      : null === value
                      ? [...result, [encode(key, options), ':list='].join('')]
                      : [
                          ...result,
                          [encode(key, options), ':list=', encode(value, options)].join(''),
                        ];
                case 'comma':
                case 'separator':
                case 'bracket-separator': {
                  const keyValueSep = 'bracket-separator' === options.arrayFormat ? '[]=' : '=';
                  return (key) => (result, value) =>
                    void 0 === value ||
                    (options.skipNull && null === value) ||
                    (options.skipEmptyString && '' === value)
                      ? result
                      : ((value = null === value ? '' : value),
                        0 === result.length
                          ? [[encode(key, options), keyValueSep, encode(value, options)].join('')]
                          : [[result, encode(value, options)].join(options.arrayFormatSeparator)]);
                }
                default:
                  return (key) => (result, value) =>
                    void 0 === value ||
                    (options.skipNull && null === value) ||
                    (options.skipEmptyString && '' === value)
                      ? result
                      : null === value
                      ? [...result, encode(key, options)]
                      : [...result, [encode(key, options), '=', encode(value, options)].join('')];
              }
            })(options),
            objectCopy = {};
          for (const key of Object.keys(object))
            shouldFilter(key) || (objectCopy[key] = object[key]);
          const keys = Object.keys(objectCopy);
          return (
            !1 !== options.sort && keys.sort(options.sort),
            keys
              .map((key) => {
                const value = object[key];
                return void 0 === value
                  ? ''
                  : null === value
                  ? encode(key, options)
                  : Array.isArray(value)
                  ? 0 === value.length && 'bracket-separator' === options.arrayFormat
                    ? encode(key, options) + '[]'
                    : value.reduce(formatter(key), []).join('&')
                  : encode(key, options) + '=' + encode(value, options);
              })
              .filter((x) => x.length > 0)
              .join('&')
          );
        }),
        (exports.parseUrl = (url, options) => {
          options = Object.assign({ decode: !0 }, options);
          const [url_, hash] = splitOnFirst(url, '#');
          return Object.assign(
            { url: url_.split('?')[0] || '', query: parse(extract(url), options) },
            options && options.parseFragmentIdentifier && hash
              ? { fragmentIdentifier: decode(hash, options) }
              : {}
          );
        }),
        (exports.stringifyUrl = (object, options) => {
          options = Object.assign(
            { encode: !0, strict: !0, [encodeFragmentIdentifier]: !0 },
            options
          );
          const url = removeHash(object.url).split('?')[0] || '',
            queryFromUrl = exports.extract(object.url),
            parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: !1 }),
            query = Object.assign(parsedQueryFromUrl, object.query);
          let queryString = exports.stringify(query, options);
          queryString && (queryString = `?${queryString}`);
          let hash = (function getHash(url) {
            let hash = '';
            const hashStart = url.indexOf('#');
            return -1 !== hashStart && (hash = url.slice(hashStart)), hash;
          })(object.url);
          return (
            object.fragmentIdentifier &&
              (hash = `#${
                options[encodeFragmentIdentifier]
                  ? encode(object.fragmentIdentifier, options)
                  : object.fragmentIdentifier
              }`),
            `${url}${queryString}${hash}`
          );
        }),
        (exports.pick = (input, filter, options) => {
          options = Object.assign(
            { parseFragmentIdentifier: !0, [encodeFragmentIdentifier]: !1 },
            options
          );
          const { url, query, fragmentIdentifier } = exports.parseUrl(input, options);
          return exports.stringifyUrl(
            { url, query: filterObject(query, filter), fragmentIdentifier },
            options
          );
        }),
        (exports.exclude = (input, filter, options) => {
          const exclusionFilter = Array.isArray(filter)
            ? (key) => !filter.includes(key)
            : (key, value) => !filter(key, value);
          return exports.pick(input, exclusionFilter, options);
        });
    },
    './node_modules/filter-obj/index.js': (module) => {
      'use strict';
      module.exports = function (obj, predicate) {
        for (
          var ret = {}, keys = Object.keys(obj), isArr = Array.isArray(predicate), i = 0;
          i < keys.length;
          i++
        ) {
          var key = keys[i],
            val = obj[key];
          (isArr ? -1 !== predicate.indexOf(key) : predicate(key, val, obj)) && (ret[key] = val);
        }
        return ret;
      };
    },
    './node_modules/lodash.isequal/index.js': (module, exports, __webpack_require__) => {
      module = __webpack_require__.nmd(module);
      var COMPARE_PARTIAL_FLAG = 1,
        COMPARE_UNORDERED_FLAG = 2,
        MAX_SAFE_INTEGER = 9007199254740991,
        argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        asyncTag = '[object AsyncFunction]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        nullTag = '[object Null]',
        objectTag = '[object Object]',
        proxyTag = '[object Proxy]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]',
        undefinedTag = '[object Undefined]',
        arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        reIsHostCtor = /^\[object .+?Constructor\]$/,
        reIsUint = /^(?:0|[1-9]\d*)$/,
        typedArrayTags = {};
      (typedArrayTags['[object Float32Array]'] =
        typedArrayTags['[object Float64Array]'] =
        typedArrayTags['[object Int8Array]'] =
        typedArrayTags['[object Int16Array]'] =
        typedArrayTags['[object Int32Array]'] =
        typedArrayTags['[object Uint8Array]'] =
        typedArrayTags['[object Uint8ClampedArray]'] =
        typedArrayTags['[object Uint16Array]'] =
        typedArrayTags['[object Uint32Array]'] =
          !0),
        (typedArrayTags[argsTag] =
          typedArrayTags[arrayTag] =
          typedArrayTags[arrayBufferTag] =
          typedArrayTags[boolTag] =
          typedArrayTags[dataViewTag] =
          typedArrayTags[dateTag] =
          typedArrayTags[errorTag] =
          typedArrayTags[funcTag] =
          typedArrayTags[mapTag] =
          typedArrayTags[numberTag] =
          typedArrayTags[objectTag] =
          typedArrayTags[regexpTag] =
          typedArrayTags[setTag] =
          typedArrayTags[stringTag] =
          typedArrayTags['[object WeakMap]'] =
            !1);
      var freeGlobal =
          'object' == typeof __webpack_require__.g &&
          __webpack_require__.g &&
          __webpack_require__.g.Object === Object &&
          __webpack_require__.g,
        freeSelf = 'object' == typeof self && self && self.Object === Object && self,
        root = freeGlobal || freeSelf || Function('return this')(),
        freeExports = exports && !exports.nodeType && exports,
        freeModule = freeExports && module && !module.nodeType && module,
        moduleExports = freeModule && freeModule.exports === freeExports,
        freeProcess = moduleExports && freeGlobal.process,
        nodeUtil = (function () {
          try {
            return freeProcess && freeProcess.binding && freeProcess.binding('util');
          } catch (e) {}
        })(),
        nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function arraySome(array, predicate) {
        for (var index = -1, length = null == array ? 0 : array.length; ++index < length; )
          if (predicate(array[index], index, array)) return !0;
        return !1;
      }
      function mapToArray(map) {
        var index = -1,
          result = Array(map.size);
        return (
          map.forEach(function (value, key) {
            result[++index] = [key, value];
          }),
          result
        );
      }
      function setToArray(set) {
        var index = -1,
          result = Array(set.size);
        return (
          set.forEach(function (value) {
            result[++index] = value;
          }),
          result
        );
      }
      var uid,
        arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype,
        coreJsData = root['__core-js_shared__'],
        funcToString = funcProto.toString,
        hasOwnProperty = objectProto.hasOwnProperty,
        maskSrcKey = (uid = /[^.]+$/.exec(
          (coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || ''
        ))
          ? 'Symbol(src)_1.' + uid
          : '',
        nativeObjectToString = objectProto.toString,
        reIsNative = RegExp(
          '^' +
            funcToString
              .call(hasOwnProperty)
              .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
              .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
            '$'
        ),
        Buffer = moduleExports ? root.Buffer : void 0,
        Symbol = root.Symbol,
        Uint8Array = root.Uint8Array,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        symToStringTag = Symbol ? Symbol.toStringTag : void 0,
        nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0,
        nativeKeys = (function overArg(func, transform) {
          return function (arg) {
            return func(transform(arg));
          };
        })(Object.keys, Object),
        DataView = getNative(root, 'DataView'),
        Map = getNative(root, 'Map'),
        Promise = getNative(root, 'Promise'),
        Set = getNative(root, 'Set'),
        WeakMap = getNative(root, 'WeakMap'),
        nativeCreate = getNative(Object, 'create'),
        dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap),
        symbolProto = Symbol ? Symbol.prototype : void 0,
        symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
      function Hash(entries) {
        var index = -1,
          length = null == entries ? 0 : entries.length;
        for (this.clear(); ++index < length; ) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function ListCache(entries) {
        var index = -1,
          length = null == entries ? 0 : entries.length;
        for (this.clear(); ++index < length; ) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function MapCache(entries) {
        var index = -1,
          length = null == entries ? 0 : entries.length;
        for (this.clear(); ++index < length; ) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function SetCache(values) {
        var index = -1,
          length = null == values ? 0 : values.length;
        for (this.__data__ = new MapCache(); ++index < length; ) this.add(values[index]);
      }
      function Stack(entries) {
        var data = (this.__data__ = new ListCache(entries));
        this.size = data.size;
      }
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes
            ? (function baseTimes(n, iteratee) {
                for (var index = -1, result = Array(n); ++index < n; )
                  result[index] = iteratee(index);
                return result;
              })(value.length, String)
            : [],
          length = result.length;
        for (var key in value)
          (!inherited && !hasOwnProperty.call(value, key)) ||
            (skipIndexes &&
              ('length' == key ||
                (isBuff && ('offset' == key || 'parent' == key)) ||
                (isType && ('buffer' == key || 'byteLength' == key || 'byteOffset' == key)) ||
                isIndex(key, length))) ||
            result.push(key);
        return result;
      }
      function assocIndexOf(array, key) {
        for (var length = array.length; length--; ) if (eq(array[length][0], key)) return length;
        return -1;
      }
      function baseGetTag(value) {
        return null == value
          ? void 0 === value
            ? undefinedTag
            : nullTag
          : symToStringTag && symToStringTag in Object(value)
          ? (function getRawTag(value) {
              var isOwn = hasOwnProperty.call(value, symToStringTag),
                tag = value[symToStringTag];
              try {
                value[symToStringTag] = void 0;
                var unmasked = !0;
              } catch (e) {}
              var result = nativeObjectToString.call(value);
              unmasked && (isOwn ? (value[symToStringTag] = tag) : delete value[symToStringTag]);
              return result;
            })(value)
          : (function objectToString(value) {
              return nativeObjectToString.call(value);
            })(value);
      }
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        return (
          value === other ||
          (null == value || null == other || (!isObjectLike(value) && !isObjectLike(other))
            ? value != value && other != other
            : (function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
                var objIsArr = isArray(object),
                  othIsArr = isArray(other),
                  objTag = objIsArr ? arrayTag : getTag(object),
                  othTag = othIsArr ? arrayTag : getTag(other),
                  objIsObj = (objTag = objTag == argsTag ? objectTag : objTag) == objectTag,
                  othIsObj = (othTag = othTag == argsTag ? objectTag : othTag) == objectTag,
                  isSameTag = objTag == othTag;
                if (isSameTag && isBuffer(object)) {
                  if (!isBuffer(other)) return !1;
                  (objIsArr = !0), (objIsObj = !1);
                }
                if (isSameTag && !objIsObj)
                  return (
                    stack || (stack = new Stack()),
                    objIsArr || isTypedArray(object)
                      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
                      : (function equalByTag(
                          object,
                          other,
                          tag,
                          bitmask,
                          customizer,
                          equalFunc,
                          stack
                        ) {
                          switch (tag) {
                            case dataViewTag:
                              if (
                                object.byteLength != other.byteLength ||
                                object.byteOffset != other.byteOffset
                              )
                                return !1;
                              (object = object.buffer), (other = other.buffer);
                            case arrayBufferTag:
                              return !(
                                object.byteLength != other.byteLength ||
                                !equalFunc(new Uint8Array(object), new Uint8Array(other))
                              );
                            case boolTag:
                            case dateTag:
                            case numberTag:
                              return eq(+object, +other);
                            case errorTag:
                              return object.name == other.name && object.message == other.message;
                            case regexpTag:
                            case stringTag:
                              return object == other + '';
                            case mapTag:
                              var convert = mapToArray;
                            case setTag:
                              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                              if (
                                (convert || (convert = setToArray),
                                object.size != other.size && !isPartial)
                              )
                                return !1;
                              var stacked = stack.get(object);
                              if (stacked) return stacked == other;
                              (bitmask |= COMPARE_UNORDERED_FLAG), stack.set(object, other);
                              var result = equalArrays(
                                convert(object),
                                convert(other),
                                bitmask,
                                customizer,
                                equalFunc,
                                stack
                              );
                              return stack.delete(object), result;
                            case symbolTag:
                              if (symbolValueOf)
                                return symbolValueOf.call(object) == symbolValueOf.call(other);
                          }
                          return !1;
                        })(object, other, objTag, bitmask, customizer, equalFunc, stack)
                  );
                if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
                  var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
                    othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
                  if (objIsWrapped || othIsWrapped) {
                    var objUnwrapped = objIsWrapped ? object.value() : object,
                      othUnwrapped = othIsWrapped ? other.value() : other;
                    return (
                      stack || (stack = new Stack()),
                      equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack)
                    );
                  }
                }
                if (!isSameTag) return !1;
                return (
                  stack || (stack = new Stack()),
                  (function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
                    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
                      objProps = getAllKeys(object),
                      objLength = objProps.length,
                      othProps = getAllKeys(other),
                      othLength = othProps.length;
                    if (objLength != othLength && !isPartial) return !1;
                    var index = objLength;
                    for (; index--; ) {
                      var key = objProps[index];
                      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) return !1;
                    }
                    var stacked = stack.get(object);
                    if (stacked && stack.get(other)) return stacked == other;
                    var result = !0;
                    stack.set(object, other), stack.set(other, object);
                    var skipCtor = isPartial;
                    for (; ++index < objLength; ) {
                      var objValue = object[(key = objProps[index])],
                        othValue = other[key];
                      if (customizer)
                        var compared = isPartial
                          ? customizer(othValue, objValue, key, other, object, stack)
                          : customizer(objValue, othValue, key, object, other, stack);
                      if (
                        !(void 0 === compared
                          ? objValue === othValue ||
                            equalFunc(objValue, othValue, bitmask, customizer, stack)
                          : compared)
                      ) {
                        result = !1;
                        break;
                      }
                      skipCtor || (skipCtor = 'constructor' == key);
                    }
                    if (result && !skipCtor) {
                      var objCtor = object.constructor,
                        othCtor = other.constructor;
                      objCtor == othCtor ||
                        !('constructor' in object) ||
                        !('constructor' in other) ||
                        ('function' == typeof objCtor &&
                          objCtor instanceof objCtor &&
                          'function' == typeof othCtor &&
                          othCtor instanceof othCtor) ||
                        (result = !1);
                    }
                    return stack.delete(object), stack.delete(other), result;
                  })(object, other, bitmask, customizer, equalFunc, stack)
                );
              })(value, other, bitmask, customizer, baseIsEqual, stack))
        );
      }
      function baseIsNative(value) {
        return (
          !(
            !isObject(value) ||
            (function isMasked(func) {
              return !!maskSrcKey && maskSrcKey in func;
            })(value)
          ) && (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value))
        );
      }
      function baseKeys(object) {
        if (
          !(function isPrototype(value) {
            var Ctor = value && value.constructor,
              proto = ('function' == typeof Ctor && Ctor.prototype) || objectProto;
            return value === proto;
          })(object)
        )
          return nativeKeys(object);
        var result = [];
        for (var key in Object(object))
          hasOwnProperty.call(object, key) && 'constructor' != key && result.push(key);
        return result;
      }
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          arrLength = array.length,
          othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) return !1;
        var stacked = stack.get(array);
        if (stacked && stack.get(other)) return stacked == other;
        var index = -1,
          result = !0,
          seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
        for (stack.set(array, other), stack.set(other, array); ++index < arrLength; ) {
          var arrValue = array[index],
            othValue = other[index];
          if (customizer)
            var compared = isPartial
              ? customizer(othValue, arrValue, index, other, array, stack)
              : customizer(arrValue, othValue, index, array, other, stack);
          if (void 0 !== compared) {
            if (compared) continue;
            result = !1;
            break;
          }
          if (seen) {
            if (
              !arraySome(other, function (othValue, othIndex) {
                if (
                  ((key = othIndex),
                  !seen.has(key) &&
                    (arrValue === othValue ||
                      equalFunc(arrValue, othValue, bitmask, customizer, stack)))
                )
                  return seen.push(othIndex);
                var key;
              })
            ) {
              result = !1;
              break;
            }
          } else if (
            arrValue !== othValue &&
            !equalFunc(arrValue, othValue, bitmask, customizer, stack)
          ) {
            result = !1;
            break;
          }
        }
        return stack.delete(array), stack.delete(other), result;
      }
      function getAllKeys(object) {
        return (function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result = keysFunc(object);
          return isArray(object)
            ? result
            : (function arrayPush(array, values) {
                for (
                  var index = -1, length = values.length, offset = array.length;
                  ++index < length;

                )
                  array[offset + index] = values[index];
                return array;
              })(result, symbolsFunc(object));
        })(object, keys, getSymbols);
      }
      function getMapData(map, key) {
        var data = map.__data__;
        return (function isKeyable(value) {
          var type = typeof value;
          return 'string' == type || 'number' == type || 'symbol' == type || 'boolean' == type
            ? '__proto__' !== value
            : null === value;
        })(key)
          ? data['string' == typeof key ? 'string' : 'hash']
          : data.map;
      }
      function getNative(object, key) {
        var value = (function getValue(object, key) {
          return null == object ? void 0 : object[key];
        })(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      (Hash.prototype.clear = function hashClear() {
        (this.__data__ = nativeCreate ? nativeCreate(null) : {}), (this.size = 0);
      }),
        (Hash.prototype.delete = function hashDelete(key) {
          var result = this.has(key) && delete this.__data__[key];
          return (this.size -= result ? 1 : 0), result;
        }),
        (Hash.prototype.get = function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result = data[key];
            return '__lodash_hash_undefined__' === result ? void 0 : result;
          }
          return hasOwnProperty.call(data, key) ? data[key] : void 0;
        }),
        (Hash.prototype.has = function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? void 0 !== data[key] : hasOwnProperty.call(data, key);
        }),
        (Hash.prototype.set = function hashSet(key, value) {
          var data = this.__data__;
          return (
            (this.size += this.has(key) ? 0 : 1),
            (data[key] = nativeCreate && void 0 === value ? '__lodash_hash_undefined__' : value),
            this
          );
        }),
        (ListCache.prototype.clear = function listCacheClear() {
          (this.__data__ = []), (this.size = 0);
        }),
        (ListCache.prototype.delete = function listCacheDelete(key) {
          var data = this.__data__,
            index = assocIndexOf(data, key);
          return (
            !(index < 0) &&
            (index == data.length - 1 ? data.pop() : splice.call(data, index, 1), --this.size, !0)
          );
        }),
        (ListCache.prototype.get = function listCacheGet(key) {
          var data = this.__data__,
            index = assocIndexOf(data, key);
          return index < 0 ? void 0 : data[index][1];
        }),
        (ListCache.prototype.has = function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }),
        (ListCache.prototype.set = function listCacheSet(key, value) {
          var data = this.__data__,
            index = assocIndexOf(data, key);
          return (
            index < 0 ? (++this.size, data.push([key, value])) : (data[index][1] = value), this
          );
        }),
        (MapCache.prototype.clear = function mapCacheClear() {
          (this.size = 0),
            (this.__data__ = {
              hash: new Hash(),
              map: new (Map || ListCache)(),
              string: new Hash(),
            });
        }),
        (MapCache.prototype.delete = function mapCacheDelete(key) {
          var result = getMapData(this, key).delete(key);
          return (this.size -= result ? 1 : 0), result;
        }),
        (MapCache.prototype.get = function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }),
        (MapCache.prototype.has = function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }),
        (MapCache.prototype.set = function mapCacheSet(key, value) {
          var data = getMapData(this, key),
            size = data.size;
          return data.set(key, value), (this.size += data.size == size ? 0 : 1), this;
        }),
        (SetCache.prototype.add = SetCache.prototype.push =
          function setCacheAdd(value) {
            return this.__data__.set(value, '__lodash_hash_undefined__'), this;
          }),
        (SetCache.prototype.has = function setCacheHas(value) {
          return this.__data__.has(value);
        }),
        (Stack.prototype.clear = function stackClear() {
          (this.__data__ = new ListCache()), (this.size = 0);
        }),
        (Stack.prototype.delete = function stackDelete(key) {
          var data = this.__data__,
            result = data.delete(key);
          return (this.size = data.size), result;
        }),
        (Stack.prototype.get = function stackGet(key) {
          return this.__data__.get(key);
        }),
        (Stack.prototype.has = function stackHas(key) {
          return this.__data__.has(key);
        }),
        (Stack.prototype.set = function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map || pairs.length < 199)
              return pairs.push([key, value]), (this.size = ++data.size), this;
            data = this.__data__ = new MapCache(pairs);
          }
          return data.set(key, value), (this.size = data.size), this;
        });
      var getSymbols = nativeGetSymbols
          ? function (object) {
              return null == object
                ? []
                : ((object = Object(object)),
                  (function arrayFilter(array, predicate) {
                    for (
                      var index = -1,
                        length = null == array ? 0 : array.length,
                        resIndex = 0,
                        result = [];
                      ++index < length;

                    ) {
                      var value = array[index];
                      predicate(value, index, array) && (result[resIndex++] = value);
                    }
                    return result;
                  })(nativeGetSymbols(object), function (symbol) {
                    return propertyIsEnumerable.call(object, symbol);
                  }));
            }
          : function stubArray() {
              return [];
            },
        getTag = baseGetTag;
      function isIndex(value, length) {
        return (
          !!(length = null == length ? MAX_SAFE_INTEGER : length) &&
          ('number' == typeof value || reIsUint.test(value)) &&
          value > -1 &&
          value % 1 == 0 &&
          value < length
        );
      }
      function toSource(func) {
        if (null != func) {
          try {
            return funcToString.call(func);
          } catch (e) {}
          try {
            return func + '';
          } catch (e) {}
        }
        return '';
      }
      function eq(value, other) {
        return value === other || (value != value && other != other);
      }
      ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Map && getTag(new Map()) != mapTag) ||
        (Promise && '[object Promise]' != getTag(Promise.resolve())) ||
        (Set && getTag(new Set()) != setTag) ||
        (WeakMap && '[object WeakMap]' != getTag(new WeakMap()))) &&
        (getTag = function (value) {
          var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : void 0,
            ctorString = Ctor ? toSource(Ctor) : '';
          if (ctorString)
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag;
              case mapCtorString:
                return mapTag;
              case promiseCtorString:
                return '[object Promise]';
              case setCtorString:
                return setTag;
              case weakMapCtorString:
                return '[object WeakMap]';
            }
          return result;
        });
      var isArguments = baseIsArguments(
          (function () {
            return arguments;
          })()
        )
          ? baseIsArguments
          : function (value) {
              return (
                isObjectLike(value) &&
                hasOwnProperty.call(value, 'callee') &&
                !propertyIsEnumerable.call(value, 'callee')
              );
            },
        isArray = Array.isArray;
      var isBuffer =
        nativeIsBuffer ||
        function stubFalse() {
          return !1;
        };
      function isFunction(value) {
        if (!isObject(value)) return !1;
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      function isLength(value) {
        return (
          'number' == typeof value && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
        );
      }
      function isObject(value) {
        var type = typeof value;
        return null != value && ('object' == type || 'function' == type);
      }
      function isObjectLike(value) {
        return null != value && 'object' == typeof value;
      }
      var isTypedArray = nodeIsTypedArray
        ? (function baseUnary(func) {
            return function (value) {
              return func(value);
            };
          })(nodeIsTypedArray)
        : function baseIsTypedArray(value) {
            return (
              isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)]
            );
          };
      function keys(object) {
        return (function isArrayLike(value) {
          return null != value && isLength(value.length) && !isFunction(value);
        })(object)
          ? arrayLikeKeys(object)
          : baseKeys(object);
      }
      module.exports = function isEqual(value, other) {
        return baseIsEqual(value, other);
      };
    },
    './node_modules/pino/browser.js': (module, __unused_webpack_exports, __webpack_require__) => {
      'use strict';
      const format = __webpack_require__('./node_modules/quick-format-unescaped/index.js');
      module.exports = pino;
      const _console =
          (function pfGlobalThisOrFallback() {
            function defd(o) {
              return void 0 !== o && o;
            }
            try {
              return (
                'undefined' != typeof globalThis ||
                  Object.defineProperty(Object.prototype, 'globalThis', {
                    get: function () {
                      return delete Object.prototype.globalThis, (this.globalThis = this);
                    },
                    configurable: !0,
                  }),
                globalThis
              );
            } catch (e) {
              return defd(self) || defd(window) || defd(this) || {};
            }
          })().console || {},
        stdSerializers = {
          mapHttpRequest: mock,
          mapHttpResponse: mock,
          wrapRequestSerializer: passthrough,
          wrapResponseSerializer: passthrough,
          wrapErrorSerializer: passthrough,
          req: mock,
          res: mock,
          err: function asErrValue(err) {
            const obj = { type: err.constructor.name, msg: err.message, stack: err.stack };
            for (const key in err) void 0 === obj[key] && (obj[key] = err[key]);
            return obj;
          },
        };
      function pino(opts) {
        (opts = opts || {}).browser = opts.browser || {};
        const transmit = opts.browser.transmit;
        if (transmit && 'function' != typeof transmit.send)
          throw Error('pino: transmit option must have a send function');
        const proto = opts.browser.write || _console;
        opts.browser.write && (opts.browser.asObject = !0);
        const serializers = opts.serializers || {},
          serialize = (function shouldSerialize(serialize, serializers) {
            if (Array.isArray(serialize))
              return serialize.filter(function (k) {
                return '!stdSerializers.err' !== k;
              });
            return !0 === serialize && Object.keys(serializers);
          })(opts.browser.serialize, serializers);
        let stdErrSerialize = opts.browser.serialize;
        Array.isArray(opts.browser.serialize) &&
          opts.browser.serialize.indexOf('!stdSerializers.err') > -1 &&
          (stdErrSerialize = !1);
        'function' == typeof proto &&
          (proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto),
          !1 === opts.enabled && (opts.level = 'silent');
        const level = opts.level || 'info',
          logger = Object.create(proto);
        logger.log || (logger.log = noop),
          Object.defineProperty(logger, 'levelVal', {
            get: function getLevelVal() {
              return 'silent' === this.level ? 1 / 0 : this.levels.values[this.level];
            },
          }),
          Object.defineProperty(logger, 'level', {
            get: function getLevel() {
              return this._level;
            },
            set: function setLevel(level) {
              if ('silent' !== level && !this.levels.values[level])
                throw Error('unknown level ' + level);
              (this._level = level),
                set(setOpts, logger, 'error', 'log'),
                set(setOpts, logger, 'fatal', 'error'),
                set(setOpts, logger, 'warn', 'error'),
                set(setOpts, logger, 'info', 'log'),
                set(setOpts, logger, 'debug', 'log'),
                set(setOpts, logger, 'trace', 'log');
            },
          });
        const setOpts = {
          transmit,
          serialize,
          asObject: opts.browser.asObject,
          levels: ['error', 'fatal', 'warn', 'info', 'debug', 'trace'],
          timestamp: getTimeFunction(opts),
        };
        return (
          (logger.levels = pino.levels),
          (logger.level = level),
          (logger.setMaxListeners =
            logger.getMaxListeners =
            logger.emit =
            logger.addListener =
            logger.on =
            logger.prependListener =
            logger.once =
            logger.prependOnceListener =
            logger.removeListener =
            logger.removeAllListeners =
            logger.listeners =
            logger.listenerCount =
            logger.eventNames =
            logger.write =
            logger.flush =
              noop),
          (logger.serializers = serializers),
          (logger._serialize = serialize),
          (logger._stdErrSerialize = stdErrSerialize),
          (logger.child = function child(bindings, childOptions) {
            if (!bindings) throw new Error('missing bindings for child Pino');
            (childOptions = childOptions || {}),
              serialize &&
                bindings.serializers &&
                (childOptions.serializers = bindings.serializers);
            const childOptionsSerializers = childOptions.serializers;
            if (serialize && childOptionsSerializers) {
              var childSerializers = Object.assign({}, serializers, childOptionsSerializers),
                childSerialize =
                  !0 === opts.browser.serialize ? Object.keys(childSerializers) : serialize;
              delete bindings.serializers,
                applySerializers(
                  [bindings],
                  childSerialize,
                  childSerializers,
                  this._stdErrSerialize
                );
            }
            function Child(parent) {
              (this._childLevel = 1 + (0 | parent._childLevel)),
                (this.error = bind(parent, bindings, 'error')),
                (this.fatal = bind(parent, bindings, 'fatal')),
                (this.warn = bind(parent, bindings, 'warn')),
                (this.info = bind(parent, bindings, 'info')),
                (this.debug = bind(parent, bindings, 'debug')),
                (this.trace = bind(parent, bindings, 'trace')),
                childSerializers &&
                  ((this.serializers = childSerializers), (this._serialize = childSerialize)),
                transmit &&
                  (this._logEvent = createLogEventShape(
                    [].concat(parent._logEvent.bindings, bindings)
                  ));
            }
            return (Child.prototype = this), new Child(this);
          }),
          transmit && (logger._logEvent = createLogEventShape()),
          logger
        );
      }
      function set(opts, logger, level, fallback) {
        const proto = Object.getPrototypeOf(logger);
        (logger[level] =
          logger.levelVal > logger.levels.values[level]
            ? noop
            : proto[level]
            ? proto[level]
            : _console[level] || _console[fallback] || noop),
          (function wrap(opts, logger, level) {
            if (!opts.transmit && logger[level] === noop) return;
            logger[level] =
              ((write = logger[level]),
              function LOG() {
                const ts = opts.timestamp(),
                  args = new Array(arguments.length),
                  proto =
                    Object.getPrototypeOf && Object.getPrototypeOf(this) === _console
                      ? _console
                      : this;
                for (var i = 0; i < args.length; i++) args[i] = arguments[i];
                if (
                  (opts.serialize &&
                    !opts.asObject &&
                    applySerializers(
                      args,
                      this._serialize,
                      this.serializers,
                      this._stdErrSerialize
                    ),
                  opts.asObject
                    ? write.call(
                        proto,
                        (function asObject(logger, level, args, ts) {
                          logger._serialize &&
                            applySerializers(
                              args,
                              logger._serialize,
                              logger.serializers,
                              logger._stdErrSerialize
                            );
                          const argsCloned = args.slice();
                          let msg = argsCloned[0];
                          const o = {};
                          ts && (o.time = ts), (o.level = pino.levels.values[level]);
                          let lvl = 1 + (0 | logger._childLevel);
                          if ((lvl < 1 && (lvl = 1), null !== msg && 'object' == typeof msg)) {
                            for (; lvl-- && 'object' == typeof argsCloned[0]; )
                              Object.assign(o, argsCloned.shift());
                            msg = argsCloned.length
                              ? format(argsCloned.shift(), argsCloned)
                              : void 0;
                          } else
                            'string' == typeof msg &&
                              (msg = format(argsCloned.shift(), argsCloned));
                          return void 0 !== msg && (o.msg = msg), o;
                        })(this, level, args, ts)
                      )
                    : write.apply(proto, args),
                  opts.transmit)
                ) {
                  const transmitLevel = opts.transmit.level || logger.level,
                    transmitValue = pino.levels.values[transmitLevel],
                    methodValue = pino.levels.values[level];
                  if (methodValue < transmitValue) return;
                  !(function transmit(logger, opts, args) {
                    const send = opts.send,
                      ts = opts.ts,
                      methodLevel = opts.methodLevel,
                      methodValue = opts.methodValue,
                      val = opts.val,
                      bindings = logger._logEvent.bindings;
                    applySerializers(
                      args,
                      logger._serialize || Object.keys(logger.serializers),
                      logger.serializers,
                      void 0 === logger._stdErrSerialize || logger._stdErrSerialize
                    ),
                      (logger._logEvent.ts = ts),
                      (logger._logEvent.messages = args.filter(function (arg) {
                        return -1 === bindings.indexOf(arg);
                      })),
                      (logger._logEvent.level.label = methodLevel),
                      (logger._logEvent.level.value = methodValue),
                      send(methodLevel, logger._logEvent, val),
                      (logger._logEvent = createLogEventShape(bindings));
                  })(
                    this,
                    {
                      ts,
                      methodLevel: level,
                      methodValue,
                      transmitLevel,
                      transmitValue: pino.levels.values[opts.transmit.level || logger.level],
                      send: opts.transmit.send,
                      val: logger.levelVal,
                    },
                    args
                  );
                }
              });
            var write;
          })(opts, logger, level);
      }
      function applySerializers(args, serialize, serializers, stdErrSerialize) {
        for (const i in args)
          if (stdErrSerialize && args[i] instanceof Error)
            args[i] = pino.stdSerializers.err(args[i]);
          else if ('object' == typeof args[i] && !Array.isArray(args[i]))
            for (const k in args[i])
              serialize &&
                serialize.indexOf(k) > -1 &&
                k in serializers &&
                (args[i][k] = serializers[k](args[i][k]));
      }
      function bind(parent, bindings, level) {
        return function () {
          const args = new Array(1 + arguments.length);
          args[0] = bindings;
          for (var i = 1; i < args.length; i++) args[i] = arguments[i - 1];
          return parent[level].apply(this, args);
        };
      }
      function createLogEventShape(bindings) {
        return { ts: 0, messages: [], bindings: bindings || [], level: { label: '', value: 0 } };
      }
      function getTimeFunction(opts) {
        return 'function' == typeof opts.timestamp
          ? opts.timestamp
          : !1 === opts.timestamp
          ? nullTime
          : epochTime;
      }
      function mock() {
        return {};
      }
      function passthrough(a) {
        return a;
      }
      function noop() {}
      function nullTime() {
        return !1;
      }
      function epochTime() {
        return Date.now();
      }
      (pino.levels = {
        values: { fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10 },
        labels: { 10: 'trace', 20: 'debug', 30: 'info', 40: 'warn', 50: 'error', 60: 'fatal' },
      }),
        (pino.stdSerializers = stdSerializers),
        (pino.stdTimeFunctions = Object.assign(
          {},
          {
            nullTime,
            epochTime,
            unixTime: function unixTime() {
              return Math.round(Date.now() / 1e3);
            },
            isoTime: function isoTime() {
              return new Date(Date.now()).toISOString();
            },
          }
        ));
    },
    './node_modules/quick-format-unescaped/index.js': (module) => {
      'use strict';
      function tryStringify(o) {
        try {
          return JSON.stringify(o);
        } catch (e) {
          return '"[Circular]"';
        }
      }
      module.exports = function format(f, args, opts) {
        var ss = (opts && opts.stringify) || tryStringify;
        if ('object' == typeof f && null !== f) {
          var len = args.length + 1;
          if (1 === len) return f;
          var objects = new Array(len);
          objects[0] = ss(f);
          for (var index = 1; index < len; index++) objects[index] = ss(args[index]);
          return objects.join(' ');
        }
        if ('string' != typeof f) return f;
        var argLen = args.length;
        if (0 === argLen) return f;
        for (var str = '', a = 0, lastPos = -1, flen = (f && f.length) || 0, i = 0; i < flen; ) {
          if (37 === f.charCodeAt(i) && i + 1 < flen) {
            switch (((lastPos = lastPos > -1 ? lastPos : 0), f.charCodeAt(i + 1))) {
              case 100:
              case 102:
                if (a >= argLen) break;
                if (null == args[a]) break;
                lastPos < i && (str += f.slice(lastPos, i)),
                  (str += Number(args[a])),
                  (lastPos = i + 2),
                  i++;
                break;
              case 105:
                if (a >= argLen) break;
                if (null == args[a]) break;
                lastPos < i && (str += f.slice(lastPos, i)),
                  (str += Math.floor(Number(args[a]))),
                  (lastPos = i + 2),
                  i++;
                break;
              case 79:
              case 111:
              case 106:
                if (a >= argLen) break;
                if (void 0 === args[a]) break;
                lastPos < i && (str += f.slice(lastPos, i));
                var type = typeof args[a];
                if ('string' === type) {
                  (str += "'" + args[a] + "'"), (lastPos = i + 2), i++;
                  break;
                }
                if ('function' === type) {
                  (str += args[a].name || '<anonymous>'), (lastPos = i + 2), i++;
                  break;
                }
                (str += ss(args[a])), (lastPos = i + 2), i++;
                break;
              case 115:
                if (a >= argLen) break;
                lastPos < i && (str += f.slice(lastPos, i)),
                  (str += String(args[a])),
                  (lastPos = i + 2),
                  i++;
                break;
              case 37:
                lastPos < i && (str += f.slice(lastPos, i)),
                  (str += '%'),
                  (lastPos = i + 2),
                  i++,
                  a--;
            }
            ++a;
          }
          ++i;
        }
        if (-1 === lastPos) return f;
        lastPos < flen && (str += f.slice(lastPos));
        return str;
      };
    },
    './node_modules/safe-json-utils/dist/cjs/index.js': (__unused_webpack_module, exports) => {
      'use strict';
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.safeJsonParse = function safeJsonParse(value) {
          if ('string' != typeof value)
            throw new Error('Cannot safe json parse value of type ' + typeof value);
          try {
            return JSON.parse(value);
          } catch (_a) {
            return value;
          }
        }),
        (exports.safeJsonStringify = function safeJsonStringify(value) {
          return 'string' == typeof value
            ? value
            : JSON.stringify(value, (key, value) => (void 0 === value ? null : value));
        });
    },
    './node_modules/ws/browser.js': (module) => {
      'use strict';
      module.exports = function () {
        throw new Error(
          'ws does not work in the browser. Browser clients must use the native WebSocket object'
        );
      };
    },
  },
]);
