# Claude Code Instructions — Automation to Architect Web App

## Context

This repo (`automation-to-architect`) already contains 9 learning modules as markdown + JSON quiz files. The goal is to add a full web application to this repo that turns the static content into an interactive learning platform with user accounts, progress tracking, quizzes, and a public leaderboard.

**This is also a portfolio project** for the repo owner (Stas), an automation engineer transitioning to Solutions Architect / Platform Engineer roles. The tech choices should demonstrate breadth and modern architecture skills.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Astro 5 + React islands | Content-focused, islands architecture (different from Next.js), fast, SSR + client interactivity where needed |
| **Styling** | Tailwind CSS 4 | Utility-first, fast to build, industry standard |
| **Auth** | Supabase Auth | Free tier (50K MAU), OAuth (GitHub + Google), session management |
| **Database** | Supabase Postgres | Free tier (500MB), Row Level Security, realtime subscriptions |
| **Hosting** | Vercel | Free tier, Astro adapter available, already familiar |
| **ORM** | Drizzle ORM | Type-safe, lightweight, works great with Postgres + Astro |
| **Quizzes** | React components (client islands) | Interactive quiz UI that reads from existing JSON test files |

**Total infrastructure cost: $0/month**

---

## Repo Structure (add to existing)

```
automation-to-architect/
├── modules/                    # EXISTING — 9 module folders with README.md + tests/quiz.json
├── progress.json               # EXISTING — keep for CLI users
├── scripts/                    # EXISTING — CLI quiz runner + progress updater
├── app/                        # NEW — Astro web application
│   ├── astro.config.mjs
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.mjs
│   ├── drizzle.config.ts
│   ├── .env.example
│   ├── src/
│   │   ├── layouts/
│   │   │   └── Layout.astro           # Base layout (dark theme, nav, footer)
│   │   ├── pages/
│   │   │   ├── index.astro            # Landing page (hero, features, CTA)
│   │   │   ├── login.astro            # Login page
│   │   │   ├── signup.astro           # Signup page
│   │   │   ├── dashboard.astro        # Main learning dashboard (protected)
│   │   │   ├── modules/
│   │   │   │   └── [slug].astro       # Individual module page
│   │   │   ├── quiz/
│   │   │   │   └── [slug].astro       # Quiz page (React island)
│   │   │   ├── profile/
│   │   │   │   └── [username].astro   # Public profile page
│   │   │   ├── leaderboard.astro      # Public leaderboard
│   │   │   ├── settings.astro         # User settings (protected)
│   │   │   └── api/
│   │   │       ├── auth/
│   │   │       │   ├── callback.ts    # OAuth callback handler
│   │   │       │   ├── login.ts       # Email/password login
│   │   │       │   ├── signup.ts      # Registration
│   │   │       │   └── logout.ts      # Logout
│   │   │       ├── progress/
│   │   │       │   ├── update.ts      # Mark exercise complete
│   │   │       │   └── get.ts         # Get user progress
│   │   │       ├── quiz/
│   │   │       │   └── submit.ts      # Submit quiz answers, calculate score
│   │   │       └── leaderboard/
│   │   │           └── get.ts         # Get leaderboard data
│   │   ├── components/
│   │   │   ├── Header.astro           # Navigation bar
│   │   │   ├── Footer.astro           # Footer
│   │   │   ├── ModuleCard.astro       # Module card for dashboard grid
│   │   │   ├── ProgressBar.astro      # Visual progress bar
│   │   │   ├── ProgressRing.astro     # Circular progress indicator
│   │   │   ├── Quiz.tsx               # React island — interactive quiz component
│   │   │   ├── ExerciseChecklist.tsx   # React island — checkable exercise list
│   │   │   └── LeaderboardTable.tsx    # React island — sortable leaderboard
│   │   ├── lib/
│   │   │   ├── supabase.ts            # Supabase client (server + browser)
│   │   │   ├── db/
│   │   │   │   ├── schema.ts          # Drizzle schema definitions
│   │   │   │   └── migrations/        # Drizzle migrations
│   │   │   ├── modules.ts             # Load module content from ../modules/
│   │   │   ├── auth.ts                # Auth helpers (getUser, requireAuth)
│   │   │   └── quiz.ts                # Quiz scoring logic
│   │   ├── middleware/
│   │   │   └── index.ts               # Auth middleware (protect routes)
│   │   └── styles/
│   │       └── global.css             # Tailwind imports + custom styles
│   └── public/
│       ├── favicon.svg
│       └── og-image.png               # Social share image
├── README.md                   # EXISTING — update to link to live site
└── LICENSE                     # EXISTING
```

---

## Database Schema (Supabase Postgres via Drizzle)

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  target_role TEXT,  -- 'solutions_architect' | 'platform_engineer' | 'devops' | 'integration_engineer'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Module progress
CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  module_slug TEXT NOT NULL,  -- '01-docker', '02-aws-foundations', etc.
  status TEXT DEFAULT 'not_started',  -- 'not_started' | 'in_progress' | 'completed'
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, module_slug)
);

-- Exercise completion
CREATE TABLE exercise_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  module_slug TEXT NOT NULL,
  exercise_index INTEGER NOT NULL,  -- 0-based index within the module
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,  -- optional user notes
  UNIQUE(user_id, module_slug, exercise_index)
);

-- Quiz attempts
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  module_slug TEXT NOT NULL,
  score INTEGER NOT NULL,          -- number correct
  total INTEGER NOT NULL,          -- total questions
  percentage INTEGER NOT NULL,     -- score percentage
  passed BOOLEAN NOT NULL,         -- >= 80% = passed
  answers JSONB NOT NULL,          -- { questionIndex: selectedOptionIndex }
  attempted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certification tracking
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  cert_name TEXT NOT NULL,  -- 'aws_sa_associate' | 'terraform_associate' | 'ckad'
  passed_at DATE,
  score TEXT,  -- optional exam score
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, cert_name)
);

-- Row Level Security: users can only read/write their own data
-- Profiles are publicly readable (for leaderboard + public profiles)
-- Quiz attempts, exercise completions, module progress are private (owner only)
```

---

## Key Features (MVP)

### 1. Landing Page (`/`)
- Hero section: "Automation to Architect" tagline, brief pitch
- 9-module visual roadmap (vertical timeline or grid)
- Social proof: "X engineers learning" counter
- CTA: "Start Learning — Free" → signup

### 2. Auth (`/login`, `/signup`)
- Email/password + GitHub OAuth + Google OAuth
- On signup, prompt for username and target role
- Redirect to dashboard after auth

### 3. Dashboard (`/dashboard`) — Protected
- Grid of 9 module cards showing: title, status (not started / in progress / completed), exercise progress bar, quiz score (if attempted), estimated time
- Overall progress ring at top (X% complete, X/52 exercises, X/9 quizzes passed)
- Certification tracking section (AWS SA, Terraform, CKAD) with "Mark as Passed" buttons
- "Your rank: #X of Y learners" link to leaderboard

### 4. Module Page (`/modules/[slug]`) — Protected
- Render the module's README.md content as HTML (use remark/rehype)
- Exercise checklist (React island) — click to mark done, saves to DB
- "Take Quiz" button → links to quiz page
- Previous/next module navigation

### 5. Quiz Page (`/quiz/[slug]`) — Protected
- React island component
- Reads questions from `modules/XX-name/tests/quiz.json`
- One question at a time, A/B/C/D selection
- On submit: show score, correct/wrong per question with explanations
- Save attempt to DB
- 80%+ = passed (show confetti or success animation)
- "Retake" button to try again

### 6. Public Profile (`/profile/[username]`)
- User's display name, avatar, bio, target role
- Module progress grid (visual, like GitHub contribution graph or simpler)
- Quiz scores per module
- Certifications earned
- "Joined X days ago" / "X% complete"
- Shareable URL for LinkedIn/resume

### 7. Leaderboard (`/leaderboard`)
- Table: rank, username (linked to profile), modules completed, exercises done, quizzes passed, overall %
- Sortable columns
- Highlight current user's row
- Public (no auth required to view)

---

## Design Direction

- **Dark theme** (matches the career-transition-plan.html and curated-courses-and-certs.html aesthetic already built)
- Color palette: slate/navy backgrounds (#0f172a, #1e293b), blue accents (#3b82f6), green for completion (#22c55e), amber for in-progress (#eab308)
- Clean, professional, developer-friendly — think Linear or Vercel dashboard aesthetic
- Mobile responsive
- Minimal animations (progress bars, quiz transitions)

---

## Content Loading Strategy

Module content comes from the existing `modules/` directory (NOT duplicated in DB):
- At build time, read `modules/*/README.md` and parse with remark/rehype
- At build time, read `modules/*/tests/quiz.json` for quiz data
- Module metadata (title, exercise count, estimated time, cost) defined in a `modules/index.ts` config file
- User progress data comes from Supabase at request time

This means module content updates are just markdown edits + redeploy. No CMS needed.

---

## Implementation Order (for Claude Code)

1. **Scaffold Astro app** in `app/` directory with Tailwind, React integration, Vercel adapter
2. **Set up Supabase** — create tables, RLS policies, auth config
3. **Auth flow** — signup, login, logout, OAuth, middleware
4. **Module content loader** — read markdown + quiz JSON from `../modules/`
5. **Dashboard page** — module grid with progress
6. **Module page** — rendered markdown + exercise checklist
7. **Quiz component** — interactive React island with scoring + DB save
8. **Progress API** — update/read exercise completions and module status
9. **Public profile page** — shareable progress view
10. **Leaderboard** — aggregated progress rankings
11. **Landing page** — marketing/hero page for non-logged-in users
12. **Polish** — responsive design, loading states, error handling, OG images

---

## Environment Variables Needed

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # server-side only
```

---

## Commands

```bash
cd app
npm install
npm run dev        # local development
npm run build      # production build
npm run preview    # preview production build
```

---

## Notes

- The existing `scripts/` and `progress.json` stay for CLI users who want to use the repo directly
- The web app reads from `../modules/` at build time — shared content, two interfaces
- Quiz passing threshold: 80%
- All user data is per-account in Supabase, not local files
- The repo itself is the portfolio piece — clean code, good commit history, architecture decisions documented
