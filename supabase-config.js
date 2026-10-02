// SEAIRE - configuración pública de Supabase.
// Solo reemplaza estos 2 valores con los datos de tu proyecto.
// NO coloques aquí una service_role key.
window.SEAIRE_SUPABASE_URL = "https://xybslfqvoupmkxhybeul.supabase.co";
window.SEAIRE_SUPABASE_ANON_KEY = "sb_publishable_zdFfxY43JQCdtV6ivlZCuA_aca9iI1f";

const s = document.createElement("script");
s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
s.onload = () => {
  window.seaireSupabase = window.supabase.createClient(
    window.SEAIRE_SUPABASE_URL,
    window.SEAIRE_SUPABASE_ANON_KEY
  );
};
document.head.appendChild(s);
