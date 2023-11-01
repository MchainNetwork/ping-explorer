import { d as $, c as w, r as s, o as A, a as u, b as n, e, t as r, f as F, w as y, h as k, p as c, i as G, s as S } from "./main-6f623a49.js";
import { I as H } from "./IdentityIcon-9dc0c59f.js";
const K = { class: "form-control" }, P = { class: "label" }, Q = { class: "label-text" }, R = { class: "flex p-2" }, W = { class: "ml-2 text-base" }, X = { class: "form-control" }, Y = { class: "label" }, Z = { class: "label-text" }, ee = { class: "form-control" }, le = { class: "label" }, ae = { class: "label-text" }, se = {
  key: 0,
  class: "p-2"
}, te = {
  key: 1,
  class: "form-control"
}, re = { class: "label" }, oe = { class: "label-text" }, ue = {
  key: 2,
  class: "p-2"
}, ne = {
  key: 3,
  class: "form-control"
}, ie = { class: "label" }, de = { class: "label-text" }, ce = {
  key: 4,
  class: "p-2"
}, pe = {
  key: 5,
  class: "form-control"
}, ve = { class: "label" }, fe = { class: "label-text" }, me = {
  key: 6,
  class: "p-2"
}, be = {
  key: 7,
  class: "form-control"
}, _e = { class: "label" }, ye = { class: "label-text" }, ge = /* @__PURE__ */ $({
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
  setup(N, { expose: q, emit: B }) {
    const h = N, l = (a) => G(h.locale, a);
    w(() => JSON.parse(h.params || "{}"));
    const f = s(""), x = s(""), g = s(""), i = s("6"), p = s("0"), v = s("0"), D = s(""), m = s(!1), d = s(!1), b = s(!1), _ = s(!1), V = s(), C = s(), M = s(), U = s();
    function O() {
      m.value = !m.value, m.value && S(() => {
        var a;
        (a = V.value) == null || a.focus();
      });
    }
    function T() {
      d.value = !d.value, d.value && S(() => {
        var a;
        (a = C.value) == null || a.focus();
      });
    }
    function j() {
      b.value = !b.value, b.value && (p.value = "", S(() => {
        var a;
        (a = M.value) == null || a.focus();
      }));
    }
    function L() {
      _.value = !_.value, _.value && (v.value = "", S(() => {
        var a;
        (a = U.value) == null || a.focus();
      }));
    }
    const z = w(() => {
      d.value || (g.value = Number(i.value) > 0 ? `u${f.value}` : f.value);
      const a = Number(p.value) * Math.pow(10, Number(i.value)), t = Number(v.value) * Math.pow(10, Number(i.value));
      return [
        {
          typeUrl: "/mchain.smarttoken.v1beta1.MsgIssue",
          value: {
            subunit: g.value.toLowerCase(),
            symbol: f.value.toLowerCase(),
            name: x.value,
            decimals: i.value,
            initialSupply: a.toString(),
            maxSupply: t.toString(),
            authority: h.sender,
            minter: h.sender,
            uri: D.value
          }
        }
      ];
    }), E = w(() => h.sender ? x.value.trim() ? f.value.trim() ? d.value && !g.value.trim() ? { ok: !1, error: l("subunit_required") } : Number(i.value) >= 0 && Number(i.value) <= 18 ? !v.value.trim() || isNaN(Number(v.value)) || Number(v.value) < 0 ? { ok: !1, error: l("invalid_max_supply") } : !p.value.trim() || isNaN(Number(p.value)) || Number(p.value) < 0 ? { ok: !1, error: l("invalid_initial_supply") } : { ok: !0, error: "" } : { ok: !1, error: l("decimals_range") } : { ok: !1, error: l("symbol_required") } : { ok: !1, error: l("name_required") } : { ok: !1, error: l("sender_empty") }), I = s(null);
    function J() {
      m.value = !1, d.value = !1, b.value = !1, _.value = !1, I.value && I.value.focus();
    }
    return A(() => {
      B("loaded");
    }), q({ msgs: z, isValid: E, initial: J }), (a, t) => (u(), n("div", null, [
      e("div", K, [
        e("label", P, [
          e("span", Q, r(l("your_connected_account")), 1)
        ]),
        e("div", R, [
          F(H, {
            size: "small",
            address: N.sender
          }, null, 8, ["address"]),
          e("span", W, r(N.sender), 1)
        ])
      ]),
      e("div", X, [
        e("label", Y, [
          e("span", Z, r(l("name")), 1)
        ]),
        y(e("input", {
          ref_key: "focusInput",
          ref: I,
          "onUpdate:modelValue": t[0] || (t[0] = (o) => x.value = o),
          placeholder: "Bitcoin",
          class: "input border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [k, x.value]
        ])
      ]),
      e("div", ee, [
        e("label", le, [
          e("span", ae, r(l("symbol")), 1)
        ]),
        y(e("input", {
          "onUpdate:modelValue": t[1] || (t[1] = (o) => f.value = o),
          placeholder: "BTC",
          class: "input border border-full border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [k, f.value]
        ])
      ]),
      m.value ? c("", !0) : (u(), n("div", se, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: O
        }, r(l("configure_decimals")), 1)
      ])),
      m.value ? (u(), n("div", te, [
        e("label", re, [
          e("span", oe, r(l("decimals")), 1)
        ]),
        y(e("input", {
          ref_key: "decimalsInput",
          ref: V,
          "onUpdate:modelValue": t[2] || (t[2] = (o) => i.value = o),
          placeholder: "6",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [k, i.value]
        ])
      ])) : c("", !0),
      d.value ? c("", !0) : (u(), n("div", ue, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: T
        }, r(l("configure_subunit")), 1)
      ])),
      d.value ? (u(), n("div", ne, [
        e("label", ie, [
          e("span", de, r(l("subunit")), 1)
        ]),
        y(e("input", {
          ref_key: "subunitInput",
          ref: C,
          "onUpdate:modelValue": t[3] || (t[3] = (o) => g.value = o),
          placeholder: "ubtc",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [k, g.value]
        ])
      ])) : c("", !0),
      _.value ? c("", !0) : (u(), n("div", ce, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: L
        }, r(l("configure_max_supply")), 1)
      ])),
      _.value ? (u(), n("div", pe, [
        e("label", ve, [
          e("span", fe, r(l("max_supply")), 1)
        ]),
        y(e("input", {
          ref_key: "maxSupplyInput",
          ref: U,
          "onUpdate:modelValue": t[4] || (t[4] = (o) => v.value = o),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [k, v.value]
        ])
      ])) : c("", !0),
      b.value ? c("", !0) : (u(), n("div", me, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: j
        }, r(l("configure_initial_supply")), 1)
      ])),
      b.value ? (u(), n("div", be, [
        e("label", _e, [
          e("span", ye, r(l("initial_supply")), 1)
        ]),
        y(e("input", {
          ref_key: "initialSupplyInput",
          ref: M,
          "onUpdate:modelValue": t[5] || (t[5] = (o) => p.value = o),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [k, p.value]
        ])
      ])) : c("", !0)
    ]));
  }
});
export {
  ge as default
};
