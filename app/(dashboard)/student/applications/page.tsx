"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, ChevronRight, CheckCircle2, XCircle, Hourglass, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MatchScoreRing } from "@/components/shared/match-score-ring";
import { cn } from "@/lib/utils";

interface Application {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  score: number;
  appliedDate: string;
  status: "Under Review" | "Shortlisted" | "Interview Scheduled" | "Rejected" | "Offered";
  nextStep: string;
}

const applications: Application[] = [
  { id: 1, title: "Frontend Developer Intern",  company: "TechCorp India",  location: "Remote",    duration: "3 months", score: 88, appliedDate: "Aug 28, 2026", status: "Shortlisted",        nextStep: "Interview on Sep 5" },
  { id: 2, title: "Data Science Trainee",       company: "AnalyticsPro",    location: "Bangalore", duration: "6 months", score: 76, appliedDate: "Aug 25, 2026", status: "Under Review",       nextStep: "Awaiting screening" },
  { id: 3, title: "UX Design Fellow",           company: "DesignHub",       location: "Mumbai",    duration: "4 months", score: 71, appliedDate: "Aug 20, 2026", status: "Interview Scheduled", nextStep: "Sep 3, 3:00 PM IST" },
  { id: 4, title: "ML Research Intern",         company: "AI Research Lab", location: "Delhi",     duration: "3 months", score: 59, appliedDate: "Aug 15, 2026", status: "Rejected",           nextStep: "Application closed" },
  { id: 5, title: "Backend Engineer Intern",    company: "PayTech",         location: "Pune",      duration: "4 months", score: 54, appliedDate: "Aug 10, 2026", status: "Offered",            nextStep: "Accept by Sep 7" },
];

const statusConfig: Record<Application["status"], { color: string; icon: React.ReactNode }> = {
  "Under Review":       { color: "bg-blue-500/10 text-blue-600",    icon: <Hourglass className="h-4 w-4 text-blue-500" /> },
  "Shortlisted":        { color: "bg-indigo-500/10 text-indigo-600", icon: <CheckCircle2 className="h-4 w-4 text-indigo-500" /> },
  "Interview Scheduled":{ color: "bg-amber-500/10 text-amber-600",   icon: <Eye className="h-4 w-4 text-amber-500" /> },
  "Rejected":           { color: "bg-red-500/10 text-red-600",       icon: <XCircle className="h-4 w-4 text-red-500" /> },
  "Offered":            { color: "bg-green-500/10 text-green-600",   icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> },
};

const statCounts = {
  total: applications.length,
  active: applications.filter((a) => !["Rejected", "Offered"].includes(a.status)).length,
  shortlisted: applications.filter((a) => a.status === "Shortlisted" || a.status === "Interview Scheduled").length,
  offers: applications.filter((a) => a.status === "Offered").length,
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
} as const;

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
} as const;

export default function ApplicationsPage() {
  return (
    <DashboardShell role="student" title="Applications">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* Summary stats */}
        <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Applied",  value: statCounts.total },
            { label: "Active",         value: statCounts.active },
            { label: "Shortlisted",    value: statCounts.shortlisted },
            { label: "Offers",         value: statCounts.offers },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4 text-center">
                <p className="font-display text-3xl font-bold role-text">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Application list */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>All Applications</CardTitle>
              <CardDescription>Track the status of all your submitted applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {applications.map((app) => {
                const config = statusConfig[app.status];
                return (
                  <div
                    key={app.id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-[hsl(var(--role-primary)/0.3)] hover:shadow-sm transition-all cursor-pointer"
                  >
                    <MatchScoreRing score={app.score} size="sm" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-semibold">{app.title}</h4>
                        <Badge variant="secondary" className={cn("text-[0.6rem]", config.color)}>
                          {app.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{app.company}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{app.location}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{app.duration}</span>
                        <span>Applied {app.appliedDate}</span>
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {config.icon}
                        <span className="max-w-[140px] truncate">{app.nextStep}</span>
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </DashboardShell>
  );
}
