import { useEffect, useState } from "react";

const LINKS = [
  { href: "#works", label: "Works" },
  { href: "#manifesto", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function DynamicIsland() {
  const [collapsed, setCollapsed] = useState(false);
  const [hover, setHover] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let last = window.scrollY;
    let acc = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const d = y - last;
      last = y;
      acc = Math.sign(d) === Math.sign(acc) ? acc + d : d;
      if (y < 80) setCollapsed(false);
      else if (acc > 15) setCollapsed(true);
      else if (acc < -15) setCollapsed(false);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? y / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const open = !collapsed || hover;
  const R = 9;
  const C = 2 * Math.PI * R;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`island pointer-events-auto flex items-center justify-between overflow-hidden text-paper ${open ? "island-open" : "island-closed"}`}
        aria-label="Main"
      >
        <a href="#top" className="flex items-center gap-2.5 shrink-0" aria-label="Muhib — home">
          <span className="island-dot" />
          <span className="text-display flex overflow-hidden text-lg leading-none tracking-tight">
            {"Muhib.".split("").map((c, i) => (
              <span
                key={i}
                className={`island-char ${mounted ? "is-in" : ""} ${c === "." ? "text-signal" : ""}`}
                style={{ transitionDelay: `${200 + i * 45}ms` }}
              >
                {c}
              </span>
            ))}
          </span>
        </a>

        <div className={`island-links hidden items-center gap-6 md:flex ${open ? "opacity-100" : "md:hidden"}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-paper/70 transition hover:text-paper">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <svg width="22" height="22" viewBox="0 0 22 22" className="-rotate-90" aria-hidden="true">
            <circle cx="11" cy="11" r={R} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
            <circle
              cx="11" cy="11" r={R} fill="none" stroke="var(--signal)" strokeWidth="2" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - progress)}
            />
          </svg>
          <a
            href="#contact"
            className={`rounded-full bg-paper px-4 py-1.5 text-sm text-ink transition-all duration-500 hover:scale-[1.04] ${open ? "" : "hidden"}`}
          >
            Hire me →
          </a>
        </div>
      </nav>
    </div>
  );
}
