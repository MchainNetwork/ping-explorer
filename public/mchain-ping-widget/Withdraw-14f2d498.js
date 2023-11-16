import { d as _, r as f, c as d, o as g, a as h, b as v, e as s, t as l, f as b, i as y, J as w } from "./main-77c800e4.js";
import { I as x } from "./IdentityIcon-f75a8654.js";
const S = { class: "form-control" }, k = { class: "label" }, B = { class: "label-text" }, D = { class: "flex p-2" }, I = { class: "ml-2 text-base" }, A = /* @__PURE__ */ _({
  __name: "Withdraw",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(r, { expose: i, emit: c }) {
    const t = r, n = (e) => y(t.locale || "en", e), o = f(
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
        s("label", k, [
          s("span", B, l(n("your_connected_account")), 1)
        ]),
        s("div", D, [
          b(x, {
            size: "small",
            address: r.sender
          }, null, 8, ["address"]),
          s("span", I, l(r.sender), 1)
        ])
      ])
    ]));
  }
});
export {
  A as default
};
