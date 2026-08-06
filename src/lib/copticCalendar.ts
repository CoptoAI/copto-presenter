import moment, { Moment } from 'moment';
import { CopticDateResult, CopticMonth } from '../types';

export const COPTIC_MONTHS: CopticMonth[] = [
  { name: 'Thoout', index: 0, month: 9, day: 11, leap: true },
  { name: 'Paope', index: 1, month: 10, day: 11, leap: true },
  { name: 'Hathor', index: 2, month: 11, day: 10, leap: true },
  { name: 'Koiahk', index: 3, month: 12, day: 10, leap: true },
  { name: 'Tobe', index: 4, month: 1, day: 9, leap: true },
  { name: 'Meshir', index: 5, month: 2, day: 8, leap: true },
  { name: 'Paremhotep', index: 6, month: 3, day: 10, leap: false },
  { name: 'Parmoute', index: 7, month: 4, day: 9, leap: false },
  { name: 'Pashons', index: 8, month: 5, day: 9, leap: false },
  { name: 'Paone', index: 9, month: 6, day: 8, leap: false },
  { name: 'Epep', index: 10, month: 7, day: 8, leap: false },
  { name: 'Mesore', index: 11, month: 8, day: 7, leap: false },
  { name: 'Pi Kogi Enavot', index: 12, month: 9, day: 6, leap: false }
];

export function isJulianLeapYear(year: number): boolean {
  return year % 4 === 3;
}

export function getResurrectionDate(year: number): Date {
  const a = year % 19;
  const b = year % 4;
  const c = year % 7;
  const d = (19 * a + 15) % 30;
  const e = (2 * b + 4 * c + 6 * d + 6) % 7;
  let f = d + e;

  let keyMonth = 3; // April
  let keyDay = f - 9;

  if (f <= 9) {
    keyMonth = 2; // March
    keyDay = 22 + f;
  }

  // Adjust for Julian calendar to Gregorian offset (13 days for 1900-2099)
  const julianResurrection = moment([year, keyMonth, keyDay]);
  const gregorianResurrection = julianResurrection.add(13, 'days');
  return gregorianResurrection.toDate();
}

export function getCopticDate(dateInput: Date | Moment): CopticDateResult {
  const m = moment(dateInput);
  const year = m.year();

  // Basic Coptic month determination logic
  let copticMonthIndex = 0;
  let copticDay = 1;
  const copticYear = year - 284;

  const month = m.month(); // 0-indexed
  const day = m.date();

  // Approximate baseline mapping for demo & presenter runtime
  for (let i = 0; i < COPTIC_MONTHS.length; i++) {
    const cm = COPTIC_MONTHS[i];
    if (month + 1 === cm.month && day >= cm.day) {
      copticMonthIndex = cm.index;
      copticDay = day - cm.day + 1;
      break;
    }
  }

  const copticMonth = COPTIC_MONTHS[copticMonthIndex];

  return {
    copticDay,
    copticMonthName: copticMonth ? copticMonth.name : 'Thoout',
    copticMonthIndex,
    copticYear,
    dayOfWeek: m.format('dddd'),
    seasonName: 'Annual',
    isFast: false,
    isFeast: false
  };
}
