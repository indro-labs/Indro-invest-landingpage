export default function OnboardingProgress({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  const pct = Math.min(100, Math.round((step / total) * 100));

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-ink-faint">
          Question {step} of {total}
        </span>
        <span className="text-xs font-medium text-ink-faint">{pct}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
