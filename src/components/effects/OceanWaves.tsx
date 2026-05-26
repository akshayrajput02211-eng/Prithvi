'use client';

type Bubble = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
};

const bubbles: Bubble[] = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: 5 + Math.random() * 90,
  size: 4 + Math.random() * 12,
  duration: 6 + Math.random() * 8,
  delay: Math.random() * 8,
}));

const rays = [
  { left: '18%', width: '52px', height: '42%', delay: '0s', duration: '4.8s' },
  { left: '48%', width: '64px', height: '36%', delay: '1.2s', duration: '5.6s' },
  { left: '74%', width: '46px', height: '44%', delay: '2s', duration: '4.2s' },
];

function Wave({
  className,
  fill,
  animationClass,
}: {
  className: string;
  fill: string;
  animationClass: string;
}) {
  return (
    <div className={`absolute bottom-0 left-0 w-[200%] ${className} ${animationClass}`}>
      <svg
        viewBox="0 0 1600 240"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden="true"
      >
        <path
          fill={fill}
          d="M 0 120 Q 200 0 400 120 Q 600 240 800 120 Q 1000 0 1200 120 Q 1400 240 1600 120 V 240 H 0 Z"
        />
      </svg>
    </div>
  );
}

export default function OceanWaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_100%,rgba(6,182,212,0.12),transparent_52%)]" />

      {rays.map((ray, index) => (
        <div
          key={index}
          className="ocean-light-ray absolute top-0 z-[2] origin-top opacity-10"
          style={{
            left: ray.left,
            width: ray.width,
            height: ray.height,
            animationDelay: ray.delay,
            animationDuration: ray.duration,
          }}
        />
      ))}

      <div className="ocean-surface-shimmer absolute bottom-[30%] left-0 z-[3] h-24 w-[200%]" />

      <div className="absolute inset-0 z-[4]">
        {bubbles.map((bubble) => (
          <span
            key={bubble.id}
            className="ocean-bubble absolute bottom-[-24px] rounded-full border border-white/30 bg-white/5 backdrop-blur-[2px]"
            style={{
              left: `${bubble.left}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDuration: `${bubble.duration}s`,
              animationDelay: `${bubble.delay}s`,
            }}
          />
        ))}
      </div>

      <Wave
        className="z-[5] h-[120px]"
        fill="rgba(6, 182, 212, 0.15)"
        animationClass="ocean-wave-back"
      />

      <Wave
        className="z-[6] h-[145px]"
        fill="rgba(8, 145, 178, 0.2)"
        animationClass="ocean-wave-middle"
      />

      <Wave
        className="z-[7] h-[170px]"
        fill="rgba(21, 94, 117, 0.35)"
        animationClass="ocean-wave-front"
      />

      <style jsx>{`
        .ocean-wave-back {
          animation: ocean-wave-back 12s linear infinite;
        }

        .ocean-wave-middle {
          animation: ocean-wave-middle 8s linear infinite;
        }

        .ocean-wave-front {
          animation: ocean-wave-front 6s ease-in-out infinite alternate;
        }

        .ocean-bubble {
          animation-name: bubble-rise;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .ocean-surface-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(6, 182, 212, 0.08),
            transparent
          );
          animation: shimmer-move 4s linear infinite;
        }

        .ocean-light-ray {
          clip-path: polygon(45% 0, 55% 0, 100% 100%, 0 100%);
          background: linear-gradient(
            rgba(6, 182, 212, 0.15),
            transparent
          );
          filter: blur(6px);
          animation-name: ocean-ray-pulse;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes ocean-wave-back {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0%);
          }
        }

        @keyframes ocean-wave-middle {
          from {
            transform: translateX(0%);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes ocean-wave-front {
          from {
            transform: translateX(-25%);
          }

          to {
            transform: translateX(25%);
          }
        }

        @keyframes bubble-rise {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }

          10% {
            opacity: 0.7;
          }

          50% {
            transform: translateY(-45vh) translateX(10px) scale(1.1);
          }

          90% {
            opacity: 0.3;
          }

          100% {
            transform: translateY(-90vh) translateX(-5px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes shimmer-move {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0%);
          }
        }

        @keyframes ocean-ray-pulse {
          0%,
          100% {
            opacity: 0.05;
          }

          50% {
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
}