"use client";
import { useState } from "react";
import Image from "next/image";
import ParticleBackground from "./ParticleBackground";

const tools = [
  { name: "CapCut",             icon: "/icons/capcut.svg",   primary: true  },
  { name: "After Effects",      icon: "/icons/ae.svg",       primary: false },
  { name: "Adobe Premiere Pro", icon: "/icons/premiere.svg", primary: false },
  { name: "Photoshop",          icon: "/icons/ps.svg",       primary: false },
  { name: "Illustrator",        icon: "/icons/ai.svg",       primary: false },
  { name: "Canva",              icon: "/icons/canva.svg",    primary: false },
  { name: "Pexel",              icon: "/icons/pexel.svg",    primary: false },
];

const stats = [
  { label: "Location",     value: "Philippines"          },
  { label: "Availability", value: "Remote Worldwide"     },
  { label: "Languages",    value: "Fil & Eng"            },
  { label: "Response",     value: "< 24 Hours"           },
  { label: "Work Type",    value: "Freelance & Full-Time"},
];

const journeyImages = [
  {
    src: "/journey/image1.png",
    alt: "Early days screenshot 1",
    caption: "I contributed to the editing and storytelling of this video for my brother's YouTube channel. It eventually reached over 77K views, and seeing viewers connect with the content was both rewarding and motivating.",
  },
  {
    src: "/journey/image2.png",
    alt: "Early days screenshot 2",
    caption: "I edited this skit from my own raw footage as a fun creative project and a chance to experiment with different editing styles. It eventually reached over 13K views, making it one of my most rewarding personal projects.",
  },
];

const STYLES = `
  @keyframes kiv-hint-blink { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .about-panel { display:none; }
  .about-panel.active { display:block; }

  .about-stat-box {
    display:flex; flex-direction:column; gap:0.2rem;
    padding:0.6rem 0.9rem; border:1px solid #222; border-radius:8px;
    background:rgba(255,255,255,0.015); transition:border-color 0.2s,background 0.2s; cursor:default;
  }
  .about-stat-box:hover { border-color:rgba(200,169,110,0.3); background:rgba(200,169,110,0.04); }
  .about-stat-label { font-family:'Inter',sans-serif; font-weight:400; font-size:0.58rem; letter-spacing:0.18em; text-transform:uppercase; color:#444440; }
  .about-stat-value { font-family:'Syne',sans-serif; font-weight:700; font-size:0.78rem; letter-spacing:0.02em; color:#C8A96E; }

  .about-tool {
    display:inline-flex; align-items:center; gap:0.55rem;
    padding:0.45rem 1rem 0.45rem 0.6rem; border-radius:999px;
    border:1px solid #2A2A2A; background:rgba(255,255,255,0.02);
    font-family:'Inter',sans-serif; font-weight:300; font-size:0.72rem;
    letter-spacing:0.03em; color:#888880;
    transition:border-color 0.25s,color 0.25s,background 0.25s,box-shadow 0.25s;
    cursor:default; white-space:nowrap;
  }
  .about-tool:hover { border-color:rgba(200,169,110,0.35); color:#D4B87A; background:rgba(200,169,110,0.05); box-shadow:0 0 18px rgba(200,169,110,0.09); }
  .about-tool.primary { border-color:rgba(200,169,110,0.45); color:#C8A96E; background:rgba(200,169,110,0.07); box-shadow:0 0 20px rgba(200,169,110,0.1); }
  .about-tool-icon { width:15px; height:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0; opacity:0.75; transition:opacity 0.2s; }
  .about-tool:hover .about-tool-icon, .about-tool.primary .about-tool-icon { opacity:1; }

  .panel-switch-btn {
    display:inline-flex; align-items:center; gap:0.6rem;
    font-family:'Inter',sans-serif; font-weight:400; font-size:0.72rem;
    letter-spacing:0.15em; text-transform:uppercase;
    border:1px solid rgba(200,169,110,0.25); color:rgba(200,169,110,0.7);
    background:transparent; padding:0.75rem 1.5rem; cursor:pointer;
    transition:border-color 0.2s,color 0.2s,background 0.2s;
  }
  .panel-switch-btn:hover { border-color:#C8A96E; color:#C8A96E; background:rgba(200,169,110,0.06); }

  .journey-img-card { display:flex; flex-direction:column; gap:0; border:1px solid #1e1e1e; overflow:hidden; transition:border-color 0.25s; }
  .journey-img-card:hover { border-color:rgba(200,169,110,0.3); }
  .journey-img-slot { height:410px; background:#131313; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; }
  .journey-img-caption { padding:0.65rem 0.85rem; background:#0e0e0e; border-top:1px solid #1e1e1e; font-family:'Inter',sans-serif; font-weight:300; font-size:0.7rem; color:rgba(240,237,232,0.85); line-height:1.6; letter-spacing:0.01em; }

  .panel-tab { display:flex; align-items:center; gap:0.5rem; font-family:'Inter',sans-serif; font-weight:300; font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(240,237,232,0.25); cursor:default; padding:0; transition:color 0.2s; }
  .panel-tab.active { color:#C8A96E; }
  .panel-tab-dot { width:5px; height:5px; border-radius:50%; background:currentColor; transition:transform 0.2s; }
  .panel-tab.active .panel-tab-dot { transform:scale(1.4); }

  .hover-hint { display:flex; }
  @media (max-width:768px) { .hover-hint { display:none !important; } }
  .about-photo-wrap {
    position:relative;
    display:flex; align-items:center; justify-content:center;
    min-height:400px;
  }

  /* ── Photo inner — scales with container ── */
  .about-photo-inner {
    position:relative;
    width:min(440px, 90vw);
    height:min(580px, 75vw);
    z-index:1; cursor:pointer;
    WebkitMaskImage:radial-gradient(ellipse 75% 85% at 50% 42%, black 35%, rgba(0,0,0,0.6) 55%, transparent 72%);
    mask-image:radial-gradient(ellipse 75% 85% at 50% 42%, black 35%, rgba(0,0,0,0.6) 55%, transparent 72%);
    -webkit-mask-image:radial-gradient(ellipse 75% 85% at 50% 42%, black 35%, rgba(0,0,0,0.6) 55%, transparent 72%);
  }

  /* ── Ambient glow — clamp size so never bleeds on mobile ── */
  .about-glow-1 {
    position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
    width:min(500px,90vw); height:min(680px,100vw);
    border-radius:50%;
    background:radial-gradient(ellipse at center, rgba(200,120,40,0.5) 0%, rgba(180,100,30,0.22) 45%, transparent 70%);
    z-index:0; pointer-events:none;
  }
  .about-glow-2 {
    position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
    width:min(380px,75vw); height:min(380px,75vw);
    border-radius:50%;
    background:radial-gradient(ellipse at center, rgba(220,150,60,0.45) 0%, rgba(200,130,50,0.18) 55%, transparent 72%);
    filter:blur(12px);
    z-index:0; pointer-events:none;
  }

  /* ── Responsive ── */
  @media (max-width:768px) {
    .about-grid { grid-template-columns:1fr !important; gap:0 !important; }
    .about-photo-wrap { min-height:280px !important; }
    .about-photo-inner { width:min(320px,85vw) !important; height:min(380px,110vw) !important; }
    .panels-wrap { padding:0 1.25rem 3rem !important; }
    .panel-tabs { padding:1.5rem 1.25rem 0 !important; }
    .journey-grid { grid-template-columns:1fr !important; }
    .journey-img-slot { height:240px !important; }
    .about-tool { font-size:0.65rem !important; padding:0.4rem 0.8rem 0.4rem 0.5rem !important; }
    .panel-switch-btn { font-size:0.65rem !important; padding:0.65rem 1.1rem !important; width:100%; justify-content:center; }
    .about-stat-box { padding:0.5rem 0.75rem !important; }
    .about-stat-value { font-size:0.72rem !important; }
    .journey-header { flex-direction:column !important; align-items:flex-start !important; }
    .panel-switch-btn-back { align-self:flex-start !important; width:auto !important; }
  }

  @media (max-width:480px) {
    .about-photo-inner { height:min(300px,95vw) !important; }
    .journey-img-slot { height:200px !important; }
  }
`;

export default function About() {
  const [panel, setPanel] = useState<"about"|"journey">("about");

  return (
    <>
      <style>{STYLES}</style>
      <section id="about" style={{position:"relative",background:"#141414",borderTop:"1px solid #2A2A2A",overflow:"hidden",scrollMarginTop:"75px"}}>
        <ParticleBackground count={18} color="#C8A96E" />

        {/* Tab indicators */}
        <div className="panel-tabs" style={{position:"relative",zIndex:2,display:"flex",alignItems:"center",justifyContent:"center",gap:"2rem",padding:"2rem 5rem 0"}}>
          <div className={`panel-tab${panel==="about"?" active":""}`}>
            <span className="panel-tab-dot"/>About me
          </div>
          <div style={{width:"1px",height:"12px",background:"rgba(255,255,255,0.08)"}}/>
          <div className={`panel-tab${panel==="journey"?" active":""}`}>
            <span className="panel-tab-dot"/>My Story
          </div>
        </div>

        {/* Panels container */}
        <div className="panels-wrap" style={{position:"relative",zIndex:1,padding:"0 4rem 4rem"}}>

          {/* PANEL 1 — About */}
          <div className={`about-panel${panel==="about"?" active":""}`}>
            <div className="about-grid" style={{maxWidth:"1100px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"stretch"}}>

              {/* LEFT — Photo */}
              <div className="about-photo-wrap">
                <div className="about-glow-1"/>
                <div className="about-glow-2"/>

                <div className="about-photo-inner"
                  onMouseEnter={e=>{
                    const d=e.currentTarget.querySelector(".photo-default") as HTMLElement;
                    const a=e.currentTarget.querySelector(".photo-alt") as HTMLElement;
                    if(d)d.style.opacity="0"; if(a)a.style.opacity="1";
                  }}
                  onMouseLeave={e=>{
                    const d=e.currentTarget.querySelector(".photo-default") as HTMLElement;
                    const a=e.currentTarget.querySelector(".photo-alt") as HTMLElement;
                    if(d)d.style.opacity="1"; if(a)a.style.opacity="0";
                  }}
                >
                  <div className="photo-default" style={{position:"absolute",inset:0,transition:"opacity 0.5s ease"}}>
                    <Image src="/akeno.png" alt="Keano Ivan" fill quality={100} style={{objectFit:"cover",objectPosition:"center top"}}/>
                  </div>
                  <div className="photo-alt" style={{position:"absolute",inset:0,opacity:0,transition:"opacity 0.5s ease"}}>
                    <Image src="/akenoo.png" alt="Keano Ivan" fill quality={100} style={{objectFit:"cover",objectPosition:"center top"}}/>
                  </div>
                </div>

                <div className="hover-hint" style={{position:"absolute",bottom:"16px",left:"50%",transform:"translateX(-50%)",zIndex:3,alignItems:"center",gap:"0.5rem",whiteSpace:"nowrap"}}>
                  <span style={{width:12,height:"1px",background:"rgba(200,169,110,0.4)",display:"inline-block"}}/>
                  <span style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(200,169,110,0.55)",animation:"kiv-hint-blink 2.5s ease-in-out infinite"}}>hover the image</span>
                  <span style={{width:12,height:"1px",background:"rgba(200,169,110,0.4)",display:"inline-block"}}/>
                </div>
              </div>

              {/* RIGHT — Content */}
              <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",paddingTop:"2rem"}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.25rem"}}>
                  <span style={{display:"inline-block",width:24,height:"1px",background:"#C8A96E"}}/>
                  <p style={{fontFamily:"'Inter',sans-serif",fontWeight:400,fontSize:"1rem",letterSpacing:"0.22em",textTransform:"uppercase",color:"#C8A96E",margin:0}}>About me</p>
                </div>

                <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.3rem,2.5vw,1.9rem)",letterSpacing:"-0.03em",lineHeight:1.15,marginBottom:"1.75rem",color:"#F0EDE8"}}>
                  Every frame is{" "}
                  <span style={{background:"linear-gradient(90deg,#C8A96E,#e8c98e)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",fontStyle:"italic"}}>a decision.</span>
                </h2>

                <div style={{borderLeft:"2px solid rgba(200,169,110,0.25)",paddingLeft:"1.25rem",marginBottom:"1.75rem",display:"flex",flexDirection:"column",gap:"0.85rem"}}>
                  <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"1rem",color:"#888880",lineHeight:1.85,margin:0}}>
                    Hi, I'm <span style={{color:"#F0EDE8",fontWeight:500}}>Keano Ivan Pitoy</span>, a video editor and motion designer based in the Philippines, helping creators, brands, and businesses transform raw footage into{" "}
                    <span style={{color:"rgba(200,169,110,0.8)",fontWeight:400}}>meaningful visual experiences.</span>
                  </p>
                  <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"1rem",color:"#888880",lineHeight:1.85,margin:0}}>
                    From <span style={{color:"rgba(200,169,110,0.8)",fontWeight:400}}>talking heads</span> to <span style={{color:"rgba(200,169,110,0.8)",fontWeight:400}}>motion-driven content,</span> I focus on the details that often go unnoticed — the pacing of a cut, the timing of a transition, the rhythm of a story.
                  </p>
                  <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"1rem",color:"#888880",lineHeight:1.85,margin:0}}>
                    Because great videos don't just look good — they <span style={{color:"rgba(200,169,110,0.8)",fontWeight:400}}>communicate, connect, and leave an impact.</span>
                  </p>
                </div>

                <div style={{display:"flex",flexWrap:"wrap",gap:"0.5rem",marginBottom:"1.5rem"}}>
                  {stats.map(s=>(
                    <div key={s.label} className="about-stat-box">
                      <span className="about-stat-label">{s.label}</span>
                      <span className="about-stat-value">{s.value}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"0.9rem"}}>
                    <span style={{fontFamily:"'Inter',sans-serif",fontWeight:400,fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#555550"}}>Tools I use</span>
                    <span style={{flex:1,height:"1px",background:"linear-gradient(to right,#2A2A2A,transparent)"}}/>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"0.5rem",marginBottom:"2rem"}}>
                    {tools.map(t=>(
                      <div key={t.name} className={`about-tool${t.primary?" primary":""}`}>
                        <span className="about-tool-icon"><img src={t.icon} alt={t.name} width={15} height={15} style={{objectFit:"contain",display:"block"}}/></span>
                        {t.name}
                        {t.primary&&<span style={{marginLeft:"0.25rem",fontFamily:"'Inter',sans-serif",fontSize:"0.58rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(200,169,110,0.5)",fontWeight:400}}>· primary</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <button className="panel-switch-btn" onClick={()=>setPanel("journey")}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 8v4l3 3"/></svg>
                  My Story
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>

            </div>
          </div>

          {/* PANEL 2 — Journey */}
          <div className={`about-panel${panel==="journey"?" active":""}`}>
            <div style={{maxWidth:"1100px",margin:"0 auto"}}>

              <div className="journey-header" style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"3rem",flexWrap:"wrap",gap:"1.5rem"}}>
                <div style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
                    <span style={{display:"inline-block",width:24,height:"1px",background:"#C8A96E"}}/>
                    <p style={{fontFamily:"'Inter',sans-serif",fontWeight:400,fontSize:"0.875rem",letterSpacing:"0.22em",textTransform:"uppercase",color:"#C8A96E",margin:0}}>My Story</p>
                  </div>
                  <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.7rem,3.2vw,2.5rem)",letterSpacing:"-0.03em",lineHeight:1.15,color:"#F0EDE8",margin:0}}>
                    It started with{" "}
                    <span style={{color:"transparent",WebkitTextStroke:"1.5px #C8A96E"}}>Roblox.</span>
                  </h2>
                  <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.9rem",color:"rgba(240,237,232,0.4)",lineHeight:1.85,maxWidth:"520px",margin:0}}>
                    In my beginning years, I was editing Roblox skits and dance videos — learning every cut, every transition, every beat drop by feel. No courses, no clients. Just curiosity and a timeline full of blocky characters. Those early edits built the fundamentals that still drive my work today.
                  </p>
                  <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
                    {["Roblox Skits","Dance Videos","Self-taught"].map(tag=>(
                      <span key={tag} style={{fontSize:"0.6rem",letterSpacing:"0.12em",textTransform:"uppercase",padding:"0.32rem 0.75rem",border:"1px solid rgba(200,169,110,0.2)",color:"rgba(200,169,110,0.6)",fontFamily:"'Inter',sans-serif",fontWeight:300}}>{tag}</span>
                    ))}
                  </div>
                </div>
                <button className="panel-switch-btn panel-switch-btn-back" onClick={()=>setPanel("about")} style={{alignSelf:"flex-start"}}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Back to About
                </button>
              </div>

              <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"2rem"}}>
                <div style={{width:36,height:"1px",background:"rgba(200,169,110,0.4)"}}/>
                <span style={{fontSize:"0.55rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(240,237,232,0.15)",fontFamily:"'Inter',sans-serif",fontWeight:300}}>from the archive</span>
                <div style={{flex:1,height:"1px",background:"rgba(255,255,255,0.04)"}}/>
              </div>

              <div className="journey-grid" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"8px"}}>
                {journeyImages.map((img,i)=>(
                  <div key={i} className="journey-img-card">
                    <div className="journey-img-slot">
                      <Image src={img.src} alt={img.alt} fill sizes="(max-width:768px) 100vw, 50vw" style={{objectFit:"contain"}}/>
                    </div>
                    <div className="journey-img-caption">{img.caption}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}