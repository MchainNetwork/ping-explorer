import { d as _, c as l, r as i, K as y, o as f, a as h, b as k, e, w as u, h as p } from "./main-8f814044.js";
const w = { class: "form-control" }, C = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Sender")
], -1), M = ["value"], S = { class: "form-control" }, B = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Contract Address")
], -1), I = ["value"], V = { class: "form-control" }, N = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Code Id")
], -1), U = { class: "form-control" }, q = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Messages")
], -1), T = /* @__PURE__ */ _({
  __name: "MigrateContract",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String
  },
  emits: ["loaded"],
  setup(d, { expose: b, emit: m }) {
    const n = d, c = l(() => JSON.parse(n.params || "{}")), a = i(""), r = i("{}"), g = l(() => [
      {
        typeUrl: "/cosmwasm.wasm.v1.MsgMigrateContract",
        value: {
          /** Sender is the that actor that signed the messages */
          sender: n.sender,
          /** contract address that can execute migrations */
          contract: c.value.contract,
          /** CodeID is the reference to the stored WASM code */
          codeId: a.value,
          /** Msg json encoded message to be passed to the contract on instantiation */
          msg: y.toBase64(new TextEncoder().encode(r.value))
        }
      }
    ]), x = l(() => {
      let s = !0, t = "";
      return Number(a.value) < 1 && (s = !1, t = "Code Id is not selected"), { ok: s, error: t };
    });
    function v() {
    }
    return f(() => {
      m("loaded");
    }), b({ msgs: g, isValid: x, initial: v }), (s, t) => (h(), k("div", null, [
      e("div", w, [
        C,
        e("input", {
          value: d.sender,
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600"
        }, null, 8, M)
      ]),
      e("div", S, [
        B,
        e("input", {
          type: "text",
          readonly: "",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full",
          value: c.value.contract
        }, null, 8, I)
      ]),
      e("div", V, [
        N,
        u(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (o) => a.value = o),
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 512), [
          [p, a.value]
        ])
      ]),
      e("div", U, [
        q,
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
  T as default
};
