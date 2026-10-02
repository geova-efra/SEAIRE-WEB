
-- =========================================================
-- SEAIRE - BASE DE DATOS PARA PANEL ADMINISTRATIVO
-- Supabase / PostgreSQL
-- =========================================================

create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  company_name text not null default 'SEAIRE',
  tagline text,
  about_text text,
  mission text,
  vision text,
  whatsapp text,
  email text,
  address text,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  image_url text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  image_url text,
  location text,
  year integer,
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  phone text,
  email text,
  service text,
  message text,
  status text not null default 'nueva'
    check (status in ('nueva','contactada','cotizada','cerrada')),
  created_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin'
    check (role in ('admin','editor')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.site_settings
  (company_name, tagline, about_text, mission, vision, whatsapp, email, address)
select
  'SEAIRE',
  'Soluciones Eléctricas, Automatizaciones Industriales, Residenciales y Especiales',
  'Somos una empresa comprometida con el desarrollo de soluciones eléctricas, automatizaciones industriales, residenciales y especiales. Trabajamos con enfoque técnico y humano para cumplir estándares de calidad, seguridad, innovación y responsabilidad, aportando al bienestar de nuestros clientes y al desarrollo sostenible de la región.',
  'Brindar soluciones eléctricas y de automatización con calidad, seguridad e innovación, generando confianza y satisfacción en nuestros clientes.',
  'Ser una empresa referente en soluciones eléctricas y automatización en la región, reconocida por su profesionalismo y aporte al desarrollo.',
  '0989020845',
  'seaire.gere@gmail.com',
  'Joya de los Sachas, Orellana - Ecuador'
where not exists (select 1 from public.site_settings);

alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.inquiries enable row level security;
alter table public.admin_profiles enable row level security;

-- Lectura pública para contenido de la web
create policy "public read site settings"
on public.site_settings for select
to anon, authenticated using (true);

create policy "public read active services"
on public.services for select
to anon, authenticated using (active = true);

create policy "public read active projects"
on public.projects for select
to anon, authenticated using (active = true);

-- Los formularios públicos pueden crear solicitudes
create policy "public create inquiries"
on public.inquiries for insert
to anon, authenticated with check (true);

-- Admin/editor autenticado puede gestionar contenido
create policy "admins manage site settings"
on public.site_settings for all
to authenticated
using (exists (
  select 1 from public.admin_profiles p
  where p.id = auth.uid() and p.active = true
))
with check (exists (
  select 1 from public.admin_profiles p
  where p.id = auth.uid() and p.active = true
));

create policy "admins manage services"
on public.services for all
to authenticated
using (exists (
  select 1 from public.admin_profiles p
  where p.id = auth.uid() and p.active = true
))
with check (exists (
  select 1 from public.admin_profiles p
  where p.id = auth.uid() and p.active = true
));

create policy "admins manage projects"
on public.projects for all
to authenticated
using (exists (
  select 1 from public.admin_profiles p
  where p.id = auth.uid() and p.active = true
))
with check (exists (
  select 1 from public.admin_profiles p
  where p.id = auth.uid() and p.active = true
));

create policy "admins read inquiries"
on public.inquiries for select
to authenticated
using (exists (
  select 1 from public.admin_profiles p
  where p.id = auth.uid() and p.active = true
));

create policy "admins update inquiries"
on public.inquiries for update
to authenticated
using (exists (
  select 1 from public.admin_profiles p
  where p.id = auth.uid() and p.active = true
))
with check (exists (
  select 1 from public.admin_profiles p
  where p.id = auth.uid() and p.active = true
));

create policy "admins manage profiles"
on public.admin_profiles for all
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- Función para mantener updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_site_settings_updated on public.site_settings;
create trigger trg_site_settings_updated before update on public.site_settings
for each row execute function public.set_updated_at();

drop trigger if exists trg_services_updated on public.services;
create trigger trg_services_updated before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists trg_projects_updated on public.projects;
create trigger trg_projects_updated before update on public.projects
for each row execute function public.set_updated_at();
