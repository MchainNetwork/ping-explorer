import { d as _, c as i, r as f, o as g, a as h, b as d, t as c, e as b, h as y, G as w } from "./main-e92b1fb4.js";
import { I as x } from "./IdentityIcon-7b14663f.js";
const S = { class: "form-control" }, I = { class: "label" }, V = { class: "label-text" }, k = { class: "flex pl-2" }, A = { class: "ml-2 text-base" }, D = /* @__PURE__ */ _({
  __name: "WithdrawCommission",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  setup(o, { expose: u }) {
    const a = o, t = (e) => y(a.locale, e), l = i(() => JSON.parse(a.params || "{}")), r = f(
      []
    ), m = i(() => {
      var s;
      return [
        ...(s = r.value) == null ? void 0 : s.map((n) => ({
          typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
          value: {
            delegatorAddress: a.sender,
            validatorAddress: n.validator_address
          }
        })),
        {
          typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
          value: {
            validatorAddress: l.value.validator_address
          }
        }
      ];
    }), p = i(() => {
      let e = !0, s = "";
      return a.sender || (e = !1, s = t("sender_empty")), l.value.validator_address || (e = !1, s = t("validator_empty")), (!r.value || r.value.length < 0) && (e = !1, s = t("no_delegation_found")), r.value.findIndex(
        (n) => n.validator_address === l.value.validator_address
      ) === -1 && (e = !1, s = t("not_the_validator")), { ok: e, error: s };
    });
    function v() {
      w(a.endpoint, a.sender).then((e) => {
        r.value = e.rewards;
      });
    }
    return u({ msgs: m, isValid: p, initial: v }), (e, s) => (g(), h("div", null, [
      d("div", S, [
        d("label", I, [
          d("span", V, c(t("sender")), 1)
        ]),
        d("div", k, [
          b(x, {
            size: "small",
            address: o.sender
          }, null, 8, ["address"]),
          d("span", A, c(o.sender), 1)
        ])
      ])
    ]));
  }
});
export {
  D as default
};
