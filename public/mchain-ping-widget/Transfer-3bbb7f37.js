import { d as x, c, r as m, o as k, a as S, b as V, e, t as l, f as z, w as p, h as _, i as N } from "./main-3ba0e469.js";
import { I as A } from "./IdentityIcon-5111b131.js";
const B = { class: "form-control" }, I = { class: "label" }, M = { class: "label-text" }, T = { class: "flex p-2" }, U = { class: "ml-2 text-base" }, Z = { class: "form-control" }, q = { class: "label" }, w = { class: "label-text" }, D = ["placeholder"], C = { class: "form-control" }, E = { class: "label" }, J = { class: "label-text" }, O = ["placeholder"], F = /* @__PURE__ */ x({
  __name: "Transfer",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(n, { expose: v, emit: f }) {
    const d = n, a = (o) => N(d.locale, o), u = c(() => JSON.parse(d.params || "{}")), t = m(""), r = m(""), b = c(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgTransfer",
        value: {
          creator: d.sender,
          name: t.value,
          receiver: r.value
        }
      }
    ]), h = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, y = c(() => {
      var o, s;
      return !((o = t.value) != null && o.trim()) || !h.test(t.value) ? { ok: !1, error: a("name_invalid") } : (s = r.value) != null && s.trim() ? { ok: !0, error: "" } : { ok: !1, error: a("receiver_invalid") };
    });
    function g() {
      t.value = u.value.name, r.value = u.value.from;
    }
    return k(() => {
      f("loaded");
    }), v({ msgs: b, isValid: y, initial: g }), (o, s) => (S(), V("div", null, [
      e("div", B, [
        e("label", I, [
          e("span", M, l(a("your_connected_account")), 1)
        ]),
        e("div", T, [
          z(A, {
            size: "small",
            address: n.sender
          }, null, 8, ["address"]),
          e("span", U, l(n.sender), 1)
        ])
      ]),
      e("div", Z, [
        e("label", q, [
          e("span", w, l(a("name")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (i) => t.value = i),
          type: "text",
          placeholder: a("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, D), [
          [_, t.value]
        ])
      ]),
      e("div", C, [
        e("label", E, [
          e("span", J, l(a("receiver")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": s[1] || (s[1] = (i) => r.value = i),
          type: "text",
          placeholder: a("enter_receiver_address"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, O), [
          [_, r.value]
        ])
      ])
    ]));
  }
});
export {
  F as default
};
