import { d as f, c as r, r as v, o as h, a as y, b as g, e, t as d, f as x, w as S, h as k, i as M } from "./main-3a98310b.js";
import { I as D } from "./IdentityIcon-d287570e.js";
const V = { class: "form-control" }, w = { class: "label" }, B = { class: "label-text" }, I = { class: "flex p-2" }, N = { class: "ml-2 text-base" }, O = { class: "form-control" }, j = { class: "label" }, q = { class: "label-text" }, C = /* @__PURE__ */ f({
  __name: "DisableMint",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(l, { expose: i, emit: c }) {
    const a = l, n = (t) => M(a.locale || "en", t), u = r(() => JSON.parse(a.params || "{}")), o = v(u.value.denom || ""), m = r(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgDisableMint",
        value: {
          denom: o.value,
          authority: a.sender
        }
      }
    ]), p = r(() => {
      let t = !0, s = "";
      return a.sender || (t = !1, s = n("sender_empty")), o.value || (t = !1, s = n("denom_empty")), { ok: t, error: s };
    });
    function _() {
    }
    return h(() => {
      c("loaded");
    }), i({ msgs: m, isValid: p, initial: _ }), (t, s) => (y(), g("div", null, [
      e("div", V, [
        e("label", w, [
          e("span", B, d(n("your_connected_account")), 1)
        ]),
        e("div", I, [
          x(D, {
            size: "small",
            address: l.sender
          }, null, 8, ["address"]),
          e("span", N, d(l.sender), 1)
        ])
      ]),
      e("div", O, [
        e("label", j, [
          e("span", q, d(n("denom")), 1)
        ]),
        S(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (b) => o.value = b),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [k, o.value]
        ])
      ])
    ]));
  }
});
export {
  C as default
};
