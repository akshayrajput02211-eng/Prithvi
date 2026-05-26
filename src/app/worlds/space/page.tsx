'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  CircleDot,
  Rocket,
  Satellite,
  Sparkles,
  Telescope,
} from 'lucide-react';

import StarParticles from '@/components/effects/StarParticles';
import { WORLDS } from '@/lib/worlds.config';

gsap.registerPlugin(ScrollTrigger);

const spaceWorld = WORLDS.find((world) => world.id === 'space');

const projects = [
  {
    id: 'nebula',
    title: 'Nebula',
    image: '/images/home/card1.png',
    description: 'Colorful clouds of cosmic dust and newborn stars.',
  },
  {
    id: 'planets',
    title: 'Planets',
    image: '/images/home/card1.png',
    description: 'Explore alien worlds, rings, moons and silent horizons.',
  },
  {
    id: 'black-hole',
    title: 'Black Hole',
    image: '/images/home/card1.png',
    description: 'Enter the gravity well where space and time bend.',
  },
  {
    id: 'astronaut',
    title: 'Astronaut',
    image: '/images/home/card1.png',
    description: 'Float through orbit in a human journey beyond Earth.',
  },
];

export default function SpaceWorldPage() {
  const pageRef = useRef<main | null>(null);
  const planetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    document.documentElement.style.setProperty('--world-font', 'Orbitron');
    document.documentElement.style.setProperty('--world-accent', '#a855f7');
    document.documentElement.style.setProperty('--world-primary', '#7c3aed');
    document.documentElement.style.setProperty('--world-cursor', '#c084fc');
    document.documentElement.style.setProperty('--world-bg', '#0a0015');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.space-hero-item',
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.13,
          ease: 'power4.out',
        }
      );

      gsap.fromTo(
        '.space-project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.space-project-grid',
            start: 'top 82%',
          },
        }
      );

      gsap.to('.space-parallax', {
        y: -90,
        opacity: 0.65,
        ease: 'none',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(planetRef.current, {
        y: 80,
        scale: 0.92,
        ease: 'none',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_78%_35%,#1a0050_0%,#100033_34%,#0a0015_68%,#030008_100%)] text-white"
      style={{
        fontFamily: 'var(--world-font), Orbitron, sans-serif',
      }}
    >
      <StarParticles count={200} color="#c084fc" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(168,85,247,0.24),transparent_34%),radial-gradient(circle_at_28%_78%,rgba(59,130,246,0.16),transparent_28%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/70" />

      <WorldNav />

      <WorldHeader />

      <div
        ref={planetRef}
        className="absolute right-[-11vw] top-[16vh] h-[52vw] max-h-[780px] w-[52vw] max-w-[780px] rounded-full opacity-95"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#d8b4fe_0%,#7c3aed_24%,#1d4ed8_48%,#120037_72%,#030008_100%)] shadow-[0_0_120px_rgba(168,85,247,0.45),inset_-70px_-40px_90px_rgba(0,0,0,0.72)] animate-count-rotate" />
        <div className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.28),transparent_66%)] blur-3xl" />
        <div className="absolute left-[-10%] top-[46%] h-[8%] w-[122%] -rotate-12 rounded-full border border-purple-300/25 bg-purple-200/5 blur-[1px]" />
      </div>

      <section className="relative z-10 ml-0 flex min-h-screen items-center px-6 pb-40 pt-32 lg:ml-[120px] lg:px-16">
        <div className="space-parallax max-w-3xl">
          <p className="space-hero-item mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.42em] text-[#c084fc]">
            <CircleDot size={14} />
            01 Space
          </p>

          <h1 className="space-hero-item text-[clamp(3.5rem,8vw,9.5rem)] font-bold uppercase leading-[0.95] tracking-[0.08em] text-white">
            {spaceWorld?.headline ?? 'Explore The Cosmos'}
          </h1>

          <p className="space-hero-item mt-7 max-w-xl text-base leading-8 text-white/68 md:text-lg">
            Journey through the infinite beauty of space and galaxies.
          </p>

          <div className="space-hero-item mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="rounded-full bg-[#7c3aed] px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_32px_rgba(124,58,237,0.5)] transition-all duration-300 hover:bg-[#a855f7]"
              data-cursor
            >
              Enter World
            </button>

            <a
              href="#space-projects"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-xl transition-all duration-300 hover:border-[#c084fc] hover:text-white"
              data-cursor
            >
              View Projects
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <span className="pointer-events-none absolute bottom-16 right-10 text-[22vw] font-black leading-none tracking-[-0.08em] text-white/[0.04]">
          01
        </span>
      </section>

      <section
        id="space-projects"
        className="relative z-10 ml-0 px-6 pb-24 lg:ml-[120px] lg:px-16"
      >
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[#c084fc]">
              Space Projects
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-[0.12em]">
              Cosmic Missions
            </h2>
          </div>

          <Rocket className="hidden text-[#c084fc] md:block" size={34} />
        </div>

        <div className="space-project-grid grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <article
              key={project.id}
              className="space-project-card group overflow-hidden rounded-2xl border border-purple-300/15 bg-white/[0.04] opacity-0 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#c084fc] hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
              data-cursor
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0015] via-transparent to-transparent" />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold uppercase tracking-[0.14em]">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function WorldHeader() {
  return (
    <header className="fixed left-0 top-0 z-[80] w-full bg-gradient-to-b from-black/65 to-transparent px-8 py-7 lg:pl-[150px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-white/45">
            Prithvi Worlds
          </p>
          <h2 className="mt-1 text-sm font-semibold uppercase tracking-[0.26em] text-white">
            Space Dimension
          </h2>
        </div>

        <div className="hidden items-center gap-3 rounded-full border border-purple-300/20 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.2em] text-white/70 backdrop-blur-xl md:flex">
          <Sparkles size={15} className="text-[#c084fc]" />
          Live Experience
        </div>
      </div>
    </header>
  );
}

function WorldNav() {
  const navItems = [
    { label: 'Space', icon: Rocket, active: true },
    { label: 'Nebula', icon: Sparkles },
    { label: 'Planets', icon: CircleDot },
    { label: 'Satellite', icon: Satellite },
    { label: 'Telescope', icon: Telescope },
  ];

  return (
    <aside className="fixed left-7 top-1/2 z-[90] hidden -translate-y-1/2 xl:block">
      <div className="relative flex w-[92px] flex-col items-center rounded-[30px] border border-purple-300/15 bg-black/30 px-4 py-8 backdrop-blur-2xl">
        <span className="absolute left-1/2 top-24 h-[280px] w-px -translate-x-1/2 bg-purple-200/10" />

        <div className="mb-12 grid h-14 w-14 place-items-center rounded-full border border-[#c084fc] bg-[#7c3aed]/15 text-[#c084fc] shadow-[0_0_28px_rgba(168,85,247,0.55)]">
          <Rocket size={24} />
        </div>

        <div className="relative z-10 flex flex-col gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={`group relative grid h-10 w-10 place-items-center rounded-full transition-all duration-300 ${
                  item.active
                    ? 'bg-[#7c3aed] text-white shadow-[0_0_22px_rgba(168,85,247,0.55)]'
                    : 'text-white/55 hover:text-white'
                }`}
                data-cursor
              >
                <Icon size={19} />

                <span className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 rounded-full border border-purple-300/20 bg-black/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:left-16 group-hover:opacity-100">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}