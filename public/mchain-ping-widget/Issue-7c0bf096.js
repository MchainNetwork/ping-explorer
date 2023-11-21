import { d as re, r as a, c as C, o as ue, a as c, b as p, e, t as n, f as ie, w as r, h as v, s as x, p as b, i as de, u as N } from "./main-32246275.js";
import { I as ce } from "./IdentityIcon-62591963.js";
const pe = { class: "form-control" }, me = { class: "label" }, ve = { class: "label-text" }, be = { class: "flex p-2" }, _e = { class: "ml-2 text-base" }, fe = { class: "md:flex items-center justify-between gap-2" }, ye = { class: "form-control md:flex-1 mb-2" }, ke = { class: "label" }, he = { class: "label-text" }, ge = { class: "form-control md:ml-2 mb-2" }, xe = { class: "label" }, Se = { class: "label-text" }, Ve = { class: "form-control" }, we = { class: "label cursor-pointer" }, Ie = { class: "label-text" }, Re = { class: "grid grid-cols-1 md:grid-cols-3 gap-2 p-2" }, Ce = { class: "cursor-pointer flex items-center mb-2" }, Ne = ["value"], Ue = { class: "label-text" }, Be = { class: "cursor-pointer flex items-center mb-2" }, Me = ["value"], ze = { class: "label-text" }, Fe = { class: "cursor-pointer flex items-center mb-2" }, qe = ["value"], Te = { class: "label-text" }, De = { class: "cursor-pointer flex items-center mb-2" }, $e = ["value"], je = { class: "label-text" }, Ee = { class: "cursor-pointer flex items-center mb-2" }, Le = ["value"], Oe = { class: "label-text" }, Pe = { class: "cursor-pointer flex items-center mb-2" }, Ae = ["value"], Ge = { class: "label-text" }, He = {
  key: 0,
  class: "p-2"
}, Je = {
  key: 1,
  class: "form-control"
}, Ke = { class: "label" }, Qe = { class: "label-text" }, We = {
  key: 2,
  class: "p-2"
}, Xe = {
  key: 3,
  class: "form-control"
}, Ye = { class: "label" }, Ze = { class: "label-text" }, el = {
  key: 4,
  class: "p-2"
}, ll = {
  key: 5,
  class: "mx-1 mb-2 grid grid-cols-2 gap-2"
}, sl = { class: "form-control" }, tl = { class: "label" }, al = { class: "label-text" }, nl = { class: "form-control" }, ol = { class: "label" }, rl = { class: "label-text" }, ul = { class: "form-control" }, il = { class: "label" }, dl = { class: "label-text" }, cl = { class: "form-control" }, pl = { class: "label" }, ml = { class: "label-text" }, vl = {
  key: 6,
  class: "p-2"
}, bl = {
  key: 7,
  class: "form-control"
}, _l = { class: "label" }, fl = { class: "label-text" }, yl = {
  key: 8,
  class: "p-2"
}, kl = {
  key: 9,
  class: "form-control"
}, hl = { class: "label" }, gl = { class: "label-text" }, Vl = /* @__PURE__ */ re({
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
  setup(U, { expose: L, emit: O }) {
    const V = U, t = (o) => de(V.locale || "en", o), P = {
      0: "minting",
      1: "burning",
      2: "sending",
      3: "free_send",
      4: "whitelist",
      5: "freezing"
    }, i = {
      minting: 0,
      burning: 1,
      sending: 2,
      free_send: 3,
      whitelist: 4,
      freezing: 5
    }, y = a(""), w = a(""), S = a(""), m = a("6"), d = a("0"), _ = a("0"), A = a(""), B = a("0"), M = a("0"), z = a("0"), F = a("0"), G = C(() => u.value.map(
      //@ts-ignore
      (o) => i[P[o]]
    )), u = a([]), H = C(
      () => u.value.includes(i.minting)
    ), k = a(!1), f = a(!1), h = a(!1), g = a(!1), T = a(), D = a(), $ = a(), j = a(), J = a(), K = a(), Q = a(), W = a();
    function X() {
      k.value = !k.value, k.value && N(() => {
        var o;
        (o = T.value) == null || o.focus();
      });
    }
    function Y() {
      f.value = !f.value, f.value && N(() => {
        var o;
        (o = D.value) == null || o.focus();
      });
    }
    function Z() {
      h.value = !h.value, h.value && (d.value = "", N(() => {
        var o;
        (o = $.value) == null || o.focus();
      }));
    }
    function ee() {
      g.value = !g.value, g.value && (_.value = "", N(() => {
        var o;
        (o = j.value) == null || o.focus();
      }));
    }
    const I = a(!1);
    function le() {
      I.value = !I.value;
    }
    function R(o) {
      const l = parseFloat(o.replace("%", ""));
      return isNaN(l) ? "0" : (l * Math.pow(10, 16)).toFixed(0);
    }
    const se = C(() => {
      f.value || (S.value = Number(m.value) > 0 ? `u${y.value}` : y.value);
      const o = Number(d.value) * Math.pow(10, Number(m.value)), l = Number(_.value) * Math.pow(10, Number(m.value)), s = R(B.value), E = R(M.value), ne = R(z.value), oe = R(F.value);
      return [
        {
          typeUrl: "/mchain.smarttoken.v1beta1.MsgIssue",
          value: {
            subunit: S.value.toLowerCase(),
            symbol: y.value.toLowerCase(),
            name: w.value,
            decimals: m.value,
            initialSupply: o.toString(),
            maxSupply: l.toString(),
            authority: V.sender,
            minter: V.sender,
            uri: A.value,
            sendBurnRate: s.toString(),
            sendCommissionRate: E.toString(),
            sendStakeRate: ne.toString(),
            sendCommunityRate: oe.toString(),
            features: G.value
          }
        }
      ];
    }), te = C(() => V.sender ? w.value.trim() ? y.value.trim() ? f.value && !S.value.trim() ? { ok: !1, error: t("subunit_required") } : Number(m.value) >= 0 && Number(m.value) <= 18 ? !_.value.trim() || isNaN(Number(_.value)) || Number(_.value) < 0 ? { ok: !1, error: t("invalid_max_supply") } : !d.value.trim() || isNaN(Number(d.value)) || Number(d.value) < 0 ? { ok: !1, error: t("invalid_initial_supply") } : !H.value && (!d.value.trim() || Number(d.value) === 0) ? { ok: !1, error: t("minting_disabled_initial_supply_zero") } : { ok: !0, error: "" } : { ok: !1, error: t("decimals_range") } : { ok: !1, error: t("symbol_required") } : { ok: !1, error: t("name_required") } : { ok: !1, error: t("sender_empty") }), q = a(null);
    function ae() {
      k.value = !1, f.value = !1, h.value = !1, g.value = !1, q.value && q.value.focus();
    }
    return ue(() => {
      u.value = [
        i.minting,
        i.burning,
        i.sending
      ], O("loaded");
    }), L({ msgs: se, isValid: te, initial: ae }), (o, l) => (c(), p("div", null, [
      e("div", pe, [
        e("label", me, [
          e("span", ve, n(t("your_connected_account")), 1)
        ]),
        e("div", be, [
          ie(ce, {
            size: "small",
            address: U.sender
          }, null, 8, ["address"]),
          e("span", _e, n(U.sender), 1)
        ])
      ]),
      e("div", fe, [
        e("div", ye, [
          e("label", ke, [
            e("span", he, n(t("name")), 1)
          ]),
          r(e("input", {
            ref_key: "focusInput",
            ref: q,
            "onUpdate:modelValue": l[0] || (l[0] = (s) => w.value = s),
            placeholder: "Bitcoin",
            class: "input border-gray-300 dark:border-gray-600 w-full rounded-full"
          }, null, 512), [
            [v, w.value]
          ])
        ]),
        e("div", ge, [
          e("label", xe, [
            e("span", Se, n(t("symbol")), 1)
          ]),
          r(e("input", {
            "onUpdate:modelValue": l[1] || (l[1] = (s) => y.value = s),
            placeholder: "BTC",
            class: "input border border-full border-gray-300 dark:border-gray-600 w-full rounded-full"
          }, null, 512), [
            [v, y.value]
          ])
        ])
      ]),
      e("div", Ve, [
        e("label", we, [
          e("span", Ie, n(t("features")), 1)
        ]),
        e("div", Re, [
          e("label", Ce, [
            r(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: i.minting,
              "onUpdate:modelValue": l[2] || (l[2] = (s) => u.value = s)
            }, null, 8, Ne), [
              [x, u.value]
            ]),
            e("span", Ue, n(t("minting")), 1)
          ]),
          e("label", Be, [
            r(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: i.burning,
              "onUpdate:modelValue": l[3] || (l[3] = (s) => u.value = s)
            }, null, 8, Me), [
              [x, u.value]
            ]),
            e("span", ze, n(t("burning")), 1)
          ]),
          e("label", Fe, [
            r(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: i.sending,
              "onUpdate:modelValue": l[4] || (l[4] = (s) => u.value = s)
            }, null, 8, qe), [
              [x, u.value]
            ]),
            e("span", Te, n(t("sending")), 1)
          ]),
          e("label", De, [
            r(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: i.free_send,
              "onUpdate:modelValue": l[5] || (l[5] = (s) => u.value = s)
            }, null, 8, $e), [
              [x, u.value]
            ]),
            e("span", je, n(t("free_send")), 1)
          ]),
          e("label", Ee, [
            r(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: i.whitelist,
              "onUpdate:modelValue": l[6] || (l[6] = (s) => u.value = s)
            }, null, 8, Le), [
              [x, u.value]
            ]),
            e("span", Oe, n(t("whitelist")), 1)
          ]),
          e("label", Pe, [
            r(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: i.freezing,
              "onUpdate:modelValue": l[7] || (l[7] = (s) => u.value = s)
            }, null, 8, Ae), [
              [x, u.value]
            ]),
            e("span", Ge, n(t("freezing")), 1)
          ])
        ])
      ]),
      k.value ? b("", !0) : (c(), p("div", He, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: X
        }, n(t("configure_decimals")), 1)
      ])),
      k.value ? (c(), p("div", Je, [
        e("label", Ke, [
          e("span", Qe, n(t("decimals")), 1)
        ]),
        r(e("input", {
          ref_key: "decimalsInput",
          ref: T,
          "onUpdate:modelValue": l[8] || (l[8] = (s) => m.value = s),
          placeholder: "6",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[9] || (l[9] = (s) => m.value = m.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [v, m.value]
        ])
      ])) : b("", !0),
      f.value ? b("", !0) : (c(), p("div", We, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: Y
        }, n(t("configure_subunit")), 1)
      ])),
      f.value ? (c(), p("div", Xe, [
        e("label", Ye, [
          e("span", Ze, n(t("subunit")), 1)
        ]),
        r(e("input", {
          ref_key: "subunitInput",
          ref: D,
          "onUpdate:modelValue": l[10] || (l[10] = (s) => S.value = s),
          placeholder: "ubtc",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [v, S.value]
        ])
      ])) : b("", !0),
      I.value ? b("", !0) : (c(), p("div", el, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: le
        }, n(t("configure_send_rates")), 1)
      ])),
      I.value ? (c(), p("div", ll, [
        e("div", sl, [
          e("label", tl, [
            e("span", al, n(t("send_burn_rate")), 1)
          ]),
          r(e("input", {
            ref_key: "sendBurnRateInput",
            ref: J,
            "onUpdate:modelValue": l[11] || (l[11] = (s) => B.value = s),
            class: "input input-sm border border-gray-300 dark:border-gray-600 w-20 rounded-full"
          }, null, 512), [
            [v, B.value]
          ])
        ]),
        e("div", nl, [
          e("label", ol, [
            e("span", rl, n(t("send_commission_rate")), 1)
          ]),
          r(e("input", {
            ref_key: "sendCommissionRateInput",
            ref: K,
            "onUpdate:modelValue": l[12] || (l[12] = (s) => M.value = s),
            class: "input input-sm border border-gray-300 dark:border-gray-600 w-20 rounded-full"
          }, null, 512), [
            [v, M.value]
          ])
        ]),
        e("div", ul, [
          e("label", il, [
            e("span", dl, n(t("send_stake_rate")), 1)
          ]),
          r(e("input", {
            ref_key: "sendStakeRateInput",
            ref: Q,
            "onUpdate:modelValue": l[13] || (l[13] = (s) => z.value = s),
            class: "input input-sm border border-gray-300 dark:border-gray-600 w-20 rounded-full"
          }, null, 512), [
            [v, z.value]
          ])
        ]),
        e("div", cl, [
          e("label", pl, [
            e("span", ml, n(t("send_community_rate")), 1)
          ]),
          r(e("input", {
            ref_key: "sendCommunityRateInput",
            ref: W,
            "onUpdate:modelValue": l[14] || (l[14] = (s) => F.value = s),
            class: "input input-sm border border-gray-300 dark:border-gray-600 w-20 rounded-full"
          }, null, 512), [
            [v, F.value]
          ])
        ])
      ])) : b("", !0),
      g.value ? b("", !0) : (c(), p("div", vl, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: ee
        }, n(t("configure_max_supply")), 1)
      ])),
      g.value ? (c(), p("div", bl, [
        e("label", _l, [
          e("span", fl, n(t("max_supply")), 1)
        ]),
        r(e("input", {
          ref_key: "maxSupplyInput",
          ref: j,
          "onUpdate:modelValue": l[15] || (l[15] = (s) => _.value = s),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[16] || (l[16] = (s) => _.value = _.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [v, _.value]
        ])
      ])) : b("", !0),
      h.value ? b("", !0) : (c(), p("div", yl, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: Z
        }, n(t("configure_initial_supply")), 1)
      ])),
      h.value ? (c(), p("div", kl, [
        e("label", hl, [
          e("span", gl, n(t("initial_supply")), 1)
        ]),
        r(e("input", {
          ref_key: "initialSupplyInput",
          ref: $,
          "onUpdate:modelValue": l[17] || (l[17] = (s) => d.value = s),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[18] || (l[18] = (s) => d.value = d.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [v, d.value]
        ])
      ])) : b("", !0)
    ]));
  }
});
export {
  Vl as default
};
