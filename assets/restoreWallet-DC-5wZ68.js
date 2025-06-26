import { b as E, a as N, r as o, j as n, P as S, C as p, c as x } from "./index-CukSm0R7.js";
import { g as F } from "./getDataFromClipboard-DEAZh6Be.js";
const u = Array.from({ length: 12 }, (r, a) => a + 1), I = u.reduce((r, a) => (r[`key${a}`] = "", r), {});
function L() {
  const r = E();
  r.state;
  const a = N(), [f, d] = o.useState(false), [R, m] = o.useState(null), c = o.useRef({}), [i, h] = o.useState(I), y = (e, t) => {
    h((s) => ({ ...s, [`key${t}`]: e }));
  }, v = (e) => {
    m(e);
  }, j = (e) => {
    var _a, _b;
    e < 12 ? (_a = c.current[e + 1]) == null ? void 0 : _a.focus() : (_b = c.current[12]) == null ? void 0 : _b.blur();
  }, w = async () => {
    try {
      const e = await F();
      if (!e) throw new Error("Not able to get clipboard data");
      const s = e.split(" ");
      if (!s.every((l) => l.trim().length > 0) || s.length !== 12) throw new Error("Invalid clipboard data.");
      const g = {};
      u.forEach((l, k) => {
        g[`key${l}`] = s[k];
      }), h(g);
    } catch (e) {
      a("/error", { state: { errorMessage: e.message, background: r } });
    }
  }, b = async () => {
    try {
      d(true);
      const e = Object.values(i).map((t) => t.trim().toLowerCase()).filter((t) => t);
      if (!e || e.length !== 12) return;
      a("/createPassword", { state: { mnemoinc: e.join(" ") } });
    } catch (e) {
      a("/error", { state: { errorMessage: e.message, background: r } });
    } finally {
      d(false);
    }
  };
  o.useEffect(() => {
    const e = () => m(null);
    return window.addEventListener("click", e), () => window.removeEventListener("click", e);
  }, []);
  const C = o.useMemo(() => {
    const e = [];
    for (let t = 1; t < u.length + 1; t += 1) e.push(n.jsxs("div", { className: "seedPill", children: [n.jsxs("span", { className: "seedText", children: [t, "."] }), n.jsx("input", { className: "textInput", type: "text", value: i[`key${t}`], ref: (s) => c.current[t] = s, onFocus: () => v(t), onChange: (s) => y(s.target.value, t), onKeyDown: (s) => s.key === "Enter" && j(t) })] }, t));
    return e;
  }, [i]);
  return f ? n.jsx("div", { children: n.jsx("p", { children: "Vaidating seed" }) }) : n.jsxs("div", { className: "restoreContainer", children: [n.jsx(S, { text: "Restore wallet" }), n.jsx("div", { className: "inputKeysContainer", children: C }), n.jsxs("div", { className: "buttonsContainer", children: [n.jsx(p, { buttonStyles: { backgroundColor: x.light.blue }, textStyles: { color: x.dark.text }, actionFunction: w, textContent: "Paste" }), n.jsx(p, { actionFunction: b, textContent: "Restore" })] })] });
}
export {
  L as default
};
