import { d as se, r as n, c as M, o as te, a as u, b as c, e, t as o, f as ae, w as i, h as _, s as x, p as d, u as L, i as ne, x as S } from "./main-a0451e5b.js";
import { I as oe } from "./IdentityIcon-49e1a1a6.js";
const re = { class: "form-control" }, ie = { class: "label" }, ue = { class: "label-text" }, ce = { class: "flex p-2" }, de = { class: "ml-2 text-base" }, pe = { class: "form-control mb-2" }, ve = { class: "label" }, me = { class: "label-text" }, be = { class: "form-control mb-2" }, fe = { class: "label" }, _e = { class: "label-text" }, ye = { class: "form-control" }, ke = { class: "label cursor-pointer" }, he = { class: "label-text" }, ge = { class: "grid grid-cols-1 md:grid-cols-3 gap-2 p-2" }, xe = { class: "cursor-pointer flex items-center mb-2" }, Se = { class: "label-text" }, we = { class: "cursor-pointer flex items-center mb-2" }, Ve = { class: "label-text" }, Ie = { class: "cursor-pointer flex items-center mb-2" }, Ne = { class: "label-text" }, Ce = { class: "cursor-pointer flex items-center mb-2" }, Be = { class: "label-text" }, Ue = { class: "cursor-pointer flex items-center mb-2" }, Re = { class: "label-text" }, Me = { class: "cursor-pointer flex items-center mb-2" }, ze = { class: "label-text" }, $e = {
  key: 0,
  class: "p-2"
}, qe = {
  key: 1,
  class: "form-control"
}, De = { class: "label" }, Oe = { class: "label-text" }, je = {
  key: 2,
  class: "p-2"
}, Ee = {
  key: 3,
  class: "form-control"
}, Le = { class: "label" }, Je = { class: "label-text" }, Pe = {
  key: 4,
  class: "p-2"
}, Ae = ["onClick"], Ge = {
  key: 5,
  class: "form-control"
}, He = { class: "label" }, Ke = { class: "label-text" }, Qe = {
  key: 6,
  class: "p-2"
}, We = ["onClick"], Xe = {
  key: 7,
  class: "form-control"
}, Ye = { class: "label" }, Ze = { class: "label-text" }, Te = {
  key: 8,
  class: "p-2"
}, Fe = {
  key: 9,
  class: "form-control"
}, el = { class: "label" }, ll = { class: "label-text" }, sl = {
  key: 10,
  class: "p-2"
}, tl = {
  key: 11,
  class: "form-control"
}, al = { class: "label" }, nl = { class: "label-text" };
var J = /* @__PURE__ */ ((p) => (p.minting = "minting", p.burning = "burning", p.sending = "sending", p.free_send = "free_send", p.whitelist = "whitelist", p.freezing = "freezing", p))(J || {});
const il = /* @__PURE__ */ se({
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
  setup(p, { expose: P, emit: A }) {
    const B = p, t = (a) => ne(B.locale, a), y = n(""), U = n(""), w = n(""), m = n("0"), v = n("0"), b = n("0"), G = n(""), V = n("0"), I = n("0"), r = n(Object.values(J)), H = M(
      () => r.value.includes(
        "minting"
        /* minting */
      )
    ), k = n(!1), f = n(!1), h = n(!1), g = n(!1), N = n(!1), C = n(!1), z = n(), $ = n(), q = n(), D = n(), O = n(), j = n();
    function K() {
      k.value = !k.value, k.value && S(() => {
        var a;
        (a = z.value) == null || a.focus();
      });
    }
    function Q() {
      f.value = !f.value, f.value && S(() => {
        var a;
        (a = $.value) == null || a.focus();
      });
    }
    function W() {
      h.value = !h.value, h.value && (v.value = "", S(() => {
        var a;
        (a = q.value) == null || a.focus();
      }));
    }
    function X() {
      g.value = !g.value, g.value && (b.value = "", S(() => {
        var a;
        (a = D.value) == null || a.focus();
      }));
    }
    function Y() {
      N.value = !N.value, N.value && S(() => {
        var a;
        (a = O.value) == null || a.focus();
      });
    }
    function Z() {
      C.value = !C.value, C.value && S(() => {
        var a;
        (a = j.value) == null || a.focus();
      });
    }
    function E(a) {
      const l = parseFloat(a.replace("%", ""));
      return isNaN(l) ? 0 : l / 100;
    }
    const T = M(() => {
      f.value || (w.value = Number(m.value) > 0 ? `u${y.value}` : y.value);
      const a = Number(v.value) * Math.pow(10, Number(m.value)), l = Number(b.value) * Math.pow(10, Number(m.value)), s = E(V.value), le = E(I.value);
      return alert(JSON.stringify(r.value)), [
        {
          typeUrl: "/mchain.smarttoken.v1beta1.MsgIssue",
          value: {
            subunit: w.value.toLowerCase(),
            symbol: y.value.toLowerCase(),
            name: U.value,
            decimals: m.value,
            initialSupply: a.toString(),
            maxSupply: l.toString(),
            authority: B.sender,
            minter: B.sender,
            uri: G.value,
            sendBurnRate: s.toString(),
            sendCommissionRate: le.toString(),
            features: r.value
          }
        }
      ];
    }), F = M(() => B.sender ? U.value.trim() ? y.value.trim() ? f.value && !w.value.trim() ? { ok: !1, error: t("subunit_required") } : Number(m.value) >= 0 && Number(m.value) <= 18 ? !b.value.trim() || isNaN(Number(b.value)) || Number(b.value) < 0 ? { ok: !1, error: t("invalid_max_supply") } : !v.value.trim() || isNaN(Number(v.value)) || Number(v.value) < 0 ? { ok: !1, error: t("invalid_initial_supply") } : !H.value && (!v.value.trim() || Number(v.value) === 0) ? { ok: !1, error: t("minting_disabled_initial_supply_zero") } : { ok: !0, error: "" } : { ok: !1, error: t("decimals_range") } : { ok: !1, error: t("symbol_required") } : { ok: !1, error: t("name_required") } : { ok: !1, error: t("sender_empty") }), R = n(null);
    function ee() {
      k.value = !1, f.value = !1, h.value = !1, g.value = !1, R.value && R.value.focus();
    }
    return te(() => {
      A("loaded");
    }), P({ msgs: T, isValid: F, initial: ee }), (a, l) => (u(), c("div", null, [
      e("div", re, [
        e("label", ie, [
          e("span", ue, o(t("your_connected_account")), 1)
        ]),
        e("div", ce, [
          ae(oe, {
            size: "small",
            address: p.sender
          }, null, 8, ["address"]),
          e("span", de, o(p.sender), 1)
        ])
      ]),
      e("div", pe, [
        e("label", ve, [
          e("span", me, o(t("name")), 1)
        ]),
        i(e("input", {
          ref_key: "focusInput",
          ref: R,
          "onUpdate:modelValue": l[0] || (l[0] = (s) => U.value = s),
          placeholder: "Bitcoin",
          class: "input border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, U.value]
        ])
      ]),
      e("div", be, [
        e("label", fe, [
          e("span", _e, o(t("symbol")), 1)
        ]),
        i(e("input", {
          "onUpdate:modelValue": l[1] || (l[1] = (s) => y.value = s),
          placeholder: "BTC",
          class: "input border border-full border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, y.value]
        ])
      ]),
      e("div", ye, [
        e("label", ke, [
          e("span", he, o(t("features")), 1)
        ]),
        e("div", ge, [
          e("label", xe, [
            i(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: "minting",
              "onUpdate:modelValue": l[2] || (l[2] = (s) => r.value = s)
            }, null, 512), [
              [x, r.value]
            ]),
            e("span", Se, o(t("minting")), 1)
          ]),
          e("label", we, [
            i(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: "burning",
              "onUpdate:modelValue": l[3] || (l[3] = (s) => r.value = s)
            }, null, 512), [
              [x, r.value]
            ]),
            e("span", Ve, o(t("burning")), 1)
          ]),
          e("label", Ie, [
            i(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: "sending",
              "onUpdate:modelValue": l[4] || (l[4] = (s) => r.value = s)
            }, null, 512), [
              [x, r.value]
            ]),
            e("span", Ne, o(t("sending")), 1)
          ]),
          e("label", Ce, [
            i(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: "free_send",
              "onUpdate:modelValue": l[5] || (l[5] = (s) => r.value = s)
            }, null, 512), [
              [x, r.value]
            ]),
            e("span", Be, o(t("free_send")), 1)
          ]),
          e("label", Ue, [
            i(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: "whitelist",
              "onUpdate:modelValue": l[6] || (l[6] = (s) => r.value = s)
            }, null, 512), [
              [x, r.value]
            ]),
            e("span", Re, o(t("whitelist")), 1)
          ]),
          e("label", Me, [
            i(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: "freezing",
              "onUpdate:modelValue": l[7] || (l[7] = (s) => r.value = s)
            }, null, 512), [
              [x, r.value]
            ]),
            e("span", ze, o(t("freezing")), 1)
          ])
        ])
      ]),
      k.value ? d("", !0) : (u(), c("div", $e, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: K
        }, o(t("configure_decimals")), 1)
      ])),
      k.value ? (u(), c("div", qe, [
        e("label", De, [
          e("span", Oe, o(t("decimals")), 1)
        ]),
        i(e("input", {
          ref_key: "decimalsInput",
          ref: z,
          "onUpdate:modelValue": l[8] || (l[8] = (s) => m.value = s),
          placeholder: "6",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[9] || (l[9] = (s) => m.value = m.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [_, m.value]
        ])
      ])) : d("", !0),
      f.value ? d("", !0) : (u(), c("div", je, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: Q
        }, o(t("configure_subunit")), 1)
      ])),
      f.value ? (u(), c("div", Ee, [
        e("label", Le, [
          e("span", Je, o(t("subunit")), 1)
        ]),
        i(e("input", {
          ref_key: "subunitInput",
          ref: $,
          "onUpdate:modelValue": l[10] || (l[10] = (s) => w.value = s),
          placeholder: "ubtc",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, w.value]
        ])
      ])) : d("", !0),
      N.value ? d("", !0) : (u(), c("div", Pe, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: L(Y, ["prevent"])
        }, o(t("configure_send_burn_rate")), 9, Ae)
      ])),
      N.value ? (u(), c("div", Ge, [
        e("label", He, [
          e("span", Ke, o(t("send_burn_rate")), 1)
        ]),
        i(e("input", {
          ref_key: "sendBurnRateInput",
          ref: O,
          "onUpdate:modelValue": l[11] || (l[11] = (s) => V.value = s),
          placeholder: "1%",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[12] || (l[12] = (s) => V.value = V.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [_, V.value]
        ])
      ])) : d("", !0),
      C.value ? d("", !0) : (u(), c("div", Qe, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: L(Z, ["prevent"])
        }, o(t("configure_send_commission_rate")), 9, We)
      ])),
      C.value ? (u(), c("div", Xe, [
        e("label", Ye, [
          e("span", Ze, o(t("send_commission_rate")), 1)
        ]),
        i(e("input", {
          ref_key: "sendCommissionRateInput",
          ref: j,
          "onUpdate:modelValue": l[13] || (l[13] = (s) => I.value = s),
          placeholder: "2%",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[14] || (l[14] = (s) => I.value = I.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [_, I.value]
        ])
      ])) : d("", !0),
      g.value ? d("", !0) : (u(), c("div", Te, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: X
        }, o(t("configure_max_supply")), 1)
      ])),
      g.value ? (u(), c("div", Fe, [
        e("label", el, [
          e("span", ll, o(t("max_supply")), 1)
        ]),
        i(e("input", {
          ref_key: "maxSupplyInput",
          ref: D,
          "onUpdate:modelValue": l[15] || (l[15] = (s) => b.value = s),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[16] || (l[16] = (s) => b.value = b.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [_, b.value]
        ])
      ])) : d("", !0),
      h.value ? d("", !0) : (u(), c("div", sl, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: W
        }, o(t("configure_initial_supply")), 1)
      ])),
      h.value ? (u(), c("div", tl, [
        e("label", al, [
          e("span", nl, o(t("initial_supply")), 1)
        ]),
        i(e("input", {
          ref_key: "initialSupplyInput",
          ref: q,
          "onUpdate:modelValue": l[17] || (l[17] = (s) => v.value = s),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[18] || (l[18] = (s) => v.value = v.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [_, v.value]
        ])
      ])) : d("", !0)
    ]));
  }
});
export {
  il as default
};
