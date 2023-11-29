import { d as k, c as u, r as m, o as S, a as z, b as N, e, t as l, f as V, w as p, h as _, i as A } from "./main-dcfa34f6.js";
import { I as B } from "./IdentityIcon-5797a91d.js";
const E = { class: "form-control" }, I = { class: "label" }, M = { class: "label-text" }, U = { class: "flex p-2" }, Z = { class: "ml-2 text-base" }, q = { class: "form-control" }, w = { class: "label" }, D = { class: "label-text" }, P = ["placeholder"], C = { class: "form-control" }, J = { class: "label" }, O = { class: "label-text" }, T = ["placeholder"], F = /* @__PURE__ */ k({
  __name: "Extend",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(n, { expose: v, emit: b }) {
    const d = n, a = (r) => A(d.locale || "en", r), c = u(() => JSON.parse(d.params || "{}")), s = m(""), t = m(5), f = m({}), h = u(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgExtend",
        value: {
          creator: d.sender,
          name: s.value,
          years: String(t.value)
        }
      }
    ]), y = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, g = u(() => {
      var r;
      return !((r = s.value) != null && r.trim()) || !y.test(s.value) ? { ok: !1, error: a("name_invalid") } : Number(t.value) > 0 ? { ok: !0, error: "" } : { ok: !1, error: a("years_greater_than_zero") };
    });
    function x() {
      s.value = c.value.name, t.value = c.value.years, f.value = c.value.mnsParams;
    }
    return S(() => {
      b("loaded");
    }), v({ msgs: h, isValid: g, initial: x }), (r, o) => (z(), N("div", null, [
      e("div", E, [
        e("label", I, [
          e("span", M, l(a("your_connected_account")), 1)
        ]),
        e("div", U, [
          V(B, {
            size: "small",
            address: n.sender
          }, null, 8, ["address"]),
          e("span", Z, l(n.sender), 1)
        ])
      ]),
      e("div", q, [
        e("label", w, [
          e("span", D, l(a("name")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": o[0] || (o[0] = (i) => s.value = i),
          type: "text",
          placeholder: a("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, P), [
          [_, s.value]
        ])
      ]),
      e("div", C, [
        e("label", J, [
          e("span", O, l(a("years")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": o[1] || (o[1] = (i) => t.value = i),
          type: "number",
          placeholder: a("enter_years"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, T), [
          [_, t.value]
        ])
      ])
    ]));
  }
});
export {
  F as default
};
