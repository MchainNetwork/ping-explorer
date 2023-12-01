import { d as V, c as _, r as o, o as w, a as I, b as M, e, t as n, f as B, w as f, h as b, i as N, B as U } from "./main-a00ca3ce.js";
import { I as O } from "./IdentityIcon-ebc7f7f3.js";
const j = { class: "form-control" }, q = { class: "label" }, z = { class: "label-text" }, D = { class: "flex p-2" }, T = { class: "ml-2 text-base" }, C = { class: "form-control" }, E = { class: "label" }, F = { class: "label-text" }, J = { class: "form-control" }, P = { class: "label" }, A = { class: "label-text" }, G = { class: "form-control" }, H = { class: "label" }, K = { class: "label-text" }, L = { class: "form-control text-right" }, Q = { class: "label" }, R = { class: "label-text" }, Y = /* @__PURE__ */ V({
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
  setup(u, { expose: h, emit: g }) {
    const l = u, a = (s) => N(l.locale || "en", s), y = _(() => JSON.parse(l.params || "{}")), i = o(y.value.denom || ""), c = o(""), r = o(""), v = o(""), m = o({}), x = _(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgMint",
        value: {
          coin: {
            amount: String(c.value),
            denom: i.value
          },
          recipient: r.value || l.sender,
          minter: v.value || l.sender
        }
      }
    ]), k = _(() => {
      let s = !0, t = "";
      return l.sender || (s = !1, t = a("sender_empty")), i.value || (s = !1, t = a("denom_empty")), Number(c.value) >= 0 || (s = !1, t = a("amount_greater_than_zero")), r.value || (s = !1, t = a("recipient_empty")), { ok: s, error: t };
    }), p = o(null);
    function S() {
      U(l.endpoint).then((s) => {
        m.value = s.params.mint_fee;
      }), p.value && p.value.focus(), r.value = l.sender, v.value = l.sender;
    }
    return w(() => {
      g("loaded");
    }), h({ msgs: x, isValid: k, initial: S }), (s, t) => (I(), M("div", null, [
      e("div", j, [
        e("label", q, [
          e("span", z, n(a("your_connected_account")), 1)
        ]),
        e("div", D, [
          B(O, {
            size: "small",
            address: u.sender
          }, null, 8, ["address"]),
          e("span", T, n(u.sender), 1)
        ])
      ]),
      e("div", C, [
        e("label", E, [
          e("span", F, n(a("denom")), 1)
        ]),
        f(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (d) => i.value = d),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, i.value]
        ])
      ]),
      e("div", J, [
        e("label", P, [
          e("span", A, n(a("amount")), 1)
        ]),
        f(e("input", {
          ref_key: "focusInput",
          ref: p,
          "onUpdate:modelValue": t[1] || (t[1] = (d) => c.value = d),
          type: "number",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, c.value]
        ])
      ]),
      e("div", G, [
        e("label", H, [
          e("span", K, n(a("recipient")), 1)
        ]),
        f(e("input", {
          "onUpdate:modelValue": t[2] || (t[2] = (d) => r.value = d),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, r.value]
        ])
      ]),
      e("div", L, [
        e("label", Q, [
          e("span", R, n(a("mint_fee")) + ": " + n(m.value.amount) + " " + n(m.value.denom), 1)
        ])
      ])
    ]));
  }
});
export {
  Y as default
};
