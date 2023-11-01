import { d as U, c as y, r as o, s as q, o as B, a as h, b as g, e, t as r, f as M, w as p, h as b, p as x, i as O } from "./main-c2a72820.js";
import { I as j } from "./IdentityIcon-f38133db.js";
const D = { class: "form-control" }, L = { class: "label" }, T = { class: "label-text" }, $ = { class: "flex p-2" }, z = { class: "ml-2 text-base" }, E = { class: "form-control" }, J = { class: "label" }, A = { class: "label-text" }, F = { class: "form-control" }, G = { class: "label" }, H = { class: "label-text" }, K = {
  key: 0,
  class: "p-2"
}, P = {
  key: 1,
  class: "form-control"
}, Q = { class: "label" }, R = { class: "label-text" }, W = { class: "form-control" }, X = { class: "label" }, Y = { class: "label-text" }, Z = { class: "form-control" }, ee = { class: "label" }, le = { class: "label-text" }, te = /* @__PURE__ */ U({
  __name: "Issue",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(v, { expose: k, emit: w }) {
    const c = v, s = (a) => O(c.locale, a);
    y(() => JSON.parse(c.params || "{}"));
    const n = o(""), f = o(""), u = o(""), m = o(""), i = o(""), N = o(""), d = o(!1);
    function S() {
      d.value = !d.value;
    }
    q(n, (a) => {
      d.value || (u.value = `u${a}`);
    });
    const V = y(() => (d.value || (u.value = `u${n.value}`), [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgIssue",
        value: {
          subunit: u.value.toLowerCase(),
          symbol: n.value.toLowerCase(),
          name: f.value,
          decimals: m.value,
          maxSupply: i.value,
          authority: c.sender,
          minter: c.sender,
          uri: N.value
        }
      }
    ])), I = y(() => {
      let a = !0, l = "";
      return c.sender ? f.value.trim() ? n.value.trim() ? u.value.trim() ? Number(m.value) >= 0 && Number(m.value) <= 18 ? (!i.value.trim() || isNaN(Number(i.value)) || Number(i.value) <= 0) && (a = !1, l = s("invalid_max_supply")) : (a = !1, l = s("decimals_range")) : (a = !1, l = s("subunit_required")) : (a = !1, l = s("symbol_required")) : (a = !1, l = s("name_required")) : (a = !1, l = s("sender_empty")), { ok: a, error: l };
    }), _ = o(null);
    function C() {
      _.value && _.value.focus();
    }
    return B(() => {
      w("loaded");
    }), k({ msgs: V, isValid: I, initial: C }), (a, l) => (h(), g("div", null, [
      e("div", D, [
        e("label", L, [
          e("span", T, r(s("your_connected_account")), 1)
        ]),
        e("div", $, [
          M(j, {
            size: "small",
            address: v.sender
          }, null, 8, ["address"]),
          e("span", z, r(v.sender), 1)
        ])
      ]),
      e("div", E, [
        e("label", J, [
          e("span", A, r(s("name")), 1)
        ]),
        p(e("input", {
          ref_key: "focusInput",
          ref: _,
          "onUpdate:modelValue": l[0] || (l[0] = (t) => f.value = t),
          placeholder: "Bitcoin",
          class: "input border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, f.value]
        ])
      ]),
      e("div", F, [
        e("label", G, [
          e("span", H, r(s("symbol")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": l[1] || (l[1] = (t) => n.value = t),
          placeholder: "BTC",
          class: "input border border-full border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, n.value]
        ])
      ]),
      d.value ? x("", !0) : (h(), g("div", K, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: S
        }, r(s("configure_subunit")), 1)
      ])),
      d.value ? (h(), g("div", P, [
        e("label", Q, [
          e("span", R, r(s("subunit")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": l[2] || (l[2] = (t) => u.value = t),
          placeholder: "ubtc",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, u.value]
        ])
      ])) : x("", !0),
      e("div", W, [
        e("label", X, [
          e("span", Y, r(s("decimals")), 1)
        ]),
        p(e("input", {
          "onUpdate:modelValue": l[3] || (l[3] = (t) => m.value = t),
          placeholder: "6",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, m.value]
        ])
      ]),
      e("div", Z, [
        e("label", ee, [
          e("span", le, r(s("max_supply")), 1)
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
  te as default
};
