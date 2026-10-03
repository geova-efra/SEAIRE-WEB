-- Después de crear el usuario administrador en Supabase Auth,
-- ejecuta esta consulta cambiando el correo por el que utilizas:
insert into public.admin_users (user_id)
select id
from auth.users
where email = 'seaire.gere@gmail.com'
on conflict (user_id) do nothing;
