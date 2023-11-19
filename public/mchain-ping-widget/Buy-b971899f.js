import { d as b, c as r, r as h, o as y, a as g, b as x, e, t as l, f as k, w as S, h as B, i as z } from "./main-37357ec9.js";
import { I as N } from "./IdentityIcon-f3f12738.js";
const V = { class: "form-control" }, w = { class: "label" }, A = { class: "label-text" }, I = { class: "flex p-2" }, M = { class: "ml-2 text-base" }, Z = { class: "form-control" }, q = { class: "label" }, D = { class: "label-text" }, U = ["placeholder"], J = /* @__PURE__ */ b({
  __name: "Buy",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(n, { expose: c, emit: i }) {
    const o = n, a = (t) => z(o.locale || "en", t), u = r(() => JSON.parse(o.params || "{}")), s = h(""), m = r(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgBuy",
        value: {
          creator: o.sender,
          name: s.value
        }
      }
    ]), p = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, _ = r(() => {
      var t;
      return !((t = s.value) != null && t.trim()) || !p.test(s.value) ? { ok: !1, error: a("name_invalid") } : { ok: !0, error: "" };
    });
    function v() {
      s.value = u.value.name;
    }
    return y(() => {
      i("loaded");
    }), c({ msgs: m, isValid: _, initial: v }), (t, d) => (g(), x("div", null, [
      e("div", V, [
        e("label", w, [
          e("span", A, l(a("your_connected_account")), 1)
        ]),
        e("div", I, [
          k(N, {
            size: "small",
            address: n.sender
          }, null, 8, ["address"]),
          e("span", M, l(n.sender), 1)
        ])
      ]),
      e("div", Z, [
        e("label", q, [
          e("span", D, l(a("name")), 1)
        ]),
        S(e("input", {
          "onUpdate:modelValue": d[0] || (d[0] = (f) => s.value = f),
          type: "text",
          placeholder: a("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 8, U), [
          [B, s.value]
        ])
      ])
    ]));
  }
});
export {
  J as default
};
