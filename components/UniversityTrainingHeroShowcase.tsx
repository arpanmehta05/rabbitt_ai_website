import Image from "next/image";

export default function UniversityTrainingHeroShowcase() {
  return (
    <div className="relative w-full max-w-[640px]">
      {/* Ambient blue background glow */}
      <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.22),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute -top-8 -right-8 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />

      {/* Clean, perfectly fitted image container with no black bars */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(59,130,246,0.15)] leading-none">
        <Image
          src="/assets/university-training-hero.jpg"
          alt="Hands-On University Generative AI Training Lecture Hall"
          width={1280}
          height={720}
          priority
          className="block h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.01]"
          sizes="(max-width: 768px) 100vw, 640px"
        />
      </div>
    </div>
  );
}
