import { createHash } from 'node:crypto';
import { inLocale, localePath } from '../src/lib/locale.mjs';
import { mkdir, writeFile, cp, rm, readdir, lstat, readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { home } from '../src/pages/home.mjs';
import { projectPage } from '../src/pages/project.mjs';
import { catalog } from '../src/pages/catalog.mjs';
import { resume } from '../src/pages/resume.mjs';
import { notFound } from '../src/pages/not-found.mjs';
import { projects } from '../src/data/projects.mjs';
import { url, base } from '../src/lib/site.mjs';

const output=resolve(process.env.OUTPUT_DIR || 'dist');
// Refuse to clean source folders or an output directory that is not ours.
const projectRoot = resolve('.');
if (projectRoot === output || projectRoot.startsWith(output + sep)
  || ['src','public','scripts','tests','docs','.git'].some(folder => {
    const source = resolve(folder);
    return output === source || output.startsWith(source + sep);
  })) throw new Error('OUTPUT_DIR deve apontar para um diretório de build separado.');
const entry = await lstat(output).catch(error => {
  if (error.code !== 'ENOENT') throw error;
  return null;
});
if (entry) {
  if (!entry.isDirectory() || entry.isSymbolicLink()) throw new Error('OUTPUT_DIR deve ser um diretório real.');
  const files = await readdir(output);
  if (files.length && !files.includes('build-info.json')) throw new Error('OUTPUT_DIR contém arquivos que não pertencem a um build.');
}
if (process.env.SITE_URL) {
  const site = new URL(process.env.SITE_URL);
  if (!['https:','http:'].includes(site.protocol) || site.username || site.password
    || site.pathname !== '/' || site.search || site.hash) throw new Error('SITE_URL deve conter apenas a origem HTTP(S); use BASE_PATH para o caminho.');
}
const slugs=new Set();
for(const p of projects){
  if(slugs.has(p.slug)||!p.decisions.length||!p.role||!p.limitations)throw new Error(`Conteúdo incompleto ou duplicado: ${p.slug}`);
  slugs.add(p.slug);
  for(const link of [p.repository,...p.evidence.map(e=>e.url)]){
    const parsed=new URL(link);if(parsed.protocol!=='https:'||parsed.hostname!=='github.com')throw new Error(`Evidência inválida: ${link}`);
  }
}
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
await cp(resolve('public'),output,{recursive:true});
await writeFile(resolve(output,'.nojekyll'),'');
await mkdir(resolve(output,'assets'),{recursive:true});
await cp(resolve('src/styles/global.css'),resolve(output,'assets/global.css'));
const scriptFiles = ['site.js','particles.js','interactions.js','project-experience.js','motion.js','technologies.js'];
const scripts = await Promise.all(scriptFiles.map(file=>readFile(resolve('src/scripts',file),'utf8')));
const version = createHash('sha256').update(await readFile(resolve('src/styles/global.css'))).update(scripts.join('\n')).digest('hex').slice(0,12);
process.env.ASSET_VERSION = version;
for (const [i,file] of scriptFiles.entries()) {
  const content = scripts[i].replace(/(from\s+['"]\.\/[^'"]+\.js)(['"])/g,`$1?v=${version}$2`);
  await writeFile(resolve(output,'assets',file),content);
}
const routes=[['index.html',home],['projetos/index.html',catalog],['curriculo/index.html',resume],['404.html',notFound],...projects.map(p=>[`projetos/${p.slug}/index.html`,()=>projectPage(p)])];
const pages=['pt','en'].flatMap(language=>inLocale(language,()=>routes.map(([path,render])=>[localePath(path),render()])));
for(const [path,html] of pages){await mkdir(resolve(output,path,'..'),{recursive:true});await writeFile(resolve(output,path),html);}
if(process.env.SITE_URL){
  const site=new URL(process.env.SITE_URL);
  const routes=['','projetos/','curriculo/',...projects.map(p=>`projetos/${p.slug}/`)];
  const locations=['pt','en'].flatMap(locale=>routes.map(route=>`<url><loc>${new URL(url(route,locale),site).href.replace(/&/g,'&amp;')}</loc></url>`)).join('');
  await writeFile(resolve(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locations}</urlset>`);
  await writeFile(resolve(output,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${new URL(url('sitemap.xml'),site).href}\n`);
}else await writeFile(resolve(output,'robots.txt'),'User-agent: *\nDisallow: /\n');
await writeFile(resolve(output,'build-info.json'),JSON.stringify({builtAt:new Date().toISOString(),pages:pages.map(([p])=>p),site:process.env.SITE_URL||null,base},null,2));
console.log(`Site gerado: ${pages.length} páginas em ${output}`);


