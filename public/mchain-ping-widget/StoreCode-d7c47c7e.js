import { d as Sr, r as rr, c as br, o as Br, a as mr, b as xr, e as u, w as Q, l as Y, h as Nr, p as Tr } from "./main-8a9bf3b2.js";
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
  for (var l = new ur(a[30]), n = 1; n < 30; ++n)
    for (var t = a[n]; t < a[n + 1]; ++t)
      l[t] = t - a[n] << 5 | n;
  return { b: a, r: l };
}, Ur = Cr(cr, 2), qr = Ur.b, vr = Ur.r;
qr[28] = 258, vr[258] = 28;
var Dr = Cr(dr, 0), Mr = Dr.r, sr = new C(32768);
for (var h = 0; h < 32768; ++h) {
  var P = (h & 43690) >> 1 | (h & 21845) << 1;
  P = (P & 52428) >> 2 | (P & 13107) << 2, P = (P & 61680) >> 4 | (P & 3855) << 4, sr[h] = ((P & 65280) >> 8 | (P & 255) << 8) >> 1;
}
var j = function(r, e, a) {
  for (var n = r.length, l = 0, t = new C(e); l < n; ++l)
    r[l] && ++t[r[l] - 1];
  var v = new C(e);
  for (l = 1; l < e; ++l)
    v[l] = v[l - 1] + t[l - 1] << 1;
  var i;
  if (a) {
    i = new C(1 << e);
    var w = 15 - e;
    for (l = 0; l < n; ++l)
      if (r[l])
        for (var y = l << 4 | r[l], o = e - r[l], m = v[r[l] - 1]++ << o, b = m | (1 << o) - 1; m <= b; ++m)
          i[sr[m] >> w] = y;
  } else
    for (i = new C(n), l = 0; l < n; ++l)
      r[l] && (i[l] = sr[v[r[l] - 1]++] >> 15 - r[l]);
  return i;
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
var Er = /* @__PURE__ */ j(O, 9, 0), Rr = /* @__PURE__ */ j(er, 5, 0), zr = function(r) {
  return (r + 7) / 8 | 0;
}, Ir = function(r, e, a) {
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
  var l = a.length, t = a.slice();
  if (!l)
    return { t: Fr, l: 0 };
  if (l == 1) {
    var v = new B(a[0].s + 1);
    return v[a[0].s] = 1, { t: v, l: 1 };
  }
  a.sort(function(U, k) {
    return U.f - k.f;
  }), a.push({ s: -1, f: 25001 });
  var i = a[0], w = a[1], y = 0, o = 1, m = 2;
  for (a[0] = { s: -1, f: i.f + w.f, l: i, r: w }; o != l - 1; )
    i = a[a[y].f < a[m].f ? y++ : m++], w = a[y != o && a[y].f < a[m].f ? y++ : m++], a[o++] = { s: -1, f: i.f + w.f, l: i, r: w };
  for (var b = t[0].s, n = 1; n < l; ++n)
    t[n].s > b && (b = t[n].s);
  var s = new C(b + 1), d = fr(a[o - 1], s, 0);
  if (d > e) {
    var n = 0, g = 0, R = d - e, G = 1 << R;
    for (t.sort(function(k, M) {
      return s[M.s] - s[k.s] || k.f - M.f;
    }); n < l; ++n) {
      var D = t[n].s;
      if (s[D] > e)
        g += G - (1 << d - s[D]), s[D] = e;
      else
        break;
    }
    for (g >>= R; g > 0; ) {
      var L = t[n].s;
      s[L] < e ? g -= 1 << e - s[L]++ - 1 : ++n;
    }
    for (; n >= 0 && g; --n) {
      var z = t[n].s;
      s[z] == e && (--s[z], ++g);
    }
    d = e;
  }
  return { t: new B(s), l: d };
}, fr = function(r, e, a) {
  return r.s == -1 ? Math.max(fr(r.l, e, a + 1), fr(r.r, e, a + 1)) : e[r.s] = a;
}, pr = function(r) {
  for (var e = r.length; e && !r[--e]; )
    ;
  for (var a = new C(++e), n = 0, l = r[0], t = 1, v = function(w) {
    a[n++] = w;
  }, i = 1; i <= e; ++i)
    if (r[i] == l && i != e)
      ++t;
    else {
      if (!l && t > 2) {
        for (; t > 138; t -= 138)
          v(32754);
        t > 2 && (v(t > 10 ? t - 11 << 5 | 28690 : t - 3 << 5 | 12305), t = 0);
      } else if (t > 3) {
        for (v(l), --t; t > 6; t -= 6)
          v(8304);
        t > 2 && (v(t - 3 << 5 | 8208), t = 0);
      }
      for (; t--; )
        v(l);
      t = 1, l = r[i];
    }
  return { c: a.subarray(0, n), n: e };
}, $ = function(r, e) {
  for (var a = 0, n = 0; n < e.length; ++n)
    a += r[n] * e[n];
  return a;
}, kr = function(r, e, a) {
  var n = a.length, l = zr(e + 2);
  r[l] = n & 255, r[l + 1] = n >> 8, r[l + 2] = r[l] ^ 255, r[l + 3] = r[l + 1] ^ 255;
  for (var t = 0; t < n; ++t)
    r[l + t + 4] = a[t];
  return (l + 4 + n) * 8;
}, Ar = function(r, e, a, n, l, t, v, i, w, y, o) {
  E(e, o++, a), ++l[256];
  for (var m = or(l, 15), b = m.t, s = m.l, d = or(t, 15), g = d.t, R = d.l, G = pr(b), D = G.c, L = G.n, z = pr(g), U = z.c, k = z.n, M = new C(19), c = 0; c < D.length; ++c)
    ++M[D[c] & 31];
  for (var c = 0; c < U.length; ++c)
    ++M[U[c] & 31];
  for (var f = or(M, 7), p = f.t, W = f.l, A = 19; A > 4 && !p[_r[A - 1]]; --A)
    ;
  var H = y + 5 << 3, F = $(l, O) + $(t, er) + v, V = $(l, b) + $(t, g) + v + 14 + 3 * A + $(M, p) + 2 * M[16] + 3 * M[17] + 7 * M[18];
  if (w >= 0 && H <= F && H <= V)
    return kr(e, o, r.subarray(w, w + y));
  var N, x, S, I;
  if (E(e, o, 1 + (V < F)), o += 2, V < F) {
    N = j(b, s, 0), x = b, S = j(g, R, 0), I = g;
    var ar = j(p, W, 0);
    E(e, o, L - 257), E(e, o + 5, k - 1), E(e, o + 10, A - 4), o += 14;
    for (var c = 0; c < A; ++c)
      E(e, o + 3 * c, p[_r[c]]);
    o += 3 * A;
    for (var T = [D, U], X = 0; X < 2; ++X)
      for (var J = T[X], c = 0; c < J.length; ++c) {
        var q = J[c] & 31;
        E(e, o, ar[q]), o += p[q], q > 15 && (E(e, o, J[c] >> 5 & 127), o += J[c] >> 12);
      }
  } else
    N = Er, x = O, S = Rr, I = er;
  for (var c = 0; c < i; ++c) {
    var _ = n[c];
    if (_ > 255) {
      var q = _ >> 18 & 31;
      Z(e, o, N[q + 257]), o += x[q + 257], q > 7 && (E(e, o, _ >> 23 & 31), o += cr[q]);
      var K = _ & 31;
      Z(e, o, S[K]), o += I[K], K > 3 && (Z(e, o, _ >> 5 & 8191), o += dr[K]);
    } else
      Z(e, o, N[_]), o += x[_];
  }
  return Z(e, o, N[256]), o + x[256];
}, Pr = /* @__PURE__ */ new ur([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Fr = /* @__PURE__ */ new B(0), Gr = function(r, e, a, n, l, t) {
  var v = t.z || r.length, i = new B(n + v + 5 * (1 + Math.ceil(v / 7e3)) + l), w = i.subarray(n, i.length - l), y = t.l, o = (t.r || 0) & 7;
  if (e) {
    o && (w[0] = t.r >> 3);
    for (var m = Pr[e - 1], b = m >> 13, s = m & 8191, d = (1 << a) - 1, g = t.p || new C(32768), R = t.h || new C(d + 1), G = Math.ceil(a / 3), D = 2 * G, L = function(tr) {
      return (r[tr] ^ r[tr + 1] << G ^ r[tr + 2] << D) & d;
    }, z = new ur(25e3), U = new C(288), k = new C(32), M = 0, c = 0, f = t.i || 0, p = 0, W = t.w || 0, A = 0; f + 2 < v; ++f) {
      var H = L(f), F = f & 32767, V = R[H];
      if (g[F] = V, R[H] = F, W <= f) {
        var N = v - f;
        if ((M > 7e3 || p > 24576) && (N > 423 || !y)) {
          o = Ar(r, w, 0, z, U, k, c, p, A, f - A, o), p = M = c = 0, A = f;
          for (var x = 0; x < 286; ++x)
            U[x] = 0;
          for (var x = 0; x < 30; ++x)
            k[x] = 0;
        }
        var S = 2, I = 0, ar = s, T = F - V & 32767;
        if (N > 2 && H == L(f - T))
          for (var X = Math.min(b, N) - 1, J = Math.min(32767, f), q = Math.min(258, N); T <= J && --ar && F != V; ) {
            if (r[f + S] == r[f + S - T]) {
              for (var _ = 0; _ < q && r[f + _] == r[f + _ - T]; ++_)
                ;
              if (_ > S) {
                if (S = _, I = T, _ > X)
                  break;
                for (var K = Math.min(T, _ - 2), hr = 0, x = 0; x < K; ++x) {
                  var nr = f - T + x & 32767, Vr = g[nr], wr = nr - Vr & 32767;
                  wr > hr && (hr = wr, V = nr);
                }
              }
            }
            F = V, V = g[F], T += F - V & 32767;
          }
        if (I) {
          z[p++] = 268435456 | vr[S] << 18 | Mr[I];
          var gr = vr[S] & 31, yr = Mr[I] & 31;
          c += cr[gr] + dr[yr], ++U[257 + gr], ++k[yr], W = f + S, ++M;
        } else
          z[p++] = r[f], ++U[r[f]];
      }
    }
    for (f = Math.max(f, W); f < v; ++f)
      z[p++] = r[f], ++U[r[f]];
    o = Ar(r, w, y, z, U, k, c, p, A, f - A, o), y || (t.r = o & 7 | w[o / 8 | 0] << 3, o -= 7, t.h = R, t.p = g, t.i = f, t.w = W);
  } else {
    for (var f = t.w || 0; f < v + y; f += 65535) {
      var lr = f + 65535;
      lr >= v && (w[o / 8 | 0] = y, lr = v), o = kr(w, o + 1, r.subarray(f, lr));
    }
    t.i = v;
  }
  return Ir(i, 0, n + zr(o) + l);
}, Lr = /* @__PURE__ */ function() {
  for (var r = new Int32Array(256), e = 0; e < 256; ++e) {
    for (var a = e, n = 9; --n; )
      a = (a & 1 && -306674912) ^ a >>> 1;
    r[e] = a;
  }
  return r;
}(), Or = function() {
  var r = -1;
  return {
    p: function(e) {
      for (var a = r, n = 0; n < e.length; ++n)
        a = Lr[a & 255 ^ e[n]] ^ a >>> 8;
      r = a;
    },
    d: function() {
      return ~r;
    }
  };
}, Wr = function(r, e, a, n, l) {
  if (!l && (l = { l: 1 }, e.dictionary)) {
    var t = e.dictionary.subarray(-32768), v = new B(t.length + r.length);
    v.set(t), v.set(r, t.length), r = v, l.w = t.length;
  }
  return Gr(r, e.level == null ? 6 : e.level, e.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(r.length))) * 1.5) : 12 + e.mem, a, n, l);
}, ir = function(r, e, a) {
  for (; a; ++e)
    r[e] = a, a >>>= 8;
}, Hr = function(r, e) {
  var a = e.filename;
  if (r[0] = 31, r[1] = 139, r[2] = 8, r[8] = e.level < 2 ? 4 : e.level == 9 ? 2 : 0, r[9] = 3, e.mtime != 0 && ir(r, 4, Math.floor(new Date(e.mtime || Date.now()) / 1e3)), a) {
    r[3] = 8;
    for (var n = 0; n <= a.length; ++n)
      r[n + 10] = a.charCodeAt(n);
  }
}, Jr = function(r) {
  return 10 + (r.filename ? r.filename.length + 1 : 0);
};
function Kr(r, e) {
  e || (e = {});
  var a = Or(), n = r.length;
  a.p(r);
  var l = Wr(r, e, Jr(e), 8), t = l.length;
  return Hr(l, e), ir(l, t - 8, a.d()), ir(l, t - 4, n), l;
}
var Qr = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), Xr = 0;
try {
  Qr.decode(Fr, { stream: !0 }), Xr = 1;
} catch {
}
const Yr = { class: "form-control" }, Zr = /* @__PURE__ */ u("label", { class: "label" }, [
  /* @__PURE__ */ u("span", { class: "label-text" }, "Sender")
], -1), $r = ["value"], jr = { class: "form-control" }, re = /* @__PURE__ */ u("label", { class: "label" }, [
  /* @__PURE__ */ u("span", { class: "label-text" }, "Permission")
], -1), ee = { class: "flex" }, ae = /* @__PURE__ */ u("label", { for: "nobody" }, "Nobody", -1), ne = /* @__PURE__ */ u("label", { for: "everyone" }, "Everybody", -1), le = /* @__PURE__ */ u("label", { for: "anyofaddress" }, "Any Of addresses", -1), te = {
  key: 0,
  class: "form-control"
}, oe = /* @__PURE__ */ u("label", { class: "label" }, [
  /* @__PURE__ */ u("span", { class: "label-text" }, "Addresses")
], -1), ve = { class: "form-control" }, se = /* @__PURE__ */ u("label", { class: "label" }, [
  /* @__PURE__ */ u("span", { class: "label-text" }, "Compressing")
], -1), fe = { class: "flex" }, ie = /* @__PURE__ */ u("label", { for: "raw" }, "Raw", -1), ue = /* @__PURE__ */ u("label", { for: "gzip" }, "Gzip", -1), ce = { class: "form-control" }, de = /* @__PURE__ */ u("label", { class: "label" }, [
  /* @__PURE__ */ u("span", { class: "label-text" }, "Contract")
], -1), we = /* @__PURE__ */ Sr({
  __name: "StoreCode",
  props: {
    endpoint: { type: String, required: !0 },
    sender: { type: String, required: !0 },
    params: String
  },
  emits: ["loaded"],
  setup(r, { expose: e, emit: a }) {
    const n = r, l = rr(new Uint8Array()), t = rr(""), v = rr("3"), i = rr("gzip");
    function w(b) {
      const s = b.target.files[0];
      if (s) {
        var d = new FileReader();
        d.addEventListener("load", (g) => {
          g.target && (i.value === "gzip" && (l.value = Kr(
            new Uint8Array(g.target.result)
          )), l.value = new Uint8Array(g.target.result));
        }), d.readAsArrayBuffer(s);
      }
    }
    const y = br(() => [
      {
        typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode",
        value: {
          sender: n.sender,
          wasmByteCode: l.value,
          instantiatePermission: {
            permission: v.value,
            addresses: t.value.split(",")
          }
        }
      }
    ]), o = br(() => {
      let b = !0, s = "";
      return l.value.length < 1 && (b = !1, s = "No contract is selected"), { ok: b, error: s };
    });
    function m() {
    }
    return Br(() => {
      a("loaded");
    }), e({ msgs: y, isValid: o, initial: m }), (b, s) => (mr(), xr("div", null, [
      u("div", Yr, [
        Zr,
        u("input", {
          value: r.sender,
          type: "text",
          class: "text-gray-600 dark:text-white input border !border-gray-300 dark:!border-gray-600 rounded-full"
        }, null, 8, $r)
      ]),
      u("div", jr, [
        re,
        u("div", ee, [
          Q(u("input", {
            "onUpdate:modelValue": s[0] || (s[0] = (d) => v.value = d),
            type: "radio",
            id: "nobody",
            value: "1",
            class: "radio radio-error mx-2"
          }, null, 512), [
            [Y, v.value]
          ]),
          ae,
          Q(u("input", {
            "onUpdate:modelValue": s[1] || (s[1] = (d) => v.value = d),
            type: "radio",
            id: "everyone",
            value: "3",
            class: "radio radio-success mx-2"
          }, null, 512), [
            [Y, v.value]
          ]),
          ne,
          Q(u("input", {
            "onUpdate:modelValue": s[2] || (s[2] = (d) => v.value = d),
            type: "radio",
            id: "anyofaddress",
            value: "4",
            class: "radio radio-success mx-2"
          }, null, 512), [
            [Y, v.value]
          ]),
          le
        ])
      ]),
      v.value === "4" ? (mr(), xr("div", te, [
        oe,
        Q(u("input", {
          "onUpdate:modelValue": s[3] || (s[3] = (d) => t.value = d),
          type: "text",
          placeholder: "use ',' for addresses",
          class: "input border border-gray-300 dark:border-gray-600 rounded-full"
        }, null, 512), [
          [Nr, t.value]
        ])
      ])) : Tr("", !0),
      u("div", ve, [
        se,
        u("div", fe, [
          Q(u("input", {
            "onUpdate:modelValue": s[4] || (s[4] = (d) => i.value = d),
            type: "radio",
            id: "raw",
            value: "raw",
            class: "radio mx-2"
          }, null, 512), [
            [Y, i.value]
          ]),
          ie,
          Q(u("input", {
            "onUpdate:modelValue": s[5] || (s[5] = (d) => i.value = d),
            type: "radio",
            id: "gzip",
            value: "gzip",
            class: "radio mx-2"
          }, null, 512), [
            [Y, i.value]
          ]),
          ue
        ])
      ]),
      u("div", ce, [
        de,
        u("input", {
          type: "file",
          class: "file-input",
          onChange: w
        }, null, 32)
      ])
    ]));
  }
});
export {
  we as default
};
