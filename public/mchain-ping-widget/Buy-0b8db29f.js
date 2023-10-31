import { d as f, c as o, r as b, q as h, o as g, a as y, b as e, t as l, e as x, w as k, g as S, h as B } from "./main-e92b1fb4.js";
import { I as z } from "./IdentityIcon-7b14663f.js";
const N = { class: "form-control" }, V = { class: "label" }, q = { class: "label-text" }, w = { class: "flex pl-2" }, A = { class: "ml-2 text-base" }, I = { class: "form-control" }, M = { class: "label" }, Z = { class: "label-text" }, D = ["placeholder"], E = /* @__PURE__ */ f({
  __name: "Buy",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  setup(r, { expose: i }) {
    const n = r, t = (a) => B(n.locale, a), u = o(() => JSON.parse(n.params || "{}")), s = b(""), m = o(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgBuy",
        value: {
          creator: n.sender,
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
    }), i({ msgs: m, isValid: _, initial: d }), (a, c) => (g(), y("div", null, [
      e("div", N, [
        e("label", V, [
          e("span", q, l(t("sender")), 1)
        ]),
        e("div", w, [
          x(z, {
            size: "small",
            address: r.sender
          }, null, 8, ["address"]),
          e("span", A, l(r.sender), 1)
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
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 8, D), [
          [S, s.value]
        ])
      ])
    ]));
  }
});
export {
  E as default
};
