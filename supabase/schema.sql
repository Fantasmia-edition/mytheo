-- ═══════════════════════════════════════════════════════════════
-- L'Odyssée des Scribes — Schéma Supabase
-- Coller dans SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════

-- ── 1. Profils Scribes ────────────────────────────────────────
create table if not exists scribe_profiles (
  id                     uuid primary key default gen_random_uuid(),
  parent_email           text not null unique,
  parent_name            text not null,
  child_name             text not null,
  child_age              int  not null,
  avatar_name            text,
  power                  text,
  companion              text,
  destiny                text,
  plan                   text not null check (plan in ('patient','intrepide')),
  address_line1          text,
  address_city           text,
  address_zip            text,
  address_country        text default 'France',
  stripe_customer_id     text,
  stripe_subscription_id text,
  status                 text default 'active' check (status in ('active','paused','cancelled')),
  created_at             timestamptz default now()
);

-- ── 2. Chapitres ──────────────────────────────────────────────
create table if not exists chapters (
  id              uuid primary key default gen_random_uuid(),
  scribe_id       uuid references scribe_profiles(id) on delete cascade,
  chapter_number  int  not null,
  title           text,
  status          text default 'pending' check (status in ('pending','in_progress','delivered')),
  delivery_date   date,
  pdf_url         text,
  created_at      timestamptz default now(),
  unique (scribe_id, chapter_number)
);

-- ── 3. Uploads de missions ─────────────────────────────────────
create table if not exists mission_uploads (
  id              uuid primary key default gen_random_uuid(),
  scribe_id       uuid references scribe_profiles(id) on delete cascade,
  chapter_number  int  not null,
  file_urls       text[] not null default '{}',
  note            text,
  status          text default 'received' check (status in ('received','processing','done')),
  created_at      timestamptz default now()
);

-- ── 4. Messages Atelier ↔ Parent ──────────────────────────────
create table if not exists messages (
  id          uuid primary key default gen_random_uuid(),
  scribe_id   uuid references scribe_profiles(id) on delete cascade,
  from_role   text not null check (from_role in ('atelier','parent')),
  text        text not null,
  read        boolean default false,
  created_at  timestamptz default now()
);

-- ── 5. Bucket Storage pour les fichiers uploadés ──────────────
insert into storage.buckets (id, name, public)
values ('mission-uploads', 'mission-uploads', false)
on conflict do nothing;

-- ── 6. Policies RLS (sécurité) ────────────────────────────────
alter table scribe_profiles  enable row level security;
alter table chapters         enable row level security;
alter table mission_uploads  enable row level security;
alter table messages         enable row level security;

-- Pour l'instant, accès complet via service_role (API routes Next.js)
-- On ajoutera l'auth parent plus tard
create policy "service_role_all" on scribe_profiles  for all using (true);
create policy "service_role_all" on chapters         for all using (true);
create policy "service_role_all" on mission_uploads  for all using (true);
create policy "service_role_all" on messages         for all using (true);
