"use client";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1.5rem 4rem",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid #2A2A2A" : "1px solid transparent",
      transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
    }}>
      {/* Logo */}
      <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#F0EDE8", margin: 0 }}>
        YN<span style={{ color: "#C8A96E" }}>.</span>
      </p>

      {/* Links */}
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {["work", "about", "certificates", "contact"].map((link) => (
          <a key={link} href={`#${link}`} style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#888880", textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F0EDE8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888880")}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}