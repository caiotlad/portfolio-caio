export function initStory({motion}) {
  const section = document.querySelector('.story-section');
  if (!section) return;
  const chapters = [...section.querySelectorAll('[data-story-chapter]')];
  const links = [...section.querySelectorAll('[data-story-nav]')];
  const stage = section.querySelector('.story-stage');
  const year = section.querySelector('[data-story-year]');
  const name = section.querySelector('[data-story-name]');
  const count = section.querySelector('[data-story-count]');
  let active = -1, scheduled = false;
  function update() {
    scheduled = false;
    const threshold = Math.min(innerHeight * .4, 330);
    let index = 0;
    chapters.forEach((chapter,i)=>{if(chapter.getBoundingClientRect().top <= threshold) index=i;});
    if (index === active) return;
    active = index;
    section.style.setProperty('--story-progress',String(index / Math.max(1,chapters.length-1)));
    section.style.setProperty('--story-angle',`${index*47}deg`);
    stage.dataset.storyCurrent = String(index);
    chapters.forEach((chapter,i)=>chapter.classList.toggle('is-current',i===index));
    links.forEach((link,i)=>{
      if(i===index) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
    });
    const date = chapters[index].querySelector('.story-date').textContent;
    year.textContent = date.match(/20\d{2}/)?.[0] || date;
    name.textContent = chapters[index].querySelector('h3').textContent;
    count.textContent = `${String(index+1).padStart(2,'0')} / ${String(chapters.length).padStart(2,'0')}`;
    if (!motion.matches && typeof year.animate === 'function') {
      year.animate([{opacity:.3,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'ease-out'});
    }
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
  links.forEach(link=>link.addEventListener('click',()=>{
    const chapter = chapters[Number(link.dataset.storyNav)];
    chapter.setAttribute('tabindex','-1');
    chapter.focus({preventScroll:true});
  }));
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  motion.addEventListener('change',schedule);
  section.classList.add('story-enhanced');
  update();
}
