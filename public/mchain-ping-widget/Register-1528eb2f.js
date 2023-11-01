import { d as U, c as m, r as c, o as A, a as v, b as f, e, t as d, f as B, w as b, h, p as g, i as I } from "./main-c2a72820.js";
import { I as J } from "./IdentityIcon-f38133db.js";
const M = { class: "form-control" }, O = { class: "label" }, Z = { class: "label-text" }, q = { class: "flex p-2" }, w = { class: "ml-2 text-base" }, C = { class: "form-control" }, D = { class: "label" }, R = { class: "label-text" }, j = ["placeholder"], E = { class: "form-control" }, T = { class: "label" }, $ = { class: "label-text" }, F = ["placeholder"], G = { class: "form-control" }, H = { class: "label" }, K = { class: "label-text" }, L = {
  key: 0,
  class: "flex p-2"
}, P = { class: "ml-2 text-base" }, Q = ["placeholder"], Y = /* @__PURE__ */ U({
  __name: "Register",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(_, { expose: x, emit: k }) {
    const p = _, r = (l) => I(p.locale, l), o = m(() => JSON.parse(p.params || "{}")), n = c(""), i = c(5), u = c(""), s = c(""), S = m(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgRegister",
        value: {
          creator: p.sender,
          name: n.value,
          years: String(i.value),
          data: u.value,
          referrer: s.value
        }
      }
    ]), y = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, N = (l) => {
      try {
        return JSON.parse(l), !0;
      } catch {
        return !1;
      }
    }, V = m(() => {
      var l, a, t;
      return !((l = n.value) != null && l.trim()) || !y.test(n.value) ? { ok: !1, error: r("name_invalid") } : Number(i.value) > 0 ? (a = u.value) != null && a.trim() && !N(u.value) ? { ok: !1, error: r("valid_json_or_empty") } : (t = s.value) != null && t.trim() && !y.test(s.value) ? { ok: !1, error: r("referrer_invalid") } : { ok: !0, error: "" } : { ok: !1, error: r("years_greater_than_zero") };
    });
    function z() {
      n.value = o.value.name, i.value = o.value.years, u.value = o.value.data, s.value = o.value.referrer;
    }
    return A(() => {
      k("loaded");
    }), x({ msgs: S, isValid: V, initial: z }), (l, a) => (v(), f("div", null, [
      e("div", M, [
        e("label", O, [
          e("span", Z, d(r("your_connected_account")), 1)
        ]),
        e("div", q, [
          B(J, {
            size: "small",
            address: _.sender
          }, null, 8, ["address"]),
          e("span", w, d(_.sender), 1)
        ])
      ]),
      e("div", C, [
        e("label", D, [
          e("span", R, d(r("name")), 1)
        ]),
        b(e("input", {
          "onUpdate:modelValue": a[0] || (a[0] = (t) => n.value = t),
          type: "text",
          placeholder: r("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, j), [
          [h, n.value]
        ])
      ]),
      e("div", E, [
        e("label", T, [
          e("span", $, d(r("years")), 1)
        ]),
        b(e("input", {
          "onUpdate:modelValue": a[1] || (a[1] = (t) => i.value = t),
          type: "number",
          placeholder: r("enter_years"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, F), [
          [h, i.value]
        ])
      ]),
      e("div", G, [
        e("label", H, [
          e("span", K, d(r("referrer")), 1)
        ]),
        o.value.referrer ? (v(), f("div", L, [
          e("span", P, d(s.value), 1)
        ])) : g("", !0),
        o.value.referrer ? g("", !0) : b((v(), f("input", {
          key: 1,
          "onUpdate:modelValue": a[2] || (a[2] = (t) => s.value = t),
          type: "text",
          placeholder: r("enter_referrer"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, Q)), [
          [h, s.value]
        ])
      ])
    ]));
  }
});
export {
  Y as default
};
