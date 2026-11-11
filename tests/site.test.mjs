import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';

let server, origin;
const build=JSON.parse(await readFile('dist/build-info.json','utf8'));
before(async()=>{
  server=spawn(process.execPath,['scripts/serve.mjs'],{env:{...process.env,PORT:'0'},stdio:['ignore','pipe','pipe']});
  let errors='';server.stderr.on('data',chunk=>{errors+=chunk;});
  origin=await new Promise((ok,fail)=>{
    const timeout=setTimeout(()=>fail(new Error(`Servidor não iniciou: ${errors}`)),10000);
    server.stdout.on('data',chunk=>{const match=String(chunk).match(/Local: (http:\/\/127\.0\.0\.1:\d+)/);if(match){clearTimeout(timeout);ok(match[1]);}});
    server.once('exit',code=>{clearTimeout(timeout);fail(new Error(`Servidor encerrou: ${code}, ${errors}`));});
  });
});
after(()=>server?.kill());

test('todas as páginas geradas respondem com HTML e identidade corretos',async()=>{
  for(const path of build.pages.filter(p=>p!=='404.html')){
    const route=path.replace(/index\.html$/,'');
    const response=await fetch(`${origin}/${route}`);
    assert.equal(response.status,200,route);
    assert.match(response.headers.get('content-type'),/text\/html/);
    const html=await response.text();
    assert.ok(html.includes(path.startsWith('en/')?'<html lang="en">':'<html lang="pt-BR">'));
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    assert.match(html,/Caio Teixeira/);
  }
});
test('página inexistente usa 404 real e oferece rotas de recuperação',async()=>{
  const response=await fetch(`${origin}/pagina-que-nao-existe/`);
  assert.equal(response.status,404);
  const html=await response.text();
  assert.match(html,/Voltar ao início/);assert.match(html,/href="\/projetos\/"/);
});
test('scripts e estilos são servidos com MIME correto e sem erro de rede local',async()=>{
  for(const [path,mime] of [['assets/site.js','text/javascript'],['assets/particles.js','text/javascript'],['assets/interactions.js','text/javascript'],['assets/project-experience.js','text/javascript'],['assets/motion.js','text/javascript'],['assets/technologies.js','text/javascript'],['assets/global.css','text/css'],['favicon.svg','image/svg+xml']]){
    const response=await fetch(`${origin}/${path}`);assert.equal(response.status,200,path);assert.ok(response.headers.get('content-type').startsWith(mime),path);assert.ok((await response.text()).length>100,path);
  }
  const social=await fetch(`${origin}/social.png`);
  assert.equal(social.status,200);
  assert.equal(social.headers.get('content-type'),'image/png');
  const png=Buffer.from(await social.arrayBuffer());
  assert.deepEqual(png.subarray(0,8),Buffer.from([137,80,78,71,13,10,26,10]));
  assert.equal(png.readUInt32BE(16),1200);
  assert.equal(png.readUInt32BE(20),630);
});
test('rota direta de caso tem atribuição, evidências e limites no HTML sem JS',async()=>{
  const html=await(await fetch(`${origin}/projetos/deubranco/`)).text();
  assert.match(html,/Engenharia de requisitos e validação/);
  assert.match(html,/desenvolvido em equipe/);
  assert.match(html,/id="evidencias"/);assert.match(html,/RECORTE & LIMITES/);
});
test('currículo tem impressão e não publica o telefone do arquivo original',async()=>{
  const html=await(await fetch(`${origin}/curriculo/`)).text();
  assert.match(html,/Imprimir \/ salvar PDF/);
  assert.match(html,/class="resume-document"/);
  assert.doesNotMatch(html,/98203|\+55|Out\. 2024|out\. 2025/);
});
test('requisição com escape inválido é recusada sem derrubar o servidor',async()=>{
  const bad=await fetch(`${origin}/%ZZ`);assert.equal(bad.status,400);
  const healthy=await fetch(origin);assert.equal(healthy.status,200);
});
