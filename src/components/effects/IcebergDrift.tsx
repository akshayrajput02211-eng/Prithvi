'use client';

import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
};

type Depth = 'far' | 'mid' | 'near';

type IceChunk = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  scale: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  phase: number;
  depth: Depth;
  points: Point[];
};

const randomBetween = (min: number, max: number) => {
  return min + Math.random() * (max - min);
};

const createPolygonPoints = (size: number) => {
  const sides = Math.floor(randomBetween(6, 9));

  return Array.from({ length: sides }, (_, index) => {
    const angle = (index / sides) * Math.PI * 2;
    const radius = size * (0.7 + Math.random() * 0.5);

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });
};

export default function IcebergDrift() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chunksRef = useRef<IceChunk[]>([]);
  const frameRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const createChunk = (depth: Depth, index: number, total: number): IceChunk => {
      const depthConfig = {
        far: {
          opacity: 0.15,
          scale: 0.5,
          bottomRange: 0.2,
          sizeMin: 18,
          sizeMax: 36,
          speedMin: 0.0005,
          speedMax: 0.001,
        },
        mid: {
          opacity: 0.3,
          scale: 0.8,
          bottomRange: 0.35,
          sizeMin: 24,
          sizeMax: 48,
          speedMin: 0.0008,
          speedMax: 0.0015,
        },
        near: {
          opacity: 0.5,
          scale: 1,
          bottomRange: 0.5,
          sizeMin: 34,
          sizeMax: 68,
          speedMin: 0.001,
          speedMax: 0.002,
        },
      }[depth];

      const baseX =
        ((index + Math.random() * 0.8) / total) * width +
        randomBetween(-60, 60);

      const baseY =
        height -
        randomBetween(
          height * 0.08,
          height * depthConfig.bottomRange
        );

      const size = randomBetween(depthConfig.sizeMin, depthConfig.sizeMax);

      return {
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        size,
        scale: depthConfig.scale,
        opacity: depthConfig.opacity,
        rotation: randomBetween(0, Math.PI * 2),
        rotationSpeed: randomBetween(
          depthConfig.speedMin,
          depthConfig.speedMax
        ),
        phase: randomBetween(0, Math.PI * 2),
        depth,
        points: createPolygonPoints(size),
      };
    };

    const createChunks = () => {
      const far = Array.from({ length: 5 }, (_, index) =>
        createChunk('far', index, 5)
      );

      const mid = Array.from({ length: 6 }, (_, index) =>
        createChunk('mid', index, 6)
      );

      const near = Array.from({ length: 4 }, (_, index) =>
        createChunk('near', index, 4)
      );

      chunksRef.current = [...far, ...mid, ...near];
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
      createChunks();
    };

    const updateChunk = (chunk: IceChunk) => {
      chunk.x =
        chunk.baseX +
        Math.sin(timeRef.current * 0.001 + chunk.phase * 0.5) * 14;

      chunk.y =
        chunk.baseY +
        Math.sin(timeRef.current * 0.003 + chunk.phase) * 18;

      chunk.rotation += chunk.rotationSpeed;
    };

    const drawChunkShape = (chunk: IceChunk, opacityMultiplier = 1) => {
      const fillOpacity = chunk.opacity * opacityMultiplier;

      ctx.beginPath();

      chunk.points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });

      ctx.closePath();

      ctx.fillStyle = `rgba(219, 234, 254, ${fillOpacity})`;
      ctx.strokeStyle = `rgba(147, 197, 253, ${0.5 * opacityMultiplier})`;
      ctx.lineWidth = 0.5;
      ctx.fill();
      ctx.stroke();

      if (chunk.points.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(chunk.points[0].x, chunk.points[0].y);
        ctx.lineTo(chunk.points[1].x, chunk.points[1].y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * opacityMultiplier})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const drawChunk = (chunk: IceChunk) => {
      ctx.save();
      ctx.translate(chunk.x, chunk.y);
      ctx.rotate(chunk.rotation);
      ctx.scale(chunk.scale, chunk.scale);
      drawChunkShape(chunk);
      ctx.restore();
    };

    const drawReflection = (chunk: IceChunk) => {
      const reflectionTop = height * 0.85;

      if (chunk.y < reflectionTop - 80) return;

      const waveOffset =
        Math.sin(timeRef.current * 0.02 + chunk.x * 0.1) * 2;

      ctx.save();
      ctx.translate(
        chunk.x + waveOffset,
        reflectionTop + (chunk.y - reflectionTop) * 0.3 + 30
      );
      ctx.scale(chunk.scale, -chunk.scale * 0.3);
      ctx.rotate(chunk.rotation);
      drawChunkShape(chunk, 0.2);
      ctx.restore();
    };

    const drawWaterSurface = () => {
      const reflectionTop = height * 0.85;

      const gradient = ctx.createLinearGradient(
        0,
        reflectionTop,
        0,
        height
      );

      gradient.addColorStop(0, 'rgba(14, 165, 233, 0.08)');
      gradient.addColorStop(0.45, 'rgba(14, 116, 144, 0.12)');
      gradient.addColorStop(1, 'rgba(8, 47, 73, 0.22)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, reflectionTop, width, height - reflectionTop);

      ctx.strokeStyle = 'rgba(186, 230, 253, 0.12)';
      ctx.lineWidth = 1;

      for (let i = 0; i < 5; i += 1) {
        const y = reflectionTop + i * 18;

        ctx.beginPath();

        for (let x = 0; x <= width; x += 18) {
          const waveY =
            y + Math.sin(timeRef.current * 0.02 + x * 0.02 + i) * 2;

          if (x === 0) {
            ctx.moveTo(x, waveY);
          } else {
            ctx.lineTo(x, waveY);
          }
        }

        ctx.stroke();
      }
    };

    const render = () => {
      timeRef.current += 1;

      ctx.clearRect(0, 0, width, height);

      chunksRef.current.forEach(updateChunk);

      chunksRef.current
        .filter((chunk) => chunk.depth === 'far')
        .forEach(drawChunk);

      chunksRef.current
        .filter((chunk) => chunk.depth === 'mid')
        .forEach(drawChunk);

      chunksRef.current
        .filter((chunk) => chunk.depth === 'near')
        .forEach(drawChunk);

      drawWaterSurface();

      chunksRef.current.forEach(drawReflection);

      frameRef.current = requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener('resize', resize);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      chunksRef.current = [];
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}