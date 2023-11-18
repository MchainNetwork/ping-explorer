import { d as me, r as n, c as q, o as be, a as r, b as u, e, t as o, f as fe, w as i, h as b, s as S, p as d, u as K, i as _e, x as k } from "./main-e65e1b2c.js";
import { I as ke } from "./IdentityIcon-0c6b3542.js";
const ye = { class: "form-control" }, he = { class: "label" }, ge = { class: "label-text" }, xe = { class: "flex p-2" }, Se = { class: "ml-2 text-base" }, Ve = { class: "form-control mb-2" }, we = { class: "label" }, Ce = { class: "label-text" }, Re = { class: "form-control mb-2" }, Ie = { class: "label" }, Ne = { class: "label-text" }, Be = { class: "form-control" }, Ue = { class: "label cursor-pointer" }, Me = { class: "label-text" }, $e = { class: "grid grid-cols-1 md:grid-cols-3 gap-2 p-2" }, ze = { class: "cursor-pointer flex items-center mb-2" }, Fe = ["value"], qe = { class: "label-text" }, Te = { class: "cursor-pointer flex items-center mb-2" }, De = ["value"], Ee = { class: "label-text" }, je = { class: "cursor-pointer flex items-center mb-2" }, Le = ["value"], Oe = { class: "label-text" }, Pe = { class: "cursor-pointer flex items-center mb-2" }, Ae = ["value"], Ge = { class: "label-text" }, He = { class: "cursor-pointer flex items-center mb-2" }, Je = ["value"], Ke = { class: "label-text" }, Qe = { class: "cursor-pointer flex items-center mb-2" }, We = ["value"], Xe = { class: "label-text" }, Ye = {
  key: 0,
  class: "p-2"
}, Ze = {
  key: 1,
  class: "form-control"
}, el = { class: "label" }, ll = { class: "label-text" }, sl = {
  key: 2,
  class: "p-2"
}, tl = {
  key: 3,
  class: "form-control"
}, al = { class: "label" }, nl = { class: "label-text" }, ol = {
  key: 4,
  class: "p-2"
}, rl = ["onClick"], ul = {
  key: 5,
  class: "form-control"
}, il = { class: "label" }, dl = { class: "label-text" }, cl = {
  key: 6,
  class: "p-2"
}, pl = ["onClick"], vl = {
  key: 7,
  class: "form-control"
}, ml = { class: "label" }, bl = { class: "label-text" }, fl = {
  key: 8,
  class: "p-2"
}, _l = {
  key: 9,
  class: "form-control"
}, kl = { class: "label" }, yl = { class: "label-text" }, hl = {
  key: 10,
  class: "p-2"
}, gl = {
  key: 11,
  class: "form-control"
}, xl = { class: "label" }, Sl = { class: "label-text" }, Vl = {
  key: 12,
  class: "p-2"
}, wl = {
  key: 13,
  class: "form-control"
}, Cl = { class: "label" }, Rl = { class: "label-text" }, Il = {
  key: 14,
  class: "p-2"
}, Nl = {
  key: 15,
  class: "form-control"
}, Bl = { class: "label" }, Ul = { class: "label-text" }, zl = /* @__PURE__ */ me({
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
  setup(T, { expose: Q, emit: W }) {
    const $ = T, t = (a) => _e($.locale || "en", a), X = {
      0: "minting",
      1: "burning",
      2: "sending",
      3: "free_send",
      4: "whitelist",
      5: "freezing"
    }, p = {
      minting: 0,
      burning: 1,
      sending: 2,
      free_send: 3,
      whitelist: 4,
      freezing: 5
    }, y = n(""), z = n(""), V = n(""), m = n("0"), v = n("0"), f = n("0"), Y = n(""), w = n("0"), C = n("0"), R = n("0"), I = n("0"), Z = q(() => c.value.map(
      //@ts-ignore
      (a) => p[X[a]]
    )), c = n([]), ee = q(
      () => c.value.includes(p.minting)
    ), h = n(!1), _ = n(!1), g = n(!1), x = n(!1), N = n(!1), B = n(!1), U = n(!1), M = n(!1), E = n(), j = n(), L = n(), O = n(), P = n(), A = n(), G = n(), H = n();
    function le() {
      h.value = !h.value, h.value && k(() => {
        var a;
        (a = E.value) == null || a.focus();
      });
    }
    function se() {
      _.value = !_.value, _.value && k(() => {
        var a;
        (a = j.value) == null || a.focus();
      });
    }
    function te() {
      g.value = !g.value, g.value && (v.value = "", k(() => {
        var a;
        (a = L.value) == null || a.focus();
      }));
    }
    function ae() {
      x.value = !x.value, x.value && (f.value = "", k(() => {
        var a;
        (a = O.value) == null || a.focus();
      }));
    }
    function ne() {
      N.value = !N.value, N.value && k(() => {
        var a;
        (a = P.value) == null || a.focus();
      });
    }
    function oe() {
      B.value = !B.value, B.value && k(() => {
        var a;
        (a = A.value) == null || a.focus();
      });
    }
    function re() {
      U.value = !U.value, U.value && k(() => {
        var a;
        (a = G.value) == null || a.focus();
      });
    }
    function ue() {
      M.value = !M.value, M.value && k(() => {
        var a;
        (a = H.value) == null || a.focus();
      });
    }
    function F(a) {
      const l = parseFloat(a.replace("%", ""));
      return isNaN(l) ? "0" : (l * Math.pow(10, 16)).toFixed(0);
    }
    const ie = q(() => {
      _.value || (V.value = Number(m.value) > 0 ? `u${y.value}` : y.value);
      const a = Number(v.value) * Math.pow(10, Number(m.value)), l = Number(f.value) * Math.pow(10, Number(m.value)), s = F(w.value), J = F(C.value), pe = F(R.value), ve = F(I.value);
      return [
        {
          typeUrl: "/mchain.smarttoken.v1beta1.MsgIssue",
          value: {
            subunit: V.value.toLowerCase(),
            symbol: y.value.toLowerCase(),
            name: z.value,
            decimals: m.value,
            initialSupply: a.toString(),
            maxSupply: l.toString(),
            authority: $.sender,
            minter: $.sender,
            uri: Y.value,
            sendBurnRate: s.toString(),
            sendCommissionRate: J.toString(),
            sendStakeRate: pe.toString(),
            sendCommunityRate: ve.toString(),
            features: Z.value
          }
        }
      ];
    }), de = q(() => $.sender ? z.value.trim() ? y.value.trim() ? _.value && !V.value.trim() ? { ok: !1, error: t("subunit_required") } : Number(m.value) >= 0 && Number(m.value) <= 18 ? !f.value.trim() || isNaN(Number(f.value)) || Number(f.value) < 0 ? { ok: !1, error: t("invalid_max_supply") } : !v.value.trim() || isNaN(Number(v.value)) || Number(v.value) < 0 ? { ok: !1, error: t("invalid_initial_supply") } : !ee.value && (!v.value.trim() || Number(v.value) === 0) ? { ok: !1, error: t("minting_disabled_initial_supply_zero") } : { ok: !0, error: "" } : { ok: !1, error: t("decimals_range") } : { ok: !1, error: t("symbol_required") } : { ok: !1, error: t("name_required") } : { ok: !1, error: t("sender_empty") }), D = n(null);
    function ce() {
      h.value = !1, _.value = !1, g.value = !1, x.value = !1, D.value && D.value.focus();
    }
    return be(() => {
      c.value = [
        p.minting,
        p.burning,
        p.sending
      ], W("loaded");
    }), Q({ msgs: ie, isValid: de, initial: ce }), (a, l) => (r(), u("div", null, [
      e("div", ye, [
        e("label", he, [
          e("span", ge, o(t("your_connected_account")), 1)
        ]),
        e("div", xe, [
          fe(ke, {
            size: "small",
            address: T.sender
          }, null, 8, ["address"]),
          e("span", Se, o(T.sender), 1)
        ])
      ]),
      e("div", Ve, [
        e("label", we, [
          e("span", Ce, o(t("name")), 1)
        ]),
        i(e("input", {
          ref_key: "focusInput",
          ref: D,
          "onUpdate:modelValue": l[0] || (l[0] = (s) => z.value = s),
          placeholder: "Bitcoin",
          class: "input border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, z.value]
        ])
      ]),
      e("div", Re, [
        e("label", Ie, [
          e("span", Ne, o(t("symbol")), 1)
        ]),
        i(e("input", {
          "onUpdate:modelValue": l[1] || (l[1] = (s) => y.value = s),
          placeholder: "BTC",
          class: "input border border-full border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, y.value]
        ])
      ]),
      e("div", Be, [
        e("label", Ue, [
          e("span", Me, o(t("features")), 1)
        ]),
        e("div", $e, [
          e("label", ze, [
            i(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: p.minting,
              "onUpdate:modelValue": l[2] || (l[2] = (s) => c.value = s)
            }, null, 8, Fe), [
              [S, c.value]
            ]),
            e("span", qe, o(t("minting")), 1)
          ]),
          e("label", Te, [
            i(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: p.burning,
              "onUpdate:modelValue": l[3] || (l[3] = (s) => c.value = s)
            }, null, 8, De), [
              [S, c.value]
            ]),
            e("span", Ee, o(t("burning")), 1)
          ]),
          e("label", je, [
            i(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: p.sending,
              "onUpdate:modelValue": l[4] || (l[4] = (s) => c.value = s)
            }, null, 8, Le), [
              [S, c.value]
            ]),
            e("span", Oe, o(t("sending")), 1)
          ]),
          e("label", Pe, [
            i(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: p.free_send,
              "onUpdate:modelValue": l[5] || (l[5] = (s) => c.value = s)
            }, null, 8, Ae), [
              [S, c.value]
            ]),
            e("span", Ge, o(t("free_send")), 1)
          ]),
          e("label", He, [
            i(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: p.whitelist,
              "onUpdate:modelValue": l[6] || (l[6] = (s) => c.value = s)
            }, null, 8, Je), [
              [S, c.value]
            ]),
            e("span", Ke, o(t("whitelist")), 1)
          ]),
          e("label", Qe, [
            i(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: p.freezing,
              "onUpdate:modelValue": l[7] || (l[7] = (s) => c.value = s)
            }, null, 8, We), [
              [S, c.value]
            ]),
            e("span", Xe, o(t("freezing")), 1)
          ])
        ])
      ]),
      h.value ? d("", !0) : (r(), u("div", Ye, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: le
        }, o(t("configure_decimals")), 1)
      ])),
      h.value ? (r(), u("div", Ze, [
        e("label", el, [
          e("span", ll, o(t("decimals")), 1)
        ]),
        i(e("input", {
          ref_key: "decimalsInput",
          ref: E,
          "onUpdate:modelValue": l[8] || (l[8] = (s) => m.value = s),
          placeholder: "6",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[9] || (l[9] = (s) => m.value = m.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [b, m.value]
        ])
      ])) : d("", !0),
      _.value ? d("", !0) : (r(), u("div", sl, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: se
        }, o(t("configure_subunit")), 1)
      ])),
      _.value ? (r(), u("div", tl, [
        e("label", al, [
          e("span", nl, o(t("subunit")), 1)
        ]),
        i(e("input", {
          ref_key: "subunitInput",
          ref: j,
          "onUpdate:modelValue": l[10] || (l[10] = (s) => V.value = s),
          placeholder: "ubtc",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [b, V.value]
        ])
      ])) : d("", !0),
      N.value ? d("", !0) : (r(), u("div", ol, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: K(ne, ["prevent"])
        }, o(t("configure_send_burn_rate")), 9, rl)
      ])),
      N.value ? (r(), u("div", ul, [
        e("label", il, [
          e("span", dl, o(t("send_burn_rate")), 1)
        ]),
        i(e("input", {
          ref_key: "sendBurnRateInput",
          ref: P,
          "onUpdate:modelValue": l[11] || (l[11] = (s) => w.value = s),
          placeholder: "1%",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[12] || (l[12] = (s) => w.value = w.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [b, w.value]
        ])
      ])) : d("", !0),
      B.value ? d("", !0) : (r(), u("div", cl, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: K(oe, ["prevent"])
        }, o(t("configure_send_commission_rate")), 9, pl)
      ])),
      B.value ? (r(), u("div", vl, [
        e("label", ml, [
          e("span", bl, o(t("send_commission_rate")), 1)
        ]),
        i(e("input", {
          ref_key: "sendCommissionRateInput",
          ref: A,
          "onUpdate:modelValue": l[13] || (l[13] = (s) => C.value = s),
          placeholder: "2%",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[14] || (l[14] = (s) => C.value = C.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [b, C.value]
        ])
      ])) : d("", !0),
      U.value ? d("", !0) : (r(), u("div", fl, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: re
        }, o(t("configure_send_stake_rate")), 1)
      ])),
      U.value ? (r(), u("div", _l, [
        e("label", kl, [
          e("span", yl, o(t("send_stake_rate")), 1)
        ]),
        i(e("input", {
          ref_key: "sendStakeRateInput",
          ref: G,
          "onUpdate:modelValue": l[15] || (l[15] = (s) => R.value = s),
          placeholder: "1%",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[16] || (l[16] = (s) => R.value = R.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [b, R.value]
        ])
      ])) : d("", !0),
      M.value ? d("", !0) : (r(), u("div", hl, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: ue
        }, o(t("configure_send_community_rate")), 1)
      ])),
      M.value ? (r(), u("div", gl, [
        e("label", xl, [
          e("span", Sl, o(t("send_community_rate")), 1)
        ]),
        i(e("input", {
          ref_key: "sendCommunityRateInput",
          ref: H,
          "onUpdate:modelValue": l[17] || (l[17] = (s) => I.value = s),
          placeholder: "1%",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[18] || (l[18] = (s) => I.value = I.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [b, I.value]
        ])
      ])) : d("", !0),
      x.value ? d("", !0) : (r(), u("div", Vl, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: ae
        }, o(t("configure_max_supply")), 1)
      ])),
      x.value ? (r(), u("div", wl, [
        e("label", Cl, [
          e("span", Rl, o(t("max_supply")), 1)
        ]),
        i(e("input", {
          ref_key: "maxSupplyInput",
          ref: O,
          "onUpdate:modelValue": l[19] || (l[19] = (s) => f.value = s),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[20] || (l[20] = (s) => f.value = f.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [b, f.value]
        ])
      ])) : d("", !0),
      g.value ? d("", !0) : (r(), u("div", Il, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: te
        }, o(t("configure_initial_supply")), 1)
      ])),
      g.value ? (r(), u("div", Nl, [
        e("label", Bl, [
          e("span", Ul, o(t("initial_supply")), 1)
        ]),
        i(e("input", {
          ref_key: "initialSupplyInput",
          ref: L,
          "onUpdate:modelValue": l[21] || (l[21] = (s) => v.value = s),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[22] || (l[22] = (s) => v.value = v.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [b, v.value]
        ])
      ])) : d("", !0)
    ]));
  }
});
export {
  zl as default
};
