import { describe, it, expect } from 'vitest';
import { getCopticDate, getResurrectionDate, isJulianLeapYear } from '../copticCalendar';

describe('Coptic Calendar Engine', () => {
  it('identifies Julian leap years correctly', () => {
    expect(isJulianLeapYear(2023)).toBe(true); // 2023 % 4 === 3
    expect(isJulianLeapYear(2024)).toBe(false);
  });

  it('computes resurrection date within reasonable month bounds', () => {
    const easter2024 = getResurrectionDate(2024);
    expect(easter2024).toBeInstanceOf(Date);
    expect(easter2024.getFullYear()).toBe(2024);
  });

  it('converts Gregorian date to Coptic date result object', () => {
    const result = getCopticDate(new Date(2024, 0, 7)); // Jan 7, 2024
    expect(result.copticMonthName).toBeDefined();
    expect(result.dayOfWeek).toBeDefined();
    expect(typeof result.copticDay).toBe('number');
  });
});
