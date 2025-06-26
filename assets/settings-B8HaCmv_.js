import { a as w, b as y, u as x, r as N, j as e, e as r, P as S } from "./index-DyzPd4zG.js";
const C = "/assets/aboutIcon-VxiR4ED2.png", D = "/assets/aboutIconWhite-DYePpmT4.png", t = "/assets/left-chevron-DuODMqS-.png", T = "/assets/currencyIcon-h7kYh5rQ.png", j = "/assets/currencyIconWhite-Ofjj7rNe.png", i = "/assets/keyIcon-CUb0itxf.png", l = "/assets/keyIconWhite-Cfn6w-Ft.png", u = "/assets/trashIcon-BqWHo7Q3.png", m = "/assets/trashIconWhite-WsjZOSbB.png", A = "/assets/nodeIcon-B60XJc_z.png", O = "/assets/nodeIconWhite-ED_mwAuy.png", v = [{ for: "general", name: "About", icon: C, iconWhite: D, arrowIcon: t }, { for: "general", name: "Display Currency", icon: T, iconWhite: j, arrowIcon: t }], b = [{ for: "Security & Customization", name: "Backup wallet", icon: i, iconWhite: l, arrowIcon: t }], P = [{ for: "Closing Account", name: "Delete Wallet", icon: u, iconWhite: m, arrowIcon: t }, { for: "Closing Account", name: "Spark Info", icon: A, iconWhite: O, arrowIcon: t }], k = [[...v], [...b], [...P]], E = [[{ for: "Security & Customization", name: "Backup wallet", icon: i, iconWhite: l, arrowIcon: t }], [{ for: "Closing Account", name: "Delete Wallet", icon: u, iconWhite: m, arrowIcon: t }]];
function R() {
  const c = w(), s = y(), a = new URLSearchParams(s.search).get("confirmed"), I = s.state, { deleteWallet: h } = x(), g = (I == null ? void 0 : I.isDoomsday) ? E : k;
  N.useEffect(() => {
    a === "true" && (h(), setTimeout(() => {
      window.location.reload();
    }, 800));
  }, [a]);
  const p = g.map((f, o) => {
    const d = f.map((n, W) => e.jsxs("div", { onClick: () => {
      n.name === "Delete Wallet" ? c("/confirm-action", { state: { confirmHeader: "Are you sure you want to delete your wallet?", confirmDescription: "Your wallet seed will be permanently deleted from this device. Without your wallet seed, your Bitcoin will be lost forever.", fromRoute: "settings", background: s } }) : c("/settings-item", { state: { for: n.name } });
    }, className: "settingsItemContainer", children: [e.jsx("img", { className: "settingsItemImage", src: n.icon }), e.jsx(r, { className: "settingsItemName", textContent: n.name }), e.jsx("img", { className: "settingsItemChevron", src: n.arrowIcon })] }, W));
    return e.jsxs("div", { className: "settingsItemGroupContainer", children: [e.jsx(r, { className: "settingsItemGroupHeader", textContent: o === 0 ? "General" : o === 1 ? "Security" : o === 2 ? "Technical Settings" : "Experimental Features" }), d] }, `itemContainer-${o}`);
  });
  return e.jsxs("div", { className: "settingsPage", children: [e.jsx(S, { text: "Settings" }), e.jsx("div", { className: "contentContainer", children: p })] });
}
export {
  R as default
};
