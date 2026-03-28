# Thorfinn University Platform

A production-grade university web platform built for the modern student experience. Thorfinn University combines a fully functional public-facing website, role-based dashboards, real-time campus activity, AI assistance, and an interactive campus map — all in a single Next.js application.

Link: https://thorfinn-university.vercel.app/

---

## Overview

Most university websites are static brochures. This platform is a living system. Students log in and see their grades, attendance, timetable, and a career simulator. Faculty manage courses and mark attendance. Admins oversee departments, users, placements, and publish notices. The public-facing site covers 12 pages with video heroes, animated statistics, placement analytics, department detail pages with embedded videos, and a persistent AI chatbot.

The platform is built to be deployable in under 10 minutes with three environment variables.

---

## Features at a Glance

1. **Interactive Campus Map with Live Event Markers** — A zoomable (1×–4×), pannable image map of the university campus. Markers are fetched from Supabase and positioned using percentage-based coordinates so they scale on any screen size. Live markers pulse continuously. Clicking any marker opens a side panel with full event details — title, venue, time, date, expected attendees, and a live indicator.

2. **Happening Now Real-Time Campus Feed (Supabase Realtime)** — A live activity feed where students post campus events with a title, location, and tag. New posts and upvotes propagate instantly to all connected clients via Supabase Realtime — no polling, no refresh required. Posts auto-expire after 4 hours and are ranked by vote count.

3. **Career Path Simulator (End-to-End Academic → Placement Flow)** — A multi-step interactive simulator that walks a student through their entire university journey: interest selection → department → research labs → internship → placement package → alumni career path. Each step is animated and the final screen renders a complete career summary card.

4. **AI Chatbot (Groq Llama 3.1 Integration)** — A persistent floating assistant available on every public page, powered by Groq's Llama 3.1 8B Instant model. The API key is kept server-side in a Next.js route handler. The chatbot maintains the last 6 messages for context, surfaces suggested quick questions on first open, and falls back gracefully when the API is unavailable.

5. **Role-Based Authentication System (Student / Faculty / Admin)** — Email/password authentication via Supabase Auth. Each user is assigned a role stored in both `user_metadata` and the `profiles` table. Login redirects automatically to the correct dashboard per role, and all protected routes bounce unauthenticated users back to `/login`.

6. **Student Dashboard (Grades, Attendance, CGPA, Timetable, Events)** — A full sidebar portal split into Portal and Campus sections. Portal covers Overview (CGPA, attendance %, credits, backlogs), Announcements, Grades with grade-point table, Attendance with color-coded progress bars (green ≥85%, amber ≥75%, red <75%), a day-selector Timetable, and an interactive Event Calendar. Campus houses the Career Simulator, Roommate Matchmaker, University in a Day, and Map Markers.

7. **Faculty Dashboard (Course + Attendance + Grading)** — A dedicated portal with a violet accent theme, role-gated so only faculty can access it. Faculty can view assigned courses, mark per-student attendance with a present/absent toggle, review mid and end-semester grades with badge indicators, and monitor students flagged for low attendance.

8. **Admin Dashboard (User Management + Analytics + Controls)** — A red-accented control panel gated to the Admin role. Covers department management, a full user table with role badges and active/inactive status, placement analytics with a department-wise bar chart, notice publishing with urgency toggles, and settings panels for security, notifications, academic calendar, and fee configuration.

9. **Roommate Matchmaker (Compatibility Engine)** — A five-question lifestyle quiz covering sleep schedule, study style, social preference, cleanliness, and interests. Answers are scored against other profiles and results are displayed as animated compatibility percentage bars, helping students find well-matched roommates before the semester begins.

10. **University in a Day (Interactive Timeline Experience)** — An hour-by-hour interactive timeline showing what a typical day looks like for CS, Mechanical, and MBA students. The timeline reveals progressively and expands to a full-day view on demand, giving prospective and current students a realistic picture of campus life.

11. **Public Website (12 Fully Designed Pages)** — A complete public-facing site covering Homepage, About, Departments (12 dynamic slug pages), Academics, Admissions, Placements, Research, Campus Life, Students, Alumni, Contact, and Hostel. Every page has a video hero, animated statistics, and rich content. Department pages are statically generated at build time via `generateStaticParams`.

12. **Cloudinary Video Integration (Optimized Streaming)** — All video heroes and the 12 department-specific videos are hosted on Cloudinary and streamed directly to the browser. Videos use `preload="none"` with `autoPlay muted playsInline` so they never block the initial render or inflate the deployment bundle.

---

## Live Features

### Public Website (12 Pages)

**Homepage**
- Full-screen video hero with aerial drone footage
- Animated statistics counter (120,000+ students, 94% placement rate, 2,400+ publications) using spring physics
- Department grid linking to individual department pages
- Latest news section with image cards
- Upcoming events list with modal detail view on click
- Research highlights with animated counters
- Alumni network section with featured profiles
- Call-to-action banner for 2025 admissions
- Persistent AI chatbot (bottom-right, available on every page)

**About**
- University history timeline (1965 to present)
- Mission and vision statements
- Quick facts sidebar (founded, campus size, accreditations)
- University leadership grid (Vice Chancellor, Deans, Registrar)
- NAAC A++, NBA, NIRF, QS Asia accreditation listing

**Departments** (`/departments/[slug]`)
- 12 department pages: CSE, ECE, Mechanical, Civil, MBA, CSBS, AI/ML, M.Tech AI/ML, M.Tech VLSI, M.Tech Manufacturing, Ph.D CSE, Ph.D Mechanical
- Each page has a department-specific video hero (served via Cloudinary)
- Programs offered, research laboratories, faculty table with designations and specializations
- Head of Department card with direct email link
- Static generation via `generateStaticParams` for all slugs

**Academics**
- Full program catalog across all departments
- Undergraduate, postgraduate, and doctoral programs listed

**Admissions**
- Eligibility criteria for B.Tech (JEE Main), M.Tech (GATE), MBA (CAT/MAT), Ph.D
- Application process steps
- Fee structure table
- Important dates and deadlines

**Placements**
- Video hero with placement footage
- Key stats: 94% placement rate, 45 LPA highest, 12.4 LPA average, 500+ companies
- Year-wise average package bar chart (2020–2024) using Recharts
- Sector distribution pie chart
- Year-wise summary table
- Company table with live search, sector filter, minimum package filter, and sortable columns (name, package, students hired)

**Research**
- Research areas with publication counts and principal investigators
- Active research centers listing

**Campus Life**
- Video hero
- Interactive campus map (see Campus Map section below)
- Happening Now live feed with real-time upvoting
- World-class facilities grid (Sports Complex, Library, Food Court, Auditorium, Innovation Hub, Health Center)
- Annual events (Thorfinn Fest, TechSummit, Sports Week)
- Clubs and societies listing (50+ groups)
- Hostel accommodation card

**Students**
- Student life overview
- Clubs, societies, and student government information

**Alumni**
- Alumni network statistics (50,000+, 80+ countries, 200+ CEOs)
- Featured alumni profiles with roles and companies
- Alumni directory

**Contact**
- Contact form
- Campus address, phone, and email
- Department-specific contact directory

**Hostel**
- Video hero
- Four hostel blocks: Odin, Freya, Loki, Sif (boys/girls, capacity, room types)
- Amenities grid (WiFi, mess, security, gym, study rooms, laundry)
- Fee structure (triple/double/single sharing)
- Application link

---

### Authentication System

- Email/password authentication via Supabase Auth
- Three roles: Student, Faculty, Admin
- Role stored in `user_metadata` and `profiles` table
- Login and signup pages with form validation
- Protected routes redirect unauthenticated users to `/login`
- Role-based redirect after login: Student → `/dashboard`, Faculty → `/dashboard/faculty`, Admin → `/dashboard/admin`
- Three pre-seeded test accounts (see Setup section)

---

### Student Dashboard (`/dashboard`)

A full sidebar-based portal with two navigation groups: Portal and Campus.

**Portal section:**

- Overview — CGPA (8.7), attendance percentage, credits earned, backlog count; recent announcements preview; today's timetable; attendance warning if any subject is below 75%
- Announcements — full table with category, date, and urgency badge
- Grades — semester-wise grade table with subject code, credits, grade, and grade points; CGPA display
- Attendance — per-subject attendance with progress bars, color-coded by threshold (green ≥85%, amber ≥75%, red <75%)
- Timetable — day-selector with lecture, lab, and tutorial type badges
- Event Calendar — interactive monthly calendar with color-coded event dots; upcoming events sidebar; event type legend

**Campus section:**

- Career Path Simulator — multi-step flow (interest → department → labs → internship → placement package → alumni career path); animated step-by-step progression; full result summary card
- Roommate Matchmaker — 5-question lifestyle quiz (sleep schedule, study style, social preference, cleanliness, interests); compatibility scoring; animated match results with percentage bars
- University in a Day — interactive day-in-the-life timeline for CS, Mechanical, and MBA students; progressive reveal with "Show Full Day" expansion
- Map Markers — admin-only widget to manage campus map event markers (see Campus Map section)

---

### Faculty Dashboard (`/dashboard/faculty`)

Separate portal with violet accent theme, role-gated (redirects non-faculty to `/dashboard`).

- Overview — course count, total students, average attendance, pending grades
- My Courses — course cards (code, name, department, semester, enrolled count) with direct link to mark attendance
- Attendance — course selector; per-student present/absent toggle with overall attendance display; save confirmation
- Grades — course selector; mid-semester and end-semester marks table with grade badges
- Students — per-course student list with attendance progress bars and low-attendance alerts
- Notices — announcements table

---

### Admin Dashboard (`/dashboard/admin`)

Separate portal with red accent theme, role-gated (redirects non-admins to `/dashboard`).

- Overview — total students (4,750), faculty count (198), average placement rate (90%), research funds (₹45 Cr); recent activity feed; urgent notices; department snapshot
- Departments — full department cards with HoD, student count, faculty count, placement rate
- User Management — user table with name, email, role badge, department, and active/inactive status
- Placements — overall stats (90% rate, ₹45 LPA highest, 120+ companies); department-wise placement bar chart
- Notices — full notice table; post new notice form with title, category, and urgency toggle
- Settings — Security & Access, Notification Settings, Academic Calendar, Fee Configuration panels

---

### Campus Map (Interactive Image Map)

Located in the Happening Now section of `/campus-life`.

- Renders `public/images/map.png` as the base map
- Event markers positioned using percentage-based coordinates (`x_pct`, `y_pct`) so they scale with any screen size
- Each marker has a colored glow halo, solid dot with white border, and inner white pip for visibility
- Live markers (type: `live`) pulse continuously
- Zoom: `+` / `-` buttons and mouse scroll wheel, 1x to 4x in 0.5x steps
- Pan: drag to pan when zoomed in; pan is clamped to prevent dragging the map out of frame
- Click any marker to open the side panel with full event detail (title, type badge, tag, time, date, venue, expected attendees, description, live indicator)
- Side panel empty state lists all markers grouped by type with a stats footer (live count, upcoming count, total expected attendees)
- Markers are fetched from the Supabase `map_markers` table; falls back to 5 hardcoded markers if the table is empty or unreachable

**Admin map marker management** (dashboard → Map Markers, Admin role only):
- Map preview with all existing markers overlaid
- "Pick position on map" mode — click anywhere on the map image to set coordinates
- Form: title, location, time, date, description, tag, type (live/upcoming/recurring), color picker, attendees
- Add marker → saved to Supabase, appears immediately on the campus map
- Delete any marker with a single click
- Active markers list with type badge and delete button

---

### Happening Now Live Feed

Below the campus map on `/campus-life`, also available as a widget in the student dashboard.

- Fetches active events from Supabase `events` table (filtered by `expires_at > now()`)
- Supabase Realtime subscription — new events and upvotes appear without page refresh
- Falls back to three demo events if Supabase is unavailable
- Post an update: title, location, tag (Academic, Social, Sports, Food, General), expires in 4 hours
- Upvote any event (one vote per session, tracked client-side)
- Events sorted by vote count descending

---

### AI Chatbot

Available on every public page via a fixed button (bottom-right).

- Powered by Groq API (Llama 3.1 8B Instant model)
- Server-side API route at `/api/chat` — API key never exposed to the client
- System prompt includes all key university facts: founding year, departments, programs, placement stats, top recruiters, admissions deadline, contact details
- Maintains last 6 messages of conversation history for context
- Suggested quick questions on first open (Admission process, Placement stats, Available programs, Contact info)
- Graceful fallback messages for network errors and missing API key
- Responses capped at 200 tokens for speed

---

## Tech Stack

**Frontend**
- Next.js 14 (App Router, TypeScript)
- React 18
- Tailwind CSS 3
- Framer Motion 11 (page animations, spring counters, AnimatePresence transitions)
- Lucide React (icons)
- Recharts (placement bar and pie charts)
- date-fns (calendar formatting)
- Radix UI (Avatar, Dialog, Dropdown, Progress, Select, Tabs, Tooltip)
- Lenis (smooth scroll)

**Backend / Database**
- Supabase (PostgreSQL, Row Level Security, Auth, Realtime)
- Next.js API Routes (Groq chat endpoint)

**AI**
- Groq API — Llama 3.1 8B Instant (free tier, extremely low latency)
- groq-sdk

**Media**
- Cloudinary (video hosting for all page heroes and department videos)
- Next.js Image optimization (remote patterns configured for Supabase and Cloudinary)

**Deployment**
- Vercel (Next.js native deployment)
- Supabase (managed PostgreSQL + Auth)

---

## Database Schema

Six tables, all with Row Level Security enabled.

**profiles**
- `id` (uuid, FK → auth.users)
- `name`, `email`, `role` (Student / Faculty / Admin), `department`, `interests[]`
- RLS: users can read and update only their own profile

**events** (Happening Now feed)
- `id`, `title`, `location`, `tag`, `votes`, `user_id`, `expires_at`, `created_at`
- RLS: anyone can read active events; authenticated users can insert; anyone can update vote count
- Realtime enabled

**map_markers** (Campus Map)
- `id`, `title`, `description`, `location`, `time`, `date`, `tag`, `type` (live/upcoming/recurring), `attendees`, `x_pct`, `y_pct`, `color`
- RLS: anyone can read; only Admin role can insert, update, delete

**matches** (Roommate Matchmaker)
- `id`, `user_id`, `match_id`, `score`, `preferences` (jsonb)
- RLS: users can read and insert only their own matches

**departments**
- `id`, `slug`, `name`, `short_name`, `hod`, `hod_email`, `description`, `students_count`, `faculty_count`

**placements**
- `id`, `company_name`, `sector`, `package_lpa`, `students_hired`, `year`
- Seeded with 10 companies (Google through TCS)

**alumni**
- `id`, `name`, `batch_year`, `department`, `current_role`, `company`, `location`, `linkedin_url`

---

## System Architecture

```
Browser
  |
  |-- Public pages (SSR/SSG via Next.js App Router)
  |     |-- Static department pages (generateStaticParams)
  |     |-- Dynamic pages (campus-life, placements, homepage)
  |     `-- Cloudinary videos (streamed, not bundled)
  |
  |-- Auth layer (Supabase Auth)
  |     |-- /login, /signup
  |     `-- Role-based redirect to /dashboard, /dashboard/faculty, /dashboard/admin
  |
  |-- Dashboards (client components, auth-gated)
  |     |-- Student: grades, attendance, timetable, calendar, career simulator, roommate match
  |     |-- Faculty: courses, attendance marking, grade view, student overview
  |     `-- Admin: departments, users, placements, notices, map markers
  |
  |-- Campus Map (CampusMapImage component)
  |     |-- map.png rendered via Next.js Image
  |     |-- Markers fetched from Supabase map_markers
  |     `-- Zoom/pan state managed in React (no external map library)
  |
  |-- Realtime (Supabase channel)
  |     `-- events table → HappeningNow component updates live
  |
  `-- AI Chatbot
        |-- Client: AIChatbot.tsx (floating button, chat window)
        `-- Server: /api/chat route → Groq API (Llama 3.1 8B)
```

---

## Installation & Setup

### Prerequisites
- Node.js 18+
- A Supabase project (free tier works)
- A Groq API key (free at console.groq.com)

### 1. Clone and install

```bash
git clone https://github.com/Paras-ydv/Thorfinn_University.git
cd Thorfinn_University
npm install
```

### 2. Environment variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

Note: `GROQ_API_KEY` is server-only (no `NEXT_PUBLIC_` prefix). It is used exclusively in the `/api/chat` route.

### 3. Database setup

1. Go to your Supabase project → SQL Editor
2. Paste the entire contents of `supabase-schema.sql` and run it
3. This creates all tables, RLS policies, realtime publication, and seeds placement data and demo events
4. Three test accounts are created automatically:

| Role    | Email                        | Password               |
|---------|------------------------------|------------------------|
| Admin   | admin@thorfinn.test          | Thorfinn@Admin2025     |
| Faculty | faculty@thorfinn.test        | Thorfinn@Faculty2025   |
| Student | student@thorfinn.test        | Thorfinn@Student2025   |

### 4. Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

Add the three environment variables in the Vercel dashboard under Settings → Environment Variables. The `vercel.json` file already sets the framework to `nextjs`.

### Supabase

No additional configuration needed beyond running `supabase-schema.sql`. The anon key is safe to expose publicly — RLS policies enforce all access control at the database level.

### Cloudinary

Videos are already hosted on Cloudinary and referenced by URL in the source code. No Cloudinary account is needed to run the project. To replace videos, upload to your own Cloudinary account and update the `src` URLs in the relevant page files.

---

## Performance Considerations

- Department pages use `generateStaticParams` for static generation at build time — zero server compute on page load
- Videos use `preload="none"` and `autoPlay muted playsInline` — no blocking on initial render
- The AI chatbot component is loaded client-side only and does not affect server render
- Next.js Image component handles WebP conversion and lazy loading for all images
- Recharts is only imported on the placements page — not bundled globally
- Framer Motion animations use `whileInView` with `once: true` — no re-animation on scroll back
- Supabase client is a singleton (`lib/supabaseClient.ts`) — one connection per session
- The campus map uses CSS `transform: scale()` for zoom — GPU-accelerated, no layout recalculation

---

## Project Structure

```
/app
  /page.tsx                    Homepage
  /about/page.tsx              About page
  /academics/page.tsx          Academics and programs
  /admissions/page.tsx         Admissions information
  /alumni/page.tsx             Alumni network
  /campus-life
    /components
      /CampusMapImage.tsx      Interactive image map with markers
    /page.tsx                  Campus life page
  /contact/page.tsx            Contact page
  /departments/[slug]/page.tsx Dynamic department pages (12 slugs)
  /hostel/page.tsx             Hostel information
  /login/page.tsx              Authentication login
  /signup/page.tsx             Authentication signup
  /placements/page.tsx         Placement analytics
  /research/page.tsx           Research overview
  /dashboard
    /page.tsx                  Student dashboard
    /admin/page.tsx            Admin dashboard
    /faculty/page.tsx          Faculty dashboard
    /layout.tsx                Dashboard layout (no Navbar/Footer)
    /components
      /CareerSimulator.tsx     Career path simulator widget
      /HappeningNow.tsx        Realtime campus activity feed
      /MapMarkersAdmin.tsx     Admin map marker management
      /RoommateMatch.tsx       Roommate matchmaking quiz
      /SmartCalendar.tsx       Event calendar
      /UniversityInADay.tsx    Day-in-the-life timeline
  /api/chat/route.ts           Groq AI chatbot API route

/components/ui
  /AIChatbot.tsx               Floating AI assistant
  /DeptVideo.tsx               Department video component
  /Footer.tsx                  Site footer
  /LayoutShell.tsx             Navbar + Footer wrapper
  /Navbar.tsx                  Responsive navigation
  /SectionHeader.tsx           Reusable section header
  /StatCard.tsx                Statistic display card

/lib
  /data.ts                     Static data (departments, placements, alumni)
  /deptVideos.ts               Department video URL mapping
  /supabaseClient.ts           Supabase singleton client

/public
  /images/map.png              Campus map image
  /videos/                     Local video files (hero, campus life)

/utils/index.ts                Utility functions
/supabase-schema.sql           Full database schema with RLS and seed data
```

---

## Future Scope

- Push notifications for new events via Supabase Realtime + Web Push API
- AI-powered course recommendation based on grades and career simulator output
- Fee payment integration (Razorpay or Stripe)
- Mobile application using React Native with shared Supabase backend
- Timetable conflict detection and automatic scheduling suggestions
- Research publication search with full-text indexing
- Alumni mentorship matching using the same compatibility scoring as the roommate system
- Multi-language support (Hindi, regional languages) for broader accessibility

---

## Screenshots

_Add screenshots here_

---

## Test Accounts

| Role    | Email                  | Password             |
|---------|------------------------|----------------------|
| Admin   | admin@thorfinn.test    | Thorfinn@Admin2025   |
| Faculty | faculty@thorfinn.test  | Thorfinn@Faculty2025 |
| Student | student@thorfinn.test  | Thorfinn@Student2025 |

Run `supabase-schema.sql` in your Supabase SQL Editor to create these accounts automatically.
