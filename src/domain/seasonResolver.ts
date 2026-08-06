import moment, { Moment } from 'moment';
import { getResurrectionDate } from '../lib/copticCalendar';

export type LiturgicalRite = 'annual' | 'joyful' | 'fasting' | 'pascha';

export interface SeasonInfo {
  seasonName: string;
  rite: LiturgicalRite;
  isFast: boolean;
  isFeast: boolean;
  specialTune?: string;
}

export function resolveLiturgicalSeason(dateInput: Date | Moment): SeasonInfo {
  const m = moment(dateInput);
  const year = m.year();

  const resurrection = moment(getResurrectionDate(year));
  const palmSunday = moment(resurrection).subtract(7, 'days');
  const greatLentStart = moment(resurrection).subtract(55, 'days');
  const pentecost = moment(resurrection).add(49, 'days');
  const jonahFastStart = moment(greatLentStart).subtract(14, 'days');

  // Check Pascha Week (Holy Week: Palm Sunday through Resurrection)
  if (m.isBetween(palmSunday, resurrection, 'day', '[]')) {
    return {
      seasonName: 'Holy Pascha Week',
      rite: 'pascha',
      isFast: true,
      isFeast: false,
      specialTune: 'Hazzaini (Mournful Pascha Tune)'
    };
  }

  // Check Holy 50 Days (Resurrection to Pentecost)
  if (m.isBetween(resurrection, pentecost, 'day', '[]')) {
    return {
      seasonName: 'Holy 50 Days (Pentecost)',
      rite: 'joyful',
      isFast: false,
      isFeast: true,
      specialTune: 'Frayhi (Joyful Resurrection Tune)'
    };
  }

  // Check Great Lent
  if (m.isBetween(greatLentStart, palmSunday, 'day', '[)')) {
    return {
      seasonName: 'The Holy Great Lent',
      rite: 'fasting',
      isFast: true,
      isFeast: false,
      specialTune: 'Siami (Fasting Tune)'
    };
  }

  // Check Jonah's Fast
  if (m.isBetween(jonahFastStart, moment(jonahFastStart).add(3, 'days'), 'day', '[]')) {
    return {
      seasonName: "Jonah's Fast",
      rite: 'fasting',
      isFast: true,
      isFeast: false,
      specialTune: 'Siami (Fasting Tune)'
    };
  }

  // Nativity Fast (Nov 25 to Jan 7)
  const month = m.month();
  const day = m.date();
  if ((month === 10 && day >= 25) || month === 11 || (month === 0 && day <= 7)) {
    return {
      seasonName: 'Holy Nativity Fast (Kiahk)',
      rite: 'fasting',
      isFast: true,
      isFeast: false,
      specialTune: 'Kiahk Praise Tune'
    };
  }

  // Default Annual Rite
  return {
    seasonName: 'Annual Liturgical Season',
    rite: 'annual',
    isFast: false,
    isFeast: false
  };
}
