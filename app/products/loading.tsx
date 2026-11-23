// The products page while it loads, in the shape of the page (Figma "Products – Desktop 1440"): the
// headline and intro, the facts band, then the flagship blocks. Grey blocks on black, square, no borders.
const block = "animate-pulse bg-white/[0.06]";

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-page" aria-busy="true">
      <div className="rb-container pt-28 lg:pt-[152px]">
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-6">
          <div className={`h-16 w-3/4 lg:col-span-2 lg:h-[120px] lg:w-[520px] ${block}`} />
          <div className="mt-5 space-y-2.5 lg:col-span-2 lg:mt-3">
            <div className={`h-4 w-full ${block}`} />
            <div className={`h-4 w-5/6 ${block}`} />
            <div className={`mt-6 h-12 w-full lg:w-56 ${block}`} />
          </div>
        </div>
      </div>
      <div className={`mt-10 h-[200px] lg:mt-[60px] lg:h-[224px] ${block}`} />
      <div className="rb-container mt-16 lg:mt-[100px]">
        <div className={`h-10 w-56 lg:h-[52px] ${block}`} />
        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-4">
          <div className={`h-[168px] lg:col-span-2 lg:h-[280px] ${block}`} />
          <div className={`hidden h-[280px] lg:block ${block}`} />
          <div className={`hidden h-[280px] lg:block ${block}`} />
        </div>
      </div>
    </div>
  );
}
