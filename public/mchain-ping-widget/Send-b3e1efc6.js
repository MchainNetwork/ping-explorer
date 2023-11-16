import { d as I, r as _, c as i, o as N, a as c, b as m, e as t, t as o, f as q, w as b, v as k, F as S, g as w, h as U, i as z, j as C } from "./main-d106edc3.js";
import { T as y } from "./TokenUnitConverter-79dc8268.js";
import { I as F } from "./IdentityIcon-ddb9ea91.js";
const O = { class: "dark:text-gray-400" }, E = { class: "form-control" }, L = { class: "label" }, P = { class: "label-text" }, $ = { class: "flex p-2" }, G = { class: "ml-2 text-base" }, H = { class: "form-control" }, J = { class: "label" }, K = { class: "label-text" }, Q = { value: "" }, R = ["value"], W = { class: "form-control" }, X = { class: "label" }, Y = { class: "label-text" }, Z = { class: "form-control" }, ee = { class: "label" }, te = { class: "label-text" }, ae = { class: "input-group" }, se = ["placeholder"], ne = ["value"], de = /* @__PURE__ */ I({
  __name: "Send",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(f, { expose: V, emit: T }) {
    const n = f, d = (e) => z(n.locale || "en", e), p = _(""), v = _(""), r = _(""), u = _(""), B = i(() => {
      const e = new y(n.metadata);
      return [
        {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: {
            fromAddress: n.sender,
            toAddress: v.value,
            amount: [
              e.displayToBase(r.value, {
                amount: String(p.value),
                denom: u.value
              })
            ]
          }
        }
      ];
    }), g = i(() => {
      var l;
      const e = ((l = n.balances) == null ? void 0 : l.find((s) => s.denom === r.value)) || {
        amount: "0",
        denom: "-"
      }, a = new y(n.metadata);
      return {
        base: e,
        display: a.baseToUnit(e, u.value)
      };
    }), D = i(() => {
      var a;
      const e = new y(n.metadata);
      return ((a = n.balances) == null ? void 0 : a.map((l) => ({
        base: l,
        display: e.baseToDisplay(l)
      }))) || [];
    }), M = i(() => {
      if (!n.metadata || !n.metadata[r.value])
        return u.value = r.value, [{ denom: r.value, exponent: 0, aliases: [] }];
      const e = n.metadata[r.value].denom_units.sort(
        (a, l) => l.exponent - a.exponent
      );
      return e.length > 0 && (u.value = e[0].denom), e;
    }), j = i(() => {
      let e = !0, a = "";
      return v.value || (e = !1, a = d("recipient_empty")), Number(p.value) > 0 || (e = !1, a = d("amount_greater_than_zero")), { ok: e, error: a };
    });
    function A() {
      C(n.endpoint).then((e) => {
        r.value = e.params.bond_denom;
      });
    }
    function h(e) {
      return String(e).substring(0, 10);
    }
    return N(() => {
      T("loaded");
    }), V({ msgs: B, isValid: j, initial: A }), (e, a) => {
      var l;
      return c(), m("div", O, [
        t("div", E, [
          t("label", L, [
            t("span", P, o(d("your_connected_account")), 1)
          ]),
          t("div", $, [
            q(F, {
              size: "small",
              address: f.sender
            }, null, 8, ["address"]),
            t("span", G, o(f.sender), 1)
          ])
        ]),
        t("div", H, [
          t("label", J, [
            t("span", K, o(d("balances")), 1)
          ]),
          b(t("select", {
            "onUpdate:modelValue": a[0] || (a[0] = (s) => r.value = s),
            class: "select select-bordered rounded-full"
          }, [
            t("option", Q, o(d("select_token")), 1),
            (c(!0), m(S, null, w(D.value, ({ base: s, display: x }) => (c(), m("option", {
              key: s.denom,
              value: s.denom
            }, o(x.amount) + " " + o(x.denom), 9, R))), 128))
          ], 512), [
            [k, r.value]
          ])
        ]),
        t("div", W, [
          t("label", X, [
            t("span", Y, o(d("recipient")), 1)
          ]),
          b(t("input", {
            "onUpdate:modelValue": a[1] || (a[1] = (s) => v.value = s),
            type: "text",
            class: "input border border-gray-300 dark:border-gray-600 rounded-full"
          }, null, 512), [
            [U, v.value]
          ])
        ]),
        t("div", Z, [
          t("label", ee, [
            t("span", te, o(d("amount")), 1),
            t("span", null, o(g.value.display.amount) + " " + o(h(g.value.display.denom)), 1)
          ]),
          t("label", ae, [
            b(t("input", {
              "onUpdate:modelValue": a[2] || (a[2] = (s) => p.value = s),
              type: "number",
              placeholder: `Available: ${(l = g.value) == null ? void 0 : l.display.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, se), [
              [U, p.value]
            ]),
            b(t("select", {
              "onUpdate:modelValue": a[3] || (a[3] = (s) => u.value = s),
              class: "select select-bordered uppercase"
            }, [
              (c(!0), m(S, null, w(M.value, (s) => (c(), m("option", {
                key: s.denom,
                value: s.denom
              }, o(h(s.denom)), 9, ne))), 128))
            ], 512), [
              [k, u.value]
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  de as default
};
