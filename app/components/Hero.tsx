"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const STYLES = `
  @keyframes kiv-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes kiv-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes kiv-bar { 0%,100%{transform:scaleY(0.35)} 50%{transform:scaleY(1)} }
  @keyframes kiv-fade-up { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes kiv-hint-blink { 0%,100%{opacity:0.75} 50%{opacity:1} }
  @keyframes rec-blink { 0%,100%{opacity:0.9} 50%{opacity:0.15} }
  @keyframes kiv-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes kiv-sub-flicker {
    0%,100%{ -webkit-text-stroke-color:rgba(200,169,110,0.5); text-shadow:0 0 30px rgba(200,169,110,0.15); }
    25%{ -webkit-text-stroke-color:rgba(200,169,110,0.85); text-shadow:0 0 60px rgba(200,169,110,0.35), 0 0 100px rgba(200,169,110,0.1); }
    50%{ -webkit-text-stroke-color:rgba(200,169,110,0.4); text-shadow:0 0 20px rgba(200,169,110,0.1); }
    75%{ -webkit-text-stroke-color:rgba(200,169,110,0.9); text-shadow:0 0 80px rgba(200,169,110,0.4), 0 0 120px rgba(200,169,110,0.15); }
  }
  @keyframes kiv-glow-pulse { 0%,100%{text-shadow:0 0 40px rgba(200,169,110,0.4),0 0 80px rgba(200,169,110,0.15)} 50%{text-shadow:0 0 60px rgba(200,169,110,0.6),0 0 120px rgba(200,169,110,0.25)} }

  .kiv-dot-green { width:7px;height:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px rgba(34,197,94,0.6);animation:kiv-pulse 2s ease-in-out infinite;flex-shrink:0; }
  .kiv-bar { width:3px;background:#C8A96E;border-radius:1px;animation:kiv-bar 0.8s ease-in-out infinite; }
  .kiv-bar:nth-child(1){height:35%;animation-delay:0s}
  .kiv-bar:nth-child(2){height:65%;animation-delay:0.12s}
  .kiv-bar:nth-child(3){height:100%;animation-delay:0.22s}
  .kiv-bar:nth-child(4){height:50%;animation-delay:0.16s}
  .kiv-bar:nth-child(5){height:28%;animation-delay:0.06s}

  .kiv-au { animation:kiv-fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both; }
  .kiv-au-1{animation-delay:0.1s} .kiv-au-2{animation-delay:0.22s}
  .kiv-au-3{animation-delay:0.34s} .kiv-au-4{animation-delay:0.46s}
  .kiv-au-5{animation-delay:0.58s} .kiv-au-6{animation-delay:0.7s}

  .kiv-nav {
    position:fixed; top:0; left:0; right:0; z-index:100;
    display:flex; align-items:center; justify-content:space-between;
    padding:1.4rem 2.5rem;
    background:rgba(10,10,10,0.6); backdrop-filter:blur(14px);
    border-bottom:1px solid rgba(42,42,42,0.5);
  }
  .kiv-nav-logo { font-family:'Syne',sans-serif; font-weight:800; font-size:1rem; letter-spacing:0.04em; color:#C8A96E; text-decoration:none; }
  .kiv-nav-links { display:flex; gap:2rem; list-style:none; position:absolute; left:50%; transform:translateX(-50%); }
  .kiv-nav-links a { font-family:'Inter',sans-serif; font-weight:400; font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; color:rgba(240,237,232,0.55); text-decoration:none; transition:color 0.2s; }
  .kiv-nav-links a:hover { color:#F0EDE8; }
  .kiv-nav-cta {
    font-family:'Inter',sans-serif; font-weight:500; font-size:0.72rem;
    letter-spacing:0.08em; text-transform:uppercase; text-decoration:none;
    display:inline-flex; align-items:center; gap:0.5rem;
    background:linear-gradient(135deg,#C8A96E 0%,#e8c98e 50%,#C8A96E 100%);
    background-size:200% auto; color:#0A0A0A; border:none;
    border-radius:999px; padding:0.55rem 1.2rem 0.55rem 1.4rem;
    animation:kiv-shimmer 3s linear infinite;
    box-shadow:0 0 16px rgba(200,169,110,0.25), 0 4px 12px rgba(0,0,0,0.3);
    transition:transform 0.15s, box-shadow 0.2s;
  }
  .kiv-nav-cta:hover { transform:translateY(-1px); box-shadow:0 0 28px rgba(200,169,110,0.4), 0 6px 18px rgba(0,0,0,0.4); color:#0A0A0A; }

  .kiv-ghost {
    display:inline-flex; align-items:center; gap:0.6rem;
    font-family:'Inter',sans-serif; font-weight:400; font-size:0.78rem;
    letter-spacing:0.1em; text-transform:uppercase; text-decoration:none;
    border:1px solid rgba(200,169,110,0.4); color:rgba(240,237,232,0.75);
    padding:0.85rem 1.8rem; border-radius:999px;
    transition:border-color 0.2s,color 0.2s,transform 0.15s,background 0.2s;
  }
  .kiv-ghost:hover { border-color:#C8A96E; color:#F0EDE8; background:rgba(200,169,110,0.07); transform:translateY(-2px); }

  .kiv-big-name {
    position:absolute; top:17%; left:50%; transform:translateX(-50%);
    z-index:1; pointer-events:none; user-select:none;
    font-family:'Anton',sans-serif; font-weight:400;
    font-size:clamp(4rem,12vw,11rem);
    line-height:1; letter-spacing:0.02em; white-space:nowrap; text-align:center;
    background:linear-gradient(90deg,#F0EDE8 0%,#C8A96E 30%,#fff8ee 50%,#C8A96E 70%,#F0EDE8 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:kiv-shimmer 4s linear infinite, kiv-glow-pulse 3s ease-in-out infinite;
    filter:drop-shadow(0 0 24px rgba(200,169,110,0.35));
  }

  .kiv-big-sub-left {
    position:absolute; top:38%; left:13vw; transform:translateY(-50%);
    z-index:1; pointer-events:none; user-select:none;
    font-family:'Syne',sans-serif; font-weight:700;
    font-size:clamp(1rem,2.8vw,2.8rem);
    letter-spacing:0.35em; text-transform:uppercase; color:transparent;
    -webkit-text-stroke:1px rgba(200,169,110,0.5); white-space:nowrap;
    text-shadow:0 0 30px rgba(200,169,110,0.15);
    animation:kiv-sub-flicker 6s ease-in-out infinite;
  }
  .kiv-big-sub-right {
    position:absolute; top:38%; right:13vw; transform:translateY(-50%);
    z-index:1; pointer-events:none; user-select:none;
    font-family:'Syne',sans-serif; font-weight:700;
    font-size:clamp(1rem,2.8vw,2.8rem);
    letter-spacing:0.35em; text-transform:uppercase; color:transparent;
    -webkit-text-stroke:1px rgba(200,169,110,0.5); white-space:nowrap; text-align:right;
    text-shadow:0 0 30px rgba(200,169,110,0.15);
    animation:kiv-sub-flicker 6s ease-in-out infinite 1s;
  }

  .kiv-avail-pill {
    display:inline-flex; align-items:center; gap:0.55rem;
    background:rgba(10,10,10,0.7); backdrop-filter:blur(10px);
    border:1px solid rgba(34,197,94,0.3);
    border-radius:999px; padding:0.5rem 1.2rem 0.5rem 0.8rem;
    margin-bottom:1rem;
  }

  .kiv-tagline {
    font-family:'Syne',sans-serif; font-weight:700;
    font-size:1.2rem; letter-spacing:0.18em; text-transform:uppercase;
    background:linear-gradient(90deg,#C8A96E 0%,#f0d898 40%,#C8A96E 80%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:kiv-shimmer 3s linear infinite;
    display:flex; align-items:center; gap:0.7rem; margin-bottom:1.2rem;
  }

  .kiv-subtext {
    font-family:'Georgia', 'Times New Roman', serif; font-weight:400; font-size:0.88rem;
    color:rgba(240,237,232,0.5); line-height:1.9; margin-bottom:0.75rem;
    border-left:1px solid rgba(200,169,110,0.3); padding-left:1rem;
    position:relative; font-style:italic;
  }
  .kiv-subtext::before {
    content:''; position:absolute; left:-1px; top:0; width:1px; height:100%;
    background:linear-gradient(to bottom,transparent,#C8A96E,transparent);
  }
  .kiv-long-text {
    font-family:'Georgia', 'Times New Roman', serif; font-style:italic;
    font-size:0.82rem; font-weight:400;
    color:rgba(240,237,232,0.38); line-height:1.85;
    margin-bottom:1.5rem; max-width:400px;
    border-left:1px solid rgba(200,169,110,0.12); padding-left:1rem;
  }

  .kiv-cta-grad {
    display:inline-flex; align-items:center; gap:0.6rem;
    font-family:'Inter',sans-serif; font-weight:500; font-size:0.78rem;
    letter-spacing:0.1em; text-transform:uppercase; text-decoration:none;
    padding:0.9rem 2rem; border-radius:999px; position:relative;
    background:linear-gradient(135deg,#C8A96E 0%,#f0d898 50%,#C8A96E 100%);
    background-size:200% auto; color:#0A0A0A;
    animation:kiv-shimmer 3s linear infinite;
    box-shadow:0 0 24px rgba(200,169,110,0.3), 0 4px 16px rgba(0,0,0,0.4);
    transition:transform 0.15s, box-shadow 0.2s;
  }
  .kiv-cta-grad:hover { transform:translateY(-2px); box-shadow:0 0 36px rgba(200,169,110,0.45),0 8px 24px rgba(0,0,0,0.5); }

  .kiv-bottom-left { position:absolute; bottom:14rem; left:2.5rem; z-index:5; max-width:520px; }

  .kiv-wordmark-wrap {
    position:absolute; bottom:-0.1em; left:50%; transform:translateX(-50%);
    z-index:5; text-align:center; pointer-events:none; overflow:visible; width:100%;
  }
  .kiv-wordmark {
    font-family:'Syne',sans-serif; font-weight:800;
    font-size:clamp(7rem,18vw,16rem); line-height:0.85;
    letter-spacing:-0.04em; margin:0; user-select:none;
    white-space:nowrap; pointer-events:auto; display:inline-block; position:relative;
  }

  .kiv-stats-strip { position:absolute; bottom:5rem; right:2.5rem; z-index:4; display:flex; align-items:center; gap:0.7rem; }

  /* Desktop: show floating badges, hide mobile tags */
  .kiv-badges { display:block; }
  .kiv-mobile-badges { display:none; }

  @media(max-width:700px){
    /* Nav */
    .kiv-nav{padding:1rem 1.2rem;}
    .kiv-nav-links{display:none;}
    .kiv-nav-cta{font-size:0.65rem;padding:0.45rem 0.9rem 0.45rem 1rem;}

    /* Big title */
    .kiv-big-name{font-size:clamp(2.2rem,9vw,4rem)!important;top:12%;}
    .kiv-big-sub-left{display:none!important;}
    .kiv-big-sub-right{display:none!important;}

    /* Wordmark */
    .kiv-wordmark{font-size:clamp(4rem,20vw,7rem)!important;}

    /* Bottom left content */
    .kiv-bottom-left{left:1rem;right:1rem;bottom:5rem;max-width:100%;}
    .kiv-tagline{font-size:0.85rem!important;}
    .kiv-subtext{font-size:0.78rem!important;}
    .kiv-long-text{display:none;}

    /* Hide floating badges, show mobile tags */
    .kiv-badges{display:none!important;}
    .kiv-mobile-badges{display:flex!important;}

    /* Hide stats */
    .kiv-stats-strip{display:none;}
  }

  @media(prefers-reduced-motion:reduce){
    .kiv-dot-green,.kiv-bar{animation:none!important;}
    .kiv-au{animation:none!important;opacity:1!important;transform:none!important;}
    .kiv-big-name,.kiv-tagline{animation:none!important;background:none!important;-webkit-text-fill-color:#F0EDE8!important;color:#F0EDE8!important;}
    .kiv-ghost:hover{transform:none!important;}
  }
`;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let running = false;
    let lastTime = 0;
    const FPS = 30;
    const interval = 1000 / FPS;

    const resize = () => { canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({length:55},()=>({
      x:Math.random()*canvas.width, y:Math.random()*canvas.height,
      vx:(Math.random()-0.5)*0.2, vy:(Math.random()-0.5)*0.2,
      a:Math.random()*0.35+0.08,
      r:Math.random()*1.8+0.4,
    }));

    const draw = (now: number) => {
      if (!running) return;
      animId = requestAnimationFrame(draw);
      if (now - lastTime < interval) return;
      lastTime = now;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0;
        if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(200,169,110,${p.a})`;ctx.fill();
      });
    };

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) { running = true; animId = requestAnimationFrame(draw); }
      else if (!entry.isIntersecting && running) { running = false; cancelAnimationFrame(animId); }
    }, { threshold: 0.1 });
    obs.observe(canvas);

    return()=>{ running = false; cancelAnimationFrame(animId); window.removeEventListener("resize",resize); obs.disconnect(); };
  },[]);

  return (
    <>
      <style>{STYLES}</style>

      <nav className="kiv-nav kiv-au kiv-au-1">
        <a href="/" className="kiv-nav-logo">KIV.</a>
        <ul className="kiv-nav-links">
          <li><a href="#work">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#work" className="kiv-nav-cta">
          View My Work
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </nav>

      <section style={{minHeight:"100vh",position:"relative",overflow:"hidden",background:"#0A0A0A"}}>

        {/* Viewfinder SVG frame */}
        <div style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
          <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
            style={{position:"absolute",inset:0,width:"100%",height:"100%"}} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="vf-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <g stroke="#C8A96E" strokeWidth="1.5" fill="none" strokeLinecap="square" opacity="0.75" filter="url(#vf-glow)">
              <polyline points="20,80 20,20 80,20"/>
              <polyline points="1360,20 1420,20 1420,80"/>
              <polyline points="20,820 20,880 80,880"/>
              <polyline points="1360,880 1420,880 1420,820"/>
              <line x1="700" y1="448" x2="740" y2="448"/>
              <line x1="720" y1="428" x2="720" y2="468"/>
              <circle cx="720" cy="448" r="1.5" fill="#C8A96E" stroke="none"/>
              <line x1="80" y1="300" x2="1360" y2="300" opacity="0.15" strokeWidth="0.5"/>
              <line x1="80" y1="600" x2="1360" y2="600" opacity="0.15" strokeWidth="0.5"/>
              <line x1="560" y1="48" x2="560" y2="852" opacity="0.15" strokeWidth="0.5"/>
              <line x1="880" y1="48" x2="880" y2="852" opacity="0.15" strokeWidth="0.5"/>
            </g>
            <g fontFamily="'Inter',monospace" fontSize="9" fill="#C8A96E" opacity="0.4">
              <circle cx="90" cy="44" r="3" fill="#C8A96E" opacity="0.85" style={{animation:"rec-blink 1.4s ease-in-out infinite"}}/>
              <text x="98" y="48" letterSpacing="2">REC</text>
              <text x="88" y="868" letterSpacing="1.5">00:00:00:00</text>
              <text x="1352" y="868" textAnchor="end" letterSpacing="1.5">4K · 24FPS</text>
              <text x="1352" y="48" textAnchor="end" letterSpacing="1.5">AUTO</text>
            </g>
          </svg>
        </div>

        {/* All text — behind photo */}
        <div className="kiv-au kiv-au-2" style={{position:"absolute",inset:0,zIndex:1,pointerEvents:"none"}}>
          <h1 className="kiv-big-name">VIDEO EDITOR</h1>
          <span className="kiv-big-sub-left">MOTION</span>
          <span className="kiv-big-sub-right">DESIGNER</span>
        </div>

        {/* Centered photo */}
        <div style={{position:"absolute",inset:0,zIndex:2,display:"flex",justifyContent:"center",alignItems:"flex-end",pointerEvents:"none",background:"transparent"}}>
          <div style={{position:"relative",width:"520px",height:"90vh",background:"transparent"}}>
            <Image src="/akeno.png" alt="Keano Ivan" fill quality={100} sizes="520px"
              style={{objectFit:"contain",objectPosition:"center bottom",background:"transparent"}} priority/>
            <div style={{position:"absolute",bottom:0,left:0,right:0,height:"62%",background:"linear-gradient(to bottom,transparent 0%,rgba(10,10,10,0.55) 38%,#0A0A0A 72%)",pointerEvents:"none"}}/>
          </div>
        </div>

        {/* Floating skill badges — desktop only */}
        <div className="kiv-badges" style={{position:"absolute",inset:0,zIndex:4,pointerEvents:"none"}}>
          {[
            {label:"Talking Heads",      icon:"🎙️", top:"45%", left:"29%",  delay:"0s"},
            {label:"Motion Graphics",    icon:"✦",  top:"57%", left:"27%",  delay:"0.4s"},
            {label:"Sound Design",       icon:"♫",  top:"69%", left:"29%",  delay:"0.8s"},
            {label:"Visual Storytelling",icon:"◑",  top:"48%", right:"27%", delay:"0.2s"},
            {label:"Cuts & Pacing",      icon:"⟨⟩", top:"61%", right:"26%", delay:"0.6s"},
            {label:"Color Grading",      icon:"◈",  top:"74%", right:"27%", delay:"1s"},
          ].map(({label,icon,top,left,right,delay})=>(
            <div key={label} style={{
              position:"absolute", top, left, right,
              display:"inline-flex", alignItems:"center", gap:"0.4rem",
              background:"rgba(10,10,10,0.8)", backdropFilter:"blur(14px)",
              border:"1px solid rgba(200,169,110,0.3)",
              borderRadius:"999px", padding:"0.35rem 0.8rem 0.35rem 0.5rem",
              whiteSpace:"nowrap",
              boxShadow:"0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(200,169,110,0.1)",
              animation:"kiv-float 3s ease-in-out infinite",
              animationDelay: delay,
            }}>
              <span style={{
                width:22, height:22, borderRadius:"50%",
                background:"linear-gradient(135deg,rgba(200,169,110,0.2),rgba(200,169,110,0.05))",
                border:"1px solid rgba(200,169,110,0.35)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"0.8rem", flexShrink:0,
              }}>{icon}</span>
              <span style={{fontFamily:"'Inter',sans-serif",fontWeight:400,fontSize:"0.62rem",letterSpacing:"0.04em",color:"rgba(240,237,232,0.88)"}}>{label}</span>
            </div>
          ))}
        </div>

        {/* Particles */}
        <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:3,willChange:"transform"}}/>

        {/* Bottom-left content */}
        <div className="kiv-bottom-left kiv-au kiv-au-3">

          {/* Available for work pill */}
          <div className="kiv-avail-pill">
            <div className="kiv-dot-green"/>
            <span style={{fontFamily:"'Inter',sans-serif",fontWeight:400,fontSize:"0.78rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(240,237,232,0.75)"}}>Available for work</span>
          </div>

          {/* Mobile skill tags — hidden on desktop */}
          <div className="kiv-mobile-badges" style={{flexWrap:"wrap",gap:"0.4rem",marginBottom:"0.9rem"}}>
            {["🎙️ Talking Heads","✦ Motion Graphics","◑ Visual Storytelling","♫ Sound Design","◈ Color Grading"].map(tag=>(
              <span key={tag} style={{
                fontFamily:"'Inter',sans-serif",fontWeight:400,fontSize:"0.58rem",
                letterSpacing:"0.04em",color:"rgba(240,237,232,0.8)",
                background:"rgba(10,10,10,0.8)",border:"1px solid rgba(200,169,110,0.3)",
                borderRadius:"999px",padding:"0.25rem 0.65rem",whiteSpace:"nowrap",
              }}>{tag}</span>
            ))}
          </div>

          {/* Making Every Frame Count */}
          <p className="kiv-tagline">
            <span style={{display:"inline-block",width:"22px",height:"1px",background:"rgba(200,169,110,0.6)",flexShrink:0}}/>
            Making Every Frame Count
          </p>

          {/* Main subtext */}
          <p className="kiv-subtext">
            I craft videos that hold attention and{" "}
            <span style={{color:"rgba(200,169,110,0.9)",fontWeight:400}}>leave an impression.</span>
          </p>

          {/* Long text */}
          <p className="kiv-long-text">
            Every cut, transition, and second is crafted with intention — turning simple footage into engaging content that keeps viewers engaged, strengthens the message, and delivers results with purpose.
          </p>

          {/* CTA */}
          <a href="#contact" className="kiv-cta-grad" style={{fontSize:"0.7rem",padding:"0.7rem 1.5rem"}}>
            Let's talk
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Stats bottom right */}
        <div className="kiv-stats-strip kiv-au kiv-au-6">
          <div style={{display:"flex",alignItems:"flex-end",gap:"2.5px",height:"16px"}}>
            {[1,2,3,4,5].map(i=><div key={i} className="kiv-bar"/>)}
          </div>
          <span style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.63rem",letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(240,237,232,0.3)"}}>KIV</span>
        </div>

        {/* KIV Wordmark bottom */}
        <div className="kiv-wordmark-wrap">
          <h2 className="kiv-wordmark">
            <span style={{position:"absolute",top:"-2rem",left:"50%",transform:"translateX(-50%)",fontFamily:"'Inter',sans-serif",fontSize:"0.65rem",letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(200,169,110,0.85)",whiteSpace:"nowrap",animation:"kiv-hint-blink 2s ease-in-out infinite",pointerEvents:"none",textShadow:"0 0 12px rgba(200,169,110,0.5)"}}>↓ hover each letter</span>
            {[
              {letter:"K",title:"Keano · Keep",sub:"Crafting work worth keeping."},
              {letter:"I",title:"Ivan · Innovating",sub:"Always pushing creative boundaries."},
              {letter:"V",title:"Visuals",sub:"Every frame tells a story."},
            ].map(({letter,title,sub})=>(
              <span key={letter} style={{position:"relative",display:"inline-block",cursor:"default"}}
                onMouseEnter={e=>{
                  const tip=e.currentTarget.querySelector(".kiv-tip") as HTMLElement;
                  if(tip){tip.style.opacity="1";tip.style.transform="translateX(-50%) translateY(0)";}
                  const l=e.currentTarget.querySelector(".kiv-letter") as HTMLElement;
                  if(l){l.style.webkitTextStrokeColor="rgba(200,169,110,0.9)";l.style.textShadow="0 0 80px rgba(200,169,110,0.3)";}
                }}
                onMouseLeave={e=>{
                  const tip=e.currentTarget.querySelector(".kiv-tip") as HTMLElement;
                  if(tip){tip.style.opacity="0";tip.style.transform="translateX(-50%) translateY(8px)";}
                  const l=e.currentTarget.querySelector(".kiv-letter") as HTMLElement;
                  if(l){l.style.webkitTextStrokeColor="rgba(200,169,110,0.18)";l.style.textShadow="none";}
                }}
              >
                <span className="kiv-letter" style={{color:"transparent",WebkitTextStroke:"1px rgba(200,169,110,0.18)",transition:"all 0.3s",display:"inline-block"}}>{letter}</span>
                <span className="kiv-tip" style={{position:"absolute",bottom:"110%",left:"50%",transform:"translateX(-50%) translateY(8px)",opacity:0,transition:"opacity 0.3s,transform 0.3s",pointerEvents:"none",whiteSpace:"nowrap",border:"1px solid rgba(200,169,110,0.4)",background:"rgba(10,10,10,0.95)",backdropFilter:"blur(16px)",padding:"0.75rem 1.25rem",display:"flex",flexDirection:"column",gap:"0.3rem",textAlign:"center",boxShadow:"0 0 30px rgba(200,169,110,0.1),0 8px 32px rgba(0,0,0,0.4)"}}>
                  <span style={{position:"absolute",top:0,left:"10%",right:"10%",height:"1px",background:"linear-gradient(to right,transparent,#C8A96E,transparent)"}}/>
                  <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.9rem",color:"#C8A96E",letterSpacing:"0.06em"}}>{title}</span>
                  <span style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.7rem",color:"rgba(240,237,232,0.65)",letterSpacing:"0.04em"}}>{sub}</span>
                </span>
              </span>
            ))}
          </h2>
        </div>

      </section>
    </>
  );
}