import { d as x, c as p, r as n, o as S, a as k, b as e, t as d, e as I, w as f, g as _, h as U } from "./main-e92b1fb4.js";
import { I as V } from "./IdentityIcon-7b14663f.js";
const w = { class: "form-control" }, B = { class: "label" }, N = { class: "label-text" }, O = { class: "flex pl-2" }, j = { class: "ml-2 text-base" }, q = { class: "form-control" }, D = { class: "label" }, M = { class: "label-text" }, z = { class: "form-control" }, C = { class: "label" }, E = { class: "label-text" }, A = /* @__PURE__ */ x({
  __name: "SetUri",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(i, { expose: v }) {
    const l = i, a = (t) => U(l.locale, t), b = p(() => JSON.parse(l.params || "{}")), o = n(b.value.denom || ""), m = n(""), r = n(""), y = p(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgSetUri",
        value: {
          denom: o.value,
          authority: m.value || l.sender,
          uri: r.value
        }
      }
    ]), h = p(() => {
      let t = !0, s = "";
      return l.sender || (t = !1, s = a("sender_empty")), o.value || (t = !1, s = a("denom_empty")), r.value || (t = !1, s = a("uri_empty")), { ok: t, error: s };
    }), u = n(null);
    function g() {
      u.value && u.value.focus(), m.value = l.sender;
    }
    return v({ msgs: y, isValid: h, initial: g }), (t, s) => (S(), k("div", null, [
      e("div", w, [
        e("label", B, [
          e("span", N, d(a("sender")), 1)
        ]),
        e("div", O, [
          I(V, {
            size: "small",
            address: i.sender
          }, null, 8, ["address"]),
          e("span", j, d(i.sender), 1)
        ])
      ]),
      e("div", q, [
        e("label", D, [
          e("span", M, d(a("denom")), 1)
        ]),
        f(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (c) => o.value = c),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, o.value]
        ])
      ]),
      e("div", z, [
        e("label", C, [
          e("span", E, d(a("uri")), 1)
        ]),
        f(e("input", {
          ref_key: "focusInput",
          ref: u,
          "onUpdate:modelValue": s[1] || (s[1] = (c) => r.value = c),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, r.value]
        ])
      ])
    ]));
  }
});
export {
  A as default
};
