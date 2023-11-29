import { d as N, c as m, r as u, o as V, a as A, b as z, e, t as n, f as U, w as _, h as b, i as B } from "./main-dcfa34f6.js";
import { I } from "./IdentityIcon-5797a91d.js";
const J = { class: "form-control" }, M = { class: "label" }, O = { class: "label-text" }, Z = { class: "flex p-2" }, q = { class: "ml-2 text-base" }, w = { class: "form-control" }, D = { class: "label" }, R = { class: "label-text" }, j = ["placeholder"], C = { class: "form-control" }, E = { class: "label" }, T = { class: "label-text" }, $ = ["placeholder"], F = { class: "form-control" }, G = { class: "label" }, H = { class: "label-text" }, K = ["placeholder"], Q = /* @__PURE__ */ N({
  __name: "AddRecord",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(p, { expose: f, emit: h }) {
    const v = p, a = (l) => B(v.locale || "en", l), d = m(() => JSON.parse(v.params || "{}")), r = u(""), c = u(""), i = u(""), o = u(""), y = m(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgAddRecord",
        value: {
          creator: v.sender,
          name: r.value,
          value: c.value,
          data: i.value,
          record: o.value
        }
      }
    ]), g = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, x = (l) => {
      try {
        return JSON.parse(l), !0;
      } catch {
        return !1;
      }
    }, k = m(() => {
      var l, t, s;
      return !((l = r.value) != null && l.trim()) || !g.test(r.value) ? { ok: !1, error: a("name_invalid") } : (t = i.value) != null && t.trim() && !x(i.value) ? { ok: !1, error: a("data_invalid_json") } : !((s = o.value) != null && s.trim()) && !/\./.test(o.value) ? { ok: !1, error: a("record_invalid") } : { ok: !0, error: "" };
    });
    function S() {
      r.value = d.value.name, o.value = d.value.record, c.value = d.value.value, i.value = d.value.data;
    }
    return V(() => {
      h("loaded");
    }), f({ msgs: y, isValid: k, initial: S }), (l, t) => (A(), z("div", null, [
      e("div", J, [
        e("label", M, [
          e("span", O, n(a("sender")), 1)
        ]),
        e("div", Z, [
          U(I, {
            size: "small",
            address: p.sender
          }, null, 8, ["address"]),
          e("span", q, n(p.sender), 1)
        ])
      ]),
      e("div", w, [
        e("label", D, [
          e("span", R, n(a("name")), 1)
        ]),
        _(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (s) => r.value = s),
          type: "text",
          placeholder: a("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, j), [
          [b, r.value]
        ])
      ]),
      e("div", C, [
        e("label", E, [
          e("span", T, n(a("record")), 1)
        ]),
        _(e("input", {
          "onUpdate:modelValue": t[1] || (t[1] = (s) => o.value = s),
          type: "text",
          placeholder: a("enter_record"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, $), [
          [b, o.value]
        ])
      ]),
      e("div", F, [
        e("label", G, [
          e("span", H, n(a("value")), 1)
        ]),
        _(e("input", {
          "onUpdate:modelValue": t[2] || (t[2] = (s) => c.value = s),
          type: "text",
          placeholder: a("enter_value"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, K), [
          [b, c.value]
        ])
      ])
    ]));
  }
});
export {
  Q as default
};
