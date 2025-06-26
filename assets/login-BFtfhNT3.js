import { a as y, u as w, b as g, r as l, j as e, c as i, C as f, S as h } from "./index-DyzPd4zG.js";
import { d as x } from "./encription-4H8u7ZtI.js";
function k() {
  const r = y(), { login: c, setMnemoinc: u, deleteWallet: d, logout: b } = w(), o = g(), s = new URLSearchParams(o.search).get("confirmed"), [a, m] = l.useState(""), p = () => {
    if (!a) return;
    const t = h.getItem("walletKey"), n = x(t, a);
    if (!n) {
      r("/error", { state: { errorMessage: "Incorrect password", background: o } });
      return;
    }
    u(n), c(t);
  };
  return l.useEffect(() => {
    if (!s || s !== "true") return;
    async function t() {
      try {
        d(), setTimeout(() => {
          window.location.reload();
        }, 800);
      } catch {
        r("/error", { state: { errorMessage: "Error deleting account", background: o } });
      }
    }
    t();
  }, [s]), e.jsx("div", { className: "passwordContainer", children: e.jsxs("div", { className: "inputContainer", children: [e.jsx("p", { className: "containerDescription", children: "Enter Your Wallet Password" }), e.jsx("input", { type: "text", name: "username", autoComplete: "username", style: { display: "none" }, tabIndex: -1 }), e.jsx("p", { children: "Password" }), e.jsx("input", { onChange: (t) => m(t.target.value), className: "initialPass", type: "password", name: "passward", id: "inialPass", autoComplete: "current-password" }), e.jsx("p", { onClick: () => {
    r("/confirm-action", { state: { confirmHeader: "Are you sure you want to reset your wallet?", confirmDescription: "If you forget your password, your wallet key will be permanently deleted from this device. Without your key, your Bitcoin will be lost forever.", fromRoute: "login", background: o } });
  }, style: { color: i.light.blue }, className: "forgotPassword", children: "Forgot password?" }), e.jsx(f, { actionFunction: p, buttonStyles: { backgroundColor: i.light.blue, opacity: a ? 1 : 0.5, width: "100%", maxWidth: "unset", minWidth: "unset" }, textStyles: { color: i.dark.text }, textContent: "Unlock wallet" })] }) });
}
export {
  k as default
};
