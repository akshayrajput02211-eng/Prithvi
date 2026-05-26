'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { WORLDS } from '@/lib/worlds.config';
import { useWorldStore } from '@/store/worldStore';

export default function BackToUniverse() {
  const router = useRouter();
  const pathname = usePathname();

  const currentWorld = useWorldStore((state) => state.currentWorld);
  const triggerTransition = useWorldStore((state) => state.triggerTransition);

  const isWorldRoute = pathname.startsWith('/worlds/');
  const world = WORLDS.find((item) => item.id === currentWorld);

  const accentColor = world?.accentColor ?? '#c8f020';

  if (!isWorldRoute) return null;

  const handleClick = () => {
    triggerTransition(accentColor, 0.92, 0.12);

    window.setTimeout(() => {
      router.push('/');
    }, 650);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      whileHover={{
        scale: 1.05,
        borderColor: accentColor,
        boxShadow: `0 0 22px ${accentColor}66`,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed right-8 top-28 z-[90] flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-5 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-[10px]"
      data-cursor
      aria-label="Back to Universe"
    >
      <span
        className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-base"
        style={{
          boxShadow: `inset 0 0 16px ${accentColor}22`,
        }}
      >
        🪐
      </span>

      <span className="tracking-wide">Universe</span>
    </motion.button>
  );
}