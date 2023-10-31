import { d as z, c as u, r as m, q as N, o as v, a as _, b as a, t as c, e as T, w as b, g as h, v as D, F as M, f as q, h as A, i as I } from "./main-e92b1fb4.js";
import { I as O } from "./IdentityIcon-7b14663f.js";
import { T as y } from "./TokenUnitConverter-7d5a7b2d.js";
const Z = { class: "form-control" }, j = { class: "label" }, C = { class: "label-text" }, F = { class: "flex pl-2" }, E = { class: "ml-2 text-base" }, J = { class: "form-control" }, L = { class: "label" }, P = { class: "label-text" }, $ = ["placeholder"], G = { class: "form-control" }, H = { class: "label" }, K = { class: "label-text" }, Q = /* @__PURE__ */ a("span", null, null, -1), R = { class: "input-group" }, W = ["value"], te = /* @__PURE__ */ z({
  __name: "Bid",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(p, { expose: x }) {
    const s = p, o = (e) => A(s.locale, e), f = u(() => JSON.parse(s.params || "{}")), d = m(""), i = m(""), l = m(""), r = m("");
    function k(e) {
      return String(e).substring(0, 10);
    }
    const S = u(() => {
      const t = new y(s.metadata).displayToBase(l.value, {
        amount: String(i.value),
        denom: r.value
      });
      return [
        {
          typeUrl: "/mchain.mns.v1beta1.MsgBid",
          value: {
            creator: s.sender,
            name: d.value,
            bid: t.amount + t.denom
          }
        }
      ];
    });
    u(() => {
      var n;
      const e = ((n = s.balances) == null ? void 0 : n.find((V) => V.denom === l.value)) || {
        amount: "0",
        denom: "-"
      }, t = new y(s.metadata);
      return {
        base: e,
        display: t.baseToUnit(e, r.value)
      };
    });
    const w = u(() => {
      if (!s.metadata || !s.metadata[l.value])
        return r.value = l.value, [{ denom: l.value, exponent: 0, aliases: [] }];
      const e = s.metadata[l.value].denom_units.sort(
        (t, n) => n.exponent - t.exponent
      );
      return e.length > 0 && (r.value = e[0].denom), e;
    }), B = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, U = u(() => {
      var e, t;
      return !((e = d.value) != null && e.trim()) || !B.test(d.value) ? { ok: !1, error: o("name_invalid") } : Number(i.value) > 0 ? (t = r.value) != null && t.trim() ? { ok: !0, error: "" } : { ok: !1, error: o("denom_invalid") } : { ok: !1, error: o("price_greater_than_zero") };
    });
    function g() {
      I(s.endpoint).then((e) => {
        l.value = e.params.bond_denom;
      }), d.value = f.value.name, i.value = f.value.amount;
    }
    return N(() => {
      g();
    }), x({ msgs: S, isValid: U, initial: g }), (e, t) => (v(), _("div", null, [
      a("div", Z, [
        a("label", j, [
          a("span", C, c(o("sender")), 1)
        ]),
        a("div", F, [
          T(O, {
            size: "small",
            address: p.sender
          }, null, 8, ["address"]),
          a("span", E, c(p.sender), 1)
        ])
      ]),
      a("div", J, [
        a("label", L, [
          a("span", P, c(o("name")), 1)
        ]),
        b(a("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (n) => d.value = n),
          type: "text",
          placeholder: o("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
        }, null, 8, $), [
          [h, d.value]
        ])
      ]),
      a("div", G, [
        a("label", H, [
          a("span", K, c(o("price")), 1),
          Q
        ]),
        a("label", R, [
          b(a("input", {
            "onUpdate:modelValue": t[1] || (t[1] = (n) => i.value = n),
            type: "number",
            class: "input border border-gray-300 dark:border-gray-600 w-full rounded-full"
          }, null, 512), [
            [h, i.value]
          ]),
          b(a("select", {
            "onUpdate:modelValue": t[2] || (t[2] = (n) => r.value = n),
            class: "select select-bordered uppercase"
          }, [
            (v(!0), _(M, null, q(w.value, (n) => (v(), _("option", {
              key: n.denom,
              value: n.denom
            }, c(k(n.denom)), 9, W))), 128))
          ], 512), [
            [D, r.value]
          ])
        ])
      ])
    ]));
  }
});
export {
  te as default
};
