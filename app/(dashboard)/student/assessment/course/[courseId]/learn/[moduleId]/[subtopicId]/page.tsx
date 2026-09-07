"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Loader2,
  XCircle,
  ExternalLink,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getCourseDetails, SubTopic } from "@/lib/courses-data";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  skillArea?: string;
}

// Static study material per sub-topic (teaching content before questions)
function getStudyContent(courseTitle: string, moduleTitle: string, subtopicTitle: string) {
  return {
    overview: `This section covers the core principles of **${subtopicTitle}** within the context of **${moduleTitle}**. Understanding these fundamentals is crucial to progressing through ${courseTitle}.`,
    keyPoints: [
      `${subtopicTitle} establishes the foundational building blocks for understanding ${moduleTitle} as a whole.`,
      `Pay attention to how concepts interrelate — real-world implementation often involves combining multiple principles.`,
      `Focus on understanding *why* patterns exist, not just *what* they are. This ensures long-term retention.`,
      `Practice applying concepts in isolated examples before tackling complex systems.`,
      `Common mistakes arise from skipping foundational steps — make sure you understand each point before moving on.`,
    ],
    concepts: [
      {
        term: `${subtopicTitle} — Definition`,
        explanation: `${subtopicTitle} refers to a structured approach to handling ${moduleTitle.toLowerCase()} in ${courseTitle}. It encompasses the principles, methods, and patterns used in professional engineering contexts.`,
      },
      {
        term: "Core Principle",
        explanation: `The most important principle here is separation of concerns — keeping each component responsible for a single, well-defined task. This makes code readable, testable, and maintainable.`,
      },
      {
        term: "Practical Application",
        explanation: `In real projects, ${subtopicTitle.toLowerCase()} skills are applied when architecting systems, debugging issues, and optimizing performance. Mastery here translates directly to interview success and production-level work.`,
      },
      {
        term: "Common Pitfalls",
        explanation: `Beginners often over-engineer solutions or skip validation steps. Always start simple, ensure correctness, then optimize. Test edge cases early.`,
      },
    ],
    codeExample: `// Example: ${subtopicTitle}\n// This demonstrates the core concept in practice\n\nfunction example() {\n  // Step 1: Define your data structure or interface clearly\n  const data = { id: 1, value: "sample" };\n\n  // Step 2: Apply the ${subtopicTitle.toLowerCase()} principle\n  const result = processData(data);\n\n  // Step 3: Validate and return the result\n  return result;\n}\n\nfunction processData(input) {\n  // Apply core ${subtopicTitle.toLowerCase()} logic here\n  return { ...input, processed: true };\n}`,
  };
}

// External learning resources per course category
function getExternalResources(courseTitle: string, subtopicTitle: string) {
  const topic = encodeURIComponent(subtopicTitle);
  const courseTopic = encodeURIComponent(courseTitle.split(" ")[0]);

  return {
    gfg: {
      label: "GeeksforGeeks",
      url: `https://www.geeksforgeeks.org/search/?q=${topic}`,
      description: "Detailed tutorials, examples and interview problems",
      icon: "gfg",
    },
    w3: {
      label: "W3Schools",
      url: `https://www.w3schools.com/search/search_result.php?search=${topic}`,
      description: "Interactive examples and beginner-friendly guides",
      icon: "w3",
    },
    mdn: {
      label: "MDN Web Docs",
      url: `https://developer.mozilla.org/en-US/search?q=${topic}`,
      description: "Official web standards documentation",
      icon: "mdn",
    },
    youtube: [
      {
        label: `${subtopicTitle} Full Tutorial`,
        url: `https://www.youtube.com/results?search_query=${topic}+tutorial+programming`,
        channel: "YouTube Search",
      },
      {
        label: `${courseTitle} for Beginners`,
        url: `https://www.youtube.com/results?search_query=${courseTopic}+beginner+course`,
        channel: "YouTube Search",
      },
      {
        label: `${subtopicTitle} Interview Prep`,
        url: `https://www.youtube.com/results?search_query=${topic}+interview+questions`,
        channel: "YouTube Search",
      },
    ],
  };
}

export default function SubTopicLearnPage() {
  const params = useParams();
  const router = useRouter();

  const courseId = typeof params?.courseId === "string" ? params.courseId : "c1";
  const moduleId = typeof params?.moduleId === "string" ? params.moduleId : "m1";
  const subtopicId = typeof params?.subtopicId === "string" ? params.subtopicId : "st1-1";

  const course = getCourseDetails(courseId);
  const currentModule = course.modules.find((m) => m.id === moduleId);
  const currentSubtopic = currentModule?.subTopics.find((s) => s.id === subtopicId);

  const [phase, setPhase] = useState<"study" | "quiz" | "submitted">("study");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const studyContent = getStudyContent(
    course.title,
    currentModule?.title ?? "Module",
    currentSubtopic?.title ?? "Topic"
  );
  const externalResources = getExternalResources(
    course.title,
    currentSubtopic?.title ?? "Topic"
  );

  const handleStartPractice = async () => {
    setPhase("quiz");
    setIsLoadingQuestions(true);
    try {
      const res = await fetch("/api/course-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseTitle: course.title,
          moduleTitle: currentModule?.title ?? "Module",
          subTopicTitle: currentSubtopic?.title ?? "Topic",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setQuestions(data.questions ?? []);
    } catch (err) {
      console.error("Failed to load questions:", err);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const handleSelectOption = (questionId: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optIdx }));
  };

  const handleSubmit = () => {
    // Mark module as completed in localStorage
    const modKey = `${course.id}-${moduleId}`;
    try {
      const raw = localStorage.getItem("skillsync_completed_modules") ?? "[]";
      const arr: string[] = JSON.parse(raw);
      if (!arr.includes(modKey)) {
        localStorage.setItem("skillsync_completed_modules", JSON.stringify([...arr, modKey]));
      }
    } catch (e) {}
    setPhase("submitted");
  };

  if (!currentModule || !currentSubtopic) {
    return (
      <DashboardShell role="student" title="Not Found">
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <p className="text-muted-foreground text-sm">Sub-topic not found.</p>
          <Link href={`/student/assessment/course/${courseId}`}>
            <Button variant="outline" size="sm" className="rounded-xl">Back to Course</Button>
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const correctCount = questions.filter((q) => selectedAnswers[q.id] === q.correctAnswer).length;
  const scorePercent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <DashboardShell role="student" title={currentSubtopic.title}>
      <div className="max-w-3xl mx-auto pb-20 space-y-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
          <Link href="/student/assessment" className="hover:text-foreground transition-colors">
            Skill Assessment
          </Link>
          <span>/</span>
          <Link href={`/student/assessment/course/${courseId}`} className="hover:text-foreground transition-colors">
            {course.title}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{currentSubtopic.title}</span>
        </div>

        {/* Sub-topic header */}
        <div className="space-y-1">
          <Badge variant="outline" className="text-[0.65rem] rounded-full px-3 font-semibold mb-2">
            Module {currentModule.moduleNumber}: {currentModule.title}
          </Badge>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {currentSubtopic.title}
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
            Study this topic carefully before attempting the practice questions below.
          </p>
        </div>

        {/* ─── STUDY PHASE ──────────────────────────────────────────── */}
        {phase === "study" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* 1. Overview */}
            <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-bold text-foreground">Overview</h2>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {studyContent.overview.replace(/\*\*/g, "")}
              </p>
            </div>

            {/* 2. Core Concepts */}
            <div className="space-y-4">
              <h2 className="font-display text-lg font-bold text-foreground">Core Concepts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {studyContent.concepts.map((c, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-3xl border border-border/70 bg-card shadow-xs space-y-2"
                  >
                    <h3 className="text-sm font-bold text-foreground">{c.term}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Code Example */}
            <div className="rounded-3xl border border-border/80 overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-5 py-3 bg-muted/50 border-b border-border/70">
                <span className="text-xs font-bold text-foreground">Code Example</span>
                <Badge variant="outline" className="text-[0.6rem] rounded-full">JavaScript</Badge>
              </div>
              <pre className="p-5 text-xs font-mono leading-relaxed text-foreground/90 overflow-x-auto bg-muted/20">
                <code>{studyContent.codeExample}</code>
              </pre>
            </div>

            {/* 4. Key Points to Remember (placed before External Resources) */}
            <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card shadow-xs space-y-4">
              <h2 className="font-display text-lg font-bold text-foreground">Key Points to Remember</h2>
              <ul className="space-y-3">
                {studyContent.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                    <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. External Resources */}
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">External Resources</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Study from trusted platforms before attempting the practice questions.
                </p>
              </div>

              {/* Reference Sites */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[externalResources.gfg, externalResources.w3, externalResources.mdn].map((res) => (
                  <a
                    key={res.label}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-3xl border border-border/70 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 flex flex-col gap-3 group"
                  >
                    <div className="flex items-center justify-between">
                      <Globe className="h-5 w-5 text-primary" />
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {res.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{res.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* YouTube Video Links (Clean links, no big logos) */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Recommended Video Tutorials
                </h3>
                <div className="divide-y divide-border/60 rounded-2xl border border-border/80 bg-card overflow-hidden">
                  {externalResources.youtube.map((yt, i) => (
                    <a
                      key={i}
                      href={yt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 px-4 flex items-center justify-between text-xs hover:bg-muted/40 transition-colors group"
                    >
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {yt.label}
                      </span>
                      <span className="text-muted-foreground text-[0.72rem] flex items-center gap-1.5 flex-shrink-0">
                        {yt.channel}
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="flex justify-end pt-2">
              <Button
                onClick={handleStartPractice}
                className="rounded-2xl h-11 px-7 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs"
              >
                Start
              </Button>
            </div>
          </motion.div>
        )}

        {/* ─── QUIZ PHASE ──────────────────────────────────────────── */}
        {phase === "quiz" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {isLoadingQuestions ? (
              <div className="py-16 flex flex-col items-center justify-center space-y-4 text-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Generating 10 practice questions…</p>
              </div>
            ) : questions.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <XCircle className="h-8 w-8 text-destructive mx-auto" />
                <p className="text-sm text-muted-foreground">Could not load questions. Please try again.</p>
                <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setPhase("study")}>Back to Study</Button>
              </div>
            ) : (
              <>
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Practice Questions — {currentSubtopic.title}</span>
                    <span>{Object.keys(selectedAnswers).length}/{questions.length} answered</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted/60 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-300"
                      style={{ width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* All 10 questions scrollable */}
                <div className="space-y-5">
                  {questions.map((q, idx) => {
                    const selected = selectedAnswers[q.id];
                    return (
                      <div key={q.id} className="p-6 rounded-3xl border border-border/80 bg-card shadow-xs space-y-4">
                        <div className="flex items-start gap-3">
                          <span className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-sm font-semibold text-foreground leading-relaxed">{q.question}</p>
                        </div>
                        <div className="space-y-2.5 pl-10">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selected === optIdx;
                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => handleSelectOption(q.id, optIdx)}
                                className={cn(
                                  "w-full text-left p-3.5 rounded-2xl border text-xs font-medium transition-all flex items-center gap-3",
                                  isSelected
                                    ? "border-primary bg-primary/10 text-foreground"
                                    : "border-border/70 hover:border-primary/40 hover:bg-muted/30 text-foreground/90"
                                )}
                              >
                                <span
                                  className={cn(
                                    "h-5 w-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold flex-shrink-0 border",
                                    isSelected
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-border text-muted-foreground"
                                  )}
                                >
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span className="flex-1 leading-snug">{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length === 0}
                    className="rounded-2xl h-11 px-8 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs"
                  >
                    Submit Answers
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* ─── SUBMITTED PHASE ──────────────────────────────────────── */}
        {phase === "submitted" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Score card */}
            <div className="p-8 sm:p-10 rounded-3xl border border-border/80 bg-card shadow-xs text-center space-y-5">
              <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">Practice Complete!</h2>
                <p className="text-xs text-muted-foreground mt-1">{currentSubtopic.title}</p>
              </div>
              <div className="flex justify-center gap-12">
                <div className="text-center">
                  <span className="block font-display text-3xl font-extrabold text-foreground">{scorePercent}%</span>
                  <span className="text-xs text-muted-foreground">Score</span>
                </div>
                <div className="h-8 w-px bg-border self-center" />
                <div className="text-center">
                  <span className="block font-display text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {correctCount}/{questions.length}
                  </span>
                  <span className="text-xs text-muted-foreground">Correct</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button variant="outline" className="rounded-2xl h-10 text-sm px-6" onClick={() => { setPhase("quiz"); setSelectedAnswers({}); }}>
                  Retry Questions
                </Button>
                <Link href={`/student/assessment/course/${courseId}`}>
                  <Button className="rounded-2xl h-10 text-sm px-6 bg-primary text-primary-foreground font-semibold gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Course
                  </Button>
                </Link>
              </div>
            </div>

            {/* Answer review */}
            <div className="space-y-4">
              <h2 className="font-display text-lg font-bold text-foreground">Answer Review</h2>
              {questions.map((q, idx) => {
                const chosen = selectedAnswers[q.id];
                const isCorrect = chosen === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={cn(
                      "p-5 rounded-3xl border shadow-xs space-y-3",
                      isCorrect ? "border-emerald-500/30 bg-emerald-500/5" : "border-destructive/30 bg-destructive/5"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-foreground leading-snug flex-1">
                        <span className="text-muted-foreground font-normal text-xs">Q{idx + 1}. </span>
                        {q.question}
                      </p>
                      {isCorrect
                        ? <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                        : <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />}
                    </div>
                    {!isCorrect && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/20">
                          <span className="font-bold text-destructive block mb-0.5">Your Answer:</span>
                          {chosen !== undefined ? q.options[chosen] : "Not answered"}
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">Correct Answer:</span>
                          {q.options[q.correctAnswer]}
                        </div>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground bg-muted/40 rounded-xl p-3 border border-border/60">
                      <span className="font-semibold text-foreground">Explanation: </span>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

      </div>
    </DashboardShell>
  );
}
