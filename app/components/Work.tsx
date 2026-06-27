"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

type Project = { id: string; videoUrl: string; description: string };
type Category = { eyebrow: string; title: string; description: string; projects: Project[] };

const CATEGORIES: { eyebrow: string; title: string; description: string; projects: Project[] }[] = [
  { eyebrow:"Category 01", title:"Talking Heads + Motion", description:"Interview and talking-head edits with dynamic captions.",
    projects:[
      { id:"th-1", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/Real%20State.mp4", description:"Talking-head editing with captions." },
      { id:"th-2", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/Talking%20Head%20w%20MG.mp4", description:"Talking-head editing with captions." },
      { id:"th-3", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/Motion%20Graphics%207.mp4", description:"Talking-head editing with captions." },
    ]},
  { eyebrow:"Category 02", title:"Brand Ads", description:"Commercial and brand content crafted to convert viewers into customers.",
    projects:[
      { id:"ba-1", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/Campaign%20Ad%20Day%201.mp4", description:"Brand ad campaign." },
      { id:"ba-2", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/Cinematic%20Transition%20and%20Reverse.mp4", description:"Cinematic brand transitions." },
      { id:"ba-3", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/Carwash.mp4", description:"Brand commercial edit." },
    ]},
  { eyebrow:"Category 03", title:"Motion Graphics", description:"Kinetic type, animated overlays, and brand motion packages.",
    projects:[
      { id:"mg-1", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/Motion%20Graphics%205.mp4", description:"Animated graphics and transitions." },
      { id:"mg-2", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/Motion%20Graphics%204.mp4", description:"Kinetic text and animated overlays." },
      { id:"mg-3", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/Motion%20Graphics%206.mp4", description:"Brand motion package." },
    ]},
  { eyebrow:"Category 04", title:"3D Motion Graphics", description:"Sci-fi motion design and animated HUD compositions.",
    projects:[
      { id:"sf-1", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/Motion%20Graphics%201.mp4", description:"High-retention short-form edit." },
      { id:"sf-2", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/Motion%20Graphics%202.mp4", description:"Social media short-form content." },
      { id:"sf-3", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/Motion%20Graphics%203.mp4", description:"Social media short-form content." },
    ]},
  { eyebrow:"Category 05", title:"Gaming Edits", description:"High-energy gaming content built for YouTube and short-form platforms.",
    projects:[
      { id:"ge-1", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/gaming-1.mp4", description:"Gaming highlight edit." },
      { id:"ge-2", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/gaming-2.mp4", description:"High-energy gaming montage." },
      { id:"ge-3", videoUrl:"https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/gaming-3.mp4", description:"Gaming content edit." },
    ]},
];


const BA_VIDEO_URL = "https://jndzkekmerk3cjeq.public.blob.vercel-storage.com/Sample%20Comparison.mp4";

const g   = (a: number) => `rgba(200,169,110,${a})`;
const fmt = (s: number) => isNaN(s) ? "0:00" : `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;

const IconPlay  = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="#C8A96E"><path d="M8 5v14l11-7z"/></svg>;
const IconPause = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="#C8A96E"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>;
const IconSound = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
const IconMute  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888880" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>;

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => e.target.classList.add("visible"), 80); obs.unobserve(e.target); }
    }, { rootMargin:"0px 0px -15% 0px" });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&display=swap');
  .fade-up{opacity:0;transform:translateY(40px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
  .fade-up.visible{opacity:1;transform:translateY(0)}
  .work-row{display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap}
  .work-card{width:260px;flex-shrink:0}
  .work-thumb{aspect-ratio:9/16;overflow:hidden;border:1px solid #2A2A2A;border-radius:14px;position:relative;transition:border-color .25s,box-shadow .25s}
  .work-thumb:hover{border-color:rgba(200,169,110,.5);box-shadow:0 20px 60px rgba(200,169,110,.12)}
  .work-thumb video{width:100%;height:100%;object-fit:cover;display:block;border-radius:13px}
  .work-thumb::after{content:'';position:absolute;bottom:0;left:0;right:0;height:90px;background:linear-gradient(to top,rgba(0,0,0,.65),transparent);border-radius:0 0 13px 13px;pointer-events:none;opacity:0;transition:opacity .25s}
  .work-thumb:hover::after{opacity:1}
  .progress-wrap{position:absolute;bottom:0;left:0;right:0;padding:0 .6rem .55rem;z-index:10;opacity:0;transition:opacity .2s}
  .work-thumb:hover .progress-wrap{opacity:1}
  .progress-track{width:100%;height:3px;background:rgba(255,255,255,.18);border-radius:99px;cursor:pointer}
  .progress-fill{height:100%;border-radius:99px;background:#C8A96E;pointer-events:none;transition:width .1s linear}
  .controls-row{position:absolute;bottom:2.2rem;left:.6rem;right:.6rem;display:flex;align-items:center;justify-content:space-between;z-index:10;opacity:0;transition:opacity .2s}
  .work-thumb:hover .controls-row{opacity:1}
  .ctrl-btn{width:30px;height:30px;border-radius:50%;background:rgba(10,10,10,.7);backdrop-filter:blur(6px);border:1px solid rgba(200,169,110,.25);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s,border-color .2s,transform .15s;flex-shrink:0}
  .ctrl-btn:hover{background:rgba(200,169,110,.18);border-color:#C8A96E;transform:scale(1.1)}
  .time-label{font-family:'Inter',sans-serif;font-size:.62rem;color:rgba(240,237,232,.7);letter-spacing:.04em;font-variant-numeric:tabular-nums;background:rgba(10,10,10,.55);padding:2px 6px;border-radius:4px}
  .work-card-desc{font-family:'Inter',sans-serif;font-weight:300;font-size:.72rem;color:#888880;line-height:1.55;margin:.6rem 0 0}
  .cat-switcher{display:flex;align-items:center;gap:10px;margin-bottom:1.25rem;max-width:700px;margin-left:auto;margin-right:auto}
  .cat-arrow{width:30px;height:30px;border-radius:50%;flex-shrink:0;background:rgba(200,169,110,.06);border:1px solid rgba(200,169,110,.18);color:#C8A96E;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.1rem;line-height:1;transition:background .2s,border-color .2s,opacity .2s;padding:0}
  .cat-arrow:hover{background:rgba(200,169,110,.14);border-color:rgba(200,169,110,.45)}
  .cat-arrow:disabled{opacity:.2;cursor:default;pointer-events:none}
  .cat-track-wrap{flex:1;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.06)}
  .cat-track{display:flex;transition:transform .35s cubic-bezier(.16,1,.3,1)}
  .cat-tab{flex-shrink:0;padding:.6rem 1.3rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-bottom:2px solid transparent;margin-bottom:-1px;cursor:pointer;font-family:'Inter',sans-serif;font-weight:400;font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(240,237,232,.35);white-space:nowrap;transition:color .2s,border-color .2s,background .2s;position:relative}
  .cat-tab:hover{color:rgba(240,237,232,.8);background:rgba(200,169,110,.07);border-color:rgba(200,169,110,.25);border-bottom-color:rgba(200,169,110,.25)}
  .cat-tab.active{color:#C8A96E;background:rgba(200,169,110,.1);border-color:rgba(200,169,110,.35);border-bottom-color:#C8A96E;font-weight:500}
  .cat-tab.active::before{content:'';position:absolute;top:0;left:20%;right:20%;height:1px;background:linear-gradient(to right,transparent,rgba(200,169,110,.6),transparent)}
  .cat-section{position:relative;border-radius:16px;overflow:hidden;background:#0e0e0e;border:1px solid #1e1e1e}
  .cat-content{position:relative;z-index:1;padding:1.75rem 2rem}
  .cat-panel{animation:panelFadeUp .55s cubic-bezier(.16,1,.3,1) both}
  @keyframes panelFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  .ba-modal-backdrop{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;padding:1.5rem;animation:backdropIn .22s ease both}
  @keyframes backdropIn{from{opacity:0}to{opacity:1}}
  .ba-modal-box{position:relative;width:100%;max-width:900px;animation:modalIn .3s cubic-bezier(.16,1,.3,1) both}
  @keyframes modalIn{from{opacity:0;transform:scale(.95) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
  .ba-modal-video-wrap{aspect-ratio:9/16;max-height:80vh;margin:0 auto;border-radius:14px;overflow:hidden;border:1px solid rgba(200,169,110,.25);background:#000;position:relative}
  .ba-modal-video-wrap video{width:100%;height:100%;object-fit:cover;display:block}
  .ba-modal-close{position:absolute;top:-14px;right:-14px;width:36px;height:36px;border-radius:50%;background:#1a1a1a;border:1px solid #2A2A2A;color:#888880;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.1rem;line-height:1;transition:background .2s,border-color .2s,color .2s;z-index:10}
  .ba-modal-close:hover{background:rgba(200,169,110,.12);border-color:rgba(200,169,110,.4);color:#C8A96E}
  .ba-modal-controls{display:flex;align-items:center;gap:.75rem;margin-top:1rem;padding:0 .25rem}
  .ba-modal-ctrl-btn{width:34px;height:34px;border-radius:50%;background:rgba(200,169,110,.08);border:1px solid rgba(200,169,110,.22);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:background .2s,border-color .2s,transform .15s}
  .ba-modal-ctrl-btn:hover{background:rgba(200,169,110,.18);border-color:#C8A96E;transform:scale(1.08)}
  .ba-modal-progress-track{flex:1;height:3px;background:rgba(255,255,255,.12);border-radius:99px;cursor:pointer;position:relative}
  .ba-modal-progress-fill{height:100%;border-radius:99px;background:#C8A96E;pointer-events:none;transition:width .1s linear}
  .ba-modal-time{font-family:'Inter',sans-serif;font-size:.62rem;color:rgba(240,237,232,.5);letter-spacing:.04em;font-variant-numeric:tabular-nums;flex-shrink:0}
  @media(prefers-reduced-motion:reduce){.fade-up,.cat-panel,.ba-modal-backdrop,.ba-modal-box{animation:none!important;transition:none!important;opacity:1!important;transform:none!important}}
  @media(max-width:768px){
    #work{padding:3rem 1.25rem !important;}
    .work-row{gap:0.75rem;}
    .work-card{width:calc(50% - 0.375rem);}
    .cat-switcher{max-width:100%;}
    .cat-content{padding:1.25rem 1rem;}
    .ba-teaser{flex-direction:column !important;}
    .ba-modal-backdrop{padding:0.75rem;}
    .ba-modal-video-wrap{max-height:75vh;}
    .ba-modal-close{top:-10px;right:-10px;width:30px;height:30px;font-size:0.9rem;}
    .work-card-desc{font-size:0.68rem;}
    .work-thumb .progress-wrap{opacity:1;}
    .work-thumb .controls-row{opacity:1;}
  }
`;

function WorkCanvas({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudLines   = useRef(["SYS::RENDER_ENGINE_v4.2","FRAME_RATE: 60fps","COLOR_DEPTH: 32bit","CODEC: H.264/H.265","RES: 4K_UHD","BITRATE: 120Mbps","TRACK_01: VIDEO","TRACK_02: AUDIO"]);
  const hudBkts    = useRef([{x:.08,y:.18},{x:.88,y:.18},{x:.48,y:.48}]);
  const ringOffsets= useRef(Array.from({length:5},(_,i)=>i/5));
  const micPos     = useRef([[.06,.15,1],[.94,.15,.9],[.06,.82,1],[.94,.82,.9]]);
  const CHARS = ["◈","▸","◻","⬡","✦","×","⊕","▲","◇","⟨","⟩"];
  const WORDS = ["MOTION","KINETIC","BRAND","ANIMATE","FRAME","RENDER","EXPORT","DESIGN"];
  const cols  = useRef(Array.from({length:5},(_,i)=>({x:(i+.5)/5,y:Math.random(),speed:.0006+Math.random()*.001,chars:Array.from({length:6},()=>Math.random()>.7?WORDS[Math.floor(Math.random()*WORDS.length)]:CHARS[Math.floor(Math.random()*CHARS.length)]),alpha:.2+Math.random()*.15,fontSize:10,phase:Math.random()*Math.PI*2})));
  const shapes= useRef(Array.from({length:3},()=>({x:.1+Math.random()*.8,y:.1+Math.random()*.8,r:40+Math.random()*50,sides:[3,4,6][Math.floor(Math.random()*3)],speed:.004+Math.random()*.006,rot:Math.random()*Math.PI*2,dx:(Math.random()-.5)*.0001,dy:(Math.random()-.5)*.0001,a:.3+Math.random()*.15})));

  useEffect(() => {
    const canvas=canvasRef.current, section=sectionRef.current;
    if(!canvas||!section) return;
    const ctx=canvas.getContext("2d"); if(!ctx) return;
    let animId: number, tick=0, running=false, lastTime=0;
    const FPS=20, interval=1000/FPS;
    let W=0, H=0;
    const resize=()=>{W=section.offsetWidth;H=section.offsetHeight;canvas.width=W;canvas.height=H;};
    resize(); window.addEventListener("resize",resize);
    const drawHud=(t: number,yOff: number,zH: number)=>{
      ctx.save();ctx.beginPath();ctx.rect(0,yOff,W,zH);ctx.clip();
      const gs=55,ox=(t*.36)%gs;
      ctx.strokeStyle=g(.07);ctx.lineWidth=1;
      for(let x=ox-gs;x<W+gs;x+=gs){ctx.beginPath();ctx.moveTo(x,yOff);ctx.lineTo(x,yOff+zH);ctx.stroke();}
      for(let y=yOff+(ox%gs);y<yOff+zH+gs;y+=gs){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      const sy=yOff+(t*2.2)%(zH+40)-20,sg=ctx.createLinearGradient(0,sy-14,0,sy+14);
      sg.addColorStop(0,g(0));sg.addColorStop(.5,g(.15));sg.addColorStop(1,g(0));
      ctx.fillStyle=sg;ctx.fillRect(0,sy-14,W,28);
      hudBkts.current.forEach((b,i)=>{
        const bx=b.x*W,by=yOff+b.y*zH+Math.sin(t*.036+i)*5,sz=18,a=.45+Math.sin(t*.06+i)*.12;
        ctx.strokeStyle=g(a);ctx.lineWidth=1.6;
        [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sy2])=>{ctx.beginPath();ctx.moveTo(bx+sx*sz,by);ctx.lineTo(bx+sx*sz,by+sy2*sz);ctx.lineTo(bx,by+sy2*sz);ctx.stroke();});
        ctx.fillStyle=g(.25+Math.sin(t*.1+i)*.1);ctx.beginPath();ctx.arc(bx,by,2,0,Math.PI*2);ctx.fill();
      });
      ctx.font="9px 'Courier New',monospace";
      hudLines.current.slice(0,Math.min(Math.floor(t/25)+1,hudLines.current.length)).forEach((ln,i)=>{ctx.fillStyle=g(.22+Math.sin(t*.04+i)*.05);ctx.fillText(ln,24,yOff+36+i*18);});
      ctx.restore();
    };
    const drawMic=(cx: number,cy: number,scale: number,t: number,idx: number)=>{
      const a=.28+Math.sin(t*.04+idx*1.3)*.07,s=scale*10;
      ctx.strokeStyle=g(a);ctx.lineWidth=1.4;
      ctx.beginPath();ctx.roundRect(cx-s*.65,cy-s*1.5,s*1.3,s*2,s*.65);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cx,cy+s*.5);ctx.lineTo(cx,cy+s*1.6);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cx-s*.85,cy+s*1.6);ctx.lineTo(cx+s*.85,cy+s*1.6);ctx.stroke();
      ctx.beginPath();ctx.arc(cx,cy-s*.2,s*1.35,Math.PI*.1,Math.PI*.9,false);ctx.stroke();
    };
    const drawSound=(t: number,yOff: number,zH: number)=>{
      ctx.save();ctx.beginPath();ctx.rect(0,yOff,W,zH);ctx.clip();
      const cx=W*.5,cy=yOff+zH*.5,maxR=Math.min(W,zH)*.5;
      ringOffsets.current.forEach((offset,i)=>{
        const phase=(t*.005+offset)%1,r=phase*maxR,alpha=(1-phase)*.35*(.6+.4*Math.sin(t*.06+i));
        if(alpha<.005) return;
        ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.strokeStyle=g(alpha);ctx.lineWidth=1.5-phase;ctx.stroke();
      });
      for(let li=0;li<5;li++){
        const yOff2=(li-2)*20,amp=(30+li*8)*(.5+.5*Math.sin(t*.06+li*.65)),la=.22+.1*Math.sin(t*.035+li);
        [[0,amp+20],[W,W-amp-20]].forEach(([x1,x2])=>{
          const lg=ctx.createLinearGradient(x1,0,x2,0);
          lg.addColorStop(0,g(la*.5));lg.addColorStop(.5,g(la));lg.addColorStop(1,g(0));
          ctx.strokeStyle=lg;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x1,cy+yOff2);ctx.lineTo(x2,cy+yOff2);ctx.stroke();
        });
      }
      micPos.current.forEach(([mx,my,ms],idx)=>drawMic(mx*W,yOff+my*zH,ms,t,idx));
      ctx.restore();
    };
    const poly=(px: number,py: number,r: number,sides: number,rot: number)=>{
      ctx.beginPath();
      for(let k=0;k<=sides;k++){const a=(k/sides)*Math.PI*2+rot;k===0?ctx.moveTo(px+r*Math.cos(a),py+r*Math.sin(a)):ctx.lineTo(px+r*Math.cos(a),py+r*Math.sin(a));}
    };
    const drawGeo=(t: number,yOff: number,zH: number)=>{
      ctx.save();ctx.beginPath();ctx.rect(0,yOff,W,zH);ctx.clip();
      ctx.strokeStyle=g(.05);ctx.lineWidth=1;
      for(let d=-zH;d<W+zH;d+=90){ctx.beginPath();ctx.moveTo(d,yOff);ctx.lineTo(d+zH,yOff+zH);ctx.stroke();}
      cols.current.forEach(col=>{
        col.y=(col.y+col.speed)%1;
        const pa=col.alpha*(.8+.2*Math.sin(t*.03+col.phase));
        ctx.font=`${col.fontSize}px 'Courier New',monospace`;ctx.textAlign="center";
        col.chars.forEach((ch,ci)=>{
          const rawY=((col.y+ci/col.chars.length)%1)*zH,ef=Math.min(rawY/60,1)*Math.min((zH-rawY)/60,1);
          const ca=pa*ef*(.6+.4*Math.sin(t*.05+ci*.8+col.phase));
          if(ca<.015) return;
          ctx.fillStyle=g(ca);ctx.fillText(ch,col.x*W,yOff+rawY);
        });
      });
      ctx.textAlign="left";
      shapes.current.forEach((s,idx)=>{
        s.x=Math.max(.03,Math.min(.97,s.x+s.dx));s.y=Math.max(.03,Math.min(.97,s.y+s.dy));
        if(s.x<=.03||s.x>=.97)s.dx*=-1;if(s.y<=.03||s.y>=.97)s.dy*=-1;
        s.rot+=s.speed;
        const px=s.x*W,py=yOff+s.y*zH,r=s.r+Math.sin(t*.02+idx)*s.r*.08,a=s.a+Math.sin(t*.025+idx*1.1)*.05;
        ctx.strokeStyle=g(a);ctx.lineWidth=1.2;poly(px,py,r,s.sides,s.rot);ctx.stroke();
        ctx.strokeStyle=g(a*.4);ctx.lineWidth=.8;poly(px,py,r*.5,s.sides,-s.rot*.7);ctx.stroke();
        ctx.fillStyle=g(a*.6);ctx.beginPath();ctx.arc(px,py,2,0,Math.PI*2);ctx.fill();
      });
      ctx.restore();
    };
    const loop=(now: number)=>{
      if(!running) return;
      animId=requestAnimationFrame(loop);
      if(now-lastTime<interval) return;
      lastTime=now;
      if(!W||!H) return;
      ctx.clearRect(0,0,W,H);
      const zH=H/3;
      drawHud(tick,0,zH);drawSound(tick,zH,zH);drawGeo(tick,zH*2,zH);
      tick++;
    };
    const obs=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting&&!running){running=true;animId=requestAnimationFrame(loop);}
      else if(!entry.isIntersecting&&running){running=false;cancelAnimationFrame(animId);}
    },{threshold:0,rootMargin:"-5% 0px -5% 0px"});
    obs.observe(section);
    return()=>{running=false;cancelAnimationFrame(animId);window.removeEventListener("resize",resize);obs.disconnect();};
  },[sectionRef]);

  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0,willChange:"transform"}}/>;
}

function VideoCard({ videoUrl, description }: { videoUrl: string; description: string }) {
  const vRef = useRef<HTMLVideoElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [src, setSrc]           = useState<string|undefined>();
  const [muted, setMuted]       = useState(true);
  const [paused, setPaused]     = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [userControlled, setUserControlled] = useState(false);
  const playLock   = useRef(false);
  const frameCount = useRef(0);

  useEffect(() => {
    const el=thumbRef.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setSrc(videoUrl);obs.disconnect();}},{rootMargin:"200px"});
    obs.observe(el); return()=>obs.disconnect();
  },[videoUrl]);

  const togglePlay=(e: React.MouseEvent)=>{e.stopPropagation();const v=vRef.current;if(!v) return;setUserControlled(true);v.paused?(v.play(),setPaused(false)):(v.pause(),setPaused(true));};
  const toggleMute=(e: React.MouseEvent)=>{e.stopPropagation();const v=vRef.current;if(!v) return;v.muted=!muted;setMuted(!muted);};
  const handleMouseEnter=async()=>{
    if(userControlled) return;
    const v=vRef.current;if(!v||playLock.current) return;
    playLock.current=true;
    try{v.currentTime=0;const p=v.play();if(p)await p.catch(()=>{});setPaused(false);}
    finally{playLock.current=false;}
  };
  const handleMouseLeave=()=>{
    if(userControlled) return;
    const v=vRef.current;if(!v) return;
    v.pause();v.currentTime=0;setPaused(true);setProgress(0);setCurrentTime(0);
  };
  const onTime=useCallback(()=>{
    if(++frameCount.current%4!==0) return;
    const v=vRef.current;if(!v||!v.duration) return;
    setCurrentTime(v.currentTime);setProgress(v.currentTime/v.duration*100);
  },[]);
  const onMeta=()=>{const v=vRef.current;if(v) setDuration(v.duration);};
  const scrub=(e: React.MouseEvent<HTMLDivElement>)=>{e.stopPropagation();const v=vRef.current;if(!v||!v.duration) return;const r=e.currentTarget.getBoundingClientRect();v.currentTime=(e.clientX-r.left)/r.width*v.duration;};

  return (
    <div className="work-card">
      <div className="work-thumb" ref={thumbRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {src && <video ref={vRef} src={src} muted={muted} playsInline preload="metadata" onTimeUpdate={onTime} onLoadedMetadata={onMeta}/>}
        <div className="controls-row">
          <button type="button" className="ctrl-btn" onClick={togglePlay}>{paused?<IconPlay/>:<IconPause/>}</button>
          <span className="time-label">{fmt(currentTime)} / {fmt(duration)}</span>
          <button type="button" className="ctrl-btn" onClick={toggleMute}>{muted?<IconMute/>:<IconSound/>}</button>
        </div>
        <div className="progress-wrap">
          <div className="progress-track" role="slider" aria-label="Seek" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} onClick={scrub}>
            <div className="progress-fill" style={{width:`${progress}%`}}/>
          </div>
        </div>
      </div>
      <p className="work-card-desc">{description}</p>
    </div>
  );
}

function FadeCard({ project, delay }: { project: Project; delay: number }) {
  const ref = useFadeIn();
  return <div className="fade-up" ref={ref} style={{transitionDelay:`${delay}ms`}}><VideoCard videoUrl={project.videoUrl} description={project.description}/></div>;
}

function CategorySwitcher({ categories, activeIndex, onChange }: { categories: Category[]; activeIndex: number; onChange: (i: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [tabWidth, setTabWidth] = useState(160);
  const visibleCount = 3;
  const [offset, setOffset] = useState(0);
  const maxOffset = Math.max(0, categories.length - visibleCount);

  useEffect(() => {
    const calc = () => {
      if (trackRef.current) setTabWidth(trackRef.current.offsetWidth / visibleCount);
    };
    const timer = setTimeout(calc, 50);
    window.addEventListener("resize", calc);
    return () => { clearTimeout(timer); window.removeEventListener("resize", calc); };
  }, []);

  useEffect(() => {
    if(activeIndex<offset) setOffset(activeIndex);
    else if(activeIndex>=offset+visibleCount) setOffset(activeIndex-visibleCount+1);
  },[activeIndex,offset,visibleCount]);

  return (
    <div className="cat-switcher">
      <button type="button" className="cat-arrow" onClick={()=>{const n=Math.max(0,offset-1);setOffset(n);onChange(n);}} disabled={offset===0} aria-label="Previous">‹</button>
      <div className="cat-track-wrap" ref={trackRef}>
        <div className="cat-track" style={{transform:`translateX(-${offset*tabWidth}px)`}}>
          {categories.map((cat,i)=>(
            <button type="button" key={cat.eyebrow} className={`cat-tab${activeIndex===i?" active":""}`} style={{minWidth:tabWidth, width:tabWidth}} onClick={()=>onChange(i)}>{cat.title}</button>
          ))}
        </div>
      </div>
      <button type="button" className="cat-arrow" onClick={()=>{const n=Math.min(maxOffset,offset+1);setOffset(n);onChange(Math.min(n+visibleCount-1,categories.length-1));}} disabled={offset>=maxOffset} aria-label="Next">›</button>
    </div>
  );
}

function BeforeAfterModal({ onClose }: { onClose: () => void }) {
  const vRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused]     = useState(false);
  const [muted, setMuted]       = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const frameCount = useRef(0);

  useEffect(()=>{
    const onKey=(e: KeyboardEvent)=>{if(e.key==="Escape") onClose();};
    window.addEventListener("keydown",onKey);
    document.body.style.overflow="hidden";
    vRef.current?.play().catch(()=>{});
    return()=>{window.removeEventListener("keydown",onKey);document.body.style.overflow="";};
  },[onClose]);

  const togglePlay=()=>{const v=vRef.current;if(!v) return;v.paused?(v.play(),setPaused(false)):(v.pause(),setPaused(true));};
  const toggleMute=()=>{const v=vRef.current;if(!v) return;v.muted=!muted;setMuted(!muted);};
  const onTime=useCallback(()=>{
    if(++frameCount.current%4!==0) return;
    const v=vRef.current;if(!v||!v.duration) return;
    setCurrentTime(v.currentTime);setProgress(v.currentTime/v.duration*100);
  },[]);
  const onMeta=()=>{const v=vRef.current;if(v) setDuration(v.duration);};
  const scrub=(e: React.MouseEvent<HTMLDivElement>)=>{const v=vRef.current;if(!v||!v.duration) return;const r=e.currentTarget.getBoundingClientRect();v.currentTime=(e.clientX-r.left)/r.width*v.duration;};

  return (
    <div className="ba-modal-backdrop" onClick={onClose}>
      <div className="ba-modal-box" onClick={e=>e.stopPropagation()}>
        <button type="button" className="ba-modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="ba-modal-video-wrap">
          <video ref={vRef} src={BA_VIDEO_URL} playsInline muted={muted} preload="auto" onTimeUpdate={onTime} onLoadedMetadata={onMeta}/>
        </div>
        <div className="ba-modal-controls">
          <button type="button" className="ba-modal-ctrl-btn" onClick={togglePlay}>{paused?<IconPlay/>:<IconPause/>}</button>
          <div className="ba-modal-progress-track" role="slider" aria-label="Seek" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} onClick={scrub}>
            <div className="ba-modal-progress-fill" style={{width:`${progress}%`}}/>
          </div>
          <span className="ba-modal-time">{fmt(currentTime)} / {fmt(duration)}</span>
          <button type="button" className="ba-modal-ctrl-btn" onClick={toggleMute}>{muted?<IconMute/>:<IconSound/>}</button>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const headerRef  = useFadeIn();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen]     = useState(false);
  const [isMobile, setIsMobile]       = useState(false);
  const active = CATEGORIES[activeIndex];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const S = {
    inter300: { fontFamily:"'Inter',sans-serif", fontWeight:300 } as React.CSSProperties,
    gold: { color:"#C8A96E" } as React.CSSProperties,
    muted: { color:"#888880" } as React.CSSProperties,
  };

  return (
    <>
      <style>{STYLES}</style>
      <section id="work" style={{position:"relative",padding:"5rem 4rem",borderTop:"1px solid #2A2A2A",background:"radial-gradient(ellipse 90% 50% at 50% 30%,rgba(200,169,110,.04) 0%,#111 65%),#121212"}}>
        <div ref={sectionRef} style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          <WorkCanvas sectionRef={sectionRef as React.RefObject<HTMLDivElement>}/>
        </div>

        <div style={{maxWidth:"1400px",margin:"0 auto",position:"relative",zIndex:1}}>

          {/* Header */}
          <div className="fade-up" ref={headerRef} style={{marginBottom:"1.5rem",textAlign:"center"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:".75rem",marginBottom:"1.1rem"}}>
              <span style={{display:"inline-block",width:28,height:1,background:"rgba(200,169,110,.4)"}}/>
              <span style={{fontFamily:"'Inter',sans-serif",fontSize:".58rem",letterSpacing:".25em",textTransform:"uppercase",color:"rgba(200,169,110,.65)",fontWeight:500}}>Selected Work</span>
              <span style={{display:"inline-block",width:28,height:1,background:"rgba(200,169,110,.4)"}}/>
            </div>
            <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:"clamp(2.8rem,6vw,4.2rem)",letterSpacing:"-0.04em",lineHeight:1,color:"#F0EDE8",marginBottom:"1.1rem"}}>
              Projects<span style={{color:"#C8A96E"}}>.</span>
            </h2>
            <p style={{...S.inter300,fontSize:".88rem",color:"#F0EDE8",maxWidth:460,lineHeight:1.8,margin:"0 auto 2.5rem",fontStyle:"italic",letterSpacing:".02em"}}>
              A selection of projects showcasing design, editing, and visual storytelling — intentional and engaging.
            </p>
            <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:".62rem",color:"rgba(200,169,110,.4)",letterSpacing:".1em",textTransform:"uppercase",margin:"-1.5rem 0 2rem",display:"flex",alignItems:"center",justifyContent:"center",gap:".4rem"}}>
              Watch the before & after
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(200,169,110,.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
              </svg>
            </p>

            {/* Before & After teaser */}
            <div onClick={()=>setModalOpen(true)} role="button" tabIndex={0} onKeyDown={e=>e.key==="Enter"&&setModalOpen(true)}
              className="ba-teaser" style={{maxWidth:580,margin:"0 auto",padding:"1.25rem 1.5rem",background:"rgba(200,169,110,.04)",border:"1px solid #2A2A2A",borderRadius:12,cursor:"pointer",display:"flex",alignItems:"center",gap:"1.25rem",textAlign:"left",transition:"border-color .25s,background .25s"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor="rgba(200,169,110,.3)";(e.currentTarget as HTMLDivElement).style.background="rgba(200,169,110,.07)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor="#2A2A2A";(e.currentTarget as HTMLDivElement).style.background="rgba(200,169,110,.04)";}}>
              <div style={{position:"relative",width:52,height:92,borderRadius:8,overflow:"hidden",border:"1px solid rgba(200,169,110,.25)",flexShrink:0}}>
                <video src={BA_VIDEO_URL} muted playsInline preload="metadata" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#C8A96E"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <div style={{position:"absolute",left:0,right:0,top:"50%",height:"1px",background:"rgba(200,169,110,.3)"}}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{...S.inter300,fontSize:".68rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",...S.gold,marginBottom:".35rem"}}>Before & After</p>
                <p style={{...S.inter300,fontSize:".78rem",...S.muted,lineHeight:1.65,margin:0}}>This is what separates good content from content that stops the scroll: color grading that sets the entire mood, motion graphics that instantly capture attention, sound design that adds emotion and weight, and an edit that pulls every element together into something people can't ignore.</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{width:1,height:20,background:"linear-gradient(to bottom,transparent,#2A2A2A)",margin:"0 auto 1.25rem"}}/>

          {/* Category switcher */}
          <CategorySwitcher categories={CATEGORIES} activeIndex={activeIndex} onChange={setActiveIndex}/>

          {/* Active panel */}
          <div key={activeIndex} className="cat-section cat-panel">
            <div className="cat-content">
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",paddingBottom:"1.5rem",borderBottom:"1px solid #2A2A2A",marginBottom:"2.25rem"}}>
                <div style={{width:1,height:28,background:"linear-gradient(to bottom,transparent,#C8A96E)",marginBottom:"1rem"}}/>
                <p style={{...S.inter300,fontWeight:400,fontSize:".65rem",letterSpacing:".22em",textTransform:"uppercase",...S.gold,marginBottom:".6rem",display:"flex",alignItems:"center",gap:".6rem"}}>
                  <span style={{display:"inline-block",width:20,height:"1px",background:"#C8A96E",opacity:.5}}/>
                  {active.eyebrow}
                  <span style={{display:"inline-block",width:20,height:"1px",background:"#C8A96E",opacity:.5}}/>
                </p>
                <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:"clamp(1.6rem,3vw,2.2rem)",letterSpacing:"-.03em",marginBottom:".75rem",lineHeight:1.1,background:"linear-gradient(135deg,#F0EDE8 20%,#C8A96E 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{active.title}</h3>
                <p style={{...S.inter300,fontSize:".82rem",...S.muted,maxWidth:400,lineHeight:1.8,borderLeft:"1px solid rgba(200,169,110,0.2)",paddingLeft:".85rem",textAlign:"left"}}>{active.description}</p>
                <p style={{...S.inter300,fontSize:".62rem",color:"#555550",letterSpacing:".14em",marginTop:".75rem",display:"flex",alignItems:"center",gap:".4rem"}}>
                  {!isMobile && <span style={{display:"inline-block",width:14,height:"1px",background:"#555550"}}/>}
                  {isMobile ? "( Tap to control playback )" : "Hover to control playback"}
                  {!isMobile && <span style={{display:"inline-block",width:14,height:"1px",background:"#555550"}}/>}
                </p>
              </div>
              <div className="work-row">
                {active.projects.map((p,i)=><FadeCard key={p.id} project={p} delay={i*150}/>)}
              </div>
            </div>
          </div>

        </div>
      </section>

      {modalOpen && <BeforeAfterModal onClose={()=>setModalOpen(false)}/>}
    </>
  );
}