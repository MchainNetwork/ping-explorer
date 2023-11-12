import { d as B, c as d, r as m, o as D, a as _, b, e as t, t as i, f as M, w as f, h as N, v as I, F as q, g as z, i as A, G as C } from "./main-014f4388.js";
import { T as h } from "./TokenUnitConverter-18dd53d5.js";
import { I as F } from "./IdentityIcon-99cb3664.js";
const O = { class: "form-control" }, j = { class: "label" }, E = { class: "label-text" }, G = { class: "flex p-2" }, J = { class: "ml-2 text-base" }, L = { class: "form-control" }, $ = { class: "label" }, H = { class: "label-text" }, K = { class: "input-group" }, P = ["placeholder"], Q = { class: "text-error" }, Y = /* @__PURE__ */ B({
  __name: "Unbond",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(p, { expose: y, emit: x }) {
    const s = p, l = (e) => A(s.locale, e), v = d(() => JSON.parse(s.params || "{}")), c = m(
      {}
    ), u = m(""), r = m(""), g = m(""), S = d(() => {
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
    }), k = d(() => {
      var o;
      const e = (o = c.value.balance) == null ? void 0 : o.denom;
      if (!s.metadata || !s.metadata[e])
        return r.value = e, [{ denom: e, exponent: 0, aliases: [] }];
      const a = s.metadata[e].denom_units.sort(
        (n, V) => V.exponent - n.exponent
      );
      return a.length > 0 && (r.value = a[0].denom), a;
    }), U = d(() => {
      let e = !0, a = "";
      return s.sender || (e = !1, a = l("sender_empty")), v.value.validator_address || (e = !1, a = l("validator_empty")), Number(u.value) > 0 || (e = !1, a = l("amount_greater_than_zero")), { ok: e, error: a };
    });
    function w() {
      C(s.endpoint, v.value.validator_address, s.sender).then((e) => {
        c.value = e.delegation_response;
      }).catch((e) => {
        g.value = e;
      });
    }
    const T = d(() => {
      var o;
      const e = new h(s.metadata), a = ((o = c.value) == null ? void 0 : o.balance) || { amount: "", denom: "" };
      return {
        base: a,
        display: e.baseToUnit(a, r.value)
      };
    });
    return D(() => {
      x("loaded");
    }), y({ msgs: S, isValid: U, initial: w }), (e, a) => {
      var o;
      return _(), b("div", null, [
        t("div", O, [
          t("label", j, [
            t("span", E, i(l("your_connected_account")), 1)
          ]),
          t("div", G, [
            M(F, {
              size: "small",
              address: p.sender
            }, null, 8, ["address"]),
            t("span", J, i(p.sender), 1)
          ])
        ]),
        t("div", L, [
          t("label", $, [
            t("span", H, i(l("amount")), 1)
          ]),
          t("label", K, [
            f(t("input", {
              "onUpdate:modelValue": a[0] || (a[0] = (n) => u.value = n),
              type: "number",
              placeholder: l("available") + `: ${(o = T.value.display) == null ? void 0 : o.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, P), [
              [N, u.value]
            ]),
            f(t("select", {
              "onUpdate:modelValue": a[1] || (a[1] = (n) => r.value = n),
              class: "select select-bordered uppercase"
            }, [
              (_(!0), b(q, null, z(k.value, (n) => (_(), b("option", {
                key: n.denom
              }, i(n.denom), 1))), 128))
            ], 512), [
              [I, r.value]
            ])
          ])
        ]),
        t("div", Q, i(g.value), 1)
      ]);
    };
  }
});
export {
  Y as default
};
