import fs from 'fs';
import path from 'path';
import { getCopticDate } from '../src/lib/copticCalendar';
import { resolveLiturgicalSeason } from '../src/domain/seasonResolver';
import { buildLiturgicalService, getServiceTitle } from '../src/lib/documentBuilder';
import { SectionCategory } from '../src/types';

const OUTPUT_DIR = path.resolve(process.cwd(), 'dist/api/v1');

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function generateApiEndpoints() {
  console.log('🚀 Generating Copto Presenter Static REST API Endpoints...');

  ensureDir(path.join(OUTPUT_DIR, 'calendar'));
  ensureDir(path.join(OUTPUT_DIR, 'services'));

  // 1. Calendar Today Endpoint (/api/v1/calendar/today.json)
  const today = new Date();
  const copticDate = getCopticDate(today);
  const season = resolveLiturgicalSeason(today);

  const calendarTodayPayload = {
    gregorianDate: today.toISOString().split('T')[0],
    copticDate: {
      day: copticDate.copticDay,
      month: copticDate.copticMonthName,
      monthIndex: copticDate.copticMonthIndex,
      year: copticDate.copticYear,
      dayOfWeek: copticDate.dayOfWeek
    },
    season: {
      name: season.seasonName,
      rite: season.rite,
      isFast: season.isFast,
      isFeast: season.isFeast,
      specialTune: season.specialTune || null
    },
    generatedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'calendar/today.json'),
    JSON.stringify(calendarTodayPayload, null, 2)
  );

  // 2. Services List Endpoint (/api/v1/services/list.json)
  const categories: SectionCategory[] = [
    'VESPERS',
    'MATINS',
    'OFFERING_OF_THE_LAMB',
    'LITURGY_OF_THE_WORD',
    'ST_BASIL_LITURGY_OF_THE_FAITHFUL',
    'ST_GREGORY_LITURGY_OF_THE_FAITHFUL',
    'ST_CYRIL_LITURGY_OF_THE_FAITHFUL',
    'DISTRIBUTION',
    'AGPEYA_1ST_HOUR',
    'AGPEYA_3RD_HOUR',
    'AGPEYA_6TH_HOUR',
    'AGPEYA_9TH_HOUR',
    'AGPEYA_11TH_HOUR',
    'AGPEYA_12TH_HOUR',
    'AGPEYA_VEIL',
    'MIDNIGHT_PRAISES',
    'VESPER_PRAISES',
    'MORNING_PRAISES',
    'PASCHA_GENERAL_FUNERAL_PRAYER'
  ];

  const servicesList = categories.map((cat) => ({
    id: cat,
    title: getServiceTitle(cat),
    endpoint: `/api/v1/services/${cat}.json`
  }));

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'services/list.json'),
    JSON.stringify({ total: servicesList.length, services: servicesList }, null, 2)
  );

  // 3. Service Category Endpoints (/api/v1/services/{category}.json)
  categories.forEach((cat) => {
    const sections = buildLiturgicalService(cat);
    const payload = {
      category: cat,
      title: getServiceTitle(cat),
      sections,
      generatedAt: new Date().toISOString()
    };

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `services/${cat}.json`),
      JSON.stringify(payload, null, 2)
    );
  });

  console.log(`✅ Copto Presenter API Endpoints generated successfully under dist/api/v1/`);
}

generateApiEndpoints();
