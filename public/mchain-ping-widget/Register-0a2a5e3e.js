import { d as U, c as h, r as d, o as w, s as A, a as p, b as f, e, t as l, f as I, w as y, h as g, p as x, i as J, u as O } from "./main-a00ca3ce.js";
import { I as Z } from "./IdentityIcon-ebc7f7f3.js";
const q = { class: "form-control" }, D = { class: "label" }, P = { class: "label-text" }, j = { class: "flex p-2" }, E = { class: "ml-2 text-base" }, T = { class: "form-control" }, $ = { class: "label" }, F = { class: "label-text" }, G = ["placeholder"], H = { class: "form-control" }, K = { class: "label" }, L = { class: "label-text" }, Q = ["placeholder"], W = { class: "form-control" }, X = { class: "label" }, Y = { class: "label-text" }, ee = {
  key: 0,
  class: "flex p-2"
}, ae = { class: "ml-2 text-base" }, se = ["placeholder"], te = {
  key: 0,
  class: "mt-4"
}, re = { class: "label-text" }, ne = /* @__PURE__ */ U({
  __name: "Register",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(b, { expose: S, emit: V }) {
    const v = b, a = (r) => J(v.locale || "en", r), o = h(() => JSON.parse(v.params || "{}")), t = d(""), n = d(5), m = d(""), i = d(""), k = d(!0), z = d({}), _ = d({}), c = d({}), B = h(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgRegister",
        value: {
          creator: v.sender,
          name: t.value,
          years: String(n.value),
          data: m.value,
          referrer: i.value,
          set_reverse: k.value
        }
      }
    ]), N = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, C = (r) => {
      try {
        return JSON.parse(r), !0;
      } catch {
        return !1;
      }
    }, M = h(() => {
      var r, s, u;
      return !((r = t.value) != null && r.trim()) || !N.test(t.value) ? { ok: !1, error: a("name_invalid") } : Number(n.value) > 0 ? (s = m.value) != null && s.trim() && !C(m.value) ? { ok: !1, error: a("valid_json_or_empty") } : (u = i.value) != null && u.trim() && !N.test(i.value) ? { ok: !1, error: a("referrer_invalid") } : { ok: !0, error: "" } : { ok: !1, error: a("years_greater_than_zero") };
    });
    function R() {
      t.value = o.value.name, n.value = o.value.years, m.value = o.value.data, i.value = o.value.referrer, k.value = o.value.setReverse, z.value = o.value.mnsParams;
    }
    return w(() => {
      V("loaded");
    }), A([t, n], () => {
      t.value && n.value > 0 ? O(v.endpoint, t.value).then((r) => {
        _.value = r.cost, c.value = {
          amount: String(Number(_.value.amount) * n.value),
          denom: _.value.denom
        };
      }) : (_.value = {}, c.value = {});
    }), S({ msgs: B, isValid: M, initial: R }), (r, s) => (p(), f("div", null, [
      e("div", q, [
        e("label", D, [
          e("span", P, l(a("your_connected_account")), 1)
        ]),
        e("div", j, [
          I(Z, {
            size: "small",
            address: b.sender
          }, null, 8, ["address"]),
          e("span", E, l(b.sender), 1)
        ])
      ]),
      e("div", T, [
        e("label", $, [
          e("span", F, l(a("name")), 1)
        ]),
        y(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (u) => t.value = u),
          type: "text",
          placeholder: a("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, G), [
          [g, t.value]
        ])
      ]),
      e("div", H, [
        e("label", K, [
          e("span", L, l(a("years")), 1)
        ]),
        y(e("input", {
          "onUpdate:modelValue": s[1] || (s[1] = (u) => n.value = u),
          type: "number",
          placeholder: a("enter_years"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, Q), [
          [g, n.value]
        ])
      ]),
      e("div", W, [
        e("label", X, [
          e("span", Y, l(a("referrer")), 1)
        ]),
        o.value.referrer ? (p(), f("div", ee, [
          e("span", ae, l(i.value), 1)
        ])) : x("", !0),
        o.value.referrer ? x("", !0) : y((p(), f("input", {
          key: 1,
          "onUpdate:modelValue": s[2] || (s[2] = (u) => i.value = u),
          type: "text",
          placeholder: a("enter_referrer"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, se)), [
          [g, i.value]
        ])
      ]),
      c.value.amount ? (p(), f("div", te, [
        e("span", re, l(a("registration_cost")) + ": ", 1),
        e("span", null, l(c.value.amount) + " " + l(c.value.denom), 1)
      ])) : x("", !0)
    ]));
  }
});
export {
  ne as default
};
