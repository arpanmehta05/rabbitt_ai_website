// The privacy page while it loads, in the shape of the page (Figma "Privacy – Desktop 1440"): the
// centred title, the short-version panel, then the contents column and the policy text. Grey blocks
// on black, square, no borders.
const block = "animate-pulse bg-white/[0.06]";

export default function PrivacyLoading() {
  return (
    <div className="min-h-screen bg-page" aria-busy="true">
      <div className="rb-container pt-28 lg:pt-[168px]">
        <div className={`h-11 w-3/4 lg:mx-auto lg:h-[72px] lg:w-[520px] ${block}`} />
        <div className={`mt-5 h-4 w-full lg:mx-auto lg:mt-7 lg:w-[620px] ${block}`} />
        <div className={`mt-5 h-12 w-full lg:mx-auto lg:mt-9 lg:w-44 ${block}`} />
        <div className={`mt-10 h-[540px] lg:mt-[78px] lg:h-[300px] ${block}`} />
        <div className="mt-8 lg:mt-[100px] lg:grid lg:grid-cols-[296px_minmax(0,1fr)] lg:gap-x-[72px]">
          <div className="hidden space-y-4 lg:block">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={`h-4 w-3/4 ${block}`} />
            ))}
          </div>
          <div className="space-y-4">
            <div className={`h-8 w-56 ${block}`} />
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className={`h-4 w-full ${block}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
