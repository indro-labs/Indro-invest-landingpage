"use client";

import dynamic from "next/dynamic";

// 3D is client-only — load it after mount, with a calm placeholder so the
// hero never flashes empty or breaks SSR.
const Crystal3D = dynamic(() => import("./Crystal3D"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center">
      <div
        className="h-32 w-32 rounded-full blur-2xl opacity-60"
        style={{ background: "var(--glow-a)" }}
      />
    </div>
  ),
});

export default function CrystalScene() {
  return (
    <div className="relative h-[340px] sm:h-[420px] md:h-[480px] w-full">
      {/* soft floor glow under the crystal */}
      <div
        className="absolute left-1/2 bottom-6 -translate-x-1/2 h-24 w-72 rounded-[100%] blur-2xl opacity-50"
        style={{ background: "var(--glow-a)" }}
      />
      <Crystal3D />
    </div>
  );
}
