import { a as bi, r as re, H as Di, j as O, L as Ui, e as fn, C as vi, I as Gi, J as ge, i as Ee, M as Oe, N as Hi, O as Vi, p as Wi, R as $i, U as zi, V as Zi, W as Yi, X as Xi, Y as Ji, Z as Qi, $ as es, f as rs, a0 as ts, a1 as ze, a2 as ns, a3 as as, a4 as is, a5 as ss, k as _i, b as os, n as cs, a6 as us, a7 as ls, a8 as fs, c as ds, F as Fe, a9 as hs, aa as ps, B as ys } from "./index-CukSm0R7.js";
import { C as gs } from "./customNumberKeyboard-xMsN3eft.js";
const ms = "/blitz-web-app/assets/adminHomeWallet_dark-DiIyX2BO.png";
function bs({ scannedAddress: r, sparkInformation: t }) {
  try {
    return !!t.transactions.find((e) => {
      const n = JSON.parse(e.details);
      return e.paymentType === "lightning" && n.address == r;
    });
  } catch {
    return false;
  }
}
function vs({ reason: r }) {
  const t = bi(), e = re.useRef(null), n = re.useMemo(() => Di(Gi, "light"), []);
  return re.useEffect(() => {
    e.current && e.current.play();
  }, []), O.jsxs("div", { className: "errorWithPaymentComponent", children: [O.jsx(Ui, { className: "errorAnimation", lottieRef: e, animationData: n, loop: false, autoplay: true }), O.jsx(fn, { className: "errorText", textContent: "Error message" }), O.jsx("div", { className: "sendErrorContentContainer", children: O.jsx(fn, { styles: { textAlign: "center" }, textContent: String(r) }) }), O.jsx(vi, { textContent: "Continue", actionFunction: () => {
    t("/wallet");
  } })] });
}
async function wi(r, t, e) {
  var _a2, _b;
  let n;
  try {
    if (((_a2 = r.type) == null ? void 0 : _a2.toLowerCase()) === ge.LnUrlPay.toLowerCase()) {
      const a = `${r.data.callback}?amount=${t * 1e3}${(r == null ? void 0 : r.data.commentAllowed) ? `&comment=${encodeURIComponent(((_b = r == null ? void 0 : r.data) == null ? void 0 : _b.message) || e || "")}` : ""}`;
      n = (await (await fetch(a)).json()).pr;
    } else n = r.data.invoice.bolt11;
  } catch {
    n = "";
  }
  return n;
}
async function _s(r, t) {
  const { masterInfoObject: e, comingFromAccept: n, enteredPaymentInfo: a, fiatStats: f } = t, c = n ? a.amount : r.address.amountSat || 0, o = Number(c) / (Ee / ((f == null ? void 0 : f.value) || 65e3));
  let i = { address: r.address.address, amount: c, label: r.address.label || "" }, s = 0, l = 0;
  if (c) {
    const h = await Oe({ getFee: true, address: r.address.address, paymentType: "bitcoin", amountSats: c, masterInfoObject: e });
    if (!h.didWork) throw new Error(h.error);
    s = h.fee, l = h.supportFee;
  }
  return { data: i, type: "Bitcoin", paymentNetwork: "Bitcoin", paymentFee: s, supportFee: l, address: r.address.address, sendAmount: c ? `${e.userBalanceDenomination != "fiat" ? `${c}` : o < 0.01 ? "" : `${o.toFixed(2)}`}` : "", canEditPayment: !(n || r.address.amountSat) };
}
async function ws(r, t) {
  const { masterInfoObject: e, comingFromAccept: n, enteredPaymentInfo: a, fiatStats: f } = t, c = Math.floor(Date.now() / 1e3), o = r.invoice.timestamp + r.invoice.expiry;
  if (c > o) throw new Error("This lightning invoice has expired");
  const s = n ? a.amount * 1e3 : r.invoice.amountMsat, l = !!s && Number(s / 1e3) / (Ee / ((f == null ? void 0 : f.value) || 65e3));
  let h = { fee: 0, supportFee: 0 };
  if (s && (h = await Oe({ getFee: true, address: r.invoice.bolt11, amountSats: Math.round(r.invoice.amountMsat / 1e3), paymentType: "lightning", masterInfoObject: e }), !h.didWork)) throw new Error(h.error);
  return { data: r, type: "bolt11", paymentNetwork: "lightning", paymentFee: h.fee, supportFee: h.supportFee, address: r.invoice.bolt11, sendAmount: s ? `${e.userBalanceDenomination != "fiat" ? `${Math.round(s / 1e3)}` : `${l.toFixed(2)}`}` : "", canEditPayment: n ? false : !s };
}
async function Ss(r, t) {
  var _a2;
  const { goBackFunction: e, navigate: n, setLoadingMessage: a, sdk: f } = t;
  try {
    a("Starting LNURL auth"), ((_a2 = (await f.lnurlAuth(r.data)).type) == null ? void 0 : _a2.toLowerCase()) === "ok" ? n("/wallet") : e("Failed to authenticate LNURL");
  } catch (c) {
    e(c.message);
  }
}
async function As(r, t) {
  var _a2;
  const { masterInfoObject: e, comingFromAccept: n, enteredPaymentInfo: a, fiatStats: f } = t, c = n ? a.amount * 1e3 : r.data.minSendable, o = Number(c / 1e3) / (Ee / ((f == null ? void 0 : f.value) || 65e3));
  let i = 0, s = 0, l = "";
  const h = ((_a2 = JSON.parse(r.data.metadataStr)) == null ? void 0 : _a2.find((y) => {
    const [_, A] = y;
    if (_ === "text/plain") return true;
  })) || [];
  if (n) {
    let y = "", _ = 0, A = 3;
    for (; !y && _ < A; ) {
      try {
        _ += 1;
        const m = await wi(r, Number(a.amount), a.description || "");
        if (m) {
          y = m;
          break;
        }
      } catch {
      }
      !y && _ < A && await new Promise((m) => setTimeout(m, 2e3));
    }
    if (!y) throw new Error("Unable to retrive invoice from LNURL, please try again.");
    const g = await Oe({ getFee: true, address: y, amountSats: Number(a.amount), paymentType: "lightning", masterInfoObject: e });
    if (!g.didWork) throw new Error(g.error);
    i = g.fee, s = g.supportFee;
  }
  return { data: n ? { ...r.data, message: a.description || h[1], invoice: l } : r.data, paymentFee: i, supportFee: s, type: "lnurlpay", paymentNetwork: "lightning", sendAmount: `${e.userBalanceDenomination != "fiat" ? `${Math.round(c / 1e3)}` : o < 0.01 ? "" : `${o.toFixed(2)}`}`, canEditPayment: !n };
}
Hi(Vi.Musig);
function Si({ amount: r, masterInfoObject: t, fiatStats: e }) {
  try {
    const n = Wi(r, t.userBalanceDenomination, t.userBalanceDenomination === "fiat" ? 2 : 0, e), a = (e == null ? void 0 : e.coin) || "USD", f = t.satDisplay === "symbol", c = t.userBalanceDenomination === "sats" || t.userBalanceDenomination === "hidden", o = $i({ amount: n, code: a }), i = o[3], s = o[2], l = `${zi(n)}`;
    return c ? f ? Zi + l : l + " sats" : f && i ? s + o[1] : f && !i ? o[1] + s : o[1] + ` ${a}`;
  } catch {
    return "";
  }
}
var Ze, dn;
function Es() {
  if (dn) return Ze;
  dn = 1;
  for (var r = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", t = {}, e = 0; e < r.length; e++) {
    var n = r.charAt(e);
    if (t[n] !== void 0) throw new TypeError(n + " is ambiguous");
    t[n] = e;
  }
  function a(g) {
    var m = g >> 25;
    return (g & 33554431) << 5 ^ -(m >> 0 & 1) & 996825010 ^ -(m >> 1 & 1) & 642813549 ^ -(m >> 2 & 1) & 513874426 ^ -(m >> 3 & 1) & 1027748829 ^ -(m >> 4 & 1) & 705979059;
  }
  function f(g) {
    for (var m = 1, E = 0; E < g.length; ++E) {
      var w = g.charCodeAt(E);
      if (w < 33 || w > 126) return "Invalid prefix (" + g + ")";
      m = a(m) ^ w >> 5;
    }
    for (m = a(m), E = 0; E < g.length; ++E) {
      var C = g.charCodeAt(E);
      m = a(m) ^ C & 31;
    }
    return m;
  }
  function c(g, m, E) {
    if (E = E || 90, g.length + 7 + m.length > E) throw new TypeError("Exceeds length limit");
    g = g.toLowerCase();
    var w = f(g);
    if (typeof w == "string") throw new Error(w);
    for (var C = g + "1", S = 0; S < m.length; ++S) {
      var P = m[S];
      if (P >> 5 !== 0) throw new Error("Non 5-bit word");
      w = a(w) ^ P, C += r.charAt(P);
    }
    for (S = 0; S < 6; ++S) w = a(w);
    for (w ^= 1, S = 0; S < 6; ++S) {
      var R = w >> (5 - S) * 5 & 31;
      C += r.charAt(R);
    }
    return C;
  }
  function o(g, m) {
    if (m = m || 90, g.length < 8) return g + " too short";
    if (g.length > m) return "Exceeds length limit";
    var E = g.toLowerCase(), w = g.toUpperCase();
    if (g !== E && g !== w) return "Mixed-case string " + g;
    g = E;
    var C = g.lastIndexOf("1");
    if (C === -1) return "No separator character for " + g;
    if (C === 0) return "Missing prefix for " + g;
    var S = g.slice(0, C), P = g.slice(C + 1);
    if (P.length < 6) return "Data too short";
    var R = f(S);
    if (typeof R == "string") return R;
    for (var K = [], T = 0; T < P.length; ++T) {
      var L = P.charAt(T), W = t[L];
      if (W === void 0) return "Unknown character " + L;
      R = a(R) ^ W, !(T + 6 >= P.length) && K.push(W);
    }
    return R !== 1 ? "Invalid checksum for " + g : { prefix: S, words: K };
  }
  function i() {
    var g = o.apply(null, arguments);
    if (typeof g == "object") return g;
  }
  function s(g) {
    var m = o.apply(null, arguments);
    if (typeof m == "object") return m;
    throw new Error(m);
  }
  function l(g, m, E, w) {
    for (var C = 0, S = 0, P = (1 << E) - 1, R = [], K = 0; K < g.length; ++K) for (C = C << m | g[K], S += m; S >= E; ) S -= E, R.push(C >> S & P);
    if (w) S > 0 && R.push(C << E - S & P);
    else {
      if (S >= m) return "Excess padding";
      if (C << E - S & P) return "Non-zero padding";
    }
    return R;
  }
  function h(g) {
    var m = l(g, 8, 5, true);
    if (Array.isArray(m)) return m;
  }
  function y(g) {
    var m = l(g, 8, 5, true);
    if (Array.isArray(m)) return m;
    throw new Error(m);
  }
  function _(g) {
    var m = l(g, 5, 8, false);
    if (Array.isArray(m)) return m;
  }
  function A(g) {
    var m = l(g, 5, 8, false);
    if (Array.isArray(m)) return m;
    throw new Error(m);
  }
  return Ze = { decodeUnsafe: i, decode: s, encode: c, toWordsUnsafe: h, toWords: y, fromWordsUnsafe: _, fromWords: A }, Ze;
}
var Ye, hn;
function Ts() {
  if (hn) return Ye;
  hn = 1;
  const r = { IMPOSSIBLE_CASE: "Impossible case. Please create issue.", TWEAK_ADD: "The tweak was out of range or the resulted private key is invalid", TWEAK_MUL: "The tweak was out of range or equal to zero", CONTEXT_RANDOMIZE_UNKNOW: "Unknow error on context randomization", SECKEY_INVALID: "Private Key is invalid", PUBKEY_PARSE: "Public Key could not be parsed", PUBKEY_SERIALIZE: "Public Key serialization error", PUBKEY_COMBINE: "The sum of the public keys is not valid", SIG_PARSE: "Signature could not be parsed", SIGN: "The nonce generation function failed, or the private key was invalid", RECOVER: "Public key could not be recover", ECDH: "Scalar was invalid (zero or overflow)" };
  function t(c, o) {
    if (!c) throw new Error(o);
  }
  function e(c, o, i) {
    if (t(o instanceof Uint8Array, `Expected ${c} to be an Uint8Array`), i !== void 0) if (Array.isArray(i)) {
      const s = i.join(", "), l = `Expected ${c} to be an Uint8Array with length [${s}]`;
      t(i.includes(o.length), l);
    } else {
      const s = `Expected ${c} to be an Uint8Array with length ${i}`;
      t(o.length === i, s);
    }
  }
  function n(c) {
    t(f(c) === "Boolean", "Expected compressed to be a Boolean");
  }
  function a(c = (i) => new Uint8Array(i), o) {
    return typeof c == "function" && (c = c(o)), e("output", c, o), c;
  }
  function f(c) {
    return Object.prototype.toString.call(c).slice(8, -1);
  }
  return Ye = (c) => ({ contextRandomize(o) {
    switch (t(o === null || o instanceof Uint8Array, "Expected seed to be an Uint8Array or null"), o !== null && e("seed", o, 32), c.contextRandomize(o)) {
      case 1:
        throw new Error(r.CONTEXT_RANDOMIZE_UNKNOW);
    }
  }, privateKeyVerify(o) {
    return e("private key", o, 32), c.privateKeyVerify(o) === 0;
  }, privateKeyNegate(o) {
    switch (e("private key", o, 32), c.privateKeyNegate(o)) {
      case 0:
        return o;
      case 1:
        throw new Error(r.IMPOSSIBLE_CASE);
    }
  }, privateKeyTweakAdd(o, i) {
    switch (e("private key", o, 32), e("tweak", i, 32), c.privateKeyTweakAdd(o, i)) {
      case 0:
        return o;
      case 1:
        throw new Error(r.TWEAK_ADD);
    }
  }, privateKeyTweakMul(o, i) {
    switch (e("private key", o, 32), e("tweak", i, 32), c.privateKeyTweakMul(o, i)) {
      case 0:
        return o;
      case 1:
        throw new Error(r.TWEAK_MUL);
    }
  }, publicKeyVerify(o) {
    return e("public key", o, [33, 65]), c.publicKeyVerify(o) === 0;
  }, publicKeyCreate(o, i = true, s) {
    switch (e("private key", o, 32), n(i), s = a(s, i ? 33 : 65), c.publicKeyCreate(s, o)) {
      case 0:
        return s;
      case 1:
        throw new Error(r.SECKEY_INVALID);
      case 2:
        throw new Error(r.PUBKEY_SERIALIZE);
    }
  }, publicKeyConvert(o, i = true, s) {
    switch (e("public key", o, [33, 65]), n(i), s = a(s, i ? 33 : 65), c.publicKeyConvert(s, o)) {
      case 0:
        return s;
      case 1:
        throw new Error(r.PUBKEY_PARSE);
      case 2:
        throw new Error(r.PUBKEY_SERIALIZE);
    }
  }, publicKeyNegate(o, i = true, s) {
    switch (e("public key", o, [33, 65]), n(i), s = a(s, i ? 33 : 65), c.publicKeyNegate(s, o)) {
      case 0:
        return s;
      case 1:
        throw new Error(r.PUBKEY_PARSE);
      case 2:
        throw new Error(r.IMPOSSIBLE_CASE);
      case 3:
        throw new Error(r.PUBKEY_SERIALIZE);
    }
  }, publicKeyCombine(o, i = true, s) {
    t(Array.isArray(o), "Expected public keys to be an Array"), t(o.length > 0, "Expected public keys array will have more than zero items");
    for (const l of o) e("public key", l, [33, 65]);
    switch (n(i), s = a(s, i ? 33 : 65), c.publicKeyCombine(s, o)) {
      case 0:
        return s;
      case 1:
        throw new Error(r.PUBKEY_PARSE);
      case 2:
        throw new Error(r.PUBKEY_COMBINE);
      case 3:
        throw new Error(r.PUBKEY_SERIALIZE);
    }
  }, publicKeyTweakAdd(o, i, s = true, l) {
    switch (e("public key", o, [33, 65]), e("tweak", i, 32), n(s), l = a(l, s ? 33 : 65), c.publicKeyTweakAdd(l, o, i)) {
      case 0:
        return l;
      case 1:
        throw new Error(r.PUBKEY_PARSE);
      case 2:
        throw new Error(r.TWEAK_ADD);
    }
  }, publicKeyTweakMul(o, i, s = true, l) {
    switch (e("public key", o, [33, 65]), e("tweak", i, 32), n(s), l = a(l, s ? 33 : 65), c.publicKeyTweakMul(l, o, i)) {
      case 0:
        return l;
      case 1:
        throw new Error(r.PUBKEY_PARSE);
      case 2:
        throw new Error(r.TWEAK_MUL);
    }
  }, signatureNormalize(o) {
    switch (e("signature", o, 64), c.signatureNormalize(o)) {
      case 0:
        return o;
      case 1:
        throw new Error(r.SIG_PARSE);
    }
  }, signatureExport(o, i) {
    e("signature", o, 64), i = a(i, 72);
    const s = { output: i, outputlen: 72 };
    switch (c.signatureExport(s, o)) {
      case 0:
        return i.slice(0, s.outputlen);
      case 1:
        throw new Error(r.SIG_PARSE);
      case 2:
        throw new Error(r.IMPOSSIBLE_CASE);
    }
  }, signatureImport(o, i) {
    switch (e("signature", o), i = a(i, 64), c.signatureImport(i, o)) {
      case 0:
        return i;
      case 1:
        throw new Error(r.SIG_PARSE);
      case 2:
        throw new Error(r.IMPOSSIBLE_CASE);
    }
  }, ecdsaSign(o, i, s = {}, l) {
    e("message", o, 32), e("private key", i, 32), t(f(s) === "Object", "Expected options to be an Object"), s.data !== void 0 && e("options.data", s.data), s.noncefn !== void 0 && t(f(s.noncefn) === "Function", "Expected options.noncefn to be a Function"), l = a(l, 64);
    const h = { signature: l, recid: null };
    switch (c.ecdsaSign(h, o, i, s.data, s.noncefn)) {
      case 0:
        return h;
      case 1:
        throw new Error(r.SIGN);
      case 2:
        throw new Error(r.IMPOSSIBLE_CASE);
    }
  }, ecdsaVerify(o, i, s) {
    switch (e("signature", o, 64), e("message", i, 32), e("public key", s, [33, 65]), c.ecdsaVerify(o, i, s)) {
      case 0:
        return true;
      case 3:
        return false;
      case 1:
        throw new Error(r.SIG_PARSE);
      case 2:
        throw new Error(r.PUBKEY_PARSE);
    }
  }, ecdsaRecover(o, i, s, l = true, h) {
    switch (e("signature", o, 64), t(f(i) === "Number" && i >= 0 && i <= 3, "Expected recovery id to be a Number within interval [0, 3]"), e("message", s, 32), n(l), h = a(h, l ? 33 : 65), c.ecdsaRecover(h, o, i, s)) {
      case 0:
        return h;
      case 1:
        throw new Error(r.SIG_PARSE);
      case 2:
        throw new Error(r.RECOVER);
      case 3:
        throw new Error(r.IMPOSSIBLE_CASE);
    }
  }, ecdh(o, i, s = {}, l) {
    switch (e("public key", o, [33, 65]), e("private key", i, 32), t(f(s) === "Object", "Expected options to be an Object"), s.data !== void 0 && e("options.data", s.data), s.hashfn !== void 0 ? (t(f(s.hashfn) === "Function", "Expected options.hashfn to be a Function"), s.xbuf !== void 0 && e("options.xbuf", s.xbuf, 32), s.ybuf !== void 0 && e("options.ybuf", s.ybuf, 32), e("output", l)) : l = a(l, 32), c.ecdh(l, o, i, s.data, s.hashfn, s.xbuf, s.ybuf)) {
      case 0:
        return l;
      case 1:
        throw new Error(r.PUBKEY_PARSE);
      case 2:
        throw new Error(r.ECDH);
    }
  } }), Ye;
}
var Xe, pn;
function qs() {
  if (pn) return Xe;
  pn = 1;
  const r = Yi().ec, t = new r("secp256k1"), e = t.curve, n = e.n.constructor;
  function a(i, s) {
    let l = new n(s);
    if (l.cmp(e.p) >= 0) return null;
    l = l.toRed(e.red);
    let h = l.redSqr().redIMul(l).redIAdd(e.b).redSqrt();
    i === 3 !== h.isOdd() && (h = h.redNeg());
    const y = l.redSqr().redIMul(l);
    return h.redSqr().redISub(y.redIAdd(e.b)).isZero() ? t.keyPair({ pub: { x: l, y: h } }) : null;
  }
  function f(i, s, l) {
    let h = new n(s), y = new n(l);
    if (h.cmp(e.p) >= 0 || y.cmp(e.p) >= 0 || (h = h.toRed(e.red), y = y.toRed(e.red), (i === 6 || i === 7) && y.isOdd() !== (i === 7))) return null;
    const _ = h.redSqr().redIMul(h);
    return y.redSqr().redISub(_.redIAdd(e.b)).isZero() ? t.keyPair({ pub: { x: h, y } }) : null;
  }
  function c(i) {
    const s = i[0];
    switch (s) {
      case 2:
      case 3:
        return i.length !== 33 ? null : a(s, i.subarray(1, 33));
      case 4:
      case 6:
      case 7:
        return i.length !== 65 ? null : f(s, i.subarray(1, 33), i.subarray(33, 65));
      default:
        return null;
    }
  }
  function o(i, s) {
    const l = s.encode(null, i.length === 33);
    for (let h = 0; h < i.length; ++h) i[h] = l[h];
  }
  return Xe = { contextRandomize() {
    return 0;
  }, privateKeyVerify(i) {
    const s = new n(i);
    return s.cmp(e.n) < 0 && !s.isZero() ? 0 : 1;
  }, privateKeyNegate(i) {
    const s = new n(i), l = e.n.sub(s).umod(e.n).toArrayLike(Uint8Array, "be", 32);
    return i.set(l), 0;
  }, privateKeyTweakAdd(i, s) {
    const l = new n(s);
    if (l.cmp(e.n) >= 0 || (l.iadd(new n(i)), l.cmp(e.n) >= 0 && l.isub(e.n), l.isZero())) return 1;
    const h = l.toArrayLike(Uint8Array, "be", 32);
    return i.set(h), 0;
  }, privateKeyTweakMul(i, s) {
    let l = new n(s);
    if (l.cmp(e.n) >= 0 || l.isZero()) return 1;
    l.imul(new n(i)), l.cmp(e.n) >= 0 && (l = l.umod(e.n));
    const h = l.toArrayLike(Uint8Array, "be", 32);
    return i.set(h), 0;
  }, publicKeyVerify(i) {
    return c(i) === null ? 1 : 0;
  }, publicKeyCreate(i, s) {
    const l = new n(s);
    if (l.cmp(e.n) >= 0 || l.isZero()) return 1;
    const h = t.keyFromPrivate(s).getPublic();
    return o(i, h), 0;
  }, publicKeyConvert(i, s) {
    const l = c(s);
    if (l === null) return 1;
    const h = l.getPublic();
    return o(i, h), 0;
  }, publicKeyNegate(i, s) {
    const l = c(s);
    if (l === null) return 1;
    const h = l.getPublic();
    return h.y = h.y.redNeg(), o(i, h), 0;
  }, publicKeyCombine(i, s) {
    const l = new Array(s.length);
    for (let y = 0; y < s.length; ++y) if (l[y] = c(s[y]), l[y] === null) return 1;
    let h = l[0].getPublic();
    for (let y = 1; y < l.length; ++y) h = h.add(l[y].pub);
    return h.isInfinity() ? 2 : (o(i, h), 0);
  }, publicKeyTweakAdd(i, s, l) {
    const h = c(s);
    if (h === null) return 1;
    if (l = new n(l), l.cmp(e.n) >= 0) return 2;
    const y = h.getPublic().add(e.g.mul(l));
    return y.isInfinity() ? 2 : (o(i, y), 0);
  }, publicKeyTweakMul(i, s, l) {
    const h = c(s);
    if (h === null) return 1;
    if (l = new n(l), l.cmp(e.n) >= 0 || l.isZero()) return 2;
    const y = h.getPublic().mul(l);
    return o(i, y), 0;
  }, signatureNormalize(i) {
    const s = new n(i.subarray(0, 32)), l = new n(i.subarray(32, 64));
    return s.cmp(e.n) >= 0 || l.cmp(e.n) >= 0 ? 1 : (l.cmp(t.nh) === 1 && i.set(e.n.sub(l).toArrayLike(Uint8Array, "be", 32), 32), 0);
  }, signatureExport(i, s) {
    const l = s.subarray(0, 32), h = s.subarray(32, 64);
    if (new n(l).cmp(e.n) >= 0 || new n(h).cmp(e.n) >= 0) return 1;
    const { output: y } = i;
    let _ = y.subarray(4, 37);
    _[0] = 0, _.set(l, 1);
    let A = 33, g = 0;
    for (; A > 1 && _[g] === 0 && !(_[g + 1] & 128); --A, ++g) ;
    if (_ = _.subarray(g), _[0] & 128 || A > 1 && _[0] === 0 && !(_[1] & 128)) return 1;
    let m = y.subarray(39, 72);
    m[0] = 0, m.set(h, 1);
    let E = 33, w = 0;
    for (; E > 1 && m[w] === 0 && !(m[w + 1] & 128); --E, ++w) ;
    return m = m.subarray(w), m[0] & 128 || E > 1 && m[0] === 0 && !(m[1] & 128) ? 1 : (i.outputlen = 6 + A + E, y[0] = 48, y[1] = i.outputlen - 2, y[2] = 2, y[3] = _.length, y.set(_, 4), y[4 + A] = 2, y[5 + A] = m.length, y.set(m, 6 + A), 0);
  }, signatureImport(i, s) {
    if (s.length < 8 || s.length > 72 || s[0] !== 48 || s[1] !== s.length - 2 || s[2] !== 2) return 1;
    const l = s[3];
    if (l === 0 || 5 + l >= s.length || s[4 + l] !== 2) return 1;
    const h = s[5 + l];
    if (h === 0 || 6 + l + h !== s.length || s[4] & 128 || l > 1 && s[4] === 0 && !(s[5] & 128) || s[l + 6] & 128 || h > 1 && s[l + 6] === 0 && !(s[l + 7] & 128)) return 1;
    let y = s.subarray(4, 4 + l);
    if (y.length === 33 && y[0] === 0 && (y = y.subarray(1)), y.length > 32) return 1;
    let _ = s.subarray(6 + l);
    if (_.length === 33 && _[0] === 0 && (_ = _.slice(1)), _.length > 32) throw new Error("S length is too long");
    let A = new n(y);
    A.cmp(e.n) >= 0 && (A = new n(0));
    let g = new n(s.subarray(6 + l));
    return g.cmp(e.n) >= 0 && (g = new n(0)), i.set(A.toArrayLike(Uint8Array, "be", 32), 0), i.set(g.toArrayLike(Uint8Array, "be", 32), 32), 0;
  }, ecdsaSign(i, s, l, h, y) {
    if (y) {
      const g = y;
      y = (m) => {
        const E = g(s, l, null, h, m);
        if (!(E instanceof Uint8Array && E.length === 32)) throw new Error("This is the way");
        return new n(E);
      };
    }
    const _ = new n(l);
    if (_.cmp(e.n) >= 0 || _.isZero()) return 1;
    let A;
    try {
      A = t.sign(s, l, { canonical: true, k: y, pers: h });
    } catch {
      return 1;
    }
    return i.signature.set(A.r.toArrayLike(Uint8Array, "be", 32), 0), i.signature.set(A.s.toArrayLike(Uint8Array, "be", 32), 32), i.recid = A.recoveryParam, 0;
  }, ecdsaVerify(i, s, l) {
    const h = { r: i.subarray(0, 32), s: i.subarray(32, 64) }, y = new n(h.r), _ = new n(h.s);
    if (y.cmp(e.n) >= 0 || _.cmp(e.n) >= 0) return 1;
    if (_.cmp(t.nh) === 1 || y.isZero() || _.isZero()) return 3;
    const A = c(l);
    if (A === null) return 2;
    const g = A.getPublic();
    return t.verify(s, h, g) ? 0 : 3;
  }, ecdsaRecover(i, s, l, h) {
    const y = { r: s.slice(0, 32), s: s.slice(32, 64) }, _ = new n(y.r), A = new n(y.s);
    if (_.cmp(e.n) >= 0 || A.cmp(e.n) >= 0) return 1;
    if (_.isZero() || A.isZero()) return 2;
    let g;
    try {
      g = t.recoverPubKey(h, y, l);
    } catch {
      return 2;
    }
    return o(i, g), 0;
  }, ecdh(i, s, l, h, y, _, A) {
    const g = c(s);
    if (g === null) return 1;
    const m = new n(l);
    if (m.cmp(e.n) >= 0 || m.isZero()) return 2;
    const E = g.getPublic().mul(m);
    if (y === void 0) {
      const w = E.encode(null, true), C = t.hash().update(w).digest();
      for (let S = 0; S < 32; ++S) i[S] = C[S];
    } else {
      _ || (_ = new Uint8Array(32));
      const w = E.getX().toArray("be", 32);
      for (let R = 0; R < 32; ++R) _[R] = w[R];
      A || (A = new Uint8Array(32));
      const C = E.getY().toArray("be", 32);
      for (let R = 0; R < 32; ++R) A[R] = C[R];
      const S = y(_, A, h);
      if (!(S instanceof Uint8Array && S.length === i.length)) return 2;
      i.set(S);
    }
    return 0;
  } }, Xe;
}
var Je, yn;
function Is() {
  return yn || (yn = 1, Je = Ts()(qs())), Je;
}
var Qe, gn;
function Cs() {
  if (gn) return Qe;
  gn = 1;
  function r() {
    this.__data__ = [], this.size = 0;
  }
  return Qe = r, Qe;
}
var er, mn;
function Ai() {
  if (mn) return er;
  mn = 1;
  function r(t, e) {
    return t === e || t !== t && e !== e;
  }
  return er = r, er;
}
var rr, bn;
function Be() {
  if (bn) return rr;
  bn = 1;
  var r = Ai();
  function t(e, n) {
    for (var a = e.length; a--; ) if (r(e[a][0], n)) return a;
    return -1;
  }
  return rr = t, rr;
}
var tr, vn;
function xs() {
  if (vn) return tr;
  vn = 1;
  var r = Be(), t = Array.prototype, e = t.splice;
  function n(a) {
    var f = this.__data__, c = r(f, a);
    if (c < 0) return false;
    var o = f.length - 1;
    return c == o ? f.pop() : e.call(f, c, 1), --this.size, true;
  }
  return tr = n, tr;
}
var nr, _n;
function Rs() {
  if (_n) return nr;
  _n = 1;
  var r = Be();
  function t(e) {
    var n = this.__data__, a = r(n, e);
    return a < 0 ? void 0 : n[a][1];
  }
  return nr = t, nr;
}
var ar, wn;
function Ps() {
  if (wn) return ar;
  wn = 1;
  var r = Be();
  function t(e) {
    return r(this.__data__, e) > -1;
  }
  return ar = t, ar;
}
var ir, Sn;
function js() {
  if (Sn) return ir;
  Sn = 1;
  var r = Be();
  function t(e, n) {
    var a = this.__data__, f = r(a, e);
    return f < 0 ? (++this.size, a.push([e, n])) : a[f][1] = n, this;
  }
  return ir = t, ir;
}
var sr, An;
function De() {
  if (An) return sr;
  An = 1;
  var r = Cs(), t = xs(), e = Rs(), n = Ps(), a = js();
  function f(c) {
    var o = -1, i = c == null ? 0 : c.length;
    for (this.clear(); ++o < i; ) {
      var s = c[o];
      this.set(s[0], s[1]);
    }
  }
  return f.prototype.clear = r, f.prototype.delete = t, f.prototype.get = e, f.prototype.has = n, f.prototype.set = a, sr = f, sr;
}
var or, En;
function Ns() {
  if (En) return or;
  En = 1;
  var r = De();
  function t() {
    this.__data__ = new r(), this.size = 0;
  }
  return or = t, or;
}
var cr, Tn;
function Os() {
  if (Tn) return cr;
  Tn = 1;
  function r(t) {
    var e = this.__data__, n = e.delete(t);
    return this.size = e.size, n;
  }
  return cr = r, cr;
}
var ur, qn;
function Ls() {
  if (qn) return ur;
  qn = 1;
  function r(t) {
    return this.__data__.get(t);
  }
  return ur = r, ur;
}
var lr, In;
function ks() {
  if (In) return lr;
  In = 1;
  function r(t) {
    return this.__data__.has(t);
  }
  return lr = r, lr;
}
var fr, Cn;
function Ei() {
  if (Cn) return fr;
  Cn = 1;
  var r = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
  return fr = r, fr;
}
var dr, xn;
function se() {
  if (xn) return dr;
  xn = 1;
  var r = Ei(), t = typeof self == "object" && self && self.Object === Object && self, e = r || t || Function("return this")();
  return dr = e, dr;
}
var hr, Rn;
function Xt() {
  if (Rn) return hr;
  Rn = 1;
  var r = se(), t = r.Symbol;
  return hr = t, hr;
}
var pr, Pn;
function Ms() {
  if (Pn) return pr;
  Pn = 1;
  var r = Xt(), t = Object.prototype, e = t.hasOwnProperty, n = t.toString, a = r ? r.toStringTag : void 0;
  function f(c) {
    var o = e.call(c, a), i = c[a];
    try {
      c[a] = void 0;
      var s = true;
    } catch {
    }
    var l = n.call(c);
    return s && (o ? c[a] = i : delete c[a]), l;
  }
  return pr = f, pr;
}
var yr, jn;
function Ks() {
  if (jn) return yr;
  jn = 1;
  var r = Object.prototype, t = r.toString;
  function e(n) {
    return t.call(n);
  }
  return yr = e, yr;
}
var gr, Nn;
function Ue() {
  if (Nn) return gr;
  Nn = 1;
  var r = Xt(), t = Ms(), e = Ks(), n = "[object Null]", a = "[object Undefined]", f = r ? r.toStringTag : void 0;
  function c(o) {
    return o == null ? o === void 0 ? a : n : f && f in Object(o) ? t(o) : e(o);
  }
  return gr = c, gr;
}
var mr, On;
function Le() {
  if (On) return mr;
  On = 1;
  function r(t) {
    var e = typeof t;
    return t != null && (e == "object" || e == "function");
  }
  return mr = r, mr;
}
var br, Ln;
function Ti() {
  if (Ln) return br;
  Ln = 1;
  var r = Ue(), t = Le(), e = "[object AsyncFunction]", n = "[object Function]", a = "[object GeneratorFunction]", f = "[object Proxy]";
  function c(o) {
    if (!t(o)) return false;
    var i = r(o);
    return i == n || i == a || i == e || i == f;
  }
  return br = c, br;
}
var vr, kn;
function Fs() {
  if (kn) return vr;
  kn = 1;
  var r = se(), t = r["__core-js_shared__"];
  return vr = t, vr;
}
var _r, Mn;
function Bs() {
  if (Mn) return _r;
  Mn = 1;
  var r = Fs(), t = function() {
    var n = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  }();
  function e(n) {
    return !!t && t in n;
  }
  return _r = e, _r;
}
var wr, Kn;
function qi() {
  if (Kn) return wr;
  Kn = 1;
  var r = Function.prototype, t = r.toString;
  function e(n) {
    if (n != null) {
      try {
        return t.call(n);
      } catch {
      }
      try {
        return n + "";
      } catch {
      }
    }
    return "";
  }
  return wr = e, wr;
}
var Sr, Fn;
function Ds() {
  if (Fn) return Sr;
  Fn = 1;
  var r = Ti(), t = Bs(), e = Le(), n = qi(), a = /[\\^$.*+?()[\]{}|]/g, f = /^\[object .+?Constructor\]$/, c = Function.prototype, o = Object.prototype, i = c.toString, s = o.hasOwnProperty, l = RegExp("^" + i.call(s).replace(a, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function h(y) {
    if (!e(y) || t(y)) return false;
    var _ = r(y) ? l : f;
    return _.test(n(y));
  }
  return Sr = h, Sr;
}
var Ar, Bn;
function Us() {
  if (Bn) return Ar;
  Bn = 1;
  function r(t, e) {
    return t == null ? void 0 : t[e];
  }
  return Ar = r, Ar;
}
var Er, Dn;
function ve() {
  if (Dn) return Er;
  Dn = 1;
  var r = Ds(), t = Us();
  function e(n, a) {
    var f = t(n, a);
    return r(f) ? f : void 0;
  }
  return Er = e, Er;
}
var Tr, Un;
function Jt() {
  if (Un) return Tr;
  Un = 1;
  var r = ve(), t = se(), e = r(t, "Map");
  return Tr = e, Tr;
}
var qr, Gn;
function Ge() {
  if (Gn) return qr;
  Gn = 1;
  var r = ve(), t = r(Object, "create");
  return qr = t, qr;
}
var Ir, Hn;
function Gs() {
  if (Hn) return Ir;
  Hn = 1;
  var r = Ge();
  function t() {
    this.__data__ = r ? r(null) : {}, this.size = 0;
  }
  return Ir = t, Ir;
}
var Cr, Vn;
function Hs() {
  if (Vn) return Cr;
  Vn = 1;
  function r(t) {
    var e = this.has(t) && delete this.__data__[t];
    return this.size -= e ? 1 : 0, e;
  }
  return Cr = r, Cr;
}
var xr, Wn;
function Vs() {
  if (Wn) return xr;
  Wn = 1;
  var r = Ge(), t = "__lodash_hash_undefined__", e = Object.prototype, n = e.hasOwnProperty;
  function a(f) {
    var c = this.__data__;
    if (r) {
      var o = c[f];
      return o === t ? void 0 : o;
    }
    return n.call(c, f) ? c[f] : void 0;
  }
  return xr = a, xr;
}
var Rr, $n;
function Ws() {
  if ($n) return Rr;
  $n = 1;
  var r = Ge(), t = Object.prototype, e = t.hasOwnProperty;
  function n(a) {
    var f = this.__data__;
    return r ? f[a] !== void 0 : e.call(f, a);
  }
  return Rr = n, Rr;
}
var Pr, zn;
function $s() {
  if (zn) return Pr;
  zn = 1;
  var r = Ge(), t = "__lodash_hash_undefined__";
  function e(n, a) {
    var f = this.__data__;
    return this.size += this.has(n) ? 0 : 1, f[n] = r && a === void 0 ? t : a, this;
  }
  return Pr = e, Pr;
}
var jr, Zn;
function zs() {
  if (Zn) return jr;
  Zn = 1;
  var r = Gs(), t = Hs(), e = Vs(), n = Ws(), a = $s();
  function f(c) {
    var o = -1, i = c == null ? 0 : c.length;
    for (this.clear(); ++o < i; ) {
      var s = c[o];
      this.set(s[0], s[1]);
    }
  }
  return f.prototype.clear = r, f.prototype.delete = t, f.prototype.get = e, f.prototype.has = n, f.prototype.set = a, jr = f, jr;
}
var Nr, Yn;
function Zs() {
  if (Yn) return Nr;
  Yn = 1;
  var r = zs(), t = De(), e = Jt();
  function n() {
    this.size = 0, this.__data__ = { hash: new r(), map: new (e || t)(), string: new r() };
  }
  return Nr = n, Nr;
}
var Or, Xn;
function Ys() {
  if (Xn) return Or;
  Xn = 1;
  function r(t) {
    var e = typeof t;
    return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
  }
  return Or = r, Or;
}
var Lr, Jn;
function He() {
  if (Jn) return Lr;
  Jn = 1;
  var r = Ys();
  function t(e, n) {
    var a = e.__data__;
    return r(n) ? a[typeof n == "string" ? "string" : "hash"] : a.map;
  }
  return Lr = t, Lr;
}
var kr, Qn;
function Xs() {
  if (Qn) return kr;
  Qn = 1;
  var r = He();
  function t(e) {
    var n = r(this, e).delete(e);
    return this.size -= n ? 1 : 0, n;
  }
  return kr = t, kr;
}
var Mr, ea;
function Js() {
  if (ea) return Mr;
  ea = 1;
  var r = He();
  function t(e) {
    return r(this, e).get(e);
  }
  return Mr = t, Mr;
}
var Kr, ra;
function Qs() {
  if (ra) return Kr;
  ra = 1;
  var r = He();
  function t(e) {
    return r(this, e).has(e);
  }
  return Kr = t, Kr;
}
var Fr, ta;
function eo() {
  if (ta) return Fr;
  ta = 1;
  var r = He();
  function t(e, n) {
    var a = r(this, e), f = a.size;
    return a.set(e, n), this.size += a.size == f ? 0 : 1, this;
  }
  return Fr = t, Fr;
}
var Br, na;
function ro() {
  if (na) return Br;
  na = 1;
  var r = Zs(), t = Xs(), e = Js(), n = Qs(), a = eo();
  function f(c) {
    var o = -1, i = c == null ? 0 : c.length;
    for (this.clear(); ++o < i; ) {
      var s = c[o];
      this.set(s[0], s[1]);
    }
  }
  return f.prototype.clear = r, f.prototype.delete = t, f.prototype.get = e, f.prototype.has = n, f.prototype.set = a, Br = f, Br;
}
var Dr, aa;
function to() {
  if (aa) return Dr;
  aa = 1;
  var r = De(), t = Jt(), e = ro(), n = 200;
  function a(f, c) {
    var o = this.__data__;
    if (o instanceof r) {
      var i = o.__data__;
      if (!t || i.length < n - 1) return i.push([f, c]), this.size = ++o.size, this;
      o = this.__data__ = new e(i);
    }
    return o.set(f, c), this.size = o.size, this;
  }
  return Dr = a, Dr;
}
var Ur, ia;
function no() {
  if (ia) return Ur;
  ia = 1;
  var r = De(), t = Ns(), e = Os(), n = Ls(), a = ks(), f = to();
  function c(o) {
    var i = this.__data__ = new r(o);
    this.size = i.size;
  }
  return c.prototype.clear = t, c.prototype.delete = e, c.prototype.get = n, c.prototype.has = a, c.prototype.set = f, Ur = c, Ur;
}
var Gr, sa;
function ao() {
  if (sa) return Gr;
  sa = 1;
  function r(t, e) {
    for (var n = -1, a = t == null ? 0 : t.length; ++n < a && e(t[n], n, t) !== false; ) ;
    return t;
  }
  return Gr = r, Gr;
}
var Hr, oa;
function io() {
  if (oa) return Hr;
  oa = 1;
  var r = ve(), t = function() {
    try {
      var e = r(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {
    }
  }();
  return Hr = t, Hr;
}
var Vr, ca;
function Ii() {
  if (ca) return Vr;
  ca = 1;
  var r = io();
  function t(e, n, a) {
    n == "__proto__" && r ? r(e, n, { configurable: true, enumerable: true, value: a, writable: true }) : e[n] = a;
  }
  return Vr = t, Vr;
}
var Wr, ua;
function Ci() {
  if (ua) return Wr;
  ua = 1;
  var r = Ii(), t = Ai(), e = Object.prototype, n = e.hasOwnProperty;
  function a(f, c, o) {
    var i = f[c];
    (!(n.call(f, c) && t(i, o)) || o === void 0 && !(c in f)) && r(f, c, o);
  }
  return Wr = a, Wr;
}
var $r, la;
function Ve() {
  if (la) return $r;
  la = 1;
  var r = Ci(), t = Ii();
  function e(n, a, f, c) {
    var o = !f;
    f || (f = {});
    for (var i = -1, s = a.length; ++i < s; ) {
      var l = a[i], h = c ? c(f[l], n[l], l, f, n) : void 0;
      h === void 0 && (h = n[l]), o ? t(f, l, h) : r(f, l, h);
    }
    return f;
  }
  return $r = e, $r;
}
var zr, fa;
function so() {
  if (fa) return zr;
  fa = 1;
  function r(t, e) {
    for (var n = -1, a = Array(t); ++n < t; ) a[n] = e(n);
    return a;
  }
  return zr = r, zr;
}
var Zr, da;
function ke() {
  if (da) return Zr;
  da = 1;
  function r(t) {
    return t != null && typeof t == "object";
  }
  return Zr = r, Zr;
}
var Yr, ha;
function oo() {
  if (ha) return Yr;
  ha = 1;
  var r = Ue(), t = ke(), e = "[object Arguments]";
  function n(a) {
    return t(a) && r(a) == e;
  }
  return Yr = n, Yr;
}
var Xr, pa;
function co() {
  if (pa) return Xr;
  pa = 1;
  var r = oo(), t = ke(), e = Object.prototype, n = e.hasOwnProperty, a = e.propertyIsEnumerable, f = r(/* @__PURE__ */ function() {
    return arguments;
  }()) ? r : function(c) {
    return t(c) && n.call(c, "callee") && !a.call(c, "callee");
  };
  return Xr = f, Xr;
}
var Jr, ya;
function Qt() {
  if (ya) return Jr;
  ya = 1;
  var r = Array.isArray;
  return Jr = r, Jr;
}
var Pe = { exports: {} }, Qr, ga;
function uo() {
  if (ga) return Qr;
  ga = 1;
  function r() {
    return false;
  }
  return Qr = r, Qr;
}
Pe.exports;
var ma;
function xi() {
  return ma || (ma = 1, function(r, t) {
    var e = se(), n = uo(), a = t && !t.nodeType && t, f = a && true && r && !r.nodeType && r, c = f && f.exports === a, o = c ? e.Buffer : void 0, i = o ? o.isBuffer : void 0, s = i || n;
    r.exports = s;
  }(Pe, Pe.exports)), Pe.exports;
}
var et, ba;
function lo() {
  if (ba) return et;
  ba = 1;
  var r = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function e(n, a) {
    var f = typeof n;
    return a = a ?? r, !!a && (f == "number" || f != "symbol" && t.test(n)) && n > -1 && n % 1 == 0 && n < a;
  }
  return et = e, et;
}
var rt, va;
function Ri() {
  if (va) return rt;
  va = 1;
  var r = 9007199254740991;
  function t(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= r;
  }
  return rt = t, rt;
}
var tt, _a;
function fo() {
  if (_a) return tt;
  _a = 1;
  var r = Ue(), t = Ri(), e = ke(), n = "[object Arguments]", a = "[object Array]", f = "[object Boolean]", c = "[object Date]", o = "[object Error]", i = "[object Function]", s = "[object Map]", l = "[object Number]", h = "[object Object]", y = "[object RegExp]", _ = "[object Set]", A = "[object String]", g = "[object WeakMap]", m = "[object ArrayBuffer]", E = "[object DataView]", w = "[object Float32Array]", C = "[object Float64Array]", S = "[object Int8Array]", P = "[object Int16Array]", R = "[object Int32Array]", K = "[object Uint8Array]", T = "[object Uint8ClampedArray]", L = "[object Uint16Array]", W = "[object Uint32Array]", q = {};
  q[w] = q[C] = q[S] = q[P] = q[R] = q[K] = q[T] = q[L] = q[W] = true, q[n] = q[a] = q[m] = q[f] = q[E] = q[c] = q[o] = q[i] = q[s] = q[l] = q[h] = q[y] = q[_] = q[A] = q[g] = false;
  function Q(oe) {
    return e(oe) && t(oe.length) && !!q[r(oe)];
  }
  return tt = Q, tt;
}
var nt, wa;
function en() {
  if (wa) return nt;
  wa = 1;
  function r(t) {
    return function(e) {
      return t(e);
    };
  }
  return nt = r, nt;
}
var je = { exports: {} };
je.exports;
var Sa;
function rn() {
  return Sa || (Sa = 1, function(r, t) {
    var e = Ei(), n = t && !t.nodeType && t, a = n && true && r && !r.nodeType && r, f = a && a.exports === n, c = f && e.process, o = function() {
      try {
        var i = a && a.require && a.require("util").types;
        return i || c && c.binding && c.binding("util");
      } catch {
      }
    }();
    r.exports = o;
  }(je, je.exports)), je.exports;
}
var at, Aa;
function ho() {
  if (Aa) return at;
  Aa = 1;
  var r = fo(), t = en(), e = rn(), n = e && e.isTypedArray, a = n ? t(n) : r;
  return at = a, at;
}
var it, Ea;
function Pi() {
  if (Ea) return it;
  Ea = 1;
  var r = so(), t = co(), e = Qt(), n = xi(), a = lo(), f = ho(), c = Object.prototype, o = c.hasOwnProperty;
  function i(s, l) {
    var h = e(s), y = !h && t(s), _ = !h && !y && n(s), A = !h && !y && !_ && f(s), g = h || y || _ || A, m = g ? r(s.length, String) : [], E = m.length;
    for (var w in s) (l || o.call(s, w)) && !(g && (w == "length" || _ && (w == "offset" || w == "parent") || A && (w == "buffer" || w == "byteLength" || w == "byteOffset") || a(w, E))) && m.push(w);
    return m;
  }
  return it = i, it;
}
var st, Ta;
function tn() {
  if (Ta) return st;
  Ta = 1;
  var r = Object.prototype;
  function t(e) {
    var n = e && e.constructor, a = typeof n == "function" && n.prototype || r;
    return e === a;
  }
  return st = t, st;
}
var ot, qa;
function ji() {
  if (qa) return ot;
  qa = 1;
  function r(t, e) {
    return function(n) {
      return t(e(n));
    };
  }
  return ot = r, ot;
}
var ct, Ia;
function po() {
  if (Ia) return ct;
  Ia = 1;
  var r = ji(), t = r(Object.keys, Object);
  return ct = t, ct;
}
var ut, Ca;
function yo() {
  if (Ca) return ut;
  Ca = 1;
  var r = tn(), t = po(), e = Object.prototype, n = e.hasOwnProperty;
  function a(f) {
    if (!r(f)) return t(f);
    var c = [];
    for (var o in Object(f)) n.call(f, o) && o != "constructor" && c.push(o);
    return c;
  }
  return ut = a, ut;
}
var lt, xa;
function Ni() {
  if (xa) return lt;
  xa = 1;
  var r = Ti(), t = Ri();
  function e(n) {
    return n != null && t(n.length) && !r(n);
  }
  return lt = e, lt;
}
var ft, Ra;
function nn() {
  if (Ra) return ft;
  Ra = 1;
  var r = Pi(), t = yo(), e = Ni();
  function n(a) {
    return e(a) ? r(a) : t(a);
  }
  return ft = n, ft;
}
var dt, Pa;
function go() {
  if (Pa) return dt;
  Pa = 1;
  var r = Ve(), t = nn();
  function e(n, a) {
    return n && r(a, t(a), n);
  }
  return dt = e, dt;
}
var ht, ja;
function mo() {
  if (ja) return ht;
  ja = 1;
  function r(t) {
    var e = [];
    if (t != null) for (var n in Object(t)) e.push(n);
    return e;
  }
  return ht = r, ht;
}
var pt, Na;
function bo() {
  if (Na) return pt;
  Na = 1;
  var r = Le(), t = tn(), e = mo(), n = Object.prototype, a = n.hasOwnProperty;
  function f(c) {
    if (!r(c)) return e(c);
    var o = t(c), i = [];
    for (var s in c) s == "constructor" && (o || !a.call(c, s)) || i.push(s);
    return i;
  }
  return pt = f, pt;
}
var yt, Oa;
function an() {
  if (Oa) return yt;
  Oa = 1;
  var r = Pi(), t = bo(), e = Ni();
  function n(a) {
    return e(a) ? r(a, true) : t(a);
  }
  return yt = n, yt;
}
var gt, La;
function vo() {
  if (La) return gt;
  La = 1;
  var r = Ve(), t = an();
  function e(n, a) {
    return n && r(a, t(a), n);
  }
  return gt = e, gt;
}
var Ne = { exports: {} };
Ne.exports;
var ka;
function _o() {
  return ka || (ka = 1, function(r, t) {
    var e = se(), n = t && !t.nodeType && t, a = n && true && r && !r.nodeType && r, f = a && a.exports === n, c = f ? e.Buffer : void 0, o = c ? c.allocUnsafe : void 0;
    function i(s, l) {
      if (l) return s.slice();
      var h = s.length, y = o ? o(h) : new s.constructor(h);
      return s.copy(y), y;
    }
    r.exports = i;
  }(Ne, Ne.exports)), Ne.exports;
}
var mt, Ma;
function wo() {
  if (Ma) return mt;
  Ma = 1;
  function r(t, e) {
    var n = -1, a = t.length;
    for (e || (e = Array(a)); ++n < a; ) e[n] = t[n];
    return e;
  }
  return mt = r, mt;
}
var bt, Ka;
function So() {
  if (Ka) return bt;
  Ka = 1;
  function r(t, e) {
    for (var n = -1, a = t == null ? 0 : t.length, f = 0, c = []; ++n < a; ) {
      var o = t[n];
      e(o, n, t) && (c[f++] = o);
    }
    return c;
  }
  return bt = r, bt;
}
var vt, Fa;
function Oi() {
  if (Fa) return vt;
  Fa = 1;
  function r() {
    return [];
  }
  return vt = r, vt;
}
var _t, Ba;
function sn() {
  if (Ba) return _t;
  Ba = 1;
  var r = So(), t = Oi(), e = Object.prototype, n = e.propertyIsEnumerable, a = Object.getOwnPropertySymbols, f = a ? function(c) {
    return c == null ? [] : (c = Object(c), r(a(c), function(o) {
      return n.call(c, o);
    }));
  } : t;
  return _t = f, _t;
}
var wt, Da;
function Ao() {
  if (Da) return wt;
  Da = 1;
  var r = Ve(), t = sn();
  function e(n, a) {
    return r(n, t(n), a);
  }
  return wt = e, wt;
}
var St, Ua;
function Li() {
  if (Ua) return St;
  Ua = 1;
  function r(t, e) {
    for (var n = -1, a = e.length, f = t.length; ++n < a; ) t[f + n] = e[n];
    return t;
  }
  return St = r, St;
}
var At, Ga;
function ki() {
  if (Ga) return At;
  Ga = 1;
  var r = ji(), t = r(Object.getPrototypeOf, Object);
  return At = t, At;
}
var Et, Ha;
function Mi() {
  if (Ha) return Et;
  Ha = 1;
  var r = Li(), t = ki(), e = sn(), n = Oi(), a = Object.getOwnPropertySymbols, f = a ? function(c) {
    for (var o = []; c; ) r(o, e(c)), c = t(c);
    return o;
  } : n;
  return Et = f, Et;
}
var Tt, Va;
function Eo() {
  if (Va) return Tt;
  Va = 1;
  var r = Ve(), t = Mi();
  function e(n, a) {
    return r(n, t(n), a);
  }
  return Tt = e, Tt;
}
var qt, Wa;
function Ki() {
  if (Wa) return qt;
  Wa = 1;
  var r = Li(), t = Qt();
  function e(n, a, f) {
    var c = a(n);
    return t(n) ? c : r(c, f(n));
  }
  return qt = e, qt;
}
var It, $a;
function To() {
  if ($a) return It;
  $a = 1;
  var r = Ki(), t = sn(), e = nn();
  function n(a) {
    return r(a, e, t);
  }
  return It = n, It;
}
var Ct, za;
function qo() {
  if (za) return Ct;
  za = 1;
  var r = Ki(), t = Mi(), e = an();
  function n(a) {
    return r(a, e, t);
  }
  return Ct = n, Ct;
}
var xt, Za;
function Io() {
  if (Za) return xt;
  Za = 1;
  var r = ve(), t = se(), e = r(t, "DataView");
  return xt = e, xt;
}
var Rt, Ya;
function Co() {
  if (Ya) return Rt;
  Ya = 1;
  var r = ve(), t = se(), e = r(t, "Promise");
  return Rt = e, Rt;
}
var Pt, Xa;
function xo() {
  if (Xa) return Pt;
  Xa = 1;
  var r = ve(), t = se(), e = r(t, "Set");
  return Pt = e, Pt;
}
var jt, Ja;
function Ro() {
  if (Ja) return jt;
  Ja = 1;
  var r = ve(), t = se(), e = r(t, "WeakMap");
  return jt = e, jt;
}
var Nt, Qa;
function on() {
  if (Qa) return Nt;
  Qa = 1;
  var r = Io(), t = Jt(), e = Co(), n = xo(), a = Ro(), f = Ue(), c = qi(), o = "[object Map]", i = "[object Object]", s = "[object Promise]", l = "[object Set]", h = "[object WeakMap]", y = "[object DataView]", _ = c(r), A = c(t), g = c(e), m = c(n), E = c(a), w = f;
  return (r && w(new r(new ArrayBuffer(1))) != y || t && w(new t()) != o || e && w(e.resolve()) != s || n && w(new n()) != l || a && w(new a()) != h) && (w = function(C) {
    var S = f(C), P = S == i ? C.constructor : void 0, R = P ? c(P) : "";
    if (R) switch (R) {
      case _:
        return y;
      case A:
        return o;
      case g:
        return s;
      case m:
        return l;
      case E:
        return h;
    }
    return S;
  }), Nt = w, Nt;
}
var Ot, ei;
function Po() {
  if (ei) return Ot;
  ei = 1;
  var r = Object.prototype, t = r.hasOwnProperty;
  function e(n) {
    var a = n.length, f = new n.constructor(a);
    return a && typeof n[0] == "string" && t.call(n, "index") && (f.index = n.index, f.input = n.input), f;
  }
  return Ot = e, Ot;
}
var Lt, ri;
function jo() {
  if (ri) return Lt;
  ri = 1;
  var r = se(), t = r.Uint8Array;
  return Lt = t, Lt;
}
var kt, ti;
function cn() {
  if (ti) return kt;
  ti = 1;
  var r = jo();
  function t(e) {
    var n = new e.constructor(e.byteLength);
    return new r(n).set(new r(e)), n;
  }
  return kt = t, kt;
}
var Mt, ni;
function No() {
  if (ni) return Mt;
  ni = 1;
  var r = cn();
  function t(e, n) {
    var a = n ? r(e.buffer) : e.buffer;
    return new e.constructor(a, e.byteOffset, e.byteLength);
  }
  return Mt = t, Mt;
}
var Kt, ai;
function Oo() {
  if (ai) return Kt;
  ai = 1;
  var r = /\w*$/;
  function t(e) {
    var n = new e.constructor(e.source, r.exec(e));
    return n.lastIndex = e.lastIndex, n;
  }
  return Kt = t, Kt;
}
var Ft, ii;
function Lo() {
  if (ii) return Ft;
  ii = 1;
  var r = Xt(), t = r ? r.prototype : void 0, e = t ? t.valueOf : void 0;
  function n(a) {
    return e ? Object(e.call(a)) : {};
  }
  return Ft = n, Ft;
}
var Bt, si;
function ko() {
  if (si) return Bt;
  si = 1;
  var r = cn();
  function t(e, n) {
    var a = n ? r(e.buffer) : e.buffer;
    return new e.constructor(a, e.byteOffset, e.length);
  }
  return Bt = t, Bt;
}
var Dt, oi;
function Mo() {
  if (oi) return Dt;
  oi = 1;
  var r = cn(), t = No(), e = Oo(), n = Lo(), a = ko(), f = "[object Boolean]", c = "[object Date]", o = "[object Map]", i = "[object Number]", s = "[object RegExp]", l = "[object Set]", h = "[object String]", y = "[object Symbol]", _ = "[object ArrayBuffer]", A = "[object DataView]", g = "[object Float32Array]", m = "[object Float64Array]", E = "[object Int8Array]", w = "[object Int16Array]", C = "[object Int32Array]", S = "[object Uint8Array]", P = "[object Uint8ClampedArray]", R = "[object Uint16Array]", K = "[object Uint32Array]";
  function T(L, W, q) {
    var Q = L.constructor;
    switch (W) {
      case _:
        return r(L);
      case f:
      case c:
        return new Q(+L);
      case A:
        return t(L, q);
      case g:
      case m:
      case E:
      case w:
      case C:
      case S:
      case P:
      case R:
      case K:
        return a(L, q);
      case o:
        return new Q();
      case i:
      case h:
        return new Q(L);
      case s:
        return e(L);
      case l:
        return new Q();
      case y:
        return n(L);
    }
  }
  return Dt = T, Dt;
}
var Ut, ci;
function Ko() {
  if (ci) return Ut;
  ci = 1;
  var r = Le(), t = Object.create, e = /* @__PURE__ */ function() {
    function n() {
    }
    return function(a) {
      if (!r(a)) return {};
      if (t) return t(a);
      n.prototype = a;
      var f = new n();
      return n.prototype = void 0, f;
    };
  }();
  return Ut = e, Ut;
}
var Gt, ui;
function Fo() {
  if (ui) return Gt;
  ui = 1;
  var r = Ko(), t = ki(), e = tn();
  function n(a) {
    return typeof a.constructor == "function" && !e(a) ? r(t(a)) : {};
  }
  return Gt = n, Gt;
}
var Ht, li;
function Bo() {
  if (li) return Ht;
  li = 1;
  var r = on(), t = ke(), e = "[object Map]";
  function n(a) {
    return t(a) && r(a) == e;
  }
  return Ht = n, Ht;
}
var Vt, fi;
function Do() {
  if (fi) return Vt;
  fi = 1;
  var r = Bo(), t = en(), e = rn(), n = e && e.isMap, a = n ? t(n) : r;
  return Vt = a, Vt;
}
var Wt, di;
function Uo() {
  if (di) return Wt;
  di = 1;
  var r = on(), t = ke(), e = "[object Set]";
  function n(a) {
    return t(a) && r(a) == e;
  }
  return Wt = n, Wt;
}
var $t, hi;
function Go() {
  if (hi) return $t;
  hi = 1;
  var r = Uo(), t = en(), e = rn(), n = e && e.isSet, a = n ? t(n) : r;
  return $t = a, $t;
}
var zt, pi;
function Ho() {
  if (pi) return zt;
  pi = 1;
  var r = no(), t = ao(), e = Ci(), n = go(), a = vo(), f = _o(), c = wo(), o = Ao(), i = Eo(), s = To(), l = qo(), h = on(), y = Po(), _ = Mo(), A = Fo(), g = Qt(), m = xi(), E = Do(), w = Le(), C = Go(), S = nn(), P = an(), R = 1, K = 2, T = 4, L = "[object Arguments]", W = "[object Array]", q = "[object Boolean]", Q = "[object Date]", oe = "[object Error]", te = "[object Function]", U = "[object GeneratorFunction]", le = "[object Map]", ce = "[object Number]", $ = "[object Object]", Y = "[object RegExp]", Te = "[object Set]", ne = "[object String]", me = "[object Symbol]", D = "[object WeakMap]", _e = "[object ArrayBuffer]", ue = "[object DataView]", qe = "[object Float32Array]", be = "[object Float64Array]", we = "[object Int8Array]", Me = "[object Int16Array]", ee = "[object Int32Array]", G = "[object Uint8Array]", Ie = "[object Uint8ClampedArray]", Ce = "[object Uint16Array]", Se = "[object Uint32Array]", k = {};
  k[L] = k[W] = k[_e] = k[ue] = k[q] = k[Q] = k[qe] = k[be] = k[we] = k[Me] = k[ee] = k[le] = k[ce] = k[$] = k[Y] = k[Te] = k[ne] = k[me] = k[G] = k[Ie] = k[Ce] = k[Se] = true, k[oe] = k[te] = k[D] = false;
  function fe(j, de, he, We, d, p) {
    var u, v = de & R, b = de & K, I = de & T;
    if (he && (u = d ? he(j, We, d, p) : he(j)), u !== void 0) return u;
    if (!w(j)) return j;
    var F = g(j);
    if (F) {
      if (u = y(j), !v) return c(j, u);
    } else {
      var x = h(j), X = x == te || x == U;
      if (m(j)) return f(j, v);
      if (x == $ || x == L || X && !d) {
        if (u = b || X ? {} : A(j), !v) return b ? i(j, a(u, j)) : o(j, n(u, j));
      } else {
        if (!k[x]) return d ? j : {};
        u = _(j, x, v);
      }
    }
    p || (p = new r());
    var z = p.get(j);
    if (z) return z;
    p.set(j, u), C(j) ? j.forEach(function(Z) {
      u.add(fe(Z, de, he, Z, j, p));
    }) : E(j) && j.forEach(function(Z, J) {
      u.set(J, fe(Z, de, he, J, j, p));
    });
    var V = I ? b ? l : s : b ? P : S, B = F ? void 0 : V(j);
    return t(B || j, function(Z, J) {
      B && (J = Z, Z = j[J]), e(u, J, fe(Z, de, he, J, j, p));
    }), u;
  }
  return zt = fe, zt;
}
var Zt, yi;
function Vo() {
  if (yi) return Zt;
  yi = 1;
  var r = Ho(), t = 1, e = 4;
  function n(a) {
    return r(a, t | e);
  }
  return Zt = n, Zt;
}
var Yt, gi;
function Wo() {
  if (gi) return Yt;
  gi = 1;
  const r = Xi(), t = Es(), e = Is(), n = Ji().Buffer, a = Qi(), f = es().address, c = Vo(), o = { bech32: "bc", pubKeyHash: 0, scriptHash: 5, validWitnessVersions: [0, 1] }, i = { bech32: "tb", pubKeyHash: 111, scriptHash: 196, validWitnessVersions: [0, 1] }, s = { bech32: "bcrt", pubKeyHash: 111, scriptHash: 196, validWitnessVersions: [0, 1] }, l = { bech32: "sb", pubKeyHash: 63, scriptHash: 123, validWitnessVersions: [0, 1] }, h = 3600, y = 9, _ = "", A = { word_length: 4, var_onion_optin: { required: false, supported: true }, payment_secret: { required: false, supported: true } }, g = ["option_data_loss_protect", "initial_routing_sync", "option_upfront_shutdown_script", "gossip_queries", "var_onion_optin", "gossip_queries_ex", "option_static_remotekey", "payment_secret", "basic_mpp", "option_support_large_channel"], m = { m: new a(1e3, 10), u: new a(1e6, 10), n: new a(1e9, 10), p: new a(1e12, 10) }, E = new a("2100000000000000000", 10), w = new a(1e11, 10), C = new a(1e8, 10), S = new a(1e5, 10), P = new a(100, 10), R = new a(10, 10), K = { payment_hash: 1, payment_secret: 16, description: 13, payee_node_key: 19, purpose_commit_hash: 23, expire_time: 6, min_final_cltv_expiry: 24, fallback_address: 9, routing_info: 3, feature_bits: 5 }, T = {};
  for (let d = 0, p = Object.keys(K); d < p.length; d++) {
    const u = p[d], v = K[p[d]].toString();
    T[v] = u;
  }
  const L = { payment_hash: ne, payment_secret: ne, description: me, payee_node_key: ne, purpose_commit_hash: Me, expire_time: U, min_final_cltv_expiry: U, fallback_address: _e, routing_info: we, feature_bits: be }, W = { 1: (d) => $(d, true).toString("hex"), 16: (d) => $(d, true).toString("hex"), 13: (d) => $(d, true).toString("utf8"), 19: (d) => $(d, true).toString("hex"), 23: (d) => $(d, true).toString("hex"), 6: te, 24: te, 9: D, 3: ue, 5: qe }, q = "unknownTag";
  function Q(d) {
    return d.words = t.decode(d.words, Number.MAX_SAFE_INTEGER).words, d;
  }
  function oe(d) {
    return (p) => ({ tagCode: parseInt(d), words: t.encode("unknown", p, Number.MAX_SAFE_INTEGER) });
  }
  function te(d) {
    return d.reverse().reduce((p, u, v) => p + u * Math.pow(32, v), 0);
  }
  function U(d, p) {
    const u = [];
    if (p === void 0 && (p = 5), d = Math.floor(d), d === 0) return [0];
    for (; d > 0; ) u.push(d & Math.pow(2, p) - 1), d = Math.floor(d / Math.pow(2, p));
    return u.reverse();
  }
  function le(d) {
    return r("sha256").update(d).digest();
  }
  function ce(d, p, u) {
    let v = 0, b = 0;
    const I = (1 << u) - 1, F = [];
    for (let x = 0; x < d.length; ++x) for (v = v << p | d[x], b += p; b >= u; ) b -= u, F.push(v >> b & I);
    return b > 0 && F.push(v << u - b & I), F;
  }
  function $(d, p) {
    let u = n.from(ce(d, 5, 8));
    return p && d.length * 5 % 8 !== 0 && (u = u.slice(0, -1)), u;
  }
  function Y(d) {
    return d !== void 0 && (typeof d == "string" || d instanceof String) && d.match(/^([a-zA-Z0-9]{2})*$/) ? n.from(d, "hex") : d;
  }
  function Te(d) {
    return n.from(d, "utf8");
  }
  function ne(d) {
    const p = Y(d);
    return t.toWords(p);
  }
  function me(d) {
    const p = Te(d);
    return t.toWords(p);
  }
  function D(d, p) {
    const u = d[0];
    d = d.slice(1);
    const v = $(d, true);
    let b = null;
    switch (u) {
      case 17:
        b = f.toBase58Check(v, p.pubKeyHash);
        break;
      case 18:
        b = f.toBase58Check(v, p.scriptHash);
        break;
      case 0:
      case 1:
        b = f.toBech32(v, u, p.bech32);
        break;
    }
    return { code: u, address: b, addressHash: v.toString("hex") };
  }
  function _e(d, p) {
    return [d.code].concat(ne(d.addressHash));
  }
  function ue(d) {
    const p = [];
    let u, v, b, I, F, x = $(d, true);
    for (; x.length > 0; ) u = x.slice(0, 33).toString("hex"), v = x.slice(33, 41).toString("hex"), b = parseInt(x.slice(41, 45).toString("hex"), 16), I = parseInt(x.slice(45, 49).toString("hex"), 16), F = parseInt(x.slice(49, 51).toString("hex"), 16), x = x.slice(51), p.push({ pubkey: u, short_channel_id: v, fee_base_msat: b, fee_proportional_millionths: I, cltv_expiry_delta: F });
    return p;
  }
  function qe(d) {
    const p = d.slice().reverse().map((v) => [!!(v & 1), !!(v & 2), !!(v & 4), !!(v & 8), !!(v & 16)]).reduce((v, b) => v.concat(b), []);
    for (; p.length < g.length * 2; ) p.push(false);
    const u = { word_length: d.length };
    if (g.forEach((v, b) => {
      u[v] = { required: p[b * 2], supported: p[b * 2 + 1] };
    }), p.length > g.length * 2) {
      const v = p.slice(g.length * 2);
      u.extra_bits = { start_bit: g.length * 2, bits: v, has_required: v.reduce((b, I, F) => F % 2 !== 0 ? b || false : b || I, false) };
    } else u.extra_bits = { start_bit: g.length * 2, bits: [], has_required: false };
    return u;
  }
  function be(d) {
    let p = d.word_length, u = [];
    for (g.forEach((v) => {
      u.push(!!(d[v] || {}).required), u.push(!!(d[v] || {}).supported);
    }); u[u.length - 1] === false; ) u.pop();
    for (; u.length % 5 !== 0; ) u.push(false);
    if (d.extra_bits && Array.isArray(d.extra_bits.bits) && d.extra_bits.bits.length > 0) {
      for (; u.length < d.extra_bits.start_bit; ) u.push(false);
      u = u.concat(d.extra_bits.bits);
    }
    if (p !== void 0 && u.length / 5 > p) throw new Error("word_length is too small to contain all featureBits");
    return p === void 0 && (p = Math.ceil(u.length / 5)), new Array(p).fill(0).map((v, b) => u[b * 5 + 4] << 4 | u[b * 5 + 3] << 3 | u[b * 5 + 2] << 2 | u[b * 5 + 1] << 1 | u[b * 5] << 0).reverse();
  }
  function we(d) {
    let p = n.from([]);
    return d.forEach((u) => {
      p = n.concat([p, Y(u.pubkey)]), p = n.concat([p, Y(u.short_channel_id)]), p = n.concat([p, n.from([0, 0, 0].concat(U(u.fee_base_msat, 8)).slice(-4))]), p = n.concat([p, n.from([0, 0, 0].concat(U(u.fee_proportional_millionths, 8)).slice(-4))]), p = n.concat([p, n.from([0].concat(U(u.cltv_expiry_delta, 8)).slice(-2))]);
    }), ne(p);
  }
  function Me(d) {
    let p;
    if (d !== void 0 && (typeof d == "string" || d instanceof String)) d.match(/^([a-zA-Z0-9]{2})*$/) ? p = n.from(d, "hex") : p = le(n.from(d, "utf8"));
    else throw new Error("purpose or purpose commit must be a string or hex string");
    return t.toWords(p);
  }
  function ee(d, p) {
    const u = d.filter((b) => b.tagName === p);
    return u.length > 0 ? u[0].data : null;
  }
  function G(d, p) {
    return ee(d, p) !== null;
  }
  function Ie(d, p) {
    const u = {};
    if (Object.keys(d).sort().forEach((v) => {
      u[v] = d[v];
    }), p === true) {
      const v = "__tagsObject_cache";
      Object.defineProperty(u, "tagsObject", { get() {
        return this[v] || Object.defineProperty(this, v, { value: We(this.tags) }), this[v];
      } });
    }
    return u;
  }
  function Ce(d) {
    if (!d.toString().match(/^\d+$/)) throw new Error("satoshis must be an integer");
    const p = new a(d, 10);
    return Se(p.mul(new a(1e3, 10)));
  }
  function Se(d) {
    if (!d.toString().match(/^\d+$/)) throw new Error("millisatoshis must be an integer");
    const p = new a(d, 10), u = p.toString(10), v = u.length;
    let b, I;
    return v > 11 && /0{11}$/.test(u) ? (b = "", I = p.div(w).toString(10)) : v > 8 && /0{8}$/.test(u) ? (b = "m", I = p.div(C).toString(10)) : v > 5 && /0{5}$/.test(u) ? (b = "u", I = p.div(S).toString(10)) : v > 2 && /0{2}$/.test(u) ? (b = "n", I = p.div(P).toString(10)) : (b = "p", I = p.mul(R).toString(10)), I + b;
  }
  function k(d, p) {
    const u = fe(d, false);
    if (!u.mod(new a(1e3, 10)).eq(new a(0, 10))) throw new Error("Amount is outside of valid range");
    const v = u.div(new a(1e3, 10));
    return p ? v.toString() : v;
  }
  function fe(d, p) {
    let u, v;
    if (d.slice(-1).match(/^[munp]$/)) u = d.slice(-1), v = d.slice(0, -1);
    else {
      if (d.slice(-1).match(/^[^munp0-9]$/)) throw new Error("Not a valid multiplier for the amount");
      v = d;
    }
    if (!v.match(/^\d+$/)) throw new Error("Not a valid human readable amount");
    const b = new a(v, 10), I = u ? b.mul(w).div(m[u]) : b.mul(w);
    if (u === "p" && !b.mod(new a(10, 10)).eq(new a(0, 10)) || I.gt(E)) throw new Error("Amount is outside of valid range");
    return p ? I.toString() : I;
  }
  function j(d, p) {
    const u = c(d), v = Y(p);
    if (u.complete && u.paymentRequest) return u;
    if (v === void 0 || v.length !== 32 || !e.privateKeyVerify(v)) throw new Error("privateKey must be a 32 byte Buffer and valid private key");
    let b, I;
    if (G(u.tags, T[19]) && (I = Y(ee(u.tags, T[19]))), u.payeeNodeKey && (b = Y(u.payeeNodeKey)), b && I && !I.equals(b)) throw new Error("payee node key tag and payeeNodeKey attribute must match");
    b = I || b;
    const F = n.from(e.publicKeyCreate(v));
    if (b && !F.equals(b)) throw new Error("The private key given is not the private key of the node public key given");
    const x = t.decode(u.wordsTemp, Number.MAX_SAFE_INTEGER).words, X = n.concat([n.from(u.prefix, "utf8"), $(x)]), z = le(X), V = e.ecdsaSign(z, v);
    V.signature = n.from(V.signature);
    const B = ne(V.signature.toString("hex") + "0" + V.recid);
    return u.payeeNodeKey = F.toString("hex"), u.signature = V.signature.toString("hex"), u.recoveryFlag = V.recid, u.wordsTemp = t.encode("temp", x.concat(B), Number.MAX_SAFE_INTEGER), u.complete = true, u.paymentRequest = t.encode(u.prefix, x.concat(B), Number.MAX_SAFE_INTEGER), Ie(u);
  }
  function de(d, p) {
    const u = c(d);
    p === void 0 && (p = true);
    const v = !(u.signature === void 0 || u.recoveryFlag === void 0);
    let b;
    if (u.network === void 0 && !v) u.network = o, b = o;
    else {
      if (u.network === void 0 && v) throw new Error("Need network for proper payment request reconstruction");
      if (!u.network.bech32 || u.network.pubKeyHash === void 0 || u.network.scriptHash === void 0 || !Array.isArray(u.network.validWitnessVersions)) throw new Error("Invalid network");
      b = u.network;
    }
    if (u.timestamp === void 0 && !v) u.timestamp = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
    else if (u.timestamp === void 0 && v) throw new Error("Need timestamp for proper payment request reconstruction");
    if (u.tags === void 0) throw new Error("Payment Requests need tags array");
    if (!G(u.tags, T[1])) throw new Error("Lightning Payment Request needs a payment hash");
    if (G(u.tags, T[16])) if (G(u.tags, T[5])) {
      const M = ee(u.tags, T[5]);
      if (!M.payment_secret || !M.payment_secret.supported && !M.payment_secret.required) throw new Error("Payment request requires feature bits with at least payment secret support flagged if payment secret is included");
    } else if (p) u.tags.push({ tagName: T[5], data: A });
    else throw new Error("Payment request requires feature bits with at least payment secret support flagged if payment secret is included");
    if (!G(u.tags, T[13]) && !G(u.tags, T[23])) if (p) u.tags.push({ tagName: T[13], data: _ });
    else throw new Error("Payment request requires description or purpose commit hash");
    if (G(u.tags, T[13]) && n.from(ee(u.tags, T[13]), "utf8").length > 639) throw new Error("Description is too long: Max length 639 bytes");
    !G(u.tags, T[6]) && !v && p && u.tags.push({ tagName: T[6], data: h }), !G(u.tags, T[24]) && !v && p && u.tags.push({ tagName: T[24], data: y });
    let I, F;
    if (G(u.tags, T[19]) && (F = Y(ee(u.tags, T[19]))), u.payeeNodeKey && (I = Y(u.payeeNodeKey)), I && F && !F.equals(I)) throw new Error("payeeNodeKey and tag payee node key do not match");
    I = I || F, I && (u.payeeNodeKey = I.toString("hex"));
    let x, X, z;
    if (G(u.tags, T[9])) {
      const M = ee(u.tags, T[9]);
      if (z = M.address, X = M.addressHash, x = M.code, X === void 0 || x === void 0) {
        let N, H;
        try {
          N = f.fromBech32(z), X = N.data, x = N.version;
        } catch {
          try {
            H = f.fromBase58Check(z), H.version === b.pubKeyHash ? x = 17 : H.version === b.scriptHash && (x = 18), X = H.hash;
          } catch {
            throw new Error("Fallback address type is unknown");
          }
        }
        if (N && !(N.version in b.validWitnessVersions)) throw new Error("Fallback address witness version is unknown");
        if (N && N.prefix !== b.bech32) throw new Error("Fallback address network type does not match payment request network type");
        if (H && H.version !== b.pubKeyHash && H.version !== b.scriptHash) throw new Error("Fallback address version (base58) is unknown or the network type is incorrect");
        M.addressHash = X.toString("hex"), M.code = x;
      }
    }
    G(u.tags, T[3]) && ee(u.tags, T[3]).forEach((N) => {
      if (N.pubkey === void 0 || N.short_channel_id === void 0 || N.fee_base_msat === void 0 || N.fee_proportional_millionths === void 0 || N.cltv_expiry_delta === void 0) throw new Error("Routing info is incomplete");
      if (!e.publicKeyVerify(Y(N.pubkey))) throw new Error("Routing info pubkey is not a valid pubkey");
      const H = Y(N.short_channel_id);
      if (!(H instanceof n) || H.length !== 8) throw new Error("Routing info short channel id must be 8 bytes");
      if (typeof N.fee_base_msat != "number" || Math.floor(N.fee_base_msat) !== N.fee_base_msat) throw new Error("Routing info fee base msat is not an integer");
      if (typeof N.fee_proportional_millionths != "number" || Math.floor(N.fee_proportional_millionths) !== N.fee_proportional_millionths) throw new Error("Routing info fee proportional millionths is not an integer");
      if (typeof N.cltv_expiry_delta != "number" || Math.floor(N.cltv_expiry_delta) !== N.cltv_expiry_delta) throw new Error("Routing info cltv expiry delta is not an integer");
    });
    let V = "ln";
    V += b.bech32;
    let B;
    if (u.millisatoshis && u.satoshis) {
      if (B = Se(new a(u.millisatoshis, 10)), Ce(new a(u.satoshis, 10)) !== B) throw new Error("satoshis and millisatoshis do not match");
    } else u.millisatoshis ? B = Se(new a(u.millisatoshis, 10)) : u.satoshis ? B = Ce(new a(u.satoshis, 10)) : B = "";
    V += B;
    const Z = U(u.timestamp);
    for (; Z.length < 7; ) Z.unshift(0);
    const J = u.tags;
    let ae = [];
    J.forEach((M) => {
      const N = Object.keys(L);
      if (v && N.push(q), N.indexOf(M.tagName) === -1) throw new Error("Unknown tag key: " + M.tagName);
      let H;
      if (M.tagName !== q) {
        ae.push(K[M.tagName]);
        const ye = L[M.tagName];
        H = ye(M.data);
      } else {
        const ye = Q(M.data);
        ae.push(ye.tagCode), H = ye.words;
      }
      ae = ae.concat([0].concat(U(H.length)).slice(-2)), ae = ae.concat(H);
    });
    let pe = Z.concat(ae);
    const xe = n.concat([n.from(V, "utf8"), n.from(ce(pe, 5, 8))]), $e = le(xe);
    let ie;
    if (v) if (I) {
      const M = n.from(e.ecdsaRecover(n.from(u.signature, "hex"), u.recoveryFlag, $e, true));
      if (I && !I.equals(M)) throw new Error("Signature, message, and recoveryID did not produce the same pubkey as payeeNodeKey");
      ie = ne(u.signature + "0" + u.recoveryFlag);
    } else throw new Error("Reconstruction with signature and recoveryID requires payeeNodeKey to verify correctness of input data.");
    return ie && (pe = pe.concat(ie)), G(u.tags, T[6]) && (u.timeExpireDate = u.timestamp + ee(u.tags, T[6]), u.timeExpireDateString = new Date(u.timeExpireDate * 1e3).toISOString()), u.timestampString = new Date(u.timestamp * 1e3).toISOString(), u.complete = !!ie, u.paymentRequest = u.complete ? t.encode(V, pe, Number.MAX_SAFE_INTEGER) : "", u.prefix = V, u.wordsTemp = t.encode("temp", pe, Number.MAX_SAFE_INTEGER), Ie(u);
  }
  function he(d, p) {
    if (typeof d != "string") throw new Error("Lightning Payment Request must be string");
    if (d.slice(0, 2).toLowerCase() !== "ln") throw new Error("Not a proper lightning payment request");
    const u = t.decode(d, Number.MAX_SAFE_INTEGER);
    d = d.toLowerCase();
    const v = u.prefix;
    let b = u.words;
    const I = b.slice(-104), F = b.slice(0, -104);
    b = b.slice(0, -104);
    let x = $(I, true);
    const X = x.slice(-1)[0];
    if (x = x.slice(0, -1), !(X in [0, 1, 2, 3]) || x.length !== 64) throw new Error("Signature is missing or incorrect");
    let z = v.match(/^ln(\S+?)(\d*)([a-zA-Z]?)$/);
    if (z && !z[2] && (z = v.match(/^ln(\S+)$/)), !z) throw new Error("Not a proper lightning payment request");
    const V = z[1];
    let B;
    if (p) {
      if (p.bech32 === void 0 || p.pubKeyHash === void 0 || p.scriptHash === void 0 || !Array.isArray(p.validWitnessVersions)) throw new Error("Invalid network");
      B = p;
    } else switch (V) {
      case o.bech32:
        B = o;
        break;
      case i.bech32:
        B = i;
        break;
      case s.bech32:
        B = s;
        break;
      case l.bech32:
        B = l;
        break;
    }
    if (!B || B.bech32 !== V) throw new Error("Unknown coin bech32 prefix");
    const Z = z[2];
    let J, ae, pe;
    if (Z) {
      const Ae = z[3];
      try {
        J = parseInt(k(Z + Ae, true));
      } catch {
        J = null, pe = true;
      }
      ae = fe(Z + Ae, true);
    } else J = null, ae = null;
    const xe = te(b.slice(0, 7)), $e = new Date(xe * 1e3).toISOString();
    b = b.slice(7);
    const ie = [];
    let M, N, H, ye;
    for (; b.length > 0; ) {
      const Ae = b[0].toString();
      M = T[Ae] || q, N = W[Ae] || oe(Ae), b = b.slice(1), H = te(b.slice(0, 2)), b = b.slice(2), ye = b.slice(0, H), b = b.slice(H), ie.push({ tagName: M, data: N(ye, B) });
    }
    let Re, un;
    G(ie, T[6]) && (Re = xe + ee(ie, T[6]), un = new Date(Re * 1e3).toISOString());
    const Fi = n.concat([n.from(v, "utf8"), n.from(ce(F, 5, 8))]), Bi = le(Fi), ln = n.from(e.ecdsaRecover(x, X, Bi, true));
    if (G(ie, T[19]) && ee(ie, T[19]) !== ln.toString("hex")) throw new Error("Lightning Payment Request signature pubkey does not match payee pubkey");
    let Ke = { paymentRequest: d, complete: true, prefix: v, wordsTemp: t.encode("temp", F.concat(I), Number.MAX_SAFE_INTEGER), network: B, satoshis: J, millisatoshis: ae, timestamp: xe, timestampString: $e, payeeNodeKey: ln.toString("hex"), signature: x.toString("hex"), recoveryFlag: X, tags: ie };
    return pe && delete Ke.satoshis, Re && (Ke = Object.assign(Ke, { timeExpireDate: Re, timeExpireDateString: un })), Ie(Ke, true);
  }
  function We(d) {
    const p = {};
    return d.forEach((u) => {
      u.tagName === q ? (p.unknownTags || (p.unknownTags = []), p.unknownTags.push(u.data)) : p[u.tagName] = u.data;
    }), p;
  }
  return Yt = { encode: de, decode: he, sign: j, satToHrp: Ce, millisatToHrp: Se, hrpToSat: k, hrpToMillisat: fe }, Yt;
}
var $o = Wo();
const zo = rs($o), Zo = { "L-BTC": "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d" }, Yo = ts(as), Xo = "https://api.boltz.exchange", Jo = "0846c900051c0000", Qo = Zo["L-BTC"], ec = (r) => {
  const t = zo.decode(r), e = t.tags.find((a) => a.tagName === "routing_info");
  if (e === void 0) return { decodedInvoice: t };
  const n = e.data.find((a) => a.short_channel_id === Jo);
  return n === void 0 ? { decodedInvoice: t } : { magicRoutingHint: n, decodedInvoice: t };
}, rc = async (r) => {
  try {
    const { magicRoutingHint: t, decodedInvoice: e } = ec(r);
    if (t === void 0) return;
    const n = await (await fetch(`${Xo}/v2/swap/reverse/${r}/bip21`)).json(), a = Yo.fromPublicKey(ze.from(t.pubkey, "hex")), f = ze.from(n.signature, "hex"), c = new URL(n.bip21), o = c.pathname, i = ns.crypto.sha256(ze.from(o, "utf-8"));
    if (!a.verifySchnorr(i, f)) throw "invalid address signature";
    if (c.searchParams.get("assetid") !== Qo) throw "invalid BIP-21 asset";
    if (Number(c.searchParams.get("amount")) * 10 ** 8 > Number(e.satoshis)) throw "invalid BIP-21 amount";
    return n.bip21;
  } catch {
    return false;
  }
};
async function tc(r, t) {
  var _a2, _b;
  const { masterInfoObject: e, comingFromAccept: n, enteredPaymentInfo: a, paymentInfo: f, fiatStats: c } = t;
  let o = JSON.parse(JSON.stringify(r == null ? void 0 : r.address));
  n && (o.amount = a.amount, o.label = a.description || ((_a2 = r == null ? void 0 : r.address) == null ? void 0 : _a2.label) || "", o.message = a.description || ((_b = r == null ? void 0 : r.address) == null ? void 0 : _b.message) || "", o.isBip21 = true);
  const i = n ? a.amount * 1e3 : o.amount * 1e3, s = !!i && Number(i / 1e3) / (Ee / ((c == null ? void 0 : c.value) || 65e3));
  if ((!f.paymentFee || (f == null ? void 0 : f.supportFee)) && i) {
    const l = await Oe({ getFee: true, address: o.address, paymentType: "spark", amountSats: i / 1e3, masterInfoObject: e });
    if (!l.didWork) throw new Error(l.error);
    o.paymentFee = l.fee, o.supportFee = l.supportFee;
  }
  return { data: o, type: "spark", paymentNetwork: "spark", paymentFee: o.paymentFee, supportFee: o.supportFee, sendAmount: i ? `${e.userBalanceDenomination != "fiat" ? `${Math.round(i / 1e3)}` : s < 0.01 ? "" : `${s.toFixed(2)}`}` : "", canEditPayment: n ? false : !i };
}
async function mi(r) {
  let { btcAdress: t, goBackFunction: e, setPaymentInfo: n, liquidNodeInformation: a, masterInfoObject: f, navigate: c, maxZeroConf: o, comingFromAccept: i, enteredPaymentInfo: s, setLoadingMessage: l, paymentInfo: h, parsedInvoice: y, fiatStats: _, fromPage: A, publishMessageFunc: g } = r;
  try {
    const m = is();
    if (t.includes("cryptoqr.net")) try {
      const [S, P] = t.split("@"), K = await (await fetch(`https://${P}/.well-known/lnurlp/${S}`)).json();
      if (K.status === "ERROR") {
        e("Not able to get merchant payment information from invoice");
        return;
      }
      const T = await wi({ data: K, type: "lnurlpay" }, K.minSendable / 1e3);
      if (!T) throw new Error("Not able to parse invoice");
      if ((await m.parseInvoice(T)).amountMsat / 1e3 >= o) {
        e(`Cannot send more than ${Si({ amount: o, masterInfoObject: f, fiatStats: _ })} to a merchant`);
        return;
      }
      t = T;
    } catch {
      e("There was a problem getting the invoice for this address");
      return;
    }
    if (t.toLowerCase().startsWith("spark:") || t.toLowerCase().startsWith("sp1p")) if (t.toLowerCase().startsWith("spark:")) {
      const S = ss(t);
      y = { type: "Spark", address: { adress: S.address, message: S.options.message, label: S.options.label, network: "Spark", amount: S.options.amount * Ee } };
    } else y = { type: "Spark", address: { address: t, message: null, label: null, network: "Spark", amount: null } };
    const E = y ? Promise.resolve(y) : m.parse(t);
    let w;
    try {
      w = await E;
    } catch {
      return e("Unable to parse address");
    }
    if (w.type.toLowerCase() === ge.Bolt11.toLowerCase()) try {
      const S = await rc(w.invoice.bolt11);
      S && (w = await m.parse(S));
    } catch {
      e("Failed to resolve embedded liquid address");
      return;
    }
    let C;
    try {
      C = await nc(w, { fiatStats: _, liquidNodeInformation: a, masterInfoObject: f, navigate: c, goBackFunction: e, maxZeroConf: o, comingFromAccept: i, enteredPaymentInfo: s, setPaymentInfo: n, setLoadingMessage: l, paymentInfo: h, fromPage: A, publishMessageFunc: g });
    } catch (S) {
      return e(S.message || "Error processing payment info");
    }
    if (C) n({ ...C, decodedInput: w });
    else return e("Unable to process input");
  } catch (m) {
    e(m.message);
    return;
  }
}
async function nc(r, t) {
  const { navigate: e, goBackFunction: n, setLoadingMessage: a } = t;
  switch (a("Getting invoice details"), r.type.toLowerCase()) {
    case ge.BitcoinAddress.toLowerCase():
      return await _s(r, t);
    case ge.Bolt11.toLowerCase():
      return ws(r, t);
    case ge.LnUrlAuth.toLowerCase():
      return await Ss(r, t);
    case ge.LnUrlPay.toLowerCase():
      return As(r, t);
    case "spark":
      return await tc(r, t);
    default:
      throw new Error(`Unsupported address type: ${r.type.toLowerCase()}`);
  }
}
function ac({ setPaymentInfo: r, paymentInfo: t, fiatStats: e }) {
  const { masterInfoObject: n } = _i(), [a, f] = re.useState(t == null ? void 0 : t.sendAmount);
  return re.useEffect(() => {
    r((c) => ({ ...c, sendAmount: a }));
  }, [a]), re.useEffect(() => {
    (t == null ? void 0 : t.sendAmount) !== a && f(t.sendAmount);
  }, [t == null ? void 0 : t.sendAmount]), O.jsx(gs, { showDot: n.userBalanceDenomination === "fiat", keyboardContianerClassName: "custon-keyboard-styles", setAmountValue: f, amount: a });
}
function uc() {
  var _a2;
  const r = os(), t = r.state || {}, { btcAddress: e, fromPage: n, publishMessageFunc: a, comingFromAccept: f, enteredPaymentInfo: c, errorMessage: o } = t, [i, s] = re.useState({}), { masterInfoObject: l, toggleMasterInfoObject: h } = _i(), { liquidNodeInformation: y, fiatStats: _ } = cs(), { minMaxLiquidSwapAmounts: A } = us(), [g, m] = re.useState(false), [E, w] = re.useState(""), [C, S] = re.useState(false), [P, R] = re.useState(o), [K, T] = re.useState("Getting invoice information"), L = bi(), { sparkInformation: W } = ls(), q = W.balance, Q = (i == null ? void 0 : i.sendAmount) || 0, oe = l.userBalanceDenomination === "hidden" || l.userBalanceDenomination === "sats", te = i == null ? void 0 : i.canEditPayment, U = oe ? Math.round(Number(Q)) : Math.round(Ee / ((_ == null ? void 0 : _.value) || 65e3) * Number(Q)) || 0;
  i == null ? void 0 : i.paymentNetwork;
  const le = (i == null ? void 0 : i.paymentNetwork) === "liquid";
  i == null ? void 0 : i.paymentNetwork, i == null ? void 0 : i.paymentNetwork;
  const ce = ((i == null ? void 0 : i.paymentFee) || 0) + ((i == null ? void 0 : i.supportFee) || 0), $ = Number(q) >= Number(U) + ce && U != 0;
  (i == null ? void 0 : i.paymentNetwork) === "lightning" && i.type === "bolt11" && ((_a2 = i == null ? void 0 : i.data) == null ? void 0 : _a2.invoice.amountMsat), re.useEffect(() => {
    async function D() {
      var _a3, _b;
      if (bs({ scannedAddress: e, sparkInformation: W })) {
        me("You have already paid this invoice");
        return;
      }
      await mi({ fiatStats: _, btcAdress: e, goBackFunction: me, setPaymentInfo: s, liquidNodeInformation: y, masterInfoObject: l, navigate: L, maxZeroConf: (_b = (_a3 = A == null ? void 0 : A.submarineSwapStats) == null ? void 0 : _a3.limits) == null ? void 0 : _b.maximalZeroConf, comingFromAccept: f, enteredPaymentInfo: c, setLoadingMessage: T, paymentInfo: i, fromPage: n, publishMessageFunc: a });
    }
    setTimeout(D, 1e3);
  }, []);
  const Y = async () => {
    var _a3, _b, _c, _d, _e;
    if ($ && !g) {
      m(true);
      try {
        let D = { address: "", paymentType: "" };
        i.type.toLowerCase() === ge.Bolt11.toLowerCase() ? (D.address = (_c = (_b = (_a3 = i == null ? void 0 : i.decodedInput) == null ? void 0 : _a3.invoice) == null ? void 0 : _b.bolt11) == null ? void 0 : _c.toLowerCase(), D.paymentType = "lightning") : i.type.toLowerCase() === "spark" ? (D.address = (_d = i == null ? void 0 : i.data) == null ? void 0 : _d.address.toLowerCase(), D.paymentType = "spark") : i.type.toLowerCase() === ge.LnUrlPay.toLowerCase() || i.type.toLowerCase() === "liquid" ? (D.address = (_e = i == null ? void 0 : i.data) == null ? void 0 : _e.invoice.toLowerCase(), D.paymentType = "lightning") : (i == null ? void 0 : i.type.toLowerCase()) === "bitcoin" && (D.address = i == null ? void 0 : i.address.toLowerCase(), D.paymentType = "bitcoin");
        const _e2 = { getFee: false, ...D, amountSats: (i == null ? void 0 : i.type) === "Bitcoin" ? U + ce : U, masterInfoObject: l, fee: ce, memo: E || (i == null ? void 0 : i.data.message) || "", userBalance: q, sparkInformation: W }, ue = await Oe(_e2);
        if (i.type === "liquid" && ue.didWork) {
          async function qe() {
            let be = false, we = 0;
            for (; !be && we < 10; ) we += 1, (await (await fetch(ps(void 0) + `/v2/swap/${i.boltzData.id}`)).json()).status === "invoice.settled" ? (be = true, L("/confirm-page", { state: { for: "paymentsucceed", transaction: ue.response }, replace: true })) : await new Promise((G) => setTimeout(G, 5e3));
            be || L("/confirm-page", { state: { for: "paymentFailed", transaction: { ...ue.response, details: { ...ue.response.details, error: "Unable to settle swap" } } }, replace: true });
          }
          qe();
          return;
        }
        L("/confirm-page", { state: { for: "paymentsucceed", transaction: ue.response }, replace: true });
      } catch {
      }
    }
  }, Te = async () => {
    var _a3, _b;
    try {
      if (Number(q) <= i.sendAmount) {
        L("/error", { state: { errorMessage: "Sending amount is greater than wallet balance.", background: r } });
        return;
      }
      if (le && i.sendAmount < A.min) {
        L("/error", { state: { errorMessage: `Liquid payment must be greater than ${Si({ amount: A.min, masterInfoObject: l, fiatStats: _ })}`, background: r } });
        return;
      }
      if (!$) return;
      S(true), await mi({ fiatStats: _, btcAdress: e, goBackFunction: me, setPaymentInfo: s, liquidNodeInformation: y, masterInfoObject: l, navigate: L, maxZeroConf: (_b = (_a3 = A == null ? void 0 : A.submarineSwapStats) == null ? void 0 : _a3.limits) == null ? void 0 : _b.maximalZeroConf, comingFromAccept: true, enteredPaymentInfo: { amount: U, description: E }, setLoadingMessage: T, paymentInfo: i, parsedInvoice: i.decodedInput, fromPage: n, publishMessageFunc: a });
    } catch {
      L("/error", { state: { errorMessage: "Error decoding payment.", navigateBack: "wallet", background: r } });
    } finally {
      S(false);
    }
  };
  if (!Object.keys(i).length && !P) return O.jsx(fs, { loadingColor: ds.light.blue, text: K });
  if (P) return O.jsx(vs, { reason: P });
  const ne = (i.paymentFee || 0) + (i.supportFee || 0);
  return O.jsxs("div", { className: "sendContainer", children: [O.jsx(ic, { sparkInformation: W }), O.jsxs("div", { className: "paymentInfoContainer", children: [O.jsxs("div", { className: "balanceContainer", children: [O.jsx("div", { className: "scroll-content", children: O.jsx(Fe, { containerStyles: { opacity: U ? 1 : 0.5 }, styles: { fontSize: "2.75rem", margin: 0 }, neverHideBalance: true, balance: U || 0 }) }), O.jsx(Fe, { containerStyles: { opacity: U ? 1 : 0.5 }, styles: { fontSize: "1.2rem", margin: 0 }, globalBalanceDenomination: l.userBalanceDenomination === "sats" ? "fiat" : "sats", neverHideBalance: true, balance: U })] }), !te && O.jsxs(O.Fragment, { children: [O.jsx("p", { className: "paymentFeeDesc", children: "Fee & speed" }), O.jsx(Fe, { styles: { marginTop: 0 }, balance: ne, backText: "and Instant" })] }), te && O.jsxs(O.Fragment, { children: [O.jsx(hs, { onchange: w, placeholder: "Description...", value: E, containerClassName: "customTextInputContinaerStyles" }), O.jsx(ac, { setPaymentInfo: s, paymentInfo: i, fiatStats: _ })] }), O.jsx(vi, { buttonStyles: { marginTop: te ? 0 : "auto", opacity: g || $ ? 1 : 0.5 }, actionFunction: () => {
    te ? Te() : Y();
  }, textContent: i.canEdit ? C ? "Loading..." : "Save" : g ? "Sending..." : "Send Payment", useLoading: g || C })] })] });
  function me(D) {
    R(D), s({});
  }
}
function ic({ sparkInformation: r }) {
  return O.jsxs("div", { className: "navBar", children: [O.jsx(ys, {}), O.jsxs("div", { className: "label", children: [O.jsx("img", { src: ms, alt: "wallet icon to show user balance" }), O.jsx(Fe, { balance: r.balance })] })] });
}
export {
  uc as default
};
