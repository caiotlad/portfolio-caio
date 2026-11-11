import { layout } from '../components/layout.mjs';
import { url, icon } from '../lib/site.mjs';
export const notFound = () => layout(`<section class="not-found section-shell"><span class="eyebrow">404 / UM DESVIO NO CAMINHO</span><h1>Esta conexão<br> não <em>existe.</em></h1><p>Mas há boas ideias para explorar por aqui.</p><a class="button primary" href="${url()}">Voltar ao início ${icon('right',18)}</a><a class="text-link" href="${url('projetos/')}">Conhecer os projetos ${icon('arrow',17)}</a></section>`,{title:'Página não encontrada | Caio Teixeira',minimal:true,path:'404.html'});
