# SEAIRE - Etapa 2: Panel Administrativo

## Arquitectura
- Frontend: Vercel
- Código: GitHub
- Base de datos + autenticación: Supabase
- Panel: `/admin.html`

## Configuración inicial
1. Crear un proyecto en Supabase.
2. Abrir SQL Editor y ejecutar `supabase-schema.sql`.
3. Crear un usuario administrador en Authentication > Users.
4. Copiar el UUID del usuario.
5. Insertar su perfil:
   INSERT INTO public.admin_profiles (id, full_name, role)
   VALUES ('UUID_DEL_USUARIO', 'Administrador SEAIRE', 'admin');
6. Copiar Project URL y anon key en `config.js`.
7. Subir todo el proyecto a GitHub.
8. Conectar el repositorio con Vercel.

## Acceso
https://TU-DOMINIO/admin.html

## Próximas mejoras
- Carga de fotografías a Storage.
- Editor visual de textos.
- Gestión de usuarios.
- Generación de cotizaciones PDF.
- Estados y seguimiento comercial.
- Dashboard de ventas.
