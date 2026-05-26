'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { useWorldStore } from '@/store/worldStore';

const EXPAND_DURATION = 0.6;
const HOLD_DURATION = 0.2;
const COLLAPSE_DURATION = 0.5;

export default function CircleWipe() {
  const isTransitioning = useWorldStore((state) => state.isTransitioning);
  const transitionColor = useWorldStore((state) => state.transitionColor);
  const transitionOrigin = useWorldStore((state) => state.transitionOrigin);
  const endTransition = useWorldStore((state) => state.endTransition);

  const originX = transitionOrigin.x * 100;
  const originY = transitionOrigin.y * 100;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="circle-wipe"
          className="fixed inset-0 z-[9998] pointer-events-none"
          style={{
            backgroundColor: transitionColor,
          }}
          initial={{
            clipPath: `circle(0% at ${originX}% ${originY}%)`,
            opacity: 1,
          }}
          animate={{
            clipPath: [
              `circle(0% at ${originX}% ${originY}%)`,
              `circle(150% at ${originX}% ${originY}%)`,
              `circle(150% at ${originX}% ${originY}%)`,
              `circle(0% at ${originX}% ${originY}%)`,
            ],
          }}
          transition={{
            duration: EXPAND_DURATION + HOLD_DURATION + COLLAPSE_DURATION,
            times: [0, 0.46, 0.62, 1],
            ease: [
              [0.76, 0, 0.24, 1],
              'linear',
              'easeIn',
            ],
          }}
          onAnimationComplete={endTransition}
        />
      )}
    </AnimatePresence>
  );
}