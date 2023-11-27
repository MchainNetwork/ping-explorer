import { d as k, c as i, r as m, o as S, a as N, b as U, e, t as l, f as V, w as p, h as _, i as z } from "./main-9a9fe349.js";
import { I as w } from "./IdentityIcon-09901e98.js";
const A = { class: "form-control" }, B = { class: "label" }, I = { class: "label-text" }, J = { class: "flex p-2" }, M = { class: "ml-2 text-base" }, O = { class: "form-control" }, Z = { class: "label" }, q = { class: "label-text" }, D = ["placeholder"], C = { class: "form-control" }, E = { class: "label" }, T = { class: "label-text" }, $ = ["placeholder"], G = /* @__PURE__ */ k({
  __name: "Update",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(n, { expose: v, emit: b }) {
    const d = n, t = (s) => z(d.locale || "en", s), u = i(() => JSON.parse(d.params || "{}")), r = m(""), o = m(""), f = i(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgUpdate",
        value: {
          creator: d.sender,
          name: r.value,
          data: o.value
        }
      }
    ]), h = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, x = (s) => {
      try {
        return JSON.parse(s), !0;
      } catch {
        return !1;
      }
    }, y = i(() => {
      var s, a;
      return !((s = r.value) != null && s.trim()) || !h.test(r.value) ? { ok: !1, error: t("name_invalid") } : (a = o.value) != null && a.trim() && !x(o.value) ? { ok: !1, error: t("data_invalid") } : { ok: !0, error: "" };
    });
    function g() {
      r.value = u.value.name, o.value = u.value.data;
    }
    return S(() => {
      b("loaded");
    }), v({ msgs: f, isValid: y, initial: g }), (s, a) => (N(), U("div", null, [
      e("div", A, [
        e("label", B, [
          e("span", I, l(t("your_connected_account")), 1)
        ]),
        e("div", J, [
          V(w, {
            size: "small",
            address: n.sender
          }, null, 8, ["address"]),
          e("span", M, l(n.sender), 1)
        ])
      ]),
      e("div", O, [
        e("label", Z, [
          e("span", q, l(t("name")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": a[0] || (a[0] = (c) => r.value = c),
          type: "text",
          placeholder: t("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, D), [
          [_, r.value]
        ])
      ]),
      e("div", C, [
        e("label", E, [
          e("span", T, l(t("data")), 1)
        ]),
        p(e("textarea", {
          "onUpdate:modelValue": a[1] || (a[1] = (c) => o.value = c),
          placeholder: t("enter_data"),
          class: "textarea textarea-bordered border-gray-300 dark:border-gray-600 rounded-3xl",
          rows: "4"
        }, null, 8, $), [
          [_, o.value]
        ])
      ])
    ]));
  }
});
export {
  G as default
};
