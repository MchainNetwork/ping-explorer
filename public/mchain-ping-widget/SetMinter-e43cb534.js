import { d as x, c as u, r as m, o as w, a as S, b as k, e, t as r, f as M, w as p, h as f, i as I } from "./main-bfbe582b.js";
import { I as V } from "./IdentityIcon-711d30d2.js";
const B = { class: "form-control" }, N = { class: "label" }, O = { class: "label-text" }, U = { class: "flex p-2" }, j = { class: "ml-2 text-base" }, q = { class: "form-control" }, D = { class: "label" }, z = { class: "label-text" }, C = { class: "form-control" }, E = { class: "label" }, J = { class: "label-text" }, F = /* @__PURE__ */ x({
  __name: "SetMinter",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(d, { expose: _, emit: b }) {
    const n = d, a = (s) => I(n.locale || "en", s), v = u(() => JSON.parse(n.params || "{}")), l = m(v.value.denom || ""), o = m(""), y = u(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgSetMinter",
        value: {
          denom: l.value,
          authority: n.sender,
          newMinter: o.value
        }
      }
    ]), h = u(() => {
      let s = !0, t = "";
      return n.sender || (s = !1, t = a("sender_empty")), l.value || (s = !1, t = a("denom_empty")), o.value || (s = !1, t = a("new_minter_empty")), { ok: s, error: t };
    }), i = m(null);
    function g() {
      i.value && i.value.focus();
    }
    return w(() => {
      b("loaded");
    }), _({ msgs: y, isValid: h, initial: g }), (s, t) => (S(), k("div", null, [
      e("div", B, [
        e("label", N, [
          e("span", O, r(a("your_connected_account")), 1)
        ]),
        e("div", U, [
          M(V, {
            size: "small",
            address: d.sender
          }, null, 8, ["address"]),
          e("span", j, r(d.sender), 1)
        ])
      ]),
      e("div", q, [
        e("label", D, [
          e("span", z, r(a("denom")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (c) => l.value = c),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, l.value]
        ])
      ]),
      e("div", C, [
        e("label", E, [
          e("span", J, r(a("new_minter")), 1)
        ]),
        p(e("input", {
          ref_key: "focusInput",
          ref: i,
          "onUpdate:modelValue": t[1] || (t[1] = (c) => o.value = c),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, o.value]
        ])
      ])
    ]));
  }
});
export {
  F as default
};
