import { describe, it, expect } from 'vitest';
import { resolveDailyKatamerosReadings } from '../katamerosEngine';

describe('Daily Katameros Readings Engine', () => {
  it('resolves complete readings payload for today', () => {
    const readings = resolveDailyKatamerosReadings(new Date());
    expect(readings.dateString).toBeDefined();
    expect(readings.copticDateString).toBeDefined();
    expect(readings.pauline.title?.english).toContain('Pauline');
    expect(readings.catholic.title?.english).toContain('Catholic');
    expect(readings.praxis.title?.english).toContain('Praxis');
    expect(readings.gospel.text?.copticTransliterationEng).toBeDefined();
    expect(readings.gospel.text?.copticTransliterationAra).toBeDefined();
  });
});
