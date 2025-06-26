import { b as p, a as l, j as e, e as c, d as y, B as x } from "./index-DyzPd4zG.js";
function u() {
  var _a;
  const i = p(), o = l(), a = (_a = i.state) == null ? void 0 : _a.transaction, { details: n, sparkID: s } = a, d = (a.paymentType === "spark" ? ["Payment Id", "Sender Public Key", "Payment Address"] : a.paymentType === "lightning" ? ["Payment Id", "Payment Preimage", "Payment Address"] : ["Payment Id", "Bitcoin Txid", "Payment Address"]).map((m, t) => {
    const r = a.paymentType === "spark" ? t === 0 ? s : t === 1 ? n.senderIdentityPublicKey : n.address : a.paymentType === "lightning" ? t === 0 ? s : t === 1 ? n.preimage : n.address : t === 0 ? s : t === 1 ? n.onChainTxid : n.address;
    return e.jsxs("div", { children: [e.jsx(c, { textStyles: { fontWeight: "500" }, textContent: m }), e.jsx("div", { className: "itemContainer", onClick: () => {
      y(r, o, i);
    }, children: e.jsx(c, { textContent: r || "N/A" }) })] }, t);
  });
  return e.jsxs(e.Fragment, { children: [e.jsx(x, { backFunction: () => o(-1) }), e.jsx("div", { id: "technicalDetailsComponent", children: d })] });
}
export {
  u as default
};
