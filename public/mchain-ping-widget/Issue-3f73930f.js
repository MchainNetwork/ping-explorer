import { d as $, c as I, r as t, s as z, o as E, a as r, b as i, e, t as u, f as J, w as f, h as m, p as b, i as A, u as w } from "./main-0ee6a5c8.js";
import { I as F } from "./IdentityIcon-55514251.js";
const G = { class: "form-control" }, H = { class: "label" }, K = { class: "label-text" }, P = { class: "flex p-2" }, Q = { class: "ml-2 text-base" }, R = { class: "form-control" }, W = { class: "label" }, X = { class: "label-text" }, Y = { class: "form-control" }, Z = { class: "label" }, ee = { class: "label-text" }, le = {
  key: 0,
  class: "p-2"
}, se = {
  key: 1,
  class: "form-control"
}, ae = { class: "label" }, te = { class: "label-text" }, oe = { class: "form-control" }, ue = { class: "label" }, ne = { class: "label-text" }, re = {
  key: 2,
  class: "p-2"
}, ie = {
  key: 3,
  class: "form-control"
}, de = { class: "label" }, ce = { class: "label-text" }, pe = {
  key: 4,
  class: "p-2"
}, ve = {
  key: 5,
  class: "form-control"
}, fe = { class: "label" }, me = { class: "label-text" }, ye = /* @__PURE__ */ $({
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
  setup(x, { expose: U, emit: q }) {
    const _ = x, a = (l) => A(_.locale, l);
    I(() => JSON.parse(_.params || "{}"));
    const d = t(""), g = t(""), c = t(""), y = t(""), p = t(""), v = t(""), B = t(""), n = t(!1), h = t(!1), k = t(!1), N = t(), V = t(), C = t();
    function M() {
      n.value = !n.value, n.value && w(() => {
        var l;
        (l = N.value) == null || l.focus();
      });
    }
    function O() {
      h.value = !h.value, h.value && w(() => {
        var l;
        (l = V.value) == null || l.focus();
      });
    }
    function T() {
      k.value = !k.value, k.value && w(() => {
        var l;
        (l = C.value) == null || l.focus();
      });
    }
    z(d, (l) => {
      n.value || (c.value = `u${l}`);
    });
    const j = I(() => (n.value || (c.value = `u${d.value}`), [
      {
        typeUrl: "/mchain.smarttoken.v1beta1.MsgIssue",
        value: {
          subunit: c.value.toLowerCase(),
          symbol: d.value.toLowerCase(),
          name: g.value,
          decimals: y.value,
          initialSupply: p.value,
          maxSupply: v.value,
          authority: _.sender,
          minter: _.sender,
          uri: B.value
        }
      }
    ])), D = I(() => {
      let l = !0, s = "";
      return _.sender || (l = !1, s = a("sender_empty")), g.value.trim() || (l = !1, s = a("name_required")), d.value.trim() || (l = !1, s = a("symbol_required")), c.value.trim() || (l = !1, s = a("subunit_required")), Number(y.value) >= 0 && Number(y.value) <= 18 || (l = !1, s = a("decimals_range")), (!v.value.trim() || isNaN(Number(v.value)) || Number(v.value) <= 0) && (l = !1, s = a("invalid_max_supply")), (!p.value.trim() || isNaN(Number(p.value)) || Number(p.value) <= 0) && (l = !1, s = a("invalid_initial_supply")), { ok: l, error: s };
    }), S = t(null);
    function L() {
      S.value && S.value.focus();
    }
    return E(() => {
      q("loaded");
    }), U({ msgs: j, isValid: D, initial: L }), (l, s) => (r(), i("div", null, [
      e("div", G, [
        e("label", H, [
          e("span", K, u(a("your_connected_account")), 1)
        ]),
        e("div", P, [
          J(F, {
            size: "small",
            address: x.sender
          }, null, 8, ["address"]),
          e("span", Q, u(x.sender), 1)
        ])
      ]),
      e("div", R, [
        e("label", W, [
          e("span", X, u(a("name")), 1)
        ]),
        f(e("input", {
          ref_key: "focusInput",
          ref: S,
          "onUpdate:modelValue": s[0] || (s[0] = (o) => g.value = o),
          placeholder: "Bitcoin",
          class: "input border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [m, g.value]
        ])
      ]),
      e("div", Y, [
        e("label", Z, [
          e("span", ee, u(a("symbol")), 1)
        ]),
        f(e("input", {
          "onUpdate:modelValue": s[1] || (s[1] = (o) => d.value = o),
          placeholder: "BTC",
          class: "input border border-full border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [m, d.value]
        ])
      ]),
      n.value ? b("", !0) : (r(), i("div", le, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: M
        }, u(a("configure_subunit")), 1)
      ])),
      n.value ? (r(), i("div", se, [
        e("label", ae, [
          e("span", te, u(a("subunit")), 1)
        ]),
        f(e("input", {
          ref_key: "subunitInput",
          ref: N,
          "onUpdate:modelValue": s[2] || (s[2] = (o) => c.value = o),
          placeholder: "ubtc",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [m, c.value]
        ])
      ])) : b("", !0),
      e("div", oe, [
        e("label", ue, [
          e("span", ne, u(a("decimals")), 1)
        ]),
        f(e("input", {
          "onUpdate:modelValue": s[3] || (s[3] = (o) => y.value = o),
          placeholder: "6",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [m, y.value]
        ])
      ]),
      k.value ? b("", !0) : (r(), i("div", re, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: T
        }, u(a("configure_max_supply")), 1)
      ])),
      k.value ? (r(), i("div", ie, [
        e("label", de, [
          e("span", ce, u(a("max_supply")), 1)
        ]),
        f(e("input", {
          ref_key: "maxSupplyInput",
          ref: C,
          "onUpdate:modelValue": s[4] || (s[4] = (o) => v.value = o),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [m, v.value]
        ])
      ])) : b("", !0),
      h.value ? b("", !0) : (r(), i("div", pe, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: O
        }, u(a("configure_initial_supply")), 1)
      ])),
      h.value ? (r(), i("div", ve, [
        e("label", fe, [
          e("span", me, u(a("initial_supply")), 1)
        ]),
        f(e("input", {
          ref_key: "initialSupplyInput",
          ref: V,
          "onUpdate:modelValue": s[5] || (s[5] = (o) => p.value = o),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [m, p.value]
        ])
      ])) : b("", !0)
    ]));
  }
});
export {
  ye as default
};
