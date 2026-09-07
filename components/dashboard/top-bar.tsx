"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Bell,
  Search,
  User,
  LogOut,
  CheckCheck,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase/client";

interface TopBarProps {
  role?: string;
  title?: string;
  className?: string;
}

export function TopBar({ role = "student", title, className }: TopBarProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY < 32);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    try {
      const cached = localStorage.getItem("skillsync_user_name");
      if (cached) setUserName(cached);
    } catch {}

    async function getUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", user.id)
            .maybeSingle();

          const resolved =
            profile?.full_name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split("@")[0];

          if (resolved) {
            setUserName(resolved);
            try {
              localStorage.setItem("skillsync_user_name", resolved);
            } catch {}
          }
        }
      } catch (e) {
        console.warn("Could not get user in top-bar:", e);
      }
    }
    getUser();

    const handleStorage = () => {
      try {
        const updated = localStorage.getItem("skillsync_user_name");
        if (updated) setUserName(updated);
      } catch {}
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("SignOut error:", err);
    }
    router.push("/login");
  };

  const userInitial = (userName || role).trim().charAt(0).toUpperCase();

  return (
    <header
      className={cn(
        "dashboard-top-bar sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-border/70 px-4 md:px-6",
        isVisible ? "" : "is-hidden",
        className
      )}
    >
      {/* Left: Page title */}
      <div className="flex items-center gap-3">
        {title && (
          <h2 className="font-display text-lg font-semibold tracking-tight truncate">
            {title}
          </h2>
        )}
      </div>

      {/* Center: Search (desktop only) */}
      <div className="hidden md:flex flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search anything… (⌘K)"
            className="pl-9 h-9 bg-muted/50 border-transparent focus:border-border focus:bg-background transition-colors"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <ThemeToggle className="hidden md:inline-flex" />

        {/* Mobile search */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 md:hidden"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Notifications (Refined vertical layout, spacious & free) */}
        <div className="relative" ref={notificationsRef}>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 cursor-pointer"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((prev) => !prev)}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -4 }}
                className="absolute right-0 mt-2 w-[min(22.5rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl z-50"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/70 px-4 py-3 bg-muted/20">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">Notifications</span>
                    <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-primary/10 text-primary">
                      2 new
                    </span>
                  </div>
                  <button className="text-xs font-semibold role-text flex items-center gap-1.5 hover:underline cursor-pointer">
                    <CheckCheck className="h-3.5 w-3.5" />
                    Mark all read
                  </button>
                </div>

                {/* Vertical, spacious notification items */}
                <div className="divide-y divide-border/50 p-1.5">
                  <button className="w-full rounded-xl p-3 text-left transition-colors hover:bg-muted/50 space-y-1.5 cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-foreground leading-snug">
                            Profile 85% complete
                          </p>
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap font-medium">
                            10m ago
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          Add your latest projects to unlock priority matching with hiring partners.
                        </p>
                      </div>
                    </div>
                  </button>

                  <button className="w-full rounded-xl p-3 text-left transition-colors hover:bg-muted/50 space-y-1.5 cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bell className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-foreground leading-snug">
                            New Match: Frontend Intern
                          </p>
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap font-medium">
                            1h ago
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          TechCorp India posted an opportunity matching 92% of your verified skills.
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Footer */}
                <div className="border-t border-border/70 px-4 py-2.5 bg-muted/10 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Showing recent alerts</span>
                  <button className="text-xs font-semibold role-text hover:underline cursor-pointer">
                    View all &rarr;
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="h-9 w-9 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            aria-label="Profile menu"
          >
            <div className="h-full w-full rounded-full role-gradient flex items-center justify-center text-white text-xs font-bold">
              {userInitial}
            </div>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-border bg-card shadow-xl z-50"
              >
                {userName && (
                  <div className="px-4 py-2.5 border-b border-border/60 bg-muted/20">
                    <p className="text-xs font-bold truncate text-foreground">{userName}</p>
                    <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">{role}</p>
                  </div>
                )}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push(`/${role}/profile`);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors text-left cursor-pointer"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  Profile
                </button>
                <div className="border-t border-border" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors text-destructive text-left cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
