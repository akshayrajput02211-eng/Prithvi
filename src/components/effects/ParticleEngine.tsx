'use client';

import { useEffect, useRef } from 'react';

type Direction = 'up' | 'down' | 'float' | 'radial' | 'drift';
type SpawnArea = 'full' | 'bottom' | 'top' | 'edges';

export interface ParticleEngineProps {
  count: number;
  colors: string[];
  minSize: number;
  maxSize: number;
  minSpeed: number;
  maxSpeed: number;
  direction: Direction;
  spawnArea: SpawnArea;
  fadeOut: boolean;
  glow: boolean;
  glowColor?: string;
  blendMode?: GlobalCompositeOperation;
  className?: string;
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  angle: number;
  angularVel: number;
};

const randomBetween = (min: number, max: number) => {
  return min + Math.random() * (max - min);
};

const randomItem = <T,>(items: T[]) => {
  return items[Math.floor(Math.random() * items.length)];
};

export default function ParticleEngine({
  count,
  colors,
  minSize,
  maxSize,
  minSpeed,
  maxSpeed,
  direction,
  spawnArea,
  fadeOut,
  glow,
  glowColor,
  blendMode,
  className = '',
}: ParticleEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;

      width = canvas.offsetWidth;
      height = canvas.offsetHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const getSpawnPosition = () => {
      if (spawnArea === 'bottom') {
        return {
          x: randomBetween(0, width),
          y: randomBetween(height * 0.82, height * 1.08),
        };
      }

      if (spawnArea === 'top') {
        return {
          x: randomBetween(0, width),
          y: randomBetween(-height * 0.08, height * 0.18),
        };
      }

      if (spawnArea === 'edges') {
        const edge = Math.floor(Math.random() * 4);

        if (edge === 0) return { x: randomBetween(0, width), y: 0 };
        if (edge === 1) return { x: width, y: randomBetween(0, height) };
        if (edge === 2) return { x: randomBetween(0, width), y: height };

        return { x: 0, y: randomBetween(0, height) };
      }

      return {
        x: randomBetween(0, width),
        y: randomBetween(0, height),
      };
    };

    const getVelocity = (x: number, y: number) => {
      const speed = randomBetween(minSpeed, maxSpeed);

      if (direction === 'up') {
        return {
          vx: randomBetween(-speed * 0.35, speed * 0.35),
          vy: -speed,
        };
      }

      if (direction === 'down') {
        return {
          vx: randomBetween(-speed * 0.35, speed * 0.35),
          vy: speed,
        };
      }

      if (direction === 'radial') {
        const centerX = width / 2;
        const centerY = height / 2;
        const angle = Math.atan2(y - centerY, x - centerX);

        return {
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      }

      if (direction === 'drift') {
        return {
          vx: randomBetween(speed * 0.2, speed),
          vy: randomBetween(-speed * 0.35, speed * 0.35),
        };
      }

      return {
        vx: randomBetween(-speed, speed),
        vy: randomBetween(-speed, speed),
      };
    };

    const createParticle = (): Particle => {
      const { x, y } = getSpawnPosition();
      const { vx, vy } = getVelocity(x, y);
      const maxLife = randomBetween(120, 320);

      return {
        x,
        y,
        vx,
        vy,
        size: randomBetween(minSize, maxSize),
        opacity: randomBetween(0.35, 1),
        color: randomItem(colors.length ? colors : ['#ffffff']),
        life: maxLife,
        maxLife,
        angle: randomBetween(0, Math.PI * 2),
        angularVel: randomBetween(-0.03, 0.03),
      };
    };

    const isOutOfBounds = (particle: Particle) => {
      const buffer = particle.size * 8;

      return (
        particle.x < -buffer ||
        particle.x > width + buffer ||
        particle.y < -buffer ||
        particle.y > height + buffer
      );
    };

    const spawnMissingParticles = () => {
      while (particlesRef.current.length < count) {
        particlesRef.current.push(createParticle());
      }
    };

    const updateParticle = (particle: Particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 1;
      particle.angle += particle.angularVel;

      if (direction === 'float') {
        particle.x += Math.cos(particle.angle) * 0.25;
        particle.y += Math.sin(particle.angle) * 0.25;
      }

      if (fadeOut) {
        particle.opacity = Math.max(0, particle.life / particle.maxLife);
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.save();

      ctx.globalAlpha = particle.opacity;
      ctx.globalCompositeOperation = blendMode ?? 'source-over';

      if (glow) {
        ctx.shadowBlur = particle.size * 3;
        ctx.shadowColor = glowColor ?? particle.color;
      }

      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current = particlesRef.current.filter((particle) => {
        updateParticle(particle);

        const alive = particle.life > 0 && !isOutOfBounds(particle);

        if (alive) {
          drawParticle(particle);
        }

        return alive;
      });

      spawnMissingParticles();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    resize();
    particlesRef.current = [];
    spawnMissingParticles();
    render();

    window.addEventListener('resize', resize);

    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }

      particlesRef.current = [];
      window.removeEventListener('resize', resize);
    };
  }, [
    count,
    colors,
    minSize,
    maxSize,
    minSpeed,
    maxSpeed,
    direction,
    spawnArea,
    fadeOut,
    glow,
    glowColor,
    blendMode,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute left-0 top-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}