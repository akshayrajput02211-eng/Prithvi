'use client';

import { useEffect, useState } from 'react';

type GlitchVariant = 'garbage' | 'tech';

type GlitchOverlayProps = {
  variant: GlitchVariant;
};

type GlitchBar = {
  id: number;
  top: number;
  height: number;
  key: number;
};

export const garbageFilter = 'hue-rotate(0deg) saturate(1.12) contrast(1.08)';

export const glitchTextClass = 'glitch-text';

export function useGlitchText(text: string) {
  return {
    className: glitchTextClass,
    'data-text': text,
  };
}

const createBars = (): GlitchBar[] => {
  return Array.from({ length: 3 }, (_, index) => ({
    id: index,
    top: Math.random() * 100,
    height: 2 + Math.random() * 2,
    key: Date.now() + index,
  }));
};

export default function GlitchOverlay({ variant }: GlitchOverlayProps) {
  const [bars, setBars] = useState<GlitchBar[]>(createBars);

  useEffect(() => {
    if (variant !== 'garbage') return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const schedule = () => {
      timeoutId = setTimeout(() => {
        setBars(createBars());
        schedule();
      }, 2000 + Math.random() * 2000);
    };

    schedule();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [variant]);

  if (variant === 'tech') {
    return (
      <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden mix-blend-overlay">
        <div className="tech-grid absolute inset-0" />
        <div className="tech-scan-sweep absolute left-0 h-0.5 w-full" />

        <span className="tech-bracket tech-bracket-tl" />
        <span className="tech-bracket tech-bracket-tr" />
        <span className="tech-bracket tech-bracket-bl" />
        <span className="tech-bracket tech-bracket-br" />

        <style jsx global>{glitchTextCss}</style>

        <style jsx>{`
          .tech-grid {
            background-image:
              linear-gradient(rgba(0, 245, 255, 0.04) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(0, 245, 255, 0.04) 1px,
                transparent 1px
              );
            background-size: 40px 40px;
          }

          .tech-scan-sweep {
            background: rgba(0, 245, 255, 0.4);
            box-shadow: 0 0 10px rgba(0, 245, 255, 0.6);
            animation: scan-sweep 4s linear infinite;
          }

          .tech-bracket {
            position: absolute;
            width: 20px;
            height: 20px;
            border-color: rgba(0, 245, 255, 0.4);
            animation: bracket-pulse 2s ease-in-out infinite;
          }

          .tech-bracket-tl {
            left: 28px;
            top: 28px;
            border-left-width: 2px;
            border-top-width: 2px;
          }

          .tech-bracket-tr {
            right: 28px;
            top: 28px;
            border-right-width: 2px;
            border-top-width: 2px;
          }

          .tech-bracket-bl {
            left: 28px;
            bottom: 28px;
            border-left-width: 2px;
            border-bottom-width: 2px;
          }

          .tech-bracket-br {
            right: 28px;
            bottom: 28px;
            border-right-width: 2px;
            border-bottom-width: 2px;
          }

          @keyframes scan-sweep {
            0% {
              top: -2px;
              opacity: 0;
            }

            5% {
              opacity: 1;
            }

            95% {
              opacity: 1;
            }

            100% {
              top: 100vh;
              opacity: 0;
            }
          }

          @keyframes bracket-pulse {
            0%,
            100% {
              opacity: 0.4;
            }

            50% {
              opacity: 1;
              box-shadow: 0 0 8px rgba(0, 245, 255, 0.5);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden mix-blend-multiply">
      <div className="garbage-scanlines absolute inset-0" />
      <div className="garbage-noise absolute inset-0 opacity-[0.03]" />

      {bars.map((bar) => (
        <span
          key={bar.key}
          className="garbage-glitch-bar absolute left-0 w-full"
          style={{
            top: `${bar.top}%`,
            height: `${bar.height}px`,
          }}
        />
      ))}

      <style jsx global>{glitchTextCss}</style>

      <style jsx>{`
        .garbage-scanlines {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(57, 255, 20, 0.015) 2px,
            rgba(57, 255, 20, 0.015) 4px
          );
          animation: scanline-drift 8s linear infinite;
        }

        .garbage-glitch-bar {
          background: rgba(57, 255, 20, 0.3);
          animation: glitch-bar 0.15s steps(1) forwards;
        }

        .garbage-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.7'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          animation: noise-move 0.5s steps(2) infinite;
        }

        @keyframes scanline-drift {
          0% {
            background-position: 0 0;
          }

          100% {
            background-position: 0 100px;
          }
        }

        @keyframes glitch-bar {
          0% {
            opacity: 1;
            transform: translateX(0);
          }

          33% {
            opacity: 0.8;
            transform: translateX(-5px);
          }

          66% {
            opacity: 0.9;
            transform: translateX(3px);
          }

          100% {
            opacity: 0;
            transform: translateX(0);
          }
        }

        @keyframes noise-move {
          0% {
            background-position: 0 0;
          }

          50% {
            background-position: 24px -18px;
          }

          100% {
            background-position: -14px 20px;
          }
        }
      `}</style>
    </div>
  );
}

const glitchTextCss = `
.glitch-text {
  position: relative;
  display: inline-block;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.7;
}

.glitch-text::before {
  color: #00f5ff;
  transform: translate(2px, 0);
  clip-path: inset(0 0 55% 0);
  animation: glitch-text-before 1.8s steps(2, end) infinite;
}

.glitch-text::after {
  color: #ff005d;
  transform: translate(-2px, 0);
  clip-path: inset(45% 0 0 0);
  animation: glitch-text-after 1.4s steps(2, end) infinite;
}

@keyframes glitch-text-before {
  0%, 100% {
    transform: translate(2px, 0);
    clip-path: inset(0 0 55% 0);
  }

  25% {
    transform: translate(-2px, -1px);
    clip-path: inset(12% 0 42% 0);
  }

  50% {
    transform: translate(3px, 1px);
    clip-path: inset(28% 0 28% 0);
  }

  75% {
    transform: translate(-1px, 0);
    clip-path: inset(6% 0 62% 0);
  }
}

@keyframes glitch-text-after {
  0%, 100% {
    transform: translate(-2px, 0);
    clip-path: inset(45% 0 0 0);
  }

  25% {
    transform: translate(2px, 1px);
    clip-path: inset(56% 0 18% 0);
  }

  50% {
    transform: translate(-3px, -1px);
    clip-path: inset(38% 0 38% 0);
  }

  75% {
    transform: translate(1px, 0);
    clip-path: inset(68% 0 8% 0);
  }
}
`;