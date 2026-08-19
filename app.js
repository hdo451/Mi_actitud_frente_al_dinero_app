
const areas = [
  {name:'Ahorro e inversión',icon:'↗',questions:{
    inicial:['Sigo un presupuesto y pago mis facturas a tiempo.','Tengo un fondo de emergencia para gastos inesperados.','Conozco el total de mis deudas y cuánto interés pago por ellas.','Entiendo el interés compuesto y el valor del dinero en el tiempo.'],
    intermedio:['Conozco mi patrimonio neto.','Sé explicar la diferencia entre ahorrar e invertir.','Conozco mi tolerancia al riesgo.','Entiendo cómo la inflación reduce el valor de mis ahorros.'],
    avanzado:['Sé explicar la diferencia entre una acción y un bono.','Entiendo la relación inversa entre los bonos y las tasas de interés.','Sé diferenciar un fondo mutuo de un ETF.','Mis inversiones están bien diversificadas.']},learn:'Refuerza presupuesto, fondo de emergencia e interés compuesto antes de asumir más riesgo.'},
  {name:'Inversión para el retiro',icon:'⌛',questions:{
    inicial:['Tengo una imagen clara de mi retiro y he estimado cuánto necesitaré.','Conozco mi perfil de riesgo y elijo inversiones acordes.','Conozco vehículos de retiro como Roth IRA o 401(k).'],
    intermedio:['Tengo una meta anual para aumentar mis aportaciones al retiro.','Reviso regularmente que mi portafolio coincida con mi horizonte y riesgo.','He considerado la inflación en mis necesidades de ingreso para el retiro.'],
    avanzado:['Comprendo la asignación de activos y cómo rebalancear un portafolio.','He investigado inversiones que generan ingresos, como dividendos y anualidades.','Tengo un plan para minimizar impuestos durante el retiro.']},learn:'Calcula tu meta de retiro y automatiza aportaciones periódicas según tu horizonte.'},
  {name:'Impuestos',icon:'%',questions:{
    inicial:['Sé preparar y presentar mis impuestos o trabajo con un profesional.','Estoy al corriente con mis impuestos federales y estatales.','Conservo copias de mis declaraciones de los últimos tres años.'],
    intermedio:['Aprovecho al máximo las cuentas de ahorro con ventajas fiscales.','Comprendo por qué recibir un gran reembolso no siempre es lo óptimo.'],
    avanzado:['Considero realizar pérdidas de inversiones para compensar ganancias.','Entiendo las ventajas fiscales de donar activos en especie.']},learn:'Organiza tus documentos y conoce las cuentas con ventajas fiscales disponibles en tu país.'},
  {name:'Seguros',icon:'◇',questions:{
    inicial:['Tengo un inventario de los bienes y objetos de valor de mi hogar.','Reviso mis pólizas con regularidad.','Tengo cobertura suficiente para proteger mis ingresos y deudas.','Los beneficiarios de mis pólizas están actualizados.'],
    intermedio:['Conozco los beneficios de salud posteriores al retiro disponibles para mí.','He organizado mi seguro médico para mis necesidades actuales y futuras.','Reviso coberturas y precios en momentos importantes de mi vida.'],
    avanzado:['He considerado un seguro de cuidados a largo plazo.','Entiendo cómo un seguro de vida puede integrarse en mi planificación patrimonial.']},learn:'Haz un inventario de riesgos y revisa coberturas, exclusiones y beneficiarios una vez al año.'},
  {name:'Planificación patrimonial',icon:'⌂',questions:{
    inicial:['He preparado un testamento que especifica cómo dividir mis activos.','He designado beneficiarios en mis cuentas y pólizas.','He nombrado un albacea y guardo mis documentos en un lugar seguro.'],
    intermedio:['Tengo un poder duradero para mis finanzas y atención médica.','Tengo directrices médicas anticipadas y he evaluado un fideicomiso.','He considerado las obligaciones que recaerían sobre mi patrimonio.'],
    avanzado:['He considerado estrategias para maximizar mi legado y reducir su carga fiscal.','Gestiono eficazmente mis donaciones y activos benéficos.']},learn:'Empieza por testamento, beneficiarios y poderes; comunica dónde están tus documentos.'},
  {name:'Ingresos en el retiro',icon:'≈',questions:{
    inicial:['He realizado un inventario de mis activos.','He preparado un presupuesto para el retiro.','Conozco mis fuentes futuras de ingreso y opciones de beneficios.','Comprendo mis opciones de cobertura médica y sus costos estimados.'],
    intermedio:['Tengo un plan de vivienda para cuando cambien mi salud o movilidad.','Tengo un plan de contingencia ante discapacidad, enfermedad o fallecimiento de mi pareja.'],
    avanzado:['Sé cómo retirar fondos de forma fiscalmente eficiente.','Tengo una estrategia para generar flujo de efectivo predecible en el retiro.','He evaluado si las anualidades son adecuadas para mi situación.']},learn:'Proyecta ingresos y gastos del retiro e incluye salud, vivienda e inflación.'}
];
const options=[{label:'Sí, totalmente',value:'yes',score:1},{label:'En parte',value:'partial',score:.5},{label:'No',value:'no',score:0},{label:'No aplica a mi situación',value:'na',score:null},{label:'No lo sé',value:'unknown',score:null}];
let state={area:0,level:0,index:0,answers:{},learn:[],wrong:0}; const levels=['inicial','intermedio','avanzado'];
const $=id=>document.getElementById(id); const views=['welcomeView','quizView','resultsView'];
function show(id){views.forEach(v=>$(v).classList.toggle('active',v===id));window.scrollTo(0,0)}
function key(){return `${state.area}-${state.level}-${state.index}`}
function question(){return areas[state.area].questions[levels[state.level]][state.index]}
function save(){localStorage.setItem('claraProgress',JSON.stringify(state))}
function render(){const area=areas[state.area], qs=area.questions[levels[state.level]], total=areas.reduce((n,a)=>n+Object.values(a.questions).flat().length,0),done=Object.keys(state.answers).length;
  $('areaName').textContent=area.name;$('progressLabel').textContent=`${state.area+1} de ${areas.length} áreas`;$('progressBar').style.width=`${Math.max(3,done/total*100)}%`;
  $('levelPill').textContent=`NIVEL ${levels[state.level].toUpperCase()}`;$('questionCount').textContent=`Pregunta ${state.index+1} de ${qs.length}`;$('questionText').textContent=question();
  $('answers').innerHTML=options.map((o,i)=>`<button class="answer ${state.answers[key()]?.value===o.value?'selected':''}" data-value="${o.value}"><span class="answer-key">${String.fromCharCode(65+i)}</span>${o.label}</button>`).join('');
  $('learnMore').checked=state.learn.includes(key());$('nextButton').disabled=!state.answers[key()];$('backButton').disabled=done===0;
  $('answers').querySelectorAll('.answer').forEach(b=>b.onclick=()=>select(b.dataset.value));updateCoach();
}
function select(value){const o=options.find(x=>x.value===value);state.answers[key()]={value,score:o.score,area:state.area,level:state.level,q:question()};render();save()}
function updateCoach(){const answered=Object.values(state.answers).filter(a=>a.area===state.area),strong=answered.filter(a=>a.score===1).length;
  if(strong>=3){$('coachKicker').textContent='¡ESO ES!';$('coachTitle').innerHTML='Tu base se ve<br>muy sólida.';$('coachText').textContent='Vamos un poco más profundo. Estás demostrando criterio financiero.'}
  else if(answered.some(a=>a.score===0)){$('coachKicker').textContent='UN PASO A LA VEZ';$('coachTitle').innerHTML='Detectarlo ya es<br>un avance.';$('coachText').textContent='Aquí hay una oportunidad para aprender. Seguimos sin juicios y a tu ritmo.'}
  else{$('coachKicker').textContent='TU COMPAÑERA DE VIAJE';$('coachTitle').innerHTML='Empecemos<br>por lo esencial.';$('coachText').textContent='No hay respuestas malas. Lo importante es saber dónde estás hoy.'}}
function unlockNavigation(){$('nextButton').disabled=!state.answers[key()];$('backButton').disabled=Object.keys(state.answers).length===0}
function fadeInQuestion(){const wrap=$('questionWrap');wrap.classList.remove('question-fade-out');void wrap.offsetWidth;wrap.classList.add('question-fade-in');setTimeout(()=>wrap.classList.remove('question-fade-in'),1000);unlockNavigation()}
function showSectionBreak(){const area=areas[state.area];$('sectionBreakTitle').textContent=area.name;$('sectionBreakText').textContent=`Ya has avanzado un área. Sigue así: cada respuesta te acerca a una imagen más clara de tus finanzas.`;$('sectionBreakProgress').textContent=`Área ${state.area+1} de ${areas.length}`;$('sectionBreak').hidden=false;setTimeout(()=>{$('sectionBreak').hidden=true;$('questionWrap').classList.remove('section-paused');fadeInQuestion()},2200)}
function navigate(areaChanged){const wrap=$('questionWrap');$('nextButton').disabled=true;$('backButton').disabled=true;wrap.classList.remove('question-fade-in');wrap.classList.add('question-fade-out');setTimeout(()=>{render();if(areaChanged){wrap.classList.add('section-paused');showSectionBreak()}else fadeInQuestion()},1000)}
function next(){const a=state.answers[key()];if(!a)return;const previousArea=state.area;if(a.value==='no')state.wrong++;else if(a.score===1)state.wrong=0;
  const qs=areas[state.area].questions[levels[state.level]];if(state.index<qs.length-1 && state.wrong<3)state.index++;
  else if(state.level<2 && state.wrong<3){state.level++;state.index=0;state.wrong=0}
  else if(state.area<areas.length-1){state.area++;state.level=0;state.index=0;state.wrong=0}
  else return finish();save();navigate(state.area!==previousArea)}
function back(){const keys=Object.keys(state.answers);if(!keys.length)return;const previousArea=state.area;const last=keys[keys.length-1].split('-').map(Number);delete state.answers[keys[keys.length-1]];[state.area,state.level,state.index]=last;save();navigate(state.area!==previousArea)}
function finish(){save();const valid=Object.values(state.answers).filter(a=>a.score!==null),score=Math.round(valid.reduce((s,a)=>s+a.score,0)/Math.max(1,valid.length)*100);const label=score<25?'Principiante':score<45?'Básico':score<70?'Intermedio':score<88?'Avanzado':'Experto';
  $('finalScore').textContent=score;$('finalLevel').textContent=label;$('finalMessage').textContent=score>=70?'Tienes una base consistente. Tu oportunidad está en convertir conocimiento en estrategia.':'Ya identificaste tu punto de partida. Unos pocos hábitos pueden generar un gran cambio.';$('scoreRing').style.setProperty('--score',`${score*3.6}deg`);
  $('areaResults').innerHTML=areas.map((a,i)=>{const x=valid.filter(v=>v.area===i),n=Math.round(x.reduce((s,v)=>s+v.score,0)/Math.max(1,x.length)*100);return `<div class="area-row"><div class="area-meta"><span>${a.name}</span><strong>${n}%</strong></div><div class="area-line"><i style="width:${n}%"></i></div></div>`}).join('');
  const lows=areas.map((a,i)=>({a,n:valid.filter(v=>v.area===i).reduce((s,v)=>s+v.score,0)/Math.max(1,valid.filter(v=>v.area===i).length)})).sort((a,b)=>a.n-b.n).slice(0,3);
  $('recommendations').innerHTML=lows.map(x=>`<div class="recommendation"><span class="rec-icon">${x.a.icon}</span><div><strong>${x.a.name}</strong><p>${x.a.learn}</p><a href="https://www.khanacademy.org/college-careers-more/financial-literacy" target="_blank" rel="noopener">Explorar curso gratuito →</a></div></div>`).join('');show('resultsView');$('saveExit').hidden=true;localStorage.removeItem('claraProgress')}
function start(fresh=true){if(fresh){state={area:0,level:0,index:0,answers:{},learn:[],wrong:0};save()}show('quizView');$('saveExit').hidden=false;render()}
function toast(t){$('toast').textContent=t;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2500)}
$('startButton').onclick=()=>start();$('resumeButton').onclick=()=>start(false);$('nextButton').onclick=next;$('backButton').onclick=back;$('saveExit').onclick=()=>{save();show('welcomeView');$('saveExit').hidden=true;toast('Progreso guardado en este dispositivo')};
$('learnMore').onchange=e=>{state.learn=e.target.checked?[...new Set([...state.learn,key()])]:state.learn.filter(x=>x!==key());save()};$('restartButton').onclick=()=>start();
$('shareButton').onclick=async()=>{const text=`Mi diagnóstico financiero en Clara: ${$('finalScore').textContent}/100 — nivel ${$('finalLevel').textContent}.`;if(navigator.share)await navigator.share({title:'Mi diagnóstico financiero',text});else{await navigator.clipboard.writeText(text);toast('Resultado copiado al portapapeles')}};
$('downloadButton').onclick=()=>{window.print()};if(localStorage.getItem('claraProgress')){$('resumeButton').hidden=false;try{state=JSON.parse(localStorage.getItem('claraProgress'))}catch{localStorage.removeItem('claraProgress')}}

  