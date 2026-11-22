// Encodes the lossless PNG frames from Remotion into the final MP4s with the system ffmpeg (a full
// build), not Remotion's bundled one.
//
//   npm run frames     ->  out/seq/h, out/seq/v   (lossless 8K PNGs, from Remotion)
//   npm run encode     ->  ../public/showreel/rabbitt-showreel-16x9.mp4 and -9x16.mp4 (4K)
//
// Quality, in order of what matters most:
//   1. Supersampling: the frames are drawn at 8K and shrunk to 4K here with Lanczos, so every edge is
//      averaged from four samples instead of one. That is what removes jagged edges.
//   2. An accurate full-chroma conversion to BT.709 4:2:0 (the colour format every browser plays).
//   3. x264 at CRF 8, slower preset, with its deblocking filter turned down so edges stay crisp.
// Each file is written next to the final one and only renamed into place once ffmpeg has finished,
// so a run that is stopped halfway never leaves a broken video behind.

import { spawnSync } from "node:child_process";
import { readdirSync, renameSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const audio = `${root}public/showreel-audio.wav`;

const JOBS = [
  { frames: `${root}out/seq/h`, w: 3840, h: 2160, out: `${root}../public/showreel/rabbitt-showreel-16x9.mp4` },
  { frames: `${root}out/seq/v`, w: 2160, h: 3840, out: `${root}../public/showreel/rabbitt-showreel-9x16.mp4` },
];

for (const job of JOBS) {
  const pngs = readdirSync(job.frames).filter((n) => n.endsWith(".png")).sort();
  if (pngs.length !== 900) {
    console.error(`${job.frames} has ${pngs.length} frames, expected 900. Run "npm run frames" first.`);
    process.exit(1);
  }
  // Remotion names the frames like element-000.png; work the pattern out from what is there
  const m = pngs[0].match(/^(.*?)(\d+)\.png$/);
  const pattern = `${job.frames}/${m[1]}%0${m[2].length}d.png`;
  const tmp = job.out.replace(/\.mp4$/, ".encoding.mp4");
  if (existsSync(tmp)) rmSync(tmp);

  const args = [
    "-hide_banner", "-loglevel", "error", "-stats", "-y",
    "-framerate", "30", "-start_number", String(Number(m[2])), "-i", pattern,
    "-i", audio,
    "-vf", `scale=${job.w}:${job.h}:flags=lanczos+accurate_rnd+full_chroma_int+full_chroma_inp:out_color_matrix=bt709:out_range=tv,format=yuv420p`,
    "-c:v", "libx264", "-preset", "slower", "-crf", "8",
    "-x264-params", "ref=6:deblock=-1,-1:aq-mode=3:psy-rd=1.0,0.0",
    "-profile:v", "high", "-level:v", "5.1",
    "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv",
    "-c:a", "aac", "-b:a", "192k",
    "-movflags", "+faststart",
    tmp,
  ];
  console.log(`encoding ${job.out}`);
  const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (r.status !== 0) {
    console.error(`ffmpeg failed; ${job.out} was left as it was`);
    process.exit(r.status ?? 1);
  }
  renameSync(tmp, job.out);
  console.log(`wrote ${job.out}`);
}
