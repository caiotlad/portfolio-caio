import { getLocale } from '../lib/locale.mjs';
import { privateProjects } from '../data/private-projects.mjs';
import { escapeHtml as e, icon } from '../lib/site.mjs';
export function privateProjectSection() {
 return `<section class="private-section section-shell" id="contribuicoes" aria-labelledby="private-title">
 <div class="section-heading"><div><div class="eyebrow reveal">CONTRIBUIÇÕES EM PROJETOS PROTEGIDOS</div><h2 class="reveal" id="private-title">${getLocale()==='en'?'Private<br><em>projects.</em>':'Projetos<br><em>privados.</em>'}</h2></div><div class="private-intro reveal"><p class="section-intro">Projetos institucionais e de negócio com acesso restrito. Aqui apresento o contexto, meu papel e as entregas em que trabalhei. Por mais que tenha gostado de trabalhar em cada um deles, não posso divulgá-los na íntegra.</p><p class="private-note">Os materiais desses projetos não estão disponíveis publicamente. As descrições preservam código, documentos internos e dados dos clientes.</p></div></div>
 <ol class="private-grid">${privateProjects.map((project,i)=>`<li class="private-card reveal${project.note?' private-featured':''}"><article><div class="private-topline"><span class="private-number" aria-hidden="true">/${String(i+1).padStart(2,'0')}</span><span>${e(project.context)}</span>${icon(project.note?'layers':'code',19)}</div><h3>${e(project.name)}</h3><p class="private-role">${e(project.role)}</p><p class="private-context">${e(project.text)}</p><div class="private-delivery"><span class="eyebrow">MINHA ENTREGA</span><p>${e(project.delivery)}</p></div>${project.note?`<p class="private-boundary">${e(project.note)}</p>`:''}<p class="private-tags">${e(project.tags)}</p></article></li>`).join('')}</ol>
 </section>`;
}
