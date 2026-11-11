const en = document.documentElement.lang === 'en';
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

export function initProjectExperience({ reducedMotion }) {
  initCatalog({ reducedMotion });
  initCaseNavigation();
  initProjectSharing();
}

function initCatalog({ reducedMotion }) {
  const grid = document.querySelector('[data-filter-grid]');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('[data-areas]')];
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const input = document.querySelector('#project-query');
  const status = document.querySelector('.filter-status');
  const empty = document.querySelector('.catalog-empty');
  const reset = document.querySelector('[data-reset-projects]');
  const searchable = new Map(cards.map(card=>[card,normalize((card.dataset.projectSearch || '')+' '+card.textContent)]));
  let area = 'Todos';
  let queryTimer;

  function render({ save = true, animate = false } = {}) {
    const query = input?.value.trim() || '';
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    let count = 0;
    for (const card of cards) {
      const show = (area === 'Todos' || card.dataset.areas.split(' ').includes(area))
        && terms.every(term=>searchable.get(card).includes(term));
      const wasHidden = card.hidden;
      card.hidden = !show;
      if (show) {
        count++;
        card.classList.add('is-visible');
        if (animate && wasHidden && !reducedMotion.matches) {
          card.animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.2,.7,.2,1)'});
        }
      }
    }
    buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter === area)));
    const areaLabel = buttons.find(button=>button.dataset.filter===area)?.textContent.toLowerCase();
    if (status) status.textContent = en ? `${count} ${count===1?'project found':'projects found'}${area==='Todos'?'':` in ${areaLabel}`}.` : `${count} ${count===1?'projeto encontrado':'projetos encontrados'}${area==='Todos'?'':` em ${area.toLowerCase()}`}.`;
    if (empty) empty.hidden = count !== 0;
    if (reset) reset.hidden = area === 'Todos' && !query;
    grid.hidden = count === 0;
    if (save) {
      const destination = new URL(location.href);
      if (area === 'Todos') destination.searchParams.delete('area'); else destination.searchParams.set('area',area);
      if (query) destination.searchParams.set('q',query); else destination.searchParams.delete('q');
      if (destination.href !== location.href) history.replaceState(null,'',destination.href);
    }
  }

  function restore() {
    clearTimeout(queryTimer);
    const params = new URL(location.href).searchParams;
    area = buttons.some(button=>button.dataset.filter===params.get('area')) ? params.get('area') : 'Todos';
    if (input) input.value = params.get('q') || '';
    render({save:false});
  }
  buttons.forEach(button=>button.addEventListener('click',()=>{
    clearTimeout(queryTimer); area = button.dataset.filter; render({animate:true});
  }));
  input?.addEventListener('input',()=>{
    clearTimeout(queryTimer); queryTimer = setTimeout(()=>render({animate:true}),160);
  });
  input?.addEventListener('keydown',event=>{
    if (event.key === 'Escape' && input.value) {
      event.stopPropagation(); clearTimeout(queryTimer); input.value = ''; render({animate:true});
    }
  });
  document.querySelector('.catalog-search')?.addEventListener('submit',event=>{
    event.preventDefault(); clearTimeout(queryTimer); render();
  });
  reset?.addEventListener('click',()=>{
    clearTimeout(queryTimer); area = 'Todos'; if (input) input.value = '';
    // Keep focus visible when this reset control disappears.
    input?.focus({preventScroll:true}); render({animate:true});
  });
  addEventListener('popstate',restore);
  addEventListener('pageshow',restore);
  restore();
}

function initCaseNavigation() {
  const navigation = document.querySelector('[data-case-nav]');
  if (!navigation) return;
  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const sections = links.map(link=>document.getElementById(link.hash.slice(1))).filter(Boolean);
  const counter = navigation.querySelector('[data-case-step]');
  let scheduled = false;
  let lastActive = -1;

  function update() {
    scheduled = false;
    const threshold = Math.min(innerHeight * .35,240);
    let index = 0;
    sections.forEach((section,i)=>{ if (section.getBoundingClientRect().top <= threshold) index = i; });
    const first = sections[0]?.getBoundingClientRect();
    const last = sections.at(-1)?.getBoundingClientRect();
    if (first && last) {
      const length = last.bottom - first.top;
      const progress = length > 0 ? Math.max(0,Math.min((threshold-first.top)/length,1)) : 0;
      navigation.style.setProperty('--case-progress',String(progress));
    }
    if (index === lastActive) return;
    lastActive = index;
    links.forEach((link,i)=>{
      if (i === index) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
    });
    if (counter) counter.textContent = `${String(index+1).padStart(2,'0')} / ${String(sections.length).padStart(2,'0')}`;
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } }
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  update();
}


function initProjectSharing() {
  const button = document.querySelector('[data-copy-project]');
  const status = document.querySelector('[data-project-copy-status]');
  if (!button || !status) return;
  let announcement;
  button.addEventListener('click', async () => {
    if (button.disabled) return;
    button.disabled = true;
    clearTimeout(announcement);
    const destination = new URL(document.querySelector('link[rel="canonical"]')?.href || location.href);
    destination.search = '';
    destination.hash = '';
    status.textContent = '';
    try {
      await navigator.clipboard.writeText(destination.href);
      status.textContent = en ? 'Project link copied.' : 'Link do projeto copiado.';
      announcement = setTimeout(() => { status.textContent = ''; }, 5000);
    } catch {
      status.textContent = (en ? 'Copy this address: ' : 'Copie este endereço: ') + destination.href;
    } finally {
      button.disabled = false;
    }
  });
}
