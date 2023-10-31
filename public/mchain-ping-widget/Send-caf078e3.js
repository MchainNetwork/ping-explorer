import { d as M, r as _, c as u, o as c, a as m, b as t, t as o, e as N, w as b, v as k, F as S, f as w, g as U, h as j, i as q } from "./main-e92b1fb4.js";
import { T as h } from "./TokenUnitConverter-7d5a7b2d.js";
import { I as z } from "./IdentityIcon-7b14663f.js";
const C = { class: "dark:text-gray-400" }, F = { class: "form-control" }, O = { class: "label" }, E = { class: "label-text" }, L = { class: "flex pl-2" }, P = { class: "ml-2 text-base" }, $ = { class: "form-control" }, G = { class: "label" }, H = { class: "label-text" }, J = { value: "" }, K = ["value"], Q = { class: "form-control" }, R = { class: "label" }, W = { class: "label-text" }, X = { class: "form-control" }, Y = { class: "label" }, Z = { class: "label-text" }, ee = { class: "input-group" }, te = ["placeholder"], ae = ["value"], le = /* @__PURE__ */ M({
  __name: "Send",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(f, { expose: V }) {
    const n = f, d = (e) => j(n.locale, e), p = _(""), v = _(""), r = _(""), i = _(""), T = u(() => {
      const e = new h(n.metadata);
      return [
        {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: {
            fromAddress: n.sender,
            toAddress: v.value,
            amount: [
              e.displayToBase(r.value, {
                amount: String(p.value),
                denom: i.value
              })
            ]
          }
        }
      ];
    }), g = u(() => {
      var l;
      const e = ((l = n.balances) == null ? void 0 : l.find((s) => s.denom === r.value)) || {
        amount: "0",
        denom: "-"
      }, a = new h(n.metadata);
      return {
        base: e,
        display: a.baseToUnit(e, i.value)
      };
    }), B = u(() => {
      var a;
      const e = new h(n.metadata);
      return ((a = n.balances) == null ? void 0 : a.map((l) => ({
        base: l,
        display: e.baseToDisplay(l)
      }))) || [];
    }), D = u(() => {
      if (!n.metadata || !n.metadata[r.value])
        return i.value = r.value, [{ denom: r.value, exponent: 0, aliases: [] }];
      const e = n.metadata[r.value].denom_units.sort(
        (a, l) => l.exponent - a.exponent
      );
      return e.length > 0 && (i.value = e[0].denom), e;
    }), A = u(() => {
      let e = !0, a = "";
      return v.value || (e = !1, a = d("recipient_empty")), Number(p.value) > 0 || (e = !1, a = d("amount_greater_than_zero")), { ok: e, error: a };
    });
    function I() {
      q(n.endpoint).then((e) => {
        r.value = e.params.bond_denom;
      });
    }
    function y(e) {
      return String(e).substring(0, 10);
    }
    return V({ msgs: T, isValid: A, initial: I }), (e, a) => {
      var l;
      return c(), m("div", C, [
        t("div", F, [
          t("label", O, [
            t("span", E, o(d("sender")), 1)
          ]),
          t("div", L, [
            N(z, {
              size: "small",
              address: f.sender
            }, null, 8, ["address"]),
            t("span", P, o(f.sender), 1)
          ])
        ]),
        t("div", $, [
          t("label", G, [
            t("span", H, o(d("balances")), 1)
          ]),
          b(t("select", {
            "onUpdate:modelValue": a[0] || (a[0] = (s) => r.value = s),
            class: "select select-bordered rounded-full"
          }, [
            t("option", J, o(d("select_token")), 1),
            (c(!0), m(S, null, w(B.value, ({ base: s, display: x }) => (c(), m("option", {
              key: s,
              value: s.denom
            }, o(x.amount) + " " + o(x.denom), 9, K))), 128))
          ], 512), [
            [k, r.value]
          ])
        ]),
        t("div", Q, [
          t("label", R, [
            t("span", W, o(d("recipient")), 1)
          ]),
          b(t("input", {
            "onUpdate:modelValue": a[1] || (a[1] = (s) => v.value = s),
            type: "text",
            class: "input border border-gray-300 dark:border-gray-600 rounded-full"
          }, null, 512), [
            [U, v.value]
          ])
        ]),
        t("div", X, [
          t("label", Y, [
            t("span", Z, o(d("amount")), 1),
            t("span", null, o(g.value.display.amount) + " " + o(y(g.value.display.denom)), 1)
          ]),
          t("label", ee, [
            b(t("input", {
              "onUpdate:modelValue": a[2] || (a[2] = (s) => p.value = s),
              type: "number",
              placeholder: `Available: ${(l = g.value) == null ? void 0 : l.display.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, te), [
              [U, p.value]
            ]),
            b(t("select", {
              "onUpdate:modelValue": a[3] || (a[3] = (s) => i.value = s),
              class: "select select-bordered uppercase"
            }, [
              (c(!0), m(S, null, w(D.value, (s) => (c(), m("option", {
                key: s.denom,
                value: s.denom
              }, o(y(s.denom)), 9, ae))), 128))
            ], 512), [
              [k, i.value]
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  le as default
};
