'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import StarParticles from '@/components/effects/StarParticles';
import HeroSection from '@/components/home/HeroSection';
import ProsSection from '@/components/home/ProsSection';
import ConsSection from '@/components/home/ConsSection';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/ui/Navbar';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import SoundToggle from '@/components/ui/SoundToggle';
import { useLenis } from '@/lib/lenis';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function HomePage() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
    };
  }, [lenis]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroEarth = document.querySelector<HTMLImageElement>(
        '#home-hero img[src="/images/home/earth.png"]'
      );

      const prosEarth = document.querySelector<HTMLImageElement>(
        '#home-pros img[src="/images/pro/earth.png"]'
      );

      if (!heroEarth || !prosEarth) return;

      gsap.set(prosEarth, {
        opacity: 0,
        scale: 0.88,
        filter: 'brightness(0.75) blur(2px)',
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: '#home-pros',
            start: 'top 88%',
            end: 'top 35%',
            scrub: true,
          },
        })
        .to(
          heroEarth,
          {
            opacity: 0,
            scale: 0.82,
            filter: 'brightness(0.35) blur(4px)',
            ease: 'none',
          },
          0
        )
        .to(
          prosEarth,
          {
            opacity: 1,
            scale: 1,
            filter: 'brightness(1) blur(0px)',
            ease: 'none',
          },
          0.08
        );
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <ScrollProgressBar />
      <Navbar />
      <CustomCursor />

      <div className="sr-only">
        <SoundToggle />
      </div>

      <div id="home-hero" className="min-h-screen">
        <HeroSection />
      </div>

      <div id="home-pros" className="min-h-screen">
        <ProsSection />
      </div>

      <div id="home-cons" className="min-h-screen">
        <ConsSection />
      </div>
      <StarParticles count={200} color="#c084fc" />
    </main>
  );
}