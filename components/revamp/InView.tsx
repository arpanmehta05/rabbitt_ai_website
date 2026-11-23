"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Marks its box with data-in once 20% of it is on screen. CSS does the rest (the line drawings and the
// row-by-row fades), so with no script, or with reduced motion, everything is simply already there.
export default function InView({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{ ["--d" as string]: `${delay}ms` }}
      {...(seen ? { "data-in": "" } : {})}
    >
      {children}
    </div>
  );
}
