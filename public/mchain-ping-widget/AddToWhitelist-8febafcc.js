import { d as x, c as u, r as m, o as k, a as S, b as I, e, t as r, f as V, w as f, h as _, i as w } from "./main-72bd38b3.js";
import { I as B } from "./IdentityIcon-ba37932f.js";
const M = { class: "form-control" }, N = { class: "label" }, O = { class: "label-text" }, T = { class: "flex p-2" }, U = { class: "ml-2 text-base" }, j = { class: "form-control" }, q = { class: "label" }, A = { class: "label-text" }, D = { class: "form-control" }, W = { class: "label" }, z = { class: "label-text" }, J = /* @__PURE__ */ x({
  __name: "AddToWhitelist",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(d, { expose: b, emit: v }) {
    const l = d, a = (t) => w(l.locale || "en", t), p = u(() => JSON.parse(l.params || "{}")), o = m(p.value.denom || ""), n = m(p.value.address || ""), y = u(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgAddToWhitelist",
        value: {
          denom: o.value,
          authority: l.sender,
          address: n.value
        }
      }
    ]), h = u(() => {
      let t = !0, s = "";
      return l.sender || (t = !1, s = a("sender_empty")), o.value || (t = !1, s = a("denom_empty")), n.value || (t = !1, s = a("address_empty")), { ok: t, error: s };
    }), i = m(null);
    function g() {
      i.value && i.value.focus();
    }
    return k(() => {
      v("loaded");
    }), b({ msgs: y, isValid: h, initial: g }), (t, s) => (S(), I("div", null, [
      e("div", M, [
        e("label", N, [
          e("span", O, r(a("your_connected_account")), 1)
        ]),
        e("div", T, [
          V(B, {
            size: "small",
            address: d.sender
          }, null, 8, ["address"]),
          e("span", U, r(d.sender), 1)
        ])
      ]),
      e("div", j, [
        e("label", q, [
          e("span", A, r(a("denom")), 1)
        ]),
        f(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (c) => o.value = c),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, o.value]
        ])
      ]),
      e("div", D, [
        e("label", W, [
          e("span", z, r(a("address")), 1)
        ]),
        f(e("input", {
          ref_key: "focusInput",
          ref: i,
          "onUpdate:modelValue": s[1] || (s[1] = (c) => n.value = c),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, n.value]
        ])
      ])
    ]));
  }
});
export {
  J as default
};
