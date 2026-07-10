"use client";

import { useEffect, useRef } from "react";

/* Full-bleed hero video. Replays from the start when the logo/HomeLink is clicked. */
export default function HeroMoon() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onReplay = () => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = 0;
      v.play().catch(() => {});
    };
    window.addEventListener("selnite:replay", onReplay);
    return () => window.removeEventListener("selnite:replay", onReplay);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/herovideo.mp4"
        poster="/moon-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(124,58,237,0.5)", mixBlendMode: "color" }}
      />
     
    </div>
  );
}
