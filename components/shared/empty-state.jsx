import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* Custom SVG illustrations for empty states — avoids the generic "undraw" look */

const illustrations = {
  search: (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <circle cx="52" cy="52" r="30" stroke="currentColor" strokeWidth="3" className="text-muted-foreground/20" />
      <line x1="74" y1="74" x2="100" y2="100" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-muted-foreground/30" />
      <circle cx="44" cy="46" r="3" fill="currentColor" className="text-muted-foreground/15" />
      <circle cx="60" cy="46" r="3" fill="currentColor" className="text-muted-foreground/15" />
      <path d="M42 58 c4 6 16 6 20 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/20" />
    </svg>
  ),
  empty: (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <rect x="20" y="30" width="80" height="60" rx="8" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/20" />
      <path d="M20 50h80" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/10" />
      <rect x="32" y="58" width="24" height="4" rx="2" fill="currentColor" className="text-muted-foreground/10" />
      <rect x="32" y="68" width="40" height="4" rx="2" fill="currentColor" className="text-muted-foreground/8" />
      <rect x="32" y="78" width="16" height="4" rx="2" fill="currentColor" className="text-muted-foreground/6" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <rect x="15" y="80" width="14" height="20" rx="3" fill="currentColor" className="text-muted-foreground/10" />
      <rect x="35" y="60" width="14" height="40" rx="3" fill="currentColor" className="text-muted-foreground/15" />
      <rect x="55" y="45" width="14" height="55" rx="3" fill="currentColor" className="text-muted-foreground/12" />
      <rect x="75" y="35" width="14" height="65" rx="3" fill="currentColor" className="text-muted-foreground/18" />
      <rect x="95" y="55" width="14" height="45" rx="3" fill="currentColor" className="text-muted-foreground/10" />
      <path d="M15 105h100" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/15" />
    </svg>
  ),
};

export function EmptyState({
  type = "empty",
  title = "Nothing here yet",
  description = "Get started by creating your first item.",
  actionLabel,
  onAction,
  className,
}) {
  const illustration = illustrations[type] || illustrations.empty;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      <div className="w-24 h-24 mb-6 opacity-60">{illustration}</div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs text-pretty mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="role-bg-primary hover:opacity-90">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
