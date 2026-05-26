'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useWorldStore } from '@/store/worldStore';

export default function CircleWipe() {
  const isTransitioning = useWorldStore((state) => state.isTransitioning);
  const transitionColor = useWorldStore((state) => state.transitionColor);
  const transitionOrigin = useWorldStore((state) => state.transitionOrigin);
  const endTransition = useWorldStore((state) => state.endTransition);

  const [phase, setPhase] = useState<'expand' | 'collapse'>('expand');

  useEffect(() => {
    if (!isTransitioning) return;

    setPhase('expand');

    const collapseTimer = window.setTimeout(() => setPhase('collapse'), 820);
    const endTimer = window.setTimeout(endTransition, 1320);

    return () => {
      window.clearTimeout(collapseTimer);
      window.clearTimeout(endTimer);
    };
  }, [endTransition, isTransitioning]);

  const x = transitionOrigin.x * 100;
  const y = transitionOrigin.y * 100;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[9998]"
          style={{ backgroundColor: transitionColor }}
          initial={{ clipPath: `circle(0% at ${x}% ${y}%)` }}
          animate={{
            clipPath:
              phase === 'expand'
                ? `circle(150% at ${x}% ${y}%)`
                : `circle(0% at ${x}% ${y}%)`,
          }}
          exit={{ clipPath: `circle(0% at ${x}% ${y}%)` }}
          transition={{
            duration: phase === 'expand' ? 0.6 : 0.5,
            ease: phase === 'expand' ? [0.76, 0, 0.24, 1] : 'easeIn',
          }}
        />
      )}
    </AnimatePresence>
  );
}