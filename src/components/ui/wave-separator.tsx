export function WaveSeparator() {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="relative z-10 block w-full h-[120px] -mt-[110px]"
    >
      <defs>
        <pattern id="wave-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" className="fill-foreground/10" />
        </pattern>
      </defs>
      <path
        d="M0,60 C200,110 400,20 720,55 C1040,95 1240,25 1440,60 L1440,120 L0,120 Z"
        className="fill-background"
      />
      <path
        d="M0,60 C200,110 400,20 720,55 C1040,95 1240,25 1440,60 L1440,120 L0,120 Z"
        fill="url(#wave-dots)"
      />
    </svg>
  );
}