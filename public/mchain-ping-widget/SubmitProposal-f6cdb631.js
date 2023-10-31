import { d as B, c, r as u, j as P, A as D, o as h, a as x, b as t, t as r, e as N, w as b, g as S, v as j, F as M, f as O, h as q, i as z } from "./main-e92b1fb4.js";
import { T as U } from "./TokenUnitConverter-7d5a7b2d.js";
import { I as C } from "./IdentityIcon-7b14663f.js";
const F = { class: "form-control" }, E = { class: "label" }, J = { class: "label-text" }, L = { class: "flex pl-2" }, $ = { class: "ml-2 text-base" }, G = { class: "form-control" }, H = { class: "label" }, K = { class: "label-text" }, Q = { class: "input-group" }, R = ["placeholder"], W = { class: "form-control" }, X = { class: "label" }, Y = { class: "label-text" }, Z = ["placeholder"], ee = { class: "form-control" }, te = { class: "label" }, ae = { class: "label-text" }, oe = ["placeholder"], re = /* @__PURE__ */ B({
  __name: "SubmitProposal",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(f, { expose: T }) {
    const o = f, l = (a) => q(o.locale, a);
    c(() => JSON.parse(o.params || "{}"));
    const n = u(""), p = u(""), i = u(""), m = u(""), v = u(""), g = c(() => {
      var d;
      const a = new U(o.metadata), e = ((d = o.balances) == null ? void 0 : d.find((_) => _.denom === n.value)) || {
        amount: "0",
        denom: n.value
      };
      return {
        base: e,
        display: a.baseToUnit(e, i.value)
      };
    }), w = c(() => {
      const a = new U(o.metadata), e = P.TextProposal.fromPartial({
        title: m.value,
        description: v.value
      });
      return [
        {
          typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
          value: {
            proposer: o.sender,
            content: D.fromPartial({
              typeUrl: "/cosmos.gov.v1beta1.TextProposal",
              value: Uint8Array.from(P.TextProposal.encode(e).finish())
            }),
            initialDeposit: [
              a.displayToBase(n.value, {
                amount: String(p.value),
                denom: i.value
              })
            ]
          }
        }
      ];
    }), V = c(() => {
      if (!o.metadata || !o.metadata[n.value])
        return i.value = n.value, [{ denom: n.value, exponent: 0, aliases: [] }];
      const a = o.metadata[n.value].denom_units.sort(
        (e, d) => d.exponent - e.exponent
      );
      return a.length > 0 && (i.value = a[0].denom), a;
    }), I = c(() => {
      let a = !0, e = "";
      return Number(p.value) > 0 || (a = !1, e = l("amount_greater_than_zero")), m.value || (a = !1, e = l("title_empty")), v.value || (a = !1, e = l("description_empty")), { ok: a, error: e };
    }), y = u(null);
    function A() {
      y.value && y.value.focus(), z(o.endpoint).then((a) => {
        n.value = a.params.bond_denom;
      });
    }
    return T({ msgs: w, isValid: I, initial: A }), (a, e) => {
      var d, _, k;
      return h(), x("div", null, [
        t("div", F, [
          t("label", E, [
            t("span", J, r(l("sender")), 1)
          ]),
          t("div", L, [
            N(C, {
              size: "small",
              address: f.sender
            }, null, 8, ["address"]),
            t("span", $, r(f.sender), 1)
          ])
        ]),
        t("div", G, [
          t("label", H, [
            t("span", K, r(l("initial_deposit")), 1),
            t("span", null, r((d = g.value) == null ? void 0 : d.display.amount) + r((_ = g.value) == null ? void 0 : _.display.denom), 1)
          ]),
          t("label", Q, [
            b(t("input", {
              ref_key: "focusInput",
              ref: y,
              "onUpdate:modelValue": e[0] || (e[0] = (s) => p.value = s),
              type: "number",
              placeholder: `Available: ${(k = g.value) == null ? void 0 : k.display.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, R), [
              [S, p.value]
            ]),
            b(t("select", {
              "onUpdate:modelValue": e[1] || (e[1] = (s) => i.value = s),
              class: "select select-bordered uppercase"
            }, [
              (h(!0), x(M, null, O(V.value, (s) => (h(), x("option", {
                key: s.denom
              }, r(s.denom), 1))), 128))
            ], 512), [
              [j, i.value]
            ])
          ])
        ]),
        t("div", W, [
          t("label", X, [
            t("span", Y, r(l("title")), 1)
          ]),
          b(t("input", {
            "onUpdate:modelValue": e[2] || (e[2] = (s) => m.value = s),
            placeholder: l("enter_proposal_title"),
            class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
          }, null, 8, Z), [
            [S, m.value]
          ])
        ]),
        t("div", ee, [
          t("label", te, [
            t("span", ae, r(l("description")), 1)
          ]),
          b(t("textarea", {
            "onUpdate:modelValue": e[3] || (e[3] = (s) => v.value = s),
            placeholder: l("enter_proposal_description"),
            class: "textarea textarea-bordered border-gray-300 dark:border-gray-600 rounded-xl",
            rows: "4"
          }, null, 8, oe), [
            [S, v.value]
          ])
        ])
      ]);
    };
  }
});
export {
  re as default
};
