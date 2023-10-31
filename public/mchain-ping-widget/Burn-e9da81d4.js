import { d as h, c as i, r as m, o as x, a as k, b as e, t as r, e as S, w as p, g as f, h as B } from "./main-e92b1fb4.js";
import { I } from "./IdentityIcon-7b14663f.js";
const V = { class: "form-control" }, w = { class: "label" }, N = { class: "label-text" }, O = { class: "flex pl-2" }, U = { class: "ml-2 text-base" }, j = { class: "form-control" }, q = { class: "label" }, z = { class: "label-text" }, D = { class: "form-control" }, M = { class: "label" }, C = { class: "label-text" }, T = /* @__PURE__ */ h({
  __name: "Burn",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(d, { expose: _ }) {
    const l = d, a = (t) => B(l.locale, t), b = i(() => JSON.parse(l.params || "{}")), n = m(b.value.denom || ""), o = m(""), v = i(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgBurn",
        value: {
          coin: {
            amount: String(o.value),
            denom: n.value
          },
          sender: l.sender
        }
      }
    ]), g = i(() => {
      let t = !0, s = "";
      return l.sender || (t = !1, s = a("sender_empty")), n.value || (t = !1, s = a("denom_empty")), Number(o.value) >= 0 || (t = !1, s = a("amount_greater_than_zero")), { ok: t, error: s };
    }), u = m(null);
    function y() {
      u.value && u.value.focus();
    }
    return _({ msgs: v, isValid: g, initial: y }), (t, s) => (x(), k("div", null, [
      e("div", V, [
        e("label", w, [
          e("span", N, r(a("sender")), 1)
        ]),
        e("div", O, [
          S(I, {
            size: "small",
            address: d.sender
          }, null, 8, ["address"]),
          e("span", U, r(d.sender), 1)
        ])
      ]),
      e("div", j, [
        e("label", q, [
          e("span", z, r(a("denom")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (c) => n.value = c),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, n.value]
        ])
      ]),
      e("div", D, [
        e("label", M, [
          e("span", C, r(a("amount")), 1)
        ]),
        p(e("input", {
          ref_key: "focusInput",
          ref: u,
          "onUpdate:modelValue": s[1] || (s[1] = (c) => o.value = c),
          type: "number",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, o.value]
        ])
      ])
    ]));
  }
});
export {
  T as default
};
