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
      const {data,error}=await seaireSupabase.from('services').select('id,title,description,icon,image_url,sort_order,active,created_at,updated_at').order('sort_order',{ascending:true});
      if(error) throw error;
      return (data||[]).map((s,i)=>({
        id:s.id,
        name:s.title||'',
        title:s.title||'',
        description:s.description||'',
        icon:s.icon||'⚡',
        image_url:s.image_url||null,
        sort_order:Number(s.sort_order??i),
        active:s.active!==false,
        enabled:s.active!==false
      }));
    },
    async settings(section){
      const {data,error}=await seaireSupabase.from('site_settings').select('*').limit(1).maybeSingle();
      if(error) throw error;
      const row=data||{};
      const cfg=row.config_json&&typeof row.config_json==='object'?row.config_json:{};
      if(cfg[section]) return cfg[section];
      if(section==='empresa') return {nombre:row.company_name||'SEAIRE',eslogan:row.tagline||'',legal:'SEAIRE INGENIERÍA ELÉCTRICA S.A.S.'};
      if(section==='nosotros') return {quienes_somos:row.about_text||'',mision:row.mission||'',vision:row.vision||''};
      if(section==='contacto') return {whatsapp:row.whatsapp||'',correo:row.email||'',ubicacion:row.address||''};
      return {};
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