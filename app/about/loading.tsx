// The about page while it loads, in the shape of the page (Figma "About – Desktop 1440"): the
// headline and intro, the 2×2 facts, then the mission and the three bets. Grey blocks on black,
// square, no borders.
const block = "animate-pulse bg-white/[0.06]";

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-page" aria-busy="true">
      <div className="rb-container pt-28 lg:pt-[152px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_432px] lg:gap-12">
          <div className="space-y-3">
            <div className={`h-12 w-4/5 lg:h-24 ${block}`} />
            <div className={`h-12 w-full lg:h-24 ${block}`} />
          </div>
          <div className="space-y-2.5 lg:pt-2">
            <div className={`h-4 w-full ${block}`} />
            <div className={`h-4 w-full ${block}`} />
            <div className={`h-4 w-3/4 ${block}`} />
            <div className={`mt-8 h-12 w-48 ${block}`} />
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 lg:mt-24 lg:gap-x-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border-t border-white/[0.08] py-6 lg:py-9">
              <div className={`h-9 w-24 lg:h-14 lg:w-40 ${block}`} />
              <div className={`mt-3 h-4 w-28 ${block}`} />
              <div className={`mt-2 h-3 w-full max-w-xs ${block}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="rb-container rb-section">
        <div className="space-y-3">
          <div className={`h-8 w-full lg:h-12 ${block}`} />
          <div className={`h-8 w-5/6 lg:h-12 ${block}`} />
          <div className={`h-8 w-2/3 lg:h-12 ${block}`} />
        </div>
      </div>
      <div className="rb-container pb-24">
        <div className="grid gap-9 lg:grid-cols-3 lg:gap-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className={["", "lg:mt-16", "lg:mt-32"][i]}>
              <div className={`h-[220px] lg:h-[300px] ${block}`} />
              <div className={`mt-4 h-4 w-full ${block}`} />
              <div className={`mt-2 h-4 w-2/3 ${block}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
