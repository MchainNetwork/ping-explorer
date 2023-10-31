import { d as S, c as m, r as c, q as N, o as V, a as z, b as e, t as d, e as U, w as v, g as f, h as q } from "./main-e92b1fb4.js";
import { I as A } from "./IdentityIcon-7b14663f.js";
const B = { class: "form-control" }, I = { class: "label" }, J = { class: "label-text" }, M = { class: "flex pl-2" }, O = { class: "ml-2 text-base" }, Z = { class: "form-control" }, w = { class: "label" }, D = { class: "label-text" }, R = ["placeholder"], j = { class: "form-control" }, C = { class: "label" }, E = { class: "label-text" }, T = ["placeholder"], $ = { class: "form-control" }, F = { class: "label" }, G = { class: "label-text" }, H = ["placeholder"], P = /* @__PURE__ */ S({
  __name: "Register",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  setup(p, { expose: y }) {
    const _ = p, r = (s) => q(_.locale, s), i = m(() => JSON.parse(_.params || "{}")), l = c(""), n = c(5), u = c(""), o = c(""), g = m(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgRegister",
        value: {
          creator: _.sender,
          name: l.value,
          years: String(n.value),
          data: u.value,
          referrer: o.value
        }
      }
    ]), b = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, x = (s) => {
      try {
        return JSON.parse(s), !0;
      } catch {
        return !1;
      }
    }, k = m(() => {
      var s, a, t;
      return !((s = l.value) != null && s.trim()) || !b.test(l.value) ? { ok: !1, error: r("name_invalid") } : Number(n.value) > 0 ? (a = u.value) != null && a.trim() && !x(u.value) ? { ok: !1, error: r("valid_json_or_empty") } : (t = o.value) != null && t.trim() && !b.test(o.value) ? { ok: !1, error: r("referrer_invalid") } : { ok: !0, error: "" } : { ok: !1, error: r("years_greater_than_zero") };
    });
    function h() {
      l.value = i.value.name, n.value = i.value.years, u.value = i.value.data, o.value = i.value.referrer;
    }
    return N(() => {
      h();
    }), y({ msgs: g, isValid: k, initial: h }), (s, a) => (V(), z("div", null, [
      e("div", B, [
        e("label", I, [
          e("span", J, d(r("sender")), 1)
        ]),
        e("div", M, [
          U(A, {
            size: "small",
            address: p.sender
          }, null, 8, ["address"]),
          e("span", O, d(p.sender), 1)
        ])
      ]),
      e("div", Z, [
        e("label", w, [
          e("span", D, d(r("name")), 1)
        ]),
        v(e("input", {
          "onUpdate:modelValue": a[0] || (a[0] = (t) => l.value = t),
          type: "text",
          placeholder: r("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, R), [
          [f, l.value]
        ])
      ]),
      e("div", j, [
        e("label", C, [
          e("span", E, d(r("years")), 1)
        ]),
        v(e("input", {
          "onUpdate:modelValue": a[1] || (a[1] = (t) => n.value = t),
          type: "number",
          placeholder: r("enter_years"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, T), [
          [f, n.value]
        ])
      ]),
      e("div", $, [
        e("label", F, [
          e("span", G, d(r("referrer")), 1)
        ]),
        v(e("input", {
          "onUpdate:modelValue": a[2] || (a[2] = (t) => o.value = t),
          type: "text",
          placeholder: r("enter_referrer"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, H), [
          [f, o.value]
        ])
      ])
    ]));
  }
});
export {
  P as default
};
