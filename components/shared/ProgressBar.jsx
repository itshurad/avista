export default function ProgressBar({
  value = 0,
  max = 100,
  className = "",
  showPercentage = false,
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {showPercentage && (
        <div className="flex justify-between text-xs text-[var(--av-text-muted)] font-medium">
          <span>پیشرفت</span>
          <span>{percentage}٪</span>
        </div>
      )}
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--av-border)]"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-[var(--av-accent)] transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}