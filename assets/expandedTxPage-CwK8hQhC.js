import { b as p, a as C, r as m, j as e, B as j, c as t, e as s, F as g, C as v, o as y } from "./index-CukSm0R7.js";
const b = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4%2012.6111L8.92308%2017.5L20%206.5'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
function k() {
  const r = p().state, l = C(), [i, a] = m.useState(0), n = r == null ? void 0 : r.transaction, h = n.paymentType, o = n.paymentStatus === "failed", c = n.paymentStatus === "pending", d = new Date(n.details.time), u = n.details.description;
  return m.useEffect(() => {
    a(window.innerWidth), window.addEventListener("resize", (S) => {
      a(window.innerWidth);
    });
  }, []), e.jsxs(e.Fragment, { children: [e.jsx(j, { backFunction: () => l(-1) }), e.jsx("div", { className: "expandedTxContainer", children: e.jsxs("div", { style: { backgroundColor: t.light.expandedTxReceitBackground }, className: "receiptContainer", children: [e.jsx("div", { style: { backgroundColor: t.light.background }, className: "paymentStatusOuterContainer", children: e.jsx("div", { style: { backgroundColor: c ? t.light.expandedTxPendingOuter : o ? t.light.expandedTxFailed : t.light.expandedTxConfimred }, className: "paymentStatusFirstCircle", children: e.jsx("div", { style: { backgroundColor: c ? t.light.expandedTxPendingInner : o ? t.constants.cancelRed : t.light.blue }, className: "paymentStatusSecondCircle", children: e.jsx("img", { style: { filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" }, className: "paymentStatusIcon", src: b }) }) }) }), e.jsx(s, { className: "receiveAmountLabel", textContent: `${n.details.direction === "OUTGOING" ? "Sent" : "Received"} amount` }), e.jsx(g, { containerStyles: { marginTop: "-5px" }, neverHideBalance: true, styles: { fontSize: i < 200 ? "30px" : "40px", margin: 0 }, balance: n.details.amount }), e.jsxs("div", { className: "paymentStatusTextContanier", children: [e.jsx(s, { textContent: "Payment status" }), e.jsx("div", { className: "paymentStatusPillContiner", style: { backgroundColor: c ? t.light.expandedTxPendingOuter : o ? t.light.expandedTxFailed : t.light.expandedTxConfimred }, children: e.jsx(s, { textStyles: { color: c ? t.light.expandedTxPendingInner : o ? t.constants.cancelRed : t.light.blue }, textContent: c ? "Pending" : o ? "Failed" : "Successful" }) })] }), e.jsx(T, { windowWidth: i }), e.jsxs("div", { className: "infoGridContainer", children: [e.jsx(s, { textContent: "Time" }), e.jsx(s, { textContent: `${d.getHours() <= 9 ? "0" + d.getHours() : d.getHours()}:${d.getMinutes() <= 9 ? "0" + d.getMinutes() : d.getMinutes()}` }), e.jsx(s, { textContent: "Fee" }), e.jsx(g, { styles: { marginTop: 0, marginBottom: 0 }, neverHideBalance: true, balance: o ? 0 : n.details.fee }), e.jsx(s, { textContent: "Type" }), e.jsx(s, { textStyles: { textTransform: "capitalize" }, textContent: h })] }), u && e.jsxs("div", { className: "descriptionContainer", children: [e.jsx(s, { textContent: "Memo" }), e.jsx("div", { className: "descriptionScrollviewContainer", style: { backgroundColor: t.light.background }, children: e.jsx(s, { textContent: u }) })] }), e.jsx(v, { actionFunction: () => l("/technical-details", { state: { transaction: n } }), buttonStyles: { width: "100%", maxWidth: "max-content", minWidth: "unset", backgroundColor: t.light.blue, margin: "30px auto" }, textStyles: { color: t.dark.text }, textContent: "Technical details" }), e.jsx(w, { windowWidth: i })] }) })] });
}
function T({ windowWidth: x }) {
  const { theme: r } = y(), l = x * 0.95 - 30, i = Math.floor(l / 25);
  let a = [];
  for (let n = 0; n < i; n++) a.push(e.jsx("div", { style: { width: "20px", height: "2px", marginRight: "5px", backgroundColor: t.light.background } }, n));
  return e.jsx("div", { className: "borderElementsContainer", children: e.jsx("div", { className: "borderElementScroll", children: a }) });
}
function w({ windowWidth: x }) {
  let r = [];
  const i = Math.floor(x / 20);
  for (let a = 0; a < i; a++) r.push(e.jsx("div", { style: { width: "20px", height: "20px", borderRadius: "10px", backgroundColor: t.light.background } }, a));
  return e.jsx("div", { className: "dotElementsContainer", children: e.jsx("div", { className: "borderElementScroll", children: r }) });
}
export {
  k as default
};
