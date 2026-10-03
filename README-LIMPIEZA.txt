PAQUETE SEAIRE - ARQUITECTURA UNIFICADA

Archivos que deben quedar publicados:
1. index.html
2. admin.html
3. seaire-config.js
4. seaire-cloud.js
5. logo-seaire.jpeg (tu archivo de imagen actual)

ELIMINAR DEL REPOSITORIO:
- seaire-projects.js
- seaire-config(1).js
- cualquier index(3).html, index(4).html, index(5).html duplicado
- cualquier admin(1).html, admin(2).html duplicado
- cualquier otro archivo que implemente seaire_site_config_v1 o seaire_projects_v1

IMPORTANTE:
- No cambiar la URL de Supabase ni la clave publishable de seaire-config.js.
- No cambiar la ruta de admin.html ni los enlaces internos existentes.
- El contenido se guarda/lee únicamente desde Supabase.
- Las fotografías de proyectos usan el bucket seaire-images y project_media.
- Los videos externos se guardan en projects.video_url; videos almacenados pueden seguir usando project_media/bucket seaire-videos si tu esquema ya los soporta.
