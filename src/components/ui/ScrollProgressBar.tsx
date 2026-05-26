'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed left-0 top-0 z-[200] h-0.5 w-full bg-transparent">
      <div
        className="relative h-full opacity-80 transition-[width] duration-[50ms] ease-linear"
        style={{
          width: `${progress}%`,
          background:
            'linear-gradient(90deg, var(--world-accent, #c8f020), var(--world-primary, #ffd700))',
          boxShadow:
            '0 0 8px var(--world-accent, #c8f020)',
        }}
      >
        <span
          className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full"
          style={{
            backgroundColor: 'var(--world-primary, #ffd700)',
            boxShadow:
              '0 0 10px var(--world-accent, #c8f020), 0 0 18px var(--world-primary, #ffd700)',
          }}
        />
      </div>
    </div>
  );
}