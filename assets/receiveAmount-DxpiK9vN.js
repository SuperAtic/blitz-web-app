import { i as m, a as h, b as y, k as j, n as C, r as s, j as e, B, F as v, C as D } from "./index-DyzPd4zG.js";
import { C as F } from "./customNumberKeyboard-Bej4bUDg.js";
function I(t, i, o) {
  return t ? String(i === "fiat" ? Math.round(m / ((o == null ? void 0 : o.value) || 65e3) * Number(t)) : (((o == null ? void 0 : o.value) || 65e3) / m * Number(t)).toFixed(2)) : "";
}
const k = () => {
  const t = h(), i = y(), { masterInfoObject: o } = j(), { fiatStats: r } = C(), d = i.state, f = d == null ? void 0 : d.receiveOption, p = d == null ? void 0 : d.from, [a, c] = s.useState(""), [A, x] = s.useState(false), [b, g] = s.useState(""), [n, N] = s.useState(o.userBalanceDenomination != "fiat" ? "sats" : "fiat"), u = Math.round(Number(n === "sats" ? Number(a) : Math.round(m / ((r == null ? void 0 : r.value) || 65e3)) * a) || 0), S = () => {
    t("/receive", { state: { amount: Number(u), description: b, receiveOption: f || "lightning", navigateHome: p !== "homepage" }, replace: p !== "homepage" }), c("");
  };
  return e.jsxs("div", { className: "edit-receive-container", children: [e.jsx(B, {}), e.jsxs("div", { className: "balanceContainer", children: [e.jsx("div", { onClick: () => {
    N((l) => l === "sats" ? "fiat" : "sats"), c(I(a, n, r) || "");
  }, className: "scroll-content", children: e.jsx(v, { containerStyles: { opacity: a ? 1 : 0.5, cursor: "pointer" }, styles: { fontSize: "2.75rem", margin: 0 }, globalBalanceDenomination: n, neverHideBalance: true, balance: u }) }), e.jsx(v, { containerStyles: { opacity: a ? 1 : 0.5, cursor: "pointer" }, styles: { fontSize: "1.2rem", margin: 0 }, globalBalanceDenomination: n === "sats" ? "fiat" : "sats", neverHideBalance: true, balance: u })] }), e.jsx("div", { className: "description-input-container", children: e.jsx("input", { type: "text", value: b, onChange: (l) => g(l.target.value), placeholder: "Add a note...", className: "description-input", onFocus: () => x(true), onBlur: () => x(false) }) }), e.jsx(F, { containerClassName: "custom-number-keyboard-container", setAmountValue: c, showDot: n === "fiat", fiatStats: r }), e.jsx(D, { actionFunction: S, buttonStyles: { maxWidth: "200px", margin: "0 auto" }, textContent: "Request" })] });
};
export {
  k as default
};
