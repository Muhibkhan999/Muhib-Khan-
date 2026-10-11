import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  createFileRoute,
  Link,
  notFound,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SmoothScroll } from "@/components/SmoothScroll";
import { getWork, works, type Work } from "@/data/works";
import obj1 from "@/assets/obj-1.png";
import obj2 from "@/assets/obj-2.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const work = getWork(params.slug);
    if (!work) throw notFound();
    return { work: work as Work };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Work — Muhib Khan" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { work } = loaderData;
    const title = `${work.client} — ${work.title} · Muhib Khan`;
    const description = work.brief.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: work.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: work.image },
      ],
    };
  },
  component: WorkPage,
  notFoundComponent: WorkNotFound,
  errorComponent: WorkError,
});

function WorkNotFound() {
  const { slug } = Route.useParams();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-mono text-muted-foreground">
          404 — no work called &ldquo;{slug}&rdquo;
        </p>
        <h1 className="text-display mt-6 text-5xl">
          That project isn&#39;t here.
        </h1>
        <div className="mt-8">
          <Link to="/" className="pill pill-ink pill-ink-hover">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function WorkError({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-mono text-muted-foreground">Something broke</p>
        <h1 className="text-display mt-6 text-5xl">
          Even the case study has bad days.
        </h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="pill pill-ink pill-ink-hover"
          >
            Try again
          </button>
          <Link to="/" className="pill pill-paper pill-paper-hover">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function WorkPage() {
  const { work } = Route.useLoaderData() as { work: Work };
  const rootRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-work-rise]", {
        yPercent: 110,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
      });
      gsap.from("[data-work-hero]", {
        y: 60,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.utils.toArray<HTMLElement>("[data-work-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const nextWork = work.next ? getWork(work.next) : works[0];
  const idx = works.findIndex((w) => w.slug === work.slug);
  const prevWork = works[(idx - 1 + works.length) % works.length];

  return (
    <SmoothScroll>
      <div
        ref={rootRef}
        className="min-h-screen bg-background text-foreground overflow-x-clip"
      >
        {/* Header */}
        <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 text-paper md:px-10">
            <Link to="/" className="text-display text-xl tracking-tight">
              muhib<span className="text-signal">.</span>
            </Link>
            <nav className="hidden items-center gap-8 md:flex">
              <Link to="/" className="text-sm hover:opacity-60">
                index
              </Link>
              <Link to="/" hash="works" className="text-sm hover:opacity-60">
                works
              </Link>
              <Link to="/" hash="contact" className="text-sm hover:opacity-60">
                contact
              </Link>
            </nav>
            <Link
              to="/"
              className="pill hidden md:inline-flex border-paper text-paper hover:bg-paper hover:text-ink transition"
              style={{ borderColor: "currentColor" }}
            >
              ← Index
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden bg-background">
          <div className="mx-auto max-w-[1600px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-mono text-muted-foreground overflow-hidden">
                  <span className="inline-block" data-work-rise>
                    {work.n} · {work.year} · {work.location}
                  </span>
                </p>
                <p className="text-mono mt-4 text-muted-foreground overflow-hidden">
                  <span className="inline-block" data-work-rise>
                    {work.tag}
                  </span>
                </p>
              </div>
              <div className="md:col-span-8">
                <p className="text-mono text-muted-foreground overflow-hidden">
                  <span className="inline-block" data-work-rise>
                    — {work.client}
                  </span>
                </p>
                <h1 className="text-display mt-4 text-5xl md:text-[6.5vw] md:leading-[0.94]">
                  <span className="block overflow-hidden">
                    <span className="inline-block" data-work-rise>
                      {work.title}
                    </span>
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div
            data-work-hero
            className="relative mx-auto max-w-[1600px] px-6 md:px-10"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
              <img
                src={work.image}
                alt={work.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Meta strip */}
        <section className="border-t border-border bg-background">
          <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4 md:px-10 md:py-14">
            {[
              ["Client", work.client],
              ["Year", work.year],
              ["Duration", work.duration],
              ["Role", work.role],
            ].map(([k, v]) => (
              <div key={k} data-work-reveal>
                <p className="text-mono text-muted-foreground">{k}</p>
                <p className="text-display mt-3 text-xl md:text-2xl">{v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Brief */}
        <section className="relative border-t border-border bg-background">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-28 md:grid-cols-12 md:px-10 md:py-40">
            <div className="md:col-span-4">
              <p className="text-mono text-muted-foreground" data-work-reveal>
                (01) — Brief
              </p>
              <div className="mt-8 flex flex-wrap gap-2" data-work-reveal>
                {work.discipline.map((d) => (
                  <span
                    key={d}
                    className="rounded-[120px] border border-border px-3 py-1 text-mono text-foreground/70"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-8">
              <p
                className="text-display text-3xl md:text-5xl md:leading-[1.05]"
                data-work-reveal
              >
                {work.brief}
              </p>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="relative border-t border-border bg-background">
          <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-mono text-muted-foreground" data-work-reveal>
                  (02) — Approach
                </p>
                <img
                  src={obj1}
                  alt=""
                  width={900}
                  height={900}
                  className="mt-10 hidden w-40 md:block"
                />
              </div>
              <ol className="md:col-span-8 flex flex-col">
                {work.approach.map((line, i) => (
                  <li
                    key={i}
                    data-work-reveal
                    className="grid grid-cols-[50px_1fr] gap-6 border-t border-border py-8 md:grid-cols-[80px_1fr] md:py-10"
                  >
                    <span className="text-mono text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-display text-2xl md:text-3xl leading-tight">
                      {line}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="relative border-t border-border bg-background overflow-hidden">
          <div className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
            <p className="text-mono text-muted-foreground" data-work-reveal>
              (03) — Frames
            </p>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-6 md:gap-8">
              {work.gallery.map((src, i) => {
                const spans = [
                  "md:col-span-4 aspect-[4/3]",
                  "md:col-span-2 aspect-[3/4]",
                  "md:col-span-3 aspect-[4/5]",
                  "md:col-span-3 aspect-[4/5]",
                ];
                return (
                  <figure
                    key={i}
                    data-work-reveal
                    className={`relative overflow-hidden bg-muted ${spans[i % spans.length]}`}
                  >
                    <img
                      src={src}
                      alt={`${work.title} — frame ${i + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </figure>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="relative border-t border-border bg-foreground text-background overflow-hidden">
          <img
            src={obj2}
            alt=""
            width={900}
            height={900}
            className="pointer-events-none absolute -right-12 top-16 w-64 opacity-90"
          />
          <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
            <p className="text-mono opacity-60" data-work-reveal>
              (04) — On the record
            </p>
            <blockquote className="mt-10" data-work-reveal>
              <p className="text-display text-3xl md:text-[4vw] md:leading-[1.05]">
                “{work.quote.body}”
              </p>
              <footer className="text-mono mt-8 opacity-60">
                — {work.quote.author}
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Outcome + credits */}
        <section className="relative border-t border-border bg-background">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-28 md:grid-cols-12 md:px-10 md:py-40">
            <div className="md:col-span-6">
              <p className="text-mono text-muted-foreground" data-work-reveal>
                (05) — Outcome
              </p>
              <p
                className="text-display mt-8 text-3xl md:text-5xl leading-tight"
                data-work-reveal
              >
                {work.outcome}
              </p>
            </div>
            <div className="md:col-span-6">
              <p className="text-mono text-muted-foreground" data-work-reveal>
                (06) — Credits
              </p>
              <ul className="mt-8">
                {work.credits.map((c) => (
                  <li
                    key={c.role}
                    data-work-reveal
                    className="flex items-baseline justify-between gap-6 border-t border-border py-4 last:border-b"
                  >
                    <span className="text-mono text-muted-foreground">
                      {c.role}
                    </span>
                    <span className="text-display text-xl md:text-2xl">
                      {c.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Next / Prev */}
        <section className="relative border-t border-border bg-background">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-6 py-16 md:grid-cols-2 md:gap-10 md:px-10 md:py-24">
            {[
              { label: "Previous", w: prevWork },
              { label: "Next", w: nextWork },
            ].map(({ label, w }) => {
              if (!w) return null;
              return (
                <Link
                  key={label}
                  to="/work/$slug"
                  params={{ slug: w.slug }}
                  className="group relative block overflow-hidden border-t border-border pt-6"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-mono text-muted-foreground">{label}</p>
                    <p className="text-mono text-muted-foreground">
                      {w.n} · {w.year}
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-[1fr_auto] items-end gap-6">
                    <h3 className="text-display text-3xl md:text-5xl group-hover:italic transition">
                      {w.title}
                    </h3>
                    <div className="hidden md:block relative h-24 w-32 overflow-hidden bg-muted">
                      <img
                        src={w.image}
                        alt=""
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <p className="text-mono mt-4 text-muted-foreground">
                    {w.client} · {w.tag}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="relative border-t border-border bg-background">
          <div className="mx-auto max-w-[1600px] px-6 py-32 text-center md:px-10 md:py-44">
            <p className="text-mono text-muted-foreground">— your project</p>
            <h2 className="text-display mx-auto mt-10 max-w-5xl text-4xl md:text-[8vw] md:leading-[0.94]">
              Yours could sit{" "}
              <span className="italic font-normal opacity-50">right here.</span>
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="https://www.linkedin.com/in/muhib-khan1" target="_blank" rel="noreferrer"
                className="pill pill-ink pill-ink-hover"
              >
                Message on LinkedIn →
              </a>
              <Link to="/" className="pill pill-paper pill-paper-hover">
                Back to index
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-background">
          <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 px-6 py-12 text-mono md:grid-cols-4 md:px-10">
            <div>
              <p className="text-muted-foreground">Based in</p>
              <p className="mt-2 text-foreground">Karachi, Pakistan</p>
            </div>
            <div>
              <p className="text-muted-foreground">Say hi</p>
              <a
                href="https://www.linkedin.com/in/muhib-khan1" target="_blank" rel="noreferrer"
                className="mt-2 block text-foreground hover:opacity-60"
              >
                in/muhib-khan1
              </a>
            </div>
            <div>
              <p className="text-muted-foreground">This project</p>
              <p className="mt-2 text-foreground">
                {work.n} · {work.client}
              </p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">
                © {new Date().getFullYear()}
              </p>
              <p className="mt-2 text-foreground">Muhammad Muhib Khan.</p>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
