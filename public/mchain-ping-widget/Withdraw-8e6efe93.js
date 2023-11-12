import { d as _, r as f, c as d, o as g, a as h, b as v, e as s, t as l, f as b, i as y, I as w } from "./main-014f4388.js";
import { I as x } from "./IdentityIcon-99cb3664.js";
const S = { class: "form-control" }, I = { class: "label" }, k = { class: "label-text" }, B = { class: "flex p-2" }, D = { class: "ml-2 text-base" }, A = /* @__PURE__ */ _({
  __name: "Withdraw",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(r, { expose: i, emit: c }) {
    const t = r, n = (e) => y(t.locale, e), o = f(
      []
    ), u = d(() => o.value.map((e) => ({
      typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
      value: {
        delegatorAddress: t.sender,
        validatorAddress: e.validator_address
      }
    }))), p = d(() => {
      let e = !0, a = "";
      return t.sender || (e = !1, a = n("sender_empty")), o.value.length === 0 && (e = !1, a = n("no_delegation_found")), { ok: e, error: a };
    });
    function m() {
      w(t.endpoint, t.sender).then((e) => {
        o.value = e.rewards;
      });
    }
    return g(() => {
      c("loaded");
    }), i({ msgs: u, isValid: p, initial: m }), (e, a) => (h(), v("div", null, [
      s("div", S, [
        s("label", I, [
          s("span", k, l(n("your_connected_account")), 1)
        ]),
        s("div", B, [
          b(x, {
            size: "small",
            address: r.sender
          }, null, 8, ["address"]),
          s("span", D, l(r.sender), 1)
        ])
      ])
    ]));
  }
});
export {
  A as default
};
