import { d as x, c, r as p, q as y, o as k, a as S, b as e, t as l, e as A, w as _, g as v, h as B } from "./main-e92b1fb4.js";
import { I as V } from "./IdentityIcon-7b14663f.js";
const z = { class: "form-control" }, N = { class: "label" }, q = { class: "label-text" }, I = { class: "flex pl-2" }, M = { class: "ml-2 text-base" }, U = { class: "form-control" }, Z = { class: "label" }, w = { class: "label-text" }, D = ["placeholder"], C = { class: "form-control" }, E = { class: "label" }, J = { class: "label-text" }, O = ["placeholder"], j = /* @__PURE__ */ x({
  __name: "AcceptBid",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  setup(n, { expose: f }) {
    const d = n, s = (o) => B(d.locale, o), u = c(() => JSON.parse(d.params || "{}")), a = p(""), r = p(""), b = c(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgAcceptBid",
        value: {
          creator: d.sender,
          name: a.value,
          from: r.value
        }
      }
    ]), h = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, g = c(() => {
      var o, t;
      return !((o = a.value) != null && o.trim()) || !h.test(a.value) ? { ok: !1, error: s("name_invalid") } : (t = r.value) != null && t.trim() ? { ok: !1, error: s("from_invalid") } : { ok: !0, error: "" };
    });
    function m() {
      a.value = u.value.name, r.value = u.value.from;
    }
    return y(() => {
      m();
    }), f({ msgs: b, isValid: g, initial: m }), (o, t) => (k(), S("div", null, [
      e("div", z, [
        e("label", N, [
          e("span", q, l(s("sender")), 1)
        ]),
        e("div", I, [
          A(V, {
            size: "small",
            address: n.sender
          }, null, 8, ["address"]),
          e("span", M, l(n.sender), 1)
        ])
      ]),
      e("div", U, [
        e("label", Z, [
          e("span", w, l(s("name")), 1)
        ]),
        _(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (i) => a.value = i),
          type: "text",
          placeholder: s("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, D), [
          [v, a.value]
        ])
      ]),
      e("div", C, [
        e("label", E, [
          e("span", J, l(s("from")), 1)
        ]),
        _(e("input", {
          "onUpdate:modelValue": t[1] || (t[1] = (i) => r.value = i),
          type: "text",
          placeholder: s("enter_from"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, O), [
          [v, r.value]
        ])
      ])
    ]));
  }
});
export {
  j as default
};
