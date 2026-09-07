"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * A stat card with an optional animated counter and role-aware accent.
 */
export function StatCard({
  label,
  value,
  suffix = "",
  trend,
  trendLabel,
  icon: Icon,
  className,
}) {
  const trendColors = {
    up: "text-green-500",
    down: "text-red-400",
    neutral: "text-muted-foreground",
  };
  const trendArrows = {
    up: "↑",
    down: "↓",
    neutral: "→",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card p-5",
        "hover:shadow-md hover:border-[hsl(var(--role-primary)/0.2)] transition-all duration-normal",
        className
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-slow role-gradient-subtle pointer-events-none" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="font-display text-2xl font-bold tracking-tight">
            {value}
            {suffix && (
              <span className="text-base font-normal text-muted-foreground ml-0.5">
                {suffix}
              </span>
            )}
          </p>
          {trend && (
            <p
              className={cn(
                "text-xs font-medium mt-1 flex items-center gap-1",
                trendColors[trend] || trendColors.neutral
              )}
            >
              <span>{trendArrows[trend]}</span>
              {trendLabel}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-2.5 rounded-lg role-bg-soft">
            <Icon className="h-5 w-5 role-text" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
