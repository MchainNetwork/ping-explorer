import { d as y, c, r as m, o as k, a as S, b as A, e, t as l, f as B, w as p, h as _, i as V } from "./main-c2a72820.js";
import { I as z } from "./IdentityIcon-f38133db.js";
const N = { class: "form-control" }, I = { class: "label" }, M = { class: "label-text" }, U = { class: "flex p-2" }, Z = { class: "ml-2 text-base" }, q = { class: "form-control" }, w = { class: "label" }, D = { class: "label-text" }, C = ["placeholder"], E = { class: "form-control" }, J = { class: "label" }, O = { class: "label-text" }, T = ["placeholder"], F = /* @__PURE__ */ y({
  __name: "AcceptBid",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(n, { expose: f, emit: v }) {
    const d = n, t = (o) => V(d.locale, o), u = c(() => JSON.parse(d.params || "{}")), a = m(""), r = m(""), b = c(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgAcceptBid",
        value: {
          creator: d.sender,
          name: a.value,
          from: r.value
        }
      }
    ]), h = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, g = c(() => {
      var o, s;
      return !((o = a.value) != null && o.trim()) || !h.test(a.value) ? { ok: !1, error: t("name_invalid") } : (s = r.value) != null && s.trim() ? { ok: !1, error: t("from_invalid") } : { ok: !0, error: "" };
    });
    function x() {
      a.value = u.value.name, r.value = u.value.from;
    }
    return k(() => {
      v("loaded");
    }), f({ msgs: b, isValid: g, initial: x }), (o, s) => (S(), A("div", null, [
      e("div", N, [
        e("label", I, [
          e("span", M, l(t("sender")), 1)
        ]),
        e("div", U, [
          B(z, {
            size: "small",
            address: n.sender
          }, null, 8, ["address"]),
          e("span", Z, l(n.sender), 1)
        ])
      ]),
      e("div", q, [
        e("label", w, [
          e("span", D, l(t("name")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (i) => a.value = i),
          type: "text",
          placeholder: t("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, C), [
          [_, a.value]
        ])
      ]),
      e("div", E, [
        e("label", J, [
          e("span", O, l(t("from")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": s[1] || (s[1] = (i) => r.value = i),
          type: "text",
          placeholder: t("enter_from"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, T), [
          [_, r.value]
        ])
      ])
    ]));
  }
});
export {
  F as default
};
