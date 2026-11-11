import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const output=resolve(process.env.OUTPUT_DIR || 'dist');
const info=JSON.parse(await readFile(resolve(output,'build-info.json'),'utf8'));
const base=info.base.replace(/\/$/,'');
let links=0;
const ids=new Map();
for(const page of info.pages){const html=await readFile(resolve(output,page),'utf8');ids.set(page,new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1])));}
for(const page of info.pages){
  const html=await readFile(resolve(output,page),'utf8');
  if((html.match(/<h1\b/g)||[]).length!==1)throw new Error(`h1 inválido: ${page}`);
  if(!html.includes(page.startsWith('en/')?'lang="en"':'lang="pt-BR"')||html.includes('undefined')||html.includes('\ufffd'))throw new Error(`Conteúdo inválido: ${page}`);
  for(const [,href] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    if(/^(https?:|mailto:|data:)/.test(href))continue;
    const [route,hash]=href.split('#');
    const pathname=route.split('?')[0];
    let target=page;
    if(pathname){
      if(base&&!pathname.startsWith(`${base}/`))throw new Error(`Base incorreta: ${href}`);
      const local=pathname.slice(base.length).replace(/^\//,'');
      target=extname(local)?local:`${local.replace(/\/$/,'')}${local?'/':''}index.html`;
      await stat(resolve(output,target)).catch(()=>{throw new Error(`Link ausente: ${page} → ${href}`);});
    }
    if(hash&&ids.has(target)&&!ids.get(target).has(hash))throw new Error(`Âncora ausente: ${page} → ${href}`);
    links++;
  }
}
console.log(`Verificado: ${info.pages.length} páginas, ${links} links/assets locais e âncoras válidos.`);

