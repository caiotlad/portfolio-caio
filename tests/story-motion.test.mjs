import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const storySource=(await readFile('src/scripts/story.js','utf8')).replace('export function','function');
const ambientSource=(await readFile('src/scripts/ambient.js','utf8')).replace('export function','function');

test('a leitura atualiza um único capítulo, data e contador sem animação quando pausado',()=>{
  let offset=1000,animations=0;
  const events={},attributes=Array.from({length:7},()=>new Map());
  const chapters=Array.from({length:7},(_,i)=>({
    getBoundingClientRect:()=>({top:i*400+offset}),
    classList:{toggle(){}},
    querySelector:selector=>({textContent:selector==='.story-date'?(i===3?'Março':String(2024+i)):`Etapa ${i}`}),
  }));
  const links=chapters.map((_,i)=>({dataset:{storyNav:String(i)},addEventListener(){},
    setAttribute:(key,value)=>attributes[i].set(key,value),removeAttribute:key=>attributes[i].delete(key)}));
  const year={textContent:'',animate(){animations++;}},name={textContent:''},count={textContent:''};
  const stage={dataset:{}},style=new Map();
  const section={classList:{add(){}},style:{setProperty:(key,value)=>style.set(key,value)},
    querySelectorAll:selector=>selector==='[data-story-chapter]'?chapters:links,
    querySelector:selector=>({'.story-stage':stage,'[data-story-year]':year,'[data-story-name]':name,'[data-story-count]':count})[selector]};
  vm.runInNewContext(storySource+'\ninitStory({motion});',{
    document:{querySelector:()=>section},motion:{matches:true,addEventListener(){}},innerHeight:900,
    addEventListener:(type,callback)=>{events[type]=callback;},requestAnimationFrame:callback=>{callback();return 1;},
  });
  assert.equal(count.textContent,'01 / 07');
  offset=-1000;events.scroll();
  assert.equal(count.textContent,'04 / 07');assert.equal(name.textContent,'Etapa 3');assert.equal(year.textContent,'Março');
  assert.equal(attributes.filter(a=>a.has('aria-current')).length,1);
  assert.equal(attributes[3].get('aria-current'),'location');assert.equal(animations,0);
});

test('o fundo não agenda animações com movimento reduzido e interrompe ao ocultar a página',()=>{
  let requested=0,cancelled=0,change;
  const windowEvents={},documentEvents={};
  const ctx={clearRect(){},setTransform(){},fillRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){}};
  class Canvas{getContext(){return ctx;}}
  const canvas=new Canvas(),motion={matches:true,addEventListener(type,callback){change=callback;}};
  const document={hidden:false,querySelector:()=>canvas,documentElement:{addEventListener(){}},
    addEventListener:(type,callback)=>{documentEvents[type]=callback;}};
  vm.runInNewContext(ambientSource+'\ninitAmbient({motion});',{
    document,HTMLCanvasElement:Canvas,motion,innerWidth:1200,innerHeight:800,devicePixelRatio:1,
    matchMedia:()=>({matches:true,addEventListener(){}}),performance:{now:()=>0},
    addEventListener:(type,callback)=>{windowEvents[type]=callback;},
    requestAnimationFrame:()=>{requested++;return requested;},cancelAnimationFrame:()=>{cancelled++;},
  });
  assert.equal(requested,0);
  motion.matches=false;change();assert.equal(requested,1);
  document.hidden=true;documentEvents.visibilitychange();assert.equal(requested,1);assert.ok(cancelled>=3);
  motion.matches=true;change();assert.equal(requested,1);
});
