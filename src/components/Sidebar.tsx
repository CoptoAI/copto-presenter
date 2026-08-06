import React from 'react';
import { useNavStore } from '../stores/useNavStore';
import { SectionCategory } from '../types';
import { getCopticDate } from '../lib/copticCalendar';
import { matchesQuery } from '../lib/arabicSearch';
import { translations } from '../i18n/translations';
import {
  BookOpen,
  Clock,
  Music,
  Cross,
  Calendar,
  ChevronRight,
  Search,
  BookMarked
} from 'lucide-react';

interface CategoryGroup {
  nameKey: keyof typeof translations['en'];
  icon: React.ReactNode;
  items: { id: SectionCategory; labelKey: keyof typeof translations['en'] }[];
}

export const Sidebar: React.FC = () => {
  const { category, setCategory, sidebarOpen, selectedDate, uiLanguage, searchQuery, setSearchQuery } = useNavStore();

  const copticDate = getCopticDate(selectedDate);
  const t = translations[uiLanguage];

  const groups: CategoryGroup[] = [
    {
      nameKey: 'groupLiturgy',
      icon: <BookOpen className="w-4 h-4 text-sky-400" />,
      items: [
        { id: 'OFFERING_OF_THE_LAMB', labelKey: 'catOfferingLamb' },
        { id: 'LITURGY_OF_THE_WORD', labelKey: 'catLiturgyWord' },
        { id: 'ST_BASIL_LITURGY_OF_THE_FAITHFUL', labelKey: 'catBasilFaithful' },
        { id: 'ST_GREGORY_LITURGY_OF_THE_FAITHFUL', labelKey: 'catGregoryFaithful' },
        { id: 'ST_CYRIL_LITURGY_OF_THE_FAITHFUL', labelKey: 'catCyrilFaithful' },
        { id: 'DISTRIBUTION', labelKey: 'catDistribution' },
        { id: 'VESPERS', labelKey: 'catVespers' },
        { id: 'MATINS', labelKey: 'catMatins' }
      ]
    },
    {
      nameKey: 'groupReadings',
      icon: <BookMarked className="w-4 h-4 text-amber-400" />,
      items: [
        { id: 'KATAMEROS_READINGS', labelKey: 'catKatameros' }
      ]
    },
    {
      nameKey: 'groupAgpeya',
      icon: <Clock className="w-4 h-4 text-sky-300" />,
      items: [
        { id: 'AGPEYA_1ST_HOUR', labelKey: 'catAgpeya1' },
        { id: 'AGPEYA_3RD_HOUR', labelKey: 'catAgpeya3' },
        { id: 'AGPEYA_6TH_HOUR', labelKey: 'catAgpeya6' },
        { id: 'AGPEYA_9TH_HOUR', labelKey: 'catAgpeya9' },
        { id: 'AGPEYA_11TH_HOUR', labelKey: 'catAgpeya11' },
        { id: 'AGPEYA_12TH_HOUR', labelKey: 'catAgpeya12' },
        { id: 'AGPEYA_VEIL', labelKey: 'catAgpeyaVeil' }
      ]
    },
    {
      nameKey: 'groupPraises',
      icon: <Music className="w-4 h-4 text-emerald-400" />,
      items: [
        { id: 'MIDNIGHT_PRAISES', labelKey: 'catMidnightPraises' },
        { id: 'VESPER_PRAISES', labelKey: 'catVesperPraises' },
        { id: 'MORNING_PRAISES', labelKey: 'catMorningPraises' }
      ]
    },
    {
      nameKey: 'groupPascha',
      icon: <Cross className="w-4 h-4 text-rose-400" />,
      items: [
        { id: 'PASCHA_GENERAL_FUNERAL_PRAYER', labelKey: 'catFuneralPrayer' }
      ]
    }
  ];

  if (!sidebarOpen) return null;

  return (
    <aside className="glass-panel w-80 h-[calc(100vh-5.5rem)] flex flex-col m-2 p-4 gap-4 overflow-hidden shrink-0">
      {/* Coptic Calendar Info Badge */}
      <div className="bg-slate-900/80 border border-slate-700/60 p-3 rounded-xl flex items-center gap-3">
        <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">{t.copticCalendarDate}</p>
          <p className="text-sm font-bold text-slate-100">
            {copticDate.copticDay} {copticDate.copticMonthName} {copticDate.copticYear} A.M.
          </p>
        </div>
      </div>

      {/* Search Input with Arabic Normalizer Support */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
        />
      </div>

      {/* Categories Accordion */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
        {groups.map((group) => {
          const groupTitle = (t as any)[group.nameKey] || group.nameKey;

          const filteredItems = group.items.filter((item) => {
            const itemLabel = (t as any)[item.labelKey] || item.labelKey;
            return matchesQuery(itemLabel, searchQuery);
          });

          if (filteredItems.length === 0) return null;

          return (
            <div key={group.nameKey} className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                {group.icon}
                <span>{groupTitle}</span>
              </div>
              <div className="flex flex-col gap-1">
                {filteredItems.map((item) => {
                  const isActive = category === item.id;
                  const itemLabel = (t as any)[item.labelKey] || item.labelKey;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setCategory(item.id)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition ${
                        isActive
                          ? 'bg-sky-500 text-white font-bold shadow-lg shadow-sky-500/20'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <span>{itemLabel}</span>
                      {isActive && <ChevronRight className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
