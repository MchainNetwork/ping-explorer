import { d as T, c as i, r as p, o as M, a as b, b as y, e as a, t as u, f as N, w as g, h as x, v as D, F as O, g as q, i as z } from "./main-32246275.js";
import { I as C } from "./IdentityIcon-62591963.js";
import { T as k } from "./TokenUnitConverter-12784101.js";
const F = { class: "form-control" }, A = { class: "label" }, E = { class: "label-text" }, J = { class: "flex p-2" }, L = { class: "ml-2 text-base" }, $ = { class: "form-control" }, G = { class: "label" }, H = { class: "label-text" }, K = { class: "form-control" }, P = { class: "label" }, Q = { class: "label-text" }, R = { class: "join" }, W = ["placeholder"], ee = /* @__PURE__ */ T({
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
  setup(v, { expose: S, emit: w }) {
    const n = v, l = (t) => z(n.locale || "en", t), B = i(() => JSON.parse(n.params || "{}")), s = p(B.value.denom || ""), c = p(""), r = p(""), U = i(() => [
      {
        typeUrl: "/mchain.burn.v1beta1.MsgBurn",
        value: {
          coin: new k(n.metadata).displayToBase(s.value, {
            amount: String(c.value),
            denom: r.value
          }),
          sender: n.sender
        }
      }
    ]), V = i(() => {
      let t = !0, e = "";
      return n.sender || (t = !1, e = l("sender_empty")), s.value || (t = !1, e = l("denom_empty")), Number(c.value) > 0 || (t = !1, e = l("amount_greater_than_zero")), r.value || (t = !1, e = l("amount_denom_empty")), { ok: t, error: e };
    }), f = p(null);
    function j() {
      f.value && f.value.focus();
    }
    const _ = i(() => {
      var d;
      const t = new k(n.metadata), e = ((d = n.balances) == null ? void 0 : d.find((m) => m.denom === s.value)) || {
        amount: "0",
        denom: s.value
      };
      return {
        base: e,
        display: t.baseToUnit(e, r.value)
      };
    }), I = i(() => {
      if (!n.metadata || !n.metadata[s.value])
        return r.value = s.value, [{ denom: s.value, exponent: 0, aliases: [] }];
      const t = n.metadata[s.value].denom_units.sort(
        (e, d) => d.exponent - e.exponent
      );
      return t.length > 0 && (r.value = t[0].denom), t;
    });
    return M(() => {
      w("loaded");
    }), S({ msgs: U, isValid: V, initial: j }), (t, e) => {
      var d, m, h;
      return b(), y("div", null, [
        a("div", F, [
          a("label", A, [
            a("span", E, u(l("your_connected_account")), 1)
          ]),
          a("div", J, [
            N(C, {
              size: "small",
              address: v.sender
            }, null, 8, ["address"]),
            a("span", L, u(v.sender), 1)
          ])
        ]),
        a("div", $, [
          a("label", G, [
            a("span", H, u(l("denom")), 1)
          ]),
          g(a("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (o) => s.value = o),
            class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
          }, null, 512), [
            [x, s.value]
          ])
        ]),
        a("div", K, [
          a("label", P, [
            a("span", Q, u(l("amount")), 1),
            a("span", null, u((d = _.value) == null ? void 0 : d.display.amount) + " " + u((m = _.value) == null ? void 0 : m.display.denom), 1)
          ]),
          a("label", R, [
            g(a("input", {
              ref_key: "focusInput",
              ref: f,
              "onUpdate:modelValue": e[1] || (e[1] = (o) => c.value = o),
              type: "number",
              placeholder: `Available: ${(h = _.value) == null ? void 0 : h.display.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full join-item"
            }, null, 8, W), [
              [x, c.value]
            ]),
            g(a("select", {
              "onUpdate:modelValue": e[2] || (e[2] = (o) => r.value = o),
              class: "select select-bordered join-item uppercase"
            }, [
              (b(!0), y(O, null, q(I.value, (o) => (b(), y("option", {
                key: o.denom
              }, u(o.denom), 1))), 128))
            ], 512), [
              [D, r.value]
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  ee as default
};
