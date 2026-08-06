import { describe, it, expect } from 'vitest';
import { resolveLiturgicalSeason } from '../seasonResolver';

describe('Liturgical Season Resolver', () => {
  it('resolves Great Lent season correctly for pre-Easter date', () => {
    const lentDate = new Date(2024, 2, 25); // March 25, 2024 (during Great Lent 2024)
    const season = resolveLiturgicalSeason(lentDate);
    expect(season.seasonName).toContain('Lent');
    expect(season.isFast).toBe(true);
  });

  it('resolves Annual season for standard dates', () => {
    const annualDate = new Date(2024, 9, 15); // October 15, 2024
    const season = resolveLiturgicalSeason(annualDate);
    expect(season.rite).toBe('annual');
  });
});
