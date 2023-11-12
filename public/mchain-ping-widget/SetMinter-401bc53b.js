import { d as M, c as m, r, o as w, a as S, b as k, e, t as d, f as I, w as p, h as f, i as V } from "./main-cc910e20.js";
import { I as B } from "./IdentityIcon-e76b9c9f.js";
const N = { class: "form-control" }, O = { class: "label" }, U = { class: "label-text" }, j = { class: "flex p-2" }, q = { class: "ml-2 text-base" }, D = { class: "form-control" }, z = { class: "label" }, C = { class: "label-text" }, E = { class: "form-control" }, J = { class: "label" }, T = { class: "label-text" }, G = /* @__PURE__ */ M({
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
  setup(i, { expose: _, emit: b }) {
    const n = i, a = (s) => V(n.locale, s), v = m(() => JSON.parse(n.params || "{}")), l = r(v.value.denom || ""), o = r(""), y = r(""), g = m(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgSetMinter",
        value: {
          denom: l.value,
          oldMinter: y.value || n.sender,
          newMinter: o.value
        }
      }
    ]), h = m(() => {
      let s = !0, t = "";
      return n.sender || (s = !1, t = a("sender_empty")), l.value || (s = !1, t = a("denom_empty")), o.value || (s = !1, t = a("new_minter_empty")), { ok: s, error: t };
    }), c = r(null);
    function x() {
      c.value && c.value.focus();
    }
    return w(() => {
      b("loaded");
    }), _({ msgs: g, isValid: h, initial: x }), (s, t) => (S(), k("div", null, [
      e("div", N, [
        e("label", O, [
          e("span", U, d(a("your_connected_account")), 1)
        ]),
        e("div", j, [
          I(B, {
            size: "small",
            address: i.sender
          }, null, 8, ["address"]),
          e("span", q, d(i.sender), 1)
        ])
      ]),
      e("div", D, [
        e("label", z, [
          e("span", C, d(a("denom")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (u) => l.value = u),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, l.value]
        ])
      ]),
      e("div", E, [
        e("label", J, [
          e("span", T, d(a("new_minter")), 1)
        ]),
        p(e("input", {
          ref_key: "focusInput",
          ref: c,
          "onUpdate:modelValue": t[1] || (t[1] = (u) => o.value = u),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, o.value]
        ])
      ])
    ]));
  }
});
export {
  G as default
};
