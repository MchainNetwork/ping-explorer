import { d as ae, r as o, c as R, o as oe, a as i, b as c, e, t as n, f as ne, w as u, h as _, s as x, p as d, u as L, i as re, x as S } from "./main-014f4388.js";
import { I as ue } from "./IdentityIcon-99cb3664.js";
const ie = { class: "form-control" }, ce = { class: "label" }, de = { class: "label-text" }, pe = { class: "flex p-2" }, ve = { class: "ml-2 text-base" }, me = { class: "form-control mb-2" }, be = { class: "label" }, fe = { class: "label-text" }, _e = { class: "form-control mb-2" }, ke = { class: "label" }, ye = { class: "label-text" }, he = { class: "form-control" }, ge = { class: "label cursor-pointer" }, xe = { class: "label-text" }, Se = { class: "grid grid-cols-1 md:grid-cols-3 gap-2 p-2" }, Ve = { class: "cursor-pointer flex items-center mb-2" }, we = ["value"], Ie = { class: "label-text" }, Ce = { class: "cursor-pointer flex items-center mb-2" }, Ne = ["value"], Be = { class: "label-text" }, Ue = { class: "cursor-pointer flex items-center mb-2" }, Re = ["value"], Me = { class: "label-text" }, ze = { class: "cursor-pointer flex items-center mb-2" }, Fe = ["value"], $e = { class: "label-text" }, qe = { class: "cursor-pointer flex items-center mb-2" }, Te = ["value"], De = { class: "label-text" }, je = { class: "cursor-pointer flex items-center mb-2" }, Ee = ["value"], Oe = { class: "label-text" }, Le = {
  key: 0,
  class: "p-2"
}, Pe = {
  key: 1,
  class: "form-control"
}, Ae = { class: "label" }, Ge = { class: "label-text" }, He = {
  key: 2,
  class: "p-2"
}, Je = {
  key: 3,
  class: "form-control"
}, Ke = { class: "label" }, Qe = { class: "label-text" }, We = {
  key: 4,
  class: "p-2"
}, Xe = ["onClick"], Ye = {
  key: 5,
  class: "form-control"
}, Ze = { class: "label" }, el = { class: "label-text" }, ll = {
  key: 6,
  class: "p-2"
}, sl = ["onClick"], tl = {
  key: 7,
  class: "form-control"
}, al = { class: "label" }, ol = { class: "label-text" }, nl = {
  key: 8,
  class: "p-2"
}, rl = {
  key: 9,
  class: "form-control"
}, ul = { class: "label" }, il = { class: "label-text" }, cl = {
  key: 10,
  class: "p-2"
}, dl = {
  key: 11,
  class: "form-control"
}, pl = { class: "label" }, vl = { class: "label-text" }, fl = /* @__PURE__ */ ae({
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
  setup(M, { expose: P, emit: A }) {
    const B = M, t = (a) => re(B.locale, a), G = {
      0: "minting",
      1: "burning",
      2: "sending",
      3: "free_send",
      4: "whitelist",
      5: "freezing"
    }, m = {
      minting: 0,
      burning: 1,
      sending: 2,
      free_send: 3,
      whitelist: 4,
      freezing: 5
    }, k = o(""), U = o(""), V = o(""), v = o("0"), p = o("0"), b = o("0"), H = o(""), w = o("0"), I = o("0"), J = R(() => r.value.map(
      //@ts-ignore
      (a) => m[G[a]]
    )), r = o([]), K = R(
      () => r.value.includes(m.minting)
    ), y = o(!1), f = o(!1), h = o(!1), g = o(!1), C = o(!1), N = o(!1), F = o(), $ = o(), q = o(), T = o(), D = o(), j = o();
    function Q() {
      y.value = !y.value, y.value && S(() => {
        var a;
        (a = F.value) == null || a.focus();
      });
    }
    function W() {
      f.value = !f.value, f.value && S(() => {
        var a;
        (a = $.value) == null || a.focus();
      });
    }
    function X() {
      h.value = !h.value, h.value && (p.value = "", S(() => {
        var a;
        (a = q.value) == null || a.focus();
      }));
    }
    function Y() {
      g.value = !g.value, g.value && (b.value = "", S(() => {
        var a;
        (a = T.value) == null || a.focus();
      }));
    }
    function Z() {
      C.value = !C.value, C.value && S(() => {
        var a;
        (a = D.value) == null || a.focus();
      });
    }
    function ee() {
      N.value = !N.value, N.value && S(() => {
        var a;
        (a = j.value) == null || a.focus();
      });
    }
    function E(a) {
      const l = parseFloat(a.replace("%", ""));
      return isNaN(l) ? "0" : (l * Math.pow(10, 16)).toFixed(0);
    }
    const le = R(() => {
      f.value || (V.value = Number(v.value) > 0 ? `u${k.value}` : k.value);
      const a = Number(p.value) * Math.pow(10, Number(v.value)), l = Number(b.value) * Math.pow(10, Number(v.value)), s = E(w.value), O = E(I.value);
      return [
        {
          typeUrl: "/mchain.smarttoken.v1beta1.MsgIssue",
          value: {
            subunit: V.value.toLowerCase(),
            symbol: k.value.toLowerCase(),
            name: U.value,
            decimals: v.value,
            initialSupply: a.toString(),
            maxSupply: l.toString(),
            authority: B.sender,
            minter: B.sender,
            uri: H.value,
            sendBurnRate: s.toString(),
            sendCommissionRate: O.toString(),
            features: J.value
          }
        }
      ];
    }), se = R(() => B.sender ? U.value.trim() ? k.value.trim() ? f.value && !V.value.trim() ? { ok: !1, error: t("subunit_required") } : Number(v.value) >= 0 && Number(v.value) <= 18 ? !b.value.trim() || isNaN(Number(b.value)) || Number(b.value) < 0 ? { ok: !1, error: t("invalid_max_supply") } : !p.value.trim() || isNaN(Number(p.value)) || Number(p.value) < 0 ? { ok: !1, error: t("invalid_initial_supply") } : !K.value && (!p.value.trim() || Number(p.value) === 0) ? { ok: !1, error: t("minting_disabled_initial_supply_zero") } : { ok: !0, error: "" } : { ok: !1, error: t("decimals_range") } : { ok: !1, error: t("symbol_required") } : { ok: !1, error: t("name_required") } : { ok: !1, error: t("sender_empty") }), z = o(null);
    function te() {
      y.value = !1, f.value = !1, h.value = !1, g.value = !1, z.value && z.value.focus();
    }
    return oe(() => {
      r.value = Object.values(m), A("loaded");
    }), P({ msgs: le, isValid: se, initial: te }), (a, l) => (i(), c("div", null, [
      e("div", ie, [
        e("label", ce, [
          e("span", de, n(t("your_connected_account")), 1)
        ]),
        e("div", pe, [
          ne(ue, {
            size: "small",
            address: M.sender
          }, null, 8, ["address"]),
          e("span", ve, n(M.sender), 1)
        ])
      ]),
      e("div", me, [
        e("label", be, [
          e("span", fe, n(t("name")), 1)
        ]),
        u(e("input", {
          ref_key: "focusInput",
          ref: z,
          "onUpdate:modelValue": l[0] || (l[0] = (s) => U.value = s),
          placeholder: "Bitcoin",
          class: "input border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, U.value]
        ])
      ]),
      e("div", _e, [
        e("label", ke, [
          e("span", ye, n(t("symbol")), 1)
        ]),
        u(e("input", {
          "onUpdate:modelValue": l[1] || (l[1] = (s) => k.value = s),
          placeholder: "BTC",
          class: "input border border-full border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, k.value]
        ])
      ]),
      e("div", he, [
        e("label", ge, [
          e("span", xe, n(t("features")), 1)
        ]),
        e("div", Se, [
          e("label", Ve, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: m.minting,
              "onUpdate:modelValue": l[2] || (l[2] = (s) => r.value = s)
            }, null, 8, we), [
              [x, r.value]
            ]),
            e("span", Ie, n(t("minting")), 1)
          ]),
          e("label", Ce, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: m.burning,
              "onUpdate:modelValue": l[3] || (l[3] = (s) => r.value = s)
            }, null, 8, Ne), [
              [x, r.value]
            ]),
            e("span", Be, n(t("burning")), 1)
          ]),
          e("label", Ue, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: m.sending,
              "onUpdate:modelValue": l[4] || (l[4] = (s) => r.value = s)
            }, null, 8, Re), [
              [x, r.value]
            ]),
            e("span", Me, n(t("sending")), 1)
          ]),
          e("label", ze, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: m.free_send,
              "onUpdate:modelValue": l[5] || (l[5] = (s) => r.value = s)
            }, null, 8, Fe), [
              [x, r.value]
            ]),
            e("span", $e, n(t("free_send")), 1)
          ]),
          e("label", qe, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: m.whitelist,
              "onUpdate:modelValue": l[6] || (l[6] = (s) => r.value = s)
            }, null, 8, Te), [
              [x, r.value]
            ]),
            e("span", De, n(t("whitelist")), 1)
          ]),
          e("label", je, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: m.freezing,
              "onUpdate:modelValue": l[7] || (l[7] = (s) => r.value = s)
            }, null, 8, Ee), [
              [x, r.value]
            ]),
            e("span", Oe, n(t("freezing")), 1)
          ])
        ])
      ]),
      y.value ? d("", !0) : (i(), c("div", Le, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: Q
        }, n(t("configure_decimals")), 1)
      ])),
      y.value ? (i(), c("div", Pe, [
        e("label", Ae, [
          e("span", Ge, n(t("decimals")), 1)
        ]),
        u(e("input", {
          ref_key: "decimalsInput",
          ref: F,
          "onUpdate:modelValue": l[8] || (l[8] = (s) => v.value = s),
          placeholder: "6",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[9] || (l[9] = (s) => v.value = v.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [_, v.value]
        ])
      ])) : d("", !0),
      f.value ? d("", !0) : (i(), c("div", He, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: W
        }, n(t("configure_subunit")), 1)
      ])),
      f.value ? (i(), c("div", Je, [
        e("label", Ke, [
          e("span", Qe, n(t("subunit")), 1)
        ]),
        u(e("input", {
          ref_key: "subunitInput",
          ref: $,
          "onUpdate:modelValue": l[10] || (l[10] = (s) => V.value = s),
          placeholder: "ubtc",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [_, V.value]
        ])
      ])) : d("", !0),
      C.value ? d("", !0) : (i(), c("div", We, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: L(Z, ["prevent"])
        }, n(t("configure_send_burn_rate")), 9, Xe)
      ])),
      C.value ? (i(), c("div", Ye, [
        e("label", Ze, [
          e("span", el, n(t("send_burn_rate")), 1)
        ]),
        u(e("input", {
          ref_key: "sendBurnRateInput",
          ref: D,
          "onUpdate:modelValue": l[11] || (l[11] = (s) => w.value = s),
          placeholder: "1%",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[12] || (l[12] = (s) => w.value = w.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [_, w.value]
        ])
      ])) : d("", !0),
      N.value ? d("", !0) : (i(), c("div", ll, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: L(ee, ["prevent"])
        }, n(t("configure_send_commission_rate")), 9, sl)
      ])),
      N.value ? (i(), c("div", tl, [
        e("label", al, [
          e("span", ol, n(t("send_commission_rate")), 1)
        ]),
        u(e("input", {
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
      g.value ? d("", !0) : (i(), c("div", nl, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: Y
        }, n(t("configure_max_supply")), 1)
      ])),
      g.value ? (i(), c("div", rl, [
        e("label", ul, [
          e("span", il, n(t("max_supply")), 1)
        ]),
        u(e("input", {
          ref_key: "maxSupplyInput",
          ref: T,
          "onUpdate:modelValue": l[15] || (l[15] = (s) => b.value = s),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[16] || (l[16] = (s) => b.value = b.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [_, b.value]
        ])
      ])) : d("", !0),
      h.value ? d("", !0) : (i(), c("div", cl, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: X
        }, n(t("configure_initial_supply")), 1)
      ])),
      h.value ? (i(), c("div", dl, [
        e("label", pl, [
          e("span", vl, n(t("initial_supply")), 1)
        ]),
        u(e("input", {
          ref_key: "initialSupplyInput",
          ref: q,
          "onUpdate:modelValue": l[17] || (l[17] = (s) => p.value = s),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[18] || (l[18] = (s) => p.value = p.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [_, p.value]
        ])
      ])) : d("", !0)
    ]));
  }
});
export {
  fl as default
};
