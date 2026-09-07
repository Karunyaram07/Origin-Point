import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-md skeleton-shimmer",
        className
      )}
      {...props}
    />
  );
}

export function SkeletonCard({ className }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4 space-y-3",
        className
      )}
    >
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3, className }) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonChart({ className }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-6", className)}>
      <Skeleton className="h-4 w-1/4 mb-6" />
      <div className="flex items-end gap-2 h-40">
        {[40, 65, 55, 80, 70, 90, 60].map((h, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-md"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}
