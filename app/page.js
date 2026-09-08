"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Building2,
  BookOpen,
  Landmark,
  Briefcase,
  Users,
  ClipboardCheck,
  TrendingUp,
  Handshake,
  FlaskConical,
  UserCheck,
  BarChart3,
  PieChart,
  Target,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LandingStarfield } from "@/components/landing/starfield";
import StrokeText from "@/components/landing/StrokeText";
import { OriginWordmark } from "@/components/shared/origin-logo";
import { cn } from "@/lib/utils";

/* ═══════════════════════ Content ═══════════════════════ */

const newsItems = [
  {
    title: "OpenAI launches Astra, its powerful new model",
    description:
      "A new frontier model focused on computer use, browser tasks, coding, and cybersecurity.",
    source: "TechCrunch · Sep 3, 2026",
    href: "https://techcrunch.com/2026/09/03/openai-launches-astra-its-powerful-and-controversial-new-model/",
    image: "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
    alt: "OpenAI logo",
  },
  {
    title: "Anthropic releases Fable and Mythos 5.1",
    description:
      "The new releases bring performance upgrades, lower token costs, and expanded privacy options.",
    source: "TechCrunch · Sep 1, 2026",
    href: "https://techcrunch.com/2026/09/01/anthropics-new-fable-release-is-cheaper-less-restrictive/",
    image: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128",
    alt: "Anthropic logo",
  },
  {
    title: "CrowdStrike unveils coordinated agentic SOC",
    description:
      "Multi-agent investigations now connect endpoint, identity, SaaS, cloud, and network signals.",
    source: "CrowdStrike · Sep 2, 2026",
    href: "https://ir.crowdstrike.com/news-releases/news-release-details/crowdstrike-unveils-next-evolution-agentic-soc",
    image: "https://www.google.com/s2/favicons?domain=crowdstrike.com&sz=128",
    alt: "CrowdStrike logo",
  },
  {
    title: "HPE and Oracle deepen AI infrastructure collaboration",
    description:
      "The expanded partnership supports networking across Oracle’s growing AI data-center footprint.",
    source: "HPE · Sep 2, 2026",
    href: "https://www.hpe.com/us/en/newsroom/press-release/2026/09/hpe-and-oracle-deepen-networking-collaboration-to-accelerate-gigawatt-scale-ai-infrastructure.html",
    image: "https://www.google.com/s2/favicons?domain=hpe.com&sz=128",
    alt: "HPE logo",
  },
  {
    title: "F5 adds AI-powered protection for emerging cyber risks",
    description:
      "New WAF and runtime security updates help teams patch faster as AI-driven threats accelerate.",
    source: "F5 · Sep 1, 2026",
    href: "https://www.f5.com/company/news/press-releases/virtual-patching-ai-powered-waf-runtime-security",
    image: "https://www.google.com/s2/favicons?domain=f5.com&sz=128",
    alt: "F5 logo",
  },
  {
    title: "Broadcom introduces VMware Private AI Cloud",
    description:
      "Private cloud and AI infrastructure come together for more secure, controlled enterprise inference.",
    source: "Broadcom · Aug 31, 2026",
    href: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-introduces-vmware-private-ai-cloud-enabling-enterprises",
    image: "https://www.google.com/s2/favicons?domain=broadcom.com&sz=128",
    alt: "Broadcom logo",
  },
];

const roles = [
  {
    id: "student",
    title: "Students",
    description: "Assess → Match → Grow. Build a verified portfolio that gets you hired.",
    icon: GraduationCap,
    tile: "from-indigo-500 to-violet-500",
    glow: "99 102 241",
    features: [
      "Skill assessment & gap analysis",
      "Smart internship matching",
      "Digital portfolio builder",
    ],
  },
  {
    id: "industry",
    title: "Industries",
    description: "Post opportunities and find pre-matched, skill-verified candidates.",
    icon: Building2,
    tile: "from-amber-500 to-orange-500",
    glow: "245 158 11",
    features: [
      "Post internships & jobs",
      "Kanban candidate shortlisting",
      "Run training programs",
    ],
  },
  {
    id: "academician",
    title: "Academicians",
    description: "FDPs, consultancy, and collaborative research — all in one portal.",
    icon: BookOpen,
    tile: "from-emerald-500 to-teal-500",
    glow: "16 185 129",
    features: [
      "Faculty development programs",
      "Industry consultancy",
      "Research collaboration",
    ],
  },
  {
    id: "institution",
    title: "Institutions",
    description: "Monitor skill development, placement readiness, and recruitment outcomes.",
    icon: Landmark,
    tile: "from-sky-500 to-blue-600",
    glow: "37 99 235",
    features: [
      "Skill analytics dashboards",
      "Placement tracking",
      "Cohort-level reporting",
    ],
  },
];

const stakeholderJourneySteps = [
  {
    id: "industry",
    label: "The Industry Journey",
    title: "From Hiring Need to Team Impact — One Clear Flow",
    description:
      "See how an industry team can find, evaluate, and grow the right talent on Origin Point.",
    tint: "section-tint-warm",
    accent: "eyebrow-amber",
    steps: [
      {
        title: "Post an Opportunity",
        description:
          "Create a clear internship, job, or training brief with the exact skills your team needs.",
        icon: Briefcase,
        gradient: "from-amber-500 to-orange-400",
      },
      {
        title: "Discover Verified Candidates",
        description:
          "Review skill-based matches with portfolios, assessment scores, and project evidence in one view.",
        icon: Users,
        gradient: "from-orange-500 to-rose-400",
      },
      {
        title: "Shortlist & Collaborate",
        description:
          "Move candidates through review, interviews, and team feedback without losing context.",
        icon: ClipboardCheck,
        gradient: "from-rose-500 to-pink-400",
      },
      {
        title: "Hire & Build Programs",
        description:
          "Make the offer, mentor new talent, and create programs that keep your pipeline growing.",
        icon: TrendingUp,
        gradient: "from-violet-500 to-indigo-400",
      },
    ],
  },
  {
    id: "academician",
    label: "The Academician Journey",
    title: "From Expertise to Shared Impact — One Connected Flow",
    description:
      "See how academicians can connect teaching, consultancy, research, and student guidance on Origin Point.",
    tint: "section-tint-mint",
    accent: "eyebrow-emerald",
    steps: [
      {
        title: "Create Your Expertise Profile",
        description:
          "Showcase your subjects, research interests, publications, and industry experience.",
        icon: BookOpen,
        gradient: "from-emerald-500 to-teal-400",
      },
      {
        title: "Explore FDPs & Consultancy",
        description:
          "Find faculty development programs and consultancy briefs that match your strengths.",
        icon: Handshake,
        gradient: "from-teal-500 to-cyan-400",
      },
      {
        title: "Collaborate on Research",
        description:
          "Meet aligned researchers, labs, and organisations to move meaningful ideas forward.",
        icon: FlaskConical,
        gradient: "from-cyan-500 to-blue-400",
      },
      {
        title: "Guide Student Internships",
        description:
          "Share live opportunities, mentor learners, and connect classroom learning to real work.",
        icon: UserCheck,
        gradient: "from-blue-500 to-violet-400",
      },
    ],
  },
  {
    id: "institution",
    label: "The Institution Journey",
    title: "From Campus Signals to Better Outcomes — One Clear Flow",
    description:
      "See how institutions can understand readiness, coordinate partners, and improve student outcomes.",
    tint: "section-tint-cool",
    accent: "eyebrow-blue",
    steps: [
      {
        title: "Connect Cohorts & Departments",
        description:
          "Bring students, departments, faculty, and programs into one shared institutional view.",
        icon: Building2,
        gradient: "from-blue-600 to-indigo-500",
      },
      {
        title: "Track Skill Analytics",
        description:
          "Read verified skills and emerging gaps early so teams can plan focused interventions.",
        icon: BarChart3,
        gradient: "from-indigo-500 to-violet-500",
      },
      {
        title: "Coordinate Recruitment",
        description:
          "Manage employers, openings, placement drives, and shortlists with less manual effort.",
        icon: PieChart,
        gradient: "from-violet-500 to-fuchsia-400",
      },
      {
        title: "Support Students & Measure Impact",
        description:
          "Assign mentors, celebrate progress, and follow placement outcomes across every cohort.",
        icon: Target,
        gradient: "from-fuchsia-500 to-rose-400",
      },
    ],
  },
];

/* ═══════════════════════ Page ═══════════════════════ */

export default function LandingPage() {
  const heroRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">

      {/* ═══════════ Nav ═══════════ */}
      <nav
        className={`landing-nav fixed left-0 right-0 top-0 z-sticky text-white ${
          hasScrolled ? "landing-nav-scrolled" : ""
        }`}
      >
        <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-12">
          <Link href="/" className="group flex items-center gap-2.5">
            <OriginWordmark className="text-xl font-bold tracking-tight text-white transition-opacity group-hover:opacity-80" />
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/login" className="animated-button" aria-label="Get Started">
              <span className="text">Get Started</span>
              <span className="circle" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════ Hero ═══════════ */}
      <section
        ref={heroRef}
        className="landing-hero relative flex min-h-[100vh] items-center overflow-hidden bg-slate-950 pb-10 pt-24 text-white"
      >
        <LandingStarfield />

        <div className="aurora-field" aria-hidden="true">
          <span className="aurora-blob aurora-blob-1" />
          <span className="aurora-blob aurora-blob-2" />
          <span className="aurora-blob aurora-blob-3" />
          <span className="aurora-blob aurora-blob-4" />
        </div>

        <div className="absolute inset-0 dot-pattern opacity-[0.12]" />
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1800px] px-6 sm:px-10 lg:px-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div className="relative z-10 max-w-2xl text-left">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <StrokeText
                  text={"One Platform.\nEvery Skill.\nEvery Opportunity."}
                  strokeColor="#A78BFA"
                  fillColor="#F8FAFC"
                  strokeWidth={1.4}
                  drawDuration={5.5}
                  fillDelay={0.65}
                  stagger={0.14}
                  ease="power2.out"
                  trigger="mount"
                  fillMode="wipe"
                  fontSize={128}
                  fontWeight={800}
                  letterSpacing={-4}
                  reverse={false}
                  loopPause={5}
                  className="mt-6 text-left font-display text-hero font-extrabold tracking-tight"
                  lineClassNames={[
                    "text-white",
                    "text-gradient-brand",
                    "text-white",
                  ]}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <div className="w-full lg:max-w-[700px] lg:justify-self-end">
                <div className="glass-dark mb-3 flex w-full items-center justify-between rounded-2xl px-4 py-2.5 shadow-xl shadow-black/20">
                  <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                    Trending in Tech
                  </span>
                  <span className="flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                    <span className="eyebrow-dot" />
                    Live
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {newsItems.map((news, i) => (
                    <motion.a
                      href={news.href}
                      target="_blank"
                      rel="noreferrer"
                      key={news.title}
                      className="h-full"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.35 + i * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <div className="glass-dark glass-dark-hover group h-full min-h-[130px] cursor-pointer rounded-2xl p-4 shadow-xl shadow-black/15">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-lg shadow-black/20 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={news.image}
                                alt={news.alt}
                                className="h-full w-full object-contain"
                                loading="lazy"
                              />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-display text-[13px] font-semibold leading-snug text-white transition-colors group-hover:text-cyan-100">
                                {news.title}
                              </h3>
                              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/65">
                                {news.description}
                              </p>
                              <p className="mt-1 font-display text-xs text-white/55">
                                {news.source}
                              </p>
                            </div>
                          </div>
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-cyan-400 group-hover:shadow-lg">
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ Portals ═══════════ */}
      <section
        id="roles"
        className="section-tint-cool section-seam relative overflow-hidden py-20 md:py-28"
      >
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div
          className="aurora-field aurora-field-light aurora-field-top"
          aria-hidden="true"
        >
          <span className="aurora-blob aurora-blob-1" />
          <span className="aurora-blob aurora-blob-2" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Four Portals, One Platform"
            title="Built for Every Stakeholder in the Ecosystem"
            description="Choose your path and get a workspace designed around the work you actually do."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((role, i) => (
              <Reveal key={role.id} delay={i * 0.09} pop>
                <SpotlightCard glow={role.glow}>
                  <Card className="gradient-border lift group relative h-full overflow-hidden border-border bg-card/80 backdrop-blur-sm">
                    <CardContent className="flex h-full flex-col p-7">
                      <div
                        className={cn(
                          "icon-tile mb-5 bg-gradient-to-br shadow-lg",
                          role.tile
                        )}
                      >
                        <role.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-xl font-semibold tracking-tight">
                        {role.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                        {role.description}
                      </p>
                      <div className="mt-6 space-y-2.5 border-t border-border pt-5">
                        {role.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Link
                        href={`/login?redirect=/${role.id}&role=${role.id}`}
                        className="mt-6 inline-flex items-center font-display text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground"
                      >
                        Explore this portal
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </CardContent>
                  </Card>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Stakeholder journeys ═══════════ */}
      {stakeholderJourneySteps.map((journey) => (
        <section
          id={`${journey.id}-journey`}
          key={journey.id}
          className={cn("relative overflow-hidden py-20 md:py-28", journey.tint)}
        >
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow={journey.label}
              eyebrowClassName={journey.accent}
              title={journey.title}
              description={journey.description}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {journey.steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.12}>
                  <StepCard
                    step={{ ...step, step: String(index + 1).padStart(2, "0") }}
                    index={index}
                    total={journey.steps.length}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

/* ═══════════════════════ Helpers ═══════════════════════ */

function SectionHeading({ eyebrow, eyebrowClassName = "", title, description = "" }) {
  return (
    <Reveal>
      <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
        <span className={cn("eyebrow", eyebrowClassName)}>
          <span className="eyebrow-dot" />
          {eyebrow}
        </span>
        <h2 className="mt-5 font-display text-display-sm font-extrabold tracking-tight text-balance md:text-display-md">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}

function StepCard({ step, index = 0, total = 1 }) {
  return (
    <SpotlightCard>
      <Card className="gradient-border lift group relative h-full overflow-hidden border-border bg-card/80 backdrop-blur-sm">
        <CardContent className="relative p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div
                className={cn(
                  "icon-tile bg-gradient-to-br shadow-lg",
                  step.gradient
                )}
              >
                <step.icon className="h-[1.4rem] w-[1.4rem]" />
              </div>
              {index < total - 1 ? (
                <span className="step-rail hidden md:block" aria-hidden="true" />
              ) : null}
            </div>
            <div className="flex-1">
              <p className="mb-1.5 font-mono text-xs tracking-wider text-muted-foreground">
                STEP {step.step}
              </p>
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>

          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-slow group-hover:opacity-[0.06]",
              step.gradient
            )}
          />
        </CardContent>
      </Card>
    </SpotlightCard>
  );
}

/* Cursor-follow spotlight wrapper — sets --mx/--my CSS vars */
function SpotlightCard({ children, className = "", glow = null }) {
  const ref = useRef(null);

  const handleMove = useCallback((event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  const glowStyle = glow
    ? {
        "--lift-glow": `rgb(${glow} / 0.5)`,
        "--lift-border": `rgb(${glow} / 0.35)`,
        "--spot-color": `rgb(${glow} / 0.13)`,
      }
    : undefined;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      style={glowStyle}
      className={cn("spotlight-card h-full rounded-2xl", className)}
    >
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0, pop = false, once = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-70px" });

  return (
    <motion.div
      ref={ref}
      className="h-full"
      initial={{ opacity: 0, y: 26, scale: pop ? 0.94 : 1 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 26, scale: pop ? 0.94 : 1 }
      }
      transition={{
        duration: pop ? 0.7 : 0.6,
        delay,
        ease: pop ? [0.34, 1.4, 0.64, 1] : [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
