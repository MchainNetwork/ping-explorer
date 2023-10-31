import { d as k, c as m, r, o as S, a as V, b as e, t as d, e as w, w as f, g as _, h as I } from "./main-e92b1fb4.js";
import { I as M } from "./IdentityIcon-7b14663f.js";
const N = { class: "form-control" }, U = { class: "label" }, B = { class: "label-text" }, O = { class: "flex pl-2" }, j = { class: "ml-2 text-base" }, q = { class: "form-control" }, z = { class: "label" }, D = { class: "label-text" }, C = { class: "form-control" }, E = { class: "label" }, J = { class: "label-text" }, T = { class: "form-control" }, A = { class: "label" }, F = { class: "label-text" }, K = /* @__PURE__ */ k({
  __name: "Mint",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(c, { expose: v }) {
    const l = c, t = (a) => I(l.locale, a), g = m(() => JSON.parse(l.params || "{}")), i = r(g.value.denom || ""), u = r(""), n = r(""), b = r(""), y = m(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgMint",
        value: {
          coin: {
            amount: String(u.value),
            denom: i.value
          },
          recipient: n.value || l.sender,
          minter: b.value || l.sender
        }
      }
    ]), h = m(() => {
      let a = !0, s = "";
      return l.sender || (a = !1, s = t("sender_empty")), i.value || (a = !1, s = t("denom_empty")), Number(u.value) >= 0 || (a = !1, s = t("amount_greater_than_zero")), n.value || (a = !1, s = t("recipient_empty")), { ok: a, error: s };
    }), p = r(null);
    function x() {
      p.value && p.value.focus(), n.value = l.sender, b.value = l.sender;
    }
    return v({ msgs: y, isValid: h, initial: x }), (a, s) => (S(), V("div", null, [
      e("div", N, [
        e("label", U, [
          e("span", B, d(t("sender")), 1)
        ]),
        e("div", O, [
          w(M, {
            size: "small",
            address: c.sender
          }, null, 8, ["address"]),
          e("span", j, d(c.sender), 1)
        ])
      ]),
      e("div", q, [
        e("label", z, [
          e("span", D, d(t("denom")), 1)
        ]),
        f(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (o) => i.value = o),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, i.value]
        ])
      ]),
      e("div", C, [
        e("label", E, [
          e("span", J, d(t("amount")), 1)
        ]),
        f(e("input", {
          ref_key: "focusInput",
          ref: p,
          "onUpdate:modelValue": s[1] || (s[1] = (o) => u.value = o),
          type: "number",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, u.value]
        ])
      ]),
      e("div", T, [
        e("label", A, [
          e("span", F, d(t("recipient")), 1)
        ]),
        f(e("input", {
          "onUpdate:modelValue": s[2] || (s[2] = (o) => n.value = o),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, n.value]
        ])
      ])
    ]));
  }
});
export {
  K as default
};
