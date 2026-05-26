'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export let lenis: Lenis | null = null;

let rafId: number | null = null;
let users = 0;

const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

function raf(time: number) {
  lenis?.raf(time);
  rafId = requestAnimationFrame(raf);
}

export function initLenis() {
  if (typeof window === 'undefined') return null;

  if (!lenis) {
    lenis = new Lenis({
      duration: 1.4,
      easing,
      orientation: 'vertical',
      smoothWheel: true,
    });
  }

  if (rafId === null) rafId = requestAnimationFrame(raf);

  return lenis;
}

function destroyLenis() {
  if (rafId !== null) cancelAnimationFrame(rafId);
  rafId = null;
  lenis?.destroy();
  lenis = null;
}

export function useLenis() {
  useEffect(() => {
    users += 1;
    initLenis();

    return () => {
      users = Math.max(0, users - 1);
      if (users === 0) destroyLenis();
    };
  }, []);

  return lenis;
}

export function useLenisScroll(callback: (instance: Lenis) => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    users += 1;
    const currentLenis = initLenis();

    if (!currentLenis) return;

    const handleScroll = (instance: Lenis) => callbackRef.current(instance);

    currentLenis.on('scroll', handleScroll);

    return () => {
      currentLenis.off('scroll', handleScroll);
      users = Math.max(0, users - 1);
      if (users === 0) destroyLenis();
    };
  }, []);
}