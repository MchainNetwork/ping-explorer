import { d as I, c as g, r as u, I as C, o as r, a as n, b as e, w as d, g as c, F as y, f, v as F, t as N } from "./main-e92b1fb4.js";
const O = { class: "form-control" }, B = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Sender")
], -1), M = ["value"], J = { class: "form-control" }, j = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Admin")
], -1), q = { class: "form-control" }, D = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Label")
], -1), E = { class: "form-control" }, L = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Messages")
], -1), T = { class: "form-control" }, A = /* @__PURE__ */ e("span", { class: "label-text" }, "Funds", -1), z = ["onUpdate:modelValue"], G = ["onUpdate:modelValue"], H = ["value"], P = /* @__PURE__ */ I({
  __name: "InstantiateContract",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String
  },
  setup(i, { expose: _ }) {
    const p = i, x = g(() => JSON.parse(p.params || "{}")), b = u(""), m = u(""), l = u([]), v = u(""), h = g(() => [
      {
        typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
        value: {
          /** Sender is the that actor that signed the messages */
          sender: p.sender,
          /** Admin is an optional address that can execute migrations */
          admin: b.value,
          /** CodeID is the reference to the stored WASM code */
          codeId: x.value.codeId,
          /** Label is optional metadata to be stored with a contract instance. */
          label: m.value,
          /** Msg json encoded message to be passed to the contract on instantiation */
          msg: C.toBase64(new TextEncoder().encode(v.value)),
          /** Funds coins that are transferred to the contract on instantiation */
          funds: JSON.parse(JSON.stringify(l.value))
        }
      }
    ]);
    function k() {
      var a, t;
      const o = ((t = (a = p.balances) == null ? void 0 : a.at(0)) == null ? void 0 : t.denom) || "";
      l.value.push({ amount: "", denom: o });
    }
    function w() {
      l.value.length > 0 && l.value.pop();
    }
    const S = g(() => {
      let o = !0, a = "";
      return Number(x.value.codeId) < 1 && (o = !1, a = "Code Id is not selected"), { ok: o, error: a };
    });
    function V() {
    }
    return _({ msgs: h, isValid: S, initial: V }), (o, a) => (r(), n("div", null, [
      e("div", O, [
        B,
        e("input", {
          value: i.sender,
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 8, M)
      ]),
      e("div", J, [
        j,
        d(e("input", {
          "onUpdate:modelValue": a[0] || (a[0] = (t) => b.value = t),
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 512), [
          [c, b.value]
        ])
      ]),
      e("div", q, [
        D,
        d(e("input", {
          "onUpdate:modelValue": a[1] || (a[1] = (t) => m.value = t),
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 512), [
          [c, m.value]
        ])
      ]),
      e("div", E, [
        L,
        d(e("textarea", {
          "onUpdate:modelValue": a[2] || (a[2] = (t) => v.value = t),
          placeholder: "{config: {}}",
          class: "text-gray-600 dark:text-white textarea border !border-gray-300 dark:!border-gray-600 rounded-xl"
        }, null, 512), [
          [c, v.value]
        ])
      ]),
      e("div", T, [
        e("label", { class: "label" }, [
          A,
          e("span", { class: "label-text" }, [
            e("a", {
              class: "btn btn-xs",
              onClick: k
            }, "+"),
            e("a", {
              class: "btn btn-xs",
              onClick: w
            }, "-")
          ])
        ]),
        (r(!0), n(y, null, f(l.value, (t, U) => (r(), n("label", {
          class: "input-group",
          key: U
        }, [
          d(e("input", {
            "onUpdate:modelValue": (s) => t.amount = s,
            type: "text",
            placeholder: "0",
            class: "input border border-gray-300 dark:border-gray-600 w-full"
          }, null, 8, z), [
            [c, t.amount]
          ]),
          d(e("select", {
            "onUpdate:modelValue": (s) => t.denom = s,
            class: "select border border-gray-300 dark:border-gray-600"
          }, [
            (r(!0), n(y, null, f(i.balances, (s) => (r(), n("option", {
              key: s.denom,
              value: s.denom
            }, N(s.denom.substring(0, 10)), 9, H))), 128))
          ], 8, G), [
            [F, t.denom]
          ])
        ]))), 128))
      ])
    ]));
  }
});
export {
  P as default
};
