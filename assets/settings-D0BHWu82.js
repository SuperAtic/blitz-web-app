import { a as d, b as W, u as y, r as x, j as e, e as r, P as N } from "./index-CukSm0R7.js";
const S = "/blitz-web-app/assets/aboutIcon-VxiR4ED2.png", C = "/blitz-web-app/assets/aboutIconWhite-DYePpmT4.png", t = "/blitz-web-app/assets/left-chevron-DuODMqS-.png", D = "/blitz-web-app/assets/currencyIcon-h7kYh5rQ.png", T = "/blitz-web-app/assets/currencyIconWhite-Ofjj7rNe.png", i = "/blitz-web-app/assets/keyIcon-CUb0itxf.png", l = "/blitz-web-app/assets/keyIconWhite-Cfn6w-Ft.png", u = "/blitz-web-app/assets/trashIcon-BqWHo7Q3.png", m = "/blitz-web-app/assets/trashIconWhite-WsjZOSbB.png", j = "/blitz-web-app/assets/nodeIcon-B60XJc_z.png", z = "/blitz-web-app/assets/nodeIconWhite-ED_mwAuy.png", A = [{ for: "general", name: "About", icon: S, iconWhite: C, arrowIcon: t }, { for: "general", name: "Display Currency", icon: D, iconWhite: T, arrowIcon: t }], O = [{ for: "Security & Customization", name: "Backup wallet", icon: i, iconWhite: l, arrowIcon: t }], v = [{ for: "Closing Account", name: "Delete Wallet", icon: u, iconWhite: m, arrowIcon: t }, { for: "Closing Account", name: "Spark Info", icon: j, iconWhite: z, arrowIcon: t }], P = [[...A], [...O], [...v]], k = [[{ for: "Security & Customization", name: "Backup wallet", icon: i, iconWhite: l, arrowIcon: t }], [{ for: "Closing Account", name: "Delete Wallet", icon: u, iconWhite: m, arrowIcon: t }]];
function G() {
  const a = d(), s = W(), c = new URLSearchParams(s.search).get("confirmed"), p = s.state, { deleteWallet: I } = y(), h = (p == null ? void 0 : p.isDoomsday) ? k : P;
  x.useEffect(() => {
    c === "true" && (I(), setTimeout(() => {
      window.location.reload();
    }, 800));
  }, [c]);
  const g = h.map((w, o) => {
    const b = w.map((n, f) => e.jsxs("div", { onClick: () => {
      n.name === "Delete Wallet" ? a("/confirm-action", { state: { confirmHeader: "Are you sure you want to delete your wallet?", confirmDescription: "Your wallet seed will be permanently deleted from this device. Without your wallet seed, your Bitcoin will be lost forever.", fromRoute: "settings", background: s } }) : a("/settings-item", { state: { for: n.name } });
    }, className: "settingsItemContainer", children: [e.jsx("img", { className: "settingsItemImage", src: n.icon }), e.jsx(r, { className: "settingsItemName", textContent: n.name }), e.jsx("img", { className: "settingsItemChevron", src: n.arrowIcon })] }, f));
    return e.jsxs("div", { className: "settingsItemGroupContainer", children: [e.jsx(r, { className: "settingsItemGroupHeader", textContent: o === 0 ? "General" : o === 1 ? "Security" : o === 2 ? "Technical Settings" : "Experimental Features" }), b] }, `itemContainer-${o}`);
  });
  return e.jsxs("div", { className: "settingsPage", children: [e.jsx(N, { text: "Settings" }), e.jsx("div", { className: "contentContainer", children: g })] });
}
export {
  G as default
};
