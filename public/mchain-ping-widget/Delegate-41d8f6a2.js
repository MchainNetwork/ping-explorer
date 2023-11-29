import { d as C, c as m, r as i, o as F, a as v, b as p, e as t, t as n, f as q, w as k, v as V, F as D, g as T, D as z, E as G, G as H, p as J, h as L, i as P, j as $, H as K } from "./main-dcfa34f6.js";
import { T as N } from "./TokenUnitConverter-5c47a9e6.js";
import { I as Q } from "./IdentityIcon-5797a91d.js";
const R = { class: "form-control" }, W = { class: "label" }, X = { class: "label-text" }, Y = { class: "flex p-2" }, Z = { class: "ml-2 text-base" }, ee = { class: "form-control" }, ae = { class: "label" }, te = { class: "label-text" }, se = { value: "" }, oe = ["value"], ne = { key: 0 }, le = { class: "form-control" }, re = { class: "label" }, de = { class: "label-text" }, ie = { class: "join" }, ue = ["placeholder"], pe = /* @__PURE__ */ C({
  __name: "Delegate",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(b, { expose: U, emit: j }) {
    const o = b, r = (e) => P(o.locale || "en", e), x = m(() => JSON.parse(o.params || "{}")), c = i(""), g = i([]), B = i([]), d = i(""), w = i(""), _ = i(""), u = i(""), I = m(() => {
      const e = new N(o.metadata);
      return [
        {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: {
            delegatorAddress: o.sender,
            validatorAddress: c.value,
            amount: e.displayToBase(d.value, {
              amount: String(_.value),
              denom: u.value
            })
          }
        }
      ];
    }), O = m(() => [...g.value, ...B.value]), y = m(() => {
      var l;
      const e = new N(o.metadata), a = ((l = o.balances) == null ? void 0 : l.find((f) => f.denom === d.value)) || {
        amount: "0",
        denom: d.value
      };
      return {
        base: a,
        display: e.baseToUnit(a, u.value)
      };
    }), A = m(() => {
      if (!o.metadata || !o.metadata[d.value])
        return u.value = d.value, [{ denom: d.value, exponent: 0, aliases: [] }];
      const e = o.metadata[d.value].denom_units.sort(
        (a, l) => l.exponent - a.exponent
      );
      return e.length > 0 && (u.value = e[0].denom), e;
    }), E = m(() => {
      let e = !0, a = "";
      return c.value || (e = !1, a = r("validator_empty")), Number(_.value) > 0 || (e = !1, a = r("amount_greater_than_zero")), u.value || (e = !1, a = r("amount_denom_empty")), { ok: e, error: a };
    }), h = i(null);
    function M() {
      h.value && h.value.focus(), g.value = [], c.value = x.value.validator_address, $(o.endpoint).then((e) => {
        d.value = e.params.bond_denom, w.value = e.params.unbonding_time;
      }), K(o.endpoint).then((e) => {
        var a;
        g.value = e.validators, x.value.validator_address || (c.value = (a = e.validators.find(
          (l) => l.description.identity === "6783E9F948541962"
        )) == null ? void 0 : a.operator_address);
      });
    }
    return F(() => {
      j("loaded");
    }), U({ msgs: I, isValid: E, initial: M }), (e, a) => {
      var l, f, S;
      return v(), p("div", null, [
        t("div", R, [
          t("label", W, [
            t("span", X, n(r("your_connected_account")), 1)
          ]),
          t("div", Y, [
            q(Q, {
              size: "small",
              address: b.sender
            }, null, 8, ["address"]),
            t("span", Z, n(b.sender), 1)
          ])
        ]),
        t("div", ee, [
          t("label", ae, [
            t("span", te, n(r("validator")), 1)
          ]),
          k(t("select", {
            "onUpdate:modelValue": a[0] || (a[0] = (s) => c.value = s),
            class: "select select-bordered rounded-full"
          }, [
            t("option", se, n(r("select_validator")), 1),
            (v(!0), p(D, null, T(O.value, (s) => (v(), p("option", {
              key: s.operator_address,
              value: s.operator_address
            }, [
              z(n(s.description.moniker) + " (" + n(G(H)(s.commission.commission_rates.rate)) + "%) ", 1),
              s.status !== "BOND_STATUS_BONDED" ? (v(), p("span", ne, "x")) : J("", !0)
            ], 8, oe))), 128))
          ], 512), [
            [V, c.value]
          ])
        ]),
        t("div", le, [
          t("label", re, [
            t("span", de, n(r("amount")), 1),
            t("span", null, n((l = y.value) == null ? void 0 : l.display.amount) + " " + n((f = y.value) == null ? void 0 : f.display.denom), 1)
          ]),
          t("label", ie, [
            k(t("input", {
              ref_key: "focusInput",
              ref: h,
              "onUpdate:modelValue": a[1] || (a[1] = (s) => _.value = s),
              type: "number",
              placeholder: r("available") + `: ${(S = y.value.display) == null ? void 0 : S.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full join-item"
            }, null, 8, ue), [
              [L, _.value]
            ]),
            k(t("select", {
              "onUpdate:modelValue": a[2] || (a[2] = (s) => u.value = s),
              class: "select select-bordered join-item uppercase"
            }, [
              (v(!0), p(D, null, T(A.value, (s) => (v(), p("option", {
                key: s.denom
              }, n(s.denom), 1))), 128))
            ], 512), [
              [V, u.value]
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  pe as default
};
