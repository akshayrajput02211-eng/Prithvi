'use client';

import { useEffect, useRef } from 'react';

type Shape = 'circle' | 'square' | 'triangle' | 'star';

type ConfettiPiece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  shape: Shape;
  color: string;
  bounceY: number;
  bouncePhase: number;
};

const colors = [
  '#fbbf24',
  '#f87171',
  '#34d399',
  '#60a5fa',
  '#a78bfa',
  '#f472b6',
  '#fb923c',
];

const shapes: Shape[] = ['circle', 'square', 'triangle', 'star'];

const clouds = [
  { top: '10%', scale: 0.8, opacity: 0.6, duration: 24, delay: -4 },
  { top: '17%', scale: 1.2, opacity: 0.72, duration: 32, delay: -14 },
  { top: '24%', scale: 0.58, opacity: 0.55, duration: 22, delay: -9 },
  { top: '31%', scale: 1.45, opacity: 0.5, duration: 35, delay: -20 },
  { top: '14%', scale: 0.95, opacity: 0.68, duration: 28, delay: -24 },
];

const bounceStars = [
  { left: '12%', top: '22%', size: 18, delay: '0s', duration: '1.2s' },
  { left: '28%', top: '14%', size: 14, delay: '0.3s', duration: '1.6s' },
  { left: '45%', top: '28%', size: 20, delay: '0.7s', duration: '1.4s' },
  { left: '63%', top: '16%', size: 16, delay: '0.1s', duration: '1.8s' },
  { left: '78%', top: '30%', size: 22, delay: '0.5s', duration: '1.5s' },
  { left: '88%', top: '20%', size: 15, delay: '0.9s', duration: '1.3s' },
  { left: '36%', top: '38%', size: 13, delay: '0.2s', duration: '1.9s' },
];

const randomBetween = (min: number, max: number) => {
  return min + Math.random() * (max - min);
};

const randomItem = <T,>(items: T[]) => {
  return items[Math.floor(Math.random() * items.length)];
};

export default function CartoonBounce() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const piecesRef = useRef<ConfettiPiece[]>([]);
  const frameRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createPiece = (): ConfettiPiece => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: randomBetween(-0.2, 0.2),
      vy: randomBetween(-2, -0.5),
      rotation: randomBetween(0, Math.PI * 2),
      rotationSpeed: randomBetween(-0.05, 0.05),
      size: randomBetween(5, 14),
      shape: randomItem(shapes),
      color: randomItem(colors),
      bounceY: 0,
      bouncePhase: randomBetween(0, Math.PI * 2),
    });

    const drawStar = (piece: ConfettiPiece) => {
      const spikes = 5;
      const outerRadius = piece.size;
      const innerRadius = piece.size * 0.45;

      ctx.beginPath();

      for (let i = 0; i < spikes * 2; i += 1) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = piece.rotation + (Math.PI / spikes) * i;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();
      ctx.fill();
    };

    const drawPiece = (piece: ConfettiPiece) => {
      ctx.save();
      ctx.translate(piece.x, piece.y + piece.bounceY);
      ctx.rotate(piece.rotation);
      ctx.fillStyle = piece.color;

      if (piece.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, piece.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (piece.shape === 'square') {
        ctx.fillRect(
          -piece.size * 0.5,
          -piece.size * 0.5,
          piece.size,
          piece.size
        );
      }

      if (piece.shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(0, -piece.size);
        ctx.lineTo(piece.size * 0.85, piece.size * 0.65);
        ctx.lineTo(-piece.size * 0.85, piece.size * 0.65);
        ctx.closePath();
        ctx.fill();
      }

      if (piece.shape === 'star') {
        drawStar(piece);
      }

      ctx.restore();
    };

    const updatePiece = (piece: ConfettiPiece) => {
      piece.x += piece.vx;
      piece.y += piece.vy * 0.15;
      piece.bounceY = Math.sin(timeRef.current * 0.02 + piece.bouncePhase) * 0.8;
      piece.rotation += piece.rotationSpeed;

      if (piece.x < -20) piece.x = width + 20;
      if (piece.x > width + 20) piece.x = -20;
      if (piece.y < -20) piece.y = height + 20;
      if (piece.y > height + 20) piece.y = -20;
    };

    const animate = () => {
      timeRef.current += 1;

      ctx.clearRect(0, 0, width, height);

      piecesRef.current.forEach((piece) => {
        updatePiece(piece);
        drawPiece(piece);
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    resize();
    piecesRef.current = Array.from({ length: 40 }, createPiece);
    animate();

    window.addEventListener('resize', resize);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      piecesRef.current = [];
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-[3]" aria-hidden="true" />

      <div className="cartoon-rainbow absolute bottom-[-200px] left-1/2 z-[1] h-[300px] w-[600px] -translate-x-1/2 rounded-t-[300px]" />

      {clouds.map((cloud, index) => (
        <div
          key={index}
          className="cartoon-cloud absolute z-[2]"
          style={{
            top: cloud.top,
            opacity: cloud.opacity,
            transform: `scale(${cloud.scale})`,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        />
      ))}

      {bounceStars.map((star, index) => (
        <span
          key={index}
          className="cartoon-star absolute z-[4] text-[#fbbf24]"
          style={{
            left: star.left,
            top: star.top,
            fontSize: `${star.size}px`,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        >
          ★
        </span>
      ))}

      <style jsx>{`
        .cartoon-cloud {
          width: 100px;
          height: 40px;
          border-radius: 40px;
          background: rgba(255, 255, 255, 0.7);
          filter: drop-shadow(0 8px 20px rgba(255, 255, 255, 0.12));
          animation-name: cloud-float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .cartoon-cloud::before,
        .cartoon-cloud::after {
          content: '';
          position: absolute;
          display: block;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.78);
        }

        .cartoon-cloud::before {
          left: 15px;
          top: -25px;
          width: 50px;
          height: 50px;
        }

        .cartoon-cloud::after {
          right: 20px;
          top: -15px;
          width: 35px;
          height: 35px;
        }

        .cartoon-rainbow {
          opacity: 0.6;
          border: 12px solid rgba(255, 255, 255, 0.03);
          box-shadow:
            0 0 0 8px rgba(239, 68, 68, 0.15),
            0 0 0 16px rgba(249, 115, 22, 0.12),
            0 0 0 24px rgba(234, 179, 8, 0.1),
            0 0 0 32px rgba(34, 197, 94, 0.1),
            0 0 0 40px rgba(59, 130, 246, 0.08),
            0 0 0 48px rgba(147, 51, 234, 0.08);
          animation: rainbow-glow 4s ease-in-out infinite;
        }

        .cartoon-star {
          animation-name: star-bounce;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          text-shadow: 0 0 12px rgba(251, 191, 36, 0.85);
        }

        @keyframes cloud-float {
          0% {
            margin-left: -200px;
          }

          100% {
            margin-left: 110vw;
          }
        }

        @keyframes rainbow-glow {
          0%,
          100% {
            opacity: 0.5;
          }

          50% {
            opacity: 0.8;
          }
        }

        @keyframes star-bounce {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
          }

          100% {
            transform: translateY(-15px) rotate(180deg) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}