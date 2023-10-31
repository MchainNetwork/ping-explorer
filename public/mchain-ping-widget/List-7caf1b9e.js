import { d as N, c as u, r as m, q as T, o as v, a as _, b as a, t as c, e as B, w as b, g as h, v as D, F as M, f as q, h as A, i as I } from "./main-e92b1fb4.js";
import { I as L } from "./IdentityIcon-7b14663f.js";
import { T as y } from "./TokenUnitConverter-7d5a7b2d.js";
const O = { class: "form-control" }, Z = { class: "label" }, j = { class: "label-text" }, C = { class: "flex pl-2" }, F = { class: "ml-2 text-base" }, E = { class: "form-control" }, J = { class: "label" }, P = { class: "label-text" }, $ = ["placeholder"], G = { class: "form-control" }, H = { class: "label" }, K = { class: "label-text" }, Q = /* @__PURE__ */ a("span", null, null, -1), R = { class: "input-group" }, W = ["value"], te = /* @__PURE__ */ N({
  __name: "List",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(p, { expose: x }) {
    const s = p, o = (e) => A(s.locale, e), f = u(() => JSON.parse(s.params || "{}")), d = m(""), i = m(""), r = m(""), l = m("");
    function k(e) {
      return String(e).substring(0, 10);
    }
    const S = u(() => {
      const t = new y(s.metadata).displayToBase(r.value, {
        amount: String(i.value),
        denom: l.value
      });
      return [
        {
          typeUrl: "/mchain.mns.v1beta1.MsgList",
          value: {
            creator: s.sender,
            name: d.value,
            price: t.amount + t.denom
          }
        }
      ];
    });
    u(() => {
      var n;
      const e = ((n = s.balances) == null ? void 0 : n.find((z) => z.denom === r.value)) || {
        amount: "0",
        denom: "-"
      }, t = new y(s.metadata);
      return {
        base: e,
        display: t.baseToUnit(e, l.value)
      };
    });
    const U = u(() => {
      if (!s.metadata || !s.metadata[r.value])
        return l.value = r.value, [{ denom: r.value, exponent: 0, aliases: [] }];
      const e = s.metadata[r.value].denom_units.sort(
        (t, n) => n.exponent - t.exponent
      );
      return e.length > 0 && (l.value = e[0].denom), e;
    }), V = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.(mark|ibc)$/, w = u(() => {
      var e, t;
      return !((e = d.value) != null && e.trim()) || !V.test(d.value) ? { ok: !1, error: o("name_invalid") } : Number(i.value) > 0 ? (t = l.value) != null && t.trim() ? { ok: !0, error: "" } : { ok: !1, error: o("denom_invalid") } : { ok: !1, error: o("price_greater_than_zero") };
    });
    function g() {
      I(s.endpoint).then((e) => {
        r.value = e.params.bond_denom;
      }), d.value = f.value.name, i.value = f.value.amount;
    }
    return T(() => {
      g();
    }), x({ msgs: S, isValid: w, initial: g }), (e, t) => (v(), _("div", null, [
      a("div", O, [
        a("label", Z, [
          a("span", j, c(o("sender")), 1)
        ]),
        a("div", C, [
          B(L, {
            size: "small",
            address: p.sender
          }, null, 8, ["address"]),
          a("span", F, c(p.sender), 1)
        ])
      ]),
      a("div", E, [
        a("label", J, [
          a("span", P, c(o("name")), 1)
        ]),
        b(a("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (n) => d.value = n),
          type: "text",
          placeholder: o("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
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
            class: "input border border-gray-300 dark:border-gray-600 w-full"
          }, null, 512), [
            [h, i.value]
          ]),
          b(a("select", {
            "onUpdate:modelValue": t[2] || (t[2] = (n) => l.value = n),
            class: "select select-bordered uppercase"
          }, [
            (v(!0), _(M, null, q(U.value, (n) => (v(), _("option", {
              key: n.denom,
              value: n.denom
            }, c(k(n.denom)), 9, W))), 128))
          ], 512), [
            [D, l.value]
          ])
        ])
      ])
    ]));
  }
});
export {
  te as default
};
