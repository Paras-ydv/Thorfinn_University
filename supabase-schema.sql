-- ============================================================
-- Thorfinn University — Full Setup SQL
-- Paste this ENTIRE file into Supabase SQL Editor and Run All
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PROFILES ──────────────────────────────────────────────
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text unique,
  role text check (role in ('Student', 'Faculty', 'Admin')) default 'Student',
  department text,
  interests text[],
  created_at timestamptz default now()
);

alter table profiles enable row level security;

drop policy if exists "Users can view own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Users can insert own profile" on profiles;
drop policy if exists "Anyone can view profiles" on profiles;

create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- ── EVENTS (Happening Now) ─────────────────────────────────
create table if not exists events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  location text,
  tag text default 'Social',
  votes integer default 0,
  user_id uuid references auth.users on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

alter table events enable row level security;

drop policy if exists "Anyone can view active events" on events;
drop policy if exists "Authenticated users can post events" on events;
drop policy if exists "Users can update vote count" on events;

create policy "Anyone can view active events" on events
  for select using (expires_at > now());

create policy "Authenticated users can post events" on events
  for insert with check (auth.uid() = user_id);

create policy "Users can update vote count" on events
  for update using (true);

-- ── ROOMMATE MATCHES ───────────────────────────────────────
create table if not exists matches (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  match_id uuid references auth.users on delete cascade,
  score integer,
  preferences jsonb,
  created_at timestamptz default now()
);

alter table matches enable row level security;

drop policy if exists "Users can view own matches" on matches;
drop policy if exists "Users can insert own matches" on matches;

create policy "Users can view own matches" on matches
  for select using (auth.uid() = user_id);

create policy "Users can insert own matches" on matches
  for insert with check (auth.uid() = user_id);

-- ── DEPARTMENTS ────────────────────────────────────────────
create table if not exists departments (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  short_name text,
  hod text,
  hod_email text,
  description text,
  students_count integer default 0,
  faculty_count integer default 0,
  created_at timestamptz default now()
);

-- ── PLACEMENTS ─────────────────────────────────────────────
create table if not exists placements (
  id uuid default uuid_generate_v4() primary key,
  company_name text not null,
  sector text,
  package_lpa numeric,
  students_hired integer default 0,
  year integer default extract(year from now()),
  created_at timestamptz default now()
);

-- ── ALUMNI ─────────────────────────────────────────────────
create table if not exists alumni (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  batch_year integer,
  department text,
  current_role text,
  company text,
  location text,
  linkedin_url text,
  created_at timestamptz default now()
);

-- ── REALTIME ───────────────────────────────────────────────
alter publication supabase_realtime add table events;

-- ── SEED: PLACEMENTS ───────────────────────────────────────
insert into placements (company_name, sector, package_lpa, students_hired, year) values
  ('Google', 'Tech', 45, 12, 2024),
  ('Microsoft', 'Tech', 42, 18, 2024),
  ('Amazon', 'Tech', 38, 25, 2024),
  ('Goldman Sachs', 'Finance', 35, 8, 2024),
  ('McKinsey', 'Consulting', 32, 5, 2024),
  ('Infosys', 'IT Services', 8, 120, 2024),
  ('TCS', 'IT Services', 7, 150, 2024),
  ('Wipro', 'IT Services', 7.5, 90, 2024),
  ('Deloitte', 'Consulting', 12, 35, 2024),
  ('JP Morgan', 'Finance', 28, 10, 2024)
on conflict do nothing;

-- ── SEED: DEMO EVENTS ──────────────────────────────────────
insert into events (title, location, tag, votes, user_id, expires_at) values
  ('Free Pizza at CS Lab!', 'CS Lab 204', 'Food', 42,
    (select id from auth.users limit 1),
    now() + interval '6 hours'),
  ('Hackathon Kickoff Meeting', 'Auditorium A', 'Academic', 28,
    (select id from auth.users limit 1),
    now() + interval '8 hours'),
  ('Cricket Match — CSE vs ECE', 'Sports Ground', 'Sports', 35,
    (select id from auth.users limit 1),
    now() + interval '5 hours')
on conflict do nothing;

-- ============================================================
-- TEST ACCOUNTS
-- Creates 3 users directly in auth.users (bypasses email confirm)
-- Passwords are hashed with bcrypt — these are the plain passwords:
--   Admin:   Thorfinn@Admin2026
--   Faculty: Thorfinn@Faculty2026
--   Student: Thorfinn@Student2026
-- ============================================================

-- Admin account
do $$
declare
  admin_id uuid := uuid_generate_v4();
  faculty_id uuid := uuid_generate_v4();
  student_id uuid := uuid_generate_v4();
begin

  -- Insert Admin
  insert into auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    raw_user_meta_data, raw_app_meta_data, aud, role, created_at, updated_at,
    confirmation_token, recovery_token, email_change_token_new, email_change
  ) values (
    admin_id,
    '00000000-0000-0000-0000-000000000000',
    'admin@thorfinn.test',
    crypt('Thorfinn@Admin2026', gen_salt('bf')),
    now(),
    '{"name":"Arjun Mehta","role":"Admin"}'::jsonb,
    '{"provider":"email","providers":["email"]}'::jsonb,
    'authenticated', 'authenticated',
    now(), now(),
    '', '', '', ''
  ) on conflict (email) do nothing;

  insert into profiles (id, name, email, role)
  values (admin_id, 'Arjun Mehta', 'admin@thorfinn.test', 'Admin')
  on conflict (id) do nothing;

  -- Insert Faculty
  insert into auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    raw_user_meta_data, raw_app_meta_data, aud, role, created_at, updated_at,
    confirmation_token, recovery_token, email_change_token_new, email_change
  ) values (
    faculty_id,
    '00000000-0000-0000-0000-000000000000',
    'faculty@thorfinn.test',
    crypt('Thorfinn@Faculty2026', gen_salt('bf')),
    now(),
    '{"name":"Dr. Priya Sharma","role":"Faculty"}'::jsonb,
    '{"provider":"email","providers":["email"]}'::jsonb,
    'authenticated', 'authenticated',
    now(), now(),
    '', '', '', ''
  ) on conflict (email) do nothing;

  insert into profiles (id, name, email, role)
  values (faculty_id, 'Dr. Priya Sharma', 'faculty@thorfinn.test', 'Faculty')
  on conflict (id) do nothing;

  -- Insert Student
  insert into auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    raw_user_meta_data, raw_app_meta_data, aud, role, created_at, updated_at,
    confirmation_token, recovery_token, email_change_token_new, email_change
  ) values (
    student_id,
    '00000000-0000-0000-0000-000000000000',
    'student@thorfinn.test',
    crypt('Thorfinn@Student2026', gen_salt('bf')),
    now(),
    '{"name":"Rahul Verma","role":"Student"}'::jsonb,
    '{"provider":"email","providers":["email"]}'::jsonb,
    'authenticated', 'authenticated',
    now(), now(),
    '', '', '', ''
  ) on conflict (email) do nothing;

  insert into profiles (id, name, email, role)
  values (student_id, 'Rahul Verma', 'student@thorfinn.test', 'Student')
  on conflict (id) do nothing;

end $$;
