'use client';

import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

import { WORLDS } from '@/lib/worlds.config';
import { useWorldStore } from '@/store/worldStore';

const FADE_DURATION = 1000;
const TARGET_VOLUME = 0.3;

export function useAmbientSound(worldId?: string) {
  const storeWorld = useWorldStore((state) => state.currentWorld);
  const isSoundOn = useWorldStore((state) => state.isSoundOn);

  const currentWorld = worldId ?? storeWorld;

  const currentSoundRef = useRef<Howl | null>(null);
  const currentFileRef = useRef<string | null>(null);

  useEffect(() => {
    const world = WORLDS.find((item) => item.id === currentWorld);
    const soundFile = world?.soundFile ?? 'space-ambient.mp3';
    const soundSrc = `/sounds/${soundFile}`;

    const fadeOutCurrent = () => {
      const currentSound = currentSoundRef.current;

      if (!currentSound) return;

      currentSound.fade(currentSound.volume(), 0, FADE_DURATION);

      window.setTimeout(() => {
        currentSound.stop();
        currentSound.unload();
      }, FADE_DURATION);
    };

    if (!isSoundOn) {
      fadeOutCurrent();
      currentSoundRef.current = null;
      currentFileRef.current = null;
      return;
    }

    if (currentFileRef.current === soundSrc && currentSoundRef.current) {
      return;
    }

    fadeOutCurrent();

    const nextSound = new Howl({
      src: [soundSrc],
      loop: true,
      volume: 0,
      html5: true,
    });

    nextSound.play();
    nextSound.fade(0, TARGET_VOLUME, FADE_DURATION);

    currentSoundRef.current = nextSound;
    currentFileRef.current = soundSrc;

    return () => {
      nextSound.fade(nextSound.volume(), 0, FADE_DURATION);

      window.setTimeout(() => {
        nextSound.stop();
        nextSound.unload();
      }, FADE_DURATION);
    };
  }, [currentWorld, isSoundOn]);
}