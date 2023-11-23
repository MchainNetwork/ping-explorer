import { d as y, c as p, r as x, o as V, a as g, b as h, e, t as l, f as S, w as r, l as i, i as U } from "./main-5698c4eb.js";
import { I as k } from "./IdentityIcon-3e74263c.js";
const I = { class: "form-control" }, N = { class: "label" }, w = { class: "label-text" }, B = { class: "flex p-2" }, M = { class: "ml-2 text-base" }, q = { class: "form-control" }, D = { class: "label" }, z = { class: "label-text" }, C = { class: "flex" }, E = { for: "yes" }, J = { for: "no" }, O = { for: "veto" }, R = { for: "abstain" }, F = /* @__PURE__ */ y({
  __name: "Vote",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(d, { expose: m, emit: v }) {
    const u = d, t = (n) => U(u.locale || "en", n), c = p(() => JSON.parse(u.params || "{}")), s = x("1"), _ = p(() => [
      {
        typeUrl: "/cosmos.gov.v1beta1.MsgVote",
        value: {
          voter: u.sender,
          proposalId: c.value.proposal_id,
          option: Number(s.value)
        }
      }
    ]), f = p(() => {
      let n = !0, o = "";
      return c.value.proposal_id || (n = !1, o = t("proposal_id_empty")), s.value || (n = !1, o = t("vote_empty")), { ok: n, error: o };
    });
    function b() {
    }
    return V(() => {
      v("loaded");
    }), m({ msgs: _, isValid: f, initial: b }), (n, o) => (g(), h("div", null, [
      e("div", I, [
        e("label", N, [
          e("span", w, l(t("your_connected_account")), 1)
        ]),
        e("div", B, [
          S(k, {
            size: "small",
            address: d.sender
          }, null, 8, ["address"]),
          e("span", M, l(d.sender), 1)
        ])
      ]),
      e("div", q, [
        e("label", D, [
          e("span", z, l(t("option")), 1)
        ]),
        e("div", C, [
          r(e("input", {
            "onUpdate:modelValue": o[0] || (o[0] = (a) => s.value = a),
            type: "radio",
            id: "yes",
            value: "1",
            class: "radio radio-success mx-2"
          }, null, 512), [
            [i, s.value]
          ]),
          e("label", E, l(t("yes")), 1),
          r(e("input", {
            "onUpdate:modelValue": o[1] || (o[1] = (a) => s.value = a),
            type: "radio",
            id: "no",
            value: "3",
            class: "radio radio-error mx-2"
          }, null, 512), [
            [i, s.value]
          ]),
          e("label", J, l(t("no")), 1),
          r(e("input", {
            "onUpdate:modelValue": o[2] || (o[2] = (a) => s.value = a),
            type: "radio",
            id: "veto",
            value: "4",
            class: "radio radio-error mx-2"
          }, null, 512), [
            [i, s.value]
          ]),
          e("label", O, l(t("no_with_veto")), 1),
          r(e("input", {
            "onUpdate:modelValue": o[3] || (o[3] = (a) => s.value = a),
            type: "radio",
            id: "abstain",
            value: "2",
            class: "radio radio-dark mx-2"
          }, null, 512), [
            [i, s.value]
          ]),
          e("label", R, l(t("abstain")), 1)
        ])
      ])
    ]));
  }
});
export {
  F as default
};
