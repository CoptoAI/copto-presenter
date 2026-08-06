import React, { useMemo } from 'react';
import { useNavStore } from '../stores/useNavStore';
import { usePresenterStore } from '../stores/usePresenterStore';
import { useBroadcastSync } from '../hooks/useBroadcastSync';
import { buildLiturgicalService } from '../lib/documentBuilder';
import { LiturgicalItem } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Monitor,
  Tv,
  Eye,
  ArrowRight
} from 'lucide-react';

export const OperatorControls: React.FC = () => {
  const { category, theme, setTheme } = useNavStore();
  const { activeSlideIndex, setActiveSlide, nextSlide, prevSlide, fontSize, setCategoryAndResetSlide } = usePresenterStore();
  const { broadcastState } = useBroadcastSync('operator');

  const sections = useMemo(() => buildLiturgicalService(category), [category]);

  const allItems: LiturgicalItem[] = useMemo(() => {
    const list: LiturgicalItem[] = [];
    sections.forEach((sec) => {
      sec.items.forEach((it) => list.push(it));
    });
    return list;
  }, [sections]);

  const currentItem = allItems[activeSlideIndex] || allItems[0];
  const nextItem = allItems[activeSlideIndex + 1];

  const handleNext = () => {
    nextSlide(allItems.length);
    broadcastState({ activeSlideIndex: Math.min(allItems.length - 1, activeSlideIndex + 1) });
  };

  const handlePrev = () => {
    prevSlide();
    broadcastState({ activeSlideIndex: Math.max(0, activeSlideIndex - 1) });
  };

  const handleSelectSlide = (idx: number) => {
    setActiveSlide(idx);
    broadcastState({ activeSlideIndex: idx });
  };

  return (
    <div className="flex-1 m-2 p-6 flex flex-col gap-6 h-[calc(100vh-5.5rem)] overflow-y-auto">
      {/* Top Bar / Status */}
      <div className="glass-panel p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-100">Presenter Control Center (Screen 1)</h2>
            <p className="text-xs text-slate-400">
              Active Slide: {activeSlideIndex + 1} / {allItems.length}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={activeSlideIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={activeSlideIndex >= allItems.length - 1}
            className="flex items-center gap-1.5 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg transition"
          >
            Next Slide
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Split: Current Active Slide vs Next Slide Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Slide Display */}
        <div className="glass-panel p-6 border-amber-500/60 bg-amber-950/20 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Eye className="w-4 h-4" />
              <span>LIVE PROJECTOR OUTPUT (Slide #{activeSlideIndex + 1})</span>
            </div>
          </div>

          {currentItem ? (
            <div className="space-y-4">
              {currentItem.title && (
                <h3 className="text-base font-bold text-amber-300">
                  {currentItem.title.english || currentItem.title.coptic || currentItem.title.arabic}
                </h3>
              )}
              {currentItem.text?.english && (
                <p className="text-slate-100 text-sm leading-relaxed">
                  {Array.isArray(currentItem.text.english)
                    ? currentItem.text.english.join(' ')
                    : currentItem.text.english}
                </p>
              )}
              {currentItem.text?.arabic && (
                <p className="arabic-text text-amber-200 text-sm leading-relaxed">
                  {Array.isArray(currentItem.text.arabic)
                    ? currentItem.text.arabic.join(' ')
                    : currentItem.text.arabic}
                </p>
              )}
            </div>
          ) : (
            <p className="text-slate-500 text-xs italic">No slide active.</p>
          )}
        </div>

        {/* Next Slide Preview */}
        <div className="glass-panel p-6 opacity-80 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
              <ArrowRight className="w-4 h-4 text-sky-400" />
              <span>UPCOMING SLIDE PREVIEW</span>
            </div>
          </div>

          {nextItem ? (
            <div className="space-y-3">
              {nextItem.title && (
                <h3 className="text-sm font-semibold text-slate-300">
                  {nextItem.title.english || nextItem.title.coptic || nextItem.title.arabic}
                </h3>
              )}
              {nextItem.text?.english && (
                <p className="text-slate-400 text-xs line-clamp-3">
                  {Array.isArray(nextItem.text.english)
                    ? nextItem.text.english.join(' ')
                    : nextItem.text.english}
                </p>
              )}
            </div>
          ) : (
            <p className="text-slate-500 text-xs italic">End of service section.</p>
          )}
        </div>
      </div>

      {/* Slide Thumbnails List */}
      <div className="glass-panel p-4 flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          All Slides in Section ({allItems.length})
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allItems.map((item, idx) => {
            const isActive = idx === activeSlideIndex;
            return (
              <button
                key={idx}
                onClick={() => handleSelectSlide(idx)}
                className={`p-3 rounded-xl min-w-[180px] max-w-[220px] text-left border transition shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider opacity-70 mb-1">
                  Slide {idx + 1}
                </div>
                <div className="text-xs truncate font-medium">
                  {item.title?.english || item.title?.arabic || `Prayer Item #${idx + 1}`}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
