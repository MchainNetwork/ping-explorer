import { d as m, r as _, c as d, o as f, a as g, b as t, t as l, e as h, h as v, G as b } from "./main-e92b1fb4.js";
import { I as w } from "./IdentityIcon-7b14663f.js";
const x = { class: "form-control" }, y = { class: "label" }, S = { class: "label-text" }, k = { class: "flex pl-2" }, B = { class: "ml-2 text-base" }, V = /* @__PURE__ */ m({
  __name: "Withdraw",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  setup(r, { expose: i }) {
    const s = r, n = (e) => v(s.locale, e), o = _(
      []
    ), c = d(() => o.value.map((e) => ({
      typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
      value: {
        delegatorAddress: s.sender,
        validatorAddress: e.validator_address
      }
    }))), u = d(() => {
      let e = !0, a = "";
      return s.sender || (e = !1, a = n("sender_empty")), o.value.length === 0 && (e = !1, a = n("no_delegation_found")), { ok: e, error: a };
    });
    function p() {
      b(s.endpoint, s.sender).then((e) => {
        o.value = e.rewards;
      });
    }
    return i({ msgs: c, isValid: u, initial: p }), (e, a) => (f(), g("div", null, [
      t("div", x, [
        t("label", y, [
          t("span", S, l(n("sender")), 1)
        ]),
        t("div", k, [
          h(w, {
            size: "small",
            address: r.sender
          }, null, 8, ["address"]),
          t("span", B, l(r.sender), 1)
        ])
      ])
    ]));
  }
});
export {
  V as default
};
