import { d as A, c as _, r as d, o as B, a as p, b as f, e, t as u, f as I, w as b, h, p as x, i as J } from "./main-45275fe0.js";
import { I as M } from "./IdentityIcon-a4ae70c2.js";
const O = { class: "form-control" }, Z = { class: "label" }, q = { class: "label-text" }, w = { class: "flex p-2" }, C = { class: "ml-2 text-base" }, D = { class: "form-control" }, P = { class: "label" }, j = { class: "label-text" }, E = ["placeholder"], T = { class: "form-control" }, $ = { class: "label" }, F = { class: "label-text" }, G = ["placeholder"], H = { class: "form-control" }, K = { class: "label" }, L = { class: "label-text" }, Q = {
  key: 0,
  class: "flex p-2"
}, W = { class: "ml-2 text-base" }, X = ["placeholder"], re = /* @__PURE__ */ A({
  __name: "Register",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(v, { expose: k, emit: S }) {
    const m = v, r = (o) => J(m.locale || "en", o), s = _(() => JSON.parse(m.params || "{}")), n = d(""), i = d(5), c = d(""), l = d(""), y = d(!0), N = d({}), V = _(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgRegister",
        value: {
          creator: m.sender,
          name: n.value,
          years: String(i.value),
          data: c.value,
          referrer: l.value,
          set_reverse: y.value
        }
      }
    ]), g = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, z = (o) => {
      try {
        return JSON.parse(o), !0;
      } catch {
        return !1;
      }
    }, R = _(() => {
      var o, a, t;
      return !((o = n.value) != null && o.trim()) || !g.test(n.value) ? { ok: !1, error: r("name_invalid") } : Number(i.value) > 0 ? (a = c.value) != null && a.trim() && !z(c.value) ? { ok: !1, error: r("valid_json_or_empty") } : (t = l.value) != null && t.trim() && !g.test(l.value) ? { ok: !1, error: r("referrer_invalid") } : { ok: !0, error: "" } : { ok: !1, error: r("years_greater_than_zero") };
    });
    function U() {
      n.value = s.value.name, i.value = s.value.years, c.value = s.value.data, l.value = s.value.referrer, y.value = s.value.setReverse, N.value = s.value.mnsParams;
    }
    return B(() => {
      S("loaded");
    }), k({ msgs: V, isValid: R, initial: U }), (o, a) => (p(), f("div", null, [
      e("div", O, [
        e("label", Z, [
          e("span", q, u(r("your_connected_account")), 1)
        ]),
        e("div", w, [
          I(M, {
            size: "small",
            address: v.sender
          }, null, 8, ["address"]),
          e("span", C, u(v.sender), 1)
        ])
      ]),
      e("div", D, [
        e("label", P, [
          e("span", j, u(r("name")), 1)
        ]),
        b(e("input", {
          "onUpdate:modelValue": a[0] || (a[0] = (t) => n.value = t),
          type: "text",
          placeholder: r("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, E), [
          [h, n.value]
        ])
      ]),
      e("div", T, [
        e("label", $, [
          e("span", F, u(r("years")), 1)
        ]),
        b(e("input", {
          "onUpdate:modelValue": a[1] || (a[1] = (t) => i.value = t),
          type: "number",
          placeholder: r("enter_years"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, G), [
          [h, i.value]
        ])
      ]),
      e("div", H, [
        e("label", K, [
          e("span", L, u(r("referrer")), 1)
        ]),
        s.value.referrer ? (p(), f("div", Q, [
          e("span", W, u(l.value), 1)
        ])) : x("", !0),
        s.value.referrer ? x("", !0) : b((p(), f("input", {
          key: 1,
          "onUpdate:modelValue": a[2] || (a[2] = (t) => l.value = t),
          type: "text",
          placeholder: r("enter_referrer"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, X)), [
          [h, l.value]
        ])
      ])
    ]));
  }
});
export {
  re as default
};
