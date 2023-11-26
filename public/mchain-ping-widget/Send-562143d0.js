import { d as q, c, r as m, o as z, a as p, b as v, e as t, t as n, f as F, w as f, v as S, F as w, g as T, h as U, i as E, j as J } from "./main-45275fe0.js";
import { T as x } from "./TokenUnitConverter-e8fe839a.js";
import { I as L } from "./IdentityIcon-a4ae70c2.js";
const P = { class: "dark:text-gray-400" }, $ = { class: "form-control" }, G = { class: "label" }, H = { class: "label-text" }, K = { class: "flex p-2" }, Q = { class: "ml-2 text-base" }, R = { class: "form-control" }, W = { class: "label" }, X = { class: "label-text" }, Y = { value: "" }, Z = ["value"], ee = { class: "form-control" }, te = { class: "label" }, ae = { class: "label-text" }, se = { class: "form-control" }, oe = { class: "label" }, ne = { class: "label-text" }, le = { class: "input-group" }, re = ["placeholder"], de = ["value"], me = /* @__PURE__ */ q({
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
  setup(y, { expose: V, emit: B }) {
    const o = y, d = (e) => E(o.locale || "en", e), D = c(() => JSON.parse(o.params || "{}")), i = m(""), _ = m(""), l = m(D.value.denom || ""), u = m(""), I = c(() => {
      const e = new x(o.metadata);
      return [
        {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: {
            fromAddress: o.sender,
            toAddress: _.value,
            amount: [
              e.displayToBase(l.value, {
                amount: String(i.value),
                denom: u.value
              })
            ]
          }
        }
      ];
    }), g = c(() => {
      var r;
      const e = ((r = o.balances) == null ? void 0 : r.find((b) => b.denom === l.value)) || {
        amount: "0",
        denom: "-"
      }, a = new x(o.metadata);
      return {
        base: e,
        display: a.baseToUnit(e, u.value)
      };
    }), A = c(() => {
      var a;
      const e = new x(o.metadata);
      return ((a = o.balances) == null ? void 0 : a.map((r) => ({
        base: r,
        display: e.baseToDisplay(r)
      }))) || [];
    }), M = c(() => {
      if (!o.metadata || !o.metadata[l.value])
        return u.value = l.value, [{ denom: l.value, exponent: 0, aliases: [] }];
      const e = o.metadata[l.value].denom_units.sort(
        (a, r) => r.exponent - a.exponent
      );
      return e.length > 0 && (u.value = e[0].denom), e;
    }), N = c(() => {
      let e = !0, a = "";
      return _.value || (e = !1, a = d("recipient_empty")), Number(i.value) > 0 || (e = !1, a = d("amount_greater_than_zero")), { ok: e, error: a };
    }), h = m(null);
    function j() {
      l.value == "" && J(o.endpoint).then((e) => {
        l.value = e.params.bond_denom;
      }), h.value && h.value.focus();
    }
    function C(e) {
      return String(e).substring(0, 10);
    }
    const O = () => {
      var e;
      i.value = (e = g.value.display) == null ? void 0 : e.amount;
    };
    return z(() => {
      B("loaded");
    }), V({ msgs: I, isValid: N, initial: j }), (e, a) => {
      var r, b;
      return p(), v("div", P, [
        t("div", $, [
          t("label", G, [
            t("span", H, n(d("your_connected_account")), 1)
          ]),
          t("div", K, [
            F(L, {
              size: "small",
              address: y.sender
            }, null, 8, ["address"]),
            t("span", Q, n(y.sender), 1)
          ])
        ]),
        t("div", R, [
          t("label", W, [
            t("span", X, n(d("balances")), 1)
          ]),
          f(t("select", {
            "onUpdate:modelValue": a[0] || (a[0] = (s) => l.value = s),
            class: "select select-bordered rounded-full"
          }, [
            t("option", Y, n(d("select_token")), 1),
            (p(!0), v(w, null, T(A.value, ({ base: s, display: k }) => (p(), v("option", {
              key: s.denom,
              value: s.denom
            }, n(k.amount) + " " + n(k.denom), 9, Z))), 128))
          ], 512), [
            [S, l.value]
          ])
        ]),
        t("div", ee, [
          t("label", te, [
            t("span", ae, n(d("recipient")), 1)
          ]),
          f(t("input", {
            "onUpdate:modelValue": a[1] || (a[1] = (s) => _.value = s),
            type: "text",
            class: "input border border-gray-300 dark:border-gray-600 rounded-full"
          }, null, 512), [
            [U, _.value]
          ])
        ]),
        t("div", se, [
          t("label", oe, [
            t("span", ne, n(d("amount")), 1),
            t("span", {
              class: "label-text ml-auto cursor-pointer",
              onClick: O
            }, n(d("available")) + ": " + n((r = g.value.display) == null ? void 0 : r.amount), 1)
          ]),
          t("label", le, [
            f(t("input", {
              "onUpdate:modelValue": a[2] || (a[2] = (s) => i.value = s),
              type: "number",
              ref_key: "focusInput",
              ref: h,
              placeholder: d("available") + `: ${(b = g.value.display) == null ? void 0 : b.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, re), [
              [U, i.value]
            ]),
            f(t("select", {
              "onUpdate:modelValue": a[3] || (a[3] = (s) => u.value = s),
              class: "select select-bordered uppercase"
            }, [
              (p(!0), v(w, null, T(M.value, (s) => (p(), v("option", {
                key: s.denom,
                value: s.denom
              }, n(C(s.denom)), 9, de))), 128))
            ], 512), [
              [S, u.value]
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  me as default
};
