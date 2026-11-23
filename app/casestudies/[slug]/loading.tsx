// An article while it loads: the same light page as the article itself (white, 64px gutters), with grey
// blocks for the breadcrumb, the title, the picture and the text, so the page does not flash a dark one.
export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-white pt-16" aria-busy="true">
      <div className="rb-container pb-16 pt-10">
        <div className="h-4 w-64 animate-pulse rounded bg-[#eef0f4]" />
        <div className="mt-8 h-12 w-full max-w-3xl animate-pulse rounded-lg bg-[#eef0f4]" />
        <div className="mt-3 h-12 w-2/3 animate-pulse rounded-lg bg-[#eef0f4]" />
        <div className="mt-12 grid gap-10 lg:grid-cols-5 lg:gap-x-5">
          <div className="aspect-[1.56] animate-pulse rounded-[20px] bg-[#f1f3f9] lg:col-span-3" />
          <div className="space-y-3 lg:col-span-2">
            <div className="h-4 w-full animate-pulse rounded bg-[#eef0f4]" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-[#eef0f4]" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-[#eef0f4]" />
          </div>
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-5 lg:gap-x-5">
          <div className="h-48 animate-pulse rounded bg-[#f4f5f8] lg:col-span-2" />
          <div className="space-y-3 lg:col-span-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`h-4 animate-pulse rounded bg-[#eef0f4] ${i % 3 === 0 ? "w-3/4" : "w-full"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
