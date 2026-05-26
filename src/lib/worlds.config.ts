export interface WorldProject {
  id: string;
  title: string;
  image: string;
}

export interface WorldConfig {
  id: string;
  number: string;
  label: string;
  headline: string;
  subline: string;
  tagline: string;
  accentColor: string;
  bgColor: string;
  cursorColor: string;
  font: 'Orbitron' | 'Satoshi' | 'Poppins' | 'Montserrat' | 'Bebas Neue';
  soundFile: string;
  effectComponent: string;
  cardImage: string;
  projects: WorldProject[];
}

export const WORLDS: WorldConfig[] = [
  {
    id: 'space',
    number: '01',
    label: 'SPACE',
    headline: 'Explore The Cosmos',
    subline: 'Drift through stars, planets, nebulae, and the mysteries beyond Earth.',
    tagline: 'SPACE',
    accentColor: '#a855f7',
    bgColor: '#070016',
    cursorColor: '#c084fc',
    font: 'Orbitron',
    soundFile: 'space-ambient.mp3',
    effectComponent: 'StarParticles',
    cardImage: '/images/home/card1.png',
    projects: [
      {
        id: 'solar-system',
        title: 'Solar System',
        image: '/images/home/card1.png',
      },
      {
        id: 'deep-space',
        title: 'Deep Space',
        image: '/images/home/card1.png',
      },
    ],
  },
  {
    id: 'ocean',
    number: '02',
    label: 'OCEAN',
    headline: 'Dive Beneath The Blue',
    subline: 'Explore glowing reefs, silent depths, moving tides, and marine life.',
    tagline: 'OCEAN',
    accentColor: '#06b6d4',
    bgColor: '#001822',
    cursorColor: '#22d3ee',
    font: 'Satoshi',
    soundFile: 'ocean-ambient.mp3',
    effectComponent: 'OceanWaves',
    cardImage: '/images/home/card2.png',
    projects: [
      {
        id: 'coral-reef',
        title: 'Coral Reef',
        image: '/images/home/card2.png',
      },
      {
        id: 'deep-sea',
        title: 'Deep Sea',
        image: '/images/home/card2.png',
      },
    ],
  },
  {
    id: 'forest',
    number: '03',
    label: 'FOREST',
    headline: 'Enter The Living Wild',
    subline: 'Walk through ancient trees, soft light, hidden life, and green silence.',
    tagline: 'FOREST',
    accentColor: '#84cc16',
    bgColor: '#071407',
    cursorColor: '#a3e635',
    font: 'Poppins',
    soundFile: 'forest-ambient.mp3',
    effectComponent: 'LeafParticles',
    cardImage: '/images/home/card3.png',
    projects: [
      {
        id: 'rainforest',
        title: 'Rainforest',
        image: '/images/home/card3.png',
      },
      {
        id: 'ancient-woods',
        title: 'Ancient Woods',
        image: '/images/home/card3.png',
      },
    ],
  },
  {
    id: 'desert',
    number: '04',
    label: 'DESERT',
    headline: 'Cross The Golden Dunes',
    subline: 'Feel the heat, shifting sand, quiet ruins, and endless horizons.',
    tagline: 'DESERT',
    accentColor: '#f59e0b',
    bgColor: '#1f1204',
    cursorColor: '#fbbf24',
    font: 'Montserrat',
    soundFile: 'desert-ambient.mp3',
    effectComponent: 'EmberParticles',
    cardImage: '/images/home/card4.png',
    projects: [
      {
        id: 'dune-walk',
        title: 'Dune Walk',
        image: '/images/home/card4.png',
      },
      {
        id: 'lost-oasis',
        title: 'Lost Oasis',
        image: '/images/home/card4.png',
      },
    ],
  },
  {
    id: 'volcano',
    number: '05',
    label: 'VOLCANO',
    headline: 'Awaken The Fire Core',
    subline: 'Stand near molten rivers, ash storms, glowing rock, and raw power.',
    tagline: 'VOLCANO',
    accentColor: '#ef4444',
    bgColor: '#1a0505',
    cursorColor: '#f97316',
    font: 'Bebas Neue',
    soundFile: 'volcano-ambient.mp3',
    effectComponent: 'EmberParticles',
    cardImage: '/images/home/card5.png',
    projects: [
      {
        id: 'lava-flow',
        title: 'Lava Flow',
        image: '/images/home/card5.png',
      },
      {
        id: 'ash-summit',
        title: 'Ash Summit',
        image: '/images/home/card5.png',
      },
    ],
  },
  {
    id: 'iceberg',
    number: '06',
    label: 'ICEBERG',
    headline: 'Discover The Frozen Edge',
    subline: 'Move across crystal ice, cold winds, blue shadows, and polar silence.',
    tagline: 'ICEBERG',
    accentColor: '#7dd3fc',
    bgColor: '#031923',
    cursorColor: '#bae6fd',
    font: 'Satoshi',
    soundFile: 'iceberg-ambient.mp3',
    effectComponent: 'FrostOverlay',
    cardImage: '/images/home/card6.png',
    projects: [
      {
        id: 'polar-drift',
        title: 'Polar Drift',
        image: '/images/home/card6.png',
      },
      {
        id: 'frozen-cave',
        title: 'Frozen Cave',
        image: '/images/home/card6.png',
      },
    ],
  },
  {
    id: 'garbage',
    number: '07',
    label: 'GARBAGE',
    headline: 'Face The Toxic Future',
    subline: 'Enter polluted cities, broken systems, waste mountains, and warning signs.',
    tagline: 'GARBAGE',
    accentColor: '#39ff14',
    bgColor: '#071006',
    cursorColor: '#39ff14',
    font: 'Orbitron',
    soundFile: 'garbage-ambient.mp3',
    effectComponent: 'GlitchOverlay',
    cardImage: '/images/home/card7.png',
    projects: [
      {
        id: 'waste-city',
        title: 'Waste City',
        image: '/images/home/card7.png',
      },
      {
        id: 'toxic-river',
        title: 'Toxic River',
        image: '/images/home/card7.png',
      },
    ],
  },
  {
    id: 'tech',
    number: '08',
    label: 'TECH',
    headline: 'Enter The Digital Grid',
    subline: 'Explore neon systems, smart cities, glowing interfaces, and future machines.',
    tagline: 'TECH',
    accentColor: '#00f5ff',
    bgColor: '#020b18',
    cursorColor: '#00f5ff',
    font: 'Orbitron',
    soundFile: 'tech-ambient.mp3',
    effectComponent: 'GlitchOverlay',
    cardImage: '/images/home/card8.png',
    projects: [
      {
        id: 'neon-city',
        title: 'Neon City',
        image: '/images/home/card8.png',
      },
      {
        id: 'ai-core',
        title: 'AI Core',
        image: '/images/home/card8.png',
      },
    ],
  },
  {
    id: 'cartoon',
    number: '09',
    label: 'CARTOON WORLD',
    headline: 'Jump Into A Playful Planet',
    subline: 'Discover bright lands, soft clouds, cheerful towns, and animated wonder.',
    tagline: 'CARTOON',
    accentColor: '#facc15',
    bgColor: '#171104',
    cursorColor: '#fde047',
    font: 'Poppins',
    soundFile: 'cartoon-ambient.mp3',
    effectComponent: 'LeafParticles',
    cardImage: '/images/home/card9.png',
    projects: [
      {
        id: 'sunny-village',
        title: 'Sunny Village',
        image: '/images/home/card9.png',
      },
      {
        id: 'cloud-park',
        title: 'Cloud Park',
        image: '/images/home/card9.png',
      },
    ],
  },
];

export const getWorldById = (id: string) =>
  WORLDS.find((world) => world.id === id);