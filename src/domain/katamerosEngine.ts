/// <reference types="vite/client" />
import moment, { Moment } from 'moment';
import fs from 'fs';
import path from 'path';
import { getCopticDate } from '../lib/copticCalendar';
import { KatamerosReadings, LiturgicalItem } from '../types';

// Vite dynamic import glob (used in browser environment)
let synaxariumModules: Record<string, any> = {};
if (typeof import.meta !== 'undefined' && typeof (import.meta as any).glob === 'function') {
  synaxariumModules = (import.meta as any).glob('../content/data/synaxarium/*.json', { eager: true });
}

function getSynaxariumDataForDate(copticMonthIndex: number, copticDay: number): any {
  // 1. Browser Vite environment
  if (Object.keys(synaxariumModules).length > 0) {
    const fileKey = Object.keys(synaxariumModules).find((key) => {
      const filename = key.split('/').pop() || '';
      const match = filename.match(/^synaxarium_(\d{2})_([a-z]+)_(\d{2})\.json$/i);
      if (!match) return false;
      const mIdx = parseInt(match[1], 10);
      const dNum = parseInt(match[3], 10);
      return mIdx === copticMonthIndex && dNum === copticDay;
    });

    if (fileKey && synaxariumModules[fileKey]) {
      const mod = synaxariumModules[fileKey];
      return mod.default || mod;
    }
  }

  // 2. Node.js environment fallback
  try {
    const synaxariumDir = path.resolve(process.cwd(), 'src/content/data/synaxarium');
    if (fs.existsSync(synaxariumDir)) {
      const files = fs.readdirSync(synaxariumDir);
      const matchedFile = files.find((f) => {
        const match = f.match(/^synaxarium_(\d{2})_([a-z]+)_(\d{2})\.json$/i);
        if (!match) return false;
        return parseInt(match[1], 10) === copticMonthIndex && parseInt(match[3], 10) === copticDay;
      });

      if (matchedFile) {
        const content = fs.readFileSync(path.join(synaxariumDir, matchedFile), 'utf8');
        return JSON.parse(content);
      }
    }
  } catch (err) {
    // Node.js fs fallback error handling
  }

  return null;
}

export function resolveDailyKatamerosReadings(dateInput: Date | Moment): KatamerosReadings {
  const m = moment(dateInput);
  const coptic = getCopticDate(m);

  const dateString = m.format('YYYY-MM-DD');
  const copticDateString = `${coptic.copticDay} ${coptic.copticMonthName} ${coptic.copticYear} A.M.`;

  const pauline: LiturgicalItem = {
    id: `katameros-pauline-${dateString}`,
    role: 'reader',
    type: 'reading',
    title: {
      english: 'Pauline Epistle',
      coptic: 'Ⲡⲁⲩⲗⲟⲥ',
      arabic: 'البولس - رسالة القديس بولس'
    },
    text: {
      coptic: 'Ⲡⲁⲩⲗⲟⲥ ⲫⲃⲱⲕ ⲛⲒⲏⲥⲟⲩⲥ Ⲡⲭⲣⲓⲥⲧⲟⲥ ⲡⲓⲁⲡⲟⲥⲧⲟⲗⲟⲥ: ⲉⲧⲑⲁϩⲙ ⲉⲡⲓⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ ⲛⲧⲉ Ⲫⲛⲟⲩϯ.',
      copticTransliterationEng: 'Pavlos efvok nYesous Pkhristos pi-apostolos...',
      copticTransliterationAra: 'بولس إفبوك إنإيسوس بخرستوس بي أبستولوس...',
      english: 'Paul, a bondservant of Jesus Christ, called to be an apostle, separated to the gospel of God.',
      arabic: 'بولس، عبد ليسوع المسيح، المدعو رسولاً، المفرز لإنجيل الله.'
    }
  };

  const catholic: LiturgicalItem = {
    id: `katameros-catholic-${dateString}`,
    role: 'reader',
    type: 'reading',
    title: {
      english: 'Catholic Epistle',
      coptic: 'Ⲕⲁⲑⲟⲗⲓⲕⲟⲛ',
      arabic: 'الكاثوليكون - الرسالة الجامعة'
    },
    text: {
      coptic: 'Ⲕⲁⲑⲟⲗⲓⲕⲟⲛ: ⲛⲧⲉ ⲛⲓⲁⲡⲟⲥⲧⲟⲗⲟⲥ ⲉⲑⲟⲩⲁⲃ: ⲁⲅⲁⲡⲏⲧⲟⲓ ⲙⲡⲉⲣⲙⲉⲛⲣⲉ ⲡⲓⲕⲟⲥⲙⲟⲥ.',
      copticTransliterationEng: 'Katholikon: nte ni-apostolos ethowab: agapetoi mpermenre pi-kosmos.',
      copticTransliterationAra: 'كاثوليكون: إنتيه ني أبستولوس إثؤاب: أغابيتوي إمبيرمينري بي كوسموس.',
      english: 'Do not love the world or the things in the world. If anyone loves the world, the love of the Father is not in him.',
      arabic: 'لا تحبوا العالم ولا الأشياء التي في العالم. إن أحب أحد العالم فليست فيه محبة الآب.'
    }
  };

  const praxis: LiturgicalItem = {
    id: `katameros-praxis-${dateString}`,
    role: 'reader',
    type: 'reading',
    title: {
      english: 'Praxis (Acts of the Apostles)',
      coptic: 'Ⲡⲣⲁⲝⲓⲥ',
      arabic: 'الإبركسيس - أعمال آبائنا الرسل'
    },
    text: {
      coptic: 'Ⲡⲣⲁⲝⲓⲥ ⲛⲧⲉ ⲛⲉⲛⲓⲟϯ ⲛⲓⲁⲡⲟⲥⲧⲟⲗⲟⲥ ⲉⲑⲟⲩⲁⲃ: ⲡⲓⲥⲙⲟⲩ ⲛⲧⲉ ⲡⲟⲩϩⲙⲟⲧ ⲉⲑⲟⲩⲁⲃ ϣⲱⲡⲓ ⲛⲉⲙⲁⲛ. ⲁⲙⲏⲛ.',
      copticTransliterationEng: 'Praxis nte nenioti ni-apostolos ethowab: pi-smou nte pouhmot...',
      copticTransliterationAra: 'إبركسيس إنتيه نينيوتي ني أبستولوس إثؤاب: بي اسمو إنتيه بؤهموت...',
      english: 'The former account I made, O Theophilus, of all that Jesus began both to do and teach, until the day in which He was taken up.',
      arabic: 'الكلام الأول أنشأته يا ثاؤفيلس عن جميع ما ابتدأ يسوع يفعله ويعلم به، إلى اليوم الذي ارتفع فيه.'
    }
  };

  // Dynamically resolve Synaxarium reading from converted dataset
  const synaxariumRaw = getSynaxariumDataForDate(coptic.copticMonthIndex, coptic.copticDay);

  const synaxariumTitleAr = synaxariumRaw?.items?.[0]?.title?.arabic || `السنكسار: اليوم ${coptic.copticDay} من شهر ${coptic.copticMonthName}`;
  const synaxariumTextAr = synaxariumRaw?.items?.[0]?.text?.arabic || [
    `في مثل هذا اليوم من شهر ${coptic.copticMonthName}، تحيي الكنيسة المقدسة ذكرى القديسين والشهداء. بركة صلواتهم تكون معنا. أمين.`
  ];
  const synaxariumTextEng = synaxariumRaw?.items?.[0]?.text?.english || [
    `On this day of ${copticDateString}, the Holy Church commemorates the saints and martyrs who gave their lives for Christ. May their holy prayers be with us. Amen.`
  ];

  const synaxarium: LiturgicalItem = {
    id: `katameros-synaxarium-${dateString}`,
    role: 'reader',
    type: 'reading',
    title: {
      english: `The Synaxarium (${coptic.copticDay} ${coptic.copticMonthName})`,
      coptic: 'Ⲥⲩⲛⲁⲝⲁⲣⲓⲟⲛ',
      arabic: `السنكسار: ${synaxariumTitleAr}`
    },
    text: {
      english: synaxariumTextEng,
      arabic: synaxariumTextAr
    }
  };

  const psalm: LiturgicalItem = {
    id: `katameros-psalm-${dateString}`,
    role: 'deacon',
    type: 'hymn',
    title: {
      english: 'Psalm Response',
      coptic: 'Ⲯⲁⲗⲙⲟⲥ',
      arabic: 'مزمور الإنجيل'
    },
    text: {
      coptic: 'Ⲯⲁⲗⲙⲟⲥ ⲧⲱ Ⲇⲁⲩⲓⲇ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. ⲡϭⲟⲓⲥ ⲡⲉ ⲡⲁⲙⲁⲛⲉⲥⲱⲟⲩ ⲟⲩⲟϩ ⲛⲛⲉϥⲅⲁⲧ ⲛϩⲗⲓ.',
      copticTransliterationEng: 'Psalmos to David: Alleluia. Pchois pe pa-maneswoou ouoh nnefgat nhli.',
      copticTransliterationAra: 'بصالموس تو داويد: أليلويا. إبشويس بيه با مان إسوؤو أؤوه ننيفغات إنهلي.',
      english: 'Psalm of David: Alleluia. The Lord is my shepherd; I shall not want.',
      arabic: 'مزمور لداود: أليلويا. الرب رعي فلا يعوزني شيء.'
    }
  };

  const gospel: LiturgicalItem = {
    id: `katameros-gospel-${dateString}`,
    role: 'priest',
    type: 'reading',
    title: {
      english: 'The Holy Gospel',
      coptic: 'Ⲡⲓⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ ⲉⲑⲟⲩⲁⲃ',
      arabic: 'الإنجيل المقدس'
    },
    text: {
      coptic: 'ⲟⲩⲱϣⲧ ⲙⲡⲓⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ ⲉⲑⲟⲩⲁⲃ ⲛⲧⲉ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲭⲣⲓⲥⲧⲟⲥ.',
      copticTransliterationEng: 'Ouwosht mpi-evangelion ethowab nte Penchois Yesous Pkhristos.',
      copticTransliterationAra: 'أوؤشت إمبي إيفانجيليون إثؤاب إنتيه بينشويس إيسوس بخرستوس.',
      english: 'Blessed is He who comes in the name of the Lord. Our Lord, God, and Savior Jesus Christ, Son of the living God, to Whom be glory forever.',
      arabic: 'مبارك الآتي باسم الرب. ربنا وإلهنا ومخلصنا يسوع المسيح، ابن الله الحي، الذي له المجد إلى الأبد.'
    }
  };

  return {
    dateString,
    copticDateString,
    pauline,
    catholic,
    praxis,
    synaxarium,
    psalm,
    gospel
  };
}
