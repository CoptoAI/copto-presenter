import React, { useState } from 'react';
import { useNavStore } from '../stores/useNavStore';
import { SectionCategory } from '../types';
import { getCopticDate } from '../lib/copticCalendar';
import {
  BookOpen,
  Clock,
  Music,
  Cross,
  Calendar,
  ChevronRight,
  Search
} from 'lucide-react';

interface CategoryGroup {
  name: string;
  icon: React.ReactNode;
  items: { id: SectionCategory; label: string }[];
}

export const Sidebar: React.FC = () => {
  const { category, setCategory, sidebarOpen, selectedDate } = useNavStore();
  const [filter, setFilter] = useState('');

  const copticDate = getCopticDate(selectedDate);

  const groups: CategoryGroup[] = [
    {
      name: 'Holy Liturgy',
      icon: <BookOpen className="w-4 h-4 text-sky-400" />,
      items: [
        { id: 'OFFERING_OF_THE_LAMB', label: 'Offering of the Lamb' },
        { id: 'LITURGY_OF_THE_WORD', label: 'Liturgy of the Word' },
        { id: 'ST_BASIL_LITURGY_OF_THE_FAITHFUL', label: 'St. Basil - Faithful' },
        { id: 'ST_GREGORY_LITURGY_OF_THE_FAITHFUL', label: 'St. Gregory - Faithful' },
        { id: 'ST_CYRIL_LITURGY_OF_THE_FAITHFUL', label: 'St. Cyril - Faithful' },
        { id: 'DISTRIBUTION', label: 'Distribution of Mysteries' },
        { id: 'VESPERS', label: 'Vespers Raising of Incense' },
        { id: 'MATINS', label: 'Matins Raising of Incense' }
      ]
    },
    {
      name: 'Agpeya (Book of Hours)',
      icon: <Clock className="w-4 h-4 text-amber-400" />,
      items: [
        { id: 'AGPEYA_1ST_HOUR', label: '1st Hour (Prime - 6 AM)' },
        { id: 'AGPEYA_3RD_HOUR', label: '3rd Hour (Terce - 9 AM)' },
        { id: 'AGPEYA_6TH_HOUR', label: '6th Hour (Sext - 12 PM)' },
        { id: 'AGPEYA_9TH_HOUR', label: '9th Hour (None - 3 PM)' },
        { id: 'AGPEYA_11TH_HOUR', label: '11th Hour (Vespers - 5 PM)' },
        { id: 'AGPEYA_12TH_HOUR', label: '12th Hour (Compline - 6 PM)' },
        { id: 'AGPEYA_VEIL', label: 'Veil Prayer (Monastic)' }
      ]
    },
    {
      name: 'Psalmodies & Praises',
      icon: <Music className="w-4 h-4 text-emerald-400" />,
      items: [
        { id: 'MIDNIGHT_PRAISES', label: 'Midnight Praises (Tasbeha)' },
        { id: 'VESPER_PRAISES', label: 'Vesper Praises' },
        { id: 'MORNING_PRAISES', label: 'Morning Praises' }
      ]
    },
    {
      name: 'Holy Pascha',
      icon: <Cross className="w-4 h-4 text-rose-400" />,
      items: [
        { id: 'PASCHA_GENERAL_FUNERAL_PRAYER', label: 'General Funeral Prayer' }
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
          <p className="text-xs text-slate-400 font-medium">Coptic Calendar Date</p>
          <p className="text-sm font-bold text-slate-100">
            {copticDate.copticDay} {copticDate.copticMonthName} {copticDate.copticYear} A.M.
          </p>
        </div>
      </div>

      {/* Filter Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search services & prayers..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
        />
      </div>

      {/* Categories Accordion */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
        {groups.map((group) => {
          const filteredItems = group.items.filter((item) =>
            item.label.toLowerCase().includes(filter.toLowerCase())
          );
          if (filteredItems.length === 0) return null;

          return (
            <div key={group.name} className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                {group.icon}
                <span>{group.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                {filteredItems.map((item) => {
                  const isActive = category === item.id;
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
                      <span>{item.label}</span>
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
