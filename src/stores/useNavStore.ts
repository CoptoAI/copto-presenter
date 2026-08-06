import { create } from 'zustand';
import { SectionCategory } from '../types';
import { savePreferences, loadPreferences } from '../lib/offlineStorage';

export interface NavState {
  category: SectionCategory;
  selectedDate: Date;
  selectedTime: number; // 0 to 23
  sidebarOpen: boolean;
  fontSize: number; // font size in px
  copticFont: 'Avva Shenouda' | 'Coptic Standard' | 'Noto Sans Coptic';
  showCoptic: boolean;
  showEnglish: boolean;
  showArabic: boolean;
  theme: 'dark' | 'light' | 'projector' | 'sepia';
  activeView: 'app' | 'operator' | 'projector';

  setCategory: (category: SectionCategory) => void;
  setDate: (date: Date) => void;
  setTime: (hour: number) => void;
  toggleSidebar: () => void;
  setFontSize: (size: number) => void;
  setCopticFont: (font: 'Avva Shenouda' | 'Coptic Standard' | 'Noto Sans Coptic') => void;
  toggleLanguage: (lang: 'coptic' | 'english' | 'arabic') => void;
  setTheme: (theme: 'dark' | 'light' | 'projector' | 'sepia') => void;
  setActiveView: (view: 'app' | 'operator' | 'projector') => void;
  initOfflinePreferences: () => Promise<void>;
}

export const useNavStore = create<NavState>((set, get) => ({
  category: 'LITURGY_OF_THE_WORD',
  selectedDate: new Date(),
  selectedTime: new Date().getHours(),
  sidebarOpen: true,
  fontSize: 24,
  copticFont: 'Avva Shenouda',
  showCoptic: true,
  showEnglish: true,
  showArabic: true,
  theme: 'dark',
  activeView: 'app',

  setCategory: (category) => set({ category }),
  setDate: (selectedDate) => set({ selectedDate }),
  setTime: (selectedTime) => set({ selectedTime }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setFontSize: (fontSize) => {
    set({ fontSize });
    const s = get();
    savePreferences({
      fontSize,
      showCoptic: s.showCoptic,
      showEnglish: s.showEnglish,
      showArabic: s.showArabic,
      theme: s.theme,
      fontFamily: s.copticFont
    });
  },
  setCopticFont: (copticFont) => {
    set({ copticFont });
    const s = get();
    savePreferences({
      fontSize: s.fontSize,
      showCoptic: s.showCoptic,
      showEnglish: s.showEnglish,
      showArabic: s.showArabic,
      theme: s.theme,
      fontFamily: copticFont
    });
  },
  toggleLanguage: (lang) =>
    set((state) => {
      const next = {
        showCoptic: lang === 'coptic' ? !state.showCoptic : state.showCoptic,
        showEnglish: lang === 'english' ? !state.showEnglish : state.showEnglish,
        showArabic: lang === 'arabic' ? !state.showArabic : state.showArabic
      };
      savePreferences({
        fontSize: state.fontSize,
        theme: state.theme,
        fontFamily: state.copticFont,
        ...next
      });
      return next;
    }),
  setTheme: (theme) => {
    set({ theme });
    const s = get();
    savePreferences({
      fontSize: s.fontSize,
      showCoptic: s.showCoptic,
      showEnglish: s.showEnglish,
      showArabic: s.showArabic,
      theme,
      fontFamily: s.copticFont
    });
  },
  setActiveView: (activeView) => set({ activeView }),
  initOfflinePreferences: async () => {
    const saved = await loadPreferences();
    if (saved) {
      set({
        fontSize: saved.fontSize || 24,
        showCoptic: saved.showCoptic ?? true,
        showEnglish: saved.showEnglish ?? true,
        showArabic: saved.showArabic ?? true,
        theme: saved.theme || 'dark',
        copticFont: (saved.fontFamily as any) || 'Avva Shenouda'
      });
    }
  }
}));
