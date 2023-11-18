import { d as f, c as i, r as g, o as h, a as b, b as y, e as o, t as c, f as w, i as x, J as S } from "./main-e65e1b2c.js";
import { I } from "./IdentityIcon-0c6b3542.js";
const V = { class: "form-control" }, k = { class: "label" }, A = { class: "label-text" }, B = { class: "flex p-2" }, C = { class: "ml-2 text-base" }, N = /* @__PURE__ */ f({
  __name: "WithdrawCommission",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(d, { expose: u, emit: m }) {
    const s = d, t = (e) => x(s.locale || "en", e), n = i(() => JSON.parse(s.params || "{}")), r = g(
      []
    ), p = i(() => {
      var a;
      return [
        ...(a = r.value) == null ? void 0 : a.map((l) => ({
          typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
          value: {
            delegatorAddress: s.sender,
            validatorAddress: l.validator_address
          }
        })),
        {
          typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
          value: {
            validatorAddress: n.value.validator_address
          }
        }
      ];
    }), _ = i(() => {
      let e = !0, a = "";
      return s.sender || (e = !1, a = t("sender_empty")), n.value.validator_address || (e = !1, a = t("validator_empty")), (!r.value || r.value.length < 0) && (e = !1, a = t("no_delegation_found")), r.value.findIndex(
        (l) => l.validator_address === n.value.validator_address
      ) === -1 && (e = !1, a = t("not_the_validator")), { ok: e, error: a };
    });
    function v() {
      S(s.endpoint, s.sender).then((e) => {
        r.value = e.rewards;
      });
    }
    return h(() => {
      m("loaded");
    }), u({ msgs: p, isValid: _, initial: v }), (e, a) => (b(), y("div", null, [
      o("div", V, [
        o("label", k, [
          o("span", A, c(t("your_connected_account")), 1)
        ]),
        o("div", B, [
          w(I, {
            size: "small",
            address: d.sender
          }, null, 8, ["address"]),
          o("span", C, c(d.sender), 1)
        ])
      ])
    ]));
  }
});
export {
  N as default
};
