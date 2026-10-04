-- Políticas necesarias para que la web pública lea contenido y el usuario administrador lo edite.
-- EJECUTAR EN SUPABASE > SQL EDITOR.

-- site_settings: lectura pública.
drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

-- site_settings: solo usuarios registrados en admin_users pueden modificar.
drop policy if exists "Admins can insert site settings" on public.site_settings;
create policy "Admins can insert site settings"
on public.site_settings
for insert
to authenticated
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

drop policy if exists "Admins can update site settings" on public.site_settings;
create policy "Admins can update site settings"
on public.site_settings
for update
to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- services: lectura pública y edición exclusiva de administradores.
drop policy if exists "Public can read services" on public.services;
create policy "Public can read services"
on public.services
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can insert services" on public.services;
create policy "Admins can insert services"
on public.services
for insert
to authenticated
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

drop policy if exists "Admins can update services" on public.services;
create policy "Admins can update services"
on public.services
for update
to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

drop policy if exists "Admins can delete services" on public.services;
create policy "Admins can delete services"
on public.services
for delete
to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));
