import { d as U, c as u, r as m, o as b, a as g, b as t, t as d, e as V, w as x, g as B, v as N, F as M, f as O, h as j, i as q } from "./main-e92b1fb4.js";
import { T as S } from "./TokenUnitConverter-7d5a7b2d.js";
import { I as z } from "./IdentityIcon-7b14663f.js";
const C = { class: "form-control" }, F = { class: "label" }, A = { class: "label-text" }, E = { class: "flex pl-2" }, J = { class: "ml-2 text-base" }, L = { class: "form-control" }, P = { class: "label" }, $ = { class: "label-text" }, G = { class: "input-group" }, H = ["placeholder"], W = /* @__PURE__ */ U({
  __name: "Deposit",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(v, { expose: k }) {
    const s = v, i = (e) => j(s.locale, e), y = u(() => JSON.parse(s.params || "{}")), o = m(""), c = m(""), l = m(""), _ = u(() => {
      var n;
      const e = new S(s.metadata), a = ((n = s.balances) == null ? void 0 : n.find((p) => p.denom === o.value)) || {
        amount: "0",
        denom: o.value
      };
      return {
        base: a,
        display: e.baseToUnit(a, l.value)
      };
    }), I = u(() => {
      const e = new S(s.metadata);
      return [
        {
          typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
          value: {
            depositor: s.sender,
            proposalId: y.value.proposal_id,
            amount: [
              e.displayToBase(o.value, {
                amount: String(c.value),
                denom: l.value
              })
            ]
          }
        }
      ];
    }), w = u(() => {
      if (!s.metadata || !s.metadata[o.value])
        return l.value = o.value, [{ denom: o.value, exponent: 0, aliases: [] }];
      const e = s.metadata[o.value].denom_units.sort(
        (a, n) => n.exponent - a.exponent
      );
      return e.length > 0 && (l.value = e[0].denom), e;
    }), D = u(() => {
      let e = !0, a = "";
      return y.value.proposal_id || (e = !1, a = i("proposal_id_empty")), Number(c.value) > 0 || (e = !1, a = i("amount_greater_than_zero")), { ok: e, error: a };
    }), f = m(null);
    function T() {
      f.value && f.value.focus(), q(s.endpoint).then((e) => {
        o.value = e.params.bond_denom;
      });
    }
    return k({ msgs: I, isValid: D, initial: T }), (e, a) => {
      var n, p, h;
      return b(), g("div", null, [
        t("div", C, [
          t("label", F, [
            t("span", A, d(i("sender")), 1)
          ]),
          t("div", E, [
            V(z, {
              size: "small",
              address: v.sender
            }, null, 8, ["address"]),
            t("span", J, d(v.sender), 1)
          ])
        ]),
        t("div", L, [
          t("label", P, [
            t("span", $, d(i("amount")), 1),
            t("span", null, d((n = _.value) == null ? void 0 : n.display.amount) + d((p = _.value) == null ? void 0 : p.display.denom), 1)
          ]),
          t("label", G, [
            x(t("input", {
              ref_key: "focusInput",
              ref: f,
              "onUpdate:modelValue": a[0] || (a[0] = (r) => c.value = r),
              type: "number",
              placeholder: `Available: ${(h = _.value) == null ? void 0 : h.display.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, H), [
              [B, c.value]
            ]),
            x(t("select", {
              "onUpdate:modelValue": a[1] || (a[1] = (r) => l.value = r),
              class: "select select-bordered uppercase"
            }, [
              (b(!0), g(M, null, O(w.value, (r) => (b(), g("option", {
                key: r.denom
              }, d(r.denom), 1))), 128))
            ], 512), [
              [N, l.value]
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  W as default
};
