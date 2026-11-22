// The blog index while it loads, in the shape of the page (Figma "Blog – Desktop 1440"): the headline
// and Subscribe, search and filters, two large posts, then the grid. Grey blocks on black, square,
// no borders, so nothing jumps when the posts arrive.
const block = "animate-pulse bg-white/[0.06]";

export default function BlogsLoading() {
  return (
    <div className="min-h-screen bg-page" aria-busy="true">
      <div className="rb-container flex items-start justify-between gap-6 pb-10 pt-28 lg:pb-12 lg:pt-40">
        <div className="w-full max-w-[44rem] space-y-3">
          <div className={`h-10 w-full lg:h-14 ${block}`} />
          <div className={`h-10 w-3/4 lg:h-14 ${block}`} />
        </div>
        <div className={`hidden h-10 w-28 shrink-0 sm:block ${block}`} />
      </div>
      <div className="rb-container pb-24">
        <div className="border-t border-white/[0.08] pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className={`h-11 w-full sm:w-80 ${block}`} />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`h-9 w-20 ${block}`} />
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-10 border-b border-white/[0.08] pb-12 lg:mt-10 lg:grid-cols-2 lg:gap-6">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className={`aspect-[16/9] ${block}`} />
                <div className={`mt-5 h-3 w-40 ${block}`} />
                <div className={`mt-3 h-6 w-11/12 ${block}`} />
                <div className={`mt-2 h-4 w-2/3 ${block}`} />
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-y-12 lg:mt-12 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="grid grid-cols-[128px_minmax(0,1fr)] gap-3.5 sm:block">
                <div className={`aspect-[16/9] ${block}`} />
                <div>
                  <div className={`h-3 w-32 sm:mt-4 ${block}`} />
                  <div className={`mt-2.5 h-4 w-full ${block}`} />
                  <div className={`mt-2 h-4 w-2/3 ${block}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
