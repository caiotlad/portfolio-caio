export function initAmbient({motion}) {
  const canvas = document.querySelector('#ambient-field');
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const ctx = canvas.getContext('2d',{alpha:true});
  if (!ctx) return;
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  let width=1,height=1,frame=0,last=0,time=0;
  let pointer={x:-1000,y:-1000},target={x:-1000,y:-1000},pulse=0;
  const nodes=Array.from({length:48},(_,i)=>({u:((i*167+47)%997)/997,v:((i*271+113)%991)/991,phase:i*.72}));
  function resize(){
    width=innerWidth;height=innerHeight;
    const dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    draw(0);
  }
  function draw(delta){
    time+=delta;
    ctx.clearRect(0,0,width,height);
    const interactive=!motion.matches&&fine.matches;
    if(interactive){pointer.x+=(target.x-pointer.x)*.12;pointer.y+=(target.y-pointer.y)*.12;}
    const points=nodes.map(n=>{
      let x=n.u*width+Math.sin(time*.00012+n.phase)*12;
      let y=n.v*height+Math.cos(time*.00009+n.phase)*12;
      if(interactive){
        const dx=pointer.x-x,dy=pointer.y-y,distance=Math.hypot(dx,dy);
        if(distance<230){const pull=(1-distance/230)*.25;x+=dx*pull;y+=dy*pull;}
      }
      return {x,y};
    });
    ctx.lineWidth=.6;
    points.forEach((p,i)=>{
      ctx.fillStyle='rgba(179,230,184,.18)';ctx.fillRect(p.x,p.y,1.5,1.5);
      for(let j=i+1;j<points.length;j++){
        const other=points[j],distance=Math.hypot(other.x-p.x,other.y-p.y);
        if(distance<135){ctx.strokeStyle=`rgba(179,230,184,${(1-distance/135)*.055})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(other.x,other.y);ctx.stroke();}
      }
      const distance=Math.hypot(pointer.x-p.x,pointer.y-p.y);
      if(interactive&&distance<190){ctx.strokeStyle=`rgba(179,230,184,${(1-distance/190)*.20})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(pointer.x,pointer.y);ctx.stroke();}
    });
    if(interactive&&pointer.x>=0&&pointer.y>=0){
      const glow=ctx.createRadialGradient(pointer.x,pointer.y,0,pointer.x,pointer.y,220);
      glow.addColorStop(0,'rgba(179,230,184,.045)');glow.addColorStop(1,'rgba(179,230,184,0)');
      ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
      if(pulse>0){ctx.strokeStyle=`rgba(179,230,184,${pulse*.16})`;ctx.beginPath();ctx.arc(pointer.x,pointer.y,(1-pulse)*100+12,0,Math.PI*2);ctx.stroke();pulse=Math.max(0,pulse-delta*.0015);}
    }
  }
  function loop(now){
    frame=0;
    if(document.hidden||motion.matches||!fine.matches)return;
    if(now-last>=33){draw(Math.min(now-last,65));last=now;}
    frame=requestAnimationFrame(loop);
  }
  function start(){cancelAnimationFrame(frame);frame=0;last=performance.now();if(motion.matches){pointer={x:-1000,y:-1000};target={...pointer};pulse=0;}draw(0);if(!document.hidden&&!motion.matches&&fine.matches)frame=requestAnimationFrame(loop);}
  addEventListener('pointermove',event=>{if(motion.matches||event.pointerType==='touch')return;target={x:event.clientX,y:event.clientY};if(pointer.x<0)pointer={...target};},{passive:true});
  addEventListener('pointerdown',event=>{if(!motion.matches&&event.pointerType!=='touch')pulse=1;},{passive:true});
  document.documentElement.addEventListener('pointerleave',()=>{pointer={x:-1000,y:-1000};target={...pointer};});
  addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',start);
  motion.addEventListener('change',start);fine.addEventListener('change',start);
  resize();start();
}
