// The blog list while it loads: the same black page as the site, with grey blocks where the
// cards will be (no blue tint).
export default function BlogsLoading() {
  return (
    <div className="min-h-screen bg-black">
      <div className="rb-container pb-16 pt-32 sm:pt-40">
        <div className="max-w-3xl space-y-4">
          <div className="h-12 w-72 animate-pulse rounded-lg bg-white/[0.07]" />
          <div className="h-5 w-96 max-w-full animate-pulse rounded-lg bg-white/[0.05]" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-white/10">
              <div className="aspect-[16/9] w-full animate-pulse bg-white/[0.06]" />
              <div className="space-y-3 p-6">
                <div className="h-4 w-full animate-pulse rounded bg-white/[0.06]" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-white/[0.05]" />
                <div className="h-3 w-1/3 animate-pulse rounded bg-white/[0.04]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
