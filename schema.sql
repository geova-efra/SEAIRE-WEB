-- =========================================================
-- SEAIRE: proyectos públicos + administración + fotografías/videos
-- Ejecutar completo en Supabase > SQL Editor
-- =========================================================

create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  service text not null,
  location text,
  year integer,
  description text,
  cover_url text,
  video_url text,
  images jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Public can view published projects" on public.projects;
create policy "Public can view published projects"
on public.projects for select
to anon, authenticated
using (published = true);

drop policy if exists "Authenticated users manage projects" on public.projects;
create policy "Authenticated users manage projects"
on public.projects for all
to authenticated
using (true)
with check (true);

-- Bucket público para que las fotos/videos publicados puedan verse desde cualquier dispositivo.
insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do update set public = true;

drop policy if exists "SEAIRE admins upload project media" on storage.objects;
create policy "SEAIRE admins upload project media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'project-media');

drop policy if exists "SEAIRE admins update project media" on storage.objects;
create policy "SEAIRE admins update project media"
on storage.objects for update
to authenticated
using (bucket_id = 'project-media')
with check (bucket_id = 'project-media');

drop policy if exists "SEAIRE admins delete project media" on storage.objects;
create policy "SEAIRE admins delete project media"
on storage.objects for delete
to authenticated
using (bucket_id = 'project-media');

-- Las descargas públicas usan la URL pública del bucket.
-- El administrador se crea en:
-- Supabase > Authentication > Users > Add user
