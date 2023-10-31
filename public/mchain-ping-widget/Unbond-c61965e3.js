import { d as T, c as d, r as m, o as _, a as b, b as t, t as i, e as V, w as f, g as B, v as N, F as I, f as M, h as q, D as z } from "./main-e92b1fb4.js";
import { T as h } from "./TokenUnitConverter-7d5a7b2d.js";
import { I as A } from "./IdentityIcon-7b14663f.js";
const C = { class: "form-control" }, F = { class: "label" }, O = { class: "label-text" }, j = { class: "flex pl-2" }, E = { class: "ml-2 text-base" }, J = { class: "form-control" }, L = { class: "label" }, $ = { class: "label-text" }, G = { class: "input-group" }, H = ["placeholder"], K = { class: "text-error" }, W = /* @__PURE__ */ T({
  __name: "Unbond",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    metadata: Object,
    params: String,
    locale: String
  },
  setup(p, { expose: y }) {
    const s = p, l = (e) => q(s.locale, e), v = d(() => JSON.parse(s.params || "{}")), c = m(
      {}
    ), u = m(""), r = m(""), g = m(""), x = d(() => {
      var a;
      const e = new h(s.metadata);
      return [
        {
          typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
          value: {
            delegatorAddress: s.sender,
            validatorAddress: v.value.validator_address,
            amount: e.displayToBase((a = c.value.balance) == null ? void 0 : a.denom, {
              amount: String(u.value),
              denom: r.value
            })
          }
        }
      ];
    }), S = d(() => {
      var n;
      const e = (n = c.value.balance) == null ? void 0 : n.denom;
      if (!s.metadata || !s.metadata[e])
        return r.value = e, [{ denom: e, exponent: 0, aliases: [] }];
      const a = s.metadata[e].denom_units.sort(
        (o, D) => D.exponent - o.exponent
      );
      return a.length > 0 && (r.value = a[0].denom), a;
    }), k = d(() => {
      let e = !0, a = "";
      return s.sender || (e = !1, a = l("sender_empty")), v.value.validator_address || (e = !1, a = l("validator_empty")), Number(u.value) > 0 || (e = !1, a = l("amount_greater_than_zero")), { ok: e, error: a };
    });
    function U() {
      z(s.endpoint, v.value.validator_address, s.sender).then((e) => {
        c.value = e.delegation_response;
      }).catch((e) => {
        g.value = e;
      });
    }
    const w = d(() => {
      var n;
      const e = new h(s.metadata), a = ((n = c.value) == null ? void 0 : n.balance) || { amount: "", denom: "" };
      return {
        base: a,
        display: e.baseToUnit(a, r.value)
      };
    });
    return y({ msgs: x, isValid: k, initial: U }), (e, a) => {
      var n;
      return _(), b("div", null, [
        t("div", C, [
          t("label", F, [
            t("span", O, i(l("sender")), 1)
          ]),
          t("div", j, [
            V(A, {
              size: "small",
              address: p.sender
            }, null, 8, ["address"]),
            t("span", E, i(p.sender), 1)
          ])
        ]),
        t("div", J, [
          t("label", L, [
            t("span", $, i(l("amount")), 1)
          ]),
          t("label", G, [
            f(t("input", {
              "onUpdate:modelValue": a[0] || (a[0] = (o) => u.value = o),
              type: "number",
              placeholder: l("available") + `: ${(n = w.value.display) == null ? void 0 : n.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, H), [
              [B, u.value]
            ]),
            f(t("select", {
              "onUpdate:modelValue": a[1] || (a[1] = (o) => r.value = o),
              class: "select select-bordered uppercase"
            }, [
              (_(!0), b(I, null, M(S.value, (o) => (_(), b("option", {
                key: o.denom
              }, i(o.denom), 1))), 128))
            ], 512), [
              [N, r.value]
            ])
          ])
        ]),
        t("div", K, i(g.value), 1)
      ]);
    };
  }
});
export {
  W as default
};
