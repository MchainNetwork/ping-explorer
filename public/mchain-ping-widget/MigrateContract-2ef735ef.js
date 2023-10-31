import { d as v, c as l, r as i, I as _, o as y, a as f, b as e, w as u, g as p } from "./main-e92b1fb4.js";
const h = { class: "form-control" }, k = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Sender")
], -1), w = ["value"], C = { class: "form-control" }, I = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Contract Address")
], -1), M = ["value"], S = { class: "form-control" }, B = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Code Id")
], -1), V = { class: "form-control" }, N = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Messages")
], -1), q = /* @__PURE__ */ v({
  __name: "MigrateContract",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String
  },
  setup(n, { expose: b }) {
    const d = n, c = l(() => JSON.parse(d.params || "{}")), a = i(""), r = i("{}"), g = l(() => [
      {
        typeUrl: "/cosmwasm.wasm.v1.MsgMigrateContract",
        value: {
          /** Sender is the that actor that signed the messages */
          sender: d.sender,
          /** contract address that can execute migrations */
          contract: c.value.contract,
          /** CodeID is the reference to the stored WASM code */
          codeId: a.value,
          /** Msg json encoded message to be passed to the contract on instantiation */
          msg: _.toBase64(new TextEncoder().encode(r.value))
        }
      }
    ]), m = l(() => {
      let s = !0, t = "";
      return Number(a.value) < 1 && (s = !1, t = "Code Id is not selected"), { ok: s, error: t };
    });
    function x() {
    }
    return b({ msgs: g, isValid: m, initial: x }), (s, t) => (y(), f("div", null, [
      e("div", h, [
        k,
        e("input", {
          value: n.sender,
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600"
        }, null, 8, w)
      ]),
      e("div", C, [
        I,
        e("input", {
          type: "text",
          readonly: "",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full",
          value: c.value.contract
        }, null, 8, M)
      ]),
      e("div", S, [
        B,
        u(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (o) => a.value = o),
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 512), [
          [p, a.value]
        ])
      ]),
      e("div", V, [
        N,
        u(e("textarea", {
          "onUpdate:modelValue": t[1] || (t[1] = (o) => r.value = o),
          placeholder: "{config: {}}",
          class: "text-gray-600 dark:text-white textarea border !border-gray-300 dark:!border-gray-600 rounded-xl"
        }, null, 512), [
          [p, r.value]
        ])
      ])
    ]));
  }
});
export {
  q as default
};
