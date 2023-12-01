import { d as ue, r as a, c as C, o as ie, a as c, b as p, e, t as n, f as de, w as r, h as v, y as x, p as b, i as ce, z as N, B as pe } from "./main-a00ca3ce.js";
import { I as me } from "./IdentityIcon-ebc7f7f3.js";
const ve = { class: "form-control" }, be = { class: "label" }, _e = { class: "label-text" }, fe = { class: "flex p-2" }, ye = { class: "ml-2 text-base" }, ke = { class: "md:flex items-center justify-between gap-2" }, he = { class: "form-control md:flex-1 mb-2" }, ge = { class: "label" }, xe = { class: "label-text" }, Se = { class: "form-control md:ml-2 mb-2" }, Ve = { class: "label" }, we = { class: "label-text" }, Ie = { class: "form-control" }, Re = { class: "label cursor-pointer" }, Ce = { class: "label-text" }, Ne = { class: "grid grid-cols-1 md:grid-cols-3 gap-2 p-2" }, Ue = { class: "cursor-pointer flex items-center mb-2" }, Be = ["value"], Me = { class: "label-text" }, ze = { class: "cursor-pointer flex items-center mb-2" }, Fe = ["value"], Te = { class: "label-text" }, qe = { class: "cursor-pointer flex items-center mb-2" }, De = ["value"], $e = { class: "label-text" }, je = { class: "cursor-pointer flex items-center mb-2" }, Ee = ["value"], Le = { class: "label-text" }, Oe = { class: "cursor-pointer flex items-center mb-2" }, Pe = ["value"], Ae = { class: "label-text" }, Ge = { class: "cursor-pointer flex items-center mb-2" }, He = ["value"], Je = { class: "label-text" }, Ke = { class: "form-control text-right" }, Qe = { class: "label" }, We = { class: "label-text" }, Xe = {
  key: 0,
  class: "p-2"
}, Ye = {
  key: 1,
  class: "form-control"
}, Ze = { class: "label" }, el = { class: "label-text" }, ll = {
  key: 2,
  class: "p-2"
}, sl = {
  key: 3,
  class: "form-control"
}, tl = { class: "label" }, al = { class: "label-text" }, nl = {
  key: 4,
  class: "p-2"
}, ol = {
  key: 5,
  class: "mx-1 mb-2 grid grid-cols-2 gap-2"
}, rl = { class: "form-control" }, ul = { class: "label" }, il = { class: "label-text" }, dl = { class: "form-control" }, cl = { class: "label" }, pl = { class: "label-text" }, ml = { class: "form-control" }, vl = { class: "label" }, bl = { class: "label-text" }, _l = { class: "form-control" }, fl = { class: "label" }, yl = { class: "label-text" }, kl = {
  key: 6,
  class: "p-2"
}, hl = {
  key: 7,
  class: "form-control"
}, gl = { class: "label" }, xl = { class: "label-text" }, Sl = {
  key: 8,
  class: "p-2"
}, Vl = {
  key: 9,
  class: "form-control"
}, wl = { class: "label" }, Il = { class: "label-text" }, Nl = /* @__PURE__ */ ue({
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
  setup(U, { expose: O, emit: P }) {
    const S = U, t = (o) => ce(S.locale || "en", o), A = {
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
    }, y = a(""), w = a(""), V = a(""), m = a("6"), d = a("0"), _ = a("0"), G = a(""), B = a("0"), M = a("0"), z = a("0"), F = a("0"), T = a({}), H = C(() => u.value.map(
      //@ts-ignore
      (o) => i[A[o]]
    )), u = a([]), J = C(
      () => u.value.includes(i.minting)
    ), k = a(!1), f = a(!1), h = a(!1), g = a(!1), D = a(), $ = a(), j = a(), E = a(), K = a(), Q = a(), W = a(), X = a();
    function Y() {
      k.value = !k.value, k.value && N(() => {
        var o;
        (o = D.value) == null || o.focus();
      });
    }
    function Z() {
      f.value = !f.value, f.value && N(() => {
        var o;
        (o = $.value) == null || o.focus();
      });
    }
    function ee() {
      h.value = !h.value, h.value && (d.value = "", N(() => {
        var o;
        (o = j.value) == null || o.focus();
      }));
    }
    function le() {
      g.value = !g.value, g.value && (_.value = "", N(() => {
        var o;
        (o = E.value) == null || o.focus();
      }));
    }
    const I = a(!1);
    function se() {
      I.value = !I.value;
    }
    function R(o) {
      const l = parseFloat(o.replace("%", ""));
      return isNaN(l) ? "0" : (l * Math.pow(10, 16)).toFixed(0);
    }
    const te = C(() => {
      f.value || (V.value = Number(m.value) > 0 ? `u${y.value}` : y.value);
      const o = Number(d.value) * Math.pow(10, Number(m.value)), l = Number(_.value) * Math.pow(10, Number(m.value)), s = R(B.value), L = R(M.value), oe = R(z.value), re = R(F.value);
      return [
        {
          typeUrl: "/mchain.smarttoken.v1beta1.MsgIssue",
          value: {
            subunit: V.value.toLowerCase(),
            symbol: y.value.toLowerCase(),
            name: w.value,
            decimals: m.value,
            initialSupply: o.toString(),
            maxSupply: l.toString(),
            authority: S.sender,
            minter: S.sender,
            uri: G.value,
            sendBurnRate: s.toString(),
            sendCommissionRate: L.toString(),
            sendStakeRate: oe.toString(),
            sendCommunityRate: re.toString(),
            features: H.value
          }
        }
      ];
    }), ae = C(() => S.sender ? w.value.trim() ? y.value.trim() ? f.value && !V.value.trim() ? { ok: !1, error: t("subunit_required") } : Number(m.value) >= 0 && Number(m.value) <= 18 ? !_.value.trim() || isNaN(Number(_.value)) || Number(_.value) < 0 ? { ok: !1, error: t("invalid_max_supply") } : !d.value.trim() || isNaN(Number(d.value)) || Number(d.value) < 0 ? { ok: !1, error: t("invalid_initial_supply") } : !J.value && (!d.value.trim() || Number(d.value) === 0) ? { ok: !1, error: t("minting_disabled_initial_supply_zero") } : { ok: !0, error: "" } : { ok: !1, error: t("decimals_range") } : { ok: !1, error: t("symbol_required") } : { ok: !1, error: t("name_required") } : { ok: !1, error: t("sender_empty") }), q = a(null);
    function ne() {
      k.value = !1, f.value = !1, h.value = !1, g.value = !1, pe(S.endpoint).then((o) => {
        T.value = o.params.issue_fee;
      }), q.value && q.value.focus();
    }
    return ie(() => {
      u.value = [
        i.minting,
        i.burning,
        i.sending
      ], P("loaded");
    }), O({ msgs: te, isValid: ae, initial: ne }), (o, l) => (c(), p("div", null, [
      e("div", ve, [
        e("label", be, [
          e("span", _e, n(t("your_connected_account")), 1)
        ]),
        e("div", fe, [
          de(me, {
            size: "small",
            address: U.sender
          }, null, 8, ["address"]),
          e("span", ye, n(U.sender), 1)
        ])
      ]),
      e("div", ke, [
        e("div", he, [
          e("label", ge, [
            e("span", xe, n(t("name")), 1)
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
        e("div", Se, [
          e("label", Ve, [
            e("span", we, n(t("symbol")), 1)
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
      e("div", Ie, [
        e("label", Re, [
          e("span", Ce, n(t("features")), 1)
        ]),
        e("div", Ne, [
          e("label", Ue, [
            r(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: i.minting,
              "onUpdate:modelValue": l[2] || (l[2] = (s) => u.value = s)
            }, null, 8, Be), [
              [x, u.value]
            ]),
            e("span", Me, n(t("minting")), 1)
          ]),
          e("label", ze, [
            r(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: i.burning,
              "onUpdate:modelValue": l[3] || (l[3] = (s) => u.value = s)
            }, null, 8, Fe), [
              [x, u.value]
            ]),
            e("span", Te, n(t("burning")), 1)
          ]),
          e("label", qe, [
            r(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: i.sending,
              "onUpdate:modelValue": l[4] || (l[4] = (s) => u.value = s)
            }, null, 8, De), [
              [x, u.value]
            ]),
            e("span", $e, n(t("sending")), 1)
          ]),
          e("label", je, [
            r(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: i.free_send,
              "onUpdate:modelValue": l[5] || (l[5] = (s) => u.value = s)
            }, null, 8, Ee), [
              [x, u.value]
            ]),
            e("span", Le, n(t("free_send")), 1)
          ]),
          e("label", Oe, [
            r(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: i.whitelist,
              "onUpdate:modelValue": l[6] || (l[6] = (s) => u.value = s)
            }, null, 8, Pe), [
              [x, u.value]
            ]),
            e("span", Ae, n(t("whitelist")), 1)
          ]),
          e("label", Ge, [
            r(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: i.freezing,
              "onUpdate:modelValue": l[7] || (l[7] = (s) => u.value = s)
            }, null, 8, He), [
              [x, u.value]
            ]),
            e("span", Je, n(t("freezing")), 1)
          ])
        ])
      ]),
      e("div", Ke, [
        e("label", Qe, [
          e("span", We, n(t("issue_fee")) + ": " + n(T.value.amount) + " " + n(T.value.denom), 1)
        ])
      ]),
      k.value ? b("", !0) : (c(), p("div", Xe, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: Y
        }, n(t("configure_decimals")), 1)
      ])),
      k.value ? (c(), p("div", Ye, [
        e("label", Ze, [
          e("span", el, n(t("decimals")), 1)
        ]),
        r(e("input", {
          ref_key: "decimalsInput",
          ref: D,
          "onUpdate:modelValue": l[8] || (l[8] = (s) => m.value = s),
          placeholder: "6",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[9] || (l[9] = (s) => m.value = m.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [v, m.value]
        ])
      ])) : b("", !0),
      f.value ? b("", !0) : (c(), p("div", ll, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: Z
        }, n(t("configure_subunit")), 1)
      ])),
      f.value ? (c(), p("div", sl, [
        e("label", tl, [
          e("span", al, n(t("subunit")), 1)
        ]),
        r(e("input", {
          ref_key: "subunitInput",
          ref: $,
          "onUpdate:modelValue": l[10] || (l[10] = (s) => V.value = s),
          placeholder: "ubtc",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [v, V.value]
        ])
      ])) : b("", !0),
      I.value ? b("", !0) : (c(), p("div", nl, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: se
        }, n(t("configure_send_rates")), 1)
      ])),
      I.value ? (c(), p("div", ol, [
        e("div", rl, [
          e("label", ul, [
            e("span", il, n(t("send_burn_rate")), 1)
          ]),
          r(e("input", {
            ref_key: "sendBurnRateInput",
            ref: K,
            "onUpdate:modelValue": l[11] || (l[11] = (s) => B.value = s),
            class: "input input-sm border border-gray-300 dark:border-gray-600 w-20 rounded-full"
          }, null, 512), [
            [v, B.value]
          ])
        ]),
        e("div", dl, [
          e("label", cl, [
            e("span", pl, n(t("send_commission_rate")), 1)
          ]),
          r(e("input", {
            ref_key: "sendCommissionRateInput",
            ref: Q,
            "onUpdate:modelValue": l[12] || (l[12] = (s) => M.value = s),
            class: "input input-sm border border-gray-300 dark:border-gray-600 w-20 rounded-full"
          }, null, 512), [
            [v, M.value]
          ])
        ]),
        e("div", ml, [
          e("label", vl, [
            e("span", bl, n(t("send_stake_rate")), 1)
          ]),
          r(e("input", {
            ref_key: "sendStakeRateInput",
            ref: W,
            "onUpdate:modelValue": l[13] || (l[13] = (s) => z.value = s),
            class: "input input-sm border border-gray-300 dark:border-gray-600 w-20 rounded-full"
          }, null, 512), [
            [v, z.value]
          ])
        ]),
        e("div", _l, [
          e("label", fl, [
            e("span", yl, n(t("send_community_rate")), 1)
          ]),
          r(e("input", {
            ref_key: "sendCommunityRateInput",
            ref: X,
            "onUpdate:modelValue": l[14] || (l[14] = (s) => F.value = s),
            class: "input input-sm border border-gray-300 dark:border-gray-600 w-20 rounded-full"
          }, null, 512), [
            [v, F.value]
          ])
        ])
      ])) : b("", !0),
      g.value ? b("", !0) : (c(), p("div", kl, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: le
        }, n(t("configure_max_supply")), 1)
      ])),
      g.value ? (c(), p("div", hl, [
        e("label", gl, [
          e("span", xl, n(t("max_supply")), 1)
        ]),
        r(e("input", {
          ref_key: "maxSupplyInput",
          ref: E,
          "onUpdate:modelValue": l[15] || (l[15] = (s) => _.value = s),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[16] || (l[16] = (s) => _.value = _.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [v, _.value]
        ])
      ])) : b("", !0),
      h.value ? b("", !0) : (c(), p("div", Sl, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: ee
        }, n(t("configure_initial_supply")), 1)
      ])),
      h.value ? (c(), p("div", Vl, [
        e("label", wl, [
          e("span", Il, n(t("initial_supply")), 1)
        ]),
        r(e("input", {
          ref_key: "initialSupplyInput",
          ref: j,
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
  Nl as default
};
