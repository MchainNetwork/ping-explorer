import { d as T, c as u, r as m, o as B, a as v, b as _, e as a, t as c, f as D, w as b, h as g, v as M, F as j, g as A, i as I, j as L } from "./main-8f814044.js";
import { I as O } from "./IdentityIcon-3e05cedf.js";
import { T as h } from "./TokenUnitConverter-e45eb58d.js";
const Z = { class: "form-control" }, q = { class: "label" }, C = { class: "label-text" }, F = { class: "flex p-2" }, E = { class: "ml-2 text-base" }, J = { class: "form-control" }, P = { class: "label" }, $ = { class: "label-text" }, G = ["placeholder"], H = { class: "form-control" }, K = { class: "label" }, Q = { class: "label-text" }, R = /* @__PURE__ */ a("span", null, null, -1), W = { class: "input-group" }, X = ["value"], ae = /* @__PURE__ */ T({
  __name: "List",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(p, { expose: y, emit: x }) {
    const s = p, o = (e) => I(s.locale, e), f = u(() => JSON.parse(s.params || "{}")), d = m(""), i = m(""), r = m(""), l = m("");
    function k(e) {
      return String(e).substring(0, 10);
    }
    const S = u(() => {
      const t = new h(s.metadata).displayToBase(r.value, {
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
      const e = ((n = s.balances) == null ? void 0 : n.find((N) => N.denom === r.value)) || {
        amount: "0",
        denom: "-"
      }, t = new h(s.metadata);
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
    function z() {
      L(s.endpoint).then((e) => {
        r.value = e.params.bond_denom;
      }), d.value = f.value.name, i.value = f.value.amount;
    }
    return B(() => {
      x("loaded");
    }), y({ msgs: S, isValid: w, initial: z }), (e, t) => (v(), _("div", null, [
      a("div", Z, [
        a("label", q, [
          a("span", C, c(o("your_connected_account")), 1)
        ]),
        a("div", F, [
          D(O, {
            size: "small",
            address: p.sender
          }, null, 8, ["address"]),
          a("span", E, c(p.sender), 1)
        ])
      ]),
      a("div", J, [
        a("label", P, [
          a("span", $, c(o("name")), 1)
        ]),
        b(a("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (n) => d.value = n),
          type: "text",
          placeholder: o("enter_name"),
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 8, G), [
          [g, d.value]
        ])
      ]),
      a("div", H, [
        a("label", K, [
          a("span", Q, c(o("price")), 1),
          R
        ]),
        a("label", W, [
          b(a("input", {
            "onUpdate:modelValue": t[1] || (t[1] = (n) => i.value = n),
            type: "number",
            class: "input border border-gray-300 dark:border-gray-600 w-full"
          }, null, 512), [
            [g, i.value]
          ]),
          b(a("select", {
            "onUpdate:modelValue": t[2] || (t[2] = (n) => l.value = n),
            class: "select select-bordered uppercase"
          }, [
            (v(!0), _(j, null, A(U.value, (n) => (v(), _("option", {
              key: n.denom,
              value: n.denom
            }, c(k(n.denom)), 9, X))), 128))
          ], 512), [
            [M, l.value]
          ])
        ])
      ])
    ]));
  }
});
export {
  ae as default
};
