import { d as I, c as g, r as u, J as F, o as M, a as r, b as n, e, w as d, h as c, F as y, g as f, v as N, t as O } from "./main-0ee6a5c8.js";
const B = { class: "form-control" }, J = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Sender")
], -1), j = ["value"], q = { class: "form-control" }, D = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Admin")
], -1), E = { class: "form-control" }, L = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Label")
], -1), T = { class: "form-control" }, A = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Messages")
], -1), z = { class: "form-control" }, G = /* @__PURE__ */ e("span", { class: "label-text" }, "Funds", -1), H = ["onUpdate:modelValue"], K = ["onUpdate:modelValue"], P = ["value"], R = /* @__PURE__ */ I({
  __name: "InstantiateContract",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String
  },
  emits: ["loaded"],
  setup(i, { expose: _, emit: h }) {
    const p = i, x = g(() => JSON.parse(p.params || "{}")), b = u(""), m = u(""), l = u([]), v = u(""), k = g(() => [
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
          msg: F.toBase64(new TextEncoder().encode(v.value)),
          /** Funds coins that are transferred to the contract on instantiation */
          funds: JSON.parse(JSON.stringify(l.value))
        }
      }
    ]);
    function w() {
      var a, t;
      const o = ((t = (a = p.balances) == null ? void 0 : a.at(0)) == null ? void 0 : t.denom) || "";
      l.value.push({ amount: "", denom: o });
    }
    function S() {
      l.value.length > 0 && l.value.pop();
    }
    const V = g(() => {
      let o = !0, a = "";
      return Number(x.value.codeId) < 1 && (o = !1, a = "Code Id is not selected"), { ok: o, error: a };
    });
    function U() {
    }
    return M(() => {
      h("loaded");
    }), _({ msgs: k, isValid: V, initial: U }), (o, a) => (r(), n("div", null, [
      e("div", B, [
        J,
        e("input", {
          value: i.sender,
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 8, j)
      ]),
      e("div", q, [
        D,
        d(e("input", {
          "onUpdate:modelValue": a[0] || (a[0] = (t) => b.value = t),
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 512), [
          [c, b.value]
        ])
      ]),
      e("div", E, [
        L,
        d(e("input", {
          "onUpdate:modelValue": a[1] || (a[1] = (t) => m.value = t),
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 512), [
          [c, m.value]
        ])
      ]),
      e("div", T, [
        A,
        d(e("textarea", {
          "onUpdate:modelValue": a[2] || (a[2] = (t) => v.value = t),
          placeholder: "{config: {}}",
          class: "text-gray-600 dark:text-white textarea border !border-gray-300 dark:!border-gray-600 rounded-xl"
        }, null, 512), [
          [c, v.value]
        ])
      ]),
      e("div", z, [
        e("label", { class: "label" }, [
          G,
          e("span", { class: "label-text" }, [
            e("a", {
              class: "btn btn-xs",
              onClick: w
            }, "+"),
            e("a", {
              class: "btn btn-xs",
              onClick: S
            }, "-")
          ])
        ]),
        (r(!0), n(y, null, f(l.value, (t, C) => (r(), n("label", {
          class: "input-group",
          key: C
        }, [
          d(e("input", {
            "onUpdate:modelValue": (s) => t.amount = s,
            type: "text",
            placeholder: "0",
            class: "input border border-gray-300 dark:border-gray-600 w-full"
          }, null, 8, H), [
            [c, t.amount]
          ]),
          d(e("select", {
            "onUpdate:modelValue": (s) => t.denom = s,
            class: "select border border-gray-300 dark:border-gray-600"
          }, [
            (r(!0), n(y, null, f(i.balances, (s) => (r(), n("option", {
              key: s.denom,
              value: s.denom
            }, O(s.denom.substring(0, 10)), 9, P))), 128))
          ], 8, K), [
            [N, t.denom]
          ])
        ]))), 128))
      ])
    ]));
  }
});
export {
  R as default
};
