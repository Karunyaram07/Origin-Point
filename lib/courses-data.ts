export interface SubTopic {
  id: string;
  title: string;
  duration: string;
}

export interface CourseModuleItem {
  id: string;
  moduleNumber: number;
  level: "very-beginner" | "beginner" | "intermediate" | "advanced";
  levelName: string;
  title: string;
  description: string;
  subTopics: SubTopic[];
  isCompleted?: boolean;
}

export interface CourseDetails {
  id: string;
  title: string;
  category: string;
  description: string;
  completedModules: number;
  totalModules: number;
  modules: CourseModuleItem[];
}

export const coursesCatalog: Record<string, CourseDetails> = {
  c1: {
    id: "c1",
    title: "Full-Stack Web Development",
    category: "Development",
    description: "Master Modern React, Next.js, REST & GraphQL APIs, database integration, and responsive UI architecture.",
    completedModules: 0,
    totalModules: 8,
    modules: [
      // ── Very Beginner (2 Modules) ──────────────────────────────────────────
      {
        id: "m1",
        moduleNumber: 1,
        level: "very-beginner",
        levelName: "Very Beginner",
        title: "HTML5, Semantic Markup & Accessibility",
        description: "Foundational structure, modern semantic elements, ARIA standards, and SEO best practices.",
        isCompleted: false,
        subTopics: [
          { id: "st1-1", title: "Semantic Tags & Document Hierarchy", duration: "15 min" },
          { id: "st1-2", title: "Accessible Forms & ARIA Roles", duration: "20 min" },
          { id: "st1-3", title: "Modern Meta Tags & Web Vitals Basics", duration: "15 min" },
        ],
      },
      {
        id: "m2",
        moduleNumber: 2,
        level: "very-beginner",
        levelName: "Very Beginner",
        title: "Modern CSS3, Flexbox & CSS Grid",
        description: "Responsive layouts, container queries, CSS variables, and fluid typography.",
        subTopics: [
          { id: "st2-1", title: "Flexbox Alignment & Common Layouts", duration: "20 min" },
          { id: "st2-2", title: "CSS Grid Architecture & Responsive Templates", duration: "25 min" },
          { id: "st2-3", title: "Custom Properties, Theming & Transitions", duration: "20 min" },
        ],
      },

      // ── Beginner (2 Modules) ───────────────────────────────────────────────
      {
        id: "m3",
        moduleNumber: 3,
        level: "beginner",
        levelName: "Beginner",
        title: "Modern JavaScript (ES6+) & Core Syntax",
        description: "Variables, scope, functions, arrays, objects, and foundational control flow.",
        subTopics: [
          { id: "st3-1", title: "Destructuring, Rest/Spread & Immutability", duration: "20 min" },
          { id: "st3-2", title: "Array Methods (map, filter, reduce)", duration: "25 min" },
          { id: "st3-3", title: "DOM Selection & Event Listeners", duration: "20 min" },
        ],
      },
      {
        id: "m4",
        moduleNumber: 4,
        level: "beginner",
        levelName: "Beginner",
        title: "React Fundamentals, Hooks & State",
        description: "Component composition, useState, useEffect, props, and standard UI lifecycles.",
        subTopics: [
          { id: "st4-1", title: "Component Composition & JSX Principles", duration: "25 min" },
          { id: "st4-2", title: "State Management with useState & useEffect", duration: "30 min" },
          { id: "st4-3", title: "Handling Form Inputs & Synthetic Events", duration: "25 min" },
        ],
      },

      // ── Intermediate (2 Modules) ───────────────────────────────────────────
      {
        id: "m5",
        moduleNumber: 5,
        level: "intermediate",
        levelName: "Intermediate",
        title: "Next.js App Router & Full-Stack Routing",
        description: "Layout nesting, dynamic routes, link prefetching, and route handlers.",
        subTopics: [
          { id: "st5-1", title: "App Directory Structure & Nested Layouts", duration: "25 min" },
          { id: "st5-2", title: "Client vs Server Components in Practice", duration: "30 min" },
          { id: "st5-3", title: "Route Handlers & Fetching External APIs", duration: "25 min" },
        ],
      },
      {
        id: "m6",
        moduleNumber: 6,
        level: "intermediate",
        levelName: "Intermediate",
        title: "Backend API Engineering with Node.js & Express",
        description: "RESTful architecture, middleware pipelines, error handling, and request validation.",
        subTopics: [
          { id: "st6-1", title: "Routing Architecture & Custom Middleware", duration: "25 min" },
          { id: "st6-2", title: "Input Validation (Zod) & Error Wrappers", duration: "20 min" },
          { id: "st6-3", title: "Rate Limiting & CORS Security Headers", duration: "20 min" },
        ],
      },

      // ── Advanced (2 Modules) ───────────────────────────────────────────────
      {
        id: "m7",
        moduleNumber: 7,
        level: "advanced",
        levelName: "Advanced",
        title: "Authentication, Authorization & OAuth 2.0",
        description: "JWT, session cookies, bcrypt hashing, RBAC (role-based access), and OAuth integration.",
        subTopics: [
          { id: "st7-1", title: "Secure Cookies vs. Bearer Tokens", duration: "25 min" },
          { id: "st7-2", title: "OAuth 2.0 & OpenID Connect Handshake", duration: "30 min" },
          { id: "st7-3", title: "Role-Based Access Control (RBAC) Guards", duration: "20 min" },
        ],
      },
      {
        id: "m8",
        moduleNumber: 8,
        level: "advanced",
        levelName: "Advanced",
        title: "Production Deployment, CI/CD & Cloud Hosting",
        description: "Docker packaging, GitHub Actions pipelines, Vercel/AWS deployment, and monitoring.",
        subTopics: [
          { id: "st8-1", title: "Multi-stage Dockerfile Optimization", duration: "25 min" },
          { id: "st8-2", title: "GitHub Actions Build, Lint & Test Workflows", duration: "25 min" },
          { id: "st8-3", title: "Production Observability, Sentry & Logs", duration: "20 min" },
        ],
      },
    ],
  },
  c2: {
    id: "c2",
    title: "Data Structures & Algorithms",
    category: "Computer Science",
    description: "Deep dive into trees, dynamic programming, graph algorithms, and asymptotic complexity.",
    completedModules: 0,
    totalModules: 8,
    modules: [
      // ── Very Beginner (2 Modules) ──────────────────────────────────────────
      {
        id: "m1",
        moduleNumber: 1,
        level: "very-beginner",
        levelName: "Very Beginner",
        title: "Asymptotic Analysis & Big-O Notation",
        description: "Time and space complexity, best/worst/average case bounds, and recurrence relations.",
        isCompleted: false,
        subTopics: [
          { id: "st1-1", title: "Big-O, Omega, and Theta Definitions", duration: "20 min" },
          { id: "st1-2", title: "Master Theorem & Recurrence Relations", duration: "25 min" },
          { id: "st1-3", title: "Space vs. Time Complexity Trade-offs", duration: "20 min" },
        ],
      },
      {
        id: "m2",
        moduleNumber: 2,
        level: "very-beginner",
        levelName: "Very Beginner",
        title: "Arrays, Strings & Basic Traversal",
        description: "Linear data access, in-place manipulation, prefix sums, and basic indexing.",
        subTopics: [
          { id: "st2-1", title: "Array Operations & Memory Contiguity", duration: "20 min" },
          { id: "st2-2", title: "String Reversal & Palindrome Checking", duration: "20 min" },
          { id: "st2-3", title: "Prefix Sum Arrays & Range Queries", duration: "25 min" },
        ],
      },

      // ── Beginner (2 Modules) ───────────────────────────────────────────────
      {
        id: "m3",
        moduleNumber: 3,
        level: "beginner",
        levelName: "Beginner",
        title: "Hash Maps, Sets & Direct Addressing",
        description: "Key-value mapping, frequency counting, duplicate detection, and hash sets.",
        subTopics: [
          { id: "st3-1", title: "Hash Table Mechanics & O(1) Lookup", duration: "20 min" },
          { id: "st3-2", title: "Two-Sum Problem & Complement Lookups", duration: "25 min" },
          { id: "st3-3", title: "HashSet for Unique Elements & Anagrams", duration: "20 min" },
        ],
      },
      {
        id: "m4",
        moduleNumber: 4,
        level: "beginner",
        levelName: "Beginner",
        title: "Linked Lists & Two-Pointer Techniques",
        description: "Singly, doubly linked lists, fast/slow pointers, and sliding window patterns.",
        subTopics: [
          { id: "st4-1", title: "Two-Pointer Strategy on Sorted Arrays", duration: "25 min" },
          { id: "st4-2", title: "Floyd's Cycle Finding Algorithm", duration: "25 min" },
          { id: "st4-3", title: "Reverse Linked List & Edge Scenarios", duration: "20 min" },
        ],
      },

      // ── Intermediate (2 Modules) ───────────────────────────────────────────
      {
        id: "m5",
        moduleNumber: 5,
        level: "intermediate",
        levelName: "Intermediate",
        title: "Stacks, Queues & Monotonic Sequences",
        description: "LIFO/FIFO paradigms, monotonic stacks, priority queues, and deque patterns.",
        subTopics: [
          { id: "st5-1", title: "Valid Parentheses & Call Stack Modeling", duration: "20 min" },
          { id: "st5-2", title: "Queue Implementations & Circular Buffers", duration: "20 min" },
          { id: "st5-3", title: "Monotonic Stack for Next Greater Element", duration: "25 min" },
        ],
      },
      {
        id: "m6",
        moduleNumber: 6,
        level: "intermediate",
        levelName: "Intermediate",
        title: "Binary Trees, BSTs & Traversal Strategies",
        description: "DFS (Pre/In/Post order), BFS level order, height balancing, and LCA.",
        subTopics: [
          { id: "st6-1", title: "DFS vs. BFS Traversal & Recursive Trees", duration: "25 min" },
          { id: "st6-2", title: "BST Search, Insert, and Deletion Properties", duration: "30 min" },
          { id: "st6-3", title: "Lowest Common Ancestor & Diameter of Tree", duration: "25 min" },
        ],
      },

      // ── Advanced (2 Modules) ───────────────────────────────────────────────
      {
        id: "m7",
        moduleNumber: 7,
        level: "advanced",
        levelName: "Advanced",
        title: "Graph Algorithms (BFS, DFS & Shortest Path)",
        description: "Adjacency lists, topological sorting, Dijkstra, Bellman-Ford, and Union-Find.",
        subTopics: [
          { id: "st7-1", title: "Graph Traversal (BFS & DFS) with Visited Sets", duration: "25 min" },
          { id: "st7-2", title: "Dijkstra's Shortest Path Algorithm", duration: "30 min" },
          { id: "st7-3", title: "Disjoint Set Union (DSU) & Cycle Detection", duration: "25 min" },
        ],
      },
      {
        id: "m8",
        moduleNumber: 8,
        level: "advanced",
        levelName: "Advanced",
        title: "Dynamic Programming (1D & 2D Tabulation)",
        description: "Memoization, tabulation, knapsack problems, longest common subsequences.",
        subTopics: [
          { id: "st8-1", title: "Top-Down Memoization vs. Bottom-Up Tabulation", duration: "30 min" },
          { id: "st8-2", title: "0/1 Knapsack & Subset Sum Variations", duration: "35 min" },
          { id: "st8-3", title: "Longest Common Subsequence & Edit Distance", duration: "35 min" },
        ],
      },
    ],
  },
};

// Generic factory to ensure all courses have 8 rich modules divided into 4 levels (2 per level)
export function getCourseDetails(courseId: string, courseTitleFallback?: string): CourseDetails {
  if (coursesCatalog[courseId]) {
    return coursesCatalog[courseId];
  }

  const titles: Record<string, string> = {
    c3: "Database Systems & SQL Mastery",
    c4: "Cloud Infrastructure & DevOps",
    c5: "System Design & Scalability",
    c6: "Applied AI & Machine Learning",
    c7: "Cybersecurity & Web Defense",
    c8: "Operating Systems & Low-Level",
  };

  const title = titles[courseId] || courseTitleFallback || "Advanced Engineering Course";

  const genericLevelTiers: Array<{
    level: "very-beginner" | "beginner" | "intermediate" | "advanced";
    levelName: string;
    modules: Array<{ title: string; desc: string }>;
  }> = [
    {
      level: "very-beginner",
      levelName: "Very Beginner",
      modules: [
        { title: "Core Terminology, Foundations & Syntax", desc: "Essential concepts, vocabulary, and basic principles." },
        { title: "Standard Operations & Data Modeling", desc: "Fundamental data handling and standard control flow." },
      ],
    },
    {
      level: "beginner",
      levelName: "Beginner",
      modules: [
        { title: "Component Architecture & Data Flow", desc: "Intermediate composition and state transitions." },
        { title: "API Integration & Contract Handling", desc: "Connecting services, handling responses and payloads." },
      ],
    },
    {
      level: "intermediate",
      levelName: "Intermediate",
      modules: [
        { title: "Persistence, Storage & Query Tuning", desc: "Database schemas, indexes, and caching strategies." },
        { title: "Authentication, Access & Defensive Coding", desc: "Security considerations, input guards, and token flows." },
      ],
    },
    {
      level: "advanced",
      levelName: "Advanced",
      modules: [
        { title: "Distributed Scalability & High Throughput", desc: "Asynchronous processing, message brokers, and load balancing." },
        { title: "Cloud Deployment, Containers & Packaging", desc: "Dockerization, CI/CD pipelines, and cloud hosting." },
      ],
    },
  ];

  let modCounter = 1;
  const modules: CourseModuleItem[] = [];

  genericLevelTiers.forEach((tier) => {
    tier.modules.forEach((m) => {
      const currentNumber = modCounter++;
      modules.push({
        id: `m${currentNumber}`,
        moduleNumber: currentNumber,
        level: tier.level,
        levelName: tier.levelName,
        title: `${m.title}`,
        description: `${m.desc} in modern production environments.`,
        isCompleted: false,
        subTopics: [
          { id: `st${currentNumber}-1`, title: `${m.title} Core Principles`, duration: "20 min" },
          { id: `st${currentNumber}-2`, title: `Implementation & Hands-on Lab`, duration: "25 min" },
          { id: `st${currentNumber}-3`, title: `Industry Best Practices & Review`, duration: "20 min" },
        ],
      });
    });
  });

  return {
    id: courseId,
    title,
    category: "Specialized Engineering",
    description: `Deep masterclass covering all 8 core milestones of ${title}.`,
    completedModules: 0,
    totalModules: 8,
    modules,
  };
}
