import { d as x, c as u, r as m, o as k, a as S, b as I, e, t as r, f as V, w as f, h as _, i as w } from "./main-bfbe582b.js";
import { I as z } from "./IdentityIcon-711d30d2.js";
const B = { class: "form-control" }, M = { class: "label" }, N = { class: "label-text" }, O = { class: "flex p-2" }, U = { class: "ml-2 text-base" }, j = { class: "form-control" }, q = { class: "label" }, D = { class: "label-text" }, F = { class: "form-control" }, C = { class: "label" }, E = { class: "label-text" }, A = /* @__PURE__ */ x({
  __name: "Freeze",
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
        typeUrl: "/mchain.smarttoken.v1beta1.MsgFreeze",
        value: {
          denom: o.value,
          authority: l.sender,
          address: n.value
        }
      }
    ]), h = u(() => {
      let t = !0, s = "";
      return l.sender || (t = !1, s = a("sender_empty")), o.value || (t = !1, s = a("denom_empty")), n.value || (t = !1, s = a("address_empty")), { ok: t, error: s };
    }), c = m(null);
    function g() {
      c.value && c.value.focus();
    }
    return k(() => {
      v("loaded");
    }), b({ msgs: y, isValid: h, initial: g }), (t, s) => (S(), I("div", null, [
      e("div", B, [
        e("label", M, [
          e("span", N, r(a("your_connected_account")), 1)
        ]),
        e("div", O, [
          V(z, {
            size: "small",
            address: d.sender
          }, null, 8, ["address"]),
          e("span", U, r(d.sender), 1)
        ])
      ]),
      e("div", j, [
        e("label", q, [
          e("span", D, r(a("denom")), 1)
        ]),
        f(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (i) => o.value = i),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, o.value]
        ])
      ]),
      e("div", F, [
        e("label", C, [
          e("span", E, r(a("address")), 1)
        ]),
        f(e("input", {
          ref_key: "focusInput",
          ref: c,
          "onUpdate:modelValue": s[1] || (s[1] = (i) => n.value = i),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, n.value]
        ])
      ])
    ]));
  }
});
export {
  A as default
};
