import { describe, it, expect } from 'vitest';
import moment from 'moment';
import { resolveDailyKatamerosReadings } from '../katamerosEngine';

describe('Synaxarium Dataset Ingestion & Katameros Resolution', () => {
  it('resolves authentic converted Synaxarium Arabic text for Tout 1 (September 11)', () => {
    // September 11 is Coptic 1 Tout / Thoout
    const date = moment('2026-09-11');
    const readings = resolveDailyKatamerosReadings(date);

    expect(readings.copticDateString).toContain('Thoout');
    expect(readings.synaxarium.title?.arabic).toBeDefined();
    expect(readings.synaxarium.text?.arabic).toBeDefined();
    expect(Array.isArray(readings.synaxarium.text?.arabic)).toBe(true);
  });
});
