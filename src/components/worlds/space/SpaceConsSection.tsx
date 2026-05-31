'use client';
 
/**
 * SpaceConsSection — Space ke Dangers / Cons
 *
 * Layout:
 *  - Top: heading (left) + issues list (right) — same as ConsSection pattern
 *  - Middle: Section label divider
 *  - Cards grid: 6 cons cards (image + icon + title + description)
 *  - Bottom: quote panel (2-column)
 *  - Scroll indicator
 *
 * Animations:
 *  - Heading lines slide in from left
 *  - Issues list slides in from right (stagger)
 *  - Cards fade up (stagger)
 *  - Quote panel fades up
 *  - Canvas: floating debris / asteroid particles (orange-red glow)
 *  - Planet (damaged version) floats with GSAP
 *
 * Images chahiye (public/images/space/):
 *  - cons/earth.png  → damaged/cracked planet image
 *  - cons/bg.png     → dark space background
 *  - cons/1–6.png    → cons card images
 *    1: radiation hazard
 *    2: space debris
 *    3: black hole / cosmic danger
 *    4: asteroid impact
 *    5: vacuum of space
 *    6: cosmic isolation
 */
 
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertTriangle,
  ArrowRight,
  Atom,
  Bone,
  Brain,
  Flame,
  Radiation,
  Satellite,
  Shield,
  Skull,
  Telescope,
  Wind,
  Zap,
} from 'lucide-react';
 
gsap.registerPlugin(ScrollTrigger);
 
// ─── Types ───────────────────────────────────────────────────────────
type Issue = {
  icon: React.ElementType;
  title: string;
  description: string;
};
 
type ConsCard = {
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
};
 
// ─── Data ─────────────────────────────────────────────────────────────
 
/** Side list — 5 key dangers */
const issues: Issue[] = [
  {
    icon: Radiation,
    title: 'Cosmic Radiation',
    description: 'Outside Earth\'s magnetic shield, lethal radiation levels threaten every cell in the human body.',
  },
  {
    icon: AlertTriangle,
    title: 'Space Debris Crisis',
    description: 'Over 27,000 tracked objects orbit Earth — a single collision can trigger a catastrophic chain reaction.',
  },
  {
    icon: Flame,
    title: 'Asteroid & Meteor Threats',
    description: 'Rogue rocks travel at 70,000 km/h. A large impact could end civilisation as we know it.',
  },
  {
    icon: Brain,
    title: 'Psychological Isolation',
    description: 'Deep-space travel isolates crews for years. Mental health deterioration is a mission-critical risk.',
  },
  {
    icon: Bone,
    title: 'Physical Deterioration',
    description: 'Microgravity rapidly degrades muscle, bone density and vision — the human body was not built for space.',
  },
];
 
/** Cards grid — 6 cons */
const consCards: ConsCard[] = [
  {
    title: 'Solar Radiation',
    description: 'Solar storms can irradiate spacecraft and fry electronics in seconds.',
    image: '/images/space/cons/1.png',
    icon: Zap,
  },
  {
    title: 'Space Debris',
    description: 'LEO is a minefield. Even paint flecks travel faster than bullets.',
    image: '/images/space/cons/2.png',
    icon: Satellite,
  },
  {
    title: 'Black Holes & Supernovae',
    description: 'The universe harbours forces that can obliterate solar systems.',
    image: '/images/space/cons/3.png',
    icon: Atom,
  },
  {
    title: 'Asteroid Impact',
    description: 'Earth has been hit before. The question is when — not if — it happens again.',
    image: '/images/space/cons/4.png',
    icon: AlertTriangle,
  },
  {
    title: 'Vacuum of Space',
    description: 'A pinhole breach means instant death. There is no room for error.',
    image: '/images/space/cons/5.png',
    icon: Wind,
  },
  {
    title: 'Cosmic Isolation',
    description: 'Distances are so vast that help is always years — or decades — away.',
    image: '/images/space/cons/6.png',
    icon: Skull,
  },
];
 
// ─── Component ────────────────────────────────────────────────────────
export default function SpaceConsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const planetRef  = useRef<HTMLImageElement | null>(null);
  const canvasRef  = useRef<HTMLCanvasElement | null>(null);
 
  // ── GSAP Animations ──────────────────────────────────────────────────
  useEffect(() => {
    if (!sectionRef.current) return;
 
    const ctx = gsap.context(() => {
 
      // Planet float
      if (planetRef.current) {
        gsap.to(planetRef.current, {
          x: 12,
          y: -8,
          rotation: -1.5,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
 
      // Heading lines
      gsap.fromTo(
        '.cons-space-heading',
        { x: -55, opacity: 0, skewX: -4 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'back.out(1.8)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        }
      );
 
      // Issues list
      gsap.fromTo(
        '.cons-space-issue',
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cons-space-issues',
            start: 'top 80%',
          },
        }
      );
 
      // Cards
      gsap.fromTo(
        '.cons-space-card',
        { y: 65, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cons-space-cards',
            start: 'top 86%',
          },
        }
      );
 
      // Quote panel
      gsap.fromTo(
        '.cons-space-quote',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cons-space-quote',
            start: 'top 88%',
          },
        }
      );
 
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  // ── Debris / Asteroid Particle Canvas ────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
 
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
 
    // Floating debris particles (orange-red glow like exhaust/radiation)
    const particles = Array.from({ length: 32 }, () => ({
      x:       Math.random(),
      y:       1 + Math.random() * 0.4,
      radius:  0.8 + Math.random() * 2.5,
      speed:   0.0012 + Math.random() * 0.002,
      drift:   -0.0008 + Math.random() * 0.0016,
      opacity: 0.2 + Math.random() * 0.5,
    }));
 
    let width = 0, height = 0, frameId = 0;
 
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width  = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width  = width  * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
 
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
 
      particles.forEach((p) => {
        p.y -= p.speed;
        p.x += p.drift;
 
        // Respawn below when off-screen top
        if (p.y < -0.06) {
          p.y       = 1.06 + Math.random() * 0.2;
          p.x       = Math.random();
          p.radius  = 0.8 + Math.random() * 2.5;
          p.opacity = 0.2 + Math.random() * 0.5;
        }
 
        const px = p.x * width;
        const py = p.y * height;
 
        // Orange-red glow gradient (radiation / cosmic danger feel)
        const g = ctx.createRadialGradient(px, py, 0, px, py, p.radius * 9);
        g.addColorStop(0,    `rgba(251,113,133,${p.opacity})`);      // rose-400
        g.addColorStop(0.4,  `rgba(239,68,68,${p.opacity * 0.4})`);  // red-500
        g.addColorStop(1,    'rgba(127,29,29,0)');
 
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, p.radius * 9, 0, Math.PI * 2);
        ctx.fill();
      });
 
      frameId = requestAnimationFrame(draw);
    };
 
    resize();
    draw();
    window.addEventListener('resize', resize);
 
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, []);
 
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#060003] px-6 py-24 text-white sm:px-10 lg:px-20"
    >
      {/* ── BACKGROUND IMAGE ── */}
      <img
        src="/images/space/cons/bg.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-70"
      />
 
      {/* Dark gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black" />
 
      {/* ── PARTICLE CANVAS ── */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      />
 
      {/* Red nebula glow blob (top center) */}
      <div className="pointer-events-none absolute left-1/3 top-[8%] h-[55vw] max-h-[700px] w-[55vw] max-w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.3)_0%,rgba(127,29,29,0.12)_45%,transparent_72%)] blur-3xl" />
 
      {/* ── PLANET (damaged) ── */}
      <img
        ref={planetRef}
        src="/images/space/cons/earth.png"
        alt="Damaged planet"
        className="pointer-events-none absolute left-[32%] top-[2%] z-[3] w-[55vw] max-w-[960px] -translate-x-1/2 select-none object-contain opacity-92"
      />
 
      {/* Bottom terrain / asteroid belt layer */}
      <img
        src="/images/space/cons/land.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-[4] h-[35%] w-full select-none object-cover opacity-75"
      />
 
      {/* ── CONTENT ── */}
      <div className="relative z-10 mx-auto max-w-[1540px]">
 
        {/* TOP: HEADING (left) + ISSUES (right) */}
        <div className="grid min-h-[460px] grid-cols-1 items-center gap-10 pt-8 lg:grid-cols-[1fr_420px]">
 
          {/* Left: Heading block */}
          <div className="max-w-2xl">
            <p className="cons-space-heading mb-7 text-xs font-semibold uppercase tracking-[0.44em] text-[#ef4444]">
              The Dark Side Of Space —
            </p>
 
            <h2 className="text-[clamp(2.8rem,5.4vw,6.2rem)] font-bold leading-[1.08]">
              <span className="cons-space-heading block">
                The <span className="text-[#ef4444]">Dangers.</span>
              </span>
              <span className="cons-space-heading block text-white/90">
                The Unknowns.
              </span>
            </h2>
 
            <p className="cons-space-heading mt-7 max-w-xl text-base leading-8 text-white/65 md:text-lg">
              Space is not just awe-inspiring — it is the most hostile environment in the
              universe. Radiation, vacuum, debris and cosmic chaos await anyone who dares
              to leave Earth's protective embrace.
            </p>
 
            <button
              type="button"
              className="cons-space-heading mt-9 inline-flex items-center gap-4 rounded-full border border-[#ef4444] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#ef4444] hover:shadow-[0_0_28px_rgba(239,68,68,0.45)]"
              data-cursor
            >
              Confront The Truth
              <ArrowRight size={18} />
            </button>
          </div>
 
          {/* Right: Issues list */}
          <div className="cons-space-issues space-y-6">
            {issues.map((issue) => {
              const Icon = issue.icon;
              return (
                <div key={issue.title} className="cons-space-issue flex gap-5 opacity-0">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#ef4444]/45 bg-[#ef4444]/6 text-[#ef4444] shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
 
                  <span>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-white">
                      {issue.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-white/58">
                      {issue.description}
                    </p>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
 
        {/* SECTION LABEL DIVIDER */}
        <div className="mt-8 flex items-center justify-center gap-4 text-center text-sm font-medium uppercase tracking-[0.46em] text-white">
          <span className="text-[#ef4444]">•</span>
          <span>The Cons Of Space</span>
          <span className="text-[#ef4444]">•</span>
        </div>
 
        {/* ── CARDS GRID ── */}
        <div className="cons-space-cards mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {consCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="cons-space-card group relative min-h-[248px] overflow-hidden rounded-2xl border border-red-500/18 bg-black/40 opacity-0 shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:border-[#ef4444] hover:shadow-[0_0_30px_rgba(239,68,68,0.28)]"
                data-cursor
              >
                {/* Card image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                />
 
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-[#ef4444]/10 mix-blend-multiply" />
 
                {/* Card content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-full border border-[#ef4444]/50 bg-black/65 text-[#ef4444] backdrop-blur-md">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
 
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-white">
                    {card.title}
                  </h3>
 
                  <p className="mt-3 text-sm leading-6 text-white/62">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
 
        {/* ── QUOTE PANEL ── */}
        <div className="cons-space-quote mt-8 grid overflow-hidden rounded-2xl border border-white/10 bg-black/40 opacity-0 backdrop-blur-xl lg:grid-cols-[1.35fr_1fr]">
 
          {/* Left: quote */}
          <div className="relative min-h-[145px] p-8 md:p-10">
            <div className="absolute inset-y-0 left-0 w-56 bg-[radial-gradient(circle_at_left,rgba(239,68,68,0.24),transparent_65%)]" />
 
            <p className="relative text-2xl leading-10 text-white md:text-3xl">
              "Space is not{' '}
              <span className="text-[#ef4444]">safe</span>. It is not
              friendly. It is{' '}
              <span className="text-[#ef4444]">not forgiving</span>."
            </p>
 
            <p className="relative mt-3 text-sm text-white/50">
              — Adapted from countless mission debriefs
            </p>
          </div>
 
          {/* Right: follow-up thought */}
          <div className="border-t border-white/10 p-8 lg:border-l lg:border-t-0">
            <p className="max-w-md text-xl leading-9 text-white/85">
              The universe is indifferent to our survival. Only knowledge,
              caution and{' '}
              <span className="text-[#c084fc]">relentless preparation</span>{' '}
              stand between humanity and the{' '}
              <span className="text-[#ef4444]">void</span>.
            </p>
          </div>
        </div>
 
        {/* SCROLL INDICATOR */}
        <div className="mt-10 flex flex-col items-center text-center">
          <div className="mb-2 flex h-9 w-5 items-start justify-center rounded-full border border-white/40 p-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.42em] text-white/60">
            Scroll To Learn More
          </p>
          <span className="mt-2 animate-bounce text-[#ef4444]">↓</span>
        </div>
 
      </div>
    </section>
  );
}