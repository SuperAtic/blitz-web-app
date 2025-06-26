import { a as g, b as x, r as u, j as t, A as m, m as p, c as o, C as k } from "./index-CukSm0R7.js";
function h() {
  var _a, _b;
  const a = g(), s = x(), [r, i] = u.useState(true), l = ((_a = s == null ? void 0 : s.state) == null ? void 0 : _a.errorMessage) || "Something went wrong.", c = (_b = s == null ? void 0 : s.state) == null ? void 0 : _b.navigateBack, d = () => {
    switch (c) {
      case "wallet":
        a("/wallet");
        break;
      case "homePage":
        a("/");
        break;
      default:
        a(-1);
    }
  }, n = (e) => {
    e.stopPropagation(), i(false);
  };
  return t.jsx(m, { onExitComplete: d, children: r && t.jsx(p.div, { onClick: (e) => n(e), initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, style: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: o.constants.halfModalBackground, zIndex: 2e3, display: "flex", justifyContent: "center", alignItems: "center" }, children: t.jsxs("div", { style: { backgroundColor: o.dark.text }, className: "error-content", onClick: (e) => e.stopPropagation(), children: [t.jsx("p", { className: "error-message", children: l }), t.jsx("div", { style: { alignSelf: "center" }, onClick: n, children: t.jsx(k, { buttonStyles: { backgroundColor: o.light.blue }, textStyles: { color: o.dark.text }, textContent: "OK" }) })] }) }) });
}
export {
  h as default
};
