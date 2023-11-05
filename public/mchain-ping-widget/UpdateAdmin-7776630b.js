import { d as _, c as o, r as d, K as x, o as y, a as f, b as g, e, w as h, h as w } from "./main-8f814044.js";
const k = { class: "form-control" }, A = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Sender")
], -1), S = ["value"], B = { class: "form-control" }, U = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Contract Address")
], -1), C = ["value"], M = { class: "form-control" }, N = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "New Admin")
], -1), q = /* @__PURE__ */ _({
  __name: "UpdateAdmin",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String
  },
  emits: ["loaded"],
  setup(n, { expose: c, emit: i }) {
    const l = n, r = o(() => JSON.parse(l.params || "{}")), a = d(""), u = d(""), p = o(() => [
      {
        typeUrl: "/cosmwasm.wasm.v1.MsgUpdateAdmin",
        value: {
          /** Sender is the that actor that signed the messages */
          sender: l.sender,
          /** contract address that can execute migrations */
          contract: r.value.contract,
          /** CodeID is the reference to the stored WASM code */
          newAdmin: a.value,
          /** Msg json encoded message to be passed to the contract on instantiation */
          msg: x.toBase64(new TextEncoder().encode(u.value))
        }
      }
    ]), m = o(() => {
      let s = !0, t = "";
      return r.value.contract || (s = !1, t = "Contract is not selected!"), a.value || (s = !1, t = "Admin should not be empty!"), { ok: s, error: t };
    });
    function b() {
    }
    return y(() => {
      i("loaded");
    }), c({ msgs: p, isValid: m, initial: b }), (s, t) => (f(), g("div", null, [
      e("div", k, [
        A,
        e("input", {
          value: n.sender,
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 8, S)
      ]),
      e("div", B, [
        U,
        e("input", {
          type: "text",
          readonly: "",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full",
          value: r.value.contract
        }, null, 8, C)
      ]),
      e("div", M, [
        N,
        h(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (v) => a.value = v),
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 512), [
          [w, a.value]
        ])
      ])
    ]));
  }
});
export {
  q as default
};
