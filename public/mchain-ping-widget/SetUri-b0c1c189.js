import { d as S, c as m, r, o as k, a as I, b as U, e, t as d, f as V, w as f, h as _, i as w } from "./main-d106edc3.js";
import { I as B } from "./IdentityIcon-ddb9ea91.js";
const M = { class: "form-control" }, N = { class: "label" }, O = { class: "label-text" }, j = { class: "flex p-2" }, q = { class: "ml-2 text-base" }, D = { class: "form-control" }, z = { class: "label" }, C = { class: "label-text" }, E = { class: "form-control" }, J = { class: "label" }, T = { class: "label-text" }, G = /* @__PURE__ */ S({
  __name: "SetUri",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(i, { expose: v, emit: b }) {
    const l = i, a = (t) => w(l.locale || "en", t), y = m(() => JSON.parse(l.params || "{}")), o = r(y.value.denom || ""), p = r(""), n = r(""), h = m(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgSetUri",
        value: {
          denom: o.value,
          authority: p.value || l.sender,
          uri: n.value
        }
      }
    ]), g = m(() => {
      let t = !0, s = "";
      return l.sender || (t = !1, s = a("sender_empty")), o.value || (t = !1, s = a("denom_empty")), n.value || (t = !1, s = a("uri_empty")), { ok: t, error: s };
    }), u = r(null);
    function x() {
      u.value && u.value.focus(), p.value = l.sender;
    }
    return k(() => {
      b("loaded");
    }), v({ msgs: h, isValid: g, initial: x }), (t, s) => (I(), U("div", null, [
      e("div", M, [
        e("label", N, [
          e("span", O, d(a("your_connected_account")), 1)
        ]),
        e("div", j, [
          V(B, {
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
        f(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (c) => o.value = c),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, o.value]
        ])
      ]),
      e("div", E, [
        e("label", J, [
          e("span", T, d(a("uri")), 1)
        ]),
        f(e("input", {
          ref_key: "focusInput",
          ref: u,
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
  G as default
};
