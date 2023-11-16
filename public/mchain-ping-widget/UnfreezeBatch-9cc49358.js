import { d as g, c as u, r as m, o as k, a as S, b as B, e, t as o, f as I, w as p, h as _, i as U } from "./main-d106edc3.js";
import { I as V } from "./IdentityIcon-ddb9ea91.js";
const w = { class: "form-control" }, z = { class: "label" }, M = { class: "label-text" }, N = { class: "flex p-2" }, O = { class: "ml-2 text-base" }, j = { class: "form-control" }, q = { class: "label" }, D = { class: "label-text" }, C = { class: "form-control" }, E = { class: "label" }, J = { class: "label-text" }, F = /* @__PURE__ */ g({
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
  setup(d, { expose: f, emit: b }) {
    const l = d, t = (a) => U(l.locale || "en", a), v = u(() => JSON.parse(l.params || "{}")), r = m(v.value.denom || ""), n = m(""), y = u(() => [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgUnfreezeBatch",
        value: {
          denom: r.value,
          authority: l.sender,
          addresses: n.value.split(`
`)
        }
      }
    ]), h = u(() => {
      let a = !0, s = "";
      return l.sender || (a = !1, s = t("sender_empty")), r.value || (a = !1, s = t("denom_empty")), n.value || (a = !1, s = t("address_empty")), { ok: a, error: s };
    }), c = m(null);
    function x() {
      c.value && c.value.focus();
    }
    return k(() => {
      b("loaded");
    }), f({ msgs: y, isValid: h, initial: x }), (a, s) => (S(), B("div", null, [
      e("div", w, [
        e("label", z, [
          e("span", M, o(t("your_connected_account")), 1)
        ]),
        e("div", N, [
          I(V, {
            size: "small",
            address: d.sender
          }, null, 8, ["address"]),
          e("span", O, o(d.sender), 1)
        ])
      ]),
      e("div", j, [
        e("label", q, [
          e("span", D, o(t("denom")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": s[0] || (s[0] = (i) => r.value = i),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, r.value]
        ])
      ]),
      e("div", C, [
        e("label", E, [
          e("span", J, o(t("addresses")) + " (" + o(t("one_address_per_line")) + ") ", 1)
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
  F as default
};
