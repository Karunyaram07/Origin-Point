"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  BookOpen,
  ExternalLink,
  GraduationCap,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getCourseDetails, CourseModuleItem, SubTopic } from "@/lib/courses-data";
import { cn } from "@/lib/utils";

// External learning resources generator per course with direct, topic-specific destinations
function getCourseExternalResources(courseId: string, courseTitle: string) {
  const map: Record<string, { referenceSites: Array<{ name: string; description: string; url: string }>; youtubeVideos: Array<{ title: string; channel: string; description: string; url: string }> }> = {
    c1: {
      referenceSites: [
        {
          name: "W3Schools Full-Stack",
          description: "Hands-on tutorials for HTML, CSS, JavaScript, Node.js, and SQL.",
          url: "https://www.w3schools.com/whatis/whatis_fullstack.asp",
        },
        {
          name: "GeeksforGeeks Web Development",
          description: "Comprehensive step-by-step roadmap from frontend UI to backend APIs and databases.",
          url: "https://www.geeksforgeeks.org/web-development/",
        },
        {
          name: "MDN Web Docs",
          description: "Authoritative specifications, architecture standards, and practical developer guides.",
          url: "https://developer.mozilla.org/en-US/docs/Learn",
        },
      ],
      youtubeVideos: [
        {
          title: "Full Stack Web Development for Beginners (Full Course 2024)",
          channel: "freeCodeCamp",
          description: "End-to-end video tutorial walking through all full-stack layers from setup to production.",
          url: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
        },
        {
          title: "Web Development in 2024 - A Practical Guide & Roadmap",
          channel: "Traversy Media",
          description: "Practical modern guide detailing frontend, backend, APIs, and modern toolchains.",
          url: "https://www.youtube.com/watch?v=VfGW0Qiy2I0",
        },
        {
          title: "Modern Web Architecture in 100 Seconds",
          channel: "Fireship",
          description: "Fast, visual breakdown of modern client-server models, SSR, and database flows.",
          url: "https://www.youtube.com/watch?v=zJSY8tbf_ys",
        },
      ],
    },
    c2: {
      referenceSites: [
        {
          name: "GeeksforGeeks DSA",
          description: "Detailed algorithms, visual animations, and curated problem sets.",
          url: "https://www.geeksforgeeks.org/data-structures/",
        },
        {
          name: "W3Schools Data Structures",
          description: "Interactive visual tutorials for arrays, linked lists, stacks, and trees.",
          url: "https://www.w3schools.com/dsa/",
        },
        {
          name: "MDN Algorithms & Data Structures",
          description: "Standard algorithmic complexity, memory representation, and sorting patterns.",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
        },
      ],
      youtubeVideos: [
        {
          title: "Algorithms and Data Structures Tutorial - Full Course",
          channel: "freeCodeCamp",
          description: "Comprehensive course covering trees, graphs, sorting, and dynamic programming.",
          url: "https://www.youtube.com/watch?v=8hly31xKli0",
        },
        {
          title: "Data Structures and Algorithms in 15 Minutes",
          channel: "Aaron Jack",
          description: "Intuitive visual summary of Big-O complexity and essential structures.",
          url: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
        },
        {
          title: "7 Algorithms Every Developer Must Know",
          channel: "Fireship",
          description: "High-yield review of critical algorithms tested in technical assessments.",
          url: "https://www.youtube.com/watch?v=bum_19vj9Zg",
        },
      ],
    },
    c3: {
      referenceSites: [
        {
          name: "W3Schools SQL Tutorial",
          description: "Interactive SQL exercises, queries, joins, aggregates, and database schemas.",
          url: "https://www.w3schools.com/sql/",
        },
        {
          name: "GeeksforGeeks SQL & Relational DBMS",
          description: "Database normalization, ACID transactions, indexing, and query optimization.",
          url: "https://www.geeksforgeeks.org/sql-tutorial/",
        },
        {
          name: "MDN Server-Side Persistence",
          description: "Database modeling and integrating storage with web applications.",
          url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Web_frameworks_databases",
        },
      ],
      youtubeVideos: [
        {
          title: "SQL Tutorial - Full Database Course for Beginners",
          channel: "freeCodeCamp",
          description: "Relational database fundamentals, SQL queries, table joins, and schema management.",
          url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        },
        {
          title: "SQL Explained in 100 Seconds",
          channel: "Fireship",
          description: "Fast-paced visual breakdown of SQL queries, relations, and table joins.",
          url: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
        },
      ],
    },
    c4: {
      referenceSites: [
        {
          name: "GeeksforGeeks DevOps Tutorial",
          description: "Comprehensive DevOps roadmap covering Docker, CI/CD pipelines, and cloud hosting.",
          url: "https://www.geeksforgeeks.org/devops-tutorial/",
        },
        {
          name: "W3Schools Cloud & AWS",
          description: "Cloud computing concepts, compute instances, storage, and networking.",
          url: "https://www.w3schools.com/aws/",
        },
        {
          name: "MDN Deployment Guides",
          description: "Production web server configuration, HTTPS, and performance tuning.",
          url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Deploying",
        },
      ],
      youtubeVideos: [
        {
          title: "DevOps Engineering Course for Beginners",
          channel: "freeCodeCamp",
          description: "Hands-on cloud infrastructure, Docker containerization, and automated deployments.",
          url: "https://www.youtube.com/watch?v=WvhQhkflhpo",
        },
        {
          title: "Docker in 100 Seconds",
          channel: "Fireship",
          description: "Fast explanation of containers, Dockerfiles, and container orchestration.",
          url: "https://www.youtube.com/watch?v=Xrgk023l4lI",
        },
      ],
    },
  };

  const direct = map[courseId];
  if (direct) return direct;

  const query = encodeURIComponent(courseTitle);
  return {
    referenceSites: [
      {
        name: "GeeksforGeeks",
        description: `Concept tutorials and practical examples for ${courseTitle}.`,
        url: `https://www.geeksforgeeks.org/search/?q=${query}`,
      },
      {
        name: "W3Schools",
        description: `Interactive syntax references and hands-on examples for ${courseTitle}.`,
        url: `https://www.w3schools.com/search/search_result.php?search=${query}`,
      },
      {
        name: "MDN Web Docs",
        description: `Official technical documentation and web engineering standards.`,
        url: `https://developer.mozilla.org/en-US/search?q=${query}`,
      },
    ],
    youtubeVideos: [
      {
        title: `${courseTitle} - Complete Tutorial for Beginners`,
        channel: "freeCodeCamp",
        description: `Comprehensive video tutorial covering foundational and practical concepts.`,
        url: `https://www.youtube.com/results?search_query=${query}+full+course+tutorial`,
      },
      {
        title: `${courseTitle} - Architecture & Best Practices`,
        channel: "Traversy Media",
        description: `Practical walkthroughs and real-world engineering patterns.`,
        url: `https://www.youtube.com/results?search_query=${query}+practical+guide`,
      },
    ],
  };
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = typeof params?.courseId === "string" ? params.courseId : "c1";

  const course = getCourseDetails(courseId);
  const resources = getCourseExternalResources(course.id, course.title);

  // Active expanded module accordion (default expands module 1)
  const [expandedModuleId, setExpandedModuleId] = useState<string>("m1");

  // Dynamic completed modules tracking from localStorage (starts at 0/8)
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const isModuleCompleted = (modId: string) => {
    return completedModules.includes(`${course.id}-${modId}`) || completedModules.includes(modId);
  };
  const completedCount = course.modules.filter((m) => isModuleCompleted(m.id)).length;
  const progressPercent = Math.round((completedCount / course.totalModules) * 100);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("skillsync_completed_modules");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Clean out any assessment keys to keep course completions pure
          setCompletedModules(parsed.filter((k) => typeof k === "string" && !k.startsWith("assessment-")));
        }
      }
    } catch (e) {
      console.warn("Could not read completed modules from localStorage:", e);
    }
  }, []);

  // Divide modules into 4 distinct levels (2 modules per level)
  const levelGroups = [
    {
      id: "very-beginner",
      title: "Very Beginner",
      levelNumber: "Level 1",
      description: "2 Essential modules covering foundational building blocks and core syntax",
      modules: course.modules.filter((m) => m.level === "very-beginner" || m.moduleNumber <= 2),
    },
    {
      id: "beginner",
      title: "Beginner",
      levelNumber: "Level 2",
      description: "2 Modules covering component composition, state flow, and API integration",
      modules: course.modules.filter((m) => m.level === "beginner" || (m.moduleNumber >= 3 && m.moduleNumber <= 4)),
    },
    {
      id: "intermediate",
      title: "Intermediate",
      levelNumber: "Level 3",
      description: "2 Modules covering advanced patterns, routing, and backend engineering",
      modules: course.modules.filter((m) => m.level === "intermediate" || (m.moduleNumber >= 5 && m.moduleNumber <= 6)),
    },
    {
      id: "advanced",
      title: "Advanced",
      levelNumber: "Level 4",
      description: "2 Modules covering auth, deployment, CI/CD, and production scale",
      modules: course.modules.filter((m) => m.level === "advanced" || m.moduleNumber >= 7),
    },
  ];

  return (
    <DashboardShell role="student" title={course.title}>
      <div className="space-y-12 max-w-5xl mx-auto pb-20 pt-2">
        {/* Navigation Back */}
        <div>
          <Link
            href="/student/assessment"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-xl hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Skill Assessment
          </Link>
        </div>

        {/* Free, Open, Premium Course Header (No heavy boxed containers or empty voids) */}
        <div className="space-y-6 pt-1">
          <div className="space-y-3 max-w-3xl">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              {course.title}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Clean Inline Progress & Metadata Flow */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 pb-6 border-b border-border/60">
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <BookOpen className="h-4 w-4 text-primary" /> {course.totalModules} Comprehensive Modules
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Award className="h-4 w-4 text-emerald-500" /> Verified Skill Badges
              </span>
            </div>

            {/* Inline progress status */}
            <div className="flex items-center gap-4 min-w-[240px]">
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">
                    {completedCount} of {course.totalModules} completed
                  </span>
                  <span className="font-bold text-primary">{progressPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Divided by 4 Levels (Very Beginner, Beginner, Intermediate, Advanced) */}
        <div className="space-y-10">
          {levelGroups.map((group) => (
            <div key={group.id} className="space-y-4">
              {/* Cohesive Level Tier Header */}
              <div className="space-y-1 pb-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {group.levelNumber}
                  </span>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-foreground tracking-tight">
                    {group.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground pl-0.5">
                  {group.description}
                </p>
              </div>

              {/* Modules inside this Level */}
              <div className="space-y-3.5">
                {group.modules.map((mod: CourseModuleItem) => {
                  const isExpanded = expandedModuleId === mod.id;
                  const completed = isModuleCompleted(mod.id);
                  return (
                    <div
                      key={mod.id}
                      className={cn(
                        "rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs",
                        completed
                          ? "border-emerald-500/30 bg-card hover:border-emerald-500/50"
                          : "border-border/80 bg-card hover:border-primary/40"
                      )}
                    >
                      {/* Module Header */}
                      <div
                        onClick={() => setExpandedModuleId(isExpanded ? "" : mod.id)}
                        className="p-5 flex items-center justify-between gap-5 cursor-pointer select-none hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          {/* Smooth curved squircle number badge */}
                          <div
                            className={cn(
                              "h-10 w-10 rounded-2xl flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs",
                              completed
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {completed ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            ) : (
                              mod.moduleNumber < 10 ? `0${mod.moduleNumber}` : `${mod.moduleNumber}`
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <h3 className="text-base font-bold text-foreground truncate">
                                Module {mod.moduleNumber}: {mod.title}
                              </h3>
                              {completed && (
                                <Badge
                                  variant="outline"
                                  className="text-[0.65rem] rounded-full px-2.5 py-0.5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold"
                                >
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {mod.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 flex-shrink-0">
                          <span className="text-xs text-muted-foreground hidden sm:inline-block font-medium">
                            {mod.subTopics.length} Sub-topics
                          </span>
                          <div className="h-8 w-8 rounded-full flex items-center justify-center bg-muted/60 text-muted-foreground">
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Sub-topics Section */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="border-t border-border/70 bg-muted/15 p-5 sm:p-7 space-y-4">
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                Sub-topics & Learning Modules:
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {mod.subTopics.map((st: SubTopic) => (
                                  <div
                                    key={st.id}
                                    className="p-5 rounded-2xl border border-border/80 bg-card flex flex-col justify-between gap-4 hover:border-primary/50 hover:shadow-xs transition-all"
                                  >
                                    <div className="space-y-1.5">
                                      <h4 className="text-sm font-bold text-foreground leading-snug">
                                        {st.title}
                                      </h4>
                                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5" />
                                        {st.duration} &bull; 10 Questions
                                      </span>
                                    </div>

                                    {/* Start Button with NO arrow mark */}
                                    <Button
                                      asChild
                                      size="sm"
                                      variant="outline"
                                      className="w-full text-xs h-9 rounded-xl font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                                    >
                                      <Link
                                        href={`/student/assessment/course/${course.id}/learn/${mod.id}/${st.id}`}
                                      >
                                        Start
                                      </Link>
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* EXTERNAL LEARNING RESOURCES SECTION (Free, clean, topic-specific)          */}
        {/* ========================================================================= */}
        <div className="space-y-6 pt-4 border-t border-border/70">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">
                External Learning Resources &amp; References
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Direct curated study material from GeeksforGeeks, W3Schools, MDN, and verified video guides for {course.title}.
            </p>
          </div>

          {/* Reference Portals: Direct destination links for selected course */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {resources.referenceSites.map((site, idx) => (
              <a
                key={idx}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/60 hover:shadow-sm transition-all flex flex-col justify-between gap-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {site.name}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {site.description}
                  </p>
                </div>
                <div className="text-xs font-semibold text-primary group-hover:underline">
                  Open on {site.name} &rarr;
                </div>
              </a>
            ))}
          </div>

          {/* YouTube Video Tutorial Links (Direct topic-specific video links) */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Curated Video Tutorials
            </h3>
            <div className="divide-y divide-border/60 rounded-2xl border border-border/80 bg-card overflow-hidden">
              {resources.youtubeVideos.map((video, idx) => (
                <a
                  key={idx}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 flex items-center justify-between gap-4 text-xs hover:bg-muted/40 transition-colors group"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {video.title}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      <span className="font-medium text-foreground/80">{video.channel}</span> &bull; {video.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-primary font-semibold text-xs flex-shrink-0">
                    <span>Watch Tutorial</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
