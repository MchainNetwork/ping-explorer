import { d as b, c as o, r as f, q as h, o as g, a as x, b as e, t as l, e as y, w as k, g as S, h as B } from "./main-e92b1fb4.js";
import { I as z } from "./IdentityIcon-7b14663f.js";
const N = { class: "form-control" }, V = { class: "label" }, q = { class: "label-text" }, A = { class: "flex pl-2" }, C = { class: "ml-2 text-base" }, I = { class: "form-control" }, M = { class: "label" }, Z = { class: "label-text" }, w = ["placeholder"], E = /* @__PURE__ */ b({
  __name: "CancelBid",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  setup(n, { expose: i }) {
    const r = n, t = (a) => B(r.locale, a), u = o(() => JSON.parse(r.params || "{}")), s = f(""), m = o(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgCancelBid",
        value: {
          creator: r.sender,
          name: s.value
        }
      }
    ]), p = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, _ = o(() => {
      var a;
      return !((a = s.value) != null && a.trim()) || !p.test(s.value) ? { ok: !1, error: t("name_invalid") } : { ok: !0, error: "" };
    });
    function d() {
      s.value = u.value.name;
    }
    return h(() => {
      d();
    }), i({ msgs: m, isValid: _, initial: d }), (a, c) => (g(), x("div", null, [
      e("div", N, [
        e("label", V, [
          e("span", q, l(t("sender")), 1)
        ]),
        e("div", A, [
          y(z, {
            size: "small",
            address: n.sender
          }, null, 8, ["address"]),
          e("span", C, l(n.sender), 1)
        ])
      ]),
      e("div", I, [
        e("label", M, [
          e("span", Z, l(t("name")), 1)
        ]),
        k(e("input", {
          "onUpdate:modelValue": c[0] || (c[0] = (v) => s.value = v),
          type: "text",
          placeholder: t("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, w), [
          [S, s.value]
        ])
      ])
    ]));
  }
});
export {
  E as default
};
