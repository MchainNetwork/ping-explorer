import { d as V, c as u, r as m, o as B, a as b, b as g, e as t, t as d, f as M, w as x, h as N, v as j, F as O, g as q, i as z, j as C } from "./main-8509f5a1.js";
import { T as S } from "./TokenUnitConverter-7124a9ec.js";
import { I as F } from "./IdentityIcon-2734480f.js";
const A = { class: "form-control" }, E = { class: "label" }, J = { class: "label-text" }, L = { class: "flex p-2" }, P = { class: "ml-2 text-base" }, $ = { class: "form-control" }, G = { class: "label" }, H = { class: "label-text" }, K = { class: "input-group" }, Q = ["placeholder"], Y = /* @__PURE__ */ V({
  __name: "Deposit",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(v, { expose: k, emit: I }) {
    const s = v, i = (e) => z(s.locale || "en", e), y = u(() => JSON.parse(s.params || "{}")), o = m(""), c = m(""), l = m(""), _ = u(() => {
      var n;
      const e = new S(s.metadata), a = ((n = s.balances) == null ? void 0 : n.find((p) => p.denom === o.value)) || {
        amount: "0",
        denom: o.value
      };
      return {
        base: a,
        display: e.baseToUnit(a, l.value)
      };
    }), w = u(() => {
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
    }), D = u(() => {
      if (!s.metadata || !s.metadata[o.value])
        return l.value = o.value, [{ denom: o.value, exponent: 0, aliases: [] }];
      const e = s.metadata[o.value].denom_units.sort(
        (a, n) => n.exponent - a.exponent
      );
      return e.length > 0 && (l.value = e[0].denom), e;
    }), T = u(() => {
      let e = !0, a = "";
      return y.value.proposal_id || (e = !1, a = i("proposal_id_empty")), Number(c.value) > 0 || (e = !1, a = i("amount_greater_than_zero")), { ok: e, error: a };
    }), f = m(null);
    function U() {
      f.value && f.value.focus(), C(s.endpoint).then((e) => {
        o.value = e.params.bond_denom;
      });
    }
    return B(() => {
      I("loaded");
    }), k({ msgs: w, isValid: T, initial: U }), (e, a) => {
      var n, p, h;
      return b(), g("div", null, [
        t("div", A, [
          t("label", E, [
            t("span", J, d(i("your_connected_account")), 1)
          ]),
          t("div", L, [
            M(F, {
              size: "small",
              address: v.sender
            }, null, 8, ["address"]),
            t("span", P, d(v.sender), 1)
          ])
        ]),
        t("div", $, [
          t("label", G, [
            t("span", H, d(i("amount")), 1),
            t("span", null, d((n = _.value) == null ? void 0 : n.display.amount) + d((p = _.value) == null ? void 0 : p.display.denom), 1)
          ]),
          t("label", K, [
            x(t("input", {
              ref_key: "focusInput",
              ref: f,
              "onUpdate:modelValue": a[0] || (a[0] = (r) => c.value = r),
              type: "number",
              placeholder: `Available: ${(h = _.value) == null ? void 0 : h.display.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, Q), [
              [N, c.value]
            ]),
            x(t("select", {
              "onUpdate:modelValue": a[1] || (a[1] = (r) => l.value = r),
              class: "select select-bordered uppercase"
            }, [
              (b(!0), g(O, null, q(D.value, (r) => (b(), g("option", {
                key: r.denom
              }, d(r.denom), 1))), 128))
            ], 512), [
              [j, l.value]
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  Y as default
};
