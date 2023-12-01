import { d as h, c as r, r as i, o as y, a as g, b as x, e, t as d, f as S, w as k, h as B, i as D } from "./main-a00ca3ce.js";
import { I as V } from "./IdentityIcon-ebc7f7f3.js";
const w = { class: "form-control" }, I = { class: "label" }, M = { class: "label-text" }, N = { class: "flex p-2" }, O = { class: "ml-2 text-base" }, j = { class: "form-control" }, q = { class: "label" }, U = { class: "label-text" }, E = /* @__PURE__ */ h({
  __name: "DisableBurn",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(l, { expose: c, emit: u }) {
    const a = l, n = (s) => D(a.locale || "en", s), m = r(() => JSON.parse(a.params || "{}")), o = i(m.value.denom || ""), p = i(""), _ = r(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgDisableBurn",
        value: {
          denom: o.value,
          authority: a.sender
        }
      }
    ]), b = r(() => {
      let s = !0, t = "";
      return a.sender || (s = !1, t = n("sender_empty")), o.value || (s = !1, t = n("denom_empty")), { ok: s, error: t };
    });
    function f() {
      p.value = a.sender;
    }
    return y(() => {
      u("loaded");
    }), c({ msgs: _, isValid: b, initial: f }), (s, t) => (g(), x("div", null, [
      e("div", w, [
        e("label", I, [
          e("span", M, d(n("your_connected_account")), 1)
        ]),
        e("div", N, [
          S(V, {
            size: "small",
            address: l.sender
          }, null, 8, ["address"]),
          e("span", O, d(l.sender), 1)
        ])
      ]),
      e("div", j, [
        e("label", q, [
          e("span", U, d(n("denom")), 1)
        ]),
        k(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (v) => o.value = v),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [B, o.value]
        ])
      ])
    ]));
  }
});
export {
  E as default
};
