'use client';

import { useEffect, useRef } from 'react';

type SandParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
};

export const heatHazeStyle = {
  filter: 'url(#heat-haze)',
};

const sandColors = [
  '#d97706',
  '#b45309',
  '#92400e',
  '#fbbf24',
  '#f59e0b',
  '#fef3c7',
];

const windStreaks = [
  { top: '22%', width: 96, duration: 6.5, delay: -1.4 },
  { top: '36%', width: 58, duration: 8.2, delay: -4.1 },
  { top: '48%', width: 118, duration: 7.4, delay: -2.7 },
  { top: '61%', width: 74, duration: 9.5, delay: -5.2 },
  { top: '72%', width: 42, duration: 5.8, delay: -0.9 },
];

const randomBetween = (min: number, max: number) => {
  return min + Math.random() * (max - min);
};

const randomItem = <T,>(items: T[]) => {
  return items[Math.floor(Math.random() * items.length)];
};

export default function DesertHeatHaze() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SandParticle[]>([]);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const existing = document.getElementById('heat-haze-svg-filter');

    if (!existing) {
      const wrapper = document.createElement('div');
      wrapper.id = 'heat-haze-svg-filter';
      wrapper.style.display = 'none';
      wrapper.innerHTML = `
        <svg aria-hidden="true" focusable="false">
          <defs>
            <filter id="heat-haze">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015 0.04"
                numOctaves="2"
                seed="2"
                result="turbulence"
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.015 0.04;0.018 0.045;0.015 0.04"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="turbulence"
                scale="4"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      `;

      document.body.appendChild(wrapper);
    }

    return () => {
      const filter = document.getElementById('heat-haze-svg-filter');

      if (filter) {
        filter.remove();
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const createParticle = (fromLeft = false): SandParticle => {
      const maxLife = randomBetween(100, 200);

      return {
        x: fromLeft ? randomBetween(-80, 0) : randomBetween(0, width),
        y: randomBetween(height * 0.6, height),
        vx: randomBetween(1.5, 4),
        vy: randomBetween(-0.2, 0.3),
        size: randomBetween(1, 3),
        opacity: randomBetween(0.25, 0.8),
        life: maxLife,
        maxLife,
        color: randomItem(sandColors),
      };
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

      particlesRef.current = Array.from({ length: 60 }, () =>
        createParticle(false)
      );
    };

    const respawn = (particle: SandParticle) => {
      const next = createParticle(true);

      particle.x = next.x;
      particle.y = next.y;
      particle.vx = next.vx;
      particle.vy = next.vy;
      particle.size = next.size;
      particle.opacity = next.opacity;
      particle.life = next.life;
      particle.maxLife = next.maxLife;
      particle.color = next.color;
    };

    const drawParticle = (particle: SandParticle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity * Math.max(0.2, particle.life / particle.maxLife);
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;

        if (particle.x > width + 40 || particle.life <= 0) {
          respawn(particle);
        }

        drawParticle(particle);
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
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[3]"
        aria-hidden="true"
      />

      <div className="desert-sun-glow absolute right-[-100px] top-[-100px] z-[1] h-[400px] w-[400px] rounded-full" />

      {windStreaks.map((streak, index) => (
        <span
          key={index}
          className="desert-wind-streak absolute left-0 z-[2] h-px"
          style={{
            top: streak.top,
            width: `${streak.width}px`,
            animationDuration: `${streak.duration}s`,
            animationDelay: `${streak.delay}s`,
          }}
        />
      ))}

      <style jsx>{`
        .desert-wind-streak {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(251, 191, 36, 0.2),
            transparent
          );
          animation-name: wind-streak;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .desert-sun-glow {
          background: radial-gradient(
            circle,
            rgba(251, 191, 36, 0.15) 0%,
            transparent 70%
          );
          animation: sun-breathe 6s ease-in-out infinite;
        }

        @keyframes wind-streak {
          0% {
            transform: translateX(-150px);
          }

          100% {
            transform: translateX(110vw);
          }
        }

        @keyframes sun-breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }

          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}