import { d as Sr, r as rr, c as br, o as mr, a as xr, b as u, w as Q, k as Y, g as Br, n as Nr } from "./main-e92b1fb4.js";
var B = Uint8Array, C = Uint16Array, ur = Int32Array, cr = new B([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), dr = new B([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), _r = new B([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Cr = function(r, e) {
  for (var a = new C(31), n = 0; n < 31; ++n)
    a[n] = e += 1 << r[n - 1];
  for (var t = new ur(a[30]), n = 1; n < 30; ++n)
    for (var l = a[n]; l < a[n + 1]; ++l)
      t[l] = l - a[n] << 5 | n;
  return { b: a, r: t };
}, Ur = Cr(cr, 2), Tr = Ur.b, vr = Ur.r;
Tr[28] = 258, vr[258] = 28;
var qr = Cr(dr, 0), Mr = qr.r, sr = new C(32768);
for (var h = 0; h < 32768; ++h) {
  var P = (h & 43690) >> 1 | (h & 21845) << 1;
  P = (P & 52428) >> 2 | (P & 13107) << 2, P = (P & 61680) >> 4 | (P & 3855) << 4, sr[h] = ((P & 65280) >> 8 | (P & 255) << 8) >> 1;
}
var j = function(r, e, a) {
  for (var n = r.length, t = 0, l = new C(e); t < n; ++t)
    r[t] && ++l[r[t] - 1];
  var v = new C(e);
  for (t = 1; t < e; ++t)
    v[t] = v[t - 1] + l[t - 1] << 1;
  var d;
  if (a) {
    d = new C(1 << e);
    var w = 15 - e;
    for (t = 0; t < n; ++t)
      if (r[t])
        for (var y = t << 4 | r[t], o = e - r[t], g = v[r[t] - 1]++ << o, f = g | (1 << o) - 1; g <= f; ++g)
          d[sr[g] >> w] = y;
  } else
    for (d = new C(n), t = 0; t < n; ++t)
      r[t] && (d[t] = sr[v[r[t] - 1]++] >> 15 - r[t]);
  return d;
}, O = new B(288);
for (var h = 0; h < 144; ++h)
  O[h] = 8;
for (var h = 144; h < 256; ++h)
  O[h] = 9;
for (var h = 256; h < 280; ++h)
  O[h] = 7;
for (var h = 280; h < 288; ++h)
  O[h] = 8;
var er = new B(32);
for (var h = 0; h < 32; ++h)
  er[h] = 5;
var Dr = /* @__PURE__ */ j(O, 9, 0), Er = /* @__PURE__ */ j(er, 5, 0), kr = function(r) {
  return (r + 7) / 8 | 0;
}, Rr = function(r, e, a) {
  (e == null || e < 0) && (e = 0), (a == null || a > r.length) && (a = r.length);
  var n = new B(a - e);
  return n.set(r.subarray(e, a)), n;
}, E = function(r, e, a) {
  a <<= e & 7;
  var n = e / 8 | 0;
  r[n] |= a, r[n + 1] |= a >> 8;
}, Z = function(r, e, a) {
  a <<= e & 7;
  var n = e / 8 | 0;
  r[n] |= a, r[n + 1] |= a >> 8, r[n + 2] |= a >> 16;
}, or = function(r, e) {
  for (var a = [], n = 0; n < r.length; ++n)
    r[n] && a.push({ s: n, f: r[n] });
  var t = a.length, l = a.slice();
  if (!t)
    return { t: Fr, l: 0 };
  if (t == 1) {
    var v = new B(a[0].s + 1);
    return v[a[0].s] = 1, { t: v, l: 1 };
  }
  a.sort(function(U, z) {
    return U.f - z.f;
  }), a.push({ s: -1, f: 25001 });
  var d = a[0], w = a[1], y = 0, o = 1, g = 2;
  for (a[0] = { s: -1, f: d.f + w.f, l: d, r: w }; o != t - 1; )
    d = a[a[y].f < a[g].f ? y++ : g++], w = a[y != o && a[y].f < a[g].f ? y++ : g++], a[o++] = { s: -1, f: d.f + w.f, l: d, r: w };
  for (var f = l[0].s, n = 1; n < t; ++n)
    l[n].s > f && (f = l[n].s);
  var i = new C(f + 1), _ = fr(a[o - 1], i, 0);
  if (_ > e) {
    var n = 0, m = 0, R = _ - e, G = 1 << R;
    for (l.sort(function(z, M) {
      return i[M.s] - i[z.s] || z.f - M.f;
    }); n < t; ++n) {
      var D = l[n].s;
      if (i[D] > e)
        m += G - (1 << _ - i[D]), i[D] = e;
      else
        break;
    }
    for (m >>= R; m > 0; ) {
      var L = l[n].s;
      i[L] < e ? m -= 1 << e - i[L]++ - 1 : ++n;
    }
    for (; n >= 0 && m; --n) {
      var k = l[n].s;
      i[k] == e && (--i[k], ++m);
    }
    _ = e;
  }
  return { t: new B(i), l: _ };
}, fr = function(r, e, a) {
  return r.s == -1 ? Math.max(fr(r.l, e, a + 1), fr(r.r, e, a + 1)) : e[r.s] = a;
}, pr = function(r) {
  for (var e = r.length; e && !r[--e]; )
    ;
  for (var a = new C(++e), n = 0, t = r[0], l = 1, v = function(w) {
    a[n++] = w;
  }, d = 1; d <= e; ++d)
    if (r[d] == t && d != e)
      ++l;
    else {
      if (!t && l > 2) {
        for (; l > 138; l -= 138)
          v(32754);
        l > 2 && (v(l > 10 ? l - 11 << 5 | 28690 : l - 3 << 5 | 12305), l = 0);
      } else if (l > 3) {
        for (v(t), --l; l > 6; l -= 6)
          v(8304);
        l > 2 && (v(l - 3 << 5 | 8208), l = 0);
      }
      for (; l--; )
        v(t);
      l = 1, t = r[d];
    }
  return { c: a.subarray(0, n), n: e };
}, $ = function(r, e) {
  for (var a = 0, n = 0; n < e.length; ++n)
    a += r[n] * e[n];
  return a;
}, zr = function(r, e, a) {
  var n = a.length, t = kr(e + 2);
  r[t] = n & 255, r[t + 1] = n >> 8, r[t + 2] = r[t] ^ 255, r[t + 3] = r[t + 1] ^ 255;
  for (var l = 0; l < n; ++l)
    r[t + l + 4] = a[l];
  return (t + 4 + n) * 8;
}, Ar = function(r, e, a, n, t, l, v, d, w, y, o) {
  E(e, o++, a), ++t[256];
  for (var g = or(t, 15), f = g.t, i = g.l, _ = or(l, 15), m = _.t, R = _.l, G = pr(f), D = G.c, L = G.n, k = pr(m), U = k.c, z = k.n, M = new C(19), c = 0; c < D.length; ++c)
    ++M[D[c] & 31];
  for (var c = 0; c < U.length; ++c)
    ++M[U[c] & 31];
  for (var s = or(M, 7), p = s.t, W = s.l, A = 19; A > 4 && !p[_r[A - 1]]; --A)
    ;
  var H = y + 5 << 3, F = $(t, O) + $(l, er) + v, V = $(t, f) + $(l, m) + v + 14 + 3 * A + $(M, p) + 2 * M[16] + 3 * M[17] + 7 * M[18];
  if (w >= 0 && H <= F && H <= V)
    return zr(e, o, r.subarray(w, w + y));
  var N, b, S, I;
  if (E(e, o, 1 + (V < F)), o += 2, V < F) {
    N = j(f, i, 0), b = f, S = j(m, R, 0), I = m;
    var ar = j(p, W, 0);
    E(e, o, L - 257), E(e, o + 5, z - 1), E(e, o + 10, A - 4), o += 14;
    for (var c = 0; c < A; ++c)
      E(e, o + 3 * c, p[_r[c]]);
    o += 3 * A;
    for (var T = [D, U], X = 0; X < 2; ++X)
      for (var J = T[X], c = 0; c < J.length; ++c) {
        var q = J[c] & 31;
        E(e, o, ar[q]), o += p[q], q > 15 && (E(e, o, J[c] >> 5 & 127), o += J[c] >> 12);
      }
  } else
    N = Dr, b = O, S = Er, I = er;
  for (var c = 0; c < d; ++c) {
    var x = n[c];
    if (x > 255) {
      var q = x >> 18 & 31;
      Z(e, o, N[q + 257]), o += b[q + 257], q > 7 && (E(e, o, x >> 23 & 31), o += cr[q]);
      var K = x & 31;
      Z(e, o, S[K]), o += I[K], K > 3 && (Z(e, o, x >> 5 & 8191), o += dr[K]);
    } else
      Z(e, o, N[x]), o += b[x];
  }
  return Z(e, o, N[256]), o + b[256];
}, Ir = /* @__PURE__ */ new ur([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Fr = /* @__PURE__ */ new B(0), Pr = function(r, e, a, n, t, l) {
  var v = l.z || r.length, d = new B(n + v + 5 * (1 + Math.ceil(v / 7e3)) + t), w = d.subarray(n, d.length - t), y = l.l, o = (l.r || 0) & 7;
  if (e) {
    o && (w[0] = l.r >> 3);
    for (var g = Ir[e - 1], f = g >> 13, i = g & 8191, _ = (1 << a) - 1, m = l.p || new C(32768), R = l.h || new C(_ + 1), G = Math.ceil(a / 3), D = 2 * G, L = function(tr) {
      return (r[tr] ^ r[tr + 1] << G ^ r[tr + 2] << D) & _;
    }, k = new ur(25e3), U = new C(288), z = new C(32), M = 0, c = 0, s = l.i || 0, p = 0, W = l.w || 0, A = 0; s + 2 < v; ++s) {
      var H = L(s), F = s & 32767, V = R[H];
      if (m[F] = V, R[H] = F, W <= s) {
        var N = v - s;
        if ((M > 7e3 || p > 24576) && (N > 423 || !y)) {
          o = Ar(r, w, 0, k, U, z, c, p, A, s - A, o), p = M = c = 0, A = s;
          for (var b = 0; b < 286; ++b)
            U[b] = 0;
          for (var b = 0; b < 30; ++b)
            z[b] = 0;
        }
        var S = 2, I = 0, ar = i, T = F - V & 32767;
        if (N > 2 && H == L(s - T))
          for (var X = Math.min(f, N) - 1, J = Math.min(32767, s), q = Math.min(258, N); T <= J && --ar && F != V; ) {
            if (r[s + S] == r[s + S - T]) {
              for (var x = 0; x < q && r[s + x] == r[s + x - T]; ++x)
                ;
              if (x > S) {
                if (S = x, I = T, x > X)
                  break;
                for (var K = Math.min(T, x - 2), hr = 0, b = 0; b < K; ++b) {
                  var nr = s - T + b & 32767, Vr = m[nr], wr = nr - Vr & 32767;
                  wr > hr && (hr = wr, V = nr);
                }
              }
            }
            F = V, V = m[F], T += F - V & 32767;
          }
        if (I) {
          k[p++] = 268435456 | vr[S] << 18 | Mr[I];
          var gr = vr[S] & 31, yr = Mr[I] & 31;
          c += cr[gr] + dr[yr], ++U[257 + gr], ++z[yr], W = s + S, ++M;
        } else
          k[p++] = r[s], ++U[r[s]];
      }
    }
    for (s = Math.max(s, W); s < v; ++s)
      k[p++] = r[s], ++U[r[s]];
    o = Ar(r, w, y, k, U, z, c, p, A, s - A, o), y || (l.r = o & 7 | w[o / 8 | 0] << 3, o -= 7, l.h = R, l.p = m, l.i = s, l.w = W);
  } else {
    for (var s = l.w || 0; s < v + y; s += 65535) {
      var lr = s + 65535;
      lr >= v && (w[o / 8 | 0] = y, lr = v), o = zr(w, o + 1, r.subarray(s, lr));
    }
    l.i = v;
  }
  return Rr(d, 0, n + kr(o) + t);
}, Gr = /* @__PURE__ */ function() {
  for (var r = new Int32Array(256), e = 0; e < 256; ++e) {
    for (var a = e, n = 9; --n; )
      a = (a & 1 && -306674912) ^ a >>> 1;
    r[e] = a;
  }
  return r;
}(), Lr = function() {
  var r = -1;
  return {
    p: function(e) {
      for (var a = r, n = 0; n < e.length; ++n)
        a = Gr[a & 255 ^ e[n]] ^ a >>> 8;
      r = a;
    },
    d: function() {
      return ~r;
    }
  };
}, Or = function(r, e, a, n, t) {
  if (!t && (t = { l: 1 }, e.dictionary)) {
    var l = e.dictionary.subarray(-32768), v = new B(l.length + r.length);
    v.set(l), v.set(r, l.length), r = v, t.w = l.length;
  }
  return Pr(r, e.level == null ? 6 : e.level, e.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(r.length))) * 1.5) : 12 + e.mem, a, n, t);
}, ir = function(r, e, a) {
  for (; a; ++e)
    r[e] = a, a >>>= 8;
}, Wr = function(r, e) {
  var a = e.filename;
  if (r[0] = 31, r[1] = 139, r[2] = 8, r[8] = e.level < 2 ? 4 : e.level == 9 ? 2 : 0, r[9] = 3, e.mtime != 0 && ir(r, 4, Math.floor(new Date(e.mtime || Date.now()) / 1e3)), a) {
    r[3] = 8;
    for (var n = 0; n <= a.length; ++n)
      r[n + 10] = a.charCodeAt(n);
  }
}, Hr = function(r) {
  return 10 + (r.filename ? r.filename.length + 1 : 0);
};
function Jr(r, e) {
  e || (e = {});
  var a = Lr(), n = r.length;
  a.p(r);
  var t = Or(r, e, Hr(e), 8), l = t.length;
  return Wr(t, e), ir(t, l - 8, a.d()), ir(t, l - 4, n), t;
}
var Kr = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), Qr = 0;
try {
  Kr.decode(Fr, { stream: !0 }), Qr = 1;
} catch {
}
const Xr = { class: "form-control" }, Yr = /* @__PURE__ */ u("label", { class: "label" }, [
  /* @__PURE__ */ u("span", { class: "label-text" }, "Sender")
], -1), Zr = ["value"], $r = { class: "form-control" }, jr = /* @__PURE__ */ u("label", { class: "label" }, [
  /* @__PURE__ */ u("span", { class: "label-text" }, "Permission")
], -1), re = { class: "flex" }, ee = /* @__PURE__ */ u("label", { for: "nobody" }, "Nobody", -1), ae = /* @__PURE__ */ u("label", { for: "everyone" }, "Everybody", -1), ne = /* @__PURE__ */ u("label", { for: "anyofaddress" }, "Any Of addresses", -1), le = {
  key: 0,
  class: "form-control"
}, te = /* @__PURE__ */ u("label", { class: "label" }, [
  /* @__PURE__ */ u("span", { class: "label-text" }, "Addresses")
], -1), oe = { class: "form-control" }, ve = /* @__PURE__ */ u("label", { class: "label" }, [
  /* @__PURE__ */ u("span", { class: "label-text" }, "Compressing")
], -1), se = { class: "flex" }, fe = /* @__PURE__ */ u("label", { for: "raw" }, "Raw", -1), ie = /* @__PURE__ */ u("label", { for: "gzip" }, "Gzip", -1), ue = { class: "form-control" }, ce = /* @__PURE__ */ u("label", { class: "label" }, [
  /* @__PURE__ */ u("span", { class: "label-text" }, "Contract")
], -1), he = /* @__PURE__ */ Sr({
  __name: "StoreCode",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String
  },
  setup(r, { expose: e }) {
    const a = r, n = rr(new Uint8Array()), t = rr(""), l = rr("3"), v = rr("gzip");
    function d(g) {
      const f = g.target.files[0];
      if (f) {
        var i = new FileReader();
        i.addEventListener("load", (_) => {
          _.target && (v.value === "gzip" && (n.value = Jr(
            new Uint8Array(_.target.result)
          )), n.value = new Uint8Array(_.target.result));
        }), i.readAsArrayBuffer(f);
      }
    }
    const w = br(() => [
      {
        typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode",
        value: {
          sender: a.sender,
          wasmByteCode: n.value,
          instantiatePermission: {
            permission: l.value,
            addresses: t.value.split(",")
          }
        }
      }
    ]), y = br(() => {
      let g = !0, f = "";
      return n.value.length < 1 && (g = !1, f = "No contract is selected"), { ok: g, error: f };
    });
    function o() {
    }
    return e({ msgs: w, isValid: y, initial: o }), (g, f) => (mr(), xr("div", null, [
      u("div", Xr, [
        Yr,
        u("input", {
          value: r.sender,
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 8, Zr)
      ]),
      u("div", $r, [
        jr,
        u("div", re, [
          Q(u("input", {
            "onUpdate:modelValue": f[0] || (f[0] = (i) => l.value = i),
            type: "radio",
            id: "nobody",
            value: "1",
            class: "radio radio-error mx-2"
          }, null, 512), [
            [Y, l.value]
          ]),
          ee,
          Q(u("input", {
            "onUpdate:modelValue": f[1] || (f[1] = (i) => l.value = i),
            type: "radio",
            id: "everyone",
            value: "3",
            class: "radio radio-success mx-2"
          }, null, 512), [
            [Y, l.value]
          ]),
          ae,
          Q(u("input", {
            "onUpdate:modelValue": f[2] || (f[2] = (i) => l.value = i),
            type: "radio",
            id: "anyofaddress",
            value: "4",
            class: "radio radio-success mx-2"
          }, null, 512), [
            [Y, l.value]
          ]),
          ne
        ])
      ]),
      l.value === "4" ? (mr(), xr("div", le, [
        te,
        Q(u("input", {
          "onUpdate:modelValue": f[3] || (f[3] = (i) => t.value = i),
          type: "text",
          placeholder: "use ',' for addresses",
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 512), [
          [Br, t.value]
        ])
      ])) : Nr("", !0),
      u("div", oe, [
        ve,
        u("div", se, [
          Q(u("input", {
            "onUpdate:modelValue": f[4] || (f[4] = (i) => v.value = i),
            type: "radio",
            id: "raw",
            value: "raw",
            class: "radio mx-2"
          }, null, 512), [
            [Y, v.value]
          ]),
          fe,
          Q(u("input", {
            "onUpdate:modelValue": f[5] || (f[5] = (i) => v.value = i),
            type: "radio",
            id: "gzip",
            value: "gzip",
            class: "radio mx-2"
          }, null, 512), [
            [Y, v.value]
          ]),
          ie
        ])
      ]),
      u("div", ue, [
        ce,
        u("input", {
          type: "file",
          class: "file-input",
          onChange: d
        }, null, 32)
      ])
    ]));
  }
});
export {
  he as default
};
