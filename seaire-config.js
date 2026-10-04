(function(){
const KEY='seaire_site_config_v1';
const DEFAULT={
  nav:{inicio:'Inicio',servicios:'Servicios',proyectos:'Proyectos',nosotros:'Nosotros',cotizacion:'Cotización',contacto:'Contacto',cta:'Contáctanos'},
  brand:{name:'SEAIRE',legal:'SEAIRE INGENIERÍA ELÉCTRICA S.A.S.',tagline:'Soluciones Eléctricas, Automatizaciones Industriales, Residenciales y Especiales.',logo:'./logo-seaire.jpeg'},
  hero:{
    badge:'INGENIERÍA • AUTOMATIZACIÓN • ENERGÍA • DESARROLLO',
    title:'Soluciones eléctricas para',
    highlight:'proyectos reales.',
    description:'Diseñamos, construimos y mantenemos soluciones eléctricas, industriales, residenciales y especiales con enfoque técnico, seguridad y confiabilidad.',
    primary:'Solicitar cotización', secondary:'Explorar servicios →'
  },
  about:{
    eyebrow:'Quiénes somos',
    title:'Ingeniería que transforma ideas en soluciones.',
    whoTitle:'¿Quiénes somos?',
    who:'Somos una empresa comprometida con el desarrollo de soluciones eléctricas, automatizaciones industriales, residenciales y especiales. Trabajamos con enfoque técnico y humano para cumplir estándares de calidad, seguridad, innovación y responsabilidad, aportando al bienestar de nuestros clientes y al desarrollo sostenible de la región.',
    mission:'Brindar soluciones eléctricas y de automatización con calidad, seguridad e innovación, generando confianza y satisfacción en nuestros clientes.',
    vision:'Ser una empresa referente en soluciones eléctricas y automatización en la región, reconocida por su profesionalismo y aporte al desarrollo.'
  },
  servicesHead:{
    eyebrow:'Qué hacemos',
    title:'Ingeniería que conecta energía, control y tecnología.',
    description:'Un portafolio pensado para atender proyectos desde el diseño y la construcción hasta el mantenimiento y la puesta en servicio.'
  },
  services:[
    {id:'ingenieria',icon:'⚡',name:'Ingeniería eléctrica',description:'Diseño de redes MT/BT, instalaciones eléctricas, estudios, memorias técnicas y soluciones para infraestructura.',enabled:true},
    {id:'automatizacion',icon:'🏭',name:'Automatización industrial',description:'Tableros de control, variadores, motores, instrumentación y soluciones de automatización.',enabled:true},
    {id:'mantenimiento',icon:'🔧',name:'Mantenimiento',description:'Mantenimiento preventivo y correctivo, diagnóstico, pruebas y puesta en servicio de equipos eléctricos.',enabled:true},
    {id:'solar',icon:'☀️',name:'Energía solar',description:'Diseño e implementación de sistemas fotovoltaicos, respaldo energético y soluciones solares modulares.',enabled:true},
    {id:'transformadores',icon:'🔌',name:'Transformadores',description:'Instalación, mantenimiento, pruebas y soluciones asociadas a transformadores y sistemas de distribución.',enabled:true},
    {id:'asesoria',icon:'📐',name:'Asesoría técnica',description:'Evaluación de proyectos, especificaciones, presupuestos, documentación técnica y acompañamiento profesional.',enabled:true}
  ],
  projectsHead:{
    eyebrow:'Proyectos',
    title:'Experiencia aplicada al campo.',
    description:'Esta sección presenta trabajos ejecutados por SEAIRE, con fotografías, videos, ubicación y descripción del proyecto.'
  },
  quote:{
    eyebrow:'Cotizaciones',title:'Cuéntanos qué necesitas.',description:'Envíanos los datos básicos del proyecto y prepararemos el siguiente paso.',
    button:'Enviar solicitud'
  },
  contact:{
    eyebrow:'Contacto',title:'Hablemos de tu proyecto.',description:'Atención directa para requerimientos de ingeniería eléctrica, automatización, mantenimiento y energía.',
    whatsapp:'098 902 0845',phoneLink:'593989020845',email:'seaire.gere@gmail.com'
  },
  footer:{copyright:'© 2026 SEAIRE. Todos los derechos reservados.'},
  seo:{title:'SEAIRE | Ingeniería Eléctrica',description:'SEAIRE Ingeniería Eléctrica S.A.S. - Soluciones eléctricas, automatización industrial, residencial y especial.'}
};
function clone(x){return JSON.parse(JSON.stringify(x))}
function merge(base, saved){
  if(!saved) return clone(base);
  const r=clone(base);
  const deep=(a,b)=>{Object.keys(b||{}).forEach(k=>{
    if(Array.isArray(b[k])) a[k]=b[k];
    else if(b[k] && typeof b[k]==='object' && a[k] && typeof a[k]==='object') deep(a[k],b[k]);
    else a[k]=b[k];
  })};
  deep(r,saved); return r;
}
function read(){try{return merge(DEFAULT,JSON.parse(localStorage.getItem(KEY)||'null'))}catch(e){return clone(DEFAULT)}}
function write(v){localStorage.setItem(KEY,JSON.stringify(v));dispatchEvent(new CustomEvent('seaire-config-updated',{detail:v}));return v}
window.SEAIRE_CONFIG={KEY,DEFAULT,read,write,clone,SUPABASE_URL:'https://xybslfqvoupmkxhybeul.supabase.co',SUPABASE_ANON_KEY:'sb_publishable_zdFfxY43JQCdtV6ivlZCuA_aca9iI1f'};
})();