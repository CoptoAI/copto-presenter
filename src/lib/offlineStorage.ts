const DB_NAME = 'OrthodoxPresenterDB';
const DB_VERSION = 1;
const STORE_PREFS = 'user_preferences';
const STORE_BOOKMARKS = 'service_bookmarks';

export interface UserPreferences {
  fontSize: number;
  showCoptic: boolean;
  showEnglish: boolean;
  showArabic: boolean;
  theme: 'dark' | 'light' | 'projector' | 'sepia';
  fontFamily: string;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_PREFS)) {
        db.createObjectStore(STORE_PREFS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_BOOKMARKS)) {
        db.createObjectStore(STORE_BOOKMARKS, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePreferences(prefs: UserPreferences): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_PREFS, 'readwrite');
    const store = tx.objectStore(STORE_PREFS);
    store.put({ id: 'current_settings', ...prefs });
  } catch (err) {
    console.warn('IndexedDB save failed, using fallback', err);
    localStorage.setItem('op_user_prefs', JSON.stringify(prefs));
  }
}

export async function loadPreferences(): Promise<UserPreferences | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_PREFS, 'readonly');
      const store = tx.objectStore(STORE_PREFS);
      const req = store.get('current_settings');
      req.onsuccess = () => resolve(req.result ? (req.result as UserPreferences) : null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    const local = localStorage.getItem('op_user_prefs');
    return local ? JSON.parse(local) : null;
  }
}
