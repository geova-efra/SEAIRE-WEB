(function(){
const KEY='seaire_projects_v1';
const SERVICES=[
{id:'ingenieria',name:'Ingeniería eléctrica',icon:'⚡'},
{id:'automatizacion',name:'Automatización industrial',icon:'🏭'},
{id:'mantenimiento',name:'Mantenimiento',icon:'🔧'},
{id:'solar',name:'Energía solar',icon:'☀️'},
{id:'transformadores',name:'Transformadores',icon:'🔌'},
{id:'asesoria',name:'Asesoría técnica',icon:'📐'}
];
function read(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}}
function write(v){localStorage.setItem(KEY,JSON.stringify(v));dispatchEvent(new CustomEvent('seaire-projects-updated',{detail:v}));return v}
function uid(){return 'p_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8)}
window.SEAIRE_PROJECTS={KEY,SERVICES,read,write,uid};
})();
