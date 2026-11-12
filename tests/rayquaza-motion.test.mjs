import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const source=(await readFile('src/scripts/rayquaza.js','utf8')).replace('export function','function');
test('Rayquaza stops rendering when closed, paused or hidden and cancels entrance motion',()=>{
  let requests=0,cancels=0,entrances=0,entranceCancels=0,onOpen,onMotion;
  const noop=()=>{},listeners={};
  const ctx={clearRect:noop,createRadialGradient:()=>({addColorStop:noop}),fillRect:noop,save:noop,restore:noop,beginPath:noop,arc:noop,fill:noop,ellipse:noop,stroke:noop,setTransform:noop};
  class Canvas{getContext(){return ctx;}}
  const image={complete:true,naturalWidth:475,addEventListener:noop};
  const flight={animate(){entrances++;return {cancel(){entranceCancels++;}};}};
  const controls=Object.fromEntries(['pulse','replay','motion','motion-label','hint'].map(key=>[`[data-ray-${key}]`,{addEventListener:noop}]));
  const stage={querySelector:s=>s==='[data-ray-canvas]'?canvas:s==='[data-reveal-image]'?image:s==='.rayquaza-flight'?flight:{style:{setProperty:noop}},getBoundingClientRect:()=>({width:500,height:400}),classList:{add:noop,remove:noop},addEventListener:noop};
  const dialog={open:false,querySelector:s=>s==='.palette-stage'?stage:controls[s],addEventListener:noop};
  const canvas=new Canvas(),motion={matches:false,addEventListener:(_,cb)=>{onMotion=cb;}};
  const document={hidden:false,documentElement:{lang:'pt-BR'},querySelector:()=>dialog,addEventListener:(name,cb)=>{listeners[name]=cb;}};
  vm.runInNewContext(source+'\ninitRayquaza({motion});',{
    document,motion,HTMLCanvasElement:Canvas,devicePixelRatio:1,performance:{now:()=>0},
    matchMedia:()=>({matches:false}),ResizeObserver:class{observe(){}},MutationObserver:class{constructor(cb){onOpen=cb;}observe(){}},
    requestAnimationFrame:()=>++requests,cancelAnimationFrame:()=>cancels++,setTimeout:()=>1,clearTimeout:noop,
  });
  assert.equal(requests,0,'Closed scene must not consume animation frames.');
  dialog.open=true;onOpen();assert.equal(requests,1);assert.equal(entrances,1);
  motion.matches=true;onMotion();assert.equal(requests,1);assert.ok(entranceCancels>0);
  assert.equal(controls['[data-ray-pulse]'].disabled,true);assert.equal(controls['[data-ray-replay]'].disabled,true);
  dialog.open=false;onOpen();dialog.open=true;onOpen();assert.equal(entrances,1,'Reduced motion must skip the entrance.');
  motion.matches=false;onMotion();assert.equal(requests,2);
  document.hidden=true;listeners.visibilitychange();assert.equal(requests,2);assert.ok(cancels>=5);
  dialog.open=false;document.hidden=false;onOpen();assert.equal(requests,2);
});
