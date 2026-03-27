# Thorfinn University 🎓

A production-ready, modern university website built with Next.js 14, Supabase, Framer Motion, and Tailwind CSS.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Charts**: Recharts
- **AI Chatbot**: Groq API (Llama 3 — free tier)
- **Deployment**: Vercel + Supabase

## Features
- 12 public pages (Home, About, Departments, Academics, Admissions, Placements, Research, Campus Life, Students, Alumni, Contact, Hostel)
- Auth system (Student / Faculty / Admin roles via Supabase)
- Dashboard with 5 widgets:
  - Happening Now (Realtime event feed with upvotes)
  - Roommate Matchmaker (questionnaire + compatibility scoring)
  - University in a Day (interactive timeline)
  - Career Path Simulator (visual flow)
  - Smart Event Calendar
- AI Chatbot (Groq / Llama 3)
- Placement analytics with sorting/filtering
- Fully responsive, glassmorphism UI

## Setup

### 1. Clone & Install
```bash
git clone <repo>
cd Thorfinn_University
npm install
```

### 2. Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key
```

### 3. Supabase Setup
1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run `supabase-schema.sql`
3. Copy your Project URL and anon key to `.env.local`

### 4. Groq API (Free AI Chatbot)
1. Sign up at [console.groq.com](https://console.groq.com) — **completely free**
2. Create an API key
3. Add to `.env.local` as `NEXT_PUBLIC_GROQ_API_KEY`
> Groq is the best free option: uses Llama 3 (8B), extremely fast, generous free tier

### 5. Hero Video
Place your hero video at:
```
/public/videos/hero.mp4
```
Requirements: max 720p, compressed to <3MB (use HandBrake or FFmpeg)
Also add a poster image at `/public/images/hero-poster.jpg`

### 6. Run
```bash
npm run dev
```

## Deployment (Vercel)
```bash
npm install -g vercel
vercel
```
Add environment variables in Vercel dashboard under Settings → Environment Variables.

## Folder Structure
```
/app
  /page.tsx              — Homepage
  /about                 — About page
  /departments           — Departments listing + [slug] detail
  /academics             — Academics page
  /admissions            — Admissions page
  /placements            — Placements with analytics
  /research              — Research page
  /campus-life           — Campus life page
  /students              — Students page
  /alumni                — Alumni network
  /contact               — Contact page
  /hostel                — Hostel page
  /login                 — Auth login
  /signup                — Auth signup
  /dashboard             — Protected dashboard
    /components          — Dashboard widgets
  /api/chat              — Groq AI chatbot API route
/components
  /ui                    — Navbar, Footer, StatCard, SectionHeader, AIChatbot
/lib
  /supabaseClient.ts     — Supabase client
  /data.ts               — Static data (departments, placements, etc.)
/utils
  /index.ts              — Utility functions
```

## Database Schema
See `supabase-schema.sql` for full PostgreSQL schema with RLS policies.

Tables: `profiles`, `events`, `matches`, `departments`, `placements`, `alumni`
