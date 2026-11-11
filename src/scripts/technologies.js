export function initTechnologies({motion}) {
  const workbench = document.querySelector('.technology-workbench');
  if (!workbench) return;
  const items = [...workbench.querySelectorAll('.tech-item')];
  if (matchMedia('(max-width:760px)').matches) items.forEach(item=>{item.open=false;});
  const wire = workbench.querySelector('.tech-connection path');
  const endpoint = workbench.querySelector('.tech-connection circle');
  let scheduled = false;
  let lastInteracted = null;
  function connect() {
    scheduled = false;
    const selected = items.find(item=>item.open);
    workbench.classList.toggle('has-selection',!!selected);
    if (!selected || !matchMedia('(min-width:761px)').matches) return;
    const origin = workbench.getBoundingClientRect();
    const tile = selected.querySelector('summary').getBoundingClientRect();
    const panel = selected.querySelector('.tech-detail').getBoundingClientRect();
    workbench.style.setProperty('--tech-panel-height',`${panel.height}px`);
    const top = Math.max(0,Math.min(origin.height-panel.height,130-origin.top));
    workbench.style.setProperty('--tech-panel-top',`${top}px`);
    const x1 = tile.right-origin.left+3, y1 = tile.top-origin.top+tile.height/2;
    const x2 = panel.left-origin.left-7, y2 = top+Math.min(panel.height/2,180);
    wire?.setAttribute('d',`M${x1},${y1} C${x1+45},${y1} ${x2-60},${y2} ${x2},${y2}`);
    endpoint?.setAttribute('cx',x2); endpoint?.setAttribute('cy',y2);
  }
  function schedule() { if (!scheduled) { scheduled=true; requestAnimationFrame(connect); } }
  function select(item) {
    if (item.open) return;
    items.forEach(other=>{if (other!==item) other.open=false;});
    item.open=true;
  }
  items.forEach(item=>{
    const summary = item.querySelector('summary');
    summary.addEventListener('pointerenter',()=>{if(matchMedia('(min-width:761px) and (hover:hover) and (pointer:fine)').matches)select(item);});
    summary.addEventListener('click',event=>{
      lastInteracted = item;
      if (event.detail > 0 && matchMedia('(min-width:761px) and (hover:hover) and (pointer:fine)').matches) { event.preventDefault(); select(item); }
    });
    item.addEventListener('toggle',()=>{
      schedule();
      if (item.open && lastInteracted === item && matchMedia('(max-width:760px)').matches) summary.scrollIntoView({block:'start',behavior:motion.matches?'instant':'smooth'});
      if (item.open && !motion.matches) item.querySelector('.tech-detail').animate([{opacity:.25,translate:'0 8px'},{opacity:1,translate:'0 0'}],{duration:220,easing:'ease-out'});
    });
  });
  new ResizeObserver(schedule).observe(workbench);
  new IntersectionObserver(entries=>workbench.classList.toggle('tech-offscreen',!entries[0].isIntersecting),{rootMargin:'80px'}).observe(workbench);
  addEventListener('scroll',schedule,{passive:true});
  motion.addEventListener('change',schedule);
  schedule();
}
