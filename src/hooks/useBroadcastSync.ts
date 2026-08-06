import { useEffect, useRef } from 'react';
import { usePresenterStore } from '../stores/usePresenterStore';
import { PresenterSyncState } from '../types';

const CHANNEL_NAME = 'orthodox_presenter_sync';

export function useBroadcastSync(role: 'operator' | 'projector') {
  const store = usePresenterStore();
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channelRef.current = channel;

      channel.onmessage = (event: MessageEvent<PresenterSyncState>) => {
        if (event.data && event.data.timestamp > store.timestamp) {
          store.updateSyncState(event.data);
        }
      };
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CHANNEL_NAME && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue) as PresenterSyncState;
          if (parsed.timestamp > store.timestamp) {
            store.updateSyncState(parsed);
          }
        } catch (err) {
          console.error('Failed to parse storage sync event', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (channel) {
        channel.close();
      }
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Broadcast state updates from operator window to projector window
  const broadcastState = (payload: Partial<PresenterSyncState>) => {
    const fullState: PresenterSyncState = {
      activeSectionId: store.activeSectionId,
      activeSlideIndex: store.activeSlideIndex,
      category: store.category,
      fontSize: store.fontSize,
      showCoptic: store.showCoptic,
      showEnglish: store.showEnglish,
      showArabic: store.showArabic,
      theme: store.theme,
      timestamp: Date.now(),
      ...payload
    };

    store.updateSyncState(fullState);

    if (channelRef.current) {
      channelRef.current.postMessage(fullState);
    }
    localStorage.setItem(CHANNEL_NAME, JSON.stringify(fullState));
  };

  return { broadcastState };
}
