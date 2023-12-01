import { d as z, c as v, r, s as B, o as M, a as b, b as h, e, t as n, f as w, w as f, h as y, p as A, i as E, u as I } from "./main-a00ca3ce.js";
import { I as U } from "./IdentityIcon-ebc7f7f3.js";
const Z = { class: "form-control" }, q = { class: "label" }, D = { class: "label-text" }, P = { class: "flex p-2" }, J = { class: "ml-2 text-base" }, O = { class: "form-control" }, T = { class: "label" }, $ = { class: "label-text" }, j = ["placeholder"], F = { class: "form-control" }, G = { class: "label" }, H = { class: "label-text" }, K = ["placeholder"], L = {
  key: 0,
  class: "mt-4"
}, Q = { class: "label-text" }, X = /* @__PURE__ */ z({
  __name: "Extend",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(i, { expose: g, emit: x }) {
    const d = i, s = (o) => E(d.locale || "en", o), m = v(() => JSON.parse(d.params || "{}")), a = r(""), t = r(5), k = r({}), u = r({}), l = r({}), N = v(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgExtend",
        value: {
          creator: d.sender,
          name: a.value,
          years: String(t.value)
        }
      }
    ]), S = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, C = v(() => {
      var o;
      return !((o = a.value) != null && o.trim()) || !S.test(a.value) ? { ok: !1, error: s("name_invalid") } : Number(t.value) > 0 ? { ok: !0, error: "" } : { ok: !1, error: s("years_greater_than_zero") };
    });
    function V() {
      a.value = m.value.name, t.value = m.value.years, k.value = m.value.mnsParams;
    }
    function _() {
      a.value && t.value > 0 ? I(d.endpoint, a.value).then((o) => {
        u.value = o.cost, l.value = {
          amount: String(Number(u.value.amount) * t.value),
          denom: u.value.denom
        };
      }) : (u.value = {}, l.value = {});
    }
    return B([a, t], () => {
      _();
    }), M(() => {
      x("loaded"), _();
    }), g({ msgs: N, isValid: C, initial: V }), (o, c) => (b(), h("div", null, [
      e("div", Z, [
        e("label", q, [
          e("span", D, n(s("your_connected_account")), 1)
        ]),
        e("div", P, [
          w(U, {
            size: "small",
            address: i.sender
          }, null, 8, ["address"]),
          e("span", J, n(i.sender), 1)
        ])
      ]),
      e("div", O, [
        e("label", T, [
          e("span", $, n(s("name")), 1)
        ]),
        f(e("input", {
          "onUpdate:modelValue": c[0] || (c[0] = (p) => a.value = p),
          type: "text",
          placeholder: s("enter_name"),
          disabled: "",
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, j), [
          [y, a.value]
        ])
      ]),
      e("div", F, [
        e("label", G, [
          e("span", H, n(s("years")), 1)
        ]),
        f(e("input", {
          "onUpdate:modelValue": c[1] || (c[1] = (p) => t.value = p),
          type: "number",
          placeholder: s("enter_years"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, K), [
          [y, t.value]
        ])
      ]),
      l.value.amount ? (b(), h("div", L, [
        e("span", Q, n(s("registration_cost")) + ": ", 1),
        e("span", null, n(l.value.amount) + " " + n(l.value.denom), 1)
      ])) : A("", !0)
    ]));
  }
});
export {
  X as default
};
