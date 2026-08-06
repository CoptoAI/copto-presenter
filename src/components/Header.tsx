import React, { useEffect } from 'react';
import { useNavStore } from '../stores/useNavStore';
import { resolveLiturgicalSeason } from '../domain/seasonResolver';
import {
  Menu,
  Monitor,
  Type,
  Sun,
  Moon,
  Tv,
  BookOpen,
  SlidersHorizontal,
  Sparkles,
  Maximize2
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    sidebarOpen,
    toggleSidebar,
    fontSize,
    setFontSize,
    copticFont,
    setCopticFont,
    showCoptic,
    showCopticEngTransliteration,
    showCopticAraTransliteration,
    showEnglish,
    showArabic,
    toggleLanguage,
    theme,
    setTheme,
    activeView,
    setActiveView,
    selectedDate,
    initOfflinePreferences
  } = useNavStore();

  useEffect(() => {
    initOfflinePreferences();
  }, [initOfflinePreferences]);

  const season = resolveLiturgicalSeason(selectedDate);

  const handleOpenProjectorWindow = () => {
    window.open(
      `${window.location.origin}${window.location.pathname}?view=projector`,
      'ProjectorViewWindow',
      'width=1280,height=720,menubar=no,toolbar=no,location=no'
    );
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  };

  return (
    <header className="glass-panel sticky top-0 z-50 flex items-center justify-between px-4 py-3 m-2 gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-200 transition"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-sky-400" />
          <div>
            <h1 className="font-bold text-base tracking-wide hidden sm:block bg-gradient-to-r from-sky-400 to-amber-300 bg-clip-text text-transparent">
              COPTO PRESENTER
            </h1>
            <span className="hidden md:flex items-center gap-1 text-[10px] font-semibold text-amber-400/90">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {season.seasonName}
            </span>
          </div>
        </div>
      </div>

      {/* Language Visibility Controls (5 Options) */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-700/50">
          <button
            onClick={() => toggleLanguage('coptic')}
            className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition ${
              showCoptic
                ? 'bg-sky-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Coptic Script"
          >
            COP
          </button>
          <button
            onClick={() => toggleLanguage('copticEng')}
            className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition ${
              showCopticEngTransliteration
                ? 'bg-sky-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Coptic Transliteration in English"
          >
            COP-EN
          </button>
          <button
            onClick={() => toggleLanguage('copticAra')}
            className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition ${
              showCopticAraTransliteration
                ? 'bg-sky-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Coptic Transliteration in Arabic"
          >
            COP-AR
          </button>
          <button
            onClick={() => toggleLanguage('english')}
            className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition ${
              showEnglish
                ? 'bg-sky-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle English Translation"
          >
            ENG
          </button>
          <button
            onClick={() => toggleLanguage('arabic')}
            className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition ${
              showArabic
                ? 'bg-amber-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Arabic Translation"
          >
            ARA
          </button>
        </div>

        {/* Font Family Selection */}
        <select
          value={copticFont}
          onChange={(e) => setCopticFont(e.target.value as any)}
          className="hidden xl:block bg-slate-900/80 border border-slate-700/60 rounded-xl px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          title="Select Coptic Font Family"
        >
          <option value="Avva Shenouda">Font: Avva Shenouda</option>
          <option value="Coptic Standard">Font: Coptic Standard</option>
          <option value="Noto Sans Coptic">Font: Noto Sans Coptic</option>
        </select>
      </div>

      {/* Font Size & Theme Settings */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-700/50">
          <Type className="w-4 h-4 text-slate-400" />
          <input
            type="range"
            min={16}
            max={48}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-20 accent-sky-400 cursor-pointer"
            title={`Font Size: ${fontSize}px`}
          />
          <span className="text-xs font-mono w-6 text-slate-300">{fontSize}px</span>
        </div>

        {/* Theme Picker */}
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-700/50">
          <button
            onClick={() => setTheme('dark')}
            className={`p-1.5 rounded-lg transition ${
              theme === 'dark' ? 'bg-slate-700 text-sky-400' : 'text-slate-400 hover:text-white'
            }`}
            title="Dark Theme"
          >
            <Moon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTheme('projector')}
            className={`p-1.5 rounded-lg transition ${
              theme === 'projector' ? 'bg-slate-700 text-amber-400' : 'text-slate-400 hover:text-white'
            }`}
            title="Projector High-Contrast Mode"
          >
            <Tv className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`p-1.5 rounded-lg transition ${
              theme === 'light' ? 'bg-slate-700 text-amber-400' : 'text-slate-400 hover:text-white'
            }`}
            title="Light Theme"
          >
            <Sun className="w-4 h-4" />
          </button>
        </div>

        {/* Fullscreen & Presenter View Trigger */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-900/60 border border-slate-700/50 text-slate-300 hover:text-white transition"
            title="Toggle Fullscreen Mode"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveView(activeView === 'operator' ? 'app' : 'operator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition ${
              activeView === 'operator'
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-sky-500/20 border-sky-500/50 text-sky-300 hover:bg-sky-500/30'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Presenter Control</span>
          </button>
          <button
            onClick={handleOpenProjectorWindow}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-lg font-bold"
            title="Open Fullscreen Projector Display Window for Second Monitor"
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Launch Projector</span>
          </button>
        </div>
      </div>
    </header>
  );
};
