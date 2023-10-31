import { d as x, c as m, r as i, o as w, a as k, b as e, t as n, e as S, w as _, g as f, h as A } from "./main-e92b1fb4.js";
import { I as V } from "./IdentityIcon-7b14663f.js";
const I = { class: "form-control" }, U = { class: "label" }, B = { class: "label-text" }, N = { class: "flex pl-2" }, O = { class: "ml-2 text-base" }, j = { class: "form-control" }, q = { class: "label" }, D = { class: "label-text" }, M = { class: "form-control" }, z = { class: "label" }, C = { class: "label-text" }, E = { class: "form-control" }, J = { class: "label" }, T = { class: "label-text" }, H = /* @__PURE__ */ x({
  __name: "SetAuthority",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(c, { expose: b }) {
    const a = c, s = (l) => A(a.locale, l), v = m(() => JSON.parse(a.params || "{}")), d = i(v.value.denom || ""), u = i(""), o = i(""), y = m(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgSetAuthority",
        value: {
          denom: d.value,
          oldAuthority: o.value || a.sender,
          newAuthority: u.value
        }
      }
    ]), h = m(() => {
      let l = !0, t = "";
      return a.sender || (l = !1, t = s("sender_empty")), d.value || (l = !1, t = s("denom_empty")), o.value || (l = !1, t = s("old_authority_empty")), u.value || (l = !1, t = s("new_authority_empty")), { ok: l, error: t };
    }), p = i(null);
    function g() {
      p.value && p.value.focus(), o.value = a.sender;
    }
    return b({ msgs: y, isValid: h, initial: g }), (l, t) => (w(), k("div", null, [
      e("div", I, [
        e("label", U, [
          e("span", B, n(s("sender")), 1)
        ]),
        e("div", N, [
          S(V, {
            size: "small",
            address: c.sender
          }, null, 8, ["address"]),
          e("span", O, n(c.sender), 1)
        ])
      ]),
      e("div", j, [
        e("label", q, [
          e("span", D, n(s("denom")), 1)
        ]),
        _(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (r) => d.value = r),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, d.value]
        ])
      ]),
      e("div", M, [
        e("label", z, [
          e("span", C, n(s("old_authority")), 1)
        ]),
        _(e("input", {
          "onUpdate:modelValue": t[1] || (t[1] = (r) => o.value = r),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, o.value]
        ])
      ]),
      e("div", E, [
        e("label", J, [
          e("span", T, n(s("new_authority")), 1)
        ]),
        _(e("input", {
          ref_key: "focusInput",
          ref: p,
          "onUpdate:modelValue": t[2] || (t[2] = (r) => u.value = r),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, u.value]
        ])
      ])
    ]));
  }
});
export {
  H as default
};
