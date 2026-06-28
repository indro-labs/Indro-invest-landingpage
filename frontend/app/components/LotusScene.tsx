"use client";

import dynamic from "next/dynamic";

// 3D is client-only — load after mount with a calm placeholder.
const Lotus3D = dynamic(() => import("./Lotus3D"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center">
      <div
        className="h-28 w-28 rounded-full blur-2xl opacity-50"
        style={{ background: "var(--accent-soft)" }}
      />
    </div>
  ),
});

export default function LotusScene() {
  return (
    <div className="relative h-[360px] sm:h-[440px] md:h-[500px] w-full">
      <div
        className="absolute left-1/2 bottom-10 -translate-x-1/2 h-20 w-72 rounded-[100%] blur-2xl opacity-40"
        style={{ background: "var(--accent-soft)" }}
      />
      <Lotus3D />
    </div>
  );
}
