import React, { useMemo } from 'react';
import { useNavStore } from '../stores/useNavStore';
import { usePresenterStore } from '../stores/usePresenterStore';
import { useBroadcastSync } from '../hooks/useBroadcastSync';
import { buildLiturgicalService } from '../lib/documentBuilder';
import { LiturgicalItem } from '../types';

export const ProjectorDisplay: React.FC = () => {
  const { category, fontSize, showCoptic, showEnglish, showArabic } = useNavStore();
  const { activeSlideIndex } = usePresenterStore();
  useBroadcastSync('projector');

  const sections = useMemo(() => buildLiturgicalService(category), [category]);

  const allItems: LiturgicalItem[] = useMemo(() => {
    const list: LiturgicalItem[] = [];
    sections.forEach((sec) => {
      sec.items.forEach((it) => list.push(it));
    });
    return list;
  }, [sections]);

  const currentItem = allItems[activeSlideIndex] || allItems[0];

  return (
    <div className="w-screen h-screen bg-black text-white p-12 flex flex-col justify-between overflow-hidden select-none" data-theme="projector">
      {/* Top Bar / Title */}
      <div className="flex items-center justify-between border-b border-amber-500/40 pb-4">
        {currentItem?.title && (
          <h1 className="text-amber-400 font-bold text-2xl tracking-wide uppercase">
            {currentItem.title.english || currentItem.title.coptic || currentItem.title.arabic}
          </h1>
        )}
        {currentItem?.user && (
          <span className="px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-sm font-semibold">
            {currentItem.user.english || currentItem.user.arabic || currentItem.user.coptic}
          </span>
        )}
      </div>

      {/* Main Liturgical Slide Text */}
      <div className="flex-1 flex items-center justify-center my-8">
        {currentItem ? (
          <div
            className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center"
            style={{ fontSize: `${fontSize * 1.25}px` }}
          >
            {/* Coptic Column */}
            {showCoptic && currentItem.text?.coptic && (
              <div className="coptic-text text-sky-300 leading-relaxed space-y-4">
                {Array.isArray(currentItem.text.coptic)
                  ? currentItem.text.coptic.map((line, i) => <p key={i}>{line}</p>)
                  : <p>{currentItem.text.coptic}</p>}
              </div>
            )}

            {/* English Column */}
            {showEnglish && currentItem.text?.english && (
              <div className="text-slate-100 font-medium leading-relaxed space-y-4">
                {Array.isArray(currentItem.text.english)
                  ? currentItem.text.english.map((line, i) => <p key={i}>{line}</p>)
                  : <p>{currentItem.text.english}</p>}
              </div>
            )}

            {/* Arabic Column */}
            {showArabic && currentItem.text?.arabic && (
              <div className="arabic-text text-amber-300 leading-relaxed space-y-4">
                {Array.isArray(currentItem.text.arabic)
                  ? currentItem.text.arabic.map((line, i) => <p key={i}>{line}</p>)
                  : <p>{currentItem.text.arabic}</p>}
              </div>
            )}
          </div>
        ) : (
          <div className="text-slate-600 text-xl font-bold">COPTIC ORTHODOX PRESENTER</div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-mono border-t border-slate-900 pt-3">
        <span>ORTHODOX PRESENTER</span>
        <span>SLIDE {activeSlideIndex + 1} OF {allItems.length}</span>
      </div>
    </div>
  );
};
