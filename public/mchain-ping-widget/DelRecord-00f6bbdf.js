import { d as v, c as o, r as f, q as h, o as b, a as g, b as e, t as l, e as x, w as y, g as S, h as k } from "./main-e92b1fb4.js";
import { I as D } from "./IdentityIcon-7b14663f.js";
const V = { class: "form-control" }, q = { class: "label" }, B = { class: "label-text" }, I = { class: "flex pl-2" }, M = { class: "ml-2 text-base" }, N = { class: "form-control" }, w = { class: "label" }, R = { class: "label-text" }, U = ["placeholder"], E = /* @__PURE__ */ v({
  __name: "DelRecord",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  setup(r, { expose: i }) {
    const n = r, a = (t) => k(n.locale, t), u = o(() => JSON.parse(n.params || "{}")), s = f(""), m = o(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgDelRecord",
        value: {
          creator: n.sender,
          name: s.value
        }
      }
    ]), p = o(() => {
      var t;
      return (t = s.value) != null && t.trim() ? { ok: !0, error: "" } : { ok: !1, error: a("name_invalid") };
    });
    function d() {
      s.value = u.value.name;
    }
    return h(() => {
      d();
    }), i({ msgs: m, isValid: p, initial: d }), (t, c) => (b(), g("div", null, [
      e("div", V, [
        e("label", q, [
          e("span", B, l(a("sender")), 1)
        ]),
        e("div", I, [
          x(D, {
            size: "small",
            address: r.sender
          }, null, 8, ["address"]),
          e("span", M, l(r.sender), 1)
        ])
      ]),
      e("div", N, [
        e("label", w, [
          e("span", R, l(a("name")), 1)
        ]),
        y(e("input", {
          "onUpdate:modelValue": c[0] || (c[0] = (_) => s.value = _),
          type: "text",
          placeholder: a("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, U), [
          [S, s.value]
        ])
      ])
    ]));
  }
});
export {
  E as default
};
