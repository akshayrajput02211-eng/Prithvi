'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';

import BackToUniverse from '@/components/ui/BackToUniverse';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/ui/Navbar';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import SoundToggle from '@/components/ui/SoundToggle';
import CircleWipe from '@/components/transitions/CircleWipe';
import { useAmbientSound } from '@/hooks/useAmbientSound';
import { useWorldTheme } from '@/hooks/useWorldTheme';
import { WORLDS, type WorldConfig } from '@/lib/worlds.config';
import { useWorldStore } from '@/store/worldStore';

type WorldContextValue = {
  worldId: string;
  worldConfig: WorldConfig;
};

const fallbackWorld = WORLDS[0];

const WorldContext = createContext<WorldContextValue>({
  worldId: fallbackWorld.id,
  worldConfig: fallbackWorld,
});

export function useWorldContext() {
  return useContext(WorldContext);
}

type WorldsLayoutProps = {
  children: ReactNode;
};

export default function WorldsLayout({ children }: WorldsLayoutProps) {
  const pathname = usePathname();
  const setWorld = useWorldStore((state) => state.setWorld);

  const worldId = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean);
    const id = parts[1];

    return WORLDS.some((world) => world.id === id) ? id : fallbackWorld.id;
  }, [pathname]);

  const worldConfig = useMemo(() => {
    return WORLDS.find((world) => world.id === worldId) ?? fallbackWorld;
  }, [worldId]);

  useWorldTheme(worldId);
  useAmbientSound(worldId);

  useEffect(() => {
    setWorld(worldId);
  }, [setWorld, worldId]);

  return (
    <WorldContext.Provider value={{ worldId, worldConfig }}>
      <div
        className="min-h-screen text-white"
        style={{
          backgroundColor: worldConfig.bgColor,
          fontFamily: `var(--world-font), ${worldConfig.font}, sans-serif`,
        }}
      >
        <ScrollProgressBar />
        <Navbar />
        <CustomCursor />

        <div className="sr-only">
          <SoundToggle />
        </div>

        <BackToUniverse />
        <CircleWipe />

        {children}
      </div>
    </WorldContext.Provider>
  );
}