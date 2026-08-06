import React, { useEffect, useMemo } from 'react';
import { useNavStore } from '../stores/useNavStore';
import { usePresenterStore } from '../stores/usePresenterStore';
import { buildLiturgicalService } from '../lib/documentBuilder';
import { LiturgicalItem } from '../types';

export const DocumentViewer: React.FC = () => {
  const {
    category,
    fontSize,
    showCoptic,
    showCopticEngTransliteration,
    showCopticAraTransliteration,
    showEnglish,
    showArabic
  } = useNavStore();
  const { activeSlideIndex, setActiveSlide, nextSlide, prevSlide } = usePresenterStore();

  const sections = useMemo(() => buildLiturgicalService(category), [category]);

  const allItems: LiturgicalItem[] = useMemo(() => {
    const list: LiturgicalItem[] = [];
    sections.forEach((sec) => {
      sec.items.forEach((it) => list.push(it));
    });
    return list;
  }, [sections]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide(allItems.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allItems.length, nextSlide, prevSlide]);

  if (sections.length === 0) {
    return (
      <div className="glass-panel flex-1 m-2 p-8 flex items-center justify-center text-slate-400">
        No content available for this section.
      </div>
    );
  }

  return (
    <main className="glass-panel flex-1 m-2 p-6 flex flex-col gap-6 overflow-y-auto h-[calc(100vh-5.5rem)]">
      {sections.map((section) => (
        <div key={section.id} className="flex flex-col gap-6">
          {/* Section Header */}
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-bold text-sky-400 tracking-wide">
              {typeof section.title === 'string'
                ? section.title
                : section.title.english || section.title.coptic || section.title.arabic}
            </h2>
            {section.subtitle && (
              <p className="text-xs text-slate-400 font-medium italic mt-0.5">{section.subtitle}</p>
            )}
          </div>

          {/* Liturgical Items List */}
          <div className="flex flex-col gap-6">
            {section.items.map((item, idx) => {
              const isActive = idx === activeSlideIndex;
              const roleLabel = item.user ? item.user.english || item.user.coptic || item.user.arabic : item.role;

              return (
                <div
                  key={item.id || idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-950/40 border-sky-500/80 shadow-2xl ring-2 ring-sky-500/30'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
                  }`}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {/* Title & Role Badge */}
                  <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-slate-800">
                    {item.title && (
                      <h3 className="font-semibold text-amber-300 text-sm tracking-wide">
                        {item.title.english || item.title.coptic || item.title.arabic}
                      </h3>
                    )}
                    {roleLabel && (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono font-medium border border-slate-700">
                        {typeof roleLabel === 'string' ? roleLabel : JSON.stringify(roleLabel)}
                      </span>
                    )}
                  </div>

                  {/* Multilingual Text Content Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Coptic Script Column */}
                    {showCoptic && item.text?.coptic && (
                      <div className="coptic-text text-sky-200 leading-relaxed space-y-2">
                        <span className="text-[10px] uppercase font-mono text-sky-400 block font-bold">Coptic</span>
                        {Array.isArray(item.text.coptic)
                          ? item.text.coptic.map((line, i) => <p key={i}>{line}</p>)
                          : <p>{item.text.coptic}</p>}
                      </div>
                    )}

                    {/* Coptic Transliteration in English */}
                    {showCopticEngTransliteration && item.text?.copticTransliterationEng && (
                      <div className="text-emerald-300 leading-relaxed space-y-2 italic">
                        <span className="text-[10px] uppercase font-mono text-emerald-400 block font-bold not-italic">Coptic (English Letters)</span>
                        {Array.isArray(item.text.copticTransliterationEng)
                          ? item.text.copticTransliterationEng.map((line, i) => <p key={i}>{line}</p>)
                          : <p>{item.text.copticTransliterationEng}</p>}
                      </div>
                    )}

                    {/* Coptic Transliteration in Arabic */}
                    {showCopticAraTransliteration && item.text?.copticTransliterationAra && (
                      <div className="arabic-text text-emerald-300 leading-relaxed space-y-2">
                        <span className="text-[10px] uppercase font-mono text-emerald-400 block font-bold">قبطي بالحروف العربية</span>
                        {Array.isArray(item.text.copticTransliterationAra)
                          ? item.text.copticTransliterationAra.map((line, i) => <p key={i}>{line}</p>)
                          : <p>{item.text.copticTransliterationAra}</p>}
                      </div>
                    )}

                    {/* English Translation */}
                    {showEnglish && item.text?.english && (
                      <div className="text-slate-100 leading-relaxed space-y-2">
                        <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">English</span>
                        {Array.isArray(item.text.english)
                          ? item.text.english.map((line, i) => <p key={i}>{line}</p>)
                          : <p>{item.text.english}</p>}
                      </div>
                    )}

                    {/* Arabic Translation */}
                    {showArabic && item.text?.arabic && (
                      <div className="arabic-text text-amber-200 leading-relaxed space-y-2">
                        <span className="text-[10px] uppercase font-mono text-amber-400 block font-bold">العربية</span>
                        {Array.isArray(item.text.arabic)
                          ? item.text.arabic.map((line, i) => <p key={i}>{line}</p>)
                          : <p>{item.text.arabic}</p>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
};
