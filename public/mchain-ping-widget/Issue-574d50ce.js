import { d as ae, r as n, c as R, o as ne, a as i, b as c, e, t as o, f as oe, w as u, h as _, s as x, p as d, u as O, i as re, x as S } from "./main-77c800e4.js";
import { I as ue } from "./IdentityIcon-f75a8654.js";
const ie = { class: "form-control" }, ce = { class: "label" }, de = { class: "label-text" }, pe = { class: "flex p-2" }, ve = { class: "ml-2 text-base" }, me = { class: "form-control mb-2" }, be = { class: "label" }, fe = { class: "label-text" }, _e = { class: "form-control mb-2" }, ke = { class: "label" }, ye = { class: "label-text" }, he = { class: "form-control" }, ge = { class: "label cursor-pointer" }, xe = { class: "label-text" }, Se = { class: "grid grid-cols-1 md:grid-cols-3 gap-2 p-2" }, Ve = { class: "cursor-pointer flex items-center mb-2" }, we = ["value"], Ie = { class: "label-text" }, Ce = { class: "cursor-pointer flex items-center mb-2" }, Ne = ["value"], Be = { class: "label-text" }, Ue = { class: "cursor-pointer flex items-center mb-2" }, Re = ["value"], Me = { class: "label-text" }, ze = { class: "cursor-pointer flex items-center mb-2" }, Fe = ["value"], $e = { class: "label-text" }, qe = { class: "cursor-pointer flex items-center mb-2" }, Te = ["value"], De = { class: "label-text" }, Ee = { class: "cursor-pointer flex items-center mb-2" }, je = ["value"], Le = { class: "label-text" }, Oe = {
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
}, al = { class: "label" }, nl = { class: "label-text" }, ol = {
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
    const B = M, t = (a) => re(B.locale || "en", a), G = {
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
    }, k = n(""), U = n(""), V = n(""), m = n("0"), v = n("0"), b = n("0"), H = n(""), w = n("0"), I = n("0"), J = R(() => r.value.map(
      //@ts-ignore
      (a) => p[G[a]]
    )), r = n([]), K = R(
      () => r.value.includes(p.minting)
    ), y = n(!1), f = n(!1), h = n(!1), g = n(!1), C = n(!1), N = n(!1), F = n(), $ = n(), q = n(), T = n(), D = n(), E = n();
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
      h.value = !h.value, h.value && (v.value = "", S(() => {
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
        (a = E.value) == null || a.focus();
      });
    }
    function j(a) {
      const l = parseFloat(a.replace("%", ""));
      return isNaN(l) ? "0" : (l * Math.pow(10, 16)).toFixed(0);
    }
    const le = R(() => {
      f.value || (V.value = Number(m.value) > 0 ? `u${k.value}` : k.value);
      const a = Number(v.value) * Math.pow(10, Number(m.value)), l = Number(b.value) * Math.pow(10, Number(m.value)), s = j(w.value), L = j(I.value);
      return [
        {
          typeUrl: "/mchain.smarttoken.v1beta1.MsgIssue",
          value: {
            subunit: V.value.toLowerCase(),
            symbol: k.value.toLowerCase(),
            name: U.value,
            decimals: m.value,
            initialSupply: a.toString(),
            maxSupply: l.toString(),
            authority: B.sender,
            minter: B.sender,
            uri: H.value,
            sendBurnRate: s.toString(),
            sendCommissionRate: L.toString(),
            features: J.value
          }
        }
      ];
    }), se = R(() => B.sender ? U.value.trim() ? k.value.trim() ? f.value && !V.value.trim() ? { ok: !1, error: t("subunit_required") } : Number(m.value) >= 0 && Number(m.value) <= 18 ? !b.value.trim() || isNaN(Number(b.value)) || Number(b.value) < 0 ? { ok: !1, error: t("invalid_max_supply") } : !v.value.trim() || isNaN(Number(v.value)) || Number(v.value) < 0 ? { ok: !1, error: t("invalid_initial_supply") } : !K.value && (!v.value.trim() || Number(v.value) === 0) ? { ok: !1, error: t("minting_disabled_initial_supply_zero") } : { ok: !0, error: "" } : { ok: !1, error: t("decimals_range") } : { ok: !1, error: t("symbol_required") } : { ok: !1, error: t("name_required") } : { ok: !1, error: t("sender_empty") }), z = n(null);
    function te() {
      y.value = !1, f.value = !1, h.value = !1, g.value = !1, z.value && z.value.focus();
    }
    return ne(() => {
      r.value = [
        p.minting,
        p.burning,
        p.sending
      ], A("loaded");
    }), P({ msgs: le, isValid: se, initial: te }), (a, l) => (i(), c("div", null, [
      e("div", ie, [
        e("label", ce, [
          e("span", de, o(t("your_connected_account")), 1)
        ]),
        e("div", pe, [
          oe(ue, {
            size: "small",
            address: M.sender
          }, null, 8, ["address"]),
          e("span", ve, o(M.sender), 1)
        ])
      ]),
      e("div", me, [
        e("label", be, [
          e("span", fe, o(t("name")), 1)
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
          e("span", ye, o(t("symbol")), 1)
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
          e("span", xe, o(t("features")), 1)
        ]),
        e("div", Se, [
          e("label", Ve, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: p.minting,
              "onUpdate:modelValue": l[2] || (l[2] = (s) => r.value = s)
            }, null, 8, we), [
              [x, r.value]
            ]),
            e("span", Ie, o(t("minting")), 1)
          ]),
          e("label", Ce, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: p.burning,
              "onUpdate:modelValue": l[3] || (l[3] = (s) => r.value = s)
            }, null, 8, Ne), [
              [x, r.value]
            ]),
            e("span", Be, o(t("burning")), 1)
          ]),
          e("label", Ue, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: p.sending,
              "onUpdate:modelValue": l[4] || (l[4] = (s) => r.value = s)
            }, null, 8, Re), [
              [x, r.value]
            ]),
            e("span", Me, o(t("sending")), 1)
          ]),
          e("label", ze, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: p.free_send,
              "onUpdate:modelValue": l[5] || (l[5] = (s) => r.value = s)
            }, null, 8, Fe), [
              [x, r.value]
            ]),
            e("span", $e, o(t("free_send")), 1)
          ]),
          e("label", qe, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: p.whitelist,
              "onUpdate:modelValue": l[6] || (l[6] = (s) => r.value = s)
            }, null, 8, Te), [
              [x, r.value]
            ]),
            e("span", De, o(t("whitelist")), 1)
          ]),
          e("label", Ee, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: p.freezing,
              "onUpdate:modelValue": l[7] || (l[7] = (s) => r.value = s)
            }, null, 8, je), [
              [x, r.value]
            ]),
            e("span", Le, o(t("freezing")), 1)
          ])
        ])
      ]),
      y.value ? d("", !0) : (i(), c("div", Oe, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: Q
        }, o(t("configure_decimals")), 1)
      ])),
      y.value ? (i(), c("div", Pe, [
        e("label", Ae, [
          e("span", Ge, o(t("decimals")), 1)
        ]),
        u(e("input", {
          ref_key: "decimalsInput",
          ref: F,
          "onUpdate:modelValue": l[8] || (l[8] = (s) => m.value = s),
          placeholder: "6",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[9] || (l[9] = (s) => m.value = m.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [_, m.value]
        ])
      ])) : d("", !0),
      f.value ? d("", !0) : (i(), c("div", He, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: W
        }, o(t("configure_subunit")), 1)
      ])),
      f.value ? (i(), c("div", Je, [
        e("label", Ke, [
          e("span", Qe, o(t("subunit")), 1)
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
          onClick: O(Z, ["prevent"])
        }, o(t("configure_send_burn_rate")), 9, Xe)
      ])),
      C.value ? (i(), c("div", Ye, [
        e("label", Ze, [
          e("span", el, o(t("send_burn_rate")), 1)
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
          onClick: O(ee, ["prevent"])
        }, o(t("configure_send_commission_rate")), 9, sl)
      ])),
      N.value ? (i(), c("div", tl, [
        e("label", al, [
          e("span", nl, o(t("send_commission_rate")), 1)
        ]),
        u(e("input", {
          ref_key: "sendCommissionRateInput",
          ref: E,
          "onUpdate:modelValue": l[13] || (l[13] = (s) => I.value = s),
          placeholder: "2%",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full",
          onBlur: l[14] || (l[14] = (s) => I.value = I.value.replace(/[^0-9.]+/g, ""))
        }, null, 544), [
          [_, I.value]
        ])
      ])) : d("", !0),
      g.value ? d("", !0) : (i(), c("div", ol, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: Y
        }, o(t("configure_max_supply")), 1)
      ])),
      g.value ? (i(), c("div", rl, [
        e("label", ul, [
          e("span", il, o(t("max_supply")), 1)
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
        }, o(t("configure_initial_supply")), 1)
      ])),
      h.value ? (i(), c("div", dl, [
        e("label", pl, [
          e("span", vl, o(t("initial_supply")), 1)
        ]),
        u(e("input", {
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
  fl as default
};
