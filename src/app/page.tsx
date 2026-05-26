'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

import HeroSection from '@/components/home/HeroSection';
import ProsSection from '@/components/home/ProsSection';
import ConsSection from '@/components/home/ConsSection';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/ui/Navbar';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import CircleWipe from '@/components/transitions/CircleWipe';
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

  return (
    <main className="min-h-screen bg-black text-white">
      <ScrollProgressBar />
      <Navbar />
      <CustomCursor />
      <CircleWipe />

      <HeroSection />
      <ProsSection />
      <ConsSection />
    </main>
  );
}