"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ClipboardCheck,
  Briefcase,
  FileText,
  User,
  Building2,
  Users,
  FolderKanban,
  BookMarked,
  Handshake,
  FlaskConical,
  BarChart3,
  TrendingUp,
  PieChart,
} from "lucide-react";

const roleTabs = {
  student: [
    { label: "Home", href: "/student", icon: LayoutDashboard },
    { label: "Assess", href: "/student/assessment", icon: ClipboardCheck },
    { label: "Jobs", href: "/student/marketplace", icon: Briefcase },
    { label: "Portfolio", href: "/student/portfolio", icon: FileText },
    { label: "Profile", href: "/student/profile", icon: User },
  ],
  industry: [
    { label: "Home", href: "/industry", icon: LayoutDashboard },
    { label: "Post", href: "/industry/post", icon: Briefcase },
    { label: "Candidates", href: "/industry/candidates", icon: Users },
    { label: "Shortlist", href: "/industry/shortlist", icon: FolderKanban },
    { label: "Profile", href: "/industry/profile", icon: Building2 },
  ],
  academician: [
    { label: "Home", href: "/academician", icon: LayoutDashboard },
    { label: "FDPs", href: "/academician/fdps", icon: BookMarked },
    { label: "Consult", href: "/academician/consultancy", icon: Handshake },
    { label: "Research", href: "/academician/research", icon: FlaskConical },
    { label: "Profile", href: "/academician/profile", icon: User },
  ],
  institution: [
    { label: "Home", href: "/institution", icon: LayoutDashboard },
    { label: "Skills", href: "/institution/skills", icon: BarChart3 },
    { label: "Placement", href: "/institution/placement", icon: TrendingUp },
    { label: "Recruit", href: "/institution/recruitment", icon: PieChart },
    { label: "Profile", href: "/institution/profile", icon: User },
  ],
};

export function MobileBottomNav({ role = "student" }) {
  const pathname = usePathname();
  const tabs = roleTabs[role] || roleTabs.student;

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-sticky md:hidden",
        "glass-heavy border-t border-border",
        "safe-area-inset-bottom"
      )}
    >
      <div className="flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            pathname === tab.href ||
            (tab.href !== `/${role}` && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 flex-1 py-1 rounded-lg transition-colors",
                isActive
                  ? "role-text"
                  : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <Icon className={cn("h-5 w-5", isActive && "role-text")} />
                {isActive && (
                  <div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "hsl(var(--role-primary))" }}
                  />
                )}
              </div>
              <span className={cn(
                "text-[0.6rem] font-medium leading-none",
                isActive ? "role-text" : "text-muted-foreground"
              )}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
