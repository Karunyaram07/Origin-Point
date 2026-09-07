# Origin Point (formerly SkillSync)
### *Next-Generation Academia–Industry Collaboration & Skill Intelligence Portal*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.js.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📌 Executive Summary

**Origin Point** bridges the widening divide between academic training and enterprise talent requirements. By providing an intelligent, unified workspace for **Students**, **Industry Recruiters**, **Academicians**, and **Institutions**, Origin Point enables real-time skill benchmarking, project collaborations, automated assessment pathways, and verified talent pipelines.

---

## 👥 Role Portals & Capabilities

| Portal | Target Audience | Core Capabilities |
| :--- | :--- | :--- |
| **Student** | Learners & Job Seekers | • AI-powered diagnostic skill assessments<br>• Structured topic & course learning tracks<br>• Real-time code/concept verification & detailed progress reports<br>• Cryptographically verifiable portfolio & career matching |
| **Industry** | Recruiters & Engineering Leads | • Role-specific skill gap insights<br>• Direct talent sourcing with verified benchmark metrics<br>• Internship & technical project pipelines |
| **Academician** | Faculty & Mentors | • Student progress tracking & cohort skill diagnostics<br>• Inter-institutional research matchmaking<br>• Faculty Development Program (FDP) & grant tracking |
| **Institution** | Universities & Leadership | • Departmental placement & readiness analytics<br>• Curriculum alignment with industry trends<br>• Strategic partnership & accreditation metric management |

---

## 🛠 Tech Stack & Architecture

- **Frontend & App Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) custom primitives, [Lucide React](https://lucide.dev/) icons
- **Animations & Micro-interactions**: [Framer Motion](https://www.framer.com/motion/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Authentication & Backend**: [Supabase](https://supabase.com/) (Auth, Row Level Security, PostgreSQL Database, SSR Client)
- **AI & Automation**: [Google Generative AI (Gemini)](https://ai.google.dev/), [Inngest](https://www.inngest.com/) workflows

---

## 📂 Codebase Structure

```
Origin-point/
├── app/
│   ├── (auth)/                     # Auth routes with dedicated layouts
│   │   ├── login/                  # Email/password & Google OAuth sign in
│   │   ├── signup/                 # Role-selection & progressive account registration
│   │   ├── forgot-password/        # Password recovery request flow
│   │   ├── reset-password/         # Secure token password update page
│   │   ├── select-role/            # Role assignment selector
│   │   └── onboarding/             # Guided post-signup onboarding
│   ├── (dashboard)/                # Protected role workspaces
│   │   ├── student/                # Student dashboard & assessments
│   │   │   ├── assessment/         # Diagnostic tests, course modules, interactive learning
│   │   │   └── report/             # Skill evaluation reports & feedback
│   │   ├── industry/               # Recruiter talent discovery & candidate matching
│   │   ├── academician/            # Faculty mentorship & research collaborations
│   │   └── institution/            # Dean & department analytics
│   ├── api/
│   │   ├── assessment-questions/   # Dynamic AI assessment generation API
│   │   └── webhooks/               # Inbound lifecycle & integration hooks
│   ├── auth/callback/              # Supabase OAuth and email verification handler
│   ├── layout.js                   # Root layout with theme provider and typography
│   └── page.js                     # Origin Point hero landing page & value showcase
├── components/
│   ├── dashboard/                  # Reusable dashboard widgets & role overview components
│   ├── shared/                     # Origin Point wordmarks, logos, and global brand elements
│   └── ui/                         # shadcn/ui components (Button, Input, Card, Dialog, Tabs, etc.)
├── lib/
│   ├── supabase/                   # Supabase client, server, admin, and middleware utilities
│   ├── ai/                         # Gemini AI prompt templates & runners
│   ├── inngest/                    # Background event functions
│   └── utils.js                    # Style merges (clsx + tailwind-merge)
├── public/                         # Brand assets, static images, and icons
└── middleware.js                   # Route protection and role-based redirect middleware
```

---

## 🔐 Authentication & Security

- **Session Management**: Supabase SSR (`@supabase/ssr`) with HTTP-only cookie session exchange.
- **Role-Based Access Control**: Persistent user roles stored both in Supabase `profiles` table and encrypted session metadata.
- **Route Guarding**: Next.js middleware automatically protects dashboard routes, ensuring unauthenticated requests redirect to `/login` with clean callback preservation.
- **Recovery & Password Reset**: Secure tokenized password recovery via custom SMTP email configuration.

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: Google Gemini AI (for assessment generation)
GEMINI_API_KEY=your_gemini_api_key

# Optional: Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `18.17+` or `20+`
- npm, yarn, or pnpm

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/Origin-point.git
cd Origin-point

# Install dependencies
npm install
```

### 3. Database Migration
Ensure the `profiles` table exists in your Supabase database:
```sql
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT CHECK (role IN ('student', 'industry', 'academician', 'institution')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and update their own profile"
  ON public.profiles FOR ALL
  USING (auth.uid() = id);
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 Recent Updates & Fixes (Latest Changelog)

1. **Form Input Ref-Forwarding Fix (`components/ui/input.jsx`)**:
   - Replaced custom function wrapper with `React.forwardRef` around the native input element.
   - Fixed the critical bug where React Hook Form was unable to register the DOM input elements, preventing `undefined` values that previously triggered `"Invalid input"` errors on Login, Sign Up, and Forgot Password.

2. **Zod Validation Schema Hardening**:
   - Streamlined Zod v4 validation chains in `login`, `signup`, and `forgot-password` pages.
   - Shifted `.trim()` and `.toLowerCase()` operations into the submission handler to ensure smooth compatibility with `@hookform/resolvers/zod`.

3. **Forgot Password Screen Polish**:
   - Removed extraneous info cards (e.g., Google OAuth helper box) to create a focused, high-conversion recovery experience.
   - Enhanced error message handling for rate-limiting and invalid address notifications.

4. **Landing Page Cleanup**:
   - Permanently removed the obsolete bottom navigation footer from `app/page.js` as requested.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
