import { m as _, d as v, r as y, o as b, a as w, b as M, I as N } from "./main-3ba0e469.js";
var n = function(t) {
  t == null && (t = (/* @__PURE__ */ new Date()).getTime()), this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, t.constructor == Array ? this.init_by_array(t, t.length) : this.init_seed(t);
};
n.prototype.init_seed = function(t) {
  for (this.mt[0] = t >>> 0, this.mti = 1; this.mti < this.N; this.mti++) {
    var t = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
    this.mt[this.mti] = (((t & 4294901760) >>> 16) * 1812433253 << 16) + (t & 65535) * 1812433253 + this.mti, this.mt[this.mti] >>>= 0;
  }
};
n.prototype.init_by_array = function(t, s) {
  var i, e, r;
  for (this.init_seed(19650218), i = 1, e = 0, r = this.N > s ? this.N : s; r; r--) {
    var h = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
    this.mt[i] = (this.mt[i] ^ (((h & 4294901760) >>> 16) * 1664525 << 16) + (h & 65535) * 1664525) + t[e] + e, this.mt[i] >>>= 0, i++, e++, i >= this.N && (this.mt[0] = this.mt[this.N - 1], i = 1), e >= s && (e = 0);
  }
  for (r = this.N - 1; r; r--) {
    var h = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
    this.mt[i] = (this.mt[i] ^ (((h & 4294901760) >>> 16) * 1566083941 << 16) + (h & 65535) * 1566083941) - i, this.mt[i] >>>= 0, i++, i >= this.N && (this.mt[0] = this.mt[this.N - 1], i = 1);
  }
  this.mt[0] = 2147483648;
};
n.prototype.random_int = function() {
  var t, s = new Array(0, this.MATRIX_A);
  if (this.mti >= this.N) {
    var i;
    for (this.mti == this.N + 1 && this.init_seed(5489), i = 0; i < this.N - this.M; i++)
      t = this.mt[i] & this.UPPER_MASK | this.mt[i + 1] & this.LOWER_MASK, this.mt[i] = this.mt[i + this.M] ^ t >>> 1 ^ s[t & 1];
    for (; i < this.N - 1; i++)
      t = this.mt[i] & this.UPPER_MASK | this.mt[i + 1] & this.LOWER_MASK, this.mt[i] = this.mt[i + (this.M - this.N)] ^ t >>> 1 ^ s[t & 1];
    t = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ t >>> 1 ^ s[t & 1], this.mti = 0;
  }
  return t = this.mt[this.mti++], t ^= t >>> 11, t ^= t << 7 & 2636928640, t ^= t << 15 & 4022730752, t ^= t >>> 18, t >>> 0;
};
n.prototype.random_int31 = function() {
  return this.random_int() >>> 1;
};
n.prototype.random_incl = function() {
  return this.random_int() * (1 / 4294967295);
};
n.prototype.random = function() {
  return this.random_int() * (1 / 4294967296);
};
n.prototype.random_excl = function() {
  return (this.random_int() + 0.5) * (1 / 4294967296);
};
n.prototype.random_long = function() {
  var t = this.random_int() >>> 5, s = this.random_int() >>> 6;
  return (t * 67108864 + s) * (1 / 9007199254740992);
};
var S = n;
const A = /* @__PURE__ */ _(S), $ = [
  "rgb(244, 67, 54)",
  "rgb(233, 30, 99)",
  "rgb(156, 39, 176)",
  "rgb(103, 58, 183)",
  "rgb(63, 81, 181)",
  "rgb(33, 150, 243)",
  "rgb(3, 169, 244)",
  "rgb(0, 188, 212)",
  "rgb(0, 150, 136)",
  "rgb(76, 175, 80)",
  "rgb(139, 195, 74)",
  "rgb(205, 220, 57)",
  "rgb(255, 193, 7)",
  "rgb(255, 152, 0)",
  "rgb(255, 87, 34)"
], E = function(t) {
  if (t.length === 0)
    return 0;
  let s = 0;
  for (let i = 0; i < t.length; i++)
    s = s * 31 + t.charCodeAt(i), s = s % 2 ** 32;
  return s;
};
function R(t, s) {
  s = s || $;
  const i = E(t), e = new A(i);
  s = s.slice();
  const r = () => {
    const o = Math.floor(s.length * e.random());
    return s.splice(o, 1)[0];
  }, h = `<rect fill="${r()}" width="100" height="100"/>`, l = "<style>.picasso circle{mix-blend-mode:soft-light;}</style>";
  let a = "";
  const d = 3, f = [35, 40, 45, 50, 55, 60], m = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], c = [30, 40, 50, 60, 70];
  for (let o = 0; o < d; o++) {
    const u = f.splice(Math.floor(f.length * e.random()), 1)[0], g = m.splice(Math.floor(m.length * e.random()), 1)[0], p = c.splice(Math.floor(c.length * e.random()), 1)[0], x = r();
    a += `<circle r="${u}" cx="${g}" cy="${p}" fill="${x}"/>`;
  }
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="picasso" width="100" height="100" viewBox="0 0 100 100">${l}${h}${a}</svg>`;
}
const K = v({
  props: {
    address: {
      type: String,
      required: !0
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
    },
    size: {
      type: String,
      default: "",
      validator: (t) => ["small", "medium", "large", ""].includes(t)
    }
  },
  setup(t) {
    const s = y({
      overflow: "hidden",
      background: "",
      backgroundSize: "cover"
    });
    return b(() => {
      const i = R(t.address);
      switch (s.value.background = `no-repeat url('data:image/svg+xml;utf8,${i}')`, t.size) {
        case "small":
          s.value.width = "24px", s.value.height = "24px";
          break;
        case "medium":
          s.value.width = "50px", s.value.height = "50px";
          break;
        case "large":
          s.value.width = "80px", s.value.height = "80px";
          break;
        default:
          s.value.width = t.width, s.value.height = t.height;
          break;
      }
    }), { iconStyle: s };
  }
}), P = (t, s) => {
  const i = t.__vccOpts || t;
  for (const [e, r] of s)
    i[e] = r;
  return i;
};
function C(t, s, i, e, r, h) {
  return w(), M("div", {
    ref: "iconContainer",
    class: "rounded-full",
    style: N(t.iconStyle)
  }, null, 4);
}
const T = /* @__PURE__ */ P(K, [["render", C]]);
export {
  T as I
};
