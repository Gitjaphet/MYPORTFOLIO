type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

function CornerTrace({ corner, delay = 0 }: { corner: Corner; delay?: number }) {
  const positionClass = {
    "top-left": "top-6 left-6 sm:top-8 sm:left-8",
    "top-right": "top-6 right-6 sm:top-8 sm:right-8",
    "bottom-left": "bottom-6 left-6 sm:bottom-8 sm:left-8",
    "bottom-right": "bottom-6 right-6 sm:bottom-8 sm:right-8",
  }[corner];

  const flip = {
    "top-left": "",
    "top-right": "-scale-x-100",
    "bottom-left": "-scale-y-100",
    "bottom-right": "-scale-x-100 -scale-y-100",
  }[corner];

  return (
    <svg
      className={`absolute h-16 w-28 sm:h-20 sm:w-36 ${positionClass} ${flip}`}
      viewBox="0 0 140 100"
      fill="none"
    >
      <defs>
        <filter id={`glow-${corner}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <path
        d="M10 10 L70 10 L70 50 L120 50"
        stroke="#84CC16"
        className="dark:stroke-[#A3E635]"
        strokeWidth="5"
        filter={`url(#glow-${corner})`}
        opacity="0.35"
      />
      <path
        d="M10 10 L70 10 L70 50 L120 50"
        stroke="#84CC16"
        className="dark:stroke-[#A3E635]"
        strokeWidth="1.5"
        opacity="0.4"
        pathLength={1}
      />
      <path
        d="M10 10 L70 10 L70 50 L120 50"
        stroke="#84CC16"
        className="dark:stroke-[#A3E635]"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: "0.12 1",
          animation: `techFlow ${3 + delay}s linear infinite`,
          animationDelay: `${delay * 0.5}s`,
        }}
      />
      <circle cx="120" cy="50" r="3" fill="#84CC16" className="dark:fill-[#A3E635]" />
    </svg>
  );
}

export function TechGridBackground({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.35] dark:opacity-[0.4] ${className}`}
    >
      <style>{`
        @keyframes techFlow {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: -1; }
        }
      `}</style>

      <CornerTrace corner="top-left" delay={0} />
      <CornerTrace corner="top-right" delay={1} />
      <CornerTrace corner="bottom-left" delay={2} />
      <CornerTrace corner="bottom-right" delay={3} />
    </div>
  );
}