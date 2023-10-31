import { d as x, c, r as p, q as y, o as k, a as S, b as e, t as o, e as V, w as v, g as _, h as z } from "./main-e92b1fb4.js";
import { I as N } from "./IdentityIcon-7b14663f.js";
const q = { class: "form-control" }, A = { class: "label" }, B = { class: "label-text" }, I = { class: "flex pl-2" }, M = { class: "ml-2 text-base" }, T = { class: "form-control" }, U = { class: "label" }, Z = { class: "label-text" }, w = ["placeholder"], D = { class: "form-control" }, C = { class: "label" }, E = { class: "label-text" }, J = ["placeholder"], j = /* @__PURE__ */ x({
  __name: "Transfer",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  setup(n, { expose: f }) {
    const d = n, s = (l) => z(d.locale, l), u = c(() => JSON.parse(d.params || "{}")), r = p(""), t = p(""), b = c(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgTransfer",
        value: {
          creator: d.sender,
          name: r.value,
          receiver: t.value
        }
      }
    ]), h = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, g = c(() => {
      var l, a;
      return !((l = r.value) != null && l.trim()) || !h.test(r.value) ? { ok: !1, error: s("name_invalid") } : (a = t.value) != null && a.trim() ? { ok: !0, error: "" } : { ok: !1, error: s("receiver_invalid") };
    });
    function m() {
      r.value = u.value.name, t.value = u.value.from;
    }
    return y(() => {
      m();
    }), f({ msgs: b, isValid: g, initial: m }), (l, a) => (k(), S("div", null, [
      e("div", q, [
        e("label", A, [
          e("span", B, o(s("sender")), 1)
        ]),
        e("div", I, [
          V(N, {
            size: "small",
            address: n.sender
          }, null, 8, ["address"]),
          e("span", M, o(n.sender), 1)
        ])
      ]),
      e("div", T, [
        e("label", U, [
          e("span", Z, o(s("name")), 1)
        ]),
        v(e("input", {
          "onUpdate:modelValue": a[0] || (a[0] = (i) => r.value = i),
          type: "text",
          placeholder: s("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, w), [
          [_, r.value]
        ])
      ]),
      e("div", D, [
        e("label", C, [
          e("span", E, o(s("receiver")), 1)
        ]),
        v(e("input", {
          "onUpdate:modelValue": a[1] || (a[1] = (i) => t.value = i),
          type: "text",
          placeholder: s("enter_receiver_address"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, J), [
          [_, t.value]
        ])
      ])
    ]));
  }
});
export {
  j as default
};
