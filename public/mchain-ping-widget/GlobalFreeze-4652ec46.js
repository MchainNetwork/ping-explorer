import { d as f, c as r, r as v, o as h, a as y, b as g, e, t as d, f as x, w as S, h as k, i as V } from "./main-8509f5a1.js";
import { I as w } from "./IdentityIcon-2734480f.js";
const z = { class: "form-control" }, B = { class: "label" }, I = { class: "label-text" }, M = { class: "flex p-2" }, N = { class: "ml-2 text-base" }, O = { class: "form-control" }, j = { class: "label" }, q = { class: "label-text" }, G = /* @__PURE__ */ f({
  __name: "GlobalFreeze",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(l, { expose: c, emit: i }) {
    const a = l, o = (t) => V(a.locale || "en", t), u = r(() => JSON.parse(a.params || "{}")), n = v(u.value.denom || ""), m = r(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgGlobalFreeze",
        value: {
          denom: n.value,
          authority: a.sender
        }
      }
    ]), p = r(() => {
      let t = !0, s = "";
      return a.sender || (t = !1, s = o("sender_empty")), n.value || (t = !1, s = o("denom_empty")), { ok: t, error: s };
    });
    function _() {
    }
    return h(() => {
      i("loaded");
    }), c({ msgs: m, isValid: p, initial: _ }), (t, s) => (y(), g("div", null, [
      e("div", z, [
        e("label", B, [
          e("span", I, d(o("your_connected_account")), 1)
        ]),
        e("div", M, [
          x(w, {
            size: "small",
            address: l.sender
          }, null, 8, ["address"]),
          e("span", N, d(l.sender), 1)
        ])
      ]),
      e("div", O, [
        e("label", j, [
          e("span", q, d(o("denom")), 1)
        ]),
        S(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (b) => n.value = b),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [k, n.value]
        ])
      ])
    ]));
  }
});
export {
  G as default
};
