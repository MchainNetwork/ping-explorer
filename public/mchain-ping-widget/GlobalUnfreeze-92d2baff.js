import { d as b, c as r, r as v, o as h, a as y, b as g, e, t as d, f as x, w as S, h as k, i as U } from "./main-d106edc3.js";
import { I as V } from "./IdentityIcon-ddb9ea91.js";
const w = { class: "form-control" }, z = { class: "label" }, B = { class: "label-text" }, I = { class: "flex p-2" }, M = { class: "ml-2 text-base" }, N = { class: "form-control" }, O = { class: "label" }, j = { class: "label-text" }, G = /* @__PURE__ */ b({
  __name: "GlobalUnfreeze",
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
    const a = l, o = (t) => U(a.locale || "en", t), u = r(() => JSON.parse(a.params || "{}")), n = v(u.value.denom || ""), m = r(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgGlobalUnfreeze",
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
      e("div", w, [
        e("label", z, [
          e("span", B, d(o("your_connected_account")), 1)
        ]),
        e("div", I, [
          x(V, {
            size: "small",
            address: l.sender
          }, null, 8, ["address"]),
          e("span", M, d(l.sender), 1)
        ])
      ]),
      e("div", N, [
        e("label", O, [
          e("span", j, d(o("denom")), 1)
        ]),
        S(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (f) => n.value = f),
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
