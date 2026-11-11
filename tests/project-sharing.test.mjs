import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = (await readFile('src/scripts/project-experience.js','utf8')).replace('export function','function');
function sharing({language='pt-BR', canonical=null, writeText}={}) {
  const button = {disabled:false, addEventListener(type,handler){this.click=handler;}};
  const status = {textContent:''};
  const context = vm.createContext({
    document:{documentElement:{lang:language}, querySelector(selector){
      if(selector==='[data-copy-project]')return button;
      if(selector==='[data-project-copy-status]')return status;
      if(selector==='link[rel="canonical"]')return canonical?{href:canonical}:null;
      return null;
    }},
    location:{href:'https://example.com/en/projects/olist/?q=personal#evidencias'},
    navigator:{clipboard:writeText?{writeText}:undefined}, URL,
    setTimeout:()=>1, clearTimeout:()=>{},
  });
  vm.runInContext(source+'\ninitProjectExperience({reducedMotion:{matches:true}});',context);
  return {button,status};
}
test('copiar usa a rota atual sem busca ou fragmento e anuncia em inglês',async()=>{
  let copied;
  const {button,status}=sharing({language:'en',writeText:async value=>{copied=value;}});
  await button.click();
  assert.equal(copied,'https://example.com/en/projects/olist/');
  assert.equal(status.textContent,'Project link copied.');
  assert.equal(button.disabled,false);
});
test('copiar prioriza o endereço canônico de produção',async()=>{
  let copied;
  const {button,status}=sharing({canonical:'https://portfolio.example/portfolio/projetos/olist/',writeText:async value=>{copied=value;}});
  await button.click();
  assert.equal(copied,'https://portfolio.example/portfolio/projetos/olist/');
  assert.equal(status.textContent,'Link do projeto copiado.');
});
test('falha ou indisponibilidade da área de transferência oferece endereço copiável',async()=>{
  for(const writeText of [undefined,async()=>{throw new Error('Permission denied');}]){
    const {button,status}=sharing({writeText});
    await button.click();
    assert.equal(status.textContent,'Copie este endereço: https://example.com/en/projects/olist/');
    assert.equal(button.disabled,false);
  }
});
test('cliques simultâneos não duplicam a cópia nem deixam botão bloqueado',async()=>{
  let complete, calls=0;
  const {button}=sharing({writeText:()=>{calls++;return new Promise(resolve=>{complete=resolve;});}});
  const first=button.click();
  await button.click();
  assert.equal(calls,1);
  assert.equal(button.disabled,true);
  complete();await first;
  assert.equal(button.disabled,false);
});
