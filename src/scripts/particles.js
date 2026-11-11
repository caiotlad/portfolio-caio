export function initParticles({motion} = {}) {
  const canvas = document.querySelector('#particle-canvas');
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;
  const media = motion || matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('.hero');
  let width = 1, height = 1, frame = 0, visible = true, time = 0, last = 0;
  let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
  const count = matchMedia('(max-width: 760px)').matches ? 650 : 1150;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const points = Array.from({length:count},(_,i)=>{
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    return { x:Math.cos(theta)*radius, y, z:Math.sin(theta)*radius, theta, size:.5+(i%7)/10 };
  });
  const stars = Array.from({length:42},(_,i)=>({x:((i*97+31)%997)/997,y:((i*173+7)%991)/991,size:i%4===0?1:.5}));
  function resize() {
    const box = canvas.getBoundingClientRect();
    width = box.width; height = box.height;
    const dpr = Math.min(devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    if (media.matches || !visible) draw(0);
  }
  function draw(delta) {
    time += delta;
    ctx.clearRect(0,0,width,height);
    if (width < 1 || height < 1) return;
    pointerX += (targetX-pointerX)*.035; pointerY += (targetY-pointerY)*.035;
    const turn = media.matches ? .6 : time*.000075 + pointerX*.8;
    const tilt = -.22 + pointerY*.4;
    const scroll = media.matches ? 0 : Math.min(scrollY/Math.max(innerHeight,1),1);
    const centerX = width*.51, centerY = height*.49;
    const scale = Math.min(width*.35,height*.405);
    const cos=Math.cos(turn), sin=Math.sin(turn), ct=Math.cos(tilt),st=Math.sin(tilt);
    ctx.fillStyle='#b3e6b8';
    stars.forEach(s=>{ctx.globalAlpha=.12;ctx.fillRect(s.x*width,s.y*height,s.size,s.size);});
    const projected = points.map((p,i)=>{
      const wave = media.matches ? 0 : Math.sin(p.y*5+time*.00035)*.045 + Math.sin(p.theta*2+time*.0002)*.02;
      const distort = 1+wave;
      let x=p.x*distort, y=p.y*distort*(1-scroll*.09), z=p.z*distort;
      x += Math.sin(p.y*4+time*.0001)*scroll*.12;
      const rx=x*cos-z*sin, rz=x*sin+z*cos;
      const ry=y*ct-rz*st, depth=y*st+rz*ct;
      const perspective=3/(3-depth*.6);
      return {x:centerX+rx*scale*perspective,y:centerY+ry*scale*perspective,z:depth,s:p.size, i};
    }).sort((a,b)=>a.z-b.z);
    projected.forEach(p=>{
      const brightness=(p.z+1)/2;
      ctx.globalAlpha=.08+brightness*.72;
      ctx.fillStyle=p.i%17===0?'#ebf4c2':p.i%5===0?'#8da477':'#b3d89e';
      ctx.beginPath(); ctx.arc(p.x,p.y,Math.max(.3,(.55+p.s*.5)*(1+brightness*.45)),0,Math.PI*2);ctx.fill();
    });
    ctx.globalAlpha=1;
  }
  function loop(now) {
    frame=0;
    if(!visible || document.hidden || media.matches) return;
    if(now-last>=32){draw(Math.min(now-last,65));last=now;}
    frame=requestAnimationFrame(loop);
  }
  function start(){cancelAnimationFrame(frame);frame=0;last=performance.now();draw(0);if(visible&&!document.hidden&&!media.matches)frame=requestAnimationFrame(loop);}
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas);
  const observer = new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;start();},{rootMargin:'50px'});
  if(hero) observer.observe(hero);
  hero?.addEventListener('pointermove',event=>{if(media.matches)return;const rect=hero.getBoundingClientRect();targetX=(event.clientX-rect.left)/rect.width-.5;targetY=(event.clientY-rect.top)/rect.height-.5;},{passive:true});
  hero?.addEventListener('pointerleave',()=>{targetX=0;targetY=0;});
  document.addEventListener('visibilitychange',start);
  media.addEventListener('change',start);
  resize(); start();
}

