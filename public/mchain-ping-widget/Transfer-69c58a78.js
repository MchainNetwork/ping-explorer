import { m as ut, n as lt, d as ft, c as q, r as N, o as ht, a as A, b as E, e as h, t as S, f as mt, w as K, v as nt, F as st, g as at, p as vt, h as rt, i as pt, q as $t, j as _t, C as gt } from "./main-32246275.js";
import { T as it } from "./TokenUnitConverter-12784101.js";
import { I as yt } from "./IdentityIcon-62591963.js";
var ct = { exports: {} };
(function(J, tt) {
  (function(H, v) {
    J.exports = v();
  })(lt, function() {
    var H = 1e3, v = 6e4, D = 36e5, P = "millisecond", U = "second", b = "minute", c = "hour", O = "day", p = "week", y = "month", Z = "quarter", $ = "year", C = "date", a = "Invalid Date", x = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, I = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, L = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(n) {
      var t = ["th", "st", "nd", "rd"], e = n % 100;
      return "[" + n + (t[(e - 20) % 10] || t[e] || t[0]) + "]";
    } }, T = function(n, t, e) {
      var i = String(n);
      return !i || i.length >= t ? n : "" + Array(t + 1 - i.length).join(e) + n;
    }, B = { s: T, z: function(n) {
      var t = -n.utcOffset(), e = Math.abs(t), i = Math.floor(e / 60), s = e % 60;
      return (t <= 0 ? "+" : "-") + T(i, 2, "0") + ":" + T(s, 2, "0");
    }, m: function n(t, e) {
      if (t.date() < e.date())
        return -n(e, t);
      var i = 12 * (e.year() - t.year()) + (e.month() - t.month()), s = t.clone().add(i, y), o = e - s < 0, r = t.clone().add(i + (o ? -1 : 1), y);
      return +(-(i + (e - s) / (o ? s - r : r - s)) || 0);
    }, a: function(n) {
      return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
    }, p: function(n) {
      return { M: y, y: $, w: p, d: O, D: C, h: c, m: b, s: U, ms: P, Q: Z }[n] || String(n || "").toLowerCase().replace(/s$/, "");
    }, u: function(n) {
      return n === void 0;
    } }, k = "en", Y = {};
    Y[k] = L;
    var V = function(n) {
      return n instanceof u;
    }, W = function n(t, e, i) {
      var s;
      if (!t)
        return k;
      if (typeof t == "string") {
        var o = t.toLowerCase();
        Y[o] && (s = o), e && (Y[o] = e, s = o);
        var r = t.split("-");
        if (!s && r.length > 1)
          return n(r[0]);
      } else {
        var f = t.name;
        Y[f] = t, s = f;
      }
      return !i && s && (k = s), s || !i && k;
    }, m = function(n, t) {
      if (V(n))
        return n.clone();
      var e = typeof t == "object" ? t : {};
      return e.date = n, e.args = arguments, new u(e);
    }, d = B;
    d.l = W, d.i = V, d.w = function(n, t) {
      return m(n, { locale: t.$L, utc: t.$u, x: t.$x, $offset: t.$offset });
    };
    var u = function() {
      function n(e) {
        this.$L = W(e.locale, null, !0), this.parse(e);
      }
      var t = n.prototype;
      return t.parse = function(e) {
        this.$d = function(i) {
          var s = i.date, o = i.utc;
          if (s === null)
            return /* @__PURE__ */ new Date(NaN);
          if (d.u(s))
            return /* @__PURE__ */ new Date();
          if (s instanceof Date)
            return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var r = s.match(x);
            if (r) {
              var f = r[2] - 1 || 0, g = (r[7] || "0").substring(0, 3);
              return o ? new Date(Date.UTC(r[1], f, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, g)) : new Date(r[1], f, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, g);
            }
          }
          return new Date(s);
        }(e), this.$x = e.x || {}, this.init();
      }, t.init = function() {
        var e = this.$d;
        this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
      }, t.$utils = function() {
        return d;
      }, t.isValid = function() {
        return this.$d.toString() !== a;
      }, t.isSame = function(e, i) {
        var s = m(e);
        return this.startOf(i) <= s && s <= this.endOf(i);
      }, t.isAfter = function(e, i) {
        return m(e) < this.startOf(i);
      }, t.isBefore = function(e, i) {
        return this.endOf(i) < m(e);
      }, t.$g = function(e, i, s) {
        return d.u(e) ? this[i] : this.set(s, e);
      }, t.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, t.valueOf = function() {
        return this.$d.getTime();
      }, t.startOf = function(e, i) {
        var s = this, o = !!d.u(i) || i, r = d.p(e), f = function(G, w) {
          var F = d.w(s.$u ? Date.UTC(s.$y, w, G) : new Date(s.$y, w, G), s);
          return o ? F : F.endOf(O);
        }, g = function(G, w) {
          return d.w(s.toDate()[G].apply(s.toDate("s"), (o ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(w)), s);
        }, _ = this.$W, M = this.$M, z = this.$D, j = "set" + (this.$u ? "UTC" : "");
        switch (r) {
          case $:
            return o ? f(1, 0) : f(31, 11);
          case y:
            return o ? f(1, M) : f(0, M + 1);
          case p:
            var Q = this.$locale().weekStart || 0, R = (_ < Q ? _ + 7 : _) - Q;
            return f(o ? z - R : z + (6 - R), M);
          case O:
          case C:
            return g(j + "Hours", 0);
          case c:
            return g(j + "Minutes", 1);
          case b:
            return g(j + "Seconds", 2);
          case U:
            return g(j + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, t.endOf = function(e) {
        return this.startOf(e, !1);
      }, t.$set = function(e, i) {
        var s, o = d.p(e), r = "set" + (this.$u ? "UTC" : ""), f = (s = {}, s[O] = r + "Date", s[C] = r + "Date", s[y] = r + "Month", s[$] = r + "FullYear", s[c] = r + "Hours", s[b] = r + "Minutes", s[U] = r + "Seconds", s[P] = r + "Milliseconds", s)[o], g = o === O ? this.$D + (i - this.$W) : i;
        if (o === y || o === $) {
          var _ = this.clone().set(C, 1);
          _.$d[f](g), _.init(), this.$d = _.set(C, Math.min(this.$D, _.daysInMonth())).$d;
        } else
          f && this.$d[f](g);
        return this.init(), this;
      }, t.set = function(e, i) {
        return this.clone().$set(e, i);
      }, t.get = function(e) {
        return this[d.p(e)]();
      }, t.add = function(e, i) {
        var s, o = this;
        e = Number(e);
        var r = d.p(i), f = function(M) {
          var z = m(o);
          return d.w(z.date(z.date() + Math.round(M * e)), o);
        };
        if (r === y)
          return this.set(y, this.$M + e);
        if (r === $)
          return this.set($, this.$y + e);
        if (r === O)
          return f(1);
        if (r === p)
          return f(7);
        var g = (s = {}, s[b] = v, s[c] = D, s[U] = H, s)[r] || 1, _ = this.$d.getTime() + e * g;
        return d.w(_, this);
      }, t.subtract = function(e, i) {
        return this.add(-1 * e, i);
      }, t.format = function(e) {
        var i = this, s = this.$locale();
        if (!this.isValid())
          return s.invalidDate || a;
        var o = e || "YYYY-MM-DDTHH:mm:ssZ", r = d.z(this), f = this.$H, g = this.$m, _ = this.$M, M = s.weekdays, z = s.months, j = function(w, F, et, X) {
          return w && (w[F] || w(i, o)) || et[F].slice(0, X);
        }, Q = function(w) {
          return d.s(f % 12 || 12, w, "0");
        }, R = s.meridiem || function(w, F, et) {
          var X = w < 12 ? "AM" : "PM";
          return et ? X.toLowerCase() : X;
        }, G = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: _ + 1, MM: d.s(_ + 1, 2, "0"), MMM: j(s.monthsShort, _, z, 3), MMMM: j(z, _), D: this.$D, DD: d.s(this.$D, 2, "0"), d: String(this.$W), dd: j(s.weekdaysMin, this.$W, M, 2), ddd: j(s.weekdaysShort, this.$W, M, 3), dddd: M[this.$W], H: String(f), HH: d.s(f, 2, "0"), h: Q(1), hh: Q(2), a: R(f, g, !0), A: R(f, g, !1), m: String(g), mm: d.s(g, 2, "0"), s: String(this.$s), ss: d.s(this.$s, 2, "0"), SSS: d.s(this.$ms, 3, "0"), Z: r };
        return o.replace(I, function(w, F) {
          return F || G[w] || r.replace(":", "");
        });
      }, t.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, t.diff = function(e, i, s) {
        var o, r = d.p(i), f = m(e), g = (f.utcOffset() - this.utcOffset()) * v, _ = this - f, M = d.m(this, f);
        return M = (o = {}, o[$] = M / 12, o[y] = M, o[Z] = M / 3, o[p] = (_ - g) / 6048e5, o[O] = (_ - g) / 864e5, o[c] = _ / D, o[b] = _ / v, o[U] = _ / H, o)[r] || _, s ? M : d.a(M);
      }, t.daysInMonth = function() {
        return this.endOf(y).$D;
      }, t.$locale = function() {
        return Y[this.$L];
      }, t.locale = function(e, i) {
        if (!e)
          return this.$L;
        var s = this.clone(), o = W(e, i, !0);
        return o && (s.$L = o), s;
      }, t.clone = function() {
        return d.w(this.$d, this);
      }, t.toDate = function() {
        return new Date(this.valueOf());
      }, t.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, t.toISOString = function() {
        return this.$d.toISOString();
      }, t.toString = function() {
        return this.$d.toUTCString();
      }, n;
    }(), l = u.prototype;
    return m.prototype = l, [["$ms", P], ["$s", U], ["$m", b], ["$H", c], ["$W", O], ["$M", y], ["$y", $], ["$D", C]].forEach(function(n) {
      l[n[1]] = function(t) {
        return this.$g(t, n[0], n[1]);
      };
    }), m.extend = function(n, t) {
      return n.$i || (n(t, u, m), n.$i = !0), m;
    }, m.locale = W, m.isDayjs = V, m.unix = function(n) {
      return m(1e3 * n);
    }, m.en = Y[k], m.Ls = Y, m.p = {}, m;
  });
})(ct);
var bt = ct.exports;
const ot = /* @__PURE__ */ ut(bt);
var dt = { exports: {} };
(function(J, tt) {
  (function(H, v) {
    J.exports = v();
  })(lt, function() {
    var H = "minute", v = /[+-]\d\d(?::?\d\d)?/g, D = /([+-]|\d\d)/g;
    return function(P, U, b) {
      var c = U.prototype;
      b.utc = function(a) {
        var x = { date: a, utc: !0, args: arguments };
        return new U(x);
      }, c.utc = function(a) {
        var x = b(this.toDate(), { locale: this.$L, utc: !0 });
        return a ? x.add(this.utcOffset(), H) : x;
      }, c.local = function() {
        return b(this.toDate(), { locale: this.$L, utc: !1 });
      };
      var O = c.parse;
      c.parse = function(a) {
        a.utc && (this.$u = !0), this.$utils().u(a.$offset) || (this.$offset = a.$offset), O.call(this, a);
      };
      var p = c.init;
      c.init = function() {
        if (this.$u) {
          var a = this.$d;
          this.$y = a.getUTCFullYear(), this.$M = a.getUTCMonth(), this.$D = a.getUTCDate(), this.$W = a.getUTCDay(), this.$H = a.getUTCHours(), this.$m = a.getUTCMinutes(), this.$s = a.getUTCSeconds(), this.$ms = a.getUTCMilliseconds();
        } else
          p.call(this);
      };
      var y = c.utcOffset;
      c.utcOffset = function(a, x) {
        var I = this.$utils().u;
        if (I(a))
          return this.$u ? 0 : I(this.$offset) ? y.call(this) : this.$offset;
        if (typeof a == "string" && (a = function(k) {
          k === void 0 && (k = "");
          var Y = k.match(v);
          if (!Y)
            return null;
          var V = ("" + Y[0]).match(D) || ["-", 0, 0], W = V[0], m = 60 * +V[1] + +V[2];
          return m === 0 ? 0 : W === "+" ? m : -m;
        }(a), a === null))
          return this;
        var L = Math.abs(a) <= 16 ? 60 * a : a, T = this;
        if (x)
          return T.$offset = L, T.$u = a === 0, T;
        if (a !== 0) {
          var B = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (T = this.local().add(L + B, H)).$offset = L, T.$x.$localOffset = B;
        } else
          T = this.utc();
        return T;
      };
      var Z = c.format;
      c.format = function(a) {
        var x = a || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return Z.call(this, x);
      }, c.valueOf = function() {
        var a = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * a;
      }, c.isUTC = function() {
        return !!this.$u;
      }, c.toISOString = function() {
        return this.toDate().toISOString();
      }, c.toString = function() {
        return this.toDate().toUTCString();
      };
      var $ = c.toDate;
      c.toDate = function(a) {
        return a === "s" && this.$offset ? b(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : $.call(this);
      };
      var C = c.diff;
      c.diff = function(a, x, I) {
        if (a && this.$u === a.$u)
          return C.call(this, a, x, I);
        var L = this.local(), T = b(a).local();
        return C.call(L, T, x, I);
      };
    };
  });
})(dt);
var Dt = dt.exports;
const Mt = /* @__PURE__ */ ut(Dt), St = { class: "form-control" }, Ot = { class: "label" }, xt = { class: "label-text" }, Tt = { class: "flex p-2" }, wt = { class: "ml-2 text-base" }, Ct = { class: "form-control" }, Ut = { class: "label" }, Yt = { class: "label-text" }, kt = { value: "" }, Ht = ["value"], It = { class: "form-control" }, Lt = { class: "label" }, Vt = { class: "label-text" }, Wt = {
  key: 0,
  class: "text-xs"
}, jt = ["disabled"], Nt = { value: "" }, Bt = ["value"], zt = { class: "form-control" }, Ft = { class: "label" }, At = { class: "label-text" }, Et = { class: "form-control" }, Jt = { class: "label" }, Pt = { class: "label-text" }, Zt = { class: "input-group" }, qt = ["placeholder"], Gt = ["value"], Xt = /* @__PURE__ */ ft({
  __name: "Transfer",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  emits: ["loaded"],
  setup(J, { expose: tt, emit: H }) {
    const v = J;
    ot.extend(Mt);
    const D = (u) => pt(v.locale || "en", u), P = q(() => JSON.parse(v.params || "{}")), U = P.value.chain_name, b = N(""), c = N(""), O = N(""), p = N(""), y = N(""), Z = N([]), $ = N(
      {}
    ), C = N(
      {}
    ), a = new gt(), x = q(() => {
      var n, t;
      const u = ot().add(1, "hour"), l = new it(v.metadata);
      return [
        {
          typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
          value: {
            sourcePort: ((n = $.value) == null ? void 0 : n.port_id) || "",
            sourceChannel: ((t = $.value) == null ? void 0 : t.channel_id) || "",
            token: l.displayToBase(p.value, {
              amount: String(b.value),
              denom: c.value
            }),
            sender: v.sender,
            receiver: O.value,
            timeoutTimestamp: String(u.utc().valueOf() * 1e6)
          }
        }
      ];
    }), I = q(() => {
      const u = p.value.startsWith("ibc/");
      return u && (y.value = ""), u;
    });
    function L() {
      a.fetchIBCPathInfo(y.value).then((u) => {
        var l, n;
        u.chain_1.chain_name === U ? $.value = (l = u.channels.find(
          (t) => t.chain_1.port_id === "transfer"
        )) == null ? void 0 : l.chain_1 : $.value = (n = u.channels.find(
          (t) => t.chain_2.port_id === "transfer"
        )) == null ? void 0 : n.chain_2;
      });
    }
    function T() {
      const u = String(p.value).replace("ibc/", "");
      if (p.value.startsWith("ibc/"))
        if (C.value[p.value]) {
          const n = C.value[p.value].path.split("/");
          $.value = {
            channel_id: n[1],
            port_id: n[0]
          };
        } else
          $t(v.endpoint, u).then((l) => {
            C.value[p.value] = l.denom_trace;
            const n = l.denom_trace.path.split("/");
            $.value = {
              channel_id: n[1],
              port_id: n[0]
            };
          });
    }
    const B = q(() => {
      var n;
      const u = ((n = v.balances) == null ? void 0 : n.find((t) => t.denom === p.value)) || {
        amount: "0",
        denom: "-"
      }, l = new it(v.metadata);
      return {
        base: u,
        display: l.baseToUnit(u, c.value)
      };
    }), k = q(() => {
      var l;
      const u = new it(v.metadata);
      return ((l = v.balances) == null ? void 0 : l.map((n) => ({
        base: n,
        display: u.baseToDisplay(n)
      }))) || [];
    }), Y = q(() => {
      if (!v.metadata || !v.metadata[p.value])
        return c.value = p.value, [{ denom: p.value, exponent: 0, aliases: [] }];
      const u = v.metadata[p.value].denom_units.sort(
        (l, n) => n.exponent - l.exponent
      );
      return u.length > 0 && (c.value = u[0].denom), u;
    }), V = q(() => {
      var n;
      let u = !0, l = "";
      return (!((n = $.value) != null && n.channel_id) || !$.value.port_id) && (u = !1, l = D("destination_chain_empty")), O.value || (u = !1, l = D("recipient_empty")), Number(b.value) > 0 || (u = !1, l = D("amount_greater_than_zero")), { ok: u, error: l };
    }), W = N(null);
    function m() {
      W.value && W.value.focus(), a.fetchIBCPaths().then((u) => {
        Z.value = u.filter((l) => l.path.indexOf(U) > -1);
      }), _t(v.endpoint).then((u) => {
        p.value = u.params.bond_denom;
      });
    }
    function d(u) {
      return String(u).substring(0, 10);
    }
    return ht(() => {
      H("loaded");
    }), tt({ msgs: x, isValid: V, initial: m }), (u, l) => {
      var n;
      return A(), E("div", null, [
        h("div", St, [
          h("label", Ot, [
            h("span", xt, S(D("your_connected_account")), 1)
          ]),
          h("div", Tt, [
            mt(yt, {
              size: "small",
              address: J.sender
            }, null, 8, ["address"]),
            h("span", wt, S(J.sender), 1)
          ])
        ]),
        h("div", Ct, [
          h("label", Ut, [
            h("span", Yt, S(D("balances")), 1)
          ]),
          K(h("select", {
            "onUpdate:modelValue": l[0] || (l[0] = (t) => p.value = t),
            class: "select select-bordered rounded-full",
            onChange: T
          }, [
            h("option", kt, S(D("select_token")), 1),
            (A(!0), E(st, null, at(k.value, ({ base: t, display: e }) => (A(), E("option", {
              key: t.denom,
              value: t.denom
            }, S(e.amount) + " " + S(d(e.denom)), 9, Ht))), 128))
          ], 544), [
            [nt, p.value]
          ])
        ]),
        h("div", It, [
          h("label", Lt, [
            h("span", Vt, S(D("destination")), 1),
            $.value ? (A(), E("span", Wt, S($.value.channel_id) + "/" + S($.value.port_id), 1)) : vt("", !0)
          ]),
          K(h("select", {
            "onUpdate:modelValue": l[1] || (l[1] = (t) => y.value = t),
            class: "select select-bordered capitalize rounded-full",
            onChange: L,
            disabled: I.value
          }, [
            h("option", Nt, S(D("select_destination")), 1),
            (A(!0), E(st, null, at(Z.value, (t) => (A(), E("option", {
              key: t.from,
              value: t.path
            }, S(t.from === P.value.chain_name ? t.to : t.from), 9, Bt))), 128))
          ], 40, jt), [
            [nt, y.value]
          ])
        ]),
        h("div", zt, [
          h("label", Ft, [
            h("span", At, S(D("recipient")), 1)
          ]),
          K(h("input", {
            "onUpdate:modelValue": l[2] || (l[2] = (t) => O.value = t),
            type: "text",
            class: "input border border-gray-300 dark:border-gray-600 rounded-full"
          }, null, 512), [
            [rt, O.value]
          ])
        ]),
        h("div", Et, [
          h("label", Jt, [
            h("span", Pt, S(D("amount")), 1),
            h("span", null, S(B.value.display.amount) + " " + S(d(B.value.display.denom)), 1)
          ]),
          h("label", Zt, [
            K(h("input", {
              "onUpdate:modelValue": l[3] || (l[3] = (t) => b.value = t),
              type: "number",
              placeholder: D("available") + `: ${(n = B.value) == null ? void 0 : n.display.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, qt), [
              [rt, b.value]
            ]),
            K(h("select", {
              "onUpdate:modelValue": l[4] || (l[4] = (t) => c.value = t),
              class: "select select-bordered uppercase"
            }, [
              (A(!0), E(st, null, at(Y.value, (t) => (A(), E("option", {
                key: t.denom,
                value: t.denom
              }, S(d(t.denom)), 9, Gt))), 128))
            ], 512), [
              [nt, c.value]
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  Xt as default
};
