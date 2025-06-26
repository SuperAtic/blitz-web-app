import { a as d, u as p, b as u, r as h, j as s, B as P, C as m, c as x } from "./index-CukSm0R7.js";
import { e as w } from "./encription-CRCTloWu.js";
function k() {
  d();
  const { login: o, setMnemoinc: c } = p(), r = u(), { mnemoinc: n } = r.state || {}, [a, i] = h.useState({ initialPass: "", checkPass: "" }), l = () => {
    if (!a.initialPass || !a.checkPass || a.initialPass !== a.checkPass) return;
    const t = w(n, a.checkPass);
    c(n), o(t);
  };
  return s.jsxs("div", { className: "passwordContainer", children: [s.jsx(P, {}), s.jsxs("div", { className: "inputContainer", children: [s.jsx("p", { className: "containerDescription", children: "Set Your Wallet Password" }), s.jsx("p", { className: "topText", children: "This password protects your wallet locally. Choose a strong password." }), s.jsx("p", { children: "Password" }), s.jsx("input", { onChange: (t) => i((e) => ({ ...e, initialPass: t.target.value })), className: "initialPass", type: "password", name: "", id: "inialPass" }), s.jsx("p", { children: "Confirm Password" }), s.jsx("input", { onChange: (t) => i((e) => ({ ...e, checkPass: t.target.value })), type: "password", name: "", id: "checkPass" }), s.jsx(m, { actionFunction: l, buttonStyles: { opacity: !a.initialPass || !a.checkPass || a.initialPass !== a.checkPass ? 0.5 : 1, maxWidth: "unset", minWidth: "unset" }, textStyles: { color: x.dark.text }, textContent: "Create Wallet" })] })] });
}
export {
  k as default
};
