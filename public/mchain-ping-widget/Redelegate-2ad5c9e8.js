import { d as q, c as d, r, I as T, o as z, a as v, b as m, e as a, t as n, f as J, w as x, v as B, F as U, g as w, G as R, H as G, p as H, h as K, i as L, K as P, j as Q, J as W } from "./main-a00ca3ce.js";
import { T as A } from "./TokenUnitConverter-ddb5c664.js";
import { I as X } from "./IdentityIcon-ebc7f7f3.js";
const Y = { class: "form-control" }, Z = { class: "label" }, ee = { class: "label-text" }, ae = { class: "flex p-2" }, te = { class: "ml-2 text-base" }, se = { class: "form-control" }, oe = { class: "label" }, ne = { class: "label-text" }, le = ["value"], re = { class: "form-control" }, de = { class: "label" }, ie = { class: "label-text" }, ce = { value: "" }, ue = ["value"], ve = { key: 0 }, me = { class: "form-control" }, pe = { class: "label" }, _e = { class: "label-text" }, be = { class: "input-group" }, ge = ["placeholder"], fe = { class: "text-error" }, ke = /* @__PURE__ */ q({
  __name: "Redelegate",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(f, { expose: O, emit: I }) {
    const o = f, l = (e) => L(o.locale || "en", e), _ = d(() => JSON.parse(o.params || "{}")), p = r(""), h = r([]), M = r([]), i = r(""), b = r(""), c = r(""), y = r({}), k = r(""), S = d(() => {
      const e = h.value.find(
        // @ts-ignore
        (t) => t.operator_address === _.validator_address
      );
      return e ? `${e.description.moniker} (${T(
        // @ts-ignore
        e.commission.commission_rates.rate
      )}%)` : _.value.validator_address;
    }), $ = d(() => {
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
    }), j = d(() => [...h.value, ...M.value]), g = d(() => {
      const e = new A(o.metadata), t = y.value || { amount: "0", denom: i.value };
      return {
        base: t,
        display: e.baseToUnit(t, c.value)
      };
    }), C = d(() => {
      if (!o.metadata || !o.metadata[i.value])
        return c.value = i.value, [{ denom: i.value, exponent: 0, aliases: [] }];
      const e = o.metadata[i.value].denom_units.sort(
        (t, u) => u.exponent - t.exponent
      );
      return e.length > 0 && (c.value = e[0].denom), e;
    }), E = d(() => {
      let e = !0, t = "";
      return S.value || (e = !1, t = l("validator_empty")), p.value || (e = !1, t = l("validator_empty")), Number(b.value) > 0 || (e = !1, t = l("amount_greater_than_zero")), { ok: e, error: t };
    });
    function F() {
      P(o.endpoint, _.value.validator_address, o.sender).then((e) => {
        y.value = e.delegation_response.balance;
      }).catch((e) => {
        k.value = e;
      }), Q(o.endpoint).then((e) => {
        i.value = e.params.bond_denom;
      }), W(o.endpoint).then((e) => {
        var t;
        h.value = e.validators, p.value = (t = e.validators.find(
          // @ts-ignore
          (u) => u.description.identity === "6783E9F948541962"
        )) == null ? void 0 : t.operator_address;
      });
    }
    return z(() => {
      I("loaded");
    }), O({ msgs: $, isValid: E, initial: F }), (e, t) => {
      var u, V, D, N;
      return v(), m("div", null, [
        a("div", Y, [
          a("label", Z, [
            a("span", ee, n(l("your_connected_account")), 1)
          ]),
          a("div", ae, [
            J(X, {
              size: "small",
              address: f.sender
            }, null, 8, ["address"]),
            a("span", te, n(f.sender), 1)
          ])
        ]),
        a("div", se, [
          a("label", oe, [
            a("span", ne, n(l("source_validator")), 1)
          ]),
          a("input", {
            value: S.value,
            type: "text",
            class: "input border border-gray-300 dark:border-gray-600",
            readonly: ""
          }, null, 8, le)
        ]),
        a("div", re, [
          a("label", de, [
            a("span", ie, n(l("destination_validator")), 1)
          ]),
          x(a("select", {
            "onUpdate:modelValue": t[0] || (t[0] = (s) => p.value = s),
            class: "select select-bordered"
          }, [
            a("option", ce, n(l("select_validator")), 1),
            (v(!0), m(U, null, w(j.value, (s) => (v(), m("option", {
              key: s.description.moniker,
              value: s.operator_address
            }, [
              R(n(s.description.moniker) + " (" + n(G(T)(s.commission.commission_rates.rate)) + "%) ", 1),
              s.status !== "BOND_STATUS_BONDED" ? (v(), m("span", ve, "x")) : H("", !0)
            ], 8, ue))), 128))
          ], 512), [
            [B, p.value]
          ])
        ]),
        a("div", me, [
          a("label", pe, [
            a("span", _e, n(l("amount")), 1),
            a("span", null, n((u = g.value) == null ? void 0 : u.display.amount) + n((V = g.value) == null ? void 0 : V.display.denom), 1)
          ]),
          a("label", be, [
            x(a("input", {
              "onUpdate:modelValue": t[1] || (t[1] = (s) => b.value = s),
              type: "number",
              placeholder: l("available") + `: ${(D = g.value) == null ? void 0 : D.display.amount}${(N = g.value) == null ? void 0 : N.display.denom}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, ge), [
              [K, b.value]
            ]),
            x(a("select", {
              "onUpdate:modelValue": t[2] || (t[2] = (s) => c.value = s),
              class: "select select-bordered uppercase"
            }, [
              (v(!0), m(U, null, w(C.value, (s) => (v(), m("option", {
                key: s.denom
              }, n(s.denom), 1))), 128))
            ], 512), [
              [B, c.value]
            ])
          ])
        ]),
        a("div", fe, n(k.value), 1)
      ]);
    };
  }
});
export {
  ke as default
};