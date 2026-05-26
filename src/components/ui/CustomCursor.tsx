'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Point = {
  x: number;
  y: number;
};

const lerp = (start: number, end: number, amount: number) => {
  return start + (end - start) * amount;
};

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const mouse = useRef<Point>({ x: 0, y: 0 });
  const ring = useRef<Point>({ x: 0, y: 0 });
  const glow = useRef<Point>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const checkDesktop = () => {
      const isDesktop = window.innerWidth > 768;
      setEnabled(isDesktop);

      if (isDesktop) {
        document.body.style.cursor = 'none';
      } else {
        document.body.style.cursor = '';
      }
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => {
      window.removeEventListener('resize', checkDesktop);
      document.body.style.cursor = '';
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (event: MouseEvent) => {
      mouse.current = {
        x: event.clientX,
        y: event.clientY,
      };

      setIsVisible(true);
    };

    const hideCursor = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      setIsHovering(
        Boolean(
          target?.closest(
            'a, button, input, textarea, select, [role="button"], [data-cursor]'
          )
        )
      );
    };

    const handleMouseDown = () => {
      setIsClicking(true);

      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }

      clickTimeout.current = setTimeout(() => {
        setIsClicking(false);
      }, 150);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    document.documentElement.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      document.documentElement.removeEventListener('mouseleave', hideCursor);

      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.16);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.16);

      glow.current.x = lerp(glow.current.x, mouse.current.x, 0.08);
      glow.current.y = lerp(glow.current.y, mouse.current.y, 0.08);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 4}px, ${
          mouse.current.y - 4
        }px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 16}px, ${
          ring.current.y - 16
        }px, 0) scale(${
          isClicking ? 0.7 : isHovering ? 2.5 : 1
        })`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glow.current.x - 30}px, ${
          glow.current.y - 30
        }px, 0) scale(${
          isClicking ? 0.7 : isHovering ? 1.5 : 1
        })`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [enabled, isHovering, isClicking]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            ref={glowRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 0.3 : 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed left-0 top-0 z-[9997] h-[60px] w-[60px] rounded-full blur-xl"
            style={{
              background:
                'radial-gradient(circle, var(--world-cursor, var(--cursor-color, #c8f020)) 0%, transparent 68%)',
            }}
          />

          <motion.div
            ref={ringRef}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              backgroundColor: isHovering
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(255,255,255,0.05)',
              borderColor: isHovering
                ? 'var(--world-cursor, var(--cursor-color, #c8f020))'
                : 'rgba(255,255,255,0.45)',
              boxShadow: isHovering
                ? '0 0 24px var(--world-cursor, var(--cursor-color, #c8f020))'
                : '0 0 0 transparent',
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border-[1.5px] backdrop-blur-[4px]"
          />

          <motion.div
            ref={dotRef}
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: 1,
              scale: isClicking ? 0.7 : isHovering ? 0 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full"
            style={{
              backgroundColor:
                'var(--world-cursor, var(--cursor-color, #c8f020))',
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}