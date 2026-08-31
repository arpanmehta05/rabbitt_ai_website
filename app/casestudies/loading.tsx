export default function CaseStudiesLoading() {
  return (
    <div className="min-h-screen bg-[#020305]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="border-b border-white/[0.07] pb-12 pt-36 sm:pt-44">
          <div className="max-w-3xl space-y-4">
            <div className="h-3 w-24 animate-pulse rounded-full bg-white/[0.06]" />
            <div className="h-12 w-72 animate-pulse rounded-xl bg-white/[0.06]" />
            <div className="h-5 w-96 animate-pulse rounded-lg bg-white/[0.04]" />
          </div>
        </div>
        <div className="py-16">
          <div className="mb-10 flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-24 animate-pulse border border-white/[0.06] bg-white/[0.03]" />
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="overflow-hidden border border-white/[0.07] bg-[#060d1a]">
                <div className="aspect-[16/9] w-full animate-pulse bg-white/[0.04]" />
                <div className="space-y-3 p-6">
                  <div className="h-4 w-full animate-pulse rounded-lg bg-white/[0.05]" />
                  <div className="h-4 w-4/5 animate-pulse rounded-lg bg-white/[0.04]" />
                  <div className="h-3 w-1/3 animate-pulse rounded-lg bg-white/[0.03]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
