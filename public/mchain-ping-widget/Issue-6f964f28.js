import { d as A, c as U, r as o, o as G, a as i, b as c, e, t, f as H, w as u, h, s as x, p as m, i as K, u as N } from "./main-3ba0e469.js";
import { I as P } from "./IdentityIcon-5111b131.js";
const Q = { class: "form-control" }, R = { class: "label" }, W = { class: "label-text" }, X = { class: "flex p-2" }, Y = { class: "ml-2 text-base" }, Z = { class: "form-control mb-2" }, ee = { class: "label" }, le = { class: "label-text" }, se = { class: "form-control mb-2" }, ae = { class: "label" }, te = { class: "label-text" }, oe = { class: "form-control" }, re = { class: "label cursor-pointer" }, ne = { class: "label-text" }, ue = { class: "grid grid-cols-1 md:grid-cols-3 gap-2 p-2" }, ie = { class: "cursor-pointer flex items-center mb-2" }, ce = { class: "label-text" }, de = { class: "cursor-pointer flex items-center mb-2" }, pe = { class: "label-text" }, me = { class: "cursor-pointer flex items-center mb-2" }, be = { class: "label-text" }, ve = { class: "cursor-pointer flex items-center mb-2" }, fe = { class: "label-text" }, _e = { class: "cursor-pointer flex items-center mb-2" }, ye = { class: "label-text" }, ke = { class: "cursor-pointer flex items-center mb-2" }, he = { class: "label-text" }, xe = {
  key: 0,
  class: "p-2"
}, ge = {
  key: 1,
  class: "form-control"
}, Se = { class: "label" }, Ve = { class: "label-text" }, Ne = {
  key: 2,
  class: "p-2"
}, we = {
  key: 3,
  class: "form-control"
}, Ie = { class: "label" }, Ue = { class: "label-text" }, Ce = {
  key: 4,
  class: "p-2"
}, Me = {
  key: 5,
  class: "form-control"
}, qe = { class: "label" }, Be = { class: "label-text" }, De = {
  key: 6,
  class: "p-2"
}, ze = {
  key: 7,
  class: "form-control"
}, Oe = { class: "label" }, Te = { class: "label-text" }, Ee = /* @__PURE__ */ A({
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
  setup(w, { expose: D, emit: z }) {
    const g = w, s = (r) => K(g.locale, r);
    U(() => JSON.parse(g.params || "{}"));
    const f = o(""), V = o(""), S = o(""), d = o("6"), b = o("0"), v = o("0"), O = o(""), _ = o(!1), p = o(!1), y = o(!1), k = o(!1), C = o(), M = o(), q = o(), B = o();
    function T() {
      _.value = !_.value, _.value && N(() => {
        var r;
        (r = C.value) == null || r.focus();
      });
    }
    function j() {
      p.value = !p.value, p.value && N(() => {
        var r;
        (r = M.value) == null || r.focus();
      });
    }
    function L() {
      y.value = !y.value, y.value && (b.value = "", N(() => {
        var r;
        (r = q.value) == null || r.focus();
      }));
    }
    function E() {
      k.value = !k.value, k.value && (v.value = "", N(() => {
        var r;
        (r = B.value) == null || r.focus();
      }));
    }
    const n = o([]), F = U(() => {
      p.value || (S.value = Number(d.value) > 0 ? `u${f.value}` : f.value);
      const r = Number(b.value) * Math.pow(10, Number(d.value)), l = Number(v.value) * Math.pow(10, Number(d.value));
      return [
        {
          typeUrl: "/mchain.smarttoken.v1beta1.MsgIssue",
          value: {
            subunit: S.value.toLowerCase(),
            symbol: f.value.toLowerCase(),
            name: V.value,
            decimals: d.value,
            initialSupply: r.toString(),
            maxSupply: l.toString(),
            authority: g.sender,
            minter: g.sender,
            uri: O.value
          }
        }
      ];
    }), J = U(() => g.sender ? V.value.trim() ? f.value.trim() ? p.value && !S.value.trim() ? { ok: !1, error: s("subunit_required") } : Number(d.value) >= 0 && Number(d.value) <= 18 ? !v.value.trim() || isNaN(Number(v.value)) || Number(v.value) < 0 ? { ok: !1, error: s("invalid_max_supply") } : !b.value.trim() || isNaN(Number(b.value)) || Number(b.value) < 0 ? { ok: !1, error: s("invalid_initial_supply") } : { ok: !0, error: "" } : { ok: !1, error: s("decimals_range") } : { ok: !1, error: s("symbol_required") } : { ok: !1, error: s("name_required") } : { ok: !1, error: s("sender_empty") }), I = o(null);
    function $() {
      _.value = !1, p.value = !1, y.value = !1, k.value = !1, I.value && I.value.focus();
    }
    return G(() => {
      z("loaded");
    }), D({ msgs: F, isValid: J, initial: $ }), (r, l) => (i(), c("div", null, [
      e("div", Q, [
        e("label", R, [
          e("span", W, t(s("your_connected_account")), 1)
        ]),
        e("div", X, [
          H(P, {
            size: "small",
            address: w.sender
          }, null, 8, ["address"]),
          e("span", Y, t(w.sender), 1)
        ])
      ]),
      e("div", Z, [
        e("label", ee, [
          e("span", le, t(s("name")), 1)
        ]),
        u(e("input", {
          ref_key: "focusInput",
          ref: I,
          "onUpdate:modelValue": l[0] || (l[0] = (a) => V.value = a),
          placeholder: "Bitcoin",
          class: "input border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [h, V.value]
        ])
      ]),
      e("div", se, [
        e("label", ae, [
          e("span", te, t(s("symbol")), 1)
        ]),
        u(e("input", {
          "onUpdate:modelValue": l[1] || (l[1] = (a) => f.value = a),
          placeholder: "BTC",
          class: "input border border-full border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [h, f.value]
        ])
      ]),
      e("div", oe, [
        e("label", re, [
          e("span", ne, t(s("features")), 1)
        ]),
        e("div", ue, [
          e("label", ie, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: "minting",
              "onUpdate:modelValue": l[2] || (l[2] = (a) => n.value = a)
            }, null, 512), [
              [x, n.value]
            ]),
            e("span", ce, t(s("minting")), 1)
          ]),
          e("label", de, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: "burning",
              "onUpdate:modelValue": l[3] || (l[3] = (a) => n.value = a)
            }, null, 512), [
              [x, n.value]
            ]),
            e("span", pe, t(s("burning")), 1)
          ]),
          e("label", me, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: "sending",
              "onUpdate:modelValue": l[4] || (l[4] = (a) => n.value = a)
            }, null, 512), [
              [x, n.value]
            ]),
            e("span", be, t(s("sending")), 1)
          ]),
          e("label", ve, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: "free_send",
              "onUpdate:modelValue": l[5] || (l[5] = (a) => n.value = a)
            }, null, 512), [
              [x, n.value]
            ]),
            e("span", fe, t(s("free_send")), 1)
          ]),
          e("label", _e, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: "whitelist",
              "onUpdate:modelValue": l[6] || (l[6] = (a) => n.value = a)
            }, null, 512), [
              [x, n.value]
            ]),
            e("span", ye, t(s("whitelist")), 1)
          ]),
          e("label", ke, [
            u(e("input", {
              type: "checkbox",
              class: "checkbox checkbox-md checkbox-primary mr-2",
              value: "freezing",
              "onUpdate:modelValue": l[7] || (l[7] = (a) => n.value = a)
            }, null, 512), [
              [x, n.value]
            ]),
            e("span", he, t(s("freezing")), 1)
          ])
        ])
      ]),
      _.value ? m("", !0) : (i(), c("div", xe, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: T
        }, t(s("configure_decimals")), 1)
      ])),
      _.value ? (i(), c("div", ge, [
        e("label", Se, [
          e("span", Ve, t(s("decimals")), 1)
        ]),
        u(e("input", {
          ref_key: "decimalsInput",
          ref: C,
          "onUpdate:modelValue": l[8] || (l[8] = (a) => d.value = a),
          placeholder: "6",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [h, d.value]
        ])
      ])) : m("", !0),
      p.value ? m("", !0) : (i(), c("div", Ne, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: j
        }, t(s("configure_subunit")), 1)
      ])),
      p.value ? (i(), c("div", we, [
        e("label", Ie, [
          e("span", Ue, t(s("subunit")), 1)
        ]),
        u(e("input", {
          ref_key: "subunitInput",
          ref: M,
          "onUpdate:modelValue": l[9] || (l[9] = (a) => S.value = a),
          placeholder: "ubtc",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [h, S.value]
        ])
      ])) : m("", !0),
      k.value ? m("", !0) : (i(), c("div", Ce, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: E
        }, t(s("configure_max_supply")), 1)
      ])),
      k.value ? (i(), c("div", Me, [
        e("label", qe, [
          e("span", Be, t(s("max_supply")), 1)
        ]),
        u(e("input", {
          ref_key: "maxSupplyInput",
          ref: B,
          "onUpdate:modelValue": l[10] || (l[10] = (a) => v.value = a),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [h, v.value]
        ])
      ])) : m("", !0),
      y.value ? m("", !0) : (i(), c("div", De, [
        e("a", {
          href: "#",
          class: "text-sm link link-primary link-hover",
          onClick: L
        }, t(s("configure_initial_supply")), 1)
      ])),
      y.value ? (i(), c("div", ze, [
        e("label", Oe, [
          e("span", Te, t(s("initial_supply")), 1)
        ]),
        u(e("input", {
          ref_key: "initialSupplyInput",
          ref: q,
          "onUpdate:modelValue": l[11] || (l[11] = (a) => b.value = a),
          placeholder: "1000000000000",
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 512), [
          [h, b.value]
        ])
      ])) : m("", !0)
    ]));
  }
});
export {
  Ee as default
};
