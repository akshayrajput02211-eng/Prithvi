'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Flame,
  Grid3X3,
  Home,
  Mail,
  Plus,
  Recycle,
  Smile,
  Snowflake,
  Sparkles,
  Sun,
  TreePine,
  UserRound,
  Waves,
  type LucideIcon,
} from 'lucide-react';

import SoundToggle from '@/components/ui/SoundToggle';
import { WORLDS } from '@/lib/worlds.config';
import { useWorldStore } from '@/store/worldStore';

type NavItem = {
  label: string;
  href: string;
};

type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'WORLDS', href: '#worlds' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

const sidebarItems: SidebarItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Worlds', href: '#worlds', icon: Grid3X3 },
  { label: 'About', href: '#about', icon: UserRound },
  { label: 'Contact', href: '#contact', icon: Mail },
];

const worldIcons: Record<string, LucideIcon> = {
  home: Sparkles,
  space: Sparkles,
  ocean: Waves,
  forest: TreePine,
  desert: Sun,
  volcano: Flame,
  iceberg: Snowflake,
  garbage: Recycle,
  tech: Cpu,
  cartoon: Smile,
};

export default function Navbar() {
  const currentWorld = useWorldStore((state) => state.currentWorld);
  const [scrollProgress, setScrollProgress] = useState(0);

  const activeWorld = useMemo(() => {
    return WORLDS.find((world) => world.id === currentWorld);
  }, [currentWorld]);

  const accentColor = activeWorld?.accentColor ?? '#c8f020';
  const WorldIcon = worldIcons[currentWorld] ?? Sparkles;

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };

    updateProgress();

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <>
      <header className="fixed left-0 top-0 z-[100] w-full bg-gradient-to-b from-black/80 via-black/35 to-transparent px-8 py-7 text-white">
        <nav className="mx-auto flex w-full max-w-[1840px] items-center justify-between">
          <a
            href="/"
            className="text-[24px] font-medium uppercase leading-none tracking-[0.48em]"
            style={{
              fontFamily: 'var(--font-orbitron), Arial, Helvetica, sans-serif',
            }}
          >
            PRITHVI
          </a>

          <div className="hidden items-center gap-14 lg:flex">
            {navItems.map((item) => {
              const isHome = item.label === 'HOME';

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative flex items-center gap-3 overflow-hidden pb-2 text-[13px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:text-[#c8f020]"
                  data-cursor
                >
                  {isHome && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c8f020]" />
                  )}

                  <span>{item.label}</span>

                  <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#c8f020] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              );
            })}
          </div>

          <motion.a
            href="#worlds"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="group hidden items-center gap-4 rounded-full border border-white/55 px-7 py-3 text-[13px] font-medium tracking-wide text-white transition-colors duration-300 hover:bg-white hover:text-black md:flex"
            data-cursor
          >
            <span>Enter A World</span>

            <span className="grid h-8 w-8 place-items-center rounded-full border border-[#c8f020] text-[#c8f020] transition-colors duration-300 group-hover:border-black group-hover:text-black">
              <Plus size={16} strokeWidth={2} />
            </span>
          </motion.a>
        </nav>
      </header>

      <aside className="fixed left-7 top-1/2 z-[100] hidden -translate-y-1/2 xl:block">
        <div className="relative flex w-[104px] flex-col items-center rounded-[28px] border border-white/10 bg-black/25 px-4 py-8 shadow-[0_0_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <span className="absolute left-1/2 top-[118px] h-[310px] w-px -translate-x-1/2 bg-white/10" />

          <motion.div
            animate={{
              boxShadow: [
                `0 0 18px ${accentColor}55`,
                `0 0 34px ${accentColor}aa`,
                `0 0 18px ${accentColor}55`,
              ],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10 mb-16 grid h-14 w-14 place-items-center rounded-full border bg-black/60"
            style={{
              borderColor: accentColor,
              color: accentColor,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <WorldIcon size={25} strokeWidth={1.8} />
            </motion.div>
          </motion.div>

          <div className="relative z-10 flex flex-col items-center gap-10">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="relative"
                  data-cursor
                >
                  <motion.span
                    whileHover={{ scale: 1.18 }}
                    whileTap={{ scale: 0.94 }}
                    className="group relative grid h-9 w-9 place-items-center rounded-full text-white/85 transition-colors duration-300 hover:text-white"
                  >
                    <Icon size={22} strokeWidth={1.9} />

                    <span
                      className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:left-16 group-hover:opacity-100"
                      style={{ borderColor: `${accentColor}55` }}
                    >
                      {item.label}
                    </span>
                  </motion.span>
                </a>
              );
            })}

            <SoundToggle />
          </div>
        </div>
      </aside>

      <div className="fixed right-9 top-1/2 z-[100] hidden -translate-y-1/2 items-center gap-7 xl:flex">
        <div className="relative h-[250px] w-px bg-white/20">
          <motion.span
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
            style={{
              top: `${scrollProgress * 100}%`,
              backgroundColor: accentColor,
              boxShadow: `0 0 22px ${accentColor}`,
            }}
          />
        </div>

        <p className="rotate-180 text-[12px] font-medium uppercase tracking-[0.55em] text-white/70 [writing-mode:vertical-rl]">
          Scroll To Explore
        </p>
      </div>
    </>
  );
}