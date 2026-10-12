import { useCallback, useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#works", label: "Works" },
  { href: "#manifesto", label: "About" },
  { href: "#contact", label: "Contact" },
];

const karachiOffsetMs = 5 * 60 * 60 * 1000;

function useNow(periodMs: number = 1000) {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), periodMs);
    return () => clearInterval(id);
  }, []);
  return now;
}

const timeDial = {
  getHourDeg: (h: number, m: number) => (h % 12) * 30 + m * 0.5,
  getMinDeg: (m: number) => m * 6,
  getSecDeg: (s: number) => s * 6,
};

// Tracks scroll direction: 'up' | 'down' | undefined
function useScrollDirection() {
  const [dir, setDir] = useState<'up' | 'down'>('down');
  const last = useRef(0);
  useEffect(() => {
    last.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const d = y - last.current;
      last.current = y;
      setDir(d > 8 ? 'down' : d < -8 ? 'up' : dir);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return dir;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

// Auto-collapse after inactivity, bloom on scroll up or hover
function useAutoCollapse(collapseDelay = 3000) {
  const [collapsed, setCollapsed] = useState(false);
  const timeoutRef = useRef<number | undefined>();
  const lastScrollY = useRef(0);
  const hasScrolled = useRef(false);

  // Initialize lastScrollY on client
  useEffect(() => {
    lastScrollY.current = window.scrollY;
  }, []);

  // Track last scroll Y to determine direction
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      hasScrolled.current = true;

      // If scrolling down significantly, collapse immediately
      if (y - lastScrollY.current > 10 && !collapsed) {
        setCollapsed(true);
        clearTimeout(timeoutRef.current);
      }
      // If scrolling up significantly, bloom immediately
      else if (lastScrollY.current - y > 10) {
        setCollapsed(false);
        clearTimeout(timeoutRef.current);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [collapsed]);

  // Auto-collapse after inactivity (starts after first scroll)
  useEffect(() => {
    if (hasScrolled.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCollapsed(true), collapseDelay);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [collapsed]);

  // Hover expands, mouseleave starts collapse timer
  useEffect(() => {
    let collapseTimer: number | undefined;
    const expand = () => {
      setCollapsed(false);
      clearTimeout(collapseTimer);
    };
    const startCollapse = () => {
      collapseTimer = setTimeout(() => setCollapsed(true), collapseDelay);
    };
    const onMouseEnter = () => expand();
    const onMouseLeave = () => startCollapse();
    window.addEventListener("mouseenter", expand);
    window.addEventListener("mouseleave", startCollapse);
    return () => {
      window.removeEventListener("mouseenter", expand);
      window.removeEventListener("mouseleave", startCollapse);
      clearTimeout(collapseTimer);
    };
  }, []);

  return collapsed;
}

export function DynamicIsland() {
  const [mounted, setMounted] = useState(false);
  const collapsed = useAutoCollapse(3000);
  const progress = useScrollProgress();
  const karachiNow = useNow(1000);
  const karachi = new Date(karachiNow.getTime() + karachiOffsetMs);
  const h = karachi.getHours();
  const m = karachi.getMinutes();
  const s = karachi.getSeconds();
  const isNight = h >= 18 || h < 6;
  const [soundMuted, setSoundMuted] = useState(false);
  const [revealed, setRevealed] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  // Battery API
  useEffect(() => {
    if (!('getBattery' in navigator)) return;
    let battery: BatteryManager | null = null;
    navigator.getBattery().then(b => {
      battery = b;
      setBatteryLevel(Math.round(b.level * 100));
      const onLevelChange = () => setBatteryLevel(Math.round(b.level * 100));
      battery.addEventListener('levelchange', onLevelChange);
      return () => battery?.removeEventListener('levelchange', onLevelChange);
    });
  }, []);

  // Detect when user scrolls to the very bottom
  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => {
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom && !revealed) {
        setRevealed(true);
      } else if (!atBottom && revealed) {
        setRevealed(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted, revealed]);

  // Ambient audio element (loops the downloaded file)
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  // Initialize ambient audio
  useEffect(() => {
    const audio = new Audio('/audio/ambient.mp3');
    audio.loop = true;
    audio.volume = 0;
    ambientRef.current = audio;

    // Start playing (will be silent until unmuted)
    const playPromise = audio.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay blocked - will play on first user interaction
      });
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Handle ambient volume based on mute state
  useEffect(() => {
    if (!ambientRef.current) return;
    const targetVolume = soundMuted ? 0 : 0.3;
    ambientRef.current.volume = soundMuted ? 0 : 0; // start silent
    // Fade in/out
    const steps = 30;
    const stepTime = 1500 / steps;
    const startVolume = ambientRef.current.volume;
    const diff = targetVolume - startVolume;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      ambientRef.current!.volume = startVolume + (diff * step / steps);
      if (step >= steps) clearInterval(interval);
    }, stepTime);
    return () => clearInterval(interval);
  }, [soundMuted]);

  // Puddle click sound (using Web Audio for the click - lightweight)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const initClickAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    audioCtxRef.current = ctx;
  }, []);

  const playPuddleSound = useCallback(() => {
    if (soundMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Ultra-peaceful: soft sine with gentle decay, no noise burst
    osc.type = 'sine';
    osc.frequency.setValueAtTime(660, ctx.currentTime); // E5 - gentle high note
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3); // A4 - warm resolution
    
    // Very soft envelope
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.02); // gentle attack
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6); // long peaceful decay
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  }, [soundMuted]);

  // Initialize click audio on first interaction
  useEffect(() => {
    const initOnInteraction = () => {
      initClickAudio();
      // Also ensure ambient starts if not muted
      if (!soundMuted && ambientRef.current && ambientRef.current.paused) {
        ambientRef.current.play().catch(() => {});
      }
      document.removeEventListener('click', initOnInteraction);
      document.removeEventListener('keydown', initOnInteraction);
    };
    document.addEventListener('click', initOnInteraction);
    document.addEventListener('keydown', initOnInteraction);
    return () => {
      document.removeEventListener('click', initOnInteraction);
      document.removeEventListener('keydown', initOnInteraction);
    };
  }, [initClickAudio, soundMuted]);

  // Global click listener for puddle sound
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, select, textarea')) return;
      playPuddleSound();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [playPuddleSound]);

  const hourDeg = timeDial.getHourDeg(h, m);
  const minDeg = timeDial.getMinDeg(m);
  const secDeg = timeDial.getSecDeg(s);

  const cx = 11, cy = 11, R = 11;
  const C = 2 * Math.PI * R;

  const isBloomed = collapsed;

  useEffect(() => setMounted(true), []);

  const hour = ((h % 12) || 12).toString().padStart(2, "0");
  const minute = m.toString().padStart(2, "0");
  const second = s.toString().padStart(2, "0");
  const ampM = h >= 12 ? "PM" : "AM";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`island pointer-events-auto flex items-center justify-between overflow-hidden text-paper ${
          isBloomed ? "island-closed" : "island-open"
        }`}
        aria-label="Main navigation"
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 shrink-0 cursor-pointer"
          aria-label="Muhib — home"
        >
          <span className="island-dot" />
<span className="text-display flex overflow-hidden text-lg leading-none tracking-tight">
            {"Muhib.".split("").map((c, i) => (
              <span
                key={i}
                className={`island-char ${!isBloomed ? "is-in" : (revealed ? "is-in" : "is-out")} ${c === "." ? "text-signal" : ""}`}
                style={{ transitionDelay: !isBloomed ? `${200 + i * 45}ms` : (revealed ? `${i * 120}ms` : `${200 + i * 45}ms`) }}
              >
                {c}
              </span>
            ))}
          </span>
        </a>

        <div
          className={`island-links hidden items-center gap-6 md:flex ${
            isBloomed ? "opacity-0 md:hidden" : "opacity-100"
          }`}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector(l.href);
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-sm text-paper/70 transition hover:text-paper cursor-pointer"
            >
              {l.label}
            </a>
          ))}
        </div>

        {(!isBloomed && (
          <>
            {/* Solar dial / time */}
            <div className="hidden md:flex items-center gap-2 text-xs text-paper/60 border-l border-white/10 pl-4">
              <div
                className="island-sundial flex h-6 w-6 items-center justify-center rounded-full bg-ink/70 backdrop-blur-md ring-1 ring-white/15"
                aria-label="Real-time Karachi clock (UTC+5)"
              >
                {mounted ? (
                  <svg width="24" height="24" viewBox="0 0 36 36" aria-hidden="true">
                    <circle cx="18" cy="18" r="17" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="0.6" />
                    <circle cx="18" cy="18" r="16.5" fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="0.3" />
                    <circle cx="18" cy="18" r="1.3" fill="white" />
                    <line
                      x1="18" y1="18" x2={18 + 7.5 * Math.sin((hourDeg * Math.PI) / 180)}
                      y2={18 - 7.5 * Math.cos((hourDeg * Math.PI) / 180)}
                      stroke={isNight ? "#fbbf24" : "white"} strokeWidth="1.2" strokeLinecap="round"
                    />
                    <line
                      x1="18" y1="18" x2={18 + 10 * Math.sin((minDeg * Math.PI) / 180)}
                      y2={18 - 10 * Math.cos((minDeg * Math.PI) / 180)}
                      stroke="white" strokeWidth="0.7" strokeLinecap="round"
                    />
                    <line
                      x1="18" y1="18" x2={18 + 12 * Math.sin((secDeg * Math.PI) / 180)}
                      y2={18 - 12 * Math.cos((secDeg * Math.PI) / 180)}
                      stroke={isNight ? "#fbbf24" : "white"} strokeWidth="0.4" strokeOpacity="0.6"
                    />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 36 36" aria-hidden="true">
                    <circle cx="18" cy="18" r="17" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="0.6" />
                    <circle cx="18" cy="18" r="16.5" fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="0.3" />
                    <circle cx="18" cy="18" r="1.3" fill="white" />
                  </svg>
                )}
              </div>
              <div className="island-time text-right">
                <div className="text-xs font-mono tracking-widest text-white">
                  {mounted ? `${hour}:${minute}:${second} ${ampM}` : "--:--:-- --"}
                </div>
                <div className="text-[8px] tracking-[0.08em] text-white/50">KARACHI UTC+5</div>
              </div>
            </div>
          </>
        ))}

         <div className="flex shrink-0 items-center gap-3">
          {isBloomed && batteryLevel !== null && (
            <span className="flex items-center gap-1 text-xs font-mono text-paper/80">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="18" height="16" rx="2" />
                <line x1="20" y1="9" x2="23" y2="9" />
              </svg>
              {batteryLevel}%
            </span>
          )}
          <svg width="22" height="22" viewBox="0 0 22 22" className="-rotate-90" aria-hidden="true" style={{ opacity: isBloomed ? 0 : 1, flexShrink: 0 }}>
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
            <circle
              cx={cx} cy={cy} r={R} fill="none" stroke="var(--signal)" strokeWidth="2" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - progress)}
            />
          </svg>
          <button
            aria-label={soundMuted ? "Unmute site sound" : "Mute site sound"}
            onClick={() => setSoundMuted(!soundMuted)}
            className="rounded-full bg-paper px-2 py-1 text-xs text-ink transition-all hover:scale-105 active:scale-95 opacity-90"
            style={{ opacity: isBloomed ? 0 : 1 }}
          >
            {soundMuted ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="15.78" y2="15.78" />
                <line x1="15.78" y1="4.22" x2="4.22" y2="15.78" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}