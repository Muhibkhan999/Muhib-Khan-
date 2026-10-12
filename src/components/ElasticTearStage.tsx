import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CheesePullScene = lazy(() => import("./CheesePullScene"));
const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ElasticTearStage() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [visible, setVisible] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => {
      setDesktop(media.matches);
      if (media.matches) void import("./CheesePullScene");
    };
    update();
    media.addEventListener("change", update);
    return () => { media.removeEventListener("change", update); };
  }, []);

  useIso(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add({ large: "(min-width: 1024px)", motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) {
        progress.current = 1;
        return;
      }
      const large = ctx.conditions.large;
      progress.current = 0;
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "cheese-pull", trigger: el,
          start: large ? "top top" : "top 75%",
          end: large ? "+=400%" : "bottom 75%",
          pin: Boolean(large), pinSpacing: true, scrub: large ? 1.2 : 0.6,
          anticipatePin: 1, invalidateOnRefresh: true,
          onToggle: self => setVisible(self.isActive),
          onUpdate: self => setVisible(self.isActive),
        },
        onUpdate: () => { el.dataset.tearProgress = progress.current.toFixed(3); },
      });
      tl.to(progress, { current: 1, duration: 1, ease: "none" }, 0)
        .fromTo("[data-tear-name]", { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.17, stagger: 0.025, ease: "power3.out" }, 0.85)
        .fromTo("[data-tear-role]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.1 }, 0.92)
        .to("[data-tear-scene]", { opacity: 0.22, duration: 0.18 }, 0.85);
      if (!large) {
        tl.to(".tear-lobe-left", { xPercent: -60, scaleX: 0.8, duration: 0.6, ease: "none" }, 0.12)
          .to(".tear-lobe-right", { xPercent: 60, scaleX: 0.8, duration: 0.6, ease: "none" }, 0.12);
      }
    }, el);
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(frame); mm.revert(); };
  }, []);

  return (
    <section ref={root} id="name-reveal" aria-label="Muhib Khan" className="tear-stage relative isolate overflow-hidden bg-ink text-paper">
      <div className="absolute inset-x-6 top-24 flex items-center justify-between gap-4 text-mono text-paper/50 md:inset-x-10">
        <span>(02) — Becoming</span><span>MUHIB / KHAN</span>
      </div>
      <div data-tear-scene className="absolute inset-0" aria-hidden="true">
        <div className={`tear-simple ${desktop ? "tear-simple-hidden" : ""}`}>
          <div className="tear-lobe tear-lobe-left" />
          <div className="tear-lobe tear-lobe-right" />
        </div>
        {desktop && <Suspense fallback={null}><CheesePullScene progress={progress} active={visible} onReady={() => setSceneReady(true)} /></Suspense>}
      </div>
      <div className="tear-name-layout pointer-events-none absolute inset-0 flex flex-col justify-center items-center px-6 md:px-10">
        <h2 className="tear-name-grid flex items-center gap-4" aria-label="Muhib Khan">
          <span className="overflow-hidden"><span data-tear-name className="tear-name block">MUHIB</span></span>
          <span className="overflow-hidden"><span data-tear-name className="tear-name block">KHAN</span></span>
        </h2>
        <p data-tear-role className="mt-6 text-center text-mono text-paper/60">MERN Stack Web Developer</p>
      </div>
      <div className="absolute inset-x-6 bottom-10 md:inset-x-10">
        <p className="text-mono text-paper/40">Muhammad Muhib Khan</p>
      </div>
    </section>
  );
}