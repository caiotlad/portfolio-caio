import { initRayquaza } from './rayquaza.js';
import { initAmbient } from './ambient.js';
import { initStory } from './story.js';
import { initTechnologies } from './technologies.js';
import { motion, initMotionControl } from './motion.js';
import { initParticles } from './particles.js';
import { initInteractions } from './interactions.js';
import { initProjectExperience } from './project-experience.js';

const reducedMotion = motion;
const en = document.documentElement.lang === 'en';
const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-nav');
function closeMenu(restoreFocus = false) {
  const focusWasInside = mobileMenu?.contains(document.activeElement);
  menuButton?.setAttribute('aria-expanded','false');
  menuButton?.setAttribute('aria-label',en?'Open navigation':'Abrir menu');
  mobileMenu?.classList.remove('open');
  if(restoreFocus || focusWasInside) {
    const target = matchMedia('(max-width: 760px)').matches ? menuButton : header?.querySelector('.wordmark');
    if(target instanceof HTMLElement) target.focus();
  }
}
menuButton?.addEventListener('click',()=>{
  const expanded=menuButton.getAttribute('aria-expanded')==='true';
  menuButton.setAttribute('aria-expanded',String(!expanded));
  menuButton.setAttribute('aria-label',expanded?(en?'Open navigation':'Abrir menu'):(en?'Close navigation':'Fechar menu'));
  mobileMenu?.classList.toggle('open',!expanded);
});
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',event=>{
  if(event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const destination = new URL(a.href);
  const target = destination.pathname === location.pathname && destination.hash
    ? document.getElementById(decodeURIComponent(destination.hash.slice(1))) : null;
  closeMenu();
  if(target instanceof HTMLElement){
    event.preventDefault();
    target.setAttribute('tabindex','-1');
    target.focus({preventScroll:true});
    history.pushState(null,'',destination.href);
    target.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'});
  }
}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton?.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',event=>{if(event.target instanceof Node && header && !header.contains(event.target))closeMenu();});
header?.addEventListener('focusout',()=>requestAnimationFrame(()=>{
  if (menuButton?.getAttribute('aria-expanded')==='true' && !header.contains(document.activeElement)) closeMenu();
}));
matchMedia('(min-width: 761px)').addEventListener('change',event=>{if(event.matches)closeMenu();});

const projectMenu = document.querySelector('.nav-projects');
const projectMenuToggle = projectMenu?.querySelector('summary');
function closeProjectMenu(restoreFocus = false) {
  if (!(projectMenu instanceof HTMLDetailsElement) || !projectMenu.open) return;
  projectMenu.open = false;
  if (restoreFocus) {
    const target = matchMedia('(max-width:760px)').matches ? menuButton : projectMenuToggle;
    target?.focus({preventScroll:true});
  }
}
document.addEventListener('keydown',event=>{
  if (event.key === 'Escape' && projectMenu?.open) { event.preventDefault(); closeProjectMenu(true); }
});
document.addEventListener('click',event=>{
  if (event.target instanceof Node && !projectMenu?.contains(event.target)) closeProjectMenu();
});
projectMenu?.addEventListener('focusout',event=>{
  if (!projectMenu.contains(event.relatedTarget)) closeProjectMenu();
});
projectMenu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',event=>{
  if (event.button===0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) closeProjectMenu();
}));
matchMedia('(max-width:760px)').addEventListener('change',event=>{
  if (event.matches) closeProjectMenu(projectMenu?.contains(document.activeElement));
});

let scrollScheduled = false;
const progress = document.querySelector('.reading-progress');
const backToTop = document.querySelector('.back-to-top');
function updateScroll(){
  header?.classList.toggle('scrolled',scrollY>40);
  const total=document.documentElement.scrollHeight-innerHeight;
  if(progress instanceof HTMLElement)progress.style.transform=`scaleX(${total>0?Math.min(scrollY/total,1):0})`;
  if(backToTop instanceof HTMLElement){
    backToTop.classList.toggle('is-visible',scrollY>innerHeight*.75 && scrollY<total-150);
    backToTop.style.setProperty('--read-progress',String(total>0?Math.min(scrollY/total,1):0));
  }
  scrollScheduled=false;
}
addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateScroll);}},{passive:true});
updateScroll();
backToTop?.addEventListener('click',event=>{
  if(event.button!==0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const main=document.querySelector('#main');
  if(!(main instanceof HTMLElement))return;
  event.preventDefault();
  if(location.hash!=='#main')history.pushState(null,'','#main');
  main.focus({preventScroll:true});
  scrollTo({top:0,behavior:reducedMotion.matches?'instant':'smooth'});
});

if('IntersectionObserver' in window){
  const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');reveals.unobserve(entry.target);}}),{threshold:.06});
  document.querySelectorAll('.reveal').forEach(element=>reveals.observe(element));
  const sections=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting)document.querySelectorAll('[data-nav]').forEach(a=>{
      const active=a.getAttribute('data-nav')===entry.target.id;
      a.classList.toggle('active',active);
      if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
    });
  }),{rootMargin:'-15% 0px -55% 0px'});
  document.querySelectorAll('#projetos,#processo,#sobre,#tecnologias').forEach(section=>sections.observe(section));
  const animations=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('motion-paused',!entry.isIntersecting)),{rootMargin:'70px'});
  document.querySelectorAll('.art,.process-map,.contact-section,.story-section').forEach(element=>animations.observe(element));
}

document.querySelectorAll('[data-process-step]').forEach(details=>details.addEventListener('toggle',()=>{
  if(details.open)document.querySelectorAll('[data-process-step]').forEach(other=>{if(other!==details)other.open=false;});
  const index=document.querySelector('[data-process-step][open]')?.getAttribute('data-process-step');
  document.querySelectorAll('[data-map-node]').forEach(node=>node.classList.toggle('active',node.getAttribute('data-map-node')===index));
}));

document.querySelectorAll('.copy-email').forEach(button=>button.addEventListener('click',async()=>{
  const email=button.getAttribute('data-email');
  const status=document.querySelector('.copy-status');
  if(!email||!status)return;
  try{
    await navigator.clipboard.writeText(email);
    status.textContent=en?'Email copied. Talk soon!':'E-mail copiado. Até a próxima conversa!';
    button.setAttribute('aria-label',en?'Email copied':'E-mail copiado');
    setTimeout(()=>{status.textContent='';button.setAttribute('aria-label',en?'Copy email address':'Copiar endereço de e-mail');},5000);
  }catch{status.textContent=en?'Select the address to copy it or click to send an email.':'Selecione o endereço para copiar ou clique para enviar um e-mail.';}
}));
document.querySelector('.print-button')?.addEventListener('click',()=>window.print());

if(matchMedia('(hover: hover) and (pointer: fine)').matches){
  document.querySelectorAll('[data-tilt]').forEach(card=>{
    const visual=card.querySelector('.project-visual');
    const art=card.querySelector('.art');
    if(!(visual instanceof HTMLElement)||!(art instanceof HTMLElement))return;
    visual.addEventListener('pointermove',event=>{
      if(reducedMotion.matches)return;
      const rect=visual.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;
      art.style.setProperty('--mouse-x',`${x*100}%`);art.style.setProperty('--mouse-y',`${y*100}%`);
      art.style.transform=`perspective(900px) rotateX(${(y-.5)*-5}deg) rotateY(${(x-.5)*5}deg) scale(1.035)`;
    },{passive:true});
    visual.addEventListener('pointerleave',()=>{art.style.transform='';});
    reducedMotion.addEventListener('change',()=>{art.style.transform='';});
  });
}
initMotionControl();
try{initParticles({motion});}catch(error){console.warn('Efeito decorativo indisponível.',error);}
initInteractions({reducedMotion});
initProjectExperience({reducedMotion});
initTechnologies({motion});
try{initAmbient({motion});}catch(error){console.warn('Fundo interativo indisponível.',error);}
initStory({motion});

// No-JS navigation remains available; hide the fallback only after JS starts.
document.documentElement.classList.add('enhanced');

// Keep the same section and catalogue selection when switching language.
document.querySelectorAll('[data-language-switch]').forEach(link=>{
  const sync=()=>{const target=new URL(link.href);target.search=location.search;target.hash=location.hash;link.href=target.href;};
  link.addEventListener('click',sync);link.addEventListener('pointerenter',sync);link.addEventListener('focus',sync);
});



try { initRayquaza({motion}); } catch(error) { console.warn("Rayquaza effect unavailable",error); }
