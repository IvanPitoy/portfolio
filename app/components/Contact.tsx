"use client";
import { useState } from "react";

const WEB3FORMS_ACCESS_KEY = "0f4ed891-4a01-4108-aad2-e8312531a05a";
const socials = [
  {
    name: "Instagram",
    handle: "@ivannntco",
    url: "https://www.instagram.com/ivannntco",
    color: "#E1306C",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433"/>
            <stop offset="25%" stopColor="#e6683c"/>
            <stop offset="50%" stopColor="#dc2743"/>
            <stop offset="75%" stopColor="#cc2366"/>
            <stop offset="100%" stopColor="#bc1888"/>
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad)" strokeWidth="1.8" fill="none"/>
        <circle cx="12" cy="12" r="4" stroke="url(#ig-grad)" strokeWidth="1.8" fill="none"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-grad)"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "kivpitoy",
    url: "https://www.facebook.com/kivpitoy/",
    color: "#1877F2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "kivpitoy",
    url: "https://www.linkedin.com/in/kivpitoy",
    color: "#0A66C2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

const STYLES = `
  @keyframes contact-fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes contact-spin { to{transform:rotate(360deg)} }
  @keyframes kiv-pulse-contact { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes kiv-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }

  .contact-input {
    width:100%; background:transparent; border:none; border-bottom:1px solid #2A2A2A;
    padding:0.5rem 0; color:#F0EDE8; font-size:0.9rem; font-family:'Inter',sans-serif;
    font-weight:300; outline:none; transition:border-color 0.2s; resize:none;
  }
  .contact-input::placeholder { color:#444440; }
  .contact-input:focus { border-bottom-color:#C8A96E; }

  .contact-field {
    display:flex; flex-direction:column; gap:0.5rem;
    padding:1.1rem 1.4rem; background:rgba(255,255,255,0.015);
    border:1px solid #1e1e1e; transition:border-color 0.2s;
  }
  .contact-field:focus-within { border-color:rgba(200,169,110,0.3); }
  .contact-field-label {
    font-family:'Inter',sans-serif; font-weight:400; font-size:0.6rem;
    letter-spacing:0.2em; text-transform:uppercase; color:#555550;
  }

  .contact-submit {
    width:100%;
    background:linear-gradient(135deg,#C8A96E 0%,#e8c98e 50%,#b8914e 100%);
    background-size:200% 200%; color:#0A0A0A; border:none; padding:1rem 2rem;
    font-family:'Inter',sans-serif; font-weight:500; font-size:0.75rem;
    letter-spacing:0.14em; text-transform:uppercase; cursor:pointer;
    transition:background-position 0.4s,opacity 0.2s;
    display:flex; align-items:center; justify-content:space-between;
  }
  .contact-submit:hover:not(:disabled) { background-position:right center; opacity:0.9; }
  .contact-submit:disabled { cursor:not-allowed; opacity:0.6; }

  .contact-spinner {
    width:14px; height:14px; border:2px solid rgba(10,10,10,0.3);
    border-top-color:#0A0A0A; border-radius:50%; animation:contact-spin 0.6s linear infinite;
  }
  .contact-error {
    margin-top:0.9rem; padding:0.8rem 1rem;
    border:1px solid rgba(220,80,80,0.35); background:rgba(220,80,80,0.06);
    color:#e08a8a; font-family:'Inter',sans-serif; font-weight:300; font-size:0.8rem; line-height:1.6;
  }

  .social-card {
    display:flex; align-items:center; gap:1rem; padding:0.9rem 1.1rem;
    border:1px solid #1e1e1e; background:rgba(255,255,255,0.015);
    text-decoration:none; transition:border-color 0.2s,background 0.2s,transform 0.15s; color:#888880;
  }
  .social-card:hover { border-color:rgba(200,169,110,0.35); background:rgba(200,169,110,0.04); transform:translateX(4px); color:#C8A96E; }
  .social-icon {
    width:36px; height:36px; border-radius:8px; border:1px solid #2A2A2A;
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0; transition:border-color 0.2s; color:#888880;
  }
  .social-card:hover .social-icon { border-color:rgba(200,169,110,0.4); color:#C8A96E; }
  .kiv-dot-green-contact { width:7px;height:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px rgba(34,197,94,0.6);animation:kiv-pulse-contact 2s ease-in-out infinite;flex-shrink:0; }

  .kiv-watermark-logo {
    font-family:'Syne',sans-serif; font-weight:800; font-size:2.2rem;
    letter-spacing:0.04em; line-height:1; margin:0 0 0.4rem;
    background:linear-gradient(135deg,#C8A96E 0%,#f0d898 45%,#C8A96E 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:kiv-shimmer 4s linear infinite;
    display:inline-block;
  }

  @media(max-width:768px) {
    .contact-grid { grid-template-columns:1fr !important; }
    #contact { padding:3rem 1.25rem 2rem !important; }
    .contact-field { padding:0.9rem 1rem; }
    .contact-name-email-grid { grid-template-columns:1fr !important; }
    .socials-grid { grid-template-columns:1fr !important; }
    .messaging-grid { grid-template-columns:1fr 1fr !important; }
  }
`;

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const handleSubmit = async () => {
    if (!form.name.trim()||!form.email.trim()||!form.message.trim()) {
      setError("Please fill out all fields before sending."); return;
    }
    setSending(true); setError(null);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          access_key:WEB3FORMS_ACCESS_KEY,
          subject:`New Project Inquiry from ${form.name}`,
          from_name:"KIV Inquiries",
          email:form.email, name:form.name, message:form.message,
        }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else setError("Something went wrong sending your message. Please try again or email me directly.");
    } catch {
      setError("Something went wrong sending your message. Please try again or email me directly.");
    } finally { setSending(false); }
  };

  return (
    <>
      <style>{STYLES}</style>
      <section id="contact" style={{position:"relative",padding:"4rem 4rem 3rem",background:"#141414",borderTop:"1px solid #2A2A2A"}}>

        <div style={{position:"absolute",top:0,right:0,width:"500px",height:"500px",pointerEvents:"none",zIndex:0,
          background:"radial-gradient(ellipse at 100% 0%,rgba(200,169,110,0.06) 0%,transparent 65%)"}}/>

        <div style={{position:"relative",zIndex:1,maxWidth:"1100px",margin:"0 auto"}}>

          {/* Header */}
          <div style={{marginBottom:"2rem",marginTop:"0",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"0.5rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
              <span style={{display:"inline-block",width:24,height:"1px",background:"#C8A96E"}}/>
              <p style={{fontFamily:"'Inter',sans-serif",fontWeight:400,fontSize:"0.65rem",letterSpacing:"0.22em",textTransform:"uppercase",color:"#C8A96E",margin:0}}>Get in touch</p>
            </div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(2.2rem,5vw,3.5rem)",letterSpacing:"-0.03em",lineHeight:1.05,color:"#F0EDE8",margin:0}}>
              Let's make{" "}
              <span style={{background:"linear-gradient(90deg,#C8A96E,#e8c98e)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",fontStyle:"italic"}}>something.</span>
            </h2>
            <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.9rem",color:"#888880",lineHeight:1.8,maxWidth:"600px",margin:0}}>
              Have a project in mind? Fill out the form or reach out through any of my socials. I'd be happy to learn more about your project and discuss how I can help.
            </p>
          </div>

          {/* Grid */}
          <div className="contact-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"start"}}>

            {/* LEFT — Form */}
            <div>
              {submitted ? (
                <div style={{border:"1px solid rgba(200,169,110,0.3)",padding:"3rem",textAlign:"center",background:"rgba(200,169,110,0.03)"}}>
                  <div style={{width:40,height:40,borderRadius:"50%",border:"1px solid rgba(200,169,110,0.4)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.25rem"}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <p style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.25rem",color:"#C8A96E",marginBottom:"0.5rem"}}>Message sent.</p>
                  <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.85rem",color:"#888880"}}>Thanks for reaching out. I'll be in touch soon.</p>
                </div>
              ) : (
                <div style={{display:"flex",flexDirection:"column",gap:"2px"}}>
                  <div className="contact-name-email-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px"}}>
                    <div className="contact-field">
                      <label className="contact-field-label">Your name</label>
                      <input className="contact-input" type="text" placeholder="Juan dela Cruz" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                    </div>
                    <div className="contact-field">
                      <label className="contact-field-label">Email</label>
                      <input className="contact-input" type="email" placeholder="juan@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                    </div>
                  </div>
                  <div className="contact-field">
                    <label className="contact-field-label">Your message</label>
                    <textarea className="contact-input" placeholder="Tell me what you're working on..." rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
                  </div>
                  <button className="contact-submit" onClick={handleSubmit} disabled={sending}>
                    <span>{sending?"Sending...":"Send message"}</span>
                    {sending?<span className="contact-spinner"/>:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
                  </button>
                  {error&&<p className="contact-error">{error}</p>}
                </div>
              )}

              {/* Direct email */}
              <p style={{marginTop:"1.25rem",fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.75rem",color:"#888880",display:"flex",alignItems:"center",gap:"0.5rem",flexWrap:"wrap"}}>
                Or email directly:{" "}
                <span style={{display:"inline-flex",alignItems:"center",gap:"0.35rem",color:"#C8A96E",fontWeight:400}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  keanoivanpitoy@gmail.com
                </span>
              </p>

              {/* KIV Brand Watermark */}
              <div style={{marginTop:"2.5rem",paddingTop:"2rem",borderTop:"1px solid #1a1a1a"}}>
                <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.62rem",letterSpacing:"0.22em",textTransform:"uppercase",color:"#666660",margin:"0 0 0.5rem"}}>Crafted by</p>
                <p style={{
                  fontFamily:"'Syne',sans-serif",fontWeight:800,
                  fontSize:"clamp(3.5rem,7vw,6rem)",
                  letterSpacing:"-0.02em",lineHeight:0.9,margin:"0 0 0.5rem",
                  background:"linear-gradient(135deg,#C8A96E 0%,#f0d898 45%,#C8A96E 100%)",
                  backgroundSize:"200% auto",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
                  animation:"kiv-shimmer 4s linear infinite",
                }}>KIV<span style={{WebkitTextFillColor:"#C8A96E",color:"#C8A96E"}}>.</span></p>
                <p style={{fontFamily:"'Inter',sans-serif",fontWeight:400,fontSize:"0.65rem",letterSpacing:"0.28em",textTransform:"uppercase",color:"#888880",margin:0}}>Keep Innovating Visuals</p>
              </div>
            </div>

            {/* RIGHT — Socials + Info */}
            <div style={{display:"flex",flexDirection:"column",gap:"2.5rem"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:"0.55rem",background:"rgba(10,10,10,0.7)",backdropFilter:"blur(10px)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:"999px",padding:"0.5rem 1.2rem 0.5rem 0.8rem",width:"fit-content"}}>
                <div className="kiv-dot-green-contact"/>
                <span style={{fontFamily:"'Inter',sans-serif",fontWeight:400,fontSize:"0.78rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(240,237,232,0.75)"}}>Available for new projects</span>
              </div>

              <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                <p style={{fontFamily:"'Inter',sans-serif",fontWeight:400,fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#888880",marginBottom:"0.35rem"}}>Find me on</p>
                <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.75rem",color:"#888880",lineHeight:1.7,margin:"0 0 0.75rem",borderLeft:"1px solid rgba(200,169,110,0.2)",paddingLeft:"0.75rem"}}>
                  This is where I'm usually active — feel free to reach out or send a message.
                </p>

                {/* Socials 3-column grid */}
                <div className="socials-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0.5rem"}}>
                  {socials.map(s=>(
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="social-card" style={{flexDirection:"column",alignItems:"flex-start",gap:"0.5rem",padding:"0.75rem"}}>
                      <span className="social-icon" style={{borderColor:"#2A2A2A"}}>{s.icon}</span>
                      <div style={{display:"flex",flexDirection:"column",gap:"0.1rem"}}>
                        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.78rem",color:"#F0EDE8",letterSpacing:"0.02em"}}>{s.name}</span>
                        <span style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.65rem",color:"#888880",letterSpacing:"0.03em"}}>{s.handle}</span>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Messaging row — Telegram + WhatsApp */}
                <div className="messaging-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.5rem",marginTop:"0.5rem"}}>

                  {/* Telegram */}
                  <div style={{border:"1px solid #1e1e1e",background:"rgba(255,255,255,0.015)"}}>
                    <button
                      type="button"
                      onClick={()=>{ window.open("http://t.me/naviioneak", "_blank"); }}
                      style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"0.5rem",padding:"0.75rem",background:"transparent",border:"none",cursor:"pointer"}}
                    >
                      <span style={{width:36,height:36,borderRadius:8,border:"1px solid #2A2A2A",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#29B6F6">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.982l-2.965-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.983.577z"/>
                        </svg>
                      </span>
                      <div style={{display:"flex",flexDirection:"column",gap:"0.1rem"}}>
                        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.78rem",color:"#F0EDE8"}}>Telegram</span>
                        <span style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.65rem",color:"#888880"}}>@naviioneak</span>
                      </div>
                    </button>
                  </div>

                  {/* WhatsApp */}
                  <div style={{border:"1px solid #1e1e1e",background:"rgba(255,255,255,0.015)"}}>
                    <button
                      type="button"
                      onClick={()=>{ const el=document.getElementById("wa-modal"); if(el) el.style.display="flex"; }}
                      style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"0.5rem",padding:"0.75rem",background:"transparent",border:"none",cursor:"pointer"}}
                    >
                      <span style={{width:36,height:36,borderRadius:8,border:"1px solid #2A2A2A",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                        </svg>
                      </span>
                      <div style={{display:"flex",flexDirection:"column",gap:"0.1rem"}}>
                        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.78rem",color:"#F0EDE8"}}>WhatsApp</span>
                        <span style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.65rem",color:"#888880"}}>Scan QR to connect</span>
                      </div>
                    </button>
                  </div>

                </div>
              </div>

              {/* WhatsApp QR Modal */}
              <div id="wa-modal" onClick={()=>{ const el=document.getElementById("wa-modal"); if(el) el.style.display="none"; }} style={{
                display:"none",position:"fixed",inset:0,zIndex:999,
                background:"rgba(0,0,0,0.85)",backdropFilter:"blur(8px)",
                alignItems:"center",justifyContent:"center",
              }}>
                <div onClick={e=>e.stopPropagation()} style={{
                  background:"#0A0A0A",border:"1px solid rgba(200,169,110,0.3)",borderRadius:"24px",
                  width:"min(320px,90vw)",padding:"2rem",
                  display:"flex",flexDirection:"column",alignItems:"center",gap:"1.25rem",
                  boxShadow:"0 0 60px rgba(200,169,110,0.1), 0 24px 64px rgba(0,0,0,0.6)",
                }}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                    <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.85rem",color:"#F0EDE8"}}>WhatsApp</span>
                  </div>
                  <div style={{background:"#fff",padding:"1rem",borderRadius:"12px",width:"220px",height:"220px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <img src="/qr/qr-2.png" alt="WhatsApp QR" style={{width:"120%",height:"120%",objectFit:"contain"}}/>
                  </div>
                  <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.72rem",color:"#888880",margin:0,textAlign:"center",lineHeight:1.6}}>
                    Open your phone camera and point it at the QR code to open WhatsApp.
                  </p>
                  <button type="button" onClick={()=>{ const el=document.getElementById("wa-modal"); if(el) el.style.display="none"; }} style={{
                    fontFamily:"'Inter',sans-serif",fontWeight:400,fontSize:"0.7rem",
                    letterSpacing:"0.1em",textTransform:"uppercase",
                    color:"#666660",background:"transparent",border:"1px solid #2A2A2A",
                    padding:"0.5rem 1.5rem",cursor:"pointer",
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="#C8A96E";e.currentTarget.style.color="#C8A96E";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#2A2A2A";e.currentTarget.style.color="#666660";}}
                  >
                    Close
                  </button>
                </div>
              </div>

              <div style={{width:"100%",height:"1px",background:"linear-gradient(to right,rgba(200,169,110,0.2),transparent)"}}/>

              <div style={{display:"flex",flexDirection:"column",gap:"0.4rem"}}>
                <p style={{fontFamily:"'Inter',sans-serif",fontWeight:400,fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#555550",margin:0}}>Response time</p>
                <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",color:"#C8A96E",margin:0}}>Within 24 hours</p>
                <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.78rem",color:"#888880",lineHeight:1.7,margin:0}}>Based in the Philippines · Remote worldwide · Open to freelance & collaborations</p>
                <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"0.75rem",color:"#6a6a64",lineHeight:1.75,margin:"0.5rem 0 0",borderLeft:"1px solid rgba(200,169,110,0.2)",paddingLeft:"0.75rem"}}>
                  I aim to respond within 24 hours. If you don't hear back, feel free to follow up — I might be heads-down on a project but I'll always get back to you.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}