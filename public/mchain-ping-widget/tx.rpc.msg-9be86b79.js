import { _ as n, Z as c, $ as r, L as t, a0 as a, a1 as d, a2 as h, a3 as l, a4 as g, a5 as p, a6 as u, a7 as m } from "./main-6f623a49.js";
class C {
  constructor(e) {
    n(this, "rpc", void 0), this.rpc = e, this.createPosition = this.createPosition.bind(this), this.withdrawPosition = this.withdrawPosition.bind(this), this.collectFees = this.collectFees.bind(this), this.collectIncentives = this.collectIncentives.bind(this), this.fungifyChargedPositions = this.fungifyChargedPositions.bind(this);
  }
  createPosition(e) {
    const s = c.encode(e).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Msg", "CreatePosition", s).then((i) => r.decode(new t.Reader(i)));
  }
  withdrawPosition(e) {
    const s = a.encode(e).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Msg", "WithdrawPosition", s).then((i) => d.decode(new t.Reader(i)));
  }
  collectFees(e) {
    const s = h.encode(e).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Msg", "CollectFees", s).then((i) => l.decode(new t.Reader(i)));
  }
  collectIncentives(e) {
    const s = g.encode(e).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Msg", "CollectIncentives", s).then((i) => p.decode(new t.Reader(i)));
  }
  fungifyChargedPositions(e) {
    const s = u.encode(e).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Msg", "FungifyChargedPositions", s).then((i) => m.decode(new t.Reader(i)));
  }
}
export {
  C as MsgClientImpl
};
