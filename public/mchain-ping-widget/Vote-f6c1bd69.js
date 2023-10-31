import { d as b, c as u, r as y, o as x, a as h, b as e, t as l, e as V, w as n, k as i, h as g } from "./main-e92b1fb4.js";
import { I as S } from "./IdentityIcon-7b14663f.js";
const k = { class: "form-control" }, U = { class: "label" }, I = { class: "label-text" }, N = { class: "flex pl-2" }, w = { class: "ml-2 text-base" }, B = { class: "form-control" }, q = { class: "label" }, D = { class: "label-text" }, M = { class: "flex" }, z = { for: "yes" }, C = { for: "no" }, E = { for: "veto" }, J = { for: "abstain" }, j = /* @__PURE__ */ b({
  __name: "Vote",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  setup(d, { expose: v }) {
    const p = d, t = (r) => g(p.locale, r), c = u(() => JSON.parse(p.params || "{}")), o = y("1"), m = u(() => [
      {
        typeUrl: "/cosmos.gov.v1beta1.MsgVote",
        value: {
          voter: p.sender,
          proposalId: c.value.proposal_id,
          option: Number(o.value)
        }
      }
    ]), _ = u(() => {
      let r = !0, s = "";
      return c.value.proposal_id || (r = !1, s = t("proposal_id_empty")), o.value || (r = !1, s = t("vote_empty")), { ok: r, error: s };
    });
    function f() {
    }
    return v({ msgs: m, isValid: _, initial: f }), (r, s) => (x(), h("div", null, [
      e("div", k, [
        e("label", U, [
          e("span", I, l(t("sender")), 1)
        ]),
        e("div", N, [
          V(S, {
            size: "small",
            address: d.sender
          }, null, 8, ["address"]),
          e("span", w, l(d.sender), 1)
        ])
      ]),
      e("div", B, [
        e("label", q, [
          e("span", D, l(t("option")), 1)
        ]),
        e("div", M, [
          n(e("input", {
            "onUpdate:modelValue": s[0] || (s[0] = (a) => o.value = a),
            type: "radio",
            id: "yes",
            value: "1",
            class: "radio radio-success mx-2"
          }, null, 512), [
            [i, o.value]
          ]),
          e("label", z, l(t("yes")), 1),
          n(e("input", {
            "onUpdate:modelValue": s[1] || (s[1] = (a) => o.value = a),
            type: "radio",
            id: "no",
            value: "3",
            class: "radio radio-error mx-2"
          }, null, 512), [
            [i, o.value]
          ]),
          e("label", C, l(t("no")), 1),
          n(e("input", {
            "onUpdate:modelValue": s[2] || (s[2] = (a) => o.value = a),
            type: "radio",
            id: "veto",
            value: "4",
            class: "radio radio-error mx-2"
          }, null, 512), [
            [i, o.value]
          ]),
          e("label", E, l(t("no_with_veto")), 1),
          n(e("input", {
            "onUpdate:modelValue": s[3] || (s[3] = (a) => o.value = a),
            type: "radio",
            id: "abstain",
            value: "2",
            class: "radio radio-dark mx-2"
          }, null, 512), [
            [i, o.value]
          ]),
          e("label", J, l(t("abstain")), 1)
        ])
      ])
    ]));
  }
});
export {
  j as default
};
