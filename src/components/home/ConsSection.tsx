'use client';

import { useEffect, useRef, type ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Axe,
  CloudFog,
  Droplets,
  Factory,
  Gauge,
  Skull,
  ThermometerSun,
  TriangleAlert,
  Users,
  Waves,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Issue = {
  icon: ElementType;
  title: string;
  description: string;
};

type ConsCard = {
  title: string;
  description: string;
  image: string;
  icon: ElementType;
};

const issues: Issue[] = [
  {
    icon: ThermometerSun,
    title: 'Climate Change',
    description: 'Rising temperatures, extreme weather and unpredictable natural disasters.',
  },
  {
    icon: Droplets,
    title: 'Pollution',
    description: 'Toxic air, polluted water and plastic consuming our land and oceans.',
  },
  {
    icon: Axe,
    title: 'Deforestation',
    description: 'Lost forests, lost habitats, and a broken balance of nature.',
  },
  {
    icon: Users,
    title: 'Overpopulation',
    description: 'Strained resources, urban chaos and a race for survival.',
  },
  {
    icon: TriangleAlert,
    title: 'Loss Of Biodiversity',
    description: 'Species are disappearing forever. The silence of extinction is real.',
  },
];

const consCards: ConsCard[] = [
  {
    title: 'Air Pollution',
    description: 'Invisible poison we breathe every day.',
    image: '/images/cons/1.png',
    icon: Factory,
  },
  {
    title: 'Ocean Destruction',
    description: 'Our oceans are choking on plastic and waste.',
    image: '/images/cons/2.png',
    icon: Waves,
  },
  {
    title: 'Forest Loss',
    description: 'Every tree cut down is a loss we cannot undo.',
    image: '/images/cons/3.png',
    icon: Axe,
  },
  {
    title: 'Water Scarcity',
    description: 'Freshwater is running out, faster than we think.',
    image: '/images/cons/4.png',
    icon: Droplets,
  },
  {
    title: 'Overconsumption',
    description: 'We consume more than the Earth can heal.',
    image: '/images/cons/5.png',
    icon: Users,
  },
  {
    title: 'Waste Crisis',
    description: 'Mountains of garbage with no place to go.',
    image: '/images/cons/6.png',
    icon: Skull,
  },
  {
    title: 'Extinction Risk',
    description: 'Many species will not survive our choices.',
    image: '/images/cons/7.png',
    icon: CloudFog,
  },
];

export default function ConsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const earthRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(earthRef.current, {
        keyframes: [
          { x: -2, duration: 0.1 },
          { x: 2, duration: 0.1 },
          { x: -1, duration: 0.1 },
          { x: 1, duration: 0.1 },
          { x: 0, duration: 0.1 },
        ],
        repeat: -1,
        repeatDelay: 2.2,
        ease: 'none',
      });

      gsap.fromTo(
        '.cons-heading-line',
        { x: -50, opacity: 0, skewX: -4 },
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

      gsap.fromTo(
        '.cons-issue',
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cons-issues-list',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.cons-card',
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cons-cards-grid',
            start: 'top 86%',
          },
        }
      );

      gsap.fromTo(
        '.cons-quote-panel',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cons-quote-panel',
            start: 'top 88%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random(),
      y: 1 + Math.random() * 0.35,
      radius: 1 + Math.random() * 2.8,
      speed: 0.0015 + Math.random() * 0.0025,
      drift: -0.001 + Math.random() * 0.002,
      opacity: 0.25 + Math.random() * 0.55,
    }));

    let width = 0;
    let height = 0;
    let frameId = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      width = canvas.offsetWidth;
      height = canvas.offsetHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.y -= particle.speed;
        particle.x += particle.drift;

        if (particle.y < -0.08) {
          particle.y = 1.08 + Math.random() * 0.18;
          particle.x = Math.random();
          particle.radius = 1 + Math.random() * 2.8;
          particle.opacity = 0.25 + Math.random() * 0.55;
        }

        const x = particle.x * width;
        const y = particle.y * height;
        const gradient = context.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          particle.radius * 8
        );

        gradient.addColorStop(0, `rgba(255, 95, 35, ${particle.opacity})`);
        gradient.addColorStop(0.45, `rgba(239, 68, 68, ${particle.opacity * 0.35})`);
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(x, y, particle.radius * 8, 0, Math.PI * 2);
        context.fill();
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
      className="relative min-h-screen overflow-hidden bg-[#050505] px-6 py-24 text-white"
    >
      <img
        src="/images/cons/bg.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-75"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black" />

      <img
        src="/images/cons/particle.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen"
      />

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      />

      <div className="absolute left-[37%] top-[14%] h-[44vw] max-h-[720px] w-[44vw] max-w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.34)_0%,rgba(127,29,29,0.14)_42%,transparent_72%)] blur-3xl" />

      <img
        ref={earthRef}
        src="/images/cons/earth.png"
        alt="Damaged Earth"
        className="absolute left-[34%] top-[4%] z-[3] w-[55vw] max-w-[980px] -translate-x-1/2 select-none object-contain opacity-95"
      />

      <img
        src="/images/cons/land.png"
        alt=""
        className="absolute bottom-0 left-0 z-[4] h-[38%] w-full object-cover opacity-80"
      />

      <div className="relative z-10 mx-auto max-w-[1540px]">
        <div className="grid min-h-[460px] grid-cols-1 items-center gap-10 pt-8 lg:grid-cols-[1fr_440px]">
          <div className="max-w-2xl">
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.42em] text-[#ef4444]">
              The Reality We Face —
            </p>

            <h2 className="text-[clamp(2.8rem,5.4vw,6.2rem)] font-semibold leading-[1.08]">
              <span className="cons-heading-line block">
                The <span className="text-[#ef4444]">Damage.</span>
              </span>
              <span className="cons-heading-line block text-white/90">
                The Consequences.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/65 md:text-lg">
              Our planet is struggling. Every choice we ignore today shapes a
              harder tomorrow. These are the harsh truths we must confront.
            </p>

            <button
              type="button"
              className="mt-9 inline-flex items-center gap-4 rounded-full border border-[#ef4444] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#ef4444] hover:shadow-[0_0_26px_rgba(239,68,68,0.45)]"
              data-cursor
            >
              Wake Up to Reality
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="cons-issues-list space-y-7">
            {issues.map((issue) => {
              const Icon = issue.icon;

              return (
                <div key={issue.title} className="cons-issue flex gap-5 opacity-0">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#ef4444]/45 bg-[#ef4444]/5 text-[#ef4444] shadow-[0_0_20px_rgba(239,68,68,0.16)]">
                    <Icon size={23} strokeWidth={1.8} />
                  </span>

                  <span>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-white">
                      {issue.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-white/62">
                      {issue.description}
                    </p>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-center text-sm font-medium uppercase tracking-[0.46em] text-white">
          <span className="text-[#ef4444]">•</span>
          <span>The Cons Of Prithvi</span>
          <span className="text-[#ef4444]">•</span>
        </div>

        <div className="cons-cards-grid mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {consCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="cons-card group relative min-h-[240px] overflow-hidden rounded-2xl border border-red-500/20 bg-black/45 opacity-0 shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:border-[#ef4444] hover:shadow-[0_0_28px_rgba(239,68,68,0.28)]"
                data-cursor
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-[#ef4444]/12 mix-blend-multiply" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-full border border-[#ef4444]/50 bg-black/65 text-[#ef4444] backdrop-blur-md">
                    <Icon size={21} strokeWidth={1.8} />
                  </span>

                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-white">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/67">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="cons-quote-panel mt-6 grid overflow-hidden rounded-2xl border border-white/10 bg-black/45 opacity-0 backdrop-blur-xl lg:grid-cols-[1.35fr_1fr]">
          <div className="relative min-h-[145px] p-8">
            <div className="absolute inset-y-0 left-0 w-56 bg-[radial-gradient(circle_at_left,rgba(239,68,68,0.24),transparent_65%)]" />

            <p className="relative text-2xl leading-10 text-white md:text-3xl">
              “The Earth does not belong to us:{' '}
              <span className="text-[#ef4444]">we belong</span> to the Earth.”
            </p>

            <p className="relative mt-3 text-sm text-white/55">— Chief Seattle</p>
          </div>

          <div className="border-t border-white/10 p-8 lg:border-l lg:border-t-0">
            <p className="max-w-md text-xl leading-8 text-white/88">
              The future is not something we enter. The future is something we{' '}
              <span className="text-[#c8f020]">create</span> — or{' '}
              <span className="text-[#ef4444]">destroy</span>.
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col items-center text-center">
          <div className="mb-2 flex h-9 w-5 items-start justify-center rounded-full border border-white/50 p-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" />
          </div>

          <p className="text-xs font-medium uppercase tracking-[0.42em] text-white/70">
            Scroll To Take Action
          </p>

          <span className="mt-2 animate-bounce text-[#ef4444]">↓</span>
        </div>
      </div>
    </section>
  );
}