import { d as g, c as u, r as m, o as k, a as S, b as B, e, t as r, f as I, w as p, h as _, i as V } from "./main-3a98310b.js";
import { I as w } from "./IdentityIcon-d287570e.js";
const W = { class: "form-control" }, A = { class: "label" }, M = { class: "label-text" }, N = { class: "flex p-2" }, O = { class: "ml-2 text-base" }, T = { class: "form-control" }, U = { class: "label" }, j = { class: "label-text" }, q = { class: "form-control" }, D = { class: "label" }, z = { class: "label-text" }, J = /* @__PURE__ */ g({
  __name: "AddToWhitelistBatch",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(i, { expose: f, emit: b }) {
    const n = i, a = (t) => V(n.locale || "en", t), v = u(() => JSON.parse(n.params || "{}")), d = m(v.value.denom || ""), l = m(""), h = u(() => {
      const t = l.value.split(`
`).filter((s) => s && s.startsWith("m"));
      return [
        {
          typeUrl: "/mchain.smarttoken.v1beta1.MsgAddToWhitelistBatch",
          value: {
            denom: d.value,
            authority: n.sender,
            addresses: t
          }
        }
      ];
    }), y = u(() => {
      let t = !0, s = "";
      return n.sender || (t = !1, s = a("sender_empty")), d.value || (t = !1, s = a("denom_empty")), (!l.value || !l.value.split(`
`).some((o) => o.startsWith("m"))) && (t = !1, s = a("address_empty")), { ok: t, error: s };
    }), c = m(null);
    function x() {
      c.value && c.value.focus();
    }
    return k(() => {
      b("loaded");
    }), f({ msgs: h, isValid: y, initial: x }), (t, s) => (S(), B("div", null, [
      e("div", W, [
        e("label", A, [
          e("span", M, r(a("your_connected_account")), 1)
        ]),
        e("div", N, [
          I(w, {
            size: "small",
            address: i.sender
          }, null, 8, ["address"]),
          e("span", O, r(i.sender), 1)
        ])
      ]),
      e("div", T, [
        e("label", U, [
          e("span", j, r(a("denom")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (o) => d.value = o),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, d.value]
        ])
      ]),
      e("div", q, [
        e("label", D, [
          e("span", z, r(a("addresses")) + " (" + r(a("one_address_per_line")) + ") ", 1)
        ]),
        p(e("textarea", {
          ref_key: "focusInput",
          ref: c,
          "onUpdate:modelValue": s[1] || (s[1] = (o) => l.value = o),
          class: "textarea textarea-bordered border-gray-300 dark:border-gray-600 rounded-3xl",
          rows: "4"
        }, null, 512), [
          [_, l.value]
        ])
      ])
    ]));
  }
});
export {
  J as default
};
