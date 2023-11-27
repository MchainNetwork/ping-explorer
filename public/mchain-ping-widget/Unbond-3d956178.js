import { d as B, c, r as p, o as D, a as g, b as f, e as t, t as r, f as I, w as h, h as M, v as N, F as C, g as q, i as z, I as F } from "./main-9a9fe349.js";
import { T as x } from "./TokenUnitConverter-6e82fbeb.js";
import { I as O } from "./IdentityIcon-09901e98.js";
const j = { class: "form-control" }, E = { class: "label" }, J = { class: "label-text" }, L = { class: "flex p-2" }, $ = { class: "ml-2 text-base" }, G = { class: "form-control" }, H = { class: "label" }, K = { class: "label-text" }, P = { class: "input-group" }, Q = ["placeholder"], R = { class: "text-error" }, Z = /* @__PURE__ */ B({
  __name: "Unbond",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(v, { expose: k, emit: S }) {
    const s = v, l = (e) => z(s.locale || "en", e), _ = c(() => JSON.parse(s.params || "{}")), u = p(
      {}
    ), i = p(""), d = p(""), y = p(""), U = c(() => {
      var a;
      const e = new x(s.metadata);
      return [
        {
          typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
          value: {
            delegatorAddress: s.sender,
            validatorAddress: _.value.validator_address,
            amount: e.displayToBase((a = u.value.balance) == null ? void 0 : a.denom, {
              amount: String(i.value),
              denom: d.value
            })
          }
        }
      ];
    }), T = c(() => {
      var o;
      const e = (o = u.value.balance) == null ? void 0 : o.denom;
      if (!s.metadata || !s.metadata[e])
        return d.value = e, [{ denom: e, exponent: 0, aliases: [] }];
      const a = s.metadata[e].denom_units.sort(
        (m, n) => n.exponent - m.exponent
      );
      return a.length > 0 && (d.value = a[0].denom), a;
    }), w = c(() => {
      let e = !0, a = "";
      return s.sender || (e = !1, a = l("sender_empty")), _.value.validator_address || (e = !1, a = l("validator_empty")), Number(i.value) > 0 || (e = !1, a = l("amount_greater_than_zero")), { ok: e, error: a };
    });
    function V() {
      F(s.endpoint, _.value.validator_address, s.sender).then((e) => {
        u.value = e.delegation_response;
      }).catch((e) => {
        y.value = e;
      });
    }
    const b = c(() => {
      var o;
      const e = new x(s.metadata), a = ((o = u.value) == null ? void 0 : o.balance) || { amount: "", denom: "" };
      return {
        base: a,
        display: e.baseToUnit(a, d.value)
      };
    }), A = () => {
      var e;
      i.value = (e = b.value.display) == null ? void 0 : e.amount;
    };
    return D(() => {
      S("loaded");
    }), k({ msgs: U, isValid: w, initial: V }), (e, a) => {
      var o, m;
      return g(), f("div", null, [
        t("div", j, [
          t("label", E, [
            t("span", J, r(l("your_connected_account")), 1)
          ]),
          t("div", L, [
            I(O, {
              size: "small",
              address: v.sender
            }, null, 8, ["address"]),
            t("span", $, r(v.sender), 1)
          ])
        ]),
        t("div", G, [
          t("label", H, [
            t("span", K, r(l("amount")), 1),
            t("span", {
              class: "label-text ml-auto cursor-pointer",
              onClick: A
            }, r(l("available")) + ": " + r((o = b.value.display) == null ? void 0 : o.amount), 1)
          ]),
          t("label", P, [
            h(t("input", {
              "onUpdate:modelValue": a[0] || (a[0] = (n) => i.value = n),
              type: "number",
              placeholder: l("available") + `: ${(m = b.value.display) == null ? void 0 : m.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, Q), [
              [M, i.value]
            ]),
            h(t("select", {
              "onUpdate:modelValue": a[1] || (a[1] = (n) => d.value = n),
              class: "select select-bordered uppercase"
            }, [
              (g(!0), f(C, null, q(T.value, (n) => (g(), f("option", {
                key: n.denom
              }, r(n.denom), 1))), 128))
            ], 512), [
              [N, d.value]
            ])
          ])
        ]),
        t("div", R, r(y.value), 1)
      ]);
    };
  }
});
export {
  Z as default
};
