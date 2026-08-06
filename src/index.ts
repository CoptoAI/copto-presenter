// Copto Presenter Core Engine & SDK Package Exports

export {
  getCopticDate,
  getResurrectionDate,
  isJulianLeapYear,
  COPTIC_MONTHS
} from './lib/copticCalendar';

export {
  resolveLiturgicalSeason
} from './domain/seasonResolver';
export type { LiturgicalRite, SeasonInfo } from './domain/seasonResolver';

export {
  buildLiturgicalService,
  getServiceTitle
} from './lib/documentBuilder';

export {
  parseRawJsonDocument,
  normalizeLiturgicalItem,
  normalizeMultilingualText
} from './content/contentResolver';

export type {
  MultilingualText,
  LiturgicalItem,
  LiturgicalSection,
  CopticMonth,
  CopticDateResult,
  SectionCategory,
  PresenterSyncState
} from './types';
