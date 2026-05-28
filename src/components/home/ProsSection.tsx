'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Brain,
  Droplets,
  Globe2,
  HeartHandshake,
  Leaf,
  Mountain,
  PawPrint,
  Rocket,
  Sprout,
  Sun,
  TreePine,
  Users,
  Waves,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  icon: React.ElementType;
  value: string;
  label: string;
  count?: number;
  suffix?: string;
  decimals?: number;
};

type ProRow = {
  number: string;
  title: string;
  description: string;
  image: string;
  scene: string;
  details: string;
  stats: Stat[];
};

const rows: ProRow[] = [
  {
    number: '01',
    title: 'Breathtaking Nature',
    description: "From towering mountains to vast oceans, nature's beauty inspires and heals.",
    image: '/images/pro/1.png',
    scene: '/images/pro/1.png',
    details:
      'Forests, mountains, rivers, oceans, and skies create the natural balance that makes life possible.',
    stats: [
      { icon: Leaf, value: '30%', label: 'Land Covered By Forests', count: 30, suffix: '%' },
      { icon: Mountain, value: '8.8M+', label: 'Unique Species', count: 8.8, suffix: 'M+', decimals: 1 },
      { icon: Waves, value: '71%', label: 'Surface Covered By Oceans', count: 71, suffix: '%' },
    ],
  },
  {
    number: '02',
    title: 'Rich Biodiversity',
    description: 'Countless species, each playing a vital role in the cycle of life.',
    image: '/images/pro/2.png',
    scene: '/images/pro/2.png',
    details:
      'Every organism is part of a living network that protects ecosystems and keeps Earth thriving.',
    stats: [
      { icon: PawPrint, value: '8.7M', label: 'Species On Earth', count: 8.7, suffix: 'M', decimals: 1 },
      { icon: Sprout, value: 'Millions', label: 'More Yet To Be Discovered' },
      { icon: Globe2, value: '1', label: 'Incredible Planet We Call Home', count: 1 },
    ],
  },
  {
    number: '03',
    title: 'Human Potential',
    description: 'Creativity, innovation and resilience drive our endless evolution.',
    image: '/images/pro/3.png',
    scene: '/images/pro/3.png',
    details:
      'Human ideas can solve problems, build communities, and create a better future for the planet.',
    stats: [
      { icon: Brain, value: '∞', label: 'Ideas & Innovation' },
      { icon: Users, value: '7B+', label: 'People Working Together', count: 7, suffix: 'B+' },
      { icon: Rocket, value: 'Limitless', label: 'Potential For A Better Future' },
    ],
  },
  {
    number: '04',
    title: 'Natural Resources',
    description: 'Sunlight, water, wind and minerals that power our world sustainably.',
    image: '/images/pro/4.png',
    scene: '/images/pro/4.png',
    details:
      'When used with care, natural resources can support progress without destroying the systems we depend on.',
    stats: [
      { icon: Sun, value: '100%', label: 'Renewable Sun Energy', count: 100, suffix: '%' },
      { icon: Droplets, value: '1.4B km³', label: 'Water Resources On Earth', count: 1.4, suffix: 'B km³', decimals: 1 },
      { icon: Leaf, value: 'Abundant', label: 'Minerals & Natural Resources' },
    ],
  },
  {
    number: '05',
    title: 'Culture & Unity',
    description: 'Diverse cultures, traditions and values make humanity one.',
    image: '/images/pro/5.png',
    scene: '/images/pro/5.png',
    details:
      'Across countries, languages, and traditions, unity gives humanity the power to protect our shared home.',
    stats: [
      { icon: Users, value: '195+', label: 'Countries, Many Cultures', count: 195, suffix: '+' },
      { icon: HeartHandshake, value: 'Unity', label: 'In Diversity' },
      { icon: Globe2, value: 'Stronger', label: 'Together For A Better World' },
    ],
  },
];

export default function ProsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const earthRef = useRef<HTMLImageElement | null>(null);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const countStats = (row: HTMLElement) => {
    row.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? '';
      const decimals = Number(el.dataset.decimals ?? 0);

      if (Number.isNaN(target)) return;

      gsap.fromTo(
        el,
        { textContent: 0 },
        {
          textContent: target,
          duration: 1.3,
          ease: 'power2.out',
          snap: { textContent: decimals ? 0.1 : 1 },
          onUpdate: () => {
            el.textContent = `${Number(el.textContent).toFixed(decimals)}${suffix}`;
          },
        }
      );
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pros-heading-line',
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        earthRef.current,
        { scale: 0.9, y: 40 },
        {
          scale: 1.1,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      rowRefs.current.forEach((row, index) => {
        if (!row) return;

        gsap.fromTo(
          row,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              once: true,
              onEnter: () => countStats(row),
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#080a06] px-6 py-28 text-white"
    >
      <img
        src="/images/pro/bg.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      <img
        src="/images/pro/dark.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-multiply"
      />

      <img
        src="/images/pro/paper.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-screen"
      />

      <img
        src="/images/pro/topl.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      <img
        ref={earthRef}
        src="/images/pro/earth.png"
        alt="Beautiful Earth"
        className="absolute right-[-12vw] rotate-[-60deg] top-[-4vw] w-[76vw] max-w-[1200px] select-none object-contain opacity-95"
      />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div className="max-w-2xl pt-6">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.42em] text-[#c8f020]">
            The Good Of Our World —
          </p>

          <h2 className="text-[clamp(2.6rem,5vw,5.8rem)] font-semibold leading-[1.08] tracking-normal">
            <span className="pros-heading-line block text-white">The Beauty.</span>
            <span className="pros-heading-line block bg-gradient-to-r from-[#c8f020] to-[#28e98c] bg-clip-text text-transparent">
              The Power.
            </span>
            <span className="pros-heading-line block text-[#63d8ff]">The Potential.</span>
          </h2>

          <p className="mt-7 max-w-xl text-base leading-8 text-white/65 md:text-lg">
            Our planet gives us life, inspiration, and endless opportunities to grow,
            connect, and create a better tomorrow.
          </p>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4 text-center text-sm font-medium uppercase tracking-[0.46em] text-[#c8f020]">
          <span>•</span>
          <span>The Pros Of Prithvi</span>
          <span>•</span>
        </div>

        <div className="mt-6 space-y-3">
          {rows.map((row, index) => {
            const isExpanded = expandedRow === row.number;

            return (
              <button
                key={row.number}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                type="button"
                onClick={() => setExpandedRow(isExpanded ? null : row.number)}
                onMouseEnter={(event) => countStats(event.currentTarget)}
                className="group w-full overflow-hidden rounded-[28px] border border-[#c8f020]/20 bg-black/35 text-left opacity-0 backdrop-blur-xl transition-all duration-300 hover:border-[#c8f020]/70 hover:shadow-[0_0_28px_rgba(200,240,32,0.22)]"
                data-cursor
              >
                <div className="grid min-h-[118px] grid-cols-[64px_120px_1.2fr_1.6fr_220px_48px] items-center gap-5 px-7 py-4 max-xl:grid-cols-[54px_96px_1fr] max-xl:gap-4">
                  <div className="text-2xl font-semibold text-[#c8f020]">
                    {row.number}
                    <span className="mt-2 block h-px w-7 bg-[#c8f020]" />
                  </div>

                  <img
                    src={row.image}
                    alt={row.title}
                    className="h-24 w-24 rounded-full border border-white/10 object-cover shadow-[0_0_30px_rgba(200,240,32,0.15)]"
                  />

                  <div>
                    <h3 className="text-2xl font-semibold text-white">{row.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-white/62">
                      {row.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-5 max-xl:col-span-3 max-xl:grid-cols-1 md:max-xl:grid-cols-3">
                    {row.stats.map((stat) => {
                      const Icon = stat.icon;

                      return (
                        <div key={stat.label} className="flex items-center gap-4">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#c8f020]/25 bg-[#c8f020]/5 text-[#c8f020]">
                            <Icon size={21} strokeWidth={1.8} />
                          </span>

                          <span>
                            <span
                              className="block text-xl font-semibold text-white"
                              data-count={stat.count}
                              data-suffix={stat.suffix}
                              data-decimals={stat.decimals}
                            >
                              {stat.value}
                            </span>
                            <span className="block max-w-[130px] text-xs leading-5 text-white/58">
                              {stat.label}
                            </span>
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="relative h-24 overflow-hidden rounded-2xl max-xl:hidden">
                    <img
                      src={row.scene}
                      alt=""
                      className="h-full w-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/20" />
                  </div>

                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[#c8f020]/40 text-[#c8f020] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={20} />
                  </span>
                </div>

                <div
                  className={`grid transition-all duration-500 ${
                    isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-white/10 px-8 py-5 text-sm leading-7 text-white/65">
                      {row.details}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center text-center">
          <div className="mb-2 flex h-9 w-5 items-start justify-center rounded-full border border-white/50 p-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" />
          </div>

          <p className="text-xs font-medium uppercase tracking-[0.42em] text-white/70">
            Scroll To See The Reality
          </p>

          <span className="mt-2 animate-bounce text-[#c8f020]">↓</span>
        </div>
      </div>
    </section>
  );
}