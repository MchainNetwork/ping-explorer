var s = Object.defineProperty;
var c = (a, t, n) => t in a ? s(a, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : a[t] = n;
var u = (a, t, n) => (c(a, typeof t != "symbol" ? t + "" : t, n), n);
import { H as m } from "./main-014f4388.js";
class x {
  constructor(t) {
    u(this, "metadata");
    this.metadata = t || {};
  }
  addMetadata(t, n) {
    this.metadata[t] = n;
  }
  baseToDisplay(t, n = 6) {
    const e = this.metadata[t.denom];
    if (!e)
      return t;
    const o = e.denom_units.find((i) => i.denom === e.display);
    return o ? {
      amount: m(Number(t.amount)).div(m(10).pow(o.exponent)).toFixed(n),
      denom: o.denom.toUpperCase()
    } : t;
  }
  baseToUnit(t, n, e = 6) {
    const o = this.metadata[t.denom];
    if (!o)
      return t;
    const r = o.denom_units.find((d) => d.denom === n);
    if (!r)
      return t;
    const i = m(Number(t.amount)).div(m(10).pow(r.exponent));
    return {
      amount: parseFloat(i.toFixed(e)).toString(),
      denom: r.denom
    };
  }
  displayToBase(t, n) {
    const e = this.metadata[t];
    if (!e)
      return n;
    const o = e.denom_units.find((i) => i.denom === n.denom);
    return o ? {
      amount: m(Number(n.amount)).times(m(10).pow(o.exponent)).toFixed(),
      denom: t
    } : n;
  }
}
export {
  x as T
};
