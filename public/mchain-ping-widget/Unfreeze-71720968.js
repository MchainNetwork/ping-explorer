import { d as x, c as u, r as m, o as k, a as S, b as I, e, t as r, f as U, w as f, h as _, i as V } from "./main-9a9fe349.js";
import { I as w } from "./IdentityIcon-09901e98.js";
const z = { class: "form-control" }, B = { class: "label" }, M = { class: "label-text" }, N = { class: "flex p-2" }, O = { class: "ml-2 text-base" }, j = { class: "form-control" }, q = { class: "label" }, D = { class: "label-text" }, C = { class: "form-control" }, E = { class: "label" }, J = { class: "label-text" }, F = /* @__PURE__ */ x({
  __name: "Unfreeze",
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
    const l = d, a = (t) => V(l.locale || "en", t), p = u(() => JSON.parse(l.params || "{}")), o = m(p.value.denom || ""), n = m(p.value.address || ""), y = u(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgUnfreeze",
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
      e("div", z, [
        e("label", B, [
          e("span", M, r(a("your_connected_account")), 1)
        ]),
        e("div", N, [
          U(w, {
            size: "small",
            address: d.sender
          }, null, 8, ["address"]),
          e("span", O, r(d.sender), 1)
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
      e("div", C, [
        e("label", E, [
          e("span", J, r(a("address")), 1)
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
  F as default
};
