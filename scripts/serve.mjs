import http from 'node:http';
import { readFile, stat, watch } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
const dev=process.argv.includes('--dev');
const root=resolve(process.env.OUTPUT_DIR || 'dist');
async function build(){await new Promise((ok,fail)=>{const child=spawn(process.execPath,['scripts/build.mjs'],{stdio:'inherit'});child.on('exit',code=>code===0?ok():fail(new Error(`Build: ${code}`)));});}
if(dev||!existsSync(root))await build();
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const base='/' + (process.env.BASE_PATH || '').replace(/^\/+|\/+$/g,'');
const prefix=base === '/' ? '' : base;
const server=http.createServer(async(req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(prefix&&!(pathname===prefix||pathname.startsWith(`${prefix}/`))){res.writeHead(404);res.end('Not found');return;}
    const local=pathname.slice(prefix.length).replace(/^\//,'');
    let file=resolve(root,local);
    if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    const entry=await stat(file).catch(()=>null);
    if(entry?.isDirectory())file=resolve(file,'index.html');
    const body=await readFile(file).catch(()=>null);
    if(!body){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(resolve(root,local==='en'||local.startsWith('en/')?'en/404.html':'404.html')));return;}
    res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(body);
  }catch{res.writeHead(400);res.end('Bad request');}
});
const port=Number(process.env.PORT||4321);
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${server.address().port}${prefix}/`));
let pending=false;
if(dev){
  for(const directory of ['src','public']){
    (async()=>{try{for await(const event of watch(directory,{recursive:true})){if(pending)continue;pending=true;setTimeout(async()=>{try{await build();console.log('Atualizado. Recarregue o navegador.');}catch(error){console.error(error);}finally{pending=false;}},180);}}catch(error){console.error('Watch indisponível:',error.message);}})();
  }
}

