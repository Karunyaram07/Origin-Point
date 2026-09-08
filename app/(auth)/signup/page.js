// @ts-nocheck
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Building2,
  BookOpen,
  Landmark,
  Check,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { GoogleIcon } from "@/components/ui/google-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
import { OriginWordmark } from "@/components/shared/origin-logo";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

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
    badgeColor:
      "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
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
    badgeColor:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
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
    badgeColor:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
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
    badgeColor:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    redirect: "/institution",
  },
];

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1); // 1 = choose role, 2 = fill form
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [signupSuccessMsg, setSignupSuccessMsg] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const queryRole = searchParams.get("role");
    if (queryRole && roleOptions.some((r) => r.id === queryRole)) {
      setSelectedRole(queryRole);
      setStep(2);
      try {
        localStorage.setItem("selected_role", queryRole);
      } catch {}
    } else {
      try {
        const saved = localStorage.getItem("selected_role");
        if (saved && roleOptions.some((r) => r.id === saved)) {
          setSelectedRole(saved);
          // Don't auto-advance to step 2 from localStorage — let user re-confirm
        }
      } catch {}
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    try {
      localStorage.setItem("selected_role", roleId);
      document.cookie = `skillsync_role=${roleId}; path=/; max-age=31536000`;
    } catch {}
    setStep(2);
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    setAuthError("");
    setSignupSuccessMsg("");

    const roleToAssign = selectedRole || "student";

    try {
      const normalizedEmail = values.email.trim().toLowerCase();
      const normalizedName = values.name.trim();

      // 1. Create user account via server endpoint (auto-confirms email and avoids SMTP failure)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: normalizedName,
          email: normalizedEmail,
          password: values.password,
          role: roleToAssign,
        }),
      });

      const resData = await res.json();
      if (!res.ok || resData.error) {
        setAuthError(resData.error || "Failed to create account. Please try again.");
        setIsLoading(false);
        return;
      }

      try {
        localStorage.setItem("skillsync_user_name", normalizedName);
        localStorage.setItem("selected_role", roleToAssign);
        document.cookie = `skillsync_role=${roleToAssign}; path=/; max-age=31536000`;
      } catch {}

      // 2. Sign in with the created credentials immediately
      const { data: loginData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: values.password,
        });

      if (loginError) {
        setSignupSuccessMsg(
          "Account created successfully! Please click 'Log In' below to sign in."
        );
        setIsLoading(false);
        return;
      }

      if (loginData?.session) {
        const roleOption = roleOptions.find((r) => r.id === roleToAssign);
        router.push(roleOption?.redirect || `/${roleToAssign}`);
        return;
      }
    } catch (err) {
      setAuthError(err.message || "An unexpected error occurred during sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    setAuthError("");
    const roleToAssign = selectedRole || "student";
    try {
      localStorage.setItem("selected_role", roleToAssign);
      document.cookie = `skillsync_role=${roleToAssign}; path=/; max-age=31536000`;
    } catch {}
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?mode=signup&role=${roleToAssign}`,
        },
      });
      if (error) {
        setAuthError(error.message);
        setIsGoogleLoading(false);
      }
    } catch (err) {
      setAuthError(err.message || "Failed to initiate Google sign in.");
      setIsGoogleLoading(false);
    }
  };

  const currentRoleInfo = roleOptions.find((r) => r.id === selectedRole);

  if (step === 2) {
    return (
      <div className="auth-page-shell min-h-screen flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key="step-form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="auth-form-card w-full max-w-md"
          >
            {/* Origin Point Logo */}
            <Link href="/" className="inline-flex items-center mb-5">
              <OriginWordmark className="text-xl font-bold" />
            </Link>

            {/* Role Banner */}
            {currentRoleInfo && (
              <div className="mb-4 flex items-center justify-between p-2.5 rounded-xl bg-card border border-border shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-xs",
                      currentRoleInfo.gradient
                    )}
                  >
                    <currentRoleInfo.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                      Signing up as
                    </p>
                    <p className="text-xs font-bold text-foreground">
                      {currentRoleInfo.label}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline px-2 py-1"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Change
                </button>
              </div>
            )}

            <h1 className="font-display text-2xl font-bold mb-1">
              Create your account
            </h1>
            <p className="text-muted-foreground text-sm mb-5">
              {currentRoleInfo
                ? `Set up your ${currentRoleInfo.label} workspace on Origin Point.`
                : "Complete sign up to access your Origin Point workspace."}
            </p>

            {authError && (
              <div className="mb-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {signupSuccessMsg && (
              <div className="mb-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0" />
                <span>{signupSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="signup-name">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    placeholder="Enter your name"
                    className="auth-card-input pl-9"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="signup-email">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="text"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="auth-card-input pl-9"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="signup-password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 6 characters"
                    className="auth-card-input pl-9 pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="auth-card-submit w-full mt-1"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-3 text-muted-foreground">
                  or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              disabled={isLoading || isGoogleLoading}
              className="auth-card-outline h-10 w-full flex items-center justify-center gap-2"
            >
              {isGoogleLoading ? (
                <span className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              ) : (
                <GoogleIcon className="h-4 w-4" />
              )}
              Google
            </Button>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-foreground hover:underline">
                Log In
              </Link>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Step 1: Full shell layout with role cards
  return (
    <div className="auth-page-shell min-h-screen flex flex-col justify-between p-4 sm:p-6 md:p-10">
      {/* Top Header */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between pb-6 border-b border-border/40">
        <Link href="/" className="inline-flex items-center gap-2">
          <OriginWordmark className="text-xl font-bold tracking-tight" />
        </Link>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-foreground hover:underline">
            Log In
          </Link>
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key="step-role"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Step 1 of 2</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
                Choose Your Role
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Pick the role that best describes you. Your workspace, tools, and analytics
                will be tailored to match.
              </p>
            </div>

            {/* 4 Roles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {roleOptions.map((role, idx) => {
                const Icon = role.icon;
                const isHighlighted = selectedRole === role.id;
                return (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    className={cn(
                      "relative group rounded-3xl border bg-card/80 backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 shadow-sm cursor-pointer",
                      isHighlighted
                        ? "border-primary ring-2 ring-primary/30 shadow-xl bg-card"
                        : "border-border/80 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
                    )}
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    {isHighlighted && (
                      <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                        <Check className="h-3 w-3" />
                        Selected
                      </div>
                    )}

                    <div>
                      {/* Icon */}
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

                      {/* Features */}
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

                    {/* CTA */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRoleSelect(role.id);
                      }}
                      className={cn(
                        "w-full h-11 rounded-xl font-semibold gap-2 transition-all cursor-pointer",
                        isHighlighted
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                          : "bg-muted hover:bg-primary hover:text-primary-foreground text-foreground"
                      )}
                    >
                      <span>Continue as {role.label}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
          Loading registration...
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
