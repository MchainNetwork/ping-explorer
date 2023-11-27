import { d as M, c, r as u, k as P, A as N, o as j, a as h, b as x, e as t, t as r, f as A, w as b, h as k, v as O, F as q, g as z, i as C, j as F } from "./main-9a9fe349.js";
import { T as U } from "./TokenUnitConverter-6e82fbeb.js";
import { I as E } from "./IdentityIcon-09901e98.js";
const J = { class: "form-control" }, L = { class: "label" }, $ = { class: "label-text" }, G = { class: "flex p-2" }, H = { class: "ml-2 text-base" }, K = { class: "form-control" }, Q = { class: "label" }, R = { class: "label-text" }, W = { class: "input-group" }, X = ["placeholder"], Y = { class: "form-control" }, Z = { class: "label" }, ee = { class: "label-text" }, te = ["placeholder"], ae = { class: "form-control" }, oe = { class: "label" }, se = { class: "label-text" }, le = ["placeholder"], ie = /* @__PURE__ */ M({
  __name: "SubmitProposal",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(f, { expose: T, emit: w }) {
    const o = f, s = (a) => C(o.locale || "en", a);
    c(() => JSON.parse(o.params || "{}"));
    const n = u(""), p = u(""), i = u(""), m = u(""), v = u(""), y = c(() => {
      var d;
      const a = new U(o.metadata), e = ((d = o.balances) == null ? void 0 : d.find((_) => _.denom === n.value)) || {
        amount: "0",
        denom: n.value
      };
      return {
        base: e,
        display: a.baseToUnit(e, i.value)
      };
    }), V = c(() => {
      const a = new U(o.metadata), e = P.TextProposal.fromPartial({
        title: m.value,
        description: v.value
      });
      return [
        {
          typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
          value: {
            proposer: o.sender,
            content: N.fromPartial({
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
    }), I = c(() => {
      if (!o.metadata || !o.metadata[n.value])
        return i.value = n.value, [{ denom: n.value, exponent: 0, aliases: [] }];
      const a = o.metadata[n.value].denom_units.sort(
        (e, d) => d.exponent - e.exponent
      );
      return a.length > 0 && (i.value = a[0].denom), a;
    }), B = c(() => {
      let a = !0, e = "";
      return Number(p.value) > 0 || (a = !1, e = s("amount_greater_than_zero")), m.value || (a = !1, e = s("title_empty")), v.value || (a = !1, e = s("description_empty")), { ok: a, error: e };
    }), g = u(null);
    function D() {
      g.value && g.value.focus(), F(o.endpoint).then((a) => {
        n.value = a.params.bond_denom;
      });
    }
    return j(() => {
      w("loaded");
    }), T({ msgs: V, isValid: B, initial: D }), (a, e) => {
      var d, _, S;
      return h(), x("div", null, [
        t("div", J, [
          t("label", L, [
            t("span", $, r(s("your_connected_account")), 1)
          ]),
          t("div", G, [
            A(E, {
              size: "small",
              address: f.sender
            }, null, 8, ["address"]),
            t("span", H, r(f.sender), 1)
          ])
        ]),
        t("div", K, [
          t("label", Q, [
            t("span", R, r(s("initial_deposit")), 1),
            t("span", null, r((d = y.value) == null ? void 0 : d.display.amount) + r((_ = y.value) == null ? void 0 : _.display.denom), 1)
          ]),
          t("label", W, [
            b(t("input", {
              ref_key: "focusInput",
              ref: g,
              "onUpdate:modelValue": e[0] || (e[0] = (l) => p.value = l),
              type: "number",
              placeholder: s("available") + `: ${(S = y.value.display) == null ? void 0 : S.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, X), [
              [k, p.value]
            ]),
            b(t("select", {
              "onUpdate:modelValue": e[1] || (e[1] = (l) => i.value = l),
              class: "select select-bordered uppercase"
            }, [
              (h(!0), x(q, null, z(I.value, (l) => (h(), x("option", {
                key: l.denom
              }, r(l.denom), 1))), 128))
            ], 512), [
              [O, i.value]
            ])
          ])
        ]),
        t("div", Y, [
          t("label", Z, [
            t("span", ee, r(s("title")), 1)
          ]),
          b(t("input", {
            "onUpdate:modelValue": e[2] || (e[2] = (l) => m.value = l),
            placeholder: s("enter_proposal_title"),
            class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
          }, null, 8, te), [
            [k, m.value]
          ])
        ]),
        t("div", ae, [
          t("label", oe, [
            t("span", se, r(s("description")), 1)
          ]),
          b(t("textarea", {
            "onUpdate:modelValue": e[3] || (e[3] = (l) => v.value = l),
            placeholder: s("enter_proposal_description"),
            class: "textarea textarea-bordered border-gray-300 dark:border-gray-600 rounded-xl",
            rows: "4"
          }, null, 8, le), [
            [k, v.value]
          ])
        ])
      ]);
    };
  }
});
export {
  ie as default
};
