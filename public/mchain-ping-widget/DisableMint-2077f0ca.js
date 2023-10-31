import { d as v, c as r, r as c, q as g, o as h, a as y, b as e, t as d, e as x, w as S, g as k, h as M } from "./main-e92b1fb4.js";
import { I as D } from "./IdentityIcon-7b14663f.js";
const V = { class: "form-control" }, q = { class: "label" }, w = { class: "label-text" }, B = { class: "flex pl-2" }, I = { class: "ml-2 text-base" }, N = { class: "form-control" }, O = { class: "label" }, j = { class: "label-text" }, C = /* @__PURE__ */ v({
  __name: "DisableMint",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(o, { expose: u }) {
    const a = o, n = (s) => M(a.locale, s), m = r(() => JSON.parse(a.params || "{}")), l = c(m.value.denom || ""), p = c(""), _ = r(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgDisableMint",
        value: {
          denom: l.value,
          minter: a.sender
        }
      }
    ]), b = r(() => {
      let s = !0, t = "";
      return a.sender || (s = !1, t = n("sender_empty")), l.value || (s = !1, t = n("denom_empty")), { ok: s, error: t };
    });
    function i() {
      p.value = a.sender;
    }
    return g(() => {
      i();
    }), u({ msgs: _, isValid: b, initial: i }), (s, t) => (h(), y("div", null, [
      e("div", V, [
        e("label", q, [
          e("span", w, d(n("sender")), 1)
        ]),
        e("div", B, [
          x(D, {
            size: "small",
            address: o.sender
          }, null, 8, ["address"]),
          e("span", I, d(o.sender), 1)
        ])
      ]),
      e("div", N, [
        e("label", O, [
          e("span", j, d(n("denom")), 1)
        ]),
        S(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (f) => l.value = f),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [k, l.value]
        ])
      ])
    ]));
  }
});
export {
  C as default
};
