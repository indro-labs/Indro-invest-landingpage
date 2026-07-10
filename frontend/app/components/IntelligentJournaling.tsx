"use client";

const FIELDS = [
  { label: "Entry Reason", value: "Breakout above resistance with volume confirmation" },
  { label: "Exit Reason", value: "Hit profit target as momentum stalled" },
  { label: "Emotional State", value: "Calm — followed the plan" },
  { label: "Mistakes", value: "Sized slightly large for the volatility" },
];

const FLOW_STEPS = ["Trade completed", "Journal created", "AI analysis appears", "Patterns update automatically"];

function JournalChrome() {
  return (
    <div className="mb-6 flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--line-soft)" }}>
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full" style={{ background: "#3a3a3a" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#3a3a3a" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#3a3a3a" }} />
      </div>
      <div className="rounded-md bg-white/5 px-4 py-1.5 text-sm font-semibold text-ink-faint">Trade Journal · NVDA</div>
    </div>
  );
}

export default function IntelligentJournaling() {
  return (
    <section className="relative overflow-hidden bg-bg px-4 sm:px-6 py-36 sm:py-48">
      {/* Looping video background — fixed height so it stays crisp regardless of content height */}
      <div className="absolute inset-x-0 top-1/2 h-[820px] w-full -translate-y-1/2 sm:h-[980px]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/intelligent-journaling.mp4"
          poster="/videos/intelligent-journaling-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0" style={{ background: "rgba(6,4,10,0.6)" }} />
        {/* Fade in from the section's own background */}
        <div
          className="absolute inset-x-0 top-0 h-56 sm:h-72"
          style={{ background: "linear-gradient(to bottom, var(--bg) 0%, transparent 100%)" }}
        />
        {/* Fade out into the section's own background */}
        <div
          className="absolute inset-x-0 bottom-0 h-56 sm:h-72"
          style={{ background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)" }}
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1100px] text-center">
        <h2 className="display mb-8 text-5xl sm:text-6xl lg:text-[5rem]">Your Intelligent Journal</h2>
        <p className="mx-auto mb-20 max-w-3xl text-xl leading-relaxed text-ink-soft sm:text-2xl">
          Capture every trade in seconds while AI extracts the insights that matter.
        </p>

        {/* Flow */}
        <div className="mb-20 flex flex-wrap items-center justify-center gap-x-4 gap-y-5 sm:gap-x-5">
          {FLOW_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-4 sm:gap-5">
              <span
                className="rounded-full px-6 py-3 text-base font-semibold backdrop-blur-xl sm:text-lg"
                style={{
                  border: i === FLOW_STEPS.length - 1 ? "1px solid rgba(196,148,249,0.5)" : "1px solid rgba(255,255,255,0.15)",
                  background:
                    i === FLOW_STEPS.length - 1
                      ? "linear-gradient(135deg, rgba(124,58,237,0.55), rgba(99,102,241,0.45))"
                      : "rgba(10,8,15,0.55)",
                  color: "#fff",
                }}
              >
                {step}
              </span>
              {i < FLOW_STEPS.length - 1 && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Journal glass card */}
        <div className="relative mx-auto mb-20 max-w-[800px] text-left sm:mb-24">
          <div
            className="relative overflow-hidden rounded-[30px] p-8 backdrop-blur-xl sm:p-11"
            style={{
              border: "1px solid rgba(167,139,250,0.3)",
              background: "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(10,8,15,0.8) 55%, rgba(10,8,15,0.92) 100%)",
              boxShadow: "0 50px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.08)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(196,148,249,0.7), transparent)" }}
            />
            <JournalChrome />

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.label} className="rounded-2xl p-5" style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.03)" }}>
                  <div className="mb-1.5 text-sm text-ink-faint">{f.label}</div>
                  <div className="text-lg font-semibold text-white">{f.value}</div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-5" style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.03)" }}>
              <div className="mb-1.5 text-sm text-ink-faint">Lessons Learned</div>
              <div className="text-lg font-semibold text-white">Trust the setup — reduce size on high-IV days.</div>
            </div>
          </div>

          {/* AI-generated summary — corner popup */}
          <div className="absolute -bottom-12 -right-3 z-[2] w-[82%] sm:-bottom-14 sm:-right-4 sm:w-[66%]">
            <div
              className="rounded-2xl px-6 py-6 backdrop-blur-xl sm:px-7 sm:py-7"
              style={{
                border: "1px solid rgba(129,140,248,0.45)",
                background: "linear-gradient(135deg, rgba(99,102,241,0.35) 0%, rgba(124,58,237,0.35) 55%, rgba(49,20,110,0.45) 100%)",
                boxShadow: "0 25px 60px rgba(79,70,229,0.4)",
              }}
            >
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-white/70 sm:text-sm">AI-Generated Summary</div>
              <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                Clean execution overall. Sizing was your only deviation — this setup remains your highest-edge pattern this
                month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
