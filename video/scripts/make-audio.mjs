// Makes the showreel's soundtrack: the narration (voice/*.wav, from make-voice.py) over a playful
// 120 BPM groove (marimba arpeggios, plucked bass, kick, clap, hats) and sound effects, each placed
// on the frame where it happens in the film. The music and effects are synthesised here; nothing is
// downloaded or licensed.
//
//   node scripts/make-audio.mjs        ->  public/showreel-audio.wav (30 s, 44.1 kHz, stereo)
//
// The event frames below mirror src/hat.tsx and the scenes; if a scene's timing changes, change it here.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SR = 44100;
const FPS = 30;
const DUR = 30;
const N = SR * DUR;
const L = new Float32Array(N);
const R = new Float32Array(N);
// the music has its own bus, so it can sit lower than the effects and dip further under the voice
const ML = new Float32Array(N);
const MR = new Float32Array(N);
let bus = [L, R];
const fr = (frame) => frame / FPS;
const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);

// a seeded random, so the noise (and the file) is the same every run
let seed = 20261119;
const rnd = () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const noise = () => rnd() * 2 - 1;

// place a sound: fn(t, i) returns one sample for time t (seconds since the sound began)
function place(t0, len, fn, gain = 1, pan = 0) {
  const s0 = Math.round(t0 * SR);
  const n = Math.round(len * SR);
  const gl = gain * Math.min(1, 1 - pan);
  const gr = gain * Math.min(1, 1 + pan);
  for (let i = 0; i < n; i++) {
    const k = s0 + i;
    if (k < 0 || k >= N) continue;
    const v = fn(i / SR, i);
    bus[0][k] += v * gl;
    bus[1][k] += v * gr;
  }
}

// one-pole filters for the noise-based sounds
const lowpass = (cut) => {
  const a = Math.exp((-2 * Math.PI * cut) / SR);
  let y = 0;
  return (x) => (y = (1 - a) * x + a * y);
};
const highpass = (cut) => {
  const lp = lowpass(cut);
  return (x) => x - lp(x);
};
const bandpass = (lo, hi) => {
  const h = highpass(lo);
  const l = lowpass(hi);
  return (x) => l(h(x));
};

// ---- instruments -----------------------------------------------------------------------------

function kick(t0, g = 1) {
  let ph = 0;
  place(t0, 0.4, (t) => {
    const f = 46 + 110 * Math.exp(-t * 32);
    ph += (2 * Math.PI * f) / SR;
    return Math.sin(ph) * Math.exp(-t * 8.5) + (t < 0.004 ? noise() * 0.3 : 0);
  }, 0.95 * g);
}

function clap(t0, g = 1) {
  const bp = bandpass(900, 3200);
  place(t0, 0.25, (t) => {
    const burst = [0, 0.011, 0.022].reduce((a, o) => a + (t >= o ? Math.exp(-(t - o) * (o === 0.022 ? 16 : 90)) : 0), 0);
    return bp(noise()) * burst;
  }, 0.55 * g, -0.1);
}

function hat(t0, g = 1, open = false) {
  const hp = highpass(7000);
  place(t0, open ? 0.22 : 0.07, (t) => hp(noise()) * Math.exp(-t * (open ? 14 : 60)), 0.3 * g, 0.25);
}

function bass(m, t0, len, g = 1) {
  const f = midi(m);
  const lp = lowpass(900);
  place(t0, len, (t) => {
    const ph = 2 * Math.PI * f * t;
    const tri = (2 / Math.PI) * Math.asin(Math.sin(ph));
    const env = Math.min(1, t / 0.004) * Math.exp(-t * 4.5);
    return lp(tri * 0.8 + Math.sin(ph) * 0.6) * env;
  }, 0.5 * g);
}

function marimba(m, t0, g = 1, pan = 0) {
  const f = midi(m);
  place(t0, 0.9, (t) => {
    const env = Math.min(1, t / 0.002);
    return env * (Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 5.5) + 0.35 * Math.sin(2 * Math.PI * f * 3.98 * t) * Math.exp(-t * 22) + 0.12 * Math.sin(2 * Math.PI * f * 9.2 * t) * Math.exp(-t * 45));
  }, 0.24 * g, pan);
}

function bell(m, t0, g = 1, pan = 0) {
  const f = midi(m);
  place(t0, 3.2, (t) => {
    const idx = 2.2 * Math.exp(-t * 2.5);
    return Math.sin(2 * Math.PI * f * t + idx * Math.sin(2 * Math.PI * f * 3.5 * t)) * Math.exp(-t * 1.6) * Math.min(1, t / 0.003);
  }, 0.2 * g, pan);
}

// ---- sound effects ---------------------------------------------------------------------------

function thud(t0) {
  let ph = 0;
  place(t0, 0.3, (t) => {
    ph += (2 * Math.PI * (70 + 60 * Math.exp(-t * 30))) / SR;
    return Math.sin(ph) * Math.exp(-t * 12);
  }, 0.8);
}

function boing(t0) {
  let ph = 0;
  place(t0, 0.6, (t) => {
    const f = 150 + 90 * Math.exp(-t * 3) + 60 * Math.sin(2 * Math.PI * 11 * t) * Math.exp(-t * 4);
    ph += (2 * Math.PI * f) / SR;
    return Math.sin(ph) * Math.exp(-t * 5) * Math.min(1, t / 0.005);
  }, 0.4);
}

function gulp(t0, g = 1) {
  let ph = 0;
  place(t0, 0.16, (t) => {
    ph += (2 * Math.PI * (110 + 260 * Math.exp(-t * 28))) / SR;
    return Math.sin(ph) * Math.sin(Math.PI * Math.min(1, t / 0.16)) ** 0.6;
  }, 0.5 * g);
}

function pop(t0, g = 1, pan = 0) {
  let ph = 0;
  place(t0, 0.12, (t) => {
    ph += (2 * Math.PI * (480 + 700 * Math.min(1, t / 0.04))) / SR;
    return Math.sin(ph) * Math.exp(-t * 32) + (t < 0.003 ? noise() * 0.6 : 0);
  }, 0.4 * g, pan);
}

function boink(t0) {
  let ph = 0;
  place(t0, 0.32, (t) => {
    ph += (2 * Math.PI * (240 * (1 + 0.12 * Math.sin(2 * Math.PI * 28 * t)))) / SR;
    return Math.sin(ph) * Math.exp(-t * 9);
  }, 0.38);
}

function flick(t0, pan = 0) {
  const bp = bandpass(2500, 9000);
  place(t0, 0.08, (t) => bp(noise()) * Math.exp(-t * 55), 0.5, pan);
}

function whoosh(t0, len = 0.3, g = 1) {
  const lp1 = lowpass(400);
  place(t0, len, (t) => {
    const p = t / len;
    const bump = Math.sin(Math.PI * p) ** 2;
    return (lp1(noise()) * 2.4 + noise() * 0.08 * bump) * bump;
  }, 0.35 * g);
}

function snareRoll(t0, t1) {
  for (let t = t0; t < t1; t += 0.0625 / 2) {
    const k = (t - t0) / (t1 - t0);
    const bp = bandpass(1200, 6000);
    place(t, 0.06, (u) => bp(noise()) * Math.exp(-u * 45), 0.12 + 0.35 * k * k, (rnd() - 0.5) * 0.3);
  }
}

function cymbal(t0) {
  const hp = highpass(5000);
  place(t0, 2.4, (t) => hp(noise()) * Math.exp(-t * 2.2) * Math.min(1, t / 0.01), 0.22);
}

// ---- the music -------------------------------------------------------------------------------

const BEAT = 0.5;
const BAR = 2;
// I – vi – IV – V in C, one chord a bar
const CHORDS = [
  { arp: [72, 76, 79], bass: 36 },
  { arp: [69, 72, 76], bass: 33 },
  { arp: [69, 72, 77], bass: 41 },
  { arp: [67, 71, 74], bass: 43 },
];
// sixteenths: which chord tone (3 = the root an octave up), or null for a rest
const ARP = [0, null, 1, 2, null, 1, 3, null, 2, null, 1, 0, 2, 1, null, 1];
const BASS = [0, null, null, 12, null, null, 0, null, 0, null, null, 12, null, 7, null, null];

const INTRO_END = fr(105); // the groove comes in with "Your data goes in."
const BREAK = fr(750); // drums and bass drop for "No smoke. No mirrors."
const ROLL = fr(824);
const TADA = fr(852);

// The music plays under the narration, on its own bus.
const MUSIC = true;
bus = [ML, MR];

for (let bar = 0; MUSIC && bar * BAR < TADA; bar++) {
  const c = CHORDS[bar % 4];
  const t = bar * BAR;
  for (let s = 0; s < 16; s++) {
    const ts = t + s * (BEAT / 4);
    if (ts >= TADA) break;
    const a = ARP[s];
    const intro = ts < INTRO_END;
    if (a !== null) marimba(a === 3 ? c.arp[0] + 12 : c.arp[a], ts, intro ? 0.75 : 1, s % 2 ? 0.3 : -0.3);
    const groove = ts >= INTRO_END && ts < BREAK;
    if (groove) {
      if (BASS[s] !== null) bass(c.bass + BASS[s], ts, 0.22);
      if (s % 4 === 0 && (s === 0 || s === 8 || s === 4 || s === 12)) kick(ts, s === 0 ? 1 : 0.85);
      if (s === 4 || s === 12) clap(ts);
      if (s % 2 === 0) hat(ts, s % 4 === 2 ? 1 : 0.55);
      if (s === 14) hat(ts, 0.8, true);
    } else if (ts >= BREAK && ts < ROLL && s % 2 === 0) {
      hat(ts, 0.5);
    } else if (intro && ts > 1.9 && s % 4 === 2) {
      hat(ts, 0.4);
    }
  }
}

// the finish: a roll, then a bright chord and a crash as the hat tips its brim
if (MUSIC) {
  snareRoll(ROLL, TADA);
  kick(TADA, 1.1);
  cymbal(TADA);
  bass(36, TADA, 1.6, 1.2);
  [60, 64, 67, 72, 76].forEach((m, i) => bell(m, TADA + i * 0.035, 1, (i - 2) * 0.2));
}
bus = [L, R];

// ---- the effects, on their frames ------------------------------------------------------------

thud(fr(12));
boing(fr(12));
for (let i = 0; i < 8; i++) gulp(fr(151 + i * 10)); // data goes in
for (let i = 0; i < 6; i++) pop(fr(271 + i * 14), 1, i % 2 ? 0.35 : -0.35); // AI comes out
for (let i = 0; i < 4; i++) boink(fr(449 + i * 16)); // hits the ring
for (let i = 0; i < 4; i++) gulp(fr(457 + i * 16), 0.7); // and is swallowed again
for (let i = 0; i < 6; i++) flick(fr(552 + i * 6), (i - 2.5) * 0.15); // the deal
for (let i = 0; i < 6; i++) {
  whoosh(fr(604 + i * 12), 0.16, 0.6); // each card flips
  flick(fr(604 + i * 12) + 0.08, (i - 2.5) * 0.15);
}
whoosh(fr(716), 0.45, 1.2); // swept back into the hat
gulp(fr(736), 1.1);
[105, 405, 540, 750, 832].forEach((f) => whoosh(fr(f), 0.35, 0.8)); // the hat moving between marks

// ---- the narration (voice/*.wav from scripts/make-voice.py) ------------------------------------

// each line starts on the frame its words come on screen, or just after the line before it ends;
// `by` is the time it must be finished by (the scene's end)
const SCRIPT = [
  { file: "01-trick", at: fr(24), by: fr(105) },
  { file: "02-eye", at: fr(50), by: fr(105) },
  { file: "03-in", at: fr(108), by: fr(255) },
  { file: "04-out", at: fr(258), by: fr(405) },
  { file: "05-leaves", at: fr(408), by: fr(540) },
  { file: "06-bytes", at: fr(430), by: fr(540) },
  { file: "07-card", at: fr(543), by: fr(680) },
  { file: "08-six", at: fr(640), by: fr(750) },
  { file: "09-smoke", at: fr(755), by: fr(812) },
  { file: "10-cloud", at: fr(810), by: fr(842) },
  { file: "11-name", at: fr(856), by: fr(890) },
];

const V = new Float32Array(N);
const voiceDir = fileURLToPath(new URL("../voice/", import.meta.url));
let prevEnd = 0;
for (const line of SCRIPT) {
  const buf = readFileSync(voiceDir + line.file + ".wav");
  const samples = new Float32Array((buf.length - 44) / 2);
  for (let i = 0; i < samples.length; i++) samples[i] = buf.readInt16LE(44 + i * 2) / 32768;
  // trim the silence the service leaves at both ends
  let a = 0;
  let b = samples.length - 1;
  while (a < b && Math.abs(samples[a]) < 0.01) a++;
  while (b > a && Math.abs(samples[b]) < 0.01) b--;
  const clip = samples.subarray(Math.max(0, a - 300), Math.min(samples.length, b + 2000));
  const start = Math.max(line.at, prevEnd + 0.12);
  const end = start + clip.length / SR;
  if (end > line.by) console.warn(`! ${line.file} ends at ${end.toFixed(2)}s, after ${line.by.toFixed(2)}s`);
  const s0 = Math.round(start * SR);
  for (let i = 0; i < clip.length && s0 + i < N; i++) V[s0 + i] += clip[i];
  console.log(`${line.file.padEnd(10)} ${start.toFixed(2)}s – ${end.toFixed(2)}s`);
  prevEnd = end;
}

// the effects sit under the voice, and dip a little more while it speaks
const SFX_LEVEL = 0.38;
const MUSIC_LEVEL = 0.3;
const VOICE_LEVEL = 0.95;
let duck = 0;
const duckA = Math.exp(-1 / (SR * 0.01));
const duckR = Math.exp(-1 / (SR * 0.25));
for (let i = 0; i < N; i++) {
  const env = Math.abs(V[i]) > 0.02 ? 1 : 0;
  duck = env > duck ? duckA * duck + (1 - duckA) * env : duckR * duck + (1 - duckR) * env;
  const g = SFX_LEVEL * (1 - 0.45 * duck);
  const gm = MUSIC_LEVEL * (1 - 0.55 * duck);
  L[i] = L[i] * g + ML[i] * gm + V[i] * VOICE_LEVEL;
  R[i] = R[i] * g + MR[i] * gm + V[i] * VOICE_LEVEL;
}

// ---- master: soft limit, fade the tail so the loop restarts clean, write the file ------------

const fadeStart = fr(890) * SR;
let peak = 0;
for (let i = 0; i < N; i++) {
  const fade = i > fadeStart ? Math.max(0, 1 - (i - fadeStart) / (N - fadeStart)) : 1;
  L[i] = Math.tanh(L[i]) * fade;
  R[i] = Math.tanh(R[i]) * fade;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const norm = 0.89 / peak;

const data = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * norm)) * 32767), i * 4);
  data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * norm)) * 32767), i * 4 + 2);
}
const head = Buffer.alloc(44);
head.write("RIFF", 0);
head.writeUInt32LE(36 + data.length, 4);
head.write("WAVE", 8);
head.write("fmt ", 12);
head.writeUInt32LE(16, 16);
head.writeUInt16LE(1, 20);
head.writeUInt16LE(2, 22);
head.writeUInt32LE(SR, 24);
head.writeUInt32LE(SR * 4, 28);
head.writeUInt16LE(4, 32);
head.writeUInt16LE(16, 34);
head.write("data", 36);
head.writeUInt32LE(data.length, 40);

const out = fileURLToPath(new URL("../public/showreel-audio.wav", import.meta.url));
writeFileSync(out, Buffer.concat([head, data]));
console.log(`wrote ${out} (${DUR}s, peak normalised from ${peak.toFixed(2)})`);
