import { h as I, z as T, D as ve, E as ar, f as sr } from "./index-DyzPd4zG.js";
function ir(r, a) {
  for (var u = 0; u < a.length; u++) {
    const o = a[u];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const t in o) if (t !== "default" && !(t in r)) {
        const i = Object.getOwnPropertyDescriptor(o, t);
        i && Object.defineProperty(r, t, i.get ? i : { enumerable: true, get: () => o[t] });
      }
    }
  }
  return Object.freeze(Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }));
}
var D = {}, z = {}, L = {}, Me;
function ur() {
  if (Me) return L;
  Me = 1, Object.defineProperty(L, "__esModule", { value: true }), L.fromGrpcWebServiceDefinition = r, L.isGrpcWebServiceDefinition = a;
  function r(o) {
    const t = {};
    for (const [i, b] of Object.entries(o)) {
      if (i === "serviceName") continue;
      const h = b;
      t[u(i)] = { path: `/${o.serviceName}/${i}`, requestStream: h.requestStream, responseStream: h.responseStream, requestDeserialize: h.requestType.deserializeBinary, requestSerialize: (c) => c.serializeBinary(), responseDeserialize: h.responseType.deserializeBinary, responseSerialize: (c) => c.serializeBinary(), options: {} };
    }
    return t;
  }
  function a(o) {
    return "prototype" in o;
  }
  function u(o) {
    return o.length === 0 ? o : o[0].toLowerCase() + o.slice(1);
  }
  return L;
}
var x = {}, Ce;
function cr() {
  if (Ce) return x;
  Ce = 1, Object.defineProperty(x, "__esModule", { value: true }), x.fromTsProtoServiceDefinition = r, x.isTsProtoServiceDefinition = a;
  function r(u) {
    const o = {};
    for (const [t, i] of Object.entries(u.methods)) {
      const b = i.requestType.encode, h = i.requestType.fromPartial, c = i.responseType.encode, s = i.responseType.fromPartial;
      o[t] = { path: `/${u.fullName}/${i.name}`, requestStream: i.requestStream, responseStream: i.responseStream, requestDeserialize: i.requestType.decode, requestSerialize: h != null ? (l) => b(h(l)).finish() : (l) => b(l).finish(), responseDeserialize: i.responseType.decode, responseSerialize: s != null ? (l) => c(s(l)).finish() : (l) => c(l).finish(), options: i.options };
    }
    return o;
  }
  function a(u) {
    return "name" in u && "fullName" in u && "methods" in u;
  }
  return x;
}
var qe;
function Je() {
  if (qe) return z;
  qe = 1, Object.defineProperty(z, "__esModule", { value: true }), z.normalizeServiceDefinition = u;
  const r = ur(), a = cr();
  function u(o) {
    return (0, r.isGrpcWebServiceDefinition)(o) ? (0, r.fromGrpcWebServiceDefinition)(o) : (0, a.isTsProtoServiceDefinition)(o) ? (0, a.fromTsProtoServiceDefinition)(o) : o;
  }
  return z;
}
var W = {}, G = {}, ie = { exports: {} }, lr = ie.exports, Re;
function be() {
  return Re || (Re = 1, function(r, a) {
    (function(u, o) {
      r.exports = o();
    })(typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : lr, function() {
      var u = "3.7.7", o = u, t = typeof I == "function", i = typeof TextDecoder == "function" ? new TextDecoder() : void 0, b = typeof TextEncoder == "function" ? new TextEncoder() : void 0, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c = Array.prototype.slice.call(h), s = function(e) {
        var d = {};
        return e.forEach(function(A, M) {
          return d[A] = M;
        }), d;
      }(c), l = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/, n = String.fromCharCode.bind(String), f = typeof Uint8Array.from == "function" ? Uint8Array.from.bind(Uint8Array) : function(e) {
        return new Uint8Array(Array.prototype.slice.call(e, 0));
      }, m = function(e) {
        return e.replace(/=/g, "").replace(/[+\/]/g, function(d) {
          return d == "+" ? "-" : "_";
        });
      }, v = function(e) {
        return e.replace(/[^A-Za-z0-9\+\/]/g, "");
      }, p = function(e) {
        for (var d, A, M, P, R = "", pe = e.length % 3, H = 0; H < e.length; ) {
          if ((A = e.charCodeAt(H++)) > 255 || (M = e.charCodeAt(H++)) > 255 || (P = e.charCodeAt(H++)) > 255) throw new TypeError("invalid character found");
          d = A << 16 | M << 8 | P, R += c[d >> 18 & 63] + c[d >> 12 & 63] + c[d >> 6 & 63] + c[d & 63];
        }
        return pe ? R.slice(0, pe - 3) + "===".substring(pe) : R;
      }, y = typeof btoa == "function" ? function(e) {
        return btoa(e);
      } : t ? function(e) {
        return I.from(e, "binary").toString("base64");
      } : p, _ = t ? function(e) {
        return I.from(e).toString("base64");
      } : function(e) {
        for (var d = 4096, A = [], M = 0, P = e.length; M < P; M += d) A.push(n.apply(null, e.subarray(M, M + d)));
        return y(A.join(""));
      }, E = function(e, d) {
        return d === void 0 && (d = false), d ? m(_(e)) : _(e);
      }, S = function(e) {
        if (e.length < 2) {
          var d = e.charCodeAt(0);
          return d < 128 ? e : d < 2048 ? n(192 | d >>> 6) + n(128 | d & 63) : n(224 | d >>> 12 & 15) + n(128 | d >>> 6 & 63) + n(128 | d & 63);
        } else {
          var d = 65536 + (e.charCodeAt(0) - 55296) * 1024 + (e.charCodeAt(1) - 56320);
          return n(240 | d >>> 18 & 7) + n(128 | d >>> 12 & 63) + n(128 | d >>> 6 & 63) + n(128 | d & 63);
        }
      }, w = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, C = function(e) {
        return e.replace(w, S);
      }, O = t ? function(e) {
        return I.from(e, "utf8").toString("base64");
      } : b ? function(e) {
        return _(b.encode(e));
      } : function(e) {
        return y(C(e));
      }, q = function(e, d) {
        return d === void 0 && (d = false), d ? m(O(e)) : O(e);
      }, F = function(e) {
        return q(e, true);
      }, le = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g, de = function(e) {
        switch (e.length) {
          case 4:
            var d = (7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3), A = d - 65536;
            return n((A >>> 10) + 55296) + n((A & 1023) + 56320);
          case 3:
            return n((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
          default:
            return n((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1));
        }
      }, g = function(e) {
        return e.replace(le, de);
      }, k = function(e) {
        if (e = e.replace(/\s+/g, ""), !l.test(e)) throw new TypeError("malformed base64.");
        e += "==".slice(2 - (e.length & 3));
        for (var d, A = "", M, P, R = 0; R < e.length; ) d = s[e.charAt(R++)] << 18 | s[e.charAt(R++)] << 12 | (M = s[e.charAt(R++)]) << 6 | (P = s[e.charAt(R++)]), A += M === 64 ? n(d >> 16 & 255) : P === 64 ? n(d >> 16 & 255, d >> 8 & 255) : n(d >> 16 & 255, d >> 8 & 255, d & 255);
        return A;
      }, fe = typeof atob == "function" ? function(e) {
        return atob(v(e));
      } : t ? function(e) {
        return I.from(e, "base64").toString("binary");
      } : k, _e = t ? function(e) {
        return f(I.from(e, "base64"));
      } : function(e) {
        return f(fe(e).split("").map(function(d) {
          return d.charCodeAt(0);
        }));
      }, ge = function(e) {
        return _e(we(e));
      }, tr = t ? function(e) {
        return I.from(e, "base64").toString("utf8");
      } : i ? function(e) {
        return i.decode(_e(e));
      } : function(e) {
        return g(fe(e));
      }, we = function(e) {
        return v(e.replace(/[-_]/g, function(d) {
          return d == "-" ? "+" : "/";
        }));
      }, he = function(e) {
        return tr(we(e));
      }, nr = function(e) {
        if (typeof e != "string") return false;
        var d = e.replace(/\s+/g, "").replace(/={0,2}$/, "");
        return !/[^\s0-9a-zA-Z\+/]/.test(d) || !/[^\s0-9a-zA-Z\-_]/.test(d);
      }, Se = function(e) {
        return { value: e, enumerable: false, writable: true, configurable: true };
      }, Ae = function() {
        var e = function(d, A) {
          return Object.defineProperty(String.prototype, d, Se(A));
        };
        e("fromBase64", function() {
          return he(this);
        }), e("toBase64", function(d) {
          return q(this, d);
        }), e("toBase64URI", function() {
          return q(this, true);
        }), e("toBase64URL", function() {
          return q(this, true);
        }), e("toUint8Array", function() {
          return ge(this);
        });
      }, Ee = function() {
        var e = function(d, A) {
          return Object.defineProperty(Uint8Array.prototype, d, Se(A));
        };
        e("toBase64", function(d) {
          return E(this, d);
        }), e("toBase64URI", function() {
          return E(this, true);
        }), e("toBase64URL", function() {
          return E(this, true);
        });
      }, or = function() {
        Ae(), Ee();
      }, N = { version: u, VERSION: o, atob: fe, atobPolyfill: k, btoa: y, btoaPolyfill: p, fromBase64: he, toBase64: q, encode: q, encodeURI: F, encodeURL: F, utob: C, btou: g, decode: he, isValid: nr, fromUint8Array: E, toUint8Array: ge, extendString: Ae, extendUint8Array: Ee, extendBuiltins: or };
      return N.Base64 = {}, Object.keys(N).forEach(function(e) {
        return N.Base64[e] = N[e];
      }), N;
    });
  }(ie)), ie.exports;
}
var Te;
function Qe() {
  if (Te) return G;
  Te = 1, Object.defineProperty(G, "__esModule", { value: true }), G.FetchTransport = o;
  const r = ve, a = be(), u = T();
  function o(c) {
    return async function* ({ url: l, body: n, metadata: f, signal: m, method: v }) {
      let p;
      if (v.requestStream) {
        let S;
        p = new ReadableStream({ type: "bytes", start() {
          S = n[Symbol.asyncIterator]();
        }, async pull(w) {
          const { done: C, value: O } = await S.next();
          C ? w.close() : w.enqueue(O);
        }, async cancel() {
          var w, C;
          await ((C = (w = S).return) === null || C === void 0 ? void 0 : C.call(w));
        } });
      } else {
        let S;
        for await (const w of n) {
          S = w;
          break;
        }
        p = S;
      }
      const y = await fetch(l, { method: "POST", body: p, headers: t(f), signal: m, cache: c == null ? void 0 : c.cache, duplex: "half", credentials: c == null ? void 0 : c.credentials });
      if (yield { type: "header", header: i(y.headers) }, !y.ok) {
        const S = await y.text();
        throw new u.ClientError(v.path, b(y.status), h(y.status, S));
      }
      (0, r.throwIfAborted)(m);
      const _ = y.body.getReader(), E = () => {
        _.cancel().catch(() => {
        });
      };
      m.addEventListener("abort", E);
      try {
        for (; ; ) {
          const { done: S, value: w } = await _.read();
          if (w != null && (yield { type: "data", data: w }), S) break;
        }
      } finally {
        m.removeEventListener("abort", E), (0, r.throwIfAborted)(m);
      }
    };
  }
  function t(c) {
    const s = new Headers();
    for (const [l, n] of c) for (const f of n) s.append(l, typeof f == "string" ? f : a.Base64.fromUint8Array(f));
    return s;
  }
  function i(c) {
    const s = new u.Metadata();
    for (const [l, n] of c) if (l.endsWith("-bin")) for (const f of n.split(/,\s?/)) s.append(l, a.Base64.toUint8Array(f));
    else s.set(l, n);
    return s;
  }
  function b(c) {
    switch (c) {
      case 400:
        return u.Status.INTERNAL;
      case 401:
        return u.Status.UNAUTHENTICATED;
      case 403:
        return u.Status.PERMISSION_DENIED;
      case 404:
        return u.Status.UNIMPLEMENTED;
      case 429:
      case 502:
      case 503:
      case 504:
        return u.Status.UNAVAILABLE;
      default:
        return u.Status.UNKNOWN;
    }
  }
  function h(c, s) {
    return `Received HTTP ${c} response: ` + (s.length > 1e3 ? s.slice(0, 1e3) + "... (truncated)" : s);
  }
  return G;
}
var Oe;
function dr() {
  if (Oe) return W;
  Oe = 1, Object.defineProperty(W, "__esModule", { value: true }), W.createChannel = a;
  const r = Qe();
  function a(u, o = (0, r.FetchTransport)()) {
    return { address: u, transport: o };
  }
  return W;
}
var U = {}, V = {}, Z = {}, Pe;
function ue() {
  if (Pe) return Z;
  Pe = 1, Object.defineProperty(Z, "__esModule", { value: true }), Z.isAsyncIterable = r;
  function r(a) {
    return a != null && Symbol.asyncIterator in a;
  }
  return Z;
}
var K = {}, Y = {}, J = {}, Ie;
function fr() {
  if (Ie) return J;
  Ie = 1, Object.defineProperty(J, "__esModule", { value: true }), J.concatBuffers = r;
  function r(a, u) {
    if (a.length === 1) return a[0];
    const o = new Uint8Array(u);
    let t = 0;
    for (const i of a) o.set(i, t), t += i.length;
    return o;
  }
  return J;
}
var Q = {}, De;
function hr() {
  if (De) return Q;
  De = 1, Object.defineProperty(Q, "__esModule", { value: true }), Q.decodeMetadata = u;
  const r = T(), a = be();
  function u(o) {
    const t = (0, r.Metadata)(), i = new TextDecoder().decode(o);
    for (const b of i.split(`\r
`)) {
      if (!b) continue;
      const h = b.indexOf(":");
      if (h === -1) throw new Error(`Invalid metadata line: ${b}`);
      const c = b.slice(0, h).trim().toLowerCase(), s = b.slice(h + 1).trim();
      if (c.endsWith("-bin")) for (const l of s.split(/,\s?/)) t.append(c, a.Base64.toUint8Array(l));
      else t.append(c, s);
    }
    return t;
  }
  return Q;
}
var me = {}, ke;
function Xe() {
  return ke || (ke = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: true }), r.LPM_HEADER_LENGTH = void 0, r.parseLpmHeader = a, r.encodeFrame = u, r.LPM_HEADER_LENGTH = 5;
    function a(o) {
      if (o.length !== r.LPM_HEADER_LENGTH) throw new Error(`Invalid LPM header length: ${o.length}`);
      const t = new DataView(o.buffer, o.byteOffset, o.byteLength), i = (t.getUint8(0) & 1) !== 0, b = (t.getUint8(0) & 128) !== 0, h = t.getUint32(1);
      return { compressed: i, isMetadata: b, length: h };
    }
    function u(o) {
      const t = new Uint8Array(r.LPM_HEADER_LENGTH + o.length);
      return new DataView(t.buffer, 1, 4).setUint32(0, o.length, false), t.set(o, r.LPM_HEADER_LENGTH), t;
    }
  }(me)), me;
}
var je;
function pr() {
  if (je) return Y;
  je = 1, Object.defineProperty(Y, "__esModule", { value: true }), Y.decodeResponse = o;
  const r = fr(), a = hr(), u = Xe();
  async function* o({ response: t, decode: i, onHeader: b, onTrailer: h }) {
    let c = false, s = false, l = false, n = p(u.LPM_HEADER_LENGTH), f;
    for await (const y of t) if (y.type === "header") m(y.header);
    else if (y.type === "trailer") v(y.trailer);
    else if (y.type === "data") {
      if (s) throw new Error("Received data after trailer");
      let { data: _ } = y;
      for (; _.length > 0 || (f == null ? void 0 : f.length) === 0; ) {
        const E = Math.min(_.length, n.targetLength - n.totalLength), S = _.subarray(0, E);
        if (_ = _.subarray(E), n.chunks.push(S), n.totalLength += S.length, n.totalLength === n.targetLength) {
          const w = (0, r.concatBuffers)(n.chunks, n.totalLength);
          if (f == null) f = (0, u.parseLpmHeader)(w), n = p(f.length);
          else {
            if (f.compressed) throw new Error("Compressed messages not supported");
            if (f.isMetadata) c ? v((0, a.decodeMetadata)(w)) : m((0, a.decodeMetadata)(w));
            else {
              if (!c) throw new Error("Received data before header");
              yield i(w), l = true;
            }
            f = void 0, n = p(u.LPM_HEADER_LENGTH);
          }
        }
      }
    }
    function m(y) {
      if (c) throw new Error("Received multiple headers");
      if (l) throw new Error("Received header after data");
      if (s) throw new Error("Received header after trailer");
      c = true, b(y);
    }
    function v(y) {
      if (s) throw new Error("Received multiple trailers");
      s = true, h(y);
    }
    function p(y) {
      return { chunks: [], totalLength: 0, targetLength: y };
    }
  }
  return Y;
}
var X = {}, Be;
function mr() {
  if (Be) return X;
  Be = 1, Object.defineProperty(X, "__esModule", { value: true }), X.encodeRequest = a;
  const r = Xe();
  async function* a({ request: u, encode: o }) {
    for await (const t of u) {
      const i = o(t);
      yield (0, r.encodeFrame)(i);
    }
  }
  return X;
}
var ee = {}, Ne;
function yr() {
  if (Ne) return ee;
  Ne = 1, Object.defineProperty(ee, "__esModule", { value: true }), ee.makeInternalErrorMessage = r;
  function r(a) {
    return a == null || typeof a != "object" ? String(a) : typeof a.message == "string" ? a.message : JSON.stringify(a);
  }
  return ee;
}
var re = {}, Le;
function vr() {
  if (Le) return re;
  Le = 1, Object.defineProperty(re, "__esModule", { value: true }), re.parseTrailer = a;
  const r = T();
  function a(u) {
    let o;
    const t = u.get("grpc-status");
    if (t != null) {
      const h = +t;
      if (h in r.Status) o = h;
      else throw new Error(`Received invalid status code from server: ${t}`);
    } else throw new Error("Received no status code from server");
    let i = u.get("grpc-message");
    if (i != null) try {
      i = decodeURIComponent(i);
    } catch {
    }
    const b = (0, r.Metadata)(u);
    return b.delete("grpc-status"), b.delete("grpc-message"), { status: o, message: i, trailer: b };
  }
  return re;
}
var xe;
function ce() {
  if (xe) return K;
  xe = 1, Object.defineProperty(K, "__esModule", { value: true }), K.makeCall = b;
  const r = ve, a = T(), u = pr(), o = mr(), t = yr(), i = vr();
  async function* b(h, c, s, l) {
    const { metadata: n, signal: f = new AbortController().signal, onHeader: m, onTrailer: v } = l;
    let p = false, y, _;
    function E(g) {
      if (p) {
        if (new Map(g).size > 0) throw new a.ClientError(h.path, a.Status.INTERNAL, "Received non-empty trailer after trailers-only response");
        return;
      }
      const k = (0, i.parseTrailer)(g);
      ({ status: y, message: _ } = k), v == null ? void 0 : v(k.trailer);
    }
    const S = (0, a.Metadata)(n);
    S.set("content-type", "application/grpc-web+proto"), S.set("x-grpc-web", "1");
    const w = new AbortController(), C = () => {
      w.abort();
    };
    f.addEventListener("abort", C);
    let O = false, q;
    async function* F() {
      try {
        for await (const g of s) {
          if (O) throw new Error("Request finished");
          yield g;
        }
      } catch (g) {
        throw q = { err: g }, w.abort(), g;
      }
    }
    async function* le() {
      try {
        return yield* c.transport({ url: c.address + h.path, metadata: S, body: (0, o.encodeRequest)({ request: F(), encode: h.requestSerialize }), signal: w.signal, method: h });
      } catch (g) {
        throw (0, r.rethrowAbortError)(g), new a.ClientError(h.path, a.Status.UNKNOWN, `Transport error: ${(0, t.makeInternalErrorMessage)(g)}`);
      }
    }
    const de = (0, u.decodeResponse)({ response: le(), decode: h.responseDeserialize, onHeader(g) {
      g.has("grpc-status") ? (E(g), p = true) : m == null ? void 0 : m(g);
    }, onTrailer(g) {
      E(g);
    } });
    try {
      yield* de;
    } catch (g) {
      throw q !== void 0 ? q.err : g instanceof a.ClientError || (0, r.isAbortError)(g) ? g : new a.ClientError(h.path, a.Status.INTERNAL, (0, t.makeInternalErrorMessage)(g));
    } finally {
      if (O = true, f.removeEventListener("abort", C), y != null && y !== a.Status.OK) throw new a.ClientError(h.path, y, _ ?? "");
    }
    if (y == null) throw new a.ClientError(h.path, a.Status.UNKNOWN, 'Response stream closed without gRPC status. This may indicate a misconfigured CORS policy on the server: Access-Control-Expose-Headers must include "grpc-status" and "grpc-message".');
  }
  return K;
}
var Ue;
function br() {
  if (Ue) return V;
  Ue = 1, Object.defineProperty(V, "__esModule", { value: true }), V.createBidiStreamingMethod = u;
  const r = ue(), a = ce();
  function u(o, t, i, b) {
    const h = { path: o.path, requestStream: o.requestStream, responseStream: o.responseStream, options: o.options };
    async function* c(l, n) {
      if (!(0, r.isAsyncIterable)(l)) throw new Error("A middleware passed invalid request to next(): expected a single message for bidirectional streaming method");
      yield* (0, a.makeCall)(o, t, l, n);
    }
    const s = i == null ? c : (l, n) => i({ method: h, requestStream: true, request: l, responseStream: true, next: c }, n);
    return (l, n) => {
      const m = s(l, { ...b, ...n })[Symbol.asyncIterator]();
      return { [Symbol.asyncIterator]() {
        return { async next() {
          const v = await m.next();
          return v.done && v.value != null ? await m.throw(new Error("A middleware returned a message, but expected to return void for bidirectional streaming method")) : v;
        }, return() {
          return m.return();
        }, throw(v) {
          return m.throw(v);
        } };
      } };
    };
  }
  return V;
}
var te = {}, $e;
function _r() {
  if ($e) return te;
  $e = 1, Object.defineProperty(te, "__esModule", { value: true }), te.createClientStreamingMethod = o;
  const r = T(), a = ue(), u = ce();
  function o(t, i, b, h) {
    const c = { path: t.path, requestStream: t.requestStream, responseStream: t.responseStream, options: t.options };
    async function* s(n, f) {
      if (!(0, a.isAsyncIterable)(n)) throw Error("A middleware passed invalid request to next(): expected a single message for client streaming method");
      const m = (0, u.makeCall)(t, i, n, f);
      let v;
      for await (const p of m) {
        if (v != null) throw new r.ClientError(t.path, r.Status.INTERNAL, "Received more than one message from server for client streaming method");
        v = p;
      }
      if (v == null) throw new r.ClientError(t.path, r.Status.INTERNAL, "Server did not return a response");
      return v;
    }
    const l = b == null ? s : (n, f) => b({ method: c, requestStream: true, request: n, responseStream: false, next: s }, f);
    return async (n, f) => {
      const v = l(n, { ...h, ...f })[Symbol.asyncIterator]();
      let p = await v.next();
      for (; ; ) {
        if (!p.done) {
          p = await v.throw(new Error("A middleware yielded a message, but expected to only return a message for client streaming method"));
          continue;
        }
        if (p.value == null) {
          p = await v.throw(new Error("A middleware returned void, but expected to return a message for client streaming method"));
          continue;
        }
        return p.value;
      }
    };
  }
  return te;
}
var ne = {}, oe = {}, Fe;
function er() {
  if (Fe) return oe;
  Fe = 1, Object.defineProperty(oe, "__esModule", { value: true }), oe.asyncIterableOf = r;
  async function* r(a) {
    yield a;
  }
  return oe;
}
var He;
function gr() {
  if (He) return ne;
  He = 1, Object.defineProperty(ne, "__esModule", { value: true }), ne.createServerStreamingMethod = o;
  const r = er(), a = ue(), u = ce();
  function o(t, i, b, h) {
    const c = { path: t.path, requestStream: t.requestStream, responseStream: t.responseStream, options: t.options };
    async function* s(n, f) {
      if ((0, a.isAsyncIterable)(n)) throw new Error("A middleware passed invalid request to next(): expected a single message for server streaming method");
      yield* (0, u.makeCall)(t, i, (0, r.asyncIterableOf)(n), f);
    }
    const l = b == null ? s : (n, f) => b({ method: c, requestStream: false, request: n, responseStream: true, next: s }, f);
    return (n, f) => {
      const v = l(n, { ...h, ...f })[Symbol.asyncIterator]();
      return { [Symbol.asyncIterator]() {
        return { async next() {
          const p = await v.next();
          return p.done && p.value != null ? await v.throw(new Error("A middleware returned a message, but expected to return void for server streaming method")) : p;
        }, return() {
          return v.return();
        }, throw(p) {
          return v.throw(p);
        } };
      } };
    };
  }
  return ne;
}
var ae = {}, ze;
function wr() {
  if (ze) return ae;
  ze = 1, Object.defineProperty(ae, "__esModule", { value: true }), ae.createUnaryMethod = t;
  const r = T(), a = er(), u = ue(), o = ce();
  function t(i, b, h, c) {
    const s = { path: i.path, requestStream: i.requestStream, responseStream: i.responseStream, options: i.options };
    async function* l(f, m) {
      if ((0, u.isAsyncIterable)(f)) throw new Error("A middleware passed invalid request to next(): expected a single message for unary method");
      const v = (0, o.makeCall)(i, b, (0, a.asyncIterableOf)(f), m);
      let p;
      for await (const y of v) {
        if (p != null) throw new r.ClientError(i.path, r.Status.INTERNAL, "Received more than one message from server for unary method");
        p = y;
      }
      if (p == null) throw new r.ClientError(i.path, r.Status.INTERNAL, "Server did not return a response");
      return p;
    }
    const n = h == null ? l : (f, m) => h({ method: s, requestStream: false, request: f, responseStream: false, next: l }, m);
    return async (f, m) => {
      const p = n(f, { ...c, ...m })[Symbol.asyncIterator]();
      let y = await p.next();
      for (; ; ) {
        if (!y.done) {
          y = await p.throw(new Error("A middleware yielded a message, but expected to only return a message for unary method"));
          continue;
        }
        if (y.value == null) {
          y = await p.throw(new Error("A middleware returned void, but expected to return a message for unary method"));
          continue;
        }
        return y.value;
      }
    };
  }
  return ae;
}
var We;
function Sr() {
  if (We) return U;
  We = 1, Object.defineProperty(U, "__esModule", { value: true }), U.createClientFactory = b, U.createClient = h;
  const r = T(), a = Je(), u = br(), o = _r(), t = gr(), i = wr();
  function b() {
    return c();
  }
  function h(s, l, n) {
    return b().create(s, l, n);
  }
  function c(s) {
    return { use(l) {
      return c(s == null ? l : (0, r.composeClientMiddleware)(s, l));
    }, create(l, n, f = {}) {
      const m = {}, v = Object.entries((0, a.normalizeServiceDefinition)(l));
      for (const [p, y] of v) {
        const _ = { ...f["*"], ...f[p] };
        y.requestStream ? y.responseStream ? m[p] = (0, u.createBidiStreamingMethod)(y, n, s, _) : m[p] = (0, o.createClientStreamingMethod)(y, n, s, _) : y.responseStream ? m[p] = (0, t.createServerStreamingMethod)(y, n, s, _) : m[p] = (0, i.createUnaryMethod)(y, n, s, _);
      }
      return m;
    } };
  }
  return U;
}
var ye = {}, Ge;
function Ar() {
  return Ge || (Ge = 1, Object.defineProperty(ye, "__esModule", { value: true })), ye;
}
var j = {}, B = null;
typeof WebSocket < "u" ? B = WebSocket : typeof MozWebSocket < "u" ? B = MozWebSocket : typeof globalThis < "u" ? B = globalThis.WebSocket || globalThis.MozWebSocket : typeof window < "u" ? B = window.WebSocket || window.MozWebSocket : typeof self < "u" && (B = self.WebSocket || self.MozWebSocket);
const Er = B, Mr = Object.freeze(Object.defineProperty({ __proto__: null, default: Er }, Symbol.toStringTag, { value: "Module" })), Cr = ar(Mr);
var $ = {}, Ve;
function qr() {
  if (Ve) return $;
  Ve = 1, Object.defineProperty($, "__esModule", { value: true }), $.AsyncSink = void 0;
  const r = "value", a = "error";
  let u = class {
    constructor() {
      this._ended = false, this._values = [], this._resolvers = [];
    }
    [Symbol.asyncIterator]() {
      return this;
    }
    write(t) {
      this._push({ type: r, value: t });
    }
    error(t) {
      this._push({ type: a, error: t });
    }
    _push(t) {
      if (!this._ended) if (this._resolvers.length > 0) {
        const { resolve: i, reject: b } = this._resolvers.shift();
        t.type === a ? b(t.error) : i({ done: false, value: t.value });
      } else this._values.push(t);
    }
    next() {
      if (this._values.length > 0) {
        const { type: t, value: i, error: b } = this._values.shift();
        return t === a ? Promise.reject(b) : Promise.resolve({ done: false, value: i });
      }
      return this._ended ? Promise.resolve({ done: true }) : new Promise((t, i) => {
        this._resolvers.push({ resolve: t, reject: i });
      });
    }
    end() {
      for (; this._resolvers.length > 0; ) this._resolvers.shift().resolve({ done: true });
      this._ended = true;
    }
  };
  return $.AsyncSink = u, $;
}
var Ze;
function Rr() {
  if (Ze) return j;
  Ze = 1;
  var r = j && j.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(j, "__esModule", { value: true }), j.WebsocketTransport = i;
  const a = ve, u = r(Cr), o = be(), t = qr();
  function i() {
    return async function* ({ url: s, body: l, metadata: n, signal: f }) {
      if (f.aborted) throw new a.AbortError();
      const m = new t.AsyncSink();
      f.addEventListener("abort", () => {
        m.error(new a.AbortError());
      });
      const v = new URL(s);
      v.protocol = v.protocol.replace("http", "ws");
      const p = new u.default(v, ["grpc-websockets"]);
      p.binaryType = "arraybuffer", p.addEventListener("message", (_) => {
        _.data instanceof ArrayBuffer ? m.write({ type: "data", data: new Uint8Array(_.data) }) : m.error(new Error(`Unexpected message type: ${typeof _.data}`));
      }), p.addEventListener("close", (_) => {
        _.wasClean ? m.end() : m.error(new Error(`WebSocket closed with code ${_.code}` + (_.reason && `: ${_.reason}`)));
      });
      const y = new AbortController();
      b(y.signal, n, l, p).catch((_) => {
        (0, a.isAbortError)(_) || m.error(_);
      });
      try {
        return yield* m;
      } finally {
        y.abort(), p.close();
      }
    };
  }
  async function b(s, l, n, f) {
    f.readyState == u.default.CONNECTING && await (0, a.waitForEvent)(s, f, "open"), f.send(h(l));
    for await (const m of n) {
      (0, a.throwIfAborted)(s);
      const v = new Uint8Array(m.length + 1);
      v.set([0], 0), v.set(m, 1), f.send(v);
    }
    f.send(new Uint8Array([1]));
  }
  function h(s) {
    let l = "";
    for (const [n, f] of s) for (const m of f) {
      const v = typeof m == "string" ? m : o.Base64.fromUint8Array(m), p = `${n}: ${v}\r
`;
      for (let y = 0; y < p.length; y++) {
        const _ = p.charCodeAt(y);
        if (!c(_)) throw new Error(`Metadata contains invalid characters: '${p}'`);
      }
      l += p;
    }
    return new TextEncoder().encode(l);
  }
  function c(s) {
    return s === 9 || s === 10 || s === 13 || s >= 32 && s <= 126;
  }
  return j;
}
var se = {}, Ke;
function Tr() {
  if (Ke) return se;
  Ke = 1, Object.defineProperty(se, "__esModule", { value: true }), se.NodeHttpTransport = r;
  function r() {
    throw new Error("NodeHttpTransport is not supported in the browser");
  }
  return se;
}
var Ye;
function Or() {
  return Ye || (Ye = 1, function(r) {
    var a = D && D.__createBinding || (Object.create ? function(h, c, s, l) {
      l === void 0 && (l = s);
      var n = Object.getOwnPropertyDescriptor(c, s);
      (!n || ("get" in n ? !c.__esModule : n.writable || n.configurable)) && (n = { enumerable: true, get: function() {
        return c[s];
      } }), Object.defineProperty(h, l, n);
    } : function(h, c, s, l) {
      l === void 0 && (l = s), h[l] = c[s];
    }), u = D && D.__exportStar || function(h, c) {
      for (var s in h) s !== "default" && !Object.prototype.hasOwnProperty.call(c, s) && a(c, h, s);
    };
    Object.defineProperty(r, "__esModule", { value: true }), r.NodeHttpTransport = r.WebsocketTransport = r.FetchTransport = r.Status = r.Metadata = r.composeClientMiddleware = r.ClientError = void 0;
    var o = T();
    Object.defineProperty(r, "ClientError", { enumerable: true, get: function() {
      return o.ClientError;
    } }), Object.defineProperty(r, "composeClientMiddleware", { enumerable: true, get: function() {
      return o.composeClientMiddleware;
    } }), Object.defineProperty(r, "Metadata", { enumerable: true, get: function() {
      return o.Metadata;
    } }), Object.defineProperty(r, "Status", { enumerable: true, get: function() {
      return o.Status;
    } }), u(Je(), r), u(dr(), r), u(Sr(), r), u(Ar(), r);
    var t = Qe();
    Object.defineProperty(r, "FetchTransport", { enumerable: true, get: function() {
      return t.FetchTransport;
    } });
    var i = Rr();
    Object.defineProperty(r, "WebsocketTransport", { enumerable: true, get: function() {
      return i.WebsocketTransport;
    } });
    var b = Tr();
    Object.defineProperty(r, "NodeHttpTransport", { enumerable: true, get: function() {
      return b.NodeHttpTransport;
    } });
  }(D)), D;
}
var rr = Or();
const Pr = sr(rr), kr = ir({ __proto__: null, default: Pr }, [rr]);
export {
  kr as i
};
