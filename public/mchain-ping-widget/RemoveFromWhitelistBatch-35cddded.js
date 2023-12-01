import { d as g, c as u, r as m, o as k, a as S, b as B, e, t as r, f as I, w as p, h as _, i as V } from "./main-a00ca3ce.js";
import { I as w } from "./IdentityIcon-ebc7f7f3.js";
const W = { class: "form-control" }, M = { class: "label" }, N = { class: "label-text" }, O = { class: "flex p-2" }, U = { class: "ml-2 text-base" }, j = { class: "form-control" }, q = { class: "label" }, D = { class: "label-text" }, F = { class: "form-control" }, R = { class: "label" }, z = { class: "label-text" }, E = /* @__PURE__ */ g({
  __name: "RemoveFromWhitelistBatch",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(i, { expose: f, emit: v }) {
    const n = i, a = (t) => V(n.locale || "en", t), b = u(() => JSON.parse(n.params || "{}")), d = m(b.value.denom || ""), o = m(""), h = u(() => {
      const t = o.value.split(`
`).filter((s) => s && s.startsWith("m"));
      return [
        {
          typeUrl: "/mchain.smarttoken.v1beta1.MsgRemoveFromWhitelistBatch",
          value: {
            denom: d.value,
            authority: n.sender,
            addresses: t
          }
        }
      ];
    }), y = u(() => {
      let t = !0, s = "";
      return n.sender || (t = !1, s = a("sender_empty")), d.value || (t = !1, s = a("denom_empty")), (!o.value || !o.value.split(`
`).some((l) => l.startsWith("m"))) && (t = !1, s = a("address_empty")), { ok: t, error: s };
    }), c = m(null);
    function x() {
      c.value && c.value.focus();
    }
    return k(() => {
      v("loaded");
    }), f({ msgs: h, isValid: y, initial: x }), (t, s) => (S(), B("div", null, [
      e("div", W, [
        e("label", M, [
          e("span", N, r(a("your_connected_account")), 1)
        ]),
        e("div", O, [
          I(w, {
            size: "small",
            address: i.sender
          }, null, 8, ["address"]),
          e("span", U, r(i.sender), 1)
        ])
      ]),
      e("div", j, [
        e("label", q, [
          e("span", D, r(a("denom")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (l) => d.value = l),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, d.value]
        ])
      ]),
      e("div", F, [
        e("label", R, [
          e("span", z, r(a("addresses")) + " (" + r(a("one_address_per_line")) + ") ", 1)
        ]),
        p(e("textarea", {
          ref_key: "focusInput",
          ref: c,
          "onUpdate:modelValue": s[1] || (s[1] = (l) => o.value = l),
          class: "textarea textarea-bordered border-gray-300 dark:border-gray-600 rounded-3xl",
          rows: "4"
        }, null, 512), [
          [_, o.value]
        ])
      ])
    ]));
  }
});
export {
  E as default
};
