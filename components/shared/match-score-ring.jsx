"use client";

import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-3 w-3",
  md: "h-5 w-5",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

export function MatchScoreRing({
  score = 0,
  maxScore = 100,
  size = "md",
  showLabel = true,
  className = "",
}) {
  const percentage = Math.min(Math.max((score / maxScore) * 100, 0), 100);
  const sizeClass = sizes[size] || sizes.md;

  // SVG circle math
  const dims = { sm: 12, md: 20, lg: 32, xl: 48 };
  const dim = dims[size] || 20;
  const strokeWidths = { sm: 2, md: 2.5, lg: 3, xl: 4 };
  const sw = strokeWidths[size] || 2.5;
  const r = (dim - sw) / 2;
  const circumference = 2 * Math.PI * r;
  const filled = circumference - (percentage / 100) * circumference;

  const getColor = (pct) => {
    if (pct >= 80) return "text-green-500";
    if (pct >= 60) return "text-yellow-500";
    if (pct >= 40) return "text-orange-500";
    return "text-red-400";
  };

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", sizeClass, className)}
    >
      <svg
        viewBox={`0 0 ${dim} ${dim}`}
        className={cn("transform -rotate-90", sizeClass)}
      >
        {/* Background ring */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
          className="text-muted/40"
        />
        {/* Filled ring */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={filled}
          className={cn(
            "transition-[stroke-dashoffset] duration-700 ease-smooth",
            getColor(percentage)
          )}
        />
      </svg>
      {showLabel && (size === "lg" || size === "xl") && (
        <span
          className={cn(
            "absolute font-display font-bold",
            size === "xl" ? "text-sm" : "text-[0.6rem]"
          )}
        >
          {Math.round(percentage)}
        </span>
      )}
    </div>
  );
}
