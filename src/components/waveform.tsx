const DELAYS = [0, 0.25, 0.5, 0.15, 0.4];
const HEIGHTS = [0.55, 0.9, 0.7, 1, 0.6];

export function Waveform({
  bars = 5,
  className = "",
  barClassName = "bg-cobalt",
}: {
  bars?: number;
  className?: string;
  barClassName?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-4 items-end gap-[3px] ${className}`}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`animate-wave w-[3px] origin-bottom rounded-full ${barClassName}`}
          style={{
            height: `${HEIGHTS[i % HEIGHTS.length] * 100}%`,
            animationDelay: `${DELAYS[i % DELAYS.length]}s`,
          }}
        />
      ))}
    </span>
  );
}
