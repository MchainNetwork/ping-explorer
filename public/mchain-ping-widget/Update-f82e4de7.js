import { d as y, c as i, r as m, q as k, o as S, a as N, b as e, t as o, e as U, w as _, g as v, h as V } from "./main-e92b1fb4.js";
import { I as z } from "./IdentityIcon-7b14663f.js";
const q = { class: "form-control" }, w = { class: "label" }, A = { class: "label-text" }, B = { class: "flex pl-2" }, I = { class: "ml-2 text-base" }, J = { class: "form-control" }, M = { class: "label" }, O = { class: "label-text" }, Z = ["placeholder"], D = { class: "form-control" }, C = { class: "label" }, E = { class: "label-text" }, T = ["placeholder"], F = /* @__PURE__ */ y({
  __name: "Update",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  setup(n, { expose: b }) {
    const d = n, t = (s) => V(d.locale, s), u = i(() => JSON.parse(d.params || "{}")), r = m(""), l = m(""), h = i(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgUpdate",
        value: {
          creator: d.sender,
          name: r.value,
          data: l.value
        }
      }
    ]), f = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, x = (s) => {
      try {
        return JSON.parse(s), !0;
      } catch {
        return !1;
      }
    }, g = i(() => {
      var s, a;
      return !((s = r.value) != null && s.trim()) || !f.test(r.value) ? { ok: !1, error: t("name_invalid") } : (a = l.value) != null && a.trim() && !x(l.value) ? { ok: !1, error: t("data_invalid") } : { ok: !0, error: "" };
    });
    function p() {
      r.value = u.value.name, l.value = u.value.data;
    }
    return k(() => {
      p();
    }), b({ msgs: h, isValid: g, initial: p }), (s, a) => (S(), N("div", null, [
      e("div", q, [
        e("label", w, [
          e("span", A, o(t("sender")), 1)
        ]),
        e("div", B, [
          U(z, {
            size: "small",
            address: n.sender
          }, null, 8, ["address"]),
          e("span", I, o(n.sender), 1)
        ])
      ]),
      e("div", J, [
        e("label", M, [
          e("span", O, o(t("name")), 1)
        ]),
        _(e("input", {
          "onUpdate:modelValue": a[0] || (a[0] = (c) => r.value = c),
          type: "text",
          placeholder: t("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, Z), [
          [v, r.value]
        ])
      ]),
      e("div", D, [
        e("label", C, [
          e("span", E, o(t("data")), 1)
        ]),
        _(e("textarea", {
          "onUpdate:modelValue": a[1] || (a[1] = (c) => l.value = c),
          placeholder: t("enter_data"),
          class: "textarea textarea-bordered border-gray-300 dark:border-gray-600 rounded-3xl",
          rows: "4"
        }, null, 8, T), [
          [v, l.value]
        ])
      ])
    ]));
  }
});
export {
  F as default
};
