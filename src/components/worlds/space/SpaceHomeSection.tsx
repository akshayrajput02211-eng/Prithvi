'use client';
 
/**
 * SpaceHomeSection — Space World ka Hero Section
 *
 * Kya karta hai:
 *  - Deep space background with animated nebula glow
 *  - Floating planet (parallax on scroll via GSAP + ScrollTrigger)
 *  - Shooting star canvas animation
 *  - Lenis smooth scroll integration
 *  - Staggered GSAP entrance animations (title, subtitle, CTA)
 *  - Scroll indicator at bottom
 *
 
 */
 
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, ChevronDown } from 'lucide-react';
 
import { useLenis } from '@/lib/lenis'; // apne lenis hook ka path
 
gsap.registerPlugin(ScrollTrigger);
 
export default function SpaceHomeSection() {
  // ───── Lenis smooth scroll ─────
  useLenis(); // sirf register karna hai yahan
 
  // ───── Refs ─────
  const sectionRef = useRef<HTMLElement | null>(null);
  const planetRef  = useRef<HTMLImageElement | null>(null);
  const star1Ref   = useRef<HTMLImageElement | null>(null);
  const star2Ref   = useRef<HTMLImageElement | null>(null);
  const canvasRef  = useRef<HTMLCanvasElement | null>(null);
 
  // ───── GSAP Animations ─────
  useEffect(() => {
    if (!sectionRef.current) return;
 
    const ctx = gsap.context(() => {
 
      // 1. TITLE CHARACTER SLIDE-UP (split by words)
      gsap.fromTo(
        '.space-hero-word',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 0.2,
        }
      );
 
      // 2. SUBTITLE + CTA FADE-UP
      gsap.fromTo(
        '.space-hero-fade',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.16,
          delay: 0.7,
          ease: 'power3.out',
        }
      );
 
      // 3. PLANET FLOAT (looping)
      if (planetRef.current) {
        gsap.to(planetRef.current, {
          y: -18,
          rotation: 2,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
 
      // 4. STAR LAYERS PARALLAX on scroll
      if (star1Ref.current) {
        gsap.to(star1Ref.current, {
          yPercent: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
 
      if (star2Ref.current) {
        gsap.to(star2Ref.current, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
 
      // 5. PLANET PARALLAX on scroll (slower)
      if (planetRef.current) {
        gsap.to(planetRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
 
      // 6. SCROLL INDICATOR PULSE
      gsap.to('.space-scroll-dot', {
        y: 7,
        opacity: 0.3,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
 
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  // ───── Shooting Stars Canvas ─────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
 
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
 
    // Shooting star type
    type Star = {
      x: number;
      y: number;
      len: number;
      speed: number;
      angle: number;
      opacity: number;
      life: number;
      maxLife: number;
    };
 
    let width = 0;
    let height = 0;
    let frameId = 0;
 
    // Static twinkling stars (background dots)
    const staticStars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.3 + Math.random() * 1.2,
      opacity: 0.3 + Math.random() * 0.7,
      twinkleSpeed: 0.008 + Math.random() * 0.018,
      twinklePhase: Math.random() * Math.PI * 2,
    }));
 
    // Active shooting stars
    const shootingStars: Star[] = [];
 
    const spawnStar = () => {
      shootingStars.push({
        x: Math.random() * 0.7,
        y: Math.random() * 0.4,
        len: 80 + Math.random() * 120,
        speed: 6 + Math.random() * 8,
        angle: Math.PI / 5 + (Math.random() * Math.PI) / 8,
        opacity: 0,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      });
    };
 
    let spawnTimer = 0;
 
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
 
    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
 
      // Twinking static stars
      staticStars.forEach((s) => {
        const brightness =
          s.opacity * (0.6 + 0.4 * Math.sin(time * s.twinkleSpeed + s.twinklePhase));
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${brightness})`;
        ctx.fill();
      });
 
      // Spawn shooting star every ~3s
      spawnTimer++;
      if (spawnTimer > 180) {
        spawnStar();
        spawnTimer = 0;
      }
 
      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += (Math.cos(s.angle) * s.speed) / width;
        s.y += (Math.sin(s.angle) * s.speed) / height;
 
        // Fade in/out
        const t = s.life / s.maxLife;
        s.opacity = t < 0.2 ? t / 0.2 : t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1;
 
        const x = s.x * width;
        const y = s.y * height;
        const tailX = x - Math.cos(s.angle) * s.len;
        const tailY = y - Math.sin(s.angle) * s.len;
 
        const grad = ctx.createLinearGradient(tailX, tailY, x, y);
        grad.addColorStop(0, `rgba(168,85,247,0)`);
        grad.addColorStop(0.5, `rgba(192,132,252,${s.opacity * 0.5})`);
        grad.addColorStop(1, `rgba(255,255,255,${s.opacity})`);
 
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(x, y);
        ctx.stroke();
 
        if (s.life >= s.maxLife) shootingStars.splice(i, 1);
      }
 
      frameId = requestAnimationFrame(draw);
    };
 
    resize();
    frameId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
 
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, []);
 
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#050008] text-white"
    >
      {/* ── STAR BACKGROUND LAYERS ── */}
      <img
        ref={star1Ref}
        src="/images/space/star1.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60 select-none"
      />
      <img
        ref={star2Ref}
        src="/images/space/star2.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 select-none"
      />
 
      {/* ── SHOOTING STARS CANVAS ── */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      />
 
      {/* ── NEBULA GLOW BLOBS ── */}
      {/* Top-left purple glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.28)_0%,rgba(88,28,135,0.12)_45%,transparent_72%)] blur-3xl" />
      {/* Center violet glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(139,92,246,0.18)_0%,transparent_65%)] blur-3xl" />
      {/* Right edge accent */}
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(192,132,252,0.15)_0%,transparent_65%)] blur-3xl" />
 
      {/* ── PLANET IMAGE ── */}
      <img
        ref={planetRef}
        src="/images/space/planet.png"
        alt="Space Planet"
        className="pointer-events-none absolute right-[-6%] top-[-4%] z-[3] w-[58vw] max-w-[980px] select-none object-contain opacity-90 md:right-[-4%] md:top-[-2%]"
      />
 
      {/* ── SPACECRAFT / PLANE OVERLAY (optional) ── */}
      <img
        src="/images/space/plane.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] right-[14%] z-[4] w-[14vw] max-w-[200px] select-none object-contain opacity-80"
      />
 
      {/* ── BOTTOM GRADIENT FADE ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050008] to-transparent" />
 
      {/* ── CONTENT ── */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pb-24 pt-28 sm:px-10 lg:px-20">
        <div className="max-w-3xl">
 
          {/* EYEBROW */}
          <p className="space-hero-fade mb-6 text-xs font-semibold uppercase tracking-[0.46em] text-[#a855f7]">
            Explore The Universe —
          </p>
 
          {/* MAIN TITLE (each word wrapped for stagger animation) */}
          <h1 className="overflow-hidden text-[clamp(3.2rem,7.5vw,8rem)] font-bold leading-[1.06] tracking-tight">
            {/* Line 1 */}
            <span className="block overflow-hidden">
              <span className="space-hero-word inline-block">
                Beyond
              </span>{' '}
              <span className="space-hero-word inline-block text-[#a855f7]">
                The
              </span>
            </span>
            {/* Line 2 */}
            <span className="block overflow-hidden">
              <span className="space-hero-word inline-block">
                Stars.
              </span>
            </span>
          </h1>
 
          {/* SUBTITLE */}
          <p className="space-hero-fade mt-7 max-w-xl text-base leading-8 text-white/65 md:text-lg">
            Space — the final frontier. A realm of infinite wonder, cosmic silence,
            and the greatest mysteries humanity has ever faced. Dive in.
          </p>
 
          {/* CTAs */}
          <div className="space-hero-fade mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-full bg-[#7c3aed] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,0.5)] transition-all duration-300 hover:bg-[#8b5cf6] hover:shadow-[0_0_42px_rgba(139,92,246,0.65)]"
              data-cursor
            >
              <Rocket size={17} />
              Start Exploring
            </button>
 
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-[#a855f7] hover:text-white"
              data-cursor
            >
              Learn More
            </button>
          </div>
 
          {/* STATS ROW */}
          <div className="space-hero-fade mt-14 flex flex-wrap gap-10">
            {[
              { value: '13.8B', label: 'Years Old Universe' },
              { value: '2T+',  label: 'Galaxies Estimated' },
              { value: '∞',    label: 'Possibilities' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
 
        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
            <span className="space-scroll-dot h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
          </div>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/40">
            Scroll to Explore
          </p>
          <ChevronDown size={14} className="text-[#a855f7] opacity-70" />
        </div>
      </div>
    </section>
  );
}