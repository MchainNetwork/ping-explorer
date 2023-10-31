import { d as C, c as y, r as o, s as U, o as h, a as g, b as e, t as r, e as q, w as p, g as b, n as x, h as B } from "./main-e92b1fb4.js";
import { I as O } from "./IdentityIcon-7b14663f.js";
const j = { class: "form-control" }, D = { class: "label" }, L = { class: "label-text" }, M = { class: "flex pl-2" }, T = { class: "ml-2 text-base" }, $ = { class: "form-control" }, z = { class: "label" }, E = { class: "label-text" }, J = { class: "form-control" }, A = { class: "label" }, F = { class: "label-text" }, G = {
  key: 0,
  class: "p-2"
}, H = {
  key: 1,
  class: "form-control"
}, K = { class: "label" }, P = { class: "label-text" }, Q = { class: "form-control" }, R = { class: "label" }, W = { class: "label-text" }, X = { class: "form-control" }, Y = { class: "label" }, Z = { class: "label-text" }, se = /* @__PURE__ */ C({
  __name: "Issue",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(f, { expose: k }) {
    const c = f, s = (a) => B(c.locale, a);
    y(() => JSON.parse(c.params || "{}"));
    const n = o(""), v = o(""), u = o(""), m = o(""), i = o(""), w = o(""), d = o(!1);
    function N() {
      d.value = !d.value;
    }
    U(n, (a) => {
      d.value || (u.value = `u${a}`);
    });
    const S = y(() => (d.value || (u.value = `u${n.value}`), [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgIssue",
        value: {
          subunit: u.value.toLowerCase(),
          symbol: n.value.toLowerCase(),
          name: v.value,
          decimals: m.value,
          maxSupply: i.value,
          authority: c.sender,
          minter: c.sender,
          uri: w.value
        }
      }
    ])), V = y(() => {
      let a = !0, l = "";
      return c.sender ? v.value.trim() ? n.value.trim() ? u.value.trim() ? Number(m.value) >= 0 && Number(m.value) <= 18 ? (!i.value.trim() || isNaN(Number(i.value)) || Number(i.value) <= 0) && (a = !1, l = s("invalid_max_supply")) : (a = !1, l = s("decimals_range")) : (a = !1, l = s("subunit_required")) : (a = !1, l = s("symbol_required")) : (a = !1, l = s("name_required")) : (a = !1, l = s("sender_empty")), { ok: a, error: l };
    }), _ = o(null);
    function I() {
      _.value && _.value.focus();
    }
    return k({ msgs: S, isValid: V, initial: I }), (a, l) => (h(), g("div", null, [
      e("div", j, [
        e("label", D, [
          e("span", L, r(s("sender")), 1)
        ]),
        e("div", M, [
          q(O, {
            size: "small",
            address: f.sender
          }, null, 8, ["address"]),
          e("span", T, r(f.sender), 1)
        ])
      ]),
      e("div", $, [
        e("label", z, [
          e("span", E, r(s("name")), 1)
        ]),
        p(e("input", {
          ref_key: "focusInput",
          ref: _,
          "onUpdate:modelValue": l[0] || (l[0] = (t) => v.value = t),
          placeholder: "Bitcoin",
          class: "input border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, v.value]
        ])
      ]),
      e("div", J, [
        e("label", A, [
          e("span", F, r(s("symbol")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": l[1] || (l[1] = (t) => n.value = t),
          placeholder: "BTC",
          class: "input border border-full border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, n.value]
        ])
      ]),
      d.value ? x("", !0) : (h(), g("div", G, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: N
        }, r(s("configure_subunit")), 1)
      ])),
      d.value ? (h(), g("div", H, [
        e("label", K, [
          e("span", P, r(s("subunit")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": l[2] || (l[2] = (t) => u.value = t),
          placeholder: "ubtc",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, u.value]
        ])
      ])) : x("", !0),
      e("div", Q, [
        e("label", R, [
          e("span", W, r(s("decimals")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": l[3] || (l[3] = (t) => m.value = t),
          placeholder: "6",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, m.value]
        ])
      ]),
      e("div", X, [
        e("label", Y, [
          e("span", Z, r(s("max_supply")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": l[4] || (l[4] = (t) => i.value = t),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, i.value]
        ])
      ])
    ]));
  }
});
export {
  se as default
};
