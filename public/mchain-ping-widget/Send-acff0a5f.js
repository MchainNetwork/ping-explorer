import { d as O, c, r as i, o as q, a as m, b as p, e as t, t as o, f as z, w as b, v as S, F as w, g as U, h as V, i as C, j as F } from "./main-b124380c.js";
import { T as h } from "./TokenUnitConverter-f6a69529.js";
import { I as E } from "./IdentityIcon-ed813c43.js";
const J = { class: "dark:text-gray-400" }, L = { class: "form-control" }, P = { class: "label" }, $ = { class: "label-text" }, G = { class: "flex p-2" }, H = { class: "ml-2 text-base" }, K = { class: "form-control" }, Q = { class: "label" }, R = { class: "label-text" }, W = { value: "" }, X = ["value"], Y = { class: "form-control" }, Z = { class: "label" }, ee = { class: "label-text" }, te = { class: "form-control" }, ae = { class: "label" }, se = { class: "label-text" }, ne = { class: "input-group" }, oe = ["placeholder"], le = ["value"], ce = /* @__PURE__ */ O({
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
  setup(f, { expose: T, emit: B }) {
    const n = f, d = (e) => C(n.locale || "en", e), D = c(() => JSON.parse(n.params || "{}")), v = i(""), _ = i(""), l = i(D.value.denom || ""), u = i(""), I = c(() => {
      const e = new h(n.metadata);
      return [
        {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: {
            fromAddress: n.sender,
            toAddress: _.value,
            amount: [
              e.displayToBase(l.value, {
                amount: String(v.value),
                denom: u.value
              })
            ]
          }
        }
      ];
    }), y = c(() => {
      var r;
      const e = ((r = n.balances) == null ? void 0 : r.find((s) => s.denom === l.value)) || {
        amount: "0",
        denom: "-"
      }, a = new h(n.metadata);
      return {
        base: e,
        display: a.baseToUnit(e, u.value)
      };
    }), M = c(() => {
      var a;
      const e = new h(n.metadata);
      return ((a = n.balances) == null ? void 0 : a.map((r) => ({
        base: r,
        display: e.baseToDisplay(r)
      }))) || [];
    }), N = c(() => {
      if (!n.metadata || !n.metadata[l.value])
        return u.value = l.value, [{ denom: l.value, exponent: 0, aliases: [] }];
      const e = n.metadata[l.value].denom_units.sort(
        (a, r) => r.exponent - a.exponent
      );
      return e.length > 0 && (u.value = e[0].denom), e;
    }), j = c(() => {
      let e = !0, a = "";
      return _.value || (e = !1, a = d("recipient_empty")), Number(v.value) > 0 || (e = !1, a = d("amount_greater_than_zero")), { ok: e, error: a };
    }), g = i(null);
    function A() {
      l.value == "" && F(n.endpoint).then((e) => {
        l.value = e.params.bond_denom;
      }), g.value && g.value.focus();
    }
    function x(e) {
      return String(e).substring(0, 10);
    }
    return q(() => {
      B("loaded");
    }), T({ msgs: I, isValid: j, initial: A }), (e, a) => {
      var r;
      return m(), p("div", J, [
        t("div", L, [
          t("label", P, [
            t("span", $, o(d("your_connected_account")), 1)
          ]),
          t("div", G, [
            z(E, {
              size: "small",
              address: f.sender
            }, null, 8, ["address"]),
            t("span", H, o(f.sender), 1)
          ])
        ]),
        t("div", K, [
          t("label", Q, [
            t("span", R, o(d("balances")), 1)
          ]),
          b(t("select", {
            "onUpdate:modelValue": a[0] || (a[0] = (s) => l.value = s),
            class: "select select-bordered rounded-full"
          }, [
            t("option", W, o(d("select_token")), 1),
            (m(!0), p(w, null, U(M.value, ({ base: s, display: k }) => (m(), p("option", {
              key: s.denom,
              value: s.denom
            }, o(k.amount) + " " + o(k.denom), 9, X))), 128))
          ], 512), [
            [S, l.value]
          ])
        ]),
        t("div", Y, [
          t("label", Z, [
            t("span", ee, o(d("recipient")), 1)
          ]),
          b(t("input", {
            "onUpdate:modelValue": a[1] || (a[1] = (s) => _.value = s),
            type: "text",
            class: "input border border-gray-300 dark:border-gray-600 rounded-full"
          }, null, 512), [
            [V, _.value]
          ])
        ]),
        t("div", te, [
          t("label", ae, [
            t("span", se, o(d("amount")), 1),
            t("span", null, o(y.value.display.amount) + " " + o(x(y.value.display.denom)), 1)
          ]),
          t("label", ne, [
            b(t("input", {
              "onUpdate:modelValue": a[2] || (a[2] = (s) => v.value = s),
              type: "number",
              ref_key: "focusInput",
              ref: g,
              placeholder: `Available: ${(r = y.value) == null ? void 0 : r.display.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, oe), [
              [V, v.value]
            ]),
            b(t("select", {
              "onUpdate:modelValue": a[3] || (a[3] = (s) => u.value = s),
              class: "select select-bordered uppercase"
            }, [
              (m(!0), p(w, null, U(N.value, (s) => (m(), p("option", {
                key: s.denom,
                value: s.denom
              }, o(x(s.denom)), 9, le))), 128))
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
  ce as default
};
