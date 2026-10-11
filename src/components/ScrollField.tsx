import { useEffect, useRef } from "react";

/**
 * A quiet, editorial scroll field: thin contour lines that stretch, drift and
 * tighten with scroll velocity. 2D canvas, mix-blend-difference, never covers
 * type. No WebGL, no heavy geometry.
 */
export default function ScrollField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastScroll = window.scrollY;
    let velocity = 0;
    let smoothVelocity = 0;
    let time = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onScroll = () => {
      const y = window.scrollY;
      velocity = y - lastScroll;
      lastScroll = y;
    };

    const lineCount = window.innerWidth < 768 ? 7 : 13;

    let skewS = 0;
    const draw = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? lastScroll / max : 0;
      smoothVelocity += (velocity - smoothVelocity) * 0.06;
      velocity *= 0.9;
      const speed = Math.min(Math.abs(smoothVelocity), 80);
      time += 0.006 + speed * 0.0005;

      ctx.clearRect(0, 0, width, height);

      // Idle swell + scroll-driven crest amplification
      const amp = 18 + speed * 1.4;
      // Wavelength tightens as you scroll, morphs with page depth
      const k = 1 + speed * 0.012 + Math.sin(progress * Math.PI * 2) * 0.25;
      skewS += (Math.max(-1, Math.min(1, smoothVelocity / 60)) - skewS) * 0.06;
      const skew = skewS;

      for (let i = 0; i < lineCount; i += 1) {
        const t = i / (lineCount - 1);
        const baseY = height * (0.12 + t * 0.76) - ((lastScroll * 0.05) % (height * 0.06));
        const isSignal = i === Math.round((lineCount - 1) * (0.25 + progress * 0.5));

        ctx.beginPath();
        for (let x = -40; x <= width + 40; x += 10) {
          const n =
            Math.sin(x * 0.002 * k + time * 1.1 + i * 0.35) * 0.55 +
            Math.sin(x * 0.006 * k - time * 1.9 + i * 0.6) * 0.3 +
            Math.sin(x * 0.018 * k + time * 3.2 + i) * 0.15 * (0.3 + speed / 80);
          const fade = Math.sin(t * Math.PI);
          const y = baseY + n * amp * fade + skew * (x - width / 2) * 0.06 * fade;
          if (x === -40) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = isSignal ? 1.6 : 1;
        ctx.strokeStyle = isSignal
          ? "rgba(0, 130, 243, 0.55)"
          : `rgba(0, 0, 0, ${0.05 + Math.sin(t * Math.PI) * 0.07})`;
        ctx.stroke();
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    if (reduced) {
      draw();
      cancelAnimationFrame(frame);
    } else {
      frame = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5]"
    />
  );
}
