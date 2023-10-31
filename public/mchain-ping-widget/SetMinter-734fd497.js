import { d as x, c as m, r, o as w, a as M, b as e, t as d, e as S, w as p, g as f, h as k } from "./main-e92b1fb4.js";
import { I } from "./IdentityIcon-7b14663f.js";
const V = { class: "form-control" }, B = { class: "label" }, N = { class: "label-text" }, O = { class: "flex pl-2" }, U = { class: "ml-2 text-base" }, j = { class: "form-control" }, q = { class: "label" }, D = { class: "label-text" }, z = { class: "form-control" }, C = { class: "label" }, E = { class: "label-text" }, A = /* @__PURE__ */ x({
  __name: "SetMinter",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(i, { expose: _ }) {
    const l = i, a = (s) => k(l.locale, s), b = m(() => JSON.parse(l.params || "{}")), n = r(b.value.denom || ""), o = r(""), v = r(""), y = m(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgSetMinter",
        value: {
          denom: n.value,
          oldMinter: v.value || l.sender,
          newMinter: o.value
        }
      }
    ]), g = m(() => {
      let s = !0, t = "";
      return l.sender || (s = !1, t = a("sender_empty")), n.value || (s = !1, t = a("denom_empty")), o.value || (s = !1, t = a("new_minter_empty")), { ok: s, error: t };
    }), c = r(null);
    function h() {
      c.value && c.value.focus();
    }
    return _({ msgs: y, isValid: g, initial: h }), (s, t) => (w(), M("div", null, [
      e("div", V, [
        e("label", B, [
          e("span", N, d(a("sender")), 1)
        ]),
        e("div", O, [
          S(I, {
            size: "small",
            address: i.sender
          }, null, 8, ["address"]),
          e("span", U, d(i.sender), 1)
        ])
      ]),
      e("div", j, [
        e("label", q, [
          e("span", D, d(a("denom")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (u) => n.value = u),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, n.value]
        ])
      ]),
      e("div", z, [
        e("label", C, [
          e("span", E, d(a("new_minter")), 1)
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
  A as default
};
