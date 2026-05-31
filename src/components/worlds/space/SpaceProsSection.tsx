'use client';
 
/**
 * SpaceProsSection — Space ke Benefits / Pros
 *
 * Layout:
 *  - Top: heading + eyebrow + subtext (left) + vertical stats list (right)
 *  - Middle: 4 full-width alternating rows
 *    - Each row: number, title, description, image (alternate left/right), 3 stats
 *  - Bottom: inspirational quote panel
 *
 * Animations (GSAP + ScrollTrigger):
 *  - Heading lines slide-in from left
 *  - Stats count-up on scroll
 *  - Each pro-row fades in with slight Y offset
 *  - Image panels scale-in
 *  - Quote panel fades up
 *
 * Images chahiye (public/images/space/):
 *  - pro/1.png  → Breathtaking cosmos / nebula
 *  - pro/2.png  → Satellites / ISS
 *  - pro/3.png  → Mars / exploration
 *  - pro/4.png  → Astronauts / human potential
 *  - pro/bg.png → optional subtle bg texture
 */
 
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Atom,
  Brain,
  Earth,
  FlaskConical,
  Globe2,
  Microscope,
  Rocket,
  Satellite,
  Sparkles,
  Star,
  Sun,
  Telescope,
  Users,
  Zap,
} from 'lucide-react';
 
gsap.registerPlugin(ScrollTrigger);
 
// ─── Types ───────────────────────────────────────────────────────────
type Stat = {
  icon: React.ElementType;
  value: string;
  label: string;
  // For count-up animation
  count?: number;
  suffix?: string;
  decimals?: number;
};
 
type ProRow = {
  number: string;
  title: string;
  description: string;
  details: string;
  image: string;
  accent: string;       // highlight color (CSS color string)
  stats: Stat[];
};
 
// ─── Data ─────────────────────────────────────────────────────────────
const rows: ProRow[] = [
  {
    number: '01',
    title: 'Infinite Scientific Discovery',
    description: 'Every mission unlocks secrets that reshape our understanding of the universe and ourselves.',
    details:
      'From the Big Bang to dark matter, space research drives breakthroughs in physics, chemistry, biology, and medicine that benefit everyone on Earth.',
    image: '/images/space/pro/1.png',
    accent: '#a855f7',
    stats: [
      { icon: Telescope, value: '10,000+', label: 'Exoplanets Confirmed',      count: 10000, suffix: '+' },
      { icon: Atom,      value: '5%',       label: 'Ordinary Matter Known',    count: 5,     suffix: '%' },
      { icon: Sparkles,  value: '∞',        label: 'Discoveries Still Ahead'  },
    ],
  },
  {
    number: '02',
    title: 'Technology That Changes Earth',
    description: 'Space programs gave us GPS, weather forecasting, water purification and life-saving medical tech.',
    details:
      'Spinoff technologies from NASA alone include memory foam, CAT scans, scratch-resistant lenses, and hundreds of innovations now part of everyday life.',
    image: '/images/space/pro/2.png',
    accent: '#7c3aed',
    stats: [
      { icon: Satellite,    value: '7,700+', label: 'Active Satellites Orbiting', count: 7700, suffix: '+' },
      { icon: Zap,          value: '2,000+', label: 'NASA Spinoff Technologies',  count: 2000, suffix: '+' },
      { icon: Globe2,       value: '$469B',  label: 'Global Space Economy 2023'  },
    ],
  },
  {
    number: '03',
    title: 'Humanity\'s Insurance Policy',
    description: 'Spreading life to other worlds ensures our species survives any Earth-level catastrophe.',
    details:
      'A multi-planetary civilisation means no single asteroid, pandemic or climate event can erase all of humanity. Space colonisation is the ultimate long-term survival plan.',
    image: '/images/space/pro/3.png',
    accent: '#8b5cf6',
    stats: [
      { icon: Earth,   value: '1',    label: 'Fragile Home Planet',     count: 1   },
      { icon: Rocket,  value: '2024', label: 'Year of Moon Return Plans'           },
      { icon: Brain,   value: 'Mars', label: 'Next Human Destination'              },
    ],
  },
  {
    number: '04',
    title: 'Uniting the Human Race',
    description: 'Space exploration is the one endeavour that transcends borders, politics and cultures.',
    details:
      'The ISS has hosted astronauts from 19 countries. Shared missions demand cooperation at a global scale — proving that when the goal is big enough, humanity works together.',
    image: '/images/space/pro/4.png',
    accent: '#c084fc',
    stats: [
      { icon: Users,       value: '19',   label: 'Nations on the ISS',         count: 19  },
      { icon: FlaskConical,value: '3,000+',label: 'ISS Research Experiments',  count: 3000, suffix: '+' },
      { icon: Microscope,  value: '20+',  label: 'Years Continuous Habitation', count: 20, suffix: '+'  },
    ],
  },
];
 
// ─── Component ────────────────────────────────────────────────────────
export default function SpaceProsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
 
  useEffect(() => {
    if (!sectionRef.current) return;
 
    const ctx = gsap.context(() => {
 
      // 1. HEADING LINES slide in from left
      gsap.fromTo(
        '.pros-heading-line',
        { x: -60, opacity: 0, skewX: -3 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.95,
          stagger: 0.13,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: '.pros-heading-wrap',
            start: 'top 75%',
          },
        }
      );
 
      // 2. SIDE STATS slide in from right
      gsap.fromTo(
        '.pros-side-stat',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pros-side-stats',
            start: 'top 78%',
          },
        }
      );
 
      // 3. EACH ROW fade up
      gsap.utils.toArray<HTMLElement>('.pro-row').forEach((row) => {
        gsap.fromTo(
          row,
          { y: 55, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 82%',
            },
          }
        );
 
        // Image scale-in
        const img = row.querySelector('.pro-row-img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.08, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 80%',
              },
            }
          );
        }
      });
 
      // 4. COUNT-UP for stat numbers
      gsap.utils.toArray<HTMLElement>('.pros-count').forEach((el) => {
        const target   = parseFloat(el.dataset.target   ?? '0');
        const suffix   = el.dataset.suffix   ?? '';
        const decimals = parseInt(el.dataset.decimals   ?? '0', 10);
 
        gsap.fromTo(
          { val: 0 },
          { val: target },
          {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate() {
              // `this` targets are the tweened object
              const tweenedVal = (this as gsap.core.Tween).targets()[0] as { val: number };
              el.textContent = tweenedVal.val.toFixed(decimals) + suffix;
            },
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
 
      // 5. QUOTE PANEL fade up
      gsap.fromTo(
        '.pros-quote-panel',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pros-quote-panel',
            start: 'top 88%',
          },
        }
      );
 
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#07000f] px-6 py-24 text-white sm:px-10 lg:px-20"
    >
      {/* ── SUBTLE BG TEXTURE (optional) ── */}
      <img
        src="/images/space/pro/bg.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-20"
      />
 
      {/* Glow blobs */}
      <div className="pointer-events-none absolute left-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22)_0%,transparent_65%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[15%] right-[-8%] h-[400px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_65%)] blur-3xl" />
 
      <div className="relative z-10 mx-auto max-w-[1540px]">
 
        {/* ── TOP: HEADING + SIDE STATS ── */}
        <div className="pros-heading-wrap grid gap-10 lg:grid-cols-[1fr_340px]">
 
          {/* Heading */}
          <div>
            <p className="pros-heading-line mb-7 text-xs font-semibold uppercase tracking-[0.46em] text-[#a855f7]">
              Why Space Matters —
            </p>
 
            <h2 className="text-[clamp(2.6rem,5.2vw,6rem)] font-bold leading-[1.08]">
              <span className="pros-heading-line block">
                The <span className="text-[#a855f7]">Wonders.</span>
              </span>
              <span className="pros-heading-line block text-white/90">
                The Possibilities.
              </span>
            </h2>
 
            <p className="pros-heading-line mt-7 max-w-xl text-base leading-8 text-white/60 md:text-lg">
              Space is not empty — it is full of answers. Every launch, every telescope,
              every mission brings back something that makes life on Earth richer, safer and
              more connected.
            </p>
          </div>
 
          {/* Side quick-stats */}
          <div className="pros-side-stats flex flex-col justify-center gap-7 border-l border-white/8 pl-10">
            {[
              { icon: Sun,       value: '8',    label: 'Planets in Our Solar System' },
              { icon: Star,      value: '400B', label: 'Stars in the Milky Way'       },
              { icon: Rocket,    value: '70+',  label: 'Years of Human Spaceflight'   },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="pros-side-stat flex items-center gap-5 opacity-0">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#a855f7]/40 bg-[#a855f7]/8 text-[#a855f7]">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <span>
                    <p className="text-xl font-bold text-white">{s.value}</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/50">{s.label}</p>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
 
        {/* SECTION LABEL */}
        <div className="mt-14 mb-8 flex items-center justify-center gap-4 text-center text-sm font-medium uppercase tracking-[0.46em] text-white">
          <span className="text-[#a855f7]">•</span>
          <span>The Pros of Space</span>
          <span className="text-[#a855f7]">•</span>
        </div>
 
        {/* ── ROWS ── */}
        <div className="space-y-6">
          {rows.map((row, idx) => {
            const isReversed = idx % 2 === 1;
 
            return (
              <article
                key={row.number}
                className="pro-row grid overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] opacity-0 backdrop-blur-sm lg:grid-cols-[1fr_1.1fr]"
                style={{ direction: isReversed ? 'rtl' : 'ltr' }}
              >
                {/* TEXT SIDE */}
                <div
                  className="flex flex-col justify-center p-8 md:p-12"
                  style={{ direction: 'ltr' }}
                >
                  {/* Row number */}
                  <span
                    className="mb-5 text-[4rem] font-black leading-none"
                    style={{ color: row.accent, opacity: 0.18 }}
                  >
                    {row.number}
                  </span>
 
                  <h3 className="text-[clamp(1.5rem,2.5vw,2.8rem)] font-bold leading-tight">
                    {row.title}
                  </h3>
 
                  <p className="mt-4 text-base leading-7 text-white/60">
                    {row.description}
                  </p>
 
                  <p className="mt-5 text-sm leading-7 text-white/45">
                    {row.details}
                  </p>
 
                  {/* Stats */}
                  <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/8 pt-8">
                    {row.stats.map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.label}>
                          <span
                            className="mb-3 grid h-10 w-10 place-items-center rounded-xl border"
                            style={{
                              borderColor: row.accent + '40',
                              background:  row.accent + '10',
                              color:       row.accent,
                            }}
                          >
                            <Icon size={18} strokeWidth={1.8} />
                          </span>
 
                          {/* Animated count-up if numeric */}
                          {stat.count !== undefined ? (
                            <p
                              className="pros-count text-lg font-bold text-white"
                              data-target={stat.count}
                              data-suffix={stat.suffix ?? ''}
                              data-decimals={stat.decimals ?? '0'}
                            >
                              {stat.value}
                            </p>
                          ) : (
                            <p className="text-lg font-bold text-white">{stat.value}</p>
                          )}
 
                          <p className="mt-1 text-[11px] uppercase leading-4 tracking-[0.2em] text-white/45">
                            {stat.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
 
                {/* IMAGE SIDE */}
                <div
                  className="relative min-h-[320px] overflow-hidden lg:min-h-[auto]"
                  style={{ direction: 'ltr' }}
                >
                  <img
                    src={row.image}
                    alt={row.title}
                    className="pro-row-img absolute inset-0 h-full w-full object-cover"
                  />
 
                  {/* Overlay gradient for smooth blend */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isReversed
                        ? `linear-gradient(to right, transparent 55%, #07000f 100%)`
                        : `linear-gradient(to left,  transparent 55%, #07000f 100%)`,
                    }}
                  />
 
                  {/* Tinted overlay */}
                  <div
                    className="absolute inset-0 mix-blend-multiply"
                    style={{ background: row.accent + '22' }}
                  />
 
                  {/* Row number watermark on image */}
                  <span
                    className="absolute bottom-6 right-6 text-[6rem] font-black leading-none"
                    style={{ color: row.accent, opacity: 0.12 }}
                  >
                    {row.number}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
 
        {/* ── QUOTE PANEL ── */}
        <div className="pros-quote-panel mt-8 grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] opacity-0 backdrop-blur-xl lg:grid-cols-[1.4fr_1fr]">
 
          <div className="relative min-h-[140px] p-8 md:p-10">
            <div className="absolute inset-y-0 left-0 w-64 bg-[radial-gradient(circle_at_left,rgba(124,58,237,0.3),transparent_65%)]" />
            <p className="relative text-2xl leading-10 text-white md:text-3xl">
              "That's one small step for man,{' '}
              <span className="text-[#a855f7]">one giant leap</span> for mankind."
            </p>
            <p className="relative mt-3 text-sm text-white/50">— Neil Armstrong, 1969</p>
          </div>
 
          <div className="border-t border-white/10 p-8 lg:border-l lg:border-t-0">
            <p className="max-w-md text-xl leading-9 text-white/85">
              The cosmos is all that is, or ever was, or{' '}
              <span className="text-[#c084fc]">ever will be</span>.
              Our longing to understand it is one of the{' '}
              <span className="text-[#a855f7]">most defining</span>{' '}
              human traits.
            </p>
          </div>
        </div>
 
      </div>
    </section>
  );
}