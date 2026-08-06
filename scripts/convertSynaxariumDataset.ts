import fs from 'fs';
import path from 'path';

const DATASET_DIR = path.resolve(process.cwd(), 'pre-dataset/Senksar_Text');
const OUTPUT_DIR = path.resolve(process.cwd(), 'src/content/data/synaxarium');
const API_OUTPUT_DIR = path.resolve(process.cwd(), 'dist/api/v1/synaxarium');

// Coptic Month Names Mapping
const COPTIC_MONTHS: Record<string, { index: number; nameEn: string; nameAr: string }> = {
  tout: { index: 1, nameEn: 'Tout', nameAr: 'توت' },
  paopi: { index: 2, nameEn: 'Paopi', nameAr: 'بابه' },
  hathor: { index: 3, nameEn: 'Hathor', nameAr: 'هاتور' },
  koiak: { index: 4, nameEn: 'Koiak', nameAr: 'كيهك' },
  tobi: { index: 5, nameEn: 'Tobi', nameAr: 'طوبة' },
  meshir: { index: 6, nameEn: 'Meshir', nameAr: 'أمشير' },
  paremhat: { index: 7, nameEn: 'Paremhat', nameAr: 'برمهات' },
  paremoude: { index: 8, nameEn: 'Paremoude', nameAr: 'برمودة' },
  pashons: { index: 9, nameEn: 'Pashons', nameAr: 'بشنس' },
  paoni: { index: 10, nameEn: 'Paoni', nameAr: 'بؤونة' },
  epip: { index: 11, nameEn: 'Epip', nameAr: 'أبيب' },
  mesori: { index: 12, nameEn: 'Mesori', nameAr: 'مسرى' },
  pikogi: { index: 13, nameEn: 'Nasie', nameAr: 'النسيء' }
};

function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  return text
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function convertSynaxariumDataset() {
  console.log('🚀 Starting Coptic Synaxarium Dataset Conversion Pipeline...');

  if (!fs.existsSync(DATASET_DIR)) {
    console.warn(`⚠️ Dataset directory not found at ${DATASET_DIR}. Skipping conversion.`);
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  if (!fs.existsSync(API_OUTPUT_DIR)) {
    fs.mkdirSync(API_OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(DATASET_DIR).filter((f) => f.endsWith('.htm'));
  let convertedCount = 0;

  for (const filename of files) {
    // Expected filename format: 01tout01_sen.htm
    const match = filename.match(/^(\d{2})([a-z]+)(\d{2})_sen\.htm$/i);
    if (!match) continue;

    const [, monthNumStr, monthKeyRaw, dayNumStr] = match;
    const monthKey = monthKeyRaw.toLowerCase();
    const monthInfo = COPTIC_MONTHS[monthKey];
    if (!monthInfo) continue;

    const monthIndex = parseInt(monthNumStr, 10);
    const dayNum = parseInt(dayNumStr, 10);

    const filePath = path.join(DATASET_DIR, filename);
    const buffer = fs.readFileSync(filePath);
    const htmlText = new TextDecoder('windows-1256').decode(buffer);

    // Extract table cell text lines
    const cellMatches = htmlText.match(/<td[^>]*>(.*?)<\/td>/gs) || [];
    const decodedLines: string[] = [];

    for (const cell of cellMatches) {
      const clean = decodeHtmlEntities(cell);
      if (clean && clean.length > 5) {
        decodedLines.push(clean);
      }
    }

    if (decodedLines.length === 0) continue;

    const mainTitleAr = decodedLines[0] || `اليوم ${dayNum} من شهر ${monthInfo.nameAr}`;
    const storyParagraphs = decodedLines.slice(1);

    const jsonId = `synaxarium_${String(monthIndex).padStart(2, '0')}_${monthKey}_${String(dayNum).padStart(2, '0')}`;

    const synaxariumItem = {
      id: jsonId,
      category: 'KATAMEROS_READINGS',
      type: 'reading',
      role: 'reader',
      copticMonthIndex: monthIndex,
      copticMonthName: monthInfo.nameEn,
      copticDay: dayNum,
      title: {
        english: `Synaxarium: ${dayNum} ${monthInfo.nameEn}`,
        arabic: `السنكسار: اليوم ${dayNum} من شهر ${monthInfo.nameAr}`
      },
      items: [
        {
          id: `${jsonId}-title`,
          title: {
            arabic: mainTitleAr
          },
          text: {
            english: [
              `On this day of ${dayNum} ${monthInfo.nameEn}, the Holy Coptic Church commemorates: ${mainTitleAr}. May their holy prayers be with us all. Amen.`
            ],
            arabic: storyParagraphs.length > 0 ? storyParagraphs : [mainTitleAr]
          }
        }
      ]
    };

    const targetPath = path.join(OUTPUT_DIR, `${jsonId}.json`);
    const apiPath = path.join(API_OUTPUT_DIR, `${jsonId}.json`);

    fs.writeFileSync(targetPath, JSON.stringify(synaxariumItem, null, 2), 'utf8');
    fs.writeFileSync(apiPath, JSON.stringify(synaxariumItem, null, 2), 'utf8');
    convertedCount++;
  }

  console.log(`✅ Successfully converted ${convertedCount} Synaxarium daily reading files into JSON schema under src/content/data/synaxarium/`);
}

// Execute directly if run via CLI
if (process.argv[1] && process.argv[1].endsWith('convertSynaxariumDataset.ts')) {
  convertSynaxariumDataset();
}
