import { a as v, b as h, j as n, C as g, d as y, q as j, s as m, v as w, x as R, y as T, r as u, B as E, Q as b } from "./index-DyzPd4zG.js";
function N({ generatingInvoiceQRCode: t, generatedAddress: s, receiveOption: r, initialSendAmount: a, description: i }) {
  const e = v(), d = h();
  return n.jsxs("div", { className: "receiveButtonContainer", children: [n.jsx(g, { actionFunction: () => e("/receiveAmount", { state: { receiveOption: r, from: "receivePage" } }), textContent: "Edit" }), n.jsx(g, { buttonStyles: { opacity: t ? 0.5 : 1 }, actionFunction: () => {
    s && y(s, e, d);
  }, textContent: "Copy" }), n.jsx(g, { actionFunction: () => e("/receive-options", { state: { receiveOption: r, amount: a, description: i } }), textContent: "Choose format" })] });
}
let c = [];
async function P(t) {
  const { setAddressState: s, selectedRecieveOption: r } = t, a = j();
  c.push(a);
  let i = {};
  try {
    if (s((e) => ({ ...e, isGeneratingInvoice: true, generatedAddress: "", errorMessageText: { type: null, text: "" }, swapPegInfo: {}, isReceivingSwap: false, hasGlobalError: false })), r.toLowerCase() === "lightning") {
      const e = await m({ paymentType: "lightning", amountSats: t.receivingAmount, memo: t.description });
      if (!e.didWork) throw new Error("Error with lightning");
      i = { generatedAddress: e.invoice, fee: 0 };
    } else if (r.toLowerCase() === "bitcoin") {
      const e = await m({ paymentType: "bitcoin", amountSats: t.receivingAmount, memo: t.description });
      if (!e.didWork) throw new Error("Error with bitcoin");
      i = { generatedAddress: e.invoice, fee: 0 };
    } else if (r.toLowerCase() === "spark") {
      const e = await m({ paymentType: "spark", amountSats: t.receivingAmount, memo: t.description });
      if (!e.didWork) throw new Error("Error with spark");
      i = { generatedAddress: e.invoice, fee: 0 };
    } else {
      const e = await L(t);
      if (!e) throw new Error("Error with Liquid");
      i = e;
    }
  } catch (e) {
    i = { generatedAddress: null, errorMessageText: { type: "stop", text: e.message } };
  } finally {
    c.length > 3 && (c = [c.pop()]), c[c.length - 1] === a && s((e) => ({ ...e, ...i, isGeneratingInvoice: false }));
  }
}
async function L(t) {
  const { receivingAmount: s, description: r } = t, a = await w({ sendAmount: s, paymentType: "liquid", description: r || R });
  if (!a) return { generatedAddress: null, errorMessageText: { type: "stop", text: "Unable to generate liquid address" } };
  const { destination: i, receiveFeesSat: e } = a;
  return { generatedAddress: i, fee: e };
}
function B() {
  const { globalContactsInformation: t } = T(), s = v(), r = h(), a = r.state, i = a == null ? void 0 : a.receiveOption, e = a == null ? void 0 : a.amount, d = a == null ? void 0 : a.description, A = a == null ? void 0 : a.navigateHome, x = u.useRef(false), l = Number(e), f = d, o = (i || "Lightning").toLowerCase(), [p, C] = u.useState({ selectedRecieveOption: o, isReceivingSwap: false, generatedAddress: `${t.myProfile.uniqueName}@blitz-wallet.com`, isGeneratingInvoice: false, minMaxSwapAmount: { min: 0, max: 0 }, swapPegInfo: {}, errorMessageText: { type: null, text: "" }, hasGlobalError: false, fee: 0 });
  return u.useEffect(() => {
    x.current || (x.current = true, !(!l && o.toLowerCase() === "lightning") && P({ userBalanceDenomination: "sats", receivingAmount: l, description: f, masterInfoObject: {}, setAddressState: C, selectedRecieveOption: o, navigate: s }));
  }, [l, f, o, s]), u.useEffect(() => {
  }, [o, s]), n.jsxs("div", { className: "receiveQrPage", children: [n.jsx(q, { navigateHome: A, receiveOption: o, navigate: s }), n.jsxs("div", { className: "receiveQrPageContent", children: [n.jsx("p", { className: "selectedReceiveOption", children: o }), n.jsx(k, { addressState: p, navigate: s, location: r }), n.jsx(N, { initialSendAmount: l, description: d, receiveOption: i, generatingInvoiceQRCode: p.isGeneratingInvoice, generatedAddress: p.generatedAddress }), n.jsx("div", { style: { marginBottom: "auto" } }), n.jsxs("div", { style: { alignItems: "center", display: "flex", flexDirection: "column" }, children: [n.jsx("p", { style: { margin: 0 }, className: "feeText", children: "Fee:" }), n.jsx("p", { style: { margin: 0 }, className: "feeText", children: "0 sats" })] })] })] });
}
function k({ addressState: t, navigate: s, location: r }) {
  return t.isGeneratingInvoice ? n.jsx("div", { className: "qrCodeContainerReceivePage", children: n.jsx("p", { children: "loading..." }) }) : t.generatedAddress ? n.jsxs("div", { onClick: () => y(t.generatedAddress, s, r), className: "qrCodeContainerReceivePage", children: [n.jsx(b, { data: t.generatedAddress }), t.errorMessageText.text && n.jsx("p", { children: t.errorMessageText.text })] }) : n.jsx("div", { className: "qrCodeContainerReceivePage", children: n.jsx("p", { children: t.errorMessageText.text || "Unable to generate address" }) });
}
function q({ navigateHome: t }) {
  const s = v();
  return n.jsx(E, { backFunction: () => {
    s(t ? "/wallet" : -1, { replace: true });
  } });
}
export {
  B as default
};
