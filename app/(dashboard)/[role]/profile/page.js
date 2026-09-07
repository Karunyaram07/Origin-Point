"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, MapPin, Save, Sparkles, UserRound, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";

const roleConfig = {
  student: {
    label: "Student",
    title: "Build a profile employers remember",
    description: "Tell us what you are learning, building, and looking for next.",
    name: "Priya Sharma",
    headline: "Frontend developer in the making",
    location: "Bengaluru, India",
    bio: "I enjoy turning thoughtful ideas into simple, useful digital experiences.",
    skills: ["React", "JavaScript", "TypeScript", "Figma"],
  },
  industry: {
    label: "Industry",
    title: "Make your organisation discoverable",
    description: "Set up the details candidates need before they apply.",
    name: "TechCorp India",
    headline: "Building products for a connected world",
    location: "Bengaluru, India",
    bio: "We partner with emerging talent to solve meaningful problems at scale.",
    skills: ["Product", "Engineering", "Mentorship", "Hiring"],
  },
  academician: {
    label: "Academician",
    title: "Share your expertise with the right partners",
    description: "Create a profile for research, consultancy, and collaboration.",
    name: "Dr. Ananya Rao",
    headline: "Professor of Computer Science",
    location: "Hyderabad, India",
    bio: "I work at the intersection of applied research, teaching, and industry collaboration.",
    skills: ["Research", "Teaching", "AI", "Consultancy"],
  },
  institution: {
    label: "Institution",
    title: "Give your institution a clear presence",
    description: "Add the details that help partners and students connect with you.",
    name: "Northstar University",
    headline: "Preparing students for the future of work",
    location: "Pune, India",
    bio: "We connect education, industry, and opportunity through measurable outcomes.",
    skills: ["Placements", "Analytics", "Partnerships", "Student Success"],
  },
};

const profileSteps = [
  { label: "Basic information", done: true },
  { label: "Add a short bio", done: true },
  { label: "Add skills or focus areas", done: false },
  { label: "Add a profile photo", done: false },
];

export default function ProfilePage({ params }) {
  const config = roleConfig[params.role] || roleConfig.student;
  const [form, setForm] = useState({
    name: config.name,
    headline: config.headline,
    location: config.location,
    bio: config.bio,
  });
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const cachedName = localStorage.getItem("skillsync_user_name");
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", user.id)
            .maybeSingle();

          const currentName =
            profile?.full_name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            cachedName ||
            config.name;

          setForm((prev) => ({ ...prev, name: currentName }));
          if (currentName) {
            localStorage.setItem("skillsync_user_name", currentName);
          }
        } else if (cachedName) {
          setForm((prev) => ({ ...prev, name: cachedName }));
        }
      } catch (e) {
        console.warn("Could not load profile:", e);
      }
    }
    loadProfile();
  }, [config.name]);

  const updateField = (field, value) => {
    setSaved(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (form.name?.trim()) {
        try {
          localStorage.setItem("skillsync_user_name", form.name.trim());
          window.dispatchEvent(new Event("storage"));
        } catch {}
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").upsert(
          {
            id: user.id,
            full_name: form.name.trim(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

        await supabase.auth.updateUser({
          data: { full_name: form.name.trim() },
        });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardShell role={params.role} title="Profile">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl space-y-8 pb-16 pt-2">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-2">
          <div>
            <Link href={`/${params.role}`} className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
            </Link>
            <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.16em] role-text">{config.label} profile</p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">{config.title}</h1>
            <p className="mt-1.5 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">{config.description}</p>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[hsl(var(--role-gradient-from))] to-[hsl(var(--role-gradient-to))] text-white shadow-md hover:opacity-90 font-semibold cursor-pointer"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saved ? "Changes saved!" : isSaving ? "Saving..." : "Save profile"}
          </Button>
        </div>

        {/* Free, Airy Two-Column Grid */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
          {/* Main Details Card */}
          <Card className="overflow-hidden rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md shadow-xs">
            <div className="h-28 role-gradient" />
            <CardHeader className="relative pb-6 pt-0 px-7 sm:px-8">
              <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-card bg-card role-gradient text-3xl font-bold text-white shadow-lg">
                  <UserRound className="h-10 w-10" />
                </div>
                <button className="rounded-xl border border-border/70 bg-card px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground shadow-xs cursor-pointer">
                  Change photo
                </button>
              </div>
              <div className="mt-5">
                <CardTitle className="text-xl font-bold">Profile details</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  Keep your personal and professional details current.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-7 sm:px-8 pb-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold">
                  Display Name
                  <Input
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Enter your name"
                    className="h-11 rounded-xl"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold">
                  Professional Headline
                  <Input
                    value={form.headline}
                    onChange={(event) => updateField("headline", event.target.value)}
                    placeholder="e.g. Full-Stack Developer"
                    className="h-11 rounded-xl"
                  />
                </label>
              </div>
              <label className="space-y-2 text-sm font-semibold block">
                Location
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-10 h-11 rounded-xl"
                    value={form.location}
                    onChange={(event) => updateField("location", event.target.value)}
                    placeholder="City, Country"
                  />
                </div>
              </label>
              <label className="space-y-2 text-sm font-semibold block">
                About you / Bio
                <textarea
                  value={form.bio}
                  onChange={(event) => updateField("bio", event.target.value)}
                  className="flex min-h-32 w-full resize-y rounded-xl border border-input bg-background p-4 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 leading-relaxed"
                  placeholder="Share a short introduction..."
                />
              </label>
            </CardContent>
          </Card>

          {/* Sidebar Cards */}
          <div className="space-y-6">
            <Card className="role-gradient-subtle rounded-3xl border border-border/60 shadow-xs">
              <CardHeader className="p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl role-bg-soft p-2.5 role-text shadow-xs">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold">Profile strength</CardTitle>
                    <CardDescription className="text-xs">Good start — keep going</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <div className="flex items-end justify-between">
                  <span className="font-display text-4xl font-extrabold">85<span className="text-base font-normal text-muted-foreground">%</span></span>
                  <span className="text-xs font-semibold role-text">1 step left</span>
                </div>
                <div className="mt-3.5 h-2.5 overflow-hidden rounded-full bg-background/70">
                  <div className="h-full w-[85%] rounded-full role-gradient" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-border/60 shadow-xs">
              <CardHeader className="p-6">
                <CardTitle className="text-base font-bold">Complete your setup</CardTitle>
                <CardDescription className="text-xs">Profiles with verified details receive priority matches.</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 space-y-3.5">
                {profileSteps.map((step) => (
                  <div key={step.label} className="flex items-center gap-3 text-sm">
                    <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border", step.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-border text-transparent")}>
                      <Check className="h-3 w-3" />
                    </span>
                    <span className={cn(step.done && "text-muted-foreground line-through font-normal")}>{step.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-border/60 shadow-xs">
              <CardHeader className="p-6">
                <CardTitle className="text-base font-bold">Focus areas & skills</CardTitle>
                <CardDescription className="text-xs">These help us personalise your matches.</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 flex flex-wrap gap-2">
                {config.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
                    {skill}
                  </Badge>
                ))}
                <button className="rounded-full border border-dashed border-border px-3 py-1 text-xs font-semibold text-muted-foreground transition hover:border-primary/50 hover:text-foreground cursor-pointer">
                  + Add skill
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </DashboardShell>
  );
}

