"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.5 });
    (window as any).__lenis = lenis;
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Work />
      <About />
      <Contact />
      <style>{`@keyframes kiv-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }`}</style>
<footer style={{
  borderTop: "1px solid #1a1a1a",
  padding: "1.5rem 4rem",
  display: "flex", justifyContent: "space-between", alignItems: "center",
  background: "#0d0d0d",
}}>
  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.68rem", color: "#888880", margin: 0, textAlign: "left", letterSpacing: "0.04em" }}>
  © {new Date().getFullYear()} <span style={{ color: "#C8A96E" }}>KIV.</span> All rights reserved.{" "}
  <span style={{ color: "#666660" }}>Designed by</span>{" "}
  <span style={{ color: "#F0EDE8", fontWeight: 400 }}>Cathyrine Zamora</span>
  <span style={{ color: "#666660" }}> &amp; Developed by</span>{" "}
  <span style={{ color: "#F0EDE8", fontWeight: 400 }}>Keano Ivan Pitoy</span>
</p>

  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.9rem", margin: 0, color: "#C8A96E" }}>
  KIV<span>.</span>
</p>
</footer>
    </>
  );
}