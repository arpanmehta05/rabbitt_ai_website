// The faint grid and the soft blue glows behind a first screen, the same as on the home page. Both
// fade out toward the bottom edge so the screen runs into the page below with no line.
export default function Backdrop({ glow = "right" }: { glow?: "right" | "bottom" }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        maskImage: "linear-gradient(to bottom, #000 0%, #000 62%, transparent 98%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 62%, transparent 98%)",
      }}
    >
      <div
        className="absolute inset-0 text-white opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000, transparent)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {glow === "right" ? (
          <div className="absolute -right-[12%] top-[10%] h-[620px] w-[780px] rounded-[50%] bg-brand/25 blur-[150px]" />
        ) : (
          <div className="absolute -bottom-[30%] left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-[50%] bg-brand/30 blur-[160px]" />
        )}
        <div className="absolute -left-[10%] bottom-[-20%] h-[420px] w-[640px] rounded-[50%] bg-[#0a2fa3]/30 blur-[140px]" />
      </div>
    </div>
  );
}
