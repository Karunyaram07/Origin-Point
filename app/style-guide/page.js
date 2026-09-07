"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Landmark,
  Zap,
  Users,
  TrendingUp,
  BarChart3,
  Search,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { MatchScoreRing } from "@/components/shared/match-score-ring";
import { SkillTag } from "@/components/shared/skill-tag";
import { ApplicationStepper } from "@/components/shared/application-stepper";
import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/components/shared/stat-card";
import {
  Skeleton,
  SkeletonCard,
  SkeletonList,
  SkeletonChart,
} from "@/components/shared/skeleton";

const roles = [
  { id: "student", label: "Student", icon: GraduationCap, color: "Electric Indigo / Teal" },
  { id: "industry", label: "Industry", icon: Building2, color: "Deep Amber / Graphite" },
  { id: "academician", label: "Academician", icon: BookOpen, color: "Forest Green / Cream" },
  { id: "institution", label: "Institution", icon: Landmark, color: "Slate / Navy" },
];

const sampleSteps = [
  { id: "applied", label: "Applied" },
  { id: "screening", label: "Screening" },
  { id: "interview", label: "Interview" },
  { id: "offer", label: "Offer" },
  { id: "accepted", label: "Accepted" },
];

const sampleSkills = [
  { name: "React", category: "frontend", level: "Advanced", verified: true },
  { name: "Node.js", category: "backend", level: "Intermediate", verified: true },
  { name: "Figma", category: "design", level: "Beginner" },
  { name: "Python", category: "data", level: "Advanced", verified: true },
  { name: "Docker", category: "devops", level: "Intermediate" },
  { name: "Flutter", category: "mobile", level: "Beginner" },
  { name: "TensorFlow", category: "ml" },
  { name: "Communication", category: "soft", level: "Advanced" },
];

export default function StyleGuidePage() {
  const [activeRole, setActiveRole] = useState("student");
  const [stepperIndex, setStepperIndex] = useState(2);

  return (
    <div
      data-role={activeRole}
      className="min-h-screen bg-background text-foreground"
    >
      {/* ── Header ── */}
      <header className="sticky top-0 z-sticky glass-heavy border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-lg font-bold tracking-tight">
              ORIGIN POINT{" "}
              <span className="text-muted-foreground font-normal text-sm">
                Style Guide
              </span>
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-20">
        {/* ════════════ Section: Role Switcher ════════════ */}
        <section>
          <SectionHeader
            title="Role Accent System"
            subtitle="Click a role to see the entire page recolor. Each role is a 'room' of the same building."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {roles.map((role) => {
              const Icon = role.icon;
              const isActive = activeRole === role.id;
              return (
                <motion.button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-normal
                    ${isActive
                      ? "border-[hsl(var(--role-primary)/0.5)] glow-ring"
                      : "border-border hover:border-[hsl(var(--role-primary)/0.2)]"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="roleBackground"
                      className="absolute inset-0 role-gradient-subtle"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative">
                    <div className={`p-2 rounded-lg w-fit mb-3 ${isActive ? "role-bg-primary" : "bg-muted"}`}>
                      <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <p className="font-display font-semibold text-sm">{role.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{role.color}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Gradient preview */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="role-gradient rounded-xl p-6 text-white">
              <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Gradient</p>
              <p className="font-display text-lg font-bold">role-gradient</p>
            </div>
            <div className="role-gradient-subtle rounded-xl p-6 border border-border">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Subtle</p>
              <p className="font-display text-lg font-bold">role-gradient-subtle</p>
            </div>
            <div className="rounded-xl p-6 border border-border">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Text</p>
              <p className="font-display text-lg font-bold role-gradient-text">role-gradient-text</p>
            </div>
          </div>
        </section>

        {/* ════════════ Section: Typography ════════════ */}
        <section>
          <SectionHeader
            title="Typography"
            subtitle="Outfit (display) + Inter (body). No system font defaults."
          />
          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Hero</p>
                <h2 className="text-hero font-display font-bold">Build Your Career</h2>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Display LG</p>
                <h2 className="text-display-lg font-display font-bold">Skill Assessment</h2>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Display MD</p>
                <h3 className="text-display-md font-display font-bold">Digital Portfolio</h3>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Display SM</p>
                <h4 className="text-display-sm font-display font-semibold">Gap Analysis Report</h4>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl border border-border">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Body text (Inter)</p>
                <p className="text-base leading-relaxed">
                  Origin Point bridges the gap between academia and industry. Students 
                  take assessments, get matched to opportunities, and build verified 
                  portfolios — while institutions track placement readiness in real time.
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Monospace</p>
                <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                  skill.matchScore = 87.4
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════ Section: Color System ════════════ */}
        <section>
          <SectionHeader
            title="Color Palette"
            subtitle="HSL tokens — shared base + role-aware accents that swap via CSS custom properties."
          />
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {[
              { name: "Background", var: "--background" },
              { name: "Foreground", var: "--foreground" },
              { name: "Card", var: "--card" },
              { name: "Primary", var: "--primary" },
              { name: "Secondary", var: "--secondary" },
              { name: "Muted", var: "--muted" },
              { name: "Accent", var: "--accent" },
              { name: "Destructive", var: "--destructive" },
              { name: "Border", var: "--border" },
              { name: "Role Primary", var: "--role-primary" },
              { name: "Role Soft", var: "--role-primary-soft" },
              { name: "Role Surface", var: "--role-surface" },
            ].map((c) => (
              <div key={c.var} className="space-y-1.5">
                <div
                  className="h-16 rounded-lg border border-border"
                  style={{ background: `hsl(var(${c.var}))` }}
                />
                <p className="text-xs font-medium">{c.name}</p>
                <p className="text-[0.6rem] text-muted-foreground font-mono">{c.var}</p>
              </div>
            ))}
          </div>

          {/* Chart colors */}
          <div className="mt-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Chart Palette</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-10 flex-1 rounded-md"
                  style={{ background: `hsl(var(--chart-${i}))` }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ Section: Buttons ════════════ */}
        <section>
          <SectionHeader title="Buttons" subtitle="All shadcn variants + role-aware primary." />
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button className="role-bg-primary hover:opacity-90">Role Primary</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 items-center">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon"><Search className="h-4 w-4" /></Button>
          </div>
        </section>

        {/* ════════════ Section: Inputs ════════════ */}
        <section>
          <SectionHeader title="Input & Search" subtitle="Clean inputs with role-ring focus states." />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
            <Input placeholder="Your email" />
            <Input placeholder="Search skills..." />
            <Input placeholder="Disabled" disabled />
          </div>
        </section>

        {/* ════════════ Section: Badges & SkillTags ════════════ */}
        <section>
          <SectionHeader title="Badges & Skill Tags" subtitle="Category-coded, with optional verification." />
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleSkills.map((skill) => (
                <SkillTag key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ Section: Match Score Ring ════════════ */}
        <section>
          <SectionHeader
            title="Match Score Ring"
            subtitle="Visual match score — color shifts from red (low) through yellow to green (high)."
          />
          <div className="mt-6 flex items-end gap-8">
            {[
              { score: 25, size: "sm" },
              { score: 45, size: "md" },
              { score: 68, size: "lg" },
              { score: 87, size: "xl" },
              { score: 95, size: "xl" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <MatchScoreRing {...item} />
                <span className="text-xs text-muted-foreground">{item.score}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════ Section: Application Stepper ════════════ */}
        <section>
          <SectionHeader
            title="Application Stepper"
            subtitle="Click ± to advance/retreat the current step."
          />
          <div className="mt-6 max-w-xl">
            <ApplicationStepper steps={sampleSteps} currentStep={stepperIndex} />
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setStepperIndex(Math.max(0, stepperIndex - 1))}
              >
                ← Back
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setStepperIndex(Math.min(sampleSteps.length - 1, stepperIndex + 1))
                }
              >
                Next →
              </Button>
            </div>
          </div>
        </section>

        {/* ════════════ Section: Stat Cards ════════════ */}
        <section>
          <SectionHeader title="Stat Cards" subtitle="Dashboard tiles with animated entrance and role-aware hover." />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Skill Score"
              value="87"
              suffix="/100"
              trend="up"
              trendLabel="12% this month"
              icon={TrendingUp}
            />
            <StatCard
              label="Applications"
              value="14"
              trend="up"
              trendLabel="3 new this week"
              icon={Zap}
            />
            <StatCard
              label="Matches Found"
              value="8"
              trend="neutral"
              trendLabel="Steady"
              icon={Users}
            />
            <StatCard
              label="Completion"
              value="73"
              suffix="%"
              trend="up"
              trendLabel="5% this week"
              icon={BarChart3}
            />
          </div>
        </section>

        {/* ════════════ Section: Cards ════════════ */}
        <section>
          <SectionHeader title="Cards" subtitle="shadcn Card with role-aware glow on hover." />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glow-ring-hover transition-shadow duration-normal">
              <CardHeader>
                <CardTitle>Frontend Developer Intern</CardTitle>
                <CardDescription>Acme Corp · Remote · 3 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <SkillTag name="React" category="frontend" />
                    <SkillTag name="CSS" category="frontend" />
                  </div>
                  <MatchScoreRing score={85} size="lg" />
                </div>
              </CardContent>
            </Card>
            <Card className="glow-ring-hover transition-shadow duration-normal">
              <CardHeader>
                <CardTitle>Data Science Trainee</CardTitle>
                <CardDescription>DataVista · Hybrid · 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <SkillTag name="Python" category="data" />
                    <SkillTag name="TensorFlow" category="ml" />
                  </div>
                  <MatchScoreRing score={62} size="lg" />
                </div>
              </CardContent>
            </Card>
            <Card className="glow-ring-hover transition-shadow duration-normal">
              <CardHeader>
                <CardTitle>UX Design Fellow</CardTitle>
                <CardDescription>DesignHub · On-site · 4 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <SkillTag name="Figma" category="design" />
                  </div>
                  <MatchScoreRing score={41} size="lg" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ════════════ Section: Glass Effects ════════════ */}
        <section>
          <SectionHeader title="Glass & Surface Effects" subtitle="Glassmorphism and pattern backgrounds." />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative overflow-hidden rounded-xl role-gradient p-6 h-40">
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="relative">
                <p className="text-white/70 text-xs uppercase tracking-wider">Dot pattern overlay</p>
                <p className="text-white font-display text-xl font-bold mt-1">Gradient + Dots</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-card border border-border p-6 h-40">
              <div className="absolute inset-0 grid-pattern" />
              <div className="relative">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Grid pattern</p>
                <p className="font-display text-xl font-bold mt-1">Subtlety</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl p-6 h-40 glass border border-border">
              <p className="text-muted-foreground text-xs uppercase tracking-wider">Glass</p>
              <p className="font-display text-xl font-bold mt-1">Frosted Glass</p>
              <p className="text-sm text-muted-foreground mt-2">
                backdrop-filter: blur(12px)
              </p>
            </div>
          </div>
        </section>

        {/* ════════════ Section: Skeletons ════════════ */}
        <section>
          <SectionHeader title="Loading Skeletons" subtitle="Shimmer loaders instead of spinners." />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonList count={4} className="border border-border rounded-xl p-4" />
            <SkeletonChart />
          </div>
        </section>

        {/* ════════════ Section: Empty States ════════════ */}
        <section>
          <SectionHeader title="Empty States" subtitle="Custom SVG illustrations + clear next action." />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <EmptyState
                type="search"
                title="No results found"
                description="Try adjusting your search or filters."
                actionLabel="Clear Filters"
                onAction={() => {}}
              />
            </Card>
            <Card>
              <EmptyState
                type="empty"
                title="No applications yet"
                description="Start by browsing internships and applying."
                actionLabel="Browse Internships"
                onAction={() => {}}
              />
            </Card>
            <Card>
              <EmptyState
                type="chart"
                title="No data to display"
                description="Data will appear once students complete assessments."
              />
            </Card>
          </div>
        </section>

        {/* ════════════ Section: Animations ════════════ */}
        <section>
          <SectionHeader title="Motion Language" subtitle="framer-motion animations + CSS utilities." />
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimationDemo label="Float" className="animate-float" />
            <AnimationDemo label="Pulse Glow" className="animate-pulse-glow" />
            <AnimationDemo label="Shimmer" className="animate-shimmer" />
            <AnimationDemo label="Spin Slow" className="animate-spin-slow" />
          </div>
        </section>

        {/* ════════════ Section: Shadows ════════════ */}
        <section>
          <SectionHeader title="Shadow Scale" subtitle="Consistent elevation tokens." />
          <div className="mt-6 flex flex-wrap gap-6 items-end">
            {["xs", "sm", "md", "lg", "xl"].map((size) => (
              <div
                key={size}
                className={`w-20 h-20 rounded-xl bg-card border border-border shadow-${size} flex items-center justify-center`}
              >
                <span className="text-xs font-mono text-muted-foreground">{size}</span>
              </div>
            ))}
            <div className="w-20 h-20 rounded-xl bg-card border border-border shadow-glow flex items-center justify-center">
              <span className="text-xs font-mono text-muted-foreground">glow</span>
            </div>
          </div>
        </section>

        {/* ════════════ Section: Spacing ════════════ */}
        <section>
          <SectionHeader title="Spacing Scale" subtitle="Consistent spacing tokens for padding, margin, gaps." />
          <div className="mt-6 flex items-end gap-1.5">
            {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((s) => (
              <div key={s} className="flex flex-col items-center gap-1">
                <div
                  className="bg-[hsl(var(--role-primary)/0.3)] rounded-sm"
                  style={{ width: `${s * 4}px`, height: `${s * 4}px` }}
                />
                <span className="text-[0.55rem] text-muted-foreground font-mono">{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════ Section: Border Radius ════════════ */}
        <section className="pb-16">
          <SectionHeader title="Border Radius" subtitle="Radius tokens from sm to 2xl." />
          <div className="mt-6 flex flex-wrap gap-4 items-end">
            {["sm", "md", "lg", "xl", "2xl", "full"].map((r) => (
              <div key={r} className="flex flex-col items-center gap-2">
                <div
                  className={`w-16 h-16 bg-muted border border-border ${
                    r === "full" ? "rounded-full" : `rounded-${r}`
                  }`}
                />
                <span className="text-xs font-mono text-muted-foreground">{r}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/* ── Helper components ── */

function SectionHeader({ title, subtitle }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1 max-w-xl">{subtitle}</p>
      )}
    </div>
  );
}

function AnimationDemo({ label, className }) {
  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border">
      <div
        className={`w-10 h-10 rounded-lg role-gradient ${className}`}
      />
      <span className="text-xs font-mono text-muted-foreground">{label}</span>
    </div>
  );
}
