import { d as E, c as m, r as i, o as F, a as v, b as p, e as t, t as n, f as q, w as k, v as D, F as T, g as N, u as $, x as J, y as L, p as P, h as G, i as H, z as K, j as Q, B as R } from "./main-6f623a49.js";
import { T as B } from "./TokenUnitConverter-224d1a76.js";
import { I as W } from "./IdentityIcon-9dc0c59f.js";
const X = { class: "form-control" }, Y = { class: "label" }, Z = { class: "label-text" }, ee = { class: "flex p-2" }, ae = { class: "ml-2 text-base" }, te = { class: "form-control" }, se = { class: "label" }, oe = { class: "label-text" }, ne = { value: "" }, le = ["value"], re = { key: 0 }, de = { class: "form-control" }, ie = { class: "label" }, ue = { class: "label-text" }, ce = { class: "join" }, me = ["placeholder"], fe = /* @__PURE__ */ E({
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
  setup(b, { expose: I, emit: U }) {
    const o = b, r = (e) => H(o.locale, e), x = m(() => JSON.parse(o.params || "{}")), c = i(""), g = i([]), V = i([]), d = i(""), j = i(""), _ = i(""), u = i(""), w = m(() => {
      const e = new B(o.metadata);
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
    }), A = m(() => [...g.value, ...V.value]), y = m(() => {
      var l;
      const e = new B(o.metadata), a = ((l = o.balances) == null ? void 0 : l.find((f) => f.denom === d.value)) || {
        amount: "0",
        denom: d.value
      };
      return {
        base: a,
        display: e.baseToUnit(a, u.value)
      };
    });
    function O() {
      K(o.endpoint).then((e) => {
        V.value = e.validators;
      });
    }
    const C = m(() => {
      if (!o.metadata || !o.metadata[d.value])
        return u.value = d.value, [{ denom: d.value, exponent: 0, aliases: [] }];
      const e = o.metadata[d.value].denom_units.sort(
        (a, l) => l.exponent - a.exponent
      );
      return e.length > 0 && (u.value = e[0].denom), e;
    }), M = m(() => {
      let e = !0, a = "";
      return c.value || (e = !1, a = r("validator_empty")), Number(_.value) > 0 || (e = !1, a = r("amount_greater_than_zero")), u.value || (e = !1, a = r("amount_denom_empty")), { ok: e, error: a };
    }), h = i(null);
    function z() {
      h.value && h.value.focus(), g.value = [], c.value = x.value.validator_address, Q(o.endpoint).then((e) => {
        d.value = e.params.bond_denom, j.value = e.params.unbonding_time;
      }), R(o.endpoint).then((e) => {
        var a;
        g.value = e.validators, x.value.validator_address || (c.value = (a = e.validators.find(
          (l) => l.description.identity === "6783E9F948541962"
        )) == null ? void 0 : a.operator_address);
      });
    }
    return F(() => {
      U("loaded");
    }), I({ msgs: w, isValid: M, initial: z }), (e, a) => {
      var l, f, S;
      return v(), p("div", null, [
        t("div", X, [
          t("label", Y, [
            t("span", Z, n(r("your_connected_account")), 1)
          ]),
          t("div", ee, [
            q(W, {
              size: "small",
              address: b.sender
            }, null, 8, ["address"]),
            t("span", ae, n(b.sender), 1)
          ])
        ]),
        t("div", te, [
          t("label", se, [
            t("span", oe, n(r("validator")), 1),
            t("a", {
              class: "label-text",
              onClick: a[0] || (a[0] = (s) => O())
            }, n(r("show_inactive")), 1)
          ]),
          k(t("select", {
            "onUpdate:modelValue": a[1] || (a[1] = (s) => c.value = s),
            class: "select select-bordered rounded-full"
          }, [
            t("option", ne, n(r("select_validator")), 1),
            (v(!0), p(T, null, N(A.value, (s) => (v(), p("option", {
              key: s.operator_address,
              value: s.operator_address
            }, [
              $(n(s.description.moniker) + " (" + n(J(L)(s.commission.commission_rates.rate)) + "%) ", 1),
              s.status !== "BOND_STATUS_BONDED" ? (v(), p("span", re, "x")) : P("", !0)
            ], 8, le))), 128))
          ], 512), [
            [D, c.value]
          ])
        ]),
        t("div", de, [
          t("label", ie, [
            t("span", ue, n(r("amount")), 1),
            t("span", null, n((l = y.value) == null ? void 0 : l.display.amount) + " " + n((f = y.value) == null ? void 0 : f.display.denom), 1)
          ]),
          t("label", ce, [
            k(t("input", {
              ref_key: "focusInput",
              ref: h,
              "onUpdate:modelValue": a[2] || (a[2] = (s) => _.value = s),
              type: "number",
              placeholder: `Available: ${(S = y.value) == null ? void 0 : S.display.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full join-item"
            }, null, 8, me), [
              [G, _.value]
            ]),
            k(t("select", {
              "onUpdate:modelValue": a[3] || (a[3] = (s) => u.value = s),
              class: "select select-bordered join-item uppercase"
            }, [
              (v(!0), p(T, null, N(C.value, (s) => (v(), p("option", {
                key: s.denom
              }, n(s.denom), 1))), 128))
            ], 512), [
              [D, u.value]
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  fe as default
};
