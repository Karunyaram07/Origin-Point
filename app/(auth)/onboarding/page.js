// @ts-nocheck
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  BookOpen,
  MapPin,
  Calendar,
  Code2,
  Palette,
  Database,
  Cloud,
  Smartphone,
  Brain,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { OriginWordmark } from "@/components/shared/origin-logo";

const allSkills = [
  { name: "JavaScript", icon: Code2, category: "frontend" },
  { name: "React", icon: Code2, category: "frontend" },
  { name: "Python", icon: Code2, category: "backend" },
  { name: "Node.js", icon: Code2, category: "backend" },
  { name: "SQL", icon: Database, category: "data" },
  { name: "Machine Learning", icon: Brain, category: "ml" },
  { name: "UI/UX Design", icon: Palette, category: "design" },
  { name: "Cloud/AWS", icon: Cloud, category: "devops" },
  { name: "Flutter", icon: Smartphone, category: "mobile" },
  { name: "Data Analysis", icon: Database, category: "data" },
  { name: "Java", icon: Code2, category: "backend" },
  { name: "TypeScript", icon: Code2, category: "frontend" },
];

const steps = [
  { id: "welcome", title: "Welcome" },
  { id: "profile", title: "Profile" },
  { id: "skills", title: "Skills" },
  { id: "goals", title: "Goals" },
  { id: "ready", title: "Ready!" },
];

const goals = [
  { id: "internship", label: "Find an Internship", emoji: "🎯" },
  { id: "job", label: "Land a Full-time Job", emoji: "💼" },
  { id: "upskill", label: "Upskill & Learn", emoji: "📚" },
  { id: "portfolio", label: "Build My Portfolio", emoji: "✨" },
  { id: "network", label: "Industry Networking", emoji: "🤝" },
  { id: "research", label: "Research Opportunities", emoji: "🔬" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    institution: "",
    department: "",
    year: "",
    location: "",
    selectedSkills: [],
    selectedGoals: [],
  });
  const [direction, setDirection] = useState(1);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  };
  const goBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  const toggleSkill = (name) => {
    setFormData((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(name)
        ? prev.selectedSkills.filter((s) => s !== name)
        : [...prev.selectedSkills, name],
    }));
  };

  const toggleGoal = (id) => {
    setFormData((prev) => ({
      ...prev,
      selectedGoals: prev.selectedGoals.includes(id)
        ? prev.selectedGoals.filter((g) => g !== id)
        : [...prev.selectedGoals, id],
    }));
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        />
      </div>

      {/* Step indicators */}
      <div className="fixed top-0 left-0 right-0 z-40 glass-heavy">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center">
            <OriginWordmark className="text-sm font-bold" />
          </div>

          <div className="flex items-center gap-1.5">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i <= currentStep
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-400 w-8"
                    : "bg-muted w-4"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center pt-14 pb-20 px-6">
        <div className="w-full max-w-lg">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={step.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Step: Welcome */}
              {step.id === "welcome" && (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center mx-auto mb-6"
                  >
                    <Sparkles className="h-10 w-10 text-white" />
                  </motion.div>
                  <h1 className="font-display text-3xl font-bold mb-3">
                    Let&apos;s set up your profile
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-sm mx-auto mb-8">
                    This takes about 2 minutes. We&apos;ll use this to personalize 
                    your experience and find the right matches.
                  </p>
                  <Button
                    onClick={goNext}
                    className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-white border-0 hover:opacity-90 h-12 px-8"
                  >
                    Let&apos;s Go
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Step: Profile */}
              {step.id === "profile" && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold">Your Academic Profile</h2>
                      <p className="text-sm text-muted-foreground">Where are you studying?</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Institution</label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="e.g., IIT Bombay"
                          className="pl-9"
                          value={formData.institution}
                          onChange={(e) => setFormData((p) => ({ ...p, institution: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Department</label>
                        <Input
                          placeholder="Computer Science"
                          value={formData.department}
                          onChange={(e) => setFormData((p) => ({ ...p, department: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Year</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="3rd Year"
                            className="pl-9"
                            value={formData.year}
                            onChange={(e) => setFormData((p) => ({ ...p, year: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Mumbai, India"
                          className="pl-9"
                          value={formData.location}
                          onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step: Skills */}
              {step.id === "skills" && (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Code2 className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold">Pick your skills</h2>
                      <p className="text-sm text-muted-foreground">Select all that you&apos;re familiar with</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-5">
                    Selected: {formData.selectedSkills.length} / {allSkills.length}
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {allSkills.map((skill) => {
                      const isSelected = formData.selectedSkills.includes(skill.name);
                      return (
                        <motion.button
                          key={skill.name}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => toggleSkill(skill.name)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all duration-200",
                            isSelected
                              ? "border-emerald-500/30 bg-emerald-500/5 shadow-sm"
                              : "border-border hover:border-foreground/10"
                          )}
                        >
                          <skill.icon className={cn(
                            "h-4 w-4 flex-shrink-0",
                            isSelected ? "text-emerald-500" : "text-muted-foreground"
                          )} />
                          <span className="text-sm font-medium flex-1">{skill.name}</span>
                          {isSelected && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step: Goals */}
              {step.id === "goals" && (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold">What&apos;s your goal?</h2>
                      <p className="text-sm text-muted-foreground">We&apos;ll tailor your experience</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-5">
                    Pick one or more
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {goals.map((goal) => {
                      const isSelected = formData.selectedGoals.includes(goal.id);
                      return (
                        <motion.button
                          key={goal.id}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => toggleGoal(goal.id)}
                          className={cn(
                            "flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200",
                            isSelected
                              ? "border-amber-500/30 bg-amber-500/5 shadow-sm"
                              : "border-border hover:border-foreground/10"
                          )}
                        >
                          <span className="text-xl">{goal.emoji}</span>
                          <span className="text-sm font-medium">{goal.label}</span>
                          {isSelected && (
                            <CheckCircle2 className="h-4 w-4 text-amber-500 ml-auto flex-shrink-0" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step: Ready */}
              {step.id === "ready" && (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.1, stiffness: 200 }}
                    className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </motion.div>
                  <h1 className="font-display text-3xl font-bold mb-3">
                    You&apos;re all set! 🎉
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-sm mx-auto mb-4">
                    Your profile is ready. Jump into your dashboard to take your
                    first skill assessment.
                  </p>

                  {/* Summary */}
                  <div className="bg-card border border-border rounded-xl p-4 text-left mb-8 space-y-2">
                    {formData.institution && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Institution:</span>{" "}
                        <span className="font-medium">{formData.institution}</span>
                      </p>
                    )}
                    {formData.selectedSkills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {formData.selectedSkills.map((s) => (
                          <Badge key={s} variant="secondary" className="text-xs">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => router.push("/student")}
                    className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-white border-0 hover:opacity-90 h-12 px-8"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav (except first & last step) */}
      {currentStep > 0 && currentStep < steps.length - 1 && (
        <div className="fixed bottom-0 left-0 right-0 glass-heavy border-t border-border">
          <div className="max-w-lg mx-auto px-6 h-16 flex items-center justify-between">
            <Button variant="ghost" onClick={goBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={goNext}
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-white border-0 hover:opacity-90 gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
