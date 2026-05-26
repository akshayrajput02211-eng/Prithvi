'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type TransitionOrigin = {
  x: number;
  y: number;
};

type WorldStore = {
  currentWorld: string;
  isSoundOn: boolean;
  isTransitioning: boolean;
  transitionColor: string;
  transitionOrigin: TransitionOrigin;

  setWorld: (id: string) => void;
  toggleSound: () => void;
  triggerTransition: (
    color: string,
    originX?: number,
    originY?: number
  ) => void;
  endTransition: () => void;
};

export const useWorldStore = create<WorldStore>()(
  immer((set) => ({
    currentWorld: 'home',
    isSoundOn: false,
    isTransitioning: false,
    transitionColor: '#7c3aed',
    transitionOrigin: { x: 0.5, y: 0.5 },

    setWorld: (id) =>
      set((state) => {
        state.currentWorld = id;
      }),

    toggleSound: () =>
      set((state) => {
        state.isSoundOn = !state.isSoundOn;
      }),

    triggerTransition: (color, originX = 0.5, originY = 0.5) =>
      set((state) => {
        state.isTransitioning = true;
        state.transitionColor = color;
        state.transitionOrigin = {
          x: originX,
          y: originY,
        };
      }),

    endTransition: () =>
      set((state) => {
        state.isTransitioning = false;
      }),
  }))
);