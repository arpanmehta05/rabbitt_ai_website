// The case study index while it loads, in the shape of the page (Figma "Case studies – Desktop 1440"):
// the headline and intro, the count and filters, the lead story with its number, then three stories.
// Grey blocks on black, square, no borders.
const block = "animate-pulse bg-white/[0.06]";

export default function CaseStudiesLoading() {
  return (
    <div className="min-h-screen bg-page" aria-busy="true">
      <div className="rb-container pb-10 pt-28 lg:pb-12 lg:pt-40">
        <div className="max-w-[36rem] space-y-3">
          <div className={`h-10 w-full lg:h-14 ${block}`} />
          <div className={`h-10 w-2/3 lg:h-14 ${block}`} />
        </div>
        <div className={`mt-6 h-4 w-80 max-w-full ${block}`} />
      </div>
      <div className="rb-container pb-24">
        <div className="border-t border-white/[0.08] pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className={`h-3 w-16 ${block}`} />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-9 w-24 ${block}`} />
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-6 border-b border-white/[0.08] pb-12 lg:mt-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-12 lg:pb-16">
            <div className={`aspect-[16/9] ${block}`} />
            <div>
              <div className={`h-3 w-32 lg:mt-2 ${block}`} />
              <div className={`mt-5 h-[72px] w-40 lg:h-24 ${block}`} />
              <div className={`mt-5 h-6 w-full ${block}`} />
              <div className={`mt-2 h-6 w-3/4 ${block}`} />
              <div className={`mt-4 h-4 w-full ${block}`} />
              <div className={`mt-2 h-4 w-5/6 ${block}`} />
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-y-12 lg:mt-12 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className={`aspect-[16/9] ${block}`} />
                <div className={`mt-4 h-3 w-32 ${block}`} />
                <div className={`mt-2.5 h-4 w-full ${block}`} />
                <div className={`mt-2 h-4 w-2/3 ${block}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
