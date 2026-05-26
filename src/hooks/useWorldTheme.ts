'use client';

import { useEffect } from 'react';

import { WORLDS } from '@/lib/worlds.config';

export function useWorldTheme(worldId: string) {
  useEffect(() => {
    const world = WORLDS.find((item) => item.id === worldId);
    const root = document.documentElement;

    root.style.setProperty('--world-accent', world?.accentColor ?? '#c8f020');
    root.style.setProperty('--world-primary', world?.cursorColor ?? '#ffd700');
    root.style.setProperty('--world-cursor', world?.cursorColor ?? '#c8f020');
    root.style.setProperty('--world-bg', world?.bgColor ?? '#000000');
    root.style.setProperty(
      '--world-font',
      world?.font ?? 'Orbitron'
    );

    return () => {
      root.style.removeProperty('--world-accent');
      root.style.removeProperty('--world-primary');
      root.style.removeProperty('--world-cursor');
      root.style.removeProperty('--world-bg');
      root.style.removeProperty('--world-font');
    };
  }, [worldId]);
}