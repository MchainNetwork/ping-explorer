import { d as x, c as i, r as m, o as k, a as S, b as B, e, t as r, f as I, w as p, h as f, i as V } from "./main-cc910e20.js";
import { I as w } from "./IdentityIcon-e76b9c9f.js";
const N = { class: "form-control" }, M = { class: "label" }, O = { class: "label-text" }, U = { class: "flex p-2" }, j = { class: "ml-2 text-base" }, q = { class: "form-control" }, z = { class: "label" }, D = { class: "label-text" }, C = { class: "form-control" }, E = { class: "label" }, J = { class: "label-text" }, F = /* @__PURE__ */ x({
  __name: "Burn",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(d, { expose: _, emit: b }) {
    const o = d, a = (s) => V(o.locale, s), v = i(() => JSON.parse(o.params || "{}")), n = m(v.value.denom || ""), l = m(""), y = i(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgBurn",
        value: {
          coin: {
            amount: String(l.value),
            denom: n.value
          },
          sender: o.sender
        }
      }
    ]), g = i(() => {
      let s = !0, t = "";
      return o.sender || (s = !1, t = a("sender_empty")), n.value || (s = !1, t = a("denom_empty")), Number(l.value) >= 0 || (s = !1, t = a("amount_greater_than_zero")), { ok: s, error: t };
    }), u = m(null);
    function h() {
      u.value && u.value.focus();
    }
    return k(() => {
      b("loaded");
    }), _({ msgs: y, isValid: g, initial: h }), (s, t) => (S(), B("div", null, [
      e("div", N, [
        e("label", M, [
          e("span", O, r(a("your_connected_account")), 1)
        ]),
        e("div", U, [
          I(w, {
            size: "small",
            address: d.sender
          }, null, 8, ["address"]),
          e("span", j, r(d.sender), 1)
        ])
      ]),
      e("div", q, [
        e("label", z, [
          e("span", D, r(a("denom")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (c) => n.value = c),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, n.value]
        ])
      ]),
      e("div", C, [
        e("label", E, [
          e("span", J, r(a("amount")), 1)
        ]),
        p(e("input", {
          ref_key: "focusInput",
          ref: u,
          "onUpdate:modelValue": t[1] || (t[1] = (c) => l.value = c),
          type: "number",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, l.value]
        ])
      ])
    ]));
  }
});
export {
  F as default
};
