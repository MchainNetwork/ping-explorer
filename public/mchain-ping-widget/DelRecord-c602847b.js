import { d as f, c as n, r as h, o as b, a as g, b as x, e, t as l, f as y, w as S, h as k, i as D } from "./main-c2a72820.js";
import { I as V } from "./IdentityIcon-f38133db.js";
const B = { class: "form-control" }, I = { class: "label" }, M = { class: "label-text" }, N = { class: "flex p-2" }, q = { class: "ml-2 text-base" }, w = { class: "form-control" }, R = { class: "label" }, U = { class: "label-text" }, z = ["placeholder"], J = /* @__PURE__ */ f({
  __name: "DelRecord",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(o, { expose: c, emit: i }) {
    const r = o, a = (t) => D(r.locale, t), u = n(() => JSON.parse(r.params || "{}")), s = h(""), m = n(() => [
      {
        typeUrl: "/mchain.mns.v1beta1.MsgDelRecord",
        value: {
          creator: r.sender,
          name: s.value
        }
      }
    ]), p = n(() => {
      var t;
      return (t = s.value) != null && t.trim() ? { ok: !0, error: "" } : { ok: !1, error: a("name_invalid") };
    });
    function _() {
      s.value = u.value.name;
    }
    return b(() => {
      i("loaded");
    }), c({ msgs: m, isValid: p, initial: _ }), (t, d) => (g(), x("div", null, [
      e("div", B, [
        e("label", I, [
          e("span", M, l(a("your_connected_account")), 1)
        ]),
        e("div", N, [
          y(V, {
            size: "small",
            address: o.sender
          }, null, 8, ["address"]),
          e("span", q, l(o.sender), 1)
        ])
      ]),
      e("div", w, [
        e("label", R, [
          e("span", U, l(a("name")), 1)
        ]),
        S(e("input", {
          "onUpdate:modelValue": d[0] || (d[0] = (v) => s.value = v),
          type: "text",
          placeholder: a("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, z), [
          [k, s.value]
        ])
      ])
    ]));
  }
});
export {
  J as default
};
