import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const categoryColors = {
  frontend: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  backend: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  design: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  data: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  devops: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  mobile: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  ml: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  soft: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
  default: "role-bg-soft role-text role-border",
};

export function SkillTag({
  name,
  category = "default",
  level,
  verified = false,
  className,
}) {
  const colorClass = categoryColors[category] || categoryColors.default;

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        colorClass,
        className
      )}
    >
      {verified && (
        <svg
          className="h-3 w-3 text-current opacity-70"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.78 5.97-4.25 5a.75.75 0 0 1-1.08.02L4.22 8.76a.75.75 0 0 1 1.06-1.06l1.7 1.7 3.72-4.37a.75.75 0 0 1 1.08 1.04z" />
        </svg>
      )}
      <span>{name}</span>
      {level && (
        <span className="opacity-50">·</span>
      )}
      {level && (
        <span className="text-[0.65rem] uppercase opacity-60">{level}</span>
      )}
    </Badge>
  );
}
