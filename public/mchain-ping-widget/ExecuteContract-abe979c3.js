import { d as C, c as m, r as b, o as n, a as o, b as e, w as c, g, F as v, f, v as U, t as F } from "./main-e92b1fb4.js";
const O = { class: "form-control" }, E = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Sender")
], -1), M = ["value"], N = { class: "form-control" }, B = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Contract Address")
], -1), J = { class: "form-control" }, j = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Messages")
], -1), q = { class: "form-control" }, D = /* @__PURE__ */ e("span", { class: "label-text" }, "Funds", -1), T = ["onUpdate:modelValue"], A = ["onUpdate:modelValue"], L = ["value"], z = /* @__PURE__ */ C({
  __name: "ExecuteContract",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String
  },
  setup(i, { expose: x }) {
    const p = i, y = m(() => JSON.parse(p.params || "{}")), d = b(y.value.contract), r = b([]), u = b("");
    function _() {
      var t, a;
      const l = ((a = (t = p.balances) == null ? void 0 : t.at(0)) == null ? void 0 : a.denom) || "";
      r.value.push({ amount: "", denom: l });
    }
    function h() {
      r.value.length > 0 && r.value.pop();
    }
    const k = m(() => [
      {
        typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
        value: {
          /** Sender is the that actor that signed the messages */
          sender: p.sender,
          contract: d.value,
          /** Msg json encoded message to be passed to the contract on instantiation */
          msg: new TextEncoder().encode(u.value),
          /** Funds coins that are transferred to the contract on instantiation */
          funds: JSON.parse(JSON.stringify(r.value))
        }
      }
    ]), w = m(() => {
      let l = !0, t = "";
      return d.value.length <= 0 && (l = !1, t = "Contract is not selected"), u.value.length <= 0 && (l = !1, t = "Please input arguments"), { ok: l, error: t };
    });
    function S() {
    }
    return x({ msgs: k, isValid: w, initial: S }), (l, t) => (n(), o("div", null, [
      e("div", O, [
        E,
        e("input", {
          value: i.sender,
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 8, M)
      ]),
      e("div", N, [
        B,
        c(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (a) => d.value = a),
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 512), [
          [g, d.value]
        ])
      ]),
      e("div", J, [
        j,
        c(e("textarea", {
          "onUpdate:modelValue": t[1] || (t[1] = (a) => u.value = a),
          placeholder: "{config: {}}",
          class: "textarea text-gray-800 dark:text-white !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 512), [
          [g, u.value]
        ])
      ]),
      e("div", q, [
        e("label", { class: "label" }, [
          D,
          e("span", { class: "label-text" }, [
            e("a", {
              class: "btn btn-xs",
              onClick: _
            }, "+"),
            e("a", {
              class: "btn btn-xs",
              onClick: h
            }, "-")
          ])
        ]),
        (n(!0), o(v, null, f(r.value, (a, V) => (n(), o("label", {
          class: "input-group",
          key: V
        }, [
          c(e("input", {
            "onUpdate:modelValue": (s) => a.amount = s,
            type: "text",
            placeholder: "0",
            class: "input border border-gray-300 dark:border-gray-600 w-full"
          }, null, 8, T), [
            [g, a.amount]
          ]),
          c(e("select", {
            "onUpdate:modelValue": (s) => a.denom = s,
            class: "select border border-gray-300 dark:border-gray-600"
          }, [
            (n(!0), o(v, null, f(i.balances, (s) => (n(), o("option", {
              key: s.denom,
              value: s.denom
            }, F(s.denom.substring(0, 10)), 9, L))), 128))
          ], 8, A), [
            [U, a.denom]
          ])
        ]))), 128))
      ])
    ]));
  }
});
export {
  z as default
};
