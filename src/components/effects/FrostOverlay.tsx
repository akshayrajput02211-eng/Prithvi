'use client';

export const iceDriftClassName = 'animate-ice-drift';

export const iceDriftCss = `
@keyframes ice-drift {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.animate-ice-drift {
  animation: ice-drift 8s ease-in-out infinite;
}
`;

const corners = [
  'left-0 top-0',
  'right-0 top-0 scale-x-[-1]',
  'bottom-0 left-0 scale-y-[-1]',
  'bottom-0 right-0 scale-[-1]',
];

function Snowflake() {
  return (
    <svg
      viewBox="-50 -50 100 100"
      className="frost-snowflake h-20 w-20"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeLinecap="round"
        strokeWidth="0.5"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <g key={index} transform={`rotate(${index * 60})`}>
            <line x1="0" y1="0" x2="0" y2="-42" />
            <line x1="0" y1="-24" x2="-8" y2="-32" />
            <line x1="0" y1="-24" x2="8" y2="-32" />
            <line x1="0" y1="-34" x2="-6" y2="-40" />
            <line x1="0" y1="-34" x2="6" y2="-40" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function IceCracks() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.04]"
      viewBox="0 0 1000 700"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g fill="none" stroke="white" strokeLinecap="round" strokeWidth="0.5">
        <path d="M 0 0 L 150 80 L 200 200 L 180 350 L 245 430" />
        <path d="M 1000 0 L 840 90 L 790 210 L 820 310 L 760 410" />
        <path d="M 0 700 L 130 590 L 210 560 L 260 470 L 330 430" />
        <path d="M 1000 700 L 850 610 L 770 530 L 710 445 L 640 390" />
        <path d="M 500 0 L 520 95 L 475 165 L 540 245 L 505 340" />
        <path d="M 250 700 L 300 590 L 285 510 L 340 450 L 360 360" />
        <path d="M 760 700 L 720 610 L 745 540 L 690 480 L 705 410" />
        <path d="M 0 340 L 120 320 L 230 360 L 315 330 L 410 370" />
      </g>
    </svg>
  );
}

export default function FrostOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="frost-aurora absolute left-0 top-0 z-[1] h-[40%] w-full" />

      <div className="frost-shimmer absolute left-0 top-0 z-[3] h-[3px] w-[30%] opacity-[0.15]" />

      <IceCracks />

      {corners.map((cornerClass) => (
        <div
          key={cornerClass}
          className={`absolute z-[2] h-[200px] w-[200px] ${cornerClass}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,234,254,0.15),transparent_70%)]" />
          <div className="absolute left-8 top-8">
            <Snowflake />
          </div>
        </div>
      ))}

      <style jsx>{`
        .frost-snowflake {
          animation: frost-spin 30s linear infinite;
        }

        .frost-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%
          );
          animation: shimmer-scan 6s linear infinite;
        }

        .frost-aurora {
          background: linear-gradient(
            180deg,
            rgba(103, 232, 249, 0.08) 0%,
            rgba(167, 243, 208, 0.05) 40%,
            transparent 100%
          );
          animation: aurora-move 10s ease-in-out infinite;
        }

        @keyframes frost-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shimmer-scan {
          0% {
            transform: translateX(-100vw);
          }

          100% {
            transform: translateX(200vw);
          }
        }

        @keyframes aurora-move {
          0%,
          100% {
            transform: translateX(0) scaleX(1);
          }

          50% {
            transform: translateX(5%) scaleX(1.05);
          }
        }
      `}</style>
    </div>
  );
}