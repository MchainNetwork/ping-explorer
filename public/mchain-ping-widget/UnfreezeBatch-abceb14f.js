import { d as g, c as u, r as m, o as k, a as S, b as B, e, t as r, f as I, w as p, h as f, i as U } from "./main-dcfa34f6.js";
import { I as V } from "./IdentityIcon-5797a91d.js";
const w = { class: "form-control" }, z = { class: "label" }, M = { class: "label-text" }, N = { class: "flex p-2" }, O = { class: "ml-2 text-base" }, j = { class: "form-control" }, q = { class: "label" }, D = { class: "label-text" }, W = { class: "form-control" }, A = { class: "label" }, C = { class: "label-text" }, T = /* @__PURE__ */ g({
  __name: "UnfreezeBatch",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(c, { expose: _, emit: b }) {
    const n = c, a = (t) => U(n.locale || "en", t), v = u(() => JSON.parse(n.params || "{}")), d = m(v.value.denom || ""), l = m(""), h = u(() => {
      const t = l.value.split(`
`).filter((s) => s && s.startsWith("m"));
      return [
        {
          typeUrl: "/mchain.smarttoken.v1beta1.MsgUnfreezeBatch",
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
    }), i = m(null);
    function x() {
      i.value && i.value.focus();
    }
    return k(() => {
      b("loaded");
    }), _({ msgs: h, isValid: y, initial: x }), (t, s) => (S(), B("div", null, [
      e("div", w, [
        e("label", z, [
          e("span", M, r(a("your_connected_account")), 1)
        ]),
        e("div", N, [
          I(V, {
            size: "small",
            address: c.sender
          }, null, 8, ["address"]),
          e("span", O, r(c.sender), 1)
        ])
      ]),
      e("div", j, [
        e("label", q, [
          e("span", D, r(a("denom")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (o) => d.value = o),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [f, d.value]
        ])
      ]),
      e("div", W, [
        e("label", A, [
          e("span", C, r(a("addresses")) + " (" + r(a("one_address_per_line")) + ") ", 1)
        ]),
        p(e("textarea", {
          ref_key: "focusInput",
          ref: i,
          "onUpdate:modelValue": s[1] || (s[1] = (o) => l.value = o),
          class: "textarea textarea-bordered border-gray-300 dark:border-gray-600 rounded-3xl",
          rows: "4"
        }, null, 512), [
          [f, l.value]
        ])
      ])
    ]));
  }
});
export {
  T as default
};
