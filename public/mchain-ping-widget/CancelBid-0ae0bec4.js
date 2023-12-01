import { d as b, c as o, r as h, o as g, a as x, b as y, e, t as l, f as k, w as S, h as B, i as z } from "./main-a00ca3ce.js";
import { I as N } from "./IdentityIcon-ebc7f7f3.js";
const V = { class: "form-control" }, A = { class: "label" }, C = { class: "label-text" }, I = { class: "flex p-2" }, M = { class: "ml-2 text-base" }, Z = { class: "form-control" }, q = { class: "label" }, w = { class: "label-text" }, D = ["placeholder"], J = /* @__PURE__ */ b({
  __name: "CancelBid",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(n, { expose: i, emit: c }) {
    const r = n, t = (a) => z(r.locale || "en", a), m = o(() => JSON.parse(r.params || "{}")), s = h(""), u = o(() => [
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
    function v() {
      s.value = m.value.name;
    }
    return g(() => {
      c("loaded");
    }), i({ msgs: u, isValid: _, initial: v }), (a, d) => (x(), y("div", null, [
      e("div", V, [
        e("label", A, [
          e("span", C, l(t("sender")), 1)
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
          e("span", w, l(t("name")), 1)
        ]),
        S(e("input", {
          "onUpdate:modelValue": d[0] || (d[0] = (f) => s.value = f),
          type: "text",
          placeholder: t("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, D), [
          [B, s.value]
        ])
      ])
    ]));
  }
});
export {
  J as default
};
