"use client";
import { useEffect, useRef, useState } from "react";

function parseValue(value: string) {
  const match = value.match(/[0-9.]+/);
  if (!match) return null;
  const target = parseFloat(match[0]);
  const prefix = value.slice(0, match.index ?? 0);
  const suffix = value.slice((match.index ?? 0) + match[0].length);
  const decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0;
  return { target, prefix, suffix, decimals };
}

export default function CountUp({
  value,
  duration = 1400,
}: {
  value: string;     // e.g. "50+", "3+", "100%"
  duration?: number; // ms
}) {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);
  const [display, setDisplay] = useState(
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value
  );

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = parsed.target * eased;
            setDisplay(`${parsed.prefix}${current.toFixed(parsed.decimals)}${parsed.suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [duration, value, parsed]);

  return <span ref={ref}>{display}</span>;
}