'use client';

import { useEffect, useRef } from 'react';

type ParticleType = 'ember' | 'spark';

type FireParticle = {
  type: ParticleType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
};

const emberColors = ['#ff4500', '#ff6b00', '#ff8c00', '#ffa500', '#ffcc00'];
const sparkColors = ['#fff7ed', '#fed7aa', '#fdba74'];

const randomBetween = (min: number, max: number) => {
  return min + Math.random() * (max - min);
};

const randomItem = <T,>(items: T[]) => {
  return items[Math.floor(Math.random() * items.length)];
};

export default function EmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<FireParticle[]>([]);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const createParticle = (type: ParticleType): FireParticle => {
      const isEmber = type === 'ember';
      const maxLife = isEmber
        ? randomBetween(180, 280)
        : randomBetween(60, 120);

      return {
        type,
        x: width * (isEmber ? Math.random() * 0.6 + 0.2 : Math.random() * 0.7 + 0.15),
        y: randomBetween(height * 0.8, height),
        vx: isEmber ? randomBetween(-0.8, 0.8) : randomBetween(-1.5, 1.5),
        vy: isEmber ? randomBetween(-3.5, -1.5) : randomBetween(-5, -2),
        size: isEmber ? randomBetween(2, 5) : randomBetween(0.5, 1.5),
        color: isEmber ? randomItem(emberColors) : randomItem(sparkColors),
        life: maxLife,
        maxLife,
      };
    };

    const spawnParticles = () => {
      for (let i = 0; i < 3; i += 1) {
        particlesRef.current.push(createParticle('ember'));
      }

      for (let i = 0; i < 5; i += 1) {
        particlesRef.current.push(createParticle('spark'));
      }

      const embers = particlesRef.current.filter((particle) => particle.type === 'ember');
      const sparks = particlesRef.current.filter((particle) => particle.type === 'spark');

      if (embers.length > 40 || sparks.length > 60) {
        particlesRef.current = [
          ...embers.slice(-40),
          ...sparks.slice(-60),
        ];
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particlesRef.current = [
        ...Array.from({ length: 40 }, () => createParticle('ember')),
        ...Array.from({ length: 60 }, () => createParticle('spark')),
      ];
    };

    const updateParticle = (particle: FireParticle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 1;

      if (particle.type === 'ember') {
        particle.vx += (Math.random() - 0.5) * 0.1;
        particle.vy *= 0.99;
        particle.size *= 0.998;
      } else {
        particle.vx += (Math.random() - 0.5) * 0.2;
      }
    };

    const drawParticle = (particle: FireParticle) => {
      const opacity = Math.max(0, (particle.life / particle.maxLife) * 0.9);

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = particle.color;

      if (particle.type === 'ember') {
        ctx.shadowBlur = particle.size * 4;
        ctx.shadowColor = particle.color;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'screen';

      spawnParticles();

      particlesRef.current = particlesRef.current.filter((particle) => {
        updateParticle(particle);

        const alive =
          particle.life > 0 &&
          particle.y > -40 &&
          particle.x > -80 &&
          particle.x < width + 80 &&
          particle.size > 0.2;

        if (alive) {
          drawParticle(particle);
        }

        return alive;
      });

      frameRef.current = requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener('resize', resize);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      particlesRef.current = [];
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="ember-heat-shimmer absolute inset-0 z-[1]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[2]"
        aria-hidden="true"
      />
      <div className="ember-lava-glow absolute bottom-0 left-0 z-[3] h-20 w-full" />

      <style jsx>{`
        .ember-heat-shimmer {
          background: linear-gradient(
            to top,
            rgba(255, 69, 0, 0.04) 0%,
            transparent 60%
          );
          transform-origin: bottom;
          animation: heat-shimmer 2s ease-in-out infinite;
        }

        .ember-lava-glow {
          background: radial-gradient(
            ellipse at 50% 100%,
            rgba(255, 100, 0, 0.3) 0%,
            transparent 70%
          );
          animation: lava-pulse 3s ease-in-out infinite;
        }

        @keyframes heat-shimmer {
          0%,
          100% {
            transform: scaleY(1);
          }

          50% {
            transform: scaleY(1.005);
          }
        }

        @keyframes lava-pulse {
          0%,
          100% {
            opacity: 0.6;
          }

          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}