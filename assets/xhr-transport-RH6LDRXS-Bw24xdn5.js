var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { h, l as i, t as U } from "./index-CukSm0R7.js";
const B = "3.7.7", Z = B, p = typeof h == "function", E = typeof TextDecoder == "function" ? new TextDecoder() : void 0, w = typeof TextEncoder == "function" ? new TextEncoder() : void 0, j = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", y = Array.prototype.slice.call(j), A = ((t) => {
  let e = {};
  return t.forEach((r, a) => e[r] = a), e;
})(y), K = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/, s = String.fromCharCode.bind(String), D = typeof Uint8Array.from == "function" ? Uint8Array.from.bind(Uint8Array) : (t) => new Uint8Array(Array.prototype.slice.call(t, 0)), T = (t) => t.replace(/=/g, "").replace(/[+\/]/g, (e) => e == "+" ? "-" : "_"), F = (t) => t.replace(/[^A-Za-z0-9\+\/]/g, ""), I = (t) => {
  let e, r, a, o, u = "";
  const l = t.length % 3;
  for (let n = 0; n < t.length; ) {
    if ((r = t.charCodeAt(n++)) > 255 || (a = t.charCodeAt(n++)) > 255 || (o = t.charCodeAt(n++)) > 255) throw new TypeError("invalid character found");
    e = r << 16 | a << 8 | o, u += y[e >> 18 & 63] + y[e >> 12 & 63] + y[e >> 6 & 63] + y[e & 63];
  }
  return l ? u.slice(0, l - 3) + "===".substring(l) : u;
}, S = typeof btoa == "function" ? (t) => btoa(t) : p ? (t) => h.from(t, "binary").toString("base64") : I, g = p ? (t) => h.from(t).toString("base64") : (t) => {
  let r = [];
  for (let a = 0, o = t.length; a < o; a += 4096) r.push(s.apply(null, t.subarray(a, a + 4096)));
  return S(r.join(""));
}, b = (t, e = false) => e ? T(g(t)) : g(t), X = (t) => {
  if (t.length < 2) {
    var e = t.charCodeAt(0);
    return e < 128 ? t : e < 2048 ? s(192 | e >>> 6) + s(128 | e & 63) : s(224 | e >>> 12 & 15) + s(128 | e >>> 6 & 63) + s(128 | e & 63);
  } else {
    var e = 65536 + (t.charCodeAt(0) - 55296) * 1024 + (t.charCodeAt(1) - 56320);
    return s(240 | e >>> 18 & 7) + s(128 | e >>> 12 & 63) + s(128 | e >>> 6 & 63) + s(128 | e & 63);
  }
}, $ = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, N = (t) => t.replace($, X), _ = p ? (t) => h.from(t, "utf8").toString("base64") : w ? (t) => g(w.encode(t)) : (t) => S(N(t)), x = (t, e = false) => e ? T(_(t)) : _(t), R = (t) => x(t, true), W = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g, G = (t) => {
  switch (t.length) {
    case 4:
      var e = (7 & t.charCodeAt(0)) << 18 | (63 & t.charCodeAt(1)) << 12 | (63 & t.charCodeAt(2)) << 6 | 63 & t.charCodeAt(3), r = e - 65536;
      return s((r >>> 10) + 55296) + s((r & 1023) + 56320);
    case 3:
      return s((15 & t.charCodeAt(0)) << 12 | (63 & t.charCodeAt(1)) << 6 | 63 & t.charCodeAt(2));
    default:
      return s((31 & t.charCodeAt(0)) << 6 | 63 & t.charCodeAt(1));
  }
}, H = (t) => t.replace(W, G), v = (t) => {
  if (t = t.replace(/\s+/g, ""), !K.test(t)) throw new TypeError("malformed base64.");
  t += "==".slice(2 - (t.length & 3));
  let e, r = "", a, o;
  for (let u = 0; u < t.length; ) e = A[t.charAt(u++)] << 18 | A[t.charAt(u++)] << 12 | (a = A[t.charAt(u++)]) << 6 | (o = A[t.charAt(u++)]), r += a === 64 ? s(e >> 16 & 255) : o === 64 ? s(e >> 16 & 255, e >> 8 & 255) : s(e >> 16 & 255, e >> 8 & 255, e & 255);
  return r;
}, C = typeof atob == "function" ? (t) => atob(F(t)) : p ? (t) => h.from(t, "base64").toString("binary") : v, M = p ? (t) => D(h.from(t, "base64")) : (t) => D(C(t).split("").map((e) => e.charCodeAt(0))), P = (t) => M(k(t)), J = p ? (t) => h.from(t, "base64").toString("utf8") : E ? (t) => E.decode(M(t)) : (t) => H(C(t)), k = (t) => F(t.replace(/[-_]/g, (e) => e == "-" ? "+" : "/")), m = (t) => J(k(t)), Q = (t) => {
  if (typeof t != "string") return false;
  const e = t.replace(/\s+/g, "").replace(/={0,2}$/, "");
  return !/[^\s0-9a-zA-Z\+/]/.test(e) || !/[^\s0-9a-zA-Z\-_]/.test(e);
}, O = (t) => ({ value: t, enumerable: false, writable: true, configurable: true }), L = function() {
  const t = (e, r) => Object.defineProperty(String.prototype, e, O(r));
  t("fromBase64", function() {
    return m(this);
  }), t("toBase64", function(e) {
    return x(this, e);
  }), t("toBase64URI", function() {
    return x(this, true);
  }), t("toBase64URL", function() {
    return x(this, true);
  }), t("toUint8Array", function() {
    return P(this);
  });
}, q = function() {
  const t = (e, r) => Object.defineProperty(Uint8Array.prototype, e, O(r));
  t("toBase64", function(e) {
    return b(this, e);
  }), t("toBase64URI", function() {
    return b(this, true);
  }), t("toBase64URL", function() {
    return b(this, true);
  });
}, Y = () => {
  L(), q();
}, tt = { version: B, VERSION: Z, atob: C, atobPolyfill: v, btoa: S, btoaPolyfill: I, fromBase64: m, toBase64: x, encode: x, encodeURI: R, encodeURL: R, utob: N, btou: H, decode: m, isValid: Q, fromUint8Array: b, toUint8Array: P, extendString: L, extendUint8Array: q, extendBuiltins: Y };
var et = class {
  constructor() {
    __publicField(this, "responseHeaders", new i.Metadata());
    __publicField(this, "responseChunks", []);
    __publicField(this, "grpcStatus", i.Status.UNKNOWN);
    __publicField(this, "statusMessage", "");
  }
};
async function rt(t, e, r, a) {
  const o = new et();
  return new Promise(function(u, l) {
    const n = new XMLHttpRequest();
    n.open("POST", t, true), n.withCredentials = (a == null ? void 0 : a.credentials) ?? true, n.responseType = "arraybuffer";
    for (const [d, c] of e) for (const f of c) n.setRequestHeader(d, typeof f == "string" ? f : tt.fromUint8Array(f));
    n.onreadystatechange = function() {
      n.readyState === XMLHttpRequest.HEADERS_RECEIVED ? o.responseHeaders = ot(n.getAllResponseHeaders()) : n.readyState === XMLHttpRequest.DONE && u(o);
    }, n.onerror = function() {
      o.statusMessage = st(n.status, n.statusText);
    }, n.onloadend = function() {
      o.responseChunks.push(new Uint8Array(n.response)), o.grpcStatus = at(n.status);
    }, n.send(r);
  });
}
function nt(t) {
  let e = 0;
  for (const o of t) e += o.length;
  const r = new Uint8Array(e);
  let a = 0;
  for (const o of t) r.set(o, a), a += o.length;
  return r;
}
function ct(t) {
  return async function* ({ url: r, body: a, metadata: o, signal: u, method: l }) {
    let n;
    if (l.requestStream) {
      let c;
      n = new ReadableStream({ type: "bytes", start() {
        c = a[Symbol.asyncIterator]();
      }, async pull(f) {
        const { done: z, value: V } = await c.next();
        z ? f.close() : f.enqueue(V);
      }, async cancel() {
        var _a;
        await ((_a = c.return) == null ? void 0 : _a.call(c));
      } });
    } else {
      let c;
      for await (const f of a) {
        c = f;
        break;
      }
      n = c;
    }
    const d = await rt(r, o, n, t);
    if (yield { type: "header", header: d.responseHeaders }, d.grpcStatus !== i.Status.OK) {
      const f = new TextDecoder().decode(nt(d.responseChunks));
      throw new i.ClientError(l.path, d.grpcStatus, `status=${d.statusMessage}, message=${f}`);
    }
    U(u);
    try {
      for (const c of d.responseChunks) c != null && (yield { type: "data", data: c });
    } finally {
      U(u);
    }
  };
}
function ot(t) {
  const e = new i.Metadata();
  return t.trim().split(/[\r\n]+/).forEach((a) => {
    const o = a.split(": "), u = o.shift() ?? "", l = o.join(": ");
    e.set(u, l);
  }), e;
}
function at(t) {
  switch (t) {
    case 200:
      return i.Status.OK;
    case 400:
      return i.Status.INTERNAL;
    case 401:
      return i.Status.UNAUTHENTICATED;
    case 403:
      return i.Status.PERMISSION_DENIED;
    case 404:
      return i.Status.UNIMPLEMENTED;
    case 429:
    case 502:
    case 503:
    case 504:
      return i.Status.UNAVAILABLE;
    default:
      return i.Status.UNKNOWN;
  }
}
function st(t, e) {
  return `Received HTTP ${t} response: ` + (e.length > 1e3 ? e.slice(0, 1e3) + "... (truncated)" : e);
}
export {
  ct as XHRTransport
};
