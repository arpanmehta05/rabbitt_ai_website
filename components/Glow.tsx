// The products card's gradient, used behind the boxes on the contact and about pages: four blurred
// blobs (blue, sky, deep blue and a shade) on a navy base. Put it inside a box that is
// `relative isolate overflow-hidden`; it fills the box and sits behind the content. `soft` halves
// the strength, `blur` is the blur radius in px (larger boxes want a larger one).
export default function Glow({ soft = false, blur = 60 }: { soft?: boolean; blur?: number }) {
  const b = { filter: `blur(${blur}px)` };
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[#050d29]">
      <span className={`absolute inset-0 ${soft ? "opacity-50" : ""}`}>
        <span className="absolute -left-[10%] -top-[20%] h-[93%] w-[55%] rounded-full bg-[#0061ff]/55" style={b} />
        <span className="absolute left-[45%] top-[5%] h-[98%] w-[70%] rounded-full bg-[#4d9bff]/40" style={b} />
        <span className="absolute left-[25%] top-[53%] h-[73%] w-[50%] rounded-full bg-[#1a47d6]/60" style={b} />
      </span>
      <span className="absolute -left-[15%] top-[43%] h-[62%] w-[50%] rounded-full bg-black/50" style={b} />
    </span>
  );
}
