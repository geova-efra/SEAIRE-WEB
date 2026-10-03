-- SEAIRE: autorización del administrador
-- Ejecutar UNA VEZ en Supabase > SQL Editor.
-- NO contiene service_role ni cambia la clave pública.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.admin_users enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname='public'
      and tablename='admin_users'
      and policyname='admin_users_select_own'
  ) then
    create policy admin_users_select_own
      on public.admin_users
      for select
      to authenticated
      using (auth.uid() = user_id);
  end if;
end $$;

-- AUTORIZAR TU CUENTA:
insert into public.admin_users (user_id)
select id
from auth.users
where email = 'seaire.gere@gmail.com'
on conflict (user_id) do nothing;

-- VERIFICACIÓN:
select au.user_id, u.email
from public.admin_users au
join auth.users u on u.id = au.user_id
where u.email = 'seaire.gere@gmail.com';
