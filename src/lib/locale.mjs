import messages from '../data/en.json' with { type: 'json' };
import { projects, explorations } from '../data/projects.mjs';
import { projectEnglish, explorationEnglish } from '../data/projects.en.mjs';

let language = 'pt';
export const getLocale = () => language;
export function inLocale(locale, render) {
  const previous = language;
  language = locale;
  try { return render(); } finally { language = previous; }
}
export function localePath(path = '', locale = language) {
  if (/^(assets\/|favicon\.|social\.)/.test(path)) return path;
  if (locale !== 'en') return path;
  return `en/${path.replace(/^projetos(?=\/|$)/,'projects').replace(/^curriculo(?=\/|$)/,'resume')}`;
}

const translations = new Map(Object.entries(messages));
const areaEnglish = {Produto:'Product',Requisitos:'Requirements',Dados:'Data',Software:'Software'};
export function projectSearch(project) {
  const english = projectEnglish[project.slug];
  return [project.name,project.category,project.description,project.role,english.category,english.description,english.role,...project.technologies,...project.areas,...project.areas.map(area=>areaEnglish[area])].join(' ');
}
export function searchKeywords(value) {
  const words = {produto:'product',requisitos:'requirements',dados:'data',apresentacao:'introduction',catalogo:'catalog',processo:'process',metodo:'method',experiencia:'experience',qualidade:'quality',formacao:'education',idiomas:'languages',tecnologias:'technologies',linguagens:'languages',bibliotecas:'libraries',trajetoria:'background',ferramentas:'tools'};
  return `${value} ${value.split(/\s+/).map(word=>words[word.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()] || word).join(' ')}`;
}
for (const project of projects) {
  const english = projectEnglish[project.slug];
  for (const key of ['category','description','headline','role','context','problem','contribution','outcome','limitations']) translations.set(project[key],english[key]);
  translations.set(project.category.toUpperCase(),english.category.toUpperCase());
  translations.set(`· ${project.context}`,`· ${english.context}`);
  translations.set(`${project.name} — ${project.category} | Caio Teixeira`,`${project.name} — ${english.category} | Caio Teixeira`);
  translations.set(`Ver repositório de ${project.name} (nova aba)`,`View ${project.name} repository (new tab)`);
  translations.set(`Ler estudo de caso: ${project.name}`,`Read case study: ${project.name}`);
  translations.set(`Abrir ${project.name}`,`Open ${project.name}`);
  project.summary.forEach((text,i)=>translations.set(text,english.summary[i]));
  project.decisions.forEach((decision,i)=>{translations.set(decision.title,english.decisions[i].title);translations.set(decision.text,english.decisions[i].text);});
  project.evidence.forEach((evidence,i)=>{
    translations.set(evidence.label,english.evidence[i]);
    translations.set(`${evidence.label} (nova aba)`,`${english.evidence[i]} (new tab)`);
  });
}
explorations.forEach((item,i)=>{
  for (const key of ['name','category','description']) translations.set(item[key],explorationEnglish[i][key]);
  translations.set(`${item.name} no GitHub (nova aba)`,`${explorationEnglish[i].name} on GitHub (new tab)`);
});
const decode = text => text.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const encode = text => text.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
export function englishText(text) { return translations.get(decode(text.trim())) ?? decode(text.trim()); }
export function hasEnglishTranslation(text) { return translations.has(decode(text.trim())); }
export function localizeMarkup(html) {
  if (language !== 'en') return html;
  // Translate authored text and human-readable attributes only; URLs, IDs,
  // data keys, scripts and code remain untouched. English is emitted at build time.
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<!--[\s\S]*?-->|<[^>]+>|[^<]+/gi,token=>{
    if (/^<(?:script\b|!--)/i.test(token)) return token;
    if (token.startsWith('<')) return token.replace(/\b(aria-label|placeholder|alt|title|content)="([^"]*)"/g,(_,key,value)=>`${key}="${encode(englishText(value))}"`);
    const trimmed = token.trim();
    if (!trimmed) return token;
    return token.replace(trimmed,encode(englishText(trimmed)));
  });
}

