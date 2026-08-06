export interface MultilingualText {
  coptic?: string | string[];
  english?: string | string[];
  arabic?: string | string[];
  eng?: string | string[];
  ara?: string | string[];
  cop?: string | string[];
}

export interface LiturgicalItem {
  id?: string;
  role?: 'priest' | 'deacon' | 'people' | 'reader' | 'all';
  type?: 'prayer' | 'hymn' | 'reading' | 'rubric' | 'title';
  user?: MultilingualText;
  title?: MultilingualText;
  rubric?: MultilingualText;
  text?: MultilingualText;
  items?: LiturgicalItem[];
}

export interface LiturgicalSection {
  id: string;
  title: string | MultilingualText;
  subtitle?: string;
  category?: string;
  items: LiturgicalItem[];
}

export interface CopticMonth {
  name: string;
  index: number;
  month: number; // Gregorian month baseline
  day: number;   // Gregorian start day
  leap: boolean;
}

export interface CopticDateResult {
  copticDay: number;
  copticMonthName: string;
  copticMonthIndex: number;
  copticYear: number;
  dayOfWeek: string;
  seasonName?: string;
  isFast?: boolean;
  isFeast?: boolean;
}

export type SectionCategory =
  | 'VESPERS'
  | 'MATINS'
  | 'OFFERING_OF_THE_LAMB'
  | 'LITURGY_OF_THE_WORD'
  | 'ST_BASIL_LITURGY_OF_THE_FAITHFUL'
  | 'DISTRIBUTION'
  | 'ST_GREGORY_LITURGY_OF_THE_FAITHFUL'
  | 'ST_CYRIL_LITURGY_OF_THE_FAITHFUL'
  | 'AGPEYA_1ST_HOUR'
  | 'AGPEYA_3RD_HOUR'
  | 'AGPEYA_6TH_HOUR'
  | 'AGPEYA_9TH_HOUR'
  | 'AGPEYA_11TH_HOUR'
  | 'AGPEYA_12TH_HOUR'
  | 'AGPEYA_VEIL'
  | 'AGPEYA_SELECTED_PRAYERS'
  | 'AGPEYA_COMMUNION'
  | 'AGPEYA_MEALS'
  | 'AGPEYA_CONFESSION'
  | 'AGPEYA_GUIDANCE'
  | 'AGPEYA_DEACONS'
  | 'AGPEYA_PRIESTS'
  | 'VESPER_PRAISES'
  | 'MIDNIGHT_PRAISES'
  | 'MORNING_PRAISES'
  | 'PASCHA_GENERAL_FUNERAL_PRAYER';

export interface PresenterSyncState {
  activeSectionId: string;
  activeSlideIndex: number;
  category: SectionCategory;
  fontSize: number;
  showCoptic: boolean;
  showEnglish: boolean;
  showArabic: boolean;
  theme: 'dark' | 'light' | 'projector' | 'sepia';
  timestamp: number;
}
