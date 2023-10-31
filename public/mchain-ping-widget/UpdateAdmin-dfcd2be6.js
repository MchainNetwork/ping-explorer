import { d as v, c as n, r as d, I as _, o as g, a as x, b as e, w as y, g as f } from "./main-e92b1fb4.js";
const h = { class: "form-control" }, w = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Sender")
], -1), k = ["value"], A = { class: "form-control" }, S = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Contract Address")
], -1), B = ["value"], U = { class: "form-control" }, C = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "New Admin")
], -1), V = /* @__PURE__ */ v({
  __name: "UpdateAdmin",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String
  },
  setup(l, { expose: c }) {
    const o = l, s = n(() => JSON.parse(o.params || "{}")), a = d(""), i = d(""), u = n(() => [
      {
        typeUrl: "/cosmwasm.wasm.v1.MsgUpdateAdmin",
        value: {
          /** Sender is the that actor that signed the messages */
          sender: o.sender,
          /** contract address that can execute migrations */
          contract: s.value.contract,
          /** CodeID is the reference to the stored WASM code */
          newAdmin: a.value,
          /** Msg json encoded message to be passed to the contract on instantiation */
          msg: _.toBase64(new TextEncoder().encode(i.value))
        }
      }
    ]), p = n(() => {
      let r = !0, t = "";
      return s.value.contract || (r = !1, t = "Contract is not selected!"), a.value || (r = !1, t = "Admin should not be empty!"), { ok: r, error: t };
    });
    function m() {
    }
    return c({ msgs: u, isValid: p, initial: m }), (r, t) => (g(), x("div", null, [
      e("div", h, [
        w,
        e("input", {
          value: l.sender,
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 8, k)
      ]),
      e("div", A, [
        S,
        e("input", {
          type: "text",
          readonly: "",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full",
          value: s.value.contract
        }, null, 8, B)
      ]),
      e("div", U, [
        C,
        y(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (b) => a.value = b),
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 512), [
          [f, a.value]
        ])
      ])
    ]));
  }
});
export {
  V as default
};
