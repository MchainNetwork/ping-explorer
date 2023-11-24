import { d as A, c as p, r as i, o as B, a as v, b as f, e, t as d, f as I, w as b, h, p as g, i as J } from "./main-3a98310b.js";
import { I as M } from "./IdentityIcon-d287570e.js";
const O = { class: "form-control" }, Z = { class: "label" }, q = { class: "label-text" }, w = { class: "flex p-2" }, C = { class: "ml-2 text-base" }, D = { class: "form-control" }, P = { class: "label" }, R = { class: "label-text" }, j = ["placeholder"], E = { class: "form-control" }, T = { class: "label" }, $ = { class: "label-text" }, F = ["placeholder"], G = { class: "form-control" }, H = { class: "label" }, K = { class: "label-text" }, L = {
  key: 0,
  class: "flex p-2"
}, Q = { class: "ml-2 text-base" }, W = ["placeholder"], ee = /* @__PURE__ */ A({
  __name: "Register",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(m, { expose: x, emit: k }) {
    const _ = m, r = (o) => J(_.locale || "en", o), t = p(() => JSON.parse(_.params || "{}")), n = i(""), u = i(5), c = i(""), l = i(""), S = i({}), N = p(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgRegister",
        value: {
          creator: _.sender,
          name: n.value,
          years: String(u.value),
          data: c.value,
          referrer: l.value
        }
      }
    ]), y = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, V = (o) => {
      try {
        return JSON.parse(o), !0;
      } catch {
        return !1;
      }
    }, z = p(() => {
      var o, a, s;
      return !((o = n.value) != null && o.trim()) || !y.test(n.value) ? { ok: !1, error: r("name_invalid") } : Number(u.value) > 0 ? (a = c.value) != null && a.trim() && !V(c.value) ? { ok: !1, error: r("valid_json_or_empty") } : (s = l.value) != null && s.trim() && !y.test(l.value) ? { ok: !1, error: r("referrer_invalid") } : { ok: !0, error: "" } : { ok: !1, error: r("years_greater_than_zero") };
    });
    function U() {
      n.value = t.value.name, u.value = t.value.years, c.value = t.value.data, l.value = t.value.referrer, S.value = t.value.mnsParams;
    }
    return B(() => {
      k("loaded");
    }), x({ msgs: N, isValid: z, initial: U }), (o, a) => (v(), f("div", null, [
      e("div", O, [
        e("label", Z, [
          e("span", q, d(r("your_connected_account")), 1)
        ]),
        e("div", w, [
          I(M, {
            size: "small",
            address: m.sender
          }, null, 8, ["address"]),
          e("span", C, d(m.sender), 1)
        ])
      ]),
      e("div", D, [
        e("label", P, [
          e("span", R, d(r("name")), 1)
        ]),
        b(e("input", {
          "onUpdate:modelValue": a[0] || (a[0] = (s) => n.value = s),
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
          "onUpdate:modelValue": a[1] || (a[1] = (s) => u.value = s),
          type: "number",
          placeholder: r("enter_years"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, F), [
          [h, u.value]
        ])
      ]),
      e("div", G, [
        e("label", H, [
          e("span", K, d(r("referrer")), 1)
        ]),
        t.value.referrer ? (v(), f("div", L, [
          e("span", Q, d(l.value), 1)
        ])) : g("", !0),
        t.value.referrer ? g("", !0) : b((v(), f("input", {
          key: 1,
          "onUpdate:modelValue": a[2] || (a[2] = (s) => l.value = s),
          type: "text",
          placeholder: r("enter_referrer"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, W)), [
          [h, l.value]
        ])
      ])
    ]));
  }
});
export {
  ee as default
};
