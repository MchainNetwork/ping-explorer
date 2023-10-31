import { d as p, c as o, o as m, a as _, b as e, t as b, h as g } from "./main-e92b1fb4.js";
const y = { class: "form-control" }, v = { class: "label" }, h = { class: "label-text" }, x = ["value"], f = { class: "form-control" }, k = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Contract Address")
], -1), S = ["value"], w = /* @__PURE__ */ p({
  __name: "ClearAdmin",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  setup(n, { expose: l }) {
    const r = n, c = (t) => g(r.locale, t), a = o(() => JSON.parse(r.params || "{}")), d = o(() => [
      {
        typeUrl: "/cosmwasm.wasm.v1.MsgClearAdmin",
        value: {
          /** Sender is the that actor that signed the messages */
          sender: r.sender,
          /** contract address that can execute migrations */
          contract: a.value.contract
        }
      }
    ]), i = o(() => {
      let t = !0, s = "";
      return a.value.contract || (t = !1, s = "Code Id is not selected"), { ok: t, error: s };
    });
    function u() {
    }
    return l({ msgs: d, isValid: i, initial: u }), (t, s) => (m(), _("div", null, [
      e("div", y, [
        e("label", v, [
          e("span", h, b(c("sender")), 1)
        ]),
        e("input", {
          value: n.sender,
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600"
        }, null, 8, x)
      ]),
      e("div", f, [
        k,
        e("input", {
          type: "text",
          readonly: "",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full",
          value: a.value.contract
        }, null, 8, S)
      ])
    ]));
  }
});
export {
  w as default
};
