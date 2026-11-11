import { inLocale, localePath } from '../src/lib/locale.mjs';
import { mkdir, writeFile, cp, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { home } from '../src/pages/home.mjs';
import { projectPage } from '../src/pages/project.mjs';
import { catalog } from '../src/pages/catalog.mjs';
import { resume } from '../src/pages/resume.mjs';
import { notFound } from '../src/pages/not-found.mjs';
import { projects } from '../src/data/projects.mjs';
import { url } from '../src/lib/site.mjs';

const output=resolve(process.env.OUTPUT_DIR || 'dist');
const slugs=new Set();
for(const p of projects){
  if(slugs.has(p.slug)||!p.decisions.length||!p.role||!p.limitations)throw new Error(`Conteúdo incompleto ou duplicado: ${p.slug}`);
  slugs.add(p.slug);
  for(const link of [p.repository,...p.evidence.map(e=>e.url)]){
    const parsed=new URL(link);if(parsed.protocol!=='https:'||parsed.hostname!=='github.com')throw new Error(`Evidência inválida: ${link}`);
  }
}
await mkdir(output,{recursive:true});
await cp(resolve('public'),output,{recursive:true});
await mkdir(resolve(output,'assets'),{recursive:true});
await cp(resolve('src/styles/global.css'),resolve(output,'assets/global.css'));
for(const file of ['site.js','particles.js','interactions.js','project-experience.js','motion.js','technologies.js'])await cp(resolve('src/scripts',file),resolve(output,'assets',file));
const routes=[['index.html',home],['projetos/index.html',catalog],['curriculo/index.html',resume],['404.html',notFound],...projects.map(p=>[`projetos/${p.slug}/index.html`,()=>projectPage(p)])];
const pages=['pt','en'].flatMap(language=>inLocale(language,()=>routes.map(([path,render])=>[localePath(path),render()])));
for(const [path,html] of pages){await mkdir(resolve(output,path,'..'),{recursive:true});await writeFile(resolve(output,path),html);}
if(process.env.SITE_URL){
  const site=new URL(process.env.SITE_URL);if(!['https:','http:'].includes(site.protocol))throw new Error('SITE_URL inválida');
  const routes=['','projetos/','curriculo/',...projects.map(p=>`projetos/${p.slug}/`)];
  const locations=['pt','en'].flatMap(locale=>routes.map(route=>`<url><loc>${new URL(url(route,locale),site).href.replace(/&/g,'&amp;')}</loc></url>`)).join('');
  await writeFile(resolve(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locations}</urlset>`);
  await writeFile(resolve(output,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${new URL(url('sitemap.xml'),site).href}\n`);
}else await writeFile(resolve(output,'robots.txt'),'User-agent: *\nDisallow: /\n');
await writeFile(resolve(output,'build-info.json'),JSON.stringify({builtAt:new Date().toISOString(),pages:pages.map(([p])=>p),site:process.env.SITE_URL||null,base:process.env.BASE_PATH||'/'},null,2));
console.log(`Site gerado: ${pages.length} páginas em ${output}`);
