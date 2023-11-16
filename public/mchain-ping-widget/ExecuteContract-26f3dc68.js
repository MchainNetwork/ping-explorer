import { d as U, c as m, r as b, o as F, a as r, b as o, e, w as c, h as g, F as v, g as f, v as M, t as O } from "./main-77c800e4.js";
const E = { class: "form-control" }, N = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Sender")
], -1), B = ["value"], J = { class: "form-control" }, j = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Contract Address")
], -1), q = { class: "form-control" }, D = /* @__PURE__ */ e("label", { class: "label" }, [
  /* @__PURE__ */ e("span", { class: "label-text" }, "Messages")
], -1), T = { class: "form-control" }, A = /* @__PURE__ */ e("span", { class: "label-text" }, "Funds", -1), L = ["onUpdate:modelValue"], P = ["onUpdate:modelValue"], z = ["value"], H = /* @__PURE__ */ U({
  __name: "ExecuteContract",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String
  },
  emits: ["loaded"],
  setup(i, { expose: x, emit: y }) {
    const p = i, _ = m(() => JSON.parse(p.params || "{}")), d = b(_.value.contract), n = b([]), u = b("");
    function h() {
      var t, a;
      const l = ((a = (t = p.balances) == null ? void 0 : t.at(0)) == null ? void 0 : a.denom) || "";
      n.value.push({ amount: "", denom: l });
    }
    function k() {
      n.value.length > 0 && n.value.pop();
    }
    const w = m(() => [
      {
        typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
        value: {
          /** Sender is the that actor that signed the messages */
          sender: p.sender,
          contract: d.value,
          /** Msg json encoded message to be passed to the contract on instantiation */
          msg: new TextEncoder().encode(u.value),
          /** Funds coins that are transferred to the contract on instantiation */
          funds: JSON.parse(JSON.stringify(n.value))
        }
      }
    ]), S = m(() => {
      let l = !0, t = "";
      return d.value.length <= 0 && (l = !1, t = "Contract is not selected"), u.value.length <= 0 && (l = !1, t = "Please input arguments"), { ok: l, error: t };
    });
    F(() => {
      y("loaded");
    });
    function V() {
    }
    return x({ msgs: w, isValid: S, initial: V }), (l, t) => (r(), o("div", null, [
      e("div", E, [
        N,
        e("input", {
          value: i.sender,
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 8, B)
      ]),
      e("div", J, [
        j,
        c(e("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (a) => d.value = a),
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 512), [
          [g, d.value]
        ])
      ]),
      e("div", q, [
        D,
        c(e("textarea", {
          "onUpdate:modelValue": t[1] || (t[1] = (a) => u.value = a),
          placeholder: "{config: {}}",
          class: "textarea text-gray-800 dark:text-white !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 512), [
          [g, u.value]
        ])
      ]),
      e("div", T, [
        e("label", { class: "label" }, [
          A,
          e("span", { class: "label-text" }, [
            e("a", {
              class: "btn btn-xs",
              onClick: h
            }, "+"),
            e("a", {
              class: "btn btn-xs",
              onClick: k
            }, "-")
          ])
        ]),
        (r(!0), o(v, null, f(n.value, (a, C) => (r(), o("label", {
          class: "input-group",
          key: C
        }, [
          c(e("input", {
            "onUpdate:modelValue": (s) => a.amount = s,
            type: "text",
            placeholder: "0",
            class: "input border border-gray-300 dark:border-gray-600 w-full"
          }, null, 8, L), [
            [g, a.amount]
          ]),
          c(e("select", {
            "onUpdate:modelValue": (s) => a.denom = s,
            class: "select border border-gray-300 dark:border-gray-600"
          }, [
            (r(!0), o(v, null, f(i.balances, (s) => (r(), o("option", {
              key: s.denom,
              value: s.denom
            }, O(s.denom.substring(0, 10)), 9, z))), 128))
          ], 8, P), [
            [M, a.denom]
          ])
        ]))), 128))
      ])
    ]));
  }
});
export {
  H as default
};
