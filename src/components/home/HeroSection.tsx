'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronDown,
  Mountain,
  Play,
  Recycle,
  Rocket,
  Smile,
  Snowflake,
  TreePine,
  Waves,
  Flame,
  Cpu,
  type LucideIcon,
} from 'lucide-react';

import { useCircleTransition } from '@/hooks/useCircleTransition';
import { useLenis } from '@/lib/lenis';
import { WORLDS } from '@/lib/worlds.config';

gsap.registerPlugin(ScrollTrigger);

const worldIcons: Record<string, LucideIcon> = {
  space: Rocket,
  ocean: Waves,
  forest: TreePine,
  desert: Mountain,
  volcano: Flame,
  iceberg: Snowflake,
  garbage: Recycle,
  tech: Cpu,
  cartoon: Smile,
};

export default function HeroSection() {
  const lenis = useLenis();
  const startTransition = useCircleTransition();

  const sectionRef = useRef<HTMLElement | null>(null);
  const earthRef = useRef<HTMLImageElement | null>(null);
  const star1Ref = useRef<HTMLImageElement | null>(null);
  const star2Ref = useRef<HTMLImageElement | null>(null);

  const [hoveredWorld, setHoveredWorld] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title-char',
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: 'power4.out',
        }
      );

      gsap.fromTo(
        '.hero-fade',
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          delay: 0.55,
          ease: 'power3.out',
        }
      );

      gsap.to(earthRef.current, {
        rotate: 360,
        duration: 120,
        repeat: -1,
        ease: 'none',
      });

      gsap.fromTo(
        earthRef.current,
        { scale: 1 },
        {
          scale: 0.7,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!lenis) return;

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
    };
  }, [lenis]);

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      gsap.to(star1Ref.current, {
        x: x * 22,
        y: y * 16,
        duration: 1.2,
        ease: 'power3.out',
      });

      gsap.to(star2Ref.current, {
        x: x * 42,
        y: y * 28,
        duration: 1.2,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      <img
        src="/images/home/bg.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <img
        ref={star1Ref}
        src="/images/home/star1.png"
        alt=""
        className="absolute inset-[-4%] h-[108%] w-[108%] object-cover opacity-70"
      />

      <img
        ref={star2Ref}
        src="/images/home/star2.png"
        alt=""
        className="absolute inset-[-5%] h-[110%] w-[110%] object-cover opacity-55"
      />

      <img
        src="/images/home/blackdust.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      <img
        src="/images/home/blackdust2.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />

      <div className="absolute left-1/2 top-[18%] h-[46vw] max-h-[720px] w-[46vw] max-w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,204,102,0.34)_0%,rgba(255,204,102,0.08)_42%,transparent_70%)] blur-2xl" />

      <img
        ref={earthRef}
        src="/images/home/earth.png"
        alt="Earth"
        className="absolute left-1/2 top-[8%] z-10 w-[70vw] max-w-[1080px] -translate-x-1/2 select-none object-contain"
      />

      <span className="shooting-star absolute left-[18%] top-[18%] z-20 h-px w-28 rotate-[28deg] bg-gradient-to-r from-transparent via-white to-transparent opacity-0" />

      <img
        src="/images/home/fog.png"
        alt=""
        className="absolute bottom-0 left-0 z-20 h-[45%] w-full object-cover opacity-70"
      />

      <img
        src="/images/home/fog2.png"
        alt=""
        className="absolute bottom-0 left-0 z-20 h-[38%] w-full object-cover opacity-60"
      />

      <div className="relative z-30 flex min-h-screen flex-col items-center justify-center px-6 pb-28 pt-32 text-center">
        <p className="hero-fade mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#c8f020]">
          One Planet. Infinite Experiences.
        </p>

        <h1
          className="overflow-hidden bg-gradient-to-r from-white via-[#f7d77a] to-white bg-clip-text text-[clamp(4.5rem,11vw,12rem)] font-semibold leading-none tracking-[0.28em] text-transparent"
          style={{ fontFamily: 'var(--font-orbitron), Orbitron, sans-serif' }}
        >
          {'PRITHVI'.split('').map((char) => (
            <span key={char} className="hero-title-char inline-block">
              {char}
            </span>
          ))}
        </h1>

        <p className="hero-fade mt-8 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
          A journey through 9 unique worlds, crafted with code, creativity and a
          passion for immersive experiences.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="hero-fade mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-medium text-white shadow-2xl backdrop-blur-xl"
          data-cursor
        >
          <Play size={16} fill="white" />
          Watch Trailer
        </motion.button>
      </div>

      <div className="absolute bottom-24 left-1/2 z-40 w-full max-w-[1560px] -translate-x-1/2 px-6">
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-[0.48em] text-white">
          <span className="text-[#c8f020]">•</span> Choose Your World{' '}
          <span className="text-[#c8f020]">•</span>
        </p>

        <div className="flex justify-center gap-3 xl:gap-4">
          {WORLDS.map((world) => {
            const Icon = worldIcons[world.id];
            const isFocused = hoveredWorld === world.id;
            const isDimmed = hoveredWorld && !isFocused;

            return (
              <motion.button
                key={world.id}
                type="button"
                onMouseEnter={() => setHoveredWorld(world.id)}
                onMouseLeave={() => setHoveredWorld(null)}
                onClick={(event) => startTransition(world.id, event)}
                animate={{ scale: isDimmed ? 0.95 : 1 }}
                whileHover={{
                  scale: 1.08,
                  y: -12,
                  boxShadow: `0 0 20px ${world.accentColor}`,
                  borderColor: world.accentColor,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="group relative h-[200px] w-[120px] overflow-hidden rounded-xl border border-white/15 bg-white/5 text-left shadow-2xl"
                data-cursor
              >
                <img
                  src={world.cardImage}
                  alt={world.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/25 p-4 text-center backdrop-blur-md">
                  <div
                    className="mx-auto mb-2 grid h-8 w-8 place-items-center rounded-full border"
                    style={{
                      borderColor: world.accentColor,
                      color: world.accentColor,
                      boxShadow: `0 0 14px ${world.accentColor}55`,
                    }}
                  >
                    {Icon && <Icon size={16} />}
                  </div>

                  <p className="text-sm tracking-[0.18em] text-white/75">
                    {world.number}
                  </p>

                  <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-white">
                    {world.label}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-40 -translate-x-1/2 text-center">
        <div className="mx-auto mb-2 flex h-9 w-5 items-start justify-center rounded-full border border-white/50 p-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" />
        </div>

        <p className="text-[10px] uppercase tracking-[0.34em] text-white/70">
          Scroll Down
        </p>

        <ChevronDown
          size={22}
          className="mx-auto mt-2 animate-bounce text-[#c8f020]"
        />
      </div>

      <p className="absolute bottom-8 right-16 z-40 hidden text-sm text-white/50 lg:block">
        © 2024 PRITHVI. All rights reserved.
      </p>

      <style jsx>{`
        .shooting-star {
          animation: shooting-star 5.5s ease-in-out infinite;
          animation-delay: 1.2s;
        }

        @keyframes shooting-star {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(28deg);
          }

          8% {
            opacity: 1;
          }

          18% {
            opacity: 0;
            transform: translate3d(520px, 260px, 0) rotate(28deg);
          }

          100% {
            opacity: 0;
            transform: translate3d(520px, 260px, 0) rotate(28deg);
          }
        }
      `}</style>
    </section>
  );
}