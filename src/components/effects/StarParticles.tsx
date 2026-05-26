'use client';

import { useEffect, useRef } from 'react';

type StarParticlesProps = {
  count?: number;
  color?: string;
};

export default function StarParticles({
  count = 200,
  color = '#ffffff',
}: StarParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let width = 0;
    let height = 0;
    let frameId = 0;

    const stars = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.6 + 0.25,
      speed: Math.random() * 0.22 + 0.04,
      opacity: Math.random() * 0.7 + 0.25,
      pulse: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.y += star.speed / height;
        star.pulse += 0.02;

        if (star.y > 1.05) {
          star.y = -0.05;
          star.x = Math.random();
        }

        const alpha = star.opacity + Math.sin(star.pulse) * 0.18;

        context.beginPath();
        context.fillStyle = color.replace(')', `, ${alpha})`).includes('rgba')
          ? color
          : color;
        context.globalAlpha = Math.max(0.1, Math.min(1, alpha));
        context.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 1;
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
  }, [count, color]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}