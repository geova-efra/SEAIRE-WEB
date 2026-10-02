# SEAIRE — Web + Administración de proyectos

Esta versión conserva la estructura de la página SEAIRE y agrega un sistema centralizado de proyectos.

## Qué puede hacer el administrador
- Iniciar sesión.
- Crear proyectos eléctricos.
- Seleccionar el servicio.
- Registrar ubicación, año y descripción.
- Subir varias fotografías directamente desde el administrador.
- Subir un video del proyecto.
- Editar proyectos.
- Eliminar proyectos.
- Publicar o dejar proyectos como borrador.

## Qué ve el público
Los proyectos marcados como PUBLICADO aparecen en:
**index.html > Proyectos realizados**

Los visitantes pueden:
- filtrar por servicio;
- abrir un proyecto;
- ver todas sus fotografías;
- abrir el video cuando exista.

## Importante: visualización desde cualquier lugar
La información NO se guarda en el navegador. Se guarda en Supabase.
Por eso, una vez configurado, los proyectos publicados pueden ser consultados desde cualquier teléfono, computadora o ubicación con Internet.

## Configuración única
1. Crea un proyecto en Supabase.
2. Abre SQL Editor y ejecuta `schema.sql`.
3. En Authentication > Users crea el correo y contraseña del administrador.
4. Copia Project URL y Publishable/Anon Key en `supabase-config.js`.
5. Sube la carpeta a Vercel.
6. Abre `/admin.html`.
7. Inicia sesión y publica tu primer proyecto.

NO uses una service_role key en `supabase-config.js`.

## Archivos
- index.html
- admin.html
- supabase-config.js
- schema.sql
- logo-seaire.jpeg
