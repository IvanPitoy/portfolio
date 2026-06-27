"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  color: string;
}

export default function ParticleBackground({ count = 18, color = "#C8A96E" }: { count?: number; color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let scrollY = 0;
    let particles: Particle[] = [];
    let running = false;
    let lastTime = 0;
    const FPS = 30;
    const interval = 1000 / FPS;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 90 + 20,
        alpha: 0,
        targetAlpha: Math.random() * 0.12 + 0.04,
        color,
      }));
    };

    const onScroll = () => { scrollY = window.scrollY; };

    const draw = (now: number) => {
      if (!running) return;
      animId = requestAnimationFrame(draw);
      if (now - lastTime < interval) return;
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollInfluence = (scrollY % canvas.height) / canvas.height;

      particles.forEach((p, i) => {
        p.x += p.vx + Math.sin(scrollInfluence * Math.PI * 2 + i) * 0.08;
        p.y += p.vy + Math.cos(scrollInfluence * Math.PI * 2 + i) * 0.08;

        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
        if (p.y > canvas.height + p.radius) p.y = -p.radius;

        p.alpha += (p.targetAlpha - p.alpha) * 0.03;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(${hexToRgb(p.color)},${p.alpha})`);
        grad.addColorStop(1, `rgba(${hexToRgb(p.color)},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
    };

    // IntersectionObserver — pause when off screen, resume when visible
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        animId = requestAnimationFrame(draw);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(animId);
      }
    }, { threshold: 0.1 });

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    obs.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, [count, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        willChange: "transform",
      }}
    />
  );
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}