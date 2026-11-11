export function initInteractions({ reducedMotion }) {
  const en = document.documentElement.lang === 'en';
  const dialogs = [...document.querySelectorAll('.site-dialog')];
  const search = document.querySelector('#explore-dialog');
  const input = document.querySelector('#portfolio-query');
  const results = [...document.querySelectorAll('[data-search-text]')];
  const status = document.querySelector('.explore-status');
  const empty = document.querySelector('.explore-empty');
  const openers = new WeakMap();
  const fold = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  let scrollLock = null;

  function filter() {
    const terms = fold(input?.value.trim() || '').split(/\s+/).filter(Boolean);
    let count = 0;
    for (const result of results) {
      result.hidden = !terms.every(term=>fold((result.dataset.searchText || '')+' '+result.textContent).includes(term));
      if (!result.hidden) count++;
    }
    if (status) status.textContent = en ? `${count} ${count===1?'place found.':'places found.'}` : `${count} ${count===1?'caminho encontrado.':'caminhos encontrados.'}`;
    if (empty) empty.hidden = count !== 0;
    const list = document.querySelector('#explore-results');
    if (list) list.hidden = count === 0;
  }

  function close(dialog) { if (dialog?.open) dialog.close(); }
  function open(dialog, opener = document.activeElement) {
    if (!(dialog instanceof HTMLDialogElement) || dialog.open) return;
    const previous = dialogs.find(other=>other.open);
    const restoreOpener = previous ? openers.get(previous) : opener;
    for (const other of dialogs) close(other);
    openers.set(dialog, restoreOpener);
    if (dialog === search && input) { input.value = ''; filter(); }
    dialog.showModal();
    if (scrollLock === null) {
      scrollLock = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    }
    if (dialog === search) input?.focus({preventScroll:true});
    else dialog.querySelector('[data-close-dialog]')?.focus({preventScroll:true});
    const image = dialog.querySelector('[data-reveal-image]');
    if (image instanceof HTMLImageElement && !image.getAttribute('src')) image.src = image.dataset.src;
  }

  document.querySelectorAll('[data-open-dialog]').forEach(trigger=>trigger.addEventListener('click',event=>{
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const dialog = document.getElementById(trigger.dataset.openDialog);
    if (!(dialog instanceof HTMLDialogElement) || typeof dialog.showModal !== 'function') return;
    event.preventDefault(); open(dialog,trigger);
  }));

  for (const dialog of dialogs) {
    dialog.querySelectorAll('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>close(dialog)));
    dialog.addEventListener('click',event=>{
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom) close(dialog);
    });
    dialog.addEventListener('close',()=>{
      if (!dialogs.some(other=>other.open)) {
        document.documentElement.style.overflow = scrollLock ?? '';
        scrollLock = null;
        const opener = openers.get(dialog);
        if (opener instanceof HTMLElement && opener.isConnected) opener.focus({preventScroll:true});
      }
    });
    const image = dialog.querySelector('[data-reveal-image]');
    image?.addEventListener('load',()=>dialog.classList.add('image-ready'));
    image?.addEventListener('error',()=>{
      dialog.classList.add('image-failed');
      const message = dialog.querySelector('.palette-image-error');
      if (message) message.hidden = false;
    });
  }

  document.addEventListener('keydown',event=>{
    if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k') {
      if (!(search instanceof HTMLDialogElement) || typeof search.showModal !== 'function') return;
      event.preventDefault();
      if (search.open) close(search); else open(search);
    }
  });
  input?.addEventListener('input',filter);
  document.querySelector('.explore-form')?.addEventListener('submit',event=>{
    event.preventDefault();
    document.querySelector('.explore-results li:not([hidden]) a')?.click();
  });
  search?.addEventListener('keydown',event=>{
    if (!['ArrowDown','ArrowUp'].includes(event.key)) return;
    const visible = results.filter(result=>!result.hidden).map(result=>result.querySelector('a'));
    if (!visible.length || (document.activeElement !== input && !visible.includes(document.activeElement))) return;
    event.preventDefault();
    const index = visible.indexOf(document.activeElement);
    if (event.key === 'ArrowDown') visible[(index+1)%visible.length].focus();
    else if (index <= 0) input?.focus(); else visible[index-1].focus();
  });
  document.querySelectorAll('.explore-results a').forEach(link=>link.addEventListener('click',event=>{
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const destination = new URL(link.href);
    const target = destination.pathname === location.pathname && destination.hash
      ? document.getElementById(decodeURIComponent(destination.hash.slice(1))) : null;
    close(search);
    if (target instanceof HTMLElement) {
      event.preventDefault();
      // Let the dialog restore its opener before moving focus to the chosen section.
      search.addEventListener('close',()=>{
        target.setAttribute('tabindex','-1'); target.focus({preventScroll:true});
        if (location.hash !== destination.hash) history.pushState(null,'',destination.href);
        target.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'});
      },{once:true});
    }
  }));
}
