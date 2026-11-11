import { projectSearch } from '../lib/locale.mjs';
import { url, icon, escapeHtml as e } from '../lib/site.mjs';
import { projectArt } from './project-art.mjs';
export function projectCard(project) {
  return `<article class="project-card reveal ${project.color}" data-areas="${project.areas.join(' ')}" data-project-search="${e(projectSearch(project))}" data-tilt>
    <a class="project-visual" href="${url(`projetos/${project.slug}/`)}" aria-label="Ler estudo de caso: ${e(project.name)}">${projectArt(project.art)}<span class="visual-open">Explorar projeto ${icon('arrow',18)}</span></a>
    <div class="project-info"><div class="project-meta"><span>${project.category}</span><span>/${project.number}</span></div><div class="project-title"><h3><a href="${url(`projetos/${project.slug}/`)}">${project.name}</a></h3><a class="project-arrow" href="${url(`projetos/${project.slug}/`)}" aria-label="Abrir ${e(project.name)}">${icon('arrow',25)}</a></div><p>${project.description}</p><div class="project-tags">${project.technologies.map(t=>`<span>${e(t)}</span>`).join('')}</div><p class="project-role">${project.role} <span>· ${project.context}</span></p></div>
  </article>`;
}
