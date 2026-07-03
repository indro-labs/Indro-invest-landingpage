"use client";

import { useState } from "react";

export default function HeroEmailCapture() {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    window.dispatchEvent(new CustomEvent("selnite:prefill-email", { detail: email }));
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      onSubmit={submit}
      className="mb-4 flex w-full max-w-[480px] items-center gap-0 rounded-[11px] border-[1.5px] border-[#e0e0e0] bg-white py-1.5 pl-5 pr-1.5 shadow-[0_1px_4px_rgba(0,0,0,0.05)]"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Email address"
        className="flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
      />
      <button type="submit" className="btn-solid inline-flex items-center gap-2 px-6 py-2.5 text-sm">
        Request Access
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
