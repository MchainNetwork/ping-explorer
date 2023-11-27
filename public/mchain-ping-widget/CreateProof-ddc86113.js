import { d as g, c as d, r as u, o as x, a as y, b as S, e, t as a, f as k, w as I, h as P, i as V, s as w } from "./main-9a9fe349.js";
import { I as B } from "./IdentityIcon-09901e98.js";
const C = { class: "form-control" }, M = { class: "label" }, N = { class: "label-text" }, O = { class: "flex p-2" }, j = { class: "ml-2 text-base" }, q = { class: "form-control" }, D = { class: "label" }, U = { class: "label-text" }, z = { class: "form-control text-right" }, E = { class: "label" }, F = { class: "label-text" }, A = /* @__PURE__ */ g({
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
  setup(r, { expose: p, emit: f }) {
    const o = r, l = (s) => V(o.locale || "en", s), m = d(() => JSON.parse(o.params || "{}")), n = u(m.value.hash || ""), c = u({}), _ = d(() => [
      {
        typeUrl: "/mchain.proofofexistence.v1beta1.MsgCreateProof",
        value: {
          hash: n.value,
          creator: o.sender
        }
      }
    ]), h = d(() => {
      let s = !0, t = "";
      return o.sender || (s = !1, t = l("sender_empty")), n.value || (s = !1, t = l("hash_empty")), { ok: s, error: t };
    }), i = u(null);
    function b() {
      w(o.endpoint).then((s) => {
        c.value = s.params.issue_fee;
      }), i.value && i.value.focus();
    }
    return x(() => {
      f("loaded");
    }), p({ msgs: _, isValid: h, initial: b }), (s, t) => (y(), S("div", null, [
      e("div", C, [
        e("label", M, [
          e("span", N, a(l("your_connected_account")), 1)
        ]),
        e("div", O, [
          k(B, {
            size: "small",
            address: r.sender
          }, null, 8, ["address"]),
          e("span", j, a(r.sender), 1)
        ])
      ]),
      e("div", q, [
        e("label", D, [
          e("span", U, a(l("hash")), 1)
        ]),
        I(e("input", {
          ref_key: "focusInput",
          ref: i,
          "onUpdate:modelValue": t[0] || (t[0] = (v) => n.value = v),
          disabled: "",
          class: "input border border-gray-300 dark:border-gray-600 w-full"
        }, null, 512), [
          [P, n.value]
        ])
      ]),
      e("div", z, [
        e("label", E, [
          e("span", F, a(l("issue_fee")) + ": " + a(c.value.amount) + " " + a(c.value.denom), 1)
        ])
      ])
    ]));
  }
});
export {
  A as default
};
