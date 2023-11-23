import { d as S, c as p, r, o as V, a as w, b as I, e, t as d, f as M, w as f, h as _, i as N } from "./main-5698c4eb.js";
import { I as U } from "./IdentityIcon-3e74263c.js";
const B = { class: "form-control" }, O = { class: "label" }, j = { class: "label-text" }, q = { class: "flex p-2" }, z = { class: "ml-2 text-base" }, D = { class: "form-control" }, C = { class: "label" }, E = { class: "label-text" }, J = { class: "form-control" }, T = { class: "label" }, A = { class: "label-text" }, F = { class: "form-control" }, G = { class: "label" }, H = { class: "label-text" }, P = /* @__PURE__ */ S({
  __name: "Mint",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(c, { expose: v, emit: y }) {
    const l = c, s = (a) => N(l.locale || "en", a), g = p(() => JSON.parse(l.params || "{}")), i = r(g.value.denom || ""), u = r(""), n = r(""), b = r(""), h = p(() => [
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
    ]), x = p(() => {
      let a = !0, t = "";
      return l.sender || (a = !1, t = s("sender_empty")), i.value || (a = !1, t = s("denom_empty")), Number(u.value) >= 0 || (a = !1, t = s("amount_greater_than_zero")), n.value || (a = !1, t = s("recipient_empty")), { ok: a, error: t };
    }), m = r(null);
    function k() {
      m.value && m.value.focus(), n.value = l.sender, b.value = l.sender;
    }
    return V(() => {
      y("loaded");
    }), v({ msgs: h, isValid: x, initial: k }), (a, t) => (w(), I("div", null, [
      e("div", B, [
        e("label", O, [
          e("span", j, d(s("your_connected_account")), 1)
        ]),
        e("div", q, [
          M(U, {
            size: "small",
            address: c.sender
          }, null, 8, ["address"]),
          e("span", z, d(c.sender), 1)
        ])
      ]),
      e("div", D, [
        e("label", C, [
          e("span", E, d(s("denom")), 1)
        ]),
        f(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (o) => i.value = o),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, i.value]
        ])
      ]),
      e("div", J, [
        e("label", T, [
          e("span", A, d(s("amount")), 1)
        ]),
        f(e("input", {
          ref_key: "focusInput",
          ref: m,
          "onUpdate:modelValue": t[1] || (t[1] = (o) => u.value = o),
          type: "number",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, u.value]
        ])
      ]),
      e("div", F, [
        e("label", G, [
          e("span", H, d(s("recipient")), 1)
        ]),
        f(e("input", {
          "onUpdate:modelValue": t[2] || (t[2] = (o) => n.value = o),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, n.value]
        ])
      ])
    ]));
  }
});
export {
  P as default
};
