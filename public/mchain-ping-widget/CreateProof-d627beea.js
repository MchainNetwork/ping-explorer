import { d as v, c, r as i, o as y, a as g, b as x, e, t as d, f as S, w as k, h as I, i as V } from "./main-8a9bf3b2.js";
import { I as w } from "./IdentityIcon-3f9aeb7d.js";
const B = { class: "form-control" }, C = { class: "label" }, M = { class: "label-text" }, N = { class: "flex p-2" }, O = { class: "ml-2 text-base" }, j = { class: "form-control" }, q = { class: "label" }, D = { class: "label-text" }, z = /* @__PURE__ */ v({
  __name: "CreateProof",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(n, { expose: u, emit: p }) {
    const a = n, o = (s) => V(a.locale || "en", s), f = c(() => JSON.parse(a.params || "{}")), r = i(f.value.hash || ""), m = c(() => [
      {
        typeUrl: "/mchain.proofofexistence.v1beta1.MsgCreateProof",
        value: {
          hash: r.value,
          creator: a.sender
        }
      }
    ]), _ = c(() => {
      let s = !0, t = "";
      return a.sender || (s = !1, t = o("sender_empty")), r.value || (s = !1, t = o("hash_empty")), { ok: s, error: t };
    }), l = i(null);
    function h() {
      l.value && l.value.focus();
    }
    return y(() => {
      p("loaded");
    }), u({ msgs: m, isValid: _, initial: h }), (s, t) => (g(), x("div", null, [
      e("div", B, [
        e("label", C, [
          e("span", M, d(o("your_connected_account")), 1)
        ]),
        e("div", N, [
          S(w, {
            size: "small",
            address: n.sender
          }, null, 8, ["address"]),
          e("span", O, d(n.sender), 1)
        ])
      ]),
      e("div", j, [
        e("label", q, [
          e("span", D, d(o("hash")), 1)
        ]),
        k(e("input", {
          ref_key: "focusInput",
          ref: l,
          "onUpdate:modelValue": t[0] || (t[0] = (b) => r.value = b),
          class: "input border border-gray-300 dark:border-gray-600 w-full"
        }, null, 512), [
          [I, r.value]
        ])
      ])
    ]));
  }
});
export {
  z as default
};
