import { u as p, a as y, b as f, r as j, j as e, B as C, K as h, C as u, c as w, d as g, g as l, w as d } from "./index-DyzPd4zG.js";
function v() {
  const { mnemoinc: t, setMnemoinc: m } = p(), n = y(), a = f(), o = t == null ? void 0 : t.split(" "), x = () => {
    try {
      let s = l(d);
      if (new Set(s.split(" ")).size !== 12) {
        let i = 0, r = false;
        for (; i < 50 && !r; ) {
          i += 1;
          const c = l(d);
          new Set(c.split(" ")).size == 12 && (r = true, s = c);
        }
      }
      m(s);
    } catch (s) {
      n("/error", { state: { errorMessage: s.message, background: a } });
    }
  };
  return j.useEffect(() => {
    t || x();
  }, [t]), e.jsxs("div", { className: "seedContainer", children: [e.jsx(C, {}), e.jsx("p", { className: "headerInfoText", children: "This is your password to your money, if you lose it you will lose your money!" }), e.jsx("div", { className: "keyContainerWrapper", children: e.jsx(h, { keys: o }) }), e.jsx("p", { className: "firstWarningText", children: "Write it down with a pen and paper and keep it safe!" }), e.jsx("p", { className: "secondWarningText", children: "WE CAN NOT help you if you lose it" }), e.jsxs("div", { className: "buttonsContainer", children: [e.jsx(u, { actionFunction: () => g(o.join(" "), n, a), textStyles: { color: w.dark.text }, textContent: "Copy" }), e.jsx(u, { actionFunction: () => n("/createPassword", { state: { mnemoinc: o.join(" ") } }), textContent: "Next" })] })] });
}
export {
  v as default
};
