export function normalizeArabic(text: string): string {
  if (!text) return '';

  return text
    // Strip Arabic diacritics (Tashkeel)
    .replace(/[\u064B-\u0652\u0640]/g, '')
    // Normalize Alef variations (أ, إ, آ, ٱ -> ا)
    .replace(/[أإآٱ]/g, 'ا')
    // Normalize Yaa / Alef Maqsura (ى -> ي)
    .replace(/ى/g, 'ي')
    // Normalize Taa Marbouta (ة -> ه)
    .replace(/ة/g, 'ه')
    // Trim and collapse whitespace
    .trim()
    .toLowerCase();
}

export function matchesQuery(text: string | string[] | undefined, query: string): boolean {
  if (!text || !query) return false;

  const rawText = Array.isArray(text) ? text.join(' ') : text;
  const cleanQuery = normalizeArabic(query);
  const cleanText = normalizeArabic(rawText);

  return cleanText.includes(cleanQuery);
}
