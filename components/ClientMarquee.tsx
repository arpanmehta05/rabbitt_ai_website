"use client";

import Image from "next/image";
import { useState } from "react";

interface Brand {
  name: string;
  logo: string;
}

const tape1: Brand[] = [
  { name: "Spinny", logo: "/brands/spinny.svg" },
  { name: "Cars24", logo: "/brands/cars24.png" },
  { name: "Acko Drive", logo: "/brands/ackodrive.webp" },
  { name: "91Wheels", logo: "/brands/91wheels.png" },
  { name: "Pristyn Care", logo: "/brands/pristyncare.svg" },
  { name: "TATA 1mg", logo: "/brands/tata1mg.svg" },
  { name: "Truemeds", logo: "/brands/truemeds.png" },
  { name: "Healthkart", logo: "/brands/healthkart.png" },
  { name: "Paytm", logo: "/brands/paytm.svg" },
  { name: "PhonePe", logo: "/brands/phonepe.png" },
  { name: "Groww", logo: "/brands/groww.png" },
  { name: "Acko", logo: "/brands/acko.svg" },
  { name: "Policybazaar", logo: "/brands/policybazaar.png" },
];

const tape2: Brand[] = [
  { name: "Unacademy", logo: "/brands/unacademy.svg" },
  { name: "UpGrad", logo: "/brands/upgrad.png" },
  { name: "Interview Kickstart", logo: "/brands/interviewkickstart.png" },
  { name: "Extramarks", logo: "/brands/extramarks.png" },
  { name: "99acres", logo: "/brands/99acres.png" },
  { name: "SquareYards", logo: "/brands/squareyards.svg" },
  { name: "MagicBricks", logo: "/brands/magicbricks.png" },
  { name: "NoBroker", logo: "/brands/nobroker.png" },
  { name: "Lead Squared", logo: "/brands/leadsquared.png" },
  { name: "SHRM", logo: "/brands/shrm.png" },
  { name: "Darwinbox", logo: "/brands/darwinbox.webp" },
  { name: "Moengage", logo: "/brands/moengage.png" },
];

function BrandLogo({ brand }: { brand: Brand }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="mx-6 flex shrink-0 items-center justify-center sm:mx-8"
      title={brand.name}
    >
      {!imgError ? (
        <Image
          src={brand.logo}
          alt={brand.name}
          width={160}
          height={54}
          className="h-10 w-auto max-w-[130px] object-contain opacity-85 transition-opacity duration-300 hover:opacity-100 sm:h-[52px] sm:max-w-[160px]"
          onError={() => setImgError(true)}
          unoptimized
        />
      ) : (
        <span className="text-xs font-semibold text-slate-400">
          {brand.name}
        </span>
      )}
    </div>
  );
}

function Tape({
  brands,
  direction,
  duration,
}: {
  brands: Brand[];
  direction: "left" | "right";
  duration: number;
}) {
  const items = [...brands, ...brands, ...brands];
  const animationName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className="relative flex overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#020305] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#020305] to-transparent" />
      <div
        className="flex items-center py-2"
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {items.map((brand, i) => (
          <BrandLogo key={`${brand.name}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

export default function ClientMarquee() {
  return (
    <section className="relative overflow-hidden bg-[#020305] py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      <div className="relative z-10 mb-6 px-6 text-center sm:px-10 lg:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300 sm:text-base">
          Trusted by industry leaders
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <Tape brands={tape1} direction="left" duration={40} />
        <Tape brands={tape2} direction="right" duration={36} />
      </div>

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
