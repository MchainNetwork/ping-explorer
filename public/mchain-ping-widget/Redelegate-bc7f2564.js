import { d as j, c as d, r, y as N, o as v, a as m, b as a, t as l, e as q, w as x, v as T, F as U, f as w, u as z, x as R, n as J, g as L, h as P, D as G, i as H, B as K } from "./main-e92b1fb4.js";
import { T as A } from "./TokenUnitConverter-7d5a7b2d.js";
import { I as Q } from "./IdentityIcon-7b14663f.js";
const W = { class: "form-control" }, X = { class: "label" }, Y = { class: "label-text" }, Z = { class: "flex pl-2" }, ee = { class: "ml-2 text-base" }, ae = { class: "form-control" }, te = { class: "label" }, se = { class: "label-text" }, oe = ["value"], le = { class: "form-control" }, ne = { class: "label" }, re = { class: "label-text" }, de = { value: "" }, ie = ["value"], ce = { key: 0 }, ue = { class: "form-control" }, ve = { class: "label" }, me = { class: "label-text" }, pe = { class: "input-group" }, _e = ["placeholder"], be = { class: "text-error" }, ye = /* @__PURE__ */ j({
  __name: "Redelegate",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(f, { expose: O }) {
    const o = f, n = (e) => P(o.locale, e), _ = d(() => JSON.parse(o.params || "{}")), p = r(""), h = r([]), $ = r([]), i = r(""), b = r(""), c = r(""), y = r({}), k = r(""), S = d(() => {
      const e = h.value.find(
        (t) => t.operator_address === _.validator_address
      );
      return e ? `${e.description.moniker} (${N(
        e.commission.commission_rates.rate
      )}%)` : _.value.validator_address;
    }), C = d(() => {
      const e = new A(o.metadata);
      return [
        {
          typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
          value: {
            delegatorAddress: o.sender,
            validatorSrcAddress: _.value.validator_address,
            validatorDstAddress: p.value,
            amount: e.displayToBase(y.value.denom, {
              amount: String(b.value),
              denom: c.value
            })
          }
        }
      ];
    }), E = d(() => [...h.value, ...$.value]), g = d(() => {
      const e = new A(o.metadata), t = y.value || { amount: "0", denom: i.value };
      return {
        base: t,
        display: e.baseToUnit(t, c.value)
      };
    }), F = d(() => {
      if (!o.metadata || !o.metadata[i.value])
        return c.value = i.value, [{ denom: i.value, exponent: 0, aliases: [] }];
      const e = o.metadata[i.value].denom_units.sort(
        (t, u) => u.exponent - t.exponent
      );
      return e.length > 0 && (c.value = e[0].denom), e;
    }), I = d(() => {
      let e = !0, t = "";
      return S.value || (e = !1, t = n("validator_empty")), p.value || (e = !1, t = n("validator_empty")), Number(b.value) > 0 || (e = !1, t = n("amount_greater_than_zero")), { ok: e, error: t };
    });
    function M() {
      G(o.endpoint, _.value.validator_address, o.sender).then((e) => {
        y.value = e.delegation_response.balance;
      }).catch((e) => {
        k.value = e;
      }), H(o.endpoint).then((e) => {
        i.value = e.params.bond_denom;
      }), K(o.endpoint).then((e) => {
        var t;
        h.value = e.validators, p.value = (t = e.validators.find(
          (u) => u.description.identity === "6783E9F948541962"
        )) == null ? void 0 : t.operator_address;
      });
    }
    return O({ msgs: C, isValid: I, initial: M }), (e, t) => {
      var u, V, D, B;
      return v(), m("div", null, [
        a("div", W, [
          a("label", X, [
            a("span", Y, l(n("sender")), 1)
          ]),
          a("div", Z, [
            q(Q, {
              size: "small",
              address: f.sender
            }, null, 8, ["address"]),
            a("span", ee, l(f.sender), 1)
          ])
        ]),
        a("div", ae, [
          a("label", te, [
            a("span", se, l(n("source_validator")), 1)
          ]),
          a("input", {
            value: S.value,
            type: "text",
            class: "input border border-gray-300 dark:border-gray-600",
            readonly: ""
          }, null, 8, oe)
        ]),
        a("div", le, [
          a("label", ne, [
            a("span", re, l(n("destination_validator")), 1)
          ]),
          x(a("select", {
            "onUpdate:modelValue": t[0] || (t[0] = (s) => p.value = s),
            class: "select select-bordered"
          }, [
            a("option", de, l(n("select_validator")), 1),
            (v(!0), m(U, null, w(E.value, (s) => (v(), m("option", {
              key: s.description.moniker,
              value: s.operator_address
            }, [
              z(l(s.description.moniker) + " (" + l(R(N)(s.commission.commission_rates.rate)) + "%) ", 1),
              s.status !== "BOND_STATUS_BONDED" ? (v(), m("span", ce, "x")) : J("", !0)
            ], 8, ie))), 128))
          ], 512), [
            [T, p.value]
          ])
        ]),
        a("div", ue, [
          a("label", ve, [
            a("span", me, l(n("amount")), 1),
            a("span", null, l((u = g.value) == null ? void 0 : u.display.amount) + l((V = g.value) == null ? void 0 : V.display.denom), 1)
          ]),
          a("label", pe, [
            x(a("input", {
              "onUpdate:modelValue": t[1] || (t[1] = (s) => b.value = s),
              type: "number",
              placeholder: n("available") + `: ${(D = g.value) == null ? void 0 : D.display.amount}${(B = g.value) == null ? void 0 : B.display.denom}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, _e), [
              [L, b.value]
            ]),
            x(a("select", {
              "onUpdate:modelValue": t[2] || (t[2] = (s) => c.value = s),
              class: "select select-bordered uppercase"
            }, [
              (v(!0), m(U, null, w(F.value, (s) => (v(), m("option", {
                key: s.denom
              }, l(s.denom), 1))), 128))
            ], 512), [
              [T, c.value]
            ])
          ])
        ]),
        a("div", be, l(k.value), 1)
      ]);
    };
  }
});
export {
  ye as default
};
