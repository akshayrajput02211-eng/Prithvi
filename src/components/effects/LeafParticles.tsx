'use client';

import { useEffect, useRef } from 'react';

type Leaf = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  opacity: number;
  color: string;
  phase: number;
  amplitude: number;
};

const leafColors = [
  '#4ade80',
  '#16a34a',
  '#15803d',
  '#bbf7d0',
  '#86efac',
  '#dcfce7',
  '#a3e635',
];

const lightRays = [
  { left: '10%', width: 80, rotate: -10, delay: '0s', duration: '5.5s' },
  { left: '22%', width: 120, rotate: -4, delay: '1.5s', duration: '6.5s' },
  { left: '38%', width: 70, rotate: 6, delay: '3s', duration: '5s' },
  { left: '54%', width: 100, rotate: 10, delay: '4.5s', duration: '7s' },
];

const randomBetween = (min: number, max: number) => {
  return min + Math.random() * (max - min);
};

const randomItem = <T,>(items: T[]) => {
  return items[Math.floor(Math.random() * items.length)];
};

export default function LeafParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const leavesRef = useRef<Leaf[]>([]);
  const frameRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const createLeaf = (startAbove = false): Leaf => ({
      x: randomBetween(0, width),
      y: startAbove ? randomBetween(-height * 0.1, 0) : randomBetween(0, height),
      vx: randomBetween(-0.5, 0.5),
      vy: randomBetween(0.3, 1),
      rotation: randomBetween(0, Math.PI * 2),
      rotationSpeed: randomBetween(-0.02, 0.02),
      size: randomBetween(5, 12),
      opacity: randomBetween(0.4, 0.9),
      color: randomItem(leafColors),
      phase: randomBetween(0, Math.PI * 2),
      amplitude: randomBetween(0.5, 1.5),
    });

    const resetLeaf = (leaf: Leaf) => {
      const nextLeaf = createLeaf(true);

      leaf.x = nextLeaf.x;
      leaf.y = nextLeaf.y;
      leaf.vx = nextLeaf.vx;
      leaf.vy = nextLeaf.vy;
      leaf.rotation = nextLeaf.rotation;
      leaf.rotationSpeed = nextLeaf.rotationSpeed;
      leaf.size = nextLeaf.size;
      leaf.opacity = nextLeaf.opacity;
      leaf.color = nextLeaf.color;
      leaf.phase = nextLeaf.phase;
      leaf.amplitude = nextLeaf.amplitude;
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

      leavesRef.current = Array.from({ length: 25 }, () => createLeaf(false));
    };

    const drawLeaf = (leaf: Leaf) => {
      const edgeFadeX = Math.min(1, leaf.x / 80, (width - leaf.x) / 80);
      const edgeFadeY = Math.min(1, leaf.y / 80, (height - leaf.y) / 80);
      const opacity = leaf.opacity * Math.max(0, Math.min(edgeFadeX, edgeFadeY));

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);

      ctx.fillStyle = leaf.color;
      ctx.scale(1, 0.4);
      ctx.beginPath();
      ctx.arc(0, 0, leaf.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.save();
      ctx.globalAlpha = opacity * 0.75;
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, leaf.size * 0.9);
      ctx.stroke();
      ctx.restore();
    };

    const updateLeaf = (leaf: Leaf) => {
      leaf.x += leaf.vx + Math.sin(timeRef.current * 0.5 + leaf.phase) * leaf.amplitude;
      leaf.y += leaf.vy;
      leaf.rotation += leaf.rotationSpeed;

      if (leaf.y > height + 40) {
        resetLeaf(leaf);
      }

      if (leaf.x < -40) {
        leaf.x = width + 40;
      }

      if (leaf.x > width + 40) {
        leaf.x = -40;
      }
    };

    const render = () => {
      timeRef.current += 0.016;

      ctx.clearRect(0, 0, width, height);

      leavesRef.current.forEach((leaf) => {
        updateLeaf(leaf);
        drawLeaf(leaf);
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

      leavesRef.current = [];
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1]"
        aria-hidden="true"
      />

      {lightRays.map((ray, index) => (
        <span
          key={index}
          className="forest-light-ray absolute top-[-10%] z-[2] h-[70vh]"
          style={{
            left: ray.left,
            width: `${ray.width}px`,
            transform: `rotate(${ray.rotate}deg)`,
            animationDelay: ray.delay,
            animationDuration: ray.duration,
          }}
        />
      ))}

      <div className="forest-mist absolute bottom-0 left-0 z-[3] h-[30%] w-[200%]" />

      <style jsx>{`
        .forest-light-ray {
          clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
          background: linear-gradient(
            to bottom,
            rgba(134, 239, 172, 0.12) 0%,
            transparent 100%
          );
          transform-origin: top center;
          animation-name: ray-flicker;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .forest-mist {
          background: linear-gradient(
            transparent,
            rgba(21, 128, 61, 0.06)
          );
          animation: forest-mist-drift 4s ease-in-out infinite alternate;
        }

        @keyframes ray-flicker {
          0%,
          100% {
            opacity: 0.08;
          }

          30% {
            opacity: 0.18;
          }

          60% {
            opacity: 0.06;
          }
        }

        @keyframes forest-mist-drift {
          from {
            transform: translateX(-4%);
          }

          to {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}