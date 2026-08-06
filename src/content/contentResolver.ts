import { LiturgicalItem, MultilingualText } from '../types';

export function normalizeMultilingualText(raw: any): MultilingualText {
  if (!raw) return {};

  const english = raw.english || raw.eng || (typeof raw === 'string' ? raw : undefined);
  const arabic = raw.arabic || raw.ara;
  const coptic = raw.coptic || raw.cop;
  const copticTransliterationEng = raw.copticTransliterationEng || raw.copEng || raw.transliterationEng;
  const copticTransliterationAra = raw.copticTransliterationAra || raw.copAra || raw.transliterationAra;

  return {
    english: Array.isArray(english) ? english.join(' ') : english,
    arabic: Array.isArray(arabic) ? arabic.join(' ') : arabic,
    coptic: Array.isArray(coptic) ? coptic.join(' ') : coptic,
    copticTransliterationEng: Array.isArray(copticTransliterationEng)
      ? copticTransliterationEng.join(' ')
      : copticTransliterationEng,
    copticTransliterationAra: Array.isArray(copticTransliterationAra)
      ? copticTransliterationAra.join(' ')
      : copticTransliterationAra
  };
}

export function normalizeLiturgicalItem(rawItem: any, index: number): LiturgicalItem {
  const title = normalizeMultilingualText(rawItem.title);
  const user = normalizeMultilingualText(rawItem.user);
  const rubric = normalizeMultilingualText(rawItem.rubric);

  let text: MultilingualText = {};
  if (rawItem.text) {
    text = normalizeMultilingualText(rawItem.text);
  } else if (rawItem.content) {
    text = normalizeMultilingualText(rawItem.content);
  }

  // Derive role
  let role: LiturgicalItem['role'] = 'all';
  const roleText = (Array.isArray(user.english) ? user.english.join(' ') : (user.english || '')).toLowerCase();
  if (roleText.includes('priest')) role = 'priest';
  else if (roleText.includes('deacon')) role = 'deacon';
  else if (roleText.includes('people')) role = 'people';
  else if (roleText.includes('reader')) role = 'reader';

  return {
    id: rawItem.id || `item-${index}`,
    role,
    type: rawItem.type || 'prayer',
    user,
    title,
    rubric,
    text
  };
}

export function parseRawJsonDocument(rawJson: any): LiturgicalItem[] {
  if (!rawJson) return [];

  const items: LiturgicalItem[] = [];

  if (Array.isArray(rawJson.items)) {
    rawJson.items.forEach((item: any, idx: number) => {
      items.push(normalizeLiturgicalItem(item, idx));
    });
  } else if (Array.isArray(rawJson)) {
    rawJson.forEach((item: any, idx: number) => {
      items.push(normalizeLiturgicalItem(item, idx));
    });
  } else if (typeof rawJson === 'object') {
    items.push(normalizeLiturgicalItem(rawJson, 0));
  }

  return items;
}
