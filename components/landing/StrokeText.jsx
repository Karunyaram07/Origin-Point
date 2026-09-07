"use client";

import { motion } from "framer-motion";

const powerTwoOut = [0.16, 1, 0.3, 1];

export default function StrokeText({
  text,
  strokeColor = "#A78BFA",
  fillColor = "#F8FAFC",
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = "power2.out",
  trigger = "mount",
  fillMode = "wipe",
  fontSize = 128,
  fontWeight = 800,
  letterSpacing = -4,
  reverse = false,
  className = "",
  lineClassNames = [],
  loopPause = 5,
}) {
  const lines = String(text).split("\n");
  const animationEase = ease === "power2.out" ? powerTwoOut : "easeOut";
  const initialDelay = trigger === "mount" ? 0 : 0.15;
  const fillDuration = 0.45;
  const fillStart = drawDuration + (fillMode === "wipe" ? fillDelay : 0);
  const cycleDuration = fillStart + fillDuration + loopPause;
  const drawEnd = drawDuration / cycleDuration;
  const fillEnd = fillStart / cycleDuration;
  const fillComplete = (fillStart + fillDuration) / cycleDuration;

  return (
    <div
      className={`landing-stroke-title ${className}`}
      role="img"
      aria-label={String(text).replace(/\n/g, " ")}
      style={className ? undefined : { fontSize, fontWeight, letterSpacing: `${letterSpacing}px` }}
    >
      {lines.map((line, index) => {
        const delay = initialDelay + (reverse ? lines.length - index - 1 : index) * stagger;

        return (
          <span key={`${line}-${index}`} className="landing-stroke-line-wrap">
            <motion.span
              className="landing-stroke-line landing-stroke-outline"
              style={{
                WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
                color: "transparent",
                paintOrder: "stroke fill",
              }}
              initial={{ clipPath: "inset(-20% 100% -30% -5%)" }}
              animate={{
                clipPath: [
                  "inset(-20% 100% -30% -5%)",
                  "inset(-20% -5% -30% -5%)",
                  "inset(-20% -5% -30% -5%)",
                ],
              }}
              transition={{
                delay,
                duration: cycleDuration,
                times: [0, drawEnd, 1],
                ease: animationEase,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {line}
            </motion.span>
            <motion.span
              className={`landing-stroke-line landing-stroke-fill ${lineClassNames[index] || ""}`}
              style={lineClassNames[index] ? undefined : { color: fillColor }}
              initial={{ clipPath: "inset(-20% 100% -30% -5%)" }}
              animate={{
                clipPath: [
                  "inset(-20% 100% -30% -5%)",
                  "inset(-20% 100% -30% -5%)",
                  "inset(-20% -5% -30% -5%)",
                  "inset(-20% -5% -30% -5%)",
                ],
              }}
              transition={{
                delay,
                duration: cycleDuration,
                times: [0, fillEnd, fillComplete, 1],
                ease: animationEase,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {line}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}
