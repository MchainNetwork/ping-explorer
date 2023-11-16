import { d as m, c as o, o as _, a as b, b as g, e, t as y, i as v } from "./main-d106edc3.js";
const x = { class: "form-control" }, f = { class: "label" }, h = { class: "label-text" }, k = ["value"], S = { class: "form-control" }, C = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Contract Address")
], -1), w = ["value"], B = /* @__PURE__ */ m({
  __name: "ClearAdmin",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(n, { expose: l, emit: d }) {
    const a = n, c = (t) => v(a.locale, t), r = o(() => JSON.parse(a.params || "{}")), i = o(() => [
      {
        typeUrl: "/cosmwasm.wasm.v1.MsgClearAdmin",
        value: {
          /** Sender is the that actor that signed the messages */
          sender: a.sender,
          /** contract address that can execute migrations */
          contract: r.value.contract
        }
      }
    ]), u = o(() => {
      let t = !0, s = "";
      return r.value.contract || (t = !1, s = "Code Id is not selected"), { ok: t, error: s };
    });
    function p() {
    }
    return _(() => {
      d("loaded");
    }), l({ msgs: i, isValid: u, initial: p }), (t, s) => (b(), g("div", null, [
      e("div", x, [
        e("label", f, [
          e("span", h, y(c("sender")), 1)
        ]),
        e("input", {
          value: n.sender,
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600"
        }, null, 8, k)
      ]),
      e("div", S, [
        C,
        e("input", {
          type: "text",
          readonly: "",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full",
          value: r.value.contract
        }, null, 8, w)
      ])
    ]));
  }
});
export {
  B as default
};
