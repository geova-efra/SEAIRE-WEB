-- Ejecuta en Supabase SQL Editor.
-- 1) Verifica exactamente las columnas actuales.
select table_name, column_name, data_type
from information_schema.columns
where table_schema='public'
  and table_name in ('services','projects','project_media','site_settings','admin_users')
order by table_name, ordinal_position;

-- 2) La aplicación SEAIRE corregida utiliza esta estructura mínima:
-- services: id, name, icon, description, enabled, sort_order
-- projects: id, service_id, title, location, project_date, description, video_url, published, created_at, updated_at
-- project_media: id, project_id, media_type, storage_path, public_url, sort_order
-- site_settings: section, data, updated_at
--
-- NO ejecutes ALTER TABLE a ciegas si la consulta anterior muestra nombres distintos.
-- En ese caso, envíame el resultado y ajustamos el SQL a tu esquema real sin borrar datos.


-- NOTA DE ESTA VERSION
-- La aplicación corregida NO escribe en public.services para los servicios del catálogo.
-- Los servicios editables se guardan en public.site_settings, section='servicios',
-- dentro de data.items. Esto evita el error: Could not find the 'name'/'enabled'
-- column of 'services' in the schema cache y permite conservar el resto del esquema.
-- No es necesario modificar/eliminar la tabla public.services para usar el catálogo.
