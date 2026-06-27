"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onEnter = () => ring.classList.add("cursor-hover");
    const onLeave = () => ring.classList.remove("cursor-hover");

    const bind = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    bind();

    // re-bind whenever new interactive elements get added to the page
    const mo = new MutationObserver(bind);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body, a, button { cursor: none !important; }
        }
        .custom-cursor-ring {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(200,169,110,0.5);
          transition: width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .custom-cursor-ring.cursor-hover {
          width: 56px;
          height: 56px;
          background: rgba(200,169,110,0.12);
          border-color: #C8A96E;
        }
        @media (hover: none), (pointer: coarse) {
          .custom-cursor-dot, .custom-cursor-ring { display: none; }
        }
      `}</style>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: "fixed", top: 0, left: 0, width: 6, height: 6,
          borderRadius: "50%", background: "#C8A96E",
          pointerEvents: "none", zIndex: 9999,
          transform: "translate(-100px,-100px)",
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          position: "fixed", top: 0, left: 0,
          pointerEvents: "none", zIndex: 9998,
          transform: "translate(-100px,-100px)",
        }}
      />
    </>
  );
}