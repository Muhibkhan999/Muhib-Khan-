import { useEffect, useLayoutEffect, useRef } from "react";
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "@/data/works";
import { CLIPS } from "@/data/clips";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// 10 cards per full turn; vertical rise per card = card height + generous gap.
const STEP_DEG = 36;
const STEP_Y = 15; // vw — card height (~10.7vw at 16vw wide, 3:2) + ~4.3vw gap
const CARD_W = 16; // vw on desktop

export function SpatialGallery() {
  const root = useRef<HTMLElement>(null);
  const cards = [...works, ...works.slice(0, 4)];

  useIso(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const n = cards.length - 1;
      const cardEls = gsap.utils.toArray<HTMLElement>("[data-helix-card]", el);
      const counter = el.querySelector<HTMLElement>("[data-helix-count]");
      const label = el.querySelector<HTMLElement>("[data-helix-label]");
      const bar = el.querySelector<HTMLElement>("[data-helix-bar]");
      const state = { p: 0 };

      const paint = () => {
        const active = state.p * n;
        cardEls.forEach((c, i) => {
          const d = Math.abs(i - active);
          // Front card bright and crisp, neighbours recede into dark + soft focus.
          const o = Math.max(0, 1 - d * 0.28);
          c.style.opacity = String(0.08 + o * 0.92);
          c.style.filter = `brightness(${0.35 + o * 0.65}) blur(${Math.min(d * 0.9, 4)}px)`;
        });
        const idx = Math.min(n, Math.round(active));
        if (counter) counter.textContent = String((idx % works.length) + 1).padStart(2, "0");
        if (label) label.textContent = cards[idx].client;
        if (bar) bar.style.transform = `scaleX(${state.p})`;
      };

      gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: `+=${n * 55}%`, pin: true, scrub: 1.4, anticipatePin: 1 },
        onUpdate: paint,
      })
        .fromTo(
          "[data-helix]",
          { rotateY: 0, y: "0vw" },
          { rotateY: -n * STEP_DEG, y: `${-n * STEP_Y}vw`, ease: "none" },
          0,
        )
        .fromTo(state, { p: 0 }, { p: 1, ease: "none" }, 0)
        .fromTo("[data-helix-title]", { opacity: 1, scale: 1 }, { opacity: 0.06, scale: 1.15, ease: "none", duration: 0.2 }, 0);
      paint();
    });
    const r = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(r); mm.revert(); };
  }, [cards.length]);

  return (
    <section ref={root} className="relative h-screen overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_35%,hsl(0_0%_0%/0.85)_100%)]" />
      <p className="text-mono absolute left-6 top-24 z-20 text-paper/60 md:left-10">(03.5) — The archive, spiralling</p>
      <p className="text-mono absolute right-6 top-24 z-20 text-paper/60 md:right-10">scroll ↓ to climb</p>
      <h2
        data-helix-title
        className="text-display pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 text-center text-[16vw] text-paper/10"
      >
        archive.
      </h2>
      <div className="absolute inset-0 flex items-center justify-center [perspective:2400px] [perspective-origin:50%_45%]">
        <div data-helix className="relative h-0 w-0 will-change-transform [transform-style:preserve-3d]">
          {cards.map((w, i) => {
            const clip = CLIPS[i % CLIPS.length];
            return (
              <Link
                key={i}
                data-helix-card
                to="/work/$slug"
                params={{ slug: w.slug }}
                className="group absolute left-0 top-0 block aspect-[3/2] overflow-hidden rounded-[3px] ring-1 ring-paper/15 shadow-[0_40px_80px_-20px_hsl(0_0%_0%/0.9)] [backface-visibility:hidden]"
                style={{
                  width: `clamp(180px, ${CARD_W}vw, 340px)`,
                  transform: `translate(-50%,-50%) translateY(${i * STEP_Y}vw) rotateY(${i * STEP_DEG}deg) translateZ(clamp(260px,28vw,560px))`,
                }}
              >
                <video
                  src={clip.src}
                  poster={clip.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <span className="text-mono absolute left-3 top-3 text-[10px] text-paper/80">{w.n} / {w.year}</span>
                <span className="text-display absolute bottom-3 left-3 text-lg text-paper md:text-xl">{w.client}.</span>
                <span className="text-mono absolute bottom-3 right-3 translate-y-2 text-[10px] text-signal opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">Open →</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="absolute inset-x-6 bottom-8 z-20 flex items-end justify-between gap-6 md:inset-x-10">
        <div>
          <span data-helix-count className="text-display block text-5xl leading-none md:text-7xl">01</span>
          <span data-helix-label className="text-mono mt-2 block text-paper/60">{cards[0].client}</span>
        </div>
        <div className="h-px w-1/3 bg-paper/20">
          <div data-helix-bar className="h-px origin-left scale-x-0 bg-signal" />
        </div>
      </div>
    </section>
  );
}

const QUOTES = [
  { q: "Fast, intuitive, reliable — backed by clean, efficient technology.", who: "Kifayat" },
  { q: "Not just a chatbot. A system that reasons, remembers, speaks and adapts.", who: "MAI" },
  { q: "Where artificial intelligence meets healthcare.", who: "Health Mate" },
  { q: "Mastery over multitasking. One project at a time.", who: "Muhib Khan" },
];

export function QuoteStage() {
  const root = useRef<HTMLElement>(null);

  useIso(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-qs-card]", el);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: `+=${cards.length * 70}%`, pin: true, scrub: 1, anticipatePin: 1 },
      });
      tl.from("[data-qs-word]", { yPercent: 100, opacity: 0, stagger: 0.1, duration: 0.4 }, 0);
      cards.forEach((c, i) => {
        const fromLeft = i % 2 === 0;
        tl.fromTo(
          c,
          { xPercent: fromLeft ? -160 : 160, yPercent: 60, rotate: fromLeft ? -12 : 12 },
          { xPercent: fromLeft ? 160 : -160, yPercent: -60, rotate: fromLeft ? 8 : -8, ease: "none", duration: 1.4 },
          0.3 + i * 0.55,
        );
      });
    });
    const r = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(r); mm.revert(); };
  }, []);

  return (
    <section ref={root} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink py-24 text-paper md:h-screen md:py-0">
      <p className="text-mono absolute left-6 top-24 text-paper/60 md:left-10">(08.5) — Principles</p>
      <div className="relative z-10 text-center">
        <h2 className="text-display overflow-hidden text-[18vw] md:text-[13vw]">
          {["Let's", "build."].map((w) => (
            <span key={w} data-qs-word className="inline-block px-[1vw]">{w}</span>
          ))}
        </h2>
        <a href="#contact" data-magnetic className="pill pill-paper pill-paper-hover mt-8">
          Start a project →
        </a>
      </div>
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
        {QUOTES.map((c, i) => (
          <figure
            key={c.who}
            data-qs-card
            className="absolute w-[26vw] rounded-[3px] border border-paper/40 bg-ink/80 p-6 backdrop-blur-sm will-change-transform"
            style={{ zIndex: i % 2 ? 20 : 5 }}
          >
            <blockquote className="text-xl leading-snug">“{c.q}”</blockquote>
            <figcaption className="text-mono mt-6 text-signal">— {c.who}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
