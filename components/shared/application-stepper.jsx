"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const stepStates = {
  completed: {
    dot: "bg-green-500 border-green-500",
    line: "bg-green-500",
    label: "text-foreground font-medium",
  },
  current: {
    dot: "border-[hsl(var(--role-primary))] bg-[hsl(var(--role-primary))]",
    line: "bg-muted",
    label: "role-text font-semibold",
  },
  upcoming: {
    dot: "border-muted-foreground/30 bg-transparent",
    line: "bg-muted",
    label: "text-muted-foreground",
  },
};

export function ApplicationStepper({ steps = [], currentStep = 0, className }) {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {steps.map((step, index) => {
        const state =
          index < currentStep
            ? "completed"
            : index === currentStep
              ? "current"
              : "upcoming";
        const styles = stepStates[state];
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.id || index}
            className={cn("flex items-center", !isLast && "flex-1")}
          >
            {/* Step dot + label */}
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                initial={false}
                animate={{
                  scale: state === "current" ? 1.15 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "h-3 w-3 rounded-full border-2 transition-colors duration-normal",
                  styles.dot
                )}
              />
              <span
                className={cn(
                  "text-[0.65rem] leading-none whitespace-nowrap",
                  styles.label
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="flex-1 h-0.5 mx-2 rounded-full overflow-hidden bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: state === "completed" ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-green-500 rounded-full"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
