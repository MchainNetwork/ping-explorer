import { _ as n, $ as c, a0 as r, M as t, a1 as a, a2 as d, a3 as h, a4 as l, a5 as g, a6 as p, a7 as u, a8 as m } from "./main-0ee6a5c8.js";
class f {
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
  f as MsgClientImpl
};
