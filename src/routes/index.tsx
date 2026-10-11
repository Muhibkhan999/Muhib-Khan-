import { CLIPS } from "@/data/clips";
import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll } from "@/components/SmoothScroll";

import { DynamicIsland } from "@/components/DynamicIsland";
import { ElasticTearStage } from "@/components/ElasticTearStage";
const ScrollField = lazy(() => import("@/components/ScrollField"));

import heroObject from "@/assets/hero-object.jpg";
import obj1 from "@/assets/obj-1.png";
import obj2 from "@/assets/obj-2.png";
import obj3 from "@/assets/obj-3.png";
import obj4 from "@/assets/obj-4.png";
import { works } from "@/data/works";
import { SpatialGallery, QuoteStage } from "@/components/PinnedChapters";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Muhib Khan — MERN Stack Web Developer" },
      {
        name: "description",
        content:
          "Portfolio of Muhammad Muhib Khan, a Karachi-based MERN stack developer and co-founder of Kifayat, building fast, clean web apps with React, Node.js and MongoDB.",
      },
      { property: "og:title", content: "Muhammad Muhib Khan — MERN Stack Web Developer" },
      {
        property: "og:description",
        content:
          "Karachi-based MERN stack developer and co-founder of Kifayat. React, Node.js, MongoDB, AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;


function Index() {
  return (
    <SmoothScroll>
      <ClientOnly fallback={null}>
        <Suspense fallback={null}>
          <ScrollField />
        </Suspense>
      </ClientOnly>
      <div className="min-h-screen bg-background text-foreground overflow-x-clip">
        <DynamicIsland />
        <Hero />
        <ElasticTearStage />
        <MarqueeBand />
        <Manifesto />
        <WorksHorizontal />
        <SpatialGallery />
        <Approach />
        <Process />
        <FieldNotes />
        <Ethos />
        <Testimonials />
        <QuoteStage />
        <Clients />
        <Studio />
        <Recognition />
        <Journal />
        <FAQ />
        <Availability />
        <Contact />
        <Colophon />
        <Footer />
      </div>
    </SmoothScroll>
  );
}


function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 text-paper md:px-10">
        <a href="#top" className="text-display text-xl tracking-tight">
          muhib<span className="text-signal">.</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#manifesto" className="text-sm hover:opacity-60">about</a>
          <a href="#works" className="text-sm hover:opacity-60">works</a>
          <a href="#contact" className="text-sm hover:opacity-60">contact</a>
          <span className="text-mono opacity-60">karachi, pk</span>
        </nav>
        <a
          href="#contact"
          className="pill hidden md:inline-flex border-paper text-paper hover:bg-paper hover:text-ink transition"
          style={{ borderColor: "currentColor" }}
        >
          Hire me
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — pinned, layered cutouts, staggered rise                      */
/* ------------------------------------------------------------------ */
function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      // Intro
      gsap.from("[data-hero-rise]", {
        yPercent: 120,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
      });
      gsap.from("[data-hero-float]", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.15,
      });

      // Pin the hero, parallax the objects out
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current!,
          start: "top top",
          end: "+=180%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      pinTl
        .to("[data-hero-title]", { yPercent: -18, ease: "none" }, 0)
        .to("[data-hero-obj-a]", { yPercent: -55, xPercent: -10, rotate: -22, ease: "none" }, 0)
        .to("[data-hero-obj-b]", { yPercent: -45, xPercent: -18, rotate: 25, ease: "none" }, 0)
        .to("[data-hero-obj-c]", { yPercent: -70, xPercent: 18, rotate: -32, ease: "none" }, 0)
        .to("[data-hero-main]", { yPercent: -12, scale: 1.05, ease: "none" }, 0)
        .to("[data-hero-fade]", { opacity: 0, ease: "none" }, 0.35);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Floating cutouts */}
      <img
        data-hero-float
        data-hero-obj-a
        src={obj2}
        alt=""
        width={900}
        height={900}
        className="pointer-events-none absolute left-[-4vw] top-[14vh] w-[24vw] max-w-[320px] rotate-[8deg] select-none"
      />
      <img
        data-hero-float
        data-hero-obj-b
        src={obj3}
        alt=""
        width={900}
        height={900}
        className="pointer-events-none absolute right-[2vw] top-[10vh] w-[20vw] max-w-[280px] -rotate-[10deg] select-none"
      />
      <img
        data-hero-float
        data-hero-obj-c
        src={obj4}
        alt=""
        width={900}
        height={900}
        className="pointer-events-none absolute bottom-[22vh] right-[10vw] w-[16vw] max-w-[220px] rotate-[18deg] select-none hidden md:block"
      />
      <img
        data-hero-main
        data-hero-float
        src={heroObject}
        alt=""
        width={1400}
        height={1400}
        className="pointer-events-none absolute bottom-[8vh] left-1/2 w-[46vw] max-w-[520px] -translate-x-1/2 select-none opacity-95"
      />

      {/* Chrome */}
      <div data-hero-fade className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto flex max-w-[1600px] items-end justify-between px-6 pt-24 md:px-10 md:pt-28">
        <p className="text-mono text-muted-foreground overflow-hidden">
          <span className="inline-block" data-hero-rise>
            (01) — Muhammad Muhib Khan · MERN Stack Web Developer
          </span>
        </p>
        <p className="text-mono text-muted-foreground hidden md:block overflow-hidden">
          <span className="inline-block" data-hero-rise>
            24.8607° N, 67.0011° E — Karachi
          </span>
        </p>
      </div>

      {/* Center manifesto title */}
      <div
        data-hero-title
        className="pointer-events-none relative z-20 flex h-full items-center justify-center px-4"
      >
        <h1 className="text-display text-center leading-[0.86] text-[17vw] md:text-[13vw]">
          <span className="block overflow-hidden">
            <span className="inline-block" data-hero-rise>
              I&nbsp;build
            </span>
          </span>
          <span className="block overflow-hidden italic font-normal">
            <span className="inline-block" data-hero-rise>
              the&nbsp;web,
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="inline-block" data-hero-rise>
              end&nbsp;to&nbsp;end.
            </span>
          </span>
        </h1>
      </div>

      {/* Bottom bar */}
      <div data-hero-fade className="pointer-events-none absolute inset-x-0 bottom-0 z-30 mx-auto flex max-w-[1600px] items-end justify-between gap-6 px-6 pb-8 md:px-10 md:pb-10">
        <p className="max-w-xs text-sm leading-relaxed text-foreground/80 overflow-hidden">
          <span className="inline-block" data-hero-rise>
            Full-stack MERN developer, co-founder of Kifayat. React on the
            front, Node and MongoDB behind it, AI where it actually helps.
          </span>
        </p>
        <div className="pointer-events-auto flex items-center gap-3 overflow-hidden">
          <a href="#contact" className="pill pill-ink pill-ink-hover" data-hero-rise>
            See my work →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */
function MarqueeBand() {
  const words = ["MongoDB", "Express", "React", "Node.js", "Supabase", "AI"];
  return (
    <div className="relative overflow-hidden border-y border-border bg-background py-6">
      <div className="marquee-track flex w-max gap-16 whitespace-nowrap">
        {[...words, ...words, ...words].map((w, i) => (
          <span
            key={i}
            className={`text-display text-6xl md:text-8xl ${
              i % 2 === 0 ? "" : "italic font-normal opacity-40"
            }`}
          >
            {w} &nbsp;·
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Manifesto — pinned column with staggered lines                      */
/* ------------------------------------------------------------------ */
function Manifesto() {
  const rootRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal-line]").forEach((el) => {
        gsap.from(el, {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-fade-up]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={rootRef}
      className="relative border-t border-border bg-background"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 py-28 md:grid-cols-12 md:px-10 md:py-40">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <p className="text-mono text-muted-foreground" data-fade-up>
              (02) — About
            </p>
            <p className="mt-8 text-sm leading-relaxed text-foreground/80" data-fade-up>
              I'm Muhammad Muhib Khan — a full-stack MERN developer from
              Karachi, trained at SMIT, with 2+ years of building for the web.
              I started young and never really stopped.
            </p>
            <img
              src={obj1}
              alt=""
              width={900}
              height={900}
              className="mt-12 hidden w-40 md:block"
              data-fade-up
            />
          </div>
        </div>

        <div className="md:col-span-8">
          <h2 className="text-display text-4xl md:text-[7vw] md:leading-[0.92]">
            <span className="block overflow-hidden">
              <span className="inline-block" data-reveal-line>Age is a number.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block" data-reveal-line>Shipping is</span>
            </span>
            <span className="block overflow-hidden italic font-normal opacity-50">
              <span className="inline-block" data-reveal-line>the real résumé.</span>
            </span>
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            {[
              [
                "Full-stack, for real",
                "MongoDB, Express, React and Node.js — from the database schema to the last hover state. Plus Supabase, Python, HTML, CSS and JSX when the job calls for it.",
              ],
              [
                "Co-founder mindset",
                "At Kifayat I lead the frontend, manage the domains and read the data. I think about the business, not just the ticket.",
              ],
              [
                "AI where it helps",
                "From MAI, a multimodal AI platform, to Health Mate's report analysis — I build AI into products people can actually use.",
              ],
              [
                "Sustainable pace",
                "90-minute focus sprints, one project at a time, progress journalled daily. Burnout taught me that consistency beats intensity.",
              ],
            ].map(([title, body]) => (
              <div key={title as string} data-fade-up>
                <p className="text-mono text-muted-foreground">— {title}</p>
                <p className="mt-4 text-lg leading-snug">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Works — pinned cinema stack: each film wipes up over the last       */
/* ------------------------------------------------------------------ */
function WorksHorizontal() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-cine]");
        const items = gsap.utils.toArray<HTMLElement>("[data-cine-item]");
        const bar = rootRef.current!.querySelector<HTMLElement>("[data-cine-bar]");
        const count = rootRef.current!.querySelector<HTMLElement>("[data-cine-count]");
        const setActive = (idx: number) => {
          items.forEach((it, i) => it.classList.toggle("is-active", i === idx));
          if (count) count.textContent = String(idx + 1).padStart(2, "0");
        };
        setActive(0);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: () => "+=" + layers.length * window.innerHeight * 1.5,
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (s) => {
              if (bar) bar.style.transform = `scaleY(${s.progress})`;
              setActive(Math.min(layers.length - 1, Math.floor(s.progress * layers.length * 0.999 + 0.35)));
            },
          },
        });

        // Intro: the first frame opens from a small window to full bleed.
        tl.fromTo(layers[0], { clipPath: "inset(30% 34% 30% 34% round 3px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut" }, 0)
          .fromTo(layers[0].querySelector("video"), { scale: 1.35 }, { scale: 1, ease: "power2.out" }, 0)
          .fromTo("[data-cine-intro]", { opacity: 1, y: 0 }, { opacity: 0, y: -80, ease: "power1.in", duration: 0.8 }, 0.3);

        layers.forEach((layer, i) => {
          const title = layer.querySelectorAll("[data-cine-title] span");
          tl.fromTo(title, { yPercent: 110 }, { yPercent: 0, stagger: 0.06, ease: "expo.out", duration: 0.5 }, i === 0 ? 0.6 : ">-0.35");
          if (i === layers.length - 1) return;
          const next = layers[i + 1];
          tl.fromTo(next, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power3.inOut", duration: 1 }, "+=0.4")
            .fromTo(next.querySelector("video"), { scale: 1.4, yPercent: 12 }, { scale: 1, yPercent: 0, ease: "power3.out", duration: 1 }, "<")
            .to(layer.querySelector("video"), { scale: 0.9, yPercent: -10, filter: "brightness(0.3)", ease: "power2.in", duration: 1 }, "<");
        });
        tl.to({}, { duration: 0.4 });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="works" className="relative bg-ink text-paper">
      <div ref={rootRef} className="relative h-screen w-full overflow-hidden">
        {works.map((w, i) => {
          const clip = CLIPS[i % CLIPS.length];
          return (
            <Link
              key={w.slug}
              data-cine
              to="/work/$slug"
              params={{ slug: w.slug }}
              aria-label={`${w.client} — ${w.title}`}
              className="group absolute inset-0 block overflow-hidden"
              style={{ zIndex: i + 1, clipPath: i === 0 ? undefined : "inset(100% 0% 0% 0%)" }}
            >
              <video
                src={clip.src}
                poster={clip.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover will-change-transform"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/40" />
              <div className="absolute inset-x-6 bottom-10 flex items-end justify-between gap-8 md:inset-x-10 md:bottom-14 md:left-[18vw]">
                <div>
                  <p className="text-mono mb-4 text-paper/70">{w.n} — {w.tag} — {w.year}</p>
                  <h3 data-cine-title className="text-display text-[12vw] leading-[0.85] md:text-[8.5vw]">
                    <span className="block overflow-hidden"><span className="block">{w.client}</span></span>
                    <span className="block overflow-hidden"><span className="block italic font-normal text-paper/50">{w.title}.</span></span>
                  </h3>
                </div>
                <span className="pill hidden shrink-0 bg-paper text-ink transition-transform duration-500 group-hover:-translate-y-1 md:inline-flex">
                  View project →
                </span>
              </div>
            </Link>
          );
        })}

        {/* Intro type, sits over the opening window */}
        <div data-cine-intro className="pointer-events-none absolute inset-0 z-[40] flex flex-col items-center justify-center text-center mix-blend-difference">
          <p className="text-mono mb-6 text-paper/70">(03) — Selected works</p>
          <h2 className="text-display text-[15vw] leading-[0.82] md:text-[11vw]">
            Things I&#39;ve<br /><span className="italic font-normal">shipped.</span>
          </h2>
        </div>

        {/* Index rail */}
        <aside className="absolute left-6 top-28 z-[50] hidden md:left-10 md:block">
          <p className="text-mono mb-6 text-paper/60">Index</p>
          <ol className="space-y-2">
            {works.map((w, i) => (
              <li key={w.slug} data-cine-item className="cine-item text-mono flex items-center gap-3 text-paper/35 transition-all duration-500">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="cine-dash h-px w-3 bg-current transition-all duration-500" />
                <span>{w.client}</span>
              </li>
            ))}
          </ol>
        </aside>
        <div className="absolute right-6 top-28 z-[50] flex flex-col items-end gap-4 md:right-10">
          <span data-cine-count className="text-display text-5xl leading-none md:text-7xl">01</span>
          <span className="text-mono text-paper/60">/ {String(works.length).padStart(2, "0")}</span>
          <span className="relative h-24 w-px bg-paper/20">
            <span data-cine-bar className="absolute inset-0 origin-top scale-y-0 bg-signal" />
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Studio — dark inverted section                                      */
/* ------------------------------------------------------------------ */
function Studio() {
  const rootRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-studio-num]").forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          delay: i * 0.05,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-t border-border bg-foreground text-background"
    >
      <img
        src={obj1}
        alt=""
        width={900}
        height={900}
        className="pointer-events-none absolute -right-10 top-10 w-72 opacity-90"
      />
      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 py-28 md:grid-cols-12 md:px-10 md:py-40">
        <p className="text-mono opacity-60 md:col-span-3">(15) — By the numbers</p>
        <div className="md:col-span-9">
          <h2 className="text-display text-4xl md:text-[6.5vw] md:leading-[0.92]">
            One developer,
            <br />
            a lot of commits,
            <br />
            <span className="italic font-normal opacity-50">
              and a habit of finishing things.
            </span>
          </h2>
          <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">
            {[
              ["2+", "years building"],
              ["03", "shipped products"],
              ["01", "startup co-founded"],
              ["1.1k", "linkedin followers"],
            ].map(([n, l]) => (
              <div key={l as string} data-studio-num>
                <p className="text-display text-5xl md:text-8xl">{n}</p>
                <p className="text-mono mt-3 opacity-60">{l}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-3">
            {["react", "node.js", "express", "mongodb", "supabase", "python", "ai integration"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-[120px] border border-background/40 px-4 py-2 text-sm"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact — pinned final statement                                    */
/* ------------------------------------------------------------------ */
function Contact() {
  const rootRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-contact-line]").forEach((el) => {
        gsap.from(el, {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative border-t border-border bg-background"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-32 text-center md:px-10 md:py-48">
        <p className="text-mono text-muted-foreground">(99) — Let&#39;s build</p>
        <h2 className="text-display mx-auto mt-10 max-w-6xl text-5xl md:text-[11vw] md:leading-[0.9]">
          <span className="block overflow-hidden">
            <span className="inline-block" data-contact-line>Got a&nbsp;project?</span>
          </span>
          <span className="block overflow-hidden italic font-normal opacity-50">
            <span className="inline-block" data-contact-line>Let&#39;s ship it.</span>
          </span>
        </h2>
        <p className="mx-auto mt-12 max-w-lg text-base text-foreground/80">
          Open to freelance work, internships and collaborations. Send me a
          message on LinkedIn and I&#39;ll get back to you personally.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="https://www.linkedin.com/in/muhib-khan1" target="_blank" rel="noreferrer" className="pill pill-ink pill-ink-hover">
            Message on LinkedIn →
          </a>
          <a href="https://kifayat.co" target="_blank" rel="noreferrer" className="pill pill-paper pill-paper-hover">
            Visit Kifayat
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 px-6 py-12 text-mono md:grid-cols-4 md:px-10">
        <div>
          <p className="text-muted-foreground">Based in</p>
          <p className="mt-2 text-foreground">Karachi, Pakistan</p>
        </div>
        <div>
          <p className="text-muted-foreground">Follow</p>
          <div className="mt-2 flex flex-col gap-1 text-foreground">
            <a href="https://www.linkedin.com/in/muhib-khan1" target="_blank" rel="noreferrer" className="hover:opacity-60">LinkedIn</a>
            <a href="https://kifayat.co" target="_blank" rel="noreferrer" className="hover:opacity-60">Kifayat</a>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground">Say hi</p>
          <a href="https://www.linkedin.com/in/muhib-khan1" target="_blank" rel="noreferrer" className="mt-2 block text-foreground hover:opacity-60">
            in/muhib-khan1
          </a>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">© {new Date().getFullYear()}</p>
          <p className="mt-2 text-foreground">Muhammad Muhib Khan.</p>
        </div>
      </div>
      <div className="overflow-hidden border-t border-border">
        <p className="text-display whitespace-nowrap py-8 text-center text-[22vw] leading-none md:text-[18vw]">
          muhib<span className="italic font-normal opacity-40">.</span>
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Approach — pinned steps that swap on scroll                         */
/* ------------------------------------------------------------------ */
function Approach() {
  const rootRef = useRef<HTMLElement | null>(null);

  const steps = [
    ["01", "Understand", "Who uses it, what they need, what success looks like. I ask questions before I write a single line."],
    ["02", "Design", "Data models, API routes, screens. A clear plan for MongoDB, Express, React and Node before the build starts."],
    ["03", "Build", "Clean, fast, responsive code — frontend and backend together, with AI integrated where it genuinely adds value."],
    ["04", "Ship", "Deployed, documented and ready to grow. Then I keep improving it based on real data."],
  ] as const;

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-approach-step]");
      if (!items.length) return;

      gsap.set(items, { opacity: 0.15 });
      gsap.set(items[0], { opacity: 1 });

      ScrollTrigger.create({
        trigger: rootRef.current!,
        start: "top top",
        end: () => "+=" + items.length * window.innerHeight * 0.9,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(items.length - 1, Math.floor(self.progress * items.length));
          items.forEach((el, i) => {
            gsap.to(el, { opacity: i === idx ? 1 : 0.15, duration: 0.4, overwrite: true });
          });
        },
      });

      gsap.from("[data-approach-intro]", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden border-t border-border bg-background"
    >
      <img
        src={obj2}
        alt=""
        width={900}
        height={900}
        className="pointer-events-none absolute -left-16 bottom-10 w-64 opacity-90"
      />
      <div className="relative mx-auto grid h-full max-w-[1600px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <p className="text-mono text-muted-foreground" data-approach-intro>
            (04) — How I work
          </p>
          <h2 className="text-display mt-8 text-5xl md:text-[5.5vw] md:leading-[0.94]" data-approach-intro>
            Idea to
            <br />
            <span className="italic font-normal opacity-50">production.</span>
          </h2>
          <p className="mt-8 max-w-sm text-sm text-foreground/70" data-approach-intro>
            Four honest steps I follow on every project, from the first
            question to the live URL.
          </p>
        </div>

        <div className="md:col-span-8">
          <ol className="flex flex-col gap-8">
            {steps.map(([n, title, body]) => (
              <li key={n} data-approach-step className="grid grid-cols-[auto_1fr] items-start gap-6 md:gap-10">
                <span className="text-display text-4xl md:text-6xl">{n}</span>
                <div>
                  <h3 className="text-display text-3xl md:text-5xl">{title}</h3>
                  <p className="mt-3 max-w-lg text-base leading-snug text-foreground/80">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Clients — quiet list with a big number                              */
/* ------------------------------------------------------------------ */
function Clients() {
  const rootRef = useRef<HTMLElement | null>(null);

  const clients = [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JavaScript / JSX",
    "Supabase",
    "Python",
    "HTML5",
    "CSS3",
    "Stripe",
    "AI / LLM APIs",
    "Git & GitHub",
  ];

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-client-row]").forEach((el) => {
        gsap.from(el, {
          yPercent: 100,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative border-t border-border bg-background"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-28 md:grid-cols-12 md:px-10 md:py-40">
        <div className="md:col-span-4">
          <p className="text-mono text-muted-foreground">(09) — Tech stack</p>
          <p className="text-display mt-8 text-[24vw] leading-[0.85] md:text-[10vw]">
            {clients.length}
            <span className="italic font-normal opacity-40">.</span>
          </p>
          <p className="mt-6 max-w-sm text-sm text-foreground/70">
            The tools I reach for every day — the MERN core, plus whatever
            the product actually needs.
          </p>
        </div>
        <ul className="md:col-span-8">
          {clients.map((c, i) => (
            <li
              key={c}
              className="overflow-hidden border-t border-border last:border-b"
            >
              <div
                data-client-row
                className="flex items-baseline justify-between gap-6 py-6"
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-mono text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-display text-3xl md:text-5xl">
                    {c}
                  </span>
                </div>
                <span className="text-mono text-muted-foreground hidden md:inline">
                  daily
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process — long scrolling detail rail                                */
/* ------------------------------------------------------------------ */
function Process() {
  const rootRef = useRef<HTMLElement | null>(null);

  const rows = [
    ["Early days", "HTML & CSS", "Where it started — building pages by hand, breaking them, and learning why they broke."],
    ["Next", "JavaScript & Python", "Logic, loops and problem solving. JSX and Python became the tools I think in."],
    ["SMIT", "Formal training", "Trained at Saylani Mass IT Training — structured MERN stack learning and real assignments."],
    ["Feb 2025", "Web Developer", "Started building full-stack projects seriously: React frontends, Node and Express APIs, MongoDB data."],
    ["Oct 2025", "MAI", "Launched a multimodal AI platform with five models, memory, voice and web search — built solo."],
    ["Oct 2025", "Health Mate", "Completed a MERN hackathon project: an AI-powered hospital management system."],
    ["May 2026", "Kifayat", "Co-founded an e-commerce startup as Lead Frontend Developer, Domain Manager and Data Analyst."],
    ["Now", "Still building", "Shipping, learning, and looking for the next hard problem worth solving."],
  ] as const;

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-process-row]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative border-t border-border bg-background"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-mono text-muted-foreground">(05) — Journey</p>
            <h2 className="text-display mt-8 text-5xl md:text-[5vw] md:leading-[0.94]">
              How I got
              <br />
              <span className="italic font-normal opacity-50">here.</span>
            </h2>
            <p className="mt-8 max-w-sm text-sm text-foreground/70">
              From first tags to co-founding a startup — the path so far,
              while still in school at The Orchid School.
            </p>
          </div>
          <ol className="md:col-span-8 flex flex-col">
            {rows.map(([week, title, body]) => (
              <li
                key={`${week}-${title}`}
                data-process-row
                className="grid grid-cols-[80px_1fr] gap-6 border-t border-border py-8 md:grid-cols-[140px_1fr] md:gap-10 md:py-10"
              >
                <span className="text-mono text-muted-foreground">{week}</span>
                <div>
                  <h3 className="text-display text-2xl md:text-4xl">{title}</h3>
                  <p className="mt-3 max-w-xl text-base leading-snug text-foreground/80">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Field notes — annotated marginalia                                  */
/* ------------------------------------------------------------------ */
function FieldNotes() {
  const notes = [
    ["Note 01", "Sustainable progress beats short-term intensity."],
    ["Note 02", "Your mental health isn't a luxury — it's your most important dev tool."],
    ["Note 03", "One project at a time. Mastery over multitasking."],
    ["Note 04", "Don't compare your Day 1 to someone's Year 10."],
    ["Note 05", "Age doesn't define innovation. Curiosity, discipline and vision do."],
    ["Note 06", "Clean code today is a faster feature tomorrow."],
  ];

  return (
    <section className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <div className="flex items-end justify-between">
          <p className="text-mono text-muted-foreground">(06) — Field notes</p>
          <p className="text-mono text-muted-foreground hidden md:block">
            things I&#39;ve learned the hard way →
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {notes.map(([n, body]) => (
            <figure
              key={n}
              className="group relative border-t border-border pt-6"
            >
              <figcaption className="text-mono text-muted-foreground">{n}</figcaption>
              <blockquote className="text-display mt-4 text-2xl md:text-3xl leading-[1.05]">
                “{body}”
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Ethos — huge type block                                             */
/* ------------------------------------------------------------------ */
function Ethos() {
  const rootRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-ethos-line]").forEach((el) => {
        gsap.from(el, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ethos"
      ref={rootRef}
      className="relative overflow-hidden border-t border-border bg-background"
    >
      <img
        src={obj3}
        alt=""
        width={900}
        height={900}
        className="pointer-events-none absolute -right-16 top-10 w-72 opacity-90"
      />
      <div className="mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-48">
        <p className="text-mono text-muted-foreground">(07) — Ethos</p>
        <h2 className="text-display mt-10 text-5xl md:text-[9vw] md:leading-[0.92]">
          <span className="block overflow-hidden">
            <span className="inline-block" data-ethos-line>Learn daily,</span>
          </span>
          <span className="block overflow-hidden">
            <span className="inline-block" data-ethos-line>build often,</span>
          </span>
          <span className="block overflow-hidden italic font-normal opacity-50">
            <span className="inline-block" data-ethos-line>ship what matters.</span>
          </span>
        </h2>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials — full-bleed rotating quote                            */
/* ------------------------------------------------------------------ */
function Testimonials() {
  const items = [
    {
      body: "I wanted to prove that age doesn't define innovation. Curiosity, discipline, and vision do.",
      author: "On building MAI",
    },
    {
      body: "My focus has always been on delivering a fast, intuitive, and reliable user experience backed by clean, efficient technology.",
      author: "On co-founding Kifayat",
    },
    {
      body: "Health Mate isn't just code — it's a potential lifesaver.",
      author: "On the Health Mate hackathon",
    },
    {
      body: "Sustainable progress beats short-term intensity. Rest is part of the process.",
      author: "On learning to code without burning out",
    },
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  const current = items[index];

  return (
    <section className="relative border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44">
        <div className="flex items-end justify-between">
          <p className="text-mono opacity-60">(08) — In my words</p>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 w-8 border border-background/60 transition ${
                  i === index ? "bg-background" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
        <blockquote className="mt-14">
          <p className="text-display text-3xl md:text-[4vw] md:leading-[1.05]">
            “{current.body}”
          </p>
          <footer className="text-mono mt-10 opacity-60">— {current.author}</footer>
        </blockquote>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Recognition — awards & press                                        */
/* ------------------------------------------------------------------ */
function Recognition() {
  const rows = [
    ["2026", "Co-founded Kifayat", "E-commerce — kifayat.co"],
    ["2025", "MERN Stack Hackathon — Completed", "Health Mate"],
    ["2025", "Launched MAI", "Multimodal AI platform"],
    ["2025", "Started as Web Developer", "Full-stack, Karachi"],
    ["—", "Trained at SMIT", "MERN Stack Development"],
    ["—", "High School — Maths & Computer Science", "The Orchid School"],
  ];

  return (
    <section className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <div className="flex items-end justify-between">
          <p className="text-mono text-muted-foreground">(10) — Milestones</p>
          <p className="text-mono text-muted-foreground hidden md:block">
            {rows.length} moments so far
          </p>
        </div>
        <ul className="mt-12">
          {rows.map(([year, prize, project]) => (
            <li
              key={`${year}-${prize}-${project}`}
              className="group grid grid-cols-[70px_1fr_auto] items-baseline gap-4 border-t border-border py-6 md:grid-cols-[120px_1fr_auto] md:gap-8 md:py-8 last:border-b"
            >
              <span className="text-mono text-muted-foreground">{year}</span>
              <span className="text-display text-xl md:text-3xl">{prize}</span>
              <span className="text-mono text-muted-foreground text-right">
                {project}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Journal — small essay teasers                                       */
/* ------------------------------------------------------------------ */
function Journal() {
  const posts = [
    {
      date: "May 2026",
      read: "LinkedIn",
      title: "Introducing Kifayat.",
      excerpt:
        "A smarter way to shop online in Pakistan — COD, loyalty rewards and exclusive discounts, built with my co-founders.",
    },
    {
      date: "Oct 2025",
      read: "LinkedIn",
      title: "Health Mate: AI-powered hospital care.",
      excerpt:
        "My MERN hackathon project — AI report analysis, vital monitoring and multi-role auth for doctors, patients and admins.",
    },
    {
      date: "Oct 2025",
      read: "LinkedIn",
      title: "Introducing MAI.",
      excerpt:
        "Five models, nine conversation modes, memory, voice and web search — a multimodal AI platform built from scratch.",
    },
    {
      date: "Oct 2025",
      read: "LinkedIn",
      title: "I hit a wall at 15.",
      excerpt:
        "How I'm learning to code without burning out: focus sprints, one project at a time, and weekend code freezes.",
    },
  ];

  return (
    <section className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-mono text-muted-foreground">(11) — Writing</p>
            <h2 className="text-display mt-8 text-5xl md:text-[5vw] md:leading-[0.94]">
              Things
              <br />
              <span className="italic font-normal opacity-50">I've been</span>
              <br />
              posting.
            </h2>
            <p className="mt-8 max-w-sm text-sm text-foreground/70">
              Launches, lessons and the honest side of learning to code —
              shared on LinkedIn.
            </p>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            {posts.map((p) => (
              <article
                key={p.title}
                className="group border-t border-border pt-6"
              >
                <p className="text-mono text-muted-foreground">
                  {p.date} · {p.read}
                </p>
                <h3 className="text-display mt-4 text-2xl md:text-3xl group-hover:italic transition">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm leading-snug text-foreground/80">
                  {p.excerpt}
                </p>
                <a href="https://www.linkedin.com/in/muhib-khan1" target="_blank" rel="noreferrer" className="text-mono mt-6 inline-block text-foreground">Read on LinkedIn →</a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ — accordion list                                                */
/* ------------------------------------------------------------------ */
function FAQ() {
  const qas = [
    [
      "What do you build?",
      "Full-stack web apps on the MERN stack — React frontends, Node and Express APIs, MongoDB databases — plus e-commerce, dashboards and AI-powered features.",
    ],
    [
      "Are you open to freelance work?",
      "Yes — freelance projects, internships and collaborations. Message me on LinkedIn with what you have in mind.",
    ],
    [
      "Can you work on just the frontend?",
      "Absolutely. I lead the frontend at Kifayat, so React UIs that are fast, responsive and clean are home turf.",
    ],
    [
      "Can you add AI to my product?",
      "Yes. I've integrated GPT, Gemini, DeepSeek, Groq and Mixtral into MAI, and AI report analysis into Health Mate.",
    ],
    [
      "Where are you based?",
      "Karachi, Pakistan — and happy to work remotely with anyone, anywhere.",
    ],
    [
      "You're still in school?",
      "Yes, and that hasn't stopped me co-founding a startup and shipping real products. Judge the work, not the age.",
    ],
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-mono text-muted-foreground">(12) — Questions</p>
            <h2 className="text-display mt-8 text-5xl md:text-[5vw] md:leading-[0.94]">
              Ones I&#39;m
              <br />
              <span className="italic font-normal opacity-50">often</span>
              <br />
              asked.
            </h2>
          </div>
          <ul className="md:col-span-8">
            {qas.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <li key={q} className="border-t border-border last:border-b">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
                    aria-expanded={isOpen}
                  >
                    <span className="text-display text-2xl md:text-3xl pr-6">
                      {q}
                    </span>
                    <span
                      className={`text-mono shrink-0 transition-transform ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-8" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="max-w-2xl text-base leading-snug text-foreground/80">
                        {a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Availability — status strip                                         */
/* ------------------------------------------------------------------ */
function Availability() {
  return (
    <section className="relative border-t border-border bg-background">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4">
          <p className="text-mono text-muted-foreground">(13) — Availability</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-40" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-foreground" />
            </span>
            <p className="text-mono text-foreground">Open to work — 2026</p>
          </div>
        </div>
        <div className="md:col-span-8">
          <p className="text-display text-3xl md:text-5xl leading-tight">
            Available for freelance and collaborations.
            <span className="opacity-50 italic font-normal">
              {" "}
              I reply to every message personally, and take on projects I can
              genuinely make better.
            </span>
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              ["Freelance", "Open", "remote"],
              ["Internships", "Open", "remote / Karachi"],
              ["Collabs", "Open", "startups"],
              ["Full-time", "Later", "after school"],
            ].map(([q, s, state]) => (
              <div key={q} className="border-t border-border pt-4">
                <p className="text-mono text-muted-foreground">{q}</p>
                <p className="text-display mt-2 text-2xl md:text-3xl">{s}</p>
                <p className="text-mono mt-1 text-foreground/60">{state}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Colophon — tiny, honest technical note                              */
/* ------------------------------------------------------------------ */
function Colophon() {
  return (
    <section className="relative border-t border-border bg-background">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <p className="text-mono text-muted-foreground md:col-span-3">
          (14) — Colophon
        </p>
        <div className="md:col-span-9 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <p className="text-mono text-muted-foreground">Set in</p>
            <p className="text-display mt-2 text-xl">PP Neue Montreal · IBM Plex Mono</p>
          </div>
          <div>
            <p className="text-mono text-muted-foreground">Built with</p>
            <p className="text-display mt-2 text-xl">React · TanStack · GSAP · Lenis</p>
          </div>
          <div>
            <p className="text-mono text-muted-foreground">Last update</p>
            <p className="text-display mt-2 text-xl">
              {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
