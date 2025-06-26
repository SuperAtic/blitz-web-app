import { E as vt, z as Tt, D as gt } from "./index-CukSm0R7.js";
function RS(t, e) {
  for (var n = 0; n < e.length; n++) {
    const _ = e[n];
    if (typeof _ != "string" && !Array.isArray(_)) {
      for (const T in _) if (T !== "default" && !(T in t)) {
        const S = Object.getOwnPropertyDescriptor(_, T);
        S && Object.defineProperty(t, T, S.get ? S : { enumerable: true, get: () => _[T] });
      }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
var $ = {}, Y = {}, NS = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof globalThis == "object" ? globalThis : {}, l = "1.9.0", Pt = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function MS(t) {
  var e = /* @__PURE__ */ new Set([t]), n = /* @__PURE__ */ new Set(), _ = t.match(Pt);
  if (!_) return function() {
    return false;
  };
  var T = { major: +_[1], minor: +_[2], patch: +_[3], prerelease: _[4] };
  if (T.prerelease != null) return function(N) {
    return N === t;
  };
  function S(R) {
    return n.add(R), false;
  }
  function A(R) {
    return e.add(R), true;
  }
  return function(N) {
    if (e.has(N)) return true;
    if (n.has(N)) return false;
    var P = N.match(Pt);
    if (!P) return S(N);
    var M = { major: +P[1], minor: +P[2], patch: +P[3], prerelease: P[4] };
    return M.prerelease != null || T.major !== M.major ? S(N) : T.major === 0 ? T.minor === M.minor && T.patch <= M.patch ? A(N) : S(N) : T.minor <= M.minor ? A(N) : S(N);
  };
}
var OS = MS(l), PS = l.split(".")[0], m = Symbol.for("opentelemetry.js.api." + PS), G = NS;
function B(t, e, n, _) {
  var T;
  _ === void 0 && (_ = false);
  var S = G[m] = (T = G[m]) !== null && T !== void 0 ? T : { version: l };
  if (!_ && S[t]) {
    var A = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + t);
    return n.error(A.stack || A.message), false;
  }
  if (S.version !== l) {
    var A = new Error("@opentelemetry/api: Registration of version v" + S.version + " for " + t + " does not match previously registered API v" + l);
    return n.error(A.stack || A.message), false;
  }
  return S[t] = e, n.debug("@opentelemetry/api: Registered a global for " + t + " v" + l + "."), true;
}
function d(t) {
  var e, n, _ = (e = G[m]) === null || e === void 0 ? void 0 : e.version;
  if (!(!_ || !OS(_))) return (n = G[m]) === null || n === void 0 ? void 0 : n[t];
}
function y(t, e) {
  e.debug("@opentelemetry/api: Unregistering a global for " + t + " v" + l + ".");
  var n = G[m];
  n && delete n[t];
}
var uS = function(t, e) {
  var n = typeof Symbol == "function" && t[Symbol.iterator];
  if (!n) return t;
  var _ = n.call(t), T, S = [], A;
  try {
    for (; (e === void 0 || e-- > 0) && !(T = _.next()).done; ) S.push(T.value);
  } catch (R) {
    A = { error: R };
  } finally {
    try {
      T && !T.done && (n = _.return) && n.call(_);
    } finally {
      if (A) throw A.error;
    }
  }
  return S;
}, CS = function(t, e, n) {
  if (arguments.length === 2) for (var _ = 0, T = e.length, S; _ < T; _++) (S || !(_ in e)) && (S || (S = Array.prototype.slice.call(e, 0, _)), S[_] = e[_]);
  return t.concat(S || Array.prototype.slice.call(e));
}, IS = function() {
  function t(e) {
    this._namespace = e.namespace || "DiagComponentLogger";
  }
  return t.prototype.debug = function() {
    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
    return h("debug", this._namespace, e);
  }, t.prototype.error = function() {
    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
    return h("error", this._namespace, e);
  }, t.prototype.info = function() {
    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
    return h("info", this._namespace, e);
  }, t.prototype.warn = function() {
    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
    return h("warn", this._namespace, e);
  }, t.prototype.verbose = function() {
    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
    return h("verbose", this._namespace, e);
  }, t;
}();
function h(t, e, n) {
  var _ = d("diag");
  if (_) return n.unshift(e), _[t].apply(_, CS([], uS(n), false));
}
var L;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.ERROR = 30] = "ERROR", t[t.WARN = 50] = "WARN", t[t.INFO = 60] = "INFO", t[t.DEBUG = 70] = "DEBUG", t[t.VERBOSE = 80] = "VERBOSE", t[t.ALL = 9999] = "ALL";
})(L || (L = {}));
function LS(t, e) {
  t < L.NONE ? t = L.NONE : t > L.ALL && (t = L.ALL), e = e || {};
  function n(_, T) {
    var S = e[_];
    return typeof S == "function" && t >= T ? S.bind(e) : function() {
    };
  }
  return { error: n("error", L.ERROR), warn: n("warn", L.WARN), info: n("info", L.INFO), debug: n("debug", L.DEBUG), verbose: n("verbose", L.VERBOSE) };
}
var DS = function(t, e) {
  var n = typeof Symbol == "function" && t[Symbol.iterator];
  if (!n) return t;
  var _ = n.call(t), T, S = [], A;
  try {
    for (; (e === void 0 || e-- > 0) && !(T = _.next()).done; ) S.push(T.value);
  } catch (R) {
    A = { error: R };
  } finally {
    try {
      T && !T.done && (n = _.return) && n.call(_);
    } finally {
      if (A) throw A.error;
    }
  }
  return S;
}, US = function(t, e, n) {
  if (arguments.length === 2) for (var _ = 0, T = e.length, S; _ < T; _++) (S || !(_ in e)) && (S || (S = Array.prototype.slice.call(e, 0, _)), S[_] = e[_]);
  return t.concat(S || Array.prototype.slice.call(e));
}, pS = "diag", D = function() {
  function t() {
    function e(T) {
      return function() {
        for (var S = [], A = 0; A < arguments.length; A++) S[A] = arguments[A];
        var R = d("diag");
        if (R) return R[T].apply(R, US([], DS(S), false));
      };
    }
    var n = this, _ = function(T, S) {
      var A, R, N;
      if (S === void 0 && (S = { logLevel: L.INFO }), T === n) {
        var P = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
        return n.error((A = P.stack) !== null && A !== void 0 ? A : P.message), false;
      }
      typeof S == "number" && (S = { logLevel: S });
      var M = d("diag"), O = LS((R = S.logLevel) !== null && R !== void 0 ? R : L.INFO, T);
      if (M && !S.suppressOverrideMessage) {
        var I = (N = new Error().stack) !== null && N !== void 0 ? N : "<failed to generate stacktrace>";
        M.warn("Current logger will be overwritten from " + I), O.warn("Current logger will overwrite one already registered from " + I);
      }
      return B("diag", O, n, true);
    };
    n.setLogger = _, n.disable = function() {
      y(pS, n);
    }, n.createComponentLogger = function(T) {
      return new IS(T);
    }, n.verbose = e("verbose"), n.debug = e("debug"), n.info = e("info"), n.warn = e("warn"), n.error = e("error");
  }
  return t.instance = function() {
    return this._instance || (this._instance = new t()), this._instance;
  }, t;
}(), lS = function(t, e) {
  var n = typeof Symbol == "function" && t[Symbol.iterator];
  if (!n) return t;
  var _ = n.call(t), T, S = [], A;
  try {
    for (; (e === void 0 || e-- > 0) && !(T = _.next()).done; ) S.push(T.value);
  } catch (R) {
    A = { error: R };
  } finally {
    try {
      T && !T.done && (n = _.return) && n.call(_);
    } finally {
      if (A) throw A.error;
    }
  }
  return S;
}, dS = function(t) {
  var e = typeof Symbol == "function" && Symbol.iterator, n = e && t[e], _ = 0;
  if (n) return n.call(t);
  if (t && typeof t.length == "number") return { next: function() {
    return t && _ >= t.length && (t = void 0), { value: t && t[_++], done: !t };
  } };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, fS = function() {
  function t(e) {
    this._entries = e ? new Map(e) : /* @__PURE__ */ new Map();
  }
  return t.prototype.getEntry = function(e) {
    var n = this._entries.get(e);
    if (n) return Object.assign({}, n);
  }, t.prototype.getAllEntries = function() {
    return Array.from(this._entries.entries()).map(function(e) {
      var n = lS(e, 2), _ = n[0], T = n[1];
      return [_, T];
    });
  }, t.prototype.setEntry = function(e, n) {
    var _ = new t(this._entries);
    return _._entries.set(e, n), _;
  }, t.prototype.removeEntry = function(e) {
    var n = new t(this._entries);
    return n._entries.delete(e), n;
  }, t.prototype.removeEntries = function() {
    for (var e, n, _ = [], T = 0; T < arguments.length; T++) _[T] = arguments[T];
    var S = new t(this._entries);
    try {
      for (var A = dS(_), R = A.next(); !R.done; R = A.next()) {
        var N = R.value;
        S._entries.delete(N);
      }
    } catch (P) {
      e = { error: P };
    } finally {
      try {
        R && !R.done && (n = A.return) && n.call(A);
      } finally {
        if (e) throw e.error;
      }
    }
    return S;
  }, t.prototype.clear = function() {
    return new t();
  }, t;
}(), VS = Symbol("BaggageEntryMetadata"), hS = D.instance();
function vS(t) {
  return t === void 0 && (t = {}), new fS(new Map(Object.entries(t)));
}
function gS(t) {
  return typeof t != "string" && (hS.error("Cannot create baggage metadata from unknown type: " + typeof t), t = ""), { __TYPE__: VS, toString: function() {
    return t;
  } };
}
function rt(t) {
  return Symbol.for(t);
}
var mS = /* @__PURE__ */ function() {
  function t(e) {
    var n = this;
    n._currentContext = e ? new Map(e) : /* @__PURE__ */ new Map(), n.getValue = function(_) {
      return n._currentContext.get(_);
    }, n.setValue = function(_, T) {
      var S = new t(n._currentContext);
      return S._currentContext.set(_, T), S;
    }, n.deleteValue = function(_) {
      var T = new t(n._currentContext);
      return T._currentContext.delete(_), T;
    };
  }
  return t;
}(), mt = new mS(), X = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }], GS = /* @__PURE__ */ function() {
  function t() {
    function e(_) {
      return function() {
        for (var T = [], S = 0; S < arguments.length; S++) T[S] = arguments[S];
        if (console) {
          var A = console[_];
          if (typeof A != "function" && (A = console.log), typeof A == "function") return A.apply(console, T);
        }
      };
    }
    for (var n = 0; n < X.length; n++) this[X[n].n] = e(X[n].c);
  }
  return t;
}(), f = /* @__PURE__ */ function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(_, T) {
      _.__proto__ = T;
    } || function(_, T) {
      for (var S in T) Object.prototype.hasOwnProperty.call(T, S) && (_[S] = T[S]);
    }, t(e, n);
  };
  return function(e, n) {
    if (typeof n != "function" && n !== null) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
    t(e, n);
    function _() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (_.prototype = n.prototype, new _());
  };
}(), BS = function() {
  function t() {
  }
  return t.prototype.createGauge = function(e, n) {
    return WS;
  }, t.prototype.createHistogram = function(e, n) {
    return kS;
  }, t.prototype.createCounter = function(e, n) {
    return xS;
  }, t.prototype.createUpDownCounter = function(e, n) {
    return jS;
  }, t.prototype.createObservableGauge = function(e, n) {
    return XS;
  }, t.prototype.createObservableCounter = function(e, n) {
    return $S;
  }, t.prototype.createObservableUpDownCounter = function(e, n) {
    return QS;
  }, t.prototype.addBatchObservableCallback = function(e, n) {
  }, t.prototype.removeBatchObservableCallback = function(e) {
  }, t;
}(), F = /* @__PURE__ */ function() {
  function t() {
  }
  return t;
}(), yS = function(t) {
  f(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e.prototype.add = function(n, _) {
  }, e;
}(F), YS = function(t) {
  f(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e.prototype.add = function(n, _) {
  }, e;
}(F), bS = function(t) {
  f(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e.prototype.record = function(n, _) {
  }, e;
}(F), HS = function(t) {
  f(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e.prototype.record = function(n, _) {
  }, e;
}(F), St = function() {
  function t() {
  }
  return t.prototype.addCallback = function(e) {
  }, t.prototype.removeCallback = function(e) {
  }, t;
}(), wS = function(t) {
  f(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e;
}(St), KS = function(t) {
  f(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e;
}(St), FS = function(t) {
  f(e, t);
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return e;
}(St), Gt = new BS(), xS = new yS(), WS = new bS(), kS = new HS(), jS = new YS(), $S = new wS(), XS = new KS(), QS = new FS();
function qS() {
  return Gt;
}
var tt;
(function(t) {
  t[t.INT = 0] = "INT", t[t.DOUBLE = 1] = "DOUBLE";
})(tt || (tt = {}));
var Bt = { get: function(t, e) {
  if (t != null) return t[e];
}, keys: function(t) {
  return t == null ? [] : Object.keys(t);
} }, yt = { set: function(t, e, n) {
  t != null && (t[e] = n);
} }, JS = function(t, e) {
  var n = typeof Symbol == "function" && t[Symbol.iterator];
  if (!n) return t;
  var _ = n.call(t), T, S = [], A;
  try {
    for (; (e === void 0 || e-- > 0) && !(T = _.next()).done; ) S.push(T.value);
  } catch (R) {
    A = { error: R };
  } finally {
    try {
      T && !T.done && (n = _.return) && n.call(_);
    } finally {
      if (A) throw A.error;
    }
  }
  return S;
}, zS = function(t, e, n) {
  if (n || arguments.length === 2) for (var _ = 0, T = e.length, S; _ < T; _++) (S || !(_ in e)) && (S || (S = Array.prototype.slice.call(e, 0, _)), S[_] = e[_]);
  return t.concat(S || Array.prototype.slice.call(e));
}, ZS = function() {
  function t() {
  }
  return t.prototype.active = function() {
    return mt;
  }, t.prototype.with = function(e, n, _) {
    for (var T = [], S = 3; S < arguments.length; S++) T[S - 3] = arguments[S];
    return n.call.apply(n, zS([_], JS(T), false));
  }, t.prototype.bind = function(e, n) {
    return n;
  }, t.prototype.enable = function() {
    return this;
  }, t.prototype.disable = function() {
    return this;
  }, t;
}(), ts = function(t, e) {
  var n = typeof Symbol == "function" && t[Symbol.iterator];
  if (!n) return t;
  var _ = n.call(t), T, S = [], A;
  try {
    for (; (e === void 0 || e-- > 0) && !(T = _.next()).done; ) S.push(T.value);
  } catch (R) {
    A = { error: R };
  } finally {
    try {
      T && !T.done && (n = _.return) && n.call(_);
    } finally {
      if (A) throw A.error;
    }
  }
  return S;
}, es = function(t, e, n) {
  if (arguments.length === 2) for (var _ = 0, T = e.length, S; _ < T; _++) (S || !(_ in e)) && (S || (S = Array.prototype.slice.call(e, 0, _)), S[_] = e[_]);
  return t.concat(S || Array.prototype.slice.call(e));
}, Q = "context", ns = new ZS(), x = function() {
  function t() {
  }
  return t.getInstance = function() {
    return this._instance || (this._instance = new t()), this._instance;
  }, t.prototype.setGlobalContextManager = function(e) {
    return B(Q, e, D.instance());
  }, t.prototype.active = function() {
    return this._getContextManager().active();
  }, t.prototype.with = function(e, n, _) {
    for (var T, S = [], A = 3; A < arguments.length; A++) S[A - 3] = arguments[A];
    return (T = this._getContextManager()).with.apply(T, es([e, n, _], ts(S), false));
  }, t.prototype.bind = function(e, n) {
    return this._getContextManager().bind(e, n);
  }, t.prototype._getContextManager = function() {
    return d(Q) || ns;
  }, t.prototype.disable = function() {
    this._getContextManager().disable(), y(Q, D.instance());
  }, t;
}(), K;
(function(t) {
  t[t.NONE = 0] = "NONE", t[t.SAMPLED = 1] = "SAMPLED";
})(K || (K = {}));
var st = "0000000000000000", At = "00000000000000000000000000000000", Yt = { traceId: At, spanId: st, traceFlags: K.NONE }, g = function() {
  function t(e) {
    e === void 0 && (e = Yt), this._spanContext = e;
  }
  return t.prototype.spanContext = function() {
    return this._spanContext;
  }, t.prototype.setAttribute = function(e, n) {
    return this;
  }, t.prototype.setAttributes = function(e) {
    return this;
  }, t.prototype.addEvent = function(e, n) {
    return this;
  }, t.prototype.addLink = function(e) {
    return this;
  }, t.prototype.addLinks = function(e) {
    return this;
  }, t.prototype.setStatus = function(e) {
    return this;
  }, t.prototype.updateName = function(e) {
    return this;
  }, t.prototype.end = function(e) {
  }, t.prototype.isRecording = function() {
    return false;
  }, t.prototype.recordException = function(e, n) {
  }, t;
}(), ct = rt("OpenTelemetry Context Key SPAN");
function at(t) {
  return t.getValue(ct) || void 0;
}
function Es() {
  return at(x.getInstance().active());
}
function it(t, e) {
  return t.setValue(ct, e);
}
function _s(t) {
  return t.deleteValue(ct);
}
function os(t, e) {
  return it(t, new g(e));
}
function bt(t) {
  var e;
  return (e = at(t)) === null || e === void 0 ? void 0 : e.spanContext();
}
var Ts = /^([0-9a-f]{32})$/i, rs = /^[0-9a-f]{16}$/i;
function Ht(t) {
  return Ts.test(t) && t !== At;
}
function wt(t) {
  return rs.test(t) && t !== st;
}
function Rt(t) {
  return Ht(t.traceId) && wt(t.spanId);
}
function Ss(t) {
  return new g(t);
}
var q = x.getInstance(), Kt = function() {
  function t() {
  }
  return t.prototype.startSpan = function(e, n, _) {
    _ === void 0 && (_ = q.active());
    var T = !!(n == null ? void 0 : n.root);
    if (T) return new g();
    var S = _ && bt(_);
    return ss(S) && Rt(S) ? new g(S) : new g();
  }, t.prototype.startActiveSpan = function(e, n, _, T) {
    var S, A, R;
    if (!(arguments.length < 2)) {
      arguments.length === 2 ? R = n : arguments.length === 3 ? (S = n, R = _) : (S = n, A = _, R = T);
      var N = A ?? q.active(), P = this.startSpan(e, S, N), M = it(N, P);
      return q.with(M, R, void 0, P);
    }
  }, t;
}();
function ss(t) {
  return typeof t == "object" && typeof t.spanId == "string" && typeof t.traceId == "string" && typeof t.traceFlags == "number";
}
var As = new Kt(), Ft = function() {
  function t(e, n, _, T) {
    this._provider = e, this.name = n, this.version = _, this.options = T;
  }
  return t.prototype.startSpan = function(e, n, _) {
    return this._getTracer().startSpan(e, n, _);
  }, t.prototype.startActiveSpan = function(e, n, _, T) {
    var S = this._getTracer();
    return Reflect.apply(S.startActiveSpan, S, arguments);
  }, t.prototype._getTracer = function() {
    if (this._delegate) return this._delegate;
    var e = this._provider.getDelegateTracer(this.name, this.version, this.options);
    return e ? (this._delegate = e, this._delegate) : As;
  }, t;
}(), cs = function() {
  function t() {
  }
  return t.prototype.getTracer = function(e, n, _) {
    return new Kt();
  }, t;
}(), as = new cs(), et = function() {
  function t() {
  }
  return t.prototype.getTracer = function(e, n, _) {
    var T;
    return (T = this.getDelegateTracer(e, n, _)) !== null && T !== void 0 ? T : new Ft(this, e, n, _);
  }, t.prototype.getDelegate = function() {
    var e;
    return (e = this._delegate) !== null && e !== void 0 ? e : as;
  }, t.prototype.setDelegate = function(e) {
    this._delegate = e;
  }, t.prototype.getDelegateTracer = function(e, n, _) {
    var T;
    return (T = this._delegate) === null || T === void 0 ? void 0 : T.getTracer(e, n, _);
  }, t;
}(), nt;
(function(t) {
  t[t.NOT_RECORD = 0] = "NOT_RECORD", t[t.RECORD = 1] = "RECORD", t[t.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
})(nt || (nt = {}));
var Et;
(function(t) {
  t[t.INTERNAL = 0] = "INTERNAL", t[t.SERVER = 1] = "SERVER", t[t.CLIENT = 2] = "CLIENT", t[t.PRODUCER = 3] = "PRODUCER", t[t.CONSUMER = 4] = "CONSUMER";
})(Et || (Et = {}));
var _t;
(function(t) {
  t[t.UNSET = 0] = "UNSET", t[t.OK = 1] = "OK", t[t.ERROR = 2] = "ERROR";
})(_t || (_t = {}));
var ot = "[_0-9a-z-*/]", is = "[a-z]" + ot + "{0,255}", Rs = "[a-z0-9]" + ot + "{0,240}@[a-z]" + ot + "{0,13}", Ns = new RegExp("^(?:" + is + "|" + Rs + ")$"), Ms = /^[ -~]{0,255}[!-~]$/, Os = /,|=/;
function Ps(t) {
  return Ns.test(t);
}
function us(t) {
  return Ms.test(t) && !Os.test(t);
}
var ut = 32, Cs = 512, Ct = ",", It = "=", Is = function() {
  function t(e) {
    this._internalState = /* @__PURE__ */ new Map(), e && this._parse(e);
  }
  return t.prototype.set = function(e, n) {
    var _ = this._clone();
    return _._internalState.has(e) && _._internalState.delete(e), _._internalState.set(e, n), _;
  }, t.prototype.unset = function(e) {
    var n = this._clone();
    return n._internalState.delete(e), n;
  }, t.prototype.get = function(e) {
    return this._internalState.get(e);
  }, t.prototype.serialize = function() {
    var e = this;
    return this._keys().reduce(function(n, _) {
      return n.push(_ + It + e.get(_)), n;
    }, []).join(Ct);
  }, t.prototype._parse = function(e) {
    e.length > Cs || (this._internalState = e.split(Ct).reverse().reduce(function(n, _) {
      var T = _.trim(), S = T.indexOf(It);
      if (S !== -1) {
        var A = T.slice(0, S), R = T.slice(S + 1, _.length);
        Ps(A) && us(R) && n.set(A, R);
      }
      return n;
    }, /* @__PURE__ */ new Map()), this._internalState.size > ut && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, ut))));
  }, t.prototype._keys = function() {
    return Array.from(this._internalState.keys()).reverse();
  }, t.prototype._clone = function() {
    var e = new t();
    return e._internalState = new Map(this._internalState), e;
  }, t;
}();
function Ls(t) {
  return new Is(t);
}
var xt = x.getInstance(), Wt = D.instance(), Ds = function() {
  function t() {
  }
  return t.prototype.getMeter = function(e, n, _) {
    return Gt;
  }, t;
}(), Us = new Ds(), J = "metrics", ps = function() {
  function t() {
  }
  return t.getInstance = function() {
    return this._instance || (this._instance = new t()), this._instance;
  }, t.prototype.setGlobalMeterProvider = function(e) {
    return B(J, e, D.instance());
  }, t.prototype.getMeterProvider = function() {
    return d(J) || Us;
  }, t.prototype.getMeter = function(e, n, _) {
    return this.getMeterProvider().getMeter(e, n, _);
  }, t.prototype.disable = function() {
    y(J, D.instance());
  }, t;
}(), kt = ps.getInstance(), ls = function() {
  function t() {
  }
  return t.prototype.inject = function(e, n) {
  }, t.prototype.extract = function(e, n) {
    return e;
  }, t.prototype.fields = function() {
    return [];
  }, t;
}(), Nt = rt("OpenTelemetry Baggage Key");
function jt(t) {
  return t.getValue(Nt) || void 0;
}
function ds() {
  return jt(x.getInstance().active());
}
function fs(t, e) {
  return t.setValue(Nt, e);
}
function Vs(t) {
  return t.deleteValue(Nt);
}
var z = "propagation", hs = new ls(), vs = function() {
  function t() {
    this.createBaggage = vS, this.getBaggage = jt, this.getActiveBaggage = ds, this.setBaggage = fs, this.deleteBaggage = Vs;
  }
  return t.getInstance = function() {
    return this._instance || (this._instance = new t()), this._instance;
  }, t.prototype.setGlobalPropagator = function(e) {
    return B(z, e, D.instance());
  }, t.prototype.inject = function(e, n, _) {
    return _ === void 0 && (_ = yt), this._getGlobalPropagator().inject(e, n, _);
  }, t.prototype.extract = function(e, n, _) {
    return _ === void 0 && (_ = Bt), this._getGlobalPropagator().extract(e, n, _);
  }, t.prototype.fields = function() {
    return this._getGlobalPropagator().fields();
  }, t.prototype.disable = function() {
    y(z, D.instance());
  }, t.prototype._getGlobalPropagator = function() {
    return d(z) || hs;
  }, t;
}(), $t = vs.getInstance(), Z = "trace", gs = function() {
  function t() {
    this._proxyTracerProvider = new et(), this.wrapSpanContext = Ss, this.isSpanContextValid = Rt, this.deleteSpan = _s, this.getSpan = at, this.getActiveSpan = Es, this.getSpanContext = bt, this.setSpan = it, this.setSpanContext = os;
  }
  return t.getInstance = function() {
    return this._instance || (this._instance = new t()), this._instance;
  }, t.prototype.setGlobalTracerProvider = function(e) {
    var n = B(Z, this._proxyTracerProvider, D.instance());
    return n && this._proxyTracerProvider.setDelegate(e), n;
  }, t.prototype.getTracerProvider = function() {
    return d(Z) || this._proxyTracerProvider;
  }, t.prototype.getTracer = function(e, n) {
    return this.getTracerProvider().getTracer(e, n);
  }, t.prototype.disable = function() {
    y(Z, D.instance()), this._proxyTracerProvider = new et();
  }, t;
}(), Xt = gs.getInstance();
const ms = { context: xt, diag: Wt, metrics: kt, propagation: $t, trace: Xt }, Gs = Object.freeze(Object.defineProperty({ __proto__: null, DiagConsoleLogger: GS, get DiagLogLevel() {
  return L;
}, INVALID_SPANID: st, INVALID_SPAN_CONTEXT: Yt, INVALID_TRACEID: At, ProxyTracer: Ft, ProxyTracerProvider: et, ROOT_CONTEXT: mt, get SamplingDecision() {
  return nt;
}, get SpanKind() {
  return Et;
}, get SpanStatusCode() {
  return _t;
}, get TraceFlags() {
  return K;
}, get ValueType() {
  return tt;
}, baggageEntryMetadataFromString: gS, context: xt, createContextKey: rt, createNoopMeter: qS, createTraceState: Ls, default: ms, defaultTextMapGetter: Bt, defaultTextMapSetter: yt, diag: Wt, isSpanContextValid: Rt, isValidSpanId: wt, isValidTraceId: Ht, metrics: kt, propagation: $t, trace: Xt }, Symbol.toStringTag, { value: "Module" })), W = vt(Gs);
function C(t) {
  let e = {};
  const n = t.length;
  for (let _ = 0; _ < n; _++) {
    const T = t[_];
    T && (e[String(T).toUpperCase().replace(/[-.]/g, "_")] = T);
  }
  return e;
}
const Qt = "aws.lambda.invoked_arn", qt = "db.system", Jt = "db.connection_string", zt = "db.user", Zt = "db.jdbc.driver_classname", te = "db.name", ee = "db.statement", ne = "db.operation", Ee = "db.mssql.instance_name", _e = "db.cassandra.keyspace", oe = "db.cassandra.page_size", Te = "db.cassandra.consistency_level", re = "db.cassandra.table", Se = "db.cassandra.idempotence", se = "db.cassandra.speculative_execution_count", Ae = "db.cassandra.coordinator.id", ce = "db.cassandra.coordinator.dc", ae = "db.hbase.namespace", ie = "db.redis.database_index", Re = "db.mongodb.collection", Ne = "db.sql.table", Me = "exception.type", Oe = "exception.message", Pe = "exception.stacktrace", ue = "exception.escaped", Ce = "faas.trigger", Ie = "faas.execution", Le = "faas.document.collection", De = "faas.document.operation", Ue = "faas.document.time", pe = "faas.document.name", le = "faas.time", de = "faas.cron", fe = "faas.coldstart", Ve = "faas.invoked_name", he = "faas.invoked_provider", ve = "faas.invoked_region", ge = "net.transport", me = "net.peer.ip", Ge = "net.peer.port", Be = "net.peer.name", ye = "net.host.ip", Ye = "net.host.port", be = "net.host.name", He = "net.host.connection.type", we = "net.host.connection.subtype", Ke = "net.host.carrier.name", Fe = "net.host.carrier.mcc", xe = "net.host.carrier.mnc", We = "net.host.carrier.icc", ke = "peer.service", je = "enduser.id", $e = "enduser.role", Xe = "enduser.scope", Qe = "thread.id", qe = "thread.name", Je = "code.function", ze = "code.namespace", Ze = "code.filepath", tn = "code.lineno", en = "http.method", nn = "http.url", En = "http.target", _n = "http.host", on = "http.scheme", Tn = "http.status_code", rn = "http.flavor", Sn = "http.user_agent", sn = "http.request_content_length", An = "http.request_content_length_uncompressed", cn = "http.response_content_length", an = "http.response_content_length_uncompressed", Rn = "http.server_name", Nn = "http.route", Mn = "http.client_ip", On = "aws.dynamodb.table_names", Pn = "aws.dynamodb.consumed_capacity", un = "aws.dynamodb.item_collection_metrics", Cn = "aws.dynamodb.provisioned_read_capacity", In = "aws.dynamodb.provisioned_write_capacity", Ln = "aws.dynamodb.consistent_read", Dn = "aws.dynamodb.projection", Un = "aws.dynamodb.limit", pn = "aws.dynamodb.attributes_to_get", ln = "aws.dynamodb.index_name", dn = "aws.dynamodb.select", fn = "aws.dynamodb.global_secondary_indexes", Vn = "aws.dynamodb.local_secondary_indexes", hn = "aws.dynamodb.exclusive_start_table", vn = "aws.dynamodb.table_count", gn = "aws.dynamodb.scan_forward", mn = "aws.dynamodb.segment", Gn = "aws.dynamodb.total_segments", Bn = "aws.dynamodb.count", yn = "aws.dynamodb.scanned_count", Yn = "aws.dynamodb.attribute_definitions", bn = "aws.dynamodb.global_secondary_index_updates", Hn = "messaging.system", wn = "messaging.destination", Kn = "messaging.destination_kind", Fn = "messaging.temp_destination", xn = "messaging.protocol", Wn = "messaging.protocol_version", kn = "messaging.url", jn = "messaging.message_id", $n = "messaging.conversation_id", Xn = "messaging.message_payload_size_bytes", Qn = "messaging.message_payload_compressed_size_bytes", qn = "messaging.operation", Jn = "messaging.consumer_id", zn = "messaging.rabbitmq.routing_key", Zn = "messaging.kafka.message_key", tE = "messaging.kafka.consumer_group", eE = "messaging.kafka.client_id", nE = "messaging.kafka.partition", EE = "messaging.kafka.tombstone", _E = "rpc.system", oE = "rpc.service", TE = "rpc.method", rE = "rpc.grpc.status_code", SE = "rpc.jsonrpc.version", sE = "rpc.jsonrpc.request_id", AE = "rpc.jsonrpc.error_code", cE = "rpc.jsonrpc.error_message", aE = "message.type", iE = "message.id", RE = "message.compressed_size", NE = "message.uncompressed_size", Bs = Qt, ys = qt, Ys = Jt, bs = zt, Hs = Zt, ws = te, Ks = ee, Fs = ne, xs = Ee, Ws = _e, ks = oe, js = Te, $s = re, Xs = Se, Qs = se, qs = Ae, Js = ce, zs = ae, Zs = ie, tA = Re, eA = Ne, nA = Me, EA = Oe, _A = Pe, oA = ue, TA = Ce, rA = Ie, SA = Le, sA = De, AA = Ue, cA = pe, aA = le, iA = de, RA = fe, NA = Ve, MA = he, OA = ve, PA = ge, uA = me, CA = Ge, IA = Be, LA = ye, DA = Ye, UA = be, pA = He, lA = we, dA = Ke, fA = Fe, VA = xe, hA = We, vA = ke, gA = je, mA = $e, GA = Xe, BA = Qe, yA = qe, YA = Je, bA = ze, HA = Ze, wA = tn, KA = en, FA = nn, xA = En, WA = _n, kA = on, jA = Tn, $A = rn, XA = Sn, QA = sn, qA = An, JA = cn, zA = an, ZA = Rn, tc = Nn, ec = Mn, nc = On, Ec = Pn, _c = un, oc = Cn, Tc = In, rc = Ln, Sc = Dn, sc = Un, Ac = pn, cc = ln, ac = dn, ic = fn, Rc = Vn, Nc = hn, Mc = vn, Oc = gn, Pc = mn, uc = Gn, Cc = Bn, Ic = yn, Lc = Yn, Dc = bn, Uc = Hn, pc = wn, lc = Kn, dc = Fn, fc = xn, Vc = Wn, hc = kn, vc = jn, gc = $n, mc = Xn, Gc = Qn, Bc = qn, yc = Jn, Yc = zn, bc = Zn, Hc = tE, wc = eE, Kc = nE, Fc = EE, xc = _E, Wc = oE, kc = TE, jc = rE, $c = SE, Xc = sE, Qc = AE, qc = cE, Jc = aE, zc = iE, Zc = RE, ta = NE, ea = C([Qt, qt, Jt, zt, Zt, te, ee, ne, Ee, _e, oe, Te, re, Se, se, Ae, ce, ae, ie, Re, Ne, Me, Oe, Pe, ue, Ce, Ie, Le, De, Ue, pe, le, de, fe, Ve, he, ve, ge, me, Ge, Be, ye, Ye, be, He, we, Ke, Fe, xe, We, ke, je, $e, Xe, Qe, qe, Je, ze, Ze, tn, en, nn, En, _n, on, Tn, rn, Sn, sn, An, cn, an, Rn, Nn, Mn, On, Pn, un, Cn, In, Ln, Dn, Un, pn, ln, dn, fn, Vn, hn, vn, gn, mn, Gn, Bn, yn, Yn, bn, Hn, wn, Kn, Fn, xn, Wn, kn, jn, $n, Xn, Qn, qn, Jn, zn, Zn, tE, eE, nE, EE, _E, oE, TE, rE, SE, sE, AE, cE, aE, iE, RE, NE]), ME = "other_sql", OE = "mssql", PE = "mysql", uE = "oracle", CE = "db2", IE = "postgresql", LE = "redshift", DE = "hive", UE = "cloudscape", pE = "hsqldb", lE = "progress", dE = "maxdb", fE = "hanadb", VE = "ingres", hE = "firstsql", vE = "edb", gE = "cache", mE = "adabas", GE = "firebird", BE = "derby", yE = "filemaker", YE = "informix", bE = "instantdb", HE = "interbase", wE = "mariadb", KE = "netezza", FE = "pervasive", xE = "pointbase", WE = "sqlite", kE = "sybase", jE = "teradata", $E = "vertica", XE = "h2", QE = "coldfusion", qE = "cassandra", JE = "hbase", zE = "mongodb", ZE = "redis", t_ = "couchbase", e_ = "couchdb", n_ = "cosmosdb", E_ = "dynamodb", __ = "neo4j", o_ = "geode", T_ = "elasticsearch", r_ = "memcached", S_ = "cockroachdb", na = ME, Ea = OE, _a = PE, oa = uE, Ta = CE, ra = IE, Sa = LE, sa = DE, Aa = UE, ca = pE, aa = lE, ia = dE, Ra = fE, Na = VE, Ma = hE, Oa = vE, Pa = gE, ua = mE, Ca = GE, Ia = BE, La = yE, Da = YE, Ua = bE, pa = HE, la = wE, da = KE, fa = FE, Va = xE, ha = WE, va = kE, ga = jE, ma = $E, Ga = XE, Ba = QE, ya = qE, Ya = JE, ba = zE, Ha = ZE, wa = t_, Ka = e_, Fa = n_, xa = E_, Wa = __, ka = o_, ja = T_, $a = r_, Xa = S_, Qa = C([ME, OE, PE, uE, CE, IE, LE, DE, UE, pE, lE, dE, fE, VE, hE, vE, gE, mE, GE, BE, yE, YE, bE, HE, wE, KE, FE, xE, WE, kE, jE, $E, XE, QE, qE, JE, zE, ZE, t_, e_, n_, E_, __, o_, T_, r_, S_]), s_ = "all", A_ = "each_quorum", c_ = "quorum", a_ = "local_quorum", i_ = "one", R_ = "two", N_ = "three", M_ = "local_one", O_ = "any", P_ = "serial", u_ = "local_serial", qa = s_, Ja = A_, za = c_, Za = a_, ti = i_, ei = R_, ni = N_, Ei = M_, _i = O_, oi = P_, Ti = u_, ri = C([s_, A_, c_, a_, i_, R_, N_, M_, O_, P_, u_]), C_ = "datasource", I_ = "http", L_ = "pubsub", D_ = "timer", U_ = "other", Si = C_, si = I_, Ai = L_, ci = D_, ai = U_, ii = C([C_, I_, L_, D_, U_]), p_ = "insert", l_ = "edit", d_ = "delete", Ri = p_, Ni = l_, Mi = d_, Oi = C([p_, l_, d_]), f_ = "alibaba_cloud", V_ = "aws", h_ = "azure", v_ = "gcp", Pi = f_, ui = V_, Ci = h_, Ii = v_, Li = C([f_, V_, h_, v_]), g_ = "ip_tcp", m_ = "ip_udp", G_ = "ip", B_ = "unix", y_ = "pipe", Y_ = "inproc", b_ = "other", Di = g_, Ui = m_, pi = G_, li = B_, di = y_, fi = Y_, Vi = b_, hi = C([g_, m_, G_, B_, y_, Y_, b_]), H_ = "wifi", w_ = "wired", K_ = "cell", F_ = "unavailable", x_ = "unknown", vi = H_, gi = w_, mi = K_, Gi = F_, Bi = x_, yi = C([H_, w_, K_, F_, x_]), W_ = "gprs", k_ = "edge", j_ = "umts", $_ = "cdma", X_ = "evdo_0", Q_ = "evdo_a", q_ = "cdma2000_1xrtt", J_ = "hsdpa", z_ = "hsupa", Z_ = "hspa", to = "iden", eo = "evdo_b", no = "lte", Eo = "ehrpd", _o = "hspap", oo = "gsm", To = "td_scdma", ro = "iwlan", So = "nr", so = "nrnsa", Ao = "lte_ca", Yi = W_, bi = k_, Hi = j_, wi = $_, Ki = X_, Fi = Q_, xi = q_, Wi = J_, ki = z_, ji = Z_, $i = to, Xi = eo, Qi = no, qi = Eo, Ji = _o, zi = oo, Zi = To, tR = ro, eR = So, nR = so, ER = Ao, _R = C([W_, k_, j_, $_, X_, Q_, q_, J_, z_, Z_, to, eo, no, Eo, _o, oo, To, ro, So, so, Ao]), co = "1.0", ao = "1.1", io = "2.0", Ro = "SPDY", No = "QUIC", oR = co, TR = ao, rR = io, SR = Ro, sR = No, AR = { HTTP_1_0: co, HTTP_1_1: ao, HTTP_2_0: io, SPDY: Ro, QUIC: No }, Mo = "queue", Oo = "topic", cR = Mo, aR = Oo, iR = C([Mo, Oo]), Po = "receive", uo = "process", RR = Po, NR = uo, MR = C([Po, uo]), Co = 0, Io = 1, Lo = 2, Do = 3, Uo = 4, po = 5, lo = 6, fo = 7, Vo = 8, ho = 9, vo = 10, go = 11, mo = 12, Go = 13, Bo = 14, yo = 15, Yo = 16, OR = Co, PR = Io, uR = Lo, CR = Do, IR = Uo, LR = po, DR = lo, UR = fo, pR = Vo, lR = ho, dR = vo, fR = go, VR = mo, hR = Go, vR = Bo, gR = yo, mR = Yo, GR = { OK: Co, CANCELLED: Io, UNKNOWN: Lo, INVALID_ARGUMENT: Do, DEADLINE_EXCEEDED: Uo, NOT_FOUND: po, ALREADY_EXISTS: lo, PERMISSION_DENIED: fo, RESOURCE_EXHAUSTED: Vo, FAILED_PRECONDITION: ho, ABORTED: vo, OUT_OF_RANGE: go, UNIMPLEMENTED: mo, INTERNAL: Go, UNAVAILABLE: Bo, DATA_LOSS: yo, UNAUTHENTICATED: Yo }, bo = "SENT", Ho = "RECEIVED", BR = bo, yR = Ho, YR = C([bo, Ho]), wo = "cloud.provider", Ko = "cloud.account.id", Fo = "cloud.region", xo = "cloud.availability_zone", Wo = "cloud.platform", ko = "aws.ecs.container.arn", jo = "aws.ecs.cluster.arn", $o = "aws.ecs.launchtype", Xo = "aws.ecs.task.arn", Qo = "aws.ecs.task.family", qo = "aws.ecs.task.revision", Jo = "aws.eks.cluster.arn", zo = "aws.log.group.names", Zo = "aws.log.group.arns", tT = "aws.log.stream.names", eT = "aws.log.stream.arns", nT = "container.name", ET = "container.id", _T = "container.runtime", oT = "container.image.name", TT = "container.image.tag", rT = "deployment.environment", ST = "device.id", sT = "device.model.identifier", AT = "device.model.name", cT = "faas.name", aT = "faas.id", iT = "faas.version", RT = "faas.instance", NT = "faas.max_memory", MT = "host.id", OT = "host.name", PT = "host.type", uT = "host.arch", CT = "host.image.name", IT = "host.image.id", LT = "host.image.version", DT = "k8s.cluster.name", UT = "k8s.node.name", pT = "k8s.node.uid", lT = "k8s.namespace.name", dT = "k8s.pod.uid", fT = "k8s.pod.name", VT = "k8s.container.name", hT = "k8s.replicaset.uid", vT = "k8s.replicaset.name", gT = "k8s.deployment.uid", mT = "k8s.deployment.name", GT = "k8s.statefulset.uid", BT = "k8s.statefulset.name", yT = "k8s.daemonset.uid", YT = "k8s.daemonset.name", bT = "k8s.job.uid", HT = "k8s.job.name", wT = "k8s.cronjob.uid", KT = "k8s.cronjob.name", FT = "os.type", xT = "os.description", WT = "os.name", kT = "os.version", jT = "process.pid", $T = "process.executable.name", XT = "process.executable.path", QT = "process.command", qT = "process.command_line", JT = "process.command_args", zT = "process.owner", ZT = "process.runtime.name", tr = "process.runtime.version", er = "process.runtime.description", nr = "service.name", Er = "service.namespace", _r = "service.instance.id", or = "service.version", Tr = "telemetry.sdk.name", rr = "telemetry.sdk.language", Sr = "telemetry.sdk.version", sr = "telemetry.auto.version", Ar = "webengine.name", cr = "webengine.version", ar = "webengine.description", bR = wo, HR = Ko, wR = Fo, KR = xo, FR = Wo, xR = ko, WR = jo, kR = $o, jR = Xo, $R = Qo, XR = qo, QR = Jo, qR = zo, JR = Zo, zR = tT, ZR = eT, tN = nT, eN = ET, nN = _T, EN = oT, _N = TT, oN = rT, TN = ST, rN = sT, SN = AT, sN = cT, AN = aT, cN = iT, aN = RT, iN = NT, RN = MT, NN = OT, MN = PT, ON = uT, PN = CT, uN = IT, CN = LT, IN = DT, LN = UT, DN = pT, UN = lT, pN = dT, lN = fT, dN = VT, fN = hT, VN = vT, hN = gT, vN = mT, gN = GT, mN = BT, GN = yT, BN = YT, yN = bT, YN = HT, bN = wT, HN = KT, wN = FT, KN = xT, FN = WT, xN = kT, WN = jT, kN = $T, jN = XT, $N = QT, XN = qT, QN = JT, qN = zT, JN = ZT, zN = tr, ZN = er, tM = nr, eM = Er, nM = _r, EM = or, _M = Tr, oM = rr, TM = Sr, rM = sr, SM = Ar, sM = cr, AM = ar, cM = C([wo, Ko, Fo, xo, Wo, ko, jo, $o, Xo, Qo, qo, Jo, zo, Zo, tT, eT, nT, ET, _T, oT, TT, rT, ST, sT, AT, cT, aT, iT, RT, NT, MT, OT, PT, uT, CT, IT, LT, DT, UT, pT, lT, dT, fT, VT, hT, vT, gT, mT, GT, BT, yT, YT, bT, HT, wT, KT, FT, xT, WT, kT, jT, $T, XT, QT, qT, JT, zT, ZT, tr, er, nr, Er, _r, or, Tr, rr, Sr, sr, Ar, cr, ar]), ir = "alibaba_cloud", Rr = "aws", Nr = "azure", Mr = "gcp", aM = ir, iM = Rr, RM = Nr, NM = Mr, MM = C([ir, Rr, Nr, Mr]), Or = "alibaba_cloud_ecs", Pr = "alibaba_cloud_fc", ur = "aws_ec2", Cr = "aws_ecs", Ir = "aws_eks", Lr = "aws_lambda", Dr = "aws_elastic_beanstalk", Ur = "azure_vm", pr = "azure_container_instances", lr = "azure_aks", dr = "azure_functions", fr = "azure_app_service", Vr = "gcp_compute_engine", hr = "gcp_cloud_run", vr = "gcp_kubernetes_engine", gr = "gcp_cloud_functions", mr = "gcp_app_engine", OM = Or, PM = Pr, uM = ur, CM = Cr, IM = Ir, LM = Lr, DM = Dr, UM = Ur, pM = pr, lM = lr, dM = dr, fM = fr, VM = Vr, hM = hr, vM = vr, gM = gr, mM = mr, GM = C([Or, Pr, ur, Cr, Ir, Lr, Dr, Ur, pr, lr, dr, fr, Vr, hr, vr, gr, mr]), Gr = "ec2", Br = "fargate", BM = Gr, yM = Br, YM = C([Gr, Br]), yr = "amd64", Yr = "arm32", br = "arm64", Hr = "ia64", wr = "ppc32", Kr = "ppc64", Fr = "x86", bM = yr, HM = Yr, wM = br, KM = Hr, FM = wr, xM = Kr, WM = Fr, kM = C([yr, Yr, br, Hr, wr, Kr, Fr]), xr = "windows", Wr = "linux", kr = "darwin", jr = "freebsd", $r = "netbsd", Xr = "openbsd", Qr = "dragonflybsd", qr = "hpux", Jr = "aix", zr = "solaris", Zr = "z_os", jM = xr, $M = Wr, XM = kr, QM = jr, qM = $r, JM = Xr, zM = Qr, ZM = qr, tO = Jr, eO = zr, nO = Zr, EO = C([xr, Wr, kr, jr, $r, Xr, Qr, qr, Jr, zr, Zr]), tS = "cpp", eS = "dotnet", nS = "erlang", ES = "go", _S = "java", oS = "nodejs", TS = "php", rS = "python", SS = "ruby", sS = "webjs", _O = tS, oO = eS, TO = nS, rO = ES, SO = _S, sO = oS, AO = TS, cO = rS, aO = SS, iO = sS, RO = C([tS, eS, nS, ES, _S, oS, TS, rS, SS, sS]), NO = "aspnetcore.diagnostics.exception.result", MO = "aborted", OO = "handled", PO = "skipped", uO = "unhandled", CO = "aspnetcore.diagnostics.handler.type", IO = "aspnetcore.rate_limiting.policy", LO = "aspnetcore.rate_limiting.result", DO = "acquired", UO = "endpoint_limiter", pO = "global_limiter", lO = "request_canceled", dO = "aspnetcore.request.is_unhandled", fO = "aspnetcore.routing.is_fallback", VO = "aspnetcore.routing.match_status", hO = "failure", vO = "success", gO = "client.address", mO = "client.port", GO = "code.column.number", BO = "code.file.path", yO = "code.function.name", YO = "code.line.number", bO = "code.stacktrace", HO = "db.collection.name", wO = "db.namespace", KO = "db.operation.batch.size", FO = "db.operation.name", xO = "db.query.summary", WO = "db.query.text", kO = "db.response.status_code", jO = "db.stored_procedure.name", $O = "db.system.name", XO = "mariadb", QO = "microsoft.sql_server", qO = "mysql", JO = "postgresql", zO = "dotnet.gc.heap.generation", ZO = "gen0", tP = "gen1", eP = "gen2", nP = "loh", EP = "poh", _P = "error.type", oP = "_OTHER", TP = "exception.escaped", rP = "exception.message", SP = "exception.stacktrace", sP = "exception.type", AP = (t) => `http.request.header.${t}`, cP = "http.request.method", aP = "_OTHER", iP = "CONNECT", RP = "DELETE", NP = "GET", MP = "HEAD", OP = "OPTIONS", PP = "PATCH", uP = "POST", CP = "PUT", IP = "TRACE", LP = "http.request.method_original", DP = "http.request.resend_count", UP = (t) => `http.response.header.${t}`, pP = "http.response.status_code", lP = "http.route", dP = "jvm.gc.action", fP = "jvm.gc.name", VP = "jvm.memory.pool.name", hP = "jvm.memory.type", vP = "heap", gP = "non_heap", mP = "jvm.thread.daemon", GP = "jvm.thread.state", BP = "blocked", yP = "new", YP = "runnable", bP = "terminated", HP = "timed_waiting", wP = "waiting", KP = "network.local.address", FP = "network.local.port", xP = "network.peer.address", WP = "network.peer.port", kP = "network.protocol.name", jP = "network.protocol.version", $P = "network.transport", XP = "pipe", QP = "quic", qP = "tcp", JP = "udp", zP = "unix", ZP = "network.type", tu = "ipv4", eu = "ipv6", nu = "otel.scope.name", Eu = "otel.scope.version", _u = "otel.status_code", ou = "ERROR", Tu = "OK", ru = "otel.status_description", Su = "server.address", su = "server.port", Au = "service.name", cu = "service.version", au = "signalr.connection.status", iu = "app_shutdown", Ru = "normal_closure", Nu = "timeout", Mu = "signalr.transport", Ou = "long_polling", Pu = "server_sent_events", uu = "web_sockets", Cu = "telemetry.sdk.language", Iu = "cpp", Lu = "dotnet", Du = "erlang", Uu = "go", pu = "java", lu = "nodejs", du = "php", fu = "python", Vu = "ruby", hu = "rust", vu = "swift", gu = "webjs", mu = "telemetry.sdk.name", Gu = "telemetry.sdk.version", Bu = "url.fragment", yu = "url.full", Yu = "url.path", bu = "url.query", Hu = "url.scheme", wu = "user_agent.original", Ku = "aspnetcore.diagnostics.exceptions", Fu = "aspnetcore.rate_limiting.active_request_leases", xu = "aspnetcore.rate_limiting.queued_requests", Wu = "aspnetcore.rate_limiting.request.time_in_queue", ku = "aspnetcore.rate_limiting.request_lease.duration", ju = "aspnetcore.rate_limiting.requests", $u = "aspnetcore.routing.match_attempts", Xu = "db.client.operation.duration", Qu = "dotnet.assembly.count", qu = "dotnet.exceptions", Ju = "dotnet.gc.collections", zu = "dotnet.gc.heap.total_allocated", Zu = "dotnet.gc.last_collection.heap.fragmentation.size", tC = "dotnet.gc.last_collection.heap.size", eC = "dotnet.gc.last_collection.memory.committed_size", nC = "dotnet.gc.pause.time", EC = "dotnet.jit.compilation.time", _C = "dotnet.jit.compiled_il.size", oC = "dotnet.jit.compiled_methods", TC = "dotnet.monitor.lock_contentions", rC = "dotnet.process.cpu.count", SC = "dotnet.process.cpu.time", sC = "dotnet.process.memory.working_set", AC = "dotnet.thread_pool.queue.length", cC = "dotnet.thread_pool.thread.count", aC = "dotnet.thread_pool.work_item.count", iC = "dotnet.timer.count", RC = "http.client.request.duration", NC = "http.server.request.duration", MC = "jvm.class.count", OC = "jvm.class.loaded", PC = "jvm.class.unloaded", uC = "jvm.cpu.count", CC = "jvm.cpu.recent_utilization", IC = "jvm.cpu.time", LC = "jvm.gc.duration", DC = "jvm.memory.committed", UC = "jvm.memory.limit", pC = "jvm.memory.used", lC = "jvm.memory.used_after_last_gc", dC = "jvm.thread.count", fC = "kestrel.active_connections", VC = "kestrel.active_tls_handshakes", hC = "kestrel.connection.duration", vC = "kestrel.queued_connections", gC = "kestrel.queued_requests", mC = "kestrel.rejected_connections", GC = "kestrel.tls_handshake.duration", BC = "kestrel.upgraded_connections", yC = "signalr.server.active_connections", YC = "signalr.server.connection.duration", bC = Object.freeze(Object.defineProperty({ __proto__: null, ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED: MO, ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED: OO, ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED: PO, ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED: uO, ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED: DO, ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER: UO, ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER: pO, ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED: lO, ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE: hO, ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS: vO, ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT: NO, ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE: CO, ATTR_ASPNETCORE_RATE_LIMITING_POLICY: IO, ATTR_ASPNETCORE_RATE_LIMITING_RESULT: LO, ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED: dO, ATTR_ASPNETCORE_ROUTING_IS_FALLBACK: fO, ATTR_ASPNETCORE_ROUTING_MATCH_STATUS: VO, ATTR_CLIENT_ADDRESS: gO, ATTR_CLIENT_PORT: mO, ATTR_CODE_COLUMN_NUMBER: GO, ATTR_CODE_FILE_PATH: BO, ATTR_CODE_FUNCTION_NAME: yO, ATTR_CODE_LINE_NUMBER: YO, ATTR_CODE_STACKTRACE: bO, ATTR_DB_COLLECTION_NAME: HO, ATTR_DB_NAMESPACE: wO, ATTR_DB_OPERATION_BATCH_SIZE: KO, ATTR_DB_OPERATION_NAME: FO, ATTR_DB_QUERY_SUMMARY: xO, ATTR_DB_QUERY_TEXT: WO, ATTR_DB_RESPONSE_STATUS_CODE: kO, ATTR_DB_STORED_PROCEDURE_NAME: jO, ATTR_DB_SYSTEM_NAME: $O, ATTR_DOTNET_GC_HEAP_GENERATION: zO, ATTR_ERROR_TYPE: _P, ATTR_EXCEPTION_ESCAPED: TP, ATTR_EXCEPTION_MESSAGE: rP, ATTR_EXCEPTION_STACKTRACE: SP, ATTR_EXCEPTION_TYPE: sP, ATTR_HTTP_REQUEST_HEADER: AP, ATTR_HTTP_REQUEST_METHOD: cP, ATTR_HTTP_REQUEST_METHOD_ORIGINAL: LP, ATTR_HTTP_REQUEST_RESEND_COUNT: DP, ATTR_HTTP_RESPONSE_HEADER: UP, ATTR_HTTP_RESPONSE_STATUS_CODE: pP, ATTR_HTTP_ROUTE: lP, ATTR_JVM_GC_ACTION: dP, ATTR_JVM_GC_NAME: fP, ATTR_JVM_MEMORY_POOL_NAME: VP, ATTR_JVM_MEMORY_TYPE: hP, ATTR_JVM_THREAD_DAEMON: mP, ATTR_JVM_THREAD_STATE: GP, ATTR_NETWORK_LOCAL_ADDRESS: KP, ATTR_NETWORK_LOCAL_PORT: FP, ATTR_NETWORK_PEER_ADDRESS: xP, ATTR_NETWORK_PEER_PORT: WP, ATTR_NETWORK_PROTOCOL_NAME: kP, ATTR_NETWORK_PROTOCOL_VERSION: jP, ATTR_NETWORK_TRANSPORT: $P, ATTR_NETWORK_TYPE: ZP, ATTR_OTEL_SCOPE_NAME: nu, ATTR_OTEL_SCOPE_VERSION: Eu, ATTR_OTEL_STATUS_CODE: _u, ATTR_OTEL_STATUS_DESCRIPTION: ru, ATTR_SERVER_ADDRESS: Su, ATTR_SERVER_PORT: su, ATTR_SERVICE_NAME: Au, ATTR_SERVICE_VERSION: cu, ATTR_SIGNALR_CONNECTION_STATUS: au, ATTR_SIGNALR_TRANSPORT: Mu, ATTR_TELEMETRY_SDK_LANGUAGE: Cu, ATTR_TELEMETRY_SDK_NAME: mu, ATTR_TELEMETRY_SDK_VERSION: Gu, ATTR_URL_FRAGMENT: Bu, ATTR_URL_FULL: yu, ATTR_URL_PATH: Yu, ATTR_URL_QUERY: bu, ATTR_URL_SCHEME: Hu, ATTR_USER_AGENT_ORIGINAL: wu, AWSECSLAUNCHTYPEVALUES_EC2: BM, AWSECSLAUNCHTYPEVALUES_FARGATE: yM, AwsEcsLaunchtypeValues: YM, CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS: OM, CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC: PM, CLOUDPLATFORMVALUES_AWS_EC2: uM, CLOUDPLATFORMVALUES_AWS_ECS: CM, CLOUDPLATFORMVALUES_AWS_EKS: IM, CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK: DM, CLOUDPLATFORMVALUES_AWS_LAMBDA: LM, CLOUDPLATFORMVALUES_AZURE_AKS: lM, CLOUDPLATFORMVALUES_AZURE_APP_SERVICE: fM, CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES: pM, CLOUDPLATFORMVALUES_AZURE_FUNCTIONS: dM, CLOUDPLATFORMVALUES_AZURE_VM: UM, CLOUDPLATFORMVALUES_GCP_APP_ENGINE: mM, CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS: gM, CLOUDPLATFORMVALUES_GCP_CLOUD_RUN: hM, CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE: VM, CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE: vM, CLOUDPROVIDERVALUES_ALIBABA_CLOUD: aM, CLOUDPROVIDERVALUES_AWS: iM, CLOUDPROVIDERVALUES_AZURE: RM, CLOUDPROVIDERVALUES_GCP: NM, CloudPlatformValues: GM, CloudProviderValues: MM, DBCASSANDRACONSISTENCYLEVELVALUES_ALL: qa, DBCASSANDRACONSISTENCYLEVELVALUES_ANY: _i, DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM: Ja, DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE: Ei, DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM: Za, DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL: Ti, DBCASSANDRACONSISTENCYLEVELVALUES_ONE: ti, DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM: za, DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL: oi, DBCASSANDRACONSISTENCYLEVELVALUES_THREE: ni, DBCASSANDRACONSISTENCYLEVELVALUES_TWO: ei, DBSYSTEMVALUES_ADABAS: ua, DBSYSTEMVALUES_CACHE: Pa, DBSYSTEMVALUES_CASSANDRA: ya, DBSYSTEMVALUES_CLOUDSCAPE: Aa, DBSYSTEMVALUES_COCKROACHDB: Xa, DBSYSTEMVALUES_COLDFUSION: Ba, DBSYSTEMVALUES_COSMOSDB: Fa, DBSYSTEMVALUES_COUCHBASE: wa, DBSYSTEMVALUES_COUCHDB: Ka, DBSYSTEMVALUES_DB2: Ta, DBSYSTEMVALUES_DERBY: Ia, DBSYSTEMVALUES_DYNAMODB: xa, DBSYSTEMVALUES_EDB: Oa, DBSYSTEMVALUES_ELASTICSEARCH: ja, DBSYSTEMVALUES_FILEMAKER: La, DBSYSTEMVALUES_FIREBIRD: Ca, DBSYSTEMVALUES_FIRSTSQL: Ma, DBSYSTEMVALUES_GEODE: ka, DBSYSTEMVALUES_H2: Ga, DBSYSTEMVALUES_HANADB: Ra, DBSYSTEMVALUES_HBASE: Ya, DBSYSTEMVALUES_HIVE: sa, DBSYSTEMVALUES_HSQLDB: ca, DBSYSTEMVALUES_INFORMIX: Da, DBSYSTEMVALUES_INGRES: Na, DBSYSTEMVALUES_INSTANTDB: Ua, DBSYSTEMVALUES_INTERBASE: pa, DBSYSTEMVALUES_MARIADB: la, DBSYSTEMVALUES_MAXDB: ia, DBSYSTEMVALUES_MEMCACHED: $a, DBSYSTEMVALUES_MONGODB: ba, DBSYSTEMVALUES_MSSQL: Ea, DBSYSTEMVALUES_MYSQL: _a, DBSYSTEMVALUES_NEO4J: Wa, DBSYSTEMVALUES_NETEZZA: da, DBSYSTEMVALUES_ORACLE: oa, DBSYSTEMVALUES_OTHER_SQL: na, DBSYSTEMVALUES_PERVASIVE: fa, DBSYSTEMVALUES_POINTBASE: Va, DBSYSTEMVALUES_POSTGRESQL: ra, DBSYSTEMVALUES_PROGRESS: aa, DBSYSTEMVALUES_REDIS: Ha, DBSYSTEMVALUES_REDSHIFT: Sa, DBSYSTEMVALUES_SQLITE: ha, DBSYSTEMVALUES_SYBASE: va, DBSYSTEMVALUES_TERADATA: ga, DBSYSTEMVALUES_VERTICA: ma, DB_SYSTEM_NAME_VALUE_MARIADB: XO, DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER: QO, DB_SYSTEM_NAME_VALUE_MYSQL: qO, DB_SYSTEM_NAME_VALUE_POSTGRESQL: JO, DOTNET_GC_HEAP_GENERATION_VALUE_GEN0: ZO, DOTNET_GC_HEAP_GENERATION_VALUE_GEN1: tP, DOTNET_GC_HEAP_GENERATION_VALUE_GEN2: eP, DOTNET_GC_HEAP_GENERATION_VALUE_LOH: nP, DOTNET_GC_HEAP_GENERATION_VALUE_POH: EP, DbCassandraConsistencyLevelValues: ri, DbSystemValues: Qa, ERROR_TYPE_VALUE_OTHER: oP, FAASDOCUMENTOPERATIONVALUES_DELETE: Mi, FAASDOCUMENTOPERATIONVALUES_EDIT: Ni, FAASDOCUMENTOPERATIONVALUES_INSERT: Ri, FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD: Pi, FAASINVOKEDPROVIDERVALUES_AWS: ui, FAASINVOKEDPROVIDERVALUES_AZURE: Ci, FAASINVOKEDPROVIDERVALUES_GCP: Ii, FAASTRIGGERVALUES_DATASOURCE: Si, FAASTRIGGERVALUES_HTTP: si, FAASTRIGGERVALUES_OTHER: ai, FAASTRIGGERVALUES_PUBSUB: Ai, FAASTRIGGERVALUES_TIMER: ci, FaasDocumentOperationValues: Oi, FaasInvokedProviderValues: Li, FaasTriggerValues: ii, HOSTARCHVALUES_AMD64: bM, HOSTARCHVALUES_ARM32: HM, HOSTARCHVALUES_ARM64: wM, HOSTARCHVALUES_IA64: KM, HOSTARCHVALUES_PPC32: FM, HOSTARCHVALUES_PPC64: xM, HOSTARCHVALUES_X86: WM, HTTPFLAVORVALUES_HTTP_1_0: oR, HTTPFLAVORVALUES_HTTP_1_1: TR, HTTPFLAVORVALUES_HTTP_2_0: rR, HTTPFLAVORVALUES_QUIC: sR, HTTPFLAVORVALUES_SPDY: SR, HTTP_REQUEST_METHOD_VALUE_CONNECT: iP, HTTP_REQUEST_METHOD_VALUE_DELETE: RP, HTTP_REQUEST_METHOD_VALUE_GET: NP, HTTP_REQUEST_METHOD_VALUE_HEAD: MP, HTTP_REQUEST_METHOD_VALUE_OPTIONS: OP, HTTP_REQUEST_METHOD_VALUE_OTHER: aP, HTTP_REQUEST_METHOD_VALUE_PATCH: PP, HTTP_REQUEST_METHOD_VALUE_POST: uP, HTTP_REQUEST_METHOD_VALUE_PUT: CP, HTTP_REQUEST_METHOD_VALUE_TRACE: IP, HostArchValues: kM, HttpFlavorValues: AR, JVM_MEMORY_TYPE_VALUE_HEAP: vP, JVM_MEMORY_TYPE_VALUE_NON_HEAP: gP, JVM_THREAD_STATE_VALUE_BLOCKED: BP, JVM_THREAD_STATE_VALUE_NEW: yP, JVM_THREAD_STATE_VALUE_RUNNABLE: YP, JVM_THREAD_STATE_VALUE_TERMINATED: bP, JVM_THREAD_STATE_VALUE_TIMED_WAITING: HP, JVM_THREAD_STATE_VALUE_WAITING: wP, MESSAGETYPEVALUES_RECEIVED: yR, MESSAGETYPEVALUES_SENT: BR, MESSAGINGDESTINATIONKINDVALUES_QUEUE: cR, MESSAGINGDESTINATIONKINDVALUES_TOPIC: aR, MESSAGINGOPERATIONVALUES_PROCESS: NR, MESSAGINGOPERATIONVALUES_RECEIVE: RR, METRIC_ASPNETCORE_DIAGNOSTICS_EXCEPTIONS: Ku, METRIC_ASPNETCORE_RATE_LIMITING_ACTIVE_REQUEST_LEASES: Fu, METRIC_ASPNETCORE_RATE_LIMITING_QUEUED_REQUESTS: xu, METRIC_ASPNETCORE_RATE_LIMITING_REQUESTS: ju, METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_LEASE_DURATION: ku, METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_TIME_IN_QUEUE: Wu, METRIC_ASPNETCORE_ROUTING_MATCH_ATTEMPTS: $u, METRIC_DB_CLIENT_OPERATION_DURATION: Xu, METRIC_DOTNET_ASSEMBLY_COUNT: Qu, METRIC_DOTNET_EXCEPTIONS: qu, METRIC_DOTNET_GC_COLLECTIONS: Ju, METRIC_DOTNET_GC_HEAP_TOTAL_ALLOCATED: zu, METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_FRAGMENTATION_SIZE: Zu, METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_SIZE: tC, METRIC_DOTNET_GC_LAST_COLLECTION_MEMORY_COMMITTED_SIZE: eC, METRIC_DOTNET_GC_PAUSE_TIME: nC, METRIC_DOTNET_JIT_COMPILATION_TIME: EC, METRIC_DOTNET_JIT_COMPILED_IL_SIZE: _C, METRIC_DOTNET_JIT_COMPILED_METHODS: oC, METRIC_DOTNET_MONITOR_LOCK_CONTENTIONS: TC, METRIC_DOTNET_PROCESS_CPU_COUNT: rC, METRIC_DOTNET_PROCESS_CPU_TIME: SC, METRIC_DOTNET_PROCESS_MEMORY_WORKING_SET: sC, METRIC_DOTNET_THREAD_POOL_QUEUE_LENGTH: AC, METRIC_DOTNET_THREAD_POOL_THREAD_COUNT: cC, METRIC_DOTNET_THREAD_POOL_WORK_ITEM_COUNT: aC, METRIC_DOTNET_TIMER_COUNT: iC, METRIC_HTTP_CLIENT_REQUEST_DURATION: RC, METRIC_HTTP_SERVER_REQUEST_DURATION: NC, METRIC_JVM_CLASS_COUNT: MC, METRIC_JVM_CLASS_LOADED: OC, METRIC_JVM_CLASS_UNLOADED: PC, METRIC_JVM_CPU_COUNT: uC, METRIC_JVM_CPU_RECENT_UTILIZATION: CC, METRIC_JVM_CPU_TIME: IC, METRIC_JVM_GC_DURATION: LC, METRIC_JVM_MEMORY_COMMITTED: DC, METRIC_JVM_MEMORY_LIMIT: UC, METRIC_JVM_MEMORY_USED: pC, METRIC_JVM_MEMORY_USED_AFTER_LAST_GC: lC, METRIC_JVM_THREAD_COUNT: dC, METRIC_KESTREL_ACTIVE_CONNECTIONS: fC, METRIC_KESTREL_ACTIVE_TLS_HANDSHAKES: VC, METRIC_KESTREL_CONNECTION_DURATION: hC, METRIC_KESTREL_QUEUED_CONNECTIONS: vC, METRIC_KESTREL_QUEUED_REQUESTS: gC, METRIC_KESTREL_REJECTED_CONNECTIONS: mC, METRIC_KESTREL_TLS_HANDSHAKE_DURATION: GC, METRIC_KESTREL_UPGRADED_CONNECTIONS: BC, METRIC_SIGNALR_SERVER_ACTIVE_CONNECTIONS: yC, METRIC_SIGNALR_SERVER_CONNECTION_DURATION: YC, MessageTypeValues: YR, MessagingDestinationKindValues: iR, MessagingOperationValues: MR, NETHOSTCONNECTIONSUBTYPEVALUES_CDMA: wi, NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT: xi, NETHOSTCONNECTIONSUBTYPEVALUES_EDGE: bi, NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD: qi, NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0: Ki, NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A: Fi, NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B: Xi, NETHOSTCONNECTIONSUBTYPEVALUES_GPRS: Yi, NETHOSTCONNECTIONSUBTYPEVALUES_GSM: zi, NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA: Wi, NETHOSTCONNECTIONSUBTYPEVALUES_HSPA: ji, NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP: Ji, NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA: ki, NETHOSTCONNECTIONSUBTYPEVALUES_IDEN: $i, NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN: tR, NETHOSTCONNECTIONSUBTYPEVALUES_LTE: Qi, NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA: ER, NETHOSTCONNECTIONSUBTYPEVALUES_NR: eR, NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA: nR, NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA: Zi, NETHOSTCONNECTIONSUBTYPEVALUES_UMTS: Hi, NETHOSTCONNECTIONTYPEVALUES_CELL: mi, NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE: Gi, NETHOSTCONNECTIONTYPEVALUES_UNKNOWN: Bi, NETHOSTCONNECTIONTYPEVALUES_WIFI: vi, NETHOSTCONNECTIONTYPEVALUES_WIRED: gi, NETTRANSPORTVALUES_INPROC: fi, NETTRANSPORTVALUES_IP: pi, NETTRANSPORTVALUES_IP_TCP: Di, NETTRANSPORTVALUES_IP_UDP: Ui, NETTRANSPORTVALUES_OTHER: Vi, NETTRANSPORTVALUES_PIPE: di, NETTRANSPORTVALUES_UNIX: li, NETWORK_TRANSPORT_VALUE_PIPE: XP, NETWORK_TRANSPORT_VALUE_QUIC: QP, NETWORK_TRANSPORT_VALUE_TCP: qP, NETWORK_TRANSPORT_VALUE_UDP: JP, NETWORK_TRANSPORT_VALUE_UNIX: zP, NETWORK_TYPE_VALUE_IPV4: tu, NETWORK_TYPE_VALUE_IPV6: eu, NetHostConnectionSubtypeValues: _R, NetHostConnectionTypeValues: yi, NetTransportValues: hi, OSTYPEVALUES_AIX: tO, OSTYPEVALUES_DARWIN: XM, OSTYPEVALUES_DRAGONFLYBSD: zM, OSTYPEVALUES_FREEBSD: QM, OSTYPEVALUES_HPUX: ZM, OSTYPEVALUES_LINUX: $M, OSTYPEVALUES_NETBSD: qM, OSTYPEVALUES_OPENBSD: JM, OSTYPEVALUES_SOLARIS: eO, OSTYPEVALUES_WINDOWS: jM, OSTYPEVALUES_Z_OS: nO, OTEL_STATUS_CODE_VALUE_ERROR: ou, OTEL_STATUS_CODE_VALUE_OK: Tu, OsTypeValues: EO, RPCGRPCSTATUSCODEVALUES_ABORTED: dR, RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS: DR, RPCGRPCSTATUSCODEVALUES_CANCELLED: PR, RPCGRPCSTATUSCODEVALUES_DATA_LOSS: gR, RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED: IR, RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION: lR, RPCGRPCSTATUSCODEVALUES_INTERNAL: hR, RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT: CR, RPCGRPCSTATUSCODEVALUES_NOT_FOUND: LR, RPCGRPCSTATUSCODEVALUES_OK: OR, RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE: fR, RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED: UR, RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED: pR, RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED: mR, RPCGRPCSTATUSCODEVALUES_UNAVAILABLE: vR, RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED: VR, RPCGRPCSTATUSCODEVALUES_UNKNOWN: uR, RpcGrpcStatusCodeValues: GR, SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET: Ac, SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS: Lc, SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ: rc, SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY: Ec, SEMATTRS_AWS_DYNAMODB_COUNT: Cc, SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE: Nc, SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES: ic, SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES: Dc, SEMATTRS_AWS_DYNAMODB_INDEX_NAME: cc, SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS: _c, SEMATTRS_AWS_DYNAMODB_LIMIT: sc, SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES: Rc, SEMATTRS_AWS_DYNAMODB_PROJECTION: Sc, SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY: oc, SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY: Tc, SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT: Ic, SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD: Oc, SEMATTRS_AWS_DYNAMODB_SEGMENT: Pc, SEMATTRS_AWS_DYNAMODB_SELECT: ac, SEMATTRS_AWS_DYNAMODB_TABLE_COUNT: Mc, SEMATTRS_AWS_DYNAMODB_TABLE_NAMES: nc, SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS: uc, SEMATTRS_AWS_LAMBDA_INVOKED_ARN: Bs, SEMATTRS_CODE_FILEPATH: HA, SEMATTRS_CODE_FUNCTION: YA, SEMATTRS_CODE_LINENO: wA, SEMATTRS_CODE_NAMESPACE: bA, SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL: js, SEMATTRS_DB_CASSANDRA_COORDINATOR_DC: Js, SEMATTRS_DB_CASSANDRA_COORDINATOR_ID: qs, SEMATTRS_DB_CASSANDRA_IDEMPOTENCE: Xs, SEMATTRS_DB_CASSANDRA_KEYSPACE: Ws, SEMATTRS_DB_CASSANDRA_PAGE_SIZE: ks, SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT: Qs, SEMATTRS_DB_CASSANDRA_TABLE: $s, SEMATTRS_DB_CONNECTION_STRING: Ys, SEMATTRS_DB_HBASE_NAMESPACE: zs, SEMATTRS_DB_JDBC_DRIVER_CLASSNAME: Hs, SEMATTRS_DB_MONGODB_COLLECTION: tA, SEMATTRS_DB_MSSQL_INSTANCE_NAME: xs, SEMATTRS_DB_NAME: ws, SEMATTRS_DB_OPERATION: Fs, SEMATTRS_DB_REDIS_DATABASE_INDEX: Zs, SEMATTRS_DB_SQL_TABLE: eA, SEMATTRS_DB_STATEMENT: Ks, SEMATTRS_DB_SYSTEM: ys, SEMATTRS_DB_USER: bs, SEMATTRS_ENDUSER_ID: gA, SEMATTRS_ENDUSER_ROLE: mA, SEMATTRS_ENDUSER_SCOPE: GA, SEMATTRS_EXCEPTION_ESCAPED: oA, SEMATTRS_EXCEPTION_MESSAGE: EA, SEMATTRS_EXCEPTION_STACKTRACE: _A, SEMATTRS_EXCEPTION_TYPE: nA, SEMATTRS_FAAS_COLDSTART: RA, SEMATTRS_FAAS_CRON: iA, SEMATTRS_FAAS_DOCUMENT_COLLECTION: SA, SEMATTRS_FAAS_DOCUMENT_NAME: cA, SEMATTRS_FAAS_DOCUMENT_OPERATION: sA, SEMATTRS_FAAS_DOCUMENT_TIME: AA, SEMATTRS_FAAS_EXECUTION: rA, SEMATTRS_FAAS_INVOKED_NAME: NA, SEMATTRS_FAAS_INVOKED_PROVIDER: MA, SEMATTRS_FAAS_INVOKED_REGION: OA, SEMATTRS_FAAS_TIME: aA, SEMATTRS_FAAS_TRIGGER: TA, SEMATTRS_HTTP_CLIENT_IP: ec, SEMATTRS_HTTP_FLAVOR: $A, SEMATTRS_HTTP_HOST: WA, SEMATTRS_HTTP_METHOD: KA, SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH: QA, SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED: qA, SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH: JA, SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED: zA, SEMATTRS_HTTP_ROUTE: tc, SEMATTRS_HTTP_SCHEME: kA, SEMATTRS_HTTP_SERVER_NAME: ZA, SEMATTRS_HTTP_STATUS_CODE: jA, SEMATTRS_HTTP_TARGET: xA, SEMATTRS_HTTP_URL: FA, SEMATTRS_HTTP_USER_AGENT: XA, SEMATTRS_MESSAGE_COMPRESSED_SIZE: Zc, SEMATTRS_MESSAGE_ID: zc, SEMATTRS_MESSAGE_TYPE: Jc, SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE: ta, SEMATTRS_MESSAGING_CONSUMER_ID: yc, SEMATTRS_MESSAGING_CONVERSATION_ID: gc, SEMATTRS_MESSAGING_DESTINATION: pc, SEMATTRS_MESSAGING_DESTINATION_KIND: lc, SEMATTRS_MESSAGING_KAFKA_CLIENT_ID: wc, SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP: Hc, SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY: bc, SEMATTRS_MESSAGING_KAFKA_PARTITION: Kc, SEMATTRS_MESSAGING_KAFKA_TOMBSTONE: Fc, SEMATTRS_MESSAGING_MESSAGE_ID: vc, SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES: Gc, SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES: mc, SEMATTRS_MESSAGING_OPERATION: Bc, SEMATTRS_MESSAGING_PROTOCOL: fc, SEMATTRS_MESSAGING_PROTOCOL_VERSION: Vc, SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY: Yc, SEMATTRS_MESSAGING_SYSTEM: Uc, SEMATTRS_MESSAGING_TEMP_DESTINATION: dc, SEMATTRS_MESSAGING_URL: hc, SEMATTRS_NET_HOST_CARRIER_ICC: hA, SEMATTRS_NET_HOST_CARRIER_MCC: fA, SEMATTRS_NET_HOST_CARRIER_MNC: VA, SEMATTRS_NET_HOST_CARRIER_NAME: dA, SEMATTRS_NET_HOST_CONNECTION_SUBTYPE: lA, SEMATTRS_NET_HOST_CONNECTION_TYPE: pA, SEMATTRS_NET_HOST_IP: LA, SEMATTRS_NET_HOST_NAME: UA, SEMATTRS_NET_HOST_PORT: DA, SEMATTRS_NET_PEER_IP: uA, SEMATTRS_NET_PEER_NAME: IA, SEMATTRS_NET_PEER_PORT: CA, SEMATTRS_NET_TRANSPORT: PA, SEMATTRS_PEER_SERVICE: vA, SEMATTRS_RPC_GRPC_STATUS_CODE: jc, SEMATTRS_RPC_JSONRPC_ERROR_CODE: Qc, SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE: qc, SEMATTRS_RPC_JSONRPC_REQUEST_ID: Xc, SEMATTRS_RPC_JSONRPC_VERSION: $c, SEMATTRS_RPC_METHOD: kc, SEMATTRS_RPC_SERVICE: Wc, SEMATTRS_RPC_SYSTEM: xc, SEMATTRS_THREAD_ID: BA, SEMATTRS_THREAD_NAME: yA, SEMRESATTRS_AWS_ECS_CLUSTER_ARN: WR, SEMRESATTRS_AWS_ECS_CONTAINER_ARN: xR, SEMRESATTRS_AWS_ECS_LAUNCHTYPE: kR, SEMRESATTRS_AWS_ECS_TASK_ARN: jR, SEMRESATTRS_AWS_ECS_TASK_FAMILY: $R, SEMRESATTRS_AWS_ECS_TASK_REVISION: XR, SEMRESATTRS_AWS_EKS_CLUSTER_ARN: QR, SEMRESATTRS_AWS_LOG_GROUP_ARNS: JR, SEMRESATTRS_AWS_LOG_GROUP_NAMES: qR, SEMRESATTRS_AWS_LOG_STREAM_ARNS: ZR, SEMRESATTRS_AWS_LOG_STREAM_NAMES: zR, SEMRESATTRS_CLOUD_ACCOUNT_ID: HR, SEMRESATTRS_CLOUD_AVAILABILITY_ZONE: KR, SEMRESATTRS_CLOUD_PLATFORM: FR, SEMRESATTRS_CLOUD_PROVIDER: bR, SEMRESATTRS_CLOUD_REGION: wR, SEMRESATTRS_CONTAINER_ID: eN, SEMRESATTRS_CONTAINER_IMAGE_NAME: EN, SEMRESATTRS_CONTAINER_IMAGE_TAG: _N, SEMRESATTRS_CONTAINER_NAME: tN, SEMRESATTRS_CONTAINER_RUNTIME: nN, SEMRESATTRS_DEPLOYMENT_ENVIRONMENT: oN, SEMRESATTRS_DEVICE_ID: TN, SEMRESATTRS_DEVICE_MODEL_IDENTIFIER: rN, SEMRESATTRS_DEVICE_MODEL_NAME: SN, SEMRESATTRS_FAAS_ID: AN, SEMRESATTRS_FAAS_INSTANCE: aN, SEMRESATTRS_FAAS_MAX_MEMORY: iN, SEMRESATTRS_FAAS_NAME: sN, SEMRESATTRS_FAAS_VERSION: cN, SEMRESATTRS_HOST_ARCH: ON, SEMRESATTRS_HOST_ID: RN, SEMRESATTRS_HOST_IMAGE_ID: uN, SEMRESATTRS_HOST_IMAGE_NAME: PN, SEMRESATTRS_HOST_IMAGE_VERSION: CN, SEMRESATTRS_HOST_NAME: NN, SEMRESATTRS_HOST_TYPE: MN, SEMRESATTRS_K8S_CLUSTER_NAME: IN, SEMRESATTRS_K8S_CONTAINER_NAME: dN, SEMRESATTRS_K8S_CRONJOB_NAME: HN, SEMRESATTRS_K8S_CRONJOB_UID: bN, SEMRESATTRS_K8S_DAEMONSET_NAME: BN, SEMRESATTRS_K8S_DAEMONSET_UID: GN, SEMRESATTRS_K8S_DEPLOYMENT_NAME: vN, SEMRESATTRS_K8S_DEPLOYMENT_UID: hN, SEMRESATTRS_K8S_JOB_NAME: YN, SEMRESATTRS_K8S_JOB_UID: yN, SEMRESATTRS_K8S_NAMESPACE_NAME: UN, SEMRESATTRS_K8S_NODE_NAME: LN, SEMRESATTRS_K8S_NODE_UID: DN, SEMRESATTRS_K8S_POD_NAME: lN, SEMRESATTRS_K8S_POD_UID: pN, SEMRESATTRS_K8S_REPLICASET_NAME: VN, SEMRESATTRS_K8S_REPLICASET_UID: fN, SEMRESATTRS_K8S_STATEFULSET_NAME: mN, SEMRESATTRS_K8S_STATEFULSET_UID: gN, SEMRESATTRS_OS_DESCRIPTION: KN, SEMRESATTRS_OS_NAME: FN, SEMRESATTRS_OS_TYPE: wN, SEMRESATTRS_OS_VERSION: xN, SEMRESATTRS_PROCESS_COMMAND: $N, SEMRESATTRS_PROCESS_COMMAND_ARGS: QN, SEMRESATTRS_PROCESS_COMMAND_LINE: XN, SEMRESATTRS_PROCESS_EXECUTABLE_NAME: kN, SEMRESATTRS_PROCESS_EXECUTABLE_PATH: jN, SEMRESATTRS_PROCESS_OWNER: qN, SEMRESATTRS_PROCESS_PID: WN, SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION: ZN, SEMRESATTRS_PROCESS_RUNTIME_NAME: JN, SEMRESATTRS_PROCESS_RUNTIME_VERSION: zN, SEMRESATTRS_SERVICE_INSTANCE_ID: nM, SEMRESATTRS_SERVICE_NAME: tM, SEMRESATTRS_SERVICE_NAMESPACE: eM, SEMRESATTRS_SERVICE_VERSION: EM, SEMRESATTRS_TELEMETRY_AUTO_VERSION: rM, SEMRESATTRS_TELEMETRY_SDK_LANGUAGE: oM, SEMRESATTRS_TELEMETRY_SDK_NAME: _M, SEMRESATTRS_TELEMETRY_SDK_VERSION: TM, SEMRESATTRS_WEBENGINE_DESCRIPTION: AM, SEMRESATTRS_WEBENGINE_NAME: SM, SEMRESATTRS_WEBENGINE_VERSION: sM, SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN: iu, SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE: Ru, SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT: Nu, SIGNALR_TRANSPORT_VALUE_LONG_POLLING: Ou, SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS: Pu, SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS: uu, SemanticAttributes: ea, SemanticResourceAttributes: cM, TELEMETRYSDKLANGUAGEVALUES_CPP: _O, TELEMETRYSDKLANGUAGEVALUES_DOTNET: oO, TELEMETRYSDKLANGUAGEVALUES_ERLANG: TO, TELEMETRYSDKLANGUAGEVALUES_GO: rO, TELEMETRYSDKLANGUAGEVALUES_JAVA: SO, TELEMETRYSDKLANGUAGEVALUES_NODEJS: sO, TELEMETRYSDKLANGUAGEVALUES_PHP: AO, TELEMETRYSDKLANGUAGEVALUES_PYTHON: cO, TELEMETRYSDKLANGUAGEVALUES_RUBY: aO, TELEMETRYSDKLANGUAGEVALUES_WEBJS: iO, TELEMETRY_SDK_LANGUAGE_VALUE_CPP: Iu, TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET: Lu, TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG: Du, TELEMETRY_SDK_LANGUAGE_VALUE_GO: Uu, TELEMETRY_SDK_LANGUAGE_VALUE_JAVA: pu, TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS: lu, TELEMETRY_SDK_LANGUAGE_VALUE_PHP: du, TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON: fu, TELEMETRY_SDK_LANGUAGE_VALUE_RUBY: Vu, TELEMETRY_SDK_LANGUAGE_VALUE_RUST: hu, TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT: vu, TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS: gu, TelemetrySdkLanguageValues: RO }, Symbol.toStringTag, { value: "Module" })), k = vt(bC);
var V = {}, w = { exports: {} }, HC = w.exports, Lt;
function wC() {
  return Lt || (Lt = 1, function(t) {
    (function(e) {
      const n = "(0?\\d+|0x[a-f0-9]+)", _ = { fourOctet: new RegExp(`^${n}\\.${n}\\.${n}\\.${n}$`, "i"), threeOctet: new RegExp(`^${n}\\.${n}\\.${n}$`, "i"), twoOctet: new RegExp(`^${n}\\.${n}$`, "i"), longValue: new RegExp(`^${n}$`, "i") }, T = new RegExp("^0[0-7]+$", "i"), S = new RegExp("^0x[a-f0-9]+$", "i"), A = "%[0-9a-z]{1,}", R = "(?:[0-9a-f]+::?)+", N = { zoneIndex: new RegExp(A, "i"), native: new RegExp(`^(::)?(${R})?([0-9a-f]+)?(::)?(${A})?$`, "i"), deprecatedTransitional: new RegExp(`^(?:::)(${n}\\.${n}\\.${n}\\.${n}(${A})?)$`, "i"), transitional: new RegExp(`^((?:${R})|(?:::)(?:${R})?)${n}\\.${n}\\.${n}\\.${n}(${A})?$`, "i") };
      function P(E, o) {
        if (E.indexOf("::") !== E.lastIndexOf("::")) return null;
        let s = 0, r = -1, c = (E.match(N.zoneIndex) || [])[0], a, u;
        for (c && (c = c.substring(1), E = E.replace(/%.+$/, "")); (r = E.indexOf(":", r + 1)) >= 0; ) s++;
        if (E.substr(0, 2) === "::" && s--, E.substr(-2, 2) === "::" && s--, s > o) return null;
        for (u = o - s, a = ":"; u--; ) a += "0:";
        return E = E.replace("::", a), E[0] === ":" && (E = E.slice(1)), E[E.length - 1] === ":" && (E = E.slice(0, -1)), o = function() {
          const Mt = E.split(":"), Ot = [];
          for (let j = 0; j < Mt.length; j++) Ot.push(parseInt(Mt[j], 16));
          return Ot;
        }(), { parts: o, zoneId: c };
      }
      function M(E, o, s, r) {
        if (E.length !== o.length) throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
        let c = 0, a;
        for (; r > 0; ) {
          if (a = s - r, a < 0 && (a = 0), E[c] >> a !== o[c] >> a) return false;
          r -= s, c += 1;
        }
        return true;
      }
      function O(E) {
        if (S.test(E)) return parseInt(E, 16);
        if (E[0] === "0" && !isNaN(parseInt(E[1], 10))) {
          if (T.test(E)) return parseInt(E, 8);
          throw new Error(`ipaddr: cannot parse ${E} as octal`);
        }
        return parseInt(E, 10);
      }
      function I(E, o) {
        for (; E.length < o; ) E = `0${E}`;
        return E;
      }
      const i = {};
      i.IPv4 = function() {
        function E(o) {
          if (o.length !== 4) throw new Error("ipaddr: ipv4 octet count should be 4");
          let s, r;
          for (s = 0; s < o.length; s++) if (r = o[s], !(0 <= r && r <= 255)) throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
          this.octets = o;
        }
        return E.prototype.SpecialRanges = { unspecified: [[new E([0, 0, 0, 0]), 8]], broadcast: [[new E([255, 255, 255, 255]), 32]], multicast: [[new E([224, 0, 0, 0]), 4]], linkLocal: [[new E([169, 254, 0, 0]), 16]], loopback: [[new E([127, 0, 0, 0]), 8]], carrierGradeNat: [[new E([100, 64, 0, 0]), 10]], private: [[new E([10, 0, 0, 0]), 8], [new E([172, 16, 0, 0]), 12], [new E([192, 168, 0, 0]), 16]], reserved: [[new E([192, 0, 0, 0]), 24], [new E([192, 0, 2, 0]), 24], [new E([192, 88, 99, 0]), 24], [new E([198, 18, 0, 0]), 15], [new E([198, 51, 100, 0]), 24], [new E([203, 0, 113, 0]), 24], [new E([240, 0, 0, 0]), 4]], as112: [[new E([192, 175, 48, 0]), 24], [new E([192, 31, 196, 0]), 24]], amt: [[new E([192, 52, 193, 0]), 24]] }, E.prototype.kind = function() {
          return "ipv4";
        }, E.prototype.match = function(o, s) {
          let r;
          if (s === void 0 && (r = o, o = r[0], s = r[1]), o.kind() !== "ipv4") throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
          return M(this.octets, o.octets, 8, s);
        }, E.prototype.prefixLengthFromSubnetMask = function() {
          let o = 0, s = false;
          const r = { 0: 8, 128: 7, 192: 6, 224: 5, 240: 4, 248: 3, 252: 2, 254: 1, 255: 0 };
          let c, a, u;
          for (c = 3; c >= 0; c -= 1) if (a = this.octets[c], a in r) {
            if (u = r[a], s && u !== 0) return null;
            u !== 8 && (s = true), o += u;
          } else return null;
          return 32 - o;
        }, E.prototype.range = function() {
          return i.subnetMatch(this, this.SpecialRanges);
        }, E.prototype.toByteArray = function() {
          return this.octets.slice(0);
        }, E.prototype.toIPv4MappedAddress = function() {
          return i.IPv6.parse(`::ffff:${this.toString()}`);
        }, E.prototype.toNormalizedString = function() {
          return this.toString();
        }, E.prototype.toString = function() {
          return this.octets.join(".");
        }, E;
      }(), i.IPv4.broadcastAddressFromCIDR = function(E) {
        try {
          const o = this.parseCIDR(E), s = o[0].toByteArray(), r = this.subnetMaskFromPrefixLength(o[1]).toByteArray(), c = [];
          let a = 0;
          for (; a < 4; ) c.push(parseInt(s[a], 10) | parseInt(r[a], 10) ^ 255), a++;
          return new this(c);
        } catch {
          throw new Error("ipaddr: the address does not have IPv4 CIDR format");
        }
      }, i.IPv4.isIPv4 = function(E) {
        return this.parser(E) !== null;
      }, i.IPv4.isValid = function(E) {
        try {
          return new this(this.parser(E)), true;
        } catch {
          return false;
        }
      }, i.IPv4.isValidCIDR = function(E) {
        try {
          return this.parseCIDR(E), true;
        } catch {
          return false;
        }
      }, i.IPv4.isValidFourPartDecimal = function(E) {
        return !!(i.IPv4.isValid(E) && E.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/));
      }, i.IPv4.networkAddressFromCIDR = function(E) {
        let o, s, r, c, a;
        try {
          for (o = this.parseCIDR(E), r = o[0].toByteArray(), a = this.subnetMaskFromPrefixLength(o[1]).toByteArray(), c = [], s = 0; s < 4; ) c.push(parseInt(r[s], 10) & parseInt(a[s], 10)), s++;
          return new this(c);
        } catch {
          throw new Error("ipaddr: the address does not have IPv4 CIDR format");
        }
      }, i.IPv4.parse = function(E) {
        const o = this.parser(E);
        if (o === null) throw new Error("ipaddr: string is not formatted like an IPv4 Address");
        return new this(o);
      }, i.IPv4.parseCIDR = function(E) {
        let o;
        if (o = E.match(/^(.+)\/(\d+)$/)) {
          const s = parseInt(o[2]);
          if (s >= 0 && s <= 32) {
            const r = [this.parse(o[1]), s];
            return Object.defineProperty(r, "toString", { value: function() {
              return this.join("/");
            } }), r;
          }
        }
        throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");
      }, i.IPv4.parser = function(E) {
        let o, s, r;
        if (o = E.match(_.fourOctet)) return function() {
          const c = o.slice(1, 6), a = [];
          for (let u = 0; u < c.length; u++) s = c[u], a.push(O(s));
          return a;
        }();
        if (o = E.match(_.longValue)) {
          if (r = O(o[1]), r > 4294967295 || r < 0) throw new Error("ipaddr: address outside defined range");
          return function() {
            const c = [];
            let a;
            for (a = 0; a <= 24; a += 8) c.push(r >> a & 255);
            return c;
          }().reverse();
        } else return (o = E.match(_.twoOctet)) ? function() {
          const c = o.slice(1, 4), a = [];
          if (r = O(c[1]), r > 16777215 || r < 0) throw new Error("ipaddr: address outside defined range");
          return a.push(O(c[0])), a.push(r >> 16 & 255), a.push(r >> 8 & 255), a.push(r & 255), a;
        }() : (o = E.match(_.threeOctet)) ? function() {
          const c = o.slice(1, 5), a = [];
          if (r = O(c[2]), r > 65535 || r < 0) throw new Error("ipaddr: address outside defined range");
          return a.push(O(c[0])), a.push(O(c[1])), a.push(r >> 8 & 255), a.push(r & 255), a;
        }() : null;
      }, i.IPv4.subnetMaskFromPrefixLength = function(E) {
        if (E = parseInt(E), E < 0 || E > 32) throw new Error("ipaddr: invalid IPv4 prefix length");
        const o = [0, 0, 0, 0];
        let s = 0;
        const r = Math.floor(E / 8);
        for (; s < r; ) o[s] = 255, s++;
        return r < 4 && (o[r] = Math.pow(2, E % 8) - 1 << 8 - E % 8), new this(o);
      }, i.IPv6 = function() {
        function E(o, s) {
          let r, c;
          if (o.length === 16) for (this.parts = [], r = 0; r <= 14; r += 2) this.parts.push(o[r] << 8 | o[r + 1]);
          else if (o.length === 8) this.parts = o;
          else throw new Error("ipaddr: ipv6 part count should be 8 or 16");
          for (r = 0; r < this.parts.length; r++) if (c = this.parts[r], !(0 <= c && c <= 65535)) throw new Error("ipaddr: ipv6 part should fit in 16 bits");
          s && (this.zoneId = s);
        }
        return E.prototype.SpecialRanges = { unspecified: [new E([0, 0, 0, 0, 0, 0, 0, 0]), 128], linkLocal: [new E([65152, 0, 0, 0, 0, 0, 0, 0]), 10], multicast: [new E([65280, 0, 0, 0, 0, 0, 0, 0]), 8], loopback: [new E([0, 0, 0, 0, 0, 0, 0, 1]), 128], uniqueLocal: [new E([64512, 0, 0, 0, 0, 0, 0, 0]), 7], ipv4Mapped: [new E([0, 0, 0, 0, 0, 65535, 0, 0]), 96], discard: [new E([256, 0, 0, 0, 0, 0, 0, 0]), 64], rfc6145: [new E([0, 0, 0, 0, 65535, 0, 0, 0]), 96], rfc6052: [new E([100, 65435, 0, 0, 0, 0, 0, 0]), 96], "6to4": [new E([8194, 0, 0, 0, 0, 0, 0, 0]), 16], teredo: [new E([8193, 0, 0, 0, 0, 0, 0, 0]), 32], benchmarking: [new E([8193, 2, 0, 0, 0, 0, 0, 0]), 48], amt: [new E([8193, 3, 0, 0, 0, 0, 0, 0]), 32], as112v6: [[new E([8193, 4, 274, 0, 0, 0, 0, 0]), 48], [new E([9760, 79, 32768, 0, 0, 0, 0, 0]), 48]], deprecated: [new E([8193, 16, 0, 0, 0, 0, 0, 0]), 28], orchid2: [new E([8193, 32, 0, 0, 0, 0, 0, 0]), 28], droneRemoteIdProtocolEntityTags: [new E([8193, 48, 0, 0, 0, 0, 0, 0]), 28], reserved: [[new E([8193, 0, 0, 0, 0, 0, 0, 0]), 23], [new E([8193, 3512, 0, 0, 0, 0, 0, 0]), 32]] }, E.prototype.isIPv4MappedAddress = function() {
          return this.range() === "ipv4Mapped";
        }, E.prototype.kind = function() {
          return "ipv6";
        }, E.prototype.match = function(o, s) {
          let r;
          if (s === void 0 && (r = o, o = r[0], s = r[1]), o.kind() !== "ipv6") throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
          return M(this.parts, o.parts, 16, s);
        }, E.prototype.prefixLengthFromSubnetMask = function() {
          let o = 0, s = false;
          const r = { 0: 16, 32768: 15, 49152: 14, 57344: 13, 61440: 12, 63488: 11, 64512: 10, 65024: 9, 65280: 8, 65408: 7, 65472: 6, 65504: 5, 65520: 4, 65528: 3, 65532: 2, 65534: 1, 65535: 0 };
          let c, a;
          for (let u = 7; u >= 0; u -= 1) if (c = this.parts[u], c in r) {
            if (a = r[c], s && a !== 0) return null;
            a !== 16 && (s = true), o += a;
          } else return null;
          return 128 - o;
        }, E.prototype.range = function() {
          return i.subnetMatch(this, this.SpecialRanges);
        }, E.prototype.toByteArray = function() {
          let o;
          const s = [], r = this.parts;
          for (let c = 0; c < r.length; c++) o = r[c], s.push(o >> 8), s.push(o & 255);
          return s;
        }, E.prototype.toFixedLengthString = function() {
          const o = (function() {
            const r = [];
            for (let c = 0; c < this.parts.length; c++) r.push(I(this.parts[c].toString(16), 4));
            return r;
          }).call(this).join(":");
          let s = "";
          return this.zoneId && (s = `%${this.zoneId}`), o + s;
        }, E.prototype.toIPv4Address = function() {
          if (!this.isIPv4MappedAddress()) throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
          const o = this.parts.slice(-2), s = o[0], r = o[1];
          return new i.IPv4([s >> 8, s & 255, r >> 8, r & 255]);
        }, E.prototype.toNormalizedString = function() {
          const o = (function() {
            const r = [];
            for (let c = 0; c < this.parts.length; c++) r.push(this.parts[c].toString(16));
            return r;
          }).call(this).join(":");
          let s = "";
          return this.zoneId && (s = `%${this.zoneId}`), o + s;
        }, E.prototype.toRFC5952String = function() {
          const o = /((^|:)(0(:|$)){2,})/g, s = this.toNormalizedString();
          let r = 0, c = -1, a;
          for (; a = o.exec(s); ) a[0].length > c && (r = a.index, c = a[0].length);
          return c < 0 ? s : `${s.substring(0, r)}::${s.substring(r + c)}`;
        }, E.prototype.toString = function() {
          return this.toRFC5952String();
        }, E;
      }(), i.IPv6.broadcastAddressFromCIDR = function(E) {
        try {
          const o = this.parseCIDR(E), s = o[0].toByteArray(), r = this.subnetMaskFromPrefixLength(o[1]).toByteArray(), c = [];
          let a = 0;
          for (; a < 16; ) c.push(parseInt(s[a], 10) | parseInt(r[a], 10) ^ 255), a++;
          return new this(c);
        } catch (o) {
          throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${o})`);
        }
      }, i.IPv6.isIPv6 = function(E) {
        return this.parser(E) !== null;
      }, i.IPv6.isValid = function(E) {
        if (typeof E == "string" && E.indexOf(":") === -1) return false;
        try {
          const o = this.parser(E);
          return new this(o.parts, o.zoneId), true;
        } catch {
          return false;
        }
      }, i.IPv6.isValidCIDR = function(E) {
        if (typeof E == "string" && E.indexOf(":") === -1) return false;
        try {
          return this.parseCIDR(E), true;
        } catch {
          return false;
        }
      }, i.IPv6.networkAddressFromCIDR = function(E) {
        let o, s, r, c, a;
        try {
          for (o = this.parseCIDR(E), r = o[0].toByteArray(), a = this.subnetMaskFromPrefixLength(o[1]).toByteArray(), c = [], s = 0; s < 16; ) c.push(parseInt(r[s], 10) & parseInt(a[s], 10)), s++;
          return new this(c);
        } catch (u) {
          throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${u})`);
        }
      }, i.IPv6.parse = function(E) {
        const o = this.parser(E);
        if (o.parts === null) throw new Error("ipaddr: string is not formatted like an IPv6 Address");
        return new this(o.parts, o.zoneId);
      }, i.IPv6.parseCIDR = function(E) {
        let o, s, r;
        if ((s = E.match(/^(.+)\/(\d+)$/)) && (o = parseInt(s[2]), o >= 0 && o <= 128)) return r = [this.parse(s[1]), o], Object.defineProperty(r, "toString", { value: function() {
          return this.join("/");
        } }), r;
        throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");
      }, i.IPv6.parser = function(E) {
        let o, s, r, c, a, u;
        if (r = E.match(N.deprecatedTransitional)) return this.parser(`::ffff:${r[1]}`);
        if (N.native.test(E)) return P(E, 8);
        if ((r = E.match(N.transitional)) && (u = r[6] || "", o = r[1], r[1].endsWith("::") || (o = o.slice(0, -1)), o = P(o + u, 6), o.parts)) {
          for (a = [parseInt(r[2]), parseInt(r[3]), parseInt(r[4]), parseInt(r[5])], s = 0; s < a.length; s++) if (c = a[s], !(0 <= c && c <= 255)) return null;
          return o.parts.push(a[0] << 8 | a[1]), o.parts.push(a[2] << 8 | a[3]), { parts: o.parts, zoneId: o.zoneId };
        }
        return null;
      }, i.IPv6.subnetMaskFromPrefixLength = function(E) {
        if (E = parseInt(E), E < 0 || E > 128) throw new Error("ipaddr: invalid IPv6 prefix length");
        const o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let s = 0;
        const r = Math.floor(E / 8);
        for (; s < r; ) o[s] = 255, s++;
        return r < 16 && (o[r] = Math.pow(2, E % 8) - 1 << 8 - E % 8), new this(o);
      }, i.fromByteArray = function(E) {
        const o = E.length;
        if (o === 4) return new i.IPv4(E);
        if (o === 16) return new i.IPv6(E);
        throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address");
      }, i.isValid = function(E) {
        return i.IPv6.isValid(E) || i.IPv4.isValid(E);
      }, i.isValidCIDR = function(E) {
        return i.IPv6.isValidCIDR(E) || i.IPv4.isValidCIDR(E);
      }, i.parse = function(E) {
        if (i.IPv6.isValid(E)) return i.IPv6.parse(E);
        if (i.IPv4.isValid(E)) return i.IPv4.parse(E);
        throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
      }, i.parseCIDR = function(E) {
        try {
          return i.IPv6.parseCIDR(E);
        } catch {
          try {
            return i.IPv4.parseCIDR(E);
          } catch {
            throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");
          }
        }
      }, i.process = function(E) {
        const o = this.parse(E);
        return o.kind() === "ipv6" && o.isIPv4MappedAddress() ? o.toIPv4Address() : o;
      }, i.subnetMatch = function(E, o, s) {
        let r, c, a, u;
        s == null && (s = "unicast");
        for (c in o) if (Object.prototype.hasOwnProperty.call(o, c)) {
          for (a = o[c], a[0] && !(a[0] instanceof Array) && (a = [a]), r = 0; r < a.length; r++) if (u = a[r], E.kind() === u[0].kind() && E.match.apply(E, u)) return c;
        }
        return s;
      }, t.exports ? t.exports = i : e.ipaddr = i;
    })(HC);
  }(w)), w.exports;
}
var Dt;
function AS() {
  if (Dt) return V;
  Dt = 1, Object.defineProperty(V, "__esModule", { value: true }), V.getMethodAttributes = _, V.getStatusAttributes = T, V.getPeerAttributes = S;
  const t = k, e = wC(), n = Tt();
  function _(A) {
    const [, R, N] = A.split("/");
    return { [t.SEMATTRS_RPC_SYSTEM]: "grpc", [t.SEMATTRS_RPC_SERVICE]: R, [t.SEMATTRS_RPC_METHOD]: N };
  }
  function T(A) {
    return { [t.SEMATTRS_RPC_GRPC_STATUS_CODE]: A, "rpc.grpc.status_text": n.Status[A] };
  }
  function S(A) {
    const R = A.lastIndexOf(":");
    if (R === -1) return { [t.SEMATTRS_NET_PEER_NAME]: A };
    const N = A.slice(0, R), P = +A.slice(R + 1);
    return Number.isNaN(P) ? { [t.SEMATTRS_NET_PEER_NAME]: A } : e.isValid(N) ? { [t.SEMATTRS_NET_PEER_IP]: N, [t.SEMATTRS_NET_PEER_PORT]: P } : { [t.SEMATTRS_NET_PEER_NAME]: N, [t.SEMATTRS_NET_PEER_PORT]: P };
  }
  return V;
}
var U = {}, Ut;
function cS() {
  return Ut || (Ut = 1, Object.defineProperty(U, "__esModule", { value: true }), U.metadataGetter = U.metadataSetter = void 0, U.metadataSetter = { set(t, e, n) {
    t.set(e, n);
  } }, U.metadataGetter = { get: (t, e) => t.get(e), keys: (t) => Array.from(t, ([e]) => e) }), U;
}
var p = {}, v = {}, pt;
function KC() {
  return pt || (pt = 1, Object.defineProperty(v, "__esModule", { value: true }), v.VERSION = void 0, v.VERSION = "0.1.18"), v;
}
var lt;
function aS() {
  if (lt) return p;
  lt = 1, Object.defineProperty(p, "__esModule", { value: true }), p.tracer = void 0, p.getSpanName = _, p.emitSpanEvents = T;
  const t = W, e = k, n = KC();
  p.tracer = t.trace.getTracer("nice-grpc-opentelemetry", n.VERSION);
  function _(S) {
    return S.slice(1);
  }
  async function* T(S, A, R) {
    let N = 1;
    for await (const P of S) A.addEvent("message", { [e.SEMATTRS_MESSAGE_TYPE]: R, [e.SEMATTRS_MESSAGE_ID]: N++ }), yield P;
  }
  return p;
}
var b = {}, dt;
function iS() {
  if (dt) return b;
  dt = 1, Object.defineProperty(b, "__esModule", { value: true }), b.bindAsyncGenerator = e;
  const t = W;
  function e(n, _) {
    return { next: t.context.bind(n, _.next.bind(_)), return: t.context.bind(n, _.return.bind(_)), throw: t.context.bind(n, _.throw.bind(_)), [Symbol.asyncIterator]() {
      return e(n, _[Symbol.asyncIterator]());
    } };
  }
  return b;
}
var ft;
function FC() {
  if (ft) return Y;
  ft = 1, Object.defineProperty(Y, "__esModule", { value: true }), Y.openTelemetryServerMiddleware = N;
  const t = W, e = k, n = gt, _ = Tt(), T = AS(), S = cS(), A = aS(), R = iS();
  function N() {
    return (M, O) => A.tracer.startActiveSpan((0, A.getSpanName)(M.method.path), { kind: t.SpanKind.SERVER }, t.propagation.extract(t.ROOT_CONTEXT, O.metadata, S.metadataGetter), (I) => (0, R.bindAsyncGenerator)(t.context.active(), P(I, M, O)));
  }
  async function* P(M, O, I) {
    const i = { ...(0, T.getMethodAttributes)(O.method.path), ...(0, T.getPeerAttributes)(I.peer) };
    M.setAttributes(i);
    let E = _.Status.OK, o;
    try {
      let s;
      if (O.requestStream ? s = (0, A.emitSpanEvents)(O.request, M, e.MESSAGETYPEVALUES_RECEIVED) : s = O.request, O.responseStream) {
        yield* (0, A.emitSpanEvents)(O.next(s, I), M, e.MESSAGETYPEVALUES_SENT);
        return;
      } else return yield* O.next(s, I);
    } catch (s) {
      throw s instanceof _.ServerError ? (E = s.code, o = s.details) : (0, n.isAbortError)(s) ? (E = _.Status.CANCELLED, o = "The operation was cancelled") : (E = _.Status.UNKNOWN, o = "Unknown server error occurred", M.recordException(s)), s;
    } finally {
      const s = (0, T.getStatusAttributes)(E);
      M.setAttributes(s), E !== _.Status.OK && M.setStatus({ code: t.SpanStatusCode.ERROR, message: `${_.Status[E]}: ${o}` }), M.end();
    }
  }
  return Y;
}
var H = {}, Vt;
function xC() {
  if (Vt) return H;
  Vt = 1, Object.defineProperty(H, "__esModule", { value: true }), H.openTelemetryClientMiddleware = N;
  const t = W, e = k, n = gt, _ = Tt(), T = AS(), S = cS(), A = aS(), R = iS();
  function N() {
    return (M, O) => A.tracer.startActiveSpan((0, A.getSpanName)(M.method.path), { kind: t.SpanKind.CLIENT }, (I) => {
      const i = (0, _.Metadata)(O.metadata);
      return t.propagation.inject(t.context.active(), i, S.metadataSetter), (0, R.bindAsyncGenerator)(t.context.active(), P(I, M, { ...O, metadata: i }));
    });
  }
  async function* P(M, O, I) {
    const i = (0, T.getMethodAttributes)(O.method.path);
    M.setAttributes(i);
    let E = false, o = _.Status.OK, s;
    try {
      let r;
      if (O.requestStream ? r = (0, A.emitSpanEvents)(O.request, M, e.MESSAGETYPEVALUES_SENT) : r = O.request, O.responseStream) {
        yield* (0, A.emitSpanEvents)(O.next(r, I), M, e.MESSAGETYPEVALUES_RECEIVED), E = true;
        return;
      } else {
        const c = yield* O.next(r, I);
        return E = true, c;
      }
    } catch (r) {
      throw E = true, r instanceof _.ClientError ? (o = r.code, s = r.details) : (0, n.isAbortError)(r) ? (o = _.Status.CANCELLED, s = "The operation was cancelled") : (o = _.Status.UNKNOWN, s = "Unknown server error occurred", M.recordException(r)), r;
    } finally {
      E || (o = _.Status.CANCELLED, s = "Stream iteration was aborted by client, e.g. by breaking from the for .. of loop");
      const r = (0, T.getStatusAttributes)(o);
      M.setAttributes(r), o !== _.Status.OK && M.setStatus({ code: t.SpanStatusCode.ERROR, message: `${_.Status[o]}: ${s}` }), M.end();
    }
  }
  return H;
}
var ht;
function WC() {
  return ht || (ht = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.openTelemetryClientMiddleware = t.openTelemetryServerMiddleware = void 0;
    var e = FC();
    Object.defineProperty(t, "openTelemetryServerMiddleware", { enumerable: true, get: function() {
      return e.openTelemetryServerMiddleware;
    } });
    var n = xC();
    Object.defineProperty(t, "openTelemetryClientMiddleware", { enumerable: true, get: function() {
      return n.openTelemetryClientMiddleware;
    } });
  }($)), $;
}
var kC = WC();
const $C = RS({ __proto__: null }, [kC]);
export {
  $C as i
};
