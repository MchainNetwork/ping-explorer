import { d as O, c as i, r as _, o as q, a as c, b as m, e as a, t as r, f as z, w as h, v as S, F as w, g as B, h as C, i as F, j as E } from "./main-9a9fe349.js";
import { I as J } from "./IdentityIcon-09901e98.js";
import { T as g } from "./TokenUnitConverter-6e82fbeb.js";
const L = { class: "form-control" }, P = { class: "label" }, $ = { class: "label-text" }, A = { class: "flex p-2" }, G = { class: "ml-2 text-base" }, H = { class: "form-control" }, K = { class: "label" }, Q = { class: "label-text" }, R = { value: "" }, W = ["value"], X = { class: "form-control" }, Y = { class: "label" }, Z = { class: "label-text" }, ee = { class: "join" }, te = ["placeholder"], ae = ["value"], le = /* @__PURE__ */ O({
  __name: "Burn",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(f, { expose: j, emit: T }) {
    const n = f, d = (e) => F(n.locale || "en", e), U = i(() => JSON.parse(n.params || "{}")), o = _(U.value.denom || ""), p = _(""), u = _(""), V = i(() => [
      {
        typeUrl: "/mchain.burn.v1beta1.MsgBurn",
        value: {
          coin: new g(n.metadata).displayToBase(o.value, {
            amount: String(p.value),
            denom: u.value
          }),
          sender: n.sender
        }
      }
    ]), D = i(() => {
      let e = !0, t = "";
      return n.sender || (e = !1, t = d("sender_empty")), o.value || (e = !1, t = d("denom_empty")), Number(p.value) > 0 || (e = !1, t = d("amount_greater_than_zero")), u.value || (e = !1, t = d("amount_denom_empty")), { ok: e, error: t };
    }), b = _(null);
    function I() {
      o.value == "" && E(n.endpoint).then((e) => {
        o.value = e.params.bond_denom;
      }), b.value && b.value.focus();
    }
    const y = i(() => {
      var l;
      const e = ((l = n.balances) == null ? void 0 : l.find((v) => v.denom === o.value)) || {
        amount: "0",
        denom: "-"
      }, t = new g(n.metadata);
      return {
        base: e,
        display: t.baseToUnit(e, u.value)
      };
    }), M = i(() => {
      var t;
      const e = new g(n.metadata);
      return ((t = n.balances) == null ? void 0 : t.map((l) => ({
        base: l,
        display: e.baseToDisplay(l)
      }))) || [];
    }), N = i(() => {
      if (!n.metadata || !n.metadata[o.value])
        return u.value = o.value, [{ denom: o.value, exponent: 0, aliases: [] }];
      const e = n.metadata[o.value].denom_units.sort(
        (t, l) => l.exponent - t.exponent
      );
      return e.length > 0 && (u.value = e[0].denom), e;
    });
    function x(e) {
      return String(e).substring(0, 10);
    }
    return q(() => {
      T("loaded");
    }), j({ msgs: V, isValid: D, initial: I }), (e, t) => {
      var l, v;
      return c(), m("div", null, [
        a("div", L, [
          a("label", P, [
            a("span", $, r(d("your_connected_account")), 1)
          ]),
          a("div", A, [
            z(J, {
              size: "small",
              address: f.sender
            }, null, 8, ["address"]),
            a("span", G, r(f.sender), 1)
          ])
        ]),
        a("div", H, [
          a("label", K, [
            a("span", Q, r(d("balances")), 1)
          ]),
          h(a("select", {
            "onUpdate:modelValue": t[0] || (t[0] = (s) => o.value = s),
            class: "select select-bordered rounded-full"
          }, [
            a("option", R, r(d("select_token")), 1),
            (c(!0), m(w, null, B(M.value, ({ base: s, display: k }) => (c(), m("option", {
              key: s.denom,
              value: s.denom
            }, r(k.amount) + " " + r(k.denom), 9, W))), 128))
          ], 512), [
            [S, o.value]
          ])
        ]),
        a("div", X, [
          a("label", Y, [
            a("span", Z, r(d("amount")), 1),
            a("span", null, r((l = y.value) == null ? void 0 : l.display.amount) + " " + r(x(y.value.display.denom)), 1)
          ]),
          a("label", ee, [
            h(a("input", {
              ref_key: "focusInput",
              ref: b,
              "onUpdate:modelValue": t[1] || (t[1] = (s) => p.value = s),
              type: "number",
              placeholder: d("available") + `: ${(v = y.value.display) == null ? void 0 : v.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full join-item"
            }, null, 8, te), [
              [C, p.value]
            ]),
            h(a("select", {
              "onUpdate:modelValue": t[2] || (t[2] = (s) => u.value = s),
              class: "select select-bordered join-item uppercase"
            }, [
              (c(!0), m(w, null, B(N.value, (s) => (c(), m("option", {
                key: s.denom,
                value: s.denom
              }, r(x(s.denom)), 9, ae))), 128))
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
  le as default
};
