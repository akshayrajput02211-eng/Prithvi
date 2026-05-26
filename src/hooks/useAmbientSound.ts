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

  const soundRef = useRef<Howl | null>(null);
  const fileRef = useRef<string | null>(null);

  useEffect(() => {
    const world = WORLDS.find((item) => item.id === currentWorld);
    const soundSrc = `/sounds/${world?.soundFile ?? 'space-ambient.mp3'}`;

    const fadeOut = () => {
      const sound = soundRef.current;
      if (!sound) return;

      sound.fade(sound.volume(), 0, FADE_DURATION);
      window.setTimeout(() => {
        sound.stop();
        sound.unload();
      }, FADE_DURATION);
    };

    if (!isSoundOn) {
      fadeOut();
      soundRef.current = null;
      fileRef.current = null;
      return;
    }

    if (fileRef.current === soundSrc && soundRef.current) return;

    let cancelled = false;

    fetch(soundSrc, { method: 'HEAD' })
      .then((res) => {
        if (!res.ok || cancelled) return;

        fadeOut();

        const nextSound = new Howl({
          src: [soundSrc],
          loop: true,
          volume: 0,
          html5: true,
        });

        nextSound.once('load', () => {
          if (cancelled) return;
          nextSound.play();
          nextSound.fade(0, TARGET_VOLUME, FADE_DURATION);
        });

        nextSound.once('loaderror', () => {
          nextSound.unload();
        });

        soundRef.current = nextSound;
        fileRef.current = soundSrc;
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [currentWorld, isSoundOn]);
}