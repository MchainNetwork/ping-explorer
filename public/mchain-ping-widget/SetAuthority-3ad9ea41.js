import { d as w, c as m, r as i, o as k, a as S, b as A, e, t as r, f as V, w as _, h as f, i as I } from "./main-77c800e4.js";
import { I as U } from "./IdentityIcon-f75a8654.js";
const B = { class: "form-control" }, M = { class: "label" }, N = { class: "label-text" }, O = { class: "flex p-2" }, j = { class: "ml-2 text-base" }, q = { class: "form-control" }, D = { class: "label" }, z = { class: "label-text" }, C = { class: "form-control" }, E = { class: "label" }, J = { class: "label-text" }, T = { class: "form-control" }, F = { class: "label" }, G = { class: "label-text" }, L = /* @__PURE__ */ w({
  __name: "SetAuthority",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(c, { expose: b, emit: y }) {
    const o = c, s = (l) => I(o.locale || "en", l), v = m(() => JSON.parse(o.params || "{}")), d = i(v.value.denom || ""), u = i(""), a = i(""), h = m(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgSetAuthority",
        value: {
          denom: d.value,
          oldAuthority: a.value || o.sender,
          newAuthority: u.value
        }
      }
    ]), g = m(() => {
      let l = !0, t = "";
      return o.sender || (l = !1, t = s("sender_empty")), d.value || (l = !1, t = s("denom_empty")), a.value || (l = !1, t = s("old_authority_empty")), u.value || (l = !1, t = s("new_authority_empty")), { ok: l, error: t };
    }), p = i(null);
    function x() {
      p.value && p.value.focus(), a.value = o.sender;
    }
    return k(() => {
      y("loaded");
    }), b({ msgs: h, isValid: g, initial: x }), (l, t) => (S(), A("div", null, [
      e("div", B, [
        e("label", M, [
          e("span", N, r(s("your_connected_account")), 1)
        ]),
        e("div", O, [
          V(U, {
            size: "small",
            address: c.sender
          }, null, 8, ["address"]),
          e("span", j, r(c.sender), 1)
        ])
      ]),
      e("div", q, [
        e("label", D, [
          e("span", z, r(s("denom")), 1)
        ]),
        _(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (n) => d.value = n),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, d.value]
        ])
      ]),
      e("div", C, [
        e("label", E, [
          e("span", J, r(s("old_authority")), 1)
        ]),
        _(e("input", {
          "onUpdate:modelValue": t[1] || (t[1] = (n) => a.value = n),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, a.value]
        ])
      ]),
      e("div", T, [
        e("label", F, [
          e("span", G, r(s("new_authority")), 1)
        ]),
        _(e("input", {
          ref_key: "focusInput",
          ref: p,
          "onUpdate:modelValue": t[2] || (t[2] = (n) => u.value = n),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, u.value]
        ])
      ])
    ]));
  }
});
export {
  L as default
};
