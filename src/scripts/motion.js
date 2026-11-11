const system = matchMedia('(prefers-reduced-motion: reduce)');
let paused = false;
try { paused = localStorage.getItem('portfolio-motion') === 'paused'; } catch { /* Storage may be unavailable. */ }
const listeners = new Set();
export const motion = {
  get matches() { return paused || system.matches; },
  addEventListener(type,listener) { if (type==='change') listeners.add(listener); },
};
const en = () => document.documentElement.lang === 'en';
function update(announce = false) {
  document.documentElement.dataset.motion = motion.matches ? 'paused' : 'auto';
  const button = document.querySelector('[data-motion-toggle]');
  const label = button?.querySelector('[data-motion-label]');
  const text = system.matches ? (en()?'Reduced motion':'Movimento reduzido')
    : paused ? (en()?'Resume animations':'Retomar animações') : (en()?'Pause animations':'Pausar animações');
  if (label) label.textContent = text;
  if (button) {
    button.disabled = system.matches;
    button.setAttribute('aria-label',(en()?'Motion: ':'Efeitos: ')+text);
    button.title = system.matches ? (en()?'Following your system preference':'Seguindo a preferência do seu sistema') : text;
    button.querySelector('path')?.setAttribute('d',motion.matches?'M8 5v14l11-7Z':'M9 5v14M15 5v14');
  }
  if (motion.matches) document.getAnimations().forEach(animation=>animation.cancel());
  listeners.forEach(listener=>listener({matches:motion.matches}));
  if (announce) {
    const status = document.querySelector('[data-motion-status]');
    if (status) status.textContent = paused ? (en()?'Animations paused.':'Animações pausadas.') : (en()?'Animations resumed.':'Animações retomadas.');
  }
}
export function initMotionControl() {
  document.querySelector('[data-motion-toggle]')?.addEventListener('click',()=>{
    paused = !paused;
    try { localStorage.setItem('portfolio-motion',paused?'paused':'auto'); } catch { /* Keep the choice for this page. */ }
    update(true);
  });
  system.addEventListener('change',()=>update());
  addEventListener('storage',event=>{
    if (event.key === 'portfolio-motion') { paused = event.newValue === 'paused'; update(); }
  });
  update();
}
