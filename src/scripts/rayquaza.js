export function initRayquaza({motion}) {
  const dialog=document.querySelector('#palette-dialog');
  const stage=dialog?.querySelector('.palette-stage');
  const canvas=stage?.querySelector('[data-ray-canvas]');
  if(!dialog||!stage||!(canvas instanceof HTMLCanvasElement))return;
  const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
  const image=stage.querySelector('[data-reveal-image]');
  const flight=stage.querySelector('.rayquaza-flight');
  const camera=stage.querySelector('.rayquaza-camera');
  const pulseButton=dialog.querySelector('[data-ray-pulse]');
  const replayButton=dialog.querySelector('[data-ray-replay]');
  const hint=dialog.querySelector('[data-ray-hint]');
  const motionButton=dialog.querySelector('[data-ray-motion]');
  const motionLabel=dialog.querySelector('[data-ray-motion-label]');
  const en=document.documentElement.lang==='en';
  const fine=matchMedia('(hover:hover) and (pointer:fine)');
  let width=1,height=1,frame=0,last=0,time=0,energy=0;
  let x=0,y=0,targetX=0,targetY=0,entry=null,entryTimer=0;
  const ready=()=>!!image?.complete&&image.naturalWidth>0;
  const running=()=>dialog.open&&!document.hidden&&!motion.matches&&ready();
  const particles=Array.from({length:72},(_,i)=>({angle:i*2.39996,radius:.52+(i%13)/26,speed:.11+(i%5)*.025,size:.65+(i%4)*.45,depth:(i%7)/7}));
  function draw(delta){
    time+=delta;energy=Math.max(0,energy-delta/1500);
    const moving=!motion.matches;
    x+=(targetX-x)*.075;y+=(targetY-y)*.075;
    if(camera){camera.style.setProperty('--ray-px',String(moving?x:0));camera.style.setProperty('--ray-py',String(moving?y:0));}
    ctx.clearRect(0,0,width,height);
    const cx=width*.5,cy=height*.52,r=Math.min(width*.39,height*.43);
    const glow=ctx.createRadialGradient(cx,cy,r*.05,cx,cy,r*1.4);
    glow.addColorStop(0,`rgba(134,224,132,${.08+energy*.15})`);glow.addColorStop(.6,'rgba(94,172,97,.035)');glow.addColorStop(1,'rgba(94,172,97,0)');
    ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
    ctx.save();ctx.globalCompositeOperation='lighter';
    particles.forEach((p,i)=>{
      const angle=p.angle+(moving?time*.00028*p.speed:0);
      const orbit=r*p.radius,depth=.45+p.depth*.6;
      const px=cx+Math.cos(angle)*orbit*1.25+x*depth*15;
      const py=cy+Math.sin(angle)*orbit*.75+y*depth*12;
      ctx.globalAlpha=.18+p.depth*.42;ctx.fillStyle=i%6===0?'#eddb87':'#a7efb0';
      ctx.beginPath();ctx.arc(px,py,p.size*(1+energy*.7),0,Math.PI*2);ctx.fill();
      if(i%3===0){ctx.strokeStyle='#a7efb0';ctx.lineWidth=.6;ctx.globalAlpha=.1+energy*.15;ctx.beginPath();ctx.ellipse(cx+x*8,cy+y*8,orbit*1.25,orbit*.75,0,angle-.14-energy*.3,angle);ctx.stroke();}
    });
    for(let i=0;i<3;i++){
      const turn=(moving?time*.00012:0)+i*Math.PI*.68;
      ctx.globalAlpha=.12+energy*.2;ctx.strokeStyle=i===1?'#e7c968':'#b3e6b8';ctx.lineWidth=1+i*.3;
      ctx.beginPath();ctx.ellipse(cx,cy,r*(.78+i*.13),r*(.72+i*.1),-.35,turn,turn+Math.PI*.85);ctx.stroke();
    }
    if(energy>0&&moving){const progress=1-energy;ctx.globalAlpha=energy*.5;ctx.strokeStyle='#cdf6b8';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(cx,cy,r*(.3+progress*1.9),r*(.18+progress*1.2),-.35,0,Math.PI*2);ctx.stroke();}
    ctx.restore();
  }
  function loop(now){frame=0;if(!running())return;if(now-last>=32){draw(Math.min(now-last,64));last=now;}frame=requestAnimationFrame(loop);}
  function stop(){cancelAnimationFrame(frame);frame=0;entry?.cancel();entry=null;clearTimeout(entryTimer);stage.classList.remove('ray-entering');}
  function update(){
    stop();
    const disabled=motion.matches||!ready();
    if(motionButton)motionButton.disabled=matchMedia('(prefers-reduced-motion:reduce)').matches;
    if(motionLabel)motionLabel.textContent=motion.matches?(en?'Resume scene':'Retomar cena'):(en?'Pause scene':'Pausar cena');
    if(pulseButton)pulseButton.disabled=disabled;
    if(replayButton)replayButton.disabled=disabled;
    if(hint)hint.textContent=motion.matches?(en?'Motion paused. The illustration remains visible.':'Animações pausadas. A ilustração continua visível.'):(en?'Move the pointer to explore the depth.':'Mova o ponteiro para explorar a profundidade.');
    if(motion.matches){x=0;y=0;targetX=0;targetY=0;energy=0;}
    if(dialog.open){draw(0);last=performance.now();if(running())frame=requestAnimationFrame(loop);}
  }
  function arrive(){
    if(!running())return;
    entry?.cancel();clearTimeout(entryTimer);energy=.85;
    stage.classList.add('ray-entering');
    if(flight?.animate)entry=flight.animate([
      {opacity:0,transform:'translate3d(80px,100px,-200px) rotate(-25deg) scale(.35)',filter:'blur(14px)'},
      {opacity:.85,transform:'translate3d(-15px,-18px,0) rotate(5deg) scale(1.08)',filter:'blur(1px)',offset:.72},
      {opacity:1,transform:'translate3d(0,0,0) rotate(0deg) scale(1)',filter:'blur(0)'}
    ],{duration:1600,easing:'cubic-bezier(.16,.7,.24,1)',fill:'none'});
    entryTimer=setTimeout(()=>{stage.classList.remove('ray-entering');entry=null;},1650);
  }
  function resize(){const box=stage.getBoundingClientRect();width=Math.max(1,box.width);height=Math.max(1,box.height);const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);if(dialog.open)draw(0);}
  new ResizeObserver(resize).observe(stage);
  new MutationObserver(()=>{resize();update();if(dialog.open)arrive();}).observe(dialog,{attributes:true,attributeFilter:['open']});
  image?.addEventListener('load',()=>{update();arrive();});
  image?.addEventListener('error',update);
  dialog.addEventListener('close',stop);
  document.addEventListener('visibilitychange',update);
  motion.addEventListener('change',update);
  stage.addEventListener('pointermove',event=>{if(!running()||!fine.matches||event.pointerType==='touch')return;const box=stage.getBoundingClientRect();targetX=(event.clientX-box.left)/Math.max(box.width,1)-.5;targetY=(event.clientY-box.top)/Math.max(box.height,1)-.5;},{passive:true});
  stage.addEventListener('pointerleave',()=>{targetX=0;targetY=0;});
  pulseButton?.addEventListener('click',()=>{if(running())energy=1;});
  replayButton?.addEventListener('click',arrive);
  motionButton?.addEventListener('click',()=>document.querySelector('[data-motion-toggle]')?.click());
  resize();update();
}
