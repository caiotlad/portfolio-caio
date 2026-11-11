import { searchKeywords, englishText } from '../lib/locale.mjs';
import { projects } from '../data/projects.mjs';
import { url, icon, escapeHtml as e } from '../lib/site.mjs';

export const rayquazaArtwork = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/384.png';

export function paletteClue() {
  return `<div class="footer-extra"><a class="palette-clue" href="${rayquazaArtwork}" target="_blank" rel="noopener noreferrer" data-open-dialog="palette-dialog" aria-haspopup="dialog" aria-controls="palette-dialog"><span class="palette-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>Ficou curioso com a razão pela paleta de cores?</span><span class="clue-arrow" aria-hidden="true">↗</span></a></div>`;
}

export function interactionLayer({ includePalette = true } = {}) {
  const links = [
    { name:'Início', description:'Do problema à entrega', path:'', keywords:'apresentação caio' },
    { name:'Todos os projetos', description:'Explore por produto, requisitos, dados e software', path:'projetos/', keywords:'catálogo portfolio' },
    ...projects.map(p=>({name:p.name,description:p.category,path:`projetos/${p.slug}/`,keywords:`${p.areas.join(' ')} ${p.technologies.join(' ')}`})),
    { name:'Como trabalho', description:'Entender, definir, construir e conferir', path:'#processo', keywords:'processo método' },
    { name:'Sobre mim', description:'Trajetória, GEDAI e formação na UFLA', path:'#sobre', keywords:'experiência produto requisitos qualidade' },
    { name:'Tecnologias', description:'Ferramentas, habilidades e projetos conectados', path:'#tecnologias', keywords:'stack linguagens frameworks bibliotecas tecnologias' },
    { name:'Currículo', description:'Versão para leitura e impressão', path:'curriculo/', keywords:'cv pdf formação idiomas' },
    { name:'Contato', description:'Vamos conversar', path:'#contato', keywords:'email e-mail linkedin github' },
  ];
  return `<dialog id="explore-dialog" class="site-dialog explore-dialog" aria-labelledby="explore-title">
    <div class="dialog-top"><div><span class="eyebrow">UM ATALHO PARA A CONVERSA</span><h2 id="explore-title">O que você quer <em>explorar?</em></h2></div><button class="dialog-close" data-close-dialog aria-label="Fechar busca">${icon('close',20)}</button></div>
    <form class="explore-form" role="search"><label class="sr-only" for="portfolio-query">Buscar projetos e seções do portfólio</label>${icon('search',20)}<input id="portfolio-query" type="search" autocomplete="off" spellcheck="false" placeholder="Projetos, tecnologias, trajetória…" aria-controls="explore-results" autofocus><kbd aria-hidden="true">ESC</kbd></form>
    <p class="explore-status" role="status" aria-live="polite">${links.length} caminhos para explorar.</p>
    <ul id="explore-results" class="explore-results">${links.map(link=>`<li data-search-text="${e(`${link.name} ${link.description} ${englishText(link.name)} ${englishText(link.description)} ${searchKeywords(link.keywords)}`)}"><a href="${url(link.path)}"><span><strong>${e(link.name)}</strong><small>${e(link.description)}</small></span>${icon('arrow',18)}</a></li>`).join('')}</ul>
    <p class="explore-empty" hidden>Nenhum resultado por aqui.<br><span>Tente “dados”, “Java” ou “currículo”.</span></p>
    <div class="dialog-hint"><span><kbd>↑</kbd> <kbd>↓</kbd> navegar</span><span><kbd>Enter</kbd> abrir</span><span><kbd>Esc</kbd> fechar</span></div>
  </dialog>
  ${includePalette ? `<dialog id="palette-dialog" class="site-dialog palette-dialog" aria-labelledby="palette-title" aria-describedby="palette-description">
    <button class="dialog-close" data-close-dialog aria-label="Fechar surpresa">${icon('close',20)}</button>
    <div class="palette-stage"><div class="sky-orbit orbit-a" aria-hidden="true"></div><div class="sky-orbit orbit-b" aria-hidden="true"></div><span class="sky-star star-a" aria-hidden="true">✳</span><span class="sky-star star-b" aria-hidden="true">+</span><span class="palette-number" aria-hidden="true">No. 0384</span><img class="rayquaza-image" data-reveal-image data-src="${rayquazaArtwork}" width="475" height="475" alt="Rayquaza, um Pokémon verde com detalhes amarelos e vermelhos."><p class="palette-image-error" hidden>A imagem não carregou.<br><a href="${rayquazaArtwork}" target="_blank" rel="noopener noreferrer">Ver a ilustração original ${icon('arrow',14)}</a></p></div>
    <div class="palette-story"><span class="eyebrow">VOCÊ ENCONTROU A REFERÊNCIA</span><h2 id="palette-title">Um verde nada <em>aleatório.</em></h2><p id="palette-description">Nem toda paleta começa em um moodboard.<br>Às vezes, começa no Rayquaza.</p><div class="palette-samples" aria-hidden="true"><i></i><i></i><i></i><span>Agora faz sentido.</span></div><a class="art-credit" href="https://www.pokemon.com/pokedex/rayquaza" target="_blank" rel="noopener noreferrer" aria-label="Rayquaza na Pokédex oficial (nova aba)">Rayquaza · ilustração oficial Pokémon ${icon('arrow',12)}</a></div>
  </dialog>` : ''}
  <a class="back-to-top" href="#main" aria-label="Voltar ao topo"><svg class="back-progress" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" pathLength="100"/></svg>${icon('up',18)}</a>`;
}
