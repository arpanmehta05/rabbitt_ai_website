"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";

// The showreel, in the spirit of AINama's numbers card (components/ainama/AinamaStats.tsx): a card that
// grows to the whole screen as it scrolls in, holds, then shrinks back and scrolls away. For a film this
// is done by width, not by height: the film is always laid out at the full size of the screen and a
// window onto it (clip-path) opens, mostly sideways, so nothing is re-laid-out or stretched while you
// scroll. One value, `size` from 0 to 1, drives the window and its corners.
//
// The whole film is always in view, never cropped: it is fitted inside the screen (object-contain), and
// the edges of the film are one flat blue, so the same blue behind it makes any space left at the sides or
// the top and bottom, on screens wider or narrower than 16:9, part of the picture.
//
// The film waits on its first frame. It starts when half of the section is on screen, plays once, muted,
// and stops on its closing Rabbitt AI card. It never plays again by itself: scrolling away and back,
// including coming up from below, leaves it where it was (paused part-way, or on the closing card). Two
// small round buttons sit together in the bottom left corner: replay first, then the sound. Phones get the
// vertical film, everything else the 16:9 one. Reduced motion: the plain inset card, the film does not
// start on its own and has its own controls.

const SRC = {
  wide: "/showreel/rabbitt-showreel-16x9.mp4",
  tall: "/showreel/rabbitt-showreel-9x16.mp4",
};

// The film ends on its Rabbitt AI card (the logo, the name and rabbitt.ai), which is fully on screen until
// 29.65s and then fades out to plain blue by 30s. It is stopped on that card, at 29.62s, in both films.
const STOP_AT = 29.62;

function useFilm() {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setSrc(mq.matches ? SRC.tall : SRC.wide);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return src;
}

function Film({ src, trigger, still }: { src: string | null; trigger?: React.RefObject<HTMLElement | null>; still?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const replayRef = useRef<() => void>(() => {});

  // play once when half of the section is on screen; leave it where it is when it scrolls away
  useEffect(() => {
    const el = ref.current;
    const box = trigger?.current;
    if (!el || !box || still) return;
    let finished = false;
    let raf = 0;
    // stop on the closing card, before the film fades it out
    const watch = () => {
      if (el.currentTime >= STOP_AT) {
        el.pause();
        el.currentTime = STOP_AT;
        finished = true;
        return;
      }
      raf = requestAnimationFrame(watch);
    };
    const run = () => {
      cancelAnimationFrame(raf);
      void el.play().catch(() => {});
      raf = requestAnimationFrame(watch);
    };
    replayRef.current = () => {
      finished = false;
      el.currentTime = 0;
      run();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (finished) return; // it has played: never again on its own
        if (e.intersectionRatio >= 0.5) run();
        else if (e.intersectionRatio < 0.08) {
          cancelAnimationFrame(raf);
          el.pause();
        }
      },
      { threshold: [0, 0.08, 0.5] },
    );
    io.observe(box);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [src, trigger, still]);

  if (!src) return <div className="absolute inset-0 bg-[#081e56]" />;
  return (
    <>
      <video
        ref={ref}
        key={src}
        src={src}
        muted={muted}
        playsInline
        controls={still}
        preload="auto"
        aria-label="Rabbitt showreel"
        className="absolute inset-0 h-full w-full object-contain"
      />
      {!still && (
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 sm:bottom-6 sm:left-6">
          <button
            type="button"
            onClick={() => replayRef.current()}
            aria-label="Play the showreel again"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white/80 backdrop-blur transition-colors hover:bg-black/50 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-pressed={!muted}
            aria-label={muted ? "Turn the sound on" : "Turn the sound off"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white/80 backdrop-blur transition-colors hover:bg-black/50 hover:text-white"
          >
            {muted ? <VolumeX className="h-3.5 w-3.5" aria-hidden /> : <Volume2 className="h-3.5 w-3.5" aria-hidden />}
          </button>
        </div>
      )}
    </>
  );
}

export default function ShowreelCard() {
  const reduce = useReducedMotion();
  const src = useFilm();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // 0 to 1 while it comes in, 1 while it is held, back to 0 as it leaves
  const size = useTransform(scrollYProgress, [0.1, 0.42, 0.6, 0.9], [0, 1, 1, 0]);
  // the window onto the film: the sides open most, the top and bottom only a little, the corners square off
  const clip = useTransform(size, (v) => `inset(${(1 - v) * 7}svh ${(1 - v) * 17}% ${(1 - v) * 7}svh ${(1 - v) * 17}% round ${(1 - v) * 24}px)`);

  if (reduce) {
    return (
      <section aria-label="Showreel" className="bg-page px-3 py-6 sm:px-6 sm:py-12">
        <div className="relative isolate aspect-video overflow-hidden rounded-[20px] bg-[#081e56] max-md:aspect-[9/16] max-md:max-h-[80svh]">
          <Film src={src} still />
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="Showreel" className="relative h-[130svh] bg-page">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0 bg-[#081e56] will-change-[clip-path]">
          <Film src={src} trigger={ref} />
        </motion.div>
      </div>
    </section>
  );
}
