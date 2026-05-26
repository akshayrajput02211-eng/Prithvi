'use client';

import { Volume2, VolumeX } from 'lucide-react';

import { useAmbientSound } from '@/hooks/useAmbientSound';
import { WORLDS } from '@/lib/worlds.config';
import { useWorldStore } from '@/store/worldStore';

export default function SoundToggle() {
  useAmbientSound();

  const currentWorld = useWorldStore((state) => state.currentWorld);
  const isSoundOn = useWorldStore((state) => state.isSoundOn);
  const toggleSound = useWorldStore((state) => state.toggleSound);

  const world = WORLDS.find((item) => item.id === currentWorld);
  const accentColor = world?.accentColor ?? '#c8f020';
  const label = isSoundOn ? 'Sound On' : 'Sound Off';
  const Icon = isSoundOn ? Volume2 : VolumeX;

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-label={label}
      className="group relative grid h-10 w-10 place-items-center rounded-full"
      data-cursor
    >
      {isSoundOn && (
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-25"
          style={{ backgroundColor: accentColor }}
        />
      )}

      <Icon
        size={22}
        className={isSoundOn ? 'animate-pulse' : ''}
        style={{
          color: isSoundOn ? accentColor : 'rgba(255,255,255,0.55)',
          filter: isSoundOn ? `drop-shadow(0 0 8px ${accentColor})` : 'none',
        }}
      />

      <span
        className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 rounded-full border bg-black/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:left-16 group-hover:opacity-100"
        style={{ borderColor: `${accentColor}66` }}
      >
        {world?.label ?? 'HOME'}
      </span>
    </button>
  );
}