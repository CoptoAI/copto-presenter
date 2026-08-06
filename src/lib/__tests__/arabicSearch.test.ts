import { describe, it, expect } from 'vitest';
import { normalizeArabic, matchesQuery } from '../arabicSearch';

describe('Arabic Search & Text Normalizer', () => {
  it('strips Tashkeel diacritics correctly', () => {
    const raw = 'الْقُدَّاسُ الإِلَهِيُّ';
    const clean = normalizeArabic(raw);
    expect(clean).toBe('القداس الالهي');
  });

  it('matches Arabic queries regardless of Alef/Taa Marbouta variations', () => {
    const text = 'صلاة الشكر والقديسة العذراء مريم';
    expect(matchesQuery(text, 'الشكر')).toBe(true);
    expect(matchesQuery(text, 'القديسه')).toBe(true); // ة vs ه
    expect(matchesQuery(text, 'العذرا')).toBe(true);
  });
});
