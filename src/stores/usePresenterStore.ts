import { create } from 'zustand';
import { PresenterSyncState, SectionCategory } from '../types';

export interface PresenterState extends PresenterSyncState {
  isProjectorWindowOpen: boolean;

  setActiveSlide: (index: number) => void;
  nextSlide: (maxSlides: number) => void;
  prevSlide: () => void;
  setCategoryAndResetSlide: (category: SectionCategory) => void;
  updateSyncState: (partial: Partial<PresenterSyncState>) => void;
  setProjectorWindowOpen: (open: boolean) => void;
}

export const usePresenterStore = create<PresenterState>((set) => ({
  activeSectionId: 'main-section',
  activeSlideIndex: 0,
  category: 'LITURGY_OF_THE_WORD',
  fontSize: 32,
  showCoptic: true,
  showEnglish: true,
  showArabic: true,
  theme: 'projector',
  timestamp: Date.now(),
  isProjectorWindowOpen: false,

  setActiveSlide: (index) => set({ activeSlideIndex: Math.max(0, index), timestamp: Date.now() }),
  nextSlide: (maxSlides) =>
    set((state) => ({
      activeSlideIndex: Math.min(maxSlides - 1, state.activeSlideIndex + 1),
      timestamp: Date.now()
    })),
  prevSlide: () =>
    set((state) => ({
      activeSlideIndex: Math.max(0, state.activeSlideIndex - 1),
      timestamp: Date.now()
    })),
  setCategoryAndResetSlide: (category) =>
    set({ category, activeSlideIndex: 0, timestamp: Date.now() }),
  updateSyncState: (partial) => set((state) => ({ ...state, ...partial, timestamp: Date.now() })),
  setProjectorWindowOpen: (isProjectorWindowOpen) => set({ isProjectorWindowOpen })
}));
