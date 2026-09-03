"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const videos = [
  {
    id: 1,
    src: "/video/1.mp4",
  },
  {
    id: 2,
    src: "/video/2.mp4",
  },
  {
    id: 3,
    src: "/video/3.mp4",
  },
  {
    id: 4,
    src: "/video/4.mp4",
  },
];

export default function VideoRotationCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Function to advance to next video
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Sync mute state and playback
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.muted = isMuted;
          if (!isMuted) {
            video.volume = 1.0;
          }
          video.play().catch(() => {});
        } else {
          video.muted = true;
          video.play().catch(() => {});
        }
      }
    });
  }, [activeIndex, isMuted]);

  // Synchronously toggle mute on user gesture
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.muted = nextMuted;
          if (!nextMuted) {
            video.volume = 1.0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch((err) => console.warn("Playback error on unmute:", err));
            }
          }
        } else {
          video.muted = true;
        }
      }
    });
  };

  // Handle video time updates: treat 2.mp4 as 2 seconds shorter than original in code (decreased by 1 more second)
  const handleTimeUpdate = (video: HTMLVideoElement, src: string, index: number) => {
    if (!video) return;

    const isTargetVideo = src.includes("2.mp4");

    if (isTargetVideo && video.duration && video.duration > 2) {
      const effectiveDuration = video.duration - 2;
      if (video.currentTime >= effectiveDuration) {
        video.currentTime = 0;
        if (index === activeIndex) {
          handleNext();
        }
      }
    }
  };

  return (
    <section className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-24 lg:px-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[750px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.14),transparent_70%)] blur-3xl" />

      {/* ── 3D ROTATION STAGE ────────────────────────────────────────── */}
      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center">
        {/* Carousel Viewport with 3D Perspective */}
        <div
          className="relative flex h-[280px] w-full items-center justify-center sm:h-[420px] md:h-[500px] lg:h-[560px]"
          style={{ perspective: "1300px" }}
        >
          {videos.map((item, index) => {
            // Calculate relative offset from activeIndex
            const offset = (index - activeIndex + videos.length) % videos.length;
            const isTargetVideo = item.src.includes("2.mp4");

            let transformStyles = "";
            let opacityStyles = "";
            let zIndex = 0;
            let isClickable = false;

            if (offset === 0) {
              // Active Center Video (brought further forward in Z to guarantee it stays in front of side tilted edges)
              transformStyles =
                "translate3d(0, 0, 120px) rotateY(0deg) scale(1)";
              opacityStyles = "opacity-100";
              zIndex = 50;
            } else if (offset === 1) {
              // Right Tilted Video (pushed back so its rotated edge doesn't overlap center)
              transformStyles =
                "translate3d(60%, 0, -140px) rotateY(-24deg) scale(0.82)";
              opacityStyles = "opacity-40 hover:opacity-70";
              zIndex = 10;
              isClickable = true;
            } else if (offset === videos.length - 1) {
              // Left Tilted Video
              transformStyles =
                "translate3d(-60%, 0, -140px) rotateY(24deg) scale(0.82)";
              opacityStyles = "opacity-40 hover:opacity-70";
              zIndex = 10;
              isClickable = true;
            } else {
              // Back/Hidden Video (opposite side)
              transformStyles =
                "translate3d(0, 40px, -240px) scale(0.65)";
              opacityStyles = "opacity-0 pointer-events-none";
              zIndex = 5;
            }

            return (
              <div
                key={item.id}
                onClick={() => isClickable && setActiveIndex(index)}
                className={`absolute w-[82%] sm:w-[68%] md:w-[62%] lg:w-[56%] max-w-[760px] aspect-video transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${opacityStyles} ${
                  isClickable ? "cursor-pointer" : ""
                } ${offset === 0 ? "pointer-events-auto" : ""}`}
                style={{
                  transform: transformStyles,
                  zIndex,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Video Card Shell with Glassmorphism Border */}
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.14] bg-[#050811] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_0_1px_rgba(59,130,246,0.18)]">
                  {/* Video Player Element */}
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                      if (el) {
                        el.muted = index === activeIndex ? isMuted : true;
                      }
                    }}
                    src={item.src}
                    playsInline
                    autoPlay
                    loop={offset !== 0 && !isTargetVideo} // 2.mp4 loop handled in handleTimeUpdate to respect cut
                    onTimeUpdate={(e) => handleTimeUpdate(e.currentTarget, item.src, index)}
                    onEnded={() => {
                      if (offset === 0) {
                        handleNext();
                      }
                    }}
                    className="h-full w-full object-cover"
                  />

                  {/* Fallback gradient / styling */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Mute / Unmute Button for Active Video */}
                  {offset === 0 && (
                    <div className="absolute bottom-4 right-4 z-50 pointer-events-auto">
                      <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                        className="flex items-center gap-2 rounded-full border border-white/25 bg-black/80 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-black hover:border-white/50 cursor-pointer shadow-[0_4px_14px_rgba(0,0,0,0.7)] active:scale-95 select-none"
                      >
                        {isMuted ? (
                          <>
                            <VolumeX className="h-4 w-4 text-rose-400" />
                            <span>Unmute</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="h-4 w-4 text-sky-400 animate-pulse" />
                            <span>Mute</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CONTROLS & INDICATORS ─────────────────────────────────── */}
        <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-between w-full max-w-[760px] border-t border-white/[0.08] pt-6">
          {/* Prev / Next Action Arrows & Mute/Unmute Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous video"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-all hover:bg-white/[0.12] hover:border-white/30 cursor-pointer"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              type="button"
              aria-label="Next video"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-all hover:bg-white/[0.12] hover:border-white/30 cursor-pointer"
            >
              →
            </button>
            <button
              onClick={toggleMute}
              type="button"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white transition-all hover:bg-white/[0.12] hover:border-white/30 cursor-pointer ml-1"
            >
              {isMuted ? (
                <>
                  <VolumeX className="h-4 w-4 text-rose-400" />
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 text-sky-400 animate-pulse" />
                  <span>Mute</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Dot / Track Selection Tabs */}
          <div className="flex items-center gap-2">
            {videos.map((vid, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={vid.id}
                  onClick={() => setActiveIndex(idx)}
                  type="button"
                  className={`rounded-full transition-all duration-300 ${
                    active
                      ? "bg-blue-500 w-8 h-2.5"
                      : "bg-white/20 hover:bg-white/40 w-2.5 h-2.5"
                  }`}
                  aria-label={`Jump to video ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Current Video Counter */}
          <div className="font-mono text-xs text-slate-400">
            <span className="font-semibold text-white">
              0{activeIndex + 1}
            </span>{" "}
            / 0{videos.length}
          </div>
        </div>
      </div>
    </section>
  );
}
