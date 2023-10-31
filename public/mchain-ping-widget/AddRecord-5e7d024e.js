import { d as S, c as _, r as i, q as N, o as V, a as A, b as e, t as n, e as z, w as m, g as b, h as U } from "./main-e92b1fb4.js";
import { I as q } from "./IdentityIcon-7b14663f.js";
const B = { class: "form-control" }, I = { class: "label" }, J = { class: "label-text" }, M = { class: "flex pl-2" }, O = { class: "ml-2 text-base" }, Z = { class: "form-control" }, w = { class: "label" }, D = { class: "label-text" }, R = ["placeholder"], j = { class: "form-control" }, C = { class: "label" }, E = { class: "label-text" }, T = ["placeholder"], $ = { class: "form-control" }, F = { class: "label" }, G = { class: "label-text" }, H = ["placeholder"], P = /* @__PURE__ */ S({
  __name: "AddRecord",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  setup(p, { expose: h }) {
    const v = p, a = (r) => U(v.locale, r), d = _(() => JSON.parse(v.params || "{}")), l = i(""), c = i(""), u = i(""), o = i(""), y = _(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgAddRecord",
        value: {
          creator: v.sender,
          name: l.value,
          value: c.value,
          data: u.value,
          record: o.value
        }
      }
    ]), g = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, x = (r) => {
      try {
        return JSON.parse(r), !0;
      } catch {
        return !1;
      }
    }, k = _(() => {
      var r, t, s;
      return !((r = l.value) != null && r.trim()) || !g.test(l.value) ? { ok: !1, error: a("name_invalid") } : (t = u.value) != null && t.trim() && !x(u.value) ? { ok: !1, error: a("data_invalid_json") } : !((s = o.value) != null && s.trim()) && !/\./.test(o.value) ? { ok: !1, error: a("record_invalid") } : { ok: !0, error: "" };
    });
    function f() {
      l.value = d.value.name, o.value = d.value.record, c.value = d.value.value, u.value = d.value.data;
    }
    return N(() => {
      f();
    }), h({ msgs: y, isValid: k, initial: f }), (r, t) => (V(), A("div", null, [
      e("div", B, [
        e("label", I, [
          e("span", J, n(a("sender")), 1)
        ]),
        e("div", M, [
          z(q, {
            size: "small",
            address: p.sender
          }, null, 8, ["address"]),
          e("span", O, n(p.sender), 1)
        ])
      ]),
      e("div", Z, [
        e("label", w, [
          e("span", D, n(a("name")), 1)
        ]),
        m(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (s) => l.value = s),
          type: "text",
          placeholder: a("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, R), [
          [b, l.value]
        ])
      ]),
      e("div", j, [
        e("label", C, [
          e("span", E, n(a("record")), 1)
        ]),
        m(e("input", {
          "onUpdate:modelValue": t[1] || (t[1] = (s) => o.value = s),
          type: "text",
          placeholder: a("enter_record"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, T), [
          [b, o.value]
        ])
      ]),
      e("div", $, [
        e("label", F, [
          e("span", G, n(a("value")), 1)
        ]),
        m(e("input", {
          "onUpdate:modelValue": t[2] || (t[2] = (s) => c.value = s),
          type: "text",
          placeholder: a("enter_value"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, H), [
          [b, c.value]
        ])
      ])
    ]));
  }
});
export {
  P as default
};
