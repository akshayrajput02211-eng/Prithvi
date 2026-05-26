'use client';

import { useEffect, useMemo, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

import StarParticles from '@/components/effects/StarParticles';
import OceanWaves from '@/components/effects/OceanWaves';
import LeafParticles from '@/components/effects/LeafParticles';
import EmberParticles from '@/components/effects/EmberParticles';
import FrostOverlay from '@/components/effects/FrostOverlay';
import IcebergDrift from '@/components/effects/IcebergDrift';
import GlitchOverlay from '@/components/effects/GlitchOverlay';
import DesertHeatHaze from '@/components/effects/DesertHeatHaze';
import CartoonBounce from '@/components/effects/CartoonBounce';
import { WORLDS } from '@/lib/worlds.config';
import { useWorldStore } from '@/store/worldStore';

type WorldPageTemplateProps = {
  worldId: string;
};

const fontMap: Record<string, string> = {
  Orbitron: 'var(--font-orbitron)',
  Satoshi: 'var(--font-jakarta)',
  Poppins: 'var(--font-poppins)',
  Montserrat: 'var(--font-montserrat)',
  'Bebas Neue': 'var(--font-bebas)',
};

function getEffect(worldId: string): ReactNode {
  if (worldId === 'space') return <StarParticles count={200} color="#c084fc" />;
  if (worldId === 'ocean') return <OceanWaves />;
  if (worldId === 'forest') return <LeafParticles />;
  if (worldId === 'desert') return <DesertHeatHaze />;
  if (worldId === 'volcano') return <EmberParticles />;
  if (worldId === 'iceberg') return <><FrostOverlay /><IcebergDrift /></>;
  if (worldId === 'garbage') return <GlitchOverlay variant="garbage" />;
  if (worldId === 'tech') return <GlitchOverlay variant="tech" />;
  if (worldId === 'cartoon') return <CartoonBounce />;

  return null;
}

export default function WorldPageTemplate({ worldId }: WorldPageTemplateProps) {
  const setWorld = useWorldStore((state) => state.setWorld);

  const world = useMemo(() => {
    return WORLDS.find((item) => item.id === worldId);
  }, [worldId]);

  useEffect(() => {
    if (!world) return;

    setWorld(world.id);

    document.documentElement.style.setProperty('--world-accent', world.accentColor);
    document.documentElement.style.setProperty('--world-primary', world.cursorColor);
    document.documentElement.style.setProperty('--world-cursor', world.cursorColor);
    document.documentElement.style.setProperty('--world-bg', world.bgColor);
  }, [setWorld, world]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.world-hero-item',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power4.out' }
      );
    });

    return () => ctx.revert();
  }, [worldId]);

  if (!world) {
    return (
      <main className="grid min-h-screen place-items-center bg-black text-white">
        World not found
      </main>
    );
  }

  const projects = [
    ...world.projects,
    { id: 'atmosphere', title: `${world.label} Atmosphere`, image: world.cardImage },
    { id: 'journey', title: `${world.label} Journey`, image: world.cardImage },
    { id: 'mission', title: `${world.label} Mission`, image: world.cardImage },
    { id: 'archive', title: `${world.label} Archive`, image: world.cardImage },
  ].slice(0, 4);

  return (
    <main
      className="relative min-h-screen overflow-hidden text-white"
      style={{
        background:
          `radial-gradient(circle at 75% 30%, ${world.accentColor}33, transparent 34%), ${world.bgColor}`,
        fontFamily: `${fontMap[world.font] ?? 'var(--font-jakarta)'}, Arial, sans-serif`,
      }}
    >
      <div className="absolute inset-0">{getEffect(world.id)}</div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

      <section className="relative z-10 flex min-h-screen items-center px-8 pb-36 pt-32 lg:px-28">
        <div className="max-w-3xl">
          <p className="world-hero-item mb-5 text-sm font-bold uppercase tracking-[0.42em]" style={{ color: world.accentColor }}>
            {world.number} {world.label}
          </p>

          <h1 className="world-hero-item text-[clamp(3.2rem,8vw,9rem)] font-black uppercase leading-[0.95]">
            {world.headline}
          </h1>

          <p className="world-hero-item mt-7 max-w-xl text-lg leading-8 text-white/70">
            {world.subline}
          </p>

          <div className="world-hero-item mt-9 flex flex-wrap gap-4">
            <button
              className="rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-black"
              style={{ backgroundColor: world.accentColor }}
              data-cursor
            >
              Enter World
            </button>

            <a
              href="#projects"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] backdrop-blur-xl"
              data-cursor
            >
              View Projects <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div
          className="pointer-events-none absolute right-[-8vw] top-[20vh] h-[42vw] max-h-[720px] w-[42vw] max-w-[720px] rounded-full opacity-70 blur-[1px] animate-count-rotate"
          style={{
            background:
              `radial-gradient(circle at 35% 30%, #fff, ${world.accentColor} 22%, ${world.bgColor} 70%)`,
            boxShadow: `0 0 120px ${world.accentColor}66`,
          }}
        />

        <span className="pointer-events-none absolute bottom-12 right-8 text-[22vw] font-black leading-none text-white/[0.04]">
          {world.number}
        </span>
      </section>

      <section id="projects" className="relative z-10 px-8 pb-28 lg:px-28">
        <h2 className="mb-8 text-3xl font-black uppercase tracking-[0.16em]">
          Projects
        </h2>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl transition hover:-translate-y-2"
              data-cursor
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h3 className="font-bold uppercase tracking-[0.12em]">
                  {project.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}