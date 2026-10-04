/*
 * SEAIRE - Capa de datos en Supabase
 * No contiene service_role. La clave usada es pública/publishable.
 */
(function(){
  const C=window.SEAIRE_CONFIG;
  if(!window.supabase || !C?.SUPABASE_URL || !C?.SUPABASE_ANON_KEY){
    console.error("SEAIRE: falta seaire-config.js");
    return;
  }
  window.seaireSupabase = supabase.createClient(C.SUPABASE_URL,C.SUPABASE_ANON_KEY);

  const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  window.SEAIRE_CLOUD = {
    esc,
    async services(){
      const {data,error}=await seaireSupabase.from('services').select('*').order('sort_order');
      if(error) throw error; return data||[];
    },
    async settings(section){
      const {data,error}=await seaireSupabase.from('site_settings').select('section,data').eq('section',section).maybeSingle();
      if(error) throw error; return data?.data||{};
    },
    async projects(){
      const {data,error}=await seaireSupabase.from('projects').select('*,project_media(*)').eq('published',true).order('sort_order').order('created_at',{ascending:false});
      if(error) throw error; return data||[];
    },
    async projectMedia(projectId){
      const {data,error}=await seaireSupabase.from('project_media').select('*').eq('project_id',projectId).order('sort_order');
      if(error) throw error; return data||[];
    }
  };
})();