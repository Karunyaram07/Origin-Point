"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase, Search, Filter, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MatchScoreRing } from "@/components/shared/match-score-ring";
import { cn } from "@/lib/utils";

interface Opportunity {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  score: number;
  tags: string[];
  status: string;
  stipend: string;
  saved: boolean;
}

const opportunities: Opportunity[] = [
  { id: 1, title: "Frontend Developer Intern",  company: "TechCorp India",    location: "Remote",     duration: "3 months", type: "Internship", score: 88, tags: ["React", "TypeScript"],   status: "Open",        stipend: "₹25k/mo", saved: false },
  { id: 2, title: "Data Science Trainee",       company: "AnalyticsPro",      location: "Bangalore",  duration: "6 months", type: "Internship", score: 76, tags: ["Python", "SQL"],          status: "Open",        stipend: "₹20k/mo", saved: true },
  { id: 3, title: "UX Design Fellow",           company: "DesignHub",         location: "Mumbai",     duration: "4 months", type: "Fellowship", score: 71, tags: ["Figma", "Research"],      status: "Closing Soon",stipend: "₹18k/mo", saved: false },
  { id: 4, title: "Full Stack Developer Intern",company: "StartupX",          location: "Hyderabad",  duration: "6 months", type: "Internship", score: 65, tags: ["MERN", "AWS"],            status: "Open",        stipend: "₹22k/mo", saved: false },
  { id: 5, title: "ML Research Intern",         company: "AI Research Lab",   location: "Delhi",      duration: "3 months", type: "Research",   score: 59, tags: ["Python", "TensorFlow"],   status: "Open",        stipend: "₹15k/mo", saved: false },
  { id: 6, title: "Backend Engineer Intern",    company: "PayTech Solutions", location: "Pune",       duration: "4 months", type: "Internship", score: 54, tags: ["Node.js", "PostgreSQL"],  status: "Open",        stipend: "₹20k/mo", saved: false },
];

const filters = ["All", "Internship", "Fellowship", "Research"];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
} as const;

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
} as const;

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? opportunities
    : opportunities.filter((o) => o.type === activeFilter);

  return (
    <DashboardShell role="student" title="Marketplace">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* Search + filters */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search opportunities…" className="pl-9" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </motion.div>

        {/* Filter pills */}
        <motion.div variants={item} className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                activeFilter === f
                  ? "role-gradient text-white border-transparent"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Listings */}
        <motion.div variants={item} className="space-y-3">
          {filtered.map((opp) => (
            <Card key={opp.id} className="hover:shadow-md transition-all cursor-pointer hover:border-[hsl(var(--role-primary)/0.3)]">
              <CardContent className="p-4 flex items-center gap-4">
                <MatchScoreRing score={opp.score} size="sm" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-semibold">{opp.title}</h4>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[0.6rem]",
                        opp.status === "Closing Soon" && "bg-amber-500/10 text-amber-600"
                      )}
                    >
                      {opp.status}
                    </Badge>
                    <Badge variant="outline" className="text-[0.6rem]">{opp.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{opp.company}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{opp.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{opp.duration}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{opp.stipend}</span>
                  </div>
                  <div className="flex gap-1 flex-wrap mt-1.5">
                    {opp.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[0.55rem] px-1.5 py-0">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    className={cn(
                      "p-1.5 rounded-md transition-colors",
                      opp.saved ? "text-amber-500" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Star className={cn("h-4 w-4", opp.saved && "fill-amber-500")} />
                  </button>
                  <Button size="sm" className="text-xs bg-gradient-to-r from-[hsl(var(--role-gradient-from))] to-[hsl(var(--role-gradient-to))] text-white border-0">
                    Apply <ChevronRight className="h-3 w-3 ml-0.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

      </motion.div>
    </DashboardShell>
  );
}
