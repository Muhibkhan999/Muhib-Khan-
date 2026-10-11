import { useEffect, useRef, useState } from "react";

export function MicroInteractions() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${targetX}px,${targetY}px,0)`;
    };
    const tick = () => {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      frame = requestAnimationFrame(tick);
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [data-magnetic]");
      cursorRef.current?.classList.toggle("is-active", Boolean(interactive));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    if (finePointer && !reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("mouseover", onOver);
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60] hidden items-end gap-3 md:flex" aria-hidden="true">
        <span className="text-mono text-paper mix-blend-difference">
          {String(Math.round(progress * 100)).padStart(2, "0")}
        </span>
        <div className="h-24 w-px bg-paper/30 mix-blend-difference">
          <div className="w-full origin-top bg-paper" style={{ height: `${progress * 100}%` }} />
        </div>
      </div>
      <div ref={cursorRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}