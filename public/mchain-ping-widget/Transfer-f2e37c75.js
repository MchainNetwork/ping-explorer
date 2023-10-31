import { l as ut, m as lt, d as ft, c as Z, r as N, o as F, a as A, b as v, t as O, e as ht, w as K, v as nt, F as st, f as at, n as mt, g as rt, h as vt, p as pt, i as $t, C as _t } from "./main-e92b1fb4.js";
import { T as it } from "./TokenUnitConverter-7d5a7b2d.js";
import { I as gt } from "./IdentityIcon-7b14663f.js";
var ct = { exports: {} };
(function(E, tt) {
  (function($, _) {
    E.exports = _();
  })(lt, function() {
    var $ = 1e3, _ = 6e4, J = 36e5, P = "millisecond", T = "second", y = "minute", c = "hour", h = "day", k = "week", D = "month", M = "quarter", w = "year", U = "date", i = "Invalid Date", x = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, L = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, V = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t) {
      var n = ["th", "st", "nd", "rd"], e = t % 100;
      return "[" + t + (n[(e - 20) % 10] || n[e] || n[0]) + "]";
    } }, b = function(t, n, e) {
      var r = String(t);
      return !r || r.length >= n ? t : "" + Array(n + 1 - r.length).join(e) + t;
    }, q = { s: b, z: function(t) {
      var n = -t.utcOffset(), e = Math.abs(n), r = Math.floor(e / 60), s = e % 60;
      return (n <= 0 ? "+" : "-") + b(r, 2, "0") + ":" + b(s, 2, "0");
    }, m: function t(n, e) {
      if (n.date() < e.date())
        return -t(e, n);
      var r = 12 * (e.year() - n.year()) + (e.month() - n.month()), s = n.clone().add(r, D), u = e - s < 0, o = n.clone().add(r + (u ? -1 : 1), D);
      return +(-(r + (e - s) / (u ? s - o : o - s)) || 0);
    }, a: function(t) {
      return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
    }, p: function(t) {
      return { M: D, y: w, w: k, d: h, D: U, h: c, m: y, s: T, ms: P, Q: M }[t] || String(t || "").toLowerCase().replace(/s$/, "");
    }, u: function(t) {
      return t === void 0;
    } }, H = "en", Y = {};
    Y[H] = V;
    var I = function(t) {
      return t instanceof l;
    }, j = function t(n, e, r) {
      var s;
      if (!n)
        return H;
      if (typeof n == "string") {
        var u = n.toLowerCase();
        Y[u] && (s = u), e && (Y[u] = e, s = u);
        var o = n.split("-");
        if (!s && o.length > 1)
          return t(o[0]);
      } else {
        var f = n.name;
        Y[f] = n, s = f;
      }
      return !r && s && (H = s), s || !r && H;
    }, m = function(t, n) {
      if (I(t))
        return t.clone();
      var e = typeof n == "object" ? n : {};
      return e.date = t, e.args = arguments, new l(e);
    }, a = q;
    a.l = j, a.i = I, a.w = function(t, n) {
      return m(t, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var l = function() {
      function t(e) {
        this.$L = j(e.locale, null, !0), this.parse(e);
      }
      var n = t.prototype;
      return n.parse = function(e) {
        this.$d = function(r) {
          var s = r.date, u = r.utc;
          if (s === null)
            return /* @__PURE__ */ new Date(NaN);
          if (a.u(s))
            return /* @__PURE__ */ new Date();
          if (s instanceof Date)
            return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var o = s.match(x);
            if (o) {
              var f = o[2] - 1 || 0, g = (o[7] || "0").substring(0, 3);
              return u ? new Date(Date.UTC(o[1], f, o[3] || 1, o[4] || 0, o[5] || 0, o[6] || 0, g)) : new Date(o[1], f, o[3] || 1, o[4] || 0, o[5] || 0, o[6] || 0, g);
            }
          }
          return new Date(s);
        }(e), this.$x = e.x || {}, this.init();
      }, n.init = function() {
        var e = this.$d;
        this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
      }, n.$utils = function() {
        return a;
      }, n.isValid = function() {
        return this.$d.toString() !== i;
      }, n.isSame = function(e, r) {
        var s = m(e);
        return this.startOf(r) <= s && s <= this.endOf(r);
      }, n.isAfter = function(e, r) {
        return m(e) < this.startOf(r);
      }, n.isBefore = function(e, r) {
        return this.endOf(r) < m(e);
      }, n.$g = function(e, r, s) {
        return a.u(e) ? this[r] : this.set(s, e);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(e, r) {
        var s = this, u = !!a.u(r) || r, o = a.p(e), f = function(G, C) {
          var z = a.w(s.$u ? Date.UTC(s.$y, C, G) : new Date(s.$y, C, G), s);
          return u ? z : z.endOf(h);
        }, g = function(G, C) {
          return a.w(s.toDate()[G].apply(s.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(C)), s);
        }, p = this.$W, S = this.$M, B = this.$D, W = "set" + (this.$u ? "UTC" : "");
        switch (o) {
          case w:
            return u ? f(1, 0) : f(31, 11);
          case D:
            return u ? f(1, S) : f(0, S + 1);
          case k:
            var Q = this.$locale().weekStart || 0, R = (p < Q ? p + 7 : p) - Q;
            return f(u ? B - R : B + (6 - R), S);
          case h:
          case U:
            return g(W + "Hours", 0);
          case c:
            return g(W + "Minutes", 1);
          case y:
            return g(W + "Seconds", 2);
          case T:
            return g(W + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(e) {
        return this.startOf(e, !1);
      }, n.$set = function(e, r) {
        var s, u = a.p(e), o = "set" + (this.$u ? "UTC" : ""), f = (s = {}, s[h] = o + "Date", s[U] = o + "Date", s[D] = o + "Month", s[w] = o + "FullYear", s[c] = o + "Hours", s[y] = o + "Minutes", s[T] = o + "Seconds", s[P] = o + "Milliseconds", s)[u], g = u === h ? this.$D + (r - this.$W) : r;
        if (u === D || u === w) {
          var p = this.clone().set(U, 1);
          p.$d[f](g), p.init(), this.$d = p.set(U, Math.min(this.$D, p.daysInMonth())).$d;
        } else
          f && this.$d[f](g);
        return this.init(), this;
      }, n.set = function(e, r) {
        return this.clone().$set(e, r);
      }, n.get = function(e) {
        return this[a.p(e)]();
      }, n.add = function(e, r) {
        var s, u = this;
        e = Number(e);
        var o = a.p(r), f = function(S) {
          var B = m(u);
          return a.w(B.date(B.date() + Math.round(S * e)), u);
        };
        if (o === D)
          return this.set(D, this.$M + e);
        if (o === w)
          return this.set(w, this.$y + e);
        if (o === h)
          return f(1);
        if (o === k)
          return f(7);
        var g = (s = {}, s[y] = _, s[c] = J, s[T] = $, s)[o] || 1, p = this.$d.getTime() + e * g;
        return a.w(p, this);
      }, n.subtract = function(e, r) {
        return this.add(-1 * e, r);
      }, n.format = function(e) {
        var r = this, s = this.$locale();
        if (!this.isValid())
          return s.invalidDate || i;
        var u = e || "YYYY-MM-DDTHH:mm:ssZ", o = a.z(this), f = this.$H, g = this.$m, p = this.$M, S = s.weekdays, B = s.months, W = function(C, z, et, X) {
          return C && (C[z] || C(r, u)) || et[z].slice(0, X);
        }, Q = function(C) {
          return a.s(f % 12 || 12, C, "0");
        }, R = s.meridiem || function(C, z, et) {
          var X = C < 12 ? "AM" : "PM";
          return et ? X.toLowerCase() : X;
        }, G = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: p + 1, MM: a.s(p + 1, 2, "0"), MMM: W(s.monthsShort, p, B, 3), MMMM: W(B, p), D: this.$D, DD: a.s(this.$D, 2, "0"), d: String(this.$W), dd: W(s.weekdaysMin, this.$W, S, 2), ddd: W(s.weekdaysShort, this.$W, S, 3), dddd: S[this.$W], H: String(f), HH: a.s(f, 2, "0"), h: Q(1), hh: Q(2), a: R(f, g, !0), A: R(f, g, !1), m: String(g), mm: a.s(g, 2, "0"), s: String(this.$s), ss: a.s(this.$s, 2, "0"), SSS: a.s(this.$ms, 3, "0"), Z: o };
        return u.replace(L, function(C, z) {
          return z || G[C] || o.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(e, r, s) {
        var u, o = a.p(r), f = m(e), g = (f.utcOffset() - this.utcOffset()) * _, p = this - f, S = a.m(this, f);
        return S = (u = {}, u[w] = S / 12, u[D] = S, u[M] = S / 3, u[k] = (p - g) / 6048e5, u[h] = (p - g) / 864e5, u[c] = p / J, u[y] = p / _, u[T] = p / $, u)[o] || p, s ? S : a.a(S);
      }, n.daysInMonth = function() {
        return this.endOf(D).$D;
      }, n.$locale = function() {
        return Y[this.$L];
      }, n.locale = function(e, r) {
        if (!e)
          return this.$L;
        var s = this.clone(), u = j(e, r, !0);
        return u && (s.$L = u), s;
      }, n.clone = function() {
        return a.w(this.$d, this);
      }, n.toDate = function() {
        return new Date(this.valueOf());
      }, n.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, n.toISOString = function() {
        return this.$d.toISOString();
      }, n.toString = function() {
        return this.$d.toUTCString();
      }, t;
    }(), d = l.prototype;
    return m.prototype = d, [["$ms", P], ["$s", T], ["$m", y], ["$H", c], ["$W", h], ["$M", D], ["$y", w], ["$D", U]].forEach(function(t) {
      d[t[1]] = function(n) {
        return this.$g(n, t[0], t[1]);
      };
    }), m.extend = function(t, n) {
      return t.$i || (t(n, l, m), t.$i = !0), m;
    }, m.locale = j, m.isDayjs = I, m.unix = function(t) {
      return m(1e3 * t);
    }, m.en = Y[H], m.Ls = Y, m.p = {}, m;
  });
})(ct);
var yt = ct.exports;
const ot = /* @__PURE__ */ ut(yt);
var dt = { exports: {} };
(function(E, tt) {
  (function($, _) {
    E.exports = _();
  })(lt, function() {
    var $ = "minute", _ = /[+-]\d\d(?::?\d\d)?/g, J = /([+-]|\d\d)/g;
    return function(P, T, y) {
      var c = T.prototype;
      y.utc = function(i) {
        var x = { date: i, utc: !0, args: arguments };
        return new T(x);
      }, c.utc = function(i) {
        var x = y(this.toDate(), { locale: this.$L, utc: !0 });
        return i ? x.add(this.utcOffset(), $) : x;
      }, c.local = function() {
        return y(this.toDate(), { locale: this.$L, utc: !1 });
      };
      var h = c.parse;
      c.parse = function(i) {
        i.utc && (this.$u = !0), this.$utils().u(i.$offset) || (this.$offset = i.$offset), h.call(this, i);
      };
      var k = c.init;
      c.init = function() {
        if (this.$u) {
          var i = this.$d;
          this.$y = i.getUTCFullYear(), this.$M = i.getUTCMonth(), this.$D = i.getUTCDate(), this.$W = i.getUTCDay(), this.$H = i.getUTCHours(), this.$m = i.getUTCMinutes(), this.$s = i.getUTCSeconds(), this.$ms = i.getUTCMilliseconds();
        } else
          k.call(this);
      };
      var D = c.utcOffset;
      c.utcOffset = function(i, x) {
        var L = this.$utils().u;
        if (L(i))
          return this.$u ? 0 : L(this.$offset) ? D.call(this) : this.$offset;
        if (typeof i == "string" && (i = function(H) {
          H === void 0 && (H = "");
          var Y = H.match(_);
          if (!Y)
            return null;
          var I = ("" + Y[0]).match(J) || ["-", 0, 0], j = I[0], m = 60 * +I[1] + +I[2];
          return m === 0 ? 0 : j === "+" ? m : -m;
        }(i), i === null))
          return this;
        var V = Math.abs(i) <= 16 ? 60 * i : i, b = this;
        if (x)
          return b.$offset = V, b.$u = i === 0, b;
        if (i !== 0) {
          var q = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (b = this.local().add(V + q, $)).$offset = V, b.$x.$localOffset = q;
        } else
          b = this.utc();
        return b;
      };
      var M = c.format;
      c.format = function(i) {
        var x = i || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return M.call(this, x);
      }, c.valueOf = function() {
        var i = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * i;
      }, c.isUTC = function() {
        return !!this.$u;
      }, c.toISOString = function() {
        return this.toDate().toISOString();
      }, c.toString = function() {
        return this.toDate().toUTCString();
      };
      var w = c.toDate;
      c.toDate = function(i) {
        return i === "s" && this.$offset ? y(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : w.call(this);
      };
      var U = c.diff;
      c.diff = function(i, x, L) {
        if (i && this.$u === i.$u)
          return U.call(this, i, x, L);
        var V = this.local(), b = y(i).local();
        return U.call(V, b, x, L);
      };
    };
  });
})(dt);
var bt = dt.exports;
const Dt = /* @__PURE__ */ ut(bt), Mt = { class: "form-control" }, St = { class: "label" }, Ot = { class: "label-text" }, xt = { class: "flex pl-2" }, Tt = { class: "ml-2 text-base" }, wt = { class: "form-control" }, Ct = { class: "label" }, Ut = { class: "label-text" }, Yt = { value: "" }, kt = ["value"], Ht = { class: "form-control" }, It = { class: "label" }, Lt = { class: "label-text" }, Vt = {
  key: 0,
  class: "text-xs"
}, Wt = ["disabled"], Nt = { value: "" }, jt = ["value"], Bt = { class: "form-control" }, zt = { class: "label" }, Ft = { class: "label-text" }, At = { class: "form-control" }, Et = { class: "label" }, Jt = { class: "label-text" }, Pt = { class: "input-group" }, Zt = ["placeholder"], qt = ["value"], Kt = /* @__PURE__ */ ft({
  __name: "Transfer",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    balances: Object,
    metadata: Object,
    params: String,
    locale: String
  },
  setup(E, { expose: tt }) {
    const $ = E;
    ot.extend(Dt);
    const _ = (a) => vt($.locale, a), J = Z(() => JSON.parse($.params || "{}")), P = J.value.chain_name, T = N(""), y = N(""), c = N(""), h = N(""), k = N(""), D = N([]), M = N(
      {}
    ), w = N(
      {}
    ), U = new _t(), i = Z(() => {
      var d, t;
      const a = ot().add(1, "hour"), l = new it($.metadata);
      return [
        {
          typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
          value: {
            sourcePort: ((d = M.value) == null ? void 0 : d.port_id) || "",
            sourceChannel: ((t = M.value) == null ? void 0 : t.channel_id) || "",
            token: l.displayToBase(h.value, {
              amount: String(T.value),
              denom: y.value
            }),
            sender: $.sender,
            receiver: c.value,
            timeoutTimestamp: String(a.utc().valueOf() * 1e6)
          }
        }
      ];
    }), x = Z(() => {
      const a = h.value.startsWith("ibc/");
      return a && (k.value = ""), a;
    });
    function L() {
      U.fetchIBCPathInfo(k.value).then((a) => {
        var l, d;
        a.chain_1.chain_name === P ? M.value = (l = a.channels.find(
          (t) => t.chain_1.port_id === "transfer"
        )) == null ? void 0 : l.chain_1 : M.value = (d = a.channels.find(
          (t) => t.chain_2.port_id === "transfer"
        )) == null ? void 0 : d.chain_2;
      });
    }
    function V() {
      const a = String(h.value).replace("ibc/", "");
      if (h.value.startsWith("ibc/"))
        if (w.value[h.value]) {
          const d = w.value[h.value].path.split("/");
          M.value = {
            channel_id: d[1],
            port_id: d[0]
          };
        } else
          pt($.endpoint, a).then((l) => {
            w.value[h.value] = l.denom_trace;
            const d = l.denom_trace.path.split("/");
            M.value = {
              channel_id: d[1],
              port_id: d[0]
            };
          });
    }
    const b = Z(() => {
      var d;
      const a = ((d = $.balances) == null ? void 0 : d.find((t) => t.denom === h.value)) || {
        amount: "0",
        denom: "-"
      }, l = new it($.metadata);
      return {
        base: a,
        display: l.baseToUnit(a, y.value)
      };
    }), q = Z(() => {
      var l;
      const a = new it($.metadata);
      return ((l = $.balances) == null ? void 0 : l.map((d) => ({
        base: d,
        display: a.baseToDisplay(d)
      }))) || [];
    }), H = Z(() => {
      if (!$.metadata || !$.metadata[h.value])
        return y.value = h.value, [{ denom: h.value, exponent: 0, aliases: [] }];
      const a = $.metadata[h.value].denom_units.sort(
        (l, d) => d.exponent - l.exponent
      );
      return a.length > 0 && (y.value = a[0].denom), a;
    }), Y = Z(() => {
      var d;
      let a = !0, l = "";
      return (!((d = M.value) != null && d.channel_id) || !M.value.port_id) && (a = !1, l = _("destination_chain_empty")), c.value || (a = !1, l = _("recipient_empty")), Number(T.value) > 0 || (a = !1, l = _("amount_greater_than_zero")), { ok: a, error: l };
    }), I = N(null);
    function j() {
      I.value && I.value.focus(), U.fetchIBCPaths().then((a) => {
        D.value = a.filter((l) => l.path.indexOf(P) > -1);
      }), $t($.endpoint).then((a) => {
        h.value = a.params.bond_denom;
      });
    }
    function m(a) {
      return String(a).substring(0, 10);
    }
    return tt({ msgs: i, isValid: Y, initial: j }), (a, l) => {
      var d;
      return F(), A("div", null, [
        v("div", Mt, [
          v("label", St, [
            v("span", Ot, O(_("sender")), 1)
          ]),
          v("div", xt, [
            ht(gt, {
              size: "small",
              address: E.sender
            }, null, 8, ["address"]),
            v("span", Tt, O(E.sender), 1)
          ])
        ]),
        v("div", wt, [
          v("label", Ct, [
            v("span", Ut, O(_("balances")), 1)
          ]),
          K(v("select", {
            "onUpdate:modelValue": l[0] || (l[0] = (t) => h.value = t),
            class: "select select-bordered rounded-full",
            onChange: V
          }, [
            v("option", Yt, O(_("select_token")), 1),
            (F(!0), A(st, null, at(q.value, ({ base: t, display: n }) => (F(), A("option", {
              key: t.denom,
              value: t.denom
            }, O(n.amount) + " " + O(m(n.denom)), 9, kt))), 128))
          ], 544), [
            [nt, h.value]
          ])
        ]),
        v("div", Ht, [
          v("label", It, [
            v("span", Lt, O(_("destination")), 1),
            M.value ? (F(), A("span", Vt, O(M.value.channel_id) + "/" + O(M.value.port_id), 1)) : mt("", !0)
          ]),
          K(v("select", {
            "onUpdate:modelValue": l[1] || (l[1] = (t) => k.value = t),
            class: "select select-bordered capitalize rounded-full",
            onChange: L,
            disabled: x.value
          }, [
            v("option", Nt, O(_("select_destination")), 1),
            (F(!0), A(st, null, at(D.value, (t) => (F(), A("option", {
              key: t.from,
              value: t.path
            }, O(t.from === J.value.chain_name ? t.to : t.from), 9, jt))), 128))
          ], 40, Wt), [
            [nt, k.value]
          ])
        ]),
        v("div", Bt, [
          v("label", zt, [
            v("span", Ft, O(_("recipient")), 1)
          ]),
          K(v("input", {
            "onUpdate:modelValue": l[2] || (l[2] = (t) => c.value = t),
            type: "text",
            class: "input border border-gray-300 dark:border-gray-600 rounded-full"
          }, null, 512), [
            [rt, c.value]
          ])
        ]),
        v("div", At, [
          v("label", Et, [
            v("span", Jt, O(_("amount")), 1),
            v("span", null, O(b.value.display.amount) + " " + O(m(b.value.display.denom)), 1)
          ]),
          v("label", Pt, [
            K(v("input", {
              "onUpdate:modelValue": l[3] || (l[3] = (t) => T.value = t),
              type: "number",
              placeholder: _("available") + `: ${(d = b.value) == null ? void 0 : d.display.amount}`,
              class: "input border border-gray-300 dark:border-gray-600 w-full"
            }, null, 8, Zt), [
              [rt, T.value]
            ]),
            K(v("select", {
              "onUpdate:modelValue": l[4] || (l[4] = (t) => y.value = t),
              class: "select select-bordered uppercase"
            }, [
              (F(!0), A(st, null, at(H.value, (t) => (F(), A("option", {
                key: t.denom,
                value: t.denom
              }, O(m(t.denom)), 9, qt))), 128))
            ], 512), [
              [nt, y.value]
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  Kt as default
};
