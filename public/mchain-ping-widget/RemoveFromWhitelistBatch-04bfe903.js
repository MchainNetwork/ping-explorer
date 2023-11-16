import { d as g, c as u, r as m, o as k, a as S, b as B, e, t as o, f as I, w as p, h as _, i as V } from "./main-d106edc3.js";
import { I as w } from "./IdentityIcon-ddb9ea91.js";
const M = { class: "form-control" }, N = { class: "label" }, O = { class: "label-text" }, U = { class: "flex p-2" }, j = { class: "ml-2 text-base" }, q = { class: "form-control" }, D = { class: "label" }, F = { class: "label-text" }, R = { class: "form-control" }, W = { class: "label" }, z = { class: "label-text" }, J = /* @__PURE__ */ g({
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
  setup(d, { expose: f, emit: v }) {
    const l = d, t = (a) => V(l.locale || "en", a), b = u(() => JSON.parse(l.params || "{}")), r = m(b.value.denom || ""), n = m(""), h = u(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgRemoveFromWhitelistBatch",
        value: {
          denom: r.value,
          authority: l.sender,
          addresses: n.value.split(`
`)
        }
      }
    ]), y = u(() => {
      let a = !0, s = "";
      return l.sender || (a = !1, s = t("sender_empty")), r.value || (a = !1, s = t("denom_empty")), n.value || (a = !1, s = t("address_empty")), { ok: a, error: s };
    }), c = m(null);
    function x() {
      c.value && c.value.focus();
    }
    return k(() => {
      v("loaded");
    }), f({ msgs: h, isValid: y, initial: x }), (a, s) => (S(), B("div", null, [
      e("div", M, [
        e("label", N, [
          e("span", O, o(t("your_connected_account")), 1)
        ]),
        e("div", U, [
          I(w, {
            size: "small",
            address: d.sender
          }, null, 8, ["address"]),
          e("span", j, o(d.sender), 1)
        ])
      ]),
      e("div", q, [
        e("label", D, [
          e("span", F, o(t("denom")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (i) => r.value = i),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, r.value]
        ])
      ]),
      e("div", R, [
        e("label", W, [
          e("span", z, o(t("addresses")) + " (" + o(t("one_address_per_line")) + ") ", 1)
        ]),
        p(e("textarea", {
          ref_key: "focusInput",
          ref: c,
          "onUpdate:modelValue": s[1] || (s[1] = (i) => n.value = i),
          class: "textarea textarea-bordered border-gray-300 dark:border-gray-600 rounded-3xl",
          rows: "4"
        }, null, 512), [
          [_, n.value]
        ])
      ])
    ]));
  }
});
export {
  J as default
};
