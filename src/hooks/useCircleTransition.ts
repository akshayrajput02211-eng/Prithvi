'use client';

import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

import { WORLDS } from '@/lib/worlds.config';
import { useWorldStore } from '@/store/worldStore';

export function useCircleTransition() {
  const router = useRouter();

  const setWorld = useWorldStore((state) => state.setWorld);
  const triggerTransition = useWorldStore((state) => state.triggerTransition);

  const startTransition = (
    worldId: string,
    clickEvent: MouseEvent<HTMLElement>
  ) => {
    const world = WORLDS.find((item) => item.id === worldId);
    const color = world?.accentColor ?? '#7c3aed';

    const originX = clickEvent.clientX / window.innerWidth;
    const originY = clickEvent.clientY / window.innerHeight;

    setWorld(worldId);
    triggerTransition(color, originX, originY);

    window.setTimeout(() => {
      router.push(`/worlds/${worldId}`);
    }, 800);
  };

  return startTransition;
}