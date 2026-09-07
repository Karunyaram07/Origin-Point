"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Landmark,
  ArrowRight,
  Check,
  Sparkles,
  LogOut,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
import { OriginWordmark } from "@/components/shared/origin-logo";

const roleOptions = [
  {
    id: "student",
    label: "Student",
    subtitle: "Learners & Candidates",
    desc: "Assess skills, build verified portfolio & land high-impact internships.",
    features: [
      "AI Skill Diagnostics & Benchmarking",
      "Dynamic Career & Internship Matcher",
      "Cryptographically Verified Credential Hub",
    ],
    icon: GraduationCap,
    gradient: "from-indigo-500 to-cyan-400",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    redirect: "/student",
  },
  {
    id: "industry",
    label: "Industry",
    subtitle: "Recruiters & Companies",
    desc: "Post opportunities, discover verified talent & streamline technical hiring.",
    features: [
      "AI-Powered Candidate Shortlisting",
      "Role-Specific Skill Gap Reports",
      "Direct Internship & Project Pipeline",
    ],
    icon: Building2,
    gradient: "from-amber-500 to-orange-400",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    redirect: "/industry",
  },
  {
    id: "academician",
    label: "Academician",
    subtitle: "Faculty, Mentors & Guides",
    desc: "Drive FDPs, consultancy, research collaborations & student mentorship.",
    features: [
      "Student Skill Analytics & Progress",
      "Inter-College Research Matchmaking",
      "Faculty Development & Grant Tracking",
    ],
    icon: BookOpen,
    gradient: "from-emerald-500 to-teal-400",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    redirect: "/academician",
  },
  {
    id: "institution",
    label: "Institution",
    subtitle: "Universities & Departments",
    desc: "Departmental intelligence, placement analytics & accreditation-ready data.",
    features: [
      "Real-time Placement Readiness Metrics",
      "Outcome-Based Curriculum Feedback",
      "NIRF / NAAC Data Alignment Hub",
    ],
    icon: Landmark,
    gradient: "from-blue-500 to-indigo-500",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    redirect: "/institution",
  },
];

function SelectRoleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSignupIntent = searchParams.get("intent") === "signup";
  const errorMessage = searchParams.get("error");

  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentUser(user);

          // Check if role is already chosen in profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .maybeSingle();

          if (profile?.role && roleOptions.some((r) => r.id === profile.role)) {
            setSelectedRole(profile.role);
          }
        } else {
          // Check localStorage for previously chosen role
          const savedRole = localStorage.getItem("selected_role");
          if (savedRole && roleOptions.some((r) => r.id === savedRole)) {
            setSelectedRole(savedRole);
          }
        }
      } catch (err) {
        console.error("Error loading user in SelectRole:", err);
      } finally {
        setIsLoadingUser(false);
      }
    }
    loadUser();
  }, [router]);

  const handleSelectRole = async (roleId) => {
    setSelectedRole(roleId);
    setIsSubmitting(true);
    try {
      localStorage.setItem("selected_role", roleId);
      document.cookie = `skillsync_role=${roleId}; path=/; max-age=31536000`;
    } catch {
      // localStorage may fail in private mode
    }

    // If this is signup intent or user has no session, route directly to signup page for that role
    if (isSignupIntent || !currentUser) {
      router.push(`/signup?role=${roleId}`);
      return;
    }

    try {
      if (currentUser?.id) {
        // 1. Update profiles table
        await supabase.from("profiles").upsert(
          {
            id: currentUser.id,
            email: currentUser.email,
            full_name:
              currentUser.user_metadata?.full_name ||
              currentUser.user_metadata?.name ||
              currentUser.email?.split("@")[0] ||
              "User",
            role: roleId,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

        // 2. Update auth user metadata
        await supabase.auth.updateUser({
          data: { role: roleId },
        });
      }

      const roleOption = roleOptions.find((r) => r.id === roleId);
      router.push(roleOption?.redirect || `/${roleId}`);
    } catch (err) {
      console.error("Failed to set role:", err);
      const roleOption = roleOptions.find((r) => r.id === roleId);
      router.push(roleOption?.redirect || `/${roleId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    router.push("/login");
  };

  const userDisplayName =
    currentUser?.user_metadata?.full_name ||
    currentUser?.user_metadata?.name ||
    currentUser?.email?.split("@")[0] ||
    "";

  return (
    <div className="auth-page-shell min-h-screen flex flex-col justify-between p-4 sm:p-6 md:p-10">
      {/* Top Header */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between pb-6 border-b border-border/40">
        <Link href="/" className="inline-flex items-center gap-2">
          <OriginWordmark className="text-xl font-bold tracking-tight" />
        </Link>
        {currentUser ? (
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border/60 hover:border-border"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border/60 hover:border-border"
            >
              Log In
            </Link>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto py-8 sm:py-12">
        {errorMessage && (
          <div className="mb-8 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between gap-3 max-w-2xl mx-auto">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span className="font-medium">{decodeURIComponent(errorMessage)}</span>
            </div>
            <Link
              href="/login"
              className="text-xs underline hover:opacity-80 shrink-0 font-semibold"
            >
              Back to Login
            </Link>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isSignupIntent ? "Get Started" : "Choose Your Role"}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            {isSignupIntent
              ? "Select Role to Create Account"
              : currentUser && userDisplayName
              ? `Welcome, ${userDisplayName}!`
              : "Select Your Workspace"}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {isSignupIntent
              ? "Choose the role that fits you best. You'll complete registration on the next step."
              : "Please choose the role that best describes you to customize your workspace, analytics, and collaboration tools."}
          </p>
        </motion.div>

        {/* 4 Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {roleOptions.map((role, idx) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={cn(
                  "relative group rounded-3xl border bg-card/80 backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 shadow-sm",
                  isSelected
                    ? "border-primary ring-2 ring-primary/30 shadow-xl bg-card"
                    : "border-border/80 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
                )}
              >
                {/* Active Indicator Badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                    <Check className="h-3 w-3" />
                    Selected
                  </div>
                )}

                <div>
                  {/* Icon Header */}
                  <div
                    className={cn(
                      "h-12 w-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-md mb-5",
                      role.gradient
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="mb-2">
                    <span
                      className={cn(
                        "inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md border mb-2",
                        role.badgeColor
                      )}
                    >
                      {role.subtitle}
                    </span>
                    <h3 className="font-display text-xl font-bold tracking-tight">
                      {role.label}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-xs leading-5 mb-5">
                    {role.desc}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-border/50">
                    {role.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2 text-xs text-foreground/80"
                      >
                        <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continue button */}
                <Button
                  onClick={() => handleSelectRole(role.id)}
                  disabled={isSubmitting}
                  className={cn(
                    "w-full h-11 rounded-xl font-semibold gap-2 transition-all cursor-pointer",
                    isSelected
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                      : "bg-muted hover:bg-primary hover:text-primary-foreground text-foreground"
                  )}
                >
                  <span>{isSignupIntent ? `Sign Up as ${role.label}` : `Enter as ${role.label}`}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default function SelectRolePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SelectRoleContent />
    </Suspense>
  );
}
