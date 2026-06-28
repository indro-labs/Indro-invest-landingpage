"use client";

import { useEffect, useRef } from "react";

/* Plays once on load, then holds on the final network frame. Clicking the
   Selnite logo (anywhere) dispatches "selnite:replay" and it plays again,
   exactly like the first time. */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const replay = () => {
      const v = ref.current;
      if (!v) return;
      v.currentTime = 0;
      v.play().catch(() => {});
    };
    window.addEventListener("selnite:replay", replay);
    return () => window.removeEventListener("selnite:replay", replay);
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      playsInline
      poster="/hero-poster.jpg"
      className="absolute inset-0 -z-20 h-full w-full object-cover"
    >
      <source src="/hero-neural.mp4" type="video/mp4" />
    </video>
  );
}
